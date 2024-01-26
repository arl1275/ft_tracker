import React from 'react';
import { useTable, useGlobalFilter } from 'react-table';

export const TextColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={`Filter ${column.Header}`}
    />
  );
};


export const DateColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
  
    return (
      <input
        type="date"
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={`Filter ${column.Header}`}
      />
    );
  };


// Define custom number filter component
export const NumberColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <input
      type="number"
      value={filterValue || ''}
      onChange={(e) => setFilter(parseInt(e.target.value, 10))}
      placeholder={`Filter ${column.Header}`}
    />
  );
};

// ... (your existing imports)

const TableForm = ({ columns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      setGlobalFilter,
    } = useTable({ columns, data }, useGlobalFilter); // Use useGlobalFilter
  
    return (
      <div>
        <input
          type="text"
          value={state.globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="BUSCAR"
          className='form-control'
          style={{ width: '20%', margin: 10 }}
        />
  
        <table {...getTableProps()} className="table card-table table-vcenter text-nowrap datatable" style={{ color: 'black' }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              let valor = row.toma_preparado ? 'black' : 'white';
              return (
                <tr {...row.getRowProps()} 
                style={{ backgroundColor: row.original.valor }}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} style={{backgroundColor : valor}}>
                      {cell.value !== null ? cell.render('Cell') : '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
export default TableForm;
