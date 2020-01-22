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



// const A = type('A', [], {
//     prop: 'myprop',
//     arrowMethod: (ref) => {
//         console.log('arrowMethod', this === ref)
//     },
//     method: function(ref) {
//         console.log('method', this.prop)
//     },
// })
// const a = new A()
// print(type(a) === A)
// a.method(a)
// a.arrowMethod(a)



// print(list(zip([1,2,3], [4,5,6], [7,8,9,10])))
// // from Python's docs:
// const x = [1, 2, 3]
// const y = [4, 5, 6]
// zipped = zip(x, y)
// print(list(zipped))
// const [x2, y2] = zip(...zip(x, y))
// print(x.toString() == list(x2).toString() && y.toString() == list(y2).toString())
