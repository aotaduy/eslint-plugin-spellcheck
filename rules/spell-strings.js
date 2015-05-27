var skipWords = require('./utils/skipwords'),
    spell = require('./utils/hunspellchecker.js'),
    lodash = require('lodash');

module.exports = function(context) {

    'use strict';

    return {
        'Literal': function(aNode) {
            if((typeof aNode.value) === 'string' && !lodash.includes(skipWords, aNode.value)) {
                var nodeWords = aNode.value.replace(/[^a-zA-Z ]/g, ' ').replace(/([A-Z])/g, ' $1').split(' ');
                nodeWords = nodeWords.filter(function(aWord) {
                    return !lodash.includes(skipWords, aWord);
                });
                nodeWords.forEach(function(aWord) {
                    if (!spell.check(aWord)) {
                        context.report(aNode, 'You have a misspelled word: {{word}} on a String', {word: aWord});
                    }
                });

            }

        }
    };

};
