const bytearray = require('../src/bytearray')
const bytes = require('../src/bytes')
const dict = require('../src/dict')
const float = require('../src/float')
const frozenset = require('../src/frozenset')
const int = require('../src/int')
const list = require('../src/list')
const range = require('../src/range')
const set = require('../src/set')
const str = require('../src/str')
const tuple = require('../src/tuple')

const Bytes = require('../src/_bytes')
const {ValueError, NotImplementedError} = require('../src/_errors')

const {createTestCase} = require('./_utils')


describe('bytearray', () => {
    createTestCase('stdtypes', 'bytearray', bytearray, {
        testName: 'without buffer interface objects',
        // logIndices: true,
        deserializer: obj => Uint8Array.from(obj),
    })

    test('with buffer', () => {
        expect(
            bytearray(Buffer.from('aä', 'utf8'))
        ).toEqual(Uint8Array.from([97, 195, 164]))
    })
})


describe('bytes', () => {
    createTestCase('stdtypes', 'bytes', bytes, {
        testName: 'without buffer interface objects',
        // logIndices: true,
        deserializer: obj => Bytes.from(obj),
    })

    test('with buffer', () => {
        expect(
            bytes(Buffer.from('aä', 'utf8'))
        ).toEqual(Bytes.from([97, 195, 164]))
    })

    test('immutability', () => {
        const b = bytes([0, 10])
        expect(b).toBeInstanceOf(Bytes)
        expect(b.length).toBe(2)
        expect(b[0]).toBe(0)
        b[0] = 42
        expect(b[0]).toBe(0)
        b[2] = 1337
        expect(b.length).toBe(2)
        expect(delete b[1]).toBe(false)

        expect(() => b.copyWithin(1, 0)).toThrow(NotImplementedError)
        expect(() => b.fill(3)).toThrow(NotImplementedError)
        expect(() => b.reverse()).toThrow(NotImplementedError)
        expect(() => b.set([3, 4])).toThrow(NotImplementedError)
        expect(() => b.sort()).toThrow(NotImplementedError)
    })
})


describe('dict', () => {
    createTestCase('stdtypes', 'dict', dict, {
        testName: 'basic',
    })

    test('with mapping types', () => {
        const map = new Map([[1, 2], [3, 4]])
        expect(dict(map)).toEqual(map)
        expect(dict(map) === map).toBe(false)
    })

    test('non-string keys', () => {
        // We have include numeric keys (and not have them in the JSON file)
        // because json.dumps({1: 2}) returns '{"1": 2}'.
        expect(dict([[1, 10], [2, 20]])).toEqual(new Map([[1, 10], [2, 20]]))
        const t1 = ['a', 'b']
        const t2 = ['a', 'b']
        expect(dict([[t1, 10], [t2, 20]])).toEqual(new Map([[t1, 10], [t2, 20]]))
    })
})


createTestCase('stdtypes', 'range', range)
