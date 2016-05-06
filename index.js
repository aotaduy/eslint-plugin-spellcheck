(function(){
      'use strict';

      module.exports = {
            rules: {
                'spell-checker': require('./rules/spell-checker')
            },
            rulesConfig: {
                'spell-checker': [1 , {
                    comments: true,
                    strings: true,
                    identifiers: true,
                    lang: 'en_US',
                    skipWords: [
                        'dict',
                        'aff',
                        'hunspellchecker',
                        'hunspell',
                        'utils'
                    ]
                }
            ]
        }
    };
})();
