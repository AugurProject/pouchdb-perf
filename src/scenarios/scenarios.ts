import PouchDB from "pouchdb";
import { v4 as uuidv4 } from "uuid";
import { eventNames, testData } from "../kovan.test6";
import { IScenario } from "./index";

export const scenario1: IScenario = {
  description: "Single db, one index, bulk data load",
  fn: async () => {
    const db = new PouchDB(`${uuidv4()}/somedb`);

    await db.createIndex({
      index: {
        fields: ["name"]
      }
    });

    await db.bulkDocs(testData);
  },
  id: "SCENARIO_1",
  name: "Scenario 1"
};

export const scenario2: IScenario = {
  description: "Multiple db, one index per db, bulk data load",
  fn: async () => {
    const dbs: { [eventName: string]: PouchDB.Database } = {};

    for (const eventName of eventNames) {
      dbs[eventName] = new PouchDB(`${uuidv4()}/${eventName}`);
      await dbs[eventName].createIndex({
        index: {
          fields: ["name"]
        }
      });
    }

    for (const eventName of eventNames) {
      await dbs[eventName].bulkDocs(testData.filter((item) => item.name === eventName));
    }
  },
  id: "SCENARIO_2",
  name: "Scenario 2"
};
