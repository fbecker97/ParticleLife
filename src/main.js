const canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight; 
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width, canvas.height);

var particles = [];
particles.push(...Particle.randomParticles(500,{x0:canvas.width*1/5,x1:canvas.width*4/5,y0:canvas.height*1/5,y1:canvas.height*4/5}, 0.5 ));

function update(progress) {
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
        //particles[i].applyForce({x:0,y:1*particles[i].mass});
        
        if(!particles[i].isAnnihilated) nextParticles.push(particles[i]);
    }
    //update Positions
    for(let i=0; i<particles.length;i++){
    	if(!particles[i].isAnnihilated){ 
    		
    		particles[i].updatePosition(progress,{x0: 0, x1: canvas.width, y0: 0, y1: canvas.height, wrap: false });
    	}   
    }
    //add new particles
    particles = nextParticles
}

function draw() {
    //clear canvas
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    //draw particles
    for(let i=0; i<particles.length;i++){
        particles[i].render(ctx, drawAcc = true)
    }
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
