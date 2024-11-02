import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";


export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    public startTime: Date;
    public moves: string[];

    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.moves = []
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }))
    }

    public makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }) {
        console.log(this.board.moves.length)
        if (this.moveCount % 2 === 0 && socket === this.player2) {
            console.log("not your turn")
            return;
        }
        if (this.moveCount % 2 === 1 && socket === this.player1) {
            console.log("not your turn")
            return;
        }

        try {
            this.moves.push(JSON.stringify(move))
        } catch (error) {
            console.log(error)
            return;
        }

        console.log("move success")
        if (this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                winner: this.board.turn() === "w" ? "black" : "white"
            }));
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                winner: this.board.turn() === "w" ? "black" : "white"
            }));
            return;
        }
        console.log("before emit")
        if (this.moveCount % 2 === 0) {
            console.log("emit to player 2")
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        else {
            console.log("emit to player 1")
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }

        this.moveCount++;
    }

}
