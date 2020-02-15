const bytes = require('../src/bytes')
const {True, False, None} = require('../src/literals')
const {b, br, r, rb} = require('../src/string-literals')


test('True, False, None', () => {
    expect(True).toBe(true)
    expect(False).toBe(false)
    expect(None).toBe(undefined)
})

test('binary literals', () => {
    expect(() => b`a${2}`).toThrow()
    expect(b`asdf`).toEqual(bytes('asdf', 'utf-8'))

    expect(b`\a`).toEqual(bytes('\a', 'utf-8'))
    expect(br`\a`).toEqual(bytes('\\a', 'utf-8'))
    expect(rb`\a`).toEqual(bytes('\\a', 'utf-8'))
})

test('string literals', () => {
    expect(r`asdf`).toBe('asdf')
    expect(r`asdf${2}`).toBe('asdf2')
    const ln = '\n'
    expect(r`\n${ln}`).toBe('\\n\n')
})
