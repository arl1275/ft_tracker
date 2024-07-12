import React, { useState, useEffect, useMemo } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import { AlterFact } from "../modals/AlterFact.modal";
import axios from "axios";

import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

function ListFact() {
    const [data, setData] = useState([]);
    const [fact, setFact] = useState();

    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => {
        setIsOpen(!isOpen);
    }
    const handleFact = (row) => {
        const { factura, albaran } = row; // Extrae directamente de 'row' en lugar de 'row.values'
        const matchingRow = data.find((rowData) => rowData?.factura === factura && rowData?.albaran === albaran);

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

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const values = await axios.get(bk_dir + '/facturas/AdminFact').then(e => e.data);
            setData(values.data);
        } catch (err) {
            console.log('error al obtener los datos : ', err);
        }
    }

    const columns = useMemo(() => [
        {
            header: "VER",
            Cell: ({ row }) => (
                <div data-toggle="modal" data-target="#modal-large"
                    onClick={() => { handleFact(row.original); handleModal(); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                </div >
            ), size : 50
        },
        { header: "PEDIDO", accessorKey: "pedidoventa", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "CLIENTE", accessorKey: "clientenombre", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "FACTURA", accessorKey: "factura", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "ALBARAN", accessorKey: "albaran", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "RUTA", accessorKey: "lista_empaque", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "CAJAS", accessorKey: "cant_cajas", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "UNIDADES", accessorKey: "cant_unidades", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "DEC_ENVIO", accessorKey: "declaracionenvio", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "ESTADO", accessorKey: "id_estados", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Toma Preparación", accessorKey: "toma_preparacion", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Toma Tránsito", accessorKey: "toma_transito", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Toma Hora Fecha Entrega", accessorKey: "toma_hora_fecha_entrega", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Toma Sincronizado", accessorKey: "toma_sincronizado", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Link Firma", accessorKey: "link_firma", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Link Foto", accessorKey: "link_foto", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Nombre", accessorKey: "nombre", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Placa", accessorKey: "placa", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Pais", accessorKey: "pais", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Departamento", accessorKey: "departamento", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Ciudad", accessorKey: "ciudad", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> },
        { header: "Calle", accessorKey: "calle", Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> }
    ]);

    const table = useMaterialReactTable({
        data,
        columns,
        initialState: { density: 'compact', pagination : { pageSize : 15} }
    });

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',  // Asegura que el contenedor ocupe el ancho completo del padre
        }}>
            <div style={{
                width: '97%',  // Ancho del contenedor interno
                maxWidth: '100%',  // Ancho máximo opcional
                display: 'flex',
                justifyContent: 'center',
                height: 'auto'
            }}>
                <MaterialReactTable table={table} />
            </div>

            <div class="modal modal-blur fade show" id="modal-large" tabindex="-1" style={{ paddingRight: "17px" }} aria-modal="true" role="dialog">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style={{ maxWidth : '60%'}}>
                    <div className='modal-content'>
                        <div className='modal-header' style={{ backgroundColor: 'black' }}>
                            <h5 class="modal-title" style={{ color: 'white' }}>DETALLE DE FACTURA</h5>
                            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" style={{ color : 'white'}}/>
                        </div>
                        <div className='modal-body'>
                            <AlterFact props={fact} />
                        </div>
                        <div className='modal-footer'></div>
                    </div>
                </div>
            </div>


        </div>

    )

}

export default ListFact;