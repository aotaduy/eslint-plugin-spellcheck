//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../rules/spell-checker'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
    env: {
        'es6': true
    },

    parserOptions: {
      "ecmaVersion": 2018,
      "sourceType": "module",
        ecmaFeatures: {
            "modules": true
        }
    }
});

ruleTester.run('spellcheck/spell-checker', rule, {
    valid: [
        'var a = 1 // This is a comment',
        'var this2 = 1 // This shouldn\'t fail, not the first or the 2nd time',
        'var test12anything78variable = 1 // This shouldn\'t fail, not the first or \'the\' 3rd time',
        'var a = 2 /* This is a Block Comment */',
        'var a = 2 //Array',
        'var angular = thisIsATest(of_a_snake_case)',
        'var a = new RegExp(`\^Card\\sreader\\xAAnot\\uFFFFconnected\\sin\\s${ numberOfSeconds }s\\.`);',
        'var a = new RegExp(`\^Card\\sreader\\snot\\sconnected\\sin\\s${ numberOfSeconds }s\\.`);',
        'var a = function testingCamelCase(each){};',
        'var a = RegExp',
        'var a = "January"',
        'var a = "#AACC00"',
        'var a = \'Hello how are you this is a string\'',
        'var a = \'ArrayBuffer\'',
        'var a = \'foobar\'.substring(0,1)',
        'var a = JSON.stringify({})',
        'var url = "http://examplus.com"',
        'var a = Math.trunc(-0.1)',
        {
            code: 'var pack = require("webpack")',
            options:[{ignoreRequire: true}]
        },
        'import Foo from "component/Foo"',
        'import { Foo } from "component/Foo"',
        'export { Foo } from "component/Foo"',
        {
            code: 'var url = "http://examplus.com"',
            options:[{skipWords: ['url'], skipIfMatch:['http://[^\s]*']}]
        },
        {
            code: 'var myOrmFunctions = "myElement"',
            options:[{minLength: 4}]
        },
        {
            code: 'var myOrmFunctions = "myElement"',
            options:[{skipWordIfMatch: ['^.{1,3}$']}]
        },
        {
            code: 'var source = \'<div className="video-img">\'',
            options:[{skipIfMatch:['=".*"']}]
        },
        {
            code: 'var source = \'Добрый день, как ваши дела?\' // Комментарий',
            options:[
                {
                    lang: { strings: 'ru_RU', comments: 'ru_RU', templates: 'ru_RU', identifiers: 'en_US' }
                }
            ]
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
            code: 'var a = 1 /* tsih is a comment srting Block */ ',
            errors: [
                { message: 'You have a misspelled word: tsih on Comment'},
                { message: 'You have a misspelled word: srting on Comment'}]
        },
        {
            code: 'var test12anthing78variable = 1 // This shuldn\'t fail, not the first or the 3rd time ',
            errors: [
                { message: 'You have a misspelled word: test12anthing78variable on Identifier'}]
        },
        {
            code: 'var angular = tsihIsATest(of_a_snake_case_srting)',
            errors: [
                { message: 'You have a misspelled word: tsih on Identifier'},
                { message: 'You have a misspelled word: srting on Identifier'}]
        },
        {
            code: 'var xe = "myElement"',
            options:[{minLength: 2}],
            errors: [
                { message: 'You have a misspelled word: xe on Identifier'}
            ]
        },
        {
            code: 'var myOrmFunctions = "myElement"',
            options:[{skipWordIfMatch: ['^.{1,2}$']}],
            errors: [
                { message: 'You have a misspelled word: Orm on Identifier'}
            ]
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
        },
        // test australian spelling
        {
            code: 'var a = 1 // guerilla\'s stole zucchini from the Nullarbor shrubland (AU)',
            options:[{ lang: 'en_AU' }],
            errors: [
                { message: 'You have a misspelled word: guerilla\'s on Comment' },
                { message: 'You have a misspelled word: shrubland on Comment' },
            ],
        },
        {
            code: 'var a = 1 // guerilla\'s stole zucchini from the Nullarbor shrubland (GB)',
            options:[{ lang: 'en_GB' }],
            errors: [
                { message: 'You have a misspelled word: zucchini on Comment' },
                { message: 'You have a misspelled word: Nullarbor on Comment' },
            ],
        },
        {
            code: 'var pack = require("webpack")',
            options:[{ignoreRequire:false}],
            errors: [
                { message: 'You have a misspelled word: webpack on String'}]
        },
        {
            code: 'var souuurce = \'Дбрый день, как ваши дшла?\' // Комментарий',
            options:[
                {
                    lang: { strings: 'ru_RU', comments: 'ru_RU', templates: 'ru_RU', identifiers: 'en_US' }
                }
            ],
            errors: [
                { message: 'You have a misspelled word: souuurce on Identifier'},
                { message: 'You have a misspelled word: Дбрый on String'},
                { message: 'You have a misspelled word: дшла on String'},
            ]
        }
    ]
});
