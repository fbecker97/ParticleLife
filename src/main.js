const canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight; 
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width, canvas.height);


//Global
STEPS_PER_FRAME = 3
DELTATIME = 0.016
CAGE_SIZE = 0.2
WRAP = false
SPACE_CAGE = {x0: canvas.width*CAGE_SIZE, x1: canvas.width*(1-CAGE_SIZE), y0: canvas.height*CAGE_SIZE, y1: canvas.height*(1-CAGE_SIZE), wrap: WRAP }

var particles = [];
particles.push(...Particle.randomParticles(PARTICLE_NUMBER,SPACE_CAGE ));

function update(progress) {
	DELTATIME = progress
	let nextParticles = []
	
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
        // particles[i].applyForce({x:0,y:10*particles[i].mass});
        
        
        if(!particles[i].isAnnihilated) nextParticles.push(particles[i]);
    }
    
    //update positions
    for(let i=0; i<particles.length;i++){
    	if(!particles[i].isAnnihilated){ 
    		particles[i].updatePosition();
    	}   
    }
    //update set of particles
    particles = nextParticles
}

function draw() {
    //clear canvas
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle ="white"
    ctx.rect(SPACE_CAGE.x0, SPACE_CAGE.y0, SPACE_CAGE.x1-SPACE_CAGE.x0,SPACE_CAGE.y1-SPACE_CAGE.y0);
    ctx.stroke();
    //draw particles
    for(let i=0; i<particles.length;i++){
        particles[i].draw( drawAcc = false)
    }
}

function loop(timestamp) {
    var progress = timestamp - lastRender
    
    for(let i=0; i< STEPS_PER_FRAME; i++){
    	update(progress/(1000*STEPS_PER_FRAME))
    }
    
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop);
