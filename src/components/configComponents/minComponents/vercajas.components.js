import React, { useState, useEffect } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import axios from "axios";

export const VerCajas = ({ albaran_ }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getCajas();
    }, [albaran_]);

    const getCajas = async () => {
        try {
            const result = await axios.get(`${bk_dir}/facturas/getCajas`, { params: { albaran: albaran_ } });
            setData(result.data.data);  // Suponiendo que el objeto recibido tiene la estructura { data: [...] }
            console.log(result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Función para ordenar los datos por 'numerocaja'
    const sortDataByNumeroCaja = (data) => {
        return data.slice().sort((a, b) => {
            const numA = parseInt(a.numerocaja, 10);
            const numB = parseInt(b.numerocaja, 10);
            return numA - numB;
        });
    };

    // Ordenamos los datos antes de renderizarlos
    const sortedData = sortDataByNumeroCaja(data);

    return (
        <>
            {sortedData.length > 0 ? (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'black' }}>
                        <div style={{ color: 'white' }}>Numero</div>
                        <div style={{ color: 'white' }}>Caja</div>
                        <div style={{ color: 'white' }}>Cantidad</div>
                    </div>
                    <div style={{ height: 200, overflowY: 'scroll' }}>
                        {sortedData.map((item) => (
                            <div key={item?.numerocaja} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <div style={{ color: 'black' }}>{item?.numerocaja}</div>
                                <div style={{ color: 'black' }}>{item?.caja}</div>
                                <div style={{ color: 'black' }}>{item?.cantidad}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
};
