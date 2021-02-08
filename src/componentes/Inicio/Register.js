import Fetch from "../../services/Fetch";
import { useState } from "react";

export default function Register(p) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmacion: "",
  });
  let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

  const handleRegister = (e) => {
    if (regx.test(user.email)) {
      if (user.password == user.confirmacion) {
        if (user.password.length > 0) {
          Fetch("POST", "/usuario/createUser", user, "", handleResponse);
        } else {
          alert("Debe completar todos los campos");
        }
      } else {
        alert("Las contraseñas no son identicas");
      }
    } else {
      alert("Debe poner un email valido");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleResponse = (e) => {
    if (e.status === "ok") {
      alert("Usuario creado");
      p.handleRender();
    }
    if (e.status === "Error") {
      alert("El email ya esta registrado");
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="rounded w-screen h-screen md:w-auto md:h-auto bg-green-300 flex flex-col text-center p-10">
        <h1 className="text-3xl font-bold tracking-tight text-green-900 font-sans">
          Registro
        </h1>
        <input
          name="email"
          placeholder="Email..."
          onChange={handleChange}
          type="text"
          className="p-2 m-5 md:m-8"
        />
        <input
          name="password"
          placeholder="Contraseña..."
          onChange={handleChange}
          type="password"
          className="m-5 md:m-8 p-2"
        />
        <input
          name="confirmacion"
          placeholder="Confirme contraseña..."
          onChange={handleChange}
          type="password"
          className="m-5 sm:m-10 p-2"
        />
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => handleRegister()}
            className="bg-green-300 p-3 m-5 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
          >
            Registrarse
          </button>

          <button
            onClick={() => p.handleRender()}
            className="bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
          >
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
}
