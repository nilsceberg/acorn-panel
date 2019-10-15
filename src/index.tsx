import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./view/App";
import { Model } from "./model/Model";

const state = new Model();
state.systemMessage = "Acorn Control Panel"
ReactDOM.render(<App model={state}/>, document.getElementById("root"));
