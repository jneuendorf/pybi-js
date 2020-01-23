const {config: {hash_useHashSum, hash_warnNoHashSum}} = require('./_config')

let hashSum

module.exports = object => {
    if (hash_useHashSum) {
        if (!hashSum) {
            hashSum = require('hash-sum')
        }
        return hashSum(object)
    }
    else {
        if (hash_warnNoHashSum) {
            console.warn(`hash() was called without having  'hash-sum' installed`)
        }
        else {
            return 0
        }
    }
}
