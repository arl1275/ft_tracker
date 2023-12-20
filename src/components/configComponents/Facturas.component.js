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
        <div className="card" style={{ display: 'flex', margin: '1rem', flexDirection: 'row' }}>
            <div style={{ margin: '0.5rem', width: 'auto' }}>
                <div className="card">
                    <div className="table-responsive">
                        <div className="table table-vcenter card-table">
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
                                <h3>FACTURA NUMERO : {factShow.ref_factura}</h3>
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
                                        <th>{factShow.id}</th>
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
                            <h3>AQUI SE MOSTRARA LOS DATOS DE LA FACURA</h3>
                        )
                    }
                    
                </div>
            </div>

        </div>
    )

}

export default ListFact;