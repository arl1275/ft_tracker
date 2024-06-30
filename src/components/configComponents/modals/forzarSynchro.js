import React, { useState, useEffect } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import axios from "axios";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export const ForceSynchro = ({ func, factura, handler }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState('');

    const forzar = async () => {
        try {
            if (data === '') {
                alert('Favor, escanear la Factura o el Albaran.')
                return;
            }
            const baseUrl = new URL(`${bk_dir}/facturas/admin/forceSyncroFact`);
            baseUrl.searchParams.append('factura', data)
            const resp = await axios.post(baseUrl.toString());
            alert(`--- MENSAJE SERVER -- 
${resp.data.message}`);
        } catch (err) {
            console.log('error : ', err)
            handler('', true, true);
            setData('')
        }
    }

    useEffect(() => {
        if (func == true) {
            setOpen(true);
            setData(factura = '' ? '' : factura)
        }
    }, [func])

    return (
        <>
            <a href="#" class="btn btn-white"
                style={{ backgroundColor: '#FF0000', color: 'white', borderRadius: 80, alignContent: 'center' }}
                onClick={() => { handler('' , true, false); setOpen(true) ;}}>
                <CloudDownloadIcon style={{ fontSize: 80 }} />
            </a>

            {open &&
                <div className="modal modal-blur fade show" id="modal-info" tabindex="-1" style={{ display: 'block', paddingRight: "17px;", backgroundColor: 'rgba(0, 0, 0, 0.7)' }} >
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ width: '40%' }}>
                        <div className="modal-content">

                            <button type="button" class="btn-close" onClick={() => { setOpen(false); handler('', true, true) }}></button>

                            <div style={{ alignSelf : 'center' , margin : 20}}>
                                <h2 style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>FORZAR SINCRONIZACION</h2>
                            </div>

                            <div className="card" style={{ width: '90%', display: 'flex', flexDirection: 'column', alignSelf: 'center', marginBottom: 10, marginTop: 0 }}>
                                <div style={{ alignSelf: 'center', margin : 40 , width : '80%'}}>
                                    <div className="text-muted" style={{ color: 'black' }}>Esta factura no existe </div>
                                    <p style={{ color: 'gray' }}>Esta factura no existe dentro de las facturas de despacho, favor verifique antes de forzar factura.</p>
                                </div>


                                <div style={{ width : '60%' , alignSelf : 'center', marginBottom : 20}}>
                                    <input type="text" class="form-control"
                                        placeholder="ESCANEE El CODIGO DE BARRA DE LA FACTURA O ALBARAN"
                                        style={{ marginTop: 15 , borderRadius : 100}} 
                                        onChange={(event) => setData(event.target.value)}
                                        value={data}
                                    />
                                </div>


                            </div>

                            <div className="modal-footer" onClick={forzar}>
                                <a href="#" className="btn btn-primary w-100" style={{ backgroundColor: 'black', borderRadius: 100 , width : '70%' }}>
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