# eslint-plugin-spellcheck
[eslint](http://eslint.org) plugin to spell check words on identifiers, Strings and comments of javascript files.

## Configuration

````
"comments": <<Boolean>> default: true
Check Spelling inside comments

"strings": <<Boolean>>, default: true
Check Spelling inside strings

"identifiers": <<Boolean>>, default: true
Check Spelling inside identifiers

"templates": <<Boolean>>, default: true
Check Spelling inside ES6 templates you should enable parser options for ES6 features for this to work
Refer to: [specifying-parser-options](http://eslint.org/docs/user-guide/configuring#specifying-parser-options)

"lang": <<String>>, default: "en_US"
Choose the language you want to use. Options are: "en_US", "en_CA", and "en_GB"

"skipWords": <<Array Of Strings>> default: []
Array of words that will not be checked.

"skipIfMatch": <<Array Of Strings>> default: []
Array of Regular Expressions that if matched will not be checked.
i.e: "^[-\\w]+\/[-\\w\\.]+$" will ignore MIME types.
````

Check example below

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
3. You can also configure these rules in your `.eslintrc`. All rules defined in this plugin have to be prefixed by 'spellcheck/'

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
                   "http://[^s]*",
                    "^[-\\w]+\/[-\\w\\.]+$" //For MIME Types
               ]
            }
        ]
    }
    ```

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
                ]
            }
        ]
   }
    ```
