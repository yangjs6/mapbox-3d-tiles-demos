<script setup>
import { onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { ThreejsSceneLayer } from 'mapbox-3d-tiles';

import MapApi from '../api/MapApi';
import CarApi from '../api/CarApi';
import SceneApi from '../api/SceneApi';

import * as THREE from 'three';

const style_opacity = {
    version: 8,
    sources: {},
    layers: [
        {
            id: 'land',
            type: 'background',
            paint: {
                'background-color': {
                    stops: [
                        [15, 'rgba(9, 30, 55, 0.6)'],
                        [16, 'rgba(9, 30, 55, 0.6)'],
                    ],
                },
            },
        },
    ],
};

onMounted(() => {
    const mapCenter = [120.72929672369003, 31.288619767132104];
    const refCenter = [120.73014920373011, 31.287414975761724];
    const modelCenter = [120.73014920373011, 31.287414975761724];

    mapboxgl.accessToken = 'pk.eyJ1IjoiamsyNzY5OTM4NTciLCJhIjoiY2x0bW5ubHViMWVnaDJtcDZlYW92aWt2eCJ9.mBXt-vny9iFy4lzC0g1gbw';

    // 地图初始化
    let map = new mapboxgl.Map({
        container: 'map-container',
        style: style_opacity,
        doubleClickZoom: false,
        center: mapCenter,
        zoom: 17.88998700147244,
        sky: 'light',
        pitch: 64.42598133276567,
        bearing: -37.87271910936988,
    });

    window.THREE = THREE; //Three.js接口

    let scene, model;
    map.on('load', function () {
        scene = new ThreejsSceneLayer({
            id: 'test-scene',
            refCenter: refCenter,
            envTexture: './assets/hdr/yun2.hdr',
            envIntensity: 1.0,
        });
        map.addLayer(scene);

        // 园区模型

        model = scene.addModel({
            id: 'model_id1',
            rootUrl: './assets/models/yq.glb',
            position: modelCenter,
            rotation: [90, 0, 0],
            scale: 1,
            offset: [0, 0, 0],
            callback: function (modelObject) {
                document.getElementById('loading').style.display = 'none';

                // 初始化场景
                new SceneApi(map, scene, modelObject);

                // 道路行驶车辆
                let car = new CarApi(map, scene, modelObject);
                car.initCar();
                let count = 0;
                setInterval(function () {
                    //每隔6秒放一次车，放5次
                    if (count < 5) {
                        car.initCar();
                        count++;
                    }
                }, 10000);
                // 获取MapApi接口
                window.mapApi = new MapApi(map, scene, modelObject);
            },
        });
    });
    window.map = map;
});
</script>
<template>
    <div class="map-container" id="map-container"></div>
    <div class="loading" id="loading">Loading…</div>
</template>

<style lang="scss" scoped>
.map-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 36px;
    color: #fff;
    font-weight: bold;
}
</style>
