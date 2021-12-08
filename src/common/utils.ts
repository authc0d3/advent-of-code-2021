import * as fs from "fs";
import { Coordinate, ReadFileOptions } from "./types";

export function removeBlankLines(data: string[]): string[] {
  return data.filter((line) => line !== "");
}

export function readFile(
  filePath: string,
  options?: ReadFileOptions
): string | string[] {
  const encoding = options?.encoding ?? "utf8";
  const splitLines = options?.splitLines ?? true;
  const ignoreBlankLines = options?.ignoreBlankLines ?? true;
  try {
    const data = fs.readFileSync(filePath, encoding || "utf-8");
    return splitLines
      ? data
          .replace(/\r/gi, "")
          .split("\n")
          .filter((line) => !ignoreBlankLines || line !== "")
      : data;
  } catch (err) {
    console.error(err);
    return splitLines ? [] : "";
  }
}

export function parseCoordinate(
  line: string,
  separator: string = ","
): Coordinate {
  return line.split(separator).reduce(
    (prev, next, index) => ({
      ...prev,
      [index === 0 ? "x" : "y"]: parseInt(next),
    }),
    {} as Coordinate
  );
}

export function subtractCoordinates(from: Coordinate, to: Coordinate) {
  return [from.x - to.x, from.y - to.y];
}

export function compareCoordinates(from: Coordinate, to: Coordinate) {
  return from.x === to.x && from.y === to.y;
}
