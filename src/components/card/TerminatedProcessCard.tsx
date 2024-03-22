import IProcess from '../../types/process';
import toSecond from '../../utils/toSecond';
import Subcard from './Subcard';

const TerminatedProcessCard = ({ process }: { process: IProcess }) => {
  return (
    <div className="card shadow-xl bg-neutral-800 px-6 py-4">
      <h2 className="card-title mb-2 flex items-center">
        Process ID {process.pid}{' '}
      </h2>
      <div className="grid grid-cols-fill gap-2">
        <Subcard
          icon="schedule"
          label="Started"
          value={toSecond(process.initialStart)}
        />
        <Subcard
          icon="hourglass_bottom"
          label="Ended"
          value={toSecond(process.start)}
        />
        <Subcard
          icon="hourglass_empty"
          label="Duration"
          value={toSecond(process.initialDuration)}
        />
        <Subcard
          icon="schedule_send"
          label="Response Time"
          value={toSecond(process.responseTime)}
        />
        <Subcard icon="pending_actions" label="Status" value={process.status} />
      </div>
    </div>
  );
};

export default TerminatedProcessCard;
