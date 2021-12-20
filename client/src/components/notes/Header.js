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
        <Row className="nav_header">
          <Col></Col>
          <Col md="auto">
            <Link style={{ textDecoration: "none" }} to="/">
              Home
            </Link>
          </Col>
          <Col></Col>
          <Col md="auto">
            <Link style={{ textDecoration: "none" }} to="/create">
              Create Note
            </Link>
          </Col>
          <Col></Col>
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
