const {config} = require('./_config')
const {dunder, NO_PROP} = require('./_dunder')


let hashSum


module.exports = (...args) => {
    const n = args.length
    if (n !== 1) {
        throw new TypeError(` hash() takes exactly one argument (${n} given)`)
    }

    const [object] = args

    if (object != null) {
        const __hash__ = dunder(
            object,
            '__hash__',
            Number.isInteger,
            'hash',
        )
        if (__hash__ !== NO_PROP) {
            return __hash__
        }
    }

    if (config.hash_useHashSum) {
        if (!hashSum) {
            hashSum = require('hash-sum')
        }
        return parseInt(hashSum(object), 16)
    }
    else {
        if (config.hash_warnNoHashSum) {
            console.warn(`hash() was called without having 'hash-sum' installed`)
        }
        return 0
    }
}
