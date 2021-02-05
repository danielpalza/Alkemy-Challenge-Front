
import Add from "./Add"
import List from "./List"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  
  } from "react-router-dom";

export default function Main(e){

    const handleLogOut=()=>{
        localStorage.setItem("token","")
        e.isLogin(false)
    }

    return(
        <Router>
            <header className="bg-green-300 flex justify-between p-4">
                <h1 className="text-3xl font-bold tracking-tight text-green-900 font-sans">Administracion</h1>
                <div>
                    <Link to="/add"><button className="m-2 bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">Agregar operacion</button></Link> 
                    <Link to="/inicio"><button onClick={handleLogOut} className=" m-2 bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">Salir</button></Link>
                
                </div>   
            </header>
            
            <main>
                <Switch>
                    <Route exact path="/list">
                        <List/>
                    </Route>
                    <Route path="/add">
                        <Add/>
                    </Route>
                </Switch>
            </main>
        </Router>
        
    )
}