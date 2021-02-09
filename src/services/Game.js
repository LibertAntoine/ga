import Algebra from "ganja.js"

import {Raytracer} from "./algebra/Engine.js"
import ShapeFactory from "./algebra/ShapeFactory.js"
import {SimpleLight, BundleLight} from "./algebra/LightSource.js"
import {PlaneMirror} from "./algebra/Mirror.js"
import {LineWall} from "./algebra/Wall.js"
import {ThinLens, ThickLens, SphereLens} from "./algebra/Lens.js"
import {SphereGoal} from "./algebra/Goal.js"

export default class Game {

    algebra = Algebra(2, 0, 1)
    #options = {animate:1,grid:0}
    sf = new ShapeFactory(this.algebra)
    engine = new Raytracer(this.algebra)


    setup = (level) => {
      this.engine = new Raytracer(this.algebra)
      SphereGoal.numberIteration = -1;
      this.addFilters()
    
      // Load SimpleLight     
      level.simpleLight.forEach((light) => {
        this.addSimpleLight(
            (light[0][2] == "fixed")?this.sf.fPoint(light[0][0],light[0][1]):this.sf.dPoint(light[0][0],light[0][1]), 
            (light[1][2] == "fixed")?this.sf.fPoint(light[1][0],light[1][1]):this.sf.dPoint(light[1][0],light[1][1]),
            light[2])
      })

      // Load BundleLight 
      level.bundleLight.forEach((light) => {
        this.addBundleLight(
            (light[0][2] == "fixed")?this.sf.fPoint(light[0][0],light[0][1]):this.sf.dPoint(light[0][0],light[0][1]), 
            (light[1][2] == "fixed")?this.sf.fPoint(light[1][0],light[1][1]):this.sf.dPoint(light[1][0],light[1][1]),
            light[2], light[3])
      })

      // Load SphereGoal
      level.sphereGoal.forEach((goal) => {
        this.addSphereGoal(
            (goal[0][2] == "fixed")?this.sf.fPoint(goal[0][0],goal[0][1]):this.sf.dPoint(goal[0][0],goal[0][1]), 
            goal[1],
            goal[2])
      })             

      // Load ThinLens
      level.thinLens.forEach((lens) => {
        this.addThinLens(
            (lens[0][2] == "fixed")?this.sf.fPoint(lens[0][0],lens[0][1]):this.sf.dPoint(lens[0][0],lens[0][1]), 
            (lens[1][2] == "fixed")?this.sf.fPoint(lens[1][0],lens[1][1]):this.sf.dPoint(lens[1][0],lens[1][1]),
            (lens[2][2] == "fixed")?this.sf.fPoint(lens[2][0],lens[2][1]):this.sf.dPoint(lens[2][0],lens[2][1]),
            lens[3])
      })

      // Load ThickLens
      level.thickLens.forEach((lens) => {
        this.addThickLens(
            (lens[0][2] == "fixed")?this.sf.fPoint(lens[0][0],lens[0][1]):this.sf.dPoint(lens[0][0],lens[0][1]), 
            (lens[1][2] == "fixed")?this.sf.fPoint(lens[1][0],lens[1][1]):this.sf.dPoint(lens[1][0],lens[1][1]),
            lens[2])
      })

      // Load SphereLens
      level.sphereLens.forEach((lens) => {
        this.addSphereLens(this.algebra,
            (lens[0][2] == "fixed")?this.sf.fPoint(lens[0][0],lens[0][1]):this.sf.dPoint(lens[0][0],lens[0][1]), 
            (lens[1][2] == "fixed")?this.sf.fPoint(lens[1][0],lens[1][1]):this.sf.dPoint(lens[1][0],lens[1][1]),
            lens[2])
      })

      // Load PlaneMirror
      level.planeMirror.forEach((mirror) => {
        this.addPlaneMirror(
            (mirror[0][2] == "fixed")?this.sf.fPoint(mirror[0][0],mirror[0][1]):this.sf.dPoint(mirror[0][0],mirror[0][1]), 
            (mirror[1][2] == "fixed")?this.sf.fPoint(mirror[1][0],mirror[1][1]):this.sf.dPoint(mirror[1][0],mirror[1][1]),
            mirror[2])
      })

      // Load LineWall
      level.lineWall.forEach((wall) => {
        this.addLineWall(
            (wall[0][2] == "fixed")?this.sf.fPoint(wall[0][0],wall[0][1]):this.sf.dPoint(wall[0][0],wall[0][1]), 
            (wall[1][2] == "fixed")?this.sf.fPoint(wall[1][0],wall[1][1]):this.sf.dPoint(wall[1][0],wall[1][1]),
            wall[2])
      })  

    }

