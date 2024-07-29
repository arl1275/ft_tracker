import axios from "axios";
import { bk_dir } from "../../conf/configuration.file";

export function UpdateRegisters(facturas_, declaraciones_, case_, tipo) {
    const BloqF = `${bk_dir}/facturas/admin/blockFacturas`;
    const UnBloqF = `${bk_dir}/facturas/admin/unblockFacturas`;
    const FinalizarFactura = `${bk_dir}/facturas/Admin/finalizarfactura`;
    const BloqD = `${bk_dir}/decEnv/admin/blockDec`;
    const UnBloqD = `${bk_dir}/decEnv/admin/unblockDecs`;

    let arrayToSet = [];
    if (tipo === 1) {
        if (!validatorArray(facturas_)) return;
        arrayToSet = Arrayder(facturas_, 1);
    } else {
        if (!validatorArray(declaraciones_)) return;
        arrayToSet = Arrayder(declaraciones_, 0);
    }

    if (arrayToSet.length === 0) return;

    switch (case_) {
        case 1: // Finalize Facturas
            Worker(arrayToSet, FinalizarFactura);
            break;
        case 2: // Block Facturas
            Worker(arrayToSet, BloqF);
            break;
        case 3: // Unblock Facturas
            Worker(arrayToSet, UnBloqF);
            break;
        case 4: // Block Declaraciones
            Worker(arrayToSet, BloqD);
            break;
        case 5: // Unblock Declaraciones
            Worker(arrayToSet, UnBloqD);
            break;
        default:
            console.log('ERROR al seleccionar una acción');
    }
}

const ShowMensaje = (message) => {
    alert(`OPERACION: ${message}`);
};

function validatorArray(arrayToCheck) {
    return Array.isArray(arrayToCheck);
}

function Arrayder(arrayBrute, type) {
    let newArray = [];
    if (type === 1) { // type 1 means array of objects
        arrayBrute.forEach((item) => newArray.push({ id: parseInt(item.id) }));
    } else {
        arrayBrute.forEach((item) => newArray.push({ id: parseInt(item) }));
    }
    return newArray.length > 0 ? newArray : [];
}

async function Worker(array, url) {
    try {
        const response = await axios.post(url, { data: array });
        ShowMensaje(response.data.message);
        console.log('Registros actualizados exitosamente');
    } catch (error) {
        console.log('Error al actualizar registros: ', error);
        if (error.response && error.response.data && error.response.data.message) {
            ShowMensaje(error.response.data.message);
        } else {
            ShowMensaje('Error al actualizar registros');
        }
    }
}
