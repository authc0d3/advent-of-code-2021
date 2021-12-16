/**
 * Advent of Code 2021 - Day 12
 * Ref.: https://adventofcode.com/2021/day/12
 */

import * as path from "path";
import { readFile } from "../common/utils";
import { Graph } from "./types.d";

enum PathEnds {
  START = "start",
  END = "end",
}

const RELATION_CHAR = "-";

function readInput(filePath: string) {
  const data = readFile(filePath);
  if (!Array.isArray(data)) return {} as Graph;

  return data.reduce((graph, cave) => {
    const [from, to] = cave.split(RELATION_CHAR);

    if (!graph[from]) graph[from] = [];
    graph[from].push(to);

    if (!graph[to]) graph[to] = [];
    graph[to].push(from);

    return graph;
  }, {} as Graph);
}

const isSmallCave = (cave: string): boolean => /[a-z]/.test(cave);

// Get all valid paths:
// - start & end caves can only be visited once
// - small caves can only be visited once
function getValidPaths(
  cave: string,
  graph: Graph,
  allPaths: string[] = [],
  visited: string[] = []
): string[] {
  visited.push(cave);

  // If path ends, add path to list of paths and return
  if (cave === PathEnds.END) {
    allPaths.push(visited.join());
    return allPaths;
  }

  // Continue deep search foreach side cave
  for (const sideCave of graph[cave]) {
    if (isSmallCave(sideCave) && visited.includes(sideCave)) {
      continue;
    }
    allPaths = getValidPaths(sideCave, graph, allPaths, [...visited]);
  }

  return allPaths;
}

// Get all valid paths:
// - start & end caves can only be visited once
// - only one small cave can be visited twice
// - the rest of the small caves can only be visited once
function getValidPathsWithNewRules(
  cave: string,
  graph: Graph,
  allPaths: string[] = [],
  visited: string[] = [],
  visitedTwice: boolean = false
): string[] {
  visited.push(cave);
  if (cave === PathEnds.END) {
    allPaths.push(visited.join());
    return allPaths;
  }

  for (const sideCaves of graph[cave]) {
    if (sideCaves === PathEnds.START) {
      continue;
    }
    if (isSmallCave(sideCaves) && visited.includes(sideCaves)) {
      if (visitedTwice) {
        continue;
      }
      if (visited.filter((c) => c === sideCaves).length > 1) {
        continue;
      }
      allPaths = getValidPathsWithNewRules(
        sideCaves,
        graph,
        allPaths,
        [...visited],
        true
      );
    } else {
      allPaths = getValidPathsWithNewRules(
        sideCaves,
        graph,
        allPaths,
        [...visited],
        visitedTwice
      );
    }
  }

  return allPaths;
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const graph = readInput(file);

  const validPaths = getValidPaths(PathEnds.START, graph);
  console.log(`Step 1, total valid paths: ${validPaths.length}`);

  const newValidPaths = getValidPathsWithNewRules(PathEnds.START, graph);
  console.log(`Step 2, new total valid paths: ${newValidPaths.length}`);

  return [validPaths.length, newValidPaths.length];
}

main();
