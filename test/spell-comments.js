//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/spell-comments', {
    valid: [
        'var a = 1 // This is a comment',
        'var a = 2 /* This is a Block Comment */',
        'var a = 2 //Array'
    ],
    invalid: [
        {
            code: 'var a = 1 // tsih is a comment srting',
            errors: [
                { message: 'You have a misspelled word: tsih on a Comment'},
                { message: 'You have a misspelled word: srting on a Comment'}]
        },
        {
            code: 'var a = 1 /* tsih is a comment srting Block */ ',
            errors: [
                { message: 'You have a misspelled word: tsih on a Comment'},
                { message: 'You have a misspelled word: srting on a Comment'}]
        }

    ]
});
