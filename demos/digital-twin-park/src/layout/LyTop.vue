<script setup>
import { onMounted } from 'vue';
let factoryScaleZ = true;
var buildMarker = null;
let workerMarkers = [];
onMounted(() => {});
</script>

<template>
  <div class="ly-top">
    <div>
      <div class="nav">
        <p class="nav_title">智慧园区3D可视化系统</p>
        <img class="logo" src="../assets/images/logo.png" />
        <img class="weather" src="../assets/images/weather.png" />
      </div>
      <div class="nav_btn">
        <div class="btn_left"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ly-top {
  background: -webkit-linear-gradient(
    top,
    rgba(9, 30, 55, 0.6),
    rgba(9, 30, 55, 0.1)
  );
  width: 100%;
  pointer-events: all;
  z-index: 999;
  height: 3vw;
}

.nav {
  position: relative;
  top: 0.5vw;
  width: 100%;
  height: 5vw;
  background: url(../assets/images/title_bg@2x.png) no-repeat;
  background-size: 100% 60%;
}

.nav_title {
  color: transparent;
  background-image: linear-gradient(to top, rgb(240, 160, 10) 45%, #fff 80%);
  text-align: center;
  line-height: 1.7vw;
  font-size: 1.3vw;
  font-weight: bolder;
  letter-spacing: 0.2vw;
  background-clip: text;
  -webkit-background-clip: text;
  // text-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
}

.weather {
  position: absolute;
  width: 15vw;
  right: 12px;
  top: 5px;
}

.logo {
  position: absolute;
  width: 13vw;
  left: 25px;
  top: 0;
}
</style>
