import * as path from "path";
import { readFile } from "../common/utils";
import { BingoGame, BingoTicket } from "./types";

const TICKET_SIZE = 5;

// Returns an ticket id by line index
function getTicketId(lineIndex: number) {
  return Math.floor((lineIndex + 1) / TICKET_SIZE) + 1;
}

// Read and parse input
function readInput(filePath: string): BingoGame | undefined {
  try {
    const data = readFile(filePath);
    if (!Array.isArray(data)) return undefined;

    // Parse combination numbers
    const combination = data.shift()?.split(",").map(Number);
    if (!combination) return undefined;

    // Parse tickets
    let x = 0;
    let ticket: BingoTicket = { id: getTicketId(0), numbers: [] };
    const tickets: BingoTicket[] = [];
    data.forEach((line, index) => {
      line
        .split(" ")
        .filter((cell) => cell !== "")
        .map(Number)
        .forEach((value, y) => ticket.numbers.push({ x, y, value }));

      if (x === TICKET_SIZE - 1) {
        if (ticket) tickets.push(ticket);
        ticket = { id: getTicketId(index), numbers: [] };
        x = 0;
      } else {
        x++;
      }
    });

    return { combination, tickets };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// Calculate total points with sum(!marked) * wonNumber
function getTotalPoints(winner: BingoTicket | undefined) {
  if (!winner?.wonNumber) return 0;
  return (
    winner?.wonNumber *
    winner?.numbers
      .filter((n) => !n.marked)
      .map((n) => n.value)
      .reduce((acc, current) => (acc += current))
  );
}

// Make game iterations until get a winner (and returns it) or finish the game
function getWinner(game: BingoGame): BingoTicket | undefined {
  const { combination, tickets } = game;

  // Iterate combination numbers...
  for (let c = 0; c < combination.length; c++) {
    // Iterate game tickets...
    for (let t = 0; t < tickets.length; t++) {
      // Iterate ticket numbers...
      for (let n = 0; n < tickets[t].numbers.length; n++) {
        // We mark the number if it exists in the current ticket
        if (tickets[t].numbers[n].value === combination[c]) {
          tickets[t].numbers[n].marked = true;

          // Check all numbers in the same column and row searching for winner
          // only if we have at least TICKET_SIZE numbers
          if (c >= TICKET_SIZE - 1) {
            // Search winner by rows
            const markedInRow = tickets[t].numbers.filter(
              (cell) => cell.x === tickets[t].numbers[n].x && cell.marked
            );

            // Search winner by columns
            const markedInColumn = tickets[t].numbers.filter(
              (cell) => cell.y === tickets[t].numbers[n].y && cell.marked
            );

            // Return winner if we found it
            if (
              markedInRow.length === TICKET_SIZE ||
              markedInColumn.length === TICKET_SIZE
            ) {
              const winner = { ...tickets[t], wonNumber: combination[c] };
              const totalPoints = getTotalPoints(winner);
              return { ...winner, totalPoints };
            }
          }
        }
      }
    }
  }

  return undefined;
}

// Find last winner ticket
function getLastWinnerTicket(game: BingoGame): BingoTicket | undefined {
  const { tickets, combination } = game;
  if (tickets.length === 1) {
    return getWinner(game);
  }

  const winner = getWinner(game);
  return getLastWinnerTicket({
    combination,
    tickets: [...tickets.filter((t) => t.id !== winner?.id)],
  });
}

export function main(fileName: string = "input.txt"): number[] | undefined {
  const file = path.resolve(__dirname, fileName);
  const bingo = readInput(file);
  if (!bingo) return undefined;

  const winner = getWinner(bingo);
  console.log(`Step 1, winner points: ${winner?.totalPoints || 0}`);

  const lastWinner = getLastWinnerTicket(bingo);
  console.log(`Step 2, last winner points: ${lastWinner?.totalPoints || 0}`);

  return [winner?.totalPoints || 0, lastWinner?.totalPoints || 0];
}

main();
