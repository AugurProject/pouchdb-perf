import { ScenarioActionTypes } from "../scenarios";

export interface IScenarioRun {
  id: string;
  scenario_id: string;
  stage: string;
  start: number;
  messages: string[];
  end?: number;
}

export function scenarioRuns(state: IScenarioRun[] = [], { type, payload }: ScenarioActionTypes) {
  switch (type) {
    case "SCENARIO_RUN_START":
      return [
        ...state,
        {
          id: payload.id,
          messages: payload.messages,
          scenario_id: payload.scenario_id,
          stage: payload.stage,
          start: payload.timestamp
        }
      ];

    case "SCENARIO_RUN_END":
      return state.map((sr) => {
        if (sr.id === payload.id && sr.stage === payload.stage) {
          return {
            ...sr,
            end: payload.timestamp,
            messages: sr.messages.concat(payload.messages),
          };
        }
        return sr;
      });
  }

  return state;
}


export function isRunning(state = false, action: ScenarioActionTypes) {
  switch (action.type) {
    case "SCENARIO_RUN_START":
      return true;
    case "SCENARIO_RUN_END":
      return false;
  }

  return state;
}



