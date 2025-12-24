// import { parentPort, workerData } from 'worker_threads';
// import {database,dtbase2} from '../config/connection.js';


// let cekroleuser = `SELECT * FROM datasuserrole`;
// let fixcekroleuser = database.query(cekroleuser, (err, resultsrole) => {
//     parentPort.postMessage({ dataroleuser:resultsrole});
//     // Menutup koneksi setelah query selesai
//     /* database.end((closeErr) => {
//         if (closeErr) {
//             console.error('Error closing connection:', closeErr);
//         } else {
//             console.log('Database connection closed');
//         }
//     }); */
// });

import { parentPort, workerData } from 'worker_threads';
import { database, dtbase2 } from '../config/connection.js';

// ambil data langsung ketika worker jalan
ambilRoleUser();

async function ambilRoleUser() {
  try {
    let resultsrole = await queryPromise(`SELECT * FROM datasuserrole`);

    parentPort.postMessage({
      dataroleuser: resultsrole
    });

    // kalau memang koneksi sekali pakai:
    // database.end();
  } catch (err) {
    console.error("Error ambil role user:", err);
    parentPort.postMessage({ error: err.message });
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
