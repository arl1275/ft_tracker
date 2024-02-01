import React, { useState } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import axios from "axios";

export const CambioManual = ({ prop }) => {
    const [selected, setSelected] = useState('');

    const select_ = {
        padding: '10px',
        fontsize: '16px',
        border: '1px solid #ccc',
        borderradius: '4px',
        cursor: 'pointer',
        outline: 'none',
        appearance: 'none',
        width: '50%',
        height: '40px',
        margin: 17
    }

    const input_text = {
        margin: 10
    }

    return (
        <div>
            <div className="card" style={{ marginTop: 5, marginBottom: 5, backgroundColor: '#922B21', color: 'white' }}>
                <h4 style={{ margin: 15 }}>FAVOR VALIDAR LA INFORMACION ANTES DE HACER UN CAMBIO EN EL ESTADO DE LA FACTURA, LO CAMBIOS SON PERMANENTES</h4>
            </div>


            <div className="card" style={{ display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={input_text}>DETALLE CAMBIO</p>
                    <textarea style={input_text} />
                </div>

                <select name="cars" id="cars" style={select_}>
                    <option value="1">ENVIAR A BODEGA</option>
                    <option value="2">A PREPARACION</option>
                    <option value="3">A TRANSITO</option>
                </select>


            </div>

            <div style={{ width : '60%', alignSelf : 'flex-end'}}>
                <p className="btn btn-dark w-100"> VALIDAR CAMBIO </p>
            </div>

        </div>
    )
}