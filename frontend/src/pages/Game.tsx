import React, { useEffect, useState } from 'react'
import ChessBoard from '../components/ChessBoard'
import { useSocket } from '../../hooks/useSocket'
import { Chess } from 'chess.js';


export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over"

const Game = () => {

    const socket = useSocket()
    const [chess, setChess] = useState(new Chess())
    const [start, setStart] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [board, setBoard] = useState(chess.board())
    const [color, setColor] = useState("");

    useEffect(() => {

        if (!socket) {
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board())
                    setColor(message.payload.color)
                    setStart(true)
                    setWaiting(false)
                    break;
                case MOVE:
                    const move = message.payload
                    chess.move(move)
                    setBoard(chess.board())
                    break;
                case GAME_OVER:
                    console.log("Game over", message.winner)
                    break;
            }
        }
    }, [socket])

    if (!socket) return <div className='text-white flex justify-center items-center min-h-screen'>Connecting...........</div>

    return (
        <div className='text-white flex justify-center items-center min-h-screen'>
            <div className='max-w-screen-lg w-full'>
                <div className='grid lg:grid-cols-6 grid-cols-1 gap-4'>
                    <div className="col-span-4">
                        <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} color={color} />
                    </div>
                    <div className='flex flex-col items-center justify-center col-span-2'>
                        <div>
                            {
                                waiting && <div>Waiting for opponent</div>
                            }
                            {
                                !start && !waiting && <button className='py-4 px-8 text-xl font-bold bg-green-500 rounded-md' onClick={(e: any) => {
                                    socket.send(JSON.stringify({
                                        type: INIT_GAME
                                    }))
                                    setWaiting(true)
                                }}>Play</button>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Game