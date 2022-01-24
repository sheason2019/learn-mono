import { createSignal } from "solid-js";
const [size, setSize] = createSignal({
    width: 0,
    height: 0,
});
export { size, setSize };
