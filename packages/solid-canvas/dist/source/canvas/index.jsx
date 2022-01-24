import { createEffect } from "solid-js";
import { size, setSize } from "../common/size";
const Canvas = (props) => {
    createEffect(() => {
        setTimeout(() => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 0);
    }, []);
    return (<div style={{ width: `${size().width}px`, height: `${size().height}px` }}>
      {props.children}
    </div>);
};
export default Canvas;
