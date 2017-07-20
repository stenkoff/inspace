const Game = require("./game");
const Player = require("./player");

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
