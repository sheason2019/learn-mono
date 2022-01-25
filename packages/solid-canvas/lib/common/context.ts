import { createContext, createSignal } from "solid-js";

// canvas context
type CtxPool = {
  [T in symbol]: CanvasRenderingContext2D;
}

const CanvasContext = createContext<symbol>(Symbol("layerid init"));

const [ctxPool, setCtxPool] = createSignal<CtxPool>({});

const registCtx = (sym: symbol, ctx: CanvasRenderingContext2D) => {
  setCtxPool((prev) => ({ ...prev, [sym]: ctx }));
};

const clearCtx = (sym: symbol) => {
  const nextCtxPool: CtxPool = { ...ctxPool };
  delete nextCtxPool[sym];
  setCtxPool(nextCtxPool);
};

export { ctxPool, registCtx, clearCtx, CanvasContext };
