import React from "react";

export const Logic = props => {
  const { drawnAjaxCards, endGame, computerScore, userStays, userScore } = props;

  function isgameOver() {
    if (userScore > 21) {
      return endGame('lost');
    } else if (userScore === 21) {
      return endGame('won');
    } else if (computerScore === 21) {
      return endGame('lost');
    } else if (computerScore > 21) {
      return endGame('won');
    }
  }

  function checkingForUserStays() {
    if (userStays) {
      if (computerScore <= 21 && computerScore > userScore) {
        return endGame('lost');
      } else if (computerScore === 21) {
        return endGame('lost');
      } else if ( computerScore > 21 && userScore <= 21) {
        return endGame('won');
      }
    }
  }


  // let aceDecision = drawnAjaxCards.map(card => {
  //   if (card.value === "ACE") {
  //     return (
  //       <React.Fragment>
  //         <button onClick={()=>{return userScore+= 1}}>1</button>
  //         <button onClick={()=>{return userScore+= 10}}>10</button>
  //       </React.Fragment>
  //     )
  //   }
  // })

  //
  // let aceValue = () => {
  //   return (
  //     <React.Fragment>
  //       <button onClick={()=> userScore+= 1}>1</button>
  //       <button onClick={()=> userScore+= 10}>10</button>
  //     </React.Fragment>
  //   )
  // }

  return (
    <React.Fragment>
    <h1> Your Total: {userScore}</h1>
      <h3>{isgameOver()}</h3>
      <h3>{checkingForUserStays()}</h3>
      {/* <p>{aceValue}</p> */}
    </React.Fragment>
  )
}
