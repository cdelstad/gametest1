import { Engine } from "excalibur";

// TODO(backlog): Implement input abstraction functionality for this class.
// TODO(backlog): Replace definite assignment (engine!) with proper initialization once implemented.
class Excalinput {
  engine!: Engine;

  init(engine: Engine) {
    this.engine = engine;
  }
}

export const excalinput = new Excalinput();