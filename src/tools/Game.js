import Algebra from "ganja.js"

export default class Game {

    constructor() {
        this.algebra = Algebra(2, 0, 1);
    }

    setup() {
        return this.algebra.inline(() => {
            //var point = (x,y)=>1e12-x*1e02+y*1e01;

            return [
                0x0000FF, 1e12, 1e1, 1e2,
                0x000000, 1e12-1e02-1e01, "point",
                0xff0000, [1e12+1e01,1e12+1e01+1e02], "segment",
                0x007700, [1e12-1e01,1e12-1e01+1e02,1e12], 0x000000, "polygon"
            ]
        })
    }

    graph() { return this.algebra.graph(this.setup())}
}