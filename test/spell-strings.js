//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/spell-strings', {
    valid: [
        'var a = \'Hello how are you this is a string\'',
        'var a = \'ArrayBuffer\''
    ],
    invalid: [
        {
            code: 'var a = \'Hello tsih is a srting\'',
            errors: [
                { message: 'You have a misspelled word: tsih on a String'},
                { message: 'You have a misspelled word: srting on a String'}]
        }
    ]
});
