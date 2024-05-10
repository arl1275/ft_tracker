import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDespachoView from './admin_view_despacho';
import ResumenFacturas from '../../components/consolidado/resFact.component';
import { ConfigPage } from '../configViews/config.page';
import { ResumenHistorico } from '../../components/Historico/hisotico.view';

function MyTabs() {
  const [page, setPage] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div class="navbar-expand-md" 
        style={{ width: '97%', 
                height : 'auto', 
                borderRadius : 10, 
                borderWidth : 1, 
                borderColor : 'black', 
                backgroundColor : 'black',
                margin : 10 }}
      >
        <div class="navbar" >

          <ul class="navbar-nav">

            <div style={{ margin : 3 ,  marginTop : 5, width : 150,  color : 'white', fontWeight : 'bold'}}>
              <select id="salir" className="selectize-input items full has-options has-items" 
              style={{ backgroundColor: 'black', borderWidth : 0}}
                onChange={(e) => {
                  if (e.target.value === 'SALIR') {
                    localStorage.removeItem('dataUser');
                    navigate('/'); 
                  }
                }}
              >
                <option value="main" className='selectize-dropdown single from' style={{ backgroundColor: 'black', color : 'white', fontWeight : 'bold'}}>KELLER</option>

                <option value="SALIR" style={{ backgroundColor: '#1a1a1a'}}>SALIR</option>
              </select>
            </div>

            <li class="nav-item" style={{ marginLeft: 20 }}>
              <button class="btn" onClick={() => { setPage("CONFIG") }} style={{ borderWidth: 0, backgroundColor: 'black' }}>
                <h4 style={{ color: 'white' }}>ADMIN</h4>
              </button>
            </li>

            <li class="nav-item">

              <button class="btn" onClick={() => { setPage("DESPACHO") }} style={{ borderWidth: 0, backgroundColor: 'black' }}>
                <h4 style={{ color: 'white' }}>DESPACHO</h4>
              </button>
            </li>

            <li class="nav-item">
              <button class="btn" onClick={() => { setPage("RESUMEN") }} style={{ borderWidth: 0, backgroundColor: 'black' }}>
                <h4 style={{ color: 'white' }}>EN PROCESO</h4>
              </button>
            </li>

            <li className="nav-item" style={{ alignContent: 'center' }} >
              <button class="btn" onClick={() => { setPage("HISTO") }} style={{ borderWidth: 0, backgroundColor : 'black' }}>
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
