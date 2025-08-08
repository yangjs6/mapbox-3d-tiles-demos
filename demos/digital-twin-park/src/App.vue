<script setup>
import LyTop from './layout/LyTop.vue';
import LyLeft from './layout/LyLeft.vue';
import LyRight from './layout/LyRight.vue';
import LyBottom from './layout/LyBottom.vue';
import Map from './components/Map.vue';
</script>

<template>
  <div class="container">
    <Map></Map>
    <div class="layout">
      <div class="layout_img">
        <ly-top></ly-top>
        <div class="center_wapper">
          <ly-left></ly-left>
          <ly-right></ly-right>
        </div>
        <ly-bottom></ly-bottom>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .layout {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    pointer-events: none;
    background: url(./assets/images/pure-mask3.png) no-repeat;
    background-size: 110% 140%;
    background-position: center 50%;
  }

  .layout_img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    pointer-events: none;
    background: url(./assets/images/pure-mask.png) no-repeat;
    background-size: 100% 110%;
  }

  .center_wapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
}
</style>
