const fs = require('fs')
const path = require('path')


function createTestCase(jsonFilename, testName, func=null,
                        {testFunc=test, logIndices=false}={}) {
    const args2dByFunc = eval(`( ${fs.readFileSync(
        path.join(__dirname, `${jsonFilename}.json`)
    )} )`)
    const expected = eval(`( ${fs.readFileSync(
        path.join(__dirname, `${jsonFilename}_expected.json`)
    )} )`)
    if (!func) {
        func = require(path.join(__dirname, '..', 'src', testName))
    }

    return testFunc(testName, () => {
        for (const [funcname, args2d] of Object.entries(args2dByFunc)) {
            let i = 0
            for (const args of args2d) {
                if (logIndices) {
                    console.log('i =', i)
                }
                expect(func(...args)).toEqual(expected[funcname][i])
                i += 1
            }
        }
    })
}

module.exports = {
    createTestCase,
}
