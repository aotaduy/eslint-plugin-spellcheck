(function(){
      'use strict';

      module.exports = {
            rules: {
                'spell-comments': require('./rules/spell-comments'),
                'spell-strings': require('./rules/spell-strings'),
                'spell-identifiers': require('./rules/spell-identifiers'),
                'spell-checker': require('./rules/spell-checker')
            },
            rulesConfig: {
                'spell-comments': 1,
                'spell-strings': 1,
                'spell-identifiers': 1,
                'spell-checker': [1 , {
                    comments: true,
                    strings: true,
                    identifiers: true,
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
