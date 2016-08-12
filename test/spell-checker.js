//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/spell-checker'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('spellcheck/spell-checker', rule, {
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
            options:[{skipWords: ['url'], skipIfMatch:['http://[^\s]*']}]
        },

    ],
    invalid: [
        {
            code: 'var a = 1 // tsih is a comment srting dict',
            options:[{skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'},
                { message: 'You have a misspelled word: srting on Comment'}]
        },
        {
            code: 'var ajhasd = \'liasdfuhn\' // tsih is a comment srting dict',
            options:[{strings: false, identifiers: false, skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'},
                { message: 'You have a misspelled word: srting on Comment'}]
        },
        {
            code: 'var a = \'liasdfuhn\' // tsih is a comment srting dict',
            options:[{comments: false, strings: true, skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: liasdfuhn on String'}]
        },
        {
            code: 'var a = 1 // tsih is a comment srting dict',
            options:[{skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'},
                { message: 'You have a misspelled word: srting on Comment'}]
        },
        {
            code: 'var url = "http://examplus.com"',
            options:[{skipWords: ['url']}],
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
            options:[{lang: 'en_GB', skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'}]
        },
        {
            code: 'var a = 1 // color is a comment behavior dict',
            options:[{lang: 'en_GB', skipWords: ['dict']}],
            errors: [
                { message: 'You have a misspelled word: color on Comment'},
                { message: 'You have a misspelled word: behavior on Comment'}]
        }

    ]
});
