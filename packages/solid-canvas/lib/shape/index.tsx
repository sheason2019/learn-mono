import { Component, createEffect, useContext } from "solid-js";
import { CanvasContext, ctxPool } from "../common/context";

interface Props {
  draw: (ctx: CanvasRenderingContext2D) => void;
  beforeDraw?: (ctx: CanvasRenderingContext2D) => void;
  afterDraw?: (ctx: CanvasRenderingContext2D) => void;
  children?: Element;
}

const Shape: Component<Props> = ({
  draw,
  beforeDraw,
  afterDraw,
  children,
}) => {
  const layerId = useContext(CanvasContext);

  createEffect(() => {
    const ctx = ctxPool()[layerId];
    if (ctx != null) {
      draw(ctx);
    }
  }, [ctxPool]);
  
  return null;
};

export default Shape;
