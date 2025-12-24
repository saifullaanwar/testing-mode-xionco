import { parentPort, workerData } from 'worker_threads';
import { database, dtbase2 } from '../config/connection.js';


var data=workerData.data;


const data_promo_link = await queryPromise(`UPDATE dataslogin SET fcm_token = ? WHERE BINARY username = ?`, [data.fcm_token,data.username]);

if (data_promo_link.affectedRows > 0) {
    parentPort.postMessage({ icons: 'success', texts: 'sukses save' });
} else {
    parentPort.postMessage({ icons: 'error', texts: 'gagal save' });
}














function queryPromise(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
        });
    });
}