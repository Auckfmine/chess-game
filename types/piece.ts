export enum PieceName {
    PAWN = 'PAWN',
    ROOK = 'ROOK',
    KNIGHT = 'KNIGHT',
    BISHOP = 'BISHOP',
    QUEEN = 'QUEEN',
    KING = 'KING',
}
export enum PieceColor {
    WHITE = 'WHITE',
    BLACK = 'BLACK',
}

export type Piece = {
    name: PieceName,
    color: PieceColor,
    img: string
}
