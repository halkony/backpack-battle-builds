<script setup>
import { onMounted } from "vue";
import draggable from "vuedraggable";
import itemsJSON from "./items.json";
import Header from "./Header.vue";
import Backpack from "./Backpack.vue";
import SocialBar from "./SocialBar.vue";
</script>

<template>
  <Header></Header>
  <div class="main-app">
    <Backpack></Backpack>
    <!-- a button that says, share this build! -->
    <!-- <SocialBar></SocialBar> -->
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
.main-app {
  display: flex;
}

body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #bbbbbb;
}
</style>
