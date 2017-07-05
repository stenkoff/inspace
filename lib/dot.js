class Dot {
  constructor(radius=3) {
    // this.pos = [500 * Math.random(), 500 * Math.random()]
    this.pos = this.randomPos()
    this.vel = this.randomVel()
    this.radius = 2 + Math.random() * 2
  }
  draw(ctx) {
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true)
      // ctx.strokeStyle = 'red';
    ctx.fill()
      // ctx.stroke();

  }
  move() {
    this.pos[0] -= this.vel
    this.pos[1] += this.vel
    // this.centerX -= 4
    // this.centerY += 4
  }

  randomVel() {
    return 2 + Math.random() * 2
  }
  randomPos() {
    if (Math.round(Math.random()) === 1) {
      return [800, 600 * Math.random()]
    } else {
      return [800 * Math.random(), 0]
    }
  }
}

module.exports = Dot
