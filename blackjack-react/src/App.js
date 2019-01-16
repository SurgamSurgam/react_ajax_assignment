import React, { Component } from "react";
import { Menu } from "./Menu.js";
import { Hand } from "./Hand.js";
// import { Logic } from "./Logic.js";
import axios from "axios";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deckId: "",
      drawnAjaxCards: [],
      viewGame: false,
      errorMessage: false,
      gameOver: {
        won:false,
        lost: false
      },
      computerScore: 0,
      userScore: 0,
      userStays: false
    };
    this.endGame = this.endGame.bind(this);
  }

  getRandomDeck = () => {
    axios.get("https://deckofcardsapi.com/api/deck/new/").then(response => {
      this.setState({
        viewGame: true,
        deckId: response.data.deck_id,
      });
      this.shuffleDeck();
    })
    .catch(err => {
      return(
        <p>"error getting random deck"</p>
      )
    })
  };

  shuffleDeck = () => {
    let { deckId, errorMessage } = this.state;
    axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`).then(response => {
      this.setState({
        viewGame: true,
        deckId: response.data.deck_id
      });
      this.drawCards();
    })
    .catch(err => {
      this.setState({
        errorMessage: true
      })
    })
  }

  drawCards = () => {
    let { deckId, drawnAjaxCards } = this.state;
    axios
    .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(response => {
          this.setState({
            userScore: this.state.userScore + this.evaluateCards(response.data.cards),
            viewGame: true,
            drawnAjaxCards: [...drawnAjaxCards, ...response.data.cards]
          });
        })
    .catch(err => {
      this.setState({
        errorMessage: true
      })
    })
  };

  draw1 = () => {
    let { deckId, drawnAjaxCards } = this.state;
    axios
    .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(response => {
          this.setState({
            userScore: this.evaluateCards([...drawnAjaxCards, ...response.data.cards]),
            drawnAjaxCards: [...drawnAjaxCards, ...response.data.cards]
          });
        })
    .catch(err => {
      console.log("error drawing 1 card");
    })
  }

  evaluateCards = (cards) => {
    let runningCardCount = 0;
    let aceCount = 0;

    cards.forEach(card => {
      if (card.value === "KING" || card.value === "QUEEN" || card.value === "JACK") {
        runningCardCount += 10;
      } else if (card.value === "ACE") {
        aceCount ++;
        runningCardCount += 11;
      } else {
        runningCardCount += +card.value;
      }
    })
    
    while (aceCount > 0 && runningCardCount > 21) {
      runningCardCount -= 10;
      aceCount --;
    }

    return runningCardCount;
  }


  // addAceValue = (event) => {
  //   this.setState({
  //     userScore: this.state.userScore + (+event.target.value)
  //   })
  // }

  handleOtherPeopleDecks = (event) => {
    this.setState(
      {
        deckId: event.target.value
      }
    )
  }

  reStartGame = () => {
    this.setState({
      deckId: this.state.deckId,
      drawnAjaxCards: [],
      viewGame: false,
      errorMessage: false,
      gameOver: {
        won:false,
        lost: false
      },
      computerScore: 0,
      userScore: 0,
      userStays: false
    })
    this.shuffleDeck();
  }

  endGame = (decision) => {
    this.setState({
      gameOver: Object.assign(this.state.gameOver, {
        [decision]: true,
      }),
    })
  }

  handleComputerScore = (score) => {
    this.setState({
      computerScore: score
    })
  }


  handleUserStay = () => {
    this.setState({
      userStays: true
    })
  }


  render() {
    console.log(this.state);
    let { deckId, drawnAjaxCards, viewGame, errorMessage, gameOver, computerScore, userStays, userScore } = this.state;



    if (viewGame) {
      return (
        <React.Fragment>
          <Hand
            deckId={deckId}
            drawnAjaxCards={drawnAjaxCards}
            viewGame={viewGame}
            drawCards={this.drawCards}
            draw1={this.draw1}
            errorMessage={errorMessage}
            endGame={this.endGame}
            gameOver={gameOver}
            reStartGame={this.reStartGame}
            handleComputerScore={this.handleComputerScore}
            computerScore={computerScore}
            userStays={userStays}
            handleUserStay={this.handleUserStay}
            userScore={userScore}


          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <h1 className="title">Blackjack : 21</h1>
        <Menu
          deckId={deckId}
          drawnAjaxCards={drawnAjaxCards}
          viewGame={viewGame}
          getRandomDeck={this.getRandomDeck}
          drawCards={this.drawCards}
          handleOtherPeopleDecks={this.handleOtherPeopleDecks}
          errorMessage={errorMessage}
        />
      </React.Fragment>
    );
  }
}

export default App;
