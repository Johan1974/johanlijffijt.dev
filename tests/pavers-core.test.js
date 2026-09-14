'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  TEGEL_FORMATEN,
  calculateOppervlakte,
  calculatePerimeter,
  calculateAantalTegels,
  calculateOpsluitbandenMeter,
  calculateZandbedM3,
  calculateZandbedKg,
  calculateEgalineGewichtKg,
  calculateEgalineZakken,
} = require('../site-tools-staging/bestrating-calculator/pavers-core.js');

function assertClose(actual, expected, epsilon = 1e-6, message) {
  assert.ok(
    Number.isFinite(actual) && Math.abs(actual - expected) < epsilon,
    message || `expected ${actual} to be close to ${expected}`
  );
}

test('bestrating, lengte x breedte: 5m x 4m, tegel 60x60 -> 62 tegels, 18m opsluitband, 2 m³/3200 kg zandbed', () => {
  const dims = { lengte: 5, breedte: 4 };
  const oppervlakte = calculateOppervlakte('lengte-breedte', dims);
  assertClose(oppervlakte, 20);

  const perimeter = calculatePerimeter('lengte-breedte', dims);
  assertClose(perimeter, 18);
  assert.equal(calculateOpsluitbandenMeter(perimeter), 18);

  assert.equal(TEGEL_FORMATEN['60x60'].oppervlakteM2, 0.36);
  assert.equal(calculateAantalTegels(oppervlakte, '60x60'), 62); // ceil(20*1.10/0.36) = ceil(61.11) = 62

  const zandbedM3 = calculateZandbedM3(oppervlakte);
  assertClose(zandbedM3, 2.0);
  assertClose(calculateZandbedKg(zandbedM3), 3200);
});

test('bestrating, directe m²-invoer: 10 m², tegel 30x30 -> 123 tegels, geen opsluitbanden-schatting', () => {
  const dims = { oppervlakteM2: 10 };
  const oppervlakte = calculateOppervlakte('direct-m2', dims);
  assertClose(oppervlakte, 10);

  const perimeter = calculatePerimeter('direct-m2', dims);
  assert.equal(perimeter, null);
  assert.equal(calculateOpsluitbandenMeter(perimeter), null);

  assert.equal(calculateAantalTegels(oppervlakte, '30x30'), 123); // ceil(10*1.10/0.09) = ceil(122.22) = 123
});

test('egaline: 15 m² bij 5 mm -> 132 kg incl. marge, 6 zakken van 25 kg', () => {
  const gewichtKg = calculateEgalineGewichtKg(15, 5);
  assertClose(gewichtKg, 132); // 15*5*1.6 = 120, *1.10 = 132
  assert.equal(calculateEgalineZakken(15, 5), 6); // ceil(132/25) = ceil(5.28) = 6
});

test('randgevallen: 0 m², lege/ongeldige invoer -> 0, geen NaN of crash', () => {
  assert.equal(calculateOppervlakte('lengte-breedte', { lengte: 0, breedte: 5 }), 0);
  assert.equal(calculateOppervlakte('direct-m2', { oppervlakteM2: '' }), 0);
  assert.equal(calculateAantalTegels(0, '60x60'), 0);
  assert.equal(calculateAantalTegels(10, 'onbekend-formaat'), 0);
  assert.equal(calculateZandbedM3(0), 0);
  assert.equal(calculateZandbedKg(0), 0);
  assert.equal(calculateEgalineGewichtKg(0, 5), 0);
  assert.equal(calculateEgalineGewichtKg(10, 0), 0);
  assert.equal(calculateEgalineZakken(0, 5), 0);
  const perimeter = calculatePerimeter('lengte-breedte', { lengte: '', breedte: 'abc' });
  assert.equal(Number.isNaN(perimeter), false);
  assert.equal(perimeter, 0);
});

test('randgeval: extreme invoer blijft eindig, geen NaN of Infinity-crash', () => {
  const oppervlakte = calculateOppervlakte('lengte-breedte', { lengte: 1e6, breedte: 1e6 });
  assert.ok(Number.isFinite(oppervlakte));
  assert.ok(Number.isFinite(calculateAantalTegels(oppervlakte, '60x60')));
  assert.ok(Number.isFinite(calculateZandbedKg(calculateZandbedM3(oppervlakte))));
  assert.ok(Number.isFinite(calculateEgalineZakken(oppervlakte, 1e6)));
});
