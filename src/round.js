// See https://stackoverflow.com/a/18358056/6928824
module.exports = (number, ndigits) => {
    if (!ndigits) {
        return Math.round(number)
    }
    if (!Number.isInteger(ndigits)) {
        throw new TypeError(
            `'${ndigits.contructor.name}' object cannot be interpreted as an integer`
        )
    }
    return +(Math.round(number + `e+${ndigits}`) + `e-${ndigits}`)
}
