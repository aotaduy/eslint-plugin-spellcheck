(function(){
    'use strict';

    var globals = require('globals');
    var lodash = require('lodash');
    var skipWords = [
        '$http',
        '$httpBackend',
        'argc',
        'argv',
        'bool',
        'const',
        'ctrl',
        'dcl',
        'disney',
        'esprima',
        'esquery',
        'fs',
        'html',
        'http',
        'hunspellchecker',
        'js',
        'jshint',
        'json',
        'lodash',
        'lint',
        'ng',
        'ngcookies',
        'nginject',
        'skipwords',
        'param',
        'ui',
        'url',
        'utils',
        'Vm',
        'vm',
        'wdpr',
        '_'
    ]
        .map(function(each) {
            return each.toLowerCase();
        });

    module.exports = lodash.union(
        skipWords,
        lodash.keys(globals.builtin),
        lodash.keys(globals.browser),
        lodash.keys(globals.node),
        lodash.keys(globals.mocha),
        lodash.keys(globals.jasmine),
        lodash.keys(globals.jquery),
        lodash.keys(globals.shelljs)
        );
})();
