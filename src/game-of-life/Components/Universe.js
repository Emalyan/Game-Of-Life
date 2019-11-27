import React, { useState, useEffect, useRef } from "react";
import { nextGeneration } from "../Logic/Logic.js";
import "../GameOfLife.css"

export const Universe = props => {
  return (
    <div className="board-contaniner">
      {props.isActiveGame ? (
        <ActiveUniverse {...props} />
      ) : (
        <OneStepUniverse {...props} />
      )}
    </div>
  );
};

export const ActiveUniverse = props => {
  useInterval(() => {
    nextGeneration(props);
  }, 100);

  return <div>{<Columns {...props} />}</div>;
};

export const OneStepUniverse = props => {
  return <div>{<Columns {...props} />}</div>;
};

const Columns = props => {
  const columns = [];
  for (let i = 0; i < props.rowCount; i++) {
    if (props.universe[i] == undefined) {
      props.universe[i] = [];
    }
    columns[i] = (
      <Row
        key={Math.random()}
        x={i}
        columnCount={props.columnCount}
        state={props.universe[i]}
      />
    );
  }
  return columns;
};

const Row = props => {
  const cells = [];
  for (let i = 0; i < props.columnCount; i++) {
    cells[i] = (
      <Cell key={Math.random()} x={props.x} y={i} state={props.state} />
    );
  }

  return <div className="row">{cells}</div>;
};

const Cell = props => {
  const [isAlive, setIsAlive] = useState(props.state[props.y]);
  props.state[props.y] = isAlive;
  return (
    <div
      onClick={() => setIsAlive(!isAlive)}
      className={isAlive ? "cellContainerLive" : "cellContainerDead"}
    ></div>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
