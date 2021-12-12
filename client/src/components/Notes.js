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
        <Header setIsLogin={setIsLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CrearNota />} />
          <Route path="/edit/:id" element={<EditarNota />} />
        </Routes>
      </BrowserRouter>
    </header>
  );
}
