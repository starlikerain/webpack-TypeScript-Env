import { MultiWatching } from "webpack"

const valueList = [123, 'abcd']
const getRandomValue = () => {
    const number = Math.random() * 10
    if (number < 5) return valueList[0]
    else return valueList[1]
}
// 对返回值类型存在随机性
const item = getRandomValue()
// 类型保护
function isString(value: number | string): value is string {
    return typeof value === 'string'
}
if (isString(item)) {
    console.log(item.length)
} else {
    console.log(item.toFixed())
}