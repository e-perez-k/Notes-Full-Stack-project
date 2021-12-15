import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.mensaje);
    } catch (err) {
      err.response.data.mensaje && setErr(err.response.data.mensaje);
    }
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

  return (
    <section>
      <h3 className="titulo_header">Simple Notes Application</h3>
      <div className="login">
        <h4>Login</h4>
        {/* <Container> */}
        <Form onSubmit={loginSubmit}>
          <Form.Control
            className="w-50"
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInput}
          />
          <Form.Control
            className="w-50"
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

          <h3>{err}</h3>
        </Form>
        {/* </Container> */}
      </div>

      <div className="register">
        <p>No tienes cuenta? Regístrate ahora</p>

        <form onSubmit={registerSubmit}>
          <Form.Control
            className="w-50"
            type="text"
            name="name"
            id="register-name"
            placeholder="User Name"
            required
            value={user.name}
            onChange={onChangeInput}
          />
          <Form.Control
            className="w-50"
            type="email"
            name="email"
            id="register-email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInput}
          />
          <Form.Control
            className="w-50"
            type="password"
            name="password"
            id="register-password"
            placeholder="Password"
            required
            value={user.password}
            autoComplete="true"
            onChange={onChangeInput}
          />
          <Button variant="primary" size="sm" type="submit">
            Register
          </Button>

          <h3>{err}</h3>
        </form>
      </div>
    </section>
  );
}
