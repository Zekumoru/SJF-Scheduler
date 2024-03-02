import { useCallback, useEffect, useState } from 'react';

const useTime = () => {
  const [paused, setPaused] = useState(true);
  const [time, setTime] = useState({
    time: 0,
    accumulatedTime: 0,
    startTime: 0,
  });

  const toggle = useCallback(() => {
    setPaused((paused) => !paused);
  }, []);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setTime(({ startTime, accumulatedTime }) => {
        let newStartTime = startTime;
        if (startTime === 0) newStartTime = Date.now();
        return {
          time: accumulatedTime + Date.now() - newStartTime,
          startTime: newStartTime,
          accumulatedTime,
        };
      });
    }, 1000 / 60); // 60 fps

    return () => {
      clearInterval(interval);
      setTime(({ time, startTime, accumulatedTime }) => ({
        startTime: 0,
        accumulatedTime: accumulatedTime + Date.now() - startTime,
        time,
      }));
    };
  }, [paused]);

  return [time.time, toggle, paused] as const;
};

export default useTime;
