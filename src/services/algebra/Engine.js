
class Raytracer {

    #algebra;
    render;
    renderLength;
    sources; 
    elements;
    goals;
    isWin = false;

    constructor(alg) { 
        this.algebra = alg 
        this.render = [0]
        this.renderLength = 1
        this.sources = [];
        this.elements = [];
        this.goals = [];
    }

    addGoal = (newGoal) => {
        this.goals.push(newGoal)
        this.elements.push(newGoal)
        //this.addToRender(newGoal)
    }

    // add any element that we can intersect
    addElement = (newElement) => {
        this.elements.push(newElement)
        this.addToRender(newElement)
    }

    addLightSource = (newSource) => {
        this.sources.push(newSource)
        this.addToRender(newSource)
    }

    // add any element that we have to visualy render
    addToRender = (toRender) => {
        this.render.splice(this.renderLength,1000)
        toRender.render().map((x) => this.render.push(x))
        this.renderLength = this.render.length;
    }

    trace = () => { return this.algebra.inline((engine) => {

        var rays = [];
        engine.elements.forEach(e=>e.reset&&e.reset()); // reset elements visual
        engine.goals.forEach((g) =>g.touch=false) // check goal that are touched

        // ray tracing 
        engine.sources.map(s=>s.rays()).flat().forEach((ray)=>{
              let raycolor = ray[2]
              var bounce=0, laste = -1; 
              while (bounce++<50) { // for each bounce
                  var min = 0, mine = -1;
                  engine.elements.forEach((element,ei)=>{ // find element intersect first
                      var cur=element.intersect([ray[0], ray[1], false, raycolor])
                      if (laste != ei && cur[0] && (min==0 || min[1]>cur[1])) { min=cur; mine = ei; }
                  }); laste = mine;

                  if (min && min[0]) { // if element find 
                      rays.push(raycolor, [ray[1],min[2]]); // add ray of light
                      if(engine.elements[mine].touch != undefined && raycolor == engine.elements[mine].color) engine.elements[mine].touch = true;
                      if (engine.elements[mine].color != 16777215) raycolor = engine.elements[mine].color // change color depending of the element
                      
     
                      if(min[3]===-1) break;
                      if (min[3]===undefined) return min[4].call(engine.elements[mine], min[0], min[1], min[2], raycolor);

                      ray = [min[3].Normalized, min[2]];

                      while (min[4]===true && bounce++<50) {
                          
                          min = engine.elements[mine].intersect([ray[0], ray[1], true, raycolor]);
                          rays.push(raycolor,[ray[1],min[2]]);
                          ray = [min[3].Normalized, min[2]];
                      }
                  } else { // if no element intersect, add ray toward infinite
                      let infPoint = Element.sw((Element.Add(1,Element.Mul(ray[0],Element.Coeff(7,10)))),ray[1])
                      rays.push(raycolor, [ray[1], infPoint])
                      break;
                  }
              }
          })


          engine.render.splice(engine.renderLength,1000)

          // check if we have win the level
          let win = true;    
          engine.goals.forEach((x) => { 
              x.render().map((y) => engine.render.push(y))
              if (x.touch==false) {
                  win = false
              }
            })
          engine.isWin = win
  
          // add laser effect in svg rendering
          engine.render.push(0xFF0000,'<G filter="url(#laser)" stroke-dasharray="0.1,0.08" comp-op="lighten" stroke-width="0.03" stroke-linecap="round" >')
          
          // add all rays in the rendering
          rays.forEach((ray) => engine.render.push(ray))
          
          return engine.render
        })(this)    
    }   
}

module.exports = {Raytracer}
