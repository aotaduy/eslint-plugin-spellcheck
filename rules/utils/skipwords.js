(function(){
    'use strict';

    var globals = require('globals');
    var lodash = require('lodash');
    module.exports = lodash.union(
        lodash.keys(globals.builtin),
        lodash.keys(globals.browser),
        lodash.keys(globals.node),
        lodash.keys(globals.mocha),
        lodash.keys(globals.jasmine),
        lodash.keys(globals.jquery),
        lodash.keys(globals.shelljs)
        );
})();
