/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { VIEWS } from "./data/constants/VIEWS";

import { Home } from "./views/Home";
import { HowToPlay } from "./views/info/GettingStarted";
import { MultiPlayerHome } from "./views/multiplayer/MultiplayerHome";
import { CreateMultiPlayerGame } from "./views/multiplayer/host/CreateMultiPlayerGame";
import { InviteParticipants } from "./views/multiplayer/host/InviteParticipants";
import { JoinLobby } from "./views/multiplayer/guest/JoinLobby";
import { WaitingForHost } from "./views/multiplayer/guest/WaitingForHost";
import { CreateSinglePlayerGame } from "./views/singlePlayer/CreateSinglePlayerGame";
import { FindingPlayers } from "./views/singlePlayer/FindingPlayers";
import { EVENTS } from "./data/constants/EVENTS";
import { PlayerTurn } from "./views/gameplay/player/PlayerTurn";
import { JudgeWaitingForPlayers } from "./views/gameplay/judge/JudgeWaitingForPlayers";
import { JudgeTurn } from "./views/gameplay/judge/JudgeTurn";
import { PlayerSelectionMade } from "./views/gameplay/player/PlayerSelectionMade";
import { PlayerWaitingForJudge } from "./views/gameplay/player/PlayerWaitingForJudge";
import { RoundResults } from "./views/gameplay/results/RoundResults";
import { GameResults } from "./views/gameplay/results/GameResults";
import { WaitingForNextRound } from "./views/gameplay/results/WaitingForNextRound";
import { WaitingForNextGame } from "./views/gameplay/results/WaitingForNextGame";
import socket from "./socket";
import { GameDataType } from "./data/types/ClassTypes";

export const App = (): JSX.Element => {
  const [view, setView] = useState("");
  const [game, setGame] = useState<GameDataType | null>(null);

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");

    if (sessionId) {
      socket.auth = { sessionId };
    }

    socket.connect();

    socket.on(EVENTS.server.newSession, (sessionId: string) => {
      sessionStorage.setItem("sessionId", sessionId);
      setView(VIEWS.home);
      setGame(null);
    });

    socket.on(EVENTS.server.updateView, (view: string) => {
      console.log(`View Updated ${view}`);
      setView(view);
    });

    socket.on(EVENTS.server.updateGame, (gameData: GameDataType | null) => {
      setGame(gameData);
    });

    socket.on(
      EVENTS.server.updateClient,
      (gameData: GameDataType | null, view: string) => {
        setGame(gameData);
        setView(view);
      }
    );
  }, []);

  const sessionId = sessionStorage.getItem("sessionId");

  if (sessionId) {
    if (view === VIEWS.home) {
      return (
        <Home
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.info.howToPlay) {
      return (
        <HowToPlay
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.multiPlayer.home) {
      return (
        <MultiPlayerHome
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.multiPlayer.host.createLobby) {
      return (
        <CreateMultiPlayerGame
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.multiPlayer.host.inviteParticipants) {
      return (
        <InviteParticipants
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.multiPlayer.guest.joinLobby) {
      return (
        <JoinLobby
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.multiPlayer.guest.waitingForHost) {
      return (
        <WaitingForHost
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.singlePlayer.createGame) {
      return (
        <CreateSinglePlayerGame
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.singlePlayer.findingPlayers) {
      return (
        <FindingPlayers
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.gameplay.player.turn) {
      return (
        <PlayerTurn
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.gameplay.player.selectionMade) {
      return (
        <PlayerSelectionMade
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.gameplay.player.waitingForJudge) {
      return (
        <PlayerWaitingForJudge
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.gameplay.judge.waitingforSelections) {
      return (
        <JudgeWaitingForPlayers
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.gameplay.judge.turn) {
      return (
        <JudgeTurn
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.gameplay.results.round) {
      return (
        <RoundResults
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.gameplay.results.game) {
      return (
        <GameResults
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.gameplay.results.waitingForNextRound) {
      return (
        <WaitingForNextRound
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.gameplay.results.waitingForNextGame) {
      return (
        <WaitingForNextGame
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
  }

  return <div></div>;
};
