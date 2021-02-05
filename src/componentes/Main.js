
import Add from "./Add"
import List from "./List"
import {Fragment,useState } from "react"


export default function Main(e){
    const [render, setRender] = useState(false)

    const handleRender= ()=>{
        setRender(!render)
    }
    const handleLogOut=()=>{
        localStorage.setItem("token","")
        e.isLogin(false)
    }

    return(
        <Fragment>
            <header className="bg-green-300 flex justify-between p-4">
                <h1 className="text-3xl font-bold tracking-tight text-green-900 font-sans">Administracion</h1>
                <div>
                    <button onClick={handleRender} className="m-2 bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">Agregar operacion</button>
                    <button onClick={handleLogOut} className=" m-2 bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">Salir</button>
                
                </div>   
            </header>
            
            <main>
               {render?<Add handleRender={handleRender}/>:<List/>}
            </main>
        </Fragment>
        
    )
}