import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file.js";
import ResumenConsolidado from "../../components/consolidado/resumeconsolidation.component.js";


function AdminDespachoView() {
  const [data, setData] = useState([]);
  const [selected_facturas, setSelectedFacturas] = useState([]);
  //---------------------------------------------------------------------------
  // para el escaneo invisible de facturas
  //---------------------------------------------------------------------------
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeydown = (e) => {
    const new_val = e.replace(/'/g, '-');
    const match = new_val.match(/(?:[^-]*-){3}(\d+)/);
    if (match && match[1]) {
      let valor = match[1];
      //console.log('valor : ', valor)
      if (data.some((item) => item.ref_factura === valor) === false) {
        console.log('Factura no existe: ', valor);
      } else {
        let data_fact = data.filter((item) => item.ref_factura === valor);
        //console.log('data in keydownFunc : ', data_fact);
        get_selected_facturas(data_fact[0]);
      }
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  //---------------------------------------------------------------------------

  //---------------------------------------------------------------------------
  useEffect(() => {
    getFacturas();
  }, []);

  const getFacturas = async () => {
    try {
      var data = await axios.get(bk_dir + '/fact/get_all_facturas_in_null_state').then(e => e.data);
      setData(data.data);
    } catch (error) {
      console.log("err")
    }
  };

  const get_selected_facturas = (fact) => {
    console.log('FROM SCANER : ', fact);
    setSelectedFacturas((prevSelectedFacturas) => {
      const index = prevSelectedFacturas.findIndex((item) => item.id === fact.id);
      if (index === -1) {
        return [...prevSelectedFacturas, fact]; // Add the new item
      } else {
        return prevSelectedFacturas.filter((item) => item.id !== fact.id);
      }
    });
  };

  let set_fecha_format = (date) => {
    const fecha = new Date(date);
    //Obtiene solo la parte de la fecha en formato YYYY-MM-DD
    const soloFecha = fecha.toISOString().split('T')[0];
    return soloFecha;
  }

  const [selectedDate, setSelectedDate] = useState(''); // State to store the selected date
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <div className="card" style={{ margin: "0.5rem" }}>
        <div className="col-12">
          <div className="card">
            <div className="card-body border-bottom py-3">
              <div className="d-flex">
                <div style={{ display: "flex" }}>
                  <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
                    <button className="btn btn-primary w-auto" onClick={getFacturas}>
                      ACTUALIZAR
                    </button>
                  </div>
                  <div className="mb-auto" style={{ marginRight: "10px", marginLeft: "10px" }}>
                    <select name="countries" id="select-countries" className="form-select" disabled>
                      <option value="1" selected>PAIS</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <div className="mb-auto" style={{ marginRight: "10px" }}>
                    <select name="countries" id="select-countries" className="form-select" disabled>
                      <option value="pl" id='1'>TRANSPORTISTA</option>
                    </select>
                  </div>


                  <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
                    <ResumenConsolidado props={selected_facturas} />
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
                      <div className="card" style={{ backgroundColor: '#02395E', width: 'auto', display : 'flex', flexDirection : 'row'}}>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                          <h4 style={{ margin: 10, color: 'white' }}>Fact Escaneada :</h4>
                          <h4 style={{ margin: 10, color: 'white' }}>{selected_facturas[selected_facturas.length - 1].ref_factura}</h4>
                        </div>

                        <div style={{display : 'flex', flexDirection : 'row'}}>
                          <h4 style={{ margin: 10, color: 'white' }}>cant_facts:</h4>
                          <h4 style={{ margin: 10, color: 'red', fontWeight : 'bold'}}>{selected_facturas.length}</h4>
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
                  <th className="w-1"><input className="form-check-input m-0 align-middle" type="checkbox" id='001' /></th>
                  <th className="w-auto">
                    <div className="input-group mb-auto">
                      <input type="text" className="form-control" placeholder="FACTURA" style={{ width: '20%' }} />
                      <button className="btn" type="button">buscar</button>
                    </div>
                  </th>
                  <th>LISTA DE ENTREGA</th>
                  <th>PEDIDO</th>
                  <th>ALBARAN</th>
                  <th>
                    <div className="mb-auto">
                      <select name="countries" id="select-countries" className="form-select">
                        <option value="pl" selected>CLIENTE</option>
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
                        <option value="pl" data-data='{"flag": "pl"}'>CORTES</option>
                      </select>
                    </div>
                  </th>
                  <th>
                    <div className="mb-auto">
                      <select name="countries" id="select-countries" className="form-select" disabled>
                        <option value="pl" data-data='{"flag": "pl"}'>SAN PEDRO SULA</option>

                      </select>
                    </div>
                  </th>
                  <th>
                    <input className="form-control mb-2 flatpickr-input flatpickr-mobile mb-auto" tabindex="1" type="date" placeholder="Select a date" value={selectedDate} onChange={handleDateChange} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input className="form-check-input m-0 align-middle" type="checkbox"
                        onClick={() => { get_selected_facturas(item); }} aria-label="Select invoice" />
                    </td>
                    <td><span className="text-muted">{item.ref_factura}</span></td>
                    <td>{item.lista_empaque}</td>
                    <td>{item.pedidoventa}</td>
                    <td>{item.albaran}</td>
                    <td>{item.cliente_nombre}</td>
                    <td>{item.cant_cajas}</td>
                    <td>{item.cant_unidades}</td>
                    <td>CORTES</td>
                    <td>{item.ubicaciones}</td>
                    <td className="text-left">{set_fecha_format(item.created_at)}</td>
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