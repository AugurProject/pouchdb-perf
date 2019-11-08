import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ScenarioItem } from "../components/scenario-item";
import { AppState } from "../reducers";
import { runScenario, Scenario} from "../scenarios";

// Type of the "own props"
export interface IScenarioItemContainerProps {
  scenario: Scenario;
}

const mapStateToProps = (state: AppState, { scenario }: IScenarioItemContainerProps) => {
  const runHistory = state.scenarioRuns
    .filter((sr) => sr.scenario_id === scenario.id)
    .map(({ id, stage, start, messages, end = start }) => {
      return {
        duration: end - start,
        id,
        messages,
        stage,
      };
    });

  return {
    description: scenario.description,
    isRunning: state.isRunning,
    name: scenario.id.replace('_', ' '),
    runHistory
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, { scenario }: IScenarioItemContainerProps) => ({
  startScenario: async () => await dispatch(runScenario(scenario))
});

export const ScenarioItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScenarioItem);
