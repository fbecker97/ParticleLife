const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.transform(1, 0, 0, -1, 0, canvas.height)

var entities = Entity.randomParticles(100,{x0:canvas.width/4,x1:canvas.width*3/4,y0:canvas.height/4,y1:canvas.height*3/4});

function update(progress) {
    //apply Forces
    for(let i=0; i<entities.length;i++){
        for(let j=0; j<entities.length;j++){
            if(i!=j){
                // Gravity and Coulomb
                entities[i].applyForce(Physics.getForceBetween(entities[i],entities[j]));
                // Drag
                entities[i].applyForce(Physics.getDragForce(entities[i]));
                // Constant Force
                entities[i].applyForce({x:0,y:-1});
            }
        }
    }
    //update Positions
    for(let i=0; i<entities.length;i++){
        entities[i].updatePosition(progress,{x0: 0, x1: canvas.width, y0: 0, y1: canvas.height, wrap: false });
    }
}

function draw() {
    //clear canvas
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    //draw entities
    for(let i=0; i<entities.length;i++){
        entities[i].render(ctx)
    }
}

function loop(timestamp) {
    var progress = timestamp - lastRender

    update(progress/1000)
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

var lastRender = 0
window.requestAnimationFrame(loop);
