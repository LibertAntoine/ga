<template>
  <div id="game">
    <div id="UIandGame">
      <div id="graph">
        <div id="winIllustration" :class="{isWinBloc: game.engine.isWin && currentLevel != 10}"><img id="winImg" :class="{isWin: game.engine.isWin && currentLevel != 10}" src="@/assets/Win.png" /></div>
      </div>
      <div id="UI">
        <div id="levelPresentation">
          <h2>{{levels[currentLevel].title}}</h2>
          <p id="description">{{levels[currentLevel].description}}</p>
        </div>
        <div v-if="actionTools.active == true" id="toolsButtons">
          <h2>Available Tools</h2>
            <sui-button class="UIButton" color="red" inverted v-if="actionTools.simpleLight >= 0" v-on:click="addSimpleLight" :disabled="actionTools.simpleLight == 0" >Simple Light x{{actionTools.simpleLight}}</sui-button>
            <sui-button class="UIButton" color="red" inverted v-if="actionTools.bundleLight >= 0" v-on:click="addBundleLight" :disabled="actionTools.bundleLight == 0">Bundle Light x{{actionTools.bundleLight}}</sui-button>
            <sui-button class="UIButton" color="red" inverted v-if="actionTools.thinLens >= 0" v-on:click="addThinLens" :disabled="actionTools.thinLens == 0">Thin Lens x{{actionTools.thinLens}}</sui-button>
            <sui-button class="UIButton" color="red" inverted v-if="actionTools.thickLens >= 0" v-on:click="addThickLens" :disabled="actionTools.thickLens == 0">Thick Lens x{{actionTools.thickLens}}</sui-button>
            <sui-button class="UIButton" color="red" inverted v-if="actionTools.sphereLens >= 0" v-on:click="addSphereLens" :disabled="actionTools.sphereLens == 0">Sphere Lens x{{actionTools.sphereLens}}</sui-button>
            <sui-button class="UIButton" color="red" inverted v-if="actionTools.planeMirror >= 0" v-on:click="addPlaneMirror" :disabled="actionTools.planeMirror == 0">Plane Mirror x{{actionTools.planeMirror}}</sui-button>
        </div>
        <div v-if="currentLevel == 10" id="toolsButtons">
          <h2><a href="https://github.com/LibertAntoine"><i class="github square icon"></i>Github</a></h2>
        </div>
        <div id="navigationButtons">
          <sui-button class="navButton" color="green" inverted v-if="currentLevel != levels.length-1"  :disabled="game.engine.isWin == false" v-on:click="goNextLevel">Next Level <i class="arrow right icon"></i></sui-button>
          <sui-button class="navButton" color="red" inverted v-if="currentLevel != 0" v-on:click="goPreviousLevel">Previous Level</sui-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Game from '@/services/Game'
import LaserQuestLevels from '@/services/levels/mainLaserQuest.js'

export default {
  name: 'Game',
  data: function () {
    return {
      game : new Game(),
      svg : null,
      currentLevel : 0,
      levels : LaserQuestLevels,
      actionTools : {...LaserQuestLevels[0].availableTools}
    }
  },
  mounted() {
        this.game.setup(this.levels[this.currentLevel].starter)
        this.svg = document.getElementById("graph").appendChild(this.game.draw())       
  }, 
  methods : {
    addSimpleLight() {
      this.actionTools.simpleLight--
      this.game.addSimpleLight()
      this.reset()
    },
    addBundleLight() {
      this.actionTools.bundleLight--
      this.game.addBundleLight()
       this.reset()
    },
    addThinLens() {
      this.actionTools.thinLens--
      this.game.addThinLens()
       this.reset()
    },
    addThickLens() {
      this.actionTools.thickLens--
      this.game.addThickLens()
      this.reset()
    },
    addSphereLens() {
      
      this.actionTools.sphereLens--
      this.game.addSphereLens()
       this.reset()
    },
    addPlaneMirror() {
      this.actionTools.planeMirror--
      this.game.addPlaneMirror()
       this.reset()
    },
    reset() {
      let newsvg = this.game.draw()
      this.svg.replaceWith(newsvg)
      this.svg = newsvg
    },
    goPreviousLevel() {
      this.loadLevel(--this.currentLevel)
    }, 
    goNextLevel() {
      this.loadLevel(++this.currentLevel)
    },
    loadLevel(n) {
      this.currentLevel = n
      this.game.setup(this.levels[this.currentLevel].starter)
      this.actionTools = {...this.levels[this.currentLevel].availableTools}
      this.reset()
    }
  }
}
</script>

<style>
h2 {
    font-family: Oswald sans-serif;
      
  font-size:30px;
  color: #e93434;
}

polygon {
  opacity : 1 !important
}

#description {
  padding-left:20px;
  padding-right:20px;
    font-family: Lato sans-serif;
  font-size : 18px;
  color : rgba(255, 255, 255, 0.842);
}

#UIandGame {
  display: flex;
  width: 90%;
  margin : 0 auto;
  padding : 30px;
  border : 1px black solid;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.726);
  height:100%;
  position: relative;
}

#game {
  width: 90%;
  height: 100%;
  flex: 1 1 auto;
  
}

#graph {
  position:relative;
  display: flex;
  width: 70%;
  height :100%;

}

button {
  margin : 30px;
}

.UIButton {
  margin: 15px !important;
  font-size: 15px !important;
}

#UI {
  width: 30%;
  display: flex;
  flex-direction: column;
  padding-left : 20px;
  padding-top : 20px;
  padding-bottom : 20px;
}

#graph {
  background-color:rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  animation: 4s linear 1s infinite alternate slidein;
}

#levelPresentation {
    flex-grow: 1; 
  margin-bottom: auto;
}

#toolsButtons {
  flex-grow: 1; 
  margin-bottom: auto;
}

#navigationButtons {
  padding-left : 30px;
  padding-right : 10px;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}

#winIllustration {
  border-radius : 15px;
  z-index: 5;
  opacity : 0.6;
  background-color: rgba(1, 1, 1, 0.9);
  width : 100%;
  height : 0%;
}

#winImg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height : 0%;
    

}

.isWin {
  height : 30% !important;
  transition : height 2s;
}

.isWinBloc {
  height : 100% !important;
}

@keyframes slidein {
  from { 
  box-shadow:
    inset 0 0 30px #fff,
    inset 20px 0 30px rgb(162, 0, 255),
    inset -20px 0 30px #0ff,
    inset 20px 0 60px  rgb(255, 102, 0),
    inset -20px 0 60px #0ff,
    0 0 30px #fff,
    -10px 0 20px rgb(162, 0, 255),
    10px 0 20px #0ff;
  }
  to   { 
    box-shadow:
    inset 0 0 30px #fff,
    inset 20px 0 50px rgb(255, 102, 0),
    inset -20px 0 50px #0ff,
    inset 20px 0 30px rgb(162, 0, 255),
    inset -20px 0 30px #0ff,
    0 0 30px #fff,
    -10px 0 40px rgb(255, 102, 0),
    10px 0 40px #0ff;
  }
}
</style>