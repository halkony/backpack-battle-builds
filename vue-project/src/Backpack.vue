<script setup>
import * as THREE from "three";
import {onMounted} from "vue";

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
  renderer.setSize(container.clientWidth, container.clientHeight);
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
  <div id="canvas">
    <!-- grid - 7 slots tall, 9 slots wide -->
  </div>
</template>

<style>
#canvas {
  background: #999999;
  height: 500px;
  width: 500px;
  margin: 10px;
}
</style>
