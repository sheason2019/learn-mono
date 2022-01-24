import { createEffect, useContext } from "solid-js";
import { CanvasContext } from "../common/context";
const Shape = (props) => {
    const { draw } = props;
    const ctx = useContext(CanvasContext);
    createEffect(() => {
        if (ctx != null) {
            draw(ctx);
        }
    }, [ctx]);
    return null;
};
export default Shape;
