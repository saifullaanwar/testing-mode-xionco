import { parentPort, workerData } from 'worker_threads';
import { database, dtbase2 } from '../config/connection.js';
var bukawal = workerData.bukawal;
const monthLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

if (bukawal == 'awal') {

    // daftar query yang ingin diambil
    const queries = {
        databaseitem_proc: "SELECT * FROM databaseitem_proc",
        datarequestbeli_proc: "SELECT * FROM datarequestbeli_proc",
        databasebank: "SELECT * FROM databasebank",
        database_coa: "SELECT * FROM database_coa",
        database_belibahan: "SELECT * FROM database_belibahan",
        databasevendor_proc: "SELECT * FROM databasevendor_proc",
        proc_pengingat_input: "SELECT * FROM proc_pengingat_input",
        // proc_prasarana_tab: "SELECT * FROM proc_prasarana_tab",
        finance_bankgayahidup_account: "SELECT * FROM finance_bankgayahidup_account",
        proc_dataketentuan: "SELECT * FROM proc_dataketentuan",
        notification_data: `SELECT * FROM notification_data ORDER BY no DESC`,
        proc_temp_kiri_inputplan: "SELECT * FROM proc_temp_kiri_inputplan",
        platformdata: "SELECT * FROM platform",
        finance_banklimbo: "SELECT * FROM finance_banklimbo",
        finance_banklimbo_instore: "SELECT * FROM finance_banklimbo_instore",
        proc_database_pendingpayment: "SELECT * FROM proc_database_pendingpayment",
        notification_data: "SELECT * FROM notification_data",
    };


    // eksekusi semua query sekaligus
    const results = {};
    for (const [key, sql] of Object.entries(queries)) {
        results[key] = await queryPromise(sql);
    }

    // tinggal kirimkan
    ambildatabselainya(results);
} else if (bukawal == 'saveaddreqbeliproc') {
    saveaddreqbeliproc();
} else if (bukawal == 'saveaddbilldue') {
    saveaddbilldue();
} else if (bukawal == 'saveeditbilldue') {
    saveeditbilldue();
} else if (bukawal == 'getidtransaksi') {
    getidtransaksi();
} else if (bukawal == 'approveorreject') {
    approveorreject();
} else if (bukawal == 'saveeditinputproc') {
    saveeditinputproc();
}
else if (bukawal == 'savemproses') {
    savemproses();
}
else if (bukawal == 'editphase') {
    editphase();
}
else if (bukawal == 'editphasenote') {
    editphasenote();
}
else if (bukawal == 'updateprocpengingatinput') {
    updateprocpengingatinput();
}
else if (bukawal == 'updateproctempkiriinputplan') {
    updateproctempkiriinputplan();
}
else if (bukawal == 'updatesettleproctempkiriinputplan') {
    updatesettleproctempkiriinputplan();
}

else if (bukawal == 'savetotalbayar') {
    savetotalbayar();
}
else if (bukawal == 'savenoteproc') {
    savenoteproc();
}
else if (bukawal == 'savevendorproc') {
    savevendorproc();
}
else if (bukawal == 'savezqtyproc') {
    savezqtyproc();
}
else if (bukawal == 'savepaymentatasselek') {
    savepaymentatasselek();
}
else if (bukawal == 'saveeditrightbottom') {
    saveeditrightbottom();
}


else if (bukawal == 'tindakpembelianbahan') {
    tindakpembelianbahan();
} else if (bukawal == 'tindakbatal_pembelianbahan') {
    tindakbatal_pembelianbahan();
} else if (workerData.bukawal == "deleteitem") {
    deleteitem();
}

