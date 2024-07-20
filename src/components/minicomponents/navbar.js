import React, { useState } from 'react';
import { Botton_Navbar } from '../../components/minicomponents/button';
import { UserLabel } from '../../components/minicomponents/userlabel';
import { useNavigate } from 'react-router-dom';

function NavbarMenu() {
    const [page, setPage] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <div 
                style={{
                    width: 'auto',
                    height: 'auto',
                    backgroundColor: 'white',
                }}>

                <div>
                    <ul className="navbar-nav" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', 
                        justifyContent: 'space-between', borderWidth : 1, borderColor : 'black'}}>

                        <li className="nav-item" style={{ alignContent: 'center', marginLeft: 10 }}>
                            <UserLabel />
                        </li>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                height: 35,
                                padding: 5,
                                borderRadius: 50,
                                width: '40%',
                                marginRight: 10
                            }}
                        >
                            <li className="nav-item" style={{ marginRight: 5 }} onClick={() => { setPage("ADMINISTRACION"); navigate('/main/administration', { replace: true }) }} >
                                <Botton_Navbar texto={'ADMINISTRACION'} proppage={page} />
                            </li>

                            <li className="nav-item" style={{ marginLeft: 5, marginRight: 5 }} onClick={() => { setPage("HISTORICO"); navigate('/main/historic', { replace: true }) }} >
                                <Botton_Navbar texto={'HISTORICO'} proppage={page} />
                            </li>

                            <li className="nav-item" style={{ marginLeft: 5, marginRight: 5 }} onClick={() => { setPage("RESUMEN"); navigate('/main/dashboard', { replace: true }) }}>
                                <Botton_Navbar texto={'RESUMEN'} proppage={page} />
                            </li>

                            <li className="nav-item" style={{ marginLeft: 5, marginRight: 5 }} onClick={() => { setPage("DESPACHO"); navigate('/main/dispach', { replace: true }) }}>
                                <Botton_Navbar texto={'DESPACHO'} proppage={page} />
                            </li>
                        </div>

                    </ul>
                </div>

            </div>
        </div>
    );
}

export default NavbarMenu;
