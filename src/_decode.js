let _TextDecoder
/* istanbul ignore next */
if (typeof(TextDecoder) !== 'undefined') {
    _TextDecoder = TextDecoder
}
else {
    _TextDecoder = require('util').TextDecoder
}


module.exports = function(bytes, encoding) {
    // Compatibility: https://caniuse.com/#feat=mdn-api_textdecoder_decode
    const decoder = new _TextDecoder(encoding)
    return decoder.decode(bytes.buffer)
}
