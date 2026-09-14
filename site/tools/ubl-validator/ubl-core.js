// Pure validation logic for the UBL/Peppol Validator — no DOM required for the exported
// checkRootElement(), so it runs identically in the browser and under the Node test runner. Same
// UMD pattern as beton-mortel-core.js/pavers-core.js: plain <script> in the browser
// (window.UblCore) and require() in tests, no build step, no dependencies.
//
// Phase 1 scope (deliberately narrow — see ROADMAP.md/TODO.md, agreed with Johan 14-09-2026):
// only checks that the file is well-formed XML AND that its root element is a recognized UBL 2.1
// Invoice or CreditNote (the two Peppol BIS Billing 3.0 document types). It does NOT check any
// business rules, mandatory fields, or full Peppol BIS Billing 3.0 schema/schematron compliance —
// the page copy must say so explicitly to avoid overclaiming.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.UblCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DOCUMENT_TYPES = {
    Invoice: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
    CreditNote: 'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2'
  };

  // parsedInfo: { localName, namespaceURI, hasParseError, parseErrorMessage } — a plain object so
  // this function is testable without a real XML parser. See parseXmlDocument() below for how the
  // browser produces this shape from an actual file via DOMParser.
  function checkRootElement(parsedInfo) {
    var info = parsedInfo || {};

    if (info.hasParseError) {
      return {
        valid: false,
        documentType: null,
        issues: ['Not well-formed XML: ' + (info.parseErrorMessage || 'the file could not be parsed.')]
      };
    }

    if (!info.localName) {
      return {
        valid: false,
        documentType: null,
        issues: ['No root element found — is this an XML file?']
      };
    }

    var expectedNamespace = DOCUMENT_TYPES[info.localName];

    if (!expectedNamespace) {
      return {
        valid: false,
        documentType: null,
        issues: [
          'Root element is <' + info.localName + '> — expected <Invoice> or <CreditNote> ' +
          '(the two UBL/Peppol document types this checker recognizes).'
        ]
      };
    }

    if (info.namespaceURI !== expectedNamespace) {
      return {
        valid: false,
        documentType: null,
        issues: [
          'Root element <' + info.localName + '> does not use the UBL 2.1 namespace ' +
          '(' + expectedNamespace + '). Found: ' + (info.namespaceURI || 'no namespace') + '.'
        ]
      };
    }

    return { valid: true, documentType: info.localName, issues: [] };
  }

  // Browser-only: turns a raw XML string into the parsedInfo shape above via the native
  // DOMParser — deliberately not reimplemented as custom parsing logic, since a hand-rolled XML
  // parser risks silent false positives/negatives that a validator can never afford. Not called,
  // and not testable, under Node (no DOMParser there); checkRootElement() is the tested unit.
  function parseXmlDocument(xmlString) {
    if (typeof DOMParser === 'undefined') {
      throw new Error('parseXmlDocument() requires a browser DOMParser.');
    }
    var doc = new DOMParser().parseFromString(xmlString || '', 'application/xml');
    var parserError = doc.getElementsByTagName('parsererror')[0];
    if (parserError) {
      return { hasParseError: true, parseErrorMessage: parserError.textContent.trim() };
    }
    var rootEl = doc.documentElement;
    if (!rootEl || rootEl.nodeName === 'parsererror') {
      return { hasParseError: true, parseErrorMessage: 'no root element' };
    }
    return {
      hasParseError: false,
      localName: rootEl.localName || rootEl.nodeName,
      namespaceURI: rootEl.namespaceURI || null
    };
  }

  return {
    DOCUMENT_TYPES: DOCUMENT_TYPES,
    checkRootElement: checkRootElement,
    parseXmlDocument: parseXmlDocument
  };
});
