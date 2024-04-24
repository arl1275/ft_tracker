import React, {useMemo} from 'react';
//----------------------------------------
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const TableForm = ({ data }) => {
    
  const columns = useMemo( () => [
    { header: 'FACTURA', accessorKey: 'factura', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, muiTableHeadCellProps: { sx: { fontsize : 80 } }},
    { header: 'LISTA DE ENTREGA', accessorKey: 'lista_empaque', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>},
    { header: 'CLIENTE', accessorKey: 'clientenombre', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>},
    { header: 'CAJAS', accessorKey: 'cant_cajas',Cell: ({ renderedCellValue }) => <strong color='red'>{renderedCellValue}</strong> },
    { header: 'UNIDADES', accessorKey: 'cant_unidades', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'DEPARTAMENTO', accessorKey: 'departamento', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'CIUDAD', accessorKey: 'ciudad', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'UBICACION', accessorKey: 'calle', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'FECHA CREADO', accessorKey: 'created_at', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'PREPARADO', accessorKey: 'toma_preparacion', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'TRANSITO', accessorKey: 'toma_transito', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'ENTREGADO', accessorKey: 'toma_hora_fecha_entrega', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'SINCRONIZADO', accessorKey: 'toma_sincronizado', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'DEC_ENVIO', accessorKey: 'declaracionenvio', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'NOMBRE', accessorKey: 'nombre', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
    { header: 'PLACA', accessorKey: 'placa', Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
  ]
  );

  const table = useMaterialReactTable({
    data,
    columns
  });

  return(
    <div className='card' style={{margin : 10, backgroundColor : 'grey'}}>
      <MaterialReactTable table={table} />
    </div>
  ) 
  
}
export default TableForm;
