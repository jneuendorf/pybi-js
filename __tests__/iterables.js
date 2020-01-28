const all = require('../src/all')
const any = require('../src/any')
const enumerate = require('../src/enumerate')
const filter = require('../src/filter')
const iter = require('../src/iter')
const len = require('../src/len')
const map = require('../src/map')
const next = require('../src/next')
const range = require('../src/range')
const sorted = require('../src/sorted')
// sum is tested in math.js
const zip = require('../src/zip')

const {createTestCase} = require('./_utils')


createTestCase('iterables', 'all', all)
createTestCase('iterables', 'any', any)
createTestCase('iterables', 'enumerate', enumerate)

describe('filter', () => {
    test('without function argument', () => {
        expect([...filter([-1, 0, 1, 2])]).toEqual([-1, 1, 2])
        expect([...filter([-1, 1, 2])]).toEqual([-1, 1, 2])
        expect([...filter([0, true, false, 'not empty'])]).toEqual([true, 'not empty'])
        expect([...filter([0, false, [], {}, ''])]).toEqual([])
    })

    test('with function argument', () => {
        expect([...filter(x => x < 1, [-1, 0, 1, 2])]).toEqual([-1, 0])
        expect([...filter(x => x >= 1, [-1, 0, 1, 2])]).toEqual([1, 2])
    })

    test('with wrong number of arguments', () => {
        expect(() => [...filter(1, 2 ,3)]).toThrow(TypeError)
    })
})

describe('iter', () => {
    test('without sentinel argument', () => {
        let obj = [1, 2, 3]
        let res = iter(obj)
        expect([...res]).toEqual(obj)

        obj = 'asdf'
        res = iter(obj)
        expect([...res]).toEqual(obj.split(''))

        expect(() => iter(true)).toThrow(TypeError)
    })

    test('with sentinel argument', () => {
        let i = 0
        let res = iter(() => i++, 2)
        expect([...res]).toEqual([0, 1])

        i = 0
        let s = 'asdf'
        res = iter(() => s[i++], 'd')
        expect([...res]).toEqual('as'.split(''))

        expect(() => iter(true, false)).toThrow(TypeError)
    })
})

describe('len', () => {
    createTestCase('iterables', 'len', len, {testName: 'simple'})

    test('size, __len__', () => {
        const map = new Map()
        expect(len(map)).toBe(0)

        const set = new Set()
        expect(len(set)).toBe(0)

        const customObject = {
            __len__() {
                return 42
            }
        }
        expect(len(customObject)).toBe(42)
    })
})
