import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';
var bukawal=workerData.bukawal;

if (bukawal=='awal') {
    
    try {
        const platformdata = await query(`SELECT * FROM platform`);
        const itemsdata = await query(`SELECT * FROM databaseallitem ORDER BY product ASC`);
        const colorvariantdata = await query(`SELECT * FROM databasecolorvariant`);
        const extrachargelist = await query(`SELECT * FROM extrachargelist`);
        const dataadminlist = await query(`SELECT * FROM admlistdata ORDER BY tglinputmili DESC`);
        const databasepesananmasalah = await query(`SELECT * FROM databasepesananmasalah ORDER BY tglinputmili DESC`);
        const deliveryunitlist = await query(`SELECT * FROM deliveryunitlist ORDER BY thirdparty ASC`);
        const stockupholsterydatabase = await query(`SELECT * FROM stockupholsterydatabase`);
        const forcestatusrequest = await query(`SELECT * FROM forcestatusrequest`);
        const finance_banklimbo = await query(`SELECT * FROM finance_banklimbo`);
        const status_hours = await query(`SELECT * FROM status_hours`);
        const database_investor = await query(`SELECT * FROM database_investor`);
        const database_invoicevendor = await query(`SELECT * FROM database_invoicevendor`);
        const dataslogin = await query(`SELECT * FROM dataslogin`);

        const notification_data=await query(`SELECT * FROM notification_data ORDER BY no DESC`);

        const dataroleuser = dataslogin.map(item => ({
            username: item.username,
            tipeuser: item.tipeuser
        }));

        // Mengirim data ke parentPort setelah semua query selesai
        parentPort.postMessage({
            dataadminlist,
            platformdata,
            itemsdata,
            colorvariantdata,
            extrachargelist,
            databasepesananmasalah,
            deliveryunitlist,
            stockupholsterydatabase,
            forcestatusrequest,
            finance_banklimbo,
            status_hours,
            database_investor,database_invoicevendor,
            dataroleuser,notification_data
        });

    } catch (error) {
        // --- Bagian yang dimodifikasi untuk detail error ---
        let errorMessage = 'Terjadi kesalahan tidak terduga saat mengambil data dari database.';
        
        // Cek apakah error memiliki properti 'sqlMessage' (umumnya dari driver MySQL)
        if (error.sqlMessage) {
            errorMessage = `SQL Error: ${error.sqlMessage}`;
            console.error('SQL Query yang gagal:', error.sql); 
        } else if (error.message) {
            errorMessage = `Kesalahan: ${error.message}`;
        }

        console.error('Error saat mengambil data dari database:', errorMessage);
        
        // parentPort.postMessage({ error: error.message });
    } finally {
        // Menutup koneksi setelah semua query selesai atau terjadi error
        closedatabsase();
    }
}else if (bukawal=='saverejectapproval') {
    saverejectapproval();
}else if (bukawal=='downloadexcel') {
    downloadexcel();
}

function saverejectapproval() {
    let cekusername = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            //ada id transaksinya
            saveupdatereject(results[0]);
        }else{
            //tidak ada id transaksinya
            parentPort.postMessage({ icons: "error", texts: "data tidak ditemukan, coba lagi", titles: "" });
            closedatabsase();
        }
    });
}

function saveupdatereject(array) {

    var historiesold=JSON.parse(array.history);
    var hapusstatusproduksiselesai = historiesold.filter(item => item.tindakan !== "Produksi Selesai");



    
    console.log('hapusstatusproduksiselesai=====')
    console.log(hapusstatusproduksiselesai)

    var date=new Date();
    var tglinputmili=date.getTime();
    const pad = (n) => n.toString().padStart(2, '0');
    var fixtanggal=`${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`

    var newhistorycreate={
        "id_transaksi":workerData.data.id_transaksi,
        "tgl":fixtanggal,
        "user":workerData.data.namalengkap,
        "username":workerData.data.username,
        "tindakan":"Reject approval produk",
        "details":{
            tglinputmili,
            "status":"Produk jadi di-reject",
            "ketstatus":`Produk jadi di-reject oleh ${workerData.data.namalengkap} ID: ${workerData.data.username}.`
        }
    }

    var fixhistorynew=[newhistorycreate,...hapusstatusproduksiselesai];

    console.log('fixhistorynew=====')
    console.log(fixhistorynew)


    let setnewdata = `UPDATE admlistdata SET status='Proses Produksi', upholstery_jadi='',history='${JSON.stringify(fixhistorynew)}' WHERE BINARY id_transaksi='${workerData.data.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: "Reject produk sukses", titles: "" });
        }else{
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
        }
        closedatabsase();
    });
}

async function downloadexcel() {
    try {
        const dataadminlist = await query(`SELECT * FROM admlistdata WHERE orderdate_mili BETWEEN ${workerData.data.startMillis} AND ${workerData.data.endMillis} `);
        // Mengirim data ke parentPort setelah semua query selesai
        parentPort.postMessage({icons:'success',text:'sukses ambil data',dataadminlist});
    } catch (error) {
        parentPort.postMessage({icons:'error',text:error});
    }finally {
        // Menutup koneksi setelah semua query selesai atau terjadi error
        closedatabsase();
    }
}


// Helper query promisified
function query(sql, values = []) {
    return new Promise((resolve, reject) => {
        database.query(sql, values, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function closedatabsase() {
    // Menutup koneksi setelah query selesai
    /* database.end((closeErr) => {
        if (closeErr) {
            console.error('Error closing connection:', closeErr);
        } else {
            console.log('Database connection closed');
        }
    }); */
}