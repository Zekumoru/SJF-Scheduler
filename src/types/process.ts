export default interface IProcess {
  pid: number;
  initialStart: number;
  initialDuration: number;
  start: number;
  duration: number;
  status: 'ready' | 'run' | 'wait' | 'terminated';
  responseTime: number;
}
