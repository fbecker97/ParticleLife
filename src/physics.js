const COULOMB = [30,20,10];
const DRAG = 0.006;
const CHARGE_MAX = 30;
const MERGE_PROB = 0.01;
const MERGE_MAXR = 20;
const SPLIT_PROB = 0.0001;
const SPLIT_MINR = 8;


class Physics{
          
    static applyForceBetween(p1,p2){
    	let diff = {x: p1.pos.x-p2.pos.x, y: p1.pos.y-p2.pos.y}
    	let dist = Math.max(Utils.getAbs(diff), p1.radius+p2.radius);
    	let dir = {x: diff.x/dist, y: diff.y/dist}
    	
    	let force_factor = (COULOMB[0]*p1.charge[0]*p2.charge[0]+COULOMB[1]*p1.charge[1]*p2.charge[1]+COULOMB[2]*p1.charge[2]*p2.charge[2])/(dist*dist)
    	
    	p1.applyForce({x: dir.x*(force_factor), y: dir.y*(force_factor)})
    	p2.applyForce({x: -dir.x*(force_factor), y: -dir.y*(force_factor)})
    }
    
    static applyDrag(p1){
        p1.applyForce({x: -p1.vel.x*DRAG*p1.radius, y: -p1.vel.y*DRAG*p1.radius });
    }
    
    static areColliding(p1, p2){
        let diff = {x: p1.pos.x-p2.pos.x, y: p1.pos.y-p2.pos.y}
        return( Utils.getAbs(diff) < p1.radius+p2.radius)
    }
    
    static resolveCollision(p1, p2){
    	let result = []
    	
    	
    	if(Math.random() < MERGE_PROB  && p1.radius < MERGE_MAXR && p2.radius < MERGE_MAXR){
    		p1.isAnnihilated = true
        	p2.isAnnihilated = true
        	let pos = {x: (p1.pos.x+p2.pos.x)/2, y: (p1.pos.y+p2.pos.y)/2}
        	let vel = {x: (p1.mass*p1.vel.x+p2.mass*p2.vel.x)/(p1.mass+p2.mass), y: (p1.mass*p1.vel.y+p2.mass*p2.vel.y)/(p1.mass+p2.mass)}
        	let mass = p1.mass+p2.mass
        	let radius = Math.sqrt(p1.radius*p1.radius+p2.radius*p2.radius)
        	let charge = [0,0,0]
        	for(let i=0;i<3;i++) charge[i] = (p1.charge[i]+p2.charge[i])/(1+(p1.charge[i]*p2.charge[i])/(CHARGE_MAX*CHARGE_MAX))
        	let color = Physics.getColorFromCharge(charge);
        	result.push(new Particle(pos,vel,mass, charge, radius, color));
    	}
    	return result;
    }
    
    static getColorFromCharge(charge){
        let r = 127 + (charge[0]/CHARGE_MAX)*127;
        let g = 127 + (charge[1]/CHARGE_MAX)*127;
        let b = 127 + (charge[2]/CHARGE_MAX)*127;
        return "rgb("+r.toString()+","+g.toString()+","+b.toString()+")";
    }
    
}



