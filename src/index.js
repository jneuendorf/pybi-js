const {config, reset} = require('./_config')
const errors = require('./_errors')
const setMinus = require('./_set-minus')


const all = new Set([
    '__import__',
    'abs',
    'all',
    'any',
    'ascii',
    'bin',
    'bool',
    'breakpoint',
    'bytearray',
    'bytes',
    'callable',
    'chr',
    'classmethod',
    'compile',
    'complex',
    'delattr',
    'dict',
    'dir',
    'divmod',
    'enumerate',
    'eval',
    'exec',
    'filter',
    'float',
    'format',
    'frozenset',
    'getattr',
    'globals',
    'hasattr',
    'hash',
    'help',
    'hex',
    'id',
    'input',
    'int',
    'isinstance',
    'issubclass',
    'iter',
    'len',
    'list',
    'locals',
    'map',
    'max',
    'memoryview',
    'min',
    'next',
    'object',
    'oct',
    // 'open',
    'ord',
    'pow',
    'print',
    'property',
    'range',
    'repr',
    'reversed',
    'round',
    'set',
    'setattr',
    'slice',
    'sorted',
    'staticmethod',
    'str',
    'sum',
    'super',
    'tuple',
    'type',
    'vars',
    'zip',
])
const nodeJsOnly = new Set([
    // People have tried polyfilling node's 'Buffer' but apparently there were
     // only partly successful and that was quite a while ago:
     // https://stackoverflow.com/a/16548689/6928824
     // https://stackoverflow.com/a/12486045/6928824
     // If anyone is interested in porting
     // https://github.com/nodejs/node/blob/master/lib/buffer.js
     // to browser JS, go ahead! ;)
    'bytearray',
    'input',
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


const install = (namespace, options={}) => {
    const {
        literals=true,
        stringLiterals=true,
        extended=true,
        whitelist=[],
        blacklist=[],
        overrideExisting=false,
    } = options

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

    if (typeof(process) === 'undefined') {
        console.debug(
            '[pybi] Not using the following module because assuming '
            + 'running in a browser'
        )
        moduleNames = setMinus(moduleNames, nodeJsOnly)
    }

    if (!namespace) {
        // This works since node >= 12.0.0 and in some newer browsers.
        if (typeof(globalThis) !== 'undefined') {
            namespace = globalThis
        }
        else if (typeof(global) !== 'undefined') {
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

    if (stringLiterals) {
        Object.assign(injections, require('./string-literals'))
    }

    for (const moduleName of moduleNames) {
        if (namespace.hasOwnProperty(moduleName) && !overrideExisting) {
            continue
        }

        const module = require(`./${moduleName}`)
        if (!module) {
            continue
        }

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
    errors,
    config,
    reset,
    __kwargs__,
}



/*


export const reversed = function(iterable) {
    return list(iterable).reverse()
}

*/
