const fs = require('fs')
const path = require('path')

const errors = require('../src/_errors')

const identity = x => x


function createTestCase(jsonFilename, funcName, func=null,
                        {
                            testFunc=test,
                            logIndices=false,
                            testName=null,
                            deserializer=identity,
                        }={}) {
    const args2dByFunc = eval(`( ${fs.readFileSync(
        path.join(__dirname, `${jsonFilename}.json`)
    )} )`)
    const expected = eval(`( ${fs.readFileSync(
        path.join(__dirname, `${jsonFilename}_expected.json`)
    )} )`)
    if (!func) {
        func = require(path.join(__dirname, '..', 'src', funcName))
    }

    return testFunc(testName || funcName, () => {
        const args2d = args2dByFunc[funcName]
        let i = 0
        for (const args of args2d) {
            if (logIndices) {
                console.log('i =', i, funcName)
            }
            expectedValue = expected[funcName][i]
            if (expectedValue.__error__) {
                expect(() => func(...args)).toThrow(
                    errors[expectedValue.__error__.type]
                )
            }
            else {
                expect(func(...args)).toEqual(deserializer(expectedValue))
            }
            i += 1
        }
    })
}

module.exports = {
    createTestCase,
}
