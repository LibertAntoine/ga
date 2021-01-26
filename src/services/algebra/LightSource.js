
class SimpleLight {

    #algebra;
    position;
    handle;
    color;

    constructor(alg, position, handle, color) { 
        this.algebra = alg 
        this.position = position
        this.handle = handle
        this.color = color
    }

    rays() { return this.algebra.inline((light)=>[[(light.position & light.handle).Normalized, light.position, light.color]])(this)
    }
    
    render(){ 
        return this.algebra.inline((light, p1, p2)=>{
        let circle = (new (require('./ShapeFactory.js'))(light.algebra)).circle    
        let array1 = () => [(1+(light.handle&light.position).Normalized*(1e2|light.handle)).Normalized >>> circle(light.handle, (light.handle & light.position).Length,64,0.339,16),
            ((1+(light.handle&light.position).Normalized*(1e2|light.handle)).Normalized >>> circle(light.handle, (light.handle & light.position).Length * 0.9,64,0.339,16)).reverse()].flat()

        let array2 = () => [(1+(light.position&light.handle).Normalized*(1e2|light.position)).Normalized >>> circle(light.position, (light.position & light.handle).Length * 0.6,64,0.339,16),
            ((1+(light.position&light.handle).Normalized*(1e2|light.position)).Normalized >>> circle(light.position, (light.position & light.handle).Length * 0.5,64,0.339,16)).reverse()].flat()
    
            
        return [ 0x664444, '<G  stroke="#664444" stroke-width="0.02"  stroke-linecap="round" stroke-linejoin="bevel" >', array1, '</G>', 0xFFFFFF, p1, light.color, p2, '<G stroke="' + light.color.toString(16) + '" stroke-width="0.03" stroke-linecap="round" stroke-linejoin="bevel">', array2, '</G>']}
        )(this, (typeof(this.position) == "object")?this.position:undefined, (typeof(this.handle) == "object")?this.handle:undefined)} 
}


class BundleLight {

    #algebra;
    position;
    handle;
    angle;
    colors

    constructor(alg, position, handle, angle=Math.PI/12, colors) { 
        this.algebra = alg 
        this.position = position
        this.handle = handle
        this.angle = angle
        this.colors = colors
    }

    rays = () => { return this.algebra.inline((light)=>{
        var array = [0, 0, 0, 0, 0, 0, 0]
            return array.map((x, i) => {
                let rotation = Element.Pow(Math.E,(Element.Mul(Element.Mul(Element.Mul(light.position, (Element.Sub(i,3))), 0.25), light.angle)))
                return [rotation>>>(light.position & light.handle).Normalized, 
                light.position, light.colors[i]]})
        })(this)
    }
    
    render(){
        return this.algebra.inline((light, p1, p2)=>{
            let circle = (new (require('./ShapeFactory.js'))(light.algebra)).circle    
            let array1 = () => [(1+(light.handle&light.position).Normalized*(1e2|light.handle)).Normalized >>> circle(light.handle, (light.handle & light.position).Length,64,0.339,16),
                ((1+(light.handle&light.position).Normalized*(1e2|light.handle)).Normalized >>> circle(light.handle, (light.handle & light.position).Length * 0.9,64,0.339,16)).reverse()].flat()
    
            let array2 = () => [(1+(light.position&light.handle).Normalized*(1e2|light.position)).Normalized >>> circle(light.position, (light.position & light.handle).Length * 0.6,64,0.339,16),
                ((1+(light.position&light.handle).Normalized*(1e2|light.position)).Normalized >>> circle(light.position, (light.position & light.handle).Length * 0.5,64,0.339,16)).reverse()].flat()
        
                
            return [ 0x664444, '<G  stroke="#664444" stroke-width="0.02"  stroke-linecap="round" stroke-linejoin="bevel" >', array1, '</G>', 0xFFFFFF, p1, p2, '<G stroke="white" stroke-width="0.01" stroke-linecap="round" stroke-linejoin="bevel">', array2, '</G>']}
            )(this, (typeof(this.position) == "object")?this.position:undefined, (typeof(this.handle) == "object")?this.handle:undefined)} 
    }

module.exports = {SimpleLight, BundleLight}
