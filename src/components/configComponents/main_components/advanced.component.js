import { useState, useEffect } from "react";
import { HeadAdvanced } from "../minComponents/headAdvanced.component";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";
import { FacturasLista } from "../avanced_components/Factura_component";
import { DeclaracionesLista } from "../avanced_components/Declaraciones_components";

export const AdvancedList = () => {
    const [Pedidos, setPedidos] = useState([]);
    const [Facturas, setFacturas] = useState([]);
    const [Declaraciones, setDeclaraciones] = useState([]);

    const Fullarrays = async () => {
        try {
            const values = await axios.get(bk_dir + '/facturas/AdminFact').then(e => e.data);
            setFacturas(values.data);
            const list_ = await axios.get(bk_dir + '/decEnv/getDecEnv').then(e => e.data);
            setDeclaraciones(list_.data)
        } catch (err) {
            alert('error al obtener las facturas');
        }
    }

    useEffect(() => {
        Fullarrays()
    }, [])


    return (
        <div style={{
            height: '80vh',
            backgroundColor: '#F0F3F4',
            width: '100',
            margin: '5px 10px 5px 10px',
            borderRadius: 5,
            padding: 10,
            border: '1px solid #bfc9ca',
            alignItems: 'center'
        }}>

            <HeadAdvanced />

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ backgroundColor: 'white', width: '50%', height: '100%', margin: 5, borderRadius: 5, border: '1px solid #cfd8dc' }}>
                    <div style={{ width: '100%', fontSize: 15, fontWeight: 'bold', textAlign: 'center', margin: '10px 0px 10px 0px' }}>FACTURAS</div>
                    <FacturasLista facturas={Facturas} />
                </div>
                <div style={{ backgroundColor: 'white', width: '50%', height: '100%', margin: 5, borderRadius: 5, border: '1px solid #cfd8dc' }}>
                    <div style={{ width: '100%', fontSize: 15, fontWeight: 'bold', textAlign: 'center', margin: '10px 0px 10px 0px' }}>DECLARACIONES</div>
                    <DeclaracionesLista declaraciones={Declaraciones}/>
                </div>

                {/* <div style={{ backgroundColor: 'white', width: '35%', height: '100%', margin: 5, borderRadius: 5, border: '1px solid #cfd8dc' }}>EXPORT</div> */}
            </div>


        </div>
    )
}

