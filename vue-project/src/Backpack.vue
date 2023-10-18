<script setup>
import * as PIXI from "pixi.js";
import { onMounted } from "vue";
import notbagsJSON from "./notbags.json";
import bagsJSON from "./bags.json";
import { Layer } from "@pixi/layers";

// make sure the bags are on a lower layer than the items

const app = new PIXI.Application({
  background: "#1099bb",
  width: 720,
  height: 600,
});
var graphics = new PIXI.Graphics();
graphics.beginFill(0xffff00);

const gridWidth = 9;
const gridHeight = 7;

const SLOT_SIZE = 70;

// draw rectangles in a grid
for (let i = 0; i < gridWidth; i++) {
  for (let j = 0; j < gridHeight; j++) {
    if ((i + j) % 2 == 0) {
      graphics.beginFill(0x777777);
    } else {
      graphics.beginFill(0x444444);
    }
    graphics.drawRect(i * SLOT_SIZE, j * SLOT_SIZE, SLOT_SIZE, SLOT_SIZE);
  }
}

let dragTarget = null;

app.stage.eventMode = "static";
app.stage.hitArea = app.screen;
app.stage.on("pointerup", onDragEnd);
app.stage.on("pointerupoutside", onDragEnd);
app.stage.sortableChildren = true;

function createItem(itemName, x, y) {
  // create our little bunny friend..
  const texture = PIXI.Texture.from(
    `http://backpack-battles.s3.amazonaws.com/items/${itemName}.png`
  );
  const item = new PIXI.Sprite(texture);

  if (bagsJSON.includes(itemName)) {
    item.alpha = 0.6;
  }

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  item.eventMode = "static";

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  item.cursor = "pointer";

  // center the bunny's anchor point
  item.anchor.set(0.5);
  // set item.pivot to the sprites center
  // item.pivot.set(item.width / 2, item.height / 2);

  // make it a bit bigger, so it's easier to grab
  item.scale.set(SLOT_SIZE * 0.006);

  // setup events for mouse + touch using
  // the pointer events
  item.on("pointerdown", onDragStart, item);

  // move the sprite to its designated position
  item.x = x;
  item.y = y;

  // add it to the stage
  app.stage.addChild(item);
}

let addItemToBackpack = (itemName) => {
  console.log(`Adding ${itemName} to backpack...`);
  createItem(itemName, 300, 300);
};

onMounted(() => {
  document.body.appendChild(app.view);

  const ROTATIONAMOUNT = (2 * Math.PI) / 4;

  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyR") {
      dragTarget.rotation += ROTATIONAMOUNT;
    }
    if (event.code === "KeyE") {
      dragTarget.rotation -= ROTATIONAMOUNT;
    }
    if (event.code === "KeyX") {
      deleteDragTarget();
    }
  });
});
// if the item is being dragged, whenever r is press, the item rotates 90 degrees clockwise

function onDragMove(event) {
  if (dragTarget) {
    dragTarget.parent.toLocal(event.global, null, dragTarget.position);
  }
}

function onDragStart() {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  // this.data = event.data;
    this.alpha /= 2;
  dragTarget = this;
  app.stage.on("pointermove", onDragMove);
}

function onDragEnd() {
  if (dragTarget) {
    app.stage.off("pointermove", onDragMove);
    dragTarget.alpha *= 2;
    dragTarget = null;
  }
}

function deleteDragTarget() {
  if (dragTarget) {
    app.stage.removeChild(dragTarget);
    dragTarget = null;
  }
}

app.stage.addChild(graphics);

let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
});
//   let container = document.body.getElementById("canvas");
</script>

<template>
  <!--
                        GOALS:
                Create a 4x4 grid
                Create a 1x2 item.
                Place and rotate the item on the grid
    -->
  <div class="user-inputs">
    <div class="select-area">
      <span class="subtitle">Bags</span>
      <div class="dialog">
        <select name="selectedBag" id="selectedBag" v-model="selectedBag">
          <option v-for="bag in bagsJSON" :value="bag">{{ bag }}</option>
        </select>
        <button @click="addItemToBackpack(selectedBag)">Add to Backpack</button>
      </div>
    </div>
    <div class="select-area">
      <span class="subtitle">Items</span>
      <div class="dialog">
        <select name="selectedItem" id="selectedItem" v-model="selectedItem">
          <option v-for="notbag in notbagsJSON" :value="notbag">
            {{ notbag }}
          </option>
        </select>
        <button @click="addItemToBackpack(selectedItem)">
          Add to Backpack
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.select-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: bold;
}

.user-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #999999;
  gap: 25px;
}
</style>
