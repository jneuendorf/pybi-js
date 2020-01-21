// See https://stackoverflow.com/a/32538867/6928824
module.exports = obj => {
    // 'null' or 'undefined'?
    if (obj == null) {
        return false
    }
    return typeof(obj[Symbol.iterator]) === 'function'
}
