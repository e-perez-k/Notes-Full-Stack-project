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
      <div className="nav">
        <img
          src="https://i.ibb.co/9sVgVdD/Mesa-de-trabajo-1.png"
          alt="Pos It icon"
          border="0"
        ></img>
        <h4 className="titulo_header">SIMPLE NOTES APPLICATION</h4>
      </div>
      <Container fluid>
        <Row className="nav_header">
          <Col></Col>
          <Col md="auto">
            <Link style={{ textDecoration: "none" }} to="/">
              Home
            </Link>
          </Col>

          <Col md="auto">
            <Link style={{ textDecoration: "none" }} to="/create">
              Create Note
            </Link>
          </Col>

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
