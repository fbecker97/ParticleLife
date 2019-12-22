
class Physics{
          
    static applyForceBetween(p1,p2){
    	let diff = {x: p1.pos.x-p2.pos.x, y: p1.pos.y-p2.pos.y}
    	let dist = Math.max(Utils.getAbs(diff),0.01)
    	let a1 = COULOMB*FORCE_MATRIX[p1.type][p2.type]
    	let b1 = (MAXRS[p1.type]+MINRS[p1.type])/2
    	let c1 = (MAXRS[p1.type]-MINRS[p1.type])/2
    	let d1 =  -0.5*MINRS[p1.type] + Math.sqrt( MINRS[p1.type]*MINRS[p1.type]*0.25 + MINRS[p1.type]*STRONG_SMOOTH/STRONG_MAX)
    	let force_12 = a1*(Math.max(0, 1 - Math.abs(dist-b1)/c1 )) - STRONG_SMOOTH*Math.max(0,1/(dist+d1)-1/(MINRS[p1.type]+d1) )/dist
    	
    	let a2 = COULOMB*FORCE_MATRIX[p2.type][p1.type]
    	let b2 = (MAXRS[p2.type]+MINRS[p2.type])/2
    	let c2 = (MAXRS[p2.type]-MINRS[p2.type])/2
    	let d2 =  -0.5*MINRS[p2.type] + Math.sqrt( MINRS[p2.type]*MINRS[p2.type]*0.25 + MINRS[p2.type]*STRONG_SMOOTH/STRONG_MAX)
    	let force_21 = a2*(Math.max(0, 1 - Math.abs(dist-b2)/c2 )) - STRONG_SMOOTH*Math.max(0,1/(dist+d2)-1/(MINRS[p2.type]+d2) )/dist
    	
    	p1.applyForce({x:-diff.x*force_21,y:-diff.y*force_21})
    	p2.applyForce({x:diff.x*force_12,y:diff.y*force_12})
    }
    
    static applyDrag(p1){
    	let vel_abs = Utils.getAbs(p1.vel)
        p1.applyForce({x: -p1.vel.x*DRAG*p1.radius*vel_abs, y: -p1.vel.y*DRAG*p1.radius*vel_abs });
    }
    
    static areColliding(p1, p2){
        let diff = {x: p1.pos.x-p2.pos.x, y: p1.pos.y-p2.pos.y}
        return( Utils.getAbs(diff) < p1.radius+p2.radius)
    }
    
    static resolveCollision(p1, p2){
    	let result = []
    	return result;
    } 
    
    static randomForceMatrix(num){
    	let matrix = new Array(num)
    	for(let i=0;i<num;i++){
    		matrix[i] = new Array(num)
    		for(let j=0;j<num;j++){
        		matrix[i][j] = (Math.random() > 0.5) ? 1:-1
        	}
    	}
    	return matrix
    }
    
    static randomForceMinR(num){
    	let m = []
    	for(let j=0;j<num;j++){
    		m.push(Math.random()*MINR_RANGE+MINR_THRESHOLD)
    	}
    	return m
    }
    
    static randomForceMaxR(num){
    	let m = []
    	for(let j=0;j<num;j++){
    		m.push(Math.random()*MAXR_RANGE+MAXR_THRESHOLD)
    	}
    	return m
    }
    
}
const MINR_RANGE = 3
const MINR_THRESHOLD = 12

const MAXR_RANGE = 5
const MAXR_THRESHOLD = 30

const PARTICLE_NUMBER = 300
const COULOMB = 10;
const STRONG_SMOOTH = 100000;
const STRONG_MAX = 80000;
const DRAG = 0.01;
const TYPE_NUMBER = 4
const TYPE_COLORS = Utils.randomColors(TYPE_NUMBER)
const FORCE_MATRIX = Physics.randomForceMatrix(TYPE_NUMBER)
const MINRS = Physics.randomForceMinR(TYPE_NUMBER)
const MAXRS = Physics.randomForceMaxR(TYPE_NUMBER)



