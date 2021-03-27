class LineWall {

    #algebra;
    point1;
    point2;
    color;

    constructor(alg, point1, point2, color) { 
        this.algebra = alg 
        this.point1 = point1
        this.point2 = point2
        this.color = color
    }

    intersect(ray) { return this.algebra.inline((point1, point2, ray)=>
        {
            var mirror    = (point1 & point2);
            var ipoint    = (ray[0] ^ mirror).Normalized;
            ipoint = ipoint*ipoint.e12;
            var midpoint  = (point1 + point2)/2;
            var length    = (point1 & point2).Length;
            var intersect = (midpoint & ipoint).Length < length/2;
            var sameside  = (ray[0]|(ray[1]&ipoint)).s > 0;
            
            return [ intersect&&sameside, (ray[1] & ipoint).Length, ipoint, -1]
        })(this.point1, this.point2, ray)
    }
    
    render(){ return [this.color, (typeof(this.point1) == "object")?this.point1:undefined, (typeof(this.point2) == "object")?this.point2:undefined, '<G filter="url(#wall)" stroke-width="0.06" stroke-linecap="round">', [this.point1, this.point2],'</G>']}
}

module.exports = {LineWall}
