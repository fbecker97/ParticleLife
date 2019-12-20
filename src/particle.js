class Particle{
	
    constructor( pos = {x:0,y:0}, vel = {x:0,y:0}, mass = 1, charge = [0,0,0], radius = 5, color = "#FFFFFF", immovable = false ) {
        this.pos = pos;
        this.vel = vel;
        this.acc = {x:0, y: 0};
        this.mass = mass;
        this.charge = charge;
        this.color = color;
        this.radius = radius
        this.immovable = immovable;
        
        this.isAnnihilated = false;
        this.lastAcc = {x:0,y:0}
    }
    
    render(ctx , drawAcc = false){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius,0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        
        if(drawAcc){
            let acc_abs = Utils.getAbs(this.lastAcc)
            if(acc_abs != 0){
                let a = (1-Math.exp(-0.001*acc_abs))*40/acc_abs
                ctx.beginPath();
                ctx.moveTo(this.pos.x,this.pos.y);
                ctx.lineTo(this.pos.x+this.lastAcc.x*a,this.pos.y+this.lastAcc.y*a);
                ctx.strokeStyle = "white";
                ctx.stroke();
            } 
        }
        
    }
    
    applyForce(force){
        if(this.mass == 0) return;
        this.acc.x += force.x/this.mass;
        this.acc.y += force.y/this.mass;
        
        this.lastAcc = {x: this.acc.x, y: this.acc.y}
    }
    
    updatePosition(deltaTime, spaceCtx = null){
        
        if(this.isStatic) return;
        this.pos.x = this.pos.x + this.vel.x * deltaTime +  0.5*this.acc.x * deltaTime*deltaTime
        this.pos.y = this.pos.y + this.vel.y * deltaTime +  0.5*this.acc.x * deltaTime*deltaTime
        this.vel.x = this.vel.x + this.acc.x * deltaTime
        this.vel.y = this.vel.y + this.acc.y * deltaTime
        this.acc.x = 0;
        this.acc.y = 0;
        
        if(spaceCtx != null){
            if(spaceCtx.wrap){
                let spaceWidth = spaceCtx.x1 - spaceCtx.x0;
                let spaceHeight = spaceCtx.y1 - spaceCtx.y0;
                if(this.pos.x < spaceCtx.x0) this.pos.x += spaceWidth;
                else if(this.pos.x >= spaceCtx.x1) this.pos.x -= spaceWidth;
                if(this.pos.y < spaceCtx.y0) this.pos.y += spaceHeight;
                else if(this.pos.y >= spaceCtx.y1) this.pos.y -= spaceHeight;
            } else {
                if(this.pos.x  - this.radius < spaceCtx.x0 ) {
                	this.pos.x = spaceCtx.x0+this.radius
                	this.vel.x = -this.vel.x;
                } else if( this.pos.x  + this.radius >= spaceCtx.x1) {
                	this.pos.x = spaceCtx.x1-this.radius
                	this.vel.x = -this.vel.x;
                }
                if(this.pos.y  - this.radius < spaceCtx.y0 ) {
                	this.pos.y = spaceCtx.y0+this.radius
                	this.vel.y = -this.vel.y;
                } else if( this.pos.y  + this.radius >= spaceCtx.y1) {
                	this.pos.y = spaceCtx.y1-this.radius
                	this.vel.y = -this.vel.y;
                }
            }
        }
    }   
    
    static randomParticles( amount , spawnArea = {x0: 0, x1: canvas.width, y0: 0, y1: canvas.height}, prob = 0.5){
        var particles = []
        
        for(let i=0;i<amount;i++){
            let pos = {x: spawnArea.x0 + Math.random()*(spawnArea.x1-spawnArea.x0),y: spawnArea.y0 + Math.random()*(spawnArea.y1-spawnArea.y0)};
            let vel = {x:0,y:0}//{x: Math.random()*100-50,y: Math.random()*100-50};
            let radius = 4;
            let charge = (Math.random() < prob) ? [-1,1,0]:[1,1,0];
            let mass = 1
            let color = Physics.getColorFromCharge(charge);
            particles.push(new Particle(pos,vel,mass, charge, radius, color));
        }

        
        return particles;
    }

}




