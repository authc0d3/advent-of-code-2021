/**
 * Advent of Code 2021 - Day 8
 * Ref.: https://adventofcode.com/2021/day/8
 */

import * as path from "path";
import { readFile } from "../common/utils";
import { Signal } from "./types";

function readInput(filePath: string): Signal[] {
  const data = readFile(filePath);
  if (!Array.isArray(data)) return [];

  return data.map((line) => {
    return {
      input: line.split(" | ")[0]?.split(" ") || [],
      output: line.split(" | ")[1]?.split(" ") || [],
    };
  });
}

function getTotalKnownNumbers(outputs: string[]) {
  return outputs.reduce((acc, config) => {
    if ([2, 3, 4, 7].includes(config.length)) acc++;
    return acc;
  }, 0);
}

function subtractSegments(s1: string, s2: string): string {
  return s1
    .split("")
    .filter((l) => !s2.includes(l))
    .join("");
}

function hasSegment(s1: string, s2: string) {
  return !s2.split("").some((l) => !s1.includes(l));
}

function decodeDisplaysAndSumValues(signals: Signal[]): number {
  return signals.reduce((acc, { input, output }) => {
    // Initials numbers from 0 to 9 (unknown numbers as empty positions)
    const wireConfigs: string[] = [
      "",
      input.find((config) => config.length === 2) || "",
      "",
      "",
      input.find((config) => config.length === 4) || "",
      "",
      "",
      input.find((config) => config.length === 3) || "",
      input.find((config) => config.length === 7) || "",
      "",
    ];

    // Get unknown numbers
    const unknownNumbers = input.filter(
      (i) => ![2, 3, 4, 7].includes(i.length)
    );

    // Calculate unknown segments x -> top, y -> top_left + center, z -> bottom_left + bottom
    const x = subtractSegments(wireConfigs[7], wireConfigs[1]);
    const y = subtractSegments(wireConfigs[4], wireConfigs[1]);
    const z = subtractSegments(wireConfigs[8], `${wireConfigs[1]}${x}${y}`);

    // Calculate unknown numbers by known numbers and rest of segments
    unknownNumbers.forEach((segment) => {
      if (segment.length === 5) {
        // Get config of 2, 3 and 5
        if (hasSegment(segment, z)) wireConfigs[2] = segment;
        else if (hasSegment(segment, y)) wireConfigs[5] = segment;
        else wireConfigs[3] = segment;
      } else if (segment.length === 6) {
        // Get config of 0, 6 and 9
        if (hasSegment(segment, y)) {
          if (hasSegment(segment, z)) wireConfigs[6] = segment;
          else wireConfigs[9] = segment;
        } else {
          wireConfigs[0] = segment;
        }
      }
    });

    // Get display value
    const displayValue = output.reduce((dv, config) => {
      let number;
      for (let i = 0; i < wireConfigs.length; i++) {
        if (
          config.length === wireConfigs[i].length &&
          hasSegment(config, wireConfigs[i])
        ) {
          number = i;
          break;
        }
      }
      return `${dv}${number || "0"}`;
    }, "");
    return acc + parseInt(displayValue);
  }, 0);
}

export function main(fileName: string = "test.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const signals = readInput(file);
  const outputs = signals.reduce(
    (acc, s) => [...acc, ...s.output],
    [] as string[]
  );

  const totalKnownNumbers = getTotalKnownNumbers(outputs);
  console.log(
    `Step 1, total know segment configurations of 1, 4, 7 and 8: ${totalKnownNumbers}`
  );

  const sumDisplays = decodeDisplaysAndSumValues(signals);
  console.log(`Step 2, sum all display values: ${sumDisplays}`);

  return [totalKnownNumbers, sumDisplays];
}

main();
