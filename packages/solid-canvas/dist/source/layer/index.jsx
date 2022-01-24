import { createEffect, createSignal, useContext } from "solid-js";
import { size } from "../common/size";
import { CanvasContext } from "../common/context";
const Layer = (props) => {
    let canvas;
    const [state, setState] = createSignal(null);
    const ctx = useContext(CanvasContext);
    console.log(ctx);
    createEffect(() => {
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        setState(ctx);
        console.log(state());
    }, [canvas]);
    return (<CanvasContext.Provider value={state()}>
      <canvas width={size().width} height={size().height} ref={canvas}>
        您的浏览器不支持Canvas
      </canvas>
      {props.children}
    </CanvasContext.Provider>);
};
export default Layer;
