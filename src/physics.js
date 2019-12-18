class Physics{
    
    static get G(){
        return 10000;
    }
    
    static get C(){
        return 500000;
    }
    
    static get DRAG(){
        return 0.01;
    }    

    static getGravitationalForce(e1,e2){
        let diff = {x: e1.pos.x-e2.pos.x, y: e1.pos.y-e2.pos.y}
        let dist = Math.max(Utils.getAbs(diff),e1.radius+e2.radius);   
        let force_factor = Physics.G * e1.mass * e1.mass/(dist*dist*dist)
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
    
}



