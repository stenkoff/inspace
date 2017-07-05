const Dot = require ('./dot')

class Game {
  constructor() {
    this.dots = []
    this.addDots()
  }

  addDots() {
    for (let i = 0; i < 5; i++) {
      this.dots.push(new Dot())
    }
  }

  draw(ctx) {
    if (ctx) {
      ctx.clearRect = (0, 0, 800, 600)
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, 800, 600)
      this.dots.forEach(dot => dot.draw(ctx))
    }
  }

  moveDots() {
    this.dots.forEach(dot => dot.move())
  }
}

module.exports = Game;
