import Fetch from "../../services/Fetch";
import { useState } from "react";


export default function Register(p) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmacion: "",
  });
 
  const handleRegister = (e) => {
      if(user.password==user.confirmacion ){
        if(user.password.length>0 && user.email.length>0)  
        {
            Fetch("POST", "/usuario/createUser", user, "", handleResponse);
        }
        else{
            alert("Debe completar todos los campos")
        }
      }else{
          alert("Las contraseñas no son identicas")
      }
    
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleResponse = (e) => {
   console.log("register response: ",e )
    if (e.status === "ok") {
        alert("Usuario creado")
        p.handleRender()
              
    }
    if(e.status==="Error"){
        alert("El email ya esta registrado")
    }
  };

  return (
      
    <div className="flex justify-center h-screen items-center">
      <div className="rounded w-1/4 bg-green-300 flex flex-col p-10">
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
        <input
          name="confirmacion"
          placeholder="Confirme contraseña..."
          onChange={handleChange}
          type="password"
          className="m-10 p-2"
        />
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={()=>handleRegister()}
            className="bg-green-300 p-3 m-5 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
          >
            Registrarse
          </button>
         
            <button onClick={()=>p.handleRender()} className="bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">
              Iniciar sesion
            </button>
         
        </div>
      </div>
    </div>
  );
}
