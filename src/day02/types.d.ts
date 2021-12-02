export type InputData = {
  action: string;
  value: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type CoordinatesWithAim = Coordinates & {
  aim: number;
};
