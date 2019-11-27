import React, { useState } from "react";
import "./GameOfLife.css";
import { Universe } from "./Components/Universe.js";
import { Panel } from "./Components/Panel/Panel.js";

export const GameOfLife = () => {
  const [rowCount, setRowCount] = useState(20);
  const [columnCount, setColumnCount] = useState(20);
  const [isActiveGame, setIsActiveGame] = useState(false);
  const [universe, setUniverse] = useState([]);

  return (
    <div className="contanier">
      <Panel
        universe={universe}
        setUniverse={setUniverse}
        rowCount={rowCount}
        setRowCount={setRowCount}
        columnCount={columnCount}
        setColumnCount={setColumnCount}
        isActiveGame={isActiveGame}
        setIsActiveGame={setIsActiveGame}
      />
      <Universe
        isActiveGame={isActiveGame}
        universe={universe}
        rowCount={rowCount}
        columnCount={columnCount}
        setUniverse={setUniverse}
      />
    </div>
  );
};
