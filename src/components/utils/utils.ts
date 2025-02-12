export const baseAngleCalc = (index: number, length: number) => {
  const circleDeg = 360;
  return (circleDeg / length) * index;
};

export const rotationStepCalc = (index: number, length: number) => {
  const circleDeg = 360;
  return (index / length) * circleDeg;
};
