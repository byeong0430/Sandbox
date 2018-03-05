//Draw images to the canvas CONTINUOUSLY
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d'); //getContext returns methods and properties of canvas


//Load images
var bg = new Image();
var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var fg = new Image();

bg.src = '../images/bg.png';
bird.src = '../images/bird.png';
pipeNorth.src = '../images/pipeNorth.png';
pipeSouth.src = '../images/pipeSouth.png';
fg.src = '../images/fg.png';

//Load audio
var audioName = new Audio();
audioName.src = '../sounds/fly.mp3';


//Variables
var gap = 85;
var constant = pipeNorth.height + gap;
var bX = 10; //Bird's x position
var bY = 150; // Bird's y position
var gravity = 1.5;
var score = 0;


//On key down
document.addEventListener("keydown", moveUp);

function moveUp(){
    bY -= 20;
}


//Pipe coordinates
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};


//Draw images
function draw(){
    //Draw the background first
    ctx.drawImage(bg, 0, 0);

    for (var i=0; i<pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y); //Draw north pipe
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant); //Draw south pipe

        pipe[i].x--; //Move the pipes to left

        //Add a new set of north and south pipes 
        if (pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
            });
        }

        //Detect bird collision
        if( pipe[i].x <= bX + bird.width && bX <= pipe[i].x + pipeNorth.width 
            && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || 
               bY + bird.height >=  cvs.height - fg.height){
           location.reload(); // reload the page
        }

        //If pipe's x coordinate reaches 5, add a score
        if (pipe[i].x == 5){
            score++;
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY); 

    bY += gravity;
    
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    

    requestAnimationFrame(draw);
}

draw();

