module.exports = object => {
    if (object.__repr__) {
        return object.__repr__()
    }

    const repr = object.toString()
    if (repr === '[object Object]') {
        return `<${object.constructor.name} object>`
    }
    return repr
}
