import { Square } from "@/types/square";
import { INITIAL_POSITIONS, PIECES } from "./helpers";

const setUpInitialPieces = (squares: Square[][]): Square[][] => {
    return squares.map(row =>
        row.map(square => {
            const coords = `${square.column}${square.row}`;
            const piece = PIECES[INITIAL_POSITIONS[coords]];
            return piece ? { ...square, piece, active: false } : square;
        })
    );
};


export const initializeBoard = () => {
    const board: Square[][] = [...Array(8)].map((_, i) =>
        [...Array(8)].map((_, j) => ({
            column: String.fromCharCode('A'.charCodeAt(0) + j),
            row: 9 - i - 1,
            active: false
        }))
    );
    return setUpInitialPieces(board);
}


