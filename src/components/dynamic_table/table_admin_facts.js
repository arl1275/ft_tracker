import React, { useState, useEffect } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { AlterFact } from '../configComponents/modals/AlterFact.modal';
import { ForceSynchro } from '../configComponents/modals/forzarSynchro';

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

const TableAdminFact = ({ columns, data }) => {
    const [fact, setFact] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleFact = (value_) => {
        const { factura, albaran } = value_.values;

        // Find the row in data that matches factura and albaran
        const matchingRow = data.find((row) => row.factura === factura && row.albaran === albaran);

        if (matchingRow) {
            const {
                pedidoventa,
                clientenombre,
                factura,
                albaran,
                lista_empaque,
                cant_cajas,
                cant_unidades,
                declaracionenvio,
                pais,
                departamento,
                ciudad,
                calle,
                id_estados,
                toma_preparacion,
                toma_transito,
                toma_hora_fecha_entrega,
                toma_sincronizado,
                link_firma,
                link_foto,
                nombre,
                placa,
            } = matchingRow;

            // Save the extracted properties into the fact state
            setFact({
                pedidoventa,
                clientenombre,
                factura,
                albaran,
                lista_empaque,
                cant_cajas,
                cant_unidades,
                declaracionenvio,
                pais,
                departamento,
                ciudad,
                calle,
                id_estados,
                toma_preparacion,
                toma_transito,
                toma_hora_fecha_entrega,
                toma_sincronizado,
                link_firma,
                link_foto,
                nombre,
                placa,
            });

            // Open the modal or perform other actions
            handleModal();
        } else {
            console.log('No matching row found');
        }
    };



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
            <div style={{ display : 'flex'}}>
                <input
                    type="text"
                    value={state.globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="BUSCAR..."
                    className='form-control'
                    style={{ width: '20%', margin: 10 }}
                />

                <div style={{ position : 'absolute', right : 10, margin : 10 }}>
                    <ForceSynchro />
                </div>

            </div>


            <table {...getTableProps()} className="table card-table table-vcenter text-nowrap datatable" style={{ color: 'black' }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#34495E', textAlign: 'left' }}>
                            {headerGroup.headers.map((column) => (
                                <th style={{ color: 'white' }} {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                            <th style={{ backgroundColor: '#34495E' }} />
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} onClick={handleModal}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} style={{ textAlign: 'left' }}>
                                        {cell.column.id === 'id_estados' ? (
                                            <span>{cell.value == null ? 'N/A' : (cell.value == 1 ? 'PREPARACION' : (cell.value == 2 ? 'TRANSITO' : 'SINCRONIZADO'))}</span>
                                        ) : (
                                            cell.render('Cell')
                                        )}
                                    </td>

                                ))}
                                <td style={{ padding: '8px', border: '1px solid #ddd' }} data-toggle="modal" data-target="#modal-large" onClick={() => { handleFact(row); handleModal(); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </td>
                            </tr>
                        );

                    })}
                </tbody>
            </table>

            <div class="modal modal-blur fade show" id="modal-large" tabindex="-1" style={{ paddingRight: "17px" }} aria-modal="true" role="dialog">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className='modal-content'>
                        <div className='modal-header' style={{ backgroundColor: '#34495E' }}>
                            <h5 class="modal-title" style={{ color: 'white' }}>DETALLE DE FACTURA</h5>
                            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className='modal-body'>
                            <AlterFact props={fact} />
                        </div>
                        <div className='modal-footer'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TableAdminFact;
