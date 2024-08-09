import React, { useEffect, useState } from 'react';
import { Loadingbar } from '../../any_components/loadingbar';

export const FacturasLista = ({ facturas, Selection, ClearSelection, PushItem }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFacturas, setFilteredFacturas] = useState([]);
    const [Counter, setCounter] = useState(0);

    useEffect(() => { setFilteredFacturas(facturas) }, [facturas]);
    useEffect(()=>{ Selection.length === 0 ? setCounter(0) : setCounter(prevCounter => prevCounter + 1)}, [Selection])

    const PushNewDec = (num, block, closed) => {
        let NewItem = { id: num, blocked: block, isClosed: closed }
        PushItem(NewItem);
        //UpdateCounter()
    };
    const ClearSelection_ = () => { setCounter(0); ClearSelection(); }
    const IsthereCheck = (val) => Selection.some((item) => item.id === val);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.length > 1) {
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
                <div>{Counter}</div>
                <button style={styles.borrar} onClick={ClearSelection_}>BORRAR SELECCION</button>
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar factura..." style={styles.searchInput} />
            </div>

            <div style={{ margin: '5px 0px 0px 0px', overflowY: 'scroll', height: '60vh', scrollbarColor: 'red' }}>
                {
                    filteredFacturas.length > 0 ?
                        <div>{
                            filteredFacturas.map((item, index) => {
                                let COLORBACKGROUND = item._closed === true ? '#d4efdf' : (item.isblock ? '#fadbd8' : '');
                                return (
                                    <div style={{ backgroundColor: COLORBACKGROUND }}>
                                        <div style={styles.row} key={index}>
                                            <input type="checkbox" onChange={() => PushNewDec(item.id, item.isblock, item._closed)} checked={IsthereCheck(item.id) ? true : false} />
                                            <div style={{ width: '15%', fontSize: 12, color: 'black' }}>{item.pedidoventa}</div>
                                            <div style={{ width: '15%', fontSize: 12, color: 'black', fontWeight : 'bold' }}>{item.factura}</div>
                                            <div style={{ width: '15%', fontSize: 10, color: 'black' }}>{item.clientenombre}</div>
                                            <div style={{ width: '15%', fontSize: 10, color: 'black' }}>
                                                {item.albaran.split(',').map((albaran, index) => (
                                                    <div key={index}>{albaran.trim()}</div>
                                                ))}</div>
                                            <div style={{ width: '15%', fontSize: 10, color: 'black' }}>{item.lista_empaque.split(',').map((albaran, index) => (
                                                <div key={index}>{albaran.trim()}</div>
                                            ))}</div>
                                            <div style={{ width: '15%', fontSize: 10, color: 'grey' }}>{item.id}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }</div>
                        :
                        <div><Loadingbar/></div>
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
        height: 'auto'
    }
};
