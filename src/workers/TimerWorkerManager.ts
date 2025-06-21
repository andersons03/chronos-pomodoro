// let instance: TimerWorkerManager | null = null;
import { TaskStateModel } from '../models/TaskStateModel';

export class TimerWorkerManager {
  private worker: Worker;
  private static instance: TimerWorkerManager | null = null;

  private constructor() {
    this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
  }

  static getInstance(): TimerWorkerManager {
    if (!this.instance) {
      this.instance = new TimerWorkerManager();
    }

    return this.instance;
  }

  postMessage(message: TaskStateModel): void {
    this.worker.postMessage(message);
  }

  onmessage(cb: (e: MessageEvent) => void): void {
    this.worker.onmessage = cb;
  }

  terminate(): void {
    this.worker.terminate();
    TimerWorkerManager.instance = null;
  }
}
