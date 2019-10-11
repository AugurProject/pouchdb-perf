// Actions
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { v4 as uuidv4 } from "uuid";
import { AppState } from "../reducers";
import { scenario1, scenario2 } from "./scenarios";

export const SCENARIO_RUN_START = "SCENARIO_RUN_START";
export const SCENARIO_RUN_END = "SCENARIO_RUN_END";

export interface IScenario {
  id: string;
  name: string;
  description: string;
  fn: () => Promise<void>;
}

interface IStartScenarionRunAction extends Action {
  type: typeof SCENARIO_RUN_START;
  payload: {
    id: string;
    timestamp: number;
    scenario_id: string;
  };
}

interface IEndScenarionRunAction extends Action {
  type: typeof SCENARIO_RUN_END;
  payload: {
    id: string;
    timestamp: number;
    scenario_id: string;
  };
}

export function startScenario(id: string, scenarioId: string, timestamp: number): ScenarioActionTypes {
  return {
    payload: {
      id,
      scenario_id: scenarioId,
      timestamp
    },
    type: SCENARIO_RUN_START
  };
}

export function endScenario(id: string, scenarioId: string, timestamp: number): ScenarioActionTypes {
  return {
    payload: {
      id,
      scenario_id: scenarioId,
      timestamp
    },
    type: SCENARIO_RUN_END
  };
}


export type ScenarioActionTypes =
  | IStartScenarionRunAction
  | IEndScenarionRunAction;

export const allScenarios = [
  scenario1,
  scenario2
];

export const runScenario = (scenario: IScenario): ThunkAction<Promise<void>, AppState, null, Action<string>> => async (dispatch) => {
  const id = uuidv4();
  const startTimestamp = performance.now();

  dispatch(startScenario(id, scenario.id, startTimestamp));

  await scenario.fn();

  const endTimestamp = performance.now();

  dispatch(endScenario(id, scenario.id, endTimestamp));

  gtag("event", "timing_complete", {
    event_category: "scenario run",
    name: scenario.id,
    value: endTimestamp - startTimestamp
  });
};

export const runAllScenarios = (): ThunkAction<Promise<void>, AppState, null, Action<string>> => async (dispatch, getState, extraArgument) => {
  for (const scenario of allScenarios) {
    await runScenario(scenario)(dispatch, getState, extraArgument);
  }
};
