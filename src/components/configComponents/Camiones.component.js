import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";
import { CrearCamion } from "./modals/crearCamion.modal";

function ListaCamiones() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    getCamiones();
  }, [])

  const getCamiones = async () => {
    try {
      var data = await axios.get(bk_dir + '/camiones/get_all_camiones').then(e => e.data);
      setData(data.data);
    } catch (error) {
      console.log("err")
    }
  }

  return (
    <div className="card" style={{margin : 20, color : 'grey'}}>
    <div class="card" style={{width : '50%', margin : 10}}>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr>
              <th>
                <button className="card" style={{backgroundColor : 'green', width : '100%'}} data-toggle="modal" data-target="#modal-simple">
                  <h3 style={{color : 'white', alignSelf : 'center', verticalAlign : 'center'}}>CREAR</h3>
                </button>
              </th>
              <th>Placa</th>
              <th>QR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            </tr>
              {
                data.length ? 
                  (
                    data.map((item) =>(
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.placa}</td>
                        <td>{item.qr}</td>
                      </tr>
                    ))
                  )
                  : <div>SIN DATA</div>
              }
          </tbody>
        </table>
      </div>
    </div>


    <div class="modal modal-blur fade" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
          <div className="modal-content">
                      <CrearCamion />
                  </div>
        </div>
    </div>

  </div>
                    
  )
}

export default ListaCamiones;

