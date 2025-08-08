// 该类主要用于地图和场景相关操作

class MapApi {
  constructor(map, scene, group) {
    this._map = map;
    this._scene = scene || null;
    this._group = group || null;

    this.selectedObj = undefined;
    this.polygonData = [];
    let model = this._group.children[0].children[2];
    this.originalYPosition = model.position.y;
    let model2 = this._group.children[0].children[3];
    this.originalZPosition1 = model2.position.z;
    this.markerData = [];

    this.workerMarkers = [];
    this.coord = [];
    this.escapeLines = []; // 存放逃生路径的数组
    this.videoMarkers = []; // 存放监控标签的数组
    this.shouldRotate = true;
    this.monitorMarker = [];
  }

  get map() {
    return this._map;
  }

  // 添加楼层图片
  addFloorPicture() {
    let that = this;
    let floorPoints = [
      {
        element: this.createDeviceDom(
          'nine',
          './assets/images/ui/poi_9f.png',
          '126px',
          '172.5px'
        ),
        position: [120.729291104735, 31.288659449974343, 52.75000000007335],
      },
    ];

    let pictrue5 = this._scene.addMarker({
      id: 'cameraSevice55',
      data: floorPoints,
    });
    that.markerData.push(pictrue5);
  }

  // 楼层平移
  floorPanning() {
    let locations = [
      {
        center: [120.72893418497381, 31.289093070022545],
        zoom: 18.47807755785181,
        bearing: -43.624945530783634,
        pitch: 49.98152219360618,
        speed: 0.2,
        curve: 1,
      },
    ];
    this.changeViewers(locations);

    let self = this;
    let model2 = this._group.children[0].children[3];

    const tween2 = new TWEEN.Tween({ z: 0 }, false)
      .to({ z: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((val) => {
        model2.translateZ(val.z);
      })
      .start();

    function animate(time) {
      tween2.update(time);
      requestAnimationFrame(animate);
    }
    animate();

    setTimeout(() => {
      self.addFloorPicture();
      self.selectedObj = model2;
      model2.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          // 将原有材质存储到自定义属性
          child.baseMaterial = child.material;

          // 复制原有的材质并修改颜色
          child.material = child.material.clone();
          child.material.color = new THREE.Color(0xffff00);
        }
      });
    }, 2000);
  }

  // 取消楼层平移
  removeFloorPanning() {
    let model1 = this._group.children[0].children[3];
    model1.position.z = this.originalZPosition1;
  }

  // 添加出口，预警
  addPoi() {
    let that = this;
    let icon2Points = [
      {
        element: this.createDeviceDom(
          'risk',
          './assets/images/ui/risk_point.png',
          '45px',
          '80px'
        ),
        position: [120.7291252391534, 31.288767893626222, 49.167908611462266],
      },
      {
        element: this.createDeviceDom(
          'save',
          './assets/images/ui/poi_export.png',
          '45px',
          '80px'
        ),
        position: [120.72968937012978, 31.28889593893625, 49.16784609320031],
      },
    ];

    let pictrue3 = this._scene.addMarker({
      id: 'cameraSevice33',
      data: icon2Points,
    });
    that.markerData.push(pictrue3);
  }

  // 地理围栏
  addThreeFencing() {
    let GeoFencing_fade = this._scene.addMesh({
      type: 'fence',
      color: 'red',
      speed: 5,
      opacity: 0.8,
      height: 6,
      data: {
        type: 'LineString',
        coordinates: [
          [120.72908215209354, 31.288774301835325, 49.16790547759789],
          [120.7291863843323, 31.288773693691667, 49.167905767898546],
          [120.72918654725214, 31.288734379872416, 49.16792501262373],
          [120.72908229567228, 31.288734390678137, 49.16792501473103],
          [120.72908215209354, 31.288774301835325, 49.16790547759789],
        ],
      },
    });
    this.polygonData.push(GeoFencing_fade);
  }

  // 园区总览
  overView(rotating) {
    let self = this;
    this.shouldRotate = rotating;

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
    this.changeViewers(locations);

    setTimeout(() => {
      rotateCamera(0);
      function rotateCamera(timestamp) {
        if (self.shouldRotate) {
          map.setBearing((timestamp / 360) % 360);
          requestAnimationFrame(rotateCamera);
        }
      }
    }, 2000);
  }

  // 停止旋转
  stopRotation() {
    this.shouldRotate = false;
  }

  // 添加预警图片
  addWarnPicture() {
    let that = this;
    let warnPoints = [
      {
        element: this.createDeviceDom(
          'yj',
          './assets/images/ui/warning.png',
          '265.2px',
          '289.2px'
        ),
        position: [120.72994108596296, 31.28834145014008, 52.75],
      },
    ];
    let pictrue2 = this._scene.addMarker({
      id: 'warnSevice',
      data: warnPoints,
    });
    that.markerData.push(pictrue2);
  }

  // 添加分区图片
  addAreaPicture() {
    let that = this;
    let iconPoints = [
      {
        element: this.createDeviceDom(
          'office',
          './assets/images/ui/poi_office_area.png',
          '90px',
          '126px'
        ),
        position: [120.72905937776969, 31.288810592883955, 52.75000000007335],
      },
      {
        element: this.createDeviceDom(
          'meeting',
          './assets/images/ui/poi_meeting_room.png',
          '90px',
          '126px'
        ),
        position: [120.7292815460643, 31.288861737902234, 52.75000000001541],
      },
      {
        element: this.createDeviceDom(
          'treat',
          './assets/images/ui/poi_guest_house.png',
          '90px',
          '126px'
        ),
        position: [120.72942278892558, 31.28888168210523, 52.75000000002799],
      },
      {
        element: this.createDeviceDom(
          'toilet',
          './assets/images/ui/poi_rest_roompng.png',
          '90px',
          '126px'
        ),
        position: [120.7295665096771, 31.28880351909389, 52.750000000070536],
      },
      {
        element: this.createDeviceDom(
          'multifunction',
          './assets/images/ui/poi_multi_area.png',
          '108px',
          '126px'
        ),
        position: [120.72969173863476, 31.288818192267247, 52.75000000008524],
      },
    ];

    let pictrue = this._scene.addMarker({
      id: 'cameraSevice11',
      data: iconPoints,
    });
    that.markerData.push(pictrue);
  }

  // 添加安防预警雷达
  addRadarWarning() {
    let circle_radar = this._scene.addMesh({
      type: 'circle',
      material: 'radar',
      color: 'yellow',
      radius: 45,
      segment: 256,
      speed: 1,
      opacity: 0.8,
      data:{
        type:'Point',
        coordinates:[120.7293385335865, 31.288814045160496, 52.85],   
      }
    });
    this.polygonData.push(circle_radar);
    let waterRipple = this._scene.addMesh({
      type: 'circle',
      material: 'ripple',
      color: 'yellow',
      radius: 45,
      num: 5,
      speed: 1,
      opacity: 1.0,
      data:{
        type:'Point',
        coordinates:[120.7293385335865, 31.288814045160496, 52.75],   
      }
    });
    this.polygonData.push(waterRipple);
  }
  // 添加安防预警
  addSecurityWarning() {
    let model = this._group.children[0].children[2];
    const tween = new TWEEN.Tween({ z: 0 }, false)
      .to({ z: 30 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((val) => {
        model.translateY(val.z);
      })
      .start();
    function animate(time) {
      tween.update(time);
      requestAnimationFrame(animate);
    }
    animate();

    let circle_spread = this._scene.addMesh({
      type: 'circle',
      material: 'spread',
      color: 'red',
      radius: 45,
      segment: 256,
      speed: 1,
      opacity: 0.8,
      data:{
        type:'Point',
        coordinates:[120.7293385335865, 31.288814045160496, 52.85],   
      } 
    });
    this.polygonData.push(circle_spread);
  }
  // 清除安防预警
  removeSecurityWarning() {
    if (this.polygonData.length > 0) {
      for (let i = 0; i < this.polygonData.length; i++) {
        this.polygonData[i].remove();
      }
    }
    this.polygonData = [];
  }
  // 添加区域划分
  addIndoorSplit() {
    let polygon1 = this._scene.addMesh({
      type: 'polygon',
      color: 0xffff00,
      opacity: 0.3,
      data: [
        {
          type: "Polygon",
          coordinates: [[
            [120.7291884210658, 31.288790144744535, 52.75],
            [120.72919207680704, 31.288731808027176, 52.75],
            [120.7293751929022, 31.288733544154884, 52.75],
            [120.72937268467882, 31.288788973089208, 52.75],
            [120.72937297284552, 31.288842926752352, 52.75],
            [120.7293334065958, 31.288842926740394, 52.75],
            [120.72933337222418, 31.28891112831203, 52.75],
            [120.72919146324041, 31.28891167537868, 52.75],
            [120.72919146119608, 31.288791172972523, 52.75],
            [120.7291884210658, 31.288790144744535, 52.75],
          ]],
        },
      ],
    });
    let polygon2 = this._scene.addMesh({
      type: 'polygon',
      color: 0x0000ff,
      opacity: 0.3,
      data: [
        {
          type: "Polygon",
          coordinates: [[
            [120.72933661650693, 31.288910398569914, 52.75],
            [120.72933694528493, 31.288845466288475, 52.75],
            [120.7293779514425, 31.28884527468158, 52.75],
            [120.72937786954859, 31.288735415151873, 52.75],
            [120.72946019556295, 31.28873372080948, 52.75],
            [120.72946224404348, 31.288809265417882, 52.75],
            [120.7294608511753, 31.28879590649786, 52.75],
            [120.7295125831956, 31.288795863781893, 52.75],
            [120.72951297264406, 31.288912645419845, 52.75],
            [120.72933661650693, 31.288910398569914, 52.75],
          ]],
        },
      ],
    });
    let polygon3 = this._scene.addMesh({
      type: 'polygon',
      color: 0x00ff00,
      opacity: 0.3,
      data: [
        {
          type: "Polygon",
          coordinates: [[
            [120.72946439981973, 31.288793533719463, 52.75],
            [120.72946426033296, 31.288735012723592, 52.75],
            [120.72961317122028, 31.288735023181815, 52.75],
            [120.72961317112194, 31.288911778143422, 52.75],
            [120.72951584594352, 31.28891153086916, 52.75],
            [120.72951574731135, 31.288793265272787, 52.75],
            [120.72946439981973, 31.288793533719463, 52.75],
          ]],
        },
      ],
    });
    let polygon4 = this._scene.addMesh({
      type: 'polygon',
      color: 0x800080,
      opacity: 0.3,
      data: [
        {
          type: "Polygon",
          coordinates: [[
            [120.72961623956755, 31.28891295698169, 52.75],
            [120.72961786679808, 31.288734733235327, 52.75],
            [120.72974039301606, 31.288735215288156, 52.75],
            [120.72975474602481, 31.2887412594339, 52.75],
            [120.72975885567713, 31.28875071574552, 52.75],
            [120.72975891625417, 31.28889693240558, 52.75],
            [120.72975328670792, 31.288906812200068, 52.75],
            [120.72974281357395, 31.28891221591848, 52.75],
            [120.72961623956755, 31.28891295698169, 52.75],
          ]],
        },
      ],
    });
    let polygon5 = this._scene.addMesh({
      type: 'polygon',
      color: 0xff0000,
      opacity: 0.3,
      data: [
        {
          type: "Polygon",
          coordinates: [[
            [120.72918842103059, 31.288910716330584, 52.75],
            [120.72919111616677, 31.28873300144307, 52.75],
            [120.72895134614188, 31.288732756276247, 52.75],
            [120.72894194545499, 31.28873618326832, 52.75],
            [120.72893414313181, 31.28874736361864, 52.75],
            [120.72893341056138, 31.28889566808983, 52.75],
            [120.72894019530153, 31.288905453544384, 52.75],
            [120.72895263551095, 31.28891087405406, 52.75],
          ]],
        },
      ],
    });

    this.polygonData.push(polygon1);
    this.polygonData.push(polygon2);
    this.polygonData.push(polygon3);
    this.polygonData.push(polygon4);
    this.polygonData.push(polygon5);
  }

  // 清除室内划分
  removeIndoorSplit() {
    if (this.polygonData.length > 0) {
      for (let i = 0; i < this.polygonData.length; i++) {
        this.polygonData[i].remove();
      }
    }
    this.polygonData = [];
  }

  // 室内查看
  viewIndoors() {
    let self = this;
    let model = this._group.children[0].children[2];
    const tween = new TWEEN.Tween({ z: 0 }, false)
      .to({ z: 30 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((val) => {
        model.translateY(val.z);
      })
      .start();
    function animate(time) {
      tween.update(time);
      requestAnimationFrame(animate);
    }
    animate();

    let locations = [
      {
        center: [120.72930496741992, 31.288898256241268],
        zoom: 18.932314122092432, // 缩放
        bearing: -31.19390788601129,
        pitch: 9.936623006239369,
        speed: 0.5, // 速度
        curve: 1, // 运动方式
        easing(t) {
          if (t === 1) {
            setTimeout(() => {
              self.addIndoorSplit();
            }, 200);
            setTimeout(() => {
              self.addAreaPicture();
            }, 200);
          }
          return t;
        },
      },
    ];

    setTimeout(() => {
      self.changeViewers(locations);
    }, 1000);
  }

  // 还原室内查看
  removeViewIndoors() {
    let model = this._group.children[0].children[2];
    model.position.y = this.originalYPosition;
  }

  // 分层分户
  splitHouse() {
    let modelLayer = this._scene;
    let model = this._group;
    this._map.on('click', (e) => {
      if (modelLayer) {
        selectObj(e.point);
      }
    });
    let self = this;
    function selectObj(point) {
      let intersect = modelLayer.intersectObjects(point, model)[0];

      // 计算与摘取射线相交的物体
      if (intersect) {
        let nearestObject = intersect.object;

        // 选中的不是之前选中的层
        if (!(self.selectedObj === nearestObject.parent)) {
          self.removeSplitHouse();
          let floor;

          let name = nearestObject.parent.name;

          if (name === '4') {
            floor = '7F';
          } else if (name === '3') {
            floor = '8F';
          } else if (name === '2') {
            floor = '9F';
          }

          if (name === '2' || name === '3' || name === '4') {
            // 是否是选中层
            self.selectedObj = nearestObject.parent;
            self.selectedObj.traverse(function (child) {
              if (child instanceof THREE.Mesh) {
                // 将原有材质存储到自定义属性
                child.baseMaterial = child.material;

                // 复制原有的材质并修改颜色
                child.material = child.material.clone();
                child.material.color = new THREE.Color(0xffff00);
              }
            });
          } else {
            self.removeSplitHouse();
          }
        }
      } else {
        self.removeSplitHouse();
      }
    }
  }

  // 清除分层分户
  removeSplitHouse() {
    if (this.selectedObj) {
      this.selectedObj.traverse(function (child) {
        child.material = child.baseMaterial;
      });
      this.selectedObj = undefined;
    }
  }

  // 企业入驻率标签
  addBuildMarker(datas, callback, glcallback) {
    let self = this;
    let modelLayer = this._scene;
    let modelGroup = this._group;

    // 视角飞行
    let buildMarker = modelLayer.addMarker({
      id: 'marker_building',
      data: datas,
    });
    callback && callback(buildMarker);

    setTimeout(() => {
      let locations = [
        {
          center: [120.72936795194528, 31.288789265001512],
          zoom: 18.210369573475237,
          bearing: 17.316502535111795,
          pitch: 68.42520029251081,
          speed: 0.2,
          curve: 1,
        },
      ];

      self.changeViewers(locations);
      // // 模型轮廓效果
      // modelLayer.outlineModel([modelGroup.children[0].children[1]], {
      //   scope: 'default', // 模型轮廓范围：layer、model、default
      //   edgeStrength: 3.0, // 轮廓强度系数
      //   edgeGlow: 0.0, // 轮廓发光稀释
      //   edgeColor: '#00C1FF', // 轮廓颜色
      //   enableFillColor: true, // 轮廓内部是否填充
      //   fillColorOpacity: 0.2, // 轮廓内部填充颜色不透明度
      // });

      // 标签
      let datas1 = [
        {
          id: 1,
          element: self.createDeviceDom(
            'buildpop',
            './assets/images/ui/enterprise_pop_up.png',
            '300px',
            '235px'
          ),
          position: [120.72951145062459, 31.2882915516911, 29.945361752049791],
        },
      ];
      let glMarker = modelLayer.addMarker({
        id: 'marker_gl',
        data: datas1,
      });
      glcallback && glcallback(glMarker);

      self.markerData.push(glMarker);
    }, 1500);
  }

  // 添加监控标签
  addMonitorMarker(MonitorMarkeDatas) {
    let self = this;
    let modelLayer = this._scene;
    //  标签
    let datas = new Array(MonitorMarkeDatas.length);
    var i;
    for (i = 0; i < MonitorMarkeDatas.length; i++) {
      datas[i] = {
        id: i,
        element: self.createDeviceDom(
          'cameraInfo',
          './assets/images/camera4.png',
          '35px',
          '50px',
          'cameraClass'
        ),
        position: MonitorMarkeDatas[i],
      };
    }
    self.monitorMarker = modelLayer.addMarker({
      id: 'marker_monitor',
      data: datas,
    });

    self.markerData.push(self.monitorMarker);

    self.monitorMarker.children.forEach((dom, index) => {
      dom.element.addEventListener('click', (e) => {
        if (self.videoMarkers.length > 0) {
          self.videoMarkers.forEach((m) => {
            if (m.remove) m.remove();
            m = null;
          });
          self.videoMarkers = [];
        }
        let dom = self.createDeviceDom(
          'videopop',
          './assets/images/ui/video.png',
          '320px',
          '160px'
        );
        dom.style.paddingTop = '40px';
        dom.style.paddingBottom = '15px';
        dom.style.backgroundColor = 'rgba(0,0,0,0.5)';

        let closeIcon = document.createElement('div');
        closeIcon.className = 'closeVideo';

        const video = document.createElement('video');
        video.src = './assets/images/ui/videoexample.mp4';
        video.controls = false;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.height = 160;
        video.width = 320;
        dom.appendChild(video);
        dom.appendChild(closeIcon);
        video.style.opacity = 1.0;
        let cameraMarker = modelLayer.addMarker({
          id: 'marker_video',
          data: [
            {
              name: 'a',
              element: dom,
              position: datas[index].position,
            },
          ],
        });
        self.videoMarkers.push(cameraMarker);
        cameraMarker.children[0].element.addEventListener(
          'click',
          (e) => {
            let target = e.target; // 获取当前点击的目标子元素
            if (target.className == 'closeVideo') {
              if (self.videoMarkers.length > 0) {
                self.videoMarkers.forEach((m) => {
                  if (m.remove) m.remove();
                  m = null;
                });
                self.videoMarkers = [];
              }
            }
          }
        );
      });
    });
  }

  // 添加电子围栏
  addFence(FenceCoord) {
    let locations = [
      {
        center: [120.72926045543136, 31.28868731509428],
        zoom: 17.587162625340376,
        bearing: -37.87271910936988,
        pitch: 64.42598133276567,
        speed: 0.3,
        curve: 1,
      },
    ];
    this.changeViewers(locations);

    this.Fence = this._scene.addMesh({
      type: 'fence',
      material: 'fade',
      color: '#2647d4',
      speed: 2,
      opacity: 0.8,
      height: 30,
      data: {
        type: 'Polygon',
        coordinates: FenceCoord,
      },
    });
  }

  // 移除电子围栏
  removeFence() {
    if(this.Fence)
      this.Fence.remove();
  }

  // 取消建筑高量
  removeBuildHighlight() {
    // this._scene.unOutlineModel();
  }

  // 移除标签
  removeMarker() {
    for (let i = 0; i < this.markerData.length; i++) {
      this.markerData[i].remove();
    }
    this.markerData = [];
  }

  // 查看地磁设备
  viewCarDeviceMarker() {
    let self = this;
    let locations = [
      {
        center: [120.72899158044368, 31.287906942314947],
        zoom: 21.640175311136503, // 缩放
        bearing: 0,
        pitch: 67.42539555257444,
        speed: 0.7, // 速度
        curve: 1, // 运动方式
      },
    ];
    this.changeViewers(locations);

    let modelLayer = this._scene;
    let modelGroup = this._group;
    this._map.on('click', (e) => {
      if (modelLayer) {
        selectObj(e.point);
      }
    });

    function selectObj(point) {
      let intersect = modelLayer.intersectObjects(point, modelGroup)[0];

      // 计算与摘取射线相交的物体
      if (intersect) {
        let nearestObject = intersect.object;
        let name = nearestObject.parent.name;
        if (name === 'dc001') {
          // // 模型轮廓效果
          // modelLayer.outlineModel([modelGroup.children[0].children[12]], {
          //   scope: 'default', // 模型轮廓范围：layer、model、default
          //   edgeStrength: 3.0, // 轮廓强度系数
          //   edgeGlow: 0.0, // 轮廓发光稀释
          //   edgeColor: '#00C1FF', // 轮廓颜色
          //   enableFillColor: true, // 轮廓内部是否填充
          //   fillColorOpacity: 0.2, // 轮廓内部填充颜色不透明度
          // });

          // 标签
          let datas = [
            {
              id: 1,
              element: self.createDeviceDom(
                'dc_marker',
                './assets/images/device.png',
                '50px',
                '70px'
              ),
              position: [
                120.7289854143069, 31.28773088346361, 7.307616348151091,
              ],
            },
            {
              id: 2,
              element: self.createDeviceDom(
                'dc_popup',
                './assets/images/ui/info.png',
                '186px',
                '174px'
              ),
              position: [
                120.72899263560224, 31.28773094876935, 7.307616348151091,
              ],
            },
          ];
          let glMarker = modelLayer.addMarker({
            id: 'marker_dc',
            data: datas,
          });
          self.markerData.push(glMarker);
        }
      }
    }
  }

  // 查看路灯设备
  viewLampDeviceMarker() {
    let self = this;
    let locations = [
      {
        center: [120.72972234736437, 31.28788940180162],
        zoom: 20.791587499232204,
        bearing: 15.996875838980145,
        pitch: 71.92451688228758,
        speed: 0.5, // 速度
        curve: 1, // 运动方式
      },
    ];
    this.changeViewers(locations);

    let modelLayer = this._scene;
    let modelGroup = this._group;
    this._map.on('click', (e) => {
      if (modelLayer) {
        selectObj(e.point);
      }
    });

    function selectObj(point) {
      let intersect = modelLayer.intersectObjects(point, modelGroup)[0];

      // 计算与摘取射线相交的物体
      if (intersect) {
        let nearestObject = intersect.object;
        let name = nearestObject.parent.name;
        if (name === 'lamp') {
          // // 模型轮廓效果
          // modelLayer.outlineModel([modelGroup.children[0].children[0]], {
          //   scope: 'default', // 模型轮廓范围：layer、model、default
          //   edgeStrength: 3.0, // 轮廓强度系数
          //   edgeGlow: 0.0, // 轮廓发光稀释
          //   edgeColor: '#00C1FF', // 轮廓颜色
          //   enableFillColor: true, // 轮廓内部是否填充
          //   fillColorOpacity: 0.2, // 轮廓内部填充颜色不透明度
          // });

          // 标签
          let datas = [
            {
              id: 1,
              element: self.createDeviceDom(
                'lampInfo',
                './assets/images/device.png',
                '50px',
                '70px'
              ),
              position: [
                120.72962054029763, 31.287636866542304, 11.556247058023184,
              ],
            },
            {
              id: 2,
              element: self.createDeviceDom(
                'lamp_popup',
                './assets/images/ui/info2.png',
                '186px',
                '174px'
              ),
              position: [
                120.72960254553067, 31.28765832716174, 7.068647141749621,
              ],
            },
          ];
          let lampMarker = modelLayer.addMarker({
            id: 'marker_lamp',
            data: datas,
          });
          self.markerData.push(lampMarker);
        }
      }
    }
  }

  createDom(imageUrl) {
    const container = document.createElement('div');
    container.style.width = '200px';
    container.style.height = '200px';
    const element = document.createElement('div');
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.backgroundImage = 'url(' + imageUrl + ')';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundSize = '100% 100%';
    element.style.margin = '0px';
    element.style.backgroundPosition = 'center 0';
    element.style.zIndex = -999;
    container.appendChild(element);
    return container;
  }

  /**
   *
   * @param {*} text
   * @returns
   */
  createInfoDom(text) {
    let dom = document.createElement('div');
    dom.innerHTML = '';
    dom.className = 'videoDom';
    let infoDom = document.createElement('div');
    infoDom.className = 'infoDom';
    let infoText = document.createElement('div');
    infoText.fontSize = '10px';
    infoText.innerText = text;
    let closeIcon = document.createElement('div');
    closeIcon.className = 'closeVideo';
    infoDom.appendChild(infoText);
    infoDom.appendChild(closeIcon);
    dom.appendChild(infoDom);
    return dom;
  }

  // 逃生路径
  addEacapePaths() {
    let model = this._group.children[0].children[2];
    const tween = new TWEEN.Tween({ z: 0 }, false)
      .to({ z: 30 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((val) => {
        model.translateY(val.z);
      })
      .start();
    function animate(time) {
      tween.update(time);
      requestAnimationFrame(animate);
    }
    animate();

    let escapepath1 = [
      [120.72912408169769, 31.288777823525844, 49.66790375069851],
      [120.72912646486824, 31.288825157041767, 49.667880579989806],
      [120.72969712467675, 31.288825157041767, 49.66787609571898],
      [120.7296976531374, 31.28886637805557, 49.66786052241564],
    ];
    
    const texture1 = new THREE.TextureLoader().load( './assets/images/arrow.png' );        
    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;

    // 巡查员路径
    let escape1 = this._scene.addMesh({
      type: 'line',
      color: '#31FF6D',
      speed: 1,
      depthTest: true,
      opacity: 1,
      lineWidth: 0.8,
      // repeat: new THREE.Vector2(2.0, 1.0),
      worldUnits: 1.0,
      map: texture1,
      useMap: 1,
      data: {
        name: 'name5',
        type: 'LineString',
        coordinates: escapepath1,
      },
    });
    this.escapeLines.push(escape1);

    let escapepath2 = [
      [120.72937509822691, 31.28875830070072, 49.667913289624416],
      [120.72941998206679, 31.288759612971628, 49.66791264406233],
      [120.72942146646673, 31.28882167047582, 49.66788232008314],
    ];
    // 巡查员路径
    let escape2 = this._scene.addMesh({
      type: 'line',
      color: '#31FF6D',
      speed: 1,
      depthTest: true,
      opacity: 1,
      lineWidth: 0.8,
      // repeat: new THREE.Vector2(2.0, 1.0),
      worldUnits: 1.0,
      map: texture1,
      useMap: 1,
      data: {
        name: 'name5',
        type: 'LineString',
        coordinates: escapepath2,
      },
    });
    this.escapeLines.push(escape2);
    let escapepath3 = [
      [120.72933546880675, 31.28888319426278, 49.66785225963367],
      [120.72925822107356, 31.288882698949937, 49.667852478280025],
      [120.72925783411726, 31.28882704015962, 49.66787964966412],
    ];
    let escape3 = this._scene.addMesh({
      type: 'line',
      color: '#31FF6D',
      speed: 1,
      depthTest: true,
      opacity: 1,
      lineWidth: 0.8,
      // repeat: new THREE.Vector2(2.0, 1.0),
      worldUnits: 1.0,
      map: texture1,
      useMap: 1,
      data: {
        name: 'name5',
        type: 'LineString',
        coordinates: escapepath3,
      },
    });
    this.escapeLines.push(escape3);
  }

  removeEacapePaths() {
    if (this.escapeLines.length > 0) {
      // 逃生路径
      this.escapeLines.forEach((e) => {
        e.remove();
        // this._scene.removeModel(e);
      });
      this.escapeLines = [];
    }
  }

  //添加人员聚集
  addTemperature() {
    let model = this._group.children[0].children[2];
    const tween = new TWEEN.Tween({ z: 0 }, false)
      .to({ z: 30 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((val) => {
        model.translateY(val.z);
      })
      .start();
    function animate(time) {
      tween.update(time);
      requestAnimationFrame(animate);
    }
    animate();

    let coordinates = [
      [120.72894071804599, 31.28890224791683, 49.66783986666117],
      [120.72894187068678, 31.28873854960851, 49.66792610823635],
      [120.72975352809391, 31.28874233143143, 49.667924115854014],
      [120.72974941148411, 31.28890693108592, 49.667837399409905],
    ];
    let dataPoints = [
      [120.72931726666873, 31.2888265142416, 15],
      [120.72930726666873, 31.2888165142416, 20],
      [120.72931726666873, 31.2888265142416, 25],
      [120.7290244038319, 31.28881399947618, 10],
      [120.72913844808357, 31.288756960047202, 14],
      [120.72916587211284, 31.288816210399176, 26],
      [120.72925899190744, 31.288896148054285, 30],
      [120.7294282390184, 31.288832650391246, 26],
      [120.72965195153223, 31.288813595920864, 12],
      [120.72958131294415, 31.288833387216304, 11],
      [120.72958123901672, 31.288787577977725, 18],
      [120.72969957834697, 31.288825058167685, 20],
      [120.72972221394576, 31.288790582031822, 16],
      [120.72957611112423, 31.288866627549528, 22],
      [120.72954469099481, 31.288783182775468, 11],
      [120.72945812332607, 31.28881710022034, 20],
      [120.72896213417555, 31.288890804136486, 15],
      [120.72896983267977, 31.28885144830941, 17],
      [120.72896588021973, 31.288780668277283, 22],
      [120.7290397879218, 31.28888273166067, 26],
      [120.72902754181149, 31.28881495653745, 17],
      [120.72904482055131, 31.288759663684377, 25],
      [120.72903571028645, 31.288859463842737, 18],
      [120.72900954068804, 31.288886049622796, 8],
      [120.72898135145202, 31.2888196879296, 24],
      [120.72895313217825, 31.288775070801083, 19],
      [120.72910935165713, 31.288885240045754, 25],
      [120.72935107476593, 31.28889789398993, 1],
      [120.7293749999101, 31.288890459277336, 3],
      [120.72940871261329, 31.288895105972767, 5],
      [120.72944786284923, 31.28889603531184, 7],
      [120.72947613801963, 31.288891388616435, 9],
      [120.72951202573591, 31.288883024564186, 11],
      [120.72965122657484, 31.288895105972767, 10],
      [120.72967298844402, 31.288895530108665, 8],
      [120.72969146431734, 31.28889603531184, 6],
      [120.72973061455329, 31.288883024564186, 4],
      [120.72964361402896, 31.288751987648393, 15],
      [120.72949462563106, 31.2887445529243, 17],
      [120.7294272002247, 31.2887445529243, 19],
      [120.72939131250841, 31.28874919962693, 12],
      [120.72931301203651, 31.288746411605395, 10],
      [120.7292564616957, 31.288746411605395, 7],
      [120.72922383649909, 31.288755705010225, 11],
    ];
     this._heatmap = this._scene.addHeatmap({
      id: 'heatmap',
      data: dataPoints, // dataPoints = [[lon,lat,value]]，参数分别为经度，纬度，属性值
      coordinates: coordinates,

      width: 128, // 热力图容器宽度，默认 256
      blur: 0.85, // [0,1] 可选参数 default = 0.85 ，应用于所有点数据。系数越高，渐变越平滑，默认是 0.85
      radius: 10, // 每个数据点的半径，默认 6
      
      heightRatio: 0.01, // 3D热力图拉伸高度，默认 100
      depthTest: false,
      opacity: 0.6,
      gradient: {
        0.1: 'rgb(0,102,255)',
        0.2: 'rgb(102,255,255)',
        0.3: 'rgb(102,255,153)',
        0.4: 'rgb(125,255,0)',
        0.5: 'rgb(255,255,0)',
        0.6: 'rgb(255,204,0)',
        0.7: 'rgb(255,128,0)',
        0.8: 'rgb(255,102,0)',
        0.9: 'rgb(255,0,0)',
      }, // 表示渐变的色带对象,不设置则使用默认样式
    });
    
  }

  // 移除人员聚集
  removeTemperature() {
    if (this._heatmap) {
      //移除热力图
      this._heatmap.remove();
    }
  }

  /**
   *
   * @param {*} location
   */
  fly(location) {
    this._map.flyTo({
      ...location,
    });
  }

  createDeviceDom(
    id,
    imageUrl = './assets/images/device.png',
    w = '50px',
    h = '70px',
    name
  ) {
    let container = document.createElement('div');
    container.setAttribute('id', id);
    container.className = name || 'markerDevice';
    container.style.width = w;
    container.style.height = h;
    container.style.backgroundImage = 'url(' + imageUrl + ')';
    container.style.backgroundRepeat = 'no-repeat';
    container.style.backgroundSize = '100% 100%';
    container.style.margin = '0px';
    container.style.backgroundPosition = 'center 0';
    container.style.pointerEvents = 'auto';
    return container;
  }

  // 改变相机视角
  changeViewers(locations) {
    let count = 0;
    this.changeViewer(locations[count]);
    let that = this;
    let moveFunc = function () {
      if (count === locations.length - 1) {
        that._map.off('moveend', moveFunc);
        return;
      }
      that.changeViewer(locations[count++]);
    };
    if (count < locations.length - 1) {
      that._map.on('moveend', moveFunc);
    }
  }

  // 改变相机视角
  changeViewer(location) {
    this._map.flyTo({
      ...location,
    });
  }
}

export default MapApi;
