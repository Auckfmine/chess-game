import { Piece } from "./piece";

export type Square = {
    column: string;
    row: number;
    piece?: Piece;
  };


export type Board = Square[][]