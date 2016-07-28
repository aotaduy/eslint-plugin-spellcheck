
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
    create: require('./rules/spell-checker')

};
