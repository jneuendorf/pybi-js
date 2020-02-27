const str = require('./str')
const type = require('./type')
const {config} = require('./_config')
const {dunder, NO_PROP} = require('./_dunder')
const toPrimitive = require('./_to-primitive')
const typeStr = require('./_type-str')

let sprintf

module.exports = (...args) => {
    const n = args.length
    if (n < 1) {
        throw new TypeError(`format expected at least 1 argument, got ${n}`)
    }
    if (n > 2) {
        throw new TypeError(`format expected at most 2 arguments, got ${n}`)
    }

    let [value, format_spec] = args
    // Don't allow passing undefined explicitly as 2nd argument
    // (thus no default value).
    if (n === 1) {
        format_spec = ''
    }
    format_spec = toPrimitive(format_spec)
    if (typeof(format_spec) !== 'string') {
        throw new TypeError(
            `format() argument 2 must be str, not ${typeStr(format_spec)}`
        )
    }

    if (value != null) {
        let __format__ = dunder(
            type(value),
            '__format__',
            x => typeof(toPrimitive(x)) === 'string',
            'format',
        )
        if (__format__ !== NO_PROP) {
            return __format__
        }

        __format__ = dunder(
            value,
            '__format__',
            x => typeof(toPrimitive(x)) === 'string',
            'format',
        )
        if (__format__ !== NO_PROP) {
            return __format__
        }
    }

    if (format_spec === '') {
        return str(value)
    }

    if (config.format_useSprintf) {
        if (!sprintf) {
            sprintf = require('sprintf-js').sprintf
        }
        return sprintf(format_spec, value)
    }
    else {
        if (config.format_warnNoSprintf) {
            console.warn(`format() was called without having 'sprintf-js' installed`)
        }
        return ''
    }
}
