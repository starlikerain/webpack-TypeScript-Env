class Point {
  public x: number
  private y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

let p = new Point(1, 2)


const create = <T>(c: new() => T): T => {
  return new c()
}

