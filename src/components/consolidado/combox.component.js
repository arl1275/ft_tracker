import React, { useEffect, useState } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";


export function CamionesCombox({ props }) {

  const [data, setData] = useState([]);
  useEffect(() => {
    getCamiones();
  }, []);

  const getCamiones = async () => {
    try {
      var data = await axios.get(bk_dir + '/camiones/get_all_camiones').then(e => e.data);
      setData(data.data);
      //console.log(data.data);
    } catch (error) {
      console.log("err")
    }
  }

  const SelectCamion = (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const camionSeleccionado = [event.target.value, selectedOption.id];
    props(camionSeleccionado);
    console.log('camion_info: ', camionSeleccionado);
  };

  return (
    <>
      <div className="mb-auto" style={{ marginRight: "10px" }}>
        <select id="select-camion" className="form-select" onChange={SelectCamion}>
          <option value="camion">CAMIONES</option>{
            data.map((item) => (
              <option value={item.id} id={item.placa} key={item.placa}>{item.placa}</option>
            ))
          }
        </select>
      </div>
    </>
  )
}

export function EntregadorCombox({ EntregadorHand }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getEntregadores();
  }, []);

  const getEntregadores = async () => {
    try {
      var data = await axios.get(bk_dir + '/user/entregadores').then(e => e.data);
      setData(data.data);
      console.log(data.data);
    } catch (error) {
      console.log("err")
    }
  }

  const SelectEntregador = (event) => {
    const id_entregador = event.target.selectedOptions[0]
    const entregadorSeleccionado = [event.target.value, id_entregador.id];
    EntregadorHand(entregadorSeleccionado);
    console.log("entregador :", entregadorSeleccionado);
  };

  return (
    <>
      <div className="mb-auto" style={{ marginRight: "10px" }}>
        <select name="countries" id="select-countries" className="form-select" onChange={SelectEntregador}>
          <option value="pl" id='1'>ENTREGADORES</option>{
            data.map((item) => (
              <option value={item.id} id={item.nombre} key={item.id}>{item.nombre}</option>
            ))
          }
        </select>
      </div>
    </>
  )

}
/*
 //---------------------------------------------------
//            DO NOT DELETE THIS CODE
//---------------------------------------------------
export function TransportistaCombox({props}){
  const [data, setData] = useState([]);
      useEffect(()=>{
        getTransportistas();

      }, []);

    const getTransportistas = async () => {
    try {
        var data = await  axios.get(bk_dir + '/trans/transportistas').then(e => e.data);
        setData(data.data);
        console.log(data.data);
    } catch (error) {
        console.log("err")
    }
    }
    const local = [1, 'LOCAL'];
    props(local);

 
  // const transelected = (event) => {
  //   -----------------------> THIS IS WHEN MORE TRANSPORT COMPANIES WILL BE ADDED.
  //   const entregadorSeleccionado = event.target.selectedOptions[0];
  //   const id_valor =  [event.target.value, entregadorSeleccionado.id];
  //   props(id_valor);
  //   console.log("entregador :", local);
  // };

    return(
        <>
            <div className="mb-auto" style={{marginRight: "10px"}}>
                  <select name="countries" id="select-countries" className="form-select" disabled>{/*onChange={transelected}}
                    <option value="pl" id='1'>TRANSPORTISTA</option>
                    {/* {
                      data.map((item)=>(
                        <option value={item.nombre} key={item.id}>{item.nombre}</option>
                      ))
                    } }
                  </select>
            </div>
        </>
    )

}
*/