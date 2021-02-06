import Fetch from "../../services/Fetch";
import { useState } from "react";

export default function Update(p) {
  const [opr, setOpr] = useState({
    concepto: p.body.concepto,
    monto: p.body.monto.toString(),
    fecha: p.body.fecha,
  });

  const handleUpdate = () => {
    if (Object.values(opr).every((a) => a.length > 0)) {
      Fetch(
        "POST",
        "/operacion/updateOperacion",
        {
          ...opr,
          monto: parseInt(opr.monto),
          id_operacion: p.body.id_operacion,
        },
        localStorage.getItem("token"),
        handleResponse
      );
    } else {
      alert("Debe completar todos los campos");
    }
  };

  const handleResponse = (e) => {
    if (e.status == "ok") {
      alert("Operacion actualizada");
      p.setOpr(
        p.opr.map((a) => {
          if (a.id_operacion == p.body.id_operacion) {
            return {
              ...a,
              concepto: opr.concepto,
              monto: opr.monto,
              fecha: opr.fecha,
            };
          } else {
            return a;
          }
        })
      );
      p.setLBM("L");
    }
    if (e.status == "Error") {
      alert("No se pudo actualizar la operacion");
    }
  };

  const handleChange = (e) => {
    setOpr({ ...opr, [e.target.name]: e.target.value });
  };
  console.log("operacion: ", opr);

  return (
    <div className="flex justify-center h-2/4 items-center">
      <div className="m-5 rounded w-1/4 bg-green-300 flex flex-col p-5 text-center font-sans">
        <h2 className="text-2xl">Modificar operacion</h2>
        <input
          name="concepto"
          className="m-5 p-2"
          onChange={handleChange}
          value={opr.concepto}
          placeholder="Concepto"
          type="text"
        />

        <input
          name="monto"
          className="m-5 p-2"
          onChange={handleChange}
          value={opr.monto}
          placeholder="Monto"
          type="text"
        />
        <input
          name="fecha"
          className="m-5 p-2"
          onChange={handleChange}
          value={opr.fecha}
          type="date"
        />

        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => handleUpdate()}
            className="bg-green-300 p-3 m-5 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
          >
            Actualizar
          </button>

          <button
            onClick={() => p.setLBM("L")}
            className="bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
