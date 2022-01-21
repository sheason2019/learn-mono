import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import createStore from './redux/store';
import { RecoilRoot } from "recoil";

export const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
