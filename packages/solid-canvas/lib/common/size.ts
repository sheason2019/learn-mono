import { createSignal } from "solid-js";

interface Size {
  width: number;
  height: number;
}

const [size, setSize] = createSignal<Size>({
  width: 0,
  height: 0,
});

export {size, setSize};