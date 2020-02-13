function repr(object) {
    if (object == null) {
        return `${object}`
    }

    if (object.__repr__) {
        return object.__repr__()
    }

    if (typeof(object) === 'string') {
        return `'${object}'`
    }

    if (Array.isArray(object)) {
        return `[${object.map(item => repr(item)).join(', ')}]`
    }

    if (object.constructor === Object) {
        return `{${
            Object.entries(object)
            .map(([key, value]) => {
                return `${repr(key)}: ${value}`
            })
            .join(',')
        }}`
    }

    const s = object.toString()
    if (s === '[object Object]') {
        return `<${object.constructor.name} object>`
    }
    return s
}


module.exports = repr
