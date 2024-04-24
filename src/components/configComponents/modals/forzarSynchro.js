import React, { useState, useEffect } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import axios from "axios";

export const ForceSynchro = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        caja : '',
        tipo : ''
    });

    const changeTipo = ( tip ) => {
        setData({ ...data, tipo: tip })
    }

    const forzar = async () => {
        try {

            if (data.caja === '', data.tipo === '') {
                alert('LA CAJA ES OBLIGATORIA')
                return;
            }

            const baseUrl = new URL(`${bk_dir}/facturas/admin/forceSyncroFact`);

            // Agregar parámetros a la URL
            baseUrl.searchParams.append('caja', data.caja);
            baseUrl.searchParams.append('tipo', data.tipo);

            // Realizar la solicitud HTTP utilizando Axios con la URL construida
            const resp = await axios.post(baseUrl.toString());

            if (resp.status === 200) {
                setOpen(false);
                console.log('DATA DEL SERVIDOR  ::: ',resp);
                alert(`${resp.data.message}`);
            }

        } catch (err) {
            console.log('error : ', err)
            alert('ERROR DE SINCRONIZACION ')
        }
    }


    return (
        <>
            <a href="#" class="btn btn-white" style={{ backgroundColor: '#C0392B', color: 'white' }} onClick={() => setOpen(true)}>
                FORZAR SINCRONIZACION
            </a>

            {open &&
                <div class="modal modal-blur fade show" id="modal-info" tabindex="-1" style={{ display: 'block', paddingRight: "17px;", backgroundColor: 'rgba(0, 0, 0, 0.7)' }} >
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ width: '40%' }}>
                        <div class="modal-content">
                            <button type="button" class="btn-close" onClick={() => { changeTipo(0); setOpen(false) }}></button>
                            <div class="modal-body text-center py-5">
                                <h3>FORZAR SINCRONIZACION</h3>
                                <div class="text-muted">Escanee una caja del pedido para sincronizar</div>
                                <br />
                                <h5><strong>TODO EL PEDIDO</strong>, sincroniza todas las facturas/albaranes del pedido de la caja</h5>
                                <br />
                                <h5><strong>FACTURA/ALBARAN</strong>, sincroniza la factura o el albaran al que pertenece esa caja</h5>
                            </div>

                            <div className="card" style={{ width: '90%', display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>

                                <div style={{ marginLeft : 10, marginRight : 10 }}>
                                    <input type="text" class="form-control" name="example-text-input" placeholder="ESCANEE UNA CAJA" style={{ marginTop: 15 }} onChange={(event) => setData({ ...data, caja: event.target.value })} />
                                </div>

                                <div class="form-selectgroup form-selectgroup-boxes d-flex" style={{ margin: 10, display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>

                                    <label class="form-selectgroup-item flex-fill" onClick={() => changeTipo('0')}>
                                        <input type="radio" name="form-payment" value="visa" class="form-selectgroup-input" />
                                        <div class="form-selectgroup-label d-flex align-items-center p-3">
                                            <div class="mr-3">
                                                <span class="form-selectgroup-check"></span>
                                            </div>
                                            <div>
                                                <strong>TODO EL PEDIDO</strong>

                                            </div>
                                        </div>
                                    </label>

                                    <label class="form-selectgroup-item flex-fill" onClick={() => changeTipo('1')}>
                                        <input type="radio" name="form-payment" value="visa" class="form-selectgroup-input" />
                                        <div class="form-selectgroup-label d-flex align-items-center p-3">
                                            <div class="mr-3">
                                                <span class="form-selectgroup-check"></span>
                                            </div>
                                            <div>
                                                <strong>FACTURA/ALBARAN UNICO</strong>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                
                            </div>

                            <div class="modal-footer" onClick={forzar}>
                                <a href="#" class="btn btn-primary w-100" >
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