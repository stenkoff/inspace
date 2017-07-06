class Player {

  constructor(pos=[400,300]) {
    // debugger
    this.pos = pos
    // this.positions = []
    // this.move()
  }

  draw(ctx) {
    // ctx.fillRect(this.pos[0], this.pos[1], 5, 5);
    ctx.fillStyle = 'lightblue'
    ctx.beginPath()
    ctx.arc(this.pos[0], this.pos[1], 5, 0, 2*Math.PI, true)
      // ctx.strokeStyle = 'red';
    ctx.fill()
  }
  move(newPos) {
    // debugger
    // if (this.positions.length > 5) {
    //   this.positions.shift
    // }
    // this.positions.push(this.pos)
    this.pos[0] = newPos[0]
    this.pos[1] = newPos[1]
    // debugger
    // document.getElementById('canvas').addEventListener("mousemove", function(e) {
    //   // debugger
    //   this.pos[0] += e.clientX
    //   this.pos[1] += e.clientY
    // })


  }
  // cursorPos() {
  //   // debugger
  //   this.pos = [400,300]
  //   document.getElementById('canvas').addEventListener("mousemove", function(e) {
  //     // this.pos = [e.clientX, e.clientY]
  //     debugger
  //     // console.log([e.clientX, e.clientY])
  //   })
  // }

  // cursor(pos)  {
  //   document.getElementById('canvas').addEventListener("mousemover", function(e) {
  //   this.pos = [e.clientX, e.clientY]
  // })
}

module.exports = Player
