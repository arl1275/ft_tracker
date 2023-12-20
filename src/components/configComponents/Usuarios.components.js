import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";

function ListUsuarios() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUsuarios();
    }, [])

    const getUsuarios = async () => {
        try {
            const values = await axios.get(bk_dir + '/user/getallUsers').then(e => e.data);
            setData(values.data);
            console.log('data de los usuarios : ', values)
        } catch (error) {
            console.log('err to get usuarios');
        }

    }

    return (
        <div class="col-12">
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
                                                <td>{item.cod_empleado}</td>
                                                <td>{item.id_rol}</td>
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
                                
    )

}

export default ListUsuarios;