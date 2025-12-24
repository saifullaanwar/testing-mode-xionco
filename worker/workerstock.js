import { parentPort, workerData } from 'worker_threads';
import { database, dtbase2 } from '../config/connection.js';
import {savenotif} from './utilities/savenotifikasi.js';
//import { json } from 'stream/consumers';
var bukawal = workerData.bukawal;

if (bukawal == 'awal') {

    var dataadminlist;

    var itemsdata;
    var formstockcalculate;

    let cekitems = `SELECT * FROM databaseallitem`;
    let finisambilitem = database.query(cekitems, (err, results1) => {
        itemsdata = results1;
        let cekextrachargelist = `SELECT * FROM formstockcalculate`;
        let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
            formstockcalculate = results4;
            let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
            let finiscekitems = database.query(cekitems, async (err, results3) => {
                dataadminlist = results3;
                //parentPort.postMessage({ dataadminlist });

                const notification_data = await queryPromise(`SELECT * FROM notification_data ORDER BY no DESC`);
                parentPort.postMessage({ dataadminlist, itemsdata, formstockcalculate, notification_data });
                // Menutup koneksi setelah query selesai
                /* database.end((closeErr) => {
                    if (closeErr) {
                        console.error('Error closing connection:', closeErr);
                    } else {
                        console.log('Database connection closed');
                    }
                }); */


            });
        });

    });

} else if (bukawal == 'saveadddata') {
    console.log(workerData.data);
    let setnewdata = "INSERT INTO formstockcalculate SET ?";
    let newdata = database.query(setnewdata, workerData.data, async (err, datax) => {
        //console.log(datax);
        var creatdat = {
            tgl_upload_mili: workerData.data.tgl_input_mili,
            id_transaksi: workerData.data.item, link: workerData.data.fotoorvideolink
        }
        let setnewdatadelimg = `INSERT INTO deleteimgvid SET ?`;
        let newdatadelimg = database.query(setnewdatadelimg, creatdat, async (err, dataxs) => {

            parentPort.postMessage({ icons: "success", texts: "Add data sukses", titles: "" });
            // Menutup koneksi setelah query selesai
            database.end((closeErr) => {
                if (closeErr) {
                    console.error('Error closing connection:', closeErr);
                } else {
                    console.log('Database connection closed');
                }
            });
        });
    });
} else if (bukawal == 'saveeditreferensi') {

    let setnewdata = `UPDATE databaseallitem SET stockproduk_ref='${workerData.data.stockproduk_ref}', stockproduk_refbuy='${workerData.data.stockproduk_refbuy}' WHERE BINARY product='${workerData.data.product}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {


            if (workerData.data.savetoriwayatornot != 'yes') {
                parentPort.postMessage({ icons: "success", texts: "Edit referensi sukses", titles: "" });
                // Menutup koneksi setelah query selesai
                database.end((closeErr) => {
                    if (closeErr) {
                        console.error('Error closing connection:', closeErr);
                    } else {
                        console.log('Database connection closed');
                    }
                });
            } else {
                let setnewdata1 = "INSERT INTO formstockcalculate SET ?";
                let newdata1 = database.query(setnewdata1, workerData.data.datariwayat, async (err, datax1) => {
                    parentPort.postMessage({ icons: "success", texts: "Edit referensi sukses", titles: "" });
                    // Menutup koneksi setelah query selesai
                    database.end((closeErr) => {
                        if (closeErr) {
                            console.error('Error closing connection:', closeErr);
                        } else {
                            console.log('Database connection closed');
                        }
                    });
                });
            }


        } else {
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi [1]", titles: "" });
            // Menutup koneksi setelah query selesai
            database.end((closeErr) => {
                if (closeErr) {
                    console.error('Error closing connection:', closeErr);
                } else {
                    console.log('Database connection closed');
                }
            });
        }

    });//olnotransaksi

} else if (bukawal == 'riwayatproduk') {

    var dataadminlist;

    var itemsdata;
    var formstockcalculate;

    let cekitems = `SELECT * FROM databaseallitem`;
    let finisambilitem = database.query(cekitems, (err, results1) => {
        itemsdata = results1;
        let cekextrachargelist = `SELECT * FROM formstockcalculate ORDER BY tgl_input_mili DESC`;
        let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
            formstockcalculate = results4;
            let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
            let finiscekitems = database.query(cekitems, (err, results3) => {
                dataadminlist = results3;
                //parentPort.postMessage({ dataadminlist });

                parentPort.postMessage({ dataadminlist, itemsdata, formstockcalculate });
                // Menutup koneksi setelah query selesai
                database.end((closeErr) => {
                    if (closeErr) {
                        console.error('Error closing connection:', closeErr);
                    } else {
                        console.log('Database connection closed');
                    }
                });
            });
        });

    });
} else if (bukawal == 'awal-up') {

    var dataadminlist;

    var itemsdata;
    var stockupholsterydatabase;
    var colorvariantdata;
    var forcestatusrequest;
    var database_invoicevendor;

    let cekitems = `SELECT * FROM databaseallitem ORDER BY product`;
    let finisambilitem = database.query(cekitems, (err, results1) => {
        itemsdata = results1;

        let cekcolorvarian = `SELECT * FROM databasecolorvariant`;
        let finisambilcolorvarian = database.query(cekcolorvarian, (err, results2) => {
            colorvariantdata = results2;

            let cekextrachargelist = `SELECT * FROM stockupholsterydatabase`;
            let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
                stockupholsterydatabase = results4;
                let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
                let finiscekitems = database.query(cekitems, (err, results3) => {
                    dataadminlist = results3;
                    //parentPort.postMessage({ dataadminlist });
                    let cekforcestatusz = `SELECT * FROM forcestatusrequest`;
                    let cekforcestatuszx = database.query(cekforcestatusz, (err, resultstatusz) => {
                        forcestatusrequest = resultstatusz;

                        let cekdatabase_invoicevendor = `SELECT * FROM database_invoicevendor`;
                        let cekfixdatabase_invoicevendor = database.query(cekdatabase_invoicevendor, (err, resultdatabase_invoicevendor) => {
                            database_invoicevendor = resultdatabase_invoicevendor;
                            parentPort.postMessage({ dataadminlist, itemsdata, colorvariantdata, stockupholsterydatabase, forcestatusrequest, database_invoicevendor });
                            // Menutup koneksi setelah query selesai
                            database.end((closeErr) => {
                                if (closeErr) {
                                    console.error('Error closing connection:', closeErr);
                                } else {
                                    console.log('Database connection closed');
                                }
                            });
                        });


                    });

                });
            });
        });



    });

} else if (bukawal == 'awal-addstockup') {

    var dataadminlist;

    var itemsdata;
    var stockupholsterydatabase;
    var colorvariantdata;

    let cekitems = `SELECT * FROM databaseallitem ORDER BY product`;
    let finisambilitem = database.query(cekitems, (err, results1) => {
        itemsdata = results1;

        let cekcolorvarian = `SELECT * FROM databasecolorvariant`;
        let finisambilcolorvarian = database.query(cekcolorvarian, (err, results2) => {
            colorvariantdata = results2;

            let cekextrachargelist = `SELECT * FROM stockupholsterydatabase`;
            let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
                stockupholsterydatabase = results4;
                let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
                let finiscekitems = database.query(cekitems, (err, results3) => {
                    dataadminlist = results3;
                    //parentPort.postMessage({ dataadminlist });

                    const year = new Date().getFullYear();
                    const monthLetter = getMonthLetter() + 'S';
                    // Ambil ID terakhir dari database
                    let xxcc = database.query("SELECT id_stock FROM stockupholsterydatabase WHERE id_stock LIKE ? ORDER BY id_stock DESC LIMIT 1", [`${monthLetter}%-${year}`], (err, resultsc) => {
                        let newNumber = "001";
                        if (resultsc.length > 0) {
                            console.log(resultsc[0].id_stock + 'ini');
                            var fixids = resultsc[0].id_stock;
                            //const lastId = fixids.match(/([A-L])\d(\d{3})[a-z]?-\d{4}/); 
                            const lastId = fixids.match(/^([A-L])[A-Z]*?(\d{3})[a-z]?-\d{4}$/);
                            console.log(lastId + ' ini ')
                            // // Ambil angka dari ID terakhir, abaikan huruf tambahan
                            if (lastId) {
                                const lastNumber = parseInt(lastId[2]);
                                newNumber = String(lastNumber + 1).padStart(3, "0");
                            }

                        }
                        const newId = `${monthLetter}${newNumber}-${year}`;
                        parentPort.postMessage({ dataadminlist, itemsdata, colorvariantdata, stockupholsterydatabase, newId });
                        // Menutup koneksi setelah query selesai
                        database.end((closeErr) => {
                            if (closeErr) {
                                console.error('Error closing connection:', closeErr);
                            } else {
                                console.log('Database connection closed');
                            }
                        });
                    });


                });
            });
        });



    });

} else if (bukawal == 'openaddstockup-dialog') {
    const year = new Date().getFullYear();
    const monthLetter = getMonthLetter() + 'S';

    // Ambil ID terakhir dari database
    let xxcc = database.query("SELECT id_stock FROM stockupholsterydatabase WHERE id_stock LIKE ? ORDER BY id_stock DESC LIMIT 1", [`${monthLetter}%-${year}`], (err, resultsc) => {
        let newNumber = "001";
        if (resultsc.length > 0) {
            var fixids = resultsc[0].id_stock;
            const lastId = fixids.match(/([A-L])(\d{3})[a-z]?-\d{4}/); // Ambil angka dari ID terakhir, abaikan huruf tambahan
            if (lastId) {
                const lastNumber = parseInt(lastId[2]);
                newNumber = String(lastNumber + 1).padStart(3, "0");
            }

        }
        const newId = `${monthLetter}${newNumber}-${year}`;
        parentPort.postMessage({ status: 200, text: 'sukses', newId });
        // Menutup koneksi setelah query selesai
        database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        });
    });
} else if (bukawal == 'cekstockAdditemjual') {
    let cekextrachargelist = `SELECT * FROM stockupholsterydatabase`;
    let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
        if (err) {
            parentPort.postMessage({ status: 404, stockupholsterydatabase: results4 });
        } else {
            //jika ada
            var filterfix = results4.filter(item => {
                return !(item.fixcreatein === 'pembuatanstock' && item.approval_produkjadi !== 'true');
            });
            parentPort.postMessage({ status: 200, stockupholsterydatabase: filterfix });
        }
        // Menutup koneksi setelah query selesai
        database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        });
    });
}
else if (bukawal == 'saveaddstockup') {

    saveaddstockup();

}
else if (bukawal == 'riwayat-up') {

    var stockupholsterydatabase;//

    var dataadminlist;

    var forcestatusrequest;
    var database_invoicevendor;

    let cekitems = `SELECT * FROM stockupholsterydatabase ORDER BY tglinputmili DESC`;
    let finisambilitem = database.query(cekitems, (err, results1) => {
        stockupholsterydatabase = results1;

        let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
        let finiscekitems = database.query(cekitems, (err, results3) => {
            dataadminlist = results3;
            let cekforcestatusz = `SELECT * FROM forcestatusrequest`;
            let cekforcestatuszx = database.query(cekforcestatusz, (err, resultstatusz) => {
                forcestatusrequest = resultstatusz;

                let cekdatabase_invoicevendor = `SELECT * FROM database_invoicevendor`;
                let cekfixdatabase_invoicevendor = database.query(cekdatabase_invoicevendor, (err, resultdatabase_invoicevendor) => {
                    database_invoicevendor = resultdatabase_invoicevendor;

                    parentPort.postMessage({ stockupholsterydatabase, dataadminlist, forcestatusrequest, database_invoicevendor });
                    // Menutup koneksi setelah query selesai
                    database.end((closeErr) => {
                        if (closeErr) {
                            console.error('Error closing connection:', closeErr);
                        } else {
                            console.log('Database connection closed');
                        }
                    });
                });


            });
        });



    });
} else if (bukawal == 'savefinisproduksi') {
    let setnewdata = `UPDATE stockupholsterydatabase SET history='${workerData.data.history}', upholstery_selesaibuatstock='true', upholstery_fotovidbuatstock='${workerData.data.folderfoto}' WHERE BINARY id_stock='${workerData.data.id_stock}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            const dataadminlist = await queryPromise(`SELECT * FROM stockupholsterydatabase WHERE BINARY id_stock="${workerData.data.id_stock}"`);
      
            var data_notif={
                tglinputmili:Date.now(),
                message:`Sudah Selesai Produksi Stock ID : ${workerData.data.id_stock}, ${dataadminlist[0].item} ${dataadminlist[0].colorvariant==''?'':`, ${dataadminlist[0].colorvariant}`}`,
                role:`["admin c10","admin head","supervisor"]`
            };
            var saveits=await savenotif(data_notif);
            data_notif.no=saveits;

            parentPort.postMessage({ icons: "success", texts: "sukses submit", titles: "",data_notif });

        } else {
            parentPort.postMessage({ icons: "error", texts: "error, gagal submit", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        });
    });
} else if (bukawal == 'saveapprovalproduksi') {
    let setnewdata = `UPDATE stockupholsterydatabase SET history='${workerData.data.history}', approval_produkjadi='true', approval_datemili='${workerData.tglinputmili}' WHERE BINARY id_stock='${workerData.data.id_stock}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: "sukses submit", titles: "" });

        } else {
            parentPort.postMessage({ icons: "error", texts: "error, gagal submit", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        });
    });
}
else if (bukawal === "saveusestocks") {
    const { data_up, data_riwayatc5 } = workerData.data;

    try {
        const [oldData] = await queryPromise(
            `SELECT * FROM stockupholsterydatabase WHERE id_stock=?`,
            [data_up.id_stock]
        );

        if (!oldData) {
            parentPort.postMessage({ icons: 'error', texts: 'id_stock tidak tersedia' });
        } else {
            console.log("🧾 QUERY RESULT:", oldData);

            // 🔹 parse history lama
            const oldHistory = JSON.parse(oldData.history || "[]");
            // 🔹 hitung stok baru
            const qtyBaru = Math.max(0, parseInt(oldData.qty) - parseInt(data_up.qty));
            const newHistory = [{ ...data_up, qty_old: oldData.qty }, ...oldHistory];

            const updateParams = [
                qtyBaru,
                oldData.qty,
                JSON.stringify(newHistory),
                data_up.id_stock
            ];

            await queryPromise(
                `UPDATE stockupholsterydatabase SET qty=?, qty_old=?, history=? WHERE id_stock=?`,
                updateParams
            );

            console.log("✅ UPDATE SUCCESS:", updateParams);
            if (data_riwayatc5 && Object.keys(data_riwayatc5).length > 0) {
                try {
                    const insertResult = await queryPromise(
                        `INSERT INTO formstockcalculate SET ?`,
                        data_riwayatc5
                    );
                    console.log("📥 INSERT SUCCESS:", insertResult);

                    parentPort.postMessage({
                        icons: 'success',
                        texts: `Stock ${data_up.id_stock} berhasil diupdate dan data riwayat disimpan`
                    });
                } catch (insertErr) {
                    console.error("⚠️ Gagal insert ke formstockcalculate:", insertErr);
                    parentPort.postMessage({
                        icons: 'warning',
                        texts: `Stock ${data_up.id_stock} terupdate, tapi gagal simpan ke formstockcalculate`
                    });
                }
            }else{
                parentPort.postMessage({
                        icons: 'success',
                        texts: `Stock ${data_up.id_stock} berhasil diupdate dan data riwayat disimpan`
                    });
            }
        }
    } catch (err) {
        console.error("❌ ERROR saveusestocks:", err);
        parentPort.postMessage({
            icons: 'error',
            texts: 'Terjadi kesalahan saat memproses update stock'
        });
    }
}



var counter = 0;
async function saveaddstockup() {
    counter = 0;
    var notif = [];

    workerData.data.forEach(data => {
        let cekusername = `SELECT * FROM stockupholsterydatabase WHERE BINARY id_stock = "${data.id_stock}"`;
        database.query(cekusername, async (err, results) => {
            if (err) {
                console.error('Query error:', err);
                var newnotifs = {
                    id_stock: data.id_stock,
                    item: data.item,
                    colorvariant: data.colorvariant,
                    statussave: 'gagal sistem error'
                };
                notif.push(newnotifs);
                checkDone(notif);
                //return;
            }
            if (results.length > 0) {

                if (data.fixcreatein == 'instocked') {
                    var historiess = results[0].history;
                    var qty_before = results[0].qty_old;
                    saveupdateinstocked(data, notif, results[0].qty, qty_before, historiess);
                } else {
                    var newnotifs = {
                        id_stock: data.id_stock,
                        item: data.item,
                        colorvariant: data.colorvariant,
                        statussave: 'duplikat No Stock'
                    };
                    notif.push(newnotifs);
                    checkDone(notif);
                }

            } else {
                // Belum ada, insert

                let setnewdata = "INSERT INTO stockupholsterydatabase SET ?";
                let newdata = await database.query(setnewdata, data, async (err, datax3) => {
                    if (err) {
                        console.error('Gagal insert:');
                        var newnotifs = {
                            id_stock: data.id_stock,
                            item: data.item,
                            colorvariant: data.colorvariant,
                            statussave: 'gagal sistem error[2]'
                        };
                        notif.push(newnotifs);
                        checkDone(notif);
                    } else {
                        var newnotifs = {
                            id_stock: data.id_stock,
                            item: data.item,
                            colorvariant: data.colorvariant,
                            statussave: 'sukses'
                        };
                        notif.push(newnotifs);
                        checkDone(notif);
                    }

                });

            }
        });
    });

    //parentPort.postMessage({notif});
}


function saveupdateinstocked(data, notif1, qty_now, qty_before, historiess) {
    var notif = notif1;
    var historiesold = JSON.parse(historiess);

    console.log('historiesold');
    console.log(historiesold);

    var hs = JSON.parse(data.history)[0];
    var historiesnew = [hs, ...historiesold];

    console.log('historiesnew');
    console.log(historiesnew);

    let setnewdata = `UPDATE stockupholsterydatabase SET qty='${parseInt(data.qty) + parseInt(qty_now)}',qty_old='${parseInt(qty_before) > parseInt(data.qty) ? parseInt(qty_before) - parseInt(data.qty) : parseInt(data.qty) - parseInt(qty_before)}', history='${JSON.stringify(historiesnew)}', upholstery_selesaibuatstock='true' WHERE BINARY id_stock='${data.id_stock}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            var newnotifs = {
                id_stock: data.id_stock,
                item: data.item,
                colorvariant: data.colorvariant,
                statussave: 'sukses update'
            };
            notif.push(newnotifs);
            checkDone(notif);
        }
    });
}

function checkDone(notif) {
    counter++;
    if (counter === workerData.data.length) {
        parentPort.postMessage({ notif });
        // Menutup koneksi setelah query selesai
        database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        });
    }
}
function getMonthLetter() {
    const letters = "ABCDEFGHIJKL"; // A - Januari, B - Februari, ..., L - Desember
    const monthIndex = new Date().getMonth(); // 0 (Januari) hingga 11 (Desember)
    return letters[monthIndex];
}

function queryPromise(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}