/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Dot = __webpack_require__ (1)
const Boost = __webpack_require__ (4)
const Player = __webpack_require__(2)

class Game {
  constructor(pos) {
    this.dots = []
    this.addDots()
    this.player = new Player(pos)
    this.count = 0
    this.vel = 1.5
    this.num = 1
    this.shrink = false
    this.grow = false
    this.slow = false
  }

  addDots() {
    let radius
    if (this.shrink === true) {
       radius = 1
    } else if (this.grow === true) {
      radius = 4
    } else {
      radius = 2 + Math.random() * 2
    }

    let v = this.vel + Math.random() * 2
    if (this.slow === true) {
      v = 1
    } else if (this.fast === true) {
      v += 1
    }
    if (this.count % 20 === 0) {
      for (let i = 0; i < this.num; i++) {
        this.dots.push(new Dot(v, radius))
      }

    }
    if (this.count % 200 === 0) {
      this.dots.push(new Boost(v))
    }
    this.count += 1
  }

  draw(canvas, ctx) {
    if (ctx) {
      ctx.clearRect = (0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const score = document.getElementById('score')
      const highScore = window.localStorage.getItem('highScore')
      score.innerHTML = `Lives: ${this.player.lives}  &nbsp; Score: ${this.player.score} &nbsp; High Score: ${highScore}`
      this.dots.forEach(dot => dot.draw(ctx))
      this.player.draw(ctx)
    }
  }

  moveDots() {
    for (var i = 0; i < this.dots.length; i++) {
      let dot = this.dots[i]
      dot.move()
      if (this.checkCollision(dot)) {
        this.handleCollision(dot)
        if (dot.type !== 'enemy' && dot.type !== 'life') this.player.color = dot.color
        this.dots.splice(i, 1)
      } else if (dot.pos[0] < 0 || dot.pos[1] >  document.documentElement.clientHeight) {
        this.dots.splice(i, 1)
      }
    }
    this.addDots()
  }

  checkCollision(dot) {
    let p = this.player
    let dist = Math.sqrt((dot.pos[0] - p.pos[0]-3)**2 + (dot.pos[1]-p.pos[1]+3)**2)
    if (dist < (p.radius + dot.radius) && p.lives > 0) {
      return true
    }
    return false
  }

  handleCollision(dot) {
    switch (dot.type) {
      case 'enemy':
        this.player.lives -= 1
        this.player.lifeChange = 'down'
        break
      case 'life':
        this.player.lives = parseInt(this.player.lives) + 1
        this.player.lifeChange = 'up'
        break
      case 'slow':
        for (let i = 0; i < this.dots.length; i++) {
          this.dots[i].vel = 1
          this.slowTime()
        }
        break
      case 'shrink':
      for (let i = 0; i < this.dots.length; i++) {
        if (this.dots[i].type === 'enemy') {
          this.dots[i].radius = 1
          this.shrinkDots()
        }
      }
      break
      case 'grow':
      for (let i = 0; i < this.dots.length; i++) {
        if (this.dots[i].type === 'enemy') {
          this.dots[i].radius = 4
          this.growDots()
        }
      }
    }
  }

  shrinkDots() {
    this.shrink = true
    window.setTimeout(() => {
      this.shrink = false
      this.resetDots()
    }, 5000)
  }

  growDots() {
    this.grow = true
    window.setTimeout(() => {
      this.grow = false
      this.resetDots()
    }, 5000)
  }

  slowTime() {
    this.slow = true
    window.setTimeout(() => {
      this.slow = false
      this.resetDots(1)
    }, 5000)
  }

  resetDots() {
    if (!this.shrink && !this.grow && !this.slow)
    this.dots.forEach(dot => {
      dot.vel = this.vel + Math.random() * 2
      if (dot.type === 'enemy') {
        dot.radius = 3
      }
    })
    this.player.color = 'lightblue'
  }

}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Dot {
  constructor(vel, radius) {
    this.pos = this.randomPos()
    this.vel = vel
    this.color = 'red'
    this.radius = radius
    this.randomPos = this.randomPos.bind(this)
    this.type = 'enemy'
  }
  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true)
    ctx.fill()
  }

  move() {
    this.pos[0] -= this.vel / 2
    this.pos[1] += this.vel / 2
  }

  randomVel() {
    return vel = 2 + Math.random() * 2
  }

  randomPos() {
    const canvas =  document.getElementById('canvas')
    if (Math.round(Math.random()) === 1) {
      return [canvas.width, canvas.height * Math.random()]
    } else {
      return [canvas.width * Math.random(), 0]
    }
  }
 }

