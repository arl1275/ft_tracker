import React, { useState, useEffect } from "react";
import axios from "axios";
import { bk_dir } from "../../../conf/configuration.file";


export const FotosView = ({ props }) => {
    const [Data, setData] = useState(null);
    const [id, setId] = useState(null);

    function isLink(value) {
        const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
        return urlPattern.test(value);
      }

    useEffect(() => {
        if (props && id != props) {
            setId(props);
        }else{
            setId(0);
        }
        GetDataPics();
    }, [props]);

    useEffect(() => {
        if (id != null) {
            GetDataPics();
        } else {
            console.log('Value not received yet');
        }
    }, [id]);

    const GetDataPics = async () => {
        try {
            if (id != 0 && id === props) {
                const res = await axios.get(bk_dir + '/entregas/getFactPics', { params: { id: id } });
                setData(res.data.data);
                console.log('data from bk : ', Data);
            } else {
                console.log('value not recibed yet');
            }
        } catch (err) {
            console.log('ERROR AL OBTENER FOTOS', err);
        }
    }

    return (
        <div>
            {
                Data === null ?
                    <>NO HAY DATOS PARA MOSTRAR</>
                    :
                    <div style={{ display: 'flex', flexDirection: 'row', alignContent : 'space-between'}}>
                        <div className="card">
                            {isLink(Data[0]?.firmanpic) ?
                                <img src={Data[0].firmanpic} style={{ margin: 30, width: '400px', height: '400px' }} /> 
                                :
                                <p>NO TIENE DATOS PARA MOSTRAR</p>
                            }
                            
                        </div>
                            {
                                isLink(Data[0]?.fotopic) ? 
                                <div className="card">
                                <img src={Data[0].fotopic} style={{ margin: 30, width: '400px', height: '400px' }} />
                                </div>
                                : null
                            }
                            
                        </div>
            }
        </div>

    )
}