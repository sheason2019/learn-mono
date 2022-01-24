import { Component, createEffect, useContext } from "solid-js";
import { CanvasContext, ctxPool } from "../common/context";

interface Props {
  draw: (ctx: CanvasRenderingContext2D) => void;
  children?: Element;
}

const Shape: Component<Props> = (props) => {
  const { draw } = props;
  const layerid = useContext(CanvasContext);

  createEffect(() => {
    const ctx = ctxPool()[layerid];
    if (ctx != null) {
      draw(ctx);
    }
  }, [ctxPool]);
  return null;
};

export default Shape;
