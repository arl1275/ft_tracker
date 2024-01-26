import { EntregadorCombox, CamionesCombox } from "../../components/consolidado/combox.component.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";

const ResumenConsolidado = ({ props }) => {
  const lista_headers = ["DEPARTAMENTO", "CIUDAD", "NOMBRE DE CLIENTE", "ALBARAN", "FACTURA", "LISTA EMPAQUE", "CAJAS", "UNIDADES"];
  const [camionSeleccionado, setCamionSeleccionado] = useState(null);
  const [entregador, setEntregador] = useState(null);

  const selCamion = (camion) => {
    setCamionSeleccionado(camion);
  };
  const SelEntregador = (entregador) => {
    setEntregador(entregador);
  };

  const send_toCreate_Consolidacion = () => {
    if (entregador === '' || entregador === 'ENTREGADORES' || camionSeleccionado === '' || camionSeleccionado === 'CAMIONES' || entregador === null || camionSeleccionado === null) {
      alert('FAVOR LLENAR TODOS LOS CAMPOS ANTES DE ENVIAR EL CONSOLIDADO');
    } else {
        const data = {
          id_user : entregador[1],
          id_cam : camionSeleccionado[1],
          declaracion_env : props
        }
        axios.post(bk_dir + '/decEnv/NewDecEnv', data).then((err) => {
        if (!err) {
          console.log('Se enviaron los datos al BK', data);
        } else {
          console.log('err al enviar:', data);
        }
      })
    }
  }

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
        <button class="btn btn-success" data-toggle="modal" data-target="#modal-full-width1" >GENERAR DECLARACION DE ENVIO</button>
         <div class="modal modal-blur fade" id="modal-full-width1" tabindex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-full-width modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">DECLARACION DE ENVIO</h5>
                <small style={{ display: "flex", margin: "1rem" }}>
                  <div className="mb-auto" style={{ marginRight: "10px" }}>
                    <CamionesCombox props={selCamion} />
                  </div>
                  <div className="mb-auto" style={{ marginRight: "10px" }}>
                    <EntregadorCombox EntregadorHand={SelEntregador} />
                  </div>
                </small>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div>
                  <div>PAIS : Honduras</div>
                  <div>UBICACION : TEST</div>
                </div>

                <table className="table card-table table-vcenter text-nowrap datatable">

                  <thead style={{ backgroundColor: '#02395E' }}>
                    <tr>{
                      lista_headers.map((item) => (
                        <th style={{ color: 'white' }}>{item}</th>
                      ))
                    }
                    </tr>
                  </thead>
                  <tbody>
                    {props.map((item) => (
                      <tr key={item.id}>
                        <td>CORTES</td>
                        <td>San Pedro Sula</td>
                        <td>{item.cliente}</td>
                        <td>{item.albaran}</td>
                        <td><span className="text-muted">{item.factura}</span></td>
                        <td>{item.list_empaque}</td>
                        <td>{item.cant_cajas}</td>
                        <td>{item.cant_total}</td>
                      </tr>
                    ))}
                    <tr style={{ width: '100%', backgroundColor: '#02395E' }}>
                      <td style={{ color: 'white' }}>Totales</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><div style={{ color: 'white' }}>{get_sumas_cajas()}</div></td>
                      <td><div style={{ color: 'white' }}>{get_sumas_unidades()}</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn mr-auto" data-dismiss="modal">CANCELAR</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={send_toCreate_Consolidacion}>ENVIAR A PREPARACION</button>
              </div>
            </div>
          </div>

        </div> 
      </>

    )
};

export default ResumenConsolidado;
