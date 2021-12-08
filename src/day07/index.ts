/**
 * Advent of Code 2021 - Day 7
 * Ref.: https://adventofcode.com/2021/day/7
 */

import * as path from "path";
import { readFile } from "../common/utils";
import { SubmarineMap, FuelCompsumtionMap } from "./types";

// Read and parse input
function readInput(filePath: string): number[] {
  const raw = readFile(filePath, { splitLines: false }) as string;
  const data = raw.replace(/\r/gi, "").split(",");
  return Array.isArray(data) ? data.map((num) => parseInt(num)) : [];
}

function getEmptyFuelMap(positions: number[]): FuelCompsumtionMap {
  const [min, max] = positions.reduce(
    (minMax, current) => {
      if (current < minMax[0]) minMax[0] = current;
      if (current > minMax[1]) minMax[1] = current;
      return minMax;
    },
    [0, 0]
  );

  let fuelCompsumtionMap = {} as FuelCompsumtionMap;
  for (let i = min; i <= max; i++) {
    fuelCompsumtionMap[i] = 0;
  }
  return fuelCompsumtionMap;
}

function calculateMinimalFuelCompsumtion(
  positions: number[],
  accumulated: boolean = false
): number {
  // Create a map with the total number of submarines related to their positions
  const submarineMap: SubmarineMap = positions.reduce((map, pos) => {
    if (!map[pos]) map[pos] = 0;
    map[pos]++;
    return map;
  }, {} as SubmarineMap);

  // Create a map with all available positions related to their fuel compsumtions
  const fuelMap = getEmptyFuelMap(positions);
  Object.keys(fuelMap).forEach((mapPos) => {
    fuelMap[mapPos] += Object.keys(submarineMap).reduce((acc, subPos) => {
      const pathSize = Math.abs(parseInt(mapPos) - parseInt(subPos));
      return (
        acc +
        (accumulated
          ? // If we need te total with accumulation, we apply the formula
            // to calculate the first N numbers: (n * (n + 1)) / 2
            (pathSize * (pathSize + 1)) / 2
          : pathSize) *
          submarineMap[subPos]
      );
    }, 0);
  });

  // Return the position with minimun fuel compsumtion
  return Math.min(...Object.keys(fuelMap).map((pos) => fuelMap[pos]));
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const submarineCrabs = readInput(file);

  const minimumFuelCompsumtion =
    calculateMinimalFuelCompsumtion(submarineCrabs);
  console.log(`Step 1, minimal fuel compsumtion: ${minimumFuelCompsumtion}`);

  const minimumFuelCompsumtionWithAccumulation =
    calculateMinimalFuelCompsumtion(submarineCrabs, true);
  console.log(
    `Step 2, minimum fuel compsumtion with accumulation: ${minimumFuelCompsumtionWithAccumulation}`
  );

  return [minimumFuelCompsumtion, minimumFuelCompsumtionWithAccumulation];
}

main();
