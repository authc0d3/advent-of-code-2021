import * as path from "path";
import { readFile } from "../common/utils";

export enum RateName {
  GAMMA = "GAMMA",
  EPSILON = "EPSILON",
}

export enum GeneratorRateName {
  OXYGEN = "OXYGEN",
  C02 = "C02",
}

function getCommonBit(bits: string[], index: number, inverse: boolean = false) {
  if (!bits.length) return 0;

  let totalZeroBits = 0;
  bits.forEach((data) => {
    if (parseInt(data[index]) === 0) totalZeroBits++;
  });
  if (inverse) {
    if (totalZeroBits <= bits.length / 2) return 0;
    return 1;
  }
  if (totalZeroBits > bits.length / 2) return 0;
  return 1;
}

function calcRate(name: RateName, data: string[]): number {
  if (!data.length) return 0;

  const rate: number[] = [];
  for (let i = 0; i < data[0].length; i++) {
    rate.push(getCommonBit(data, i, name === RateName.EPSILON));
  }
  return parseInt(rate.join(""), 2);
}

function calcGeneratorRate(
  name: GeneratorRateName,
  data: string[],
  index: number = 0
): number {
  if (!data.length) return 0;

  const commonBit = getCommonBit(data, index, name === GeneratorRateName.C02);
  const filteredData = data.filter(
    (data) => parseInt(data[index]) === commonBit
  );

  if (filteredData.length === 1) {
    return parseInt(filteredData[0], 2);
  }
  return calcGeneratorRate(name, filteredData, index + 1);
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const inputData = readFile(file);

  // Calculate rates of first step
  const gamma = calcRate(
    RateName.GAMMA,
    Array.isArray(inputData) ? inputData : []
  );
  const epsilon = calcRate(
    RateName.EPSILON,
    Array.isArray(inputData) ? inputData : []
  );
  const energy = gamma * epsilon;
  console.log(`Step 1, energy: ${energy}`);

  // Calculate rates of second step
  const generatorOxygenRate = calcGeneratorRate(
    GeneratorRateName.OXYGEN,
    Array.isArray(inputData) ? inputData : []
  );
  const generatorCO2Rate = calcGeneratorRate(
    GeneratorRateName.C02,
    Array.isArray(inputData) ? inputData : []
  );
  const lifeSupportRate = generatorOxygenRate * generatorCO2Rate;
  console.log(`Step 2, life support rate: ${lifeSupportRate}`);

  return [energy, lifeSupportRate];
}

main();