module.exports = Dot


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Player {

  constructor(pos=[screenX/2, screenY/2]) {
    this.pos = pos
    this.radius = 5
    this.lives = 3
    this.score = 0
    this.tail = []
    this.color = 'lightblue'
    this.lifeChange = false
  }

  draw(ctx) {
    if (this.lives === 0) {
      return null
    }
    this.adjustTail()
    if (this.lifeChange) {
      this.renderLifeChange(ctx)
    }
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.color
    ctx.beginPath()
    ctx.arc(this.pos[0] - 3, this.pos[1] + 3, 4, 0, 2*Math.PI, true)
    ctx.fill()
    ctx.lineWidth = 2
    if (this.tail.length > 15) {
      for (let i = 0; i < this.tail.length; i++) {
        let prev = this.tail[i]
        let next = this.tail[i + 1]
        if (i===0) {
          ctx.moveTo(prev[0], prev[1])
        } else {
          if (next) {
            ctx.lineTo(next[0], next[1])
          }
        }
        prev[0] -= 1.5
        prev[1] += 1.5
      }
      ctx.stroke()
    }
  }

  adjustTail() {
    if (this.tail.length > 30) {
      this.tail.splice(0, this.tail.length-30)
    }
    this.tail.push([this.pos[0] - 6, this.pos[1] + 6])
  }


  renderLifeChange(ctx) {
    let text
    text = this.lifeChange === 'up' ? '+ 1' : '- 1'
    ctx.fillStyle = 'white'
    ctx.font = '12px sans-serif'
    ctx.fillText(text, this.pos[0] + 15, this.pos[1] - 15)
    ctx.fillText(text, this.pos[0] - 15, this.pos[1] - 15)
    ctx.fillText(text, this.pos[0] + 15, this.pos[1] + 15)
    window.setTimeout(() => this.lifeChange = false, 1500)
  }

  move(newPos) {
    this.pos = newPos
  }
}

module.exports = Player


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0)
const Play = __webpack_require__(5)

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = .8 * Math.max(document.documentElement.clientWidth, window.innerWidth)
  canvas.height = .8 * Math.max(document.documentElement.clientHeight, window.innerHeight)
  const ctx = canvas.getContext("2d");
  new Play(canvas, ctx)
})


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Dot = __webpack_require__(1)

class Boost extends Dot {
  constructor(vel) {
    super()
    this.type = this.randomPower()
    this.color = this.getColor(this.type)
    this.vel = vel
    this.radius = 5
  }

  randomPower() {
    let powers = ['life', 'shrink', 'slow', 'grow']
    let i = Math.floor(Math.random() * 4)
    return powers[i]
  }

  getColor(type) {
    let colors = {
      life: 'green',
      shrink: 'yellow',
      slow: 'blue',
      grow: '#b027af'
    }
    return colors[type]
  }
}

module.exports = Boost


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const Player = __webpack_require__(2);

class Play {
  constructor(canvas, ctx) {
    this.offsetX = canvas.offsetLeft
    this.offsetY = canvas.offsetTop
    this.ctx = ctx
    this.position = this.position.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.increaseDifficulty = this.increaseDifficulty.bind(this)
    this.getHighScore = this.getHighScore.bind(this)
    this.over = false
    this.count = 0
    this.draw(canvas, ctx)
  }

  draw(canvas, ctx) {
    ctx.clearRect = (0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, Game.width, Game.height)
    const start = document.getElementById('start')
    start.innerHTML =
      `Avoid the red dots <br><br>
      Get power boosts <br><br>
      Stay alive! <br><br>
      Click to Start Game`
    start.addEventListener('click', this.handleClick)
  }

  handleClick(e) {
    let pos = [e.clientX-this.offsetX, e.clientY-this.offsetY]
    document.getElementById('start').style.display = 'none'
    this.start(pos)
  }

  start(pos) {
    if (this.animation) {
      window.cancelAnimationFrame(this.animation)
    }
    this.getHighScore()
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    ctx.clearRect = (0,0, canvas.width, canvas.height)
    this.stopHandlers(canvas)
    this.game = new Game(pos)
    this.lastTime = 0
    canvas.addEventListener("mousemove", this.position)
    this.animation = window.requestAnimationFrame(this.view.bind(this))
  }

  position(e) {
    if (e) {
      this.game.player.move([e.clientX-this.offsetX, e.clientY-this.offsetY])
    }
  }

  view() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    this.game.draw(canvas, ctx)
    this.game.moveDots()
    if (this.game.vel < 4) this.increaseDifficulty()
    if (this.game.player.lives === 0) {
      this.over = true
      this.gameOver(ctx, this.game.player.score)
    } else {
      this.game.player.score += 100
    }
    this.game.moveDots()
    this.animation = window.requestAnimationFrame(this.view.bind(this))
  }

  stopHandlers(canvas) {
    canvas.removeEventListener('click', this.handleClick)
    canvas.removeEventListener('mousemove', this.position)
  }

  increaseDifficulty() {
    if (this.count % 5000 === 0 && this.game.num < 5) {
      this.game.num += 1
      this.game.vel += .1
    }
    this.count += 1
    this.game.addDots()
  }

  gameOver(ctx, score) {
    if (this.over === true) {
      let highScore = this.checkHighScore()
      const start = document.getElementById('start')
      start.innerHTML =
        `Game over <br><br>
        ${highScore} <br><br>
        Score: ${this.game.player.score} <br><br>
        Click to Restart`
      start.style.display = 'flex'
      start.addEventListener('click', this.handleClick)
    }
  }

  checkHighScore() {
    let highScore = window.localStorage.getItem('highScore')
    if (this.game.player.score > highScore) {
      return `New High Score ${this.game.player.score}!`
    } else {
      return `High Score ${highScore}`
    }
  }

  getHighScore() {
    let highScore = window.localStorage.getItem('highScore')
    if (highScore) {
      if (this.game && this.game.player.score > highScore)
        window.localStorage.setItem('highScore', this.game.player.score)
    } else {
      window.localStorage.setItem("highScore", 0)
    }
  }
 }

module.exports = Play


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map