import useSjfScheduler from './hooks/useSjfScheduler';
import toSecond from './utils/toSecond';

const App = () => {
  const { processes, time, isPaused, spawnProcess, toggle } = useSjfScheduler();

  return (
    <div>
      <h1>SJF Scheduler</h1>
      <p>Time: {toSecond(time)}</p>
      <button onClick={toggle}>{isPaused ? 'Play' : 'Pause'}</button>
      <button onClick={spawnProcess}>Spawn process</button>
      <ul>
        <li>
          <span>PID</span>
          <span>Start</span>
          <span>Duration</span>
        </li>
        {!processes.length ? (
          <p>No processes.</p>
        ) : (
          processes.map(({ pid, start, duration }) => (
            <li key={pid}>
              <span>{pid}</span>
              <span>{toSecond(start, 1)}</span>
              <span>{toSecond(duration, 1)}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
