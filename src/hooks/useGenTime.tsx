import { useEffect, useState } from 'react';

const useGenTime = (time: number, isPaused: boolean, callback: () => void) => {
  const [isGenRandom, setIsGenRandom] = useState(false);
  const [genProbability, setGenProbability] = useState(0.3);
  const [nextRandTime, setNextRandItem] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    if (!isGenRandom) return;

    if (time > nextRandTime) {
      setNextRandItem(time + 1000); // 1 second
      if (Math.random() < genProbability) {
        callback();
      }
    }
  }, [nextRandTime, isPaused, isGenRandom, time, callback, genProbability]);

  return {
    isGenRandom,
    setIsGenRandom,
    genProbability,
    setGenProbability,
  };
};

export default useGenTime;
