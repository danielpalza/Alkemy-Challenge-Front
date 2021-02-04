import Fetch from "../services/Fetch";
import { Redirect } from "react-router-dom";
import { useState } from "react";

export default function Login(p) {
    
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
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
    <div>
      <form className="bg-green-300 flex justify-around p-4">
        <input
          name="email"
          placeholder="Email..."
          onChange={handleChange}
          type="text"
        />
        <input
          name="password"
          placeholder="Contraseña..."
          onChange={handleChange}
          type="password"
        />
        <input type="button" onClick={handleSubmit} value="Enviar" />
      </form>
    </div>
  );
}
