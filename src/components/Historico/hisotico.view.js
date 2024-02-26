import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";
import TableForm, { TextColumnFilter, NumberColumnFilter} from "../dynamic_table/tableHisto.component";

export const ResumenHistorico = () => {
    const [AllFacts, setAllFacts] = useState([]);

    const getFacts = async () => {
        try {
            const data = await axios.get(bk_dir + '/facturas/getHistoFact');
            setAllFacts(data.data.data);
            console.log('fromBK', AllFacts);
        } catch (err) {
            alert('NO SE PUDO OBTENER LOS DATOS, FAVOR REVISAR SU CONEXION A INTERNET');
        }
    }
    

    useEffect(() => {
        getFacts();
    }, []);


    return (
        <>
            {
                AllFacts.length > 0 ? <TableForm data={AllFacts} /> 
                : null
            }
        </>
    )

}