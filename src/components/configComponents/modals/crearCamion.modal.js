import React, { useState } from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";

export const CrearCamion = () => {

    const [camion, setCamion] = useState({
        placa: '',
        QR: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure 'name' instead of 'camion'
        setCamion({ ...camion, [name]: value }); // Use 'name' as key to update 'camion' state
    };

    const handleSubmit = async (e) => {
        if (camion.placa === '' || camion.QR === '') {
            alert('ERROR Favor llenar todos los campos')
        } else {
            let response = await axios.post(bk_dir + '/camiones/postNewCamion', camion);
            if (response.status === 200) {
                alert('SE CREO EL CAMION NUEVO');
            } else {
                alert('NO SE CREO EL CAMION NUEVO');
            }
        }

    };

    return (
        <div className="card">
            <div className="modal-header" style={{ backgroundColor: 'black' }}>
                <h2 style={{ color: 'white' }}>CREAR CAMION</h2>
            </div>

            <div className="modal-body" style={{ width : '100%'}}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom : 20}}>
                    <div className="text-muted" style={{ textAlign: 'right' }}>PLACA:</div>
                    <input
                        type="text"
                        name="placa"
                        value={camion.placa}
                        onChange={handleChange}
                        style={{ borderWidth : '0px 0px 1px 0px', borderBottomColor: 'black', textAlign: 'right', width: 150 }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                    <div className="text-muted" style={{ textAlign: 'right' }}>CODQR:</div>
                    <input
                        type="text"
                        name="QR"
                        value={camion.QR}
                        onChange={handleChange}
                        style={{ borderWidth : '0px 0px 1px 0px', borderBottomColor: 'black', outline: 'none', textAlign: 'right', width: 150 }}
                    />
                </div>
            </div>

            <div className="modal-footer">
                <button className="btn btn-primary active w-100" onClick={handleSubmit} style={{ backgroundColor: 'green' }}>CREAR CAMION</button>
            </div>
        </div>
    )
}