/**
 * Advent of Code 2021 - Day 1
 * Ref.: https://adventofcode.com/2021/day/1
 */

import * as fs from "fs";
import * as path from "path";
import { readFile } from "../common/utils";

// Read and parse input
async function readInput(filePath: string): Promise<number[]> {
  const data = await readFile(filePath);
  return Array.isArray(data) ? data.map((num) => parseInt(num)) : [];
}

// Step 1
function countLargerMeasurements(inputData: number[]): number {
  let total = 0;
  inputData.reduce((previous, current) => {
    if (previous && previous < current) total++;
    return current;
  });
  return total;
}

// Step 2
function countMeasurementSlidingWindow(inputData: number[]): number {
  const sumWindow = (index: number) =>
    inputData[index] + inputData[index + 1] + inputData[index + 2];

  let total = 0;
  inputData.forEach((_, index) => {
    if (index < inputData.length - 3 && sumWindow(index) < sumWindow(index + 1))
      total++;
  });

  return total;
}

async function main(): Promise<void> {
  const file = path.resolve(__dirname, "input.txt");
  const inputData = await readInput(file);

  const totalLargerMeasurements = countLargerMeasurements(inputData);
  console.log(`Step 1: ${totalLargerMeasurements}`);

  const totalMeasurementSlidingWindow =
    countMeasurementSlidingWindow(inputData);
  console.log(`Step 2: ${totalMeasurementSlidingWindow}`);
}

main();
