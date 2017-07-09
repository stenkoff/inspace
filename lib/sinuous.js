const Game = require("./game")
const Play = require("./play")

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  canvas.width = .8 * Math.max(document.documentElement.clientWidth, window.innerWidth)
  canvas.height = .8 * Math.max(document.documentElement.clientHeight, window.innerHeight)
  const ctx = canvas.getContext("2d");
  new Play(canvas, ctx)
})
