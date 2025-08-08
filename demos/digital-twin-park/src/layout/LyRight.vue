<script setup>
import { onMounted } from 'vue';
onMounted(() => {});
</script>
<template>
  <div class="ly-right">
    <div class="ly-right-plane ly-right-top">
      <div class="top-bg">
        <div class="top-content"></div>
      </div>
    </div>
    <div class="ly-right-plane ly-right-center">
      <div class="center-bg">
        <div class="center-content"></div>
      </div>
    </div>
    <div class="ly-right-plane ly-right-bottom">
      <div class="bottom-bg">
        <div class="bottom-content"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ly-right {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 25vw;
  // min-width: 400px;
  pointer-events: all;
  height: 84vh;
}

.ly-right-plane {
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
  background: url(../assets/images/public_facilities.png) no-repeat;
  background-size: 100% 100%;
}

.top-content {
  position: relative;
  top: 7vh;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translate(-46%);
  background: url(../assets/images/public_facilities_content.png) no-repeat;
  background-size: 92% 70%;
}

.center-bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/images/enterprise_entry.png) no-repeat;
  background-size: 100% 100%;
}

.center-content {
  position: relative;
  top: 6vh;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translate(-46%);
  background: url(../assets/images/enterprise_entry_content.png) no-repeat;
  background-size: 90% 75%;
}

.bottom-bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/images/environmental_quality.png) no-repeat;
  background-size: 100% 100%;
}

.bottom-content {
  position: relative;
  top: 6.5vh;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translate(-45%);
  background: url(../assets/images/environmental_quality_content.png) no-repeat;
  background-size: 90% 70%;
}
</style>
