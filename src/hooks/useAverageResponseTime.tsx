import { useMemo } from 'react';
import IProcess from '../types/process';

const useAverageResponseTime = (processes: IProcess[]) => {
  const averageResponseTime = useMemo(() => {
    if (processes.length === 0) return 0;

    return (
      processes.reduce((sum, process) => sum + process.responseTime, 0) /
      processes.length
    );
  }, [processes]);

  return averageResponseTime;
};

export default useAverageResponseTime;
