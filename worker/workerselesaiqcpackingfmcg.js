import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';

if (workerData.id_transaksi!='') {
    let setnewdata = `UPDATE admlistdata SET status='${workerData.data.status}', history='${workerData.data.history}', packde_qc='true', packde_qc_img='${workerData.data.folderfoto}' WHERE BINARY id_transaksi='${workerData.data.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "" });
        }else{
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        /* database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        }); */
    });
}else{
    parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi [99]", titles: "" });
}