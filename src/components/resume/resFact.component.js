import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";
import { Loadingbar } from "../any_components/loadingbar";
import TableForm, { TextColumnFilter, NumberColumnFilter } from "../dynamic_table/table.component";
const loagind = require('../../assets/dist/img/images/Processing-cuate.png')

function DashboardFacturas() {
  const [data, setData] = useState([]);
  
  //-----------------COLUMNS---------------------
  const columns = [
    { Header: 'PEDIDO', accessor: 'pedidoventa', Filter: TextColumnFilter },
    { Header: 'FACTURA', accessor: 'factura', Filter: TextColumnFilter },
    { Header: 'ALBARAN', accessor: 'albaran', Filter: TextColumnFilter },
    { Header: 'CLIENTE', accessor: 'clientenombre', Filter: TextColumnFilter },
    { Header: 'DEPARTAMENTO', accessor: 'departamento', Filter: TextColumnFilter },
    { Header: 'CIUDAD', accessor: 'ciudad', Filter: TextColumnFilter },
    { Header: 'ESTADO', accessor: 'state_name', Filter: TextColumnFilter },
    { Header: 'DECLARACION', accessor: 'declaracionenvio', Filter: NumberColumnFilter },
    { Header: 'ENTREGADOR', accessor: 'nombre', Filter: TextColumnFilter },
    { Header: 'PLACA', accessor: 'placa', Filter: TextColumnFilter },
  ];
  //---------------------------------------------

  useEffect(() => {
    getFacs();
  }, []);

  const getFacs = async () => {
    try {
      var data = await axios.get(bk_dir + '/facturas/getFactActives').then(e => e.data);
      setData(data.data);
    } catch (error) {
      console.log("err")
    }
  }

  return (
    <>
      {
        data.length > 0 ?
          <TableForm data={data} columns={columns} />
          :
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loadingbar />
            <div style={{ width: '30%', height: '30%' }}>
              <img src={loagind} style={{ display: 'block', margin: 'auto' }} />
            </div>
          </div>
      }

    </>
  )
}

export default DashboardFacturas;