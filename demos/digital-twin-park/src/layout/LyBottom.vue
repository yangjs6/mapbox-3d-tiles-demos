<script setup>
import { onMounted } from 'vue';
var buildMarker = null;
var glMarker = null;

var isClicked = false;

onMounted(() => {
  let homeElement = document.getElementById('home');
  let gradientElement = document.getElementById('gradient');
  // 鼠标悬停变色
  homeElement.addEventListener('mouseover', function () {
    if (!isClicked) {
      changeGradientColor('rgb(240, 160, 10)', '#ffffff');
    }
  });

  // 鼠标移出变色
  homeElement.addEventListener('mouseout', function () {
    if (!isClicked) {
      changeGradientColor('#ffffff', '#ffffff');
    }
  });

  // 点击变色
  homeElement.addEventListener('click', function () {
    isClicked = true; // 设置点击状态
    changeGradientColor('rgb(240, 160, 10)', '#ffffff'); // 示例点击颜色
  });

  function changeGradientColor(color1, color2) {
    if (gradientElement && gradientElement.children.length >= 2) {
      gradientElement.children[0].setAttribute('stop-color', color1);
      gradientElement.children[1].setAttribute('stop-color', color2);
    } else {
      console.error(
        'Gradient element is missing or does not have enough children.'
      );
    }
  }
});

// 主按钮
function showBtn(id) {
  let dom3 = document.getElementById('childBtnThree');
  let dom4 = document.getElementById('childBtnFour');
  switch (id) {
    case 'childBtnOne':
      dom3.style.display = 'none';
      dom4.style.display = 'none';
      activeItem('btn_one', 'listActive');
      window.mapApi.removeViewIndoors();
      clearRecording();
      window.mapApi.overView(true);
      break;
    case 'childBtnTwo':
      {
        let locations = [
          {
            center: [120.72929672369003, 31.288619767132104],
            zoom: 17.88998700147244,
            pitch: 64.42598133276567,
            bearing: -37.87271910936988,
            speed: 0.5, // 速度
            curve: 1, // 运动方式
          },
        ];
        window.mapApi.changeViewers(locations);

        dom3.style.display = 'none';
        dom4.style.display = 'none';
        activeItem('btn_two', 'listActive');
        window.mapApi.removeViewIndoors();
        window.mapApi.removeFence();
        window.mapApi.stopRotation();
        clearRecording();
        bindFunc('statistics');
      }
      break;
    case 'childBtnThree':
      dom3.style.display = 'block';
      dom4.style.display = 'none';
      activeItem('btn_three', 'listActive');
      window.mapApi.removeFence();
      window.mapApi.stopRotation();
      clearRecording();
      break;
    case 'childBtnFour':
      dom3.style.display = 'none';
      dom4.style.display = 'block';
      activeItem('btn_four', 'listActive');
      window.mapApi.removeViewIndoors();
      window.mapApi.stopRotation();
      clearRecording();
      window.mapApi.addFence(FenceData);
      break;
    case 'home':
      dom3.style.display = 'none';
      dom4.style.display = 'none';
      activeItem('home', 'listActive');
      window.mapApi.removeViewIndoors();
      window.mapApi.removeFence();
      window.mapApi.stopRotation();
      clearRecording();
      let locations = [
        {
          center: [120.72929672369003, 31.288619767132104],
          zoom: 17.88998700147244,
          bearing: -37.87271910936988,
          pitch: 64.42598133276567,
          speed: 0.6, // 速度
          curve: 1, // 运动方式
        },
      ];
      window.mapApi.changeViewers(locations);
      break;
    default:
      break;
  }
}

