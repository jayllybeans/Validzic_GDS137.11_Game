var canvas = document.getElementById(`canvas`);
var context = canvas.getContext(`2d`);

var interval = 1000/60;
var timer = setInterval(animate, interval);

var gravity = 1;
var friction = {x:.85,y:.97}

var stage = new GameObject({width:canvas.width, height:canvas.height});
var level = new GameObject({x:0,y:0});

var ground = new GameObject({width:canvas.width*10, x:canvas.width*10/2-200,height:64,y:canvas.height-32, color:"green", world:level})
ground.img.src=`images/ground.png`

var sky = new GameObject({width:canvas.width, height:canvas.height})
sky.img.src = `images/skyBackground.png`

var g1 = new Group();
g1.color= `rgb(251,0,254)`;
g1.add([ground]);

var rects = new Group();
rects.add([ground]);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);
    
    sky.drawStaticImage();
    ground.drawStaticImage();
}