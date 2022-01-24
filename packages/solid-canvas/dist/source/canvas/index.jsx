import { createEffect, createSignal } from "solid-js";
const [size, setSize] = createSignal({
    width: 0,
    height: 0,
});
const Canvas = () => {
    createEffect(() => {
        console.log(window);
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);
    return (<canvas width={size().width} height={size().height}>
      当前浏览器不支持Canvas
    </canvas>);
};
export default Canvas;
