import React, { useState, useEffect } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import axios from "axios";

export const EntregaManual = () => {
    const [valfact, setFact] = useState({
        nameSing : '',
        namePic : 'N/A',
        detalle : ''
    });

    const saveFromFt = async () =>{
        if (valfact.nameSing === '' || valfact.namePic === 'N/A') {
            alert('NO SE INGRESADO LA FOTO DE FACTURA')
        }else{
            try {
                const res = await axios.post(bk_dir + '/entregas/toSincronizar', {params : {data : valfact}})
            } catch (err) {
                console.log('NO SE HA ENVIADO LOS DATOS A FACTURAR');
            }
        }
    }

    const handleSingChange = (event) => {
        const file = event.target.files[0]; // Get the uploaded file
        if (file) {
          setFact({ ...valfact, nameSing: file.name }); // Update the state with the file name
        }
      };
    
      const handlePicChange = (event) => {
        const file = event.target.files[0]; // Get the uploaded file
        if (file) {
          setFact({ ...valfact, namePic: file.name }); // Update the state with the file name
        }
      };


    return (
        <div className="card" style={{margin : 20}}>

            <div className="card" style={{margin : 15}}>
                <p>UNA VEZ SE VALIDE LA FACTURA SE BLOQUEARA LA FACTURA</p>
            </div>

            <div class="mb-3" style={{display : 'flex', flexDirection : 'row', margin : 10}}>
                <div class="form-label">INGRESE FIRMA</div>
                <input type="file" class="form-control" onChange={handleSingChange}/>
            </div>

            <div class="mb-3" style={{display : 'flex', flexDirection : 'row', margin : 10}}>
                <div class="form-label">INGRESE FOTO</div>
                <input type="file" class="form-control" onChange={handlePicChange}/>
            </div>

            <button onClick={()=>{saveFromFt()}}>VALIDAR FACTURA</button>


        </div>
    )

}