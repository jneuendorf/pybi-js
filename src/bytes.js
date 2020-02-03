const bytearray = require('./bytearray')
const Bytes = require('./_bytes')

module.exports = (source=0, encoding, /*errors*/) => {
    return Bytes.from(bytearray(source, encoding))
}
