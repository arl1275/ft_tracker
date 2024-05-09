import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDespachoView from './admin_view_despacho';
import ResumenFacturas from '../../components/consolidado/resFact.component';
import { ConfigPage } from '../configViews/config.page';
import { ResumenHistorico } from '../../components/Historico/hisotico.view';

//styles from plantilla #02395E

function MyTabs() {
  const [page, setPage] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor : 'black'}}>
      <div class="navbar-expand-md" style={{ width: '100%' }}>
        <div class="navbar" style={{ backgroundColor: '#283747', color : 'white' }}>
          <ul class="navbar-nav">

            <div style={{ margin : 3 ,  marginTop : 5, width : 100}}>
              <select id="salir" className="selectize-input items full has-options has-items" style={{ backgroundColor: '#283747', borderWidth : 0}}
                onChange={(e) => {
                  if (e.target.value === 'SALIR') {
                    localStorage.removeItem('dataUser');
                    navigate('/'); 
                  }
                }}
              >
                <option value="main" className='selectize-dropdown single from' style={{ backgroundColor: '#283747'}}>KELLER</option>

                <option value="SALIR" style={{ backgroundColor: '#283747'}}>SALIR</option>
              </select>
            </div>

            <li class="nav-item" style={{ marginLeft: 20 }}>
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

        </div>
      </div>

      <body>
        {page == "" && <initView />}
        {page == "DESPACHO" && <AdminDespachoView />}
        {page == "RESUMEN" && <ResumenFacturas />}
        {page == "CONFIG" && <ConfigPage />}
        {page == "HISTO" && <ResumenHistorico />}
      </body>
    </div>
  );
}

export default MyTabs;
