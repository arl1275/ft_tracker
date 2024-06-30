import { useState, useEffect } from "react";
import { bk_dir } from "../../conf/configuration.file";
import axios from "axios";
import { AdminFacturas } from "../../components/configComponents/administrators_components/lists.components";

export const AdministratorView = () =>{
    const [facturas, setFacturas] = useState([]);
    const [declaraciones, setDeclaraciones] = useState([]);

    useEffect(()=>{
        GetFacturas();
        getDeclaraciones();
    });

    const GetFacturas = async () =>{
        try {
            const values = await axios.get(bk_dir + '/facturas/AdminFact').then(e => e.data);
            setFacturas(values.data);
        } catch (error) {
            alert('--- ERROR AL TRAER LAS FACTURAS ---');
        }
    }

    const getDeclaraciones = async () =>{
        try {
            const values = await axios.get(bk_dir + '/decEnv/getDecEnv').then(e => e.data);
            setDeclaraciones(values.data);
        } catch (error) {
            alert('--- ERROR AL TRAER LAS Declaraciones ---');
        }
    }

    return(
        <>
            <AdminFacturas facturas={facturas.length > 0 ? facturas : null}/>
        </>
    )
}
