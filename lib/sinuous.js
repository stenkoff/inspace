const Game = require("./game");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height = 600;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  game.draw(ctx);

  window.setInterval(function(){
    // debugger
    // game.addDots(ctx)
    game.draw(ctx)
    game.moveDots()
    canvas.addEventListener("mousemove", function(e) {
      game.player.move([e.clientX, e.clientY])
      game.player.draw(ctx)
    })
    // console.log(1)
  }, 30)
  window.setInterval(function(){
    // debugger
    game.addDots(ctx)
    // game.draw(ctx)
    // game.moveDots()
    // console.log(1)
  }, 700)
  // canvas.addEventListener("mousemove", function(e) {
    // debugger
    // if (game.player) {
    //   game.player.pos = [e.clientX, e.clientY]
    // }
    // console.log(e.clientX)
  // })
})
