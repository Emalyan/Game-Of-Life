import React, { useState } from "react";

export const AccountPanel = props => {
  const [isOpen, setIdOpen] = useState(false);
  return (
    <div className="account-setting">
      <button className="open-setting" onClick={() => setIdOpen(!isOpen)}>
        {props.user.email}
      </button>
      {isOpen ? (
        <div className="account-panel">
          <button onClick={props.signOut}>Выйти</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
