const _mod = require('./_mod')

module.exports = (base, exp, mod) => {
    const n = base ** exp
    if (!mod) {
        return n
    }
    return _mod(n, mod)
}
