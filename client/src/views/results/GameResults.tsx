import { SubmitButton } from "../../components/Buttons/Submit";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PromptCard } from "../../components/Cards/PromptCard";
import { RoundResultCardStyle } from "../../components/Containers/PlayersHand";
import { ResultsTable } from "../../components/ResultsTable";
import { VIEWS } from "../../data/types/VIEWS";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const RoundResults = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const round = game.round;
  const winner = game.getRoundWinner()
  const winningCard = game.round?.winningCard ? game.round?.winningCard : undefined;
  const player = game.getPlayer(sessionId)

  const startNextRound = () => {
    game.setView(sessionId, VIEWS.results.waitingForNextRound);
    setGame(game.clone());
    socket.emit(EVENTS.startNextRound, game);
  }

  if (round && winner && winningCard) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2>Round {game.rounds.length} | {player?.name}</h2>

        <hr></hr>

        <h2>Final Results</h2>
  
        <h1>{ winner.name } is the Winner!</h1>
  
        <div style={RoundResultCardStyle}>

          <PromptCard
            text={round.promptCard.text}
          />

          <ResponseCard
            player={winner}
            card={winningCard}
            game={game}
            setGame={setGame}
            sessionId={sessionId}
          />

        </div>
  
        <div style={{textAlign: "center", marginTop: 10}}>
          
          <ResultsTable
            game={game}
            setGame={setGame}
            socket={socket}
            sessionId={sessionId}
          />

        </div>
  
        <SubmitButton
          onClick={() => startNextRound()}
          type="button"
          text="Next Round"
          disabled={false}
        />
      </div>
    )
  } else {
    return (
      <div>Error</div>
    )
  }

}