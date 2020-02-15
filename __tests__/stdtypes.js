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
const {NotImplementedError} = require('../src/_errors')

const {createTestCase} = require('./_utils')


describe('bytearray', () => {
    createTestCase('stdtypes', 'bytearray', bytearray, {
        testName: 'without buffer interface objects',
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


createTestCase('stdtypes', 'float', float, {
    deserializer(obj) {
        if (typeof(obj) !== 'string') {
            return obj
        }
        const mapping = {
            nan: NaN,
            inf: Infinity,
            '-inf': -Infinity,
        }
        return mapping[obj]
    }
})


describe('frozenset', () => {
    test('construction', () => {
        expect(frozenset()).toBeInstanceOf(Set)
        expect(frozenset().constructor).not.toBe(Set)
        expect(frozenset().size).toBe(0)
        expect(frozenset([1, 'a']).size).toBe(2)
        expect(frozenset([1, 'a']).has('a')).toBe(true)
        expect(frozenset([1, 'a']).has('b')).toBe(false)
        expect([...frozenset([1, 'a'])]).toEqual([1, 'a'])
    })

    test('immutability', () => {
        const fs = frozenset()
        expect(() => fs.add(1)).toThrow(TypeError)
        expect(() => fs.clear()).toThrow(TypeError)
        expect(() => fs.delete(1)).toThrow(TypeError)
    })
})


createTestCase('stdtypes', 'int', int)


describe('list', () => {
    createTestCase('stdtypes', 'list', list, {testName: 'basic'})

    test('__int__', () => {
        const o = {
            __int__() {
                return 2
            },
        }
        const oWrong = {
            __int__() {
                return 'asdf'
            },
        }
        const oWrong2 = {__int__: 2}
        expect(int(o)).toBe(2)
        expect(() => int(oWrong)).toThrow(TypeError)
        expect(() => int(oWrong)).toThrow(TypeError)
        expect(() => int(oWrong)).toThrow('__int__ returned non-int')
        expect(() => int(oWrong2)).toThrow(TypeError)
        expect(() => int(oWrong2)).toThrow('is not callable')
    })

    test('__index__', () => {
        const o = {
            __index__() {
                return 2
            },
        }
        const oWrong = {
            __index__() {
                return 'asdf'
            },
        }
        const oWrong2 = {__index__: 2}
        expect(int(o)).toBe(2)
        expect(() => int(oWrong)).toThrow(TypeError)
        expect(() => int(oWrong)).toThrow(TypeError)
        expect(() => int(oWrong)).toThrow('__index__ returned non-int')
        expect(() => int(oWrong2)).toThrow(TypeError)
        expect(() => int(oWrong2)).toThrow('is not callable')
    })

    test('__trunc__', () => {
        const o = {
            __trunc__() {
                return 2
            },
        }
        const oWrong = {
            __trunc__() {
                return 'asdf'
            },
        }
        const oWrong2 = {__trunc__: 2}
        expect(int(o)).toBe(2)
        expect(() => int(oWrong)).toThrow(TypeError)
        expect(() => int(oWrong)).toThrow(TypeError)
        expect(() => int(oWrong)).toThrow('__trunc__ returned non-int')
        expect(() => int(oWrong2)).toThrow(TypeError)
        expect(() => int(oWrong2)).toThrow('is not callable')
    })
})


createTestCase('stdtypes', 'range', range)


createTestCase('stdtypes', 'set', set, {
    deserializer: arr => new Set(arr),
})


describe('str', () => {
    createTestCase('stdtypes', 'str', str, {
        testName: 'basic',
        deserializer(s) {
            if (s === 'None') {
                return 'null'
            }
            if (s === 'True') {
                return 'true'
            }
            if (s === 'False') {
                return 'false'
            }
            return s
        },
    })

    test('__str__', () => {
        const o1 = {
            __str__() {
                return 'asdf'
            }
        }
        expect(str(o1)).toBe('asdf')

        const o2 = {
            __str__() {
                return 2
            }
        }
        expect(() => str(o2)).toThrow(TypeError)

        const o3 = {
            __str__() {
                return null
            }
        }
        expect(() => str(o3)).toThrow(TypeError)
    })

    test('bytes-like + encoding, erroneous', () => {
        // TypeError/RangeError/NodeError [ERR_UNKNOWN_ENCODING]: Unknown encoding: asdf
        expect(() => str(bytes('äsdf', 'utf-8'), 'asdf')).toThrow('encoding')
        expect(() => str(bytearray(), 'asdf')).toThrow('encoding')

        expect(() => str(bytearray(), 2)).toThrow(TypeError)
    })

    test('bytes-like + encoding, valid', () => {
        // Node:
        // > Buffer.from('aüa','utf-8')
        // <Buffer 61 c3 bc 61>
        //
        // > Buffer.from('aüa','utf-8').toString('utf-8')
        // 'aüa'
        expect(str(bytes([0x61, 0xc3, 0xbc, 0x61]), 'utf-8')).toBe('aüa')
        expect(str(bytearray([0x61, 0xc3, 0xbc, 0x61]), 'utf-8')).toBe('aüa')
    })

    test('bytes-like, no encoding', () => {
        // >>> str(bytes([97, 98]))
        // "b'ab'"
        // >>> str(b'ab')
        // "b'ab'"
        expect(str(bytes([97, 98]))).toBe("b`ab`")
        // >>> str(bytes('ä','utf8'))
        // "b'\\xc3\\xa4'"
        expect(str(bytes('ä', 'utf-8'))).toBe("b`\\xc3\\xa4`")
    })
})


createTestCase('stdtypes', 'tuple', tuple)
