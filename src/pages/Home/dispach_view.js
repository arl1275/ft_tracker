import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file.js";
import ResumenConsolidado from "../../components/consolidado/resumeconsolidation.component.js";
import { Loadingbar } from "../../components/any_components/loadingbar.js";
import { ForceSynchro } from "../../components/configComponents/modals/forzarSynchro.js";
import UpdateIcon from '@mui/icons-material/Update';

function DispachView() {
  const [data, setData] = useState([]);
  const [selected_facturas, setSelectedFacturas] = useState([]);
  const inputRef = useRef(null);
  const [openLoad, setOpenLoad] = useState(false);
  const [ isSynchroOpen, setIsSynchroOpen] = useState(false);

  const openModalWait = (vul) => {
    setOpenLoad(vul);
  };

  const IsOpenModal = ( val ) =>{
    setIsSynchroOpen(val);
    console.log('el valor es :: ', isSynchroOpen)
  }

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
          alert('ESTE ALBARAN NO ES VALIDO : ', new_val)
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
          alert('ESTA FACTURA NO ES VALIDA : ', match);
        }
      } else {
        alert('ESTA FACTURA NO ES VALIDA : ', match);
      }
    }

  }

  useEffect(() => {
    if (!isSynchroOpen) {
      inputRef.current?.focus();
    }
  }, [isSynchroOpen]);

  // useEffect(() => {
  //   isSynchroOpen === false && inputRef.current?.focus()  
  // }, [])

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
    <div style={{ alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}>

      { openLoad === true && <Loadingbar />}

      <div className="card" 
      style={{ 
        backgroundColor: 'white', 
        margin: 10 ,
        height : '90vh',
        }}>

        <table className="table-responsive" >
          <tr className="d-flex" style={{ margin: '10px 10px 0px 10px' }}>
            <td style={{ display: "flex", alignContent: 'center' }}>
              <div>
                <button className="btn btn-primary w-auto"
                  style={
                    {
                      backgroundColor: 'black',
                      color: 'white',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      alignContent: 'center',
                      borderRadius : 70
                    }}
                  onClick={() => { getFacturas(); openModalWait(true); }}>
                    <UpdateIcon />
                </button>
              </div>
            </td>

            <td>
              <ForceSynchro func = { IsOpenModal }/>
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
                style={{ margin: 0, opacity : 0 }}
                onBlur={() => {
                  if (!isSynchroOpen) {
                    inputRef.current?.focus();
                  }
                }}
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
                  <div className="card" 
                  style={
                    { 
                      backgroundColor: '#FF0000', 
                      width: 400, 
                      position: 'absolute', 
                      right: 10,
                      borderRadius : 50 }}>
                    <h3 style={{ margin: 7, color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>SIN FACTURAS PARA CONSOLIDAR</h3>
                  </div>
                  :
                  <div className="card" style={
                    { backgroundColor: '#FFFF33', 
                    width: 400, 
                    display: 'flex', 
                    flexDirection: 'row', 
                    position: 'absolute', 
                    right: 10,
                    borderRadius : 50 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <h4 style={{ margin: 7, color: 'black' }}>ULTIMA ESCANEADA :</h4>
                      <h4 style={{ margin: 7, color: 'black', fontWeight: 'bold' }}>{selected_facturas[selected_facturas.length - 1].factura}</h4>
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

        <div className="table-responsive" style={{ backgroundColor: 'white' }}>
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead style={{ width: '90%' }}>
              <tr style={{ borderBottomRightRadius : 90 , backgroundColor : 'black'}}>
                <th></th>
                <th style={{ fontSize: 12, fontFamily: 'revert' , textAlign: 'left', color: 'white' }} key = {0}>FACTURA</th>
                <th style={{ fontSize: 12, fontFamily: 'revert' , textAlign: 'left', color: 'white' }} key = {1}>RUTA</th>
                <th style={{ fontSize: 12, fontFamily: 'revert' , textAlign: 'left', color: 'white' }} key = {2}>PEDIDO</th>
                <th style={{ fontSize: 12, fontFamily: 'revert' , textAlign: 'left', color: 'white' }} key = {3}>ALBARAN</th>
                <th style={{ fontSize: 12, fontFamily: 'revert' , textAlign: 'left', color: 'white' }} key = {4}>CLIENTE</th>
                <th style={{ fontSize: 12, fontFamily: 'revert' , textAlign: 'left', color: 'white' }} key = {5}>CAJAS</th>
                <th style={{ fontSize: 12, fontFamily: 'revert' , textAlign: 'left', color: 'white' }} key = {6}>UNIDADES</th>
                {/* <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'black' }}>UBICACION</th> */}
              </tr>
            </thead>

            <tbody>
              {data.slice().reverse().map((item) => (
                <tr key={item.id_factura}>
                  <td>
                    <input type="checkbox"
                      style={{ colorInterpolation: 'black' }}
                      onChange={(e) => { get_selected_facturas(item); }} />
                  </td>
                  <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' , margin : 5 }}>{item.factura}</td>
                  <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' , margin : 5 }}>{item.list_empaque}</td>
                  <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' , margin : 5 }}>{item.pedidoventa}</td>
                  <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' , margin : 5 }}>{item.albaran}</td>
                  <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' , margin : 5 }}>{item.cliente}</td>
                  <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' , margin : 5 }}>{item.cant_cajas}</td>
                  <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' , margin : 5 }}>{item.cant_total}</td>
                  {/* <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'black' , margin : 5}}>{item.ubicacion}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default DispachView;