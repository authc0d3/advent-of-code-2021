/**
 * Advent of Code 2021 - Day 6
 * Ref.: https://adventofcode.com/2021/day/6
 */

import * as path from "path";
import { readFile } from "../common/utils";
import { FishMap } from "./types";

const INITIAL_FISH_STATE = 8;
const FISH_STATE_AFTER_REPLICATE = 6;
const INITIAL_FISH_MAP = [...Array(INITIAL_FISH_STATE + 1)].reduce(
  (obj, _, i) => {
    obj[i] = 0;
    return obj;
  },
  {} as FishMap
);

// Read and parse input
function readInput(filePath: string): number[] {
  const raw = readFile(filePath, { splitLines: false }) as string;
  const data = raw.replace(/\r/gi, "").split(",");
  return Array.isArray(data) ? data.map((num) => parseInt(num)) : [];
}

function calcFishesAfterDays(fishes: number[], days: number): number {
  // Inital states map from the input
  let map: FishMap = fishes.reduce((map, f) => {
    if (!map[f]) map[f] = 0;
    map[f]++;
    return map;
  }, {} as FishMap);

  // Foreach days we rewrite map with the next fishes states
  for (let d = 0; d < days; d++) {
    const nextMap = { ...INITIAL_FISH_MAP };
    Object.keys(map).forEach((key, f) => {
      if (f === 0) {
        nextMap[FISH_STATE_AFTER_REPLICATE] += map[key];
        if (d < days - 1) nextMap[INITIAL_FISH_STATE] += map[key];
      } else {
        nextMap[f - 1] += map[key];
      }
    });
    map = nextMap;
  }

  // Sum and return
  return Object.keys(map).reduce((acc, key) => (acc += map[key]), 0);
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const fishes = readInput(file);

  const fishesAfter80Days = calcFishesAfterDays(fishes, 80);
  console.log(`Step 1, total fishes after 80 days: ${fishesAfter80Days}`);

  const fishesAfter256Days = calcFishesAfterDays(fishes, 256);
  console.log(`Step 2, total fishes after 256 days: ${fishesAfter256Days}`);

  return [fishesAfter80Days, fishesAfter256Days];
}

main();