//ambil database lainnya 
function ambildatabselainya(results) {
    var dataadminlist;
    var itemsdata;
    var databasepesananmasalah;
    var stockupholsterydatabase;
    var forcestatusrequest;
    var formstockcalculate;
    var database_bill_due;

    var database_invoicevendor;
    var database_office;

    let cekitems = `SELECT * FROM databaseallitem ORDER BY product ASC`;
    let finisambilitem = database.query(cekitems, (err, results1) => {
        itemsdata = results1;

        let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
        let finiscekitems = database.query(cekitems, (err, results3) => {
            dataadminlist = results3;

            let cekitemsmasalah = `SELECT * FROM databasepesananmasalah ORDER BY tglinputmili DESC`;
            let finiscekitemsmasalah = database.query(cekitemsmasalah, (err, resultsmasalah) => {
                databasepesananmasalah = resultsmasalah;

                let cekstockup = `SELECT * FROM stockupholsterydatabase`;
                let cekstockupx = database.query(cekstockup, (err, resultsstok) => {
                    stockupholsterydatabase = resultsstok;

                    let cekforcestatusz = `SELECT * FROM forcestatusrequest`;
                    let cekforcestatuszx = database.query(cekforcestatusz, (err, resultstatusz) => {
                        forcestatusrequest = resultstatusz;

                        let cekextrachargelist = `SELECT * FROM formstockcalculate`;
                        let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
                            formstockcalculate = results4;

                            let cekdatabase_invoicevendor = `SELECT * FROM database_invoicevendor`;
                            let cekfixdatabase_invoicevendor = database.query(cekdatabase_invoicevendor, (err, resultdatabase_invoicevendor) => {
                                database_invoicevendor = resultdatabase_invoicevendor;

                                let cekdatabase_bill_due = `SELECT * FROM database_billdue`;
                                let cekfixdatabase_bill_due = database.query(cekdatabase_bill_due, (err, resultdatabase_bill_due) => {
                                    database_bill_due = resultdatabase_bill_due;

                                    let cekdatabase_office = `SELECT * FROM database_office`;
                                    let cekfixdatabase_office = database.query(cekdatabase_office, (err, resultdatabase_office) => {
                                        database_office = resultdatabase_office;

                                        //parentPort.postMessage({ itemsdata, dataadminlist, databasepesananmasalah, stockupholsterydatabase, forcestatusrequest, formstockcalculate, databaseitem_proc, datarequestbeli_proc, databasebank, database_coa, database_belibahan, database_invoicevendor, database_bill_due, database_office, databasevendor_proc, proc_pengingat_input, finance_bankgayahidup_account,proc_prasarana_tab });
                                        parentPort.postMessage({
                                            itemsdata,
                                            dataadminlist,
                                            databasepesananmasalah,
                                            stockupholsterydatabase,
                                            forcestatusrequest,
                                            formstockcalculate,
                                            database_invoicevendor,
                                            database_bill_due,
                                            database_office,
                                            ...results
                                        });

                                        // Menutup koneksi setelah query selesai
                                        closedatabases();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

    });
}

///

//cek dan buat id transaksi
function getidtransaksi() {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed
    const monthCode = monthLetters[month];

    const likePattern = `${monthCode}____-${year}`;

    const query = `
        SELECT id_request 
        FROM datarequestbeli_proc 
        WHERE id_request LIKE ? 
        ORDER BY id_request DESC 
        LIMIT 1
    `;

    database.query(query, [likePattern], (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        let nextNumber = 1;

        if (results.length > 0) {
            const lastId = results[0].id_request;
            const lastNumber = parseInt(lastId.slice(1, 5));
            nextNumber = lastNumber + 1;
        }

        const formattedNumber = String(nextNumber).padStart(4, '0');
        const newId = `${monthCode}${formattedNumber}-${year}`;
        parentPort.postMessage({ id_transaksi: newId });
    });
}

var counter = 0;
async function saveaddreqbeliproc() {
    counter = 0;
    var notif = [];

    // Mapping bulan ke huruf (A = Jan, B = Feb, dst)
    const monthLetters = [
        "A", "B", "C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L"
    ];

    for (const data of workerData.data.additemreqproc) {
        data.history_edit = JSON.stringify(data.history_edit);
        // ✅ Generate id_request jika semua approval true
        if (
            data.approvalorreject.procurement === "true" &&
            data.approvalorreject.finance === "true" &&
            data.approvalorreject.supervisor === "true"
        ) {
            try {
                var now = new Date();
                var year = now.getFullYear();
                const month = now.getMonth(); // 0-indexed
                const monthCode = monthLetters[month];

                const likePattern = `${monthCode}____%-${year}`;

                // Ambil semua ID bulan ini untuk menghitung nomor berikutnya
                const cekID_pattern = await queryPromise(
                    `SELECT id_request FROM datarequestbeli_proc WHERE id_request LIKE ?`,
                    [likePattern]
                );

                // Ambil nomor urutan dari ID yang sudah ada
                const existingNumbers = cekID_pattern.map(row =>
                    parseInt(row.id_request.slice(1, 5))
                );

                // Ambil nomor berikutnya
                const nextNumber = Math.max(...existingNumbers, 0) + 1;

                // Format dengan leading zero
                const newNumber = nextNumber.toString().padStart(4, "0");
                const newIdRequest = `${monthCode}${newNumber}-${year}`;

                data.id_request = newIdRequest;

                console.log("✅ Generated id_request:", newIdRequest);
            } catch (err) {
                console.error("❌ Gagal generate id_request:", err);
                data.id_request = ""; // fallback
            }
        }

        // Simpan ke DB
        let setnewdata = "INSERT INTO datarequestbeli_proc SET ?";
        database.query(setnewdata, data, (err, datax3) => {
            if (err) {
                console.error("Gagal insert:", err);
                notif.push({
                    item: data.item,
                    divisi: data.itemdivisi,
                    statussave: "gagal sistem error [2]",
                });
            } else {
                notif.push({
                    item: data.item,
                    divisi: data.itemdivisi,
                    statussave: "sukses",
                    no: datax3.insertId,
                    id_request: data.id_request || null,
                });
            }

            checkDone(notif, "add");
        });
    }
}

function saveeditinputproc() {
    var data = workerData.data.itemediting;
    //bank='${data.bank}', lokasiterima='${data.lokasiterima}', z_qty='${data.z_qty}', priceunit='${data.priceunit}', totalprice='${data.totalprice}', note_req='${data.note_req}', pendingpayment='${data.pendingpayment}',
    console.log(data);
    let setnewdata = `UPDATE datarequestbeli_proc SET vendor='${data.vendor}', bank='${data.bank}', lokasiterima='${data.lokasiterima}', z_qty='${data.z_qty}', priceunit='${data.priceunit}', totalprice='${data.totalprice}', note_approver='${data.note_approver}', pendingpayment='${data.pendingpayment}', history_edit='${data.history_edit}' WHERE BINARY id_request='${data.id_request}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "" });
        } else {
            parentPort.postMessage({ icons: "error", texts: "Save gagal", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabases();
    });
}

async function savemproses() {
    var data = workerData.data;
    console.log('data===', data);
    const prosesbayar = await queryPromise(`UPDATE datarequestbeli_proc SET tglmili_proses_bayar= ? , proses_bayar= ? , user_proses_bayar= ?, phase_tindak= ?, note_bayar= ?, totalterbayar=?, totalprosesbayar=?, status_tersisa=?,check_bayar=?,old_sisa=?,now_sisa=?  WHERE no= ?`, [data.tglmili_proses_bayar, `${data.proses_bayar}`, data.user_proses_bayar, data.phase_tindak, data.note_bayar, data.totalterbayar, data.totalprosesbayar, data.status_tersisa, data.check_bayar, data.old_sisa, data.now_sisa, data.no]);
    //const prosesbayar = await queryPromise(`SELECT * FROM datarequestbeli_proc WHERE no='27'`);
    // const datauser=await queryPromise(2,`SELECT * FROM dataslogin`);
    console.log('prosesbayar===', prosesbayar);
    if (prosesbayar.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Save proses berhasil' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Save proses gagal' });
    }
}

async function editphase() {
    var data = workerData.data;
    console.log('data===', data);
    for (const element of data) {
        const editphase = await queryPromise(`UPDATE datarequestbeli_proc SET phase_tindak= ?  WHERE no= ?`, [element.phase_tindak, element.no]);

    }


    parentPort.postMessage({ icons: 'success', texts: 'Save editphase berhasil' });
}

async function editphasenote() {
    var data = workerData.data;
    console.log('data===', data);
    for (const element of data) {
        const editphase = await queryPromise(`UPDATE datarequestbeli_proc SET note_bayar= ?  WHERE no= ?`, [element.note_bayar, element.no]);

    }


    parentPort.postMessage({ icons: 'success', texts: 'Save editphase berhasil' });
}

async function updateprocpengingatinput() {
    var data = workerData.data;
    console.log('data===', data);

    const field = data.e; // Get the field name from the data (like 'name1')
    const value = data.no; // Get the value to update (like 'jalu' for the 'name1' field)

    try {
        // Assuming the database table is named `datarequestbeli_proc`
        // Dynamically build the SQL query and parameters
        const query = `UPDATE proc_pengingat_input SET ${field} = ? WHERE no = 1`;
        const params = [value, data.no];

        // Use your database query function here (assuming queryPromise works for your DB)
        const result = await queryPromise(query, params);

        console.log('Update result:', result);

        // Check if any row was affected
        if (result.affectedRows > 0) {
            parentPort.postMessage({ icons: 'success', texts: `Update ${field} berhasil` });
        } else {
            parentPort.postMessage({ icons: 'error', texts: `Update ${field} gagal` });
        }
    } catch (error) {
        console.error('Error updating the record:', error);
        parentPort.postMessage({ icons: 'error', texts: 'Error updating the database' });
    }
}
async function updateproctempkiriinputplan() {
    var data = workerData.data;

    console.log("data=========", data[0]);
    // kalau ada data[0].no → lakukan UPDATE
    if (data[0].no) {
        // 1️⃣ Ambil semua data_bayar dari string JSON
        const allDataBayar = getAllDataBayar(data[0].value);

        // 2️⃣ Update tabel proc_temp_kiri_inputplan (selalu jalan)
        const query = `UPDATE proc_temp_kiri_inputplan SET tglinputmili = ?, value = ? WHERE no = ?`;
        const params = [data[0].tglinputmili, data[0].value, parseInt(data[0].no, 10)];
        const result = await queryPromise(query, params);

        // 3️⃣ Kalau ada data_bayar → update datarequestbeli_proc
        if (Array.isArray(allDataBayar) && allDataBayar.length > 0) {
            for (const bayar of allDataBayar) {

                var status_tersisa = bayar.status_tersisa;
                var now_sisa = bayar.now_sisa;
                if (status_tersisa == 'true' && now_sisa == 0) {
                    status_tersisa = '';
                    bayar.status_tersisa = status_tersisa;
                }

                const query1 = `UPDATE datarequestbeli_proc SET buyer = ?, tglmili_tindakbayar = ?, check_bayar = ?, tindakbayar = ?, status_tersisa = ? WHERE no = ? `;
                const params1 = [
                    bayar.buyer,
                    bayar.tglmili_tindakbayar,
                    bayar.check_bayar,
                    bayar.tindakbayar,
                    status_tersisa,
                    parseInt(bayar.no, 10),
                ];

                const res1 = await queryPromise(query1, params1);
                // console.log(`🟢 Update datarequestbeli_proc no=${bayar.no}`, res1);
            }
        } else {
            console.log("⚠️ Tidak ada data_bayar, lewati update datarequestbeli_proc.");
        }

        // 4️⃣ Kirim hasil akhir
        parentPort.postMessage({
            icons: "success",
            texts: `Update COA selesai untuk record ${data[0].no}`,
        });
    } else {
        // === INSERT jika no tidak ada ===
        const tglDate = new Date(parseInt(data[0].tglinputmili, 10));
        const todayMs = new Date().setHours(0, 0, 0, 0);

        console.log("tglDate.getTime():", tglDate.getTime());
        console.log("todayMs:", todayMs);

        // 🔹 Validasi tanggal input
        if (tglDate.getTime() > todayMs) {
            const insertQuery = `INSERT INTO proc_temp_kiri_inputplan (tglinputmili, value) VALUES (?, ?)`;
            const insertParams = [tglDate.getTime(), data[0].value];
            const insertResult = await queryPromise(insertQuery, insertParams);
            console.log('Insert result:', insertResult);
            if (insertResult.affectedRows > 0) {
                parentPort.postMessage({ icons: 'success', texts: `Insert successful for new record at ${tglDate.toISOString().slice(0, 10)}` });
            } else {
                parentPort.postMessage({ icons: 'error', texts: 'Insert failed' });
            }
        }
    }
}


///////////////////// getAllDataBayar /////////////////////
function getAllDataBayar(jsonString) {
    if (!jsonString) {
        console.warn("⚠️ value kosong");
        return [];
    }

    try {
        const parsed = JSON.parse(jsonString);
        const allDataBayar = parsed
            .filter(p => Array.isArray(p.data_bayar) && p.data_bayar.length > 0)
            .flatMap(p => p.data_bayar);

        console.log(`📦 Total ${allDataBayar.length} item data_bayar ditemukan:`, allDataBayar);
        return allDataBayar;
    } catch (err) {
        console.error("❌ Gagal parse JSON:", err);
        return [];
    }
}
///////////////////// end getAllDataBayar /////////////////////

async function updatesettleproctempkiriinputplan() {
    var data = workerData.data;
    console.log('data===', data.data.no);
    console.log('value===', data.data.value);

    try {
        // kalau ada data[0].no → lakukan UPDATE
        // if (data.data.no) {
        //     const query = `UPDATE proc_temp_kiri_inputplan SET value = ? WHERE no = ?`;
        //     const params = [data.data.value, parseInt(data.data.no, 10)];

        //     const result = await queryPromise(query, params);

        //     console.log('Update result:', result);

        //     if (result.affectedRows > 0) {

        //         parentPort.postMessage({ icons: 'success', texts: `Update successful for record ${data.data.no}` });
        //     } else {
        //         parentPort.postMessage({ icons: 'error', texts: `Update failed for record ${data.data.no}` });
        //     }

        // }


        if (data.data.no) {
            // 1️⃣ Ambil semua data_bayar dari string JSON
            const allDataBayar = getAllDataBayar(data.data.value);
            console.log("📊 Semua data_bayar gabungan:", allDataBayar);

            // 2️⃣ Update tabel proc_temp_kiri_inputplan (selalu jalan)
            const query = `UPDATE proc_temp_kiri_inputplan SET tglinputmili = ?, value = ? WHERE no = ?`;
            const params = [data.data.tglinputmili, data.data.value, parseInt(data.data.no, 10)];
            const result = await queryPromise(query, params);
            console.log("✅ Update proc_temp_kiri_inputplan:", result);

            // 3️⃣ Kalau ada data_bayar → update datarequestbeli_proc
            if (Array.isArray(allDataBayar) && allDataBayar.length > 0) {
                for (const bayar of allDataBayar) {

                    var status_tersisa = bayar.status_tersisa;
                    var now_sisa = bayar.now_sisa;
                    if (status_tersisa == 'true' && now_sisa == 0) {
                        status_tersisa = '';
                        bayar.status_tersisa = status_tersisa;
                    }

                    const query1 = `UPDATE datarequestbeli_proc SET buyer = ?, tglmili_tindakbayar = ?, check_bayar = ?, tindakbayar = ?, status_tersisa = ? WHERE no = ? `;
                    const params1 = [
                        bayar.buyer,
                        bayar.tglmili_tindakbayar,
                        bayar.check_bayar,
                        bayar.tindakbayar,
                        status_tersisa,
                        parseInt(bayar.no, 10),
                    ];

                    const res1 = await queryPromise(query1, params1);
                    console.log(`🟢 Update datarequestbeli_proc no=${bayar.no}`, res1);
                }
            } else {
                console.log("⚠️ Tidak ada data_bayar, lewati update datarequestbeli_proc.");
            }

            // 4️⃣ Kirim hasil akhir
            parentPort.postMessage({
                icons: "success",
                texts: `Update COA selesai untuk record ${data.data.no}`,
            });
        }
    } catch (error) {
        console.error('Error updating the record:', error);
        parentPort.postMessage({ icons: 'error', texts: 'Error updating the database' });
    }
}


// function checkDone(notif) {
//     console.log(counter);
//     counter++;
//     if (counter === workerData.data.additemreqproc.length) {

//         parentPort.postMessage({ notif });
//         // Menutup koneksi setelah query selesai
//         closedatabases();

//     }
// }

function checkDone(notif, tipe) {
    console.log(counter);
    counter++;
    if (counter === workerData.data.alldataadditem.length) {
        var dataaddoredit = "";
        if (tipe == "add") {
            if (workerData.bukawal == "saveaddreqbeliproc") {
                for (let i = 0; i < notif.length; i++) {
                    const element = notif[i];
                    dataaddoredit =
                        dataaddoredit == ""
                            ? `Add Req Beli ${element.item}, `
                            : `${dataaddoredit}${element.item}, `;
                }
            } else if (workerData.bukawal == "saveaddbilldue") {
                for (let i = 0; i < notif.length; i++) {
                    const element = notif[i];
                    dataaddoredit =
                        dataaddoredit == ""
                            ? `Add Bill Dua ${element.item}, `
                            : `${dataaddoredit}${element.item}, `;
                }
            }
        } else {
            //edit
            dataaddoredit = `${workerData.data.oldedititem[0].product}${workerData.data.oldedititem[0].product == notif[0].product
                ? ""
                : ` to ${notif[0].product}`
                }`;
        }
        var data = {
            tglinputmili: new Date().getTime(),
            tipe,
            namalengkap: workerData.data.namalengkap,
            username: workerData.data.username,
            tindakan:
                tipe == "add"
                    ? `add data ${dataaddoredit}`
                    : `edit data ${dataaddoredit}`,
        };
        let setnewdata = "INSERT INTO logedit_database SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
            parentPort.postMessage({ notif });
            // Menutup koneksi setelah query selesai
            /* database.end((closeErr) => {
              if (closeErr) {
                console.error("Error closing connection:", closeErr);
              } else {
                console.log("Database connection closed");
              }
            }); */
        });
    }
}

//approveorreject

var alldataapproved = [];

function checkDone_approved(notif, tipe) {
    console.log(counter);
    counter++;
    if (counter === alldataapproved.length) {
        parentPort.postMessage({ icons: 'success', texts: 'sukses approv item' });
    }
}

async function approveorreject() {
    alldataapproved = [];
    var datafix = workerData.data.datalistrequest;
    //console.log('datafix====',datafix)
    alldataapproved = datafix;
    counter = 0;
    var notif = [];
    console.log("datafix-=====", datafix);

    const cekID_req = await queryPromise(`SELECT * FROM datarequestbeli_proc WHERE id_request ="${alldataapproved[0].id_request}"`);

    var tglmili_approval = Date.now();

    // Cek apakah ada id_request
    if (cekID_req.length > 0) {
        console.log("sudah ada id_request:", cekID_req);
        var now = new Date();
        var year = now.getFullYear();

        const month = now.getMonth(); // 0-indexed
        const monthCode = monthLetters[month];

        const likePattern = `${monthCode}____%-${year}`;

        const cekID_pattern = await queryPromise(`SELECT * FROM datarequestbeli_proc WHERE id_request LIKE ?`, [likePattern]);

        const existingNumbers = cekID_pattern.map(row => parseInt(row.id_request.slice(1, 5)));
        const nextNumber = Math.max(...existingNumbers, 0) + 1;

        const newNumber = nextNumber.toString().padStart(4, "0");
        const newIdRequest = `${monthCode}${newNumber}-${year}`;

        var flagupdate = false;
        for (const element of datafix) {
            const savetodatabase = await queryPromise(`UPDATE datarequestbeli_proc SET id_request = ?, approver = ?, approvalorreject= ?, tglmili_approval=?, estimasi_bayar_mili=?, kodecoa=? WHERE no = ?`, [newIdRequest, element.approver, element.approvalorreject, element.tglmili_approval, element.estimasi_bayar_mili, element.kodecoa, element.no]);

            if (savetodatabase.affectedRows > 0) {
                console.log('updated');
                flagupdate = true;
            } else {
                console.log('gagal updated');
            }
        }


        if (flagupdate == true) {
            parentPort.postMessage({ icons: 'success', texts: 'sukses approve item' });
        } else {
            parentPort.postMessage({ icons: 'error', texts: 'gagal approve item' });
        }

    } else {
        console.log("Tidak ada id_request ditemukan.");
        var flagupdate = false;
        for (const element of datafix) {
            const savetodatabase = await queryPromise(`UPDATE datarequestbeli_proc SET id_request = ?, approver = ?, approvalorreject= ?, tglmili_approval=?,estimasi_bayar_mili=? WHERE no = ?`, [element.id_request, element.approver, element.approvalorreject, element.tglmili_approval, element.estimasi_bayar_mili, element.no]);
            console.log("savetodatabase.affectedRows=====", savetodatabase.affectedRows);

            if (savetodatabase.affectedRows > 0) {
                console.log('updated');
                flagupdate = true;
            } else {
                console.log('gagal updated');
            }
        }

        if (flagupdate == true) {
            parentPort.postMessage({ icons: 'success', texts: 'sukses approve item' });
        } else {
            parentPort.postMessage({ icons: 'error', texts: 'gagal approve item' });
        }
    }


    /* database.query(
           "SELECT * FROM datarequestbeli_proc WHERE id_request = ?",
           [alldatakirim[0].id_request],
           async(err, results) => {
               if (err) {
                   return parentPort.postMessage({
                       icons: "error",
                       status: 500,
                       text: "Error checking id request: " + err.message,
                   });
               } else {

                   if (results.length === 0) {
                       console.log("lolos1");
                       // ID belum ada, update langsung

                       
                       

                       database.query(
                           "UPDATE datarequestbeli_proc SET id_request = ?, approver= ?, note_approver= ?, approvalorreject= ?, tglmili_approval= ?, vendor= ?, z_qty=?, priceunit= ?, totalprice= ?, pendingpayment= ?, bank= ?, lokasiterima= ?, kodecoa= ?, estimasi_bayar_mili= ? WHERE no = ?",
                           [alldatakirim.approvalorreject == 'true' ? alldatakirim.id_request : '', alldatakirim.approver, alldatakirim.note_approver, alldatakirim.approvalorreject, alldatakirim.tglmili_approval, alldatakirim.vendor, alldatakirim.z_qty, alldatakirim.priceunit, alldatakirim.totalprice, alldatakirim.pendingpayment, alldatakirim.bank, alldatakirim.lokasiterima, alldatakirim.kodecoa, alldatakirim.no, alldatakirim.estimasi_bayar_mili],
                           (err2, result) => {
                               if (err2) {
                                   console.error('Gagal insert:', err2);
                                   var newnotifs = {
                                       statussave: "[2] Error updating new id request: " + err2.message,
                                   };
                                   notif.push(newnotifs);
                                   checkDone_approved(notif, "add");
                                   return;
                               } else {
                                   var newnotifs = {
                                       statussave: 'sukses',
                                   };
                                   notif.push(newnotifs);
                                   checkDone_approved(notif, "add");
                               }
                               closedatabases();
                           });
                   } else {
                       const likePattern = `${monthLetters}____-${year}`;
                       database.query(
                           "SELECT id_request FROM datarequestbeli_proc WHERE id_request LIKE ?",
                           [likePattern],
                           (err3, existingRows) => {
                               if (err3) {
                                   return parentPort.postMessage({
                                       icons: "error",
                                       status: 500,
                                       text: "Error fetching similar id request: " + err3.message,
                                   });
                               }

                               const existingNumbers = existingRows.map(row =>
                                   parseInt(row.id_request.slice(1, 5))
                               );
                               const nextNumber = Math.max(...existingNumbers, 0) + 1;
                               const newNumber = nextNumber.toString().padStart(4, "0");
                               const newIdRequest = `${monthLetters}${newNumber}-${year}`;

                               console.log("lolos2");
                               console.log("bisasaa======", alldatakirim);
                               console.log("bisasaa======", alldatakirim.approvalorreject);
                               console.log("bisasaa======", alldatakirim.estimasi_bayar_mili);

                               // Update pakai ID baru
                               database.query(
                                   "UPDATE datarequestbeli_proc SET id_request = ?, approver= ?, note_approver= ?, approvalorreject= ?, tglmili_approval= ?, vendor= ?, z_qty=?, priceunit= ?, totalprice= ?, pendingpayment= ?, bank= ?, lokasiterima= ?, kodecoa= ?, estimasi_bayar_mili= ? WHERE no = ?",
                                   [alldatakirim.approvalorreject == 'true' ? newIdRequest : '', alldatakirim.approver, alldatakirim.note_approver, alldatakirim.approvalorreject, alldatakirim.tglmili_approval, alldatakirim.vendor, alldatakirim.z_qty, alldatakirim.priceunit, alldatakirim.totalprice, alldatakirim.pendingpayment, alldatakirim.bank, alldatakirim.lokasiterima, alldatakirim.kodecoa, alldatakirim.no, alldatakirim.estimasi_bayar_mili],
                                   (err4, result) => {
                                       if (err4) {
                                           console.error('Gagal insert:', err4);
                                           var newnotifs = {
                                               statussave: "[2] Error updating new id request: " + err4.message,
                                           };
                                           notif.push(newnotifs);
                                           checkDone_approved(notif, "add");
                                           return;
                                       } else {
                                           console.log("resultsresults====",results.item);
                                           var newnotifs = {
                                               statussave: "success",
                                           };
                                           notif.push(newnotifs);
                                           checkDone_approved(notif, "add");
                                       }
                                       closedatabases();
                                   });
                           }
                       );

                   }
               }
           })
   datafix.forEach(alldatakirim => {
       const date = new Date(parseInt(alldatakirim.tglmili_approval)); // dari timestamp
       const monthLetter = monthLetters[date.getMonth()]; // 0-indexed
       const year = date.getFullYear();


      
   }); */
    // });
    // const date = new Date(parseInt(alldatakirim.tglmili_approval)); // dari timestamp
    // const monthLetter = monthLetters[date.getMonth()]; // 0-indexed
    // const year = date.getFullYear();

    // // Step 1: Cek apakah id_request sudah ada
    // database.query(
    //     "SELECT * FROM datarequestbeli_proc WHERE id_request = ?",
    //     [alldatakirim.id_request],
    //     (err, results) => {
    //         if (err) {
    //             return parentPort.postMessage({
    //                 icons: "error",
    //                 status: 500,
    //                 text: "Error checking id request: " + err.message,
    //             });
    //         }

    //         if (results.length === 0) {
    //             // ID belum ada, update langsung
    //             database.query(
    //                 "UPDATE datarequestbeli_proc SET id_request = ?, approver= ?, note_approver= ?, approvalorreject= ?, tglmili_approval= ?, vendor= ?, z_qty=?, priceunit= ?, totalprice= ?, pendingpayment= ?, bank= ?, lokasiterima= ?, kodecoa= ? WHERE no = ?",
    //                 [alldatakirim.approvalorreject == 'true' ? alldatakirim.id_request : '', alldatakirim.approver, alldatakirim.note_approver, alldatakirim.approvalorreject, alldatakirim.tglmili_approval, alldatakirim.vendor, alldatakirim.z_qty, alldatakirim.priceunit, alldatakirim.totalprice, alldatakirim.pendingpayment, alldatakirim.bank, alldatakirim.lokasiterima, alldatakirim.kodecoa, alldatakirim.no],
    //                 (err2, result) => {
    //                     if (err2) {
    //                         parentPort.postMessage({
    //                             icons: "error",
    //                             status: 500,
    //                             text: "[1] Error updating id request: " + err2.message,
    //                         });
    //                     } else {
    //                         parentPort.postMessage({
    //                             icons: "sukses",
    //                             status: 200,
    //                             text: alldatakirim.approvalorreject == 'true' ? "Sukses save dengan ID: " + alldatakirim.id_request : 'Sukses Reject',
    //                             id_request: alldatakirim.id_request
    //                         });
    //                     }
    //                     closedatabases();
    //                 });
    //         } else {
    //             // ID sudah ada, generate baru
    //             const likePattern = `${monthLetter}____-${year}`;

    //             database.query(
    //                 "SELECT id_request FROM datarequestbeli_proc WHERE id_request LIKE ?",
    //                 [likePattern],
    //                 (err3, existingRows) => {
    //                     if (err3) {
    //                         return parentPort.postMessage({
    //                             icons: "error",
    //                             status: 500,
    //                             text: "Error fetching similar id request: " + err3.message,
    //                         });
    //                     }

    //                     const existingNumbers = existingRows.map(row =>
    //                         parseInt(row.id_request.slice(1, 5))
    //                     );
    //                     const nextNumber = Math.max(...existingNumbers, 0) + 1;
    //                     const newNumber = nextNumber.toString().padStart(4, "0");
    //                     const newIdRequest = `${monthLetter}${newNumber}-${year}`;

    //                     // Update pakai ID baru
    //                     database.query(
    //                         "UPDATE datarequestbeli_proc SET id_request = ?, approver= ?, note_approver= ?, approvalorreject= ?, tglmili_approval= ?, vendor= ?, z_qty=?, priceunit= ?, totalprice= ?, pendingpayment= ?, bank= ?, lokasiterima= ?, kodecoa= ? WHERE no = ?",
    //                         [alldatakirim.approvalorreject == 'true' ? newIdRequest : '', alldatakirim.approver, alldatakirim.note_approver, alldatakirim.approvalorreject, alldatakirim.tglmili_approval, alldatakirim.vendor, alldatakirim.z_qty, alldatakirim.priceunit, alldatakirim.totalprice, alldatakirim.pendingpayment, alldatakirim.bank, alldatakirim.lokasiterima, alldatakirim.kodecoa, alldatakirim.no],
    //                         (err4, result) => {
    //                             if (err4) {
    //                                 parentPort.postMessage({
    //                                     icons: "error",
    //                                     status: 500,
    //                                     text: "[2] Error updating new id request: " + err4.message,
    //                                 });
    //                             } else {
    //                                 parentPort.postMessage({
    //                                     icons: "sukses",
    //                                     status: 200,
    //                                     text: alldatakirim.approvalorreject == 'true' ? "Sukses save dengan ID baru: " + newIdRequest : 'Sukses Reject',
    //                                     id_request: newIdRequest
    //                                 });
    //                             }
    //                             closedatabases();
    //                         });
    //                 });
    //         }
    //     });
}


async function savenoteproc() {
    var data = workerData.data;
    console.log('savenoteproc====================', data);

    const cekdatawal = await queryPromise(`SELECT * FROM datarequestbeli_proc WHERE no ="${data.no}"`);

    var note_approver = JSON.parse(cekdatawal[0].note_approver);
    note_approver.procurement = data.note_approver;

    const savetodatabase = await queryPromise(`UPDATE datarequestbeli_proc SET note_approver = ? WHERE no = ?`, [JSON.stringify(note_approver), data.no]);

    if (savetodatabase.affectedRows > 0) {
        console.log('updated note proc');
        parentPort.postMessage({ icons: 'success', texts: 'sukses save note proc' });
    } else {
        console.log('gagal updated note proc');
        parentPort.postMessage({ icons: 'error', texts: 'gagal save note proc' });
    }
}

async function savevendorproc() {
    var data = workerData.data;
    console.log('savevendorproc====================', data);

    //const cekdatawal = await queryPromise(`SELECT * FROM datarequestbeli_proc WHERE no ="${data.no}"`);

    const savetodatabase = await queryPromise(`UPDATE datarequestbeli_proc SET vendor = ? WHERE no = ?`, [data.vendor, data.no]);

    if (savetodatabase.affectedRows > 0) {
        console.log('updated note proc');
        parentPort.postMessage({ icons: 'success', texts: 'sukses save vendor' });
    } else {
        console.log('gagal updated note proc');
        parentPort.postMessage({ icons: 'error', texts: 'gagal save vendor' });
    }

}

async function savezqtyproc() {
    var data = workerData.data;
    console.log('savezqtyproc====================', data);

    //ambil qty asli dulu
    const getData = await queryPromise(
        `SELECT qty, priceunit FROM datarequestbeli_proc WHERE no = ?`,
        [data.no]
    );

    // karena hasil SELECT biasanya array, ambil nilai qty dari indeks 0
    const qty = getData.length > 0 ? getData[0].qty : 0;
    const priceunit = getData.length > 0 ? getData[0].priceunit : 0;

    var totalprice = Number(data.z_qty) * Number(priceunit);

    if (Number(data.z_qty) <= 0 || data.z_qty == '') {
        totalprice = Number(qty) * Number(priceunit);
    }

    //const cekdatawal = await queryPromise(`SELECT * FROM datarequestbeli_proc WHERE no ="${data.no}"`);

    const savetodatabase = await queryPromise(`UPDATE datarequestbeli_proc SET z_qty = ?, totalprice = ? WHERE no = ?`, [data.z_qty, totalprice, data.no]);

    if (savetodatabase.affectedRows > 0) {
        console.log('updated note proc');
        parentPort.postMessage({ icons: 'success', texts: 'sukses save z_qty' });
    } else {
        console.log('gagal updated note proc');
        parentPort.postMessage({ icons: 'error', texts: 'gagal save z_qty' });
    }
}

async function savetotalbayar() {
    var data = workerData.data;
    console.log('savetotalbayar====================', data);

    //const cekdatawal = await queryPromise(`SELECT * FROM datarequestbeli_proc WHERE no ="${data.no}"`);

    let success = 0;
    let failed = 0;

    for (const item of data) {
        const res = await queryPromise(
            `UPDATE datarequestbeli_proc SET totalprosesbayar = ? WHERE no = ?`,
            [item.totalprosesbayar, item.no]
        );

        if (res.affectedRows > 0) success++;
        else failed++;
    }

    const total = data.length;
    let icons = 'success';
    if (failed === total) icons = 'error';

    parentPort.postMessage({
        icons,
        texts: `Update selesai. Berhasil: ${success}, Gagal: ${failed}`
    });
}

//savepaymentatasselek
async function savepaymentatasselek() {
    var data = workerData.data;
    console.log('savepaymentatasselek ====================', data);

    //const cekdatawal = await queryPromise(`SELECT * FROM datarequestbeli_proc WHERE no ="${data.no}"`);

    let success = 0;
    let failed = 0;

    for (const item of data) {
        const res = await queryPromise(
            `UPDATE datarequestbeli_proc SET totalterbayar = ?,status_tersisa=?, check_bayar=?, old_sisa=?,now_sisa=? WHERE no = ?`,
            [item.totalterbayar, item.status_tersisa, item.check_bayar, item.old_sisa, item.now_sisa, item.no]
        );

        if (res.affectedRows > 0) success++;
        else failed++;
    }

    const total = data.length;
    let icons = 'success';
    if (failed === total) icons = 'error';

    parentPort.postMessage({
        icons,
        texts: `Update selesai. Berhasil: ${success}, Gagal: ${failed}`
    });
}

//saveeditrightbottom
async function saveeditrightbottom() {
    var data = workerData.data;
    console.log('daya ====', data);
    // 
    console.log('saveeditrightbottom ====================', data);

    const res = await queryPromise(
        `UPDATE datarequestbeli_proc SET note_approver=?,pendingpayment=?,vendor=?, z_qty = ?, totalprice=?,lokasiterima=? WHERE no = ?`,
        [JSON.stringify(data.note_approver), data.pendingpayment, data.vendor, data.z_qty, Number(data.totalprice), data.lokasiterima, data.no]
    );

    if (res.affectedRows > 0) {
        console.log('sukses update');
        parentPort.postMessage({ icons: 'success', texts: 'sukses save edit' });
    } else {
        console.log('gagal save edit');
        parentPort.postMessage({ icons: 'error', texts: 'gagal save edit' });
    }
}


//tindakpembelianbahan
function tindakpembelianbahan() {
    var datakirim = workerData.data.datakirim;
    // Step 1: Cek apakah id_request sudah ada
    datakirim.history = JSON.stringify(datakirim.history);//string json

    database.query(
        "SELECT * FROM database_belibahan WHERE id_transaksi = ?",
        [datakirim.id_transaksi],
        (err, results) => {
            if (err) {
                return parentPort.postMessage({
                    icons: "error",
                    status: 500,
                    text: "Error checking id request: " + err.message,
                });
            }
            if (results.length === 0) {
                //belum ada
                const query = "INSERT INTO database_belibahan SET ?";
                database.query(query, datakirim, (err, results) => {
                    if (err) {
                        parentPort.postMessage({ icons: "error", texts: 'error database', titles: "" });
                    } else {
                        parentPort.postMessage({ icons: "success", texts: "Sukses simpan data", titles: "" });
                    }
                    // Menutup koneksi setelah query selesai
                    closedatabases();
                });
            } else {
                //sudah ada
                //
                if (results[0].purchased == 'true') {
                    parentPort.postMessage({ icons: "sudah tindak sebelumnya", texts: "sudah tindak sebelumnya", titles: "" });
                } else {
                    var oldhistory = JSON.parse(results[0].history);

                    var newhistory = [...JSON.parse(datakirim.history), ...oldhistory];

                    console.log(newhistory);

                    let setnewdata = `UPDATE database_belibahan SET purchased='true', history='${JSON.stringify(newhistory)}' WHERE BINARY id_transaksi='${datakirim.id_transaksi}'`;
                    let newdata = database.query(setnewdata, async (err, datax) => {
                        if (datax.affectedRows == 1) {
                            parentPort.postMessage({ icons: "success", texts: "Sukses simpan data", titles: "" });
                        } else {
                            parentPort.postMessage({ icons: "error", texts: "Submit gagal, coba lagi", titles: "" });
                        }
                        // Menutup koneksi setelah query selesai
                        closedatabases();
                    });
                }
            }
        });
}

//tindakbatal_pembelianbahan
function tindakbatal_pembelianbahan() {
    var datakirim = workerData.data.datakirim;
    console.log(datakirim)
    // Step 1: Cek apakah id_request sudah ada
    //datakirim.history=JSON.stringify(datakirim.history);//string json

    database.query(
        "SELECT * FROM database_belibahan WHERE id_transaksi = ?",
        [datakirim.id_transaksi],
        (err, results) => {
            if (err) {
                return parentPort.postMessage({
                    icons: "error",
                    status: 500,
                    text: "Error checking id request: " + err.message,
                });
            }
            if (results.length === 0) {
                //belum ada
                parentPort.postMessage({ icons: "error", texts: "data tidak ada", titles: "" });
            } else {
                //sudah ada
                var oldhistory = JSON.parse(results[0].history);


                var newhistory = [...datakirim.history, ...oldhistory];

                console.log(newhistory);

                let setnewdata = `UPDATE database_belibahan SET purchased='false', history='${JSON.stringify(newhistory)}' WHERE BINARY id_transaksi='${datakirim.id_transaksi}'`;
                let newdata = database.query(setnewdata, async (err, datax) => {
                    if (datax.affectedRows == 1) {
                        parentPort.postMessage({ icons: "success", texts: "Sukses batal", titles: "" });
                    } else {
                        parentPort.postMessage({ icons: "error", texts: "Submit gagal, coba lagi", titles: "" });
                    }
                    // Menutup koneksi setelah query selesai
                    closedatabases();
                });
            }
        });
}




var counter = 0;
async function saveaddbilldue() {
    counter = 0;
    var notif = [];
    console.log(workerData.data);
    workerData.data.alldataadditem.forEach(data => {
        let setnewdata = "INSERT INTO database_billdue SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
            if (err) {
                console.error('Gagal insert:', err);
                var newnotifs = {
                    item: data.item,
                    statussave: 'gagal sistem error [2]'
                };
                notif.push(newnotifs);
                checkDone(notif, "add");
                //return;
            } else {
                var newnotifs = {
                    item: data.item,
                    statussave: 'sukses',
                };
                notif.push(newnotifs);
                checkDone(notif, "add");
            }
        });
    });
}

async function saveeditbilldue() {
    counter = 0;
    var notif = [];

    workerData.data.alldataadditem.forEach((data) => {
        var oldedititem = workerData.data.oldedititem[0];
        const updateFields = [];
        const updateValues = [];

        for (const key in data) {
            if (data[key] !== undefined) {
                updateFields.push(`${key} = ?`);
                updateValues.push(data[key]);
            }
        }

        // update berdasarkan product
        let updatequery = `UPDATE database_billdue SET ${updateFields.join(
            ", "
        )} WHERE item = ?`;
        updateValues.push(oldedititem.item); //
        database.query(updatequery, updateValues, (err, result) => {
            var newnotifs = {
                item: data.item,
                statussave: "sukses",
            };
            notif.push(newnotifs);
            checkDone(notif, "edit");
        });
    });
}
async function deleteitem() {
    var queries = ``;
    if (workerData.data.tipe == "procurement-bill-due") {
        queries = `DELETE FROM database_billdue WHERE BINARY item = '${workerData.data.item}'`;
    }


    database.query(queries, async (err, results) => {
        if (results.affectedRows > 0) {
            var data = {
                tglinputmili: new Date().getTime(),
                tipe: "delete",
                namalengkap: workerData.data.namalengkap,
                username: workerData.data.username,
                tindakan: `delete ${workerData.data.tipe} ${workerData.data.item}`,
            };
            let setnewdata = "INSERT INTO logedit_database SET ?";
            let newdata = database.query(setnewdata, data, async (err, datax3) => {
                parentPort.postMessage({ icons: "success", status: 200 });
                // Menutup koneksi setelah query selesai
                /* database.end((closeErr) => {
                  if (closeErr) {
                    console.error("Error closing connection:", closeErr);
                  } else {
                    console.log("Database connection closed");
                  }
                }); */
            });
        } else {
            parentPort.postMessage({ icons: "error", status: 500 });
            // Menutup koneksi setelah query selesai
            /* database.end((closeErr) => {
              if (closeErr) {
                console.error("Error closing connection:", closeErr);
              } else {
                console.log("Database connection closed");
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
function closedatabases() {
    /* database.end((closeErr) => {
        if (closeErr) {
            console.error('Error closing connection:', closeErr);
        } else {
            console.log('Database connection closed');
        }
    }); */
}