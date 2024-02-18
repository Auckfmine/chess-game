// reducers.ts
import { Square } from '@/types/square';
import { GameActionTypes, MOVE_PIECE, START_NEW_GAME,SELECT_SQUARE, UNSELECT_SQUARE } from './actions';
import { initializeBoard } from '@/utils/board';
import { getPossibleMovesForPiece, movePiece } from '@/utils/moves';

export interface GameState {
  board: Square[][];
  selectedSquare?:Square;
  availableMoves: Square[];
}

const initialState: GameState = {
  board: initializeBoard(), // Initialize your board here
  availableMoves: [],
};

export const gameReducer = (state = initialState, action: GameActionTypes): GameState => {
    
  switch (action.type) {
    case UNSELECT_SQUARE:
    return { ...state, selectedSquare: undefined , availableMoves:[]};
    case SELECT_SQUARE:
        const availableMoves = getPossibleMovesForPiece(action.payload,state.board);
        const selectedSquare = action.payload;
    return { ...state, selectedSquare, availableMoves };
    case MOVE_PIECE:
        // Logic to move the piece on the board
        const updatedBoard = movePiece(state.board, action.payload.from, action.payload.to);
      return {...state, board:updatedBoard, selectedSquare:undefined,availableMoves: []};
    case START_NEW_GAME:
      return initialState;
    default:
      return state;
  }
};