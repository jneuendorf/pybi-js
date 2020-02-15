const bytes = require('./bytes')
const ord = require('./ord')


// Python docs:
// https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals

/*

Python:
>>> a='\n'
>>> rf'\n{a}'
'\\n\n'
*/
function r(strings, ...expressions) {
    const {raw} = strings
    let result = ''
    // We could use 'zip' etc. but we want to stick with a slim call stack.
    for (let i = 0; i < expressions.length; i++) {
        result += expressions[i] + raw[i + 1]
    }
    return raw[0] + result
}

function _b(string, expressions) {
    if (expressions.length > 0) {
        throw new TypeError('Cannot use expressions (aka. replacement fields)')
    }
    return bytes(string.split('').map(s => ord(s)))
}

function b(strings, ...expressions) {
    return _b(strings[0], expressions)
}
function br(strings, ...expressions) {
    return _b(strings.raw[0], expressions)
}
function rb(strings, ...expressions) {
    return _b(strings.raw[0], expressions)
}



module.exports = {
    b,
    r,
    rb,
    br,
}
