<script setup>
import * as PIXI from "pixi.js";
import { onMounted } from "vue";
import notbagsJSON from "./notbags.json";
import bagsJSON from "./bags.json";
import { Layer } from "@pixi/layers";
import { PlacementGrid } from "./js/BackpackBattles.js";

// create json object where value and label are equal to each item of itemsJSON
// had to make this to use the BalmUI dropdown component
let itemOptions = notbagsJSON.map((item) => {
  return { value: item, label: item };
});

let bagOptions = bagsJSON.map((item) => {
  return { value: item, label: item };
});

const app = new PIXI.Application({
  background: "#1099bb",
  width: 720,
  height: 600,
});
var graphics = new PIXI.Graphics();
graphics.beginFill(0xffff00);

// RENDER GRID LOGIC

let placementGrid = new PlacementGrid();

const SLOT_SIZE_IN_PIXELS = 70;

placementGrid.slots.forEach((slot) => {
  if ((slot.coordinate.x + slot.coordinate.y) % 2 == 0) {
    graphics.beginFill(0x777777);
  } else {
    graphics.beginFill(0x444444);
  }
  graphics.drawRect(
    (slot.coordinate.x - 1) * SLOT_SIZE_IN_PIXELS,
    (slot.coordinate.y - 1) * SLOT_SIZE_IN_PIXELS,
    SLOT_SIZE_IN_PIXELS,
    SLOT_SIZE_IN_PIXELS
  );
});

// for (let i = 0; i < gridWidth; i++) {
//   for (let j = 0; j < gridHeight; j++) {

//     graphics.drawRect(i * SLOT_SIZE, j * SLOT_SIZE, SLOT_SIZE, SLOT_SIZE);
//   }
// }

// DRAG AND DROP LOGIC

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
  item.scale.set(SLOT_SIZE_IN_PIXELS * 0.006);

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
        <ui-select
          v-model="selectedBag"
          :options="bagOptions"
          @selected="addItemToBackpack(selectedBag)"
        ></ui-select>
        <button @click="addItemToBackpack(selectedBag)">+1</button>
      </div>
    </div>
    <div class="select-area">
      <span class="subtitle">Items</span>
      <div class="dialog">
        <ui-select
          v-model="selectedItem"
          :options="itemOptions"
          @selected="addItemToBackpack(selectedItem)"
        ></ui-select>
        <button @click="addItemToBackpack(selectedItem)">+1</button>
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
