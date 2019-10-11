declare module "pouchdb-debug";

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "ua-parser-js" {
  export interface IInfoTuple {
    name: string;
    version: string;
  }

  export interface IDevice {
    model: string;
    type: string;
    vendor: string;
  }

  export interface ICPU {
    architecture: string;
  }

  // tslint:disable-next-line:max-classes-per-file
  class UAParser {
    constructor(uastring?: string);

    public getBrowser(): IInfoTuple;

    public getDevice(): IDevice;

    public getEngine(): IDevice;

    public getOS(): IDevice;

    public getCPU(): ICPU;
  }

  export default UAParser;
}
