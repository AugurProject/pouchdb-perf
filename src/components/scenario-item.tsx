import { Button, Card, Elevation } from "@blueprintjs/core";
import * as React from "react";

interface IScenarionCompletedRun {
  id: string;
  duration: number;
}

export interface IScenarioItemProps {
  isRunning: boolean;
  name: string;
  description: string;
  startScenario: () => void;
  runHistory: IScenarionCompletedRun[];
}

export const ScenarioItem = ({ description, isRunning, name, runHistory, startScenario }: IScenarioItemProps) => (
  <Card interactive={true} elevation={Elevation.ZERO}>
    <h5>{name}</h5>
    <p>{description}</p>
    <Button active={isRunning} onClick={startScenario}>Submit</Button>
    
    {runHistory.map((rh) => <div key={rh.id}>{rh.duration}</div>)}
  </Card>
);
