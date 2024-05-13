import React, { useState } from 'react';
import { Botton_Navbar } from '../../components/minicomponents/button';
import { UserLabel } from '../../components/minicomponents/userlabel';
import { useNavigate } from 'react-router-dom';

function NavbarMenu() {
    const [page, setPage] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <div className="navbar-expand-md"
                style={{
                    width: '100%',
                    height: 40,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    backgroundColor: 'white'
                }}
            >
                <div>

                    <ul className="navbar-nav">

                        <div style={{ margin: 3, width: 150, color: 'black', fontWeight: 'bold' }}>
                            <select id="salir" className="selectize-input items full has-options has-items"
                                style={{ backgroundColor: 'white', borderWidth: 0 }}
                                onChange={(e) => {
                                    if (e.target.value === 'SALIR') {
                                        localStorage.removeItem('dataUser');
                                        navigate('/');
                                    }
                                }}
                            >
                                <option value="main" className='selectize-dropdown single from'
                                    style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>KELLER</option>

                                <option value="SALIR" style={{ backgroundColor: '#1a1a1a' }}>SALIR</option>
                            </select>
                        </div>

                        <li className="nav-item" style={{ marginRight: 5 }} onClick={() => { setPage("ADMIN"); navigate('/main/administration', { replace: true }) }} >
                            <Botton_Navbar texto={'ADMIN'} proppage={page} />
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

                        <li className="nav-item" style={{ alignContent: 'center', position: 'absolute', right: '5%' }}>
                            <UserLabel />
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    );
}

export default NavbarMenu;
