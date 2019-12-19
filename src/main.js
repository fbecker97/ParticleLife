const canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight; 
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width, canvas.height);

var particles = [];
particles.push(...Particle.randomParticles(200,{x0:canvas.width/4,x1:canvas.width*3/4,y0:canvas.height/4,y1:canvas.height*3/4}, 0.5 ));

function update(progress) {
	let nextParticles = []
    //apply Forces
    for(let i=0; i<particles.length;i++){
        for(let j=0; j<particles.length;j++){
            if(i!=j){
                // Gravity and Coulomb
                particles[i].applyForce(Physics.force(particles[i],particles[j]));
                // Drag
                particles[i].applyForce(Physics.drag(particles[i]));
                // Constant Force
                //particles[i].applyForce({x:0,y:1*particles[i].mass});
                
                //Collision
                if(!particles[i].isAnnihilated && !particles[j].isAnnihilated && Physics.areColliding(particles[i],particles[j])){
                	nextParticles.push(...Physics.resolveCollision(particles[i],particles[j]));
                }
                
            }
        }
        if(!particles[i].isAnnihilated) nextParticles.push(particles[i]);
    }
    //update Positions
    for(let i=0; i<particles.length;i++){
    	if(!particles[i].isAnnihilated){ 
    		
    		particles[i].updatePosition(progress,{x0: 300, x1: canvas.width-300, y0: 100, y1: canvas.height-100, wrap: false });
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
        particles[i].render(ctx)
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
