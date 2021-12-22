/**
 * Advent of Code 2021 - Day 15
 * Ref.: https://adventofcode.com/2021/day/15
 */

import * as path from "path";
import { Coordinate } from "../common/types.d";
import { readMatrix } from "../common/utils";

function getRiskWithTile(matrix: number[][], coordinate: Coordinate) {
  const maxY = matrix.length;
  const maxX = matrix[0].length;
  const { x, y } = coordinate;

  const tileRisk =
    matrix[y % maxY][x % maxX] + Math.floor(y / maxY) + Math.floor(x / maxX);
  return ((tileRisk - 1) % 9) + 1;
}

// Get the lower risk path using heap queue algorithm
function getLowestTotalRisk(matrix: number[][], withTile?: boolean): number {
  const maxY = withTile ? matrix.length * 5 : matrix.length;
  const maxX = withTile ? matrix[0].length * 5 : matrix[0].length;
  const riskMap = {} as { [key: string]: number };
  const priority = [[0, 0, 0]];
  const visited = [] as Coordinate[];

  while (priority.length > 0) {
    const [risk, y, x] = priority.pop() || [0, 0, 0];

    if (visited.find((c) => c.y === y && c.x === x)) continue;
    visited.push({ x, y });

    riskMap[`${y}_${x}`] = risk;

    if (y === maxY - 1 && x === maxX - 1) break;

    for (const [ny, nx] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const nY = y + ny;
      const nX = x + nx;
      if (!(0 <= nY && nY < maxY && 0 <= nX && nX < maxX)) continue;

      const acc = withTile
        ? getRiskWithTile(matrix, { x: nX, y: nY })
        : matrix[nY][nX];

      priority.push([risk + acc, nY, nX]);
      priority.sort((a, b) => b[0] - a[0]);
    }
  }

  return riskMap[`${maxY - 1}_${maxX - 1}`];
}

export function main(
  fileName: string = "input.txt",
  skipStepTwo?: boolean
): number[] {
  const file = path.resolve(__dirname, fileName);
  const matrix = readMatrix(file);

  const lowestTotalRisk = getLowestTotalRisk(matrix);
  console.log(`Step 1, lowest total risk: ${lowestTotalRisk}`);

  // NOTE: We excluded step 2 in some cases (ex: test) because
  // it consumes much time and basically it is the same operation
  const lowestTotalRiskWithTiles = skipStepTwo
    ? 0
    : getLowestTotalRisk(matrix, true);
  console.log(
    `Step 2, lowest total risk with tiles: ${lowestTotalRiskWithTiles}`
  );

  return [lowestTotalRisk, lowestTotalRiskWithTiles];
}

main();
