import React from "react";
import Header from "./notes/Header";
import Home from "./notes/Home";
import CrearNota from "./notes/CrearNota";
import EditarNota from "./notes/EditarNota";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function Notes({ setIsLogin }) {
  return (
    <header>
      <BrowserRouter>
        <div className="logueado">
          <Header setIsLogin={setIsLogin} />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <div>
            <Routes>
              <Route path="/create" element={<CrearNota />} />
            </Routes>
          </div>
          <div>
            <Routes>
              <Route path="/edit/:id" element={<EditarNota />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </header>
  );
}
