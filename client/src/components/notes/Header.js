import React from "react";
import { Link } from "react-router-dom";

export default function Header({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <header>
      {/* <div className="logo"> */}
      <h1>
        <Link to="/">Mis Notas</Link>
      </h1>
      {/* </div> */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Crear Nota</Link>
        </li>
        <li onClick={logoutSubmit}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </header>
  );
}
