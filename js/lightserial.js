
/*
LightSerial

@author Liam Marshall (archimedespi3141@gmail.com)
@license GNU GPL v3
@project NSA Away
@organization Sector67
 */
var canvas, ctx;

canvas = document.getElementById('lightserial-canvas');

ctx = canvas.getContext('2d');

setInterval(function() {
  ctx.fillRect(5, 5, 100, 100);
  return setTimeout(function() {
    return ctx.clearRect(5, 5, 100, 100);
  }, 2000);
}, 5000);
