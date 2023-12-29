import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";

export const ResumenHistorico = () => {
    const [AllFacts, setAllFacts] = useState(null);
    const [FilterArr, setFilterArr] = useState(null);

    const getFacts = async () => {
        try {
            const data = await axios.get(bk_dir + '/fact/adminFact');
            setAllFacts(data.data.data);
        } catch (err) {
            alert('NO SE PUDO OBTENER LOS DATOS, FAVOR REVISAR SU CONEXION A INTERNET');
        }
    }

    // const SetFilterOnArray = (e) => {
    //     setFilterArr(
    //         AllFacts.filter((item) => { item.state_name === e.target.value })
    //     );
    // }

    let set_fecha_format = (date) => {
        if (date) {
            const fecha = new Date(date);
            const soloFecha = fecha.toISOString().split('T')[0];
            return soloFecha;
        } else {
            return 'SIN DATA';
        }

    }

    useEffect(() => {
        getFacts();
    }, []);


    return (
        <>
            <div className="card">

            </div>

            <div className="card">
                <div className="table-responsive">
                    <table className="table card-table table-vcenter text-nowrap datatable">
                        <thead>
                            <tr>
                                <th className="w-auto">FACTURA</th>
                                <th>LISTA DE ENTREGA</th>
                                <th>CLIENTE</th>
                                <th>CAJAS</th>
                                <th>UNIDADES</th>
                                <th>DEPARTAMENTO</th>
                                <th>CIUDAD</th>
                                <th>UBICACION</th>
                                <th>FECHA CREADO</th>
                                <th>PREPARADO</th>
                                <th>TRANSITO</th>
                                <th>ENTREGADO</th>
                                <th>SINCRONIZADO</th>
                                <th>
                                    <div className="mb-auto">
                                        <select name="countries" id="select-countries" className="form-select">
                                            <option value="pl" data-data='{"flag": "pl"}' selected>SIN ESTADO</option>
                                            <option value="prep">EN PREPARACION</option>
                                            <option value="tran">EN TRANSITO</option>
                                            <option value="sinc">SINCRONIZADO</option>
                                        </select>
                                    </div>
                                </th>
                                <th>NOMBRE</th>
                                <th>PLACA</th>
                            </tr>

                        </thead>
                        <tbody>
                            {AllFacts ?

                                AllFacts.map((item) => {
                                    let valor = '';
                                    if (item.state_name === 'SINCRONIZADO') {
                                        valor = '#2855F6 '
                                    } else if (item.state_name === 'EN TRANSITO') {
                                        valor = '#7BF628'
                                    } else if (item.state_name === 'EN PREPARACION') {
                                        valor = '#F1F628'
                                    } else {
                                        valor = '#7A0C0C'
                                    }
                                    return (
                                        <tr key={item.id} style={{ backgroundColor: valor }}>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>{item.ref_factura}</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>{item.lista_empaque}</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>{item.cliente}</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>{item.cant_cajas}</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>{item.cant_unidades}</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>CORTES</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>SAN PEDRO SULA</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>{item.ubicaciones}</div></td>
                                            <td className="text-left"><div style={{ color: 'black' }}>{set_fecha_format(item.create_at)}</div></td>
                                            <td className="text-left"><div style={{ color: 'black' }}>{set_fecha_format(item.toma_preparacion)}</div></td>
                                            <td className="text-left"><div style={{ color: 'black' }}>{set_fecha_format(item.toma_transito)}</div></td>
                                            <td className="text-left"><div style={{ color: 'black' }}>{set_fecha_format(item.fecha_hora_entrega)}</div></td>
                                            <td className="text-left"><div style={{ color: 'black' }}>{set_fecha_format(item.toma_sincronizado)}</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>{item.state_name}</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>{item.nombre}</div></td>
                                            <td><div style={{ color: 'black', textAlign: 'left' }}>{item.placa}</div></td>
                                        </tr>)
                                })
                                :
                                <div>SIN DATA AQUI</div>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}