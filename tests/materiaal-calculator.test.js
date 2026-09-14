'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  MATERIALS,
  calculateOppervlakte,
  calculateVolumeInclInklinking,
  calculateBigBags,
  calculateGewichtKg,
} = require('../site-tools-staging/materiaal-calculator/calculator-core.js');

function assertClose(actual, expected, epsilon = 1e-6, message) {
  assert.ok(
    Number.isFinite(actual) && Math.abs(actual - expected) < epsilon,
    message || `expected ${actual} to be close to ${expected}`
  );
}

test('rechthoek zand: 10m x 2m x 5cm (+10% inklinking) -> 1.10 m³, 2x 1m³ big bags, 1760 kg', () => {
  const oppervlakte = calculateOppervlakte('rechthoek', { lengte: 10, breedte: 2 });
  assertClose(oppervlakte, 20);

  const mat = MATERIALS.zand;
  assert.equal(mat.inklinking, 0.10);
  assert.equal(mat.dichtheid, 1600);

  const volumeIncl = calculateVolumeInclInklinking(oppervlakte, 5, mat.inklinking);
  assertClose(volumeIncl, 1.10);

  assert.equal(calculateBigBags(volumeIncl, 1), 2);
  assert.equal(calculateBigBags(volumeIncl, 0.5), 3);

  const gewichtKg = calculateGewichtKg(volumeIncl, mat.dichtheid);
  assertClose(gewichtKg, 1760);
});

test('cirkel boomschors: diameter 4m x 8cm (+20% inklinking) -> volume, big bags en gewicht', () => {
  // Onafhankelijk berekend (oppervlakte = pi * straal^2 = pi * 2^2), niet afgeleid van de
  // geteste functie zelf.
  const oppervlakte = calculateOppervlakte('rond', { diameter: 4 });
  assertClose(oppervlakte, Math.PI * 4);

  const mat = MATERIALS.schors;
  assert.equal(mat.inklinking, 0.20);
  assert.equal(mat.dichtheid, 250);

  const volumeIncl = calculateVolumeInclInklinking(oppervlakte, 8, mat.inklinking);
  assertClose(volumeIncl, 1.2063715789784805);

  assert.equal(calculateBigBags(volumeIncl, 1), 2);
  assert.equal(calculateBigBags(volumeIncl, 0.5), 3);

  const gewichtKg = calculateGewichtKg(volumeIncl, mat.dichtheid);
  assertClose(gewichtKg, 301.59289474462013);
});

test('randgeval: 0 afmeting geeft 0, geen NaN of crash', () => {
  const oppervlakteRecht = calculateOppervlakte('rechthoek', { lengte: 0, breedte: 5 });
  assert.equal(oppervlakteRecht, 0);

  const oppervlakteRond = calculateOppervlakte('rond', { diameter: 0 });
  assert.equal(oppervlakteRond, 0);

  const volumeIncl = calculateVolumeInclInklinking(oppervlakteRecht, 5, MATERIALS.zand.inklinking);
  assert.equal(volumeIncl, 0);
  assert.equal(calculateBigBags(volumeIncl, 1), 0);
  assert.equal(calculateGewichtKg(volumeIncl, MATERIALS.zand.dichtheid), 0);
});

test('randgeval: lege/ongeldige invoer (leeg veld, tekst) geeft 0, geen NaN of crash', () => {
  const oppervlakte = calculateOppervlakte('rechthoek', { lengte: '', breedte: 'abc' });
  assert.equal(Number.isNaN(oppervlakte), false);
  assert.equal(oppervlakte, 0);

  const volumeIncl = calculateVolumeInclInklinking(oppervlakte, '', MATERIALS.grind.inklinking);
  assert.equal(Number.isNaN(volumeIncl), false);
  assert.equal(volumeIncl, 0);
  assert.equal(calculateBigBags(volumeIncl, 1), 0);
  assert.equal(Number.isNaN(calculateGewichtKg(volumeIncl, MATERIALS.grind.dichtheid)), false);
});

test('randgeval: extreme invoer blijft een eindig getal, geen NaN of Infinity-crash', () => {
  const oppervlakte = calculateOppervlakte('rechthoek', { lengte: 1e6, breedte: 1e6 });
  assert.equal(oppervlakte, 1e12);
  assert.ok(Number.isFinite(oppervlakte));

  const volumeIncl = calculateVolumeInclInklinking(oppervlakte, 1e6, MATERIALS.tuinaarde.inklinking);
  assert.ok(Number.isFinite(volumeIncl));

  const gewichtKg = calculateGewichtKg(volumeIncl, MATERIALS.tuinaarde.dichtheid);
  assert.ok(Number.isFinite(gewichtKg));
});
