class Particle{
	
    constructor( pos = {x:0,y:0}, vel = {x:0,y:0}, mass = 1, charge = 1, radius = 5, color = "#FFFFFF", isStatic = false) {
        this.pos = pos;
        this.vel = vel;
        this.acc = {x:0, y: 0};
        this.mass = mass;
        this.charge = charge;
        this.color = color;
        this.radius = radius
        this.isStatic = isStatic;
        
        this.isAnnihilated = false;
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
        if(Utils.getAbs(this.vel) > Physics.MAX_VEL) this.vel = Utils.setAbs(this.vel,Physics.MAX_VEL);
        this.pos.x = this.pos.x + this.vel.x * deltaTime + 0.5 * this.acc.x * deltaTime * deltaTime;
        this.pos.y = this.pos.y + this.vel.y * deltaTime + 0.5 * this.acc.y * deltaTime * deltaTime;
        this.vel.x = this.vel.x + this.acc.x * deltaTime;
        this.vel.y = this.vel.y + this.acc.y * deltaTime;
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
            let vel = {x: Math.random()*100-50,y: Math.random()*100-50};
            let dice1 = Math.random();
            let mass = 1+dice1*2;
            let radius = 4+dice1*4;
            let dice2 = Math.random();
            let charge = Math.floor(3-dice2*6);
            let color = "rgb("+(dice2*255).toString()+",0,"+(255-dice2*255).toString()+")";
            console.log(color);
            particles.push(new Particle(pos,vel,mass, charge, radius, color));
        }
        return particles;
    }

}




