import { useState } from "react";
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import OpenInNewOffIcon from '@mui/icons-material/OpenInNewOff';

export const HeadAdvanced = () => {
    const [isSelected, setSelected] = useState('N/A');

    const Selccionar = (text) => { setSelected(text) };

    return (
        <div style={style.card}>

            <div style={style.MinCard}>
                <div style={{ height: 30, width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#145a32', backgroundColor : '#b2dfdb', margin: '5px 5px 5px 5px', borderRadius: 3, textAlign: 'center', alignContent: 'center', padding: '0px 25px 0px 25px' }}>
                    FINALIZAR
                    <CheckCircleIcon fontSize="medium" style={{ color: 'green' }} />
                </div>
                <div style={{height: 30, width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#b71c1c', backgroundColor : '#ffcdd2', margin: '5px 5px 5px 5px', borderRadius: 3, textAlign: 'center', alignContent: 'center', padding: '0px 25px 0px 25px' }}>
                    BLOQUEAR
                    <BlockIcon fontSize="medium" style={{ color: 'red' }} />
                </div>
                <div style={{ height: 30, width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: 'blue', backgroundColor : '#b3e5fc', margin: '5px 5px 5px 5px', borderRadius: 3, textAlign: 'center', alignContent: 'center', padding: '0px 25px 0px 25px' }}>
                    DESBLOQUEAR
                    <VpnKeyIcon fontSize="medium" style={{ color: 'blue' }} />
                </div>
            </div>

            <div>
                <div style={{ height: 30, width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#880e4f', backgroundColor : '#f48fb1', margin: '5px 5px 5px 5px', borderRadius: 3, textAlign: 'center', alignContent: 'center', padding: '0px 25px 0px 25px' }}>
                    MOVER CAJAS
                    <OpenInNewOffIcon fontSize="medium" style={{ color: 'pink' }} />
                </div>
            </div>

        </div>
    )
}

const style = {
    card: {
        backgroundColor: 'white',
        borderRadius: 5,
        border : '1px solid #bfc9ca',
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexdirecction: 'row',
        justifyContent : 'space-between',
        alignContent: 'center'
    },
    MinCard: { display: 'flex', flexdirecction: 'row' }
}