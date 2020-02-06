const ascii = require('../src/ascii')
const bin = require('../src/bin')
const bool = require('../src/bool')
const chr = require('../src/chr')
const hex = require('../src/hex')
const object = require('../src/object')
const oct = require('../src/oct')
const ord = require('../src/ord')

const {createTestCase} = require('./_utils')


test('ascii', () => {
    expect(ascii(undefined)).toBe('undefined')
    expect(ascii(null)).toBe('null')
    expect(ascii('ipsum áá éé lore')).toBe('ipsum \\u00e1\\u00e1 \\u00e9\\u00e9 lore')
    expect(ascii({
        __repr__() {
            return 'Göt you?'
        }
    })).toBe('G\\u00f6t you?')
})


describe('bin', () => {
    createTestCase('converters', 'bin', bin, {testName: 'without __index__'})

    test('with __index__', () => {
        expect(bin({
            __index__() {
                return 42
            }
        })).toBe(bin(42))
        expect(() => bin({
            __index__() {
                return 'adsf'
            }
        })).toThrow(TypeError)
    })
})


describe('bool', () => {
    createTestCase('converters', 'bool', bool, {testName: 'without __bool__'})

    test('with __bool__', () => {
        expect(bool({
            __bool__() {
                return true
            }
        })).toBe(true)
        expect(bool({
            __bool__() {
                return false
            }
        })).toBe(false)
        expect(() => bool({
            __bool__() {
                return 1
            }
        })).toThrow(TypeError)
    })
})


createTestCase('converters', 'chr', chr)


describe('hex', () => {
    createTestCase('converters', 'hex', hex, {testName: 'without __index__'})

    test('with __index__', () => {
        expect(hex({
            __index__() {
                return 42
            }
        })).toBe(hex(42))
        expect(() => hex({
            __index__() {
                return 'adsf'
            }
        })).toThrow(TypeError)
    })
})


createTestCase('converters', 'object', object)


describe('oct', () => {
    createTestCase('converters', 'oct', oct, {
        testName: 'without __index__',
    })

    test('with __index__', () => {
        expect(oct({
            __index__() {
                return 42
            }
        })).toBe(oct(42))
        expect(() => oct({
            __index__() {
                return 'adsf'
            }
        })).toThrow(TypeError)
    })
})


createTestCase('converters', 'ord', ord)


describe('a', () => {
    test('b', () => {

    })

    test('c', () => {

    })
})
