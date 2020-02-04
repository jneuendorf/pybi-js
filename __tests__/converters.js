const ascii = require('../src/ascii')
const bin = require('../src/bin')
const bool = require('../src/bool')
const chr = require('../src/chr')
const hex = require('../src/hex')
const object = require('../src/object')
const oct = require('../src/oct')
const ord = require('../src/ord')

// const {ValueError, NotImplementedError} = require('../src/_errors')

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


describe('a', () => {
    test('b', () => {

    })

    test('c', () => {

    })
})
