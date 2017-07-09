const Game = require("./game");
const Player = require("./player");

class Play {
  constructor(canvas, ctx) {
    this.offsetX = canvas.offsetLeft
    this.offsetY = canvas.offsetTop
    this.ctx = ctx
    this.position = this.position.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.over = false
    this.count = 0
    this.draw(canvas, ctx)
  }

  draw(canvas, ctx) {
    ctx.clearRect = (0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, Game.width, Game.height)
    const start = document.getElementById('start')
    start.innerHTML = 'Click to Start Game!'
    start.addEventListener('click', this.handleClick)
  }

  handleClick(e) {
    // if (e) {
    //   let x = (e.clientX > 300 && e.clientX < 500)
    //   let y = (e.clientY > 250 && e.clientY < 350)
    //   if (x && y) {
        let pos = [e.clientX-this.offsetX, e.clientY-this.offsetY]
        document.getElementById('start').style.display = 'none'
        this.start(pos)
      // }
    // }
  }

  start(pos) {
    if (this.animation) {
      window.cancelAnimationFrame(this.animation)
    }
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    ctx.clearRect = (0,0, canvas.width, canvas.height)
    this.stopHandlers(canvas)
    this.game = new Game(pos)
    this.lastTime = 0
    canvas.addEventListener("mousemove", this.position)
    this.animation = window.requestAnimationFrame(this.view.bind(this))
    // this.int2 = window.setInverval(this.increaseDifficulty)
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
    // this.increaseDifficulty()
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
    // count += 1
    // if (count === 15 && n < 10) {
    // // console.log(count)
    // n += .5
    // v += 5
    // count = 0
    // }
    this.game.addDots(.1, 1)
  }

  gameOver(ctx, score) {
    if (this.over === true) {
      const start = document.getElementById('start')
      start.innerHTML = `Game over! <br><br> Score: ${this.game.player.score} <br><br>Click to restart`
      start.style.display = 'flex'
      start.addEventListener('click', this.handleClick)
    }
  }
}

module.exports = Play
