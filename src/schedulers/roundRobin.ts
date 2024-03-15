import { Queue } from '@datastructures-js/queue';
import IProcess from '../types/process';

export interface IRRScheduler {
  enqueue: (process: IProcess) => void;
  dequeue: () => IProcess | null;
  getCurrentProcess: () => IProcess | null;
  getProcesses: () => IProcess[];
  createProcess: (start: number, duration: number) => void;
  getTimeSlice: () => number;
  reduceCurrentTimeSlice: (value: number) => void;
  calcTimeSlice: () => void;
  getCurrentTimeSlice: () => number;
  hasRecalculated: () => boolean;
}

const createRRScheduler = (multiplier?: number): IRRScheduler => {
  let idCount = 0;
  let timeSlice = -1;
  let currentTimeSlice = -1;
  let recalculated = false;
  const processes = new Queue<IProcess>();

  return {
    createProcess: function (start, duration) {
      const wasEmpty = processes.isEmpty();

      processes.enqueue({
        start,
        duration,
        pid: idCount,
        initialStart: start,
        initialDuration: duration,
        status: 'ready',
        responseTime: -1,
      });
      idCount++;

      if (wasEmpty) this.calcTimeSlice();
    },
    calcTimeSlice: function () {
      // function to recalculate time slice based on:
      // 1. If the first process is created
      // 2. Current time slice falls below 0

      // Time slice logic:
      // 1. Get the average of all the remaining durations
      // 2. Multiply by a constant multiplier (default: 1.1)

      // get the average
      const average =
        processes
          .toArray()
          .reduce((sum, process) => sum + process.duration, 0) /
        processes.size();

      // multiply by a constant multiplier
      timeSlice = average * (multiplier ?? 1.1);
      currentTimeSlice = timeSlice;

      recalculated = true;
    },
    reduceCurrentTimeSlice: function (value) {
      recalculated = false;
      currentTimeSlice -= value;
      if (currentTimeSlice <= 0) this.calcTimeSlice();
    },
    getTimeSlice: () => timeSlice,
    getCurrentTimeSlice: () => currentTimeSlice,
    hasRecalculated: () => recalculated,
    enqueue: function (process) {
      processes.enqueue(process);
    },
    dequeue: function () {
      if (this.getCurrentProcess() === null) return null;
      return processes.dequeue();
    },
    getCurrentProcess: function () {
      return processes.front();
    },
    getProcesses: () => processes.toArray(),
  };
};

export default createRRScheduler;
