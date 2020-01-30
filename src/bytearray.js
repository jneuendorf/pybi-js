const isIterable = require('./_is-iterable')
const {ValueError} = require('./_errors')

module.exports = (source=0, encoding, /*errors*/) => {
    if (typeof(source) === 'string') {
        if (!encoding) {
            throw new TypeError('string argument without an encoding')
        }
        // https://kevin.burke.dev/kevin/node-js-string-encoding/
        source = Buffer.from(source, encoding)
    }
    // Check for valid iterables because JS does weird things
    // (using the modulo because of overflow in the byte range, I guess), e.g.:
    // Uint8Array.from([1, 2, 10, 999, 9999, 9999999999])
    // => Uint8Array [ 1, 2, 10, 231, 15, 255 ]
    else if (isIterable(source)) {
        // Copy each item to an Array so it can be iterated once more for sure
        // (i.e. generators could be depleted).
        sourceCopy = []
        for (const byte of source) {
            if (!Number.isInteger(byte)) {
                throw new TypeError(
                    `'${byte.constructor.name}' object cannot be interpreted `
                    + `as an integer`
                )
            }
            if (byte < 0 || byte >= 256) {
                throw new ValueError('byte must be in range(0, 256)')
            }
            sourceCopy.push(byte)
        }
    }
    return new Uint8Array(source)
}
