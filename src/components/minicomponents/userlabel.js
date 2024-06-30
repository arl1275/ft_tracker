import React from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate } from 'react-router-dom';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';

export const UserLabel = () => {
    const navigate = useNavigate();


    const account = localStorage.getItem('dataUser');
    const account_data = JSON.parse(account)
    const account_userinfo = account_data.usurario
    const role = account_userinfo.type_ === 1 ? 'Administrador' : 'Supervisor'

    return (
        <div style={styles.logo}>
            <div style={{ display : 'flex' , flexDirection : 'row'}}>
                <div style={{ marginLeft: 10, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <AccountCircleRoundedIcon style={{ fontSize: 20, color: 'grey', marginTop: 3 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ color: 'white', margin: 0, fontSize: 10, fontWeight: 'bold' }}>{account_userinfo.nombre}</h4>
                    <h6 style={{ color: 'green', margin: 0, fontSize: 10 }}>{role}</h6>
                </div>

            </div>

            <div 
            style={{ justifySelf: 'center', alignSelf: 'center', marginRight: 5 }}
            onClick={()=>{navigate('/');}}
            >
                <RemoveCircleSharpIcon style={{ fontSize: 20, color: 'red' }} />
            </div>

        </div>
    )
}

const styles = {
    logo: {
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 100,
        margin: 3,
        height: 30,
        width: 250,
        justifyContent : 'space-between'
    }
}