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

/*---------------------------------------------------------------*/
const stringIndex = 'a'
const numberIndex = 1
const symbolIndex = Symbol()
type objs2 = {
  [stringIndex]: string
  [numberIndex]: number
  [symbolIndex]: symbol
}
type keysInObj2 = keyof objs2
let obj3: readOnlyType<objs2> = {
  a: 'aaa',
  1: 123123123,
  [symbolIndex]: Symbol.for('哈撒给')
}

//TS2540: Cannot assign to 'a' because it is a read-only property.
// obj3.a = 'asd'
// console.log(obj3)

// 映射类型就是下面的这些东西
type MapToPromise<T> = {
  [K in keyof T]: Promise<T[K]>
}
type Tuple = [string, number, boolean]
type PromiseTuple = MapToPromise<Tuple>
let tuple1: PromiseTuple = [
  new Promise(resolve => resolve('aaa')),
  new Promise(resolve => resolve(1)),
  new Promise(resolve => resolve(false)),
]

/**
 * 关于 unknown 的 10 条
 */
// [1] 任何类型都可以赋值给 unknown 类型。
let value1: unknown
value1 = 'a'
value1 = 1
// [2] 如果没有类型断言或者基于控制流的类型细化时，unknown不可以赋值给其他类型，此时 unknown只能赋值给 unknown 、自身或者 any 类型。
let value2: unknown
value1 = value2
// [3] 如果没有类型断言或者基于控制流的类型细化时，不能再他上面进行任何操作
let value4: unknown
// value4++
// [4] unknown 与任何类型组成的交叉类型，都等于其他类型
type type1 = string & unknown
type type2 = any & unknown
// [5] unknown 与任何其他类型（除了any）组成的联合类型，都等于 unknown 类型
type type5 = unknown | string
type type6 = any | unknown
type type7 = number[] | unknown
// [6] never 类型是 unknown 的子类型
type type8 = never extends unknown ? true : false // true
// [7] keyof unknown 等于类型 never
type type9 = keyof unknown
// [8] 只能对 unknown 进行等或者不等操作，不能进行其他操作
console.log(value1 === value2)
console.log(value1 !== value2)
// [9] unknown 类型的值不能访问他的属性、作为函数调用、作为类创建实例
let value10: unknown
// value10.age
// value10()
// new value10()
// [10] 使用映射类型时，如果遍历的是 unknown 类型，则不会映射任何属性
type Types1<T> ={
  [P in keyof T]: T[P]
}
type type11 = Types1<any>
type type12 = Types1<unknown>