import { useEffect, useRef, useState } from 'react';
import useTime from './useTime';
import IProcess from '../types/process';
import randbetween from '../utils/randbetween';
import { ISjfScheduler, createSjfScheduler } from '../schedulers/sjf';

const useSjfScheduler = () => {
  const [time, toggle, isPaused] = useTime();
  const [isPreemptive, setIsPreemptive] = useState(false);
  const schedulerRef = useRef<ISjfScheduler | null>();
  const [processes, setProcesses] = useState<IProcess[]>([]);

  useEffect(() => {
    schedulerRef.current = createSjfScheduler();
  }, []);

  useEffect(() => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    const currentProcess = scheduler.getCurrentProcess();
    if (!currentProcess) return;

    if (currentProcess.responseTime === -1) {
      // calculate response time (the time between when the process arrived in
      // the system and the first time it was processed)
      currentProcess.responseTime = time - currentProcess.initialStart;
    }

    currentProcess.status = 'run';
    currentProcess.duration -= time - currentProcess.start;
    currentProcess.start = time;
    if (currentProcess.duration <= 0) {
      scheduler.dequeue();
      const nextProcess = scheduler.getCurrentProcess();
      if (nextProcess) nextProcess.start = time;
    }

    setProcesses(scheduler.getProcesses());
  }, [time, isPaused]);

  const spawnProcess = () => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    const prevProcess = scheduler.getCurrentProcess();
    scheduler.createProcess(
      Math.ceil(time),
      Math.floor(randbetween(2, 10)) * 1000
    );

    if (prevProcess !== null && prevProcess !== scheduler.getCurrentProcess()) {
      // if there was a previous process but with pre-emptive it was pushed back
      // then change its status from running to ready
      prevProcess.status = 'ready';
    }

    setProcesses(scheduler.getProcesses());
  };

  const setPreemptive = (isPreemptive: boolean) => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    setIsPreemptive((prevIsPreemptive) => {
      if (prevIsPreemptive === isPreemptive) return prevIsPreemptive;

      scheduler.setIsPreemptive(isPreemptive);
      setProcesses(scheduler.getProcesses());
      return isPreemptive;
    });
  };

  return {
    spawnProcess,
    setIsPreemptive: setPreemptive,
    isPreemptive,
    toggle,
    isPaused,
    processes,
    time,
  };
};

export default useSjfScheduler;
