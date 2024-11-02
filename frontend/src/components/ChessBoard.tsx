import { Square } from 'chess.js';
import { PieceSymbol } from 'chess.js';
import { Color } from 'chess.js';
import React, { useState } from 'react'
import { MOVE } from '../pages/Game';

const ChessBoard = ({ board, socket, setBoard, chess }: {
    chess: any;
    setBoard: any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) => {

    const [from, setFrom] = useState<Square | null>(null)
    const [to, setTo] = useState<Square | null>(null)
    return (
        <div>
            {board.map((row, i) => (
                <div key={i} className='flex'>
                    {row.map((square, j) => {
                        const stringRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square
                        return <div onClick={() => {
                            if (!from) {
                                setFrom(stringRepresentation)
                            } else {
                                // setTo(square?.square ?? null)
                                socket.send(JSON.stringify({
                                    type: MOVE,
                                    move: {
                                        from: from,
                                        to: stringRepresentation
                                    }
                                }))
                                setFrom(null)
                                chess.move({ from: from, to: stringRepresentation })
                                setBoard(chess.board())
                                console.log("move sent " + from + " " + to)
                            }
                        }} key={j} className={`w-20 h-20 ${(i + j) % 2 === 0 ? "bg-[#dad8d6]" : "bg-[#81b64c]"}`}>
                            <div className='h-full text-black flex justify-center items-center'>
                                {
                                    square ? <img src={`${square?.color === "b" ? "./b" : "./w"}${square?.type}.png`} alt="" /> : null
                                }
                            </div>

                        </div>
                    })}
                </div>
            ))}
        </div>
    )
}

export default ChessBoard