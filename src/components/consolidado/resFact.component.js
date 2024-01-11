import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";

function ResumenFacturas() {
  const [data, setData] = useState([]);
  const [ver_facts_or_envios, setFactsOrEnvios] = useState(null);

  useEffect(() => {
    getFacs();
  }, []);

  const getFacs = async () => {
    try {
      var data = await axios.get(bk_dir + '/fact/getFacturasWithEntrega').then(e => e.data);
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
      <div className="card" style={{ display : 'flex', flexDirection : 'row',margin: "0.5rem" }}>
        <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
          <button className="btn btn-primary w-auto" style={{ marginTop: '0.5rem', marginBottom: '0rem' }} onClick={getFacs}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
            VER FACTURAS
          </button>
        </div>

        <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
          <button className="btn btn-primary w-auto" style={{ marginTop: '0.5rem', marginBottom: '0rem' }} onClick={getFacs}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
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
              <th>
                <div className="mb-auto">
                  <select name="countries" id="select-countries" className="form-select">
                    <option value="pl" data-data='{"flag": "pl"}' selected>CLIENTE</option>
                    {data.map((item) => (
                      <option key={item.id}>{item.cliente}</option>
                    ))}
                  </select>
                </div>
              </th>
              <th>CAJAS</th>
              <th>UNIDADES</th>
              <th>
                <div className="mb-auto">
                  <select name="countries" id="select-countries" className="form-select" disabled>
                    <option value="pl" data-data='{"flag": "pl"}' selected>DEPARTAMENTO</option>
                  </select>
                </div>
              </th>
              <th>
                <div className="mb-auto">
                  <select name="countries" id="select-countries" className="form-select" disabled>
                    <option value="pl" data-data='{"flag": "pl"}' selected>CIUDAD</option>

                  </select>
                </div>
              </th>
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
      </div>
    </>
  )
}

export default ResumenFacturas;