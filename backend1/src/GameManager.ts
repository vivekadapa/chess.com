import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(ws: WebSocket) {
        this.users.push(ws);
        this.addHandler(ws);
    }

    removeUser(ws: WebSocket) {
        this.users = this.users.filter(user => user !== ws);
    }

    private addHandler(ws: WebSocket) {
        ws.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    //start game
                    const game = new Game(this.pendingUser, ws);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = ws;
                }
            }

            if (message.type === MOVE) {
                console.log("inside move")    
                const game = this.games.find(game => game.player1 === ws || game.player2 === ws);
                if (game) {
                    console.log("game found")
                    game.makeMove(ws, message.move);
                }
            }

        });
    }
}


