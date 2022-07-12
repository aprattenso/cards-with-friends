
import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const PlayerSelectionMade = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const round = game.round;
  const player = game.getPlayer(sessionId);

  const quitGame = () => {
    socket.emit(EVENTS.deleteLobby, game);
  }

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2>Round {game.rounds.length + 1} | {player.name}</h2>

        <hr></hr>
  
        <h2>{MESSAGES.player.responseSubmitted.success}</h2>
  
        <hr></hr>

        <p>Please wait...</p>

        <p>{MESSAGES.player.responseSubmitted.pleaseWait}</p>
  
        <h3><b><u>Submissions:</u></b></h3>

        {round.playersSessionIds.map(playerSessionId => {
          let player = game.getPlayer(playerSessionId);
          return (
            <p key={player?.name}>{player?.name}: {round.hasPlayerSelected(playerSessionId) ? "Yes" : "No"}</p>
          )
        })}

        <ExitLobbyButton
          text={"Quit Game"}
          type={"submit"}
          disabled={false} 
          onClick={quitGame}
        />

      </div>
    );
  } else {
    return (
      <div>Error on Player Selection Made</div>
    )
  }
}