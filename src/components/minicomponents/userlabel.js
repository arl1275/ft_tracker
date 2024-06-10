import React from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate } from 'react-router-dom';

export const UserLabel = () => {
    const navigate = useNavigate();


    const account = localStorage.getItem('dataUser');
    const account_data = JSON.parse(account)
    const account_userinfo = account_data.usurario
    const role = account_userinfo.type_ === 1 ? 'Administrador' : 'Supervisor'

    return (
        <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginLeft : 10, marginRight : 15, marginTop : 5}}>
                <AccountCircleRoundedIcon style={{ fontSize : 30 , color : 'black'}}/>        
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ color: 'black', margin: 0 }}>{account_userinfo.nombre}</h4>
                <h6 style={{ color: 'green', margin: 0 }}>{role}</h6>
            </div>

            <div style={{ margin: 3, width: 150, color: 'black', fontWeight: 'bold' }}>
                <select 
                    id="salir" 
                    className="selectize-input items full has-options has-items"
                    style={{ backgroundColor: 'white', borderWidth: 0 }}
                    onChange={(e) => {
                        if (e.target.value === 'SALIR') {
                            localStorage.removeItem('dataUser');
                            navigate('/');
                        }
                    }}>

                    <option value="main" className='selectize-dropdown single from'
                        style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>KELLER</option>

                    <option value="SALIR" style={{ backgroundColor: 'white' }}>SALIR</option>
                </select>
            </div>
        </div>
    )
}