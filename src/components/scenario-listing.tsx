import * as React from "react";
import { ScenarioItemContainer } from "../containers/scenario-item";
import { Scenario } from "../scenarios";

interface IScenarioListingProps {
  allScenarios: Scenario[];
}

export const ScenarioListing = ({ allScenarios }: IScenarioListingProps) => (<div>
  {allScenarios.map((s) => <ScenarioItemContainer key={s.id} scenario={s}/>)}
</div>);
