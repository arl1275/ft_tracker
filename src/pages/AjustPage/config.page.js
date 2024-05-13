import React, { useState } from "react";
import AdminNavbar from "../../components/minicomponents/adminnavbar";
import ListTransportistas from "../../components/configComponents/main_components/Transportistas.components";
import ListFact from "../../components/configComponents/main_components/Facturas.component";
import { List_decEnvio } from "../../components/configComponents/main_components/dec_envios.component";
import AdvancedView from "../../components/advancedView/advanced";
import { Routes, Route } from 'react-router-dom';

export function ConfigPage() {
  
  return (
    <div style={{ height: '85vh' }}>
      <AdminNavbar />
      <Routes>
        <Route path='/declaraciones' element={<List_decEnvio />} />
        <Route path='/facturas' element={<ListFact />} />
        <Route path='/avanzado' element={<AdvancedView/>}/>
      </Routes>
    </div>
  )

}
