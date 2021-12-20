export type PolymerGrowthRule = {
  elementPair: string;
  valueToInsert: string;
};

export type Polymer = {
  template: string;
  growthRules: PolymerGrowthRule[];
};

export type PolymerPairsMap = {
  [key: string]: number;
};

export type PolymerElementsMap = PolymerPairsMap;
