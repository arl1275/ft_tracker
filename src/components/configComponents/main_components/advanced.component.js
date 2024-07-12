import { useState, useEffect } from "react";
import { HeadAdvanced } from "../minComponents/headAdvanced.component";

export const AdvancedList = () =>{
    const [ Pedidos, setPedidos ] = useState([]);
    const [ Facturas, setFacturas ] = useState([]);
    const [ Declaraciones, setDeclaraciones ] = useState([]);
    const [ Entragas, setEntregas ] = useState([])


    return(
        <div style={{  height : '80vh', 
            backgroundColor : '#F0F3F4', 
            width : '100',
            margin : '5px 10px 5px 10px', 
            borderRadius : 5,
            padding : 10,
            alignItems : 'center'}}>

            <HeadAdvanced />

            <div style={{ display : 'flex' , flexDirection : 'row', justifyContent : 'space-between'}}>
                <div style={{ backgroundColor : 'white', width : '35%', height : '100%', margin : 5, borderRadius : 5 }}>EXPORT</div>
                <div style={{ backgroundColor : 'white', width : '35%', height : '100%', margin : 5, borderRadius : 5 }}>EXPORT</div>
                <div style={{ backgroundColor : 'white', width : '35%', height : '100%', margin : 5, borderRadius : 5 }}>EXPORT</div>
            </div>
            

        </div>
    )
}

