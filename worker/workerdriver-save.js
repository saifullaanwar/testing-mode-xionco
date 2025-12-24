import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';
import {savenotif} from './utilities/savenotifikasi.js';

if (workerData.bukaawal=="ambil") {
    var fixstatus=workerData.fixstatus;//'Proses Produksi';
    
    let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='${fixstatus[0].details.status}',pickup_driver='true',pickup_driver_img='${workerData.folderfoto}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            const d = new Date();
            let time = d.getTime();
            var tgl_upload_mili=time;
            var creatdat={
                tgl_upload_mili,id_transaksi:workerData.id_transaksi,link:workerData.folderfoto
            }
            let setnewdatadelimg = `INSERT INTO deleteimgvid SET ?`;
            let newdatadelimg = database.query(setnewdatadelimg, creatdat, async (err, dataxs)  => {
                
                const dataadminlist = await queryPromise(`SELECT * FROM admlistdata WHERE BINARY id_transaksi="${workerData.id_transaksi}"`);
                    
                var data_notif={
                    tglinputmili:Date.now(),
                    message:`Produk dalam perjalanan ID : ${workerData.id_transaksi}, ${dataadminlist[0].item} ${dataadminlist[0].colorvariant==''?'':`, ${dataadminlist[0].colorvariant}`}`,
                    role:`["admin head","admin c10","supervisor"]`
                };
                var saveits=await savenotif(data_notif);
                data_notif.no=saveits;

                parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "",data_notif });//data_notif
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
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
            // Menutup koneksi setelah query selesai
            /* database.end((closeErr) => {
                if (closeErr) {
                    console.error('Error closing connection:', closeErr);
                } else {
                    console.log('Database connection closed');
                }
            }); */
        }
        
        
    });
}else if (workerData.bukaawal=="terimakonsumen") {
    var fixstatus=workerData.fixstatus;//'Proses Produksi';
    
    let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='${fixstatus[0].details.status}',diterima_konsumen='true',diterima_konsumen_img='${workerData.folderfoto}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            const d = new Date();
            let time = d.getTime();
            var tgl_upload_mili=time;
            var creatdat={
                tgl_upload_mili,id_transaksi:workerData.id_transaksi,link:workerData.folderfoto
            }
            let setnewdatadelimg = `INSERT INTO deleteimgvid SET ?`;
            let newdatadelimg = database.query(setnewdatadelimg, creatdat, async (err, dataxs)  => {

                const dataadminlist = await queryPromise(`SELECT * FROM admlistdata WHERE BINARY id_transaksi="${workerData.id_transaksi}"`);
                    
                var data_notif={
                    tglinputmili:Date.now(),
                    message:`Produk telah diterima konsumen ID : ${workerData.id_transaksi}, ${dataadminlist[0].item} ${dataadminlist[0].colorvariant==''?'':`, ${dataadminlist[0].colorvariant}`}`,
                    role:`["admin head","admin c10","supervisor"]`
                };
                var saveits=await savenotif(data_notif);
                data_notif.no=saveits;

                parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "",data_notif });
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
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
            // Menutup koneksi setelah query selesai
            /* database.end((closeErr) => {
                if (closeErr) {
                    console.error('Error closing connection:', closeErr);
                } else {
                    console.log('Database connection closed');
                }
            }); */
        }
        
    });
}else if (workerData.bukaawal=='savereject-ambil') {
    //var fixstatus=workerData.fixstatus;//'Proses Produksi';
    //let escapedHistoryStr = database.escape(workerData.history);

    let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='Proses Produksi (Re)',upholstery_jadi='', approval_produkjadi='', packde_ambil='', packde_qc='',reject_ambil_img='${workerData.folderfoto}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        console.log('datax======================');
        console.log(workerData);
        if (datax.affectedRows == 1) {
            const d = new Date();
            let time = d.getTime();
            var tgl_upload_mili=time;
            var creatdat={
                tgl_upload_mili,id_transaksi:workerData.id_transaksi,link:workerData.folderfoto
            }
            let setnewdatadelimg = `INSERT INTO deleteimgvid SET ?`;
            let newdatadelimg = database.query(setnewdatadelimg, creatdat, async (err, dataxs)  => {
                parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "" });
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
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
        }
        
    });
}else if (workerData.bukaawal=='savereject-konsumen') {
    //var fixstatus=workerData.fixstatus;//'Proses Produksi';
    //let escapedHistoryStr = database.escape(workerData.history);

    let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='Proses Produksi (Re)',upholstery_jadi='', approval_produkjadi='', packde_ambil='', packde_qc='', pickup_driver='',reject_ambil_img='${workerData.folderfoto}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        console.log('datax======================');
        console.log(workerData);
        if (datax.affectedRows == 1) {
            const d = new Date();
            let time = d.getTime();
            var tgl_upload_mili=time;
            var creatdat={
                tgl_upload_mili,id_transaksi:workerData.id_transaksi,link:workerData.folderfoto
            }
            let setnewdatadelimg = `INSERT INTO deleteimgvid SET ?`;
            let newdatadelimg = database.query(setnewdatadelimg, creatdat, async (err, dataxs)  => {
                parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "" });
            });
        }else{
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
        }
        
    });
}






function queryPromise(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
        });
    });
}