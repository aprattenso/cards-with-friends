export const EVENTS = {
  // Events triggered by Client
  client: {
    updateView: "updateViewOnServer",
    multiPlayer: {
      createLobby: "createLobby",
      joinLobby: "joinLobby",
      startFirstRound: "startFirstRound",
      playerSelection: "playerSelection",
      judgeSelection: "judgeSelection",
      startNextRound: "startNextRound",
      startNextGame: "startNextGame",
    },
    singlePlayer: {
      createGame: "createSinglePlayerGame",
      startGame: "startSinglePlayerGame",
    },
    
    deleteLobby: "deleteLobby",
    exitLobby: "exitLobby",

    resetAllClients: "resetAllClients",
    resetClient: "resetClient",
    deleteGameFromStore: "deleteGameFromStore",
  },
  
  // Events triggered on Server
  server: {
    newSession: "newSession",
    existingSession: "existingSession",
    updateView: "updateViewOnClient",
    updateGame: "updateGameOnClient",
    updateClient: "updateViewAndGameOnClient",
    invalidLobbyId: "invalidLobbyId",
  },
}