import webpack from "webpack"

interface Info1 {
  age: number
  sex: string
  name: string
}

type readOnlyType<T> = {
  readonly [P in keyof T]: T[P]
}

let a: readOnlyType<Info1> = {
  name: '13',
  age: 19,
  sex: 'female'
}


// record
function mapObj<K extends number | string, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K,U> {
  let res: any = {}
  for(let key in obj) {
    res[key] = f(obj[key])
  }
  return res
}

let myObj = {0: 'qwe', 1: 'qqqq', 2: 'bye'}
let final = mapObj(myObj, x => x.length)
console.log(final)