import { useState } from 'react';
import useRRScheduler from '../hooks/useRRScheduler';
import RangeInput from './RangeInput';
import toSecond from '../utils/toSecond';

const RRScheduler = () => {
  const [minDuration, setMinDuration] = useState(2);
  const [maxDuration, setMaxDuration] = useState(8);
  const {
    processes,
    terminatedProcesses,
    time,
    isPaused,
    spawnProcess,
    toggle,
    timeSlice,
    currentTimeSlice,
  } = useRRScheduler({
    minDuration,
    maxDuration,
  });

  return (
    <>
      <h1>Round Robin</h1>
      <p>Time: {toSecond(time)}</p>
      <p>Time Slice: {timeSlice > 0 ? toSecond(timeSlice) : 'Not set'}</p>
      <p>
        Current Time Slice:{' '}
        {currentTimeSlice > 0 ? toSecond(currentTimeSlice) : 'Not set'}
      </p>
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
              responseTime,
            }) => (
              <li
                key={pid}
                style={{
                  background: responseTime != -1 ? 'red' : undefined,
                }}
              >
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
    </>
  );
};

export default RRScheduler;