    draw = () => {
      let svg = this.algebra.graph(this.engine.trace, this.options)
      svg.style.background='rgba(0, 0, 0, 0.0)';
      svg.style.width='100%';
      svg.style.height='100%';
      svg.style.position='absolute';
      setInterval(()=>{svg.setAttribute("stroke-dashoffset", -performance.now()/5000);},1000/30);
      return svg
    }

    addSimpleLight = (point1=this.sf.dPoint(-1.5,0), point2=this.sf.dPoint(-1,0), color=0xFF0000) => {
      this.engine.addLightSource(new SimpleLight(this.algebra, point1, point2, color))   
    }

    addBundleLight = (point1=this.sf.dPoint(1.5,0), point2=this.sf.dPoint(1,1), angle= Math.PI/12, colors=[0xFF0000,0xFF8800,0xFFFF00,0x00FF00,0x00FFFF]) => {
      this.engine.addLightSource(new BundleLight(this.algebra, point1, point2, angle, colors))   
    }

    addSphereGoal = (point=this.sf.fPoint(1,0.5), radius=0.5, color=0xFFFFFF) => {
      this.engine.addGoal(new SphereGoal(this.algebra, point, radius, color)) 
    }

    addThinLens = (point1=this.sf.dPoint(0.8,0.6), point2=this.sf.dPoint(0.8,-0.4),  point3=this.sf.dPoint(0.5,0), color=0xFFFFFF) => {
      this.engine.addElement(new ThinLens(this.algebra, point1, point2, point3, color))   
    }   

    addThickLens = (point1=this.sf.dPoint(-0.25,0), point2=this.sf.dPoint(0.29,0), color=0xFFFFFF) => {
      this.engine.addElement(new ThickLens(this.algebra, point1, point2, color))   
    }

    addSphereLens = (point1=this.sf.dPoint(1,1), point2=this.sf.dPoint(1.29,1), color=0xFFFFFF) => {
      this.engine.addElement(new SphereLens(this.algebra, point1, point2, color)) 

    }

    addPlaneMirror = (point1=this.sf.dPoint(1,0.5), point2=this.sf.dPoint(1.2,-0.5), color=0xFFFFFF) => {
      this.engine.addElement(new PlaneMirror(this.algebra, point1, point2, color))   
    }

    addLineWall = (point1=this.sf.fPoint(1,0.5), point2=this.sf.fPoint(1.2,-0.5), color=0xFFFFFF) => {
      this.engine.addElement(new LineWall(this.algebra, point1, point2, color))   
    }

    addFilters = () => {
      this.engine.render.push(`<defs><filter id="wall" x="-6" y="-6" height="10" width="10" filterUnits="userSpaceOnUse"><feGaussianBlur in="SourceGraphic" stdDeviation="0.025" /></filter></defs>`)
      this.engine.render.push(`<defs><filter id="laser" x="-6" y="-6" height="10" width="10" filterUnits="userSpaceOnUse"><feGaussianBlur in="SourceGraphic" stdDeviation="0.01" /></filter></defs>`)
      this.engine.render.push(`<defs><filter id="mirror" x="-6" y="-6" height="10" width="10" filterUnits="userSpaceOnUse"><feGaussianBlur in="SourceGraphic" stdDeviation="0.005" /></filter></defs>`)
      
      this.engine.renderLength = this.engine.render.length
    }

}