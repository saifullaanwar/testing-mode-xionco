import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';
import {savenotif} from './utilities/savenotifikasi.js';


if (workerData.bukaawal=="ambil") {
    var fixstatus='Proses QC dan Packing';
    //var upholstery_jadi	='true';
    
    let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='${fixstatus}',packde_ambil='true',packde_ambil_img='${workerData.folderfoto}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
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
}else if (workerData.bukaawal=="qc") {
    var fixstatus='Standby Pengiriman';
    
    let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='${fixstatus}',packde_qc='true',packde_qc_img='${workerData.folderfoto}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
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
                 try {
                    const dataadminlist = await queryPromise(`SELECT * FROM admlistdata WHERE BINARY id_transaksi="${workerData.id_transaksi}"`);
                    
                    var data_notif={
                        tglinputmili:Date.now(),
                        message:`Sudah Proses QC dan Packing produk ID : ${workerData.id_transaksi}, ${dataadminlist[0].item} ${dataadminlist[0].colorvariant==''?'':`, ${dataadminlist[0].colorvariant}`}`,
                        role:`["admin classy","admin c10","admin head","pack-de staff","supervisor"]`
                    };
                    var saveits=await savenotif(data_notif);
                    data_notif.no=saveits;

                    parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "", data_notif});
                } catch (error) {
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
}else if (workerData.bukaawal=="kirimbahan") {
    var fixstatus=workerData.fixstatus;//'Proses Produksi';
    
    let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='${fixstatus[0].details.status}',packde_kirimbahan='true',packde_kirimbahan_img='${workerData.folderfoto}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
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
                try {
                    const dataadminlist = await queryPromise(`SELECT * FROM admlistdata WHERE BINARY id_transaksi="${workerData.id_transaksi}"`);
                    
                    var data_notif={
                        tglinputmili:Date.now(),
                        message:`Sudah kirim bahan ke UPD produk ID : ${workerData.id_transaksi}, ${dataadminlist[0].item} ${dataadminlist[0].colorvariant==''?'':`, ${dataadminlist[0].colorvariant}`}`,
                        role:`["admin classy","admin c10","admin head","upholstery","supervisor"]`
                    };
                    
                    var saveits=await savenotif(data_notif);
                    data_notif.no=saveits;

                    parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "",data_notif});
                } catch (error) {
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

    let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='Proses Produksi (Re)',upholstery_jadi='', approval_produkjadi='',reject_ambil_img='${workerData.folderfoto}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
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
}else if (workerData.bukaawal=='savereject-qc') {
    //var fixstatus=workerData.fixstatus;//'Proses Produksi';
    //let escapedHistoryStr = database.escape(workerData.history);

    let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='Proses Produksi (Re)',upholstery_jadi='', approval_produkjadi='', packde_ambil='', reject_qc_img='${workerData.folderfoto}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
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
}

function queryPromise(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
        });
    });
}