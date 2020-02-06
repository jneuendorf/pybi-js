const abs = require('../src/abs')
const divmod = require('../src/divmod')
const max = require('../src/max')
const min = require('../src/min')
const pow = require('../src/pow')
const round = require('../src/round')
const sum = require('../src/sum')

const {ValueError} = require('../src/_errors')

const {createTestCase} = require('./_utils')


describe('abs', () => {
    test('simple', () => {
        const args = [
            1,
            -2,
            'a',
            Infinity,
            -Infinity,
        ]
        for (const arg of args) {
            expect(abs.simple(arg)).toBe(Math.abs(arg))
        }
    })

    test('extended', () => {
        const right = {
            __abs__() {
                return 'surprise!'
            }
        }
        const wrong = {__abs__: 'surprise!'}
        expect(abs.extended(right)).toBe('surprise!')
        expect(() => abs.extended(wrong)).toThrow()
        // For coverage: normal calls too
        expect(abs.extended(-2)).toBe(Math.abs(-2))
    })
})


createTestCase('math', 'divmod', divmod)


describe('max', () => {
    test('with iterable', () => {
        const args2d = [
            [1, 3, 7, 1, -2],
            ['a', 2],
            [Infinity, 2**20],
        ]
        for (const args of args2d) {
            expect(max(args)).toBe(Math.max(...args))
        }
    })

    test('with multiple args', () => {
        const args2d = [
            [1, 3, 7, 1, -2],
            ['a', 2],
            [Infinity, 2**20],
        ]
        for (const args of args2d) {
            expect(max(...args)).toBe(Math.max(...args))
        }
    })
})


describe('min', () => {
    test('with iterable', () => {
        const args2d = [
            [1, 3, 7, 1, -2],
            ['a', 2],
            [Infinity, 2**20],
        ]
        for (const args of args2d) {
            expect(min(args)).toBe(Math.min(...args))
        }
    })

    test('with multiple args', () => {
        const args2d = [
            [1, 3, 7, 1, -2],
            ['a', 2],
            [Infinity, 2**20],
        ]
        for (const args of args2d) {
            expect(min(...args)).toBe(Math.min(...args))
        }
    })
})


describe('pow', () => {
    test('without mod arg', () => {
        const args2d = [
            [1, 3],
            [1, 0],
            [0, 30],
            ['a', 2],
            [Infinity, 2],
            [-Infinity, 2],
        ]
        for (const args of args2d) {
            expect(pow(...args)).toBe(Math.pow(...args))
        }
    })

    test('with mod arg', () => {
        // See example at https://docs.python.org/3/library/functions.html#pow
        expect(pow(38, -1, 97)).toBe(23)
        expect(() => pow(38, -1, 0)).toThrow(ValueError)
        expect(() => pow(0, -1, 0)).toThrow(ValueError)
    })
})


describe('round', () => {
    test('without ndigits arg', () => {
        const args = [
            [13.2],
            [13.5],
            [13.8],
            [-7.2],
            [-7.5],
            [-7.8],
            [Infinity],
            [-Infinity]
        ]
        for (const arg of args) {
            expect(round(arg)).toBe(Math.round(arg))
        }
    })

    test('with ndigits arg', () => {
        expect(round(38, -1)).toBe(4)
        expect(round(38.235, 2)).toBe(38.24)
        expect(round(-38.235, 2)).toBe(-38.23)
        expect(() => round(-38.235, 2.4)).toThrow(TypeError)
    })
})


createTestCase('math', 'sum', sum)
