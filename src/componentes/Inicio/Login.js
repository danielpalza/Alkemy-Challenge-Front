import Fetch from "../../services/Fetch";
import { useState } from "react";


export default function Login(p) {
  const [user, setUser] = useState({ email: "", password: "" });
 
  const handleLogin = () => {
    if (user.password.length > 0 && user.email.length > 0) {
      Fetch("POST", "/usuario/login", user, "", handleResponse);
    } else {
      alert("Debe completar todos los campos");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleResponse = (e) => {
    localStorage.setItem("token", e.response.token);
    if (e.status === "ok") {
      p.isLogin(true);
    }
    if(e.status==="Error"){
        alert("No se pudo iniciar sesion")
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="rounded w-screen h-screen md:w-auto md:h-auto bg-green-300 flex flex-col text-center p-8">
      <h1 className="text-3xl font-bold tracking-tight text-green-900 font-sans ">Login</h1>
        <input
          name="email"
          placeholder="Email..."
          onChange={handleChange}
          type="text"
          className="p-2  m-5 md:m-8"
        />
        <input
          name="password"
          placeholder="Contraseña..."
          onChange={handleChange}
          type="password"
          className="m-5 md:m-8 p-2"
        />
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => handleLogin()}
            className="bg-green-300 p-3 m-5 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
          >
            Iniciar sesion
          </button>
          
            <button onClick={()=>p.handleRender()} className="bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">
              Registrarse
            </button>
          
        </div>
      </div>
    </div>
  );
}
