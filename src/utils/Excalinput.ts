import { Engine } from "excalibur";

class Excalinput {
  constructor(engine: Engine) {
    console.log("Scenes:",engine.scenes);
  }
}

const engine = new Engine();
export const excalInput = new Excalinput(engine)