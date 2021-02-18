import Add from "./Add";
import List from "./List";
import Fetch from "../services/Fetch";
import toMoney from "number-to-money";
import { Fragment, useState, useEffect } from "react";

export default function Main(e) {
  const [render, setRender] = useState(false);
  const [ban, setBan] = useState(false);
  const [balance, setBalance] = useState();

  const handleRender = () => {
    setRender(!render);
  };
  const handleLogOut = () => {
    localStorage.setItem("token", "");
    e.isLogin(false);
  };

  const handleResponse = (e) => {
    setBalance(e.response);
  };

  useEffect(() => {
    Fetch(
      "GET",
      "/operacion/getBalance",
      {},
      localStorage.getItem("token"),
      handleResponse
    );
  }, [ban]);

  return (
    <Fragment>
      <header className="bg-green-300 flex flex-col md:flex-row text-center justify-between p-4">
        <h1 className="text-3xl font-bold tracking-tight text-green-900 font-sans">
          Administración
        </h1>
        <div>
          <h1 className="text-2xl md:text-3x1 font-bold tracking-tight text-green-900 font-sans">
            Balance: ${balance != undefined && toMoney(balance)}
          </h1>
        </div>
        <div>
          <button
            onClick={handleRender}
            className="m-2 bg-green-400 p-2 md:p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-500 hover:scale-110 duration-200"
          >
            Agregar operacion
          </button>
          <button
            onClick={handleLogOut}
            className=" m-2 bg-green-400 p-2 md:p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-500 hover:scale-110 duration-200"
          >
            Cerrar sesion
          </button>
        </div>
      </header>

      <main>
        {render ? (
          <Add handleRender={handleRender} />
        ) : (
          <List setBan={setBan} ban={ban} />
        )}
      </main>
    </Fragment>
  );
}
