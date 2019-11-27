import React, { useState } from "react";

export const UploadUniversesPanel = props => {
  const [state, setState] = useState(false);

  return (
    <>
      <div className="upload-universes">
        <button onClick={() => setState(!state)}>Загрузить расположение</button>
        {state ? (
          <div className="universes-panel">
            <ul>
              {props.universes.map(element => {
                return (
                  <li
                    key={element.index}
                    className=""
                    onClick={() => props.uploadUniverse(element.data)}
                  >
                    {element.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
