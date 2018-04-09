import EventEmitter from 'events'

export default class Player extends EventEmitter {
  constructor(w, h) {
    super()
    const objectSize = 20
    this.x = Math.round((w / 2) / objectSize)
    this.y = Math.round((h / 2) / objectSize)
    this.currentDirection = "stand"
    this.speed = 100
    this.modifier = 100
  }

  collision(x, y) {
    // house
    if (((x > 3 && x < 9) && y == 6) || ((x > 4 && x < 9) && (y == 5 || y == 4 || y == 3))) return true

    // corner
    if (x < 1 || x > 20) return true
    if (y < 2 || y > 20) return true
    if ((y > 0 && y < 4) && x > 18) return true
    if ((y > 0 && y < 4) && x < 4) return true
    if ((y > 18) && x < 4) return true

    if (((x > 17) && (y == 19 || y == 20)) || ((x > 19) && (y == 17 || y == 18))) return true


    return false
  }

  move(direction) {
    const hold = {
      x: this.x,
      y: this.y
    }

    this.currentDirection = direction
    switch (direction) {
      case "left":
        this.x -= this.speed / this.modifier
        break
      case "right":
        this.x += this.speed / this.modifier
        break
      case "up":
        this.y -= this.speed / this.modifier
        break
      case "down":
        this.y += this.speed / this.modifier
        break
    }

    if (this.collision(this.x, this.y)) {
      this.x = hold.x
      this.y = hold.y
    }

    this.emit('moved')
  }
}
