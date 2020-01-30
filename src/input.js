// See https://stackoverflow.com/a/18267308/6928824
module.exports = prompt => {
    if (prompt) {
        process.stdout.write(prompt)
    }
    process.stdin.setEncoding('utf8')
    return new Promise((resolve, reject) => {
        try {
            process.stdin.once('data', input => {
                process.stdin.pause()
                resolve(input)
            }).resume()
        }
        catch (error) {
            reject(error)
        }
    })
}
