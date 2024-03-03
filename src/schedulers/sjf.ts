import { PriorityQueue } from '@datastructures-js/priority-queue';
import IProcess from '../types/process';

export interface ISjfScheduler {
  setIsPreemptive: (isPreemptive: boolean) => void;
  dequeue: () => IProcess | null;
  getCurrentProcess: () => IProcess | null;
  getProcesses: () => IProcess[];
  createProcess: (start: number, duration: number) => void;
}

export const createSjfScheduler = (): ISjfScheduler => {
  let idCount = 0;
  let isPreemptive = false;
  const processes = new PriorityQueue<IProcess>((a, b) => {
    if (!isPreemptive) {
      if (a.status === 'run') return -1;
      if (b.status === 'run') return -1;
    }
    return a.duration - b.duration;
  });

  return {
    createProcess: function (start, duration) {
      processes.enqueue({
        pid: idCount,
        duration: duration,
        initialStart: start,
        initialDuration: duration,
        start: start,
        status: 'ready',
        responseTime: -1,
      });
      idCount++;
    },
    dequeue: function () {
      if (this.getCurrentProcess() === null) return null;
      return processes.dequeue();
    },
    getCurrentProcess: function () {
      return processes.front();
    },
    getProcesses: () => processes.toArray(),
    setIsPreemptive: (isPreempt) => {
      if (isPreempt === isPreemptive) return;

      isPreemptive = isPreempt;
      const tempProcesses = processes.toArray();
      processes.clear();
      tempProcesses.forEach((process) => {
        if (process.status === 'run') process.status = 'ready';
        processes.enqueue(process);
      });
    },
  };
};
