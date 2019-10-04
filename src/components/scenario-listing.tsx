import * as React from "react";
import { ScenarioItemContainer } from "../containers/scenario-item";
import { IScenario } from "../scenarios";

interface IScenarioListingProps {
  allScenarios: IScenario[];
}

export const ScenarioListing = ({ allScenarios }: IScenarioListingProps) => (<div>
  {allScenarios.map((s) => <ScenarioItemContainer key={s.id} scenario={s}/>)}
</div>);
