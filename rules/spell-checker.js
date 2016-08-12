// Native modules
var fs = require('fs');

// 3rd party dependencies
var lodash = require('lodash'),
    Spellchecker = require('hunspell-spellchecker'),
    globals = require('globals');

var spell = new Spellchecker(),
    dictionary,
    skipWords = lodash.union(
        lodash.keys(globals.builtin),
        lodash.keys(globals.browser),
        lodash.keys(globals.node),
        lodash.keys(globals.mocha),
        lodash.keys(globals.jasmine),
        lodash.keys(globals.jquery),
        lodash.keys(globals.shelljs)
    );

module.exports = {
    // meta (object) contains metadata for the rule:
    meta: {
        // docs (object) is required for core rules of ESLint.
        // In a custom rule or plugin, you can omit docs or include any properties that you need in it.
        docs: {

            // provides the short description of the rule in the rules index
            description: 'spell check',

            // specifies the heading under which the rule is listed in the rules index
            category: 'Possible Errors',

            // is whether the 'extends': 'eslint:recommended' property in a configuration file enables the rule
            recommended: false
        },

        // fixable (string) is either 'code' or 'whitespace' if the --fix option on the command line automatically fixes problems reported by the rule
        // Important: Without the fixable property, ESLint does not apply fixes even if the rule implements fix functions. Omit the fixable property if the rule is not fixable.
        fixable: 'code',

        // specifies the options so ESLint can prevent invalid rule configurations
        schema: [
            {
                type: 'object',
                properties: {
                    comments: {
                        type: 'boolean',
                        default: true
                    },
                    strings: {
                        type: 'boolean',
                        default: true
                    },
                    identifiers: {
                        type: 'boolean',
                        default: true
                    },
                    templates: {
                        type: 'boolean',
                        default: true
                    },
                    lang: {
                        type: 'string',
                        default: 'en_US'
                    },
                    skipWords: {
                        type: 'array',
                        default: [
                            'dict',
                            'aff',
                            'hunspellchecker',
                            'hunspell',
                            'utils'
                        ]
                    },
                    skipIfMatch: {
                        type: 'array',
                        default: []
                    }
                },
                additionalProperties: false
            }
        ]

    },

    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree (AST as defined by ESTree) of JavaScript code:
    create: function(context) {
        /*
        if a key is a node type, ESLint calls that visitor function while going down the tree
        if a key is a node type plus :exit, ESLint calls that visitor function while going up the tree
        if a key is an event name, ESLint calls that handler function for code path analysis
        */

        'use strict';
        var defaultOptions = {
            comments: true,
            strings: true,
            identifiers: true,
            templates: true,
            skipWords: [],
            skipIfMatch: []
        },
        options = lodash.assign(defaultOptions, context.options[0]),
        lang = options.lang || 'en_US';

        dictionary = spell.parse({
          aff: fs.readFileSync(__dirname + '/utils/dicts/' + lang + '.aff'),
          dic: fs.readFileSync(__dirname + '/utils/dicts/' + lang + '.dic')
        });

        spell.use(dictionary);

        options.skipWords = lodash.union(options.skipWords, skipWords)
            .map(function (string) {
                return string.toLowerCase();
            });

        function checkSpelling(aNode, value, spellingType) {
            if(!hasToSkip(value)) {
                var nodeWords = value.replace(/[^0-9a-zA-Z ']/g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase().split(' ');
                nodeWords
                    .filter(function(aWord) {
                    return !lodash.includes(options.skipWords, aWord) && !spell.check(aWord);
                })
                    .filter(function(aWord) { // Split words by numbers for special cases such as test12anything78variable and to include 2nd and 3rd ordinals
                        var splitByNumberWords = aWord.replace(/[0-9']/g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase().split(' ');
                        return splitByNumberWords.some(function (aWord) {
                            return !lodash.includes(options.skipWords, aWord) && !spell.check(aWord);
                        });
                    })
                    .forEach(function(aWord) {
                        context.report(
                            aNode,
                            'You have a misspelled word: {{word}} on {{spellingType}}',
                            { word: aWord,
                                spellingType: spellingType}
                        );
                });
            }
        }

        function checkComment(aNode) {
            if(options.comments) {
                checkSpelling(aNode, aNode.value, 'Comment');
            }
        }

        function checkLiteral(aNode){
            if(options.strings && typeof aNode.value === 'string') {
                checkSpelling(aNode, aNode.value, 'String');
            }
        }
        function checkTemplateElement(aNode){
            if(options.templates && typeof aNode.value.raw === 'string') {
                checkSpelling(aNode, aNode.value.raw, 'Template');
            }
        }

        function checkIdentifier(aNode) {
            if(options.identifiers) {
                checkSpelling(aNode, aNode.name, 'Identifier');
            }
        }
        /* Returns true if the string in value has to be skipped for spell checking */
        function hasToSkip(value) {
            return lodash.includes(options.skipWords, value) ||
                lodash.find(options.skipIfMatch, function (aPattern) {
                    return value.match(aPattern);
                });
        }

        return {
            'BlockComment': checkComment,
            'LineComment': checkComment,
            'Literal': checkLiteral,
            'TemplateElement': checkTemplateElement,
            'Identifier': checkIdentifier
        };
    }
};
