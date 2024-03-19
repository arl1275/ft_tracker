import React, { useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { CamionesCombox, EntregadorCombox } from '../consolidado/combox.component';
import axios from 'axios';
import { bk_dir } from '../../conf/configuration.file';

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

function removeTZ(dateString) {
    return dateString.replace('T', ' ').replace('Z', '');
}

const TableForm_dec_envio = ({ columns, data }) => {
    const [newCamion, setNewCamion] = useState([]);
    const [newEntregador, setNewEntregador] = useState([]);
    const [dec_, setDec] = useState('');
    const [row_, setRow_] = useState();
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({ columns, data }, useGlobalFilter); // Use useGlobalFilter

    const handleCamnion = (value) => {
        setNewCamion(value);
    }

    const handleEntregador = (value) => {
        setNewEntregador(value);
    }
    const handleRow = (value) => {
        const { declaracionenvio, placa, nombre, cant_facturas, cant_cajas, cant_unidades, created_at} = value.values;
        let arr = [declaracionenvio, placa, cant_facturas, cant_cajas, cant_unidades, nombre, created_at ];
        setNewCamion([0, placa]);
        setNewEntregador([0, nombre])
        setDec(declaracionenvio);
        setRow_(arr);
    }

    const do_change = async () => {
        if (newCamion !== '' || newEntregador !== '') {
            try {
                const data = {
                    cam: newCamion[1],
                    use: newEntregador[1],
                    decenv: dec_
                }
                const result = await axios.put(bk_dir + '/decEnv/putDecEnv', data);
                if (result.status === 500) {
                    alert('NO SE PUDO REALIZAR EL CAMBIO');
                } else {
                    alert('SE REALIZO EL CAMBIO DE DECLARACION DE ENVIO');
                }

            } catch (err) {
                console.log('ERROR AL GENERAR EL CAMBIO :', err);
            }
        }
    }

    return (
        <div >
            <div>
                <input
                    type="text"
                    value={state.globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="BUSCAR"
                    className='form-control'
                    style={{ width: '30%', margin: 10 }}
                />
            </div>

            <table {...getTableProps()} className="table card-table table-vcenter text-nowrap datatable" style={{ color: 'black' }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#34495E' }}>
                            {headerGroup.headers.map((column) => (
                                <th style={{ color: 'white', textAlign: 'left' }} {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                            <th style={{ backgroundColor: '#34495E' }} />
                        </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, index) => (
                                    <td {...cell.getCellProps()} key={index} style={{ textAlign: 'left' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                                <td style={{ padding: '8px', border: '1px solid #ddd' }} data-toggle="modal" data-target="#modal-large" onClick={() => { handleRow(row); }}>
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

                        <div className='modal-header' style={{ backgroundColor: '#7B241C' }}>
                            <h5 class="modal-title" style={{ color: 'white' }}>DECLARACION DE ENVIO : {row_ ? row_[0] : null}</h5>
                            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>


                        <>{/* --------------------- */}</>
                        <div >
                            <div class="card">
                                <ul class="nav nav-tabs" data-toggle="tabs">
                                    <li class="nav-item">
                                        <a href="#tabs-home-17" class="nav-link active" data-toggle="tab">DETALLE DECLARACION DE ENVIO</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#tabs-profile-17" class="nav-link" data-toggle="tab">ACCIONES</a>
                                    </li>
                                </ul>
                                <div class="card-body">
                                    <div class="tab-content">

                                        <div class="tab-pane fade active show" id="tabs-home-17">
                                            <div className='card'>
                                                <table>
                                                    <tr style={{ width : '100%'}}>
                                                        <td style={{ textAlign : 'left', backgroundColor : '#45B39D', color : 'white', borderBottom : '2px solid black'}}>DECLARACIÓN DE ENVIO</td>
                                                        <td style={{ textAlign : 'left', backgroundColor : '#8E44AD', color : 'white', borderBottom : '2px solid black'}}>{row_ ? row_[0] : null}</td>
                                                    </tr>
                                                </table>
                                                <table>
                                                    <tr>
                                                        <td style={{ textAlign : 'left', backgroundColor : '#45B39D', color : 'white', borderBottom : '2px solid black'}}>CREADO</td>
                                                        <td style={{ textAlign : 'left'}}>{ row_ ? row_[6] : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign : 'left', backgroundColor : '#45B39D', color : 'white', borderBottom : '2px solid black'}}>CAMION</td>
                                                        <td style={{ textAlign : 'left'}}>{row_ ? row_[1] : null}</td>
                                                        <td style={{ textAlign : 'left', backgroundColor : '#45B39D', color : 'white', borderBottom : '2px solid black'}}>ENTREGADOR</td>
                                                        <td style={{ textAlign : 'left'}}>{ row_ ? row_[5] : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign : 'left', backgroundColor : '#45B39D', color : 'white', borderBottom : '2px solid black'}}>FACTURAS</td>
                                                        <td style={{ textAlign : 'left'}}>{ row_ ? row_[2] : null}</td>
                                                        <td style={{ textAlign : 'left', backgroundColor : '#45B39D', color : 'white', borderBottom : '2px solid black'}}>UNIDADES</td>
                                                        <td style={{ textAlign : 'left'}}>{ row_ ? row_[4] : null }</td>
                                                        <td style={{ textAlign : 'left', backgroundColor : '#45B39D', color : 'white', borderBottom : '2px solid black'}}>CAJAS</td>
                                                        <td style={{ textAlign : 'left'}}>{ row_ ? row_[3] : null}</td>
                                                    </tr>
                                                </table>
                                            </div>

                                            {/* <div className='card' style={{ marginTop : 5}}>
                                                dfsd
                                            </div> */}
                                        </div>

                                        <div class="tab-pane fade" id="tabs-profile-17">

                                            <div className='modal-body'>
                                                <div className='card'>
                                                    <p style={{ margin: 20 }}>MODIFICAR EL CAMION Y EL ENTREGADOR DE ESTA DELACARACION DE ENVIO</p>
                                                </div>

                                                <div className='card' style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>

                                                    <p style={{ margin: 12, alignSelf: 'center' }}>CAMION : </p>

                                                    <div style={{ margin: 12 }}>
                                                        <CamionesCombox props={handleCamnion} />
                                                    </div>

                                                    <p style={{ margin: 12, alignSelf: 'center' }}>ENTREGADOR : </p>
                                                    <div style={{ marginTop: 10 }}>
                                                        <EntregadorCombox EntregadorHand={handleEntregador} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='modal-footer'>
                                                <button type="button"
                                                    class="btn btn-primary" data-dismiss="modal"
                                                    onClick={do_change}
                                                >VALIDAR CAMBIO</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <>{/* --------------------- */}</>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default TableForm_dec_envio;
