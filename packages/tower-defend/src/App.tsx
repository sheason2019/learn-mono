import { Component } from "solid-js";
import { Canvas, Layer, Shape } from "solid-canvas";

import "./index.css";

const App: Component = () => {
  return (
    <Canvas>
      <Layer>
        <Shape draw={(ctx) => console.log('ctx')} />
      </Layer>
    </Canvas>
  );
};

export default App;
