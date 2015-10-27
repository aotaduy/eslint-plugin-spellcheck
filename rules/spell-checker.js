var lodash = require('lodash'),
     fs = require('fs'),
     Spellchecker = require('hunspell-spellchecker'),
     spell = new Spellchecker(),
     dictionary = spell.parse({
        aff: fs.readFileSync(__dirname + '/utils/dicts/en_US.aff'),
        dic: fs.readFileSync(__dirname + '/utils/dicts/en_US.dic')
    }),
    globals = require('globals'),
    skipWords = lodash.union(
        lodash.keys(globals.builtin),
        lodash.keys(globals.browser),
        lodash.keys(globals.node),
        lodash.keys(globals.mocha),
        lodash.keys(globals.jasmine),
        lodash.keys(globals.jquery),
        lodash.keys(globals.shelljs)
        );

spell.use(dictionary);

module.exports = function(context) {
    'use strict';
    var defaultOptions = {
        comments: true,
        strings: true,
        identifiers: true,
        skipWords: [],
        skipIfMatch: []
    },
    options = lodash.assign(defaultOptions, context.options[0]);
    options.skipWords = lodash.union(options.skipWords, skipWords);

    function checkSpelling(aNode, value, spellingType) {
        if(!hasToSkip(value)) {
            var nodeWords = value.replace(/[^a-zA-Z ]/g, ' ').replace(/([A-Z])/g, ' $1').split(' ');
            nodeWords
                .filter(function(aWord) {
                return !lodash.includes(options.skipWords, aWord) && !spell.check(aWord);
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
        'Identifier': checkIdentifier
    };

};
