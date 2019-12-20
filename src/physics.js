const COULOMB = [10000,10000,10000];
const DRAG = 0.1;

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
        p1.applyForce({x: -p1.vel.x*DRAG, y: -p1.vel.y*DRAG });
    }
    
    static areColliding(p1, p2){
        let diff = {x: p1.pos.x-p2.pos.x, y: p1.pos.y-p2.pos.y}
        return( Utils.getAbs(diff) < p1.radius+p2.radius)
    }
    
    static resolveCollision(p1, p2){
    	let result = []

    	
    	return result;
    }
    
    static getColorFromCharge(charge){
        return (charge[0] > 0) ? "#FF0000":"#0000FF";
    }
    
}



