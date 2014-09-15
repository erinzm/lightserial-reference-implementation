###
LightSerial

@author Liam Marshall (archimedespi3141@gmail.com)
@license GNU GPL v3
@project NSA Away
@organization Sector67
###

canvas = document.getElementById 'lightserial-canvas'
ctx = canvas.getContext '2d'

setInterval ->
  ctx.fillRect(5, 5, 100, 100)
  setTimeout ->
    ctx.clearRect(5, 5, 100, 100)
  ,3
,6