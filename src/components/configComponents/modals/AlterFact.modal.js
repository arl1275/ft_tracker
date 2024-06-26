import React, { useState } from "react";
import { CambioManual } from "../minComponents/cambioManual.component";
import { VerCajas } from "../minComponents/vercajas.components";
export const AlterFact = ({ props }) => {
    const [val, setVal] = useState(null);

    const head_cell = {
        border: '1px solid #D5D8DC', // Note: Property values should be strings
        textAlign: 'left',
        color: 'white',
        backgroundColor: 'black',
        fontSize: 15
    }

    const cell = {
        border: '1px solid #D5D8DC', // Note: Property values should be strings
        textAlign: 'left',
        color: 'white',
        backgroundColor: '#242424',
        fontSize: 15
    };

    const cell_detail = {
        border: '1px solid #D5D8DC', // Note: Property values should be strings
        textAlign: 'left',
        color: 'white',
        backgroundColor: 'black ',
        fontSize: 15
    }

    const cell_data = {
        border: '1px solid #D5D8DC',
        textAlign: 'left',
        color: 'black',
        backgroundColor: 'white',
        fontSize: 15
    }

    const pic_format = {
        width: '50%',
        height: '40%'
    }

    return (
        <div>
            <div className="card" style={{ display: 'flex' }}>
                <table>
                    <tr>
                        <td style={head_cell}>FACTURA</td>
                        <td style={head_cell}>{props?.factura}</td>
                    </tr>
                    <tr>
                        <td style={cell}>CLIENTE</td>
                        <td style={cell_data}>{props?.clientenombre}</td>
                    </tr>
                    <tr>
                        <td style={cell}>ALBARAN</td>
                        <td style={cell_data}>{props?.albaran}</td>
                    </tr>
                    <tr>
                        <td style={cell}>CIUDAD</td>
                        <td style={cell_data}>{props?.ciudad}</td>
                    </tr>
                    <tr>
                        <td style={cell}>DEPARTAMENTO</td>
                        <td style={cell_data}>{props?.departamento}</td>
                    </tr>
                    <tr>
                        <td style={cell}>CALLE</td>
                        <td style={cell_data}>{props?.calle}</td>
                    </tr>
                </table>

                <table style={{ marginTop: 5 }}>
                    <tr>
                        <td style={cell_detail}>RUTA</td>
                        <td style={cell_detail}>PEDIDO</td>
                        <td style={cell_detail}>CAJA</td>
                        <td style={cell_detail}>UNIDADES</td>
                    </tr>
                    <tr>
                        <td style={cell_data}>{props?.lista_empaque}</td>
                        <td style={cell_data}>{props?.pedidoventa}</td>
                        <td style={cell_data}>{props?.cant_cajas}</td>
                        <td style={cell_data}>{props?.cant_unidades}</td>
                    </tr>
                </table>

            </div>

            <table style={{ width: '100%' }}>
                <tr>
                    <td style={cell_detail}>CAMION ASIGNADO</td>
                    <td style={cell_data}>{props?.placa}</td>
                </tr>
                <tr>
                    <td style={cell_detail}>ENTREGADOR ASIGNADO</td>
                    <td style={cell_data}>{props?.nombre}</td>
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
                        <td style={cell_data}>{props?.declaracionenvio}</td>
                        <td style={cell_data}>{props?.toma_preparacion}</td>
                        <td style={cell_data}>{props?.toma_transito}</td>
                        <td style={cell_data}>{props?.toma_hora_fecha_entrega}</td>
                        <td style={cell_data}>{props?.toma_sincronizado}</td>
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
                    <div className="nav-lib">CAJAS</div>
                </li>
            </ul>

            <div className="tab-content">
                { val === null &&
                    <div className="card" style={{ margin: 30 , backgroundColor : 'black' }}>
                        <h4 style={{color : 'white'}}>AVISO IMPORTANTE</h4>
                        <p style={{color : 'white'}}>Avisar de antemano a la administración</p>
                    </div>
                }
                { val === 0 && <p>SE HA INHABILITADO</p> }
                { val === 1 && (<CambioManual prop={props?.factura} />)}
                { val === 2 && (<VerCajas albaran_={props?.albaran}/>)}
                { val === 3 &&
                    <div className="card" style={{ margin: 10 }}>
                        {
                            typeof props?.link_firma === 'string' || typeof props?.link_foto === 'string' ?
                                <table>
                                        <tr>
                                            <th style={{ margin: 20 }}> FIRMA</th>
                                            <th style={{ margin: 20 }}>FOTO</th>
                                        </tr>
                                        <tr>
                                            <td  style={pic_format}>
                                                <img src={props?.link_firma} />
                                            </td>
                                            <td style={pic_format}>
                                                <img src={props?.link_foto} />
                                            </td>
                                        </tr>                 
                                </table>
                                : (<div style={{ margin : 10 }}>Aun no se han tomado fotos de esta factura.</div>)
                        }
                    </div>
                }
            </div>
        </div>
    )
}