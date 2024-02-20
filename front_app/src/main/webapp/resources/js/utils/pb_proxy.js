export default class PBProxy {
  #target;

  #thisArg;

  constructor(target, thisArg) {
    this.#target = target;
    this.#thisArg = thisArg;
  }

  async set(...arg) {
    if ((arg.length > 0) && (arg.length <= 2)) {
      switch(arg.length) {
        case 1: {
          const [newValue] = arg;

          this.#target = newValue;
          break;
        }
        case 2: {
          const [key, newValue] = arg;

          this.#target[key] = newValue;
          break;
        }
      }

      await this.#thisArg.render();
      this.#thisArg.eventInit();
      this.#thisArg._eventInit();
    } else {
      throw new Error('param 개수 범위 초과')
    }
  }

  get(...arg) {
    if ((arg.length >= 0) && (arg.length <= 1)) {
      switch(arg.length) {
        case 0:
          return this.#target ?? null;
        case 1:
          const [key] = arg;

          return this.#target[key] ?? null;
      }
    } else {
      throw new Error('param 개수 범위 초과')
    }
  }
}