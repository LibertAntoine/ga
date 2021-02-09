<template>
  <div id="app">
    <Title/>
    <Game/>
  </div>
</template>

<script>
import Game from "@/components/Game"
import Title from "@/components/Title"

export default {
  name: 'App',
  components: {
    Game,
    Title
  }
}
</script>

<style>

@font-face {
  font-family: neon;
  src: url("/fonts/denverFont.ttf");
}

body {
  background-image: url("./assets/back6.jpg");
  background-size: cover;
  background-position: bottom;
}

body, html {
  height :100vh;
  width: 100%;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;
  padding-bottom : 30px;
  padding-top  : 30px;
}

</style>
