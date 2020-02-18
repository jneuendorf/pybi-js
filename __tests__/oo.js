const classmethod = require('../src/classmethod')
const delattr = require('../src/delattr')
const getattr = require('../src/getattr')
const hasattr = require('../src/hasattr')
const isinstance = require('../src/isinstance')
const issubclass = require('../src/issubclass')
const setattr = require('../src/setattr')
const staticmethod = require('../src/staticmethod')
const type = require('../src/type')


describe('classmethod', () => {
    test('legacy (with static)', () => {
        const A = require('./oo__classmethod__legacy_static')(classmethod)
        const clsMethod = A.clsMethod

        // NOTE: In contrary to function decorator!
        expect(() => clsMethod()).not.toThrow()
        expect(A.clsMethod()).toBe(A)
        expect(clsMethod()).toBe(A)
        expect(new A().clsMethod()).toBe(A)
        const o = {
            m: A.clsMethod,
        }
        expect(o.m()).toBe(A)
    })

    test('legacy', () => {
        const A = require('./oo__classmethod__legacy')(classmethod)
        const clsMethod = A.clsMethod

        // NOTE: In contrary to function decorator!
        expect(() => clsMethod()).not.toThrow()
        expect(A.clsMethod()).toBe(A)
        expect(clsMethod()).toBe(A)

        expect(new A().clsMethod()).toBe(A)
        const o = {
            m: A.clsMethod,
        }
        expect(o.m()).toBe(A)
    })

    test('current proposal', () => {
        const A = require('./oo__classmethod__current')(classmethod)
        const clsMethod = A.clsMethod

        expect(() => clsMethod()).toThrow()
        expect(A.clsMethod()).toBe(A)
        expect(clsMethod()).toBe(A)
        expect(A.prototype.hasOwnProperty('clsMethod')).toBe(false)
    })

    test('current proposal', () => {
        const A = require('./oo__classmethod__current_static')(classmethod)
        const clsMethod = A.clsMethod

        expect(() => clsMethod()).toThrow()
        expect(A.clsMethod()).toBe(A)
        expect(clsMethod()).toBe(A)
        expect(A.prototype.hasOwnProperty('clsMethod')).toBe(false)
    })

    test('python-like function decorator', () => {
        const A = require('./oo__classmethod__func')(classmethod)
        const clsMethod = A.clsMethod

        expect(() => clsMethod()).toThrow()
        expect(A.clsMethod()).toBe(A)
        expect(clsMethod()).toBe(A)

        // Python:
        // >>> f = classmethod(lambda cls: cls)
        // >>> class A:
        // ...   f = f
        // ...
        // >>> A.f() is A
        // True
        //
        // We got this? Hell yeah!
        const detachedClsMethod = classmethod(function(cls) {
            return cls
        })
        A.monkeyPatched = detachedClsMethod
        expect(() => detachedClsMethod()).toThrow()
        expect(A.monkeyPatched()).toBe(A)
        // TODO: This is not allowed in python because:
        //       TypeError: 'classmethod' object is not callable
        //       This can probably lead to bugs if the same classmethod-object
        //       is used with different classes.
        expect(detachedClsMethod()).toBe(A)

        class B {}
        B.monkeyPatched = detachedClsMethod
        expect(() => B.monkeyPatched()).toThrow()
    })

    test('junk', () => {
        expect(() => classmethod(1,2)).toThrow()
    })
})


describe('hasattr', () => {
    test('basic', () => {
        const o = {a : 1, b: undefined}
        expect(hasattr(o, 'a')).toBe(true)
        expect(hasattr(o, 'b')).toBe(true)
        expect(hasattr(o, 'c')).toBe(false)
    })

    test('inheritance', () => {
        class A {
            constructor() {
                this.a = 1
                this.u = undefined
            }
        }

        class B extends A {
            constructor() {
                super()
                this.b = 2
            }
        }

        const a = new A()
        const b = new B()
        expect(hasattr(a, 'a')).toBe(true)
        expect(hasattr(a, 'u')).toBe(true)
        expect(hasattr(a, 'constructor')).toBe(true)
        expect(hasattr(b, 'b')).toBe(true)
        expect(hasattr(b, 'constructor')).toBe(true)
        expect(hasattr(b, 'constructor.prototype')).toBe(false)

        expect(hasattr(b, 'a')).toBe(true)
        expect(hasattr(b, 'u')).toBe(true)
    })
})
