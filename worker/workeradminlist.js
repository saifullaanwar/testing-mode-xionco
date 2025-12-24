import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';
var bukawal=workerData.bukawal;

var BATCH_SIZE = 100; 

if (bukawal=='awal') {

    try {
        const platformdata = await queryPromise(`SELECT * FROM platform`);
        const itemsdata = await queryPromise(`SELECT * FROM databaseallitem ORDER BY product ASC`);
        const colorvariantdata = await queryPromise(`SELECT * FROM databasecolorvariant`);
        const extrachargelist = await queryPromise(`SELECT * FROM extrachargelist`);
        const dataadminlist = await queryPromise(`SELECT * FROM admlistdata ORDER BY tglinputmili DESC`);
        const databasepesananmasalah = await queryPromise(`SELECT * FROM databasepesananmasalah ORDER BY tglinputmili DESC`);
        const deliveryunitlist = await queryPromise(`SELECT * FROM deliveryunitlist ORDER BY thirdparty ASC`);
        const stockupholsterydatabase = await queryPromise(`SELECT * FROM stockupholsterydatabase`);
        const forcestatusrequest = await queryPromise(`SELECT * FROM forcestatusrequest`);
        const finance_banklimbo = await queryPromise(`SELECT * FROM finance_banklimbo`);
        const finance_banklimbo_instore = await queryPromise(`SELECT * FROM finance_banklimbo_instore`);
        const status_hours = await queryPromise(`SELECT * FROM status_hours`);
        const database_investor = await queryPromise(`SELECT * FROM database_investor`);
        const database_invoicevendor = await queryPromise(`SELECT * FROM database_invoicevendor`);
        const databaseallitem_main = await queryPromise(`SELECT * FROM databaseallitem_main`);
        const databasebank = await queryPromise(`SELECT * FROM databasebank`);
        const databaseitem_proc = await queryPromise(`SELECT * FROM databaseitem_proc`);
        const database_coa = await queryPromise(`SELECT * FROM database_coa`);
        const database_office = await queryPromise(`SELECT * FROM database_office`);
        const databasevendor_proc = await queryPromise(`SELECT * FROM databasevendor_proc`);
        const logedit_database = await queryPromise(`SELECT * FROM logedit_database`);
        const utmdatalink_database = await queryPromise(`SELECT * FROM utm_datalink`);
        const pendingpayment_database = await queryPromise(`SELECT * FROM proc_database_pendingpayment`);
        const notification_data=await queryPromise(`SELECT * FROM notification_data ORDER BY no DESC`);

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
            finance_banklimbo_instore,
            status_hours,
            database_investor,database_invoicevendor,databasebank,databaseallitem_main,databaseitem_proc,database_coa,database_office,
            databasevendor_proc,
            logedit_database,notification_data
            ,utmdatalink_database
            ,pendingpayment_database
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
        parentPort.postMessage({ status: 500, texts: "error database"});
        // parentPort.postMessage({ error: error.message });
    } finally {
        // Menutup koneksi setelah semua query selesai atau terjadi error
        closedatabsase();
    }

}else if (bukawal=='additem') {

    var platformdata;
    var itemsdata;
    var colorvariantdata;
    var extrachargelist;
    var deliveryunitlist;
    var stockupholsterydatabase;
    var databasebank;

    let cekplatform = `SELECT * FROM platform`;
    let finisambilplatform = database.query(cekplatform, (err, results) => {
        platformdata=results;
        let cekitems = `SELECT * FROM databaseallitem ORDER BY product ASC`;
        let finisambilitem = database.query(cekitems, (err, results1) => {
            itemsdata=results1;
            let cekextrachargelist = `SELECT * FROM extrachargelist`;
            let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
                extrachargelist=results4;
                let cekcolorvarian = `SELECT * FROM databasecolorvariant`;
                let finisambilcolorvarian = database.query(cekcolorvarian, (err, results2) => {
                    colorvariantdata=results2;
                    
                    let cekextrachargelist = `SELECT * FROM stockupholsterydatabase`;
                    let finisambilextrachargelist = database.query(cekextrachargelist, (err, results5) => {
                        stockupholsterydatabase=results5;
                    
                        const year = new Date().getFullYear();
                        const monthLetter = getMonthLetter();
                        
                        // Ambil ID terakhir dari database
                        let xxcc = database.query("SELECT id_transaksi FROM admlistdata WHERE id_transaksi LIKE ? ORDER BY id_transaksi DESC LIMIT 1", [`${monthLetter}%-${year}`], (err, resultsc) => {
                            let newNumber = "001";
                            if (resultsc.length > 0) {
                                //const lastId = resultsc[0].id_transaksi; // Contoh: A023-2025
                
                                //const lastNumber = parseInt(lastId.substring(1, 4)); // Ambil angka 023
                                //newNumber = String(lastNumber + 1).padStart(3, "0"); // Tambah 1 dan format ke 3 digit
    
                                const lastId = resultsc[0].id_transaksi.match(/([A-L])(\d{3})[a-z]?-\d{4}/); // Ambil angka dari ID terakhir, abaikan huruf tambahan
                                if (lastId) {
                                    const lastNumber = parseInt(lastId[2]);
                                    newNumber = String(lastNumber + 1).padStart(3, "0");
                                }
                            }
                            
                            const newId = `${monthLetter}${newNumber}-${year}`;
    
                            console.log(newId);
                            let cekdeliveryunitlist = `SELECT * FROM deliveryunitlist ORDER BY thirdparty ASC`;
                            let finisambildeliveryunitlist = database.query(cekdeliveryunitlist, (err, resultszz) => {
                                deliveryunitlist=resultszz;
                                let cekdatabasebank = `SELECT * FROM databasebank`;
                                let finisambildatabasebank = database.query(cekdatabasebank, (err, resultszz_databasebank) => {
                                    databasebank=resultszz_databasebank;
                                    parentPort.postMessage({ platformdata,itemsdata,colorvariantdata,extrachargelist,deliveryunitlist,stockupholsterydatabase,newId,databasebank });
                                    // Menutup koneksi setelah query selesai
                                    closedatabase();
                                });
                                
                            });
    
                            
                        });
                    });
                   
                  
                });
            });
            
           
        });
       
  
    });
}else if (bukawal=='edititem') {
        
    let cekdatatransaksi = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.idtransaksi}"`;
    let cekusernamex = database.query(cekdatatransaksi, (err, resultsdata) => {
        if (resultsdata.length <= 0) {
            parentPort.postMessage({ status: 404, texts: "no data"});
        }else{
            var platformdata;
            var itemsdata;
            var colorvariantdata;
        
            let cekplatform = `SELECT * FROM platform`;
            let finisambilplatform = database.query(cekplatform, (err, results) => {
                platformdata=results;
                let cekitems = `SELECT * FROM databaseallitem ORDER BY product ASC`;
                let finisambilitem = database.query(cekitems, (err, results1) => {
                    itemsdata=results1;
                    let cekcolorvarian = `SELECT * FROM databasecolorvariant`;
                    let finisambilcolorvarian = database.query(cekcolorvarian, (err, results2) => {
                        colorvariantdata=results2;
                        parentPort.postMessage({ status: 200, texts: "ada data",datatransaksi:resultsdata[0],datadropdown:{ platformdata,itemsdata,colorvariantdata }});
                        // Menutup koneksi setelah query selesai
                        closedatabase();
                    });
                   
                });
               
          
            });
           
        }
    });
}else if (bukawal=='cekidtransaksi') {
    let cekusername = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            parentPort.postMessage({ icons: "error", texts: "No transaksi sudah digunakan", titles: "Oops ..." });
        }else{
            parentPort.postMessage({ icons: "success", texts: "", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabase();
    });
}else if (bukawal=='universals0') {
    let cekusername = `SELECT * FROM databaseallitem`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            console.log('opopop 1');
            var array=results;
            //var arraydata=workerData.dataambil;
            /* let cekusername1 = `SELECT * FROM admlistdata`;
            let cekusernamex1 = database.query(cekusername1, (err, results1) => {
                if (results1.length > 0) {
                    console.log('opopop 2');
                    for (let i = 0; i < results1.length; i++) {
                        const element = results1[i];
                        for (let j = 0; j < array.length; j++) {
                            const element1 = array[j];
                            if (element.item==element1.product) {
                                console.log('opopop 3');
                                let setnewdata = `UPDATE admlistdata SET stockprodukcode='${element1.stockprodukcode}' WHERE BINARY id_transaksi='${element.id_transaksi}'`;
                                let newdata = database.query(setnewdata, async (err, datax) => {
                                    // parentPort.postMessage({ status: 200,message:'sukses'});
                                    //console.log(err)
                                    if (results1.length<i+2) {
                                        parentPort.postMessage({ status: 200,message:'sukses'});
                                    }
                                    // Menutup koneksi setelah query selesai
                                    closedatabase();
                                });
                            }
                        }
                        
                    }
                }
                
            }); */
            

            /* for (let i = 0; i < array.length; i++) {
                const element = array[i].product;
                for (let j = 0; j < arraydata.length; j++) {
                    const elementdata = arraydata[j];
                    if (elementdata[0]==element) {
                        let setnewdata = `UPDATE databaseallitem SET stockprodukcode='${elementdata[2]!=""?"true":""}', fabric_size='${elementdata[3]}', nofabric_size='${elementdata[4]}', image='${elementdata[1]}' WHERE BINARY product='${element}'`;
                        let newdata = database.query(setnewdata, async (err, datax) => {});
                    }
                }
                
            } */
            //parentPort.postMessage({ status: 200,message:'sukses'});

            console.log(workerData.data)
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                for (let j = 0; j < workerData.data.length; j++) {
                    const element1 = workerData.data[j];
                    if (element.product==element1.product) {
                        let setnewdata = `UPDATE databaseallitem SET investor='${element1.investor}' WHERE BINARY product='${element.product}'`;
                        let newdata = database.query(setnewdata, async (err, datax) => {
                            if (j==array.length-1) {
                                parentPort.postMessage({ status: 200,message:'sukses'});
                            }
                        });
                    }
                }//price_fabric='${element1.price_fabric}', price_leather='${element1.price_leather}'
                
            }
           
        }else{
            parentPort.postMessage({ status: 400,message:'error[003]'});
            // Menutup koneksi setelah query selesai
            closedatabase();
        }
    });
    /* var datsx=[
        {
            itemlama:'AETHER',
            itembaru:'AETHER - STANDING'
        }, {
            itemlama:'AETHER SKY R100',
            itembaru:'AETHER - SKY R100'
        }, {
            itemlama:'AETHER SKY V1 ONYX BLACK',
            itembaru:'AETHER - SKY V1 ONYX BLACK'
        }, 
        {
            itemlama:'AETHERCLOUDK100',
            itembaru:'AETHER - CLOUD K100'
        }, 
        {
            itemlama:'AETHERCLOUDK60',
            itembaru:'AETHER - CLOUD K60'
        }, 
        {
            itemlama:'AETHERHILLK40',
            itembaru:'AETHER - HILL K40'
        }, 
        {
            itemlama:'Floodlight 10',
            itembaru:'AETHER - Track Light - Floodlight 10W'
        }, 
        {
            itemlama:'Floodlight 20',
            itembaru:'AETHER - Track Light - Floodlight 20W'
        }, 
        {
            itemlama:'Grille Lamp 12',
            itembaru:'AETHER - Track Light - Grille Lamp 12W'
        }, 
        {
            itemlama:'Grille Lamp 24',
            itembaru:'AETHER - Track Light - Grille Lamp 24W'
        }, 
        {
            itemlama:'I Connector',
            itembaru:'AETHER - Track Light - I Connector'
        }, 
        {
            itemlama:'Powersupply 100',
            itembaru:'AETHER - Track Light - Powersupply 100W'
        }, 
        {
            itemlama:'Track Rail',
            itembaru:'AETHER - Track Light - Track Rail'
        }, 
        {
            itemlama:'V90 Connector',
            itembaru:'AETHER - Track Light - V90 Connector'
        }, 
        {
            itemlama:'T Connector',
            itembaru:'AETHER - Track Light - T Connector'
        }, 
        {
            itemlama:'L Connector',
            itembaru:'AETHER - Track Light - L Connector'
        }, 
        {
            itemlama:'Powersupply 200',
            itembaru:'AETHER - Track Light - Powersupply 200W'
        }, 
        {
            itemlama:'Spotlight',
            itembaru:'AETHER - Track Light - Spotlight'
        }, 
        {
            itemlama:'AETHER SKY R150',
            itembaru:'AETHER - SKY R150'
        }, 
        {
            itemlama:'PLUS Connector',
            itembaru:'AETHER - Track Light - PLUS Connector'
        }, 
        {
            itemlama:'Folding 12 W ',
            itembaru:'AETHER - Track Light - Folding 12W'
        }, 
        {
            itemlama:'Folding 6 W ',
            itembaru:'AETHER - Track Light - Folding 6W'
        }, 
        {
            itemlama:'KO26 Connetor',
            itembaru:'AETHER - Track Light - K026 Connector'
        }, 
        {
            itemlama:'STORAGE TRAY - S',
            itembaru:'EACH - STORAGE TRAY - S'
        }, 
        {
            itemlama:'STORAGE TRAY-  M',
            itembaru:'EACH - STORAGE TRAY - M'
        }, 
        {
            itemlama:'STORAGE TRAY -  L',
            itembaru:'EACH - STORAGE TRAY -  L'
        }, 
        {
            itemlama:'DESSERT BOWL',
            itembaru:'EACH - DESSERT BOWL'
        }, 
        {
            itemlama:'CLOTHES HANGER',
            itembaru:'EACH - CLOTHES HANGER'
        }, 
        {
            itemlama:'BIDET SPRAY',
            itembaru:'EACH - BIDET SPRAY'
        }, 
        {
            itemlama:'FOLDING UMBRELLA',
            itembaru:'EACH - FOLDING UMBRELLA'
        }, 
        {
            itemlama:'TISSUE BOX ',
            itembaru:'EACH - TISSUE BOX '
        }, 
        {
            itemlama:'RAMEN BOWL - Sakura',
            itembaru:'EACH - RAMEN BOWL - Sakura'
        }, 
        {
            itemlama:'RAMEN BOWL - Wave',
            itembaru:'EACH - RAMEN BOWL - Wave'
        }, 
        {
            itemlama:'BED PILLOW',
            itembaru:'EACH - BED PILLOW'
        }, 
        {
            itemlama:'DRINKING GLASS',
            itembaru:'EACH - DRINKING GLASS'
        }, 
        {
            itemlama:'PLATE ',
            itembaru:'EACH - PLATE'
        }, 
        {
            itemlama:'TRASH BIN',
            itembaru:'EACH - TRASH BIN'
        }
    ];
    for (let i = 0; i < datsx.length; i++) {
        const element = datsx[i];
        let setnewdata = `UPDATE formstockcalculate SET item='${element.itembaru}' WHERE BINARY item='${element.itemlama}'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
           if (i+1==datsx.length) {
            parentPort.postMessage({ status: 200,message:'sukses'});
           }
        });
    } */
    
}else if (bukawal=='universals1'){
    /* var array=[
        {old:'AETHER Cloud M1',new:'AETHER - Cloud M1'},{old:'AETHER Cloud R7',new:'AETHER - Cloud R7 100'},{old:'AETHER Cloud RX7',new:'AETHER - Cloud RX7 100'},{old:'AETHER Sky B83',new:'AETHER - Sky B83'},{old:'AETHER Sky V2',new:'AETHER - Sky V2'},{old:'AETHER Sky Z1',new:'AETHER - Sky Z1'},
        {old:'VOID Cloud G1',new:'VOID - Cloud G1'},
        {old:'VOID Sky B10',new:'VOID -  Sky B10'},
        {old:'VOID Sky B29',new:'VOID - Sky B29'},
        {old:'VOID SKY B80',new:'VOID - Sky B80'},
        {old:'VOID Sky B9',new:'VOID - Sky B9'},
        {old:'VOID Sky W21',new:'VOID - Sky W21'}
    ]; */

    var array=[{"kode":1000,"keterangan":"CASH","note":""},{"kode":1010,"keterangan":"BCA GAHARA | 49 888 44444","note":4000},{"kode":1011,"keterangan":"BCA GETA | 4980392860","note":4000},{"kode":1012,"keterangan":"BCA GAYAHIDUP | 5010744000","note":4000},{"kode":1020,"keterangan":"BCA QUINTENSSENSIAL","note":4000},{"kode":1021,"keterangan":"BCA OPERASIONAL JANSEN | 4980211695","note":""},{"kode":1022,"keterangan":4980392859,"note":""},{"kode":1130,"keterangan":"MANDIRI GAHARA | 0700011851503","note":""},{"kode":1140,"keterangan":"TOKOPEDIA GAHARA","note":""},{"kode":1150,"keterangan":"","note":""},{"kode":1160,"keterangan":"BANK MANDIRI GAHARA | ","note":""},{"kode":1190,"keterangan":"CROSS ACCOUNT","note":"BERFUNGSI AGAR TIDAK DOUBLE PENCATATAN JIKA ADA PENGELUARAN DARI BANK KE KAS ATAU BANK LAIN (CROSSCEK)"},{"kode":1200,"keterangan":"ACCOUNT RECEIVABLE","note":"CUSTOMER BELI PEMBAYARANNYA FULL TAPI TEMPO"},{"kode":1210,"keterangan":"SHAREHOLDER RECEIVABLE","note":""},{"kode":1220,"keterangan":"EMPLOYEE RECEIVABLE","note":""},{"kode":1230,"keterangan":"OTHER ACCOUNT RECEIVABLE","note":"CONTOH : KELEBIHAN BAYAR PPH 21 KARYAWAN"},{"kode":1300,"keterangan":"PREPAID RENTAL","note":"SEWA GEDUNG DLL"},{"kode":1310,"keterangan":"PREPAID INSURANCE","note":"ASURANSI UNTUK 1 TAHUN"},{"kode":1320,"keterangan":"PREPAID EXPENSES","note":"BIAYA PENGELUARAN DIMUKA"},{"kode":1330,"keterangan":"ADVANCED PAYMENT","note":"DP PEMBELIAN KE VENDOR"},{"kode":1340,"keterangan":"PREPAID ADVERTISING","note":""},{"kode":1350,"keterangan":"PREPAID TAXES","note":""},{"kode":1400,"keterangan":"RAW MATERIALS INVENTORIES","note":""},{"kode":1410,"keterangan":"WORK IN PROCESS INVENTORIES","note":""},{"kode":1420,"keterangan":"FINISHED GOODS INVENTORIES","note":""},{"kode":1500,"keterangan":"BUILDING","note":""},{"kode":1501,"keterangan":"ACCUMULATED DEPRECIATION OF BUILDING","note":""},{"kode":1510,"keterangan":"VEHICLE","note":""},{"kode":1511,"keterangan":"ACCUMULATED DEPRECIATION OF VEHICLE","note":""},{"kode":1520,"keterangan":"OFFICE EQUIPMENT","note":"office equipment under 1 million noted into supplies expenses"},{"kode":1521,"keterangan":"ACCUMULATED DEPRECIATION OF OFFICE EQUIPMENT","note":""},{"kode":1530,"keterangan":"MACHINARY","note":"machinary under 1 million noted into supplies expenses"},{"kode":1531,"keterangan":"ACCUMULATED DEPRECIATION OF MACHINARY","note":""},{"kode":2001,"keterangan":"ACCOUNT PAYABLES","note":"HUTANG KE VENDOR/DAGANG"},{"kode":2101,"keterangan":"SHAREHOLDER PAYABLES","note":"HUTANG KE PEMEGANG SAHAM"},{"kode":2201,"keterangan":"ADVANCE SALES","note":"DP PENJUALAN OLEH CUSTOMER"},{"kode":2301,"keterangan":"SALARIES PAYABLES","note":"HUTANG  PEMBAYARAN GAJI"},{"kode":2401,"keterangan":"ACCRUED EXPENSES","note":"CONTOH : PENCATATAN HUTANG LISTRIK AIR TELP DI AKHIR TAHUN"},{"kode":2501,"keterangan":"TAXES PAYABLES","note":"PPH BELUM TERBAYAR"},{"kode":2601,"keterangan":"VEHICLE LOAN","note":""},{"kode":2611,"keterangan":"OFFICE EQUIPMENT LOAN","note":""},{"kode":2621,"keterangan":"MACHINARY LOAN","note":""},{"kode":2701,"keterangan":"BANK LOAN","note":""},{"kode":3000,"keterangan":"CAPITAL STOCK","note":""},{"kode":3100,"keterangan":"RETAINED EARNINGS","note":""},{"kode":3200,"keterangan":"EARNING OF THE YEAR","note":""},{"kode":4000,"keterangan":"SALES","note":""},{"kode":4010,"keterangan":"SALES DISCOUNT","note":""},{"kode":5001,"keterangan":"COST OF GOODS SOLD (COGS)","note":""},{"kode":5101,"keterangan":"LABOR SALARIES EXPENSES","note":"gaji karyawan pabrik berhubungan langsung dengan proses produksi"},{"kode":5201,"keterangan":"INCOMING FREIGHT & PACKING COST","note":"Biaya ongkos kirim & packing pembelian barang (material)"},{"kode":5301,"keterangan":"INDIRECT LABOR SALARIES EXPENSES","note":"gaji karyawan pabrik tp tidak berhubungan langsung dengan proses produksi contoh pengawas, satpam, ob"},{"kode":5401,"keterangan":"FACTORY & LAND RENTAL EXPENSES","note":""},{"kode":5501,"keterangan":"FACTORY UTILITIES EXPENSES","note":"AIR, LISTRIK, TELEPON, INTERNET CIRENDEU & JEPARA"},{"kode":6001,"keterangan":"MARKETPLACE COMMISSION EXPENSES","note":""},{"kode":6101,"keterangan":"ADVERTISE AND PROMOTION EXPENSES","note":""},{"kode":6111,"keterangan":"ENTERTAINTMENT EXPENSES","note":""},{"kode":6121,"keterangan":"MEETING / TRAINING / SEMINAR EXPENSES","note":""},{"kode":6131,"keterangan":"COMMUNICATION EXPENSES","note":""},{"kode":6141,"keterangan":"SUPPLIES EXPENSES","note":"contoh seragam safety, mesin & peralatan yang harganya dibawah 1jt"},{"kode":6151,"keterangan":"TRAVEL AND TRANSPORTATION EXPENSES","note":""},{"kode":6161,"keterangan":"VEHICLE MAINTENANCE EXPENSES","note":""},{"kode":6171,"keterangan":"MACHINARY MAINTENANCE EXPENSES","note":""},{"kode":6181,"keterangan":"STORE RENTAL EXPENSES","note":""},{"kode":6191,"keterangan":"STORE UTILITIES EXPENSES","note":"AIR, LISTRIK, TELEPON, INTERNET CLASSY"},{"kode":6192,"keterangan":"FREIGHT & PACKING EXPENSES","note":"Biaya ongkos kirim & packing pengiriman barang ke customer"},{"kode":6201,"keterangan":"ADMINISTRATION SALARIES EXPENSES","note":"Gaji karyawan yang tidak berhubungan dengan proses produksi contoh admin, pm, procurement, finance, ob dikantor"},{"kode":6211,"keterangan":"OFFICE BUILDING RENTAL EXPENSES","note":""},{"kode":6221,"keterangan":"OFFICE UTILITIES EXPENSES","note":"AIR, LISTRIK, TELEPON, INTERNET GIA"},{"kode":6231,"keterangan":"BUILDING MAINTENANCE EXPENSES","note":""},{"kode":6241,"keterangan":"OFFICE EQUIPMENT MAINTENANCE EXPENSES","note":""},{"kode":6251,"keterangan":"HOUSEHOLD EXPENSES","note":""},{"kode":6261,"keterangan":"POS & STATIONARY EXPENSES","note":""},{"kode":6271,"keterangan":"LEGAL & ADMINISTRATION EXPENSES","note":""},{"kode":6281,"keterangan":"INSURANCE EXPENSES","note":""},{"kode":6291,"keterangan":"INTEREST LOAN EXPENSES","note":""},{"kode":6301,"keterangan":"BUILDING DEPRECIATION EXPENSES","note":""},{"kode":6311,"keterangan":"VEHICLE DEPRECIATION EXPENSES","note":""},{"kode":6321,"keterangan":"OFFICE EQUIPMENT DEPRECIATION EXPENSES","note":""},{"kode":6331,"keterangan":"MACHINARY DEPRECIATION EXPENSES","note":""},{"kode":6411,"keterangan":"BANK ADMINISTRATION EXPENSES","note":""},{"kode":6511,"keterangan":"OTHER EXPENSES","note":""},{"kode":7000,"keterangan":"OTHER INCOME","note":"penerimaan ongkir, packing & custom dari customer (extra charge)"},{"kode":7100,"keterangan":"INTEREST INCOME","note":""},{"kode":7200,"keterangan":"INTEREST EXPENSES","note":""}];
/* 
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        //
        //UPDATE nama_tabel SET keterangan = REPLACE(keterangan, 'abon', 'kerbau') WHERE keterangan LIKE '%abon%';
        //`UPDATE databaseallitem SET product='${element.new}' WHERE BINARY product='${element.old}'`
        let setnewdata = `UPDATE formstockcalculate SET keterangan = REPLACE(keterangan, '${element.old}', '${element.new}') WHERE keterangan LIKE '%${element.old}%'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
            if (i==array.length-1) {
                parentPort.postMessage({ status: 200,message:'sukses'});
                closedatabase();
            }
        });
        let setnewdata = "INSERT INTO databaseitem_proc SET ?";
        let newdata = database.query(setnewdata, element,async (err, datax3) => {
            if (err) {
                parentPort.postMessage({ status: 500,message:JSON.stringify(err)});
                closedatabase();
            }else{
                if (i==array.length-1) {
                    parentPort.postMessage({ status: 200,message:'sukses'});
                closedatabase();
                }
            }
        });
    } */
   


    // Jalankan proses insert
    batchInsert(array, (err, message) => {
        if (err) {
            console.error("Gagal insert:", err);
            parentPort?.postMessage({ status: 500, message: JSON.stringify(err) });
        } else {
            console.log(message);
            parentPort?.postMessage({ status: 200, message: message });
        }
    });
}else if (bukawal=='universals'){
    isikodewarna();
    
}

