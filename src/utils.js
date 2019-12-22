class Utils{
    
    static getAbs(vector){
        return Math.sqrt(vector.x*vector.x+vector.y*vector.y);
    }
    
    static setAbs(vector, abs){
        let vector_abs = Utils.getAbs(vector)
        return {x: abs*vector.x/vector_abs,y: abs*vector.y/vector_abs, }
    }
    
    static randomColors(num){
    	let colors = []
    	for(let i=0;i<num;i++){
    		colors.push("rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")")
    	}
    	return colors
    }
}
