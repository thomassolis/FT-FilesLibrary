import '../../Styles/completeHistoryStyle.css'

function CompleteHistory(){
    return(
        <section>
            <div style={{backgroundColor:'rgba(255, 237, 0, 1)', width:'100%', height:'5vw', position:'fixed', alignItems:'center', display:'flex'}}>
                <h1 style={{marginLeft:'20px'}}>Historial de solicitudes</h1>
            </div>

            <div style={{paddingTop:'58px'}}>
                <table>
                    
                    <thead>
                        <tr>
                        <th scope="col">Nombre del archivo requerido</th>
                        <th scope="col">Nombre del operador que desea el archivo</th>
                        <th scope="col">Comentario de pedido</th>
                        <th scope="col">Fecha del pedido</th>
                        <th scope="col">Nombre de gerente asignado</th>
                        <th scope="col">¿Fue aceptado por el gerente?</th>
                        <th scope="col">Comentario del gerente</th>
                        <th scope="col">Fecha de aceptación por gerencia</th>
                        <th scope="col">Nombre de administrador encargado</th>
                        <th scope="col">¿Fue aceptado por el administrador?</th>
                        <th scope="col">Nombre de administrador encargado</th>
                        <th scope="col">Comentario de administración</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td data-label="Account">Visa - 3412</td>
                        <td data-label="Due Date">04/01/2016</td>
                        <td data-label="Amount">$1,190</td>
                        <td data-label="Period">03/01/2016 - 03/31/2016</td>
                        </tr>
                        <tr>
                        <td scope="row" data-label="Account">Visa - 6076</td>
                        <td data-label="Due Date">03/01/2016</td>
                        <td data-label="Amount">$2,443</td>
                        <td data-label="Period">02/01/2016 - 02/29/2016</td>
                        </tr>
                        <tr>
                        <td scope="row" data-label="Account">Corporate AMEX</td>
                        <td data-label="Due Date">03/01/2016</td>
                        <td data-label="Amount">$1,181</td>
                        <td data-label="Period">02/01/2016 - 02/29/2016</td>
                        </tr>
                        <tr>
                        <td scope="row" data-label="Acount">Visa - 3412</td>
                        <td data-label="Due Date">02/01/2016</td>
                        <td data-label="Amount">$842</td>
                        <td data-label="Period">01/01/2016 - 01/31/2016</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default CompleteHistory;