// 子按钮
function bindFunc(id) {
  switch (id) {
    case 'statistics':
      {
        clearRecording();
        window.mapApi.addBuildMarker(
          buildMarkerData,
          (group) => {
            if (group) {
              buildMarker = group;
            }
          },
          (glgroup) => {
            if (glgroup) {
              glMarker = glgroup;
            }
          }
        );

        activeItem(id, 'btn_children_active');
      }
      break;
    case 'roadline':
      {
        clearRecording();
        activeItem(id, 'btn_children_active');
      }
      break;
    case 'roadheatmap':
      {
        clearRecording();
        activeItem(id, 'btn_children_active');
      }
      break;
    case 'layering':
      {
        clearRecording();
        // window.mapApi.splitHouse();
        window.mapApi.floorPanning();
        activeItem(id, 'btn_children_active');
      }
      break;
    case 'indoor':
      {
        clearRecording();
        let locations = [
          {
            center: [120.72935558382255, 31.289599926635432],
            zoom: 18.192811377587045, // 缩放
            bearing: 0,
            pitch: 62.92627422286124,
            speed: 0.5, // 速度
            curve: 1, // 运动方式
            easing(t) {
              if (t === 1) {
                setTimeout(() => {
                  window.mapApi.viewIndoors();
                }, 200);
              }
              return t;
            },
          },
        ];
        window.mapApi.changeViewers(locations);
        activeItem(id, 'btn_children_active');
      }
      break;
    case 'warning':
      {
        let locations = [
          {
            center: [120.72967396619998, 31.289031488443527],
            zoom: 18.1576949858653,
            bearing: 10.397969295337134,
            pitch: 36.431448614549986,
            speed: 0.5, // 速度
            curve: 1, // 运动方式
          },
        ];
        window.mapApi.changeViewers(locations);

        clearRecording();
        window.mapApi.addSecurityWarning();
        window.mapApi.addRadarWarning();
        window.mapApi.addWarnPicture();
        activeItem(id, 'btn_children_active');
      }
      break;
    case 'rescueroad':
      {
        clearRecording();
        let locations = [
          {
            center: [120.72930496741992, 31.288898256241268],
            zoom: 18.932314122092432, // 缩放
            bearing: -31.19390788601129,
            pitch: 9.936623006239369,
            speed: 0.5, // 速度
            curve: 1, // 运动方式
          },
        ];
        window.mapApi.changeViewers(locations);

        window.mapApi.addEacapePaths();
        window.mapApi.addThreeFencing();
        window.mapApi.addPoi();
        activeItem(id, 'btn_children_active');
      }
      break;
    case 'crowd':
      {
        clearRecording();
        let locations = [
          {
            center: [120.72930496741992, 31.288898256241268],
            zoom: 18.932314122092432, // 缩放
            bearing: -31.19390788601129,
            pitch: 9.936623006239369,
            speed: 0.5, // 速度
            curve: 1, // 运动方式
          },
        ];
        window.mapApi.changeViewers(locations);
        window.mapApi.addTemperature();
        activeItem(id, 'btn_children_active');
      }
      break;
    case 'camera':
      {
        clearRecording();        
        let locations = [
          {
            center: [120.72954958448429, 31.28847184284129],
            zoom: 17.587263673261667,
            bearing: 0,
            pitch: 48.49773165778813,
            speed: 0.2,
            curve: 1,
          },
        ];
        window.mapApi.changeViewers(locations);
        window.mapApi.addMonitorMarker(monitorData);
        activeItem(id, 'btn_children_active');
      }
      break;
    case 'car':
      {
        clearRecording();
        activeItem(id, 'btn_children_active');
        window.mapApi.viewCarDeviceMarker();
      }
      break;
    case 'lamp':
      {
        clearRecording();
        activeItem(id, 'btn_children_active');
        window.mapApi.viewLampDeviceMarker();
      }
      break;
    default:
      break;
  }
}

// 使用效果前清除已有效果
function clearRecording() {
  // 清除建筑标注
  if (buildMarker) {
    buildMarker.remove();
    buildMarker = null;
  }

  if (glMarker) {
    glMarker.remove();
    glMarker = null;
  }

  window.mapApi.removeFence();

  // 清除分层分户
  window.mapApi.removeSplitHouse();

  // 清除室内划分
  window.mapApi.removeIndoorSplit();

  // 清除标签
  window.mapApi.removeMarker();

  // 清除模型高亮
  window.mapApi.removeBuildHighlight();

  // 清除逃生路径
  window.mapApi.removeEacapePaths();
  // 清除预警
  window.mapApi.removeSecurityWarning();
  // 清除热力图
  window.mapApi.removeTemperature();

  window.mapApi.removeFloorPanning();
}

