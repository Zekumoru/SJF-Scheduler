import { useCallback, useEffect, useState } from 'react';

const useTime = () => {
  const [paused, setPaused] = useState(true);
  const [time, setTime] = useState({
    time: 0,
    accumulatedTime: 0,
    deltaTime: 0,
    startTime: 0,
  });

  const toggle = useCallback(() => {
    setPaused((paused) => !paused);
  }, []);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setTime(({ time: oldTime, startTime, accumulatedTime }) => {
        const now = Date.now();
        let newStartTime = startTime;
        if (startTime === 0) newStartTime = now;

        const newTime = accumulatedTime + now - newStartTime;
        return {
          time: newTime,
          deltaTime: newTime - oldTime,
          startTime: newStartTime,
          accumulatedTime,
        };
      });
    }, 1000 / 60); // 60 fps

    return () => {
      clearInterval(interval);
      setTime(({ time: oldTime, startTime, accumulatedTime }) => {
        const now = Date.now();
        const newTime = accumulatedTime + now - startTime;
        return {
          startTime: 0,
          deltaTime: newTime - oldTime,
          accumulatedTime: newTime,
          time: newTime,
        };
      });
    };
  }, [paused]);

  return [time.time, toggle, paused, time.deltaTime] as const;
};

export default useTime;
