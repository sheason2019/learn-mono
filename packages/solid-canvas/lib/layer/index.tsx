import { Component, createEffect, createSignal, useContext } from "solid-js";
import { size } from "../common/size";
import { CanvasContext, registCtx } from "../common/context";

const Layer: Component = (props) => {
  let canvas: HTMLCanvasElement | undefined;
  const layerId = Symbol("layerId");

  createEffect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    registCtx(layerId, ctx);
  }, [canvas]);

  return (
    <>
      <canvas width={size().width} height={size().height} ref={canvas}>
        您的浏览器不支持Canvas
      </canvas>
      <CanvasContext.Provider value={layerId}>
        {props.children}
      </CanvasContext.Provider>
    </>
  );
};

export default Layer;
