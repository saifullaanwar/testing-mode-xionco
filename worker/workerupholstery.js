// import { parentPort, workerData } from 'worker_threads';
// import {database,dtbase2} from '../config/connection.js';


// let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}', status='Selesai Produksi',upholstery_jadi='true', upholstery_img='${workerData.filenamesupload}' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
// let newdata = database.query(setnewdata, async (err, datax) => {
//     if (datax.affectedRows == 1) {
//         const d = new Date();
//         let time = d.getTime();
//         var tgl_upload_mili=time;
//         var creatdat={
//             tgl_upload_mili,id_transaksi:workerData.id_transaksi,link:workerData.filenamesupload
//         }
//         let setnewdatadelimg = `INSERT INTO deleteimgvid SET ?`;
//         let newdatadelimg = database.query(setnewdatadelimg, creatdat, async (err, dataxs)  => {
//             parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "" });
//             // Menutup koneksi setelah query selesai
//             /* database.end((closeErr) => {
//                 if (closeErr) {
//                     console.error('Error closing connection:', closeErr);
//                 } else {
//                     console.log('Database connection closed');
//                 }
//             }); */
//         });
      
//     }else{
//         parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
//         // Menutup koneksi setelah query selesai
//         /* database.end((closeErr) => {
//             if (closeErr) {
//                 console.error('Error closing connection:', closeErr);
//             } else {
//                 console.log('Database connection closed');
//             }
//         }); */
//     }
    
// });

import { parentPort, workerData } from 'worker_threads';
import { database, dtbase2 } from '../config/connection.js';
import {savenotif} from './utilities/savenotifikasi.js';

simpanData();

async function simpanData() {
  try {
    // UPDATE data
    let setnewdata = `
      UPDATE admlistdata 
      SET id_transaksi = ?, 
          history = ?, 
          status = 'Selesai Produksi',
          upholstery_jadi = 'true', 
          upholstery_img = ? 
      WHERE BINARY id_transaksi = ?
    `;

    const updateRes = await queryPromise(setnewdata, [
      workerData.id_transaksi,
      workerData.history,
      workerData.filenamesupload,
      workerData.id_transaksi
    ]);

    if (updateRes.affectedRows === 1) {
      // buat data untuk INSERT
      const d = new Date();
      const tgl_upload_mili = d.getTime();
      const creatdat = {
        tgl_upload_mili,
        id_transaksi: workerData.id_transaksi,
        link: workerData.filenamesupload
      };

      // INSERT ke deleteimgvid
      let setnewdatadelimg = `INSERT INTO deleteimgvid SET ?`;
      await queryPromise(setnewdatadelimg, creatdat);

      const dataadminlist = await queryPromise(`SELECT * FROM admlistdata WHERE BINARY id_transaksi="${workerData.id_transaksi}"`);
      
      var data_notif={
          tglinputmili:Date.now(),
          message:`Sudah Selesai Produksi produk ID : ${workerData.id_transaksi}, ${dataadminlist[0].item} ${dataadminlist[0].colorvariant==''?'':`, ${dataadminlist[0].colorvariant}`}`,
          role:`["admin classy","admin c10","admin head","pack-de staff","supervisor"]`
      };
      var saveits=await savenotif(data_notif);
      data_notif.no=saveits;

      parentPort.postMessage({
        icons: "success",
        texts: "Save sukses",
        titles: "",
         data_notif
      });
    } else {
      parentPort.postMessage({
        icons: "error",
        texts: "Sistem lagi error, coba lagi",
        titles: ""
      });
    }

    // kalau koneksi sekali pakai:
    // database.end();
  } catch (err) {
    console.error("Error simpan data:", err);
    parentPort.postMessage({
      icons: "error",
      texts: "Terjadi error sistem",
      titles: ""
    });
  }
}

// queryPromise helper
function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    database.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}
