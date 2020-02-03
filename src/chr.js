const {ValueError} = require('./_errors')

module.exports = i => {
    try {
        return String.fromCodePoint(i)
    }
    catch (error) {
        // Only RangeErrors can be thrown. We want to have a more pythonic behavior.
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#Exceptions
        throw new ValueError(`chr() arg not in range(0x110000)`)
    }
}
