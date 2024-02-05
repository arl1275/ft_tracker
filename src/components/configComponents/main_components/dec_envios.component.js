import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";
import TableForm_dec_envio, { TextColumnFilter, NumberColumnFilter} from "../../dynamic_table/table_dec_envio";

export const List_decEnvio = () => {
    const [decEnv, setDecEnv] = useState([]);

    useEffect(()=>{
        get_data();
    }, 5000)

    const columns = [
        { Header: 'CREADO', accessor: 'created_at', Filter: TextColumnFilter, width : 10},
        { Header: 'DECLARACION ENVIO', accessor: 'declaracionenvio', Filter: TextColumnFilter, width : 10},
        { Header: 'CAMION', accessor: 'placa', Filter: TextColumnFilter, width : 10},
        { Header: 'ENTREGADOR', accessor: 'nombre', Filter: TextColumnFilter, width : 10},
        { Header: 'FACTURAS', accessor: 'cant_facturas', Filter: NumberColumnFilter, width : 10},
        { Header: 'CAJAS', accessor: 'cant_cajas', Filter: NumberColumnFilter, width : 10},
        { Header: 'UNIDADES', accessor: 'cant_unidades', Filter: NumberColumnFilter, width : 10},
    ]

    const get_data = async () => {
        try {
            const list_ = await axios.get( bk_dir + '/decEnv/getDecEnv').then(e => e.data);
            setDecEnv(list_.data)
        } catch (err) {
            alert('NO SE PUDO OBTENER LAS DEC_ENVIO :', err);
        }
    }

    return(
        <>
        {
            decEnv.length ?
            <TableForm_dec_envio data={decEnv} columns={columns} />
            : null
        }
        </>
    )
}