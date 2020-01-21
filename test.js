const {install} = require('./src/index')

install()

// const a = {}
// const b = {}
// print(id(a))
// print(id(a))
// print(id(b))

// input('enter something: ').then(output =>
//     console.log('you typed', output)
// )

// print(int('2'))
// print(int('2.3'))

function* g1() {
  yield 2;
  yield 3;
  yield 4;
}

function* g2() {
  yield 1;
  yield* g1();
  yield 5;
}

print(g1()[Symbol.iterator])

const iterator = map((x, y) => [x, y], g1(), g2())
print(iterator.next())
print(iterator.next())
print(iterator.next())
print(iterator.next())
