const dir = require('../src/dir')
const format = require('../src/format')
const hash = require('../src/hash')
const id = require('../src/id')
const slice = require('../src/slice')
const vars = require('../src/vars')


describe('eval', () => {
    test('', () => {

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
