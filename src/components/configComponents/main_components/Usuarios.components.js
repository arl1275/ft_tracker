import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";
import { ConfigUser } from "../minComponents/configUsers.components";
import { CreateUser } from "../modals/createUser.modal";

function ListUsuarios() {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUs, setShowUs] = useState(false)

    useEffect(() => {
        getUsuarios();
    }, [])

    const getUsuarios = async () => {
        try {
            const values = await axios.get(bk_dir + '/usuarios/getallUsers').then(e => e.data);
            setData(values.data);
        } catch (error) {
            console.log('err to get usuarios');
        }

    }
    
    const showUse = () =>{
        setShowUs(!showUs);
    }

    const setRole = (value) => {
        if (value === 3) {
            return 'ENTREGADOR';
        } else if (value === 1) {
            return 'ADMIN';
        }else if(value === 4){
            return 'SUPERVISOR';
        } else if(value === 2){
            return 'GUARDIA';
        }
    }

    return (
        <>
            <div className="card" style={{ margin: 10, backgroundColor: '#ECF0F1' }}>
                <div class="col-12" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div class="card" style={{ width: '60%', margin: 5 }}>
                        <div class="table-responsive">
                            <table class="table table-vcenter card-table">
                                <thead>
                                    <tr style={{ textAlign : 'left', backgroundColor : 'black'}}>
                                        <th>
                                            <button data-toggle="modal" data-target="#modal-simple" 
                                            style={{backgroundColor : 'green', borderWidth : 0, borderRadius : 3 , width : '100%', height : 'auto'}}>
                                                <div style={{color : 'white'}}>CREAR</div>
                                            </button>
                                        </th>
                                        <th style={{ color : 'white' }}>NOMBRE</th>
                                        <th style={{ color : 'white' }}>CODIGO</th>
                                        <th style={{ color : 'white' }}>QR</th>
                                        <th style={{ color : 'white' }}>ROL</th>
                                        <th className="w-auto"> VER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ?
                                        (
                                            data.map((item) => (
                                                <tr style={{ textAlign : 'left'}}>
                                                    <td style={{ textAlign : 'center'}}>{item.id}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.cod_empleado}</td>
                                                    <td>{item._qr ?
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                                                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" color="green">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
                                                        </div>
                                                        :
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                                                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" color="red">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="9" />
                                                                <path d="M10 10l4 4m0 -4l-4 4" />
                                                            </svg>
                                                        </div>}</td>
                                                    <td>{setRole(item.id_role)}</td>
                                                    <td onClick={() => {setSelectedUser(item); showUse()}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                                                            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="2" />
                                                            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                                                        </svg>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                        : <div>SIN DATA</div>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card" style={{ width: '40%', margin: 5 }}>
                        {showUs ?  (<ConfigUser dat={selectedUser} />): (
                            <div>
                                <div className="card-header" style={{ backgroundColor : 'black'}}>
                                    <h3 style={{ color : 'white' }}>INFORMACION DE USUARIO</h3>
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
                        )}
                    </div>
                </div>
            </div>


            <div class="modal modal-blur fade" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true" >
                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                            <CreateUser />
                </div>
                </div>
            </div>

        </>
    )

}

export default ListUsuarios;