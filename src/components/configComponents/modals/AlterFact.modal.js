import React, { useState, useEffect } from "react";
import { CambioEntregador } from "../minComponents/cambioEntregador.component";
import { EntregaManual } from "../minComponents/entregaManual.component";
import { CambioManual } from "../minComponents/cambioManual.component";

export const AlterFact = ({ props }) => {
    const [val, setVal] = useState(null);

    const head_cell = {
        border: '1px solid #D5D8DC', // Note: Property values should be strings
        textAlign: 'left',
        color: 'white',
        backgroundColor: '#21618C',
        fontSize: 15
    }

    const cell = {
        border: '1px solid #D5D8DC', // Note: Property values should be strings
        textAlign: 'left',
        color: 'black',
        backgroundColor: '#F0F3F4',
        fontSize: 15
    };

    const cell_detail = {
        border: '1px solid #D5D8DC', // Note: Property values should be strings
        textAlign: 'left',
        color: 'black',
        backgroundColor: '#7FB3D5 ',
        fontSize: 15
    }

    const cell_data = {
        border: '1px solid #D5D8DC', 
        textAlign: 'left',
        color: 'black',
        backgroundColor: 'white',
        fontSize: 15
    }

    return (
        <div>
            <div className="card" style={{ display: 'flex' }}>
                <table>
                    <tr>
                        <td style={head_cell}>FACTURA</td>
                        <td style={head_cell}>{props.factura}</td>
                    </tr>
                    <tr>
                        <td style={cell}>CLIENTE</td>
                        <td style={cell_data}>{props.clientenombre}</td>
                    </tr>
                    <tr>
                        <td style={cell}>ALBARAN</td>
                        <td style={cell_data}>{props.albaran}</td>
                    </tr>
                </table>

                <table style={{ marginTop : 5}}>
                    <tr>
                        <td style={cell_detail}>RUTA</td>
                        <td style={cell_detail}>PEDIDO</td>
                        <td style={cell_detail}>CAJA</td>
                        <td style={cell_detail}>UNIDADES</td>
                    </tr>
                    <tr>
                        <td style={cell_data}>{props.lista_empaque}</td>
                        <td style={cell_data}>{props.pedidoventa}</td>
                        <td style={cell_data}>{props.cant_cajas}</td>
                        <td style={cell_data}>{props.cant_unidades}</td>
                    </tr>
                </table>

            </div>

            <table style={{ width : '100%'}}>
                    <tr>
                        <td style={cell_detail}>CAMION ASIGNADO</td>
                        <td style={cell_data}>{props.placa}</td>
                    </tr>
                    <tr>
                        <td style={cell_detail}>ENTREGADOR ASIGNADO</td>
                        <td style={cell_data}>{props.nombre}</td>
                    </tr>
            </table>

            <div className="card" style={{ marginTop: 5 }}>
                <table>
                    <tr>
                        <td style={cell_detail}>DEC_ENVIO</td>
                        <td style={cell_detail}>PREPARACION</td>
                        <td style={cell_detail}>TRANSITO</td>
                        <td style={cell_detail}>ENTREGA</td>
                        <td style={cell_detail}>SINCRONIZADO</td>
                    </tr>
                    <tr>
                        <td style={cell_data}>{props.declaracionenvio}</td>
                        <td style={cell_data}>{props.toma_preparacion}</td>
                        <td style={cell_data}>{props.toma_transito}</td>
                        <td style={cell_data}>{props.toma_hora_fecha_entrega}</td>
                        <td style={cell_data}>{props.toma_sincronizado}</td>
                    </tr>
                </table>
            </div>

            <ul className="nav nav-tabs" style={{ display: 'flex', flexDirection: 'row', width: 'auto', color: 'black', padding: '2%', color: 'black' }}>
                <li className="nav-item" style={{ marginRight: '5%', cursor: 'pointer' }} onClick={() => { setVal(3) }}>
                    <div className="nav-lib">FIRMA</div>
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