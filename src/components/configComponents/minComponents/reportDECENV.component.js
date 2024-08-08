import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { bk_dir } from "../../../conf/configuration.file";
import { PrintableComponent, sumarNumeros } from "../../any_components/ToPrint.component";
import { PrintButton } from "../../any_components/ToPrint.component";


export const ReporteFacturasDeEnvio = ({ declaracion_, camion, IsReportChecked }) => {
    const [facturas, setFacturas] = useState([]);
    const printRef = useRef();

    // Supongo que sumarNumeros es una función importada que devuelve un objeto con las propiedades sumaCajas y sumaTotal
    const { sumaCajas, sumaTotal } = sumarNumeros(facturas);

    const getData = async () => {
        try {
            console.log('Declaracion :: ', declaracion_);
            const response = await axios.get(bk_dir + '/decEnv/getfactsdec', { params: { declaracion: declaracion_ } });
            console.log('brute data :: ', response);
            const data = response.data.data;
            if (Array.isArray(data) && data.length > 0) {
                setFacturas(data);
            } else {
                console.log('No se encontraron datos.');
            }
        } catch (error) {
            console.log('Error al obtener los datos:', error);
        }
    }

    useEffect(() => {
            getData();
    }, [IsReportChecked]);

    return (
        <div style={{ display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
            <PrintableComponent
                ref={printRef}
                facts={facturas}
                dec_={declaracion_}
                truck={camion}
                sCajas={sumaCajas}
                sTotal={sumaTotal}
            />
            <div style={{ marginBottom : 10}}>
                <PrintButton facts={facturas} dec={declaracion_} camion={camion} />
            </div>

        </div>
    );
}