import { Piece, PieceName, PieceColor } from "@/types/piece";
import { Square } from "@/types/square";

const generatePieces = (): Record<string, Piece> => {
    const pieces: Record<string, Piece> = {};
    const pieceNames = Object.values(PieceName);
    const pieceColors = Object.values(PieceColor);
  
    for (const color of pieceColors) {
      for (const name of pieceNames) {
        const key = `${name}_${color}`;
        const img = `${name.toLowerCase()}_${color.toLowerCase()}.svg`;
        pieces[key] = { name, color, img };
      }
    }
  
    return pieces;
  };
  
  
  export const PIECES = generatePieces()
  
  export const INITIAL_POSITIONS: Record<string, string> = {
    // WHITE INITIAL POSITIONS
    'A1': 'ROOK_WHITE',
    'B1': 'KNIGHT_WHITE',
    'C1': 'BISHOP_WHITE',
    'D1': 'QUEEN_WHITE',
    'E1': 'KING_WHITE',
    'F1': 'BISHOP_WHITE',
    'G1': 'KNIGHT_WHITE',
    'H1': 'ROOK_WHITE',
    'A2': 'PAWN_WHITE',
    'B2': 'PAWN_WHITE',
    'C2': 'PAWN_WHITE',
    'D2': 'PAWN_WHITE',
    'E2': 'PAWN_WHITE',
    'F2': 'PAWN_WHITE',
    'G2': 'PAWN_WHITE',
    'H2': 'PAWN_WHITE',
    // BLACK INITIAL POSITION 
    'A8': 'ROOK_BLACK',
    'B8': 'KNIGHT_BLACK',
    'C8': 'BISHOP_BLACK',
    'D8': 'QUEEN_BLACK',
    'E8': 'KING_BLACK',
    'F8': 'BISHOP_BLACK',
    'G8': 'KNIGHT_BLACK',
    'H8': 'ROOK_BLACK',
    'A7': 'PAWN_BLACK',
    'B7': 'PAWN_BLACK',
    'C7': 'PAWN_BLACK',
    'D7': 'PAWN_BLACK',
    'E7': 'PAWN_BLACK',
    'F7': 'PAWN_BLACK',
    'G7': 'PAWN_BLACK',
    'H7': 'PAWN_BLACK'
  }


  // Helper functions to check if a move is within the board and if a square is occupied
  export const isWithinBoard = (square: Square): boolean => {
    return square.row >=  1 && square.row <=  8 && square.column >= 'A' && square.column <= 'H';
  };

  export const isSquareOccupied = (square: Square, board: Square[][]): boolean => {
    return board.flat().some(s => s.column === square.column && s.row === square.row && s.piece);
  };

  export const isPawnFirstTimeMoving = (square:Square) => {
    const squarePosition = `${square.column}${square.row}`
    //check if the clicked squareposiiton  is in the starting positions of white or black pawns
    const foundPiece = PIECES[INITIAL_POSITIONS[squarePosition]]
    return foundPiece && foundPiece.name === PieceName.PAWN
  }

  export const columnToIndex = (column: string): number => {
    return column.charCodeAt(0) - 'A'.charCodeAt(0);
};