import React from 'react';
import { useTable, useGlobalFilter } from 'react-table';

// Define custom text filter component
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
    <div className='card' style={{ margin: 10 }}>
      <input
        type="text"
        value={state.globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="BUSCAR"
        className='form-control'
        style={{ width: '25%', margin: 10 }}
      />

      <table
        {...getTableProps()}
        className="table table-vcenter card-table"//"table card-table table-vcenter text-nowrap datatable"
        style={
          { 
            color: 'black', height : 90
          }
        }>

        <thead style={{ borderRadius : 50 }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: 'black', textAlign: 'left' }}>
              {headerGroup.headers.map((column) => (
                <th style={{ color: 'white' }} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} style={{ height : 90}}> 
          {
          rows.map((row) => {
            prepareRow(row);
            let valor = row.values.state_name == 'PREPARACION' ? '#00CCFF' : '#00FFCC';
            return (
              <tr {...row.getRowProps()} style={{ backgroundColor: valor, textAlign: 'left', fontFamily : 'revert'}}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
