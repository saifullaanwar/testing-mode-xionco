import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';
import {savenotif} from './utilities/savenotifikasi.js';

if (workerData.bukawal=='awal') {
    
    if (workerData.id_transaksi!='') {
        let setnewdata = `UPDATE admlistdata SET status='${workerData.data.status}', history='${workerData.data.history}', print_podo='true' WHERE BINARY id_transaksi='${workerData.data.id_transaksi}'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
            if (datax.affectedRows == 1) {

                
                try {
                    const dataadminlist = await queryPromise(`SELECT * FROM admlistdata WHERE BINARY id_transaksi="${workerData.data.id_transaksi}"`);

                    var saveits=await savenotif({
                        tglinputmili:Date.now(),
                        message:`Sudah print PO/DO ID : ${workerData.data.id_transaksi}, ${dataadminlist[0].item} ${dataadminlist[0].colorvariant==''?'':`, ${dataadminlist[0].colorvariant}`}`,
                        role:`["admin classy","admin c10","admin head","supervisor"]`
                    });
                    parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "",data_notif:saveits });
                } catch (error) {
                    parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
                }

                
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
        // Menutup koneksi setelah query selesai
        /* database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        }); */
    }
}else if (workerData.bukawal=='selesaiapprove') {
    if (workerData.id_transaksi!='') {
        let setnewdata = `UPDATE admlistdata SET status='${workerData.data.status}', history='${workerData.data.history}', approval_produkjadi='true' WHERE BINARY id_transaksi='${workerData.data.id_transaksi}'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
            if (datax.affectedRows == 1) {
                try {
                    const dataadminlist = await queryPromise(`SELECT * FROM admlistdata WHERE BINARY id_transaksi="${workerData.data.id_transaksi}"`);
                    console.log('selesaiapprove--------------------------------------');
                    var saveits=await savenotif({
                        tglinputmili:Date.now(),
                        message:`Sudah Selesai Produksi ID : ${workerData.data.id_transaksi}, ${dataadminlist[0].item} ${dataadminlist[0].colorvariant==''?'':`, ${dataadminlist[0].colorvariant}`}`,
                        role:`["admin classy","admin c10","admin head","supervisor"]`
                    });
                    parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "",data_notif:saveits });
                } catch (error) {
                    parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
                }
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
        // Menutup koneksi setelah query selesai
        /* database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        }); */
    }
}

else{

    
    for (let i = 0; i < workerData.data.length; i++) {
        const element = workerData.data[i];
        let setnewdata = `UPDATE admlistdata SET klik_print_podo='true' WHERE BINARY id_transaksi='${element.id_transaksi}'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
            if (datax.affectedRows == 1) {
                if (i+1==workerData.data.length) {
                    parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "" });
                }
                
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
    }
}


function queryPromise(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
        });
    });
}