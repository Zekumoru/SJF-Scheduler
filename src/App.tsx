import { PriorityQueue } from '@datastructures-js/priority-queue';
import useTime from './hooks/useTime';
import { useEffect, useRef, useState } from 'react';

interface IProcess {
  pid: number;
  start: number;
  duration: number;
}

interface ISjfScheduler {
  idCount: number;
  processes: PriorityQueue<IProcess>;
  dequeue: () => IProcess | null;
  getCurrentProcess: () => IProcess | null;
  createProcess: (start: number, duration: number) => void;
}

const randbetween = (max: number, min: number) => {
  return Math.random() * (max - min) + min;
};

const App = () => {
  const [time, toggle, isPaused, deltaTime] = useTime();
  const schedulerRef = useRef<ISjfScheduler | null>();
  const [processes, setProcesses] = useState<IProcess[]>([]);

  useEffect(() => {
    schedulerRef.current = {
      idCount: 0,
      processes: new PriorityQueue<IProcess>((a, b) => a.duration - b.duration),
      createProcess: function (start, duration) {
        this.processes.enqueue({ pid: this.idCount, duration, start });
        this.idCount++;
      },
      dequeue: function () {
        if (this.getCurrentProcess() === null) return null;
        return this.processes.dequeue();
      },
      getCurrentProcess: function () {
        return this.processes.front();
      },
    };
  }, []);

  useEffect(() => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    const currentProcess = scheduler.getCurrentProcess();
    if (!currentProcess) return;

    currentProcess.duration -= deltaTime;
    if (currentProcess.duration <= 0) scheduler.dequeue();

    setProcesses(scheduler.processes.toArray());
  }, [deltaTime]);

  const spawnProcess = () => {
    const scheduler = schedulerRef.current;
    if (!scheduler) return;

    scheduler.createProcess(
      Math.ceil(time),
      Math.floor(randbetween(2, 10)) * 1000
    );
    setProcesses(scheduler.processes.toArray());
  };

  return (
    <div>
      <h1>SJF Scheduler</h1>
      <p>Time: {(time / 1000).toFixed(3)}</p>
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
              <span>{(start / 1000).toFixed(1)}</span>
              <span>{(duration / 1000).toFixed(1)}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