// 选中状态
function activeItem(id, className) {
  if (id === 'home') {
    const preSelectEle = document.querySelector('.' + className);
    if (preSelectEle) {
      preSelectEle.classList.remove(className);
    }
  } else {
    isClicked = false;
    var gradient = document.getElementById('gradient');
    gradient.children[0].setAttribute('stop-color', '#ffffff');
    gradient.children[1].setAttribute('stop-color', '#ffffff');

    const preSelectEle = document.querySelector('.' + className);
    if (preSelectEle) {
      preSelectEle.classList.remove(className);
    }

    const selectEle = document.getElementById(id);
    if (selectEle) {
      selectEle.classList.add(className);
    }
  }
}

// 建筑标注
function creatBuildMDom(text) {
  const container = document.createElement('div');
  container.className = 'markerBox';
  container.style.marginTop = '-63.3px';
  const textDom = document.createElement('div');
  textDom.className = 'textBox';
  textDom.innerHTML = text;
  container.appendChild(textDom);
  const imageDom = document.createElement('div');
  imageDom.className = 'imageBox';
  container.appendChild(imageDom);
  return container;
}

// 厂区总览标签
var buildMarkerData = [
  {
    name: 'a',
    element: creatBuildMDom('入驻率：59%'),
    position: [120.73016788428845, 31.288121997558775, 40.124491065738916],
  },
  {
    name: 'b',
    element: creatBuildMDom('入驻率：66%'),
    position: [120.73009953932844, 31.288709048860824, 37.730181271240426],
  },
  {
    name: 'c',
    element: creatBuildMDom('入驻率：83%'),
    position: [120.7293508907966, 31.288801713576657, 62.64271860770698],
  },
  {
    name: 'd',
    element: creatBuildMDom('入驻率：75%'),
    position: [120.72866477806969, 31.28856905767323, 54.817876670797915],
  },
  {
    name: 'e',
    element: creatBuildMDom('入驻率：89%'),
    position: [120.72881644515935, 31.287882982017308, 22.668532951268393],
  },
];

// 监控数据
var monitorData = [
  [120.72859280417336, 31.287819536766325, 16.61136703401467],
  [120.72903709929072, 31.287816041953096, 17.753007312637767],
  [120.72996483598551, 31.287815367533703, 21.220148879042075],
  [120.73057112450243, 31.288328793535406, 22.856333422502818],
  [120.73030159329818, 31.288916335578875, 21.168314064335178],
  [120.72855965306707, 31.288364164704344, 25.369974683089666],
  [120.72894653602232, 31.288950980748243, 12.14282479806209],
  [120.72934200510562, 31.287979641573436, 9.59280601642283],
];

//
var FenceData = [[
  [120.72841909978374, 31.287745591127717, 1],
  [120.72850753347531, 31.287652507096332, 1],
  [120.72946780543789, 31.28764973659848, 1],
  [120.7306752264725, 31.287650764827102, 1],
  [120.73069144221232, 31.288946911067974, 1],
  [120.73060125766838, 31.28905097386205, 1],
  [120.73022461856074, 31.289073308141003, 1],
  [120.72958499431594, 31.289096505471715, 1],
  [120.72855558094369, 31.28914422098462, 1],
  [120.72844844106288, 31.28905534753111, 1],
  [120.72843751687374, 31.28878427764104, 1],
  [120.72843237628358, 31.288332316613896, 1],
  [120.72843980027919, 31.288010144858116, 1],
]];
</script>

