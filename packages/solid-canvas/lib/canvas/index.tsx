import { Component, createEffect } from "solid-js";
import { size, setSize } from "../common/size";

const Canvas: Component = (props) => {
  createEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  return (
    <div style={{ width: size().width, height: size().height }}>
      {props.children}
    </div>
  );
};

export default Canvas;
