import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";

export const ConfigUser = ({dat}) => {
    const [data, setData] = useState();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(()=>{ setData(dat)}, [dat]);

    const handleEdit = () => { setIsEditing(!isEditing)};
    const handleChange = (e) => { setData({ ...data, [e.target.name]: e.target.value }); };

    const updateUser = async () =>{
        try {
            console.log('usuario actu: ', data);
            const result = await axios.put(bk_dir + '/usuarios/update_user', data);

            if(result.status === 200){
                alert('SE MODIFICO CORRECTAMENTE')
            }else{
                alert('NO SE HA REALIZADO EL CAMBIO')
            }

        } catch (err) {
            alert('ERROR AL ACTUALIZAR USUARIO : ', err);
        }
    }

    
    const renderEditableFields = () => {
        return (
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-vcenter card-table table-striped" >
                        <tbody>
                            <tr style={{ textAlign : 'left'}}>
                                <td style={{ alignItems: "start" }}>NOMBRE:</td>
                                <td><input type="text" name="nombre" value={data?.nombre} onChange={handleChange} style={{ border: "none" }} /></td>
                            </tr>
                            <tr style={{ textAlign : 'left'}}>
                                <td>Cod. Empleado:</td>
                                <td><input type="text" name="cod_empleado" value={data?.cod_empleado} onChange={handleChange} style={{ border: "none" }} disabled /></td>
                            </tr>
                            <tr style={{ textAlign : 'left'}}>
                                <td>Password:</td>
                                <td><input type="password" name="_password" value={data?._password} onChange={handleChange} style={{ border: "none" }} /></td>
                            </tr>
                            <tr style={{ textAlign : 'left'}}>
                                <td>QR:</td>
                                <td><input type="text" name="_qr" value={data?._qr} onChange={handleChange} style={{ border: "none" }} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        );
    };

    return (
        <div className="card">

            <div className="card-header" style={{ backgroundColor : 'black'}}>
                <h3 style={{ color : 'white'}}>CONFIGURAR USUARIO</h3>

                {isEditing ?
                    <div style={{display : 'flex', flexDirection : 'row', marginLeft : 'auto'}}>
                        <button style={{ marginLeft: '5px', alignSelf : 'end', backgroundColor : 'green'}} className="btn btn-dark w-auto" onClick={()=>{handleEdit(); updateUser()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                                <circle cx="12" cy="14" r="2" /><polyline points="14 4 14 8 8 8 8 4" /></svg>
                            GUARDAR
                        </button>

                        <button style={{ marginLeft: '5px', backgroundColor : '#CC0033', justifyContent : 'center'}} className="btn btn-dark w-auto" onClick={handleEdit}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="auto" height="24" viewBox="0 0 24 24"
                                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="9" /><path d="M10 10l4 4m0 -4l-4 4" />
                                </svg> CANCELAR
                        </button>
                    </div>
                    :
                    <button style={{ marginLeft: 'auto' , backgroundColor : 'black'}} className="btn btn-dark" onClick={handleEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="auto" height="24" viewBox="0 0 24 24"
                            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                        </svg> EDITAR
                    </button>}
            </div>

            <div>
                {isEditing ? (
                    renderEditableFields()
                ) : (
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-vcenter card-table table-striped">
                                <tbody>
                                    <tr style={{ textAlign : 'left'}}>
                                        <td>NOMBRE:</td>
                                        <td>{data?.nombre}</td>
                                    </tr>
                                    <tr style={{ textAlign : 'left'}}>
                                        <td>Cod. Empleado:</td>
                                        <td>{data?.cod_empleado}</td>
                                    </tr>
                                    <tr style={{ textAlign : 'left'}}>
                                        <td>Password:</td>
                                        <td>no visible</td>
                                    </tr>
                                    <tr style={{ textAlign : 'left'}}>
                                        <td>QR:</td>
                                        <td>{data?._qr}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}