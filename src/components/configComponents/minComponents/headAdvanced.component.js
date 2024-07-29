import { useState, useEffect } from "react";
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { UpdateRegisters } from "../../utilis/UpdateRegisters";
// import OpenInNewOffIcon from '@mui/icons-material/OpenInNewOff';

export const HeadAdvanced = ({ Facturas, Declaraciones }) => {
    const [Finalizar, setFinalziar] = useState(false);  // Only FACTURAS can be CLOSED : VALUES TO CONSIDER item._closed
    const [bloquear, setBloquear] = useState(false);    // FACTURAS and DECLARACIONES can be Blocked : VALUES TO CONSIDER item.isblock
    const [desbloqu, setDesbloqu] = useState(false);    // FACTURAS and DECLARACIONES can be unBlocked : VALUES TO CONSIDER item.isblock
    const [movercaj, setMovercaj] = useState(false);    // Only FACTURAS can be moved boxes

    // Functions that validate the items
    const IsthereFacturas = () => Facturas.length > 0;
    const IsthereDeclarac = () => Declaraciones.length > 0;

    const HabilitarBotones = () => {
        if (IsthereFacturas() || IsthereDeclarac()) {
            setFinalziar(IsthereFacturas());
            setBloquear(true);
            setDesbloqu(true);
            setMovercaj(IsthereFacturas());
        } else {
            setFinalziar(false);
            setBloquear(false);
            setDesbloqu(false);
            setMovercaj(false);
        }
    };

    useEffect(() => {
        HabilitarBotones();
    }, [Facturas, Declaraciones]);

    const ValidarClickSeleccion = (tipoSeleccion) => {
        const FunctionExecute = validateArraysContent();
        CaseSelecition(tipoSeleccion, FunctionExecute);
    };

    const validateArraysContent = () => {
        let ThereFacts = IsthereFacturas();
        let ThereDecla = IsthereDeclarac();
        
        if (ThereFacts && ThereDecla) {
            return 3;   //  this means there are Facturas plus Declaracioens values
        } else if (ThereFacts && !ThereDecla) {
            return 2;   //  this means there are only Facturas values
        } else if (!ThereFacts && ThereDecla) {
            return 1;   //  this means there are only Declaracioens values
        } else {
            return 0;   // this is not supposed to be used, but any case, there is...
        }
    };

    const CaseSelecition = (FunctionToExecute, ValueOfArrays) => {
        console.log(' valores antes de enviar :: ', FunctionToExecute, ValueOfArrays)

        if (FunctionToExecute === 1 && ValueOfArrays === 2) {       //  this function is To Finalizar Factura
            UpdateRegisters(Facturas, Declaraciones, 1, 1); 

        }else if(FunctionToExecute === 2 && ValueOfArrays === 1){   //  this is to block Declaraciones
            UpdateRegisters(Facturas, Declaraciones, 4, 0); 
        
        }else if(FunctionToExecute === 3 && ValueOfArrays === 1){   //  this is to Unblock Declaraciones
            UpdateRegisters(Facturas, Declaraciones, 5, 0); 

        }else if (FunctionToExecute === 2 && ValueOfArrays === 2) { // this is to block Facturas
            UpdateRegisters(Facturas, Declaraciones, 2, 1); 

        } else if (FunctionToExecute === 3 && ValueOfArrays === 2){ // this is to unblock Facturas
            UpdateRegisters(Facturas, Declaraciones, 3, 1);
        
        } else {
            console.log(' POR ALGUNA RAZON PASO ESTO');
        }
    };

    const messageAlert = (message) => {
        alert('ALERTA : ', message);
    };

    return (
        <div>
            <div style={style.card}>
                <div style={style.MinCard}>
                    <button style={{ ...style.button, backgroundColor: Finalizar ? '#138d75' : 'black', borderColor: '#145a32', color: "white", fontWeight: 'bold'}}
                        onClick={() => ValidarClickSeleccion(1)}
                    >
                        FINALIZAR
                        <CheckCircleIcon fontSize="medium" style={{ color: Finalizar ? 'white' : '#e5e7e9' }} />
                    </button>
                    <button style={{ ...style.button, backgroundColor: bloquear ? '#c0392b' : 'black', borderColor: '#b71c1c', color: "white", fontWeight: 'bold' }}
                        onClick={() => ValidarClickSeleccion(2)}
                    >
                        BLOQUEAR
                        <BlockIcon fontSize="medium" style={{ color: bloquear ? 'white' : '#e5e7e9' }} />
                    </button>
                    <button style={{ ...style.button, backgroundColor: desbloqu ? '#3498db' : 'black', borderColor: 'blue', color: "white", fontWeight: 'bold'}}
                        onClick={() => ValidarClickSeleccion(3)}
                    >
                        DESBLOQUEAR
                        <VpnKeyIcon fontSize="medium" style={{ color: desbloqu ? 'white' : '#e5e7e9' }} />
                    </button>
                </div>
                <div>
                    {/* <button style={{ ...style.button, backgroundColor: movercaj ? '#f48fb1' : 'black', borderColor: '#880e4f', color: "white", fontWeight: 'bold' }}>
                        MOVER CAJAS
                        <OpenInNewOffIcon fontSize="medium" style={{ color: movercaj ? 'pink' : '#e5e7e9' }} />
                    </button> */}
                </div>
            </div>
        </div>
    )
}

const style = {
    card: {
        backgroundColor: 'white',
        borderRadius: 5,
        border: '1px solid #bfc9ca',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        padding: '10px'
    },
    MinCard: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        height: 30,
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        margin: '5px',
        borderRadius: 3,
        textAlign: 'center',
        alignContent: 'center',
        padding: '0px 25px'
    }
}
