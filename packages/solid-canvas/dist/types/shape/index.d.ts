import { Component } from "solid-js";
interface Props {
    draw: (ctx: CanvasRenderingContext2D) => void;
    children?: Element;
}
declare const Shape: Component<Props>;
export default Shape;
