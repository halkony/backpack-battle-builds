<script setup>
import * as PIXI from "pixi.js";
import { onMounted } from "vue";
import AceOfSpades from "./AceOfSpades.png";

onMounted(() => {
  const app = new PIXI.Application({
    background: "#1099bb",
    width: 640,
    height: 360
  });
  let sprite = PIXI.Sprite.from(AceOfSpades);
  app.stage.addChild(sprite);
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xFFFF00);
  // set the line style to have a width of 5 and set the color to red
    graphics.lineStyle(5, 0xFF0000);

    // draw a rectangle
    graphics.drawRect(0, 0, 300, 200);

    app.stage.addChild(graphics);

  let elapsed = 0.0;
      app.ticker.add((delta) => {
        elapsed += delta;
        sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
        sprite.rotation += 0.05;
    });
//   let container = document.body.getElementById("canvas");
  document.body.appendChild(app.view);
});


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
