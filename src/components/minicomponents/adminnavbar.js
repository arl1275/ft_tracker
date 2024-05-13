import { useState } from "react";
import { Botton_Navbar_Admin } from "./button";
import { useNavigate } from 'react-router-dom';
import { getType } from "../any_components/privateRoute";

function AdminNavbar() {
    const [page, setPage] = useState({ name: 'DECLARACIONES DE ENVIO', codPage: 0 });
    const navigate = useNavigate();
    const IsAdmin = getType();

    return (
        <div style={
            {
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'row',
                height: 50,
                justifyContent: 'space-between',
                alignItems: 'center',  // Centra verticalmente los elementos
                alignSelf: 'center',
                margin: '5px 20px 5px 20px',
                borderRadius: 50,
                padding: '0px 10px 0px 10px'
            }
        }>

            {
                IsAdmin ?
                    <div onClick={() => {
                        setPage({ name: 'AVANZADO', codPage: 2 })
                        navigate('/main/administration/avanzado')
                    }} >
                        <Botton_Navbar_Admin texto={'AVANZADO'} prop={page.name} />
                    </div> : null
            }

            <div onClick={() => {
                setPage({ name: 'DECLARACIONES DE ENVIO', codPage: 0 });
                navigate('/main/administration/declaraciones', { replace: true })
            }} >
                <Botton_Navbar_Admin texto={'DECLARACIONES DE ENVIO'} prop={page.name} />
            </div>

            <div onClick={() => {
                setPage({ name: 'FACTURAS', codPage: 1 })
                navigate('/main/administration/facturas')
            }} >
                <Botton_Navbar_Admin texto={'FACTURAS'} prop={page.name} />
            </div>

        </div>
    )
}

export default AdminNavbar;