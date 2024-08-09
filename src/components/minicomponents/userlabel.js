import React from "react";
import { useNavigate } from 'react-router-dom';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
const logo = require('../../assets/dist/img/images/logo_app.png')

export const UserLabel = () => {
    const navigate = useNavigate();


    const account = localStorage.getItem('dataUser');
    const account_data = JSON.parse(account)
    const account_userinfo = account_data.usurario
    const role = account_userinfo.type_ === 1 ? 'Administrador' : 'Supervisor'

    const LogoutUser = () =>{ localStorage.removeItem('dataUser')};

    return (
        <div style={styles.logo}>
            
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , justifyContent : 'space-between' }}>
                <div style={{ marginLeft: 10, marginRight: 15, display: 'flex', alignItems: 'center' , borderRight : '2px solid black'}}>
                    <img src={logo} width={25} height={25}/>
                    <div style={{ color : 'black', fontWeight : 'bold', margin : '0px 10px 0px 10px', fontSize : 15}}>[ KELLER ]</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ color: 'black', margin: 0, fontSize: 10, fontWeight: 'bold', textAlign: 'left' }}>{account_userinfo.nombre}</h4>
                    <h6 style={{ color: 'green', margin: 0, fontSize: 10, textAlign: 'center' }}>{role}</h6>
                </div>
            </div>

            <div style={{ justifySelf: 'center', alignSelf: 'center', marginRight: 5 }} onClick={() => { LogoutUser(); navigate('/'); }}>
                <RemoveCircleSharpIcon style={{ fontSize: 20, color: 'red' }} />
            </div>

        </div>
    )
}

const styles = {
    logo: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 7,
        margin: 3,
        height: 35,
        width: 300,
        justifyContent: 'space-between'
    }
}