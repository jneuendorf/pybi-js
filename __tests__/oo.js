const classmethod = require('../src/classmethod')
const delattr = require('../src/delattr')
const getattr = require('../src/getattr')
const hasattr = require('../src/hasattr')
const isinstance = require('../src/isinstance')
const issubclass = require('../src/issubclass')
const setattr = require('../src/setattr')
const staticmethod = require('../src/staticmethod')
const type = require('../src/type')

const {AttributeError, ValueError} = require('../src/_errors')


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

    test('current proposal (with static)', () => {
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


describe('delattr', () => {
    test('basic', () => {
        const o = {a: 1, b: 2}
        expect(() => delattr(o)).toThrow(TypeError)
        expect(() => delattr(o, 'a', 'b')).toThrow(TypeError)
        delattr(o, 'a')
        expect(o.hasOwnProperty('a')).toBe(false)

        expect(() => delattr(null, 'a')).toThrow(AttributeError)
        expect(() => delattr(undefined, 'a')).toThrow(AttributeError)
    })

    test('inheritance', () => {
        class A {
            constructor() {
                this.a = 1
                this.u = undefined
            }

            method() {

            }
        }

        class B extends A {
            constructor() {
                super()
                this.b = 2
            }
        }

        a = new A()
        b = new B()
        expect(b.hasOwnProperty('a')).toBe(true)
        delattr(b, 'a')
        expect(b.hasOwnProperty('a')).toBe(false)

        expect(() => delattr(a, 'method')).toThrow(AttributeError)
        expect(() => delattr(b, 'method')).toThrow(AttributeError)
    })

    test('__delattr__', () => {
        const o1 = {
            props: {
                a: 1,
                b: 2,
            },
            __delattr__(name) {
                delattr(this.props, name)
            },
        }
        expect(() => delattr(o1, 'c')).toThrow(AttributeError)
        expect(o1.props.hasOwnProperty('a')).toBe(true)
        delattr(o1, 'a')
        expect(o1.props.hasOwnProperty('a')).toBe(false)

        const o2 = {
            __delattr__: 1,
        }
        expect(() => delattr(o2, 'a')).toThrow(TypeError)
    })
})


describe('getattr', () => {
    test('basic', () => {
        const o = {a: 1}
        expect(() => getattr()).toThrow(TypeError)
        expect(() => getattr(o)).toThrow(TypeError)
        expect(() => getattr(o, 'a', 1, 2)).toThrow(TypeError)
        expect(() => getattr(null, 'a')).toThrow(AttributeError)
        expect(() => getattr(undefined, 'a')).toThrow(AttributeError)

        expect(getattr(o, 'a')).toBe(o.a)
        expect(() => getattr(o, 'b')).toThrow(AttributeError)
        expect(getattr(o, 'b', 42)).toBe(42)
    })

    test('inheritance', () => {
        class A {
            constructor() {
                this.a = 1
                this.u = undefined
            }

            methodA() {}
        }
        A.prototype.none = undefined

        class B extends A {
            constructor() {
                super()
                this.b = 2
            }

            methodB() {}
        }

        expect(getattr(A.prototype, 'none')).toBe(undefined)

        expect(getattr(new B(), 'a')).toBe(new B().a)
        expect(getattr(new B(), 'b')).toBe(new B().b)
        expect(getattr(new B(), 'u')).toBe(new B().u)
        expect(getattr(new B(), 'none')).toBe(new B().none)
        expect(getattr(new B(), 'methodA')).toBe(A.prototype.methodA)
        expect(getattr(new B(), 'methodB')).toBe(B.prototype.methodB)
    })

    test('__getattr__', () => {
        const o1 = {
            props: {
                a: 1,
                b: 2,
            },
            __getattr__(name) {
                if (this.props.hasOwnProperty(name)) {
                    return this.props[name]
                }
                throw new AttributeError(`'o1' has no attribute '${name}'`)
            },
        }
        expect(getattr(o1, 'a')).toBe(o1.props.a)
        expect(getattr(o1, 'b')).toBe(o1.props.b)
        expect(() => getattr(o1, 'c')).toThrow(AttributeError)

        const o2 = {__getattr__: 2}
        expect(() => getattr(o2, 'a')).toThrow(TypeError)
        expect(() => getattr(o2, 'a')).toThrow('not callable')
        expect(() => getattr(o2)).toThrow(TypeError)
        expect(() => getattr(o2)).toThrow('arguments')
    })
})


describe('hasattr', () => {
    test('basic', () => {
        const o = {a : 1, b: undefined}
        expect(() => hasattr(o)).toThrow(TypeError)
        expect(() => hasattr(o, 'a', 'b')).toThrow(TypeError)
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

            methodA() {}
        }
        A.prototype.none = undefined

        class B extends A {
            constructor() {
                super()
                this.b = 2
            }

            methodB() {}
        }

        const a = new A()
        const b = new B()
        expect(hasattr(a, 'a')).toBe(true)
        expect(hasattr(a, 'u')).toBe(true)
        expect(hasattr(a, 'constructor')).toBe(true)
        expect(hasattr(a, 'methodA')).toBe(true)
        expect(hasattr(a, 'none')).toBe(true)
        expect(hasattr(b, 'b')).toBe(true)
        expect(hasattr(b, 'constructor')).toBe(true)
        expect(hasattr(b, 'constructor.prototype')).toBe(false)
        expect(hasattr(b, 'methodB')).toBe(true)
        expect(hasattr(b, 'none')).toBe(true)

        expect(hasattr(b, 'a')).toBe(true)
        expect(hasattr(b, 'u')).toBe(true)
    })
})


describe('isinstance', () => {
    class A {}
    class B extends A {}
    class C extends B {}

    const a = new A()
    const b = new B()
    const c = new C()

    test('non-tuple classinfo', () => {
        expect(isinstance(a, A)).toBe(true)
        expect(isinstance(a, B)).toBe(false)
        expect(isinstance(b, B)).toBe(true)
        expect(isinstance(b, A)).toBe(true)

        expect(isinstance(1, Number)).toBe(true)
        expect(isinstance('asdf', String)).toBe(true)
        expect(isinstance(true, Boolean)).toBe(true)
        expect(isinstance(Symbol('asdf'), Symbol)).toBe(true)
        expect(isinstance(BigInt(12), BigInt)).toBe(true)
        // expect(isinstance(12n, BigInt)).toBe(true)
    })

    test('tuple classinfo', () => {
        expect(isinstance(a, [A])).toBe(true)
        expect(isinstance(a, [A, B])).toBe(true)
        expect(isinstance(a, [A, B, C])).toBe(true)
        expect(isinstance(a, [B, C])).toBe(false)
        expect(isinstance(a, [B])).toBe(false)
        expect(isinstance(a, [C])).toBe(false)
        expect(isinstance(b, [A])).toBe(true)
        expect(isinstance(b, [A, B])).toBe(true)
        expect(isinstance(b, [A, B, C])).toBe(true)
        expect(isinstance(b, [B, C])).toBe(true)
        expect(isinstance(b, [C])).toBe(false)
        expect(isinstance(c, [A])).toBe(true)
        expect(isinstance(c, [A, B])).toBe(true)
        expect(isinstance(c, [A, B, C])).toBe(true)
        expect(isinstance(c, [B, C])).toBe(true)
        expect(isinstance(c, [C])).toBe(true)

        expect(isinstance(a, [A, [B, C]])).toBe(true)
        expect(isinstance(a, [[A, B], C])).toBe(true)
        expect(isinstance(a, [[B], C])).toBe(false)
        expect(isinstance(a, [B, [C]])).toBe(false)
    })

    test('invalid', () => {
        expect(() => isinstance(a)).toThrow(TypeError)
        expect(() => isinstance(a, B, 1)).toThrow(TypeError)

        expect(() => isinstance(a, null)).toThrow(TypeError)
        expect(() => isinstance(a, 1)).toThrow(TypeError)
        expect(() => isinstance(a, 'asdf')).toThrow(TypeError)
        expect(() => isinstance(a, ['asdf', 1])).toThrow(TypeError)
        expect(() => isinstance(a, ['asdf', A])).toThrow(TypeError)
        expect(() => isinstance(a, [A, 'asdf', B])).toThrow(TypeError)
        expect(() => isinstance(a, [B, 'asdf', A])).toThrow(TypeError)
    })
})


describe('issubclass', () => {
    class A {}
    class B extends A {}
    class C extends B {}
    class D extends C {}

    test('non-tuple classinfo', () => {
        expect(issubclass(A, A)).toBe(true)
        expect(issubclass(A, B)).toBe(false)
        expect(issubclass(A, C)).toBe(false)
        expect(issubclass(A, D)).toBe(false)

        expect(issubclass(B, A)).toBe(true)
        expect(issubclass(B, B)).toBe(true)
        expect(issubclass(B, C)).toBe(false)

        expect(issubclass(C, A)).toBe(true)
        expect(issubclass(C, B)).toBe(true)
        expect(issubclass(C, C)).toBe(true)
        expect(issubclass(C, D)).toBe(false)
    })

    test('tuple classinfo', () => {
        expect(issubclass(B, [A])).toBe(true)
        expect(issubclass(B, [B])).toBe(true)
        expect(issubclass(B, [C])).toBe(false)
        expect(issubclass(B, [D])).toBe(false)
        expect(issubclass(B, [A, B])).toBe(true)
        expect(issubclass(B, [A, C, D])).toBe(true)
        expect(issubclass(B, [A, D])).toBe(true)
        expect(issubclass(B, [C, D])).toBe(false)
    })

    test('invalid', () => {
        expect(() => issubclass(A)).toThrow(TypeError)
        expect(() => issubclass(A, B, 1)).toThrow(TypeError)

        expect(() => issubclass(1, B)).toThrow(TypeError)
        expect(() => issubclass(null, B)).toThrow(TypeError)

        expect(() => issubclass(A, null)).toThrow(TypeError)
        expect(() => issubclass(A, 1)).toThrow(TypeError)
        expect(() => issubclass(A, 'asdf')).toThrow(TypeError)
        expect(() => issubclass(A, ['asdf', 1])).toThrow(TypeError)
        expect(() => issubclass(A, ['asdf', A])).toThrow(TypeError)
        expect(() => issubclass(A, [A, 'asdf', B])).toThrow(TypeError)
        expect(() => issubclass(A, [B, 'asdf', A])).toThrow(TypeError)
    })
})


describe('setattr', () => {
    test('basic', () => {
        expect(() => setattr(null, 'a', 1)).toThrow(AttributeError)
        expect(() => setattr(null)).toThrow(TypeError)
        expect(() => setattr(null, 'a')).toThrow(TypeError)
        expect(() => setattr(null, 'a', 1, 2)).toThrow(TypeError)
        const o = {}
        setattr(o, 'a', 1)
        expect(o.a).toBe(1)
        expect(o.hasOwnProperty('a')).toBe(true)
    })

    test('__setattr__', () => {
        const o1 = {
            props: {},
            __setattr__(name, value) {
                this.props[name] = value
            },
        }
        setattr(o1, 'a', 1)
        expect(o1.props.a).toBe(1)
        expect(o1.props.hasOwnProperty('a')).toBe(true)

        const o2 = {
            props: {},
            __setattr__: 2,
        }
        expect(() => setattr(o2, 'a', 1)).toThrow(TypeError)
    })
})


describe('staticmethod', () => {
    test('legacy (with static)', () => {
        const A = require('./oo__staticmethod__legacy_static')(staticmethod)
        const staticMethod = A.staticMethod

        // NOTE: In contrary to function decorator!
        expect(() => staticMethod()).not.toThrow()
        expect(A.staticMethod()).toBe(undefined)
        expect(staticMethod()).toBe(undefined)
        expect(new A().staticMethod()).toBe(undefined)
        const o = {
            m: A.staticMethod,
        }
        expect(o.m()).toBe(undefined)
    })

    test('legacy', () => {
        const A = require('./oo__staticmethod__legacy')(staticmethod)
        const staticMethod = A.staticMethod

        // NOTE: In contrary to function decorator!
        expect(() => staticMethod()).not.toThrow()
        expect(A.staticMethod()).toBe(undefined)
        expect(staticMethod()).toBe(undefined)

        expect(new A().staticMethod()).toBe(undefined)
        const o = {
            m: A.staticMethod,
        }
        expect(o.m()).toBe(undefined)
    })

    test('current proposal', () => {
        const A = require('./oo__staticmethod__current')(staticmethod)
        const staticMethod = A.staticMethod

        expect(staticMethod()).toBe(undefined)
        expect(A.staticMethod()).toBe(undefined)
        expect(staticMethod()).toBe(undefined)
        expect(A.prototype.hasOwnProperty('staticMethod')).toBe(false)
    })

    test('current proposal (with static)', () => {
        const A = require('./oo__staticmethod__current_static')(staticmethod)
        const staticMethod = A.staticMethod

        expect(staticMethod()).toBe(undefined)
        expect(A.staticMethod()).toBe(undefined)
        expect(staticMethod()).toBe(undefined)
        expect(A.prototype.hasOwnProperty('staticMethod')).toBe(false)
    })

    test('python-like function decorator', () => {
        const A = require('./oo__staticmethod__func')(staticmethod)
        const staticMethod = A.staticMethod

        expect(staticMethod()).toBe(undefined)
        expect(A.staticMethod()).toBe(undefined)
        expect(staticMethod()).toBe(undefined)

        const detachedStaticMethod = staticmethod(function(cls) {
            return cls
        })
        A.monkeyPatched = detachedStaticMethod
        // TODO: This is not allowed in python because:
        //       TypeError: 'staticmethod' object is not callable
        //       This can probably lead to bugs if the same staticmethod-object
        //       is used with different classes.
        expect(detachedStaticMethod()).toBe(undefined)
        expect(A.monkeyPatched()).toBe(undefined)

        class B {}
        B.monkeyPatched = detachedStaticMethod
        expect(B.monkeyPatched()).toBe(undefined)
    })

    test('junk', () => {
        expect(() => staticmethod(1,2)).toThrow()
    })
})


describe('type', () => {
    test('invalid args', () => {
        expect(() => type()).toThrow(TypeError)
        expect(() => type(1, 2)).toThrow(TypeError)
        expect(() => type(1, 2, 3, 4)).toThrow(TypeError)
    })

    test('1 arg', () => {
        // Primitives
        expect(type('asdf')).toBe(String)
        expect(type(true)).toBe(Boolean)
        expect(type(1)).toBe(Number)
        expect(type(Symbol('asdf'))).toBe(Symbol)
        expect(type(BigInt(1))).toBe(BigInt)

        expect(type(new String('asdf'))).toBe(String)
        expect(type(new Boolean(true))).toBe(Boolean)
        expect(type(new Number(1))).toBe(Number)

        class A {}
        class B extends A {}
        expect(type(new A())).toBe(A)
        expect(type(new B())).toBe(B)
    })

    test('3 args', () => {
        // Python:
        // >>> A = type('A', (), {'c': classmethod(lambda cls: cls), 'm': lambda self: self, 'n': 42})
        // >>> A.c() is A
        // True
        // >>> isinstance(A().m(), A)
        // True
        // >>> A().n
        // 42
        // >>> A.n
        // 42
        // >>> A.m()
        // TypeError: <lambda>() missing 1 required positional argument: 'self'
        const A = type('A', [], {
            c: classmethod(function(cls) {
                return cls
            }),
            m: function() {
                return this
            },
            n: 42,
        })
        const a  = new A

        expect(A.c()).toBe(A)
        expect(a.c()).toBe(A)
        expect(a.m()).toBe(a)
        expect(() => A.m()).toThrow()
        expect(A.n).toBe(42)
        expect(a.n).toBe(42)
    })

    test('inheritance', () => {
        class A {}
        const B = type('B', A, {})
        expect(new B()).toBeInstanceOf(B)
        expect(new B()).toBeInstanceOf(A)

        const C = type('C', [A], {})
        expect(new C()).toBeInstanceOf(C)
        expect(new C()).toBeInstanceOf(A)

        expect(() => type('C', [A, B], {})).toThrow(ValueError)
        expect(() => type('D', [1], {})).toThrow(TypeError)
        expect(() => type('D', [A], {
            constructor() {},
        })).toThrow(TypeError)
    })
})
