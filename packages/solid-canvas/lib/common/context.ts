import { createContext, createSignal } from "solid-js";

const CanvasContext = createContext<symbol>(Symbol('layerid init'));

const [ctxPool, setCtxPool] = createSignal<{
  [T in symbol]: CanvasRenderingContext2D;
}>({});

const registCtx = (sym: symbol, ctx: CanvasRenderingContext2D) => {
  setCtxPool((prev) => ({ ...prev, [sym]: ctx }));
};

export { ctxPool, registCtx, CanvasContext };
