import { combineReducers } from "redux";
import { isRunning, scenarioRuns } from "./scenarioRuns";

export const rootReducer = combineReducers({
  isRunning,
  scenarioRuns
});

export type AppState = ReturnType<typeof rootReducer>
