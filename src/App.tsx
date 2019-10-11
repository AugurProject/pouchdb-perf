import { Button, Intent, Navbar } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Alignment } from "@blueprintjs/core/lib/esm/common/alignment";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import PouchDB from "pouchdb";
import * as React from "react";

import "./App.css";
import { ScenarioListing } from "./components/scenario-listing";
import { allScenarios } from "./scenarios";

interface IAppState {
  isPouchDBDebugOn: boolean;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = { isPouchDBDebugOn: localStorage.getItem("debug") === "*" };
  }

  public togglePouchDBDebug = () => {
    // This will re-coordinate with the window state
    if (localStorage.getItem("debug") === "*") {
      PouchDB.debug.disable();
      this.setState({
        isPouchDBDebugOn: false
      });
    } else {
      PouchDB.debug.enable("*");
      this.setState({
        isPouchDBDebugOn: true
      });
    }
  };

  public render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>PouchDB Perf Test</Navbar.Heading>
            <Navbar.Divider/>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Button fill={true} intent={this.state.isPouchDBDebugOn ? Intent.SUCCESS : Intent.DANGER}
                    onClick={this.togglePouchDBDebug}>{this.state.isPouchDBDebugOn ? "Disable" : "Enable"} PouchDB
              debug</Button>
          </Navbar.Group>
        </Navbar>
        <ScenarioListing allScenarios={allScenarios}/>
      </div>
    );
  }
}

export default App;
