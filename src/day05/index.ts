/**
 * Advent of Code 2021 - Day 5
 * Ref.: https://adventofcode.com/2021/day/5
 */

import * as path from "path";
import { Coordinate } from "../common/types";
import {
  compareCoordinates,
  parseCoordinate,
  readFile,
  subtractCoordinates,
} from "../common/utils";
import { HydrothermalMap, Vector } from "./types.d";

function readInput(filePath: string): Vector[] {
  try {
    const data = readFile(filePath);
    if (!Array.isArray(data)) return [];
    return data
      .map((line) => line.split(" -> "))
      .map((line) => ({
        from: parseCoordinate(line[0]),
        to: parseCoordinate(line[1]),
      }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

function filterVectors(
  vectors: Vector[],
  includeDiagonalVectors?: boolean
): Vector[] {
  return vectors.filter(
    (v) =>
      isVerticalVector(v) ||
      isHorizontalVector(v) ||
      (includeDiagonalVectors && isDiagonalVector(v))
  );
}

function isVerticalVector(vector: Vector): boolean {
  return vector.from.x === vector.to.x;
}

function isHorizontalVector(vector: Vector): boolean {
  return vector.from.y === vector.to.y;
}

function isDiagonalVector(vector: Vector): boolean {
  if (isHorizontalVector(vector) || isVerticalVector(vector)) return false;
  const result = subtractCoordinates(vector.from, vector.to);
  return Math.abs(result[0]) === Math.abs(result[0]);
}

function isValidVector(vector: Vector): boolean {
  return (
    isVerticalVector(vector) ||
    isHorizontalVector(vector) ||
    isDiagonalVector(vector)
  );
}

function getCoordinateRange(vector: Vector): Coordinate[] {
  const coords: Coordinate[] = [];
  if (isValidVector(vector)) {
    const currentPoint: Coordinate = { ...vector.from };
    coords.push({ ...currentPoint });
    do {
      currentPoint.x +=
        currentPoint.x === vector.to.x
          ? 0
          : currentPoint.x < vector.to.x
          ? 1
          : -1;
      currentPoint.y +=
        currentPoint.y === vector.to.y
          ? 0
          : currentPoint.y < vector.to.y
          ? 1
          : -1;
      coords.push({ ...currentPoint });
    } while (!compareCoordinates(currentPoint, vector.to));
  }
  return coords;
}

function mapHydrothermalField(vectors: Vector[]): HydrothermalMap {
  return vectors.reduce((map, vector) => {
    const range = getCoordinateRange(vector);
    range.forEach((v) => {
      const key = `${v.x}_${v.y}`;
      if (key in map) {
        map[key]++;
      } else {
        map[key] = 1;
      }
    });
    return map;
  }, {} as HydrothermalMap);
}

function getTotalDangerousPoints(
  vectors: Vector[],
  includeDiagonalVectors?: boolean
) {
  const filteredVectors = filterVectors(vectors, includeDiagonalVectors);
  const field = mapHydrothermalField(filteredVectors);
  return Object.keys(field).filter((key) => field[key] > 1).length;
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const vectors = readInput(file);

  const dangerousPoints = getTotalDangerousPoints(vectors);
  console.log(`Step 1, dangerous points: ${dangerousPoints}`);

  const totalDangerousPoints = getTotalDangerousPoints(vectors, true);
  console.log(`Step 2, total dangerous points: ${totalDangerousPoints}`);

  return [dangerousPoints, totalDangerousPoints];
}

main();
