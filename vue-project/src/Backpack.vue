<script setup>
import * as PIXI from "pixi.js";
import { onMounted } from "vue";
import AceOfSpades from "./AceOfSpades.png";

onMounted(() => {
  const app = new PIXI.Application({
    background: "#1099bb",
    width: 640,
    height: 360,
  });
  let sprite = PIXI.Sprite.from(AceOfSpades);
  app.stage.addChild(sprite);
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xffff00);

  const gridWidth = 9;
  const gridHeight = 7;

  // draw rectangles in a grid
  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      if ((i + j) % 2 == 0) {
        graphics.beginFill(0x777777);
      } else {
        graphics.beginFill(0x444444);
      }
      graphics.drawRect(i * 50, j * 50, 50, 50);
    }
  }

  let dragTarget = null;

app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

  const texture = PIXI.Texture.from("https://pixijs.com/assets/bunny.png");
  function createItem(x, y) {
    // create our little bunny friend..
    const item = new PIXI.Sprite(texture);

    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    item.eventMode = "static";

    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    item.cursor = "pointer";

    // center the bunny's anchor point
    item.anchor.set(0.5);

    // make it a bit bigger, so it's easier to grab
    item.scale.set(3);

    // setup events for mouse + touch using
    // the pointer events
    item.on("pointerdown", onDragStart, item);

    // move the sprite to its designated position
    item.x = x;
    item.y = y;

    // add it to the stage
    app.stage.addChild(item);
  }
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
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on("pointermove", onDragMove);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off("pointermove", onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }

  app.stage.addChild(graphics);
  createItem(100, 100);

  let elapsed = 0.0;
  app.ticker.add((delta) => {
    elapsed += delta;
    sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
    sprite.rotation += 0.05;
  });
  //   let container = document.body.getElementById("canvas");
  document.body.appendChild(app.view);

  document.addEventListener('keydown',  (event) => {
    if (event.code === 'KeyR') {
      dragTarget.rotation += 90;
    }
  });});
</script>

<template>
  <!--
                        GOALS:
                Create a 4x4 grid
                Create a 1x2 item.
                Place and rotate the item on the grid
    -->
  <div id="canvas">
    <!-- grid - 7 slots tall, 9 slots wide -->
  </div>
</template>

<style>
/* #canvas {
  background: #999999;
  height: 500px;
  width: 500px;
  margin: 10px;
} */
</style>
