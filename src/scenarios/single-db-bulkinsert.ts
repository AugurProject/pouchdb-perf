import PouchDB from "pouchdb";
import { v4 as uuidv4 } from "uuid";

import { testData } from "../kovan.test6";
import { IScenario } from "./index";


async function createDbs() {
  const db = new PouchDB(`${uuidv4()}/somedb`);

  await db.createIndex({
    index: {
      fields: ["name"]
    }
  });

  await db.bulkDocs(testData);
}

export const scenario1: IScenario = {
  description: "Simple setup",
  fn: createDbs,
  id: "SCENARIO_1",
  name: "Scenario 1"
};
