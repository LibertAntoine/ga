
class ThinLens {

    #algebra;
    point1;
    point2;
    point3;
    color;

    constructor(alg, point1, point2, point3, color) { 
        this.algebra = alg 
        this.point1 = point1
        this.point2 = point2
        this.point3 = point3
        this.color = color
    }
    lens = () => { return this.algebra.inline((lens)=>(lens.point1&lens.point2).Normalized)(this)}
    backplane = () => { return this.algebra.inline((lens)=>Element.sw(Element.Sub(1,Element.Mul((Element.Vee(lens.point3,( Element.Mul((Element.Dot(lens.lens,lens.point3)),lens.lens) ))),Element.Coeff(7,0.5))), lens.lens))(this) }

    intersect(ray) { return this.algebra.inline((lens, ray)=>
        {

            // The plane of the lens
            var lensPlane    = (lens.point1 & lens.point2);
            // The intersection point with the ray
            var p         = Element.Wedge(lensPlane, ray[0]).Normalized;
            p = p*p.e12;
            // The midpoint, length, and intersection check. (includes 'front ray test')
            var midpoint  = (lens.point1 + lens.point2)/2;
            var length    = (lens.point1 & lens.point2).Length;
            // Figure out if the mirrors is hit in its segment, with the 'forward' ray
            var intersect = (lensPlane|ray[1]|ray[0]).s * (ray[1]&lensPlane).s > 0 && (midpoint & p).Length < length/2;
            // Now figure out if the focal point is on the front as seen from the ray.
            var focalfront = Element.Wedge(lens.lens,lens.point3).e012 * Element.Wedge(lens.lens,ray[1]).e012 > 0;
            // Also figure out the focal lenth (signed!)
            var focalpositive = (lens.lens^lens.point3).e012 > 0; 
            if (intersect) {
                var p3 = focalfront==focalpositive ? lens.point3 : Element.sw(lens.lens, lens.point3);
                var bp = focalfront==focalpositive ? lens.backplane : Element.sw(lens.lens, lens.backplane);
                var r_through_f = (ray[0]|p3)*p3;
                var out_ray   = (focalfront?1:-1) * p & Element.Wedge(Element.Wedge(r_through_f, lensPlane | lensPlane), bp).Normalized;
            }
            return [ intersect, (ray[1] & p).Length, p, out_ray ];

        })(this, ray)
    }
    
    render() { 
        return this.algebra.inline((lens)=>[
        lens.color, '<G stroke-width="0.003" stroke-opacity=0.5>', lens.backplane, '</G>', lens.point1, lens.point2, lens.point3, 
        ()=>"F="+(lens.point3^lens.lens).e012.toFixed(2), '<G stroke-width="0.02" stroke-dashoffset="0" stroke-dasharray="0.1, 0.01">', [lens.point1,lens.point2], '</G>'    
    ])(this)}
}


class ThickLens {

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

    intersect(ray) { return this.algebra.inline((lens, ray)=>
        {
            if(ray[2] == undefined) ray[2] = false
            // The radius between the two dragable points.  
            var radius    = (lens.point1 & lens.point2).Length;
            
            // The distance of the center to the ray.
            var dist      = Math.abs(!(lens.point1.Normalized ^ ray[0].Normalized));
            var dist2     = Math.abs(!(lens.point2.Normalized ^ ray[0].Normalized));

            // See if that is within the radius.
            var intersect = (dist < radius) && (dist2 < radius);
            
            // Temporary point where the ray cuts the line orthogonal to the ray, through the point.
            var temp1     = Element.Normalize((Element.Wedge((Element.Mul(ray[0],lens.point1)),ray[0])));
            temp1 = temp1 * temp1.e12;
            // And for the other circle..
            var temp2     = Element.Normalize((Element.Wedge((Element.Mul(ray[0],lens.point2)),ray[0])));
            temp2 = temp2 * temp2.e12;

            // The intersection point, using pythagoras and a translator     
            var arc1  = (1+(ray[2]?1:-1)*Math.abs(radius**2 - dist**2)**.5*ray[0]*.5e012) 
            var i_point  = Element.sw(arc1, temp1);
            var arc2   = (1+(ray[2]?1:-1)*Math.abs(radius**2 - dist2**2)**.5*ray[0]*.5e012) 
            var i_point2  = Element.sw(arc2, temp2);

            var [s1,s2] = [((i_point&ray[1])|ray[0]).s, ((i_point2&ray[1])|ray[0]).s ];
            var [l1,l2] = [s1<0?(i_point&ray[1]).Length:-1,s2<0?(i_point2&ray[1]).Length:-1];

            let ip, cp;  
            if (ray[2]) {
              ip         = l1<=l2?i_point:i_point2;
              cp         = l1<=l2?lens.point1:lens.point2;
            } else {
              ip         = l1>=l2?i_point:i_point2; 
              cp         = l1>=l2?lens.point1:lens.point2;
            }
            
            intersect = ((ip & lens.point1).Length < radius+0.001) && ((ip&lens.point2).Length < radius+0.001);

            if (intersect) {
                // The interface tangent line at the intersection
                var I = cp&ip|ip;
                // Travel distance n1 back on the ray, call this point 'A'
                var in_n = 1*(parseFloat(1.47)||1);
                var n1 = ray[2]?in_n:1.0, n2 = ray[2]?1.0:in_n;
                var A  =  Element.sw((1-n1*ray[0]*.5e012), ip);
                // Construct line 'p' by projecting on the interface.      
                var p = (I|A).Normalized
                // Measure the distance from 'S' to 'p'
                var S_to_p = Math.abs(!(Element.Wedge(ip, p))); 
                // This gives us the distance from the interface to point 'B'
                var I_to_B = (n2**2 - S_to_p**2);
                // Total internal reflection.
                if (I_to_B<0) return [ true, (ray[1] & ip).Length, ip, Element.sw(I*ip, -ray[0]), ray[2]===true];
                // Now construct B by moving along p.
                var B = Element.sw((1+(ray[2]?1:-1)*I_to_B**.5*p*.5e012), (Element.Wedge(p, I)));

                return [ true, (ray[1] & ip).Length, ip, -B&ip, ray[2]===false ];
            }
            // Return distance, intersection point and new ray.
            return [ false, (ray[1] & ip).Length, ip ];

        })(this, ray)
    }
    
