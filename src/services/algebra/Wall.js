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
            // The mirror line.  
            var mirror    = (point1 & point2);
            // Intersect ray with mirror line.
            var ipoint    = (ray[0] ^ mirror).Normalized;
            ipoint = ipoint*ipoint.e12; // make sure its positive.
            // The center of the mirror
            var midpoint  = (point1 + point2)/2;
            // The length of the mirror
            var length    = (point1 & point2).Length;
            // See if we're less then half the length away from the midpoint
            var intersect = (midpoint & ipoint).Length < length/2;
            // Make sure the ray has the same direction as the ray origin to our intersection point
            var sameside  = (ray[0]|(ray[1]&ipoint)).s > 0;
            // If so, return the distance, intersection point and new ray  
            return [ intersect&&sameside, (ray[1] & ipoint).Length, ipoint, -1]
        })(this.point1, this.point2, ray)
    }
    
    render(){ return [this.color, (typeof(this.point1) == "object")?this.point1:undefined, (typeof(this.point2) == "object")?this.point2:undefined, '<G filter="url(#wall)" stroke-width="0.06" stroke-linecap="round">', [this.point1, this.point2],'</G>']}
}

module.exports = {LineWall}
