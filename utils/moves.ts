import { Board, Square } from "@/types/square";
import { columnToIndex, isPawnFirstTimeMoving, isSquareOccupied, isWithinBoard } from "./helpers";
import { Piece, PieceColor, PieceName } from "@/types/piece";

export const getPossibleMovesForPiece = (clickedSquare: Square, board: Board) => {
    const piece = clickedSquare.piece;
    if (!piece) {
        return []
    }

    switch (piece.name) {
        case PieceName.PAWN:
            return getPawnAvailableMoves(piece, clickedSquare, board);
        case PieceName.ROOK:
            return getRookAvailableMoves(piece, clickedSquare, board);
        case PieceName.BISHOP:
            return getBishopAvailableMoves(piece, clickedSquare, board)
        case PieceName.KNIGHT:
            return getKnightAvailableMoves(piece, clickedSquare, board)
        case PieceName.QUEEN:
            return getQueenAvailableMoves(piece, clickedSquare, board)
        case PieceName.KING:
            return getKingAvailableMoves(piece, clickedSquare, board)
        default:
            return [];
    }

}


const getKingAvailableMoves = (piece: Piece, from: Square, board: Board): Square[] => {
    const possibleMoves = [];

    const col = from.column;
    const row = from.row;

    // Define the possible moves for a king
    const moves = [
        { row:   1, column:   0 }, // Up
        { row: -1, column:   0 }, // Down
        { row:   0, column:   1 }, // Right
        { row:   0, column: -1 }, // Left
        { row:   1, column:   1 }, // Up-right
        { row:   1, column: -1 }, // Up-left
        { row: -1, column:   1 }, // Down-right
        { row: -1, column: -1 }, // Down-left
    ];

    // Check each possible move for validity
    for (const move of moves) {
        const newRow = row + move.row;
        const newColumn = col.charCodeAt(0) + move.column;

        const foundSquare = board.flat().find(s=>s.row === newRow && s.column === String.fromCharCode(newColumn)) as Square
        // Check if the move is within the board and if the square is not occupied
        if (isWithinBoard({ row: newRow, column: String.fromCharCode(newColumn) }) && !isSquareOccupied({ row: newRow, column: String.fromCharCode(newColumn) }, board)) {
            possibleMoves.push({ row: newRow, column: String.fromCharCode(newColumn) });
        }
        else if ( foundSquare && foundSquare.piece && foundSquare.piece.color !== piece.color){
            possibleMoves.push({ row: newRow, column: String.fromCharCode(newColumn) })
        }
    }

    return possibleMoves;
};

const getQueenAvailableMoves = (piece: Piece, from: Square, board: Board): Square[] => {
    const possibleMoves = [];

    const col = from.column;
    const row = from.row;

    // Define the directions in which the queen can move
    const directions = [
        { row:   1, column:   0 }, // Down
        { row: -1, column:   0 }, // Up
        { row:   0, column:   1 }, // Right
        { row:   0, column: -1 }, // Left
        { row:   1, column:   1 }, // Down-right
        { row:   1, column: -1 }, // Down-left
        { row: -1, column:   1 }, // Up-right
        { row: -1, column: -1 }, // Up-left
    ];

    // Check each direction for valid moves
    for (const direction of directions) {
        let currentRow = row + direction.row;
        let currentColumn = col.charCodeAt(0) + direction.column;

        // Continue checking in the current direction until we hit a piece or the edge of the board
        while (isWithinBoard({ row: currentRow, column: String.fromCharCode(currentColumn) })) {
            const square = {
                column: String.fromCharCode(currentColumn),
                row: currentRow
            };
            const foundSquare = board.flat().find(s=>s.row === square.row && s.column === square.column) as Square

            // If the square is not occupied, it's a valid move
            if (!isSquareOccupied(square, board)) {
                possibleMoves.push(square);
            }
            // If the square is occupied by an enemy piece, it's a valid capture move
            else if ( foundSquare && foundSquare.piece && foundSquare.piece.color !== piece.color) {
                possibleMoves.push(square);
                break; // Stop checking in this direction after capturing
            }
            // If the square is occupied by a friendly piece, stop checking in this direction
            else {
                break;
            }

            // Move to the next square in the current direction
            currentRow += direction.row;
            currentColumn += direction.column;
        }
    }

    return possibleMoves;
};

const getKnightAvailableMoves = (piece: Piece, from: Square, board: Board): Square[] => {
    const possibleMoves = [];

    const col = from.column;
    const row = from.row;

    // Define the possible moves for a knight
    const moves = [
        { row:   2, column:   1 }, // Down-right
        { row:   2, column: -1 }, // Down-left
        { row: -2, column:   1 }, // Up-right
        { row: -2, column: -1 }, // Up-left
        { row:   1, column:   2 }, // Right-down
        { row:   1, column: -2 }, // Right-up
        { row: -1, column:   2 }, // Left-down
        { row: -1, column: -2 }, // Left-up
    ];

    // Check each possible move for validity
    for (const move of moves) {
        const newRow = row + move.row;
        const newColumn = col.charCodeAt(0) + move.column;

        const foundSquare = board.flat().find(s=>s.row === newRow && s.column === String.fromCharCode(newColumn)) as Square
        // Check if the move is within the board and if the square is not occupied
        if (isWithinBoard({ row: newRow, column: String.fromCharCode(newColumn) }) && !isSquareOccupied({ row: newRow, column: String.fromCharCode(newColumn) }, board)) {
            possibleMoves.push({ row: newRow, column: String.fromCharCode(newColumn) });
        }
        else if ( foundSquare && foundSquare.piece && foundSquare.piece.color !== piece.color){
            possibleMoves.push({ row: newRow, column: String.fromCharCode(newColumn) })
        }
    }

    return possibleMoves;
};

