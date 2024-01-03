import React, {useState, useEffect} from "react";
import { bk_dir } from "../../../conf/configuration.file";
import axios from "axios";
import { EntregadorCombox } from "../../consolidado/combox.component";

export const CambioEntregador = ({prop}) =>{
    const [NewEntregador, setNewEntregador] = useState(null);

    const HandleEntregador = (e) => {
        setNewEntregador(e);
        console.log(NewEntregador);
    }

    return(
        <div>

            <div className="card" style={{margin :20}}>

                <div className="card" style={{display : 'flex', flexDirection : 'row', margin :20, width : 'auto'}}>
                    <p className="card-title" style={{marginLeft : '2%', alignSelf : 'center'}}>Entregador asignado a esta Factura : </p>
                    <p className="card-title" style={{marginLeft : '20%', alignSelf : 'center'}}>{prop.nombre}</p>
                </div>

                <div style={{display : 'flex', flexDirection : 'row', margin :20, width : 'auto'}}>
                <p className="card-title" style={{marginLeft : '2%', alignSelf : 'center'}}>ENTREGADOR NUEVO: </p>
                    <EntregadorCombox EntregadorHand={HandleEntregador}/>
                </div>
                

            </div>

        </div>
    )

}