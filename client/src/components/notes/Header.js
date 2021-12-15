import React from "react";
import { Link } from "react-router-dom";

export default function Header({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <header>
      <h3>
        {/* <Link to="/">Simple Notes Application</Link> */}
        Simple Notes Application
      </h3>
      <ul>
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
