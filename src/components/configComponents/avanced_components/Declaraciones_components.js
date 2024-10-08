import { useState, useEffect } from "react";
import { Loadingbar } from "../../any_components/loadingbar";

export const DeclaracionesLista = ({ declaraciones, pushItem, ClearSelection, Selection }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDeclaraciones, setFilteredDeclaraciones] = useState([]);
    const [Counter, setCounter] = useState(0);

    const PushNewDec = (num) => { pushItem(num)};
    const ClearSelection_ = () => { setCounter(0); ClearSelection(); }
    useEffect(()=>{ Selection.length === 0 ? setCounter(0) : setCounter(prevCounter => prevCounter + 1)}, [Selection])
    
    useEffect(()=>{ setFilteredDeclaraciones(declaraciones)}, [declaraciones])

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            const filtered = declaraciones.filter(item => {
                const declaracionEnvio = item.declaracionenvio?.toString().toLowerCase() || '';
                const placa = item.placa?.toString().toLowerCase() || '';
                return declaracionEnvio.includes(term.toLowerCase()) || placa.includes(term.toLowerCase());
            });

            if (filtered.length > 0) {
                setFilteredDeclaraciones([filtered[0], ...declaraciones.filter(f => f !== filtered[0])]);
            } else {
                setFilteredDeclaraciones(declaraciones);
            }
        } else {
            setFilteredDeclaraciones(declaraciones);
        }
    };

    return (
        <div>
            <div style={{ alignSelf: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div>{Counter}</div>
                <button style={styles.borrar} onClick={ClearSelection_}>BORRAR SELECCION</button>
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar declaración..." style={styles.searchInput} />
            </div>

            <div style={{ margin: '5px 0px 0px 0px', overflowY: 'scroll', height: '60vh', scrollbarColor: 'red' }}>
                {
                    filteredDeclaraciones.length > 0 ?
                        <div>{
                            filteredDeclaraciones.map((item, index) => {
                                let COLORBACKGROUND = item._closed === true ? '#f2d7d5' : '';
                                return (
                                    <div style={{ backgroundColor: COLORBACKGROUND }} key={index}>
                                        <div style={styles.row}>
                                            <input type="checkbox" onChange={() => PushNewDec(item.id)} checked={Selection.includes(item.id) ? true : false}/>
                                            <div style={{ width: '30%', fontSize: 12, color: 'black', fontWeight : 'bold' }}>{item.declaracionenvio}</div>
                                            <div style={{ width: '30%', fontSize: 12, color: 'black', fontWeight : 'bold' }}>{item.placa}</div>
                                            <div style={{ width: '30%', fontSize: 12, color: 'grey' }}>{item.id}</div>
                                        </div>
                                    </div>)
                            })
                        }</div>
                        :
                        <div><Loadingbar/></div>
                }
            </div>
        </div>
    );
}

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
    searchInput: {
        padding: '5px',
        width: '30%',
        fontSize: '14px',
        borderRadius: '3px',
        border: '1px solid #ccc',
        height: 'auto'
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
    }
};
