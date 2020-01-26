// const {ValueError} = require('./_errors')


// See https://stackoverflow.com/a/18358056/6928824
function round(number, ndigits) {
    if (ndigits == null) {
        return Math.round(number)
    }
    if (!Number.isInteger(ndigits)) {
        throw new TypeError(
            `'${ndigits.contructor.name}' object cannot be interpreted as an integer`
        )
    }
    if (ndigits < 0) {
        return round(number * 10**ndigits)
        // throw new ValueError(`round( arg 2 must be positive`)
    }
    return +(Math.round(number + `e+${ndigits}`) + `e-${ndigits}`)
}


module.exports = round
