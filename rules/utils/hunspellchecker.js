/* Initialze and export a valid spell checker
We use 'US'' as  default dictionaries
*/

var Spellchecker = require('hunspell-spellchecker');
var fs = require('fs');
var spellchecker = new Spellchecker();
var DICT = spellchecker.parse({
    aff: fs.readFileSync(__dirname + '/dicts/en_US.aff'),
    dic: fs.readFileSync(__dirname + '/dicts/en_US.dic')
});
spellchecker.use(DICT);
module.exports = spellchecker;
