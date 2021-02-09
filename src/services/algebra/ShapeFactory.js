class ShapeFactory {
    
    #algebra;

    constructor(alg) { this.algebra = alg }

    fPoint = (x, y) => { return () => this.algebra.inline((x,y)=>1e12-x*1e02+y*1e01)(x, y) }
    dPoint = (x, y) => { return this.fPoint(x, y)() }

    dLine = (point1, point2) => { return () =>  this.algebra.inline((point1, point2)=>point1&point2)(point1, point2)}
    fLine = (point1, point2) => { return this.dLine(point1, point2)() }

    circle = (p, radius, subd=64, range=1, offset=0) => { return () =>  this.algebra.inline((p, radius, subd, range, offset)=>{
            let array = []
            let i = -1
            while(i++<subd-1) {
                let rotation = Element.Pow(Math.E,(Element.Add(Element.Mul(Element.Mul(Element.Div((Element.Mul((Element.Sub(i,31.5)),range)),(subd)),Math.PI),p),Element.Mul(Element.Mul((Element.Div(offset,(subd))),Math.PI),p))))
                array.push(Element.sw(rotation,(Element.Add(p,Element.Mul(radius,Element.Dual(Element.Coeff(2,1)))))))
            }
            return array
          })(p, radius, subd, range, offset) }
}

module.exports = ShapeFactory
