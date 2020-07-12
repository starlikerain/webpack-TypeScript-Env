import { MultiWatching } from "webpack"

const valueList = [123, 'abcd']
const getRandomValue = () => {
    const number = Math.random() * 10
    if (number < 5) return valueList[0]
    else return valueList[1]
}
// 对返回值类型存在随机性
const item = getRandomValue()
// 类型保护可以用 typeof 也能用 instanceOf
function isString(value: number | string): value is string {
    // 类型保护只能是下面4种中的一种 string/number/boolean/symbol
    return typeof value === 'string'
}
if (isString(item)) {
    console.log(item.length)
} else {
    console.log(item.toFixed())
}

class A {
    constructor(public name: string) { }
}
class B {
    constructor(public age: number) { }
}
function randomClass() {
    return Math.random() > 0.5 ? new A('卧槽') : new B(18)
}
let instance = randomClass()
if (instance instanceof A) {
    console.log(instance.name)
} else {
    console.log(instance.age)

}