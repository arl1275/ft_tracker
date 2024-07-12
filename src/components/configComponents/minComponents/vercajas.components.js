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
            let albaranes = albaran_.split(", ");
            let allData = []; // Asegúrate de que allData esté correctamente inicializado o definido en un ámbito superior.
    
            for (const element of albaranes) {
                const result = await axios.get(`${bk_dir}/facturas/getCajas`, { params: { albaran: element } });
                const newData = result.data.data.filter(
                    newElement => !allData.some(existingElement => existingElement.caja === newElement.caja && existingElement.lista_empaque === newElement.lista_empaque)
                );
                
                allData = [...allData, ...newData];
            }
    
            setData(allData); 
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
                        <div style={{ color: 'white' }}>RUTA</div>
                        <div style={{ color: 'white' }}>NUM_CAJA</div>
                        <div style={{ color: 'white' }}>CAJA</div>
                        <div style={{ color: 'white' }}>CANTIDAD</div>
                    </div>
                    <div style={{ height: 200, overflowY: 'scroll' }}>
                        {sortedData.map((item) => (
                            <div key={item?.numerocaja} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ color: 'black' }}>{item?.lista_empaque}</div>
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
