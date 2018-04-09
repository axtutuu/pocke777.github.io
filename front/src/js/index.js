class Player {
  constructor() {
    this.x = Math.round((w / 2) / objectSize)
    this.y = Math.round((h / 2) / objectSize)
    this.currentDirection = "stand"
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
        this.x -= speed / modifier
        break
      case "right":
        this.x += speed / modifier
        break
      case "up":
        this.y -= speed / modifier
        break
      case "down":
        this.y += speed / modifier
        break
    }

    if (this.collision(this.x, this.y)) {
      this.x = hold.x
      this.y = hold.y
    }

    update()
  }
}

const canvas = document.querySelector("canvas")
const cxt = canvas.getContext("2d")
const w = canvas.offsetWidth
const h = canvas.offsetHeight

const objectSize = 20
const speed = 100
const modifier = 100
const player = new Player()

const terrainImage = new Image()
const pokeballImage = new Image()
const houseImage = new Image()
const playerImage = new Image()
terrainImage.src = "./images/pokemon_terrain.jpg"
houseImage.src = "./images/house.png"
playerImage.src = "./images/player.png"
pokeballImage.src = "./images/pokemon_terrain.jpg"

new Promise((resolve) => {
  let count = 0
  terrainImage.onload = next
  houseImage.onload = next
  playerImage.onload = next
  pokeballImage.onload = next

  function next() {
    count++
    if (count >= 4) resolve()
  }
}).then(() => {
  update()
})

function update() {
  cxt.drawImage(terrainImage, 0, 0)
  cxt.drawImage(houseImage, 80, 60)

  // player
  cxt.drawImage(
    playerImage,
    direction[player.currentDirection],
    0,
    objectSize -2,
    objectSize,
    player.x * objectSize,
    player.y * objectSize,
    objectSize, objectSize
  )
}

document.onkeydown = (e) => {
  if (e.keyCode == "37") player.move("left");
  else if (e.keyCode == "38") player.move("up");
  else if (e.keyCode == "39") player.move("right");
  else if (e.keyCode == "40") player.move("down");
}

// image file for player pattern
const direction = {
  "stand": 0,
  "down":  17,
  "up":    142,
  "left":  69,
  "right": 160
}
