class Physics{
    
    static get G(){
        return 50000;
    }
    
    static get C(){
        return 500000;
    }
    
    static get DRAG(){
        return 0.005;
    }
    
    static get MAX_VEL(){
    	return 1000;
    }

    static getGravitationalForce(e1,e2){
        let diff = {x: e1.pos.x-e2.pos.x, y: e1.pos.y-e2.pos.y}
        let dist = Math.max(Utils.getAbs(diff),e1.radius+e2.radius);   
        let force_factor = Physics.G * e1.mass * e2.mass/(dist*dist*dist)
        return {x: -diff.x*force_factor, y: -diff.y*force_factor}
    }
    
    static getElectricForce(e1,e2){
        let diff = {x: e1.pos.x-e2.pos.x, y: e1.pos.y-e2.pos.y}
        let dist = Math.max(Utils.getAbs(diff),e1.radius+e2.radius);    
        let force_factor = Physics.C * e1.charge * e2.charge/(dist*dist*dist)
        return {x: diff.x*force_factor, y: diff.y*force_factor}
    }
    
    static getForceBetween(e1, e2){
        let gravitationalForce = Physics.getGravitationalForce(e1,e2);
        let electricForce = Physics.getElectricForce(e1,e2);
        return {x: gravitationalForce.x+electricForce.x, y: gravitationalForce.y+electricForce.y}
    }
    
    static getDragForce(e1){
        return {x: -e1.vel.x*Physics.DRAG, y: -e1.vel.y*Physics.DRAG }
    }
    
    static areColliding(e1, e2){
        let diff = {x: e1.pos.x-e2.pos.x, y: e1.pos.y-e2.pos.y}
        return( Utils.getAbs(diff) < e1.radius+e2.radius)
    }
    
    static resolveCollision(e1, e2){
    	let result = []
    	if(e1.constructor.name == "Proton" && e2.constructor.name == "Electron" || e2.constructor.name == "Proton" && e1.constructor.name == "Electron"){
    		let dice = Math.random();
    		if(dice < 0.001){
	    		e1.isAnnihilated = true;
	    		e2.isAnnihilated = true;
	    		let vel_photon = {x: e1.vel.x-e2.vel.x, y: e1.vel.y-e2.vel.y}
	    		let vel_neutron = {x: (e2.vel.x-e1.vel.x)*0.9, y: (e2.vel.y-e1.vel.y)*0.9}
	    		result.push(new Photon(e1.pos,vel_photon), new Neutron(e2.pos, vel_neutron))
	    	}
    	}
    	if(e1.constructor.name == "Photon" || e2.constructor.name == "Photon"){
    		if(Math.random() < 0.5){
	    		if(e1.constructor.name == "Photon") {
	    			e1.isAnnihilated = true;
	    			e2.vel = Utils.setAbs(e2.vel, Physics.MAX_VEL/e2.mass);
	    		}
	    		else {
	    			e2.isAnnihilated = true;
	    			e1.vel = Utils.setAbs(e1.vel, Physics.MAX_VEL/e1.mass);
	    		}
	    		
	    	}
    	}
    	return result;
    }
    
}



