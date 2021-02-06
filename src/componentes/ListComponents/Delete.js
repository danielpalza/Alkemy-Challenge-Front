import Fetch from "../../services/Fetch"

export default function Delete(p){

    const handleDelete=()=>{
        console.log(p.body)

        Fetch(
            "POST",
            "/operacion/deleteOperacion",
            { id_operacion:p.body.id_operacion },
            localStorage.getItem("token"),
            handleResponse)
    }
    
    const handleResponse = (e) => {
        if (e.status == "ok") {
          alert("Operacion borrada");
          p.setOpr(p.opr.filter(a=>a.id_operacion!=p.body.id_operacion))
          p.setLBM("L")
          
        }
        if (e.status == "Error") {
          alert("No se pudo crear la operacion");
        }
      };
    
    return(
        <div className="flex justify-center h-2/4 items-center">
        <div className="m-5 rounded w-1/4 bg-green-300 flex flex-col p-5 text-center font-sans">
         <h2 className="text-2xl">¿Desea eliminar la operacion?</h2>
                
         <div className="flex flex-col justify-center items-center">
            <button
              onClick={() => handleDelete()}
              className="bg-green-300 p-3 m-5 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200"
            >
              Eliminar
            </button>
            
            <button onClick={()=>p.setLBM("L")} className="bg-green-300 p-3 rounded-md  text-green-900 transform shadow-lg hover:bg-green-400 hover:scale-110 duration-200">
                Cancelar
            </button>
           
          </div>
        </div>
      </div>
    )
}