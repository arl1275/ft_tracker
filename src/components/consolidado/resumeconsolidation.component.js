import { EntregadorCombox, CamionesCombox } from "../../components/consolidado/combox.component.js";
import React, { useState } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";
import { LoadingWait } from "../any_components/loading_component.js";

const ResumenConsolidado = ({ props, clearArray }) => {
  const lista_headers = ["DEPARTAMENTO", "NOMBRE DE CLIENTE", "ALBARAN", "FACTURA", "LISTA EMPAQUE", "CAJAS", "UNIDADES"];
  const [camionSeleccionado, setCamionSeleccionado] = useState(null);
  const [entregador, setEntregador] = useState(null);
  const [dec_env, setDecEnv] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ischargin, setIsChargin] = useState(false);

  const selCamion = (camion) => {
    setCamionSeleccionado(camion);
  };
  const SelEntregador = (entregador) => {
    setEntregador(entregador);
  };

  const send_toCreate_Consolidacion = async () => {
    if (entregador === '' || entregador === 'ENTREGADORES' || camionSeleccionado === '' || camionSeleccionado === 'CAMIONES' || entregador === null || camionSeleccionado === null) {
      alert('FAVOR LLENAR TODOS LOS CAMPOS ANTES DE ENVIAR EL CONSOLIDADO');
    } else {
      const data = {
        id_user: entregador[1],
        id_cam: camionSeleccionado[1],
        declaracion_env: props
      };

      try {
        const response = await axios.post(bk_dir + '/decEnv/NewDecEnv', data);
        console.log('Se enviaron los datos al BK', data);

        if (response && response.data && response.data.data) {
          setIsChargin(true)
          setDecEnv(response.data.data);
          clearArray();
        } else {
          console.log('La respuesta no contiene los datos esperados:', response);
          alert('Ocurrió un problema al crear la declaración de envío');
        }
      } catch (error) {
        console.log('Error al enviar:', error);
        clearArray();
      } finally {
        setIsChargin(false);
      }
    }
  };


  const get_sumas_cajas = () => {
    if (props.length > 0) {
      let sumC = props.reduce((acumulator, item) => acumulator + item.cant_cajas, 0);
      return sumC;
    } else {
      return 'SIN DATA';
    }
  }

  const get_sumas_unidades = () => {
    if (props.length > 0) {
      let sumC = props.reduce((acumulator, item) => acumulator + item.cant_total, 0);
      return sumC;
    } else {
      return 'SIN DATA';
    }
  }


  return (
    <>
      <button class="btn btn-success"
        data-toggle="modal"
        data-target="#modal-full-width1"
        style={
          {
            backgroundColor: '#171717',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: 50
          }
        }>
        GENERAR DECLARACION DE ENVIO
      </button>

      <div class="modal modal-blur fade" id="modal-full-width1" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-full-width modal-dialog-centered" role="document">

          <div className="modal-content"
            style={
              {
                backgroundColor: 'white',
                borderWidth: '5px 0px 5px 0px',
                borderColor: 'black',
                borderRadius: 0
              }}>
            {
              props.length > 0 ?
                (
                  <div>
                    <div className="modal-header"
                      style={
                        {
                          backgroundColor: 'white',
                          borderRadius: 10,
                          borderWidth: 0
                        }
                      }>
                      <h5 className="modal-title" style={{ color: 'black' }}>DECLARACION DE ENVIO</h5>

                      <small style={{ display: "flex", margin: "1rem" }}>

                        <div className="mb-auto" style={{ marginRight: "10px" }}>
                          <CamionesCombox props={selCamion} />
                        </div>

                        <div className="mb-auto" style={{ marginRight: "10px" }}>
                          <EntregadorCombox EntregadorHand={SelEntregador} />
                        </div>

                      </small>

                      <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"
                        style={{ backgroundColor: 'white', width: 40, height: 40, margin: 10 }}>
                      </button>

                    </div>

                    <div className="modal-body" style={{ backgroundColor: 'white' }}>
                      <table className="table card-table table-vcenter text-nowrap datatable">
                        <thead style={{ backgroundColor: '#17202A' }}>
                          <tr>{
                            lista_headers.map((item) => (
                              <th style={{ fontSize: 12, fontFamily: 'inherit', textAlign: 'left', color: 'white' }}>{item}</th>
                            )
                            )
                          }
                          </tr>
                        </thead>

                        <tbody>
                          {props.map((item) => (
                            <tr key={item.id}>
                              <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' }}>{item.departamento}</td>
                              <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' }}>{item.cliente}</td>
                              <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' }}>{item.albaran}</td>
                              <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' }}>{item.factura}</td>
                              <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' }}>{item.list_empaque}</td>
                              <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' }}>{item.cant_cajas}</td>
                              <td style={{ fontSize: 12, fontFamily: 'revert', textAlign: 'left', color: 'black' }}>{item.cant_total}</td>
                            </tr>
                          ))}
                          <tr style={{ width: '100%', backgroundColor: '#17202A' }}>
                            <td style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>Totales</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><div style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>{get_sumas_cajas()}</div></td>
                            <td><div style={{ fontSize: 12, fontFamily: 'sans-serif', textAlign: 'left', color: 'white' }}>{get_sumas_unidades()}</div></td>
                          </tr>
                        </tbody>
                      </table>

                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn mr-auto" data-dismiss="modal"
                        style={{ backgroundColor: '#FF0000', color: 'black', fontWeight: 'bold', borderRadius : 50 }}>CANCELAR</button>

                      <button type="button" className="btn btn-primary"
                        style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', borderRadius : 50 }}
                        onClick={() => { setShowModal(true); send_toCreate_Consolidacion(); }}>
                        CREAR CONSOLIDADO
                      </button>

                    </div>
                  </div>)
                :
                (<div className="modal-body">
                  <h1 style={{ color: 'black', alignSelf: 'center' }}>SIN FACTURAS ESCANEADAS</h1>
                </div>)
            }
          </div>
        </div>
      </div>


      <>{/*----------------- ESTA PARTE ES DEL MODAL QUE MUESTRA LA INFO DE LA DECLARACION DE ENVIO ----------------*/}</>

      {showModal && (
        <div className="modal modal-blur fade show" id="modal-info" tabIndex="-1" style={{ display: 'block', paddingRight: '17px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} aria-modal="true" role="dialog">
          <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div className="modal-content">
              <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              <div className="modal-body text-center py-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon mb-4 text-green" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                <h4 style={{ color: '#ABB2B9' }}>DECLARACIÓN DE ENVIO</h4>
                <h1 style={{ color: '#2C3E50', fontSize: 30 }}>{ischargin ? <LoadingWait /> : dec_env}</h1>
              </div>
              <div className="modal-footer">

              </div>
            </div>
          </div>
        </div>
      )}


    </>

  )
};

export default ResumenConsolidado;
