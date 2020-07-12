// let sym = Symbol('I am a Symbol')

// let info = {
//   [sym]: 'I am a big symbol 啊啊啊',
//   name: 'slr',
//   age: 18
// }
//
// window.arr = Reflect.ownKeys(info)
//
// console.log(info[window.arr[2]])

let sym2 = Symbol.for('slr')
console.log(Symbol.keyFor(sym2))
