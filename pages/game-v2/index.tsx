import Image from 'next/image';
import styles from './GameV2.module.css'
import React, { useState } from "react";
import { Square } from '@/types/square';
import { connect } from 'react-redux';
import { movePiece, startNewGame, selectSquare, unSelectSquare } from '@/store/game/actions'
import { GameState } from '@/store/game/reducers';

interface GameProps {
  board: Square[][];
  selectedSquare?: Square;
  availableMoves: Square[];
  selectSquare: (square: Square) => void;
  unSelectSquare: (square: Square) => void;
  movePiece: (from: Square, to: Square) => void;
  startNewGame: () => void;
}



const GameV2: React.FC<GameProps> = ({ board, availableMoves, selectSquare, selectedSquare, unSelectSquare, movePiece, startNewGame }) => {


  const handleClick = (event: React.MouseEvent<HTMLElement>, clickedSquare: Square) => {
    event.preventDefault();
    event.stopPropagation();
    if (clickedSquare && ((clickedSquare.row !== selectedSquare?.row) || (clickedSquare.column !== selectedSquare?.column))) {
      selectSquare(clickedSquare);
    } else if (clickedSquare && selectedSquare && clickedSquare.row === selectedSquare.row && clickedSquare.column === selectedSquare.column) {
      unSelectSquare(clickedSquare)
    }
  }


  const getStyle = (row: number) => {
    return row % 2 === 0 ? styles.white : styles.black;
  };

  const squareHasPiece = (square: Square) => {
    return !!square.piece;
  }

  const isListedInPossibleMoves = (square: Square) => {
    return !!availableMoves.find(move => move.row === square.row && move.column === square.column)
  }

  const movePieceToAvailableSquare = (event: React.MouseEvent<HTMLElement>, clickedSquare: Square) => {
    event.preventDefault();

    const pieceToMove = selectedSquare?.piece;

    if (!pieceToMove || !isListedInPossibleMoves(clickedSquare)) {
      return; // Do nothing if there's no piece to move or the clicked square is not a possible move
    }
    movePiece(selectedSquare, clickedSquare)
  };

  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {board.map((outerSquares, outerId) => {
          return outerSquares.map((square, innerId) => {
            const key = `${square.column}${square.row}`; // Unique key for each square
            return (
              <div
                onClick={(e) => movePieceToAvailableSquare(e, square)}
                style={{ textAlign: 'center' }}
                className={`${styles.square} ${getStyle(outerId + innerId)}  ${isListedInPossibleMoves(square) && square.piece ? styles.canAttack : ''} ${square === selectedSquare ? styles.active : ''}`}
                key={key}
              >
                {squareHasPiece(square) ? (

                  <Image
                    onClick={(e) => handleClick(e, square)}
                    priority={true}
                    height={100}
                    width={100}
                    src={square.piece?.img!}
                    alt={`${square.piece?.color} ${square.piece?.name}`}
                  />
                ) : (
                  isListedInPossibleMoves(square) && !square.piece ? (

                    <div className={styles.recommended}></div>
                  ):
                  <div></div>
                )}
              </div>
            );
          });
        })}
      </div>
    </main>
  );
}


const mapStateToProps = (state: GameState) => ({
  board: state.board,
  selectedSquare: state.selectedSquare,
  availableMoves: state.availableMoves,
});

const mapDispatchToProps = {
  selectSquare,
  unSelectSquare,
  movePiece,
  startNewGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameV2); 