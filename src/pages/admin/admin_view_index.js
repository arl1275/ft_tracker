import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminDespachoView from './admin_view_despacho';
//import ResumenFacturas from '../../components/resFact.component';
import ResumenFacturas from '../../components/consolidado/resFact.component';
import { ConfigPage } from '../configViews/config.page';

//styles from plantilla

function MyTabs() {
  const [page, setPage] = useState("DESPACHO");


  return (
    <>
    
      <div class="navbar-expand-md">
        <div class="collapse navbar-collapse" id="navbar-menu">
          <div class="navbar navbar-light">
            <div style={{position : 'absolute'}}>
            <div class="container-xl">

              <ul class="navbar-nav">

              <li class="nav-item">
                  <a class="nav-link">
                    <span class="nav-link-title">
                      <button class="btn" onClick={()=>{setPage("CONFIG")}}>
                        <span class="nav-link-icon d-md-none d-lg-inline-block">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 12l2 2l4 -4" /></svg>
                        </span>
                        ADMIN
                        </button>
                    </span>
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link">
                    <span class="nav-link-title">
                      <button class="btn" onClick={()=>{setPage("DESPACHO")}}>
                        <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /></svg>
                        </span>
                        DESPACHO</button>
                    </span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">
                    <span class="nav-link-title">
                      <button class="btn" onClick={()=>{setPage("RESUMEN")}}>
                        <span class="nav-link-icon d-md-none d-lg-inline-block">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 12l2 2l4 -4" /></svg>
                        </span>
                        RESUMEN</button>
                    </span>
                  </a>
                </li>
                
                <li class="nav-item">
                  <a class="nav-link" href="./form-elements.html" >
                    <span class="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><polyline points="9 11 12 14 20 6" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                    </span>
                    <span class="nav-link-title">
                      HISTORICO
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
      <body>
        {page == "DESPACHO" && <AdminDespachoView/>}
        {page == "RESUMEN" &&  <ResumenFacturas />}
        {page == "CONFIG" &&  <ConfigPage />}
      </body>
    </>
  );
}

export default MyTabs;
