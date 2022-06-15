/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Game } from "./data/classes/Game";
import { VIEWS } from "./data/types/VIEWS";

import { Home } from "./views/Home";
import { GettingStarted } from "./views/info/GettingStarted";
import { CreateLobby } from "./views/host/CreateLobby";
import { InviteParticipants } from "./views/host/InviteParticipants";
import { JoinLobby } from "./views/guest/JoinLobby";
import { WaitingForHost } from "./views/guest/WaitingForHost";
import { EVENTS } from "./data/constants/socketEvents";
import { Player } from "./data/classes/Player";
import { PlayerTurn } from "./views/player/PlayerTurn";
import { JudgeWaitingForPlayers } from "./views/judge/JudgeWaitingForPlayers";
import { GameDataType } from "./data/types/ClassTypes";
import { JudgeTurn } from "./views/judge/JudgeTurn";
import { PlayerSelectionMade } from "./views/player/PlayerSelectionMade";
import { PlayerWaitingForJudge } from "./views/player/PlayerWaitingForJudge";
import { RoundResults } from "./views/results/RoundResults";
import { WaitingForNextRound } from "./views/results/WaitingForNextRound";
import { WaitingForNextGame } from "./views/results/WaitingForNextGame";
import socket from "./socket";

export const App = (): JSX.Element => {
  
  const [game, setGame] = useState(new Game()); 
  
  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");

    if (sessionId) {
      socket.auth = { sessionId };
    }

    socket.connect();

    socket.on(EVENTS.existingSession, (game: GameDataType) => {
      console.log(game)
      setGame(new Game(game));
    })

    socket.on(EVENTS.newSession, (sessionId: string) => {
      sessionStorage.setItem("sessionId", sessionId);
      game.addPlayer(new Player(socket.id));
      socket.emit(EVENTS.addGameToStore, game);
      setGame(game.clone())
    })
  
    socket.on(EVENTS.updateClient, (gameData: GameDataType) => {
      setGame(new Game(gameData));
    })
  }, [])

  if (game.currentPlayerView(socket.id) === VIEWS.home) {
    socket.emit(EVENTS.updateView, VIEWS.home);
    
    return (
      <Home
        game={game}
        setGame={setGame}
        socket={socket}
      />
      )
    }
    
    if (game.currentPlayerView(socket.id) === VIEWS.gettingStarted) {
      socket.emit(EVENTS.updateView, VIEWS.gettingStarted);
      
      return(
        <GettingStarted
          game={game}
          setGame={setGame}
          socket={socket}
        />
      )
    }
      
    if (game.currentPlayerView(socket.id) === VIEWS.host.createLobby) {
      socket.emit(EVENTS.updateView, VIEWS.host.createLobby);

      return (
        <CreateLobby
          game={game}
          setGame={setGame}
          socket={socket}
        />
      );
    }

  if (game.currentPlayerView(socket.id) === VIEWS.host.inviteParticipants) {
    socket.emit(EVENTS.updateView, VIEWS.host.inviteParticipants);

    return (
      <InviteParticipants
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.guest.joinLobby) {
    socket.emit(EVENTS.updateView, VIEWS.guest.joinLobby);

    return (
      <JoinLobby
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.guest.waitingForHost) {
    socket.emit(EVENTS.updateView, VIEWS.guest.waitingForHost)

    return (
      <WaitingForHost
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.player.turn) {
    socket.emit(EVENTS.updateView, VIEWS.player.turn)

    return (
      <PlayerTurn
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.player.selectionMade) {
    socket.emit(EVENTS.updateView, VIEWS.player.selectionMade)

    return (
      <PlayerSelectionMade
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.player.waitingForJudge) {
    socket.emit(EVENTS.updateView, VIEWS.player.waitingForJudge)

    return (
      <PlayerWaitingForJudge
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.judge.waitingforSelections) {
    socket.emit(EVENTS.updateView, VIEWS.judge.waitingforSelections)

    return (
      <JudgeWaitingForPlayers
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.judge.turn) {
    socket.emit(EVENTS.updateView, VIEWS.judge.turn)

    return (
      <JudgeTurn
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.results.round) {
    socket.emit(EVENTS.updateView, VIEWS.results.round)

    return (
      <RoundResults
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.results.waitingForNextRound) {
    socket.emit(EVENTS.updateView, VIEWS.results.waitingForNextRound)

    return (
      <WaitingForNextRound
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.results.waitingForNextGame) {
    socket.emit(EVENTS.updateView, VIEWS.results.waitingForNextGame)

    return (
      <WaitingForNextGame
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  return (
    <div>Error: No View on App</div>
  )
}
