
class SphereGoal {

    #algebra;
    point;
    radius;
    touch;
    color;
    opacity;

    static numberIteration = -1;

    constructor(alg, point, radius, color) { 
        this.algebra = alg 
        this.point = point
        this.radius = radius
        this.color = color
        this.touch = false
        this.opacity = 0.5
        SphereGoal.numberIteration++;
    }

    getOpacity = () => { return (this.touch)?"1":"0.5" }
    intersect(ray) { return this.algebra.inline((goal, ray) => {
            if(ray[2] == undefined) ray[2] = false
            var dist      = Math.abs(!Element.Wedge(goal.point.Normalized, ray[0].Normalized));
            var intersect = (dist < goal.radius);
            var temp1     = Element.Normalize((Element.Wedge((Element.Mul(ray[0],goal.point)),ray[0])));
            temp1 = temp1 * temp1.e12;

            var i_point    = Element.sw((1+(ray[2]?1:-1)*Math.abs(goal.radius**2 - dist**2)**.5*ray[0]*.5e012), temp1);
            var sameside  = (ray[0]|(ray[1]&i_point)).s > 0;

            if (intersect&&sameside) {
                //if(ray[3] == goal.color) goal.touch = true;
                return [ true, (ray[1] & i_point).Length, i_point, -1];
            }
            return [ false, (ray[1] & i_point).Length, i_point ];
        })(this, ray)
    }
    
    render = () =>{ return [this.color,'<G style="stroke:#' + this.color.toString(16) + '" stroke-opacity:"1" stroke-width="0.02" fill-opacity="' + this.getOpacity() + '">', ()=> (new (require('./ShapeFactory.js'))(this.algebra)).circle(this.point, this.radius), '</G>', '<G style="stroke:#' + this.color.toString(16) + '" opacity="0.70" stroke-width="0.01" fill-opacity="0">', ()=> (new (require('./ShapeFactory.js'))(this.algebra)).circle(this.point, this.radius * 0.8), ()=> (new (require('./ShapeFactory.js'))(this.algebra)).circle(this.point, this.radius * 0.6), ()=> (new (require('./ShapeFactory.js'))(this.algebra)).circle(this.point, this.radius * 0.4), ()=> (new (require('./ShapeFactory.js'))(this.algebra)).circle(this.point, this.radius * 0.2), '</G>']}
}

module.exports = {SphereGoal}
