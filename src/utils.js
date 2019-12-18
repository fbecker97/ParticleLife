class Utils{
    
    static getAbs(vector){
        return Math.sqrt(vector.x*vector.x+vector.y*vector.y);
    }
    
    static setAbs(vector, abs){
        let vector_abs = Utils.getAbs(vector)
        return {x: abs*vector.x/vector_abs,y: abs*vector.y/vector_abs, }
    }
}

