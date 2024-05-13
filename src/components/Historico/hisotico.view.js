import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";
import TableForm from "../dynamic_table/tableHisto.component";
import { LoadingMessage } from "../any_components/loading_component";
import { ERRcomponent } from "../any_components/error.component";

const ResumenHistorico = () => {
    const [AllFacts, setAllFacts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getFacts = async () => {
        try {
            setLoading(true);
            const data = await axios.get(bk_dir + '/facturas/getHistoFact');
            setAllFacts(data.data.data);
        } catch (err) {
            alert('NO SE PUDO OBTENER LOS DATOS, FAVOR REVISAR SU CONEXION A INTERNET');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFacts();
    }, []);

    return (
        <>
            <div>
                {loading ?
                    <LoadingMessage message={'Por favor espere a que se preparen los datos'} />
                    :
                    AllFacts.length > 0 ?
                        <TableForm data={AllFacts} />
                        :
                        <ERRcomponent message={'Hay un error para obtener esta informacion'} />
                }
            </div>
        </>
    )
}

export default ResumenHistorico;