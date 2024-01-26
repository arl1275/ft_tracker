import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";
//import TableForm from "../table.component";
import TableForm, { TextColumnFilter, NumberColumnFilter } from "../table.component";

function ResumenFacturas() {
  const [data, setData] = useState([]);
  const [ver_facts_or_envios, setFactsOrEnvios] = useState(null);

  //-----------------COLUMNS---------------------
  const columns = [
    { Header: 'PEDIDO', accessor: 'pedidoventa', Filter: TextColumnFilter },
    { Header: 'FACTURA', accessor: 'factura', Filter: TextColumnFilter },
    { Header: 'ALBARAN', accessor: 'albaran', Filter: TextColumnFilter },
    { Header: 'CLIENTE', accessor: 'clientenombre', Filter: TextColumnFilter },
    { Header: 'DEPARTAMENTO', accessor: 'departamento', Filter: TextColumnFilter },
    { Header: 'CIUDAD', accessor: 'ciudad', Filter: TextColumnFilter },
    { Header: 'ESTADO', accessor: 'state_name', Filter: TextColumnFilter },
    { Header: 'DECLARACION', accessor: 'declaracionenvio', Filter: NumberColumnFilter },
    { Header: 'ENTREGADOR', accessor: 'nombre', Filter: TextColumnFilter },
    { Header: 'PLACA', accessor: 'placa', Filter: TextColumnFilter },
  ];
  //---------------------------------------------

  useEffect(() => {
    getFacs();
  }, []);

  const getFacs = async () => {
    try {
      var data = await axios.get(bk_dir + '/facturas/getFactActives').then(e => e.data);
      setData(data.data);
    } catch (error) {
      console.log("err")
    }
  }

  let set_fecha_format = (date) => {
    const fecha = new Date(date);
    const soloFecha = fecha.toISOString().split('T')[0];
    return soloFecha;
  }

  return (
    <>
      <TableForm data={data} columns={columns}/>

      {/* <div className="card" style={{ display: 'flex', flexDirection: 'row', margin: "0.5rem" }}>
        <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
          <button className="btn btn-primary w-auto" style={{ marginTop: '0.5rem', marginBottom: '0rem' }} onClick={getFacs}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
            VER FACTURAS
          </button>
        </div>

        <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
          <button className="btn btn-primary w-auto" style={{ marginTop: '0.5rem', marginBottom: '0rem' }} onClick={getFacs}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
            VER DECLARACIONES DE ENVIO
          </button>
        </div>
      </div> 
      <div className="card">
        <div className="table-responsive">
        <table className="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr>
              <th className="w-auto">FACTURA</th>
              <th>PEDIDO VENTA</th>
              <th>ALBARAN</th>
              <th>LISTA DE ENTREGA</th>
              <th>CLIENTE</th>
              <th>CAJAS</th>
              <th>UNIDADES</th>
              <th>DEPARTAMENTO</th>
              <th>CIUDAD</th>
              <th>UBICACION</th>
              <th>FECHA</th>
              <th>ESTADO</th>
              <th>NOMBRE</th>
              <th>PLACA</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              let valor = item.state_name === 'EN TRANSITO' ? '#48C9B0' : '#CD6155' 
              return(
              <tr key={item.id} style={{backgroundColor : valor}}>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.ref_factura}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.pedidoventa}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.albaran}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.lista_empaque}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.cliente}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.cant_cajas}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.cant_unidades}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>CORTES</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>SAN PEDRO SULA</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.ubicaciones}</div></td>
                <td className="text-left"><div style={{color : 'black'}}>{set_fecha_format(item.fech)}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.state_name}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.nombre}</div></td>
                <td><div style={{color : 'black', textAlign : 'left'}}>{item.placa}</div></td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
      </div> */}
    </>
  )
}

export default ResumenFacturas;