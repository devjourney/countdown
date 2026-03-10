class Timer {
  constructor(onTick, onComplete) {
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.remainingMs = 0;
    this.endTime = null;
    this.rafId = null;
    this.running = false;
  }

  start(totalSeconds) {
    this.remainingMs = totalSeconds * 1000;
    this.resume();
  }

  resume() {
    if (this.remainingMs <= 0) return;
    this.running = true;
    this.endTime = Date.now() + this.remainingMs;
    this._tick();
  }

  pause() {
    this.running = false;
    this.remainingMs = Math.max(0, this.endTime - Date.now());
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  reset() {
    this.running = false;
    this.remainingMs = 0;
    this.endTime = null;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  _tick() {
    if (!this.running) return;

    const now = Date.now();
    this.remainingMs = Math.max(0, this.endTime - now);

    const totalSec = Math.ceil(this.remainingMs / 1000);
    this.onTick(totalSec);

    if (this.remainingMs <= 0) {
      this.running = false;
      this.onComplete();
      return;
    }

    this.rafId = requestAnimationFrame(() => this._tick());
  }

  get isRunning() {
    return this.running;
  }
}
