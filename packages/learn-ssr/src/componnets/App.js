import React from "react";
import { Routes, Route } from "react-router-dom";
import Counter from "./pages/counter";
import HelloWorld from "./pages/hello";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Counter />} />
      <Route path="/hello" element={<HelloWorld />} />
    </Routes>
  );
};

export default App;
