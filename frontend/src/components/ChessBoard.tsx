import { Square } from 'chess.js';
import { PieceSymbol } from 'chess.js';
import { Color } from 'chess.js';
import React, { useState } from 'react'
import { MOVE } from '../pages/Game';

const ChessBoard = ({ board, socket, setBoard, chess, color }: {
    chess: any;
    setBoard: any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
    color: string
}) => {
    const [from, setFrom] = useState<Square | null>(null)
    const [to, setTo] = useState<Square | null>(null)

    const transformedBoard = color === 'black' ? [...board].reverse().map(row => [...row].reverse()) : board;
    return (
        <div>
            {transformedBoard.map((row, i) => (
                <div key={i} className='flex'>
                    {row.map((square, j) => {
                        const stringRepresentation = color === 'black'
                            ? String.fromCharCode(104 - (j % 8)) + "" + (i + 1) as Square
                            : String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square
                        return <div onClick={() => {
                            if (!from) {
                                setFrom(stringRepresentation)
                            } else {
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
                            }
                        }} key={j} className={`w-20 h-20 ${(i + j) % 2 === 0 ? "bg-[#dad8d6]" : "bg-[#81b64c]"}`}>
                            <div className='h-full relative text-black flex justify-center items-center'>
                                {
                                    square ? <img src={`${square?.color === "b" ? "./b" : "./w"}${square?.type}.png`} alt="" /> : null
                                }
                                {i == 7 && <p className={`absolute bottom-0 right-[2px] font-semibold text-xl ${(i + j) % 2 === 0 ? "text-[#81b64c]" : "text-slate-700"}`}>{String.fromCharCode(97 + (j % 8))}</p>}
                                {j == 0 && <p className={`absolute top-0 left-[2px] font-semibold text-xl ${(i + j) % 2 === 0 ? "text-[#81b64c]" : "text-slate-700"}`}>{8 - i}</p>}
                            </div>

                        </div>
                    })}
                </div>
            ))}
        </div>
    )
}

export default ChessBoard