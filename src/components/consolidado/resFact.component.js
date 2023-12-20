import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";

function ResumenFacturas() {
  const [data, setData] = useState([]);
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
      <div className="card">
        <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
          <button className="btn btn-primary w-auto" style={{ marginTop: '0.5rem', marginBottom: '0rem' }} onClick={getFacs}>
            ACTUALIZAR
          </button>
        </div>
      </div>

      <div className="card">
      <div className="table-responsive">
        <table className="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr>
              <th className="w-auto">FACTURA</th>
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
            {data.map((item) => (
              <tr key={item.id}>
                <td><span className="text-muted">{item.ref_factura}</span></td>
                <td><a href="invoice.html" className="text-reset" tabindex="-1">{item.lista_empaque}</a></td>
                <td>{item.cliente}</td>
                <td>{item.cant_cajas}</td>
                <td>{item.cant_unidades}</td>
                <td>CORTES</td>
                <td>SAN PEDRO SULA</td>
                <td>{item.ubicaciones}</td>
                <td className="text-left">{set_fecha_format(item.fech)}</td>
                <td>{item.state_name}</td>
                <td>{item.nombre}</td>
                <td>{item.placa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  )
}

export default ResumenFacturas;