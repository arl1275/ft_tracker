import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminDespachoView from './admin_view_despacho';
//import ResumenFacturas from '../../components/resFact.component';
import ResumenFacturas from '../../components/consolidado/resFact.component';
import { ConfigPage } from '../configViews/config.page';
import { ResumenHistorico } from '../../components/Historico/hisotico.view';

//styles from plantilla

function MyTabs() {
  const [page, setPage] = useState("DESPACHO");


  return (
    <>

      <div class="navbar-expand-md">
        <div class="collapse navbar-collapse" id="navbar-menu">
          <div class="navbar navbar-light">
            <div style={{ position: 'absolute' }}>
              <div class="container-xl">

                <ul class="navbar-nav">

                  <li class="nav-item">
                    <a class="nav-link">
                      <span class="nav-link-title">
                        <button class="btn" onClick={() => { setPage("CONFIG") }} style={{borderWidth : 0}}>
                          <span class="nav-link-icon d-md-none d-lg-inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><rect x="3" y="4" width="18" height="12" rx="1" /><line x1="7" y1="20" x2="17" y2="20" /><line x1="9" y1="16" x2="9" y2="20" /><line x1="15" y1="16" x2="15" y2="20" /></svg>
                          </span>
                          ADMIN
                        </button>
                      </span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link">
                      <span class="nav-link-title">
                        <button class="btn" onClick={() => { setPage("DESPACHO") }} style={{borderWidth : 0}}>
                          <span class="nav-link-icon d-md-none d-lg-inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /></svg>
                          </span>
                          DESPACHO
                          </button>
                      </span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                      <span class="nav-link-title">
                        <button class="btn" onClick={() => { setPage("RESUMEN") }} style={{borderWidth : 0}}>
                          <span class="nav-link-icon d-md-none d-lg-inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" /><line x1="8" y1="8" x2="12" y2="8" /><line x1="8" y1="12" x2="12" y2="12" /><line x1="8" y1="16" x2="12" y2="16" /></svg>
                          </span>
                          RESUMEN DE ACTIVOS</button>
                      </span>
                    </a>
                  </li>

                  <li class="nav-item">
                    
                    <button class="btn" onClick={() => { setPage("HISTO") }} style={{borderWidth : 0}}>
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" /><line x1="13" y1="8" x2="15" y2="8" /><line x1="13" y1="12" x2="15" y2="12" /></svg>
                      </span>
                        HISTORICO
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
        {page == "HISTO" && <ResumenHistorico/>}
      </body>
    </>
  );
}

export default MyTabs;
