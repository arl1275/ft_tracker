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
    const columns = [
        { Header: 'FACTURA', accessor: 'factura', Filter: TextColumnFilter, width : 10},
        { Header: 'LISTA DE ENTREGA', accessor: 'lista_empaque', Filter: TextColumnFilter },
        { Header: 'CLIENTE', accessor: 'clientenombre', Filter: TextColumnFilter, width : 10},
        { Header: 'CAJAS', accessor: 'cant_cajas', Filter: NumberColumnFilter },
        { Header: 'UNIDADES', accessor: 'cant_unidades', Filter: NumberColumnFilter },
        // { Header: 'DEPARTAMENTO', accessor: 'departamento', Filter: TextColumnFilter },
        // { Header: 'CIUDAD', accessor: 'ciudad', Filter: TextColumnFilter },
        // { Header: 'UBICACION', accessor: 'calle', Filter: TextColumnFilter, with : 10 },
        //{ Header: 'FECHA CREADO', accessor: 'created_at', Filter: DateColumnFilter, },
        { Header: 'PREPARADO', accessor: 'toma_preparacion', Filter: TextColumnFilter },
        { Header: 'TRANSITO', accessor: 'toma_transito', Filter: TextColumnFilter },
        { Header: 'ENTREGADO', accessor: 'toma_hora_fecha_entrega', Filter: TextColumnFilter },
        { Header: 'SINCRONIZADO', accessor: 'toma_sincronizado', Filter: TextColumnFilter },
        { Header: 'DEC_ENVIO', accessor: 'declaracionenvio', Filter: TextColumnFilter },
        { Header: 'NOMBRE', accessor: 'nombre', Filter: TextColumnFilter },
        { Header: 'PLACA', accessor: 'placa', Filter: TextColumnFilter },
      ];

    useEffect(() => {
        getFacts();
    }, []);


    return (
        <>
            {
                AllFacts.length > 0 ? <TableForm data={AllFacts} columns={columns}/> 
                : null
            }
        </>
    )

}