import { parentPort, workerData } from "worker_threads";
import {database,dtbase2} from "../config/connection.js";

if (workerData.bukawal == "awal-investor") {
  dataambil_bankinvestor('','');
}else if (workerData.bukawal == "finance-gayahidup") {
  var finance_bankgayahidup_account;
  var finance_bankgayahidup_transaksi;

  const sql =`SELECT * FROM finance_bankgayahidup_account ORDER BY tglinputmili ASC`;
  const result = await queryPromise(sql);

  

  finance_bankgayahidup_account=result;

  
  const sql1 =`SELECT * FROM finance_bankgayahidup_transaksi ORDER BY tglinputmili ASC`;
  const result1 = await queryPromise(sql1);

  finance_bankgayahidup_transaksi=result1;

  dataambil_bankinvestor(finance_bankgayahidup_account,finance_bankgayahidup_transaksi);
}

else if (workerData.bukawal =='downloadexcel') {
  downloadexcel();
}



//ambil database bank investor
function dataambil_bankinvestor(dataA,dataB) {
  var finance_bankinvestor;
  var finance_banklimbo;
  var database_investor;
  var finance_bankinvestor_new;

  let cekfinance_bankinvestor = `SELECT * FROM finance_bankinvestor ORDER BY tglinputmili ASC`;
  let finisambilfinance_bankinvestor = database.query(
    cekfinance_bankinvestor,
    (err, results1) => {
      finance_bankinvestor = results1;
      let cekfinance_banklimbo = `SELECT * FROM finance_banklimbo`;
      let cekfinance_banklimbos = database.query(
        cekfinance_banklimbo,
        (err, resultfinance_banklimbo) => {
          finance_banklimbo = resultfinance_banklimbo;
          let cekdatabase_investor = `SELECT * FROM database_investor`;
          let cekdatabase_investors = database.query(
            cekdatabase_investor,
            (err, result_database_investor) => {
              database_investor = result_database_investor;
              
              let cekfinance_bankinvestor2 = `SELECT * FROM finance_bankinvestor_new ORDER BY tglinputmili ASC`;
              let finisambilfinance_bankinvestor_new = database.query(
              cekfinance_bankinvestor2,
              (err, results1new) => {
                finance_bankinvestor_new=results1new;
                ambildatabselainya(
                  finance_banklimbo,
                  finance_bankinvestor,
                  database_investor,
                  finance_bankinvestor_new,dataA,dataB
                );
              });
             
              
            }
          );
        }
      );
    }
  );
}
//ambil database lainnya
async function ambildatabselainya(
  finance_banklimbo,
  finance_bankinvestor,
  database_investor,finance_bankinvestor_new,finance_bankgayahidup_account,finance_bankgayahidup_transaksi
) {
  var dataadminlist;
  var itemsdata;
  var databasepesananmasalah;
  var stockupholsterydatabase;
  var forcestatusrequest;
  var formstockcalculate;
  var database_invoicevendor;
  var databasebank;

  let cekitems = `SELECT * FROM databaseallitem ORDER BY product ASC`;
  let finisambilitem = database.query(cekitems, (err, results1) => {
    itemsdata = results1;

    let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
    let finiscekitems = database.query(cekitems, (err, results3) => {
      dataadminlist = results3;

      let cekitemsmasalah = `SELECT * FROM databasepesananmasalah ORDER BY tglinputmili DESC`;
      let finiscekitemsmasalah = database.query(
        cekitemsmasalah,
        (err, resultsmasalah) => {
          databasepesananmasalah = resultsmasalah;

          let cekstockup = `SELECT * FROM stockupholsterydatabase`;
          let cekstockupx = database.query(cekstockup, (err, resultsstok) => {
            stockupholsterydatabase = resultsstok;

            let cekforcestatusz = `SELECT * FROM forcestatusrequest`;
            let cekforcestatuszx = database.query(
              cekforcestatusz,
              (err, resultstatusz) => {
                forcestatusrequest = resultstatusz;

                let cekextrachargelist = `SELECT * FROM formstockcalculate`;
                let finisambilextrachargelist = database.query(
                  cekextrachargelist,
                  (err, results4) => {
                    formstockcalculate = results4;

                    let cekdatabase_invoicevendor = `SELECT * FROM database_invoicevendor`;
                    let cekfixdatabase_invoicevendor = database.query(
                      cekdatabase_invoicevendor,
                      async(err, resultdatabase_invoicevendor) => {
                        database_invoicevendor = resultdatabase_invoicevendor;

                        const sql1 =`SELECT * FROM databasebank`;
                        databasebank = await queryPromise(sql1);

                        
                        const notification_data=await queryPromise(`SELECT * FROM notification_data ORDER BY no DESC`);
                        parentPort.postMessage({
                          itemsdata,
                          dataadminlist,
                          databasepesananmasalah,
                          stockupholsterydatabase,
                          forcestatusrequest,
                          formstockcalculate,
                          finance_banklimbo,
                          finance_bankinvestor,
                          database_investor,
                          database_invoicevendor,
                          finance_bankinvestor_new,
                          finance_bankgayahidup_account,
                          finance_bankgayahidup_transaksi,
                          databasebank,notification_data
                        });

                        // Menutup koneksi setelah query selesai
                        /* database.end((closeErr) => {
                          if (closeErr) {
                            console.error(
                              "Error closing connection:",
                              closeErr
                            );
                          } else {
                            console.log("Database connection closed");
                          }
                        }); */
                      }
                    );
                  }
                );
              }
            );
          });
        }
      );
    });
  });
}


async function downloadexcel() {
    try {
      console.log('datafinance_banklimbo=================');
      
        const datafinance_banklimbo = await queryPromise(`SELECT * FROM finance_banklimbo WHERE tgl_tarik_mili BETWEEN ${workerData.data.startMillis} AND ${workerData.data.endMillis} `);
        // Mengirim data ke parentPort setelah semua query selesai
        
      console.log('datafinance_banklimbo=================------',datafinance_banklimbo);
        parentPort.postMessage({icons:'success',text:'sukses ambil data',datafinance_banklimbo});
    } catch (error) {
        parentPort.postMessage({icons:'error',text:error});
    }
}



function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    database.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

