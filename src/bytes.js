const bytearray = require('./bytearray')

module.exports = (source=0, /*encoding, errors*/) => {
    return Object.freeze(bytearray(source))
}
