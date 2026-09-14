#!/usr/bin/env node
'use strict';

/**
 * Lichtgewicht, dependency-loze linkcheck voor de statische site (geen build-pipeline, zie
 * CLAUDE.md § Kwaliteitseisen per tool). Vangt lokaal, vóór een deploy, precies de bugklasse van
 * 14 september 2026 op de homepage: een knop-achtige <a> zonder href, en tekst die naar
 * "hieronder" verwijst zonder dat daar daadwerkelijk een klikbare link staat.
 *
 * Scant elke site*-map (site/, site-staging/, site-tools-staging/, site-feedback-staging/, ...)
 * op alle .html-bestanden. Live HTTP-validatie (externe URLs, echte 404's op een draaiende
 * server) is het werk van .github/workflows/lint-and-links.yml (lychee) — dit script doet
 * uitsluitend snelle, statische checks zonder netwerkverkeer.
 *
 * Poortwachter: opgenomen in `npm test` (package.json) én in `.git/hooks/pre-commit` — dat laatste
 * is machine-lokaal (niet versiebeheerd, overleeft geen verse clone), zie CLAUDE.md voor de
 * kanttekening daarbij.
 *
 * Bewuste uitzondering: een kale href="#" wordt NIET gemeld als het element een title-attribuut
 * heeft — dat is het gedocumenteerde, opzettelijke patroon voor affiliate-placeholders (zie
 * CLAUDE.md § Core Regel: Monetisatie) totdat een echt partnerprogramma is aangesloten. Zonder
 * die uitzondering zou deze check permanent rood staan op een bekend, geaccepteerd patroon.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const PROD_ROOT = path.join(ROOT, 'site');

// nginx-alias-map voor staging (zie CLAUDE.md § Staging-omgeving): op staging wijzen /tools/ en
// /feedback/ niet naar site-staging/tools|feedback/, maar naar hun eigen fysiek gescheiden map.
const STAGING_OVERRIDES = [
  { prefix: '/tools/', dir: path.join(ROOT, 'site-tools-staging') },
  { prefix: '/feedback/', dir: path.join(ROOT, 'site-feedback-staging') },
];

const TRIGGER_WORDS = ['hieronder', 'onderstaande', 'via de link'];
const TRIGGER_WINDOW = 400;

function findSiteRoots() {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name.startsWith('site'))
    .map((e) => path.join(ROOT, e.name));
}

function findHtmlFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findHtmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function lineAt(html, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (html[i] === '\n') line++;
  return line;
}

function existsAsFileOrIndex(baseDir, relPath) {
  if (relPath === '') return fs.existsSync(path.join(baseDir, 'index.html'));
  const asFile = path.join(baseDir, relPath);
  const asIndex = path.join(baseDir, relPath, 'index.html');
  return fs.existsSync(asFile) || fs.existsSync(asIndex);
}

function resolveInternalTarget(hrefPath, isStagingContext) {
  const clean = hrefPath.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return true;
  if (isStagingContext) {
    for (const o of STAGING_OVERRIDES) {
      if (clean.startsWith(o.prefix)) {
        const relInOverride = clean.slice(o.prefix.length).replace(/\/$/, '');
        return existsAsFileOrIndex(o.dir, relInOverride);
      }
    }
  }
  const rel = clean.replace(/^\/+/, '').replace(/\/$/, '');
  return existsAsFileOrIndex(PROD_ROOT, rel);
}

function parseAttrs(attrsRaw) {
  const attrs = {};
  const attrRegex = /(\w[\w-]*)\s*=\s*"([^"]*)"/g;
  let a;
  while ((a = attrRegex.exec(attrsRaw))) attrs[a[1].toLowerCase()] = a[2];
  return attrs;
}

const anchorRegex = /<a\b([^>]*)>/gi;

function checkFile(file, isStagingContext, errors) {
  const html = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(ROOT, file);

  let match;
  anchorRegex.lastIndex = 0;
  while ((match = anchorRegex.exec(html))) {
    const attrs = parseAttrs(match[1]);
    const line = lineAt(html, match.index);
    const classes = (attrs.class || '').split(/\s+/);
    const looksLikeButton = classes.includes('btn') || classes.some((c) => c.startsWith('btn-'));
    const href = attrs.href;
    const snippet = match[0].slice(0, 90);

    if (href === '') {
      errors.push(`${relFile}:${line} — lege href="" (${snippet})`);
    } else if (href === undefined) {
      if (looksLikeButton && attrs['aria-disabled'] !== 'true') {
        errors.push(`${relFile}:${line} — knop-achtige <a> zonder href én zonder aria-disabled="true" (${snippet})`);
      }
    } else if (href === '#' && !attrs.title) {
      errors.push(`${relFile}:${line} — href="#" zonder title-uitleg (geen herkenbare intentionele placeholder) (${snippet})`);
    } else if (href.startsWith('/') && !href.startsWith('//')) {
      if (!resolveInternalTarget(href, isStagingContext)) {
        errors.push(`${relFile}:${line} — interne link "${href}" bestaat niet (${snippet})`);
      }
    }
  }

  for (const word of TRIGGER_WORDS) {
    const wordRegex = new RegExp(word, 'gi');
    let wMatch;
    while ((wMatch = wordRegex.exec(html))) {
      // Alleen een "loze belofte" als de zin zelf ook over een link/knop/formulier gaat — anders
      // is "hieronder" gewoon proza dat naar een tabel of lijst verwijst (geen bug).
      const sentenceStart = html.lastIndexOf('.', wMatch.index);
      const sentence = html.slice(sentenceStart === -1 ? 0 : sentenceStart, wMatch.index + word.length + 80);
      if (!/\b(link|knop|formulier)\b/i.test(sentence)) continue;

      const windowStart = wMatch.index;
      const windowEnd = Math.min(html.length, windowStart + TRIGGER_WINDOW);
      const window = html.slice(windowStart, windowEnd);
      if (!/<a\b[^>]*\shref="[^"]+"/i.test(window)) {
        const line = lineAt(html, wMatch.index);
        errors.push(`${relFile}:${line} — tekst verwijst naar "${word}" (in een zin over link/knop/formulier) maar geen klikbare <a href="..."> gevonden binnen ${TRIGGER_WINDOW} tekens erna`);
      }
    }
  }
}

const errors = [];
for (const root of findSiteRoots()) {
  const isStagingContext = path.basename(root) !== 'site';
  for (const file of findHtmlFiles(root)) {
    checkFile(file, isStagingContext, errors);
  }
}

if (errors.length) {
  console.error(`❌ ${errors.length} linkprobleem/problemen gevonden:\n`);
  errors.forEach((e) => console.error(' - ' + e));
  process.exit(1);
}
console.log('✅ Geen dode links, lege hrefs, gebroken knoppen of losse "hieronder"-verwijzingen gevonden.');
