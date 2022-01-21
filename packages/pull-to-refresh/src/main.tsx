import { render } from "preact";
import { App } from "./app";
import { RecoilRoot } from "recoil";
import "./index.css";

render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("app")!
);
