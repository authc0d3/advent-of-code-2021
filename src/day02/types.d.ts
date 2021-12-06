import { Coordinate } from "../common/types.d";

export type InputData = {
  action: string;
  value: number;
};

export type CoordinateWithAim = Coordinate & {
  aim: number;
};
