import React, { useState, useEffect } from "react";
import { Login } from "../../../account/LoginForm.js";
import { apiCall } from "../../Logic/apiCall";
import "../../Styles/Panel.css";
import { AccountPanel } from "../../../account/AccountPanel.js";
import { ControlPanel } from "./ControlPanel";
import { UploadUniversesPanel } from "./UploadUniversesPanel";

export const Panel = props => {
  const [user, setUser] = useState({ isAuthroze: false, email: "" });
  const [universes, setUniverses] = useState([]);

  useEffect(() => {
    identity(setUser);
  }, []);

  useEffect(() => {
    if (user.isAuthroze) {
      loadUniverses();
    }
  }, [user.isAuthroze]);

  const signOut = async () => {
    const response = await apiCall.post("/singOut");
    if (response.status == 200) {
      setUser({ isAuthroze: false, email: "" });
    }
  };

  const saveUniverse = async () => {
    const universeData = {
      rowCount: props.rowCount,
      columnCount: props.columnCount,
      universe: props.universe
    };
    const name = document.getElementById("universeName").value;
    const jsonData = JSON.stringify(universeData);
    const saveData = {
      name: name,
      data: jsonData
    };
    await apiCall.post("/universe", saveData);
    loadUniverses();
    document.getElementById("universeName").value = "";
  };

  const uploadUniverse = universe => {
    const obj = JSON.parse(universe);
    props.setRowCount(obj.rowCount);
    props.setColumnCount(obj.columnCount);
    props.setUniverse(obj.universe);
  };

  const loadUniverses = async () => {
    const response = await apiCall.get("/universes");
    if (response.status == 200) {
      setUniverses(response.data);
    }
  };

  return (
    <div className="panel">
      <ControlPanel
        universe={props.universe}
        rowCount={props.rowCount}
        setRowCount={props.setRowCount}
        columnCount={props.columnCount}
        setColumnCount={props.setColumnCount}
        handleNextStep={props.handleNextStep}
        setIsActiveGame={props.setIsActiveGame}
        isActiveGame={props.isActiveGame}
        setUniverse={props.setUniverse}
      />
      {user.isAuthroze ? (
        <>
          <SaveUniverse saveUniverse={saveUniverse} />
          <UploadUniversesPanel
            universes={universes}
            uploadUniverse={uploadUniverse}
          />
          <AccountPanel user={user} signOut={signOut} />
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

const SaveUniverse = props => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="save-universe">
      <button onClick={() => setIsOpen(!isOpen)}>Сохранить расположение</button>
      {isOpen ? (
        <div className="save-universe-panel">
          <div>Название</div>
          <input type="text" id="universeName" />
          <div>
            <button onClick={props.saveUniverse}>Сохранить</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const identity = async setUser => {
  const response = await apiCall.get("/identity");
  if (response.status === 200 && response.data.value !== null) {
    setUser({ isAuthroze: true, email: response.data.value });
  }
};
