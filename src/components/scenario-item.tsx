import { Button, Card, Elevation } from "@blueprintjs/core";
import * as React from "react";
import "./scenario-item.css";

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
  <Card className="scenario-item" interactive={true} elevation={Elevation.ZERO}>
    <div className="left">
      <h5>{name}</h5>
      <p>{description}</p>
      <Button disabled={isRunning} onClick={startScenario}>Run</Button>
    </div>
    <div className="right">
      <table
        className="bp3-html-table bp3-interactive bp3-small bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered">
        <thead>
        <tr>
          <th>Run</th>
          <th>Duration</th>
        </tr>
        </thead>
        <tbody>
        {runHistory.map((rh, index) =>
          <tr key={rh.id}>
            <td>{index + 1}</td>
            <td>{rh.duration}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  </Card>
);
