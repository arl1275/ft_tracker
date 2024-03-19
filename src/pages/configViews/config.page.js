import React, { useState} from "react";
import ListaCamiones from "../../components/configComponents/main_components/Camiones.component";
import ListUsuarios from "../../components/configComponents/main_components/Usuarios.components";
import ListTransportistas from "../../components/configComponents/main_components/Transportistas.components";
import ListFact from "../../components/configComponents/main_components/Facturas.component";
import { List_decEnvio } from "../../components/configComponents/main_components/dec_envios.component";

export function ConfigPage() {
  const [valueP, setValueP] = useState('0');

  const selected = (event, value) => {
    setValueP(value);
  }

  return (
    < >
      <div className="card" style={{ margin: "1rem" }}>
        <div style={{width : 'auto'}}>
          <div className="navbar navbar-expand-md navbar-light d-print-none">
          <button className="btn btn-ghost-primary w-25" onClick={(event) => selected(event, '0')} style={{ borderBottom: '4px solid #48C9B0' }} >DECLARACIONES DE ENVIO</button>
          <button className="btn btn-ghost-primary w-25" onClick={(event) => selected(event, '4')} style={{ borderBottom: '4px solid #48C9B0' }}>FACTURAS</button>
          <button className="btn btn-ghost-primary w-25" onClick={(event) => selected(event, '3')} style={{ borderBottom: '4px solid blue' }}>USUARIOS</button>
          <button className="btn btn-ghost-primary w-25" onClick={(event) => selected(event, '2')} style={{ borderBottom: '4px solid blue' }}>CAMIONES</button>
          {/* <button className="btn btn-ghost-primary active w-25" onClick={(event) => selected(event, '1')}>TRANSPORTISTAS</button> */}
          </div>
        </div>
        { valueP === '1' ? <ListTransportistas /> : null}
        { valueP === '2' ? <ListaCamiones /> : null}
        { valueP === '3' ? <ListUsuarios /> : null}
        { valueP === '4' ? <ListFact /> : null}
        { valueP === '0' ? <List_decEnvio /> : null}
      </div>
    </>
  )

}
