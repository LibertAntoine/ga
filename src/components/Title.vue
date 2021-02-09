<template>
  <div id="title" class="neon-wrapper">
      <h1 class="neon-text">LASER QUEST</h1>
  </div>
</template>

<script>

export default {
  name: 'Title',
}
</script>

<style>

@font-face {
  font-family: neon;
  src: url("/fonts/denverFont.ttf");
}

h1 {
  font-family: neon;
  font-size: 50px;
}

.neon-wrapper {
  box-shadow:
  0 0 0.1vw  0.2vw #fff7f7,   
  0 0 0.2vw  0.3vw #e97272, 
  0 0   2vw  0.2vw #e50b0b,
  inset 0 0 1.5vw  0.4vw #e50b0b,
  inset 0 0 0.2vw  0.1vw #e97272,
  inset 0 0 0.2vw  0.1vw #fff7f7;
  border-radius: 1.5rem;
  padding-left : 30px;
  padding-right : 30px;
  margin-bottom : 20px;
  flex: 0 1 auto;
}

.neon-text {
  letter-spacing: .2rem;
  text-align: center;
  font-family:neon;
  color: #ffd8d8;
  text-shadow: 
  .1vw 0vw .1vw #ffd8d8, .1vw 0vw .1vw #ffd8d8, .1vw 0vw .1vw #ffd8d8, 
  .1vw 0vw   0vw #f25757, .2vw 0vw   0vw #f25757, .2vw 0vw   0vw #f25757,
  .1vw 0vw  .1vw #f25757, .2vw 0vw  .1vw #f25757, .2vw 0vw  .1vw #f25757,
  .1vw 0vw   2vw #f25757, .2vw 0vw   2vw #f25757, .2vw 0vw   2vw #f25757, 
  .1vw 0vw   1vw #e50b0b, .2vw 0vw   1vw #e50b0b, .2vw 0vw   2vw #e50b0b, 
  .1vw 0vw   5vw #e50b0b, .2vw 0vw  5vw #e50b0b, .2vw 0vw  5vw #e50b0b,
  .1vw 0vw  5vw #e50b0b, .2vw 0vw  5vw #e50b0b, .4vw 0vw  5vw #e50b0b;
}
</style>
