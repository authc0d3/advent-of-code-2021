/**
 * Advent of Code 2021 - Day 13
 * Ref.: https://adventofcode.com/2021/day/13
 */

import * as path from "path";
import { Coordinate } from "../common/types";
import { readFile } from "../common/utils";
import { Briefing } from "./type.d";

function readInput(filePath: string): Briefing {
  const data = readFile(filePath, { ignoreBlankLines: false });
  if (!Array.isArray(data)) return {} as Briefing;

  const briefing = {} as Briefing;

  data.every((line) => {
    // Get coordinates
    if (line.includes(",")) {
      const coords = line.split(",");
      if (coords.length === 2) {
        if (!briefing.coordinates) briefing.coordinates = [];
        briefing.coordinates.push({
          x: parseInt(coords[0]),
          y: parseInt(coords[1]),
        });
      }
    }

    // Parse folds
    if (line.includes("fold along ")) {
      if (!briefing.folds) briefing.folds = [];
      const [a, l] = line.replace("fold along ", "").split("=");
      briefing.folds.push({
        ...(a === "x" && { x: parseInt(l) }),
        ...(a === "y" && { y: parseInt(l) }),
      });
      return true;
    }

    return true;
  });

  return briefing;
}

function getMaxXY(coordinates: Coordinate[]): Coordinate {
  return coordinates.reduce(
    (max, coord) => {
      if (coord.x > max.x) max.x = coord.x;
      if (coord.y > max.y) max.y = coord.y;
      return max;
    },
    { x: 0, y: 0 }
  );
}

function drawMap(map: number[][]): void {
  const draw = map.reduce((acc, line) => {
    line.forEach((cell, x) => {
      if (cell > 0) acc += "#";
      else acc += ".";
    });
    acc += "\n";
    return acc;
  }, "");
  console.log(draw);
}

function getMapAfterFolds(
  briefing: Briefing,
  onlyFirst: boolean = false
): number[][] {
  const { coordinates, folds } = briefing;

  // Generate map
  const max = getMaxXY(coordinates);
  let map: number[][] = [];
  for (let y = 0; y <= max.y; y++) {
    map[y] = [];
    for (let x = 0; x <= max.x; x++) {
      const point = coordinates.find((c) => c.x === x && c.y === y);
      map[y][x] = point ? 1 : 0;
    }
  }

  // Folding
  folds.every((fold) => {
    if (fold.y) {
      // Recalculate coordinates folding along Y
      let linesUp = 1;
      for (let y = fold.y + 1; y < map.length; y++) {
        const newY = fold.y - linesUp;
        for (let x = 0; x < map[y].length; x++) {
          const point = map[y].find((_, i) => i === x);
          if (point) map[newY][x]++;
        }
        linesUp++;
      }

      // Remove folded map zone
      map = map.filter((_, y) => y < (fold.y || 0));
    }

    if (fold.x) {
      // Recalculate coordinates folding along X
      for (let y = 0; y < map.length; y++) {
        let linesUp = 1;
        for (let x = fold.x + 1; x < map[y].length; x++) {
          const newX = fold.x - linesUp;
          const point = map[y].find((_, i) => i === x);
          if (point) map[y][newX]++;
          linesUp++;
        }
      }

      // Remove folded map zone
      const newMap = [] as number[][];
      map.forEach((row, y) => {
        if (!newMap[y]) newMap[y] = [];
        row.forEach((cell, x) => {
          if (x < (fold.x || 0)) newMap[y][x] = cell;
        });
      });
      map = [...newMap];
    }

    if (onlyFirst) return false;
    return true;
  });

  return map;
}

function countTotalPoints(map: number[][]): number {
  return map.reduce((total, line) => {
    total += line.filter((p) => p > 0).length;
    return total;
  }, 0);
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const briefing = readInput(file);

  const map = getMapAfterFolds(briefing, true);
  const totalPointsAfterOneFold = countTotalPoints(map);
  console.log(
    `Step 1, total points after one fold: ${totalPointsAfterOneFold}`
  );

  const map2 = getMapAfterFolds(briefing);
  const totalPointsAfterFolds = countTotalPoints(map2);
  console.log(`Step 2, total points after folds: ${totalPointsAfterFolds}`);
  console.log("\n======= DRAW STEP 2 =======\n");
  drawMap(map2);

  return [totalPointsAfterOneFold, totalPointsAfterFolds];
}

main();
