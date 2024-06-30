
import { useState } from "react";

export const AdminFacturas = ({ facturas })=>{
    const [data, setData] = useState([]);                                   // this contains the main information
    const [seeDB, setDB ] = useState([]);                                   // this is to see id_ from databases
    const [SelectedFactura, setSelectedFactura] = useState(null)            // this is to save one factura values
    const [ArraySelectedFacturas, setArraySelectedFacturas] = useState([])  // this is to save more than one factura values



    return(
        <>
        <div style={{ border : '1px solid grey', padding : 10 }}>
            {
               facturas.length > 0 ? (
                <div>
                    {facturas.map((item, index) => {
                        return (
                            <div key={index} className={styles.row}>
                                <div>{item.pedidoventa}</div>
                                <div>{item.factura}</div> {/* Fixed mismatched div tag */}
                                <div>{item.albaran}</div>
                                <div>{item.list_empaque}</div>
                            </div>
                        );
                    })}
                </div>
            ) : ( <div>No facturas found.</div>)
            }
        </div>
        </>
    )
}


const styles = {
    row : {
        borderColor : 'grey',
        height : 10,
        diplay : 'flex',
        flexDirection : 'row'
    }
}