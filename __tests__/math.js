const abs = require('../src/abs')
const divmod = require('../src/divmod')
const max = require('../src/max')
const min = require('../src/min')
const pow = require('../src/pow')
const round = require('../src/round')
const sum = require('../src/sum')

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
        for (const arg in args) {
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
        for (const args in args2d) {
            expect(max(args)).toBe(Math.max(...args))
        }
    })

    test('with multiple args', () => {
        const args2d = [
            [1, 3, 7, 1, -2],
            ['a', 2],
            [Infinity, 2**20],
        ]
        for (const args in args2d) {
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
        for (const args in args2d) {
            expect(min(args)).toBe(Math.min(...args))
        }
    })

    test('with multiple args', () => {
        const args2d = [
            [1, 3, 7, 1, -2],
            ['a', 2],
            [Infinity, 2**20],
        ]
        for (const args in args2d) {
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
        for (const args in args2d) {
            expect(pow(args)).toBe(Math.pow(...args))
        }
    })

    test('with mod arg', () => {
        // See example at https://docs.python.org/3/library/functions.html#pow
        expect(pow(38, -1, 97)).toBe(23)
    })
})
