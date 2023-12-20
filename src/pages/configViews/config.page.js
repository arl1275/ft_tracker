import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";
import ListaCamiones from "../../components/configComponents/Camiones.component";
import ListUsuarios from "../../components/configComponents/Usuarios.components";
import ListTransportistas from "../../components/configComponents/Transportistas.components";
import ListFact from "../../components/configComponents/Facturas.component";

export function ConfigPage() {
  const [valueP, setValueP] = useState('');

  const selected = (event) =>{
    setValueP(event.target.value);
  }

  return (
    <>
      <div className="card" style={{ margin: "0.5rem" }}>
        <div className="col-12">
          <div className="card">
            <div className="card-body border-bottom py-3">
              <div className="d-flex">
                <div style={{ display: "flex" }}>
                  <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
                    <button className="btn btn-primary w-auto" >
                      ACTUALIZAR
                    </button>
                  </div>
                  <div className="mb-auto" style={{ marginRight: "10px", marginLeft: "10px" }}>
                    <select name="countries" id="select-countries" className="form-select" onChange={selected}>
                      <option value="0">--MASTER--</option>
                      <option value="1">TRANSPORTISTAS</option>
                      <option value="2">CAMIONES</option>
                      <option value="3">USUARIOS</option>
                      <option value="4">FACTURAS</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>
          </div>
          {valueP === '4' ? <ListFact /> : null}
          {valueP === '1' ? <ListTransportistas/> : null}
          {valueP === '2' ? <ListaCamiones/>: null}
          {valueP === '3' ? <ListUsuarios/> : null}

        </div>
      </div>
    </>
  )

}
