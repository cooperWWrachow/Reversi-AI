'use client';
import React, { useState, useEffect } from "react";

type Player = "BLACK" | "WHITE";
type Cell = Player | null;
type Position = [number, number];

const BOARD_SIZE = 8;

// Create initial board. 2D Array 8x8
const initializeBoard = (): Cell[][] => {
  const board: Cell[][] = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(null)
  );

  const mid = 4; // middle array
  board[mid - 1][mid - 1] = "WHITE";
  board[mid][mid] = "WHITE";
  board[mid - 1][mid] = "BLACK";
  board[mid][mid - 1] = "BLACK";

  return board;
};

const directions = [
  [-1, 0], // Up
  [1, 0], // Down
  [0, -1], // Left
  [0, 1], // Right
  [-1, -1], // Up Left
  [-1, 1], // Up Right
  [1, -1], // Down Left
  [1, 1], // Down Right
];

// Check if a move is valid
const isValidMove = (board: Cell[][], row: number, col: number, player: Player): boolean => {
  // Is move taken?
  if (board[row][col] !== null) return false;
  const opponent: Player = player === "BLACK" ? "WHITE" : "BLACK";
  // Traverse all directions checking if the move is valid
  for (const [dx, dy] of directions) {
    let x = row + dx;
    let y = col + dy;
    let hasOpponentBetween = false;
    // While x and y are in range 0 - 8 to prevent wrapping
    while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
      // If apponent color then update between value
      if (board[x][y] === opponent) {
        hasOpponentBetween = true;
      // if current color then check if opponent color was between, if so then return true because minimum one valid move is needed
      } else if (board[x][y] === player) {
        if (hasOpponentBetween) 
          return true;
          break;
      } else {
          break; // Neither color means empty cell
      }
      x += dx;
      y += dy;
    }
  }
  return false;
};

// Make a move and flip the pieces
const makeMove = (board: Cell[][], row: number, col: number, player: Player): Cell[][] => {
  if (!isValidMove(board, row, col, player)) {
    console.log("Invalid Move");
    return board;
  }

  const newBoard = board.map((row) => row.slice());
  newBoard[row][col] = player;
  const opponent: Player = player === "BLACK" ? "WHITE" : "BLACK";

  for (const [dx, dy] of directions) {
    const piecesToFlip: [number, number][] = [];
    let x = row + dx;
    let y = col + dy;

    while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
      if (newBoard[x][y] === opponent) {
        piecesToFlip.push([x, y]);
      } else if (newBoard[x][y] === player) {
        for (const [fx, fy] of piecesToFlip) {
          newBoard[fx][fy] = player;
        }
        break;
      } else {
        break;
      }
      x += dx;
      y += dy;
    }
  }
  return newBoard;
};

// Get all valid moves for the current player
const getValidMoves = (board: Cell[][], player: Player): Position[] => {
  const validMoves: Position[] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, row, col, player)) {
        validMoves.push([row, col]);
      }
    }
  }
  return validMoves;
};

const getScore = (player: string, board: Cell[][]) => {
  let score = 0;
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if(board[row][col] == player){
        score += 1
      }
    }
  }
  return score;
}

// Othello game component
const Board: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("BLACK");
  const [validMoves, setValidMoves] = useState<Position[]>([]);

  // Update valid moves at the start of every turn
  useEffect(() => {
    const moves = getValidMoves(board, currentPlayer);
    setValidMoves(moves);
  }, [board, currentPlayer]);

  const handleMove = (row: number, col: number) => {
    if (!isValidMove(board, row, col, currentPlayer)) {
      return;
    }

    const newBoard = makeMove(board, row, col, currentPlayer);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "BLACK" ? "WHITE" : "BLACK");
  };

  // Check if move is a valid one so it can be highlighted
  const isMoveHighlighted = (row: number, col: number) =>
    validMoves.some(([r, c]) => r === row && c === col);

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-3">
      <div className="grid grid-cols-8 gap-1 bg-base-200 p-1 shadow-2xl border-2 border-primary rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`h-8 w-8 sm:w-12 sm:h-12 flex cursor-default items-center justify-center rounded-full border-[1px] input-bordered ${
                cell === "BLACK"
                  ? "bg-black"
                  : cell === "WHITE"
                  ? "bg-white"
                  : isMoveHighlighted(rowIndex, colIndex)
                  ? "bg-gray-700 animate-pulse cursor-pointer"
                  : "bg-base-100"
              }`}
              onClick={() => handleMove(rowIndex, colIndex)}
            />
          ))
        )}
      </div>

      {/* Game State */}
      <div className="flex flex-row gap-4">
        <div
          className={`flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 bg-black rounded-box text-center ${
            currentPlayer === "BLACK" && "border-4 sm:border-8 border-secondary"
          }`}
        >
          <span className="text-4xl text-white">{getScore('WHITE', board)}</span>
        </div>
        <div
          className={`flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-box  ${
            currentPlayer === "WHITE" && "border-4 sm:border-8 border-secondary"
          }`}
        >
          <span className="text-4xl text-black">{getScore('BLACK', board)}</span>
        </div>
      </div>
    </div>
  );
};

export default Board;
