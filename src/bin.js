const callable = require('./callable')

module.exports = x => {
    if (!Number.isInteger(x)) {
        if (callable(x.__index__)) {
            x = x.__index__()
        }
        else {
            throw new TypeError(
                `'${x.construtor.name}' object cannot be interpreted as an integer`
            )
        }
    }
    if (x >= 0) {
        return `0b${x.toString(2)}`
    }
    return `-0b${(-x).toString(2)}`
}