function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    database.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

function closedatabsase() {
    // Menutup koneksi setelah query selesai
    closedatabase();
}
////////////////////////////////////////////////////////
async function updateDetails() {
  const resultLog = {
    updated: [],
    failed: [],
    error: null
  };

  try {
    const investorRows = await queryPromise('SELECT product, investor_mj FROM databaseallitem');
    const investorMap = {};
    investorRows.forEach(row => {
      investorMap[row.product] = row.investor_mj || null;
    });

    const financeRows = await queryPromise('SELECT no, details FROM finance_banklimbo');

    for (const row of financeRows) {
      let details;
      try {
        details = JSON.parse(row.details);
      } catch (e) {
        resultLog.failed.push({ no: row.no, reason: 'JSON Parse Error' });
        continue;
      }

      const updatedDetails = details.map(item => ({
        ...item,
        investor_mj: investorMap[item.item] || null
      }));

      try {
        await queryPromise('UPDATE finance_banklimbo SET details = ? WHERE no = ?', [
          JSON.stringify(updatedDetails),
          row.no
        ]);
        resultLog.updated.push(row.no);
      } catch (e) {
        resultLog.failed.push({ no: row.no, reason: 'Update Error', error: e.message });
      }
    }

    closedatabase();
    parentPort.postMessage({
      status: 200,
      message: 'Update selesai',
      result: resultLog
    });

  } catch (err) {
    closedatabase();
    parentPort.postMessage({
      status: 500,
      message: 'Terjadi kesalahan utama',
      error: err.message
    });
  }
}

