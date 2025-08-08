

<h3 align="center">mapbox-3d-tiles-demos</h3>

---

<p align="center"> 集成 mapbox-gl 与 threejs 实现在地圖上渲染 3dtiles 、3DGS、gltf、Mesh、Object 模型等功能。 
    <br> 
</p>


## 🧐 背景介绍 <a name = "about"></a>

最初考慮在 threejs 中渲染 3dtiles，以替換 mapbox-gl + deck.gl 的解決方案。
後來發現 threejs 上還可以做更多功能，例如 3DGS 模型、gltf 模型等。

因此，決定將 mapbox-gl 與 threejs 整合，以提供更強大的渲染功能。

## 🔧 功能說明 <a name = "features"></a>

1. 支持將 threejs 和 mapbox 集成，相機同步等
2. 支持在 threejs 中渲染 3dtiles、3DGS、gltf 模型等，座標對位
3. v1.0.0 更新：支持在 threejs 和 mapbox 中進行第三人稱視角下的操作，如無人機或角色控制，效果参考以下示例视频
4. v1.0.0 更新：支持将 3DGS 数据切片成 3dtiles 数据，并使用 tileset 方式加载，效果参考以下示例视频。工具参考 https://github.com/yangjs6/splat-3dtiles
5. v1.1.0 更新：支持各类 mesh/object 创建，包括点、线、面、体的可视化，如建筑、道路、地理围栏等

更多功能已經實現，但未開源，請期待！


## 🚀 示例圖集 <a name = "demovideos"></a>



- 智慧园区可视化示例，点击图片，可跳转到 b 站查看相关视频。

[![](https://i0.hdslb.com/bfs/archive/07584eec5dc3772edd20cff624103da41e160f40.jpg@672w_378h_1c.webp)](https://www.bilibili.com/video/BV1L3tUz7E73)



- 加载各类 mesh 示例，点击图片，可跳转到 b 站查看相关视频。

[![](https://i0.hdslb.com/bfs/archive/f4ddec70d9b54a11fb6f631ee7d96969eb86ed3b.jpg@672w_378h_1c.webp)](https://www.bilibili.com/video/BV16FtUzREk8)



- 加载大范围 tileset/3dgs 对比，点击图片，可跳转到 b 站查看相关视频。

[![](https://i2.hdslb.com/bfs/archive/b61f14f13c154292a1aa0813b74363b9d3b1841c.jpg@672w_378h_1c.webp)](https://www.bilibili.com/video/BV1eyuBzuErq/)


- 加载大范围 tileset，点击图片，可跳转到 b 站查看相关视频。

[![](https://i0.hdslb.com/bfs/archive/5d1b146ba418aa9c9293b8c2c6a34ccc1db47056.jpg@672w_378h_1c.webp)](https://www.bilibili.com/video/BV19eK3znEJt/)

- 加载大范围 3dgs，点击图片，可跳转到 b 站查看相关视频。

[![](https://i1.hdslb.com/bfs/archive/1b5f45ff4232e7362b488fc8eb5818c0aba69829.jpg@672w_378h_1c.webp)](https://www.bilibili.com/video/BV17ZuqzrELp/)



## 🏁 示例使用 <a name = "getting_started"></a>

### 初始化

初始化 mapbox-gl 的 map，在 map 的 load 事件中添加 ThreejsSceneLayer，并进一步添加 tileset 、 3dgs 、gltf、glb 等模型。

```javascript
map.on('load', function () {
    var scene = new ThreejsSceneLayer({
        id: 'test-scene',
        refCenter: refCenter,
    });

    map.addLayer(scene);

    var tileset = scene.addTileset({
        id: 'test-tileset',
        url: tiles3DLayerUrl,
    });

    var tileset_3dgs = scene.addTileset({
        id: 'test-tileset',
        url: 'http://localhost:8804/splat-3dtiles/NNU_2_opt/tileset.json',
        isGaussianSplatting: true, // 默认为 false，如果模型有3DGS效果，请设置为 true
        maxGaussianSplatingCount: 4096 * 4096, // 当数据量大时，可调高到 8192 * 8192
    });

    scene.addModel({
        id: 'NNU_2_new',
        rootUrl: './data/splats/',
        fileNames: 'surveyhouse.splat',
        position: [118.9062412507131, 32.10569531706962],
        rotation: [-90, 0, 0],
        scale: 1,
        offset: [0, 0, -30],
    });

    scene.addModel({
        id: 'SM_Tesla',
        rootUrl: './data/meshes/',
        fileNames: 'SM_Tesla.glb',
        position: [118.91083364082562, 32.116922266350315],
        rotation: [90, 0, 0],
        scale: 1,
        offset: [-26.8, -4.2, 1.6],
    });

    scene.addMesh({
        id: fenceData,
        data: fenceData,
        type: 'fence',
        color: fenceColor,
        opacity: 0.7,
        material: 'ripple',
        num: 5,
        speed: 1,
        getElevation: 20,
    });

    // 添加道路线
    scene.addMesh({
        id: roadData,
        data: `./data/suzhou/${roadData}`,
        type: 'tube',
        material: {
            map: texture,
            transparent: true,
            side: THREE.BackSide,
            depthWrite: true,
            depthTest: true,
            opacity: 1.0,
            color: color,
        },
        getTubeRadius: radius,
        speed: speed,
    });

    // 添加建筑
    scene.addMesh({
        id: 'building-layer',
        data: './data/suzhou/buildings.geojson',
        type: 'building',
        color: '#18396E',
        getElevation: (f) => f.properties.height || f.properties.HEIGHT,
        opacity: 1.0,
        gradient: true,
        gradientColor: ['#18396E', '#AEFFFF'],
        gradientHeightMax: 100,
        gradientHeightMin: 0,
        lightColor: '#6EFFFF',
        lightCircleTime: 20,
        lightBorderWidth: 0.02,
        lightMixRate: 0.0,
        enableEdge: true,
        material: {
            edge: {
                color: 'black',
                opacity: 0.1,
                width: 2,
            },
        },
    });
});
```

## ✍️ 作者说明 <a name = "authors"></a>

杨建顺
