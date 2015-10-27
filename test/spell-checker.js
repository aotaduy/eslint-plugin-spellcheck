//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/spell-checker', {
    valid: [
        'var a = 1 // This is a comment',
        'var a = 2 /* This is a Block Comment */',
        'var a = 2 //Array',
        'var angular = thisIsATest(of_a_snake_case)',
        'var a = function testingCamelCase(each){};',
        'var a = RegExp',
        'var a = \'Hello how are you this is a string\'',
        'var a = \'ArrayBuffer\'',
        {
            code: 'var url = "http://examplus.com"',
            args:[2, {skipWords: ['url'], skipIfMatch:['http://[^\s]*']}]
        },

    ],
    invalid: [
        {
            code: 'var a = 1 // tsih is a comment srting dict',
            args:[2, {skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'},
                { message: 'You have a misspelled word: srting on Comment'}]
        },
        {
            code: 'var ajhasd = \'liasdfuhn\' // tsih is a comment srting dict',
            args:[2, {strings: false, identifiers: false, skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'},
                { message: 'You have a misspelled word: srting on Comment'}]
        },
        {
            code: 'var a = \'liasdfuhn\' // tsih is a comment srting dict',
            args:[2, {comments: false, strings: true, skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: liasdfuhn on String'}]
        },
        {
            code: 'var a = 1 // tsih is a comment srting dict',
            args:[2, {skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'},
                { message: 'You have a misspelled word: srting on Comment'}]
        },
        {
            code: 'var url = "http://examplus.com"',
            args:[2, {skipWords: ['url']}],
            errors: [
                { message: 'You have a misspelled word: http on String'},
                { message: 'You have a misspelled word: examplus on String'}]
        },
        {
            code: 'var a = 1 /* tsih is a comment srting Block */ ',
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'},
                { message: 'You have a misspelled word: srting on Comment'}]
        },
        {
            code: 'var angular = tsihIsATest(of_a_snake_case_srting)',
            errors: [
                { message: 'You have a misspelled word: tsih on Identifier'},
                { message: 'You have a misspelled word: srting on Identifier'}]
        },
        {
            code: 'var a = \'Hello tsih is a srting\'',
            errors: [
                { message: 'You have a misspelled word: tsih on String'},
                { message: 'You have a misspelled word: srting on String'}]
        }

    ]
});
