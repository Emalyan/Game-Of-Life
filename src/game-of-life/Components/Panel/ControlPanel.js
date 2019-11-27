import React from "react";
import { nextGeneration } from "../../Logic/Logic";

export const ControlPanel = props => {
  const handleRowChange = event => {
    props.setRowCount(event.target.value);
  };

  const handleColumnChange = event => {
    props.setColumnCount(event.target.value);
  };

  const handleActiveGame = () => {
    props.setIsActiveGame(!props.isActiveGame);
  };

  const clean = () => {
    props.setUniverse([]);
    props.setIsActiveGame(false);
  };

  const handleNextStep = () => {
    const data = {
      universe: props.universe,
      setUniverse: props.setUniverse,
      rowCount: props.rowCount,
      columnCount: props.columnCount
    };
    nextGeneration(data);
  };

  return (
    <>
      <div className="headerInnerContainer">
        <div className="inputSize">
          <span>Rows:</span>
          <input
            type="text"
            value={props.rowCount}
            onChange={handleRowChange}
          />
        </div>
        <div className="inputSize">
          <span>Columns:</span>
          <input
            type="text"
            value={props.columnCount}
            onChange={handleColumnChange}
          />
        </div>
      </div>
      <div className="game-control-buttons">
        <button onClick={handleActiveGame}>
          {props.isActiveGame ? "stop" : "start"}
        </button>
        <button onClick={handleNextStep}>One step</button>
        <button onClick={clean}>Clean</button>
      </div>
    </>
  );
};
