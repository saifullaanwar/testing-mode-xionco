import admin  from 'firebase-admin';
import {database,dtbase2} from '../../config/connection.js';
import fs from 'fs';
const serviceAccount = JSON.parse(fs.readFileSync('./config/notifhig-firebase-adminsdk-fbsvc-310947ea4c.json', 'utf8'));
// import serviceAccount  from '../../config/notifhig-firebase-adminsdk-fbsvc-310947ea4c.json' with { type: "json" };
//pakai assert untuk node 20+ jangan with krn untuk node 22
/*  
cara pakai

import {savenotif} from './utilities/savenotifikasi.js';

insert kode di bawah pada akhir sebelum worker selesai. setting pada id_transaksi, item, colorvariant dst.
var saveits=await savenotif({
  tglinputmili:Date.now(),
  message:`Transakasi baru ID : ${element.id_transaksi}, ${element.item} ${element.colorvariant==''?'':`, ${element.colorvariant}`}`,
  role:`["admin classy","admin c5","admin head","supervisor"]`
});



*/

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function savenotif(data) {
  
     // Ambil nama kolom dan nilai
    const columns = Object.keys(data); // ['katagori_img', 'katagori', 'urutan']
    const values = Object.values(data); // ['sofa.png', 'sofa', 0]

    // Buat string untuk kolom dan tanda tanya (placeholder)
    const placeholders = columns.map(() => '?').join(', ');
    const columnString = columns.join(', ');

    // Query insert
    const insertnew = await queryPromise(`INSERT INTO notification_data (${columnString}) VALUES (${placeholders})`, values);

    const insertedId = insertnew.insertId; 

    //cek role user
    var rolesuser=JSON.parse(data.role);
    //const usernotif = await queryPromise(`SELECT * FROM dataslogin`);
    // bikin placeholder sesuai jumlah array
    const placeholders2 = rolesuser.map(() => "?").join(",");

    const sql = `SELECT fcm_token FROM dataslogin WHERE LOWER(tipeuser) IN (${placeholders2})
    `;

    const rows= await queryPromise(sql, rolesuser.map(r => r.toLowerCase()));

  console.log('rows===============++++',rows);

  if (rows.length > 0) {
    // ambil token valid
    const tokens = rows.map(r => r.fcm_token).filter(token => token && token.trim() !== "");

    console.log('tokens===+++',tokens);

    if (tokens.length > 0) {
      // fungsi untuk split array jadi batch
      const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
          result.push(arr.slice(i, i + size));
        }
        return result;
      };

      // pecah tokens jadi batch max 500
      const tokenBatches = chunkArray(tokens, 500);

      for (const batch of tokenBatches) {
        const message = {
          notification: {
            title: "Notifikasi baru",
            body: data.message,
            //icon: 'http://localhost:3000/assets/icons/android-chrome-192x192.png',
          } ,
          data: {
            // notification: {
            //   title: "Notifikasi baru",
            //   body: data.message
            // } ,
            role: JSON.stringify(rolesuser) // simpan array sebagai string
          },
          tokens: batch
        };

        try {
          const response = await admin.messaging().sendEachForMulticast(message);
          console.log(`Batch terkirim (${batch.length} token):`, response.successCount, "sukses,", response.failureCount, "gagal");
        } catch (err) {
          console.error("Gagal kirim notifikasi batch:", err);
        }
      }
    } else {
      console.log("Tidak ada fcm_token valid.");
    }
  }else{
    console.log('tidak ada token fcm');
  } 

    return insertedId;
}

function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    database.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

export {savenotif}