const dir = require('../src/dir')
const format = require('../src/format')
const hash = require('../src/hash')
const id = require('../src/id')
const slice = require('../src/slice')
const vars = require('../src/vars')

const {NotImplementedError} = require('../src/_errors')
const {config} = require('../src/_config')


describe('dir', () => {
    test('basic', () => {
        expect(() => dir()).toThrow(NotImplementedError)

        class A {
            static clsMethod() {}

            method() {}
        }
        class B extends A {
            constructor() {
                super()
                this.b = 1
            }
        }
        const a = new A()
        const b = new B()
        const objectAttrs = dir(Object)
        const expectedAAttrs = objectAttrs.concat(['clsMethod', 'method']).sort()

        expect(dir(A)).toEqual(expectedAAttrs)
        expect(dir(a)).toEqual(expectedAAttrs)
        expect(dir(B)).toEqual(expectedAAttrs)
        expect(dir(b)).toEqual(expectedAAttrs.concat(['b']).sort())

        const o = {
            [Symbol.iterator]: function* () {
                yield 1
                yield 2
                yield 3
            },
            async* [Symbol.asyncIterator]() {
                yield "hello"
                yield "async"
                yield "iteration!"
            },
        }
        expect(dir(o)).toEqual(objectAttrs.concat([
            Symbol.iterator, Symbol.asyncIterator,
        ]))
    })

    test('__dir__', () => {
        const o1 = {
            __dir__() {
                return ['a', 'b']
            },
        }
        expect(dir(o1)).toEqual(['a', 'b'])

        const o2 = {
            __dir__() {
                return 2
            },
        }
        expect(() => dir(o2)).toThrow(TypeError)

        const o3 = {
            __dir__: 2,
        }
        expect(() => dir(o3)).toThrow(TypeError)
    })
})


describe('format', () => {
    describe('without sprintf-js', () => {
        config.format_useSprintf = false

        test('basic', () => {
            console.warn = jest.fn()
            expect(format('asdf', '??')).toBe('')
            expect(console.warn).toHaveBeenCalled()

            config.format_warnNoSprintf = false
            console.warn = jest.fn()
            expect(format('asdf', '??')).toBe('')
            expect(console.warn).not.toHaveBeenCalled()
        })

        test('invalid args', () => {
            expect(() => format()).toThrow(TypeError)
            expect(() => format('asdf', undefined)).toThrow(TypeError)
            expect(() => format('asdf', 1)).toThrow(TypeError)
            expect(() => format('asdf', [])).toThrow(TypeError)
            expect(() => format('asdf', {})).toThrow(TypeError)
            expect(() => format('asdf', true)).toThrow(TypeError)
            expect(() => format('asdf', 'x', 1)).toThrow(TypeError)
        })

        test('__format__ on class', () => {
            function A() {}
            A.__format__ = function(value, format_spec) {
                return 'asdf'
            }
            expect(format(new A, 'x')).toBe('asdf')

            function B() {}
            B.__format__ = function(value, format_spec) {
                return 2
            }
            expect(() => format(new B, 'x')).toThrow(TypeError)

            function C() {}
            C.__format__ = 2
            expect(() => format(new C, 'x')).toThrow(TypeError)
        })

        test('__format__ on instance', () => {
            const o1 = {
                __format__(format_spec) {
                    return 'asdf'
                }
            }
            const o2 = {
                __format__(format_spec) {
                    return 2
                }
            }
            const o3 = {__format__: 2}

            expect(format(o1, 'asdf')).toBe('asdf')
            expect(() => format(o2, 'asdf')).toThrow(TypeError)
            expect(() => format(o3, 'asdf')).toThrow(TypeError)
        })

        test('empty format_spec', () => {
            expect(format('asdf')).toBe('asdf')
            expect(format(1)).toBe('1')
            expect(format(1.5)).toBe('1.5')
            expect(format(true)).toBe('true')
            expect(format(null)).toBe('null')
        })
    })

    test('with sprintf-js', () => {
        config.format_useSprintf = true
        const {sprintf} = require('sprintf-js')
        expect(format(false, '%t')).toBe(sprintf('%t', false))
        expect(format('asdf', '%s')).toBe(sprintf('%s', 'asdf'))
        expect(format(Math.PI, '%f')).toBe(sprintf('%f', Math.PI))
    })
})


describe('hash', () => {
    describe('without hash-sum', () => {
        config.hash_useHashSum = false

        test('basic', () => {
            console.warn = jest.fn()
            expect(hash('asdf')).toBe(0)
            expect(console.warn).toHaveBeenCalled()

            config.hash_warnNoHashSum = false
            console.warn = jest.fn()
            expect(hash('asdf')).toBe(0)
            expect(console.warn).not.toHaveBeenCalled()
        })

        test('invalid args', () => {
            expect(() => hash()).toThrow(TypeError)
            expect(() => hash('asdf', undefined)).toThrow(TypeError)
            expect(() => hash('asdf', 1)).toThrow(TypeError)
            expect(() => hash('asdf', [])).toThrow(TypeError)
            expect(() => hash('asdf', {})).toThrow(TypeError)
            expect(() => hash('asdf', true)).toThrow(TypeError)
            expect(() => hash('asdf', 'x', 1)).toThrow(TypeError)
        })

        test('__hash__ on instance', () => {
            const o1 = {
                __hash__() {
                    return 2
                }
            }
            const o2 = {
                __hash__() {
                    return 'asdf'
                }
            }
            const o3 = {__hash__: 2}

            expect(hash(o1)).toBe(2)
            expect(() => hash(o2)).toThrow(TypeError)
            expect(() => hash(o3)).toThrow(TypeError)
        })
    })

    test('with hash-sum', () => {
        config.hash_useHashSum = true
        const _hashSum = require('hash-sum')
        const hashSum = o => parseInt(_hashSum(o), 16)
        expect(hash(false)).toBe(hashSum(false))
        expect(hash('asdf')).toBe(hashSum('asdf'))
        expect(hash(Math.PI)).toBe(hashSum(Math.PI))
        expect(hash([1, {}])).toBe(hashSum([1, {}]))
        expect(hash({})).toBe(hashSum({}))
        expect(hash(null)).toBe(hashSum(null))
        expect(hash(undefined)).toBe(hashSum(undefined))
    })
})


test('id', () => {
    const objects = [
        1,
        2.5,
        true,
        'asdf',
        [],
        [1, 2, 3],
        {},
        {a: 1},
    ]
    const idsSet = new Set()
    const ids = []
    for (const object of objects) {
        const oid = id(object)
        expect(idsSet.has(oid)).toBe(false)
        idsSet.add(oid)
        ids.push(oid)
    }
    for (const [idx, object] of Object.entries(objects)) {
        const oid = id(object)
        expect(idsSet.has(oid)).toBe(true)
        expect(ids[idx]).toBe(oid)
    }
})
