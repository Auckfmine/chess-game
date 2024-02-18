import { Piece } from "@/types/piece";
import { Square } from "@/types/square";

// actions.ts
export const SELECT_PIECE = 'SELECT_PIECE';
export const SELECT_SQUARE = 'SELECT_SQUARE';
export const UNSELECT_SQUARE = 'UNSELECT_SQUARE';
export const MOVE_PIECE = 'MOVE_PIECE';
export const START_NEW_GAME = 'START_NEW_GAME';

interface SelectPieceAction {
    type: typeof SELECT_PIECE;
    payload: Piece;
}

interface SelectSquareAction {
    type: typeof SELECT_SQUARE;
    payload: Square;
}

interface UnSelectSquareAction {
    type: typeof UNSELECT_SQUARE;
    payload: Square;
}

interface MovePieceAction {
    type: typeof MOVE_PIECE;
    payload: { from: Square; to: Square };
}

interface StartNewGameAction {
    type: typeof START_NEW_GAME;
}

export type GameActionTypes = SelectPieceAction | MovePieceAction | StartNewGameAction | SelectSquareAction | UnSelectSquareAction;


export const selectSquare = (square: Square): SelectSquareAction => ({
    type: SELECT_SQUARE,
    payload: square,
});

export const unSelectSquare = (square: Square): UnSelectSquareAction => ({
    type: UNSELECT_SQUARE,
    payload: square,
});

export const selectPiece = (piece: Piece): SelectPieceAction => ({
    type: SELECT_PIECE,
    payload: piece,
});

export const movePiece = (from: Square, to: Square): MovePieceAction => ({
    type: MOVE_PIECE,
    payload: { from, to },
});

export const startNewGame = (): StartNewGameAction => ({
    type: START_NEW_GAME,
});