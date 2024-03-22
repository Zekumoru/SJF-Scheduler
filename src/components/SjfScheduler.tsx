import { useState } from 'react';
import useSjfScheduler from '../hooks/useSjfScheduler';
import toSecond from '../utils/toSecond';
import RangeInput from './RangeInput';
import useGenTime from '../hooks/useGenTime';
import useAverageWaitingTime from '../hooks/useAverageWaitingTime';
import ToggleInput from './ToggleInput';
import ProcessCard from './card/ProcessCard';
import TerminatedProcessCard from './card/TerminatedProcessCard';

const SjfScheduler = () => {
  const [minDuration, setMinDuration] = useState(2);
  const [maxDuration, setMaxDuration] = useState(8);
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
  const { isGenRandom, setIsGenRandom, genProbability, setGenProbability } =
    useGenTime(time, isPaused, spawnProcess);
  const averageWaitingTime = useAverageWaitingTime(terminatedProcesses);

  return (
    <>
      <h1 className="mb-4">SJF Scheduler</h1>
      <div className="flex gap-2 text-xl items-center my-4">
        {!isPaused ? (
          <span className="material-icons text-2xl">timer</span>
        ) : (
          <span className="material-icons text-2xl">timer_off</span>
        )}
        {toSecond(time)} s
      </div>
      <div className="my-2">
        <ToggleInput
          label="Preemptive"
          toggled={isPreemptive}
          onToggle={setIsPreemptive}
        />
        <ToggleInput
          label="Generate random process"
          toggled={isGenRandom}
          onToggle={setIsGenRandom}
        />
      </div>
      <div className="flex flex-col gap-2 my-2">
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
      </div>
      <div className="flex gap-2 my-2">
        <button className="btn btn-primary" onClick={toggle}>
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button className="btn btn-secondary" onClick={spawnProcess}>
          Spawn process
        </button>
      </div>
      <div className="mt-4 mb-2">
        <div className="flex items-center gap-2">
          <span className="material-icons">access_time_filled</span>Average
          waiting time
        </div>
        <div className="text-xl mt-1">{toSecond(averageWaitingTime)}</div>
      </div>
      <h2 className="text-3xl mt-4 mb-2">Processes</h2>
      <ul className="flex flex-col gap-2 my-2">
        {!processes.length ? (
          <p>No processes.</p>
        ) : (
          processes.map((process) => (
            <li key={process.pid}>
              <ProcessCard process={process} isPaused={isPaused} />
            </li>
          ))
        )}
      </ul>
      <h2 className="text-3xl mt-4 mb-2">Terminated Processes</h2>
      <ul className="flex flex-col gap-2 my-2">
        {!terminatedProcesses.length ? (
          <p>No terminated processes.</p>
        ) : (
          terminatedProcesses.map((process) => (
            <li key={process.pid}>
              <TerminatedProcessCard process={process} />
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default SjfScheduler;
