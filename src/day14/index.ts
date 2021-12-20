/**
 * Advent of Code 2021 - Day 14
 * Ref.: https://adventofcode.com/2021/day/14
 */

import * as path from "path";
import { readFile } from "../common/utils";
import { Polymer, PolymerElementsMap, PolymerPairsMap } from "./types.d";

function readInput(filePath: string): Polymer {
  const data = readFile(filePath);
  if (!Array.isArray(data)) return {} as Polymer;

  const polymerTemplate = {
    template: "",
    growthRules: [],
  } as Polymer;
  data.forEach((line, index) => {
    if (index === 0) polymerTemplate.template = line;
    else {
      const ruleData = line.split(" -> ");
      if (ruleData.length === 2) {
        polymerTemplate.growthRules.push({
          elementPair: ruleData[0],
          valueToInsert: ruleData[1],
        });
      }
    }
  });

  return polymerTemplate;
}

// Calculate and return a map with count of pairs after number of steps
function getPrevalentPairs(polymer: Polymer, steps: number): PolymerPairsMap {
  // Initialize prevalent pairs
  const { template } = polymer;
  let prevalentPairs = {} as PolymerPairsMap;
  for (let i = 0; i < template.length - 1; i++) {
    const pair = `${template[i]}${template[i + 1]}`;
    if (!prevalentPairs[pair]) prevalentPairs[pair] = 1;
    else prevalentPairs[pair]++;
  }

  // Evolve...
  for (let i = 0; i < steps; i++) {
    const newPrevalentPairs = { ...prevalentPairs };
    Object.keys(prevalentPairs).forEach((pair) => {
      for (const { elementPair, valueToInsert } of polymer.growthRules) {
        if (pair == elementPair) {
          const occurences = prevalentPairs[pair];

          // Subtract pairs that are going to disappear
          if (!newPrevalentPairs[pair]) newPrevalentPairs[pair] = 0;
          else newPrevalentPairs[pair] -= occurences;

          // Add the number of new pairs that appear with first part of old pair and new element
          if (!newPrevalentPairs[pair[0] + valueToInsert])
            newPrevalentPairs[pair[0] + valueToInsert] = occurences;
          else newPrevalentPairs[pair[0] + valueToInsert] += occurences;

          // Add the number of new pairs that appear with second part of old pair and new element
          if (!newPrevalentPairs[valueToInsert + pair[1]])
            newPrevalentPairs[valueToInsert + pair[1]] = occurences;
          else newPrevalentPairs[valueToInsert + pair[1]] += occurences;
        }
      }
    });
    prevalentPairs = newPrevalentPairs;
  }

  return prevalentPairs;
}

// Return the subtract between most common and least common element
function getElementSubtractionResult(
  polymerPairs: PolymerPairsMap,
  template: string
): number {
  // Create a map with all elements counts
  const elements = {} as PolymerElementsMap;
  Object.keys(polymerPairs).forEach((pair) => {
    if (!elements[pair[0]]) elements[pair[0]] = polymerPairs[pair];
    else elements[pair[0]] += polymerPairs[pair];

    if (!elements[pair[1]]) elements[pair[1]] = polymerPairs[pair];
    else elements[pair[1]] += polymerPairs[pair];
  });

  // Add extra element of first and last element of the template
  const first = template[0];
  const last = template[template.length - 1];
  if (!elements[first]) elements[first] = 1;
  else elements[first]++;
  if (!elements[last]) elements[last] = 1;
  else elements[last]++;

  // Extract, calculate and sort values
  const values = [] as number[];
  Object.values(elements).forEach((value) => {
    values.push(Math.ceil(value / 2));
  });
  values.sort((a, b) => b - a);

  return (values.at(0) || 0) - (values.at(-1) || 0);
}

export function main(fileName: string = "input.txt"): number[] {
  const file = path.resolve(__dirname, fileName);
  const polymer = readInput(file);

  const evolvedPairsAfter10Steps = getPrevalentPairs(polymer, 10);
  const totalSubtractionAfter10Steps = getElementSubtractionResult(
    evolvedPairsAfter10Steps,
    polymer.template
  );
  console.log(
    `Step 1, most and least common element subtraction after 10 steps: ${totalSubtractionAfter10Steps}`
  );

  const evolvedPairsAfter40Steps = getPrevalentPairs(polymer, 40);
  const totalSubtractionAfter40Steps = getElementSubtractionResult(
    evolvedPairsAfter40Steps,
    polymer.template
  );
  console.log(
    `Step 2, most and least common element subtraction after 40 steps: ${totalSubtractionAfter40Steps}`
  );

  return [totalSubtractionAfter10Steps, totalSubtractionAfter40Steps];
}

main();