<template>
  <div class="ly-bottom">
    <div>
      <div class="nav">
        <div class="btn_group">
          <div class="btn btn_one" id="btn_one" @click="showBtn('childBtnOne')">
            园区总览
          </div>
          <div class="btn btn_two" id="btn_two" @click="showBtn('childBtnTwo')">
            园区态势
          </div>
          <div class="home" id="home" @click="showBtn('home')">
            <svg
              t="1731376958274"
              class="svg-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3109"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="40"
              height="40"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="45%" stop-color="white" />
                  <stop offset="80%" stop-color="white" />
                </linearGradient>
              </defs>
              <path
                d="M938.412716 480.847489 556.823881 104.126522c-1.89721-2.258437-6.142907-6.194072-12.037151-10.081613-9.920954-6.544043-21.162995-10.520611-33.496905-10.520611-13.180184 0-24.690332 3.997034-34.357506 10.623965-5.846148 4.010337-9.876951 8.102538-12.157901 11.154038L84.209914 480.894561c-14.700817 14.481829-14.700817 38.014802 0 52.529377 14.585183 14.427594 33.995255 8.343015 50.529837-7.945973l25.607214-25.314549 38.918381-37.700647c-1.359974 1.686409-2.282996 2.963495-2.284019 3.373841L196.981327 847.484797c0 50.006927 40.941458 90.427522 91.442642 90.427522l141.713582 0 10.423397 0L440.560948 927.486876 440.560948 686.440961c0-17.467837 14.411221-31.683607 32.223912-31.683607l77.051887 0c17.814738 0 32.223912 14.21577 32.223912 31.683607L582.060659 927.486876l0 10.425444 10.425444 0 141.713582 0c50.485835 0 91.442642-40.428781 91.442642-90.427522L825.642327 467.251843l62.246693 61.207014c20.142759 13.266142 37.897122 17.434068 50.523697 4.963035C953.114556 518.910387 953.114556 495.361041 938.412716 480.847489z"
                fill="url(#gradient)"
                p-id="3110"
              ></path>
            </svg>
          </div>
          <div
            class="btn btn_three"
            id="btn_three"
            @click="showBtn('childBtnThree')"
          >
            安防管理
          </div>
          <div
            class="btn btn_four"
            id="btn_four"
            @click="showBtn('childBtnFour')"
          >
            设备管理
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="childBtnThree" class="btn_children_wrapper" style="display: none">
    <div class="btn_children_list">
      <div class="btn_children" id="layering" @click="bindFunc('layering')">
        <span>分层分户</span>
      </div>
      <div class="btn_children" id="indoor" @click="bindFunc('indoor')">
        <span>室内查看</span>
      </div>
      <div class="btn_children" id="warning" @click="bindFunc('warning')">
        <span>安防预警</span>
      </div>
      <div class="btn_children" id="rescueroad" @click="bindFunc('rescueroad')">
        <span>逃生路径</span>
      </div>
      <div class="btn_children" id="crowd" @click="bindFunc('crowd')">
        <span>人员聚集</span>
      </div>
    </div>
  </div>

  <div id="childBtnFour" class="btn_children_wrapper" style="display: none">
    <div class="btn_children_list">
      <div class="btn_children" id="camera" @click="bindFunc('camera')">
        <span>监控视频</span>
      </div>
      <div class="btn_children" id="car" @click="bindFunc('car')">
        <span>停车场设备</span>
      </div>
      <div class="btn_children" id="lamp" @click="bindFunc('lamp')">
        <span>路灯设备</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ly-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  pointer-events: all;
  z-index: 999;
}

.nav {
  width: 100%;
  height: 5vw;
  background: url(../assets/images/button_bg@2x.png) no-repeat;
  background-size: 100%;
}

.btn_group {
  position: relative;
  display: flex;
  width: 100%;
  bottom: -2vh;
  justify-content: center;
  align-items: center;
}

.svg-icon {
  position: relative;
  bottom: 0.7vh;
  width: 2.3vw;
}

.btn {
  margin: 0 1.2vw;
  font-size: 2.1vh;
  font-weight: 500;
  cursor: pointer;
}

.btn:hover {
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to top, rgb(240, 160, 10) 45%, #fff 80%);
}

.home {
  cursor: pointer;
}

.listActive {
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to top, rgb(240, 160, 10) 45%, #fff 80%);
}

.btn_children_wrapper {
  position: absolute;
  top: 4vw;
  left: 51.5%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1rem;
}

.btn_children_list {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // span{
  //   position: relative;
  //   left: 50%;
  // }
}

.btn_children {
  cursor: pointer;
  pointer-events: all;
  position: relative;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  color: #f8eac0;
  margin-right: 4rem;
}

.btn_children:hover {
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to top, rgb(240, 160, 10) 25%, #fff 80%);
}

.btn_children_active {
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to top, rgb(240, 160, 10) 25%, #fff 80%);
}

.btn_children_active::after {
  width: 4.9rem;
}

.btn_children::after {
  content: '';
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  display: flex;
  position: absolute;
  top: 100%;
  background: url('../assets/images/线.png') no-repeat;
  background-size: 100% 100%;
  height: 0.1rem;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(0.55rem);
  transform: translateX(-50%) translateY(0.55rem);
}
</style>
