/**
 * Advent of Code 2021 - Day 2
 * Ref.: https://adventofcode.com/2021/day/2
 */

import * as path from "path";
import { Coordinates, CoordinatesWithAim, InputData } from "./types.d";
import { readFile } from "../common/utils";

// Read and parse input
function readInput(filePath: string): InputData[] {
  try {
    const data = readFile(filePath);
    return Array.isArray(data)
      ? data.map((row) => {
          const [action, value] = row.split(" ");
          return { action: action.toLowerCase(), value: parseInt(value) };
        })
      : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Step 1: Calculate multiply of final position
function calculateDestination(inputData: InputData[]) {
  const coordinates: Coordinates = { x: 0, y: 0 };
  inputData.forEach(({ action, value }) => {
    if (action === "forward") coordinates.x += value;
    else if (action === "down") coordinates.y += value;
    else if (action === "up") coordinates.y -= value;
  });
  return coordinates.x * coordinates.y;
}

// Step 2: Calculate multiply of final position with aim
function calculateDestinationWithAim(inputData: InputData[]): number {
  const coordinates: CoordinatesWithAim = { x: 0, y: 0, aim: 0 };
  inputData.forEach(({ action, value }) => {
    if (action === "forward") {
      coordinates.x += value;
      if (coordinates.aim > 0) coordinates.y += value * coordinates.aim;
    } else if (action === "down") coordinates.aim += value;
    else if (action === "up") coordinates.aim -= value;
  });
  return coordinates.x * coordinates.y;
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const inputData = readInput(file);

  const destination = calculateDestination(inputData);
  const destinationWithAim = calculateDestinationWithAim(inputData);
  console.log(`Step 1: ${destination} | Step 2: ${destinationWithAim}`);

  return [destination, destinationWithAim];
}

main();
