const Dot = require('./dot')

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
