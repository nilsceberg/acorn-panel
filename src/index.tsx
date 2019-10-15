import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemedApp } from "./view/App";
import { Model } from "./model/Model";

const state = new Model();
state.systemMessage = "Acorn Control Panel"
ReactDOM.render(<ThemedApp model={state}/>, document.getElementById("root"));
