import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file.js";
import ResumenConsolidado from "../../components/consolidado/resumeconsolidation.component.js";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";

function AdminDespachoView() {
  const [data, setData] = useState([]);
  const [selected_facturas, setSelectedFacturas] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeydown = (e) => {
    const new_val = e;

    if (new_val.startsWith('AL')) {

      if (new_val.startsWith('AL')) {
        const valor = new_val.replace(/["/\\.,'\-`|_{}[\]]/g, '-');

        if (data.some((item) => item.factura === valor)) {
          const data_fact = data.filter((item) => item.factura === valor);
          get_selected_facturas(data_fact[0]);
        }
      }

    }
    else {
      const replaced_val = new_val.replace(/["/\\.,'\-`|_{}[\]]/g, '-');
      const match = replaced_val.match(/(?:[^-]*-){3}(\d+)/);

      if (match && match[1]) {
        const valor = match[1];
        const data_fact = data.filter((item) => item.factura === valor);
        get_selected_facturas(data_fact[0]);
      }
    }
  }


  useEffect(() => {
    inputRef.current?.focus();
  }, [])



  //---------------------------------------------------------------------------
  useEffect(() => {
    getFacturas();
  }, []);

  const getFacturas = async () => {
    try {
      var data = await axios.get(bk_dir + '/facturas/get_all_facturas').then(e => e.data);
      setData(data.data);
    } catch (error) {
      console.log("err : ", error)
    }
  };

  const get_selected_facturas = (fact) => {
    console.log('FROM SCANER : ', fact);
    setSelectedFacturas((prevSelectedFacturas) => {
      const index = prevSelectedFacturas.findIndex((item) => item.factura === fact.factura);
      if (index === -1) {
        return [...prevSelectedFacturas, fact]; // Add the new item
      } else {
        return prevSelectedFacturas.filter((item) => item.factura !== fact.factura);
      }
    });
  };


  const clearSelectedArray = () => {
    setSelectedFacturas([]);
  }

  return (
    <>
      <div className="card" style={{ margin: "0.5rem" }}>
        <div className="col-12">
          <div className="card">
            <div className="card-body border-bottom py-3">
              <div className="d-flex" style={{ flexDirection: 'row' }}>
                <div style={{ display: "flex" }}>
                  <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
                    <button className="btn btn-primary w-auto" onClick={getFacturas}>
                      ACTUALIZAR
                    </button>
                  </div>
                  {/* <div className="mb-auto" style={{ marginRight: "10px", marginLeft: "10px" }}>
                    <select name="countries" id="select-countries" className="form-select" disabled>
                      <option value="1" selected>PAIS</option>
                    </select>
                  </div> */}
                </div>

                <div style={{ display: "flex" }}>

                  {/* <div className="mb-auto" style={{ marginRight: "10px" }}>
                    <select name="countries" id="select-countries" className="form-select" disabled>
                      <option value="pl" id='1'>TRANSPORTISTA</option>
                    </select>
                  </div> */}

                  <div className="col-6 col-sm-4 col-md-2 col-xl mb-3" style={{marginLeft : 10}}>
                    <ResumenConsolidado props={selected_facturas} clearArray={clearSelectedArray} />
                  </div>

                </div>

                <input
                  type="text"
                  autoFocus
                  ref={inputRef}
                  style={{ opacity: 0 }}
                  onBlur={() => inputRef.current?.focus()}
                  onKeyDown={(Event) => {
                    if (Event.key === 'Enter') {
                      handleKeydown(inputRef.current.value);
                      inputRef.current.value = '';
                    }
                  }}
                />

                <div>
                  {
                    selected_facturas.length == 0 ?
                      <div className="card" style={{ backgroundColor: '#A93226', width: 'auto' }}>
                        <h3 style={{ margin: 10, color: 'white' }}>SIN FACTURAS PARA CONSOLIDAR</h3>
                      </div>
                      :
                      <div className="card" style={{ backgroundColor: '#ECF0F1', width: 'auto', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <h4 style={{ margin: 10, color: 'black' }}>ULTIMA ESCANEADA :</h4>
                          <h4 style={{ margin: 10, color: 'black' }}>{selected_facturas[selected_facturas.length - 1].factura}</h4>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <h4 style={{ margin: 10, color: 'black'}}>FACTURAS:</h4>
                          <h4 style={{ margin: 10, color: 'black', fontWeight: 'bold', fontSize : 15 }}>{selected_facturas.length}</h4>
                        </div>

                      </div>
                  }
                </div>

              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th></th>
                  <th>FACTURA</th>
                  <th>RUTA</th>
                  <th>PEDIDO</th>
                  <th>ALBARAN</th>
                  <th>CLIENTE</th>
                  <th>CAJAS</th>
                  <th>UNIDADES</th>
                  <th>UBICACION</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item.factura}>
                    <td>
                      <input className="form-check-input m-0 align-middle" type="checkbox"
                        onChange={(e) => {  get_selected_facturas(item); }} aria-label="Select invoice" />
                    </td>
                    <td style={{fontSize : 12, fontFamily : 'sans-serif'}}>{item.factura}</td>
                    <td style={{fontSize : 12, fontFamily : 'sans-serif'}}>{item.list_empaque}</td>
                    <td style={{fontSize : 12, fontFamily : 'sans-serif'}}>{item.pedidoventa}</td>
                    <td style={{fontSize : 12, fontFamily : 'sans-serif'}}>{item.albaran}</td>
                    <td style={{fontSize : 12, fontFamily : 'sans-serif'}}>{item.cliente}</td>
                    <td style={{fontSize : 12, fontFamily : 'sans-serif'}}>{item.cant_cajas}</td>
                    <td style={{fontSize : 12, fontFamily : 'sans-serif'}}>{item.cant_total}</td>
                    <td style={{fontSize : 12, fontFamily : 'sans-serif'}}>{item.ubicacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
            
        </div>
      </div>
    </>
  );

}

export default AdminDespachoView;