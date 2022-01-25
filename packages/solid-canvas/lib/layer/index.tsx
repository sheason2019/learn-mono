import { Component, createEffect, onCleanup } from "solid-js";
import { size } from "../common/size";
import { CanvasContext, clearCtx, registCtx } from "../common/context";
import {
  DataSourceType,
  createDataSourceProxy,
} from "../common/data-source-proxy";

interface Props {
  dataSourceRef?: DataSourceType;
}
const Layer: Component<Props> = ({ children, dataSourceRef }) => {
  let canvas: HTMLCanvasElement | undefined;
  const layerId = Symbol("layerId");

  // 获取ctx实例
  createEffect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    registCtx(layerId, ctx);
  }, [canvas]);

  createEffect(() => {
    const dataSource = createDataSourceProxy(layerId, dataSourceRef);
    dataSourceRef?.onInit && dataSourceRef?.onInit();
    dataSourceRef = dataSource;
  }, []);

  onCleanup(() => {
    clearCtx(layerId);
  });

  return (
    <>
      <canvas width={size().width} height={size().height} ref={canvas}>
        您的浏览器不支持Canvas
      </canvas>
      <CanvasContext.Provider value={layerId}>
        {children}
      </CanvasContext.Provider>
    </>
  );
};

export default Layer;
