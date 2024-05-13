import React from "react";

export const UserLabel = () => {
    const account = localStorage.getItem('dataUser');
    const account_data = JSON.parse(account)
    const account_userinfo = account_data.usurario
    const role = account_userinfo.type_ === 1 ? 'Administrador' : 'Supervisor'

    return(
        <div style={{ backgroundColor : 'white'}}>
            <div style={{ display : 'flex', flexDirection : 'column'}}>
                <h4 style={{ color : 'black', margin : 0}}>{account_userinfo.nombre}</h4>
                <h6 style={{ color : 'green', margin : 0}}>{role}</h6>
            </div>
        </div>
    )
}