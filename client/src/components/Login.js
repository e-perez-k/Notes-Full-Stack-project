import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    name2: "",
    email2: "",
    password2: "",
  }); // TODO Establecer otro estado para el input registro para que no escriba simultaneamente en los dos inputs

  const [err, setErr] = useState("");

  const [registrar, setRegistrar] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.mensaje && setErr(err.response.data.mensaje);
    }
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name2,
        email: user.email2,
        password: user.password2,
      });
      setUser({ name2: "", email2: "", password2: "" });
      /* setErr(res.data.mensaje); */
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.mensaje && setErr(err.response.data.mensaje);
    }
  };

  return (
    <section>
      <BrowserRouter>
        <h4 className="titulo_header">SIMPLE NOTES APPLICATION</h4>
        <div className="login">
          <h4>Login</h4>
          <Container>
            <Row>
              <Col></Col>
              <Col xs={5}>
                <Form onSubmit={loginSubmit}>
                  <Form.Control
                    type="email"
                    name="email"
                    id="login-email"
                    placeholder="Email"
                    required
                    value={user.email}
                    onChange={onChangeInput}
                  />
                  <Form.Control
                    type="password"
                    name="password"
                    id="login-password"
                    placeholder="Password"
                    required
                    value={user.password}
                    autoComplete="true"
                    onChange={onChangeInput}
                  />
                  <Button variant="outline-secondary" size="sm" type="submit">
                    Login
                  </Button>
                </Form>
              </Col>
              <Col></Col>
              <h3>{err}</h3>
            </Row>
          </Container>
        </div>

        <div className="register">
          <p>
            No tienes cuenta?{" "}
            <Link
              style={{ textDecoration: "none" }}
              to=""
              onClick={() => setRegistrar(true)}
            >
              Regístrate ahora
            </Link>
          </p>
          {registrar ? (
            <Container>
              <Row>
                <Col></Col>
                <Col xs={5}>
                  <Form onSubmit={registerSubmit}>
                    <Form.Control
                      type="text"
                      name="name2"
                      id="register-name"
                      placeholder="User Name"
                      required
                      value={user.name2}
                      onChange={onChangeInput}
                    />
                    <Form.Control
                      type="email"
                      name="email2"
                      id="register-email"
                      placeholder="Email"
                      required
                      value={user.email2}
                      onChange={onChangeInput}
                    />
                    <Form.Control
                      type="password"
                      name="password2"
                      id="register-password"
                      placeholder="Password"
                      required
                      value={user.password2}
                      autoComplete="true"
                      onChange={onChangeInput}
                    />
                    <Button variant="primary" size="sm" type="submit">
                      Register
                    </Button>
                  </Form>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          ) : (
            <p></p>
          )}
        </div>
      </BrowserRouter>
      <footer>MERN academic project after 3 months programming</footer>
    </section>
  );
}
