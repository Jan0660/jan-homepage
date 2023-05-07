export class Timer {
  private _wasHidden = false;
  constructor(
    public interval: number,
    public func: () => void,
    public abideHidden: boolean = true
  ) {}

  private delay(delay: number) {
    return new Promise((r) => {
      setTimeout(r, delay);
    });
  }

  public async run() {
    while (true) {
      await this.delay(this.interval);
      console.log("tick");
      if (this.abideHidden) {
        if (document.hidden) {
          // only go for one cycle after was hidden
          if (this._wasHidden) {
            continue;
          }
          this._wasHidden = true;
        }
      }
      this.func();
    }
  }
}
