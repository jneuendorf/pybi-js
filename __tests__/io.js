const evaluate = require('../src/eval')
const exec = require('../src/exec')
const input = require('../src/input')
const open = require('../src/open')
const print = require('../src/print')


test('eval', () => {
    expect(evaluate('1')).toBe(1)
    expect(evaluate('1+1')).toBe(2)

    const globals = {
        f() {
            return 1
        },
        g() {
            return 'g'
        },
        x: 5,
    }
    const locals = {x: 2, y: 3}
    expect(evaluate('f()', globals, locals)).toBe(globals.f())
    expect(evaluate('g()', globals, locals)).toBe(globals.g())
    expect(evaluate('x', globals, locals)).toBe(locals.x)
    expect(evaluate('x', globals)).toBe(globals.x)
    expect(evaluate('y', globals, locals)).toBe(locals.y)

    expect(() => evaluate()).toThrow(TypeError)
    expect(() => evaluate(1)).toThrow(TypeError)
    expect(() => evaluate(true)).toThrow(TypeError)
    expect(() => evaluate(1, {})).toThrow(TypeError)
    expect(() => evaluate(1, {}, {})).toThrow(TypeError)
    expect(() => evaluate(1, {}, {}, 1)).toThrow(TypeError)
    expect(() => evaluate('1', {}, {}, 1)).toThrow(TypeError)
    expect(() => evaluate('1', '1')).toThrow(TypeError)
    expect(() => evaluate('1', '1', '1')).toThrow(TypeError)
    expect(() => evaluate('1', {}, '1')).toThrow(TypeError)
})
