interface Size {
    width: number;
    height: number;
}
declare const size: import("solid-js").Accessor<Size>, setSize: <U extends Size>(value?: (U extends Function ? never : U) | ((prev?: Size) => U)) => U;
export { size, setSize };
