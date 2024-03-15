import { useMemo } from 'react';
import IProcess from '../types/process';

const useAverageWaitingTime = (processes: IProcess[]) => {
  const averageWaitingTime = useMemo(() => {
    if (processes.length === 0) return 0;

    const waitingTimes = processes.map((process) => {
      // turnaround time = exit time - arrival time
      // start is updated to be the exit time
      const turnaroundTime = process.start - process.initialStart;

      // burst time = total duration - duration left
      const burstTime = process.initialDuration - process.duration;

      // waiting time = turnaround time - burst time
      return turnaroundTime - burstTime;
    });

    return (
      waitingTimes.reduce((sum, waitingTime) => waitingTime + sum, 0) /
      waitingTimes.length
    );
  }, [processes]);

  return averageWaitingTime;
};

export default useAverageWaitingTime;
