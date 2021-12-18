import { Coordinate } from "../common/types";

export type Fold = {
  x?: number;
  y?: number;
};

export type Briefing = {
  coordinates: Coordinate[];
  folds: Fold[];
};
