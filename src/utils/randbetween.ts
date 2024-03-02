const randbetween = (max: number, min: number) => {
  return Math.random() * (max - min) + min;
};

export default randbetween;
