import { Component } from "solid-js";
import { size } from "../common/size";

const Layer: Component = () => {
  return (
    <canvas width={size().width} height={size().height}>
      您的浏览器不支持Canvas
    </canvas>
  );
};

export default Layer;
