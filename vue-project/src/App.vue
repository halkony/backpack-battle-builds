<script setup>
  import { onMounted } from 'vue';
  import itemsJSON from './items.json'
</script>

<template>
  <h1>Backpack Battles Builds</h1>
  <div class="backpack">
    <!-- grid - 7 slots tall, 9 slots wide -->
  </div>
  <!-- a button that says, share this build! -->
  <div class="social-bar">
    <button>Copy image to clipboard</button>
  </div>

  <!-- a div containing all items that can be click and dragged -->
  <div class="items">
    <span class="itemSpan"><img class="item" v-for="item in itemsJSON" :src="`../img/items/${item}.png`" /></span>
  </div>
</template>

<style lang="scss">// makes the items small in the items dive but bigger when dragged to the backpack
.items {
  display: flex;
  flex-wrap: wrap
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
}

// @import "@/assets/main.scss";
.backpack {
  background: blue;
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
