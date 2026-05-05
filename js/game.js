var canvas = document.getElementById(`canvas`);
var context = canvas.getContext(`2d`);

var interval = 1000/60;
var timer = setInterval(animate, interval);


var gravity = 1;
var friction = {x:.85,y:.97};

var stage = new GameObject({width:canvas.width, height:canvas.height});
var level = new GameObject({x:0,y:0});

var ground = new GameObject({width:canvas.width*10, x:canvas.width*10/2-200,height:64,y:canvas.height-32})
ground.img.src=`images/ground.png`;

var bg = new GameObject({x:level.x,y:level.y, width:canvas.width*4, height:canvas.height});
bg.img.src = `images/skyBackground.png`;

var player = new GameObject({x:canvas.width/2, y:canvas.height/2, width:50, height:50, color:"green", world:{x:0,y:0}});




function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);

    if(a){
        player.vx -= 0.8;
    }
    if(d){
        player.vx += 0.8;
    }
    
    
    player.vy += gravity;
     player.vx *= friction.x;
     player.vy *= friction.y;

    player.x += player.vx;
    player.y += player.vy;

    if(player.y > canvas.height - 35 - player.height/2){
        player.vy = 0;
        player.y = canvas.height - 35 - player.height/2;
        if(w){
             player.vy = -18;
        }
    }
    
    bg.drawStaticImage({x:0,y:0});
    ground.drawStaticImage({x: 0, y: 100});
    player.drawRect();
}