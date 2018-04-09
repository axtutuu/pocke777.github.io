import Player from './player.js'
const canvas = document.querySelector("canvas")
const cxt = canvas.getContext("2d")
const w = canvas.offsetWidth
const h = canvas.offsetHeight

const objectSize = 20
const player = new Player(w, h)
player.on('moved', () => {
  update()
})

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
