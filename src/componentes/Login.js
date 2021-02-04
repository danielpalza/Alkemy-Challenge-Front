import Fetch from "../services/Fetch";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Login(p) {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    Fetch("POST", "/usuario/login", user, "", handleResponse);
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleResponse = (e) => {
    localStorage.setItem("token", e.response.token);
    if (e.status === "ok") {
      p.isLogin(true);
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <div className="flex justify-center h-screen items-center">
            <form className="rounded w-1/4 bg-green-300 flex flex-col p-10">
              <input
                name="email"
                placeholder="Email..."
                onChange={handleChange}
                type="text"
                className="p-2  m-10"
              />
              <input
                name="password"
                placeholder="Contraseña..."
                onChange={handleChange}
                type="password"
                className="m-10 p-2"
              />
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={handleLogin}
                  className="bg-green-300 p-3 m-5 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
                >
                  Enviar
                </button>
                <Link to="/register">
                  <button className="bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">
                    Registrarse
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </Route>
        <Route path="/register">
          <h1>Registro</h1>
        </Route>
      </Switch>
    </Router>
  );
}
