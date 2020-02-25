const dir = require('../src/dir')
const format = require('../src/format')
const hash = require('../src/hash')
const id = require('../src/id')
const slice = require('../src/slice')
const vars = require('../src/vars')

const {NotImplementedError} = require('../src/_errors')


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
