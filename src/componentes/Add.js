
function Add(){
    return(
        <form onSubmit={console.log("enviado")}>
            <input name="tipo" placeholder="Tipo" type="text"/>
            <input name="concepto" placeholder="Concepto" type="text"/>
            <input name="monto" placeholder="Monto" type="text"/>
            <input name="fecha" placeholder="Fecha" type="text"/>
            <input type="submit" value="Enviar"/>
        </form>
    )
}

export default Add