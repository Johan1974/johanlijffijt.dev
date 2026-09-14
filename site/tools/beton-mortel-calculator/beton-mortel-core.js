// Pure rekenlogica voor de Beton & Mortel Calculator — geen DOM, geen dependencies.
// Zelfde UMD-patroon als pavers-core.js/calculator-core.js: werkt als plain <script> in de
// browser (window.BetonMortelCore) en via require() in de Node-testrunner, geen build-stap nodig.
//
// Aannames (met Johan afgestemd, zie ROADMAP.md/TODO.md-sessie 14-09-2026):
// - Beton, kant-en-klare zakken: 25 kg droge betonmix ≈ 12,5 liter natte beton (NL-vuistregel).
// - Beton, zelf mengen: mengverhouding cement:zand:grind ≈ 1:2:3 volumedelen, uitgedrukt als de
//   gangbare referentietabel 300 kg cement / 600 kg zand / 1200 kg grind per m³ gestort beton.
// - Mortel/metselspecie: 100 stenen/m² bij waalformaat (210×100×50 mm) met 10 mm voeg — geometrisch
//   afgeleid mortelvolume per steenmodule (220×10×100 mm beganggevoeg + 10×50×100 mm stootvoeg)
//   ≈ 0,27 l/steen, afgerond op 25 l/m² natte specie. Mengverhouding cement:zand 1:4 volumedelen
//   (totaal 5 delen), dichtheid natte metselspecie ≈ 1900 kg/m³.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BetonMortelCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var BETON_ZAK_KG = 25;
  var BETON_ZAK_LITER = 12.5;
  var BETON_MIX_PER_M3 = { cementKg: 300, zandKg: 600, grindKg: 1200 };

  var MORTEL_STENEN_PER_M2 = 100;
  var MORTEL_LITER_PER_M2 = 25;
  var MORTEL_DICHTHEID = 1900; // kg/m3, natte metselspecie
  var MORTEL_ZAK_KG = 25;
  var MORTEL_CEMENT_DELEN = 1;
  var MORTEL_ZAND_DELEN = 4;

  // Voorkomt dat drijvendekommafouten (bv. 3*2*0.1 = 0.6000000000000001) een extra zak optellen.
  function safeCeil(n) {
    return Math.ceil(Math.round(n * 1e6) / 1e6);
  }

  // dims: { lengte, breedte, dikteCm } bij 'afmetingen', of { volumeM3 } bij 'direct-m3'.
  function calculateBetonVolumeM3(volumeMode, dims) {
    if (volumeMode === 'afmetingen') {
      var lengte = parseFloat(dims.lengte) || 0;
      var breedte = parseFloat(dims.breedte) || 0;
      var dikteM = (parseFloat(dims.dikteCm) || 0) / 100;
      return lengte * breedte * dikteM;
    }
    return parseFloat(dims.volumeM3) || 0;
  }

  function calculateBetonZakLiter(volumeM3) {
    return (volumeM3 > 0 ? volumeM3 : 0) * 1000;
  }

  function calculateBetonZakken(volumeM3) {
    var liter = calculateBetonZakLiter(volumeM3);
    return liter > 0 ? safeCeil(liter / BETON_ZAK_LITER) : 0;
  }

  function calculateBetonZelfMengen(volumeM3) {
    var v = volumeM3 > 0 ? volumeM3 : 0;
    var cementKg = v * BETON_MIX_PER_M3.cementKg;
    return {
      cementKg: cementKg,
      cementZakken: cementKg > 0 ? safeCeil(cementKg / BETON_ZAK_KG) : 0,
      zandKg: v * BETON_MIX_PER_M3.zandKg,
      grindKg: v * BETON_MIX_PER_M3.grindKg
    };
  }

  // stenenMode: 'oppervlakte' -> dims = { m2 }, 'stenen' -> dims = { aantalStenen }.
  function calculateMortelM2(stenenMode, dims) {
    if (stenenMode === 'stenen') {
      var aantalStenen = parseFloat(dims.aantalStenen) || 0;
      return aantalStenen > 0 ? aantalStenen / MORTEL_STENEN_PER_M2 : 0;
    }
    return parseFloat(dims.m2) || 0;
  }

  function calculateStenenNodig(m2) {
    return m2 > 0 ? safeCeil(m2 * MORTEL_STENEN_PER_M2) : 0;
  }

  function calculateMortelLiter(m2) {
    return (m2 > 0 ? m2 : 0) * MORTEL_LITER_PER_M2;
  }

  function calculateMortelKg(m2) {
    return calculateMortelLiter(m2) * (MORTEL_DICHTHEID / 1000);
  }

  function calculateMortelZakken(m2) {
    var kg = calculateMortelKg(m2);
    return kg > 0 ? safeCeil(kg / MORTEL_ZAK_KG) : 0;
  }

  function calculateMortelCementKg(m2) {
    var totaalDelen = MORTEL_CEMENT_DELEN + MORTEL_ZAND_DELEN;
    return calculateMortelKg(m2) * (MORTEL_CEMENT_DELEN / totaalDelen);
  }

  function calculateMortelZandKg(m2) {
    var totaalDelen = MORTEL_CEMENT_DELEN + MORTEL_ZAND_DELEN;
    return calculateMortelKg(m2) * (MORTEL_ZAND_DELEN / totaalDelen);
  }

  return {
    BETON_ZAK_KG: BETON_ZAK_KG,
    BETON_ZAK_LITER: BETON_ZAK_LITER,
    BETON_MIX_PER_M3: BETON_MIX_PER_M3,
    MORTEL_STENEN_PER_M2: MORTEL_STENEN_PER_M2,
    MORTEL_LITER_PER_M2: MORTEL_LITER_PER_M2,
    MORTEL_DICHTHEID: MORTEL_DICHTHEID,
    MORTEL_ZAK_KG: MORTEL_ZAK_KG,
    MORTEL_CEMENT_DELEN: MORTEL_CEMENT_DELEN,
    MORTEL_ZAND_DELEN: MORTEL_ZAND_DELEN,
    calculateBetonVolumeM3: calculateBetonVolumeM3,
    calculateBetonZakLiter: calculateBetonZakLiter,
    calculateBetonZakken: calculateBetonZakken,
    calculateBetonZelfMengen: calculateBetonZelfMengen,
    calculateMortelM2: calculateMortelM2,
    calculateStenenNodig: calculateStenenNodig,
    calculateMortelLiter: calculateMortelLiter,
    calculateMortelKg: calculateMortelKg,
    calculateMortelZakken: calculateMortelZakken,
    calculateMortelCementKg: calculateMortelCementKg,
    calculateMortelZandKg: calculateMortelZandKg
  };
});
