/**
 * Advent of Code 2021 - Day 11
 * Ref.: https://adventofcode.com/2021/day/11
 */

import * as path from "path";
import { Coordinate } from "../common/types.d";
import { readFile } from "../common/utils";

// TODO: Move this method to utils and use reuse it in day09 solution
function readInput(filePath: string): number[][] {
  const data = readFile(filePath);
  if (!Array.isArray(data)) return [];

  return data.reduce((map, cell, row) => {
    map[row] = cell.split("").map(Number);
    return map;
  }, [] as number[][]);
}

function checkFlashes(
  octopus: Coordinate,
  matrix: number[][],
  flashed: Coordinate[] = []
): [number[][], Coordinate[]] {
  // Prevent flashing more than 1 time
  const { x, y } = octopus;
  if (flashed.some((o) => o.x === x && o.y === y)) return [matrix, flashed];

  if (matrix[x][y] > 9) {
    flashed.push(octopus);

    // Get side octopus
    const sideOctopuses = [] as Coordinate[];

    // Left & right
    if (x - 1 >= 0) sideOctopuses.push({ x: x - 1, y });
    if (x + 1 < matrix[x].length) sideOctopuses.push({ x: x + 1, y });

    // Top & bottom
    if (y - 1 >= 0) sideOctopuses.push({ x, y: y - 1 });
    if (y + 1 < matrix.length) sideOctopuses.push({ x, y: y + 1 });

    // Diagonals: Top left & Right
    if (x - 1 >= 0 && y - 1 >= 0) sideOctopuses.push({ x: x - 1, y: y - 1 });
    if (x + 1 < matrix[x].length && y - 1 >= 0)
      sideOctopuses.push({ x: x + 1, y: y - 1 });

    // Diagonals: Bottom left & Right
    if (x - 1 >= 0 && y + 1 < matrix.length)
      sideOctopuses.push({ x: x - 1, y: y + 1 });
    if (x + 1 < matrix[x].length && y + 1 < matrix.length)
      sideOctopuses.push({ x: x + 1, y: y + 1 });

    // Foreach side octopuses we increment its energy and recall
    sideOctopuses.forEach((oct) => {
      matrix[oct.x][oct.y]++;
      const [m, f] = checkFlashes(oct, matrix, flashed);
      matrix = m;
      flashed = f;
    });
  }

  return [matrix, flashed];
}

function runStep(matrix: number[][]): [number[][], number] {
  let flashed = [] as Coordinate[];

  // Check flashes
  matrix.forEach((line, row) =>
    line.forEach((_, col) => {
      matrix[row][col]++;
      const [m, f] = checkFlashes({ x: row, y: col }, matrix, flashed);
      matrix = m;
      flashed = f;
    })
  );

  // Set all energy levels > 9 to 0
  matrix.forEach((line, row) =>
    line.forEach((oct, col) => {
      if (oct > 9) matrix[row][col] = 0;
    })
  );

  return [matrix, flashed.length];
}

function countFlashesAfterSteps(
  matrix: number[][],
  steps: number
): [number, number[][]] {
  let totalFlashed = 0;
  for (let i = 0; i < steps; i++) {
    const [newMatrix, flashes] = runStep(matrix);
    matrix = newMatrix;
    totalFlashed += flashes;
  }
  return [totalFlashed, matrix];
}

function getSynchroStep(matrix: number[][], step: number = 0): number {
  const [newMatrix, flashes] = runStep(matrix);
  matrix = newMatrix;

  if (flashes === matrix.length * matrix[0].length) return step + 1;
  return getSynchroStep(matrix, step + 1);
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const matrix = readInput(file);

  const [totalFlashesAfter100Steps, newMatrix] = countFlashesAfterSteps(
    matrix,
    100
  );
  console.log(
    `Step 1, total flashes after 100 steps: ${totalFlashesAfter100Steps}`
  );

  const synchroStep = getSynchroStep(newMatrix) + 100;
  console.log(`Step 1, synchro flash step: ${synchroStep}`);

  return [totalFlashesAfter100Steps, synchroStep];
}

main();
