import Fetch from "../services/Fetch";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Add() {
  const [operacion, setOperacion] = useState({
    tipo: "Ingreso",
    concepto: "",
    monto: "",
    fecha: "",
  });
  const [completed, setCompleted] = useState(false);

  const handleAdd = () => {
    if (Object.values(operacion).every((a) => a.length > 0)) {
      Fetch(
        "POST",
        "/operacion/createOperacion",
        { ...operacion, monto: parseInt(operacion.monto) },
        localStorage.getItem("token"),
        handleResponse
      );
    } else {
      alert("Debe completar todos los campos");
    }
  };

  const handleResponse = (e) => {
    if (e.status == "ok") {
      alert("Operacion creada");
      setCompleted(true)
      
    }
    if (e.status == "Error") {
      alert("No se pudo crear la operacion");
    }
  };

  const handleChange = (e) => {
    setOperacion({ ...operacion, [e.target.name]: e.target.value });
  };
  console.log("operacion: ", operacion)
  return (
    <div className="flex justify-center h-2/4 items-center">
      <div className="m-5 rounded w-1/4 bg-green-300 flex flex-col p-5 text-center font-sans">
        <h2 className="text-2xl">Agregar operacion</h2>
        <input
          name="concepto"
          className="m-5 p-2"
          onChange={handleChange}
          placeholder="Concepto"
          type="text"
        />

        <input
          name="monto"
          className="m-5 p-2"
          onChange={handleChange}
          placeholder="Monto"
          type="text"
        />
        <input
          name="fecha"
          className="m-5 p-2"
          onChange={handleChange}
          placeholder="Fecha"
          type="text"
        />

        <div className="flex m-5">
          <label>
            <input
              name="tipo"
              checked={operacion.tipo == "Ingreso" ? true : false}
              className="m-5 p-2"
              onChange={handleChange}
              value="Ingreso"
              type="radio"
            />
            Ingreso
          </label>
          <label>
            <input
              name="tipo"
              checked={operacion.tipo == "Egreso" ? true : false}
              className="m-5 p-2"
              onChange={handleChange}
              value="Egreso"
              type="radio"
            />
            Egreso
          </label>
        </div>

        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => handleAdd()}
            className="bg-green-300 p-3 m-5 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
          >
            Enviar
          </button>
          <Link to="/">
            <button className="bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">
              Regresar a inicio
            </button>
          </Link>
          {completed &&<Redirect to="/" />}
        </div>
      </div>
    </div>
  );
}

export default Add;
