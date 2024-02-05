import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";

function ListTransportistas() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllTransportistas();
    }, [])

    const getAllTransportistas = async () => {
        try {
          const values = await axios.get(bk_dir + '/trans/transportistas').then(e=>e.data);
          setData(values);
        } catch (err) {
          console.log('err para obtener transportistas')
        }
        
      }

    return (
        <div>
        <div class="col-12" style={{width : '50%', margin : 10}}>
            <div class="card">
                <div class="table-responsive">
                    <table class="table table-vcenter card-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>NOMBRE</th>
                                <th>Cod. EMPLEADO</th>
                                <th>ROL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <div>
                                    <th>CREAR USUARIO NUEVO</th>
                                </div>
                            </tr>
                            {
                                data.length > 0 ?
                                    (
                                        data.map((item) => (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.nombre}</td>
                                            </tr>
                                        ))
                                    )
                                    : <div>SIN DATA</div>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>         
    )

}

export default ListTransportistas;