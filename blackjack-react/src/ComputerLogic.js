import React from "react";

export const ComputerLogic = (props) => {
  const { handleComputerScore, computerScore } = props;

  let setComputerScore = () => {
  handleComputerScore(Math.floor(Math.random() * (24 - 15) + 15));
}
  return (
    <React.Fragment>
      <h1>Computer Score: {computerScore}</h1>
       <button onClick={setComputerScore}>Deal Computer 🤖</button>
    </React.Fragment>
  )
}
