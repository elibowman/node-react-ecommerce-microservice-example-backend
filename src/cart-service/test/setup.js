// Little fix for Jest, see https://stackoverflow.com/a/54175600
const iconv = require('../node_modules/mysql2/node_modules/iconv-lite/');
const encodings = require('../node_modules/mysql2/node_modules/iconv-lite/encodings');
iconv.encodings = encodings;
