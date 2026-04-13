import * as ex from "excalibur";

class Excalinput {
  constructor(engine: ex.Engine) {
    console.log("Scenes:",engine.scenes);
  }
}

const engine = new ex.Engine();
export const excalInput = new Excalinput(engine)