async function updaterefbuy() {
     let setnewdata = await queryPromise(`UPDATE databaseallitem SET stockproduk_refbuy='0' WHERE BINARY stockprodukcode='true'`);
    //let setnewdata = `UPDATE databaseallitem SET stockproduk_refbuy='120' WHERE BINARY stockprodukcode='true'`;
    /* let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            parentPort.postMessage({ status: 200,message:'sukses'});
        }
    }); */
    parentPort.postMessage({ status: 200,message:'sukses'});
    closedatabsase();
}

async function isikodewarna() {
    const colorvariantdata = await queryPromise(`SELECT * FROM databasecolorvariant`);

    for (let i = 0; i < colorvariantdata.length; i++) {
        const element = colorvariantdata[i];
        var kodekain=generateColorCode(element.colorvariant);
        if (kodekain!='') {
            let setnewdata = await queryPromise(`UPDATE databasecolorvariant SET kodekain='${kodekain}' WHERE BINARY colorvariant='${element.colorvariant}'`);
        }
    }
    parentPort.postMessage({ status: 200,message:'sukses'});
    closedatabsase();
    //
}

function generateColorCode(namakain) {
    const [leftPart] = namakain.split('|'); // Ambil bagian kiri sebelum "|"
    const words = leftPart.trim().split(' ');

    if (namakain.startsWith('FABRIC VIENNA')) {
        // Ambil semua kata setelah "FABRIC VIENNA"
        const color = words.slice(2).join(' ');
        return `Fabric-${color.trim()}`;
    } else if (namakain.startsWith('CHEROKEE')) {
        // Ambil semua kata setelah "CHEROKEE" tapi sebelum kode angka
        const withoutPrefix = words.slice(1); // ambil setelah CHEROKEE
        // buang kata-kata angka seperti 5203, 5202 dsb
        const colorWords = withoutPrefix.filter(w => isNaN(w));
        const color = colorWords.join(' ');
        return `Faux-${color.trim()}`;
    }

    return '';
}

