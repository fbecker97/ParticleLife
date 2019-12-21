const canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight; 
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width, canvas.height);

var particles = [];
particles.push(...Particle.randomParticles(200,{x0:canvas.width*1/5,x1:canvas.width*4/5,y0:canvas.height*1/5,y1:canvas.height*4/5}, 0.5 ));
var mass_sum = 0;
var charge_mean = 0;

function update(progress) {
	let nextParticles = []
	mass_sum = 0;
	charge_sum = 0;
    //apply Forces
    for(let i=0; i<particles.length;i++){
        for(let j=i+1; j<particles.length;j++){
            // apply darticle forces on each other
            Physics.applyForceBetween(particles[i],particles[j]);

            //collision
            if(!particles[i].isAnnihilated && !particles[j].isAnnihilated && Physics.areColliding(particles[i],particles[j])){
            	nextParticles.push(...Physics.resolveCollision(particles[i],particles[j]));   
            }
        }
        // apply drag
        Physics.applyDrag(particles[i]);
        // apply a constant Force
        //particles[i].applyForce({x:0,y:1*particles[i].mass});
        
        //check spontanious splitUps
        if(particles[i].isSplitUp()){
        	nextParticles.push(...particles[i].splitUp());
        }
        //sum of mass and mean of charge
        mass_sum += particles[i].mass;
        charge_mean += particles[i].charge[0]+particles[i].charge[1]+particles[i].charge[2]
        
        if(!particles[i].isAnnihilated) nextParticles.push(particles[i]);
    }
    charge_mean = charge_mean/particles.length
    
    //update Positions
    for(let i=0; i<particles.length;i++){
    	if(!particles[i].isAnnihilated){ 
    		
    		particles[i].updatePosition(progress,{x0: 300, x1: canvas.width-300, y0: 200, y1: canvas.height-200, wrap: false });
    	}   
    }
    //add new particles
    particles = nextParticles
}

function draw() {
    //clear canvas
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle ="red"
    ctx.rect(300, 200, canvas.width-600, canvas.height-400);
    ctx.stroke();
    //draw particles
    for(let i=0; i<particles.length;i++){
        particles[i].render(ctx, drawAcc = false)
    }
    ctx.font = "30px Arial";
    ctx.fillText(mass_sum.toFixed(1), 10, 50); 
    ctx.fillText(charge_mean.toFixed(1), 10, 100); 
    ctx.fillText(particles.length, 10, 150); 
}

function computeUI(){
    
}

function loop(timestamp) {
    var progress = timestamp - lastRender

    update(progress/1000)
    draw()
    computeUI()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop);
