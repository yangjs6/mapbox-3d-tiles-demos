// 该类主要用于初始化场景

class SceneApi {
  constructor(map, scene, group) {
    this._map = map;
    this._scene = scene || null;
    this._group = group || null;
    this.initSky();
    this.initLight();
    this.allFlash = [];
  }

  // 初始化灯光
  initLight() {
    // 场景灯光1
    let light1 = new THREE.DirectionalLight(0x484b4b,3.7);
    // 场景灯光2
    let light2 = new THREE.DirectionalLight(0x767676,0.91);
    this._group.add(light1);
    this._group.add(light2);
  }

  // 初始化天空盒
  initSky() {
    // this._map.addLayer({
    //   id: 'sky',
    //   type: 'mapmost_sky',
    //   enableCloud: true,
    //   paint: {
    //     'sky-url': './assets/images/CubeRT_Capture_Tex_2048.png',
    //     'sky-angle': 0,
    //     'sky-exposure': 1,
    //     'sky-opacity': [
    //       'interpolate',
    //       ['linear'],
    //       ['zoom'],
    //       0,
    //       0,
    //       5,
    //       0.3,
    //       8,
    //       1,
    //     ],
    //     'sky-type': 'atmosphere',
    //     'sky-atmosphere-sun': [227.02725700614292, 110.95561210040023],
    //     'sky-atmosphere-sun-intensity': 5,
    //   },
    // });
  }
}

export default SceneApi;
