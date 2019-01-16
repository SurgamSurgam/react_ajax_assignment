import React from "react";
import { Logic } from "./Logic.js";
import { ComputerLogic } from "./ComputerLogic";

export const Hand = props => {
  const { deckId, drawnAjaxCards, drawCards, draw1, endGame, gameOver, reStartGame, handleComputerScore, computerScore, userStays, handleUserStay, userScore } = props;

  let allCards = drawnAjaxCards.map(card => {
    return <img src={card["image"]} alt="" />;
  });


  if (gameOver.won) {
    return (
      <React.Fragment>
        {allCards}
        <h3>Computer: {computerScore} User: {userScore}</h3>
        <h1 className="gameOverh1">You Win!!!</h1>

        <h3>Thanks for playing! - if you wish to play again click below :)</h3>
        <button onClick={reStartGame}>Play Again</button>
      </React.Fragment>
    );
  }

  if (gameOver.lost) {
    return (
      <React.Fragment>
        {allCards}
        <h3>Computer: {computerScore} User: {userScore}</h3>
        <h1 className="gameOverh1">Game Over - You Lose :(</h1>
        <h3>Thanks for playing! - if you wish to play again click below :)</h3>
        <button onClick={reStartGame}>Play Again</button>
      </React.Fragment>
    );
  }

  let button;
  let hideStay = <Logic drawnAjaxCards={drawnAjaxCards} endGame={endGame} computerScore={computerScore} userStays={userStays} />
  let hideHitMe;

  // let showAceValueChoices =
  // <div>
  //   <button onClick={addAceValue} value='1'>1</button>
  //   <button onClick={addAceValue} value='10'>10</button>
  // </div>



  if (computerScore) {
    button = <button onClick={handleUserStay}>STAY 😎</button>
    hideHitMe =  <button onClick={draw1}>Hit Me! 💥</button>
    hideStay = <Logic drawnAjaxCards={drawnAjaxCards} endGame={endGame} computerScore={computerScore} userStays={userStays} />
  } else if (!computerScore){
    hideHitMe = ''
  }

  if (userStays) {
    hideHitMe = ''
    hideStay = ''
  }

  return (
    <React.Fragment>
      <h3>Deck ID: {deckId}</h3>
      <Logic drawnAjaxCards={drawnAjaxCards} endGame={endGame} computerScore={computerScore} userStays={userStays} userScore={userScore}/>

      <br />
      {allCards}
      <br />
      < ComputerLogic handleComputerScore={handleComputerScore} computerScore={computerScore}/>
      {hideHitMe}
      {button}
    </React.Fragment>
  );
};
