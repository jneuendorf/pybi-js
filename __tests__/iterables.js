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

const {StopIteration}  = require('../src/_errors')

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


describe('map', () => {
    test('with single iterable', () => {
        expect([...map(x => x + 1, [-1, 0, 1, 2])]).toEqual([0, 1, 2, 3])
        expect([...map(x => x + '-', 'asdf')]).toEqual(['a-', 's-', 'd-', 'f-'])
    })

    test('with multiple iterables', () => {
        function* gen1() {
            yield 2
            yield 3
            yield 4
        }
        function* gen2() {
            yield 1
            yield* gen1()
            yield 5
        }
        expect([...map((x, y) => [x, y], gen1(), gen2())]).toEqual([
            [2, 1],
            [3, 2],
            [4, 3],
        ])
    })
})


describe('next', () => {
    test('without default', () => {
        const iterator = iter([1, 2])
        expect(next(iterator)).toBe(1)
        expect(next(iterator)).toBe(2)
        expect(() => next(iterator)).toThrow(StopIteration)
    })

    test('with default', () => {
        const iterator = iter([1, 2])
        const myDefaultValue = []
        expect(next(iterator, myDefaultValue)).toBe(1)
        expect(next(iterator, myDefaultValue)).toBe(2)
        expect(next(iterator, myDefaultValue)).toBe(myDefaultValue)
    })
})


createTestCase('iterables', 'range', range)
