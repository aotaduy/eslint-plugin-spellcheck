//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/spell-checker'),
    RuleTester = require('eslint').RuleTester;
var fs = require('fs');
var txt = "var helloHowAreYou = 1234 // this is a test for camel case 2nd time zeta ;\n";

for (var i = 0; i < 12; i++) {
  txt = txt + txt;
}
console.log(txt.length);
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
    env: {
        'es6': true
    }
});

ruleTester.run('spellcheck/spell-checker', rule, {
    valid: [
      txt
    ],
    invalid: [
    ]
});
