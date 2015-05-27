var skipWords = require('./utils/skipwords'),
    spell = require('./utils/hunspellchecker.js'),
    lodash = require('lodash');

module.exports = function(context) {

    'use strict';

    return {
        'Identifier': function(aNode) {
            if(!lodash.includes(skipWords, aNode.name)) {
                var nodeWords = aNode.name.replace(/([A-Z])/g, ' $1').replace(/[^a-zA-Z ]/g, ' ').split(' ');
                nodeWords = nodeWords.filter(function(aWord) {
                    return !lodash.includes(skipWords, aWord);
                });
                nodeWords.forEach(function(aWord) {
                    if (!spell.check(aWord)) {
                        context.report(aNode, 'You have a misspelled word: {{word}} on an Identifier', {word: aWord});
                    }
                });

            }

        }
    };

};
