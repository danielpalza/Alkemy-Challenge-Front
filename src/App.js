import Main from "./componentes/Main";
import { useState, useEffect, Fragment } from "react";
import Inicio from "./componentes/Inicio";

function App() {
  let [isLogin, setIsLogin] = useState(false);

  //Comprabacion del token
  const Auth = () => {
    if (localStorage.getItem("token")) {
      let urlRoot = "https://alkemy-back-api.herokuapp.com/"; //Cambiar a la url donde se alojara la API
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", urlRoot, true);
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          localStorage.setItem(
            "token",
            JSON.parse(this.responseText).response.token
          );
          setIsLogin(true);
        }
        if (
          (this.readyState == 4 && this.status == 500) ||
          this.status == 403
        ) {
          setIsLogin(false);
        }
      };
      xmlhttp.setRequestHeader(
        "token",
        localStorage.getItem("token") ? localStorage.getItem("token") : ""
      );
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send();
    }
  };

  useEffect(() => {
    Auth();
  }, []);

  return (
    <Fragment>
      {isLogin ? (
        <Main isLogin={setIsLogin} />
      ) : (
        <Inicio isLogin={setIsLogin} />
      )}
    </Fragment>
  );
}

export default App;
