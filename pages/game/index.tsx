import Image from 'next/image';
import styles from './game.module.css'
import { useMemo } from "react";

type Piece = {
  name:'PAWN'|'ROOK'|'KNIGHT'|'BISHOP'|'QUEEN'|'KING',
  color:'WHITE'|'BLACK',
  img:string
}

type Square = {
  column: string;
  row: number;
  piece?:Piece;
};

const pieces : Record<string, Piece> = {
  PAWN_W: {name:"PAWN",color:"WHITE",img:`pawn_white.svg`},
  PAWN_B: {name:"PAWN",color:"BLACK",img:`pawn_black.svg`},
  ROOK_W: {name:"ROOK",color:"WHITE",img:`rook_white.svg`},
  ROOK_B: {name:"ROOK",color:"BLACK",img:`rook_black.svg`},
  KNIGHT_W: {name:"KNIGHT",color:"WHITE",img:`knight_white.svg`},
  KNIGHT_B: {name:"KNIGHT",color:"BLACK",img:`knight_black.svg`},
  BISHOP_W: {name:"BISHOP",color:"WHITE",img:`bishop_white.svg`},
  BISHOP_B: {name:"BISHOP",color:"BLACK",img:`bishop_black.svg`},
  QUEEN_W: {name:"QUEEN",color:"WHITE",img:`queen_white.svg`},
  QUEEN_B: {name:"QUEEN",color:"BLACK",img:`queen_black.svg`}, 
  KING_W: {name:"KING",color:"WHITE",img:`king_white.svg`},
  KING_B: {name:"KING",color:"BLACK",img:`king_black.svg`}
}

export default function Game(){

  const insertPieceIntoSquare = ( square:Square,piece:Piece ) => {
     square.piece = piece
  }

  

  const squares = useMemo(() => {
    const board:Square[][] = [...Array(8)].map((_, i)=> Array(8).fill({column:String.fromCharCode('A'.charCodeAt(0)+i),row:9-(i+1)}))
    const setUpInitialPieces = (squares:Square[][]) => {
      const whiteInitialSquares = squares.filter(subSquares => subSquares.some(square => [1,   2].includes(square.row)));
      const blackInitialSquares = squares.filter(subSquares => subSquares.some(square => [7,   8].includes(square.row)));
  
      for (let row of whiteInitialSquares){
        for (let column of row){
          const piece = pieces['PAWN_W']
          insertPieceIntoSquare(column,piece)
        }
      }
      for (let row of blackInitialSquares){
        for (let column of row){
          const piece = pieces['PAWN_B']
          insertPieceIntoSquare(column,piece)
        }
      }      
    }
    setUpInitialPieces(board);
    return board;
  }, []);

  const getStyle = (row: number) => {
    return row %  2 ===  0 ? styles.white : styles.black;
  };

  const squareHasPiece = (square:Square) => {
    return !!square.piece;
  }

  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {squares.map((outerSquares, outerId) => {
          return outerSquares.map((square, innerId) => {
            return (
              <div
                style={{ textAlign: 'center' }}
                className={`${styles.square} ${getStyle(outerId + innerId)}`}
                key={innerId}
              >
               {squareHasPiece(square)? <Image priority={true} height={100} width={100} src={square.piece?.img || ''} alt="Chess Piece" />:<div></div>}
                {/* {square.row} - {square.column} */}
              </div>
            );
          });
        })}
      </div>
    </main>
  );
}