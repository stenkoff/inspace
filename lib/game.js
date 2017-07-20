const Dot = require ('./dot')
const Boost = require ('./boost')
const Player = require('./player')

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
