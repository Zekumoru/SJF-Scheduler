import { useEffect, useMemo, useState } from 'react';
import RangeInput from './components/RangeInput';
import useSjfScheduler from './hooks/useSjfScheduler';
import toSecond from './utils/toSecond';

const App = () => {
  const [minDuration, setMinDuration] = useState(2);
  const [maxDuration, setMaxDuration] = useState(8);
  const [isGenRandom, setIsGenRandom] = useState(false);
  const [genProbability, setGenProbability] = useState(0.3);
  const [nextRandTime, setNextRandItem] = useState(0);
  const {
    processes,
    terminatedProcesses,
    time,
    isPaused,
    spawnProcess,
    toggle,
    isPreemptive,
    setIsPreemptive,
  } = useSjfScheduler({
    minDuration,
    maxDuration,
  });

  const averageWaitingTime = useMemo(() => {
    if (terminatedProcesses.length === 0) return 0;

    const waitingTimes = terminatedProcesses.map((process) => {
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
  }, [terminatedProcesses]);

  useEffect(() => {
    if (isPaused) return;
    if (!isGenRandom) return;

    if (time > nextRandTime) {
      setNextRandItem(time + 1000); // 1 second
      if (Math.random() < genProbability) {
        spawnProcess();
      }
    }
  }, [nextRandTime, isPaused, isGenRandom, time, spawnProcess, genProbability]);

  return (
    <main>
      <h1>SJF Scheduler</h1>
      <p>Time: {toSecond(time)}</p>
      <div>
        <label htmlFor="is-preemptive">Preemptive?</label>
        <input
          type="checkbox"
          id="is-preemptive"
          checked={isPreemptive}
          onChange={() => setIsPreemptive(!isPreemptive)}
        />
      </div>
      <div>
        <label htmlFor="is-gen-random">Generate random process?</label>
        <input
          type="checkbox"
          id="is-gen-random"
          checked={isGenRandom}
          onChange={() => setIsGenRandom(!isGenRandom)}
        />
      </div>
      <button onClick={toggle}>{isPaused ? 'Play' : 'Pause'}</button>
      <button onClick={spawnProcess}>Spawn process</button>
      <RangeInput
        label="Process min duration"
        min={0.001}
        step={0.001}
        max={maxDuration}
        value={minDuration}
        onChange={setMinDuration}
      />
      <RangeInput
        label="Process max duration"
        min={0.001}
        step={0.001}
        max={60}
        value={maxDuration}
        onChange={setMaxDuration}
      />
      {isGenRandom && (
        <RangeInput
          label="Process generation probability"
          min={0.01}
          step={0.01}
          max={1}
          value={genProbability}
          onChange={setGenProbability}
        />
      )}
      <p>Average waiting time: {toSecond(averageWaitingTime)}</p>
      <h2>Processes</h2>
      <ul>
        <li style={{ fontWeight: 'bold' }}>
          <span>PID</span>
          <span>Start</span>
          <span>Initial Start</span>
          <span>Duration Left</span>
          <span>Duration</span>
          <span>Status</span>
        </li>
        {!processes.length ? (
          <p>No processes.</p>
        ) : (
          processes.map(
            ({
              pid,
              start,
              initialStart,
              duration,
              status,
              initialDuration,
            }) => (
              <li key={pid}>
                <span>{pid}</span>
                <span>{toSecond(start)}</span>
                <span>{toSecond(initialStart)}</span>
                <span>{toSecond(duration)}</span>
                <span>{toSecond(initialDuration)}</span>
                <span>{status}</span>
              </li>
            )
          )
        )}
      </ul>
      <h2>Terminated Processes</h2>
      <ul>
        <li style={{ fontWeight: 'bold' }}>
          <span>PID</span>
          <span>Start</span>
          <span>Ended</span>
          <span>Duration</span>
          <span>Status</span>
          <span>Response Time</span>
        </li>
        {!terminatedProcesses.length ? (
          <p>No terminated processes.</p>
        ) : (
          terminatedProcesses.map(
            ({
              pid,
              start,
              initialStart,
              initialDuration,
              status,
              responseTime,
            }) => (
              <li key={pid}>
                <span>{pid}</span>
                <span>{toSecond(initialStart)}</span>
                <span>{toSecond(start)}</span> {/* Ended */}
                <span>{toSecond(initialDuration)}</span>
                <span>{status}</span>
                <span>{toSecond(responseTime)}</span>
              </li>
            )
          )
        )}
      </ul>
      <div>
        <p>
          Favicon from{' '}
          <a
            href="https://www.flaticon.com/free-icons/process"
            title="process icons"
            rel="noreferrer noopener"
          >
            Freepik
          </a>{' '}
          | Created by{' '}
          <a href="https://github.com/Zekumoru/SJF-Scheduler">Zekumoru</a>.
        </p>
      </div>
    </main>
  );
};

export default App;
