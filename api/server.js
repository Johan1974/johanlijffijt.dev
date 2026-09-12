// Minimal backend for johanlijffijt.dev itself — feedback + click-tracking, no longer borrowed
// from Tumble's Supabase (that stack is stopped now that the games pivot means Tumble is on
// hold). No framework, no database engine: append-only NDJSON files are more than enough for the
// traffic this gets, and trivially inspectable (`cat data/feedback.ndjson`).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const PORT = 8787;
const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

function appendRecord(file, record) {
  const line = JSON.stringify({ id: crypto.randomUUID(), created_at: new Date().toISOString(), ...record }) + '\n';
  fs.appendFileSync(path.join(DATA_DIR, file), line);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 10_000) req.destroy(new Error('payload too large'));
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'POST' && req.url === '/feedback') {
      const body = await readJsonBody(req);
      const message = String(body.message || '').trim().slice(0, 4000);
      if (!message) {
        res.writeHead(400).end();
        return;
      }
      const email = body.email ? String(body.email).trim().slice(0, 320) : null;
      appendRecord('feedback.ndjson', { message, email });
      res.writeHead(201).end();
      return;
    }

    if (req.method === 'POST' && req.url === '/track') {
      const body = await readJsonBody(req);
      const target = String(body.target || '').trim().slice(0, 100);
      if (!target) {
        res.writeHead(400).end();
        return;
      }
      appendRecord('link_clicks.ndjson', { target });
      res.writeHead(201).end();
      return;
    }

    res.writeHead(404).end();
  } catch (e) {
    res.writeHead(400).end();
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`johanlijffijt.dev api listening on :${PORT}`);
});
