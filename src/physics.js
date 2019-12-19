class Physics{
    
    static get G(){
        return 60000;
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
    	let force_factor = Physics.resolveAttraction(p1.type,p2.type)*Physics.G*p1.mass*p2.mass/(dist*dist*dist)

    	return {x: diff.x*force_factor, y: diff.y*force_factor}
    }
    
    static drag(p1){
        return {x: -p1.vel.x*Physics.DRAG, y: -p1.vel.y*Physics.DRAG }
    }
    
    static resolveAttraction(type1, type2){
    	if(type1 == 0){
    		if(type2 == 1) return -1;
    		else return 1;
    	}
    	else if(type1 == 1){
    		if(type2 == 2 ) return -1;
    		else return 1;
    	}
    	else if(type1 == 2){
    		if(type2 == 3 ) return -1;
    		else return 1;
    	}
    	else if(type1 == 3){
    		if(type2 == 4 ) return -1;
    		else return 1;
    	}
    	else if(type1 == 4){
    		if(type2 == 0 ) return -1;
    		else return 1;
    	}
    }
    
    static areColliding(p1, p2){
        let diff = {x: p1.pos.x-p2.pos.x, y: p1.pos.y-p2.pos.y}
        return( Utils.getAbs(diff) < p1.radius+p2.radius)
    }
    
    static resolveCollision(p1, p2){
    	
    	let result = []
    	
    	if((p1.type+1)%5 == p2.type ){
    		p2.isAnnihilated = true;
    		p1.mass += p2.mass;
    		p1.radius++;
    	} else if ((p2.type+1)%5 == p1.type){
    		p1.isAnnihilated = true;
    		p2.mass += p1.mass;
    		p2.radius++;
    	}
    	
    	return result;
    }
    
}



