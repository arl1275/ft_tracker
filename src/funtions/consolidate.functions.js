import React from "react";
import axios from "axios";
import { bk_dir } from "../conf/configuration.file";

// export function create_consolidado_transportista({props}){
//     try {
//         axios.post(bk_dir + '/trans/GenConsolidateTransportistas', props).then((response)=>{
//             console.log("se genero el consolidado de transportista: ", response);
//             return true;
//         }).catch((err)=>{
//             console.log("ERROR al publicar CONSOLIDADO DE FACTURAS: ");
//             return false;
//         })
//         console.log("se genero el consolidado");
//         return true;
//     } catch (err) {
//         console.log("ERROR al publicar CONSOLIDADO DE FACTURAS: ", err);
//         return false;
//     }
// }

// export function create_void_entrega(){
//     try {
//         axios.post(bk_dir + '/entregas/genEntrega').then((response)=>{
//             console.log("se genero la entrega: ", response);
//             return true;
//         }).catch((err)=>{
//             console.log("ERROR al publicar entrega: ", err);
//             return false;
//         });
//     } catch (error) {
//         console.log("ERROR al publicar ENTREGA VACIA: ", err);
//         return false;
//     }
// }

// export function create_Consolidado_principal(){
//     try {
//         axios.post(bk_dir + '/trans/posNewConsolidado', props).then((response)=>{
//             console.log("se genero la entrega: ", response);
//             return true;
//         }).catch((err)=>{
//             console.log("ERROR al publicar entrega: ", err);
//             return false;
//         });
//     } catch (error) {
//         console.log("ERROR al publicar ENTREGA VACIA: ", err);
//         return false;
//     }
// }