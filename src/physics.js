class Physics{
    
    static get G(){
        return 3000;
    }
    
    static get C(){
        return 30000;
    }
    
    static get DRAG(){
        return 0.01;
    }
    
    static get MAX_VEL(){
    	return 500;
    }
    
    static force(p1,p2){
    	let diff = {x: p1.pos.x-p2.pos.x, y: p1.pos.y-p2.pos.y}
    	let dist = Math.max(Utils.getAbs(diff),p1.radius+p2.radius);
    	let force_factor = (Physics.C*p1.charge*p2.charge-Physics.G*p1.mass*p2.mass)/(dist*dist*dist)

    	return {x: diff.x*force_factor, y: diff.y*force_factor}
    }
    
    static drag(p1){
        return {x: -p1.vel.x*Physics.DRAG, y: -p1.vel.y*Physics.DRAG }
    }
    
    static areColliding(p1, p2){
        let diff = {x: p1.pos.x-p2.pos.x, y: p1.pos.y-p2.pos.y}
        return( Utils.getAbs(diff) < p1.radius+p2.radius)
    }
    
    static resolveCollision(p1, p2){
    	
    	let result = []

    	
    	return result;
    }
    
}



