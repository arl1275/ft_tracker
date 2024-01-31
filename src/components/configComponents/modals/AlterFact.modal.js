import React, { useState, useEffect } from "react";
import { CambioEntregador } from "../minComponents/cambioEntregador.component";
import { EntregaManual } from "../minComponents/entregaManual.component";
import { CambioManual } from "../minComponents/cambioManual.component";

export const AlterFact = ({ props }) => {
    const [val, setVal] = useState(null);
    //console.log('configurate : ', props);

    return (
        <div>
            <div className="card" style={{display : 'flex'}}>
                <tr>
                    <td>CLIENTE</td>
                    <td>{props.clientenombre}</td>
                </tr>
                <tr>
                    <td>FACTURA</td>
                    <td>{props.factura}</td>
                </tr>
                <tr>
                    <td>ALBARAN</td>
                    <td>{props.albaran}</td>
                </tr>
                <tr>
                    <td>RUTA</td>
                    <td>{props.lista_empaque}</td>
                </tr>
                <tr>
                    <td>PEDIDO</td>
                    <td>{props.pedidoventa}</td>
                </tr>
                <tr>
                    <td>CAJAS</td>
                    <td>{props.cant_cajas}</td>
                </tr>
                <tr>
                    <td>UNIDADES</td>
                    <td>{props.cant_unidades}</td>
                    <td>{props.toma_preparacion}</td>
                </tr>
            </div>

            <div className="card" style={{marginTop : 5}}>
                <tr>
                    <th>PREPARACION</th>
                    <th>TRANSITO</th>
                    <th>ENTREGA</th>
                    <th>SINCRONIZADO</th>
                </tr>
                <tr>
                    <td>{props.toma_preparacion}</td>
                    <td>{props.toma_transito}</td>
                    <td>{props.toma_hora_fecha_entrega}</td>
                    <td>{props.toma_sincronizado}</td>
                </tr>
            </div>

            <ul className="nav nav-tabs" style={{ display: 'flex', flexDirection: 'row', width: 'auto', color: 'black', padding: '2%', color: 'black' }}>
                <li className="nav-item" style={{ marginRight: '5%', cursor: 'pointer' }} onClick={() => {setVal(3)}}>
                    <div className="nav-lib">AGREGAR DETALLE</div>
                </li>
                <li className="nav-item" style={{ marginRight: '5%', cursor: 'pointer' }} onClick={() => { setVal(1) }}>
                    <div className="nav-lib">CAMBIO MANUAL</div>
                </li>
                <li className="nav-item" style={{ marginRight: '5%', cursor: 'pointer' }} onClick={() => { setVal(2) }}>
                    <div className="nav-lib">ENTREGA MANUAL</div>
                </li>
            </ul>

            <div className="tab-content">
                {
                    val === null &&
                    <div className="card" style={{ margin: 30 }}>
                        <h4>AVISO IMPORTANTE</h4>
                        <p>Avisar de antemano a la administración</p>
                    </div>
                }
                {
                    val === 0 &&
                    <p>SE HA INHABILITADO</p>
                    // <CambioEntregador prop={props} />
                }
                {
                    val === 1 &&
                    <CambioManual prop={props} />
                }
                {
                    val === 2 &&
                    <EntregaManual />
                }
                {
                    val === 3 &&
                    <div>NO HABILITADO</div>
                }
            </div>
        </div>
    )
}