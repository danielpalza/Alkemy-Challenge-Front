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
  console.log("token:", localStorage.getItem("token"));
  let [isLogin, setIsLogin] = useState(false)


  //Comprabacion del token
  const Auth = () => {
    if (localStorage.getItem("token")) {
      let urlRoot = "http://localhost:4000/usuario/auth"; //Cambiar a la url donde se alojara la API
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", urlRoot, true);
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          return JSON.parse(this.responseText).status == "ok" ? true : false;
        }
      };
      xmlhttp.setRequestHeader("token", localStorage.getItem("token"));
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send();
    }
  };
  console.log("isLogin: ", isLogin)
  return (
    <Router>
      <Switch>
        <Route path="/inicio" render={() => (isLogin ? <Redirect exact to="/" /> : <Inicio isLogin={setIsLogin}/>)} />

        <Route
          exact
          path="/"
          render={() => (Auth()  ? <Redirect to="/inicio" /> : <Main />)}
        />
      </Switch>
    </Router>
  );
}

export default App;
