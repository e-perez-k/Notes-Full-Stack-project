import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

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
      <h3>Simple Notes Application</h3>
      <div className="Login">
        <h4>Login</h4>
        <form onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="password"
            id="login-password"
            placeholder="Password"
            required
            value={user.password}
            autoComplete="true"
            onChange={onChangeInput}
          />
          <Button variant="light" type="submit">
            Login
          </Button>
          <p>
            No tienes cuenta?
            <span> Regístrate ahora</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
      <div className="Register">
        <h4>Register</h4>
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            name="name"
            id="register-name"
            placeholder="User Name"
            required
            value={user.name}
            onChange={onChangeInput}
          />
          <input
            type="email"
            name="email"
            id="register-email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="password"
            id="register-password"
            placeholder="Password"
            required
            value={user.password}
            autoComplete="true"
            onChange={onChangeInput}
          />
          <Button variant="primary" type="submit">
            Register
          </Button>
          <p>
            Tienes cuenta?
            <span> Inicia sesión</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
    </section>
  );
}