function updatehargakain() {
    var dataproduk=[{"produk":"ASTRAL 1 Seater","size1":3.5,"size2":3.5,"price_fabric":200000,"price_leather":200000,"power":13,"":""},{"produk":"ASTRAL 2 Seaters","size1":4.5,"size2":4.5,"price_fabric":325000,"price_leather":325000,"power":12,"":""},{"produk":"ASTRAL 3 Seaters","size1":5.5,"size2":5.5,"price_fabric":475000,"price_leather":475000,"power":12,"":""},{"produk":"CAMEO","size1":8,"size2":8,"price_fabric":700000,"price_leather":700000,"power":7,"":""},{"produk":"CANIS","size1":6,"size2":6,"price_fabric":250000,"price_leather":250000,"power":30,"":""},{"produk":"CUBIX 1 Seater AC - Gelap","size1":1.5,"size2":1.5,"price_fabric":80000,"price_leather":80000,"power":30,"":""},{"produk":"CUBIX 1 Seater AC - Terang","size1":1.5,"size2":1.5,"price_fabric":80000,"price_leather":80000,"power":30,"":""},{"produk":"CUBIX 1 Seater AL - Gelap","size1":1.5,"size2":1.5,"price_fabric":80000,"price_leather":80000,"power":30,"":""},{"produk":"CUBIX 1 Seater AL - Terang","size1":1.5,"size2":1.5,"price_fabric":80000,"price_leather":80000,"power":30,"":""},{"produk":"CUBIX 1 Seater Ottoman - Gelap","size1":0.75,"size2":0.75,"price_fabric":50000,"price_leather":50000,"power":30,"":""},{"produk":"CUBIX 1 Seater Ottoman - Terang","size1":0.75,"size2":0.75,"price_fabric":50000,"price_leather":50000,"power":30,"":""},{"produk":"CUBIX 2 Seaters AC AC - Gelap","size1":3,"size2":3,"price_fabric":160000,"price_leather":160000,"power":20,"":""},{"produk":"CUBIX 2 Seaters AC AC - Terang","size1":3,"size2":3,"price_fabric":160000,"price_leather":160000,"power":20,"":""},{"produk":"CUBIX 3 Seaters AC AL AC - Gelap","size1":4.5,"size2":4.5,"price_fabric":240000,"price_leather":240000,"power":10,"":""},{"produk":"CUBIX 3 Seaters AC AL AC - Terang","size1":4.5,"size2":4.5,"price_fabric":240000,"price_leather":240000,"power":10,"":""},{"produk":"CUBIX Bantal Besar","size1":1,"size2":1,"price_fabric":15000,"price_leather":15000,"power":50,"":""},{"produk":"CUBIX Bantal Kecil","size1":0.5,"size2":0.5,"price_fabric":15000,"price_leather":15000,"power":50,"":""},{"produk":"CUBIX Bantal Set","size1":1,"size2":1,"price_fabric":30000,"price_leather":30000,"power":30,"":""},{"produk":"EORDE","size1":6.5,"size2":6.5,"price_fabric":250000,"price_leather":250000,"power":5,"":""},{"produk":"GUISE 1 Seater","size1":3.5,"size2":4,"price_fabric":250000,"price_leather":275000,"power":12,"":""},{"produk":"GUISE 2 Seaters","size1":4,"size2":4,"price_fabric":350000,"price_leather":400000,"power":15,"":""},{"produk":"GUISE 3 Seaters","size1":6.5,"size2":6.5,"price_fabric":600000,"price_leather":675000,"power":10,"":""},{"produk":"GUISE KYRIOS 3 Seater","size1":7.5,"size2":7.5,"price_fabric":600000,"price_leather":600000,"power":5,"":""},{"produk":"GUISE SET","size1":10,"size2":10,"price_fabric":950000,"price_leather":1075000,"power":8,"":""},{"produk":"HODOU","size1":5.5,"size2":6,"price_fabric":700000,"price_leather":700000,"power":20,"":""},{"produk":"NORA Bar Stool","size1":1,"size2":1,"price_fabric":55000,"price_leather":55000,"power":20,"":""},{"produk":"NORA Dining Chair","size1":1,"size2":1,"price_fabric":55000,"price_leather":55000,"power":20,"":""},{"produk":"RHOMBIO","size1":3,"size2":3,"price_fabric":180000,"price_leather":180000,"power":12,"":""},{"produk":"SOMNO 120cm - FINO","size1":5.5,"size2":5.5,"price_fabric":225000,"price_leather":225000,"power":12,"":""},{"produk":"SOMNO 120cm - VIENNA","size1":5,"size2":5,"price_fabric":225000,"price_leather":225000,"power":12,"":""},{"produk":"SOMNO 160cm - FINO","size1":6.25,"size2":6.25,"price_fabric":225000,"price_leather":225000,"power":12,"":""},{"produk":"SOMNO 160cm - VIENNA","size1":5.75,"size2":5.75,"price_fabric":225000,"price_leather":225000,"power":12,"":""},{"produk":"SOMNO 180cm - FINO","size1":6.5,"size2":6.5,"price_fabric":250000,"price_leather":250000,"power":12,"":""},{"produk":"SOMNO 180cm - VIENNA","size1":6.25,"size2":6.25,"price_fabric":250000,"price_leather":250000,"power":12,"":""},{"produk":"SOMNO 200cm - FINO","size1":7,"size2":7,"price_fabric":250000,"price_leather":250000,"power":12,"":""},{"produk":"SOMNO 200cm - VIENNA","size1":6.5,"size2":6.5,"price_fabric":250000,"price_leather":250000,"power":12,"":""},{"produk":"SOMNO 90cm - FINO","size1":5,"size2":5,"price_fabric":225000,"price_leather":225000,"power":12,"":""},{"produk":"SOMNO 90cm - VIENNA","size1":4.5,"size2":4.5,"price_fabric":225000,"price_leather":225000,"power":12,"":""},{"produk":"TESSE","size1":1,"size2":1,"price_fabric":50000,"price_leather":50000,"power":30,"":""},{"produk":"RHOMBIO LOW","size1":1,"size2":1,"price_fabric":60000,"price_leather":60000,"power":30,"":""},{"produk":"RHOMBIO MID","size1":1,"size2":1,"price_fabric":60000,"price_leather":60000,"power":30,"":""},{"produk":"RHOMBIO HIGH","size1":1,"size2":1,"price_fabric":60000,"price_leather":60000,"power":30,"":""},{"produk":"RHOMBIO SET","size1":3,"size2":3,"price_fabric":180000,"price_leather":180000,"power":12,"":""},{"produk":"VISS R1","size1":"","size2":"","price_fabric":"","price_leather":"","power":"","":""},{"produk":"VISS R2","size1":"","size2":"","price_fabric":"","price_leather":"","power":"","":""},{"produk":"VISS R3","size1":"","size2":"","price_fabric":"","price_leather":"","power":"","":""},{"produk":"ORYCTO - NIMBUS","size1":7,"size2":7,"price_fabric":500000,"price_leather":500000,"power":7,"":""},{"produk":"CUSTOM UPHOLSTERY","size1":1,"size2":1,"price_fabric":0,"price_leather":0,"power":"","":""},{"produk":"GUISE KYRIOS 1 Seater","size1":4.5,"size2":4.5,"price_fabric":300000,"price_leather":300000,"power":10,"":""},{"produk":"AJMAZRIA","size1":"","size2":"","price_fabric":"","price_leather":"","power":"","":""},{"produk":"CABALLUS 1 Seater","size1":6,"size2":6,"price_fabric":350000,"price_leather":350000,"power":7,"":""},{"produk":"CABALLUS 3 Seaters","size1":8,"size2":8,"price_fabric":800000,"price_leather":800000,"power":5,"":""},{"produk":"ASHARA 34 - Adjustable Bed","size1":"","size2":"","price_fabric":"","price_leather":"","power":"","":""},{"produk":"ASHARA 54 - Nightstand","size1":"","size2":"","price_fabric":"","price_leather":"","power":"","":""},{"produk":"EORDE - Sofa Sectional - 5 + 2","size1":"","size2":"","price_fabric":"","price_leather":"","power":"","":""},{"produk":"EORDE - Sofa Sectional -  Armless","size1":4,"size2":4,"price_fabric":350000,"price_leather":350000,"power":3,"":""},{"produk":"EORDE - Sofa Sectional - Corner","size1":6.5,"size2":6.5,"price_fabric":500000,"price_leather":500000,"power":3,"":""},{"produk":"EORDE - Sofa Sectional - Chaise","size1":"","size2":"","price_fabric":450000,"price_leather":450000,"power":3,"":""},{"produk":"EORDE - Sofa Sectional - Side","size1":4.5,"size2":4.5,"price_fabric":400000,"price_leather":400000,"power":3,"":""},{"produk":"EORDE - Sofa Sectional - Side Machine","size1":4.5,"size2":4.5,"price_fabric":400000,"price_leather":400000,"power":3,"":""},{"produk":"SOMNO BED PILLOW - Standar Lite","size1":0.75,"size2":"","price_fabric":20000,"price_leather":20000,"power":40,"":""},{"produk":"SOMNO BED PILLOW - Standar","size1":0.75,"size2":"","price_fabric":20000,"price_leather":20000,"power":40,"":""},{"produk":"SOMNO BED PILLOW - Standar Plus","size1":0.75,"size2":"","price_fabric":20000,"price_leather":20000,"power":40,"":""},{"produk":"SOMNO BED PILLOW - King Lite","size1":1,"size2":"","price_fabric":20000,"price_leather":20000,"power":40,"":""},{"produk":"SOMNO BED PILLOW - King","size1":1,"size2":"","price_fabric":20000,"price_leather":20000,"power":40,"":""},{"produk":"SOMNO BED PILLOW - King Plus","size1":1,"size2":"","price_fabric":20000,"price_leather":20000,"power":40,"":""},{"produk":"CAPRA DELUXE - 3 Seater ","size1":"S 4 K 6","size2":10,"price_fabric":795000,"price_leather":795000,"power":5,"":""},{"produk":"CAPRA DELUXE - 2 Seater ","size1":"S 3.5 K 4","size2":7.5,"price_fabric":480000,"price_leather":480000,"power":6,"":""},{"produk":"CAPRA DELUXE - 1 Seater ","size1":"S2.75 K2.5","size2":5.25,"price_fabric":300000,"price_leather":300000,"power":7,"":""},{"produk":"CAPRA DELUXE - Ottoman","size1":"S0.75 k2.25","size2":3,"price_fabric":150000,"price_leather":150000,"power":10,"":""},{"produk":"CAPRA SIGNATURE - 3 Seater","size1":"4/4.5","size2":8.5,"price_fabric":645000,"price_leather":645000,"power":5,"":""},{"produk":"CAPRA SIGNATURE - 2 Seater","size1":"3.25/3.5","size2":6.75,"price_fabric":430000,"price_leather":430000,"power":6,"":""},{"produk":"CAPRA SIGNATURE - 1 Seater","size1":"2.5/2.5","size2":5,"price_fabric":280000,"price_leather":280000,"power":7,"":""}];

    for (let i = 0; i < dataproduk.length; i++) {
        const element = dataproduk[i];
        let setnewdata = `UPDATE databaseallitem SET price_fabric='${element.price_fabric}',price_leather='${element.price_leather}' WHERE BINARY product='${element.produk}'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
            if (i==dataproduk.length-1) {
                parentPort.postMessage({ status: 200,message:'sukses'});
            }
        });
        
    }
}

function getMonthLetter() {
    const letters = "ABCDEFGHIJKL"; // A - Januari, B - Februari, ..., L - Desember
    const monthIndex = new Date().getMonth(); // 0 (Januari) hingga 11 (Desember)
    return letters[monthIndex];
}
// Fungsi untuk mendapatkan huruf acak dari a-z
function getRandomLetter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters[Math.floor(Math.random() * letters.length)];
}


////

function getKeysFromFirstItem(arr) {
    return Object.keys(arr[0]);
}

function batchInsert(dataArray, callback) {
    const keys = getKeysFromFirstItem(dataArray);
    const placeholders = `(${keys.map(() => '?').join(',')})`;
    const sql = `INSERT INTO database_coa (${keys.join(',')}) VALUES `;

    let i = 0;
    function insertNextBatch() {
        if (i >= dataArray.length) {
            closedatabase();
            callback(null, "Selesai insert semua data.");
            return;
        }

        const batch = dataArray.slice(i, i + BATCH_SIZE);
        const values = batch.map(obj => keys.map(k => obj[k]));
        const allValues = [].concat(...values); // Flatten

        const batchSQL = sql + batch.map(() => placeholders).join(',');

        database.query(batchSQL, allValues, (err, result) => {
            if (err) {
                callback(err);
                closedatabase();
                return;
            }
            i += BATCH_SIZE;
            insertNextBatch();
        });
    }

    insertNextBatch();
}


function closedatabase() {
    /* database.release((closeErr) => {
        if (closeErr) {
            console.error('Error closing connection:', closeErr);
        } else {
            console.log('Database connection closed');
        }
    }); */
}