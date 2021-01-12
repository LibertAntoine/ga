<template>
  <div id="game">
      <div id="graph"></div>
  </div>
</template>

<script>
//import Algebra from "ganja.js"
import Game from '@/tools/Game'

export default {
  name: 'Game',
  mounted() {
      /*
        let algebra = Algebra(2,0,1)

        let calc = algebra.inline(() => {

            //var point = (x,y)=>1e12-x*1e02+y*1e01;

            return [
                0x0000FF, 1e12, 1e1, 1e2,
                0x000000, 1e12-1e02-1e01, "point",
                0xff0000, [1e12+1e01,1e12+1e01+1e02], "segment",
                0x007700, [1e12-1e01,1e12-1e01+1e02,1e12], 0x000000, "polygon"
            ]
        })
        let graph = algebra.graph(calc())*/
        let game = new Game()
        document.getElementById("graph").appendChild(game.graph())
  }
}
</script>

<style>
</style>