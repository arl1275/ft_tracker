import React, { useState, useEffect } from "react";
import { CambioEntregador } from "../minComponents/cambioEntregador.component";
import { EntregaManual } from "../minComponents/entregaManual.component";
import { CambioManual } from "../minComponents/cambioManual.component";

export const AlterFact = ({ props }) => {
    const [val, setVal] = useState(null);

    return (
        <div>
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