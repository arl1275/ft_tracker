import React, { useState, useEffect } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import axios from "axios";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export const ForceSynchro = ({ func }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState('');

    const forzar = async () => {
        try {

            if (data === '') {
                alert('Favor, escanear la Factura o el Albaran.')
                return;
            }

            const baseUrl = new URL(`${bk_dir}/facturas/admin/forceSyncroFact`);

            // Agregar parámetros a la URL
            baseUrl.searchParams.append('factura', data)

            // Realizar la solicitud HTTP utilizando Axios con la URL construida
            const resp = await axios.post(baseUrl.toString());

            if (resp.status === 200) {
                setOpen(false);
                alert(`${resp.data.message}`);
                func(false)
            }

        } catch (err) {
            console.log('error : ', err)
            alert(' --- ERROR DE SINCRONIZACION -- ')
        }
    }


    return (
        <>
            <a href="#" class="btn btn-white"
                style={{ backgroundColor: 'black', color: 'white', borderRadius: 80, alignContent: 'center' }}
                onClick={() => { func(true); setOpen(true) }}>
                <CloudDownloadIcon style={{ fontSize: 80 }} />
            </a>

            {open &&
                <div className="modal modal-blur fade show" id="modal-info" tabindex="-1" style={{ display: 'block', paddingRight: "17px;", backgroundColor: 'rgba(0, 0, 0, 0.7)' }} >
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ width: '40%' }}>
                        <div className="modal-content">

                            <button type="button" class="btn-close" onClick={() => { func(false); setOpen(false) }}></button>

                            <div className="modal-body text-center py-5">
                                <h2 style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>FORZAR SINCRONIZACION</h2>
                            </div>

                            <div className="card" style={{ width: '90%', display: 'flex', flexDirection: 'column', alignSelf: 'center', marginBottom: 10 , marginTop : 0 }}>
                                <div style={{ alignSelf : 'center', marginTop : 10}}>
                                    <div className="text-muted" style={{ color: 'black' }}>Escanee la factura para Forzar la sincronizacion </div>
                                    <p style={{ color: 'gray' }}>Este proceso solo puede forzar una sola factura a la vez.</p>
                                </div>


                                <div style={{ margin: 20 }}>
                                    <input type="text" class="form-control"
                                        placeholder="ESCANEE El CODIGO DE BARRA DE LA FACTURA O ALBARAN"
                                        style={{ marginTop: 15 }} onChange={(event) => setData(event.target.value)}
                                        disabled={false}
                                    />
                                </div>


                            </div>

                            <div className="modal-footer" onClick={forzar}>
                                <a href="#" className="btn btn-primary w-100" style={{ backgroundColor: 'black', borderRadius: 100 }}>
                                    FORZAR SINCRONIZADO
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}