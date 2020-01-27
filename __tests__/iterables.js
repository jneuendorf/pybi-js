const all = require('../src/all')
const any = require('../src/any')
const enumerate = require('../src/enumerate')
const filter = require('../src/filter')
const iter = require('../src/iter')
const len = require('../src/len')
const map = require('../src/map')
const next = require('../src/next')
const range = require('../src/range')
const sorted = require('../src/sorted')
// sum is tested in math.js
const zip = require('../src/zip')

const {createTestCase} = require('./_utils')


createTestCase('iterables', 'all', all)
createTestCase('iterables', 'any', any)
createTestCase('iterables', 'enumerate', enumerate, {logIndices: true})
