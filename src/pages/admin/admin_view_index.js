import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDespachoView from './admin_view_despacho';
import ResumenFacturas from '../../components/consolidado/resFact.component';
import { ConfigPage } from '../configViews/config.page';
import { ResumenHistorico } from '../../components/Historico/hisotico.view';
import { getItem, setItem, updateItem, deleteItem } from '../../utils/local';
import { initView } from './void_view';
import logo from '../../assets/dist/img/images/logo_app.png';

//styles from plantilla #02395E

function MyTabs() {
  const [page, setPage] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div class="navbar-expand-md" style={{ width: '100%' }}>
          <div class="navbar" style={{ backgroundColor: '#283747' }}>
                <ul class="navbar-nav">

                  <div style={{ marginTop : 3 , marginLeft : 10, display : 'flex'}} onClick={() => { setPage("") }}>
                    <img src={logo} height="30" width="30" alt="Logo" style={{ marginTop : 2}}/>
                    <h4 style={{fontFamily : 'Monospace' , color : 'white', marginTop : 7 , marginLeft : 10, fontSize : 16}}>KELLER</h4>
                    <div style={{ borderRight : '2px solid white', marginLeft : '15%', height : '80%'}}/>
                  </div>
                
                  <li class="nav-item" style={{ marginLeft: 20}}>
                    <button class="btn" onClick={() => { setPage("CONFIG") }} style={{ borderWidth: 0, backgroundColor: '#283747' }}>
                      <h4 style={{ color: 'white' }}>ADMIN</h4>
                    </button>
                  </li>

                  <li class="nav-item">

                    <button class="btn" onClick={() => { setPage("DESPACHO") }} style={{ borderWidth: 0, backgroundColor: '#283747' }}>
                      <h4 style={{ color: 'white' }}>DESPACHO</h4>
                    </button>
                  </li>

                  <li class="nav-item">
                    <button class="btn" onClick={() => { setPage("RESUMEN") }} style={{ borderWidth: 0, backgroundColor: '#283747' }}>
                      <h4 style={{ color: 'white' }}>EN PROCESO</h4>
                    </button>
                  </li>

                  <li className="nav-item" style={{ alignContent: 'center' }} >
                    <button class="btn" onClick={() => { setPage("HISTO") }} style={{ borderWidth: 0, backgroundColor: '#283747' }}>
                      <h4 style={{ color: 'white' }}>HISTORICO</h4>
                    </button>
                  </li>

                  
                  
                </ul>
                <div className="nav-item" style={{ position : 'absolute', right : '3%', top : '15%'}}>
                    <button className="btn" onClick={() => navigate('/')} style={{ borderWidth: 0, backgroundColor: '#283747'}}>
                      <h4 style={{ color: 'white', marginLeft : 10 }}>SALIR</h4>
                    </button>
                    <div style={{ position : 'absolute', top : '15%'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" color='white' class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg></div>
                </div>
          </div>
        </div>

      <body>
        {page == "" && <initView />}
        {page == "DESPACHO" && <AdminDespachoView />}
        {page == "RESUMEN" && <ResumenFacturas />}
        {page == "CONFIG" && <ConfigPage />}
        {page == "HISTO" && <ResumenHistorico />}
      </body>
    </>
  );
}

export default MyTabs;
