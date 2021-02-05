import Main from "./componentes/Main";
import {useState} from "react"
import Inicio from "./componentes/Inicio";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  
  let [isLogin, setIsLogin] = useState(false)

  console.log("token: ", localStorage.getItem("token"))
  //Comprabacion del token
  const Auth = () => {
    if (localStorage.getItem("token")) {
      let urlRoot = "http://localhost:4000/usuario/auth"; //Cambiar a la url donde se alojara la API
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", urlRoot, true);
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          localStorage.setItem("token", JSON.parse(this.responseText).token);
          console.log("response app: ", JSON.parse(this.responseText))
          return JSON.parse(this.responseText).status == "ok" ? true : false;
        }
        if (this.readyState == 4 && this.status == 500 || this.status == 403){
          return false
        }
      };
      xmlhttp.setRequestHeader("token", localStorage.getItem("token")? localStorage.getItem("token"): "");
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send();
    }
  };
  console.log("isLogin: ", isLogin)
  return (
    <Router>
      <Switch>
        <Route path="/inicio" render={() => (isLogin ? <Main isLogin={setIsLogin}/> : <Inicio isLogin={setIsLogin}/>)} />

        <Route
          exact
          path="/"
          render={() => (Auth() ? <Main isLogin={setIsLogin}/> :  <Redirect to="/inicio" /> )}
        />
      </Switch>
    </Router>
  );
}

export default App;
