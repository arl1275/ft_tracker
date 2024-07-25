import React, { useState } from 'react';

export const FacturasLista = ({ facturas }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFacturas, setFilteredFacturas] = useState(facturas);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            const filtered = facturas.filter(factura =>
                factura.factura.toLowerCase().includes(term.toLowerCase()) ||
                factura.clientenombre.toLowerCase().includes(term.toLowerCase())
            );

            if (filtered.length > 0) {
                setFilteredFacturas([filtered[0], ...facturas.filter(f => f !== filtered[0])]);
            } else {
                setFilteredFacturas(facturas);
            }
        } else {
            setFilteredFacturas(facturas);
        }
    };

    return (
        <div>
            <div style={{ alignSelf: 'center', width: '100%', display: 'flex', flexDirection: 'row', height: 'auto' }}>
                <div style={styles.borrar}>BORRAR SELECCION</div>
                <div style={styles.principal}>PRINCIPAL</div>
                <div style={styles.secundaria}>SECUNDARIA</div>
                <input type="text" value={searchTerm} onChange={handleSearch}  placeholder="Buscar factura..." style={styles.searchInput}/>
            </div>

            <div style={{ margin: '5px 0px 0px 0px', overflowY: 'scroll', height: '60vh', scrollbarColor: 'red' }}>
                {
                    filteredFacturas.length > 0 ?
                        <div>{
                            filteredFacturas.map((item, index) => {
                                return (
                                    <div style={styles.row} key={index}>
                                        <input type="checkbox" />
                                        <div style={{ width: '40%', fontSize: 12, color: 'black' }}>{item.factura}</div>
                                        <div style={{ width: '40%', fontSize: 12, color: 'black' }}>{item.clientenombre}</div>
                                    </div>)
                            })
                        }</div>
                        :
                        <div>null</div>
                }
            </div>
        </div>
    );
};

const styles = {
    borrar: {
        border: '1px solid #d81b60',
        height: 'auto',
        width: 'auto',
        maxWidth: 200,
        backgroundColor: '#d81b60',
        margin: 5,
        borderRadius: 3,
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        padding: '0px 5px 0px 5px'
    },
    principal: {
        border: '1px solid #0d47a1',
        height: 'auto',
        width: 'auto',
        backgroundColor: '#c5cae9',
        margin: 5,
        borderRadius: 3,
        justifyContent: 'center',
        textAlign: 'center',
        color: 'black',
        padding: 3,
        fontSize: 10
    },
    secundaria: {
        border: '1px solid #bf360c',
        height: 'auto',
        width: 'auto',
        backgroundColor: '#ffccbc',
        margin: 5,
        borderRadius: 3,
        justifyContent: 'center',
        textAlign: 'center',
        color: 'black',
        padding: 3,
        fontSize: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        margin: '3px 3px 3px 3px',
        justifyContent: 'space-between',
        borderWidth: '1px 0px 0px 0px',
        borderStyle: 'solid',
        borderColor: '#e5e7e9',
        alignItems: 'center'
    },
    searchInput: {
        padding: 1,
        width: '30%',
        fontSize: '10px',
        borderRadius: '3px',
        border: '1px solid #ccc',
        height : 'auto'
    }
};
