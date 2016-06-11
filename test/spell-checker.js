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
        'var MY_ACTION = "MY_ACTION"',
        'var MY_ACTION2 = "MY_ACTION2"',
        'var a = 1 // This is MY_ACTION',

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
        },
        {
            code: 'var a = 1 // colour cheque behaviour tsih',
            args:[2, {lang: 'en_GB', skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'}]
        },
        {
            code: 'var a = 1 // color is a comment behavior dict',
            args:[2, {lang: 'en_GB', skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: color on Comment'},
                { message: 'You have a misspelled word: behavior on Comment'}]
        },
        {
            code: 'var MY_ACTOIN = "MY_ATCION"',
            errors: [
                { message: 'You have a misspelled word: actoin on Identifier'},
                { message: 'You have a misspelled word: atcion on String'}]
        },
        {
            code: 'var MY_ACTOIN2 = "MY_ATCION2"',
            errors: [
                { message: 'You have a misspelled word: actoin on Identifier'},
                { message: 'You have a misspelled word: atcion on String'}]
        },
        {
            code: 'var a = 1 // This is MY_ACTOIN',
            errors: [
                { message: 'You have a misspelled word: actoin on Comment'}]
        }

    ]
});
