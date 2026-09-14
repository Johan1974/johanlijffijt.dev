const { test } = require('node:test');
const assert = require('node:assert/strict');
const UblCore = require('../site-tools-staging/ubl-validator/ubl-core.js');

test('valid UBL Invoice root -> valid, documentType Invoice', () => {
  const result = UblCore.checkRootElement({
    hasParseError: false,
    localName: 'Invoice',
    namespaceURI: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2'
  });
  assert.equal(result.valid, true);
  assert.equal(result.documentType, 'Invoice');
  assert.deepEqual(result.issues, []);
});

test('valid UBL CreditNote root -> valid, documentType CreditNote', () => {
  const result = UblCore.checkRootElement({
    hasParseError: false,
    localName: 'CreditNote',
    namespaceURI: 'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2'
  });
  assert.equal(result.valid, true);
  assert.equal(result.documentType, 'CreditNote');
});

test('parse error (not well-formed XML) -> invalid, no crash', () => {
  const result = UblCore.checkRootElement({
    hasParseError: true,
    parseErrorMessage: 'mismatched tag'
  });
  assert.equal(result.valid, false);
  assert.equal(result.documentType, null);
  assert.match(result.issues[0], /not well-formed/i);
});

test('unrecognized root element (e.g. plain <root>) -> invalid, explains expected types', () => {
  const result = UblCore.checkRootElement({
    hasParseError: false,
    localName: 'root',
    namespaceURI: null
  });
  assert.equal(result.valid, false);
  assert.match(result.issues[0], /Invoice.*CreditNote/);
});

test('correct local name but wrong/missing namespace -> invalid, not silently accepted', () => {
  const result = UblCore.checkRootElement({
    hasParseError: false,
    localName: 'Invoice',
    namespaceURI: null
  });
  assert.equal(result.valid, false);
  assert.match(result.issues[0], /namespace/i);
});

test('empty/missing input -> invalid, no crash', () => {
  assert.equal(UblCore.checkRootElement({}).valid, false);
  assert.equal(UblCore.checkRootElement(undefined).valid, false);
  assert.equal(UblCore.checkRootElement(null).valid, false);
});

test('parseXmlDocument throws a clear error outside a browser (no DOMParser)', () => {
  assert.throws(() => UblCore.parseXmlDocument('<Invoice></Invoice>'), /DOMParser/);
});