const getBishopAvailableMoves = (piece: Piece, from: Square, board: Board):Square[] => {
    
    const possibleMoves = [];

    const col = from.column;
    const row = from.row;

    // Define the directions in which the bishop can move
    const directions = [
        { row:   1, column:   1 }, // Down-right
        { row:   1, column: -1 }, // Down-left
        { row: -1, column:   1 }, // Up-right
        { row: -1, column: -1 }, // Up-left
    ];

    // Check each direction for valid moves
    for (const direction of directions) {
        let currentRow = row + direction.row;
        let currentColumn = col.charCodeAt(0) + direction.column;

        // Continue checking in the current direction until we hit a piece or the edge of the board
        while (isWithinBoard({ row: currentRow, column: String.fromCharCode(currentColumn) })) {
            const square = {
                column: String.fromCharCode(currentColumn),
                row: currentRow
            };
            const foundSquare = board.flat().find(s=>s.row === square.row && s.column === square.column) as Square

            // If the square is not occupied, it's a valid move
            if (!isSquareOccupied(square, board)) {
                possibleMoves.push(square);
            }
            // If the square is occupied by an enemy piece, it's a valid capture move
            else if (foundSquare && foundSquare.piece && foundSquare.piece.color !== piece.color) {
                possibleMoves.push(square);
                break; // Stop checking in this direction after capturing
            }
            // If the square is occupied by a friendly piece, stop checking in this direction
            else {
                break;
            }

            // Move to the next square in the current direction
            currentRow += direction.row;
            currentColumn += direction.column;
        }
    }

    return possibleMoves;
    
}

const getRookAvailableMoves = (piece: Piece, from: Square, board: Board) => {
    const possibleMoves = [];

    const col = from.column;
    const row = from.row;

    // Define the directions in which the rook can move
    const directions = [
        { row:  1, column:  0 }, // Right
        { row: -1, column:  0 }, // Left
        { row:  0, column:  1 }, // Down
        { row:  0, column: -1 }, // Up
    ];

    // Check each direction for valid moves
    for (const direction of directions) {
        let currentRow = row + direction.row;
        let currentColumn = col.charCodeAt(0) + direction.column;

        // Continue checking in the current direction until we hit a piece or the edge of the board
        while (isWithinBoard({ row: currentRow, column: String.fromCharCode(currentColumn) })) {
            const square = {
                column: String.fromCharCode(currentColumn),
                row: currentRow
            };
            const foundSquare = board.flat().find(s=>s.row === square.row && s.column === square.column) as Square
            
            // If the square is not occupied, it's a valid move
            if (!isSquareOccupied(square, board)) {
                possibleMoves.push(square);
            }
            // If the square is occupied by an enemy piece, it's a valid capture move
            else if (foundSquare.piece && foundSquare.piece.color !== piece.color) {
                possibleMoves.push(square);
                break; // Stop checking in this direction after capturing
            }
            // If the square is occupied by a friendly piece, stop checking in this direction
            else {
                break;
            }

            // Move to the next square in the current direction
            currentRow += direction.row;
            currentColumn += direction.column;
        }
    }

    return possibleMoves;
};

const getPawnAvailableMoves = (piece: Piece, from: Square, board: Board): Square[] => {
    const possibleMoves = [];

    const col = from.column;
    const row = from.row;
    const direction = piece.color === PieceColor.WHITE ?   1 : -1;

    // Pawn can move forward one square
    const forwardMove = {
        column: col,
        row: row + direction
    };

    if (isWithinBoard(forwardMove) && !isSquareOccupied(forwardMove, board)) {
        possibleMoves.push(forwardMove);
    }

    // Pawn can move forward two squares if it has not yet moved
    if (isPawnFirstTimeMoving(from)) {
        const secondForwardMove = {
            column: col,
            row: row + (direction *   2)
        };

        if (isWithinBoard(secondForwardMove) && !isSquareOccupied(secondForwardMove, board) && !isSquareOccupied(forwardMove, board)) {
            possibleMoves.push(secondForwardMove);
        }
    }

    // Pawn can capture diagonally
    const captureMoves = [
        { row: row + direction, column: col.charCodeAt(0) -   1 }, // Left capture
        { row: row + direction, column: col.charCodeAt(0) +   1 }  // Right capture
    ];

    for (const captureMove of captureMoves) {
        const square = {
            row: captureMove.row,
            column: String.fromCharCode(col.charCodeAt(0) + captureMove.column)
        };

        const index = columnToIndex(square.column);
        if (isWithinBoard(square) && isSquareOccupied(square, board) && board[square.row -  1][index]?.piece?.color !== piece.color) {
            possibleMoves.push(square);
        }
    }

    return possibleMoves;
};

export const movePiece = (board: Square[][], from: Square, to: Square) => {

    const pieceToMove = from.piece
    const updatedBoard = board.map(row =>
        row.map(square => {
            if (square.column === from.column && square.row === from.row) {
                return { ...square, piece: undefined };
            }
            if (square.column === to.column && square.row === to.row) {
                return { ...square, piece: pieceToMove };
            }
            return square;
        })
    );
    return updatedBoard
}


