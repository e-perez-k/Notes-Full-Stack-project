import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import Notes from "./components/Notes";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  // TODO Establecer otro estado para el input registro, para que no escriba simultaneamente en los dos inputs

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get("http://localhost:5000/users/verify", {
          headers: { Authorization: token },
        });
        console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin(); // TODO ¿Igual no hace falta? Si quito esta función se desloguea
  }, []);

  return (
    <div>
      {isLogin ? (
        <Notes setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
