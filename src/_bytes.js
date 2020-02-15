const bytearray = require('./bytearray')
const {NotImplementedError} = require('./_errors')


// This is a manually implemented proxy in order to avoid 'Proxy'
// (meaning the Uint8Array interface is implemented).
// TODO: Thin out the prototype chain by using uint8array's methods directly
//       instead of wrapping them?
class Bytes {
    // _repr = null

    constructor(...args) {
        const array = bytearray(...args)
        Object.defineProperty(this, '_array', {
            value: array,
            enumerable: false,
            writable: false,
            configurable: false,
        })
        for (var i = 0; i < array.length; i++) {
            Object.defineProperty(this, i, {
                value: array[i],
                enumerable: true,
                writable: false,
                configurable: false,
            })
        }

        this._repr = null
    }

    static from(iterable) {
        return new Bytes(iterable)
    }

    /* istanbul ignore next */
    static of(...elements) {
        return new Bytes(elements)
    }

    __repr__() {
        // TODO: maybe use a config flag to disable caching to save memory?
        if (this._repr === null) {
            // NOTE: We can't use 'this.map' because it returns a Uint8Array
            //       which cannot represent our mapped strings.
            let repr = ''
            for (const byte of this._array) {
                repr += (
                    // See output from Python: 'bytes(range(256))'
                    byte <= 0x1f || byte >= 0x7f
                    ? '\\x' + byte.toString(16)
                    : String.fromCharCode(byte)
                )
            }
            this._repr = `b\`${repr}\``
        }

        return this._repr
    }

    __str__() {
        return this.__repr__()
    }

    /* istanbul ignore next */
    get buffer() {
        return this._array.buffer
    }

    /* istanbul ignore next */
    get byteLength() {
        return this._array.byteLength
    }

    /* istanbul ignore next */
    get byteOffset() {
        return this._array.byteOffset
    }

    get length() {
        return this._array.length
    }

    copyWithin() {
        throw new NotImplementedError('copyWithin')
    }

    /* istanbul ignore next */
    entries(...args) {
        return this._array.entries(...args)
    }

    /* istanbul ignore next */
    every(...args) {
        return this._array.every(...args)
    }

    fill() {
        throw new NotImplementedError('fill')
    }

    /* istanbul ignore next */
    filter(...args) {
        return this._array.filter(...args)
    }

    /* istanbul ignore next */
    find(...args) {
        return this._array.find(...args)
    }

    /* istanbul ignore next */
    findIndex(...args) {
        return this._array.findIndex(...args)
    }

    /* istanbul ignore next */
    forEach(...args) {
        return this._array.forEach(...args)
    }

    /* istanbul ignore next */
    includes(...args) {
        return this._array.includes(...args)
    }

    /* istanbul ignore next */
    indexOf(...args) {
        return this._array.indexOf(...args)
    }

    /* istanbul ignore next */
    join(...args) {
        return this._array.join(...args)
    }

    /* istanbul ignore next */
    keys(...args) {
        return this._array.keys(...args)
    }

    /* istanbul ignore next */
    lastIndexOf(...args) {
        return this._array.lastIndexOf(...args)
    }

    /* istanbul ignore next */
    map(...args) {
        return this._array.map(...args)
    }

    /* istanbul ignore next */
    reduce(...args) {
        return this._array.reduce(...args)
    }

    /* istanbul ignore next */
    reduceRight(...args) {
        return this._array.reduceRight(...args)
    }

    reverse() {
        throw new NotImplementedError('reverse')
    }

    set() {
        throw new NotImplementedError('set')
    }

    /* istanbul ignore next */
    slice(...args) {
        return this._array.slice(...args)
    }

    /* istanbul ignore next */
    some(...args) {
        return this._array.some(...args)
    }

    sort() {
        throw new NotImplementedError('sort')
    }

    /* istanbul ignore next */
    subarray(...args) {
        return this._array.subarray(...args)
    }

    /* istanbul ignore next */
    values(...args) {
        return this._array.values(...args)
    }

    /* istanbul ignore next */
    toLocaleString(...args) {
        return this._array.toLocaleString(...args)
    }

    /* istanbul ignore next */
    toString(...args) {
        return this._array.toString(...args)
    }

    [Symbol.iterator](...args) {
        return this._array[Symbol.iterator](...args)
    }
}

Object.defineProperties(Bytes, {
    BYTES_PER_ELEMENT: {
        value: 1,
        enumerable: true,
        writable: false,
        configurable: false,
    },
    name: {
        value: 'Bytes',
        enumerable: true,
        writable: false,
        configurable: false,
    },
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array#Properties
    length: {
        value: 3,
        enumerable: true,
        writable: false,
        configurable: false,
    },
})


module.exports = Bytes
