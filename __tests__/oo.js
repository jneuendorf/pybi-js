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
    // test('legacy', () => {
    //
    // })
    //
    // test('current proposal', () => {
    //
    // })

    test('python-like function decorator', () => {
        const A = require('./oo__classmethod__func')(classmethod)
        // console.log(A)
        // console.log(A.clsMethod() == A)
        expect(A.clsMethod()).toBe(A)
    })
})
