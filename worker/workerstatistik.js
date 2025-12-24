// import { parentPort, workerData } from 'worker_threads';
// import {database,dtbase2} from '../config/connection.js';
// var bukawal = workerData.bukawal;

// if (bukawal == 'awal') {
//     ambildatabselainya('', '', '', '');
// }

// //ambil database lainnya 
// function ambildatabselainya(databaseitem_proc, datarequestbeli_proc, databasebank, database_coa) {
//     var dataadminlist;
//     var itemsdata;
//     var databasepesananmasalah;
//     var stockupholsterydatabase;
//     var forcestatusrequest;
//     var formstockcalculate;
//     let database_toko;
//     let platform;
//     let database_investor

//     var database_invoicevendor;

//     let cekitems = `SELECT * FROM databaseallitem ORDER BY product ASC`;
//     let finisambilitem = database.query(cekitems, (err, results1) => {
//         itemsdata = results1;

//         let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
//         let finiscekitems = database.query(cekitems, (err, results3) => {
//             dataadminlist = results3;

//             let cekitemsmasalah = `SELECT * FROM databasepesananmasalah ORDER BY tglinputmili DESC`;
//             let finiscekitemsmasalah = database.query(cekitemsmasalah, (err, resultsmasalah) => {
//                 databasepesananmasalah = resultsmasalah;

//                 let cekstockup = `SELECT * FROM stockupholsterydatabase`;
//                 let cekstockupx = database.query(cekstockup, (err, resultsstok) => {
//                     stockupholsterydatabase = resultsstok;

//                     let cekforcestatusz = `SELECT * FROM forcestatusrequest`;
//                     let cekforcestatuszx = database.query(cekforcestatusz, (err, resultstatusz) => {
//                         forcestatusrequest = resultstatusz;

//                         let cekextrachargelist = `SELECT * FROM formstockcalculate`;
//                         let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
//                             formstockcalculate = results4;

//                             let dbToko = `SELECT * FROM database_toko`;
//                             let queryDBToko = database.query(dbToko, (err, dbToko) => {
//                                 database_toko = dbToko;

//                                 let dbPlatform = `SELECT * FROM platform`;
//                                 let queryDBPlatform = database.query(dbPlatform, (err, dbPlatform) => {
//                                     platform = dbPlatform

//                                     let cekdatabase_invoicevendor = `SELECT * FROM database_invoicevendor`;
//                                     let cekfixdatabase_invoicevendor = database.query(cekdatabase_invoicevendor, (err, resultdatabase_invoicevendor) => {
//                                         database_invoicevendor = resultdatabase_invoicevendor;

//                                         let dbInvestor = `SELECT * FROM database_investor`
//                                         let queryDBInvestor = database.query(dbInvestor, (err, dbInvestor) => {
//                                             database_investor = dbInvestor

//                                             parentPort.postMessage({ itemsdata, dataadminlist, databasepesananmasalah, stockupholsterydatabase, forcestatusrequest, formstockcalculate, database_toko, platform, database_invoicevendor, database_investor });

//                                             // Menutup koneksi setelah query selesai
//                                             /* database.end((closeErr) => {
//                                                 if (closeErr) {
//                                                     console.error('Error closing connection:', closeErr);
//                                                 } else {
//                                                     console.log('Database connection closed');
//                                                 }
//                                             }); */
//                                         })

//                                     });


//                                 })
//                             });
//                         });
//                     });
//                 });
//             });
//         });

//     });
// }


import { parentPort, workerData } from 'worker_threads';
import { database } from '../config/connection.js';

var bukawal = workerData.bukawal;

if (bukawal == 'awal') {
  ambildatabselainya('', '', '', '');
}

// fungsi ambil data
async function ambildatabselainya(databaseitem_proc, datarequestbeli_proc, databasebank, database_coa) {
  try {
    let itemsdata = await queryPromise(`SELECT * FROM databaseallitem ORDER BY product ASC`);
    let dataadminlist = await queryPromise(`SELECT * FROM admlistdata ORDER BY tglinputmili DESC`);
    let databasepesananmasalah = await queryPromise(`SELECT * FROM databasepesananmasalah ORDER BY tglinputmili DESC`);
    let stockupholsterydatabase = await queryPromise(`SELECT * FROM stockupholsterydatabase`);
    let forcestatusrequest = await queryPromise(`SELECT * FROM forcestatusrequest`);
    let formstockcalculate = await queryPromise(`SELECT * FROM formstockcalculate`);
    let database_toko = await queryPromise(`SELECT * FROM database_toko`);
    let platform = await queryPromise(`SELECT * FROM platform`);
    let database_invoicevendor = await queryPromise(`SELECT * FROM database_invoicevendor`);
    let database_investor = await queryPromise(`SELECT * FROM database_investor`);
    
const notification_data=await queryPromise(`SELECT * FROM notification_data ORDER BY no DESC`);

    parentPort.postMessage({
      itemsdata,
      dataadminlist,
      databasepesananmasalah,
      stockupholsterydatabase,
      forcestatusrequest,
      formstockcalculate,
      database_toko,
      platform,
      database_invoicevendor,
      database_investor,notification_data
    });

    // Kalau perlu tutup koneksi setelah selesai:
    // database.end();
  } catch (err) {
    console.error('Error ambil data:', err);
    parentPort.postMessage({ error: err.message });
  }
}

// queryPromise function
function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    database.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}
