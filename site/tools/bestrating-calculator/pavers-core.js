// Pure rekenlogica voor de Terras, Bestrating & Egaline Calculator — geen DOM, geen dependencies.
// Zelfde UMD-patroon als calculator-core.js (materiaalcalculator): werkt als plain <script> in de
// browser (window.PaversCore) en via require() in de Node-testrunner, geen build-stap nodig.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PaversCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var TEGEL_FORMATEN = {
    '60x60': { label: '60 × 60 cm', oppervlakteM2: 0.36 },
    '30x30': { label: '30 × 30 cm', oppervlakteM2: 0.09 },
    '20x30': { label: '20 × 30 cm', oppervlakteM2: 0.06 }
  };

  var SNIJVERLIES = 0.10;
  var ZANDBED_LAAGDIKTE_M = 0.10; // 10 cm adviesdikte
  var ZANDBED_DICHTHEID = 1600; // kg/m3 — zelfde vuistgewicht als zand in de materiaalcalculator
  var EGALINE_KG_PER_M2_PER_MM = 1.6; // vuistregel, praktijkgemiddelde voor zelfnivellerende mortel
  var EGALINE_MARGE = 0.10;
  var EGALINE_ZAK_KG = 25;

  // dims: { lengte, breedte } bij 'lengte-breedte', of { oppervlakteM2 } bij 'direct-m2'.
  function calculateOppervlakte(oppervlakteMode, dims) {
    if (oppervlakteMode === 'lengte-breedte') {
      var lengte = parseFloat(dims.lengte) || 0;
      var breedte = parseFloat(dims.breedte) || 0;
      return lengte * breedte;
    }
    return parseFloat(dims.oppervlakteM2) || 0;
  }

  // Omtrek is alleen te bepalen bij lengte×breedte-invoer — bij directe m²-invoer kennen we de
  // vorm niet, dus geen opsluitbanden-schatting mogelijk (geeft null, geen gegokte waarde).
  function calculatePerimeter(oppervlakteMode, dims) {
    if (oppervlakteMode !== 'lengte-breedte') return null;
    var lengte = parseFloat(dims.lengte) || 0;
    var breedte = parseFloat(dims.breedte) || 0;
    return 2 * (lengte + breedte);
  }

  function calculateAantalTegels(oppervlakteM2, tegelFormaatKey) {
    var tegel = TEGEL_FORMATEN[tegelFormaatKey];
    if (!tegel || !(oppervlakteM2 > 0)) return 0;
    var effectieveOppervlakte = oppervlakteM2 * (1 + SNIJVERLIES);
    return Math.ceil(effectieveOppervlakte / tegel.oppervlakteM2);
  }

  function calculateOpsluitbandenMeter(perimeterM) {
    if (perimeterM === null || perimeterM === undefined || !(perimeterM > 0)) return null;
    return Math.ceil(perimeterM);
  }

  function calculateZandbedM3(oppervlakteM2) {
    return (oppervlakteM2 > 0 ? oppervlakteM2 : 0) * ZANDBED_LAAGDIKTE_M;
  }

  function calculateZandbedKg(zandbedM3) {
    return zandbedM3 * ZANDBED_DICHTHEID;
  }

  function calculateEgalineGewichtKg(oppervlakteM2, laagdikteMm) {
    var laagdikte = parseFloat(laagdikteMm) || 0;
    if (!(oppervlakteM2 > 0) || !(laagdikte > 0)) return 0;
    var kgNodig = oppervlakteM2 * laagdikte * EGALINE_KG_PER_M2_PER_MM;
    return kgNodig * (1 + EGALINE_MARGE);
  }

  function calculateEgalineZakken(oppervlakteM2, laagdikteMm) {
    var gewichtKg = calculateEgalineGewichtKg(oppervlakteM2, laagdikteMm);
    if (!(gewichtKg > 0)) return 0;
    return Math.ceil(gewichtKg / EGALINE_ZAK_KG);
  }

  return {
    TEGEL_FORMATEN: TEGEL_FORMATEN,
    SNIJVERLIES: SNIJVERLIES,
    ZANDBED_LAAGDIKTE_M: ZANDBED_LAAGDIKTE_M,
    ZANDBED_DICHTHEID: ZANDBED_DICHTHEID,
    EGALINE_KG_PER_M2_PER_MM: EGALINE_KG_PER_M2_PER_MM,
    EGALINE_MARGE: EGALINE_MARGE,
    EGALINE_ZAK_KG: EGALINE_ZAK_KG,
    calculateOppervlakte: calculateOppervlakte,
    calculatePerimeter: calculatePerimeter,
    calculateAantalTegels: calculateAantalTegels,
    calculateOpsluitbandenMeter: calculateOpsluitbandenMeter,
    calculateZandbedM3: calculateZandbedM3,
    calculateZandbedKg: calculateZandbedKg,
    calculateEgalineGewichtKg: calculateEgalineGewichtKg,
    calculateEgalineZakken: calculateEgalineZakken
  };
});
