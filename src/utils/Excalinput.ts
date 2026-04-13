import { Engine } from "excalibur";

class Excalinput {
  engine!: Engine;

  init(engine: Engine) {
    this.engine = engine;
  }
}

export const excalinput = new Excalinput();