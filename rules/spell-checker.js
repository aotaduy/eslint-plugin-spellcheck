// Native modules
var fs = require('fs');

// 3rd party dependencies
var lodash = require('lodash'),
    Spellchecker = require('hunspell-spellchecker'),
    globals = require('globals'),
    defaultSettings = require('./defaultSettings');

function getGloabalsSkipsWords() {
    return lodash.keys(globals).map(function (each) {
        return lodash.keys(globals[each])
    });
}

var spell = new Spellchecker(),
    dictionary = null,
    dictionaryLang,
    globalSkipWords = lodash.union(
        ...getGloabalsSkipsWords(),
        defaultSettings.skipWords,
        Object.getOwnPropertyNames(String.prototype),
        Object.getOwnPropertyNames(JSON),
        Object.getOwnPropertyNames(Math)
    ),
    globalSkipWordsSet = new Set(globalSkipWords.map(function (string) {
        return string.toLowerCase();
    }));


// ESLint 3 had "eslint.version" in context. ESLint 4 does not have one.
function isEslint4OrAbove(context) {
  return !('eslint' in context);
}

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
                    ignoreRequire: {
                        type: 'boolean',
                        default: false
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
                    },
                    skipWordIfMatch: {
                        type: 'array',
                        default: []
                    },
                    minLength: {
                        type: 'number',
                        default: 1
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
            skipIfMatch: [],
            skipWordIfMatch: [],
            minLength: 1
        },
        options = lodash.assign(defaultOptions, context.options[0]),
        lang = options.lang || 'en_US';


        if (dictionaryLang !== lang) { //Dictionary will only be initialized if changed
            dictionaryLang = lang;
            initializeDictionary(lang);
        }

        options.skipWords = new Set(options.skipWords.map(function (string) {
            return string.toLowerCase();
        }));

        options.skipIfMatch = lodash.union(options.skipIfMatch, defaultSettings.skipIfMatch);

        function initializeDictionary(language) {
            dictionary = spell.parse({
                aff: fs.readFileSync(__dirname + '/utils/dicts/' + language + '.aff'),
                dic: fs.readFileSync(__dirname + '/utils/dicts/' + language + '.dic')
            });

            spell.use(dictionary);
        }

        function hasValueInSkipWords(value) {
            return options.skipWords.has(value) || globalSkipWordsSet.has(value);
        }

        function isSpellingError(aWord) {
            return !hasValueInSkipWords(aWord) && !spell.check(aWord);
        }

        function checkSpelling(aNode, value, spellingType) {
            if(!hasToSkip(value)) {
                // Regular expression matches regexp metacharacters, and any special char
                var regexp = /(\\[sSwdDB0nfrtv])|\\[0-7][0-7][0-7]|\\x[0-9A-F][0-9A-F]|\\u[0-9A-F][0-9A-F][0-9A-F][0-9A-F]|[^0-9a-zA-Z '’]/g,
                    nodeWords = value.replace(regexp, ' ')
                        .replace(/([A-Z])/g, ' $1').split(' '),
                    errors;
                errors = nodeWords
                    .filter(hasToSkipWord)
                    .filter(isSpellingError)
                    .filter(function(aWord) {
                      // Split words by numbers for special cases such as test12anything78variable and to include 2nd and 3rd ordinals
                      // also for Proper names we convert to lower case in second pass.
                        var splitByNumberWords = aWord.replace(/[0-9']/g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase().split(' ');
                        return splitByNumberWords.some(isSpellingError);
                    })
                    .forEach(function(aWord) {
                        context.report(
                            aNode,
                            'You have a misspelled word: {{word}} on {{spellingType}}', {
                              word: aWord,
                              spellingType: spellingType
                        });
                    });
                }
            }

        function isInImportDeclaration(aNode) {
            // @see https://buildmedia.readthedocs.org/media/pdf/esprima/latest/esprima.pdf
            return aNode.parent && (
                (aNode.parent.type === 'ImportDeclaration' || aNode.parent.type === 'ExportDeclaration') ||
                (options.ignoreRequire && aNode.parent.type === 'CallExpression' && aNode.parent.callee.name === 'require')
            );
        }

        function checkComment(aNode) {
            if(options.comments) {
                checkSpelling(aNode, aNode.value, 'Comment');
            }
        }

        function checkLiteral(aNode){
            if(options.strings && typeof aNode.value === 'string' && !isInImportDeclaration(aNode)) {
                checkSpelling(aNode, aNode.value, 'String');
            }
        }
        function checkTemplateElement(aNode){
            if(options.templates && typeof aNode.value.raw === 'string' && !isInImportDeclaration(aNode)) {
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
            if (hasValueInSkipWords(value))
                return true;

            const escapedValue = value.replace(/'/g, '\\\'');

            return lodash.find(options.skipIfMatch, function (aPattern) {
                return escapedValue.match(aPattern);
            });
        }

        /**
         * returns false if the word has to be skipped
         * @param  {string}  word
         * @return {Boolean} false if skip; true if not
         */
        function hasToSkipWord(word) {
            if (word.length < options.minLength) return false;

            if (options.skipWordIfMatch) {
                const escapedWord = word.replace(/'/g, '\\\'');

                return !lodash.find(options.skipWordIfMatch, function (aPattern) {
                    return escapedWord.match(aPattern);
                });
            }

            return true;
        }

        // Coverage exclusion only needed for ESLint<4
        /* istanbul ignore next */
        if (isEslint4OrAbove(context)) {
          context
            .getSourceCode()
            .getAllComments()
            .forEach(function (commentNode) {
              checkComment(commentNode);
            });
        }

        return {
            // Noop in ESLint 4+
            'BlockComment': checkComment,
            // Noop in ESLint 4+
            'LineComment': checkComment,
            'Literal': checkLiteral,
            'TemplateElement': checkTemplateElement,
            'Identifier': checkIdentifier
        };
    }
};
