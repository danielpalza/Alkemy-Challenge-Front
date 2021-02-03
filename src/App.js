
import Main from "./componentes/Main"
import ProtectedRoute from "./componentes/ProtectedRoute"
import Login from "./componentes/Login"
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

function App() {
  

  return (
  
    <Router>
        <Switch>
          <Route path="/login">
              <Login/>
          </Route>
          <ProtectedRoute exact path="/">
              <Main/>
          </ProtectedRoute>
       </Switch>
     
    </Router>
  );
}

export default App;
