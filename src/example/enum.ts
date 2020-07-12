const val = 5

enum Status {
    Uploading = 3,
    success = val,
    fail = 6
}

console.log(Status.Uploading)
console.log(Status.success)
console.log(Status.fail)
console.log(Status)

// 字符串枚举
enum Message {
    Error = 'sorry, error message',
    Success = 'oho, success !',
    Faild = Error
}

console.log(Message.Faild)


// 异构枚举
enum Result {
    Faild = 0,
    Success = 'result success'
}

// 联合枚举类型
enum Status {
    Off,
    On
}
interface Light {
    status: Status
}

const light: Light = {
    status: Status.Off
}
