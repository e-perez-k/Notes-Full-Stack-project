import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <header>
      <h4 className="titulo_header">SIMPLE NOTES APPLICATION</h4>
      <Container>
        <Row className="nav_Create_Logout">
          <Col></Col>
          <Col md="auto">
            <Link style={{ textDecoration: "none" }} to="/create">
              Crear Nota
            </Link>
          </Col>
          <Col xs={1}></Col>
          <Col md="auto">
            <Link
              style={{ textDecoration: "none" }}
              onClick={logoutSubmit}
              to="/"
            >
              Logout
            </Link>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </header>
  );
}
