module.exports = {
    langDir: __dirname + '/utils/dicts',
    skipWords: [
        // own names
        // gulp plugin names, node package names etc.
        //
        'analytics',
        'atlassian',
        'autoprefixer',
        'cordova',
        'cssnano',
        'del', // gulp plugin name
        'eslint',
        'github',
        'gmap',
        'gmapgoogle', // in uiGmapgoogle package name
        'gulpfile',
        'htmlmin', // gulp plugin name
        'ionics',
        'ios',
        'iPad',
        'iPads',
        'iPod',
        'iPods',
        'istanbul',
        'lazypipe',
        'localforage',
        'lodash',
        'ng',
        'segmentio',
        'shelljs',
        'splashscreen', // a name of cordova plugin
        'streamqueue', // node package
        'touchspin',
        'uglify',
        'webdriver',


        //file extensions
        'css',
        'html',
        'html',
        'js',
        'jsonp',
        'md',
        'png',
        'scss',
        'tpl',


        // programming gibberish
        'addon',
        'addons',
        'arg',
        'args',
        'asc',
        'async',
        'atan',
        'attr',
        'attrs',
        'auth',
        'autocomplete',
        'autoincrement',
        'basename',
        'bcrypt',
        'broadcasted',
        'chainable',
        'cli',
        'clickability',
        'concat',
        'conf',
        'config',
        'configs',
        'const',
        'ctrl',
        'customizer',
        'deregister',
        'deregistered',
        'deregistering',
        'deregistrator',
        'deregistrators',
        'desc',
        'deserialization',
        'deserialize',
        'deserialized',
        'deserializes',
        'dest',
        'destructuring',
        'dev',
        'dir',
        'dirname',
        'dragend',
        'dragstart',
        'el',
        'elem',
        'elems',
        'env',
        'envs',
        'falsy',
        'filename',
        'fn',
        'fns',
        'formatters',
        'fulfillable',
        'fullscreen',
        'getter',
        'hostname',
        'http',
        'https',
        'img',
        'init',
        'initializer',
        'injectable',
        'instantiation',
        'iterable',
        'iteree',
        'jwt',
        'laquo',
        'lib',
        'libs',
        'lifecycle',
        'linter',
        'linters',
        'metadata',
        'middleware',
        'minified',
        'mixin',
        'mixins',
        'multiselect',
        'nav',
        'noop',
        'param',
        'params',
        'parsers',
        'polyfill',
        'polyfilled',
        'polyfills',
        'popup',
        'prefetch',
        'preload',
        'preloaded',
        'preprocess',
        'preprocessor',
        'preprocessors',
        'preselected',
        'programmatically',
        'proto',
        'px',
        'raquo',
        'reconfiguring',
        'refetch',
        'refetching',
        'ret',
        'rethrows',
        'rgba',
        'runtime',
        'sanitization',
        'serialize',
        'serializer',
        'sha',
        'shorthands',
        'sourcemap',
        'sourcemaps',
        'sqrt',
        'src',
        'stacktrace',
        'subdirectories',
        'subdirectory',
        'subunit',
        'subunits',
        'superset',
        'thanables',
        'thenable',
        'timeline',
        'timestamp',
        'tmp',
        'todo',
        'truthy',
        'typedef',
        'ui',
        'uncomment',
        'unfulfillable',
        'ungroup',
        'ungrouped',
        'unhandled',
        'uniq',
        'unwatch',
        'util',
        'utils',
        'uuid',
        'validator',
        'viewport',
        'webserver',
        'whitelist',
        'whitelisted',
        'www',
        'zindex',
        'api',
        'backend',
        'iso',
        'utc',


        // names provided by external source code dependencies or standard
        // library
        //
        'clusterer', // in Google Map options
        'cwd', // in node api
        'eq', // in jQuery#eq
        'expr', // in uiRouter stateRef.paramExpr
        'extname', // gulp-plugin-rename config option
        'lcov', // name of line coverage format
        'memoize', // in _.memoize
        'nobrowser', // ionic cli flag
        'prev', // in jQuery#prev
        'roadmap', // https://developers.google.com/maps/documentation/javascript/maptypes
        'scrollwheel', // in Google Map options
        'sref', // in [ui-sref]
        'starttag', // a config name in gulp-plugin-inject
        'stringify',  // in JSON.stringify
        'stylers', // https://developers.google.com/maps/documentation/javascript/styling#overview
        'substr', // in String#substr
        'thru',  // in _.thru
        'transclude', // in angular directive
        'transclusion', // in angular directive
        'unshift', // in Array#unshift


        // Moment.js date format strings
        'YYYY',
        'YY',
        'Y',
        'MM',
        'MMM',
        'MMMM',
        'D',
        'DD',
        'Do',
        'DDD',
        'DDDD',
        'HH',
        'MM',
        'gg',
        'gggg',
        'ww',
        'ss',
        'ss',
        'zz',
        // Bootstrap,
        'xs',
        'sm',
        'md',
        'lg',
        'btn',
        'nav',
        'navbar',
        'popover',

        // Lorem ipsum 1st sentence
        'Lorem',
        'ipsum',
        'dolor',
        'sit',
        'amet',
        'consectetur',
        'adipiscing',
        'elit',


        // Related to Google Maps
        //
        'coords', // South-east etc.
        'geocode',
        'geocoder',
        'geocoding',
        'geolocate',
        'geolocated',
        'geolocation',
        'geoposition',
        'lat',
        'lng',
        'ne',
        'nw',
        'se',
        'sublocality',
        'sw',

        // various
        'ness', // -ness suffix
        'pre', // pre- prefix
        'Na', // in NaN - NaN is mishandled by the plugin

        // tests
        'foo',
        'bar',
        'baz',
        'quux'
    ],
    skipIfMatch: [
        'http(s)?://[^s]*',
        // Auxiliary werbs
        // see: https://github.com/aotaduy/eslint-plugin-spellcheck/issues/7
        '(\\s|^)\\w+\'t(\\s|$)',
        // ordinals
        // https://github.com/aotaduy/eslint-plugin-spellcheck/issues/8
        '(\\s|^|\\w+)\\d+(st|nd|rd|th)(\\s|[A-Z][a-zA-Z]+|$)',
        // pre/post prefixes both in kebab case and camel case
        '(\\s|^)(pre|post)([-\\w]|[A-Z])[a-zA-Z]+(\\s|$)',
        // mimetypes
        '^[-\\w]+\/[-\\w\\.]+$',
        // xml tags
        '<(?:\/)?[\\w-]+>',
        // cryptographic octal hashes
        '^[0-9a-f]{5,999}$',
        // hex colors
        '^#[0-9a-f]{3,6}$'
    ]
};

