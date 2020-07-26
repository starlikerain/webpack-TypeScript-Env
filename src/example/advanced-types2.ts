import webpack from "webpack"

interface Info1 {
  readonly age?: number
  sex?: string
  name?: string
}

type readOnlyType<T> = {
  +readonly [P in keyof T]: T[P]
}

type removeReadonly<T> = {
  -readonly [P in keyof T]-?: T[P]
}
// 对上面的info1进行重新的定义了，本来没有，未来也不准有readonly，而且这个type removeReadonly每个属性都是必选的
type info1WithoutReadonly = removeReadonly<Info1>
let a: readOnlyType<Info1> = {
  name: '13',
  age: 19,
  sex: 'female'
}


// record 理解：object 的 key 不变，但是 value 变成另一种东西
function mapObj<K extends number | string, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  let res: any = {}
  for (let key in obj) {
    res[key] = f(obj[key])
  }
  return res
}

let myObj = {0: 'qwe', 1: 'qqqq', 2: 'bye'}
let final = mapObj(myObj, x => x.length)
// console.log(final)

// Proxy
type Proxy<T> = {
  get(): T
  set(value: T): void
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

// 对 proxify 封包
function proxify<T>(obj: T): Proxify<T> {
  let result = {} as Proxify<T>
  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: value => obj[key] = value
    }
  }
  return result
}

let props = {
  name: 'slr',
  age: 18
}
let proxifyProps = proxify(props)
proxifyProps.name.set('hasagei')
console.log(proxifyProps.name.get())

// 对 proxify 拆包
function unproxify<T>(t: Proxify<T>): T {
  let result = {} as T
  for (const key in t) {
    result[key] = t[key].get()
  }
  return result
}