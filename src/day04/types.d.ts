export type BingoCell = {
  x: number;
  y: number;
  value: number;
  marked?: boolean;
};

export type BingoTicket = {
  id: number;
  numbers: BingoCell[];
  wonOrder?: number;
  wonNumber?: number;
  totalPoints?: number;
};

export type BingoGame = {
  combination: number[];
  tickets: BingoTicket[];
};
