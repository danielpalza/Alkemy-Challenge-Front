import Fetch from "../services/Fetch";
import parseMoney from 'parse-money';
import { useState } from "react";

function Add(p) {
  const [opr, setOpr] = useState({
    tipo: "Ingreso",
    concepto: "",
    monto: "$",
    fecha: "",
  });

  const handleAdd = () => {
    if (Object.values(opr).every((a) => a.length > 0)) {
      Fetch(
        "POST",
        "/operacion/createOperacion",
        { ...opr, monto: parseMoney(opr.monto).amount },
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
      
      p.handleRender(false);
    }
    if (e.status == "Error") {
      alert("No se pudo crear la operacion");
    }
  };

  const handleChange = (e) => {
    setOpr({ ...opr, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="flex justify-center h-2/4 items-center">
      <div className="m-5 rounded w-auto h-auto md:h-auto bg-green-300 flex flex-col p-5 text-center font-sans">
        <h2 className="text-2xl">Agregar operacion</h2>
        <input
          name="concepto"
          className="m-3  md:m-5  p-2"
          onChange={handleChange}
          placeholder="Concepto"
          type="text"
        />

        <input
          name="monto"
          className="m-3  md:m-5  p-2"
          onChange={handleChange}
          placeholder="Monto"
          value={opr.monto}
          type="text"
        />
        <input
          name="fecha"
          className="m-3 md:m-5 p-2"
          onChange={handleChange}
          placeholder="Fecha"
          type="date"
        />

        <div className="flex m-2">
          <label>
            <input
              name="tipo"
              checked={opr.tipo == "Ingreso" ? true : false}
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
              checked={opr.tipo == "Egreso" ? true : false}
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
            Crear
          </button>

          <button
            onClick={() => p.handleRender()}
            className="bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
          >
            Regresar a inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Add;
