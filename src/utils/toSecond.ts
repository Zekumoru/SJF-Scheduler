const toSecond = (ms: number, decimal = 3) => {
  return (ms / 1000).toFixed(decimal);
};

export default toSecond;
