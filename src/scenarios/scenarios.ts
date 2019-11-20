import Dexie from "dexie";
import PouchDB from "pouchdb";
import { v4 as uuidv4 } from "uuid";
import { eventNames, testData } from "../kovan.test6";

export class Scenario {
  public readonly id: string = "";
  public readonly description: string = "";
  public messages: string[] = [];
  protected readonly dbs: { [eventName: string]: PouchDB.Database } = {};
  protected readonly eventsByName: { [eventName: string]: any[] } = {};

  constructor() {
    for (const name of eventNames) {
      this.eventsByName[name] = [];
    }
    for (const item of testData) {
      this.eventsByName[item.name].push(item);
    }
    console.log(this.eventsByName);
  }

  public async run(): Promise<void> {
    throw new Error("Must be implemented");
  }

  public async cleanup(): Promise<void> {
    this.messages = [];
    for(const db of Object.values(this.dbs)) {
      await db.destroy();
    }
  }

  public async timeify(label: string, fn: () => Promise<void>): Promise<number> {
    const start = performance.now();
    await fn();
    const end = performance.now();
    this.log(`${label} in ${end-start}ms`);
    return end-start;
  }

  public log(message: string) {
    this.messages.push(message);
  }
}

export class Scenario1 extends Scenario {
  public readonly description = "Single DB, Single Index, UUID"
  public readonly id = "SCENARIO_1";

  public async run() {
    await this.timeify("Make all databases", async () => {
      this.dbs.somedb  = new PouchDB(`${uuidv4()}/somedb`, {
        deterministic_revs: false
      });
    });

    await this.timeify("Add Docs", async () => {
      await this.dbs.somedb.bulkDocs(testData);
    });

    /*
    await this.timeify("Create Indexes", async () => {
      await this.dbs.somedb.createIndex({
        index: {
          fields: ["name"]
        }
      });
    });
    */
  }
};

class Scenario8 extends Scenario {
  public readonly description = "Dexie"
  public readonly id = "Scenario8";

  public async run() {
    let dexieDB: Dexie;
    const dbName = `${uuidv4()}/somedb`;
    await this.timeify("Make all databases", async () => {
      dexieDB = new Dexie(dbName);
      dexieDB.version(1).stores({
        [dbName]: 'name'
      });
    });

    await this.timeify("Insert all docs", async () => {
      await dexieDB.open();
      await dexieDB[dbName].bulkPut(testData);
    });
  }
}

/*
class Scenario5 extends Scenario {
  public readonly description = "Single DB, UUID"
  public readonly id = "SCENARIO_5";

  public async run() {
    await this.timeify("Make all databases", async () => {
      this.dbs.somedb  = new PouchDB(`${uuidv4()}/somedb`, {
        deterministic_revs: false
      });
    });

    await this.timeify("Insert all docs", async () => {
      await this.dbs.somedb.bulkDocs(testData);
    });
  }
};;

export class Scenario2 extends Scenario {
  public readonly description = "Multiple DB, UUID"
  public readonly id = "SCENARIO_2";
  public async run() {
    await this.timeify("Make all databases", async () => {
      for (const eventName of eventNames) {
        this.dbs[eventName] = new PouchDB(`${uuidv4()}/${eventName}`, {
          deterministic_revs: false
        });
      }
    });

    await this.timeify("Insert all docs", async () => {
      for (const eventName of eventNames) {
        const items = this.eventsByName[eventName];
        await this.dbs[eventName].bulkDocs(items);
      }
    });
  }
};

export class Scenario3 extends Scenario {
  public readonly description = "Single DB, Multiple Index, UUID";
  public readonly id = "SCENARIO_3";

  public async run() {
    await this.timeify("Make all databases", async () => {
      this.dbs.somedb  = new PouchDB(`${uuidv4()}/somedb`, {
        deterministic_revs: false
      });
    });

    const fields = [
      "name",
      "universe",
      "token",
      "target",
      "amount",
      "tokenType",
      "market",
      "totalSupply",
      "blockNumber",
      "blockHash",
      "transactionIndex",
      "removed",
      "transactionLogIndex",
      "transactionHash",
    ];
    
    await this.timeify("Insert all docs", async () => {
      await this.dbs.somedb.bulkDocs(testData);
    });

    await this.timeify("Create Indexes", async () => {
      for (const field of fields) {
        await this.dbs.somedb.createIndex({
          index: {
            fields: [field]
          }
        });
      }
    });

  }
};
*/

export class Scenario4 extends Scenario {
  public readonly description = "Multiple DB, Single Index, UUID"
  public readonly id = "SCENARIO_4";
  public async run() {
    await this.timeify("Make all databases", async () => {
      for (const eventName of eventNames) {
        this.dbs[eventName] = new PouchDB(`${uuidv4()}/${eventName}`, {
          deterministic_revs: false
        });
      }
    });

    await this.timeify("Insert all docs", async () => {
      for (const eventName of eventNames) {
        await this.dbs[eventName].bulkDocs(testData.filter((item) => item.name === eventName));
      }
    });

    await this.timeify("Create Indexes", async () => {
      for (const eventName of eventNames) {
        await this.dbs[eventName].createIndex({
          index: {
            fields: ["name"]
          }
        });
      }
    });
  }
};

export const allScenarios = [
  new Scenario1,
  new Scenario8
];

