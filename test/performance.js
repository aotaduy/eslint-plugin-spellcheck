//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/spell-checker'),
RuleTester = require('eslint').RuleTester;
var validCases = [];
var invalidCases = [];
var invalidMessages = [{'message': 'You have a misspelled word: helo on Identifier'}];
var txtValid = 'var helloHowAreYou = 1234; // this is a test for camel case 2nd time zeta';
var txtInvalid = 'var heloHowAreYou = 1234; // this is a test for camel case 2nd time zeta';

for (var i = 0; i < 12; i++) {
  validCases.push({'code': txtValid});
  invalidCases.push({
    'code': txtInvalid,
    'errors': invalidMessages });
}
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
  env: {
      'es6': true
  }
});

ruleTester.run('spellcheck/spell-checker', rule, {
    valid: validCases,
    invalid: invalidCases
});