    render() { 
        return this.algebra.inline((lens, p1, p2)=>{
            
        let circle = (new (require('./ShapeFactory.js'))(lens.algebra)).circle
        let array1 = () => [(1+(lens.point1&lens.point2).Normalized*(1e2|lens.point1)).Normalized >>> circle(lens.point1, (lens.point1 & lens.point2).Length,64,0.339,16)
        ,(1+(lens.point1&lens.point2).Normalized*(1e2|lens.point2)).Normalized >>> circle(lens.point2, (lens.point1 & lens.point2).Length,64,0.339,-16)].flat()     
        
        return [
            lens.color, p1, p2,
            '<G stroke="#'+ lens.color.toString(16) +'" fill-opacity="0.5" stroke-opacity="0.8" stroke-width="0.02" stroke-dashoffset="0" stroke-dasharray="0.07, 0.05"  opacity="1" stroke-linecap="round" stroke-linejoin="bevel" >', array1, 
            '</G>'  
        ]})(this, (typeof(this.point1) == "object")?this.point1:undefined, (typeof(this.point2) == "object")?this.point2:undefined)}
}


class SphereLens {

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

    intersect(ray) { return this.algebra.inline((lens, ray)=>
        {
            if(ray[2] == undefined) ray[2] = false
            // The radius between the two dragable points.  
            var radius    = (lens.point1 & lens.point2).Length;
            // The distance of the center to the ray.
            var dist      = Math.abs(!Element.Wedge(lens.point1.Normalized, ray[0].Normalized));
            // See if that is within the radius.
            var intersect = (dist < radius);
            // Temporary point where the ray cuts the line orthogonal to the ray, through the point.
            var temp1     = Element.Normalize((Element.Wedge((Element.Mul(ray[0],lens.point1)),ray[0])));
            temp1 = temp1 * temp1.e12;

            // The intersection point, using pythagoras and a translator
            var i_point    = Element.sw((1+(ray[2]?1:-1)*Math.abs(radius**2 - dist**2)**.5*ray[0]*.5e012), temp1);
            

            if (intersect) {
                // The interface tangent line at the intersection
                var I = lens.point1&i_point|i_point;
                // Travel distance n1 back on the ray, call this point 'A'
                var in_n = 1*(parseFloat(3)||1);
                var n1 = ray[2]?in_n:1.0, n2 = ray[2]?1.0:in_n;
                var A  = Element.sw(1-n1*ray[0]*.5e012, i_point);
                // Construct line 'p' by projecting on the interface.      
                var p = (I|A).Normalized
                // Measure the distance from 'S' to 'p'
                var S_to_p = Math.abs(!Element.Wedge(i_point, p)); 
                // This gives us the distance from the interface to point 'B'
                var I_to_B = (n2**2 - S_to_p**2);
                // Total internal reflection.
                if (I_to_B<0) return [ true, (ray[1] & i_point).Length, i_point, Element.sw(I*i_point, -ray), ray[2]===true];
                // Now construct B by moving along p.
                var B = Element.sw(1+(ray[2]?1:-1)*I_to_B**.5*p*.5e012, (Element.Wedge(p, I)));
                return [ true, (ray[1] & i_point).Length, i_point, -B&i_point, ray[2]===false ];
            }

            // Return distance, intersection point and new ray.
            return [ false, (ray[1] & i_point).Length, i_point ];

        })(this, ray)
    }

    render() { return this.algebra.inline((lens)=>{
        return [lens.color, lens.point1, lens.point2, '<G stroke="#'+ lens.color.toString(16) +'" fill-opacity="0.5" stroke-opacity="0.8" stroke-width="0.02" stroke-dashoffset="0" stroke-dasharray="0.07, 0.05"  opacity="1" stroke-linecap="round" stroke-linejoin="bevel" >', ()=>new (require('./ShapeFactory.js'))(lens.algebra).circle(lens.point1, (lens.point1 & lens.point2).Length), '</G>']
    })(this)}
}

module.exports = {ThinLens, ThickLens, SphereLens}
