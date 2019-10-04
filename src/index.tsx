import PouchDB from "pouchdb";
import pouchdbDebug from "pouchdb-debug";
import pouchdbFind from "pouchdb-find";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import { rootReducer } from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

PouchDB.plugin(pouchdbDebug);
PouchDB.plugin(pouchdbFind);


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
