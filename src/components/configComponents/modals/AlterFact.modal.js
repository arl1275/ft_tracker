import React, {useState, useEffect} from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";

export const AlterFact = ({props}) =>{
    const [val, setVal] = useState(null);

    return(
        <div>
            <div style={{display : 'flex', flexDirection : 'row', width : '600px'}}>
            <div style={{padding: '8px', border: '1px solid #ddd'}}>CAMBIO DE ENTREGADOR</div>
            <div style={{padding: '8px', border: '1px solid #ddd'}}>CAMBIO DE ESTADO MANUAL</div>
            <div style={{padding: '8px', border: '1px solid #ddd'}}>ENTREGA MANUAL</div>
            <div style={{padding: '8px', border: '1px solid #ddd'}}>CANCELAR ENTREGA</div>
            </div>
        </div>
    )
}