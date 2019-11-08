// Actions
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { v4 as uuidv4 } from "uuid";
import { AppState } from "../reducers";
import { allScenarios, Scenario  } from "./scenarios";

export * from "./scenarios";
export const SCENARIO_RUN_START = "SCENARIO_RUN_START";
export const SCENARIO_RUN_END = "SCENARIO_RUN_END";

interface IStartScenarionRunAction extends Action {
  type: typeof SCENARIO_RUN_START;
  payload: {
    id: string;
    timestamp: number;
    scenario_id: string;
    stage: string;
    messages: string[];
  };
}

interface IEndScenarionRunAction extends Action {
  type: typeof SCENARIO_RUN_END;
  payload: {
    id: string;
    timestamp: number;
    scenario_id: string;
    stage: string;
    messages: string[];
  };
}

export type ScenarioActionTypes =
  | IStartScenarionRunAction
  | IEndScenarionRunAction;

export type ScenarioActionTypeName = ScenarioActionTypes['type'];

export function scenarioEvent(type: ScenarioActionTypeName, stage: string, id: string, scenarioId: string, messages: string[], timestamp: number): ScenarioActionTypes {
  return {
    payload: {
      id,
      messages,
      scenario_id: scenarioId,
      stage,
      timestamp
    },
    type
  };
}


const time = (stage: string, id: string, scenarioId: string, thunk: () => Promise<string[]> ): ThunkAction<Promise<void>, AppState, null, Action<string>> => async (dispatch) => {
  const startTimestamp = performance.now();

  dispatch(scenarioEvent(SCENARIO_RUN_START, stage, id, scenarioId, [], startTimestamp));

  const messages = await thunk();

  const endTimestamp = performance.now();

  dispatch(scenarioEvent(SCENARIO_RUN_END, stage, id, scenarioId, messages, endTimestamp));
}

export const runScenario = (scenario: Scenario): ThunkAction<Promise<void>, AppState, null, Action<string>> => async (dispatch) => {
  const id = uuidv4();

  await dispatch(time("scenario_run", id, scenario.id, async() => {
    await scenario.run();
    return scenario.messages;
  }));

  await scenario.cleanup();
}

export const runAllScenarios = (): ThunkAction<Promise<void>, AppState, null, Action<string>> => async (dispatch, getState, extraArgument) => {
  for (const scenario of allScenarios) {
    await runScenario(scenario)(dispatch, getState, extraArgument);
  }
};
