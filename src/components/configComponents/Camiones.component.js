import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";

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
  <div class="card">
    <div class="table-responsive">
      <table class="table table-vcenter card-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Placa</th>
            <th>QR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <div>
              <th>CREAR CAMION NUEVO</th>
            </div>  
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
                    
  )
}

export default ListaCamiones;

