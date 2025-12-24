import { parentPort, workerData } from "worker_threads";
import { database, dtbase2 } from "../config/connection.js";

if (workerData.bukaawal == "saveselesai") {
  var data = workerData.data;

  var history = JSON.stringify(data.history);
  var details = JSON.stringify(data.details);

  data.details = details;
  data.history = history;

  const query = "INSERT INTO finance_banklimbo SET ?";
  database.query(query, data, (err, results) => {
    if (err) {
      parentPort.postMessage({ icons: "error", texts: 'error database', titles: "" });
    } else {
      parentPort.postMessage({ icons: "success", texts: "Sukses simpan data", titles: "" });
    }
    // Menutup koneksi setelah query selesai
    closedatabases();
  });
}
// else if (workerData.bukaawal == "multi-saveselesai") {
//   var dataArray = workerData.data;
//   console.log("Data array:", dataArray);

//   let successCount = 0;
//   let errorOccured = false;

//   dataArray.forEach((data, idx) => {
//     // convert details & history ke string JSON
//     const details = JSON.stringify(data.details);
//     const history = JSON.stringify(data.history);

//     data.details = details;
//     data.history = history;

//     const query = "INSERT INTO finance_banklimbo SET ?";
//     database.query(query, data, (err, results) => {
//       if (err) {
//         console.error("❌ Error insert:", err);
//         if (!errorOccured) { // biar kirim error cuma sekali
//           errorOccured = true;
//           parentPort.postMessage({ icons: "error", texts: "error database", titles: "" });
//           closedatabases();
//         }
//       } else {
//         successCount++;
//         if (successCount === dataArray.length && !errorOccured) {
//           parentPort.postMessage({ icons: "success", texts: "Sukses simpan data", titles: "" });
//           closedatabases();
//         }
//       }
//     });
//   });
// }



