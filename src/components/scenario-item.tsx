import { Button, Card, Elevation } from "@blueprintjs/core";
import * as React from "react";
import "./scenario-item.css";

interface IScenarionCompletedRun {
  id: string;
  messages: string[];
  stage: string;
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
      <p>
        {name}: {description} <Button disabled={isRunning} onClick={startScenario}>Run</Button>
      </p>
      <table
        className="bp3-html-table bp3-interactive bp3-small bp3-html-table-striped bp3-html-table-condensed bp3-html-table-bordered">
        <thead>
        <tr>
          <th>Run</th>
          <th>Stage</th>
          <th>Duration</th>
          <th>Messages</th>
        </tr>
        </thead>
        <tbody>
        {runHistory.map((rh, index) =>
          <tr key={rh.id + rh.stage}>
            <td>{Math.floor(index/2) + 1}</td>
            <td>{rh.stage}</td>
            <td>{rh.duration}</td>
            <td>
            {rh.messages.map((m) =>
               <p key={rh.id+rh.stage+m}>{m}</p>
            )}
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  </Card>
);
