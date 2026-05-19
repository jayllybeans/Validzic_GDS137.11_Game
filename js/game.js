var canvas = document.getElementById(`canvas`);
var context = canvas.getContext(`2d`);

var interval = 1000/60;
var timer = setInterval(animate, interval);
var daysLeft = 4;

var gravity = 1;
var friction = {x:.85,y:.97};

var stage = new GameObject({width:canvas.width, height:canvas.height});
var level = new GameObject({x:0,y:0});

var currentState = "titleScreen";
var states =[];

var backgroundNoise = document.getElementById("backgroundAudio");
var collisionNoise = document.getElementById("screamAudio");

var title = new GameObject({width:canvas.width, height:canvas.height, x:0, y:0});
title.img.src = `images/identityTitleScreen.png`;

var ground = new GameObject({width:canvas.width*10, x:-4096 + canvas.width,height:canvas.height,y:canvas.height-32, world:level});
ground.img.src=`images/ground.png`;

var bg = new GameObject({x:-4096 + canvas.width,y:level.y , width:4096, height:canvas.height});
bg.img.src = `images/skyBackground.png`;

var goal = new GameObject({x:-4096 + canvas.width - 150, y:canvas.height/2 + 100, width:256, height:256});
goal.img.src = `images/goalHouse.png`;

var player = new GameObject({x:canvas.width/2, y:canvas.height/2, width:50, height:50, color:"green", world:{x:0,y:0}});
var monster = new GameObject({x:canvas.width + player.width * 2, y:canvas.height + 35 - player.height *2, width:player.width *2, height:player.height *2, color:"red", world:{x:0,y:0}});
console.log(ground.x);
function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);
    states[currentState]();
}

states["titleScreen"] = function()
{
    title.drawStaticImage({x:0, y:0});
    if(enter)
    {
        backgroundNoise.currentTime = 0;
        ground.x = -4096 - canvas.width;
        currentState = "game";
    }
}

states["game"] = function()
{
    if(a){
        player.vx -= 1;
    }
    if(d){
        player.vx += 1;
    }
	backgroundNoise.play();
    
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

    monster.vx -= 0.2;
    monster.vx *= friction.x;
    monster.x += monster.vx;
    monster.x -= player.vx * 0.1;

    //Keep Player onscreen
    if(player.x < player.width/2)player.x = player.width/2;
    if(player.x > canvas.width - player.width/2)player.x = canvas.width - player.width/2;
    if(bg.x >= 0)bg.x = 0;
    if(bg.x <= canvas.width - 4096)bg.x = canvas.width - 4096;
    if(ground.x >= 0)ground.x = 0;
    if(ground.x <= canvas.width - 4096)ground.x = canvas.width - 4096;
    

    if(monster.overlap(player) || player.overlap(goal))
    {
        if(monster.overlap(player))
        {
            collisionNoise.currentTime = 0;
            collisionNoise.play();
            currentState = "titleScreen";
            player.x = canvas.width/2;
            monster.x = canvas.width + player.width * 2;
            bg.x = -4096 + canvas.width;
            goal.x = -4096 + canvas.width - 100;
            ground.x = 4096 - canvas.width;
            level.x = 0;
            backgroundNoise.pause();
        }
        else
        {
            setTimeout(function() {
        		daysLeft--;
                player.x = canvas.width/2;
                monster.x = canvas.width + player.width * 2;
                bg.x = -4096 + canvas.width;
                goal.x = -4096 + canvas.width - 100;
                ground.x = 4096 - canvas.width;
                level.x = 0;
    			}, 500);
        }
    }

    level.x -= player.vx;
    bg.x -= player.vx * 0.5;
    goal.x -= player.vx * 0.5;
    bg.drawStaticImage({x:0,y:0});
    goal.drawStaticImage();
    ground.drawStaticImage({x: -ground.width/2, y: -canvas.height + 35 + player.height/2});
    player.drawRect();
    monster.drawRect();

    context.font = "30px Arial black";
	context.weight = "bold";
	context.fillStyle = "black";
	context.fillText("Days Left: " + daysLeft, 20, 40);
}