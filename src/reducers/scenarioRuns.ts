import { ScenarioActionTypes } from "../scenarios";

export interface IScenarionRun {
  id: string;
  scenario_id: string;
  start: number;
  end?: number;
}

export function scenarioRuns(state: IScenarionRun[] = [], { type, payload }: ScenarioActionTypes) {
  switch (type) {
    case "SCENARIO_RUN_START":
      return [
        ...state,
        {
          id: payload.id,
          scenario_id: payload.scenario_id,
          start: payload.timestamp
        }
      ];

    case "SCENARIO_RUN_END":
      return state.map((sr) => {
        if (sr.id === payload.id) {
          return {
            ...sr,
            end: payload.timestamp
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



