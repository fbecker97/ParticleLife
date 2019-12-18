class Physics{
    
    static get G(){
        return 100;
    }
    
    static get C(){
        return 100000;
    }
    
    static get DRAG(){
        return 0.01;
    }
    
    static get MAX_FORCE(){
        return 10000;
    }
    

    static getGravitationalForce(diff, mass1, mass2){
        let dist = Utils.getAbs(diff);   
        let force_factor = Physics.G * mass1 * mass2/(dist*dist*dist)
        return {x: -diff.x*force_factor, y: -diff.y*force_factor}
    }
    
    static getElectricForce(diff, charge1, charge2){
        let dist = Utils.getAbs(diff);   
        let force_factor = Physics.C * charge1 * charge2/(dist*dist*dist)
        return {x: diff.x*force_factor, y: diff.y*force_factor}
    }
    
    static getForceBetween(e1, e2){
        let diff = {x: e1.pos.x-e2.pos.x, y: e1.pos.y-e2.pos.y}
        let gravitationalForce = Physics.getGravitationalForce(diff, e1.mass, e2.mass);
        let electricForce = Physics.getElectricForce(diff, e1.charge, e2.charge);
        return {x: gravitationalForce.x+electricForce.x, y: gravitationalForce.y+electricForce.y}
    }
    
    
    static getDragForce(e1){
        return {x: -e1.vel.x*Physics.DRAG, y: -e1.vel.y*Physics.DRAG }
    }
    
}



