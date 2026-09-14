// Pure rekenlogica voor de Bouw- & Tuinmateriaal Calculator — geen DOM, geen dependencies.
// Werkt zowel als plain <script> in de browser (definieert window.CalculatorCore) als via
// require() in de Node-testrunner (module.exports), zonder build-stap in beide gevallen.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CalculatorCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var MATERIALS = {
    zand:      { label: 'Zand / Ophoogzand',    inklinking: 0.10, dichtheid: 1600 },
    grind:     { label: 'Grind / Split',         inklinking: 0.10, dichtheid: 1500 },
    schors:    { label: 'Boomschors',            inklinking: 0.20, dichtheid: 250  },
    tuinaarde: { label: 'Tuinaarde / Compost',   inklinking: 0.15, dichtheid: 800  }
  };

  // dims: { lengte, breedte } voor 'rechthoek', of { diameter } voor 'rond'. Waarden mogen
  // strings, getallen, leeg of ongeldig zijn — net als een <input type="number">.value.
  function calculateOppervlakte(shape, dims) {
    if (shape === 'rechthoek') {
      var lengte = parseFloat(dims.lengte) || 0;
      var breedte = parseFloat(dims.breedte) || 0;
      return lengte * breedte;
    }
    var diameter = parseFloat(dims.diameter) || 0;
    var straal = diameter / 2;
    return Math.PI * straal * straal;
  }

  function calculateVolumeInclInklinking(oppervlakte, laagdikteCm, inklinking) {
    var laagdikteM = (parseFloat(laagdikteCm) || 0) / 100;
    var volumeBasis = oppervlakte * laagdikteM;
    return volumeBasis * (1 + inklinking);
  }

  function calculateBigBags(volumeIncl, bagSizeM3) {
    return volumeIncl > 0 ? Math.ceil(volumeIncl / bagSizeM3) : 0;
  }

  function calculateGewichtKg(volumeIncl, dichtheid) {
    return volumeIncl * dichtheid;
  }

  return {
    MATERIALS: MATERIALS,
    calculateOppervlakte: calculateOppervlakte,
    calculateVolumeInclInklinking: calculateVolumeInclInklinking,
    calculateBigBags: calculateBigBags,
    calculateGewichtKg: calculateGewichtKg
  };
});
