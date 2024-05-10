import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file.js";
import ResumenConsolidado from "../../components/consolidado/resumeconsolidation.component.js";
import { LoadingWait } from "../../components/any_components/loading_component.js";

function AdminDespachoView() {
  const [data, setData] = useState([]);
  const [selected_facturas, setSelectedFacturas] = useState([]);
  const inputRef = useRef(null);
  const [openLoad, setOpenLoad] = useState(false);

  const openModalWait = (vul) => {
      setOpenLoad(vul);
  // 500 milisegundos = 0.5 segundos
  };

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
        } else {
          alert('ESTE ALBARAN NO ES VALIDO')
        }
      }

    }
    else {
      const replaced_val = new_val.replace(/["/\\.,'\-`|_{}[\]]/g, '-');
      const match = replaced_val.match(/(?:[^-]*-){3}(\d+)/);

      if (match && match[1]) {
        const valor = match[1];
        const data_fact = data.filter((item) => item.factura === valor);

        if (data_fact && data_fact.length > 0) {
          get_selected_facturas(data_fact[0]);
        } else {
          alert('ESTA FACTURA NO ES VALIDA');
        }
      } else {
        alert('ESTA FACTURA NO ES VALIDA');
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
      openModalWait(true);
      var data = await axios.get(bk_dir + '/facturas/get_all_facturas').then(e => e.data);
      setData(data.data);
    } catch (error) {
      console.log("err : ", error)
    } finally {
      openModalWait(false);
    }
  };


  const get_selected_facturas = (fact) => {
    //console.log('FROM SCANER : ', fact);
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
      <div className="card" style={{ backgroundColor : 'white', alignSelf : 'center', justifySelf : 'center'}}>
        <div className="card"> 

            <table className="table-responsive" style={{ width: '100%', backgroundColor : 'white'}}>
              <tr className="d-flex" style={{ margin: 8 }}>

                <td style={{ display: "flex" }}>
                  <div>
                    <button className="btn btn-primary w-auto" 
                    style={{ backgroundColor : 'black' , color : 'white', fontWeight : 'bold' }} 
                    onClick={() => { getFacturas(); openModalWait(true); }}>
                      ACTUALIZAR
                    </button>
                  </div>
                </td>

                <td style={{ display: "flex" }}>

                  <div className="col-6 col-sm-4 col-md-2 col-xl mb-3" style={{ marginLeft: 10 }}>
                    <ResumenConsolidado props={selected_facturas} clearArray={clearSelectedArray} />
                  </div>

                </td>

                <td>
                  <input
                    type="text"
                    autoFocus
                    ref={inputRef}
                    style={{ margin: 0, opacity: 0 }}
                    onBlur={() => inputRef.current?.focus()}
                    onKeyDown={(Event) => {
                      if (Event.key === 'Enter') {
                        handleKeydown(inputRef.current.value);
                        inputRef.current.value = '';
                      }
                    }}
                  />
                </td>


                <td>
                  {
                    selected_facturas.length == 0 ?
                      <div className="card" style={{ backgroundColor: '#FF0000', width: 400 , position: 'absolute', right: 10 }}>
                        <h3 style={{ margin: 7, color: 'white', alignSelf : 'center', fontWeight : 'bold' }}>SIN FACTURAS PARA CONSOLIDAR</h3>
                      </div>
                      :
                      <div className="card" style={{ backgroundColor: '#FFFF33', width: 400 , display: 'flex', flexDirection: 'row', position: 'absolute', right: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <h4 style={{ margin: 7, color: 'black' }}>ULTIMA ESCANEADA :</h4>
                          <h4 style={{ margin: 7, color: 'black', fontWeight : 'bold' }}>{selected_facturas[selected_facturas.length - 1].factura}</h4>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <h4 style={{ margin: 7, color: 'black' }}>FACTURAS:</h4>
                          <h4 style={{ margin: 7, color: 'black', fontWeight: 'bold', fontSize: 15 }}>{selected_facturas.length}</h4>
                        </div>

                      </div>
                  }
                </td>

              </tr>
            </table>

          <div className="table-responsive" style={{ height : '100vh'}}>
            <table className="table card-table table-vcenter text-nowrap datatable">
              <thead style={{ width : '90%', backgroundColor : 'grey' }}>
                <tr>
                  <th></th>
                  <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>FACTURA</th>
                  <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>RUTA</th>
                  <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>PEDIDO</th>
                  <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>ALBARAN</th>
                  <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>CLIENTE</th>
                  <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>CAJAS</th>
                  <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>UNIDADES</th>
                  <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>UBICACION</th>
                </tr>
              </thead>

              <tbody style={{ backgroundColor : 'white'}}>
                {data.slice().reverse().map((item) => (
                  <tr key={item.factura}>
                    <td>
                      <input type="checkbox"
                        style={{ colorInterpolation : 'black' }}
                        onChange={(e) => { get_selected_facturas(item); }} />
                    </td>
                    <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left' , color : 'black' }}>{item.factura}</td>
                    <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left' , color : 'black' }}>{item.list_empaque}</td>
                    <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left' , color : 'black' }}>{item.pedidoventa}</td>
                    <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left' , color : 'black' }}>{item.albaran}</td>
                    <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left' , color : 'black' }}>{item.cliente}</td>
                    <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left' , color : 'black' }}>{item.cant_cajas}</td>
                    <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left' , color : 'black' }}>{item.cant_total}</td>
                    <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left' , color : 'black' }}>{item.ubicacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        {
         openLoad &&
         <div class="modal modal-blur fade show" id="modal-simple" tabindex="-1" style={{ display: 'block', paddingRight: '17px', backgroundColor: 'rgb(0, 0, 0, 0.7)' }} aria-modal="true" role="dialog">
           <div class="modal-dialog modal-dialog-centered" role="document">
             <div class="modal-content">
               <div class="modal-header">
                 <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
               </div>
               <LoadingWait message={'Obteniendo las facturas'}/>
             </div>
           </div>
         </div>
       }
      </div>

       

  );

}

export default AdminDespachoView;