else if (workerData.bukaawal == 'savetolakinstore') {
  var data = workerData.data;

  var history = JSON.stringify(data.history);
  var details = JSON.stringify(data.details);

  data.details = details;
  data.history = history;

  const query = "INSERT INTO finance_banklimbo_instore SET ?";
  database.query(query, data, (err, results) => {
    if (err) {
      parentPort.postMessage({ icons: "error", texts: 'error database', titles: "" });
    } else {
      parentPort.postMessage({ icons: "success", texts: "Sukses simpan data", titles: "" });
    }
    // Menutup koneksi setelah query selesai
    closedatabases();
  });
} else if (workerData.bukaawal == 'saveselesai-bankinvestor') {
  var data = workerData.data;
  const query = "INSERT INTO finance_bankinvestor_new SET ?";
  database.query(query, data, (err, results) => {
    if (err) {
      parentPort.postMessage({ icons: "error", texts: 'error database', titles: "" });
    } else {
      parentPort.postMessage({ icons: "success", texts: "Sukses simpan data", titles: "" });
    }
    // Menutup koneksi setelah query selesai
    closedatabases();
  });
} else if (workerData.bukaawal == 'getidinvoicevendor') {
  var createID = generateInvoiceId(timestamp);
  parentPort.postMessage({ icons: "success", id_invoice: createID });
  /* let cekroleuser = `SELECT * FROM database_invoicevendor WHERE BINARY id_invoice = "${createID}"`;
  let fixcekroleuser = database.query(cekroleuser, (err, resultsrole) => {
      if (resultsrole.length > 0) {
          //sudah ada
      }else{
          //belum ada
          
      }
  }); */
} else if (workerData.bukaawal == "awal-up") {
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
    let finisambilcolorvarian = database.query(
      cekcolorvarian,
      (err, results2) => {
        colorvariantdata = results2;

        let cekextrachargelist = `SELECT * FROM stockupholsterydatabase`;
        let finisambilextrachargelist = database.query(
          cekextrachargelist,
          (err, results4) => {
            stockupholsterydatabase = results4;
            let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
            let finiscekitems = database.query(cekitems, (err, results3) => {
              dataadminlist = results3;
              //parentPort.postMessage({ dataadminlist });
              let cekforcestatusz = `SELECT * FROM forcestatusrequest`;
              let cekforcestatuszx = database.query(
                cekforcestatusz,
                (err, resultstatusz) => {
                  forcestatusrequest = resultstatusz;
                  let cekdatabase_invoicevendor = `SELECT * FROM database_invoicevendor`;
                  let cekdatabase_invoicevendorx = database.query(
                    cekdatabase_invoicevendor,
                    async (err, resultdatabase_invoicevendor) => {
                      database_invoicevendor = resultdatabase_invoicevendor;
                      const notification_data = await queryPromise(`SELECT * FROM notification_data ORDER BY no DESC`);

                      parentPort.postMessage({
                        dataadminlist,
                        itemsdata,
                        colorvariantdata,
                        stockupholsterydatabase,
                        forcestatusrequest,
                        database_invoicevendor, notification_data
                      });
                      // Menutup koneksi setelah query selesai
                      closedatabases();
                    }
                  );
                }
              );
            });
          }
        );
      }
    );
  });
} else if (workerData.bukaawal == "savesubmitkasbon") {
  var data = workerData.data.result;
  let cekdatainvoisekasbon = `SELECT * FROM database_invoicevendor WHERE BINARY id_invoice = "${data.id_invoice}"`;
  let fixdatainvoisekasbon = database.query(
    cekdatainvoisekasbon,
    (err, resultinvoicekasbon) => {
      if (resultinvoicekasbon.length > 0) {
        //sudah ada
        var datainvoice = resultinvoicekasbon[0];
        var datalist_pengajuan = JSON.parse(datainvoice.list_kasbon);

        console.log(datalist_pengajuan);

        // Mendapatkan ID terakhir dari datalist_pengajuan
        var lastId = 0;
        if (datalist_pengajuan.length > 0) {
          lastId = parseInt(
            datalist_pengajuan[datalist_pengajuan.length - 1].id_req
          );
        }

        var datareq = data.data_req;

        // Menambahkan properti id_request ke datareq
        datareq.id_req = (lastId + 1).toString();

        console.log(datareq);

        // Menambahkan datareq ke datalist_pengajuan
        var list1 = [...datalist_pengajuan, datareq];

        var fixlist_kasbon = JSON.stringify(list1);

        let setnewdata = `UPDATE database_invoicevendor SET list_kasbon='${fixlist_kasbon}' WHERE BINARY id_invoice='${data.id_invoice}'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
          if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: "Sukses submit kasbon", titles: "" });
          } else {
            parentPort.postMessage({ icons: "error", texts: "Submit gagal, coba lagi", titles: "" });
          }
          // Menutup koneksi setelah query selesai
          closedatabases();
        });
      } else {
        //belum ada
        console.log(data);
        var arraylistksabon = [];
        arraylistksabon.push(data.data_req);
        var datakirimfix = {
          tglinputmili: data.data_req.tglinputmili,
          id_invoice: data.id_invoice,
          total_kasbon: 0,
          total_item: 0,
          total_penyesuaian: 0,
          list_kasbon: JSON.stringify(arraylistksabon),
          list_item: '[]',
          settled: '',
          tglinputmili_settled: '',
          setteled_name: '',
          catatan_settled: '',
          bayar: '',
          tglinputmili_bayar: '',
          pembayar_name: '',
          buktibayar: '',
          centang_cek: '[]'
        }
        const query = "INSERT INTO database_invoicevendor SET ?";
        database.query(query, datakirimfix, (err, results) => {
          if (err) {
            parentPort.postMessage({ icons: "error", texts: 'error database', titles: "" });
          } else {
            parentPort.postMessage({ icons: "success", texts: "Sukses submit kasbon", titles: "" });
          }
          // Menutup koneksi setelah query selesai
          closedatabases();
        });
      }
    });
} else if (workerData.bukaawal == 'saveapprovekasbon') {
  var data = workerData.data;

  //console.log(data);

  var dataitemafter = data.data_req;

  //parentPort.postMessage({ icons: "success", texts: "Sukses submit kasbon", titles: "" });

  let cekdatainvoisekasbon = `SELECT * FROM database_invoicevendor WHERE BINARY id_invoice = "${data.id_invoice}"`;
  let fixdatainvoisekasbon = database.query(
    cekdatainvoisekasbon,
    (err, resultinvoicekasbon) => {
      if (resultinvoicekasbon.length > 0) {
        //sudah ada
        var databas = resultinvoicekasbon[0];
        var fixdatareq = JSON.parse(databas.list_kasbon);

        var flag = 0; //0 = belum diapprove, 1 = sudah pernah diapprove

        for (let i = 0; i < fixdatareq.length; i++) {
          const element = fixdatareq[i];
          if (dataitemafter.id_req == element.id_req) {
            var cektrue = dataitemafter.approval == "true" ? "true" : "false";

            if (element.approval != cektrue) {
              fixdatareq[i].approval = dataitemafter.approval == 'true' ? 'true' : 'false';
              fixdatareq[i].tglinputmili_approvalkasbon = data.tglinputmili_approvalkasbon;
              fixdatareq[i].approver = data.approver;
            } else {
              flag = 1;
            }

          }
        }

        console.log(fixdatareq);

        if (flag == 0) {
          let setnewdata = `UPDATE database_invoicevendor SET list_kasbon='${JSON.stringify(fixdatareq)}' WHERE BINARY id_invoice='${data.id_invoice}'`;
          let newdata = database.query(setnewdata, async (err, datax) => {
            if (datax.affectedRows == 1) {
              parentPort.postMessage({ icons: "success", texts: dataitemafter.approval == 'true' ? "Sukses approval kasbon" : 'Sukses reject kasbon', titles: "" });
            } else {
              parentPort.postMessage({ icons: "error", texts: "Submit gagal, coba lagi  [0]", titles: "" });
            }
            // Menutup koneksi setelah query selesai
            closedatabases();
          });
        } else {
          parentPort.postMessage({ icons: "warning", texts: dataitemafter.approval == 'true' ? "Sudah pernah di-approve sebelumnya" : 'Sudah pernah di-reject sebelumnya', titles: "" });
          // Menutup koneksi setelah query selesai
          closedatabases();
        }
        //parentPort.postMessage({ icons: "success", texts: "Sukses submit kasbon", titles: "" });

      } else {
        //belum ada
        parentPort.postMessage({ icons: "error", texts: "Submit gagal, coba lagi [99]", titles: "" });
        closedatabases();
      }
    });

} else if (workerData.bukaawal == 'settledvendorreceipt') {
  var data = workerData.data;
  let cekdatainvoisekasbon = `SELECT * FROM database_invoicevendor WHERE BINARY id_invoice = "${data.id_invoice}"`;
  let fixdatainvoisekasbon = database.query(cekdatainvoisekasbon, (err, resultinvoicekasbon) => {
    if (resultinvoicekasbon.length > 0) {
      //sudah ada
      var datainvoice = resultinvoicekasbon[0];
      //var datalist_pengajuan=JSON.parse(datainvoice.list_item);

      console.log('updateing woi')
      console.log(data)

      if (datainvoice.settled == 'true') {
        parentPort.postMessage({ icons: "error", texts: "Sudah pernah di-settled", titles: "" });
      } else {
        var fixlist_item = JSON.stringify(data.list_item);

        let setnewdata = `UPDATE database_invoicevendor SET total_kasbon=?, total_item=?, total_penyesuaian=?, list_item=?, settled=?, tglinputmili_settled=?, setteled_name=? WHERE BINARY id_invoice=?`;

        let newdata = database.query(setnewdata, [
          data.total_kasbon,
          data.total_item,
          data.total_penyesuaian,
          fixlist_item, // String JSON akan di-escape dengan benar
          'true',
          data.tglinputmili_settled,
          data.namalengkap,
          data.id_invoice
        ], function (error, datax, fields) {
          if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: "Sukses settle", titles: "" });
          } else {
            parentPort.postMessage({ icons: "error", texts: "Settle gagal, coba lagi", titles: "" });
          }
          // Menutup koneksi setelah query selesai
          closedatabases();
        });
      }


    } else {
      //belum ada
      //console.log(data);
      var arraylistitem = [];
      arraylistitem.push(data.list_item);
      var datakirimfix = {
        tglinputmili: data.tglinputmili_settled,
        id_invoice: data.id_invoice,
        total_kasbon: data.total_kasbon,
        total_item: data.total_item,
        total_penyesuaian: data.total_penyesuaian,
        list_kasbon: '[]',
        list_item: JSON.stringify(arraylistitem),
        settled: 'true',
        tglinputmili_settled: data.tglinputmili_settled,
        setteled_name: data.namalengkap,
        catatan_settled: data.catatan_settled,
        bayar: '',
        tglinputmili_bayar: '',
        pembayar_name: '',
        buktibayar: '',
        centang_cek: '[]'
      }
      console.log('datakirimfix');
      console.log(datakirimfix);
      const query = "INSERT INTO database_invoicevendor SET ?";
      database.query(query, datakirimfix, (err, results) => {
        if (err) {
          parentPort.postMessage({ icons: "error", texts: 'error database', titles: "" });
        } else {
          parentPort.postMessage({ icons: "success", texts: "Sukses settle", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabases();
      });
    }
  });
} else if (workerData.bukaawal == 'bayarvendorreceipt') {
  var data = workerData.data;
  let cekdatainvoisekasbon = `SELECT * FROM database_invoicevendor WHERE BINARY id_invoice = "${data.id_invoice}"`;
  let fixdatainvoisekasbon = database.query(cekdatainvoisekasbon, (err, resultinvoicekasbon) => {
    if (resultinvoicekasbon.length > 0) {
      //sudah ada
      var datainvoice = resultinvoicekasbon[0];
      //var datalist_pengajuan=JSON.parse(datainvoice.list_item);

      console.log('updateing woi')
      console.log(data)

      var fixlist_item = JSON.stringify(data.list_item);

      let setnewdata = `UPDATE database_invoicevendor SET bayar='true', tglinputmili_bayar='${data.tglinputmili_bayar}', pembayar_name='${data.pembayar_name}', buktibayar='${data.buktibayar}' WHERE BINARY id_invoice='${data.id_invoice}'`;
      let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
          parentPort.postMessage({ icons: "success", texts: "Sukses bayar", titles: "" });
        } else {
          parentPort.postMessage({ icons: "error", texts: "Settle gagal, coba lagi", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabases();
      });
    } else {
      parentPort.postMessage({ icons: "error", texts: "ID Invoice belum tersettled", titles: "" });
    }
  });
} else if (workerData.bukaawal == 'centangitemvendorreceipt') {
  var data = workerData.data;
  let cekdatainvoisekasbon = `SELECT * FROM database_invoicevendor WHERE BINARY id_invoice = "${data.id_invoice}"`;
  let fixdatainvoisekasbon = database.query(cekdatainvoisekasbon, (err, resultinvoicekasbon) => {
    if (resultinvoicekasbon.length > 0) {
      //sudah ada
      var datainvoice = resultinvoicekasbon[0];
      //var datalist_pengajuan=JSON.parse(datainvoice.list_item);

      console.log('updateing centang_cek')
      console.log(data);

      var centang_cek0 = datainvoice.centang_cek.split(',');
      //hapus jika centang or no
      if (data.checked == 'false') {
        let itemToRemove = data.centang_cek;
        centang_cek0 = centang_cek0.filter(item => item !== itemToRemove);
      } else {
        centang_cek0.push(data.centang_cek);
      }

      var centang_cek = centang_cek0.join(',');
      //datainvoice.centang_cek+','+data.centang_cek;

      console.log('updateing centang_cek [2]')
      console.log(centang_cek);

      let setnewdata = `UPDATE database_invoicevendor SET centang_cek='${centang_cek}' WHERE BINARY id_invoice='${data.id_invoice}'`;
      let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
          parentPort.postMessage({ icons: "success", texts: "Sukses centang", titles: "" });
        } else {
          parentPort.postMessage({ icons: "error", texts: "Settle gagal, coba lagi", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabases();
      });


    } else {
      //belum ada
      //console.log(data);
      var arraylistitem = [];
      arraylistitem.push(data.list_item);
      var datakirimfix = {
        tglinputmili: data.tglinputmili,
        id_invoice: data.id_invoice,
        total_kasbon: 0,
        total_item: 0,
        total_penyesuaian: 0,
        list_kasbon: '[]',
        list_item: '[]',
        settled: '',
        tglinputmili_settled: '',
        setteled_name: '',
        catatan_settled: '',
        bayar: '',
        tglinputmili_bayar: '',
        pembayar_name: '',
        buktibayar: '',
        centang_cek: data.centang_cek
      }
      console.log('datakirimfix');
      console.log(datakirimfix);
      const query = "INSERT INTO database_invoicevendor SET ?";
      database.query(query, datakirimfix, (err, results) => {
        if (err) {
          parentPort.postMessage({ icons: "error", texts: 'error database', titles: "" });
        } else {
          parentPort.postMessage({ icons: "success", texts: "Sukses centang", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabases();
      });
    }
  });
} else if (workerData.bukaawal == 'saveaddnewaccount-gayahidup') {
  var data = workerData.data;

  // Ambil nama kolom dan nilai
  const columns = Object.keys(data); // ['katagori_img', 'katagori', 'urutan']
  const values = Object.values(data); // ['sofa.png', 'sofa', 0]

  // Buat string untuk kolom dan tanda tanya (placeholder)
  const placeholders = columns.map(() => '?').join(', ');
  const columnString = columns.join(', ');

  const rows = await queryPromise(
    `SELECT account FROM finance_bankgayahidup_account WHERE BINARY account = ? LIMIT 1`,
    [data.account]
  );
  if (rows.length === 0) {
    // Kalau belum ada, baru insert
    // Query insert
    const insertnew = await queryPromise(`
    INSERT INTO finance_bankgayahidup_account (${columnString})
    VALUES (${placeholders})
    `, values);
    if (insertnew.affectedRows > 0) {
      parentPort.postMessage({ icons: 'success', texts: 'Add account sukses' });
    } else {
      parentPort.postMessage({ icons: 'error', texts: 'Add account gagal' });
    }
  } else {
    console.log('Account sudah ada, tidak diinsert');
    parentPort.postMessage({ icons: 'error', texts: 'Nama account duplikat, gunakan nama lain' });
  }

} else if (workerData.bukaawal == 'savehiddenaccount-gayahidup') {
  var data = workerData.data;
  const savehiddenaccount = await queryPromise(`UPDATE finance_bankgayahidup_account SET hidden= ? WHERE no = ?`, [data.hidden, data.id]);
  if (savehiddenaccount.affectedRows > 0) {
    parentPort.postMessage({ icons: 'success', texts: 'Hide account sukses' });
  } else {
    parentPort.postMessage({ icons: 'error', texts: 'Hide account gagal' });
  }
}
else if (workerData.bukaawal == 'saveaddnewtransaksi-gayahidup') {
  var data = workerData.data;

  // Ambil nama kolom dan nilai
  const columns = Object.keys(data); // ['katagori_img', 'katagori', 'urutan']
  const values = Object.values(data); // ['sofa.png', 'sofa', 0]

  // Buat string untuk kolom dan tanda tanya (placeholder)
  const placeholders = columns.map(() => '?').join(', ');
  const columnString = columns.join(', ');

  // Query insert
  const insertnew = await queryPromise(`
  INSERT INTO finance_bankgayahidup_transaksi (${columnString})
  VALUES (${placeholders})
  `, values);
  if (insertnew.affectedRows > 0) {
    parentPort.postMessage({ icons: 'success', texts: 'Add transakasi sukses' });
  } else {
    parentPort.postMessage({ icons: 'error', texts: 'Add transakasi gagal' });
  }
}

//generate id invoice vendor up payment
function generateInvoiceId(timestamp) {
  // Langsung buat objek Date dari timestamp (milidetik)
  const date = new Date(timestamp);

  // Validasi tanggal
  if (isNaN(date.getTime())) {
    throw new Error(
      "Timestamp tidak valid. Mohon pastikan ini adalah angka dalam milidetik."
    );
  }

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11 (Januari-Desember)
  //const day = date.getDate();

  // Kode bulan (A-L)
  const monthCodes = "ABCDEFGHIJKLMNOPQRSTUVWXYX"; // A untuk Januari, B untuk Februari, dst.
  const monthCode = monthCodes[month];

  // Hitung pekan dalam bulan
  // Temukan hari Minggu pertama di bulan tersebut
  let firstDayOfMonth = new Date(year, month, 1);
  let firstSundayOfMonth = new Date(firstDayOfMonth);
  firstSundayOfMonth.setDate(1 + ((7 - firstDayOfMonth.getDay()) % 7));

  // Jika tanggal yang diberikan kurang dari hari Minggu pertama di bulan,
  // maka tanggal tersebut berada di pekan terakhir bulan sebelumnya.
  // Dalam kasus ini, harus menghitung pekan dari bulan sebelumnya.
  if (date < firstSundayOfMonth) {
    const prevMonthDate = new Date(year, month, 0); // Hari terakhir bulan sebelumnya
    return generateInvoiceId(prevMonthDate.toISOString().split("T")[0]); // Rekursif
  }

  // Hitung selisih hari antara tanggal yang diberikan dan hari Minggu pertama bulan
  const diffDays = Math.floor(
    (date - firstSundayOfMonth) / (1000 * 60 * 60 * 24)
  );

  // Hitung pekan (setiap 7 hari adalah 1 pekan, dimulai dari pekan 1)
  const weekNumber = Math.floor(diffDays / 7) + 1;

  return `${monthCode}${weekNumber}-${year}`;
}


function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    database.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

//tutup database
function closedatabases() {
  // Menutup koneksi setelah query selesai
  /* database.end((closeErr) => {
    if (closeErr) {
      console.error("Error closing connection:", closeErr);
    } else {
      console.log("Database connection closed");
    }
  }); */
}
