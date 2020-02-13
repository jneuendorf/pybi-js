const fs = require('fs')
const path = require('path')

const errors = require('../src/_errors')

const identity = x => x


function createTestCase(jsonFilename, funcName, func=null,
                        {
                            testFunc=test,
                            logMeta=false,
                            runOnly=-1,
                            testName=null,
                            deserializer=identity,
                            postProcessor=identity,
                            equality='toEqual',
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
            if (runOnly >= 0 && i !== runOnly) {
                i++
                continue
            }

            if (logMeta) {
                console.log(funcName, `#${i};`, 'args:', args)
            }
            expectedValue = expected[funcName][i]
            // console.log(expectedValue)
            if (expectedValue.__error__) {
                expect(() => func(...args)).toThrow(
                    errors[expectedValue.__error__.type]
                )
            }
            else {
                const expectedValue = postProcessor(func(...args))
                const receivedValue = deserializer(expectedValue)
                expect(expectedValue)[equality](receivedValue)
            }

            i++
        }
    })
}

module.exports = {
    createTestCase,
}
