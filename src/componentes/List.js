import { useState, useEffect } from "react";
import toMoney from 'number-to-money';
import Fetch from "../services/Fetch";
import Update from "./ListComponents/Update";
import Delete from "./ListComponents/Delete";

function List(p) {
 
  const [list, setList] = useState([]);
  const [lbm, setLBM] = useState("L");
  const [body, setBody] = useState();

  
  
  useEffect(() => {
    
    
    const firstLetterUpperCase = (str) =>
      str.charAt(0).toUpperCase().concat(str.substring(1, str.length));
    const dateFormat = (date) => date.split("-").reverse().join("/");
    if (p.opr.length > 0) {
      //Render list
      setList(
        p.opr.map((a) => {
          const loadBody=(b)=>{
            setLBM(b)
            setBody(a)
          }  
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
                    <button onClick={()=>loadBody("B")} className="bg-green-300 p-2 md:p-3 m-2 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">
                      Eliminar
                    </button>
                    <button  onClick={()=>loadBody("M")} className="bg-green-300  p-2 md:p-3 m-2  rounded-md text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">
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
  }, [p.opr]);

  return lbm == "L" ? (
    <ul>{list.length > 0 && list.map((a) => a)}</ul>
  ) : lbm == "M" ? (
    <Update body={body} setOpr={p.setOpr} opr={p.opr} setLBM={setLBM} />
  ) : (
    <Delete body={body} setOpr={p.setOpr} opr={p.opr} setLBM={setLBM} />
  );
}

export default List;
