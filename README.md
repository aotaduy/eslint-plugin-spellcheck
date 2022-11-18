# eslint-plugin-spellcheck
[eslint](http://eslint.org) plugin to spell check words on identifiers, Strings and comments of javascript files.
[![dependencies Status](https://david-dm.org/aotaduy/eslint-plugin-spellcheck/status.svg)](https://david-dm.org/aotaduy/eslint-plugin-spellcheck)
[![Build CI](https://github.com/aotaduy/eslint-plugin-spellcheck/actions/workflows/node.js.yml/badge.svg)](https://github.com/aotaduy/eslint-plugin-spellcheck/actions/workflows/node.js.yml)
## Usage in a project

1. Install `eslint-plugin-spellcheck` as a dev-dependency:

    ```shell
    npm install --save-dev eslint-plugin-spellcheck
    ```

2. Enable the plugin by adding it to your `.eslintrc`:

    ```yaml
    plugins:
      - spellcheck
    ```
3. simplest configuration .eslintrc: 

    ```json
    "plugins": [
       "spellcheck"
   ],
   "rules": {
       "spellcheck/spell-checker": ["warn"]
    }

4. You can also configure these rules in your `.eslintrc`. All rules defined in this plugin have to be prefixed by 'spellcheck/'

    ```json
    "plugins": [
       "spellcheck"
   ],
   "rules": {
       "spellcheck/spell-checker": [1,
           {
               "comments": true,
               "strings": true,
               "identifiers": true,
               "templates": true,
               "lang": "en_US",
               "skipWords": [
                   "dict",
                   "aff",
                   "hunspellchecker",
                   "hunspell",
                   "utils"
               ],
               "skipIfMatch": [
                   "http://[^s]*",
                   "^[-\\w]+\/[-\\w\\.]+$"
               ],
               "skipWordIfMatch": [
                   "^foobar.*$"
               ],
               "minLength": 3
            }
        ]
    }
    ```

## Configuration Options

 This ESLint plugin, like others, can be reconfigured to produce errors (2), warnings (1), or disabled (0) with the first numeric argument.  For more information on ESLint configuration, see: http://eslint.org/docs/user-guide/configuring

````
"comments": <<Boolean>> default: true
Check Spelling inside comments

"strings": <<Boolean>>, default: true
Check Spelling inside strings

"identifiers": <<Boolean>>, default: true
Check Spelling inside identifiers

"ignoreRequire": <<Boolean>>, default: false
Exclude `require()` imports from spell-checking. Useful for excluding NPM package name false-positives.

"enableUpperCaseUnderscoreCheck": <<Boolean>>, default: false
Exclude checking uppercase words separated by an underscore. e.g., `SEARCH_CONDITIONS_LIMIT`

"templates": <<Boolean>>, default: true
Check Spelling inside ES6 templates you should enable parser options for ES6 features for this to work
Refer to: [specifying-parser-options](http://eslint.org/docs/user-guide/configuring#specifying-parser-options)

"lang": <<String>>, default: "en_US"
Choose the language you want to use. Options are: "en_US", "en_CA", "en_AU", and "en_GB"

"langDir": <<String>>, default: ""
Language files directory path. By default uses the plugin directory.

"skipWords": <<Array Of Strings>> default: []
Array of words that will not be checked.

"skipIfMatch": <<Array Of Strings>> default: []
Array of Regular Expressions the plugin will try to match the js node element value (identifier, comment, string, string template, etc) and will not check the entire node content if matched, be careful in comments because if a part of the comment is matched the entire comment will not be checked, same for strings.
i.e: "^[-\\w]+\/[-\\w\\.]+$" will ignore MIME types.

"skipWordIfMatch": <<Array Of Strings>> default: []
Array of Regular Expressions the plugin will try to match every single word that is found in the nodes (identifier, comment, string, string template, etc) and will not check the single word if matched.
i.e: "^[-\\w]+\/[-\\w\\.]+$" will ignore MIME types.

"minLength": <<Number>> default: 1
Words with a character-amount of less than the minLength will not be spell-checked.
````

Check example below


## Usage globally

1. Install `eslint-plugin-spellcheck` as a global package:

    ```shell
    npm install -g eslint-plugin-spellcheck
    ```

2. Enable the plugin by adding it to your `eslint.json`:

    ```json
    "plugins": [
       "spellcheck"
   ],
   "rules": {
       "spellcheck/spell-checker": [1,
           {
               "comments": true,
               "strings": true,
               "identifiers": true,
               "lang": "en_US",
               "skipWords": [
                   "dict",
                   "aff",
                   "hunspellchecker",
                   "hunspell",
                   "utils"
                ],
                "skipIfMatch": [
                    "http://[^s]*"
                ],
                "skipWordIfMatch": [
                    "^foobar.*$"
                ],
                "minLength": 3
            }
        ]
   }
    ```

## Skipping words ending with a number
To skip words like md5, sha1 and sha256, add to `skipWords` the root of the word, that is, without the number:

```json
"rules": {
    "spellcheck/spell-checker": [1,
        {
            "skipWords": [
                "md",
                "sha"
            ],
        }
    ]
}
```

Please contact me with any issues on github or check my blog (spanish) [Area 204](https://aotaduy.github.io/area204/)
