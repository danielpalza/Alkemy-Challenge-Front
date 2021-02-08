import { useState, useEffect } from "react";
import toMoney from "number-to-money";
import Fetch from "../services/Fetch";
import Update from "./ListComponents/Update";
import Delete from "./ListComponents/Delete";

function List(p) {
  const [list, setList] = useState([]);
  const [opr, setOpr] = useState([]);
  const [ban, setBan] = useState(false);
  const [lbm, setLBM] = useState("L");
  const [body, setBody] = useState();

  const def = (
    <li key={1}>
      <div className="flex flex-col md:flex-row justify-center bg-green-200 text-lg  rounded p-2 md:p-3 m-2 md:m-2 ">
        <p className="text-xl">Sin registros</p>
      </div>
    </li>
  );

  const handleResponse = (e) => {
    setOpr(e.response);
  };

  useEffect(() => {
    Fetch(
      "GET",
      "/operacion/getOperaciones",
      {},
      localStorage.getItem("token"),
      handleResponse
    );
    p.setBan(!p.ban);
  }, [ban]);

  useEffect(() => {
    const firstLetterUpperCase = (str) =>
      str.charAt(0).toUpperCase().concat(str.substring(1, str.length));
    const dateFormat = (date) => date.split("-").reverse().join("/");
    if (opr.length > 0) {
      //Render list
      setList(
        opr.map((a) => {
          const loadBody = (b) => {
            setLBM(b);
            setBody(a);
          };
          return (
            <li key={a.id_operacion}>
              <div className="flex flex-col md:flex-row text-center justify-between bg-green-200 text-lg  rounded p-2 md:p-3 m-2 md:m-2 ">
                <p className="text-xl">{a.tipo}</p>
                <p className="text-xl">{firstLetterUpperCase(a.concepto)}</p>
                <div className="flex bg-white rounded">
                  <div className="m-2 text-lg">
                    <p>${toMoney(parseInt(a.monto))}</p>
                    <p>{dateFormat(a.fecha)}</p>
                  </div>
                  <div className="m-2">
                    <button
                      onClick={() => loadBody("B")}
                      className="bg-green-300 p-2 md:p-3 m-2 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => loadBody("M")}
                      className="bg-green-300  p-2 md:p-3 m-2  rounded-md text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
                    >
                      Modificar
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })
      );
    }
  }, [opr]);

  return lbm == "L" ? (
    <ul>{list.length > 0 ? list.map((a) => a) : def}</ul>
  ) : lbm == "M" ? (
    <Update
      body={body}
      setBan={setBan}
      ban={ban}
      setOpr={setOpr}
      opr={opr}
      setLBM={setLBM}
    />
  ) : (
    <Delete
      body={body}
      setBan={setBan}
      ban={ban}
      setOpr={setOpr}
      opr={opr}
      setLBM={setLBM}
    />
  );
}

export default List;
