import React, { useState, useEffect } from "react";

export const ConfigUser = ({ data2 }) => {
    

    const [data, setData] = useState(data2);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const renderEditableFields = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
                <input type="text" name="nombre" value={data.nombre} onChange={handleChange} style={{borderWidth : '0px 0px 1px 0px'}}/>
                <input type="text" name="cod_empleado" value={data.cod_empleado} onChange={handleChange} style={{borderWidth : '0px 0px 1px 0px'}}/>
                <input type="password" name="_password" value={data._password} onChange={handleChange} style={{borderWidth : '0px 0px 1px 0px'}}/>
                <input type="text" name="_qr" value={data._qr} onChange={handleChange} style={{borderWidth : '0px 0px 1px 0px'}}/>
            </div>
        );
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3>CONFIGURAR USUARIO</h3>
                <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
            </div>
            <div>
                {isEditing ? (
                    renderEditableFields()
                ) : (
                    <div>
                        <p>{data.nombre}</p>
                        <p>{data.cod_empleado}</p>
                        <p>{data._password}</p>
                        <p>{data._qr}</p>
                    </div>
                )}
            </div>
        </div>
    );

}