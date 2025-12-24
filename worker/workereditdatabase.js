import { parentPort, workerData } from "worker_threads";
import { database, dtbase2 } from "../config/connection.js";

//console.log(workerData.data.id_transaksi);

if (workerData.bukawal == "saveadditem") {
  saveadd();
} else if (workerData.bukawal == "saveedititem") {
  saveedit();
} else if (workerData.bukawal == "saveaddplatform") {
  saveaddplatform();
} else if (workerData.bukawal == "saveaddcolorvariant") {
  saveaddcolorvariant();
} else if (workerData.bukawal == "saveaddprocurement") {
  saveaddprocurement();
} else if (workerData.bukawal == "saveeditprocurement") {
  saveeditprocurement();
} else if (workerData.bukawal == "saveaddoffice") {
  saveaddoffice();
} else if (workerData.bukawal == "saveeditoffice") {
  saveeditoffice();
} else if (workerData.bukawal == "saveaddvendor") {
  saveaddvendor();
} else if (workerData.bukawal == "saveeditvendor") {
  saveeditvendor();
} else if (workerData.bukawal == "saveaddcoa") {
  saveaddcoa();
} else if (workerData.bukawal == "saveeditcoa") {
  saveeditcoa();
} else if (workerData.bukawal == "saveaddpendingpayment") {
  saveaddpendingpayment();
} else if (workerData.bukawal == "saveeditpendingpayment") {
  saveeditpendingpayment();
} else if (workerData.bukawal == "saveaddinvestor") {
  saveaddinvestor();
} else if (workerData.bukawal == "saveadddeliveryunit") {
  saveadddeliveryunit();
} else if (workerData.bukawal == "deleteitem") {
  deleteitem();
} else if (workerData.bukawal == 'saveaddnewproduks') {
  saveaddnewproduks();
} else if (workerData.bukawal == 'apieditdatabase') {
  apieditdatabase();
} else if (workerData.bukawal == 'saveaddhargaplatform') {
  saveaddhargaplatform();
} else if (workerData.bukawal == 'getdatabases') {
  getdatabases();//manggil data
} else if (workerData.bukawal == 'saveaddprodukweb') {
  saveaddprodukweb();
} else if (workerData.bukawal == 'getdeliveryunitlist') { // Tambahkan ini
  getdeliveryunitlist();
} else if (workerData.bukawal == 'deletedeliveryunit') { // Tambahkan ini
  deletedeliveryunit();
}

//delivery unit section
async function getdeliveryunitlist() {
  try {
    // Sesuaikan nama tabel: databaseallitem_deliveryunit
    const deliveryunitdata = await queryPromise(`SELECT * FROM databaseallitem_deliveryunit ORDER BY no DESC`);
    parentPort.postMessage(deliveryunitdata);
  } catch (error) {
    parentPort.postMessage({ status: "error", message: error.message });
  }
}

async function saveadddeliveryunit() {
  counter = 0; // Menggunakan variabel global counter yang sudah ada di file Anda
  var notif = [];
  
  // Ambil data dari alldataadditem sesuai struktur frontend Anda
  const items = workerData.data.alldataadditem;

  items.forEach((data) => {
    // Gunakan parameterized query (?) untuk keamanan
    let cekduplikat = `SELECT * FROM databaseallitem_deliveryunit WHERE BINARY deliveryunit = ?`;
    
    database.query(cekduplikat, [data.deliveryunit], async (err, results) => {
      if (err) {
        notif.push({ deliveryunit: data.deliveryunit, statussave: "error sistem" });
        checkDone(notif, "add");
      } else if (results.length > 0) {
        notif.push({ deliveryunit: data.deliveryunit, statussave: "duplikat data" });
        checkDone(notif, "add");
      } else {
        let sql = "INSERT INTO databaseallitem_deliveryunit SET ?";
        database.query(sql, data, (err, result) => {
          if (err) {
            notif.push({ deliveryunit: data.deliveryunit, statussave: "gagal simpan" });
          } else {
            notif.push({ deliveryunit: data.deliveryunit, statussave: "sukses" });
          }
          checkDone(notif, "add");
        });
      }
    });
  });
}

async function deletedeliveryunit() {
  try {
    // workerData.data dikirim dari router (berisi ID atau nama unit)
    const id = workerData.data.no; 
    let sql = `DELETE FROM databaseallitem_deliveryunit WHERE no = ?`;
    
    database.query(sql, [id], (err, result) => {
      if (err) {
        parentPort.postMessage({ status: "error", message: "Gagal menghapus" });
      } else {
        parentPort.postMessage({ status: "sukses", message: "Data berhasil dihapus" });
      }
    });
  } catch (error) {
    parentPort.postMessage({ status: "error", message: error.message });
  }
}

//////////////////////// getdatabases
async function getdatabases() {
  const itemsdata = await queryPromise(`SELECT * FROM databaseallitem ORDER BY product ASC`);
  const colorvariantdata = await queryPromise(`SELECT * FROM databasecolorvariant`);
  const databaseallitem_katagori = await queryPromise(`SELECT * FROM databaseallitem_katagori`);

  const notification_data = await queryPromise(`SELECT * FROM notification_data ORDER BY no DESC`);

  parentPort.postMessage({ itemsdata, colorvariantdata, databaseallitem_katagori, notification_data });

}
///////////// getdatabases
var counter = 0;
async function saveadd() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    let cekusername = `SELECT * FROM databaseallitem WHERE BINARY product = "${data.product}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          product: data.product,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
        //return;
      }
      if (results.length > 0) {
        var newnotifs = {
          product: data.product,
          statussave: "duplikat product",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      } else {
        //belum ada
        let setnewdata = "INSERT INTO databaseallitem SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
          if (err) {
            console.error("Gagal insert:", err);
            var newnotifs = {
              product: data.product,
              statussave: "gagal sistem error [2]",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
            //return;
          } else {
            var newnotifs = {
              product: data.product,
              statussave: "sukses",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
          }
        });
      }
    });
  });
}

async function saveedit() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    var oldedititem = workerData.data.oldedititem[0];

    let cekusername = `SELECT * FROM databaseallitem WHERE BINARY product = "${oldedititem.product}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          product: data.product,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
        //return;
      }
      if (results.length > 0) {
        const updateFields = [];
        const updateValues = [];

        for (const key in data) {
          if (data[key] !== undefined) {
            updateFields.push(`${key} = ?`);
            updateValues.push(data[key]);
          }
        }

        // update berdasarkan product
        let updatequery = `UPDATE databaseallitem SET ${updateFields.join(
          ", "
        )} WHERE product = ?`;
        updateValues.push(oldedititem.product); //
        database.query(updatequery, updateValues, (err, result) => {
          var newnotifs = {
            product: data.product,
            statussave: "sukses",
          };
          notif.push(newnotifs);
          checkDone(notif, "edit");
        });
      } else {
        //produk belum ada
        var newnotifs = {
          product: data.product,
          statussave: "error, product belum ada",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
      }
    });
  });
}

async function saveaddnewproduks() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    data.main_img = JSON.stringify(workerData.data.listimagename);

    let cekusername = `SELECT * FROM databaseallitem_main WHERE BINARY main_product = "${data.main_product}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          main_product: data.main_product,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
        //return;
      }
      if (results.length > 0) {
        var newnotifs = {
          main_product: data.main_product,
          statussave: "duplikat katagori",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      } else {
        //belum ada
        let setnewdata = "INSERT INTO databaseallitem_main SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
          if (err) {
            console.error("Gagal insert:", err);
            var newnotifs = {
              main_product: data.main_product,
              statussave: "gagal sistem error [2]",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
            //return;
          } else {
            var newnotifs = {
              main_product: data.main_product,
              statussave: "sukses",
            };
            notif.push(newnotifs);
            var datavariants = workerData.data.datavariantproduklist.split(',');
            for (let i = 0; i < datavariants.length; i++) {
              const element = datavariants[i];
              const rows = await queryPromise(`UPDATE databaseallitem SET main_product='${data.main_product}' WHERE BINARY product='${element}'`);
            }

            checkDone(notif, "add");
          }
        });
      }
    });
  });
}

async function saveaddplatform() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    let cekusername = `SELECT * FROM platform WHERE BINARY platform = "${data.platform}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          platform: data.platform,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
        //return;
      }
      if (results.length > 0) {
        var newnotifs = {
          platform: data.platform,
          statussave: "duplikat platform",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      } else {
        //belum ada
        let setnewdata = "INSERT INTO platform SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
          if (err) {
            console.error("Gagal insert:", err);
            var newnotifs = {
              platform: data.platform,
              statussave: "gagal sistem error [2]",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
            //return;
          } else {
            var newnotifs = {
              platform: data.platform,
              statussave: "sukses",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
          }
        });
      }
    });
  });
}

async function saveaddcolorvariant() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    let cekusername = `SELECT * FROM databasecolorvariant WHERE BINARY colorvariant = "${data.colorvariant}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          colorvariant: data.colorvariant,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
        //return;
      }
      if (results.length > 0) {
        var newnotifs = {
          colorvariant: data.colorvariant,
          statussave: "duplikat color variant",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      } else {
        //belum ada

        //cek kodekain
        let cekkodekain = `SELECT * FROM databasecolorvariant WHERE BINARY kodekain = "${data.kodekain}"`;
        database.query(cekkodekain, async (err, results) => {
          if (results.length > 0) {
            var newnotifs = {
              colorvariant: data.colorvariant,
              statussave: "duplikat kode kain",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
          } else {
            //belum ada
            let setnewdata = "INSERT INTO databasecolorvariant SET ?";
            let newdata = database.query(setnewdata, data, async (err, datax3) => {
              if (results.length > 0) {
                console.error("Gagal insert:", err);
                var newnotifs = {
                  colorvariant: data.colorvariant,
                  statussave: "gagal sistem error [2]",
                };
                notif.push(newnotifs);
                checkDone(notif, "add");
                //return;
              } else {
                var newnotifs = {
                  colorvariant: data.colorvariant,
                  statussave: "sukses",
                };
                notif.push(newnotifs);
                checkDone(notif, "add");
              }
            });
          }

        });
        //

      }
    });
  });
}

async function saveaddprocurement() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    let cekusername = `SELECT * FROM databaseitem_proc WHERE BINARY item = "${data.item}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          item: data.item,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
        //return;
      }
      if (results.length > 0) {
        var newnotifs = {
          item: data.item,
          statussave: "duplikat item",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      } else {
        //belum ada
        let setnewdata = "INSERT INTO databaseitem_proc SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
          if (results.length > 0) {
            console.error("Gagal insert:", err);
            var newnotifs = {
              item: data.item,
              statussave: "gagal sistem error [2]",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
            //return;
          } else {
            var newnotifs = {
              item: data.item,
              statussave: "sukses",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
          }
        });
      }
    });
  });
}

async function saveeditprocurement() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    var oldedititem = workerData.data.oldedititem[0];

    let cekusername = `SELECT * FROM databaseitem_proc WHERE BINARY item = "${oldedititem.item}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          product: data.product,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
        //return;
      }
      if (results.length > 0) {
        const updateFields = [];
        const updateValues = [];

        for (const key in data) {
          if (data[key] !== undefined) {
            updateFields.push(`${key} = ?`);
            updateValues.push(data[key]);
          }
        }

        // update berdasarkan product
        let updatequery = `UPDATE databaseitem_proc SET ${updateFields.join(
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
      } else {
        //produk belum ada
        var newnotifs = {
          item: data.item,
          statussave: "error, product belum ada",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
      }
    });
  });
}

async function saveaddoffice() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    let cekusername = `SELECT * FROM database_office WHERE BINARY office = "${data.office}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          item: data.item,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
        //return;
      }
      if (results.length > 0) {
        var newnotifs = {
          office: data.office,
          statussave: "duplikat item",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      } else {
        //belum ada
        let setnewdata = "INSERT INTO database_office SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
          if (results.length > 0) {
            console.error("Gagal insert:", err);
            var newnotifs = {
              office: data.office,
              statussave: "gagal sistem error [2]",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
            //return;
          } else {
            var newnotifs = {
              office: data.office,
              statussave: "sukses",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
          }
        });
      }
    });
  });
}

async function saveeditoffice() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    var oldedititem = workerData.data.oldedititem[0];

    let cekusername = `SELECT * FROM database_office WHERE BINARY office = "${oldedititem.office}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          office: data.office,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
        //return;
      }
      if (results.length > 0) {
        const updateFields = [];
        const updateValues = [];

        for (const key in data) {
          if (data[key] !== undefined) {
            updateFields.push(`${key} = ?`);
            updateValues.push(data[key]);
          }
        }

        // update berdasarkan product
        let updatequery = `UPDATE database_office SET ${updateFields.join(
          ", "
        )} WHERE office = ?`;
        updateValues.push(oldedititem.office); //
        database.query(updatequery, updateValues, (err, result) => {
          var newnotifs = {
            office: data.office,
            statussave: "sukses",
          };
          notif.push(newnotifs);
          checkDone(notif, "edit");
        });
      } else {
        //produk belum ada
        var newnotifs = {
          office: data.office,
          statussave: "error, product belum ada",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
      }
    });
  });
}


async function saveaddvendor() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    let cekusername = `SELECT * FROM databasevendor_proc WHERE BINARY vendor = "${data.vendor}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          vendor: data.vendor,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
        //return;
      }
      if (results.length > 0) {
        var newnotifs = {
          vendor: data.vendor,
          statussave: "duplikat item",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      } else {
        //belum ada
        let setnewdata = "INSERT INTO databasevendor_proc SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
          if (results.length > 0) {
            console.error("Gagal insert:", err);
            var newnotifs = {
              vendor: data.vendor,
              statussave: "gagal sistem error [2]",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
            //return;
          } else {
            var newnotifs = {
              vendor: data.vendor,
              statussave: "sukses",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
          }
        });
      }
    });
  });
}

async function saveeditvendor() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    var oldedititem = workerData.data.oldedititem[0];
    let cekusername = `SELECT * FROM databasevendor_proc WHERE BINARY vendor = "${oldedititem.vendor}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          vendor: data.vendor,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
        //return;
      }
      if (results.length > 0) {
        const updateFields = [];
        const updateValues = [];

        for (const key in data) {
          if (data[key] !== undefined) {
            updateFields.push(`${key} = ?`);
            updateValues.push(data[key]);
          }
        }

        // update berdasarkan product
        let updatequery = `UPDATE databasevendor_proc SET ${updateFields.join(
          ", "
        )} WHERE vendor = ?`;
        updateValues.push(oldedititem.vendor); //
        database.query(updatequery, updateValues, (err, result) => {
          var newnotifs = {
            vendor: data.vendor,
            statussave: "sukses",
          };
          notif.push(newnotifs);
          checkDone(notif, "edit");
        });
      } else {
        //produk belum ada
        var newnotifs = {
          vendor: data.vendor,
          statussave: "error, product belum ada",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
      }
    });
  });
}

async function saveaddcoa() {
  console.log(workerData.data.alldataadditem);

  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    // 💥 Ubah nama_plan (array) jadi string JSON sebelum simpan
    if (Array.isArray(data.nama_plan)) {
      data.nama_plan = JSON.stringify(data.nama_plan);
    }

    // Cek apakah kode atau nama_plan sudah ada
    const cekusername = `
    SELECT * FROM database_coa
    WHERE BINARY kode = "${data.kode}"
    OR JSON_CONTAINS(nama_plan, '"${data.nama_plan}"')
  `;

    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        notif.push({ coa: data.kode, statussave: "gagal sistem error [1]" });
        checkDone(notif, "add");
        return;
      }

      if (results.length > 0) {
        notif.push({ coa: data.kode, statussave: "duplikat item" });
        checkDone(notif, "add");
      } else {
        // Belum ada — insert data baru
        const setnewdata = "INSERT INTO database_coa SET ?";
        database.query(setnewdata, data, (err2) => {
          if (err2) {
            console.error("Gagal insert:", err2);
            notif.push({ coa: data.kode, statussave: "gagal sistem error [2]" });
          } else {
            notif.push({ coa: data.kode, statussave: "sukses" });
          }
          checkDone(notif, "add");
        });
      }
    });
  });
}

async function saveeditcoa() {
  console.log(workerData.data.alldataadditem);

  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    const oldedititem = workerData.data.oldedititem[0];
    const cekusername = `SELECT * FROM database_coa WHERE BINARY kode = ?`;

    database.query(cekusername, [oldedititem.kode], async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        notif.push({ coa: data.kode, statussave: "gagal sistem error[1]" });
        return checkDone(notif, "edit");
      }

      if (results.length > 0) {
        const updateFields = [];
        const updateValues = [];

        for (const key in data) {
          if (data[key] !== undefined) {
            if (key === "namaplan" || key === "nama_plan") {
              // 🔹 Pastikan bentuknya selalu string JSON aman
              let namaPlanValue;

              if (Array.isArray(data[key])) {
                // ubah array ke string JSON
                namaPlanValue = JSON.stringify(data[key]);
              } else if (typeof data[key] === "string") {
                // kalau sudah string, pakai apa adanya
                namaPlanValue = data[key];
              } else {
                // fallback aman
                namaPlanValue = JSON.stringify([]);
              }

              updateFields.push("nama_plan = ?");
              updateValues.push(namaPlanValue);
            } else {
              updateFields.push(`${key} = ?`);
              updateValues.push(data[key]);
            }

          }
        }
        console.log(updateFields.join(", "));
        console.log(updateValues);


        const updatequery = `UPDATE database_coa SET ${updateFields.join(", ")} WHERE kode = ?`;
        updateValues.push(oldedititem.kode);

        database.query(updatequery, updateValues, (err, result) => {
          if (err) {
            console.error("Update error:", err);
            notif.push({ coa: data.kode, statussave: "gagal sistem error[2]" });
          } else {
            notif.push({ coa: data.kode, statussave: "sukses update" });
            console.log("✅ Update sukses:", data.kode);
          }
          checkDone(notif, "edit");
        });
      } else {
        notif.push({ coa: data.kode, statussave: "error, product belum ada" });
        checkDone(notif, "edit");
      }
    });
  });
}


async function saveaddpendingpayment() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    let cekusername = `SELECT * FROM proc_database_pendingpayment WHERE BINARY vendor = "${data.vendor}" `;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          pendingpayment: data.vendor,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
        //return;
      }
      if (results.length > 0) {
        var newnotifs = {
          pendingpayment: data.vendor,
          statussave: "duplikat item",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      } else {
        //belum ada
        let setnewdata = "INSERT INTO proc_database_pendingpayment SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
          if (results.length > 0) {
            console.error("Gagal insert:", err);
            var newnotifs = {
              pendingpayment: data.vendor,
              statussave: "gagal sistem error [2]",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
            //return;
          } else {
            var newnotifs = {
              pendingpayment: data.vendor,
              statussave: "sukses",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
          }
        });
      }
    });
  });
}

async function saveeditpendingpayment() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    var oldedititem = workerData.data.oldedititem[0];
    let cekusername = `SELECT * FROM proc_database_pendingpayment WHERE BINARY vendor = "${oldedititem.vendor}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          pendingpayment: data.vendor,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
        //return;
      }
      if (results.length > 0) {
        const updateFields = [];
        const updateValues = [];

        for (const key in data) {
          if (data[key] !== undefined) {
            updateFields.push(`${key} = ?`);
            updateValues.push(data[key]);
          }
        }

        // update berdasarkan product
        let updatequery = `UPDATE proc_database_pendingpayment SET ${updateFields.join(
          ", "
        )} WHERE vendor = ?`;
        updateValues.push(oldedititem.vendor); //
        database.query(updatequery, updateValues, (err, result) => {
          var newnotifs = {
            pendingpayment: data.vendor,
            statussave: "sukses",
          };
          notif.push(newnotifs);
          checkDone(notif, "edit");
        });
      } else {
        //produk belum ada
        var newnotifs = {
          pendingpayment: data.vendor,
          statussave: "error, product belum ada",
        };
        notif.push(newnotifs);
        checkDone(notif, "edit");
      }
    });
  });
}


// api edit database
async function apieditdatabase() {
  //penjualan
  const dataadminlist = await queryPromise(`SELECT * FROM admlistdata ORDER BY tglinputmili DESC`);
  const stockupholsterydatabase = await queryPromise(`SELECT * FROM stockupholsterydatabase`);
  const forcestatusrequest = await queryPromise(`SELECT * FROM forcestatusrequest`);


  //database
  const platformdata = await queryPromise(`SELECT * FROM platform`);
  const itemsdata = await queryPromise(`SELECT * FROM databaseallitem ORDER BY product ASC`);
  const colorvariantdata = await queryPromise(`SELECT * FROM databasecolorvariant`);
  const extrachargelist = await queryPromise(`SELECT * FROM extrachargelist`);
  const deliveryunitlist = await queryPromise(`SELECT * FROM deliveryunitlist ORDER BY thirdparty ASC`);

  const status_hours = await queryPromise(`SELECT * FROM status_hours`);
  const database_investor = await queryPromise(`SELECT * FROM database_investor`);
  const databaseallitem_web = await queryPromise(`SELECT * FROM databaseallitem_web`);
  const databaseallitem_katagori = await queryPromise(`SELECT * FROM databaseallitem_katagori`);

  const databasebank = await queryPromise(`SELECT * FROM databasebank`);


  //
  // Mengirim data ke parentPort setelah semua query selesai
  if (workerData.rolesuser.toLowerCase() == 'supervisor') {
    const finance_banklimbo = await queryPromise(`SELECT * FROM finance_banklimbo`);
    const database_invoicevendor = await queryPromise(`SELECT * FROM database_invoicevendor`);

    parentPort.postMessage({
      dataadminlist,
      stockupholsterydatabase,
      forcestatusrequest,

      platformdata,
      itemsdata,
      colorvariantdata,
      extrachargelist,
      deliveryunitlist,
      status_hours,
      database_investor,
      databaseallitem_web,
      databaseallitem_katagori,
      databasebank,

      finance_banklimbo,
      database_invoicevendor

    });
  }
  else {

    parentPort.postMessage({
      dataadminlist,
      stockupholsterydatabase,
      forcestatusrequest,

      platformdata,
      itemsdata,
      colorvariantdata,
      extrachargelist,
      deliveryunitlist,
      status_hours,
      database_investor,
      databaseallitem_web,
      databaseallitem_katagori
    });
  }

}

// save add platform
async function saveaddhargaplatform() {

  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach(async (data) => {
    //const platformdata = await queryPromise(`SELECT * FROM databaseallitem WHERE BINARY product='${data.product}'`);
    const product_name = data.product;
    const harga_platform_obj = data.harga_platform;

    // Buat array kondisi LIKE secara dinamis untuk harga_platform
    const conditions = [];
    /* for (const platform_name in harga_platform_obj) {
      if (Object.hasOwnProperty.call(harga_platform_obj, platform_name)) {
        const price = harga_platform_obj[platform_name];
        // Penting: Escape nilai untuk mencegah SQL injection.
        //parameterized queries.
        const escaped_platform_name = platform_name.replace(/'/g, "''");
        const escaped_price = String(price).replace(/'/g, "''");

        conditions.push(`harga_platform LIKE '%"${escaped_platform_name}":%'`);
      }
    } */
    for (let i = 0; i < harga_platform_obj.length; i++) {
      const element = harga_platform_obj[i];
      const platform = element.platform;
      const price = element.price;
      const escaped_platform_name = platform.replace(/'/g, "''");
      const escaped_price = String(price).replace(/'/g, "''");

      conditions.push(`harga_platform LIKE '%"${escaped_platform_name}"%'`);
    }

    // Jika tidak ada data harga_platform yang diberikan, anggap tidak ada duplikat untuk harga_platform
    if (conditions.length === 0) {
      console.log(`Tidak ada data harga platform untuk produk: ${product_name}. Melewati cek duplikasi harga_platform.`);
      var newnotifs = {
        product_name: product_name,
        platform: data.platform,
        statussave: "gagal sistem error[1]",
      };
      notif.push(newnotifs);
      checkDone(notif, "add");

    } else {
      const query = `
        SELECT COUNT(*) AS duplicate_count
        FROM databaseallitem
        WHERE BINARY product = '${product_name}'
        AND (${conditions.join(' OR ')});
      `;

      try {
        const result = await queryPromise(query);

        if (result[0].duplicate_count > 0) {
          console.log(`Duplikat properti harga_platform ditemukan untuk produk: ${product_name}`);
          // Lakukan sesuatu jika duplikat ditemukan (misalnya, lewati atau perbarui)
          var newnotifs = {
            product_name: product_name,
            platform: data.platform,
            statussave: "duplikat platform",
          };
          notif.push(newnotifs);
          checkDone(notif, "add");
        } else {
          console.log(`Tidak ada duplikat properti harga_platform untuk produk: ${product_name}`);
          // Lanjutkan dengan penambahan atau pemrosesan item
          //
          console.log('hasil cek ya', result[0]);
          const platformdata = await queryPromise(`SELECT * FROM databaseallitem WHERE BINARY product='${product_name}'`);

          const existingHargaPlatformDB = platformdata[0] ? platformdata[0].harga_platform : null;

          var finalHargaPlatformToUpdate = harga_platform_obj;

          if (existingHargaPlatformDB) {
            // Jika kolom harga_platform ada isinya, parse dan gabungkan
            try {
              const parsedExisting = JSON.parse(existingHargaPlatformDB);
              // Gabungkan objek inputan ke objek yang sudah ada.
              // Properti dari harga_platform_obj akan menimpa yang sudah ada jika kuncinya sama.
              finalHargaPlatformToUpdate = [...parsedExisting, ...harga_platform_obj];
              console.log(`Menggabungkan data harga_platform yang ada dengan inputan untuk produk: ${product_name}`);
            } catch (e) {
              console.error(`Error parsing existing harga_platform JSON for product ${product_name}. Using input data only.`, e);
              // Jika parsing gagal, 
              var newnotifs = {
                product_name: product_name,
                platform: data.platform,
                statussave: "gagal sistem error[1]",
              };
              notif.push(newnotifs);
              checkDone(notif, "add");
            }
          }

          // Stringify hasil gabungan atau inputan tunggal
          const finalStringifiedHargaPlatform = JSON.stringify(finalHargaPlatformToUpdate);

          const updateQuery = `
            UPDATE databaseallitem
            SET harga_platform = '${finalStringifiedHargaPlatform.replace(/'/g, "''")}'
            WHERE BINARY product = '${product_name}';
          `;

          try {
            await queryPromise(updateQuery);
            console.log(`Kolom harga_platform berhasil diupdate untuk produk: ${product_name}`);
            var newnotifs = {
              product_name: product_name,
              platform: data.platform,
              statussave: "sukses",
            };

            notif.push(newnotifs);
            checkDone(notif, "add");
          } catch (error) {
            console.error(`Error saat mengupdate harga_platform untuk produk ${product_name}:`, error);
            var newnotifs = {
              product_name: product_name,
              platform: data.platform,
              statussave: "gagal sistem error[1]",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
          }


        }
      } catch (error) {
        console.error(`Error saat memeriksa duplikat untuk produk ${product_name}:`, error);
        var newnotifs = {
          product_name: product_name,
          platform: data.platform,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      }
    }


  });
}


async function saveaddinvestor() {
  counter = 0;
  var notif = [];
  workerData.data.alldataadditem.forEach((data) => {
    let cekusername = `SELECT * FROM database_investor WHERE BINARY investor = "${data.investor}"`;
    database.query(cekusername, async (err, results) => {
      if (err) {
        console.error("Query error:", err);
        var newnotifs = {
          investor: data.investor,
          statussave: "gagal sistem error[1]",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
        //return;
      }
      if (results.length > 0) {
        var newnotifs = {
          investor: data.investor,
          statussave: "duplikat color variant",
        };
        notif.push(newnotifs);
        checkDone(notif, "add");
      } else {
        //belum ada
        let setnewdata = "INSERT INTO database_investor SET ?";
        let newdata = database.query(setnewdata, data, async (err, datax3) => {
          if (err) {
            console.error("Gagal insert:", err);
            var newnotifs = {
              investor: data.investor,
              statussave: "gagal sistem error [2]",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
            //return;
          } else {
            var newnotifs = {
              investor: data.investor,
              statussave: "sukses",
            };
            notif.push(newnotifs);
            checkDone(notif, "add");
          }
        });
      }
    });
  });
}

async function deleteitem() {
  var queries = `DELETE FROM platform WHERE BINARY platform = '${workerData.data.item}'`; //jika platform

  if (workerData.data.tipe == "colorvariant") {
    //jika color variant
    queries = `DELETE FROM databasecolorvariant WHERE BINARY colorvariant = '${workerData.data.item}'`;
  } else if (workerData.data.tipe == "deliveryunit") {
    // Jika delivery unit
    queries = `DELETE FROM deliveryunitlist WHERE BINARY thirdparty = '${workerData.data.item.thirdparty}' AND BINARY inhouse = '${workerData.data.item.inhouse}'`;
  } else if (workerData.data.tipe == "investor") {
    //jika color investor
    queries = `DELETE FROM database_investor WHERE BINARY investor = '${workerData.data.item}'`;
  } else if (workerData.data.tipe == "newproduks") {
    //jika color investor
    queries = `DELETE FROM databaseallitem_main WHERE BINARY main_product = '${workerData.data.item}'`;
  } else if (workerData.data.tipe == "procurement") {
    // Jika itemprocurement
    queries = `DELETE FROM databaseitem_proc WHERE BINARY item = '${workerData.data.item}'`;
  } else if (workerData.data.tipe == "office") {
    // Jika office
    queries = `DELETE FROM database_office WHERE BINARY office = '${workerData.data.item}'`;
  } else if (workerData.data.tipe == "vendor") {
    // Jika vendor
    queries = `DELETE FROM databasevendor_proc WHERE BINARY atas_nama = '${workerData.data.item}'`;
  } else if (workerData.data.tipe == "coa") {
    // Jika coa
    queries = `DELETE FROM database_coa WHERE BINARY kode = '${workerData.data.item}'`;
  } else if (workerData.data.tipe == "pendingpayment") {
    // Jika coa
    queries = `DELETE FROM proc_database_pendingpayment WHERE BINARY vendor = '${workerData.data.item}'`;
  } else if (workerData.data.tipe == 'hargaplatform') {
    //product:dataarray.product,platform:namaplatformss
    console.log('delete hargaplatform', workerData.data.item.product)
    const platformdata = await queryPromise(`SELECT * FROM databaseallitem WHERE BINARY product='${workerData.data.item.product}'`);

    var harga_platform = JSON.parse(platformdata[0].harga_platform);


    console.log('harga_platform', harga_platform);
    var fixhapus = harga_platform.filter(item => item.platform !== workerData.data.item.platform);

    console.log('harga_platform fixhapus', fixhapus);

    queries = `UPDATE databaseallitem SET harga_platform ='${JSON.stringify(fixhapus)}' WHERE BINARY product = '${workerData.data.item.product}'`;
  }


  database.query(queries, async (err, results) => {
    if (results.affectedRows > 0) {
      var data = {
        tglinputmili: new Date().getTime(),
        tipe: "delete",
        namalengkap: workerData.data.namalengkap,
        username: workerData.data.username,
        tindakan: `delete ${workerData.data.tipe} ${workerData.data.tipe == 'hargaplatform' ? `${workerData.data.item.product} [${workerData.data.item.platform}]` : workerData.data.item}`,
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

function getPropertyByBukawal(bukawal, element) {
  switch (bukawal) {
    case "saveadditem":
    case "saveedititem":
      return element.product;

    case "saveaddplatform":
    case "saveeditplatform":
      return `platform ${element.platform}`;

    case "saveaddcolorvariant":
    case "saveeditcolorvariant":
      return `colorvariant ${element.colorvariant}`;

    case "saveadddeliveryunit":
    case "saveeditdeliveryunit":
      return `deliveryUnit ${element.deliveryUnit || element.deliveryunit}`;

    case "saveaddinvestor":
    case "saveeditinvestor":
      return `investor ${element.investor}`;

    case "saveaddnewproduks":
    case "saveeditnewproduks":
      return `web produk ${element.main_product}`;

    case "saveaddhargaplatform":
    case "saveedithargaplatform":
      return `harga platform ${element.product_name} ${element.platform}`;

    case "saveaddprocurement":
    case "saveeditprocurement":
      return `item procurement ${element.item}`;

    case "saveaddoffice":
    case "saveeditoffice":
      return `item office ${element.office}`;

    case "saveaddvendor":
    case "saveeditvendor":
      return `item vendor ${element.vendor}`;

    case "saveaddcoa":
    case "saveeditcoa":
      return `item Coa ${element.kode}`;

    case "saveaddpendingpayment":
    case "saveeditpendingpayment":
      return `item Pending Payment ${element.vendor}`;

    default:
      return "-";
  }
}

function checkDone(notif, tipe) {
  console.log(counter);
  counter++;
  if (counter === workerData.data.alldataadditem.length) {
    var dataaddoredit = "";
    if (tipe == "add") {
      dataaddoredit = notif.map((element) => getPropertyByBukawal(workerData.bukawal, element)).join(", ");
    } else {
      console.log(dataaddoredit);

      // Penanganan EDIT
      const oldData = getPropertyByBukawal(workerData.bukawal, workerData.data.oldedititem[0]);
      const newData = getPropertyByBukawal(workerData.bukawal, notif[0]);

      dataaddoredit = oldData === newData ? oldData : `${oldData} to ${newData}`;
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

////////////////////////////////////////// web
async function addoreditaddprodukWeb() {
  var produk = workerData.data.data;
  var namalengkap = workerData.data.namalengkap;
  var username = workerData.data.username;
  var tipe = workerData.data.tipe;

  var data = {
    tglinputmili: new Date().getTime(),
    tipe,
    namalengkap,
    username,
    tindakan:
      tipe == "add"
        ? `add data ${produk.namaproduk}`
        : `edit data ${produk.namaproduk}`,
  };
  const columns = Object.keys(data);                      // [kolom]
  const placeholders = columns.map(() => '?').join(',');  // '?, ?, ?'
  const values = Object.values(data);                     // [value]
  const sql = `INSERT INTO logedit_database (${columns.join(', ')}) VALUES (${placeholders})`;

  const result = await queryPromise(sql, values);

  return 'wow';
}


async function saveaddprodukweb() {
  var data = workerData.data.data;
  const databaseitemweb = await queryPromise(`SELECT * FROM databaseallitem_web`);
  //console.log('databaseitemweb == ',databaseitemweb);
  if (databaseitemweb.length == 0) {
    insert();
  } else {
    console.log('data.namaproduk.trim().toLowerCase()', data.namaproduk.trim().toLowerCase())
    //console.log('data == ',databaseitemweb)
    var flagnamaproduk = false;//false tdk duplikat
    var datcek = databaseitemweb;
    for (let i = 0; i < datcek.length; i++) {
      const element = datcek[i];
      //console.log('element.namaproduk == ',element.namaproduk.trim().toLowerCase())
      if (element.namaproduk.trim().toLowerCase() == data.namaproduk.trim().toLowerCase()) {
        console.log('nama produk sudah digunakan');
        flagnamaproduk = true;
      }
    }
    console.log('flagnamaproduk', flagnamaproduk);
    if (flagnamaproduk == false) {
      insert();
    } else {
      parentPort.postMessage({ icons: 'error', texts: 'nama produk sudah digunakan' });
    }

  }

  async function insert() {
    data.imageurl = JSON.stringify(data.imageurl);
    data.katagori = JSON.stringify(data.katagori);
    data.listvariant = JSON.stringify(data.listvariant);

    const columns = Object.keys(data);                      // ['nama', 'harga', 'stok']
    const placeholders = columns.map(() => '?').join(',');  // '?, ?, ?'
    const values = Object.values(data);                     // ['Produk A', 10000, 5]

    const sql = `INSERT INTO databaseallitem_web (${columns.join(', ')}) VALUES (${placeholders})`;

    const result = await queryPromise(sql, values);

    if (result.affectedRows === 1) {
      var addLog = await addoreditaddprodukWeb();
      parentPort.postMessage({ icons: 'success', texts: 'berhasil save data' });
    } else {
      parentPort.postMessage({ icons: 'error', texts: 'gagal save data' });
    }
  }
}



/////////////////////////////////////////

function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    database.query(sql, params, (err, results) => {
      if (err) {
        console.error("SQL Error:", err);
        reject(err);
      } else { 
        resolve(results);
      }
    });
  });
}

function checkDone(notif, type) {
  counter++;
  // Memastikan pesan hanya dikirim setelah semua item dalam loop selesai
  if (counter === workerData.data.alldataadditem.length) {
    parentPort.postMessage({
      icons: "success",
      texts: type === "add" ? "Proses simpan selesai" : "Proses edit selesai",
      titles: "Selesai",
      notif: notif
    });
  }
}

// Letakkan ini di luar fungsi manapun, di baris paling bawah file
var counter = 0;

function checkDone(notif, type) {
    counter++;
    // Mengambil jumlah data yang sedang diproses dari workerData
    let totalItems = 0;
    if (workerData.data && workerData.data.alldataadditem) {
        totalItems = workerData.data.alldataadditem.length;
    } else {
        totalItems = 1; // Default jika bukan operasi bulk
    }

    if (counter === totalItems) {
        parentPort.postMessage({
            icons: "success",
            texts: type === "add" ? "Data berhasil disimpan" : "Data berhasil diperbarui",
            titles: "Berhasil",
            notif: notif
        });
        counter = 0; // Reset counter untuk proses berikutnya
    }
}