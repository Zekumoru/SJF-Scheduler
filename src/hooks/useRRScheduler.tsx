import { useCallback, useEffect, useRef, useState } from 'react';
import useTime from './useTime';
import createRRScheduler, { IRRScheduler } from '../schedulers/roundRobin';
import IProcess from '../types/process';
import randbetween from '../utils/randbetween';

const useRRScheduler = ({
  maxDuration,
  minDuration,
}: {
  minDuration: number;
  maxDuration: number;
}) => {
  const [time, toggle, isPaused] = useTime();
  const schedulerRef = useRef<IRRScheduler | null>();
  const [processes, setProcesses] = useState<IProcess[]>([]);
  const [timeSlice, setTimeSlice] = useState(-1);
  const [currentTimeSlice, setCurrentTimeSlice] = useState(-1);
  const [terminatedProcesses, setTerminatedProcesses] = useState<IProcess[]>(
    []
  );

  const setSchedulerStates = useCallback(() => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    setTimeSlice(scheduler.getTimeSlice());
    setCurrentTimeSlice(scheduler.getCurrentTimeSlice());
    setProcesses(scheduler.getProcesses());
  }, []);

  useEffect(() => {
    schedulerRef.current = createRRScheduler();
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
    const deltaTime = time - currentProcess.start;
    currentProcess.duration -= deltaTime;
    currentProcess.start = time;
    scheduler.reduceCurrentTimeSlice(deltaTime);
    if (currentProcess.duration <= 0) {
      // process terminated, dequeue it
      scheduler.dequeue();
      currentProcess.status = 'terminated';
      setTerminatedProcesses((processes) => [...processes, currentProcess]);
      const nextProcess = scheduler.getCurrentProcess();
      if (nextProcess) nextProcess.start = time;
      scheduler.calcTimeSlice();
    } else if (scheduler.hasRecalculated()) {
      // process finished its allocated time,
      // put it in the end of the list
      scheduler.dequeue();
      currentProcess.status = 'ready';
      scheduler.enqueue(currentProcess);
      const nextProcess = scheduler.getCurrentProcess();
      if (nextProcess) nextProcess.start = time;
    }

    setSchedulerStates();
  }, [time, isPaused, setSchedulerStates]);

  const spawnProcess = () => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    scheduler.createProcess(
      Math.ceil(time),
      randbetween(minDuration, maxDuration) * 1000
    );

    if (isPaused) scheduler.calcTimeSlice();

    setSchedulerStates();
  };

  return {
    spawnProcess,
    toggle,
    isPaused,
    processes,
    terminatedProcesses,
    time,
    timeSlice,
    currentTimeSlice,
  };
};

export default useRRScheduler;
