import { useState, useEffect } from "react";
import Fetch from "../services/Fetch";
import Update from "./ListComponents/Update";
import Delete from "./ListComponents/Delete";

function List() {
  const [opr, setOpr] = useState([]);
  const [list, setList] = useState([]);
  const [lbm, setLBM] = useState("L");
  const [body, setBody] = useState();

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
  }, []);

  useEffect(() => {
    const firstLetterUpperCase = (str) =>
      str.charAt(0).toUpperCase().concat(str.substring(1, str.length));
    const dateFormat = (date) => date.split("-").reverse().join("/");
    if (opr.length > 0) {
      setList(
        opr.map((a) => {
          const loadBody=(b)=>{
            setLBM(b)
            setBody(a)
          }  
          return (
            <li key={a.id_operacion}>
              <div className="flex justify-between bg-green-200 text-lg  rounded p-5 m-5 ">
                <p className="text-xl">{a.tipo}</p>
                <p className="text-xl">{firstLetterUpperCase(a.concepto)}</p>
                <div className="flex">
                  <div className="m-2">
                    <p>${a.monto}</p>
                    <p>{dateFormat(a.fecha)}</p>
                  </div>
                  <div className="m-2">
                    <button onClick={()=>loadBody("B")} className="bg-green-300 p-3 m-2 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">
                      Eliminar
                    </button>
                    <button  onClick={()=>loadBody("M")} className="bg-green-300 p-3 m-2  rounded-md text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">
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
    <ul>{list.length > 0 && list.map((a) => a)}</ul>
  ) : lbm == "M" ? (
    <Update body={body} setOpr={setOpr} opr={opr} setLBM={setLBM} />
  ) : (
    <Delete body={body} setOpr={setOpr} opr={opr} setLBM={setLBM} />
  );
}

export default List;
