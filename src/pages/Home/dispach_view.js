import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file.js";
import ResumenConsolidado from "../../components/consolidado/resumeconsolidation.component.js";
import { Loadingbar } from "../../components/any_components/loadingbar.js";
import { ForceSynchro } from "../../components/configComponents/modals/forzarSynchro.js";
import UpdateIcon from '@mui/icons-material/Update';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';

function DispachView() {
  const [data, setData] = useState([]);                             // this save all the facturas that doesnt have any state
  const [selected_facturas, setSelectedFacturas] = useState([]);    // this array save the selected facturas to be send to "PREPARACION" state
  const inputRef = useRef(null);                                    // this is the input ref to the text input
  const [openLoad, setOpenLoad] = useState(false);                  // this open the load component 
  const [isSynchroOpen, setIsSynchroOpen] = useState(false);        // this is to open modal to force
  const [force_fact, setForceFact] = useState('');                 // this is the value that is send to the force modal to be forced
  const [seeInputText, setSeeInputText] = useState(false);       // this is to make visible the inputtext

  useEffect(() => {
    if (inputRef.current && !isSynchroOpen) {
      inputRef.current.focus();
    }
  }, [isSynchroOpen]);

  useEffect(() => {
    getFacturas();
    const intervalId = setInterval(() => {
      getFacturas();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const openModalWait = (vul) => {
    setOpenLoad(vul);
  };

  const handleKeydown = (e) => {
    const new_val = e;
    if (new_val.startsWith('AL')) {
      if (new_val.startsWith('AL')) {
        const valor = new_val.replace(/["/\\.,'\-`|_{}[\]]/g, '-');
        if (data.some((item) => item.factura === valor)) {
          const data_fact = data.filter((item) => item.factura === valor);
          get_selected_facturas(data_fact[0]);
        } else {
          handleForceOpen(valor, true, false);
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
          handleForceOpen(valor, true, false);
        }
      } else {
        handleForceOpen(match[1], true, false);
      }
    }


  }

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

  const handleForceOpen = (factura, handlerOpen, handlerClear) => {
    if (handlerOpen) {
      setForceFact(factura);
      setIsSynchroOpen(true);
    } else if (handlerOpen === false) {
      setIsSynchroOpen(false);
    }

    if (handlerClear) {
      setForceFact('');
      setIsSynchroOpen(false);
    }
  }

  return (
    <div style={{ alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}>

      {openLoad === true && <Loadingbar />}

      <div className="card"
        style={{
          backgroundColor: 'white',
          margin: '15px 10px 15px 10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: 1,
          borderWidth: 0,
          borderColor: '#979A9A',
          height: '90vh',
        }}>

        <table className="table-responsive">
          <tr className="d-flex" style={{ margin: '10px 10px 0px 10px', borderBottomWidth : 1, borderBottomColor : 'black' }}>
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
                      borderRadius: 7,
                      marginRight: 5
                    }}
                  onClick={() => { getFacturas(); openModalWait(true); }}>
                  <UpdateIcon />
                </button>
              </div>
            </td>

            <td style={{
              display: 'flex', flexDirection: 'row', backgroundColor: 'black', borderRadius: 7, width: 'auto', height: 35,
              justifyContent: 'center',
              alignItems: 'center', marginRight: 5
            }}>
              <div onClick={() => setSeeInputText(!seeInputText)}>
                <EditNoteSharpIcon style={{ fontSize: 30, color: "white", margin: 10 }} />
              </div>

              <input
                type="text"
                autoFocus
                ref={inputRef}
                style={{
                  marginRight: seeInputText ? 15 : 0,
                  marginLeft: seeInputText ? 15 : 0,
                  opacity: seeInputText ? 1 : 0,
                  width: seeInputText ? 250 : 0,
                  borderRadius: 7,
                  textAlign: 'center',
                  backgroundColor: '#212F3D',
                  color: 'white'
                }}
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
              <ForceSynchro func={isSynchroOpen} factura={force_fact} handler={handleForceOpen} />
            </td>

            <td style={{ display: "flex" }}>

              <div className="col-6 col-sm-4 col-md-2 col-xl mb-3" style={{ marginLeft: 10, marginRight: 10 }}>
                <ResumenConsolidado props={selected_facturas} clearArray={clearSelectedArray} />
              </div>

            </td>


            <td>
              {
                selected_facturas.length == 0 ?
                  <div className="card"
                    style={
                      {
                        backgroundColor: '#FF0000',
                        width: 250,
                        height : 40,
                        position: 'absolute',
                        right: 10,
                        borderRadius: 7
                      }}>
                    <h3 style={{ margin: 7, color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>SIN FACTURAS</h3>
                  </div>
                  :
                  <div className="card" style={
                    {
                      backgroundColor: 'black',//'#FFFF33',
                      width: 250,
                      height : 40,
                      display: 'flex',
                      flexDirection: 'row',
                      position: 'absolute',
                      right: 10,
                      borderRadius: 7,
                      justifyContent: 'space-around'
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <DescriptionSharpIcon color="white" style={{ fontSize: 20, alignSelf: 'center', justifySelf: 'center' }} />
                      <h4 style={{ margin: 7, color: 'white', fontWeight: 'bold', fontSize: 15 }}>{selected_facturas.length}</h4>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <h4 style={{ margin: 7, color: 'grey' }}>|</h4>
                      <h4 style={{ margin: 7, color: 'white', fontWeight: 'bold' }}>{selected_facturas[selected_facturas.length - 1].factura}</h4>
                    </div>

                  </div>
              }
            </td>

          </tr>
        </table>

        <div className="table-responsive" style={{ backgroundColor: '#F2F3F4'}}>
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead style={{ width: '90%' }}>
              <tr style={{ borderBottomRightRadius: 90, backgroundColor: 'black' }}>
                <th></th>
                <th style={{ fontSize: 10, fontFamily: 'revert', textAlign: 'left', color: 'white' }} key={0}>FACTURA</th>
                <th style={{ fontSize: 10, fontFamily: 'revert', textAlign: 'left', color: 'white' }} key={1}>RUTA</th>
                <th style={{ fontSize: 10, fontFamily: 'revert', textAlign: 'left', color: 'white' }} key={2}>PEDIDO</th>
                <th style={{ fontSize: 10, fontFamily: 'revert', textAlign: 'left', color: 'white' }} key={3}>ALBARAN</th>
                <th style={{ fontSize: 10, fontFamily: 'revert', textAlign: 'left', color: 'white' }} key={4}>CLIENTE</th>
                <th style={{ fontSize: 10, fontFamily: 'revert', textAlign: 'left', color: 'white' }} key={5}>CAJAS</th>
                <th style={{ fontSize: 10, fontFamily: 'revert', textAlign: 'left', color: 'white' }} key={6}>UNIDADES</th>
                {/* <th style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'black' }}>UBICACION</th> */}
              </tr>
            </thead>

            <tbody>
              {data.slice().reverse().map((item) => (
                <tr key={item.id_factura} style={{ height: 50 }}>
                  <td>
                    <input type="checkbox"
                      style={{ colorInterpolation: 'black' }}
                      onChange={(e) => { get_selected_facturas(item); }} />
                  </td>
                  <td style={{ fontSize: 15, fontFamily: 'revert', textAlign: 'left', color: '#424949' }}>{item.factura}</td>
                  <td style={{ fontSize: 15, fontFamily: 'revert', textAlign: 'left', color: '#424949' }}>{item.pedidoventa}</td>
                  <td style={{ fontSize: 15, fontFamily: 'revert', textAlign: 'left', color: '#424949' }}>
                    {item.list_empaque.split(',').map((list_empaque, index) => (
                      <div key={index}>{list_empaque.trim()}</div>
                    ))}</td>
                  <td style={{ fontSize: 15, fontFamily: 'revert', textAlign: 'left', color: '#424949' }}>
                    {item.albaran.split(',').map((albaran, index) => (
                      <div key={index}>{albaran.trim()}</div>
                    ))}</td>
                  <td style={{ fontSize: 15, fontFamily: 'revert', textAlign: 'left', color: '#424949' }}>{item.cliente}</td>
                  <td style={{ fontSize: 15, fontFamily: 'revert', textAlign: 'left', color: '#424949' }}>{item.cant_cajas}</td>
                  <td style={{ fontSize: 15, fontFamily: 'revert', textAlign: 'left', color: '#424949' }}>{item.cant_total}</td>
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