import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ScenarioItem } from "../components/scenario-item";
import { AppState } from "../reducers";
import { IScenario, runScenario } from "../scenarios";

// Type of the "own props"
export interface IScenarioItemContainerProps {
  scenario: IScenario;
}

const mapStateToProps = (state: AppState, { scenario }: IScenarioItemContainerProps) => {
  const runHistory = state.scenarioRuns
    .filter((sr) => sr.scenario_id === scenario.id)
    .map(({ id, start, end = start }) => {
      return {
        duration: end - start,
        id
      };
    });
  const { name, description } = scenario;

  return {
    description,
    isRunning: state.isRunning,
    name,
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
