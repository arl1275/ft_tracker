import {EntregadorCombox, CamionesCombox} from "../../components/consolidado/combox.component.js";
import React, { useState } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";

//const ResumenConsolidado = ({ props, deliver, truck }) => {
const ResumenConsolidado = ({ props}) => {
  console.log('facturs a validar : ', props);
  const lista_headers = ["DEPARTAMENTO", "CIUDAD", "NOMBRE DE CLIENTE", "ALBARAN", "FACTURA", "LISTA EMPAQUE", "CAJAS", "UNIDADES"];
  const [camionSeleccionado, setCamionSeleccionado] = useState(null);
  const [entregador, setEntregador] = useState(null);

  const selCamion = (camion) => {
    setCamionSeleccionado(camion);
  };
  const SelEntregador = (entregador) => {
    setEntregador(entregador);
  };

  const send_toCreate_Consolidacion = () =>{
        const data = {
          camion: camionSeleccionado,
          entregador: entregador,
          pais: 1,
          transportista: 1,
          facturas: props
        }
        // console.log('factura seleccionada en consolidado: ', i.ref_factura);
        console.log('data to generate consolidado : ', data)
        axios.post(bk_dir + '/cons/postNewConsolidado', data).then((err) => {
          if (!err) {
            console.log('Se enviaron los datos al BK', data);
          } else {
            console.log('err al enviar:', data);
          }
        })
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
                    <CamionesCombox props ={selCamion}/>
                  </div>
                  <div className="mb-auto" style={{ marginRight: "10px" }}>
                    <EntregadorCombox EntregadorHand={SelEntregador}/>
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
                <thead>
                  <tr>
                    <th></th>{
                      lista_headers.map((item) => (
                        <th>{item}</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {props.map((item) => (
                    <tr key={item.id}>
                      <td>CORTES</td>
                      <td>San Pedro Sula</td>
                      <td>{item.cliente_nombre}</td>
                      <td>{item.albaran}</td>
                      <td><span className="text-muted">{item.ref_factura}</span></td>
                      <td>{item.lista_empaque}</td>
                      <td>{item.cant_cajas}</td>
                      <td>{item.cant_unidades}</td>              
                    </tr>
                  ))}
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
