(function(){
      'use strict';

      module.exports = {
            rules: {
                'spell-comments': require('./rules/spell-comments'),
                'spell-strings': require('./rules/spell-strings'),
                'spell-identifiers': require('./rules/spell-identifiers')
            },
            rulesConfig: {
                'spell-comments': 1,
                'spell-strings': 1,
                'spell-identifiers': 1
            }
      };
})();
