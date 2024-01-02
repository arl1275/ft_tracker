import React from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";

export const AlterFact = ({props}) =>{

    return(
        <div>
            <div className="navbar">
            <div>CAMBIO DE ENTREGADOR</div>
            <div>CAMBIO DE ESTADO MANUAL</div>
            <div>ENTREGA MANUAL</div>
            <div>CANCELAR ENTREGA</div>
            </div>
            
        </div>
    )
}