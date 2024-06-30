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

    const to_change_state = async () =>{
        if(selected == '1'){
            const result = await axios.get(bk_dir + '/facturas/toNullState', {params : { factura : prop }});
            if(result.status === 200){
                alert('SE ENVIO A BODEGA');
            }else{
                alert('NO SE PUDO REALIZAR EL CAMBIO')
            }

        }else{
            alert('NO FAVOR SELECCIONE EL CAMPO')
        }
    }

    return (
        <div>
            <div className="card" style={{ marginTop: 5, marginBottom: 5, backgroundColor: 'black', color: 'white' }}>
                <h4 style={{ margin: 15 }}>FAVOR VALIDAR LA INFORMACION ANTES DE HACER UN CAMBIO EN EL ESTADO DE LA FACTURA, LO CAMBIOS SON PERMANENTES</h4>
            </div>


            <div className="card" style={{ display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>

                {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={input_text}>DETALLE CAMBIO</p>
                    <textarea style={input_text} />
                </div> */}

                <select id="values" 
                style={select_} 
                value={selected}
                onChange={(event) => setSelected(event.target.value)}>
                    <option value="0">-- SELECCIONE --</option>
                    <option value="1">ENVIAR A BODEGA</option>
                </select>


            </div>

            <div style={{ width : '60%', alignSelf : 'center' }} onClick={to_change_state}>
                <p className="btn btn-dark w-100" style={{ alignSelf : 'center'}}> VALIDAR CAMBIO </p>
            </div>

        </div>
    )
}