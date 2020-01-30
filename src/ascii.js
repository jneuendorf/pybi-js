const callable = require('./callable')

// From Python's: `[ascii(chr(i)) for i in range(32, 127)]`
const CHAR_CODE_MIN = 32
const CHAR_CODE_MAX = 127

// See http://stackoverflow.com/questions/7499473/ddg#7499539
function padWithLeadingZeros(string) {
    return new Array(5 - string.length).join("0") + string
}

function unicodeCharEscape(charCode) {
    return '\\u' + padWithLeadingZeros(charCode.toString(16))
}

function unicodeEscape(string) {
    return (
        string.split('')
         .map(function(char) {
             const charCode = char.charCodeAt(0)
             if (CHAR_CODE_MIN <= charCode && charCode <= CHAR_CODE_MAX) {
                 return char
             }
             return unicodeCharEscape(charCode)
         })
         .join('')
    )
}


module.exports = x => {
    if (x == null) {
        return x + ''
    }
    const str = (
        callable(x.__repr__)
        ? x.__repr__()
        : x.toString()
    )
    return unicodeEscape(str)
}
