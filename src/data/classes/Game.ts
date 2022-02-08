import { promptCards } from "../cards/promptCards";
import { responseCards } from "../cards/responseCards";
import { RoundProps } from "../types/RoundProps";
import { Player } from "./Player";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";
import { Round } from "./Round";

const CARDS_PER_PLAYER = 3;

export class Game {
  round: Round | null;
  rounds: Round[];
  players: Player[];
  promptCards: PromptCard[];
  responseCards: ResponseCard[];

  constructor() {
    this.round = null;
    this.rounds = [];
    this.players = [];
    this.promptCards = [...promptCards];
    this.responseCards = [...responseCards];
  }
  
  initializeGame(names: string[]): void {
    this.createPlayers(names);
    this.dealCardsToPlayers();
    this.createNewRound();
  }
  
  createPlayers(names: string[]): void {
    names.forEach(name => {
      this.players.push(new Player(name));
    });
  }
  
  dealCardsToPlayers() {
    this.players.forEach((player) => {
      const newCard = this.responseCards.pop()
      while (player.cards.length < CARDS_PER_PLAYER && 
              newCard instanceof ResponseCard) {
        player.drawCard(newCard);
      }
    });
  }
  
  createNewRound() {
    const props: RoundProps = {
      players: this.getNonJudgePlayers(),
      judge: this.getJudgePlayer(),
      promptCard: this.promptCards.pop()
    };
    
    this.round = new Round(props);
    this.rounds.push(this.round);
  }

 
  getPlayerById(id: number): Player | undefined {
    return this.players.find(player => player.id === id);
  }

  getJudgePlayer(): Player {
    return this.players[this.rounds.length];
  }

  getNonJudgePlayers(): Player[] {
    return this.players.filter(player => player !== this.players[this.rounds.length])
  }
}