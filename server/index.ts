import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "../client/src/data/classes/Game"

const httpServer = createServer();
const io = new Server(httpServer, {});

const EVENTS = {
  joinRoom: "join-room",
  updateGameState: "update-game-state",
}

const games = {};

io.on("connection", (socket) => {

  console.log(`Client ${socket.id} connected`);

  socket.on(EVENTS.joinRoom, (room: string) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined Room ${room}`)
  })

  socket.on(EVENTS.updateGameState, (game: Game) => {
    socket.to(game.lobbyId).emit(JSON.stringify(game));
  })

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

httpServer.listen(4000, () => {
  console.log("Listening on PORT: " + 4000);
});