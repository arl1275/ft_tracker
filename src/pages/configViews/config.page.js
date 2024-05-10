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
      <div className="card" style={{ margin: "1rem", backgroundColor : 'white', borderWidth : 1, borderColor : '#4d4d4d',  borderRadius : 10}}>
        
        <div className="navbar navbar-expand-md navbar-light d-print-none" style={{ backgroundColor : 'black', borderRadius : 10}}>
          <button className="btn btn-ghost-primary w-25" onClick={(event) => selected(event, '0')} style={{ borderBottom: valueP === '0' ? '4px solid white' : 'none' , backgroundColor : 'black' , color : 'white' }}>DECLARACIONES DE ENVIO</button>
          <button className="btn btn-ghost-primary w-25" onClick={(event) => selected(event, '4')} style={{ borderBottom: valueP === '4' ? '4px solid white' : 'none' , backgroundColor : 'black' , color : 'white' }}>FACTURAS</button>
          <button className="btn btn-ghost-primary w-25" onClick={(event) => selected(event, '3')} style={{ borderBottom: valueP === '3' ? '4px solid white' : 'none' , backgroundColor : 'black' , color : 'white' }}>USUARIOS</button>
          <button className="btn btn-ghost-primary w-25" onClick={(event) => selected(event, '2')} style={{ borderBottom: valueP === '2' ? '4px solid white' : 'none' , backgroundColor : 'black' , color : 'white' }}>CAMIONES</button>
          
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
