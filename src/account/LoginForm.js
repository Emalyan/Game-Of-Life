import { apiCall } from "../game-of-life/Logic/apiCall";
import React, { useState } from "react";
import "./authentication.css";

export const Login = props => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const singInHandler = () => singIn(props.setUser);

  return (
    <div className="login-button">
      <button onClick={() => setIsOpenForm(!isOpenForm)}>
        {isOpenForm ? "Скрыть" : "Войти"}
      </button>
      {isOpenForm ? <LoginForm singIn={singInHandler} /> : <></>}
    </div>
  );
};

const LoginForm = props => {
  return (
    <div className="login-form">
      <label>Введите email</label>
      <br />
      <input type="email" id="email" /> <br />
      <br />
      <label>Введите пароль</label>
      <br />
      <input type="password" id="password" />
      <br />
      <br />
      <input
        type="submit"
        id="submitLogin"
        value="Войти"
        onClick={props.singIn}
      />
    </div>
  );
};

const singIn = async setUser => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = {
    email: email,
    password: password
  };
  const response = await apiCall.post("/signin", data);
  if (response.status === 200 && response.data.value !== null) {
    setUser({ isAuthroze: true, email: response.data.value });
  }
};
