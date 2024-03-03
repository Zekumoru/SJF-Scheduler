import useSjfScheduler from './hooks/useSjfScheduler';
import toSecond from './utils/toSecond';

const App = () => {
  const {
    processes,
    time,
    isPaused,
    spawnProcess,
    toggle,
    isPreemptive,
    setIsPreemptive,
  } = useSjfScheduler();

  return (
    <div>
      <h1>SJF Scheduler</h1>
      <p>Time: {toSecond(time)}</p>
      <label htmlFor="is-preemptive">Preemptive?</label>
      <input
        type="checkbox"
        id="is-preemptive"
        checked={isPreemptive}
        onChange={() => setIsPreemptive(!isPreemptive)}
      />
      <button onClick={toggle}>{isPaused ? 'Play' : 'Pause'}</button>
      <button onClick={spawnProcess}>Spawn process</button>
      <ul>
        <li>
          <span>PID</span>
          <span>Start</span>
          <span>Initial Start</span>
          <span>Duration</span>
          <span>Status</span>
        </li>
        {!processes.length ? (
          <p>No processes.</p>
        ) : (
          processes.map(({ pid, start, initialStart, duration, status }) => (
            <li key={pid}>
              <span>{pid}</span>
              <span>{toSecond(start)}</span>
              <span>{toSecond(initialStart)}</span>
              <span>{toSecond(duration)}</span>
              <span>{status}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
