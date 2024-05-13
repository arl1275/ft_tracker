import { useState } from "react"
import { Botton_small_Admin } from "../minicomponents/button";
import ListUsuarios from "../configComponents/main_components/Usuarios.components";
import ListaCamiones from "../configComponents/main_components/Camiones.component";

function AdvancedView() {
    const [page, setPage] = useState('GENERAL');

    return (
        < div style={
            {
                backgroundColor: 'white',
                padding: '10px 0px 10px 0px',
                margin: '0px 20px 0px 20px',
                borderRadius: 10,
            }
        }>
            <div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent : 'space-between',
                    width: 300,
                    margin : '0px 0px 0px 20px'
                }}>
                    <div onClick={() => { setPage('USUARIOS') }}>
                        <Botton_small_Admin texto={'USUARIOS'} proppage={page} />
                    </div>

                    <div onClick={() => { setPage('CAMIONES') }}>
                        <Botton_small_Admin texto={'CAMIONES'} proppage={page} />
                    </div>

                    <div onClick={() => { setPage('CONFIG') }}>
                        <Botton_small_Admin texto={'CONFIG'} proppage={page} />
                    </div>

                </div>

            </div>

            {
                page === 'USUARIOS' && (<ListUsuarios />)
            }
            {
                page === 'CAMIONES' && (<ListaCamiones />)
            }
            {
                page === 'CONFIG' && (
                    <div></div>
                )
            }
        </div>
    )
}

export default AdvancedView;