/**
 * Advent of Code 2021 - Day 10
 * Ref.: https://adventofcode.com/2021/day/10
 */

import * as path from "path";
import { readFile } from "../common/utils";

function readInput(filePath: string): string[] {
  const data = readFile(filePath);
  if (!Array.isArray(data)) return [];
  return data;
}

function isOpenChar(char: string): boolean {
  return ["(", "[", "{", "<"].includes(char);
}

function isCloseChar(char: string): boolean {
  return [")", "]", "}", ">"].includes(char);
}

// TODO: Change implementation using map
function getInverseChar(char: string): string {
  switch (char) {
    case "(":
      return ")";
    case ")":
      return "(";
    case "[":
      return "]";
    case "]":
      return "[";
    case "{":
      return "}";
    case "}":
      return "{";
    case "<":
      return ">";
    case ">":
      return "<";
    default:
      return "";
  }
}

// TODO: Change implementation using map
function getErrorCharPoints(char: string) {
  return char === ")"
    ? 3
    : char === "]"
    ? 57
    : char === "}"
    ? 1197
    : char === ">"
    ? 25137
    : 0;
}

// TODO: Change implementation using map
function getScoreCharPoints(char: string) {
  return char === ")"
    ? 1
    : char === "]"
    ? 2
    : char === "}"
    ? 3
    : char === ">"
    ? 4
    : 0;
}

function getTotalSyntaxErrorScore(code: string[]): number {
  const wrongChars = code.reduce((acc, line) => {
    const operators = [];
    // TODO: Change implementation to declarative
    for (let i = 0; i < line.length; i++) {
      if (isOpenChar(line[i])) {
        operators.push(line[i]);
      } else if (isCloseChar(line[i])) {
        if (getInverseChar(operators.at(-1) as string) !== line[i]) {
          acc.push(line[i]);
          break;
        }
        operators.pop();
      }
    }
    return acc;
  }, [] as string[]);

  // TODO: Change implementation using a map and avoid to repeat the filters
  const total =
    wrongChars.filter((c) => c === ")").length * getErrorCharPoints(")") +
    wrongChars.filter((c) => c === "]").length * getErrorCharPoints("]") +
    wrongChars.filter((c) => c === "}").length * getErrorCharPoints("}") +
    wrongChars.filter((c) => c === ">").length * getErrorCharPoints(">");

  return total;
}

function getAutocompleteMiddleScore(code: string[]): number {
  // Filter incomplete lines
  const incompleteLines = code.reduce((acc, line) => {
    let hasError = false;
    const operators = [];
    // TODO: Change implementation to declarative
    for (let i = 0; i < line.length; i++) {
      if (isOpenChar(line[i])) {
        operators.push(line[i]);
      } else if (isCloseChar(line[i])) {
        if (getInverseChar(operators.at(-1) as string) !== line[i]) {
          hasError = true;
          break;
        }
        operators.pop();
      }
    }
    if (!hasError) acc.push(line);
    return acc;
  }, [] as string[]);

  // Calc score lines
  const scores = incompleteLines.reduce((acc, line) => {
    // Get necesary chars to close the line
    const operators = [];
    for (let i = 0; i < line.length; i++) {
      if (isOpenChar(line[i])) {
        operators.push(line[i]);
      } else if (isCloseChar(line[i])) {
        operators.pop();
      }
    }

    // Calc score
    let score = 0;
    operators
      .reverse()
      .map(getInverseChar)
      .forEach((char) => {
        score = score * 5 + getScoreCharPoints(char);
      });
    acc.push(score);
    return acc;
  }, [] as number[]);

  // NOTE: There will always be an odd number of scores
  // A more elegant implementation would be to search for the number
  // that has the same numbers smaller and larger than itself
  const middle = Math.floor(scores.length / 2);
  return scores.sort((a, b) => a - b)[middle];
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const code = readInput(file);

  const totalScore = getTotalSyntaxErrorScore(code);
  console.log(`Step 1, total syntax error score: ${totalScore}`);

  const autocompleteMiddleScore = getAutocompleteMiddleScore(code);
  console.log(`Step 2, middle autocomplete score: ${autocompleteMiddleScore}`);

  return [totalScore, autocompleteMiddleScore];
}

main();
