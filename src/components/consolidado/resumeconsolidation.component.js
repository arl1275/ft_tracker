import { Collapse } from "bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";

const ResumenConsolidado = ({ props, deliver, truck }) => {
  //consolidado de transportista  -> crear_entrega -> crear_consolidado -> referenciar en facturas --> X final
  const lista_headers = ["FACTURA", "LISTA EMPAQUE", "CLIENTE", "CAJAS", "UNIDADES", "DEPARTAMENTO", "DIRECCION", "FECHA"];

  const [selected_facturas, setSelectedFacturas] = useState([]);

  const get_selected_facturas = (fact) => {
    setSelectedFacturas((prevSelectedFacturas) => {
      const index = prevSelectedFacturas.findIndex((item) => item.id === fact.id);
      if (index === -1) {
        return [...prevSelectedFacturas, fact]; // Add the new item
      } else {
        // Remove the item by filtering the array
        return prevSelectedFacturas.filter((item) => item.id !== fact.id);
      }
    });
  };



  const generar_consolidacion = () => {
    
    const data = {
      camion: truck,
      entregador: deliver,
      pais: 1,
      transportista: 1,
      facturas: selected_facturas
    }
    // console.log('factura seleccionada en consolidado: ', i.ref_factura);
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
      <button class="btn btn-success" data-toggle="modal" data-target="#modal-full-width1" >CONSOLIDAR</button>

      <div class="modal modal-blur fade" id="modal-full-width1" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-full-width modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">RESUMEN DE CONSOLIDACION</h5>
              <small style={{ display: "flex", margin: "1rem" }}>
                <p style={{ margin: "0.5rem" }}>ENTREGADOR : {deliver}</p>
                <p style={{ margin: "0.5rem" }}>CAMION : {truck}</p>
              </small>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
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
                      <td><input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice" onClick={() => get_selected_facturas(item)} /></td>
                      <td><span className="text-muted">{item.ref_factura}</span></td>
                      <td><a href="invoice.html" className="text-reset" tabindex="-1">{item.lista_empaque}</a></td>
                      <td>{item.cliente}</td>
                      <td>{item.cant_cajas}</td>
                      <td>{item.cant_unidades}</td>
                      <td>CORTES</td>
                      <td>{item.ubicaciones}</td>
                      <td className="text-left">{item.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn mr-auto" data-dismiss="modal">CANCELAR</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={generar_consolidacion}>ENVIAR A PREPARACION</button>
            </div>
          </div>
        </div>

      </div>

    </>

  )
};

export default ResumenConsolidado;
