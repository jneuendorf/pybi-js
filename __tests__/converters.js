const ascii = require('../src/ascii')
const bin = require('../src/bin')
const bool = require('../src/bool')
const bytearray = require('../src/bytearray')
const bytes = require('../src/bytes')
const chr = require('../src/chr')
const dict = require('../src/dict')
const float = require('../src/float')
const frozenset = require('../src/frozenset')
const hex = require('../src/hex')
const int = require('../src/int')
const list = require('../src/list')
const object = require('../src/object')
const oct = require('../src/oct')
const ord = require('../src/ord')
const set = require('../src/set')
const str = require('../src/str')
const tuple = require('../src/tuple')

const {ValueError} = require('../src/_errors')

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


describe('bytearray', () => {
    createTestCase('converters', 'bytearray', bytearray, {
        testName: 'without buffer interface objects',
        logIndices: true,
        deserializer: obj => Uint8Array.from(obj),
    })

    test('with buffer', () => {
        expect(
            bytearray(Buffer.from('aä', 'utf8'))
        ).toEqual(Uint8Array.from([97, 195, 164]))
    })
})


describe('a', () => {
    test('b', () => {

    })

    test('c', () => {

    })
})
