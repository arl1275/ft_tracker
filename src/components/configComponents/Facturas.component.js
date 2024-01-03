import React, { useState, useEffect } from "react";
import { bk_dir } from "../../conf/configuration.file";
import axios from "axios";
import { FotosView } from "./modals/FotosFact.modal";
import { AlterFact } from "./modals/AlterFact.modal";


function ListFact() {
    const [data, setData] = useState([]);
    const [factShow, setFactShow] = useState(null);         // this is to show little resumen data
    const [showFotos, setShowFotos] = useState(null);       // FACT TO SHOW TABLE    
    const [fotoid, setFotoid] = useState(0);                // this is the refers to FotosView

    const formatDate = (inputDate) => {
        return new Date(inputDate).toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const values = await axios.get(bk_dir + '/fact/adminFact').then(e => e.data);
            setData(values.data);
            console.log("data : ", data);
        } catch (err) {
            console.log('error al obtener los datos : ', err);
        }
    }

    const handleIdFotos = (val) => {
        setFotoid(val);
    }

    return (
        <div className="card" style={{ display: 'flex', margin: '1rem', flexDirection: 'row', backgroundColor: '#F4F6F6' }}>

            <div className="card" style={{ margin: '0.5rem', width: '70%' }}>
                <table className="table-responsive">
                    <thead style={{ backgroundColor: '#084670', color: 'white', fontWeight: 'bold', }}>
                        <tr>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>FACTURA</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>CLIENTE</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>LISTA DE EMPAQUE</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>ESTADO</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>NOMBRE</th>
                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>PLACA</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => (
                                <tr onClick={() => { setFactShow(item) }}>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.ref_factura}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.cliente}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.lista_empaque}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.state_name}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.nombre}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.placa}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }} data-toggle="modal" data-target="#modal-report" onClick={()=>{setShowFotos(item)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                                            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <div style={{ margin: '0.5rem' }}>
                <div className="card">
                    <div className="card-header" style={{ backgroundColor: '#084670' }}>
                        {
                            factShow ? (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <h4 style={{ color: 'white', margin: '0' }}>FACTURA NUMERO : {factShow.ref_factura}</h4>

                                    <div style={{ marginLeft: 'auto' }}>
                                        <button style={{ borderWidth: 0, backgroundColor: '#084670' }}
                                            data-toggle="modal" data-target="#modal-simple"
                                            onClick={() => { handleIdFotos(factShow.id); }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" color='white' width="24" height="24" viewBox="0 0 24 24"
                                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><rect x="3" y="4" width="18" height="16" rx="3" />
                                                <circle cx="9" cy="10" r="2" /><line x1="15" y1="8" x2="17" y2="8" /><line x1="15" y1="12" x2="17" y2="12" />
                                                <line x1="7" y1="16" x2="17" y2="16" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>

                            ) : (
                                <h4 style={{ color: 'white' }}>DETALLE DE FACTURAS</h4>
                            )
                        }
                    </div>
                    {
                        factShow ? (
                            <div className="card-body">
                                <div className="table-responsive" style={{ width: '100%' }}>
                                    <div className="table table-vcenter card-table" >
                                        <thead>
                                            <tr>
                                                <th>id : {factShow.id}</th>
                                                <th>valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>CLIENTE :</td>
                                                <td>{factShow.cliente}</td>
                                            </tr>
                                            <tr>
                                                <td>LISTA EMPRAQUE :</td>
                                                <td>{factShow.lista_empaque}</td>
                                            </tr>
                                            <tr>
                                                <td>NOMBRE TRANSPORTISTA :</td>
                                                <td>{factShow.nombre}</td>
                                            </tr>
                                            <tr>
                                                <td>PLACA DE CAMION :</td>
                                                <td>{factShow.placa}</td>
                                            </tr>
                                            <tr>
                                                <td>ESTADO : </td>
                                                <td>{factShow.state_name}</td>
                                            </tr>
                                            {/*------------- AQUI SE MUESTRAN LOS DATOS DE LOS TIEMPOS ---------------------*/}
                                            <tr>
                                                <td>Factura creada:</td>
                                                <td>{factShow.create_at === null ? 'SIN DATA' : formatDate(factShow.create_at)}</td>
                                            </tr>
                                            <tr>
                                                <td>TOMA PREPARACION :</td>
                                                <td>{factShow.toma_preparacion === null ? 'SIN DATA' : formatDate(factShow.toma_preparacion)}</td>
                                            </tr>
                                            <tr>
                                                <td>TOMA TRANSITO:</td>
                                                <td>{factShow.toma_transito === null ? 'SIN DATA' : formatDate(factShow.toma_transito)}</td>
                                            </tr>
                                            <tr>
                                                <td>TOMA ENTREGA :</td>
                                                <td>{factShow.fecha_hora_entrega === null ? 'SIN DATA' : formatDate(factShow.fecha_hora_entrega)}</td>
                                            </tr>
                                            <tr>
                                                <td>TOMA SINCRONIZADO: </td>
                                                <td>{factShow.toma_sincronizado === null ? 'SIN DATA' : formatDate(factShow.toma_sincronizado)}</td>

                                            </tr>

                                        </tbody>
                                    </div>
                                </div>
                            </div>
                        )
                            :
                            (
                                <div className="card"
                                    style={{
                                        width: '90%', height: 'auto',
                                        alignSelf: 'center', margin: 20, flexDirection: 'row'
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon" width="24" height="24"
                                        viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"
                                            fill="none" />
                                        <circle cx="12" cy="12" r="9" />
                                        <line x1="12" y1="8" x2="12.01" y2="8" />
                                        <polyline points="11 12 12 12 12 16 13 16" />
                                    </svg>
                                    <p>Seleccione una factura, para ver la información aqui</p>
                                </div>
                            )
                    }

                </div>
            </div>

            <div class="modal modal-blur fade" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content" style={{ width: '800px' }}>
                        <div className="modal-header" style={{ backgroundColor: '#02395E' }}>
                            <h4 style={{ color: 'white' }}>FACTURA : {fotoid}</h4>
                        </div>
                        <FotosView props={fotoid} />
                    </div>
                </div>
            </div>

            <div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style={{backgroundColor : '#C13311'}}>
                            <h5 class="modal-title" style={{color : 'white'}}>AJUSTES DE FACTURA</h5>
                            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style={{width : 'auto'}}>
                            <AlterFact props={showFotos}/>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}

export default ListFact;