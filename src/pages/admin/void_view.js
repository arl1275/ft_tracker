import React from "react";
import logo from '../../assets/dist/img/images/logo_app.png';

export const initView = () => {
    return (
        <div style={{backgroundColor : 'red'}}>
            <div>
                <div>
                    <img src={logo} height="30" width="30" alt="Logo" style={{ marginTop: 2 }} /> 
                    <h4 style={{ fontFamily: 'Monospace', color: 'white', marginTop: 7, marginLeft: 10, fontSize: 16 }}>KELLER</h4>
                </div>

            </div>
        </div>
    )
}