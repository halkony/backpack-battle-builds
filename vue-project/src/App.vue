<script setup>
import { onMounted } from "vue";
import draggable from "vuedraggable";
import itemsJSON from "./items.json";
import * as THREE from "three";

const width = 500;
const height = 200;

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  let container = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.width, container.height);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
});
</script>

<template>
  <header>
    <img src="../img/items/LeatherBag.png" />
    <h1>Backpack Battles Builds</h1>
    <img src="../img/items/LeatherBag.png" />
  </header>

  <div class="main-app">
    <div id="canvas">
      <!-- grid - 7 slots tall, 9 slots wide -->
    </div>
    <!-- a button that says, share this build! -->
    <div class="social-bar">
      <button>Copy image to clipboard</button>
    </div>
  </div>

  <!-- a div containing all items that can be click and dragged -->
  <!-- <div class="items">
    <draggable
      :list="itemsJSON"
      @start="drag = true"
      @end="dragEnded"
      :move="checkMove"
      item-key="id"
    >
      <template #item="{ element }">
        <img :src="`../img/items/${element}.png`" />
      </template>
    </draggable>
    <span class="itemSpan"><img class="item" v-for="item in itemsJSON" :src="`../img/items/${item}.png`" /></span> -->
  <!-- </div> -->
</template>

<style lang="scss">
// makes the items small in the items dive but bigger when dragged to the backpack
header {
  display: flex;
}

.main-app {
  display: flex;
}

header img {
  height: 100px;
  width: 100px;
  margin: 0 15px;
}

.items {
  display: flex;
  flex-wrap: wrap;
}

.item {
  // scale image to 20% of its original size
  background: red;
  height: 100px;
  width: 100px;
  margin: 10px;
}

.social-bar {
  display: flex;
  justify-content: center;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #777777;
}

// @import "@/assets/main.scss";
#canvas {
  background: #999999;
  height: 200px;
  width: 500px;
  margin: 10px;
}

.items {
  background: blue;
  height: 200px;
  width: 500px;
  margin: 10px;
}
</style>
