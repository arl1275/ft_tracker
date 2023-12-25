import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";
import { ConfigUser } from "./minComponents/configUsers.components";

function ListUsuarios() {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

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

    const setRole = (value) => {
        if (value === 1) {
            return 'TRANSPORTISTA';
        } else if (value === 2) {
            return 'ADMIN';
        } else {
            return 'GUARDIA';
        }
    }

    return (
        <div className="card" style={{ margin: 20, backgroundColor: '#F8F9F9' }}>
            <div class="col-12" style={{ display: 'flex', flexDirection: 'row' }}>
                <div class="card" style={{ width: '60%', margin: 5 }}>
                    <div class="table-responsive">
                        <table class="table table-vcenter card-table">
                            <thead>
                                <tr>
                                    <th>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th>NOMBRE</th>
                                    <th>Cod. EMPLEADO</th>
                                    <th>QR</th>
                                    <th>ROL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ?
                                    (
                                        data.map((item) => (
                                            <tr onClick={() => { setSelectedUser(item) }}>
                                                <td>{item.id}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.cod_empleado}</td>
                                                <td></td>
                                                <td>{setRole(item.id_rol)}</td>
                                            </tr>
                                        ))
                                    )
                                    : <div>SIN DATA</div>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card" style={{ width: 'auto', margin: 5 }}>
                    {selectedUser ? ( <ConfigUser data2={selectedUser}/>) : (

                        <div>
                            <div className="card-header">
                                <h3>INFORMACION DE USUARIO</h3>
                            </div>
                            <div className="card"
                                style={{ width: 'auto', height: 'auto', alignSelf: 'center', margin: 20, flexDirection: 'row' }}>
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
                                <p>Seleccione un usuario, para ver la información aqui</p>
                            </div>
                        </div>

                    )

                    }

                </div>
            </div>
        </div>
    )

}

export default ListUsuarios;