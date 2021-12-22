/**
 * Advent of Code 2021 - Day 9
 * Ref.: https://adventofcode.com/2021/day/9
 */

import * as path from "path";
import { Coordinate } from "../common/types.d";
import { readMatrix } from "../common/utils";

function getRiskLevel(map: number[][]): number {
  return map
    .reduce(
      (acc, line, row) => [
        ...acc,
        ...line.filter((cell, col) => {
          const neighbors: number[] = [];

          // Left & top
          if (col - 1 >= 0) neighbors.push(line[col - 1]);
          if (row - 1 >= 0) neighbors.push(map[row - 1][col]);

          // Right & bottom
          if (col + 1 < line.length) neighbors.push(line[col + 1]);
          if (row + 1 < map.length) neighbors.push(map[row + 1][col]);

          return neighbors.every((n) => n > cell);
        }),
      ],
      []
    )
    .reduce((acc, point) => (acc += point + 1), 0);
}

// TODO: Optimize this function to remove final filter and prevent DRY
function getBasinPath(
  point: Coordinate,
  map: number[][],
  basinPath: Coordinate[] = []
): Coordinate[] {
  if (
    !map.length ||
    point.y < 0 ||
    point.x < 0 ||
    point.y >= map.length ||
    point.x >= map[0].length
  )
    return basinPath;

  basinPath.push(point);
  const value = map[point.y][point.x];

  // Left
  if (
    point.x - 1 >= 0 &&
    map[point.y][point.x - 1] > value &&
    map[point.y][point.x - 1] < 9 &&
    !basinPath.some((p) => p.x === point.x - 1 && p.y === point.y)
  ) {
    const subPath = getBasinPath(
      { x: point.x - 1, y: point.y },
      map,
      basinPath
    );
    basinPath = [...basinPath, ...subPath];
  }

  // Right
  if (
    point.x + 1 < map[point.y].length &&
    map[point.y][point.x + 1] > value &&
    map[point.y][point.x + 1] < 9 &&
    !basinPath.some((p) => p.x === point.x + 1 && p.y === point.y)
  ) {
    const subPath = getBasinPath(
      { x: point.x + 1, y: point.y },
      map,
      basinPath
    );
    basinPath = [...basinPath, ...subPath];
  }

  // Top
  if (
    point.y - 1 >= 0 &&
    map[point.y - 1][point.x] > value &&
    map[point.y - 1][point.x] < 9 &&
    !basinPath.some((p) => p.x === point.x && p.y === point.y - 1)
  ) {
    const subPath = getBasinPath(
      { x: point.x, y: point.y - 1 },
      map,
      basinPath
    );
    basinPath = [...basinPath, ...subPath];
  }

  // Bottom
  if (
    point.y + 1 < map.length &&
    map[point.y + 1][point.x] > value &&
    map[point.y + 1][point.x] < 9 &&
    !basinPath.some((p) => p.x === point.x && p.y === point.y + 1)
  ) {
    const subPath = getBasinPath(
      { x: point.x, y: point.y + 1 },
      map,
      basinPath
    );
    basinPath = [...basinPath, ...subPath];
  }

  const finalPath: Coordinate[] = [];
  basinPath.forEach((p) => {
    if (!finalPath.includes(p)) finalPath.push(p);
  });
  return finalPath;
}

function getValueOfMostImportantAreasToAvoid(map: number[][]): number {
  // Get initial point of basins
  const basinsCoordinates: Coordinate[] = map.reduce(
    (acc, line, row) => [
      ...acc,
      ...line
        .map((cell, col) => {
          const neighbors: number[] = [];

          // Left & top
          if (col - 1 >= 0) neighbors.push(line[col - 1]);
          if (row - 1 >= 0) neighbors.push(map[row - 1][col]);

          // Right & bottom
          if (col + 1 < line.length) neighbors.push(line[col + 1]);
          if (row + 1 < map.length) neighbors.push(map[row + 1][col]);

          if (neighbors.every((n) => n > cell)) return { x: col, y: row };
          return { x: -1, y: -1 }; // We use -1 to mark that we don't have an init basin point
        })
        .filter((c) => c.x !== -1 && c.y !== -1),
    ],
    [] as Coordinate[]
  );

  // For each basin center point, get all coordinates of the basins
  const basinsSizes = basinsCoordinates
    .reduce((acc, point) => {
      const basinPath = getBasinPath(point, map);
      acc.push(basinPath.length);
      return acc;
    }, [] as number[])
    .sort((a, b) => a - b);

  // Return the multiply of sizes of most important basins
  return basinsSizes
    .slice(Math.max(basinsSizes.length - 3, 1))
    .reduce((acc, size) => (acc === 0 ? (acc += size) : (acc *= size)), 0);
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const map = readMatrix(file);

  const riskLevel = getRiskLevel(map);
  console.log(`Step 1, risk level: ${riskLevel}`);

  const valuesMostImportantAreasToAvoid =
    getValueOfMostImportantAreasToAvoid(map);
  console.log(
    `Step 2, value of most important areas to avoid: ${valuesMostImportantAreasToAvoid}`
  );

  return [riskLevel, valuesMostImportantAreasToAvoid];
}

main();
