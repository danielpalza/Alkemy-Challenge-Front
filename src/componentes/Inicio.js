import { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect,useRouteMatch} from "react-router-dom";
import Login from "./Inicio/Login"
import Register from "./Inicio/Register"

export default function Inicio(p) {
  const [isRegister, setIsRegister] = useState(false)

  let { path, url } = useRouteMatch();
  console.log("path:", path)  
  return (
    <Fragment>
    <Router>
      <Switch>
        <Route exact path={`${path}`}>
          <Login isLogin={p.isLogin}/>
        </Route>
       <Route path={`${path}/register`}>
           <Register isRegister={setIsRegister}/>
        </Route> 
      </Switch>
      </Router>  
    </Fragment>  
    
  );
}
