import IProcess from '../../types/process';
import toSecond from '../../utils/toSecond';
import Subcard from './Subcard';

const ProcessCard = ({
  process,
  isPaused,
}: {
  process: IProcess;
  isPaused?: boolean;
}) => {
  return (
    <div
      className={`card shadow-xl px-6 py-4 ${
        process.status === 'run'
          ? 'bg-green-900'
          : process.responseTime !== -1
          ? 'bg-red-900'
          : 'bg-neutral-800'
      }`}
    >
      <h2 className="card-title mb-2 flex items-center">
        {process.status === 'run' && !isPaused ? (
          <span className="loading loading-ring loading-md"></span>
        ) : (
          ''
        )}
        Process ID {process.pid}{' '}
      </h2>
      <div className="grid grid-cols-fill gap-2">
        <Subcard icon="update" label="Start" value={toSecond(process.start)} />
        <Subcard
          icon="schedule"
          label="Initial Start"
          value={toSecond(process.initialStart)}
        />
        <Subcard
          icon="hourglass_top"
          label="Duration Left"
          value={toSecond(process.duration)}
        />
        <Subcard
          icon="hourglass_empty"
          label="Total Duration"
          value={toSecond(process.initialDuration)}
        />
        <Subcard icon="pending_actions" label="Status" value={process.status} />
      </div>
    </div>
  );
};

export default ProcessCard;
