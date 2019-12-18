class Entity{
    
    constructor( pos = {x:0,y:0}, vel = {x:0,y:0}, mass = 1, charge = 1, color = "#FFFFFF", radius = 5, isStatic = false) {
        this.pos = pos;
        this.vel = vel;
        this.acc = {x:0, y: 0};
        this.mass = mass;
        this.charge = charge;
        this.color = color;
        this.radius = radius
        this.isStatic = isStatic;
        
        this.exists = true
    }
    
    render(ctx){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius,0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();   
    }
    
    applyForce(force){
        if(this.mass == 0) return;
        this.acc.x += force.x/this.mass;
        this.acc.y += force.y/this.mass;
    }
    
    updatePosition(deltaTime, spaceCtx = null){
        if(this.isStatic) return;
        this.pos.x = this.pos.x + this.vel.x * deltaTime + 0.5* this.acc.x * deltaTime * deltaTime;
        this.pos.y = this.pos.y + this.vel.y * deltaTime + 0.5* this.acc.y * deltaTime * deltaTime;
        this.vel.x = this.vel.x + this.acc.x * deltaTime;
        this.vel.y = this.vel.y + this.acc.y * deltaTime;
        this.acc.x = 0;
        this.acc.y = 0;
        
        if(spaceCtx != null){
            if(spaceCtx.wrap){
                let spaceWidth = spaceCtx.x1 - spaceCtx.x0;
                let spaceHeight = spaceCtx.y1 - spaceCtx.y0;
                if(this.pos.x < spaceCtx.x0) this.pos.x += spaceWidth;
                if(this.pos.x >= spaceCtx.x1) this.pos.x -= spaceWidth;
                if(this.pos.y < spaceCtx.y0) this.pos.y += spaceHeight;
                if(this.pos.y >= spaceCtx.y1) this.pos.y -= spaceHeight;
            } else {
                if(this.pos.x  - this.radius < spaceCtx.x0 || this.pos.x  + this.radius >= spaceCtx.x1) this.vel.x = -this.vel.x;
                if(this.pos.y  - this.radius < spaceCtx.y0 || this.pos.y  + this.radius >= spaceCtx.y1) this.vel.y = -this.vel.y;
            }
        }
    }
    
    isColliding(e1){
        let diff = {x: this.pos.x-e1.pos.x, y: this.pos.y-e1.pos.y}
        return( Utiles.getAbs(diff) < this.radius+e1.radius)
    }
    
    resolveCollision(e1){
        
    }
    
    
    static randomElectronsAndProtons( amount , spawnArea = {x0: 0, x1: canvas.width, y0: 0, y1: canvas.height}, prob = 0.5){
        var ents = []
        for(let i=0;i<amount;i++){
            let pos = {x: spawnArea.x0 + Math.random()*(spawnArea.x1-spawnArea.x0),y: spawnArea.y0 + Math.random()*(spawnArea.y1-spawnArea.y0)};
            let vel = {x: Math.random()*100-50,y: Math.random()*100-50};
            let e1 = Math.random() > prob ? new Electron(pos,vel):new Proton(pos,vel);
            ents.push(e1);
        }
        return ents;
    }

}

class Electron extends Entity{ 
    constructor(pos = {x:0,y:0}, vel = {x:0,y:0}) {
        super(pos,vel,1,-1,"#0000FF",5);
    }
}

class Proton extends Entity{
    constructor(pos = {x:0,y:0}, vel = {x:0,y:0}) {
        super(pos,vel,1,1,"#FF0000",5);
    }
}

class Photon extends Entity{
    constructor(pos = {x:0,y:0}, vel = {x:0,y:0}) {
        super(pos,vel,0,0,"#FFFF00",3);
    }
}




