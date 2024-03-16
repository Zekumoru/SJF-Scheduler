const Credits = () => {
  return (
    <div className="flex gap-2 max-w-screen-xl mx-auto p-4 flex-col md:flex-row md:gap-4">
      <p className="flex-1">
        Favicon from{' '}
        <a
          href="https://www.flaticon.com/free-icons/process"
          title="process icons"
          rel="noreferrer noopener"
          className="underline"
        >
          Freepik
        </a>
      </p>
      <p className="flex-1">
        Created by{' '}
        <a className="underline" href="https://github.com/Zekumoru/schedulers">
          Zekumoru
        </a>
        .
      </p>
    </div>
  );
};

export default Credits;
