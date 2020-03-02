// See
// https://nodejs.dev/accept-input-from-the-command-line-in-nodejs
// https://stackoverflow.com/a/18267308/6928824
// https://stackoverflow.com/a/16048083/6928824

const readline = require('readline')
const {KeyboardInterrupt} = require('./_errors')

module.exports = (prompt='', async=true) => {
    process.stdin.setEncoding('utf8')
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    if (async) {
        return new Promise((resolve, reject) => {
            try {
                rl.question(prompt, answer => {
                    rl.close()
                    resolve(answer)
                })
                rl.on('SIGINT', () => {
                    rl.close()
                    reject(new KeyboardInterrupt())
                })
            }
            catch (error) {
                reject(error)
            }
        })
    }
    else {
        let response
        rl.question(prompt, answer => {
            rl.close()
            response = answer
        })

        let sigint = false
        rl.on('SIGINT', () => {
            rl.close()
            sigint = true
        })

        let sleep
        try {
            sleep = require('system-sleep')
        }
        catch (error) {
            sleep = () => {}
        }

        while (response === undefined) {
            // (semi) busy waiting
            if (sigint) {
                throw new KeyboardInterrupt()
            }
            sleep(200)
        }
        return response
    }
}
