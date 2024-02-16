import React, { useState, useEffect } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import axios from "axios";
import TableAdminFact, {TextColumnFilter, NumberColumnFilter} from "../../dynamic_table/table_admin_facts";
import { FotosView } from "../modals/FotosFact.modal"; // this is to see the pics of the fact
import { AlterFact } from "../modals/AlterFact.modal"; // this is to do a changes in a specific factura


function ListFact() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const values = await axios.get(bk_dir + '/facturas/AdminFact').then(e => e.data);
            setData(values.data);
            console.log("data  from bk_ admin _fact : ", data);
        } catch (err) {
            console.log('error al obtener los datos : ', err);
        }
    }

    const columns = [
        { Header: "PEDIDO", accessor: "pedidoventa", Filter: TextColumnFilter },
        { Header: "CLIENTE", accessor: "clientenombre", Filter: TextColumnFilter },
        { Header: "FACTURA", accessor: "factura", Filter: TextColumnFilter },
        { Header: "ALBARAN", accessor: "albaran", Filter: TextColumnFilter },
        { Header: "RUTA", accessor: "lista_empaque", Filter: TextColumnFilter },
        { Header: "CAJAS", accessor: "cant_cajas", Filter: NumberColumnFilter },
        { Header: "UNIDADES", accessor: "cant_unidades", Filter: NumberColumnFilter },
        { Header: "DEC_ENVIO", accessor: "declaracionenvio", Filter: TextColumnFilter },
        { Header: "ESTADO", accessor: "id_estados", Filter: TextColumnFilter },
        //{ Header: "Toma Preparación", accessor: "toma_preparacion", Filter: TextColumnFilter },
        //{ Header: "Toma Tránsito", accessor: "toma_transito", Filter: TextColumnFilter },
        //{ Header: "Toma Hora Fecha Entrega", accessor: "toma_hora_fecha_entrega", Filter: TextColumnFilter },
        //{ Header: "Toma Sincronizado", accessor: "toma_sincronizado", Filter: TextColumnFilter },
        // { Header: "Link Firma", accessor: "link_firma", Filter: TextColumnFilter },
        // { Header: "Link Foto", accessor: "link_foto", Filter: TextColumnFilter },
        // { Header: "Nombre", accessor: "nombre", Filter: TextColumnFilter },
        // { Header: "Placa", accessor: "placa", Filter: TextColumnFilter },
      ];
      
    return (
       <>
        <TableAdminFact columns={columns} data={data}/>
       </>
        )

}

export default ListFact;