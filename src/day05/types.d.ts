import { Coordinate } from "../common/types.d";

export type Vector = {
  from: Coordinate;
  to: Coordinate;
};

export type HydrothermalMap = {
  [key: string]: number;
};
