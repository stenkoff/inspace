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
