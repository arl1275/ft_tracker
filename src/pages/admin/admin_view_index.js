import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminDespachoView from './admin_view_despacho';
//import ResumenFacturas from '../../components/resFact.component';
import ResumenFacturas from '../../components/consolidado/resFact.component';
import { ConfigPage } from '../configViews/config.page';
import { ResumenHistorico } from '../../components/Historico/hisotico.view';

//styles from plantilla

function MyTabs() {
  const [page, setPage] = useState("DESPACHO");
  const navigate = useNavigate();

  return (
    <>
      <div class="navbar-expand-md">
        <div class="collapse navbar-collapse" id="navbar-menu" >
          <div class="navbar" style={{ backgroundColor: '#02395E' }}>
            <div style={{ position: 'absolute' }}>
              <div class="container-xl">

                <ul class="navbar-nav">

                  <li class="nav-item" style={{ marginLeft: 0 }}>
                    <a class="nav-link" style={{ display: 'flex', flexDirection: 'row' }}>
                      <span class="nav-link-title" >
                        <button class="btn" onClick={() => { setPage("CONFIG") }} style={{ borderWidth: 0, backgroundColor: '#02395E' }}>
                          <h4 style={{ color: 'white' }}>ADMIN</h4>
                        </button>
                      </span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link">
                      <span class="nav-link-title">
                        <button class="btn" onClick={() => { setPage("DESPACHO") }} style={{ borderWidth: 0, backgroundColor: '#02395E' }}>
                          <h4 style={{ color: 'white' }}>DESPACHO</h4>
                        </button>
                      </span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link">
                      <span class="nav-link-title">
                        <button class="btn" onClick={() => { setPage("RESUMEN") }} style={{ borderWidth: 0, backgroundColor: '#02395E' }}>
                          <h4 style={{ color: 'white' }}>EN PROCESO</h4>
                        </button>
                      </span>
                    </a>
                  </li>

                  <li className="nav-item" style={{ alignContent: 'center' }} >
                    <button class="btn" onClick={() => { setPage("HISTO") }} style={{ borderWidth: 0, backgroundColor: '#02395E' }}>
                      <h4 style={{ color: 'white' }}>HISTORICO</h4>
                    </button>

                  </li>

                    <li className="nav-item" style={{ left : 0}}>
                      <button className="btn" onClick={() => navigate('/')} style={{ borderWidth: 0, backgroundColor: '#02395E' }}>
                        <h4 style={{ color: 'white' }}>SALIR</h4>
                      </button>
                    </li>
                 

                </ul>
                

              </div>
            </div>
          </div>
        </div>
      </div>
      <body>
        {page == "DESPACHO" && <AdminDespachoView />}
        {page == "RESUMEN" && <ResumenFacturas />}
        {page == "CONFIG" && <ConfigPage />}
        {page == "HISTO" && <ResumenHistorico />}
      </body>
    </>
  );
}

export default MyTabs;
