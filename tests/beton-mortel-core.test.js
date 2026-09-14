'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  BETON_MIX_PER_M3,
  calculateBetonVolumeM3,
  calculateBetonZakLiter,
  calculateBetonZakken,
  calculateBetonZelfMengen,
  calculateMortelM2,
  calculateStenenNodig,
  calculateMortelLiter,
  calculateMortelKg,
  calculateMortelZakken,
  calculateMortelCementKg,
  calculateMortelZandKg,
} = require('../site-tools-staging/beton-mortel-calculator/beton-mortel-core.js');

function assertClose(actual, expected, epsilon = 1e-6, message) {
  assert.ok(
    Number.isFinite(actual) && Math.abs(actual - expected) < epsilon,
    message || `expected ${actual} to be close to ${expected}`
  );
}

test('beton, afmetingen: 3m x 2m x 10cm -> 0,6 m3, 600 liter, 48 zakken', () => {
  const dims = { lengte: 3, breedte: 2, dikteCm: 10 };
  const volume = calculateBetonVolumeM3('afmetingen', dims);
  assertClose(volume, 0.6);

  const liter = calculateBetonZakLiter(volume);
  assertClose(liter, 600);
  assert.equal(calculateBetonZakken(volume), 48); // ceil(600/12.5) = 48
});

test('beton, direct m3: 1 m3 zelf mengen -> 300 kg cement (12 zakken), 600 kg zand, 1200 kg grind', () => {
  const volume = calculateBetonVolumeM3('direct-m3', { volumeM3: 1 });
  assertClose(volume, 1);

  const mix = calculateBetonZelfMengen(volume);
  assertClose(mix.cementKg, BETON_MIX_PER_M3.cementKg);
  assert.equal(mix.cementZakken, 12); // ceil(300/25) = 12
  assertClose(mix.zandKg, BETON_MIX_PER_M3.zandKg);
  assertClose(mix.grindKg, BETON_MIX_PER_M3.grindKg);
});

test('mortel, oppervlakte-invoer: 10 m2 -> 1000 stenen, 250 liter, 475 kg, 19 zakken', () => {
  const m2 = calculateMortelM2('oppervlakte', { m2: 10 });
  assertClose(m2, 10);

  assert.equal(calculateStenenNodig(m2), 1000);
  assertClose(calculateMortelLiter(m2), 250);
  assertClose(calculateMortelKg(m2), 475); // 250 l * 1.9 kg/l
  assert.equal(calculateMortelZakken(m2), 19); // ceil(475/25) = 19

  assertClose(calculateMortelCementKg(m2), 95); // 1/5 van 475
  assertClose(calculateMortelZandKg(m2), 380); // 4/5 van 475
});

test('mortel, stenen-invoer: 250 stenen -> 2,5 m2 terugrekenen', () => {
  const m2 = calculateMortelM2('stenen', { aantalStenen: 250 });
  assertClose(m2, 2.5);
  assert.equal(calculateStenenNodig(m2), 250);
});

test('randgevallen: 0, lege/ongeldige invoer -> 0, geen NaN of crash', () => {
  assert.equal(calculateBetonVolumeM3('afmetingen', { lengte: 0, breedte: 5, dikteCm: 10 }), 0);
  assert.equal(calculateBetonVolumeM3('direct-m3', { volumeM3: '' }), 0);
  assert.equal(calculateBetonZakken(0), 0);
  assert.equal(calculateBetonZelfMengen(0).cementZakken, 0);
  assert.equal(calculateMortelM2('oppervlakte', { m2: '' }), 0);
  assert.equal(calculateMortelM2('stenen', { aantalStenen: '' }), 0);
  assert.equal(calculateStenenNodig(0), 0);
  assert.equal(calculateMortelZakken(0), 0);
  assert.equal(calculateMortelCementKg(0), 0);
});

test('randgeval: extreme invoer blijft eindig, geen NaN of Infinity-crash', () => {
  const volume = calculateBetonVolumeM3('afmetingen', { lengte: 1e6, breedte: 1e6, dikteCm: 1e6 });
  assert.ok(Number.isFinite(volume));
  assert.ok(Number.isFinite(calculateBetonZakken(volume)));
  assert.ok(Number.isFinite(calculateBetonZelfMengen(volume).grindKg));

  const m2 = calculateMortelM2('stenen', { aantalStenen: 1e9 });
  assert.ok(Number.isFinite(m2));
  assert.ok(Number.isFinite(calculateMortelZakken(m2)));
});
