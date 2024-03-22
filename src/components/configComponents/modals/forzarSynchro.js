import React, { useState, useEffect } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import axios from "axios";

export const ForceSynchro = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(0);
    const [data, setData] = useState({
        pedidoventa: '',
        factura: '',
        albaran: ''
    });

    const forzar = async () => {
        try {

            if (data.pedidoventa === '') {
                alert('El campo de Pedido Venta es OBLIGATORIO')
                return;
            }
        
            const resp = await axios.post(`${bk_dir}/facturas/admin/forceSyncroFact`, { pedidoventa: data.pedidoventa, factura: data.factura, albaran: data.albaran });
            if(resp.status === 200 ){
                setOpen(false);
                alert('SE FORZO CORRECTAMENTE');
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
                            <button type="button" class="btn-close" onClick={() => { setType(0); setOpen(false) }}></button>
                            <div class="modal-body text-center py-5">
                                <h3>FORZAR SINCRONIZACION</h3>
                                <div class="text-muted">La sincronizacion es final, favor verifique los datos antes de ingresar las facturas.</div>
                            </div>

                            <div className="card" style={{ width: '90%', margin: 10, display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
                                <div class="form-selectgroup form-selectgroup-boxes d-flex" style={{ margin: 10 }}>

                                    <label class="form-selectgroup-item flex-fill" onClick={() => setType(1)}>
                                        <input type="radio" name="form-payment" value="visa" class="form-selectgroup-input" />
                                        <div class="form-selectgroup-label d-flex align-items-center p-3">
                                            <div class="mr-3">
                                                <span class="form-selectgroup-check"></span>
                                            </div>
                                            <div>
                                                <strong>PEDIDO DE VENTA</strong>
                                            </div>
                                        </div>
                                    </label>

                                    <label class="form-selectgroup-item flex-fill" onClick={() => setType(2)}>
                                        <input type="radio" name="form-payment" value="visa" class="form-selectgroup-input" />
                                        <div class="form-selectgroup-label d-flex align-items-center p-3">
                                            <div class="mr-3">
                                                <span class="form-selectgroup-check"></span>
                                            </div>
                                            <div>
                                                <strong>FACTURA</strong>
                                            </div>
                                        </div>
                                    </label>

                                    <label class="form-selectgroup-item flex-fill" onClick={() => setType(3)}>
                                        <input type="radio" name="form-payment" value="paypal" class="form-selectgroup-input" />
                                        <div class="form-selectgroup-label d-flex align-items-center p-3">
                                            <div class="mr-3">
                                                <span class="form-selectgroup-check"></span>
                                            </div>
                                            <div>
                                                <strong>ALBARAN</strong>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div style={{ margin: 10, width: '90%' }}>
                                    {type == 0 && <div className="card" style={{ alignSelf: 'center', margin: 10 }}>Favor, seleccionar un tipo de sincronización</div>}
                                    {type != 0 && <input type="text" class="form-control" name="example-text-input" placeholder="Pedido de Ventas" onChange={(event) => setData({ ...data, pedidoventa: event.target.value })} />}
                                    {type == 2 && <input type="text" class="form-control" name="example-text-input" placeholder="FACTURA" style={{ marginTop: 15 }} onChange={(event) => setData({ ...data, factura: event.target.value })} />}
                                    {type == 3 && <input type="text" class="form-control" name="example-text-input" placeholder="ALBARAN" style={{ marginTop: 15 }} onChange={(event) => setData({ ...data, albaran: event.target.value })} />}

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