//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/spell-identifiers', {
    valid: [
        'var angular = thisIsATest(of_a_snake_case)',
        'var a = function testingCamelCase(each){};',
        'var a = RegExp'
    ],
    invalid: [
        {
            code: 'var angular = tsihIsATest(of_a_snake_case_srting)',
            errors: [
                { message: 'You have a misspelled word: tsih on an Identifier'},
                { message: 'You have a misspelled word: srting on an Identifier'}]
        },
    ]
});
