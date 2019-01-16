import React from "react";

export const Menu = props => {
  const { deckId, drawnAjaxCards, getRandomDeck, drawCards, handleOtherPeopleDecks, errorMessage } = props;

  return (
    <React.Fragment>
      <button onClick={getRandomDeck}>Play Game!</button>
      <br />
      Input Existing Deck
      <input onChange={handleOtherPeopleDecks} type="text"  value={deckId}/>
      <button onClick={drawCards}>Draw</button>
      <h3>{deckId}</h3>
      { errorMessage ? <h4>"Please enter a valid existing deck"</h4> : ''}
      <br/>

    </React.Fragment>
  );
};
