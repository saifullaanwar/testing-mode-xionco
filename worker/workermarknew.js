import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';

var bukawal=workerData.bukawal;
if (bukawal=='marknew') {
    marknew(workerData.data);
}


function marknew(data) {
    let cekusername = `SELECT * FROM dataslogin WHERE BINARY username = "${data.username}"`;

    console.log(data);

    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length <= 0) {
            parentPort.postMessage({ icons: "error", texts: "Username belum ada mark gagal", titles: "Oops ..." });
            // Menutup koneksi setelah query selesai
            tutupdatabas();
        }else{
            let sql = "UPDATE dataslogin SET clicked_new='" + JSON.stringify(data.clicked_new) +"' WHERE BINARY username='" + data.username + "'";
            let query = database.query(sql, (err, results) => {
                if (results.affectedRows == 1) {
                    parentPort.postMessage({ icons: "success", texts: "saved mark new", titles: "Oops ..." });
                }else{
                    parentPort.postMessage({ icons: "error", texts: "gagal simpan mark new", titles: "Oops ..." });
                }
                // Menutup koneksi setelah query selesai
                tutupdatabas();
            });
        }
    });
}



function tutupdatabas() {
    // Menutup koneksi setelah query selesai
    /* database.end((closeErr) => {
        if (closeErr) {
            console.error('Error closing connection:', closeErr);
        } else {
            console.log('Database connection closed');
        }
    }); */
}