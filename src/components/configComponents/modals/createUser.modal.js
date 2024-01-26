
import React, { useState } from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";

export const CreateUser = () => {
    const [user, setNewUser] = useState({
        nombre: '',
        codEmpleado: '',
        _Password: '',
        _QR: '',
        rol: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...user, [name]: value });
      };

    const handleSubmit = async (e) => {
        if(user.codEmpleado === '' || user.nombre === '' || 
        user._Password==='' || user._QR === '' || user.rol === '' || user.rol === '0'){
            alert('ERROR Favor llenar todos los campos')
        }else{
            e.preventDefault();
            await axios.post(bk_dir + '/usuarios/createuser', user);
            console.log('New user:', user);
        }
       
    };

    return (
        <>
            <div className="card">
                <div className="modal-header" style={{backgroundColor : '#02395E'}}>
                    <h2 style={{color : 'white'}}>CREAR USUARIO</h2>
                </div>

                <div className="modal-body">
                    <div className="table-responsive" style={{width: 'auto' }}>
                        <table className="table table-vcenter card-table">
                            <tbody>
                                <tr>
                                    <td className="text-muted">Usuario:</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={user.username}
                                            onChange={(e) => {handleChange(e)}}
                                            style={{ border: 'none', outline: 'none' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-muted">Codigo Empleado:</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="codEmpleado"
                                            value={user.cod_Empleado}
                                            onChange={(e) => {handleChange(e)}}
                                            style={{ border: 'none', outline: 'none' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-muted">Contraseña:</td>
                                    <td>
                                        <input
                                            type="password"
                                            name="_Password"
                                            value={user.password}
                                            onChange={(e) => {handleChange(e)}}
                                            style={{ border: 'none', outline: 'none' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-muted">QR:</td>
                                    <td>
                                        <input
                                            type="password"
                                            name="_QR"
                                            value={user.qr}
                                            onChange={(e) => {handleChange(e)}}
                                            style={{ border: 'none', outline: 'none' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-muted">Role:</td>
                                    <td>
                                        <select className="btn btn-info active w-100" name="rol" value={user.rol} onChange={(e) => { handleChange(e) }} style={{color : 'white'}}>
                                            <option value="4">SUPERVISOR</option>
                                            <option value="3">ENTREGADOR</option>
                                            <option value="2">GUARDIA</option>
                                            <option value="1">ADMINISTRADOR</option>
                                            <option value="0" selected>ROL</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-primary active w-100" onClick={handleSubmit}>CREAR USUARIO</button>
                </div>
            </div>
        </>
    )

}