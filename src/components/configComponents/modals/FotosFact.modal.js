import React from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";
import { Modal } from "bootstrap";

export const FotosView = ({props}) =>{


    return(
    <div>
        <div style={{display : 'flex', flexDirection : 'row'}}>
            <div className="card" style={{margin : 10, width : '200px', height : '400'}}>

            </div>
            <div className="card" style={{margin : 10, width : '200px', height : '400'}}>
                
            </div>

        </div>
    </div>
    )
}