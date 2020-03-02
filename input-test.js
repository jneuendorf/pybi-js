const input = require('./src/input')
// const a = input('a: ', false)
// console.log('>>>>>', a)


async function main() {
    const a = await input('a: ')
    console.log(a)
}
main()
