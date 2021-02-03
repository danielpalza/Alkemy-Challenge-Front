
export default function Login(){

    return(
        <div>
              <form onSubmit={console.log("enviado")} className="bg-green-300 flex justify-around p-4">
                <input name="email" placeholder="Email..." type="text" />
                <input name="contraseña" placeholder="Contraseña..." type="password" />
                <input type="submit" value="Enviar" />
              
              </form>
        </div>
        
    )
}