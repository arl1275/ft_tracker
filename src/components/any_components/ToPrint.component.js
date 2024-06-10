import React, { useRef, useState } from 'react';
import { Modal, Box, Button, IconButton } from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types'; // Agrega esto si quieres utilizar PropTypes
const foto = require('../../assets/dist/img/images/image.png');

const sumarNumeros = (facts) => {
    let sumaCajas = 0;
    let sumaTotal = 0;
  
    // Iterar sobre los datos y sumar los valores convertidos a números
    facts.forEach((fact) => {
      // Convertir los strings a números
      const cajas = parseInt(fact.cant_cajas, 10); // Base 10
      const total = parseInt(fact.cant_total, 10); // Base 10
  
      // Verificar si la conversión fue exitosa
      if (!isNaN(cajas)) {
        sumaCajas += cajas;
      }
  
      if (!isNaN(total)) {
        sumaTotal += total;
      }
    });
  
    return { sumaCajas, sumaTotal };
  };

const PrintableComponent = React.forwardRef(({ facts, dec_ , truck , sCajas, sTotal}, ref) => (
    <div ref={ref} style={{ padding: '20px', border: '1px solid #ddd', width: '100%' , margin : 10 , alignSelf : 'center'}}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>
                <div style={{ fontSize : 15 , color : 'black' , fontWeight : 'bold'}}>DECLARACION DE ENVIO</div>
                <div style={{ fontSize : 10 , color : 'black' , fontWeight : 'bold'}}>D-ENV-000{dec_ != '' ? dec_ : '- N/A'}</div>
                <div style={{ fontSize : 10 , color : 'black' }}>Camion : {truck != '' ? truck : 'N/A'}</div>
                <h3  style={{ fontSize : 10 , color : 'black' }}>{new Date().toLocaleString()}</h3>
            </div>
            <img src={foto} alt="Foto" style={{ width: '20%', height: '10%' }} />
        </div>
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: 'black' }}>
                    <th style={{ padding: '5px', color: 'white', fontSize: 10, fontWeight : 'bold' }}>CLIENTE</th>
                    <th style={{ padding: '5px', color: 'white', fontSize: 10, fontWeight : 'bold' }}>FACTURA</th>
                    <th style={{ padding: '5px', color: 'white', fontSize: 10, fontWeight : 'bold' }}>ALBARAN</th>
                    <th style={{ padding: '5px', color: 'white', fontSize: 10, fontWeight : 'bold' }}>RUTA</th>
                    <th style={{ padding: '5px', color: 'white', fontSize: 10, fontWeight : 'bold' }}>CAJAS</th>
                    <th style={{ padding: '5px', color: 'white', fontSize: 10, fontWeight : 'bold' }}>UNIDADES</th>
                </tr>
            </thead>
            <tbody>
                {facts.map((fact, index) => (
                    <tr key={index}>
                        <td style={{ borderBottomWidth : 0.5 , borderBlockColor : '#c7c7c7', padding: '5px', fontSize: 10 }}>{fact?.cliente}</td>
                        <td style={{ borderBottomWidth : 0.5 , borderBlockColor : '#c7c7c7', padding: '5px', fontSize: 10 }}>{fact?.factura}</td>
                        <td style={{ borderBottomWidth : 0.5 , borderBlockColor : '#c7c7c7', padding: '5px', fontSize: 10 }}>{fact?.albaran}</td>
                        <td style={{ borderBottomWidth : 0.5 , borderBlockColor : '#c7c7c7', padding: '5px', fontSize: 10 }}>{fact?.list_empaque}</td>
                        <td style={{ borderBottomWidth : 0.5 , borderBlockColor : '#c7c7c7', padding: '5px', fontSize: 10 }}>{fact?.cant_cajas}</td>
                        <td style={{ borderBottomWidth : 0.5 , borderBlockColor : '#c7c7c7', padding: '5px', fontSize: 10 }}>{fact?.cant_total}</td>
                    </tr>
                ))}
                <tr key={1} style={{ backgroundColor : 'black'}}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{ padding: '3px', fontSize: 10 , color : 'white', fontWeight : 'bold'}}>TOTALES</td>
                        <td style={{ padding: '3px', fontSize: 10 , color : 'white', fontWeight : 'bold'}}>{sCajas}</td>
                        <td style={{ padding: '3px', fontSize: 10 , color : 'white', fontWeight : 'bold'}}>{sTotal}</td>
                    </tr>
            </tbody>
        </table>
        {/* Puedes agregar más contenido aquí según tus necesidades */}
    </div>
));

PrintableComponent.propTypes = {
    facts: PropTypes.array.isRequired, // Añade PropTypes si quieres especificar los tipos de datos
    dec: PropTypes.string,
};

export const PrintButton = ({ facts, dec , camion}) => {
    const [openPrint, setOpenPrint] = useState(false);
    const printRef = useRef();
    const { sumaCajas, sumaTotal } = sumarNumeros(facts);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'DeclaracionEnvio',
        pageStyle: `
      @page { size: 11in 8.5in; margin: 1in; } 
      @media print {
        body { -webkit-print-color-adjust: exact; }
      }
    `,
    });

    const handleOpen = () => setOpenPrint(true);
    const handleClose = () => setOpenPrint(false);

    return (
        <div>
            <IconButton onClick={handleOpen} style={{ backgroundColor : 'black', borderRadius : 50, marginTop : 20, padding : 15}}>
                <LocalPrintshopIcon style={{ fontSize: 'large', color: 'white' }} />
                <div style={{ fontSize : 15, marginLeft : 10 , color : 'white'}}>PRECIONE AQUI PARA IMPRIMIR</div>
            </IconButton>

            <Modal open={openPrint} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxHeight: '80vh',
                        overflow: 'auto',
                        width: '80vw'
                    }}
                >
                    <PrintableComponent ref={printRef} facts={facts} dec_ = {dec} truck = {camion} sCajas={sumaCajas} sTotal={sumaTotal} />
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button variant="contained" onClick={handlePrint} style={{ backgroundColor : 'black' , color : 'white'}}>Imprimir</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

PrintButton.propTypes = {
    facts: PropTypes.array.isRequired, // Añade PropTypes si quieres especificar los tipos de datos
    dec: PropTypes.string,
};
