import Add from "./componentes/Add"
import {useState} from "react"

function App() {
  const [ruta, setRuta] = useState("main")

  //Usar react router para mejor uso

  let lista = <h2>Lista</h2>;

  return (
    <div>
      <header>
       <h1>Administracion</h1>
       <button onClick={()=> setRuta("add")}>Cargar</button>
      </header>
      <main>
        <div>
          {ruta==="main"? lista:<Add/>}
        </div>
     </main>
    </div>
  );
}

export default App;
