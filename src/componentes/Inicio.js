import { useState, Fragment } from "react";
import Login from "./Inicio/Login"
import Register from "./Inicio/Register"

export default function Inicio(p) {
  const [render, setRender] = useState(false)

  const handleRender= ()=>{
        setRender(!render)
    }
 
  return (
    <Fragment>
 
        {render?<Register handleRender={handleRender}/>:<Login isLogin={p.isLogin} handleRender={handleRender}/>}
        
        
    </Fragment>  
    
  );
}
