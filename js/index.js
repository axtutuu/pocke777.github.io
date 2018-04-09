(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    this.x = Math.round(w / 2 / objectSize);
    this.y = Math.round(h / 2 / objectSize);
    this.currentDirection = "stand";
  }

  _createClass(Player, [{
    key: "collision",
    value: function collision(x, y) {
      // house
      if (x > 3 && x < 9 && y == 6 || x > 4 && x < 9 && (y == 5 || y == 4 || y == 3)) return true;

      // corner
      if (x < 1 || x > 20) return true;
      if (y < 2 || y > 20) return true;
      if (y > 0 && y < 4 && x > 18) return true;
      if (y > 0 && y < 4 && x < 4) return true;
      if (y > 18 && x < 4) return true;

      if (x > 17 && (y == 19 || y == 20) || x > 19 && (y == 17 || y == 18)) return true;

      return false;
    }
  }, {
    key: "move",
    value: function move(direction) {
      var hold = {
        x: this.x,
        y: this.y
      };

      this.currentDirection = direction;
      switch (direction) {
        case "left":
          this.x -= speed / modifier;
          break;
        case "right":
          this.x += speed / modifier;
          break;
        case "up":
          this.y -= speed / modifier;
          break;
        case "down":
          this.y += speed / modifier;
          break;
      }

      if (this.collision(this.x, this.y)) {
        this.x = hold.x;
        this.y = hold.y;
      }

      update();
    }
  }]);

  return Player;
}();

var canvas = document.querySelector("canvas");
var cxt = canvas.getContext("2d");
var w = canvas.offsetWidth;
var h = canvas.offsetHeight;

var objectSize = 20;
var speed = 100;
var modifier = 100;
var player = new Player();

var terrainImage = new Image();
var pokeballImage = new Image();
var houseImage = new Image();
var playerImage = new Image();
terrainImage.src = "./images/pokemon_terrain.jpg";
houseImage.src = "./images/house.png";
playerImage.src = "./images/player.png";
pokeballImage.src = "./images/pokemon_terrain.jpg";

new Promise(function (resolve) {
  var count = 0;
  terrainImage.onload = next;
  houseImage.onload = next;
  playerImage.onload = next;
  pokeballImage.onload = next;

  function next() {
    count++;
    if (count >= 4) resolve();
  }
}).then(function () {
  update();
});

function update() {
  cxt.drawImage(terrainImage, 0, 0);
  cxt.drawImage(houseImage, 80, 60);

  // player
  cxt.drawImage(playerImage, direction[player.currentDirection], 0, objectSize - 2, objectSize, player.x * objectSize, player.y * objectSize, objectSize, objectSize);
}

document.onkeydown = function (e) {
  if (e.keyCode == "37") player.move("left");else if (e.keyCode == "38") player.move("up");else if (e.keyCode == "39") player.move("right");else if (e.keyCode == "40") player.move("down");
};

// image file for player pattern
var direction = {
  "stand": 0,
  "down": 17,
  "up": 142,
  "left": 69,
  "right": 160
};

},{}]},{},[1]);
