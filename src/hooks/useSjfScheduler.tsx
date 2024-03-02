import { useEffect, useRef, useState } from 'react';
import useTime from './useTime';
import { PriorityQueue } from '@datastructures-js/priority-queue';
import IProcess from '../types/process';
import randbetween from '../utils/randbetween';

interface ISjfScheduler {
  idCount: number;
  processes: PriorityQueue<IProcess>;
  dequeue: () => IProcess | null;
  getCurrentProcess: () => IProcess | null;
  createProcess: (start: number, duration: number) => void;
}

const useSjfScheduler = () => {
  const [time, toggle, isPaused, deltaTime] = useTime();
  const schedulerRef = useRef<ISjfScheduler | null>();
  const [processes, setProcesses] = useState<IProcess[]>([]);

  useEffect(() => {
    schedulerRef.current = {
      idCount: 0,
      processes: new PriorityQueue<IProcess>((a, b) => a.duration - b.duration),
      createProcess: function (start, duration) {
        this.processes.enqueue({ pid: this.idCount, duration, start });
        this.idCount++;
      },
      dequeue: function () {
        if (this.getCurrentProcess() === null) return null;
        return this.processes.dequeue();
      },
      getCurrentProcess: function () {
        return this.processes.front();
      },
    };
  }, []);

  useEffect(() => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    const currentProcess = scheduler.getCurrentProcess();
    if (!currentProcess) return;

    currentProcess.duration -= deltaTime;
    if (currentProcess.duration <= 0) scheduler.dequeue();

    setProcesses(scheduler.processes.toArray());
  }, [deltaTime]);

  const spawnProcess = () => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    scheduler.createProcess(
      Math.ceil(time),
      Math.floor(randbetween(2, 10)) * 1000
    );
    setProcesses(scheduler.processes.toArray());
  };

  return { spawnProcess, toggle, isPaused, processes, time };
};

export default useSjfScheduler;
