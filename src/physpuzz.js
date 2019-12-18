const canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight; 
const ctx = canvas.getContext("2d");

const panel_physics_g = document.getElementById("panel_physics_g");
const input_physics_g = document.getElementById("input_physics_g");

const panel_physics_c = document.getElementById("panel_physics_c");
const input_physics_c = document.getElementById("input_physics_c");

var entities = [];
entities.push(...Entity.randomElectronsAndProtons(400,{x0:canvas.width/4,x1:canvas.width*3/4,y0:canvas.height/4,y1:canvas.height*3/4}, 0.01 ));
//entities.push(Entity.BlackHole({x: canvas.width/2, y: canvas.height/2}, 1000))

canvas.addEventListener('click', (e) => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };
    entities.push(new Entity(pos, undefined, 1 , -20 , "#00FF00", 20));
});

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
                //entities[i].applyForce({x:0,y:-1});
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
    ctx.fillStyle = "rgba(20,20,20,0.4)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    //draw entities
    for(let i=0; i<entities.length;i++){
        entities[i].render(ctx)
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
