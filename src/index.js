const all = new Set([
    '__import__', 'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'breakpoint',
    'bytearray', 'bytes', 'callable', 'chr', 'classmethod', 'compile',
    'complex', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec',
    'filter', 'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr',
    'hash', 'help', 'hex', 'id', 'input', 'int', 'isinstance', 'issubclass',
    'iter', 'len', 'list', 'locals', 'map', 'max', 'memoryview', 'min', 'next',
    'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'range', 'repr',
    'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod',
    'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip',
])
const intersection = (setA, setB) => {
    const _intersection = new Set()
    for (const elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}
const setMinus = (setA, setB) => {
    const _difference = new Set(setA)
    for (const elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}
const union = (setA, setB) => {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}



const install = (namespace, options={}) => {
    const {literals=true, extended=true, whitelist=[], blacklist=[]} = options

    // NOTE: 'whitelist' has precedence.
    let moduleNames
    if (whitelist.length === 0 && blacklist.length === 0) {
        moduleNames = all
    }
    else if (whitelist.length > 0) {
        moduleNames = intersection(all, whitelist)
    }
    else if (blacklist.length > 0) {
        moduleNames = setMinus(all, whitelist)
    }
    else {
        throw new Error(
            `Only either the 'whitelist' or the 'blacklist' option is allowed.`
        )
    }

    if (!namespace) {
        if (typeof(global) !== 'undefined') {
            namespace = global
        }
        else if (typeof(window) !== 'undefined') {
            namespace = window
        }
    }

    if (!namespace) {
        throw new Error('No namespace given and could not auto-detect one.')
    }

    const injections = {}

    if (literals) {
        Object.assign(injections, require('./literals'))
    }

    for (const moduleName of moduleNames) {
        const module = require(`./${moduleName}`)
        if (typeof(module) === 'function') {
            injections[moduleName] = module
        }
        else {
            if (extended && module.extended) {
                injections[moduleName] = module.extended
            }
            else {
                injections[moduleName] = module.simple
            }
        }
    }

    return Object.assign(namespace, injections)
}

const __kwargs__ = 1


module.exports = {
    install,
    __kwargs__,
}



/*


export const reversed = function(iterable) {
    return list(iterable).reverse()
}

// Constructs an object from an iterable of (key, value) - pairs.
// Alternatively an array of non-pair items can be given.
// In that case each dictionary entry is constructed using str(item) as key and item as value
export const dict = function(iterable) {
    const result = {}
    for (const item of iterable) {
        if (is_array(item)) {
            const [key, val] = item
            result[key] = val
        }
        else {
            result[`${item}`] = item
        }
    }
    return result
}




*/
