module.exports = (...args) => {
    if (args.length > 0) {
        throw new TypeError(`object() takes no arguments`)
    }
    return {}
}
