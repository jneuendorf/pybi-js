const callable = require('./callable')
const typeStr = require('./_type-str')

const NO_PROP = {}

module.exports = {
    NO_PROP,
    dunder(obj, method, validReturnType, returnTypeStr, args=[]) {
        const prop = obj[method]
        if (prop) {
            if (callable(prop)) {
                const result = obj[method](...args)
                if (validReturnType(result)) {
                    return result
                }
                throw new TypeError(
                    `${method} returned non-${returnTypeStr} (type ${typeStr(result)})`
                )
            }
            else {
                throw new TypeError(`'${typeStr(prop)}' object is not callable`)
            }
        }
        else {
            return NO_PROP
        }
    },
}
