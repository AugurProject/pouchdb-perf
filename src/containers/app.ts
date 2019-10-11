import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import App from "../App";
import { AppState } from "../reducers";
import { runAllScenarios } from "../scenarios";

const mapStateToProps = (state: AppState) => ({
  isRunning: state.isRunning
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  runAllScenarios: async () => await dispatch(runAllScenarios())
});

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
