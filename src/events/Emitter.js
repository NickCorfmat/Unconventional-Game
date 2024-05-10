class EventEmitter extends Phaser.Events.EventEmitter {
  //singleton here
  static instance = null;

  constructor() {
    if (EventEmitter.instance) {
      return EventEmitter.instance;
    }
    super();

    EventEmitter.instance = this;
  }

  static getInstance() {
    if (!EventEmitter.instance) {
      new EventEmitter();
    }
    return EventEmitter.instance;
  }
}
