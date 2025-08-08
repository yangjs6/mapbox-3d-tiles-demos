<script setup>
import { onMounted } from 'vue';
</script>
<template>
  <div class="ly-left">
    <div class="ly-left-plane ly-left-top">
      <div class="top-bg">
        <div class="top-content"></div>
      </div>
    </div>
    <div class="ly-left-plane ly-left-center">
      <div class="center-bg">
        <div class="center-content"></div>
      </div>
    </div>
    <div class="ly-left-plane ly-left-bottom">
      <div class="bottom-bg">
        <div class="bottom-content"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ly-left {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 25vw;
  // min-width: 400px;
  pointer-events: all;
  height: 84vh;
}

.ly-left-plane {
  position: relative;
  // min-width: 400px;
  height: 28vh;
  margin: 10px;
  background-image: -webkit-linear-gradient(
    right,
    rgba(4, 20, 37, 0.6),
    rgba(4, 20, 37, 0.4)
  );
  background-image: linear-gradient(
    -90deg,
    rgba(4, 20, 37, 0.6),
    rgba(4, 20, 37, 0.4)
  );
}

.top-bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/images/demographic_data.png) no-repeat;
  background-size: 100% 100%;
}

.top-content {
  position: relative;
  top: 7vh;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translate(-45%);
  background: url(../assets/images/demographic_data_content.png) no-repeat;
  background-size: 90% 72%;
}

.center-bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/images/driving_violation.png) no-repeat;
  background-size: 100% 100%;
}

.center-content {
  position: relative;
  top: 7vh;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translate(-45%);
  background: url(../assets/images/traffic_violations.png) no-repeat;
  background-size: 90% 72%;
}

.bottom-bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/images/event_info.png) no-repeat;
  background-size: 100% 100%;
}

.bottom-content {
  position: relative;
  top: 6vh;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translate(-46%);
  background: url(../assets/images/event_content.png) no-repeat;
  background-size: 90% 80%;
}
</style>
