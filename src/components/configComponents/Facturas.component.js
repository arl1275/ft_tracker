import React, { useState, useEffect } from "react";
import { bk_dir } from "../../conf/configuration.file";
import axios from "axios";


function ListFact() {
    const [data, setData] = useState([]);
    const [factShow, setFactShow] = useState(null);


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

    return (
        <div className="card" style={{ display: 'flex', margin: '1rem', flexDirection: 'row', backgroundColor: '#F4F6F6' }}>
            <div style={{ margin: '0.5rem' }}>
                <div className="card">
                    <div className="table-responsive">
                        <div className="table card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th>REF Factura</th>
                                    <th>Cliente</th>
                                    <th>Lista Empaque</th>
                                    <th>Estado</th>
                                    <th>Nombre</th>
                                    <th>Placa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item) => (
                                        <tr onClick={() => { setFactShow(item) }}>
                                            <td>{item.ref_factura}</td>
                                            <td>{item.cliente}</td>
                                            <td>{item.lista_empaque}</td>
                                            <td>{item.state_name}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.placa}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ margin: '0.5rem', width: 'auto' }}>
                <div className="card">
                    <div className="card-header">
                        {
                            factShow ? (
                                <div>
                                    <h3>FACTURA NUMERO : {factShow.ref_factura}</h3>
                                </div>
                                
                            ) : (
                                <h3>DETALLE DE FACTURAS</h3>
                            )
                        }
                    </div>
                    {
                        factShow ? (
                            <div className="card-body">
                                <div className="table-responsive">
                                    <div className="table table-vcenter card-table">
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
                                                <td>{factShow.create_at}</td>
                                            </tr>
                                            <tr>
                                                <td>TOMA PREPARACION :</td>
                                                <td>{factShow.toma_preparacion}</td>
                                            </tr>
                                            <tr>
                                                <td>TOMA TRANSITO:</td>
                                                <td>{factShow.toma_transito}</td>
                                            </tr>
                                            <tr>
                                                <td>TOMA ENTREGA :</td>
                                                <td>{factShow.fecha_hora_entrega}</td>
                                            </tr>
                                            <tr>
                                                <td>TOMA SINCRONIZADO: </td>
                                                <td>{factShow.toma_sincronizado}</td>

                                            </tr>

                                        </tbody>

                                    </div>

                                </div>

                            </div>
                        ) :
                            (
                                <div className="card"
                                    style={{ width: '90%', height: 'auto', 
                                    alignSelf: 'center', margin: 20, flexDirection : 'row' }}>
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

        </div>
    )

}

export default ListFact;