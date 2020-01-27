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
