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
