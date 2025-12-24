import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';
import {savenotif} from './utilities/savenotifikasi.js';

console.log(workerData.data.id_transaksi);
saveadd();
//stockuses
function runsave() {
    // Fungsi untuk mendapatkan huruf berdasarkan bulan (A-L)
    var newdata1=workerData.data;
    var date_history = new Date(newdata1.tglinputmili);
    var day_history = ("0" + (date_history.getDate())).slice(-2);
    var month_history = ("0" + (date_history.getMonth() + 1)).slice(-2);//d.getMonth()+1;
    var hour_history = ("0" + (date_history.getHours())).slice(-2);
    var minutes_history = ("0" + (date_history.getMinutes())).slice(-2);
    var year_history = date_history.getFullYear();

    var fixdatejam_history = day_history+"/"+month_history+"/"+year_history +` ${hour_history}:${minutes_history}`;

    console.log(fixdatejam_history);

    let cekusername = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            console.log('por 1');
            const year = new Date().getFullYear();
            const monthLetter = getMonthLetter();
            
            // Ambil ID terakhir dari database
            let xxcc = database.query("SELECT id_transaksi FROM admlistdata WHERE id_transaksi LIKE ? ORDER BY id_transaksi ASC", [`${monthLetter}%-${year}`], (err, resultsc) => {

                //let newNumber = "001";
                /* if (resultsc.length > 0) {
                    const lastId = resultsc[0].id_transaksi; // Contoh: A023-2025
                    const lastNumber = parseInt(lastId.substring(1, 4)); // Ambil angka 023
                    newNumber = String(lastNumber + 1).padStart(3, "0"); // Tambah 1 dan format ke 3 digit 
                    
                } 

                
                
                const newId = `${monthLetter}${newNumber}-${year}`;
                
                newdata1.id_transaksi=newId
                newdata1.no_transaksi=`${monthLetter}${newNumber}`;*/

                let lastNumber = 0;
                let lastLetter = "";
                const idSet = new Set(resultsc.map(row => row.id_transaksi));
                
                resultsc.forEach(row => {
                    const match = row.id_transaksi.match(/([A-L])(\d{3})([a-z]?)-\d{4}/);
                    if (match) {
                        const num = parseInt(match[2]);
                        const letter = match[3] || "";
                        if (num > lastNumber) {
                            lastNumber = num;
                            lastLetter = letter;
                        } else if (num === lastNumber && letter > lastLetter) {
                            lastLetter = letter;
                        }
                    }
                });
                
                let newNumber = String(lastNumber).padStart(3, "0");
                let newLetter = getNextLetter(lastLetter);
                let newId = `${monthLetter}${newNumber}${newLetter ? newLetter : ""}-${year}`;
                
                // Jika ID sudah ada, teruskan dengan huruf tambahan
                while (idSet.has(newId) && newLetter) {
                    newLetter = getNextLetter(newLetter);
                    if (!newLetter) {
                        newNumber = String(parseInt(newNumber) + 1).padStart(3, "0");
                        newLetter = "";
                    }
                    newId = `${monthLetter}${newNumber}${newLetter ? newLetter : ""}-${year}`;
                }

                newdata1.id_transaksi=newId
                newdata1.no_transaksi=`${newId.split('-')[0]}`;

                let setnewdata = "INSERT INTO admlistdata SET ?";
                let newdata = database.query(setnewdata, newdata1, async (err, datax) => {

                
                    var getuser=JSON.parse(newdata1.history);
                    var datastocks={
                        tgl_input_mili:newdata1.tglinputmili,
                        tanggal:day_history+"/"+month_history+"/"+year_history,
                        tanggal_jam:fixdatejam_history,
                        bulan:newdata1.bulan,
                        tahun:newdata1.tahun,
                        item:newdata1.item,
                        qty:newdata1.qty,
                        inorout:'out',
                        user:getuser[0].user,
                        keterangan:`penjualan no ${newdata1.no_transaksi} [-sell08989]`,
                        fotoorvideolink:'',
                        ref_old:'',
                        ref_now:''
                    };

                    if (workerData.stockprodukcode=='true') {
                        let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                        let newdata3 = database.query(setnewdata3, datastocks, async (err, datax3) => {
                            parentPort.postMessage({ icons: "success", texts:`Add item sukses, dengan No transaksi baru ${newdata1.no_transaksi}`, titles: "" });
                            // Menutup koneksi setelah query selesai
                            /* database.end((closeErr) => {
                                if (closeErr) {
                                    console.error('Error closing connection:', closeErr);
                                } else {
                                    console.log('Database connection closed');
                                }
                            }); */
                        });
                    } else {
                        parentPort.postMessage({ icons: "success", texts:`Add item sukses, dengan No transaksi baru ${newdata1.no_transaksi}`, titles: "" });
                        // Menutup koneksi setelah query selesai
                        /* database.end((closeErr) => {
                            if (closeErr) {
                                console.error('Error closing connection:', closeErr);
                            } else {
                                console.log('Database connection closed');
                            }
                        }); */
                    } 
                        //parentPort.postMessage({ icons: "success", texts:`Add item sukses, dengan No transaksi baru ${monthLetter}${newNumber}`, titles: "" });
                   
                });

                //parentPort.postMessage({ icons: "error[01]", texts: `Add item sukses, dengan No transaksi baru ${newId}`, titles: "Oops ..." });

            });
            
          
        }else{
            
            console.log('por 2');
            var getuser=JSON.parse(newdata1.history);
            var datastocks={
                tgl_input_mili:newdata1.tglinputmili,
                tanggal:day_history+"/"+month_history+"/"+year_history,
                tanggal_jam:fixdatejam_history,
                bulan:newdata1.bulan,
                tahun:newdata1.tahun,
                item:newdata1.item,
                qty:newdata1.qty,
                inorout:'out',
                user:`${getuser[0].user}`,
                keterangan:`penjualan no ${newdata1.no_transaksi} [-sell08989]`,
                fotoorvideolink:'',
                ref_old:'',
                ref_now:''
            };
            console.log(datastocks)
            console.log(getuser[0].user)

            let setnewdata = "INSERT INTO admlistdata SET ?";
            let newdata = database.query(setnewdata, workerData.data, async (err, datax) => {
               //console.log('stockprodukcode === '+workerData.stockprodukcode)
               console.log('=====================')
               
                if (workerData.stockprodukcode=='true') {
                    let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                    let newdata3 = database.query(setnewdata3, datastocks, async (err, datax3) => {
                        parentPort.postMessage({ icons: "success", texts: "Add item sukses", titles: "" });
                        // Menutup koneksi setelah query selesai
                        /* database.end((closeErr) => {
                            if (closeErr) {
                                console.error('Error closing connection:', closeErr);
                            } else {
                                console.log('Database connection closed');
                            }
                        }); */
                    });
                } else {
                    parentPort.postMessage({ icons: "success", texts: "Add item sukses", titles: "" });
                    // Menutup koneksi setelah query selesai
                    /* database.end((closeErr) => {
                        if (closeErr) {
                            console.error('Error closing connection:', closeErr);
                        } else {
                            console.log('Database connection closed');
                        }
                    }); */
                }
                    //parentPort.postMessage({ icons: "success", texts: "Add item sukses 2", titles: "" });
              
            });
        }
    });
}

var counter = 0;

async function saveadd() {
    counter = 0;
    var notif=[];
    workerData.data.forEach(data => {
        //var newdata1=workerData.data;
        var date_history = new Date(data.tglinputmili);
        var day_history = ("0" + (date_history.getDate())).slice(-2);
        var month_history = ("0" + (date_history.getMonth() + 1)).slice(-2);//d.getMonth()+1;
        var hour_history = ("0" + (date_history.getHours())).slice(-2);
        var minutes_history = ("0" + (date_history.getMinutes())).slice(-2);
        var year_history = date_history.getFullYear();

        var fixdatejam_history = day_history+"/"+month_history+"/"+year_history +` ${hour_history}:${minutes_history}`;

        ///
        
        // Asumsikan data.id_transaksi adalah input baru, contoh: "G003-2025" atau "G003a-2025"

        let idTransaksiLengkap = data.id_transaksi.trim();

        // 1. Ekstrak prefix utama (misalnya 'G003')
        let matchPrefix = idTransaksiLengkap.match(/[A-Z]\d+/);
        let prefixIdTransaksi;
        if (matchPrefix && matchPrefix.length > 0) {
            prefixIdTransaksi = matchPrefix[0];
        } else {
            console.error("Format id_transaksi tidak sesuai harapan (misal: HXXX-YYYY):", idTransaksiLengkap);
            return { success: false, message: "Format ID Transaksi tidak valid." };
        }

        // 2. Ekstrak tahun (misalnya '2025')
        let matchYear = idTransaksiLengkap.match(/(\d{4})$/);
        let yearTransaksi;
        if (matchYear && matchYear.length > 1) {
            yearTransaksi = matchYear[1];
        } else {
            console.error("Format tahun pada id_transaksi tidak sesuai harapan (YYYY):", idTransaksiLengkap);
            return { success: false, message: "Format tahun pada ID Transaksi tidak valid." };
        }

        console.log('Prefix yang diekstrak:', prefixIdTransaksi);
        console.log('Tahun yang diekstrak:', yearTransaksi);

        // 3. Tentukan apakah input saat ini adalah varian 'tanpa huruf' (e.g., 'G003-2025')
        const isPlainVersion = (idTransaksiLengkap === `${prefixIdTransaksi}-${yearTransaksi}`);
        console.log('4. isPlainVersion (apakah input plain?):', isPlainVersion);

        // 4. Buat kueri SQL dengan logika kondisional yang kompleks
        let cekusername;

        if (isPlainVersion) {
            // KASUS 1: Input adalah G003-2025 (varian "plain")
            // Memblokir jika ada G003-2025 (plain) ATAU G003a-2025 (dan varian huruf lainnya) di tahun yang sama.
            console.log('5. Membangun kueri untuk input PLAIN (misal G003-2025)');
            cekusername = `
                SELECT *
                FROM admlistdata
                WHERE
                    BINARY id_transaksi LIKE '${prefixIdTransaksi}%-${yearTransaksi}'
            `;
            // Kueri ini akan menemukan semua varian (plain atau berhuruf) dari prefix dan tahun yang sama.
            // Jika ada yang ditemukan, results.length > 0, dan G003-2025 akan diblokir.
        } else {
            // KASUS 2: Input adalah G003a-2025, G003b-2025, dst. (varian "berhuruf")
            console.log('5. Membangun kueri untuk input DENGAN HURUF TAMBAHAN (misal G003a-2025)');
            cekusername = `
                SELECT *
                FROM admlistdata
                WHERE
                    -- Aturan A: Blokir jika dirinya sendiri sudah ada
                    BINARY id_transaksi = '${idTransaksiLengkap}'
                    OR
                    -- Aturan B: Blokir jika varian PLAIN dari prefix yang sama sudah ada di tahun yang sama
                    (
                        BINARY id_transaksi = '${prefixIdTransaksi}-${yearTransaksi}' -- Cari G003-2025
                    )
            `;
            // Kita TIDAK menyertakan kondisi untuk memblokir oleh varian berhuruf lain (G003b-2025)
            // karena aturan C menyatakan itu tidak memblokir.
        }

        console.log('6. Kueri SQL Lengkap yang akan dijalankan:');
        console.log(cekusername);

        database.query(cekusername, async (err, results) => {
            if (err) {
                console.error('Query error:', err);
                var newnotifs={
                    id_transaksi:data.id_transaksi,
                    item:data.item,
                    colorvariant:data.colorvariant,
                    statussave:'gagal sistem error'
                };
                notif.push(newnotifs);
                checkDone(notif);
                //return;
            }
            console.log('results.length :', results.length);
            if (results.length > 0) {
                var newnotifs={
                    id_transaksi:data.id_transaksi,
                    item:data.item,
                    colorvariant:data.colorvariant,
                    statussave:'duplikat No Transaksi'
                };
                notif.push(newnotifs);
                checkDone(notif);
            }else{
                // Belum ada, insert
                console.log('por 2');
                var getuser=JSON.parse(data.history);
                var fmcgorupornot=0;// 0 fmcg c5, 1 up, 2 non
                var datastocks;
                if (data.stockprodukcode=='true') {
                    fmcgorupornot=0;
                    datastocks={
                        tgl_input_mili:data.tglinputmili,
                        tanggal:day_history+"/"+month_history+"/"+year_history,
                        tanggal_jam:fixdatejam_history,
                        bulan:data.bulan,
                        tahun:data.tahun,
                        item:data.item,
                        qty:data.qty,
                        inorout:'out',
                        user:`${getuser[0].user}`,
                        keterangan:`penjualan no ${data.no_transaksi} [-sell08989]`,
                        fotoorvideolink:'',
                        ref_old:'',
                        ref_now:''
                    };
                }else if (data.code2.toLowerCase()=='up'&&data.stockprodukcode!='true') {
                    fmcgorupornot=1;
                    
                    
                }else{
                    fmcgorupornot=2;
                }

                if (fmcgorupornot==0) {
                    //fmcg c5
                    let setnewdata = "INSERT INTO admlistdata SET ?";
                    let newdata =await database.query(setnewdata, data,async (err, datax3) => {
                        if (err) {
                            console.error('Gagal insert:');
                            var newnotifs={
                                id_transaksi:data.id_transaksi,
                                item:data.item,
                                colorvariant:data.colorvariant,
                                statussave:'gagal sistem error[2-1]'
                            };
                            notif.push(newnotifs);
                            checkDone(notif);
                        }else{
                            if (data.item=='AETHER - Track Light - L Connector'||data.item=='AETHER - Track Light - I Connector') {
                                console.log(data.item+' save stock');
                                var datastocks1=[
                                    {
                                    tgl_input_mili:data.tglinputmili,
                                    tanggal:day_history+"/"+month_history+"/"+year_history,
                                    tanggal_jam:fixdatejam_history,
                                    bulan:data.bulan,
                                    tahun:data.tahun,
                                    item:'AETHER - Track Light - Body Plain Connector',
                                    qty:parseInt(data.qty)*1,
                                    inorout:'out',
                                    user:`${getuser[0].user}`,
                                    keterangan:`penjualan no ${data.no_transaksi} [${data.item}]`,
                                    fotoorvideolink:'',
                                    ref_old:'',
                                    ref_now:''
                                    },
                                    {
                                    tgl_input_mili:data.tglinputmili,
                                    tanggal:day_history+"/"+month_history+"/"+year_history,
                                    tanggal_jam:fixdatejam_history,
                                    bulan:data.bulan,
                                    tahun:data.tahun,
                                    item:'AETHER - Track Light - Leg Connector',
                                    qty:parseInt(data.qty)*2,
                                    inorout:'out',
                                    user:`${getuser[0].user}`,
                                    keterangan:`penjualan no ${data.no_transaksi} [${data.item}]`,
                                    fotoorvideolink:'',
                                    ref_old:'',
                                    ref_now:''
                                    },
                                ];
                                stockconnector(datastocks1,data,notif);
                                
                            }
                            else if (data.item=='AETHER - Track Light - T Connector') {
                                console.log('AETHER - Track Light - T Connector save stock');
                                var datastocks1=[
                                    {
                                    tgl_input_mili:data.tglinputmili,
                                    tanggal:day_history+"/"+month_history+"/"+year_history,
                                    tanggal_jam:fixdatejam_history,
                                    bulan:data.bulan,
                                    tahun:data.tahun,
                                    item:'AETHER - Track Light - Body Plain Connector',
                                    qty:parseInt(data.qty)*1,
                                    inorout:'out',
                                    user:`${getuser[0].user}`,
                                    keterangan:`penjualan no ${data.no_transaksi} [${data.item}]`,
                                    fotoorvideolink:'',
                                    ref_old:'',
                                    ref_now:''
                                    },
                                    {
                                    tgl_input_mili:data.tglinputmili,
                                    tanggal:day_history+"/"+month_history+"/"+year_history,
                                    tanggal_jam:fixdatejam_history,
                                    bulan:data.bulan,
                                    tahun:data.tahun,
                                    item:'AETHER - Track Light - Leg Connector',
                                    qty:parseInt(data.qty)*3,
                                    inorout:'out',
                                    user:`${getuser[0].user}`,
                                    keterangan:`penjualan no ${data.no_transaksi} [${data.item}]`,
                                    fotoorvideolink:'',
                                    ref_old:'',
                                    ref_now:''
                                    },
                                ];
                                stockconnector(datastocks1,data,notif);
                                
                            }
                            else if (data.item=='AETHER - Track Light - PLUS Connector') {
                                console.log('AETHER - Track Light - PLUS Connector save stock');
                                var datastocks1=[
                                    {
                                    tgl_input_mili:data.tglinputmili,
                                    tanggal:day_history+"/"+month_history+"/"+year_history,
                                    tanggal_jam:fixdatejam_history,
                                    bulan:data.bulan,
                                    tahun:data.tahun,
                                    item:'AETHER - Track Light - Body Plain Connector',
                                    qty:parseInt(data.qty)*1,
                                    inorout:'out',
                                    user:`${getuser[0].user}`,
                                    keterangan:`penjualan no ${data.no_transaksi} [${data.item}]`,
                                    fotoorvideolink:'',
                                    ref_old:'',
                                    ref_now:''
                                    },
                                    {
                                    tgl_input_mili:data.tglinputmili,
                                    tanggal:day_history+"/"+month_history+"/"+year_history,
                                    tanggal_jam:fixdatejam_history,
                                    bulan:data.bulan,
                                    tahun:data.tahun,
                                    item:'AETHER - Track Light - Leg Connector',
                                    qty:parseInt(data.qty)*4,
                                    inorout:'out',
                                    user:`${getuser[0].user}`,
                                    keterangan:`penjualan no ${data.no_transaksi} [${data.item}]`,
                                    fotoorvideolink:'',
                                    ref_old:'',
                                    ref_now:''
                                    },
                                ];
                                stockconnector(datastocks1,data,notif);
                                
                            }
                            else if (data.item=='AETHER - Track Light - V90 Connector') {
                                console.log('AETHER - Track Light - V90 Connector save stock');
                                var datastocks1=[
                                    {
                                    tgl_input_mili:data.tglinputmili,
                                    tanggal:day_history+"/"+month_history+"/"+year_history,
                                    tanggal_jam:fixdatejam_history,
                                    bulan:data.bulan,
                                    tahun:data.tahun,
                                    item:'AETHER - Track Light - Body 90 Connector',
                                    qty:parseInt(data.qty)*1,
                                    inorout:'out',
                                    user:`${getuser[0].user}`,
                                    keterangan:`penjualan no ${data.no_transaksi} [${data.item}]`,
                                    fotoorvideolink:'',
                                    ref_old:'',
                                    ref_now:''
                                    },
                                    {
                                    tgl_input_mili:data.tglinputmili,
                                    tanggal:day_history+"/"+month_history+"/"+year_history,
                                    tanggal_jam:fixdatejam_history,
                                    bulan:data.bulan,
                                    tahun:data.tahun,
                                    item:'AETHER - Track Light - Leg Connector',
                                    qty:parseInt(data.qty)*2,
                                    inorout:'out',
                                    user:`${getuser[0].user}`,
                                    keterangan:`penjualan no ${data.no_transaksi} [${data.item}]`,
                                    fotoorvideolink:'',
                                    ref_old:'',
                                    ref_now:''
                                    },
                                ];
                                stockconnector(datastocks1,data,notif);
                                
                            }
                            else{
                                console.log('bukan konekstor');
                                let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                                let newdata3 = database.query(setnewdata3, datastocks, async (err, datax3) => {
                                    var fixnamaitem=data.item;

                                    if (err) {
                                        console.error('Gagal insert:');
                                        var newnotifs={
                                            id_transaksi:data.id_transaksi,
                                            item:data.item,
                                            colorvariant:data.colorvariant,
                                            statussave:'gagal simpan stock C5 [hubungi IT]'
                                        };
                                        notif.push(newnotifs);
                                        checkDone(notif);
                                    }
                                    else{
                                        var newnotifs={
                                            id_transaksi:data.id_transaksi,
                                            item:data.item,
                                            colorvariant:data.colorvariant,
                                            statussave:'sukses',
                                            stockprodukcode:data.stockprodukcode
                                        };
                                        notif.push(newnotifs);
                                        checkDone(notif);
                                    }
                                });
                            }
                        }
                    });

                }else if (fmcgorupornot==1) {
                    //up
                    var arraystokuse=JSON.parse(data.stockuses);
                    var stockkurangflag=0;//0 tidak kurang, 1 kurang
                    var statussave_stock='';
                    

                    if (arraystokuse.length>0) {
                        console.log('arraystokuse.length ----');
                        console.log(arraystokuse.length);

                        for (let i = 0; i < arraystokuse.length; i++) {
                            const elementstocks = arraystokuse[i];
                            console.log('cek stock up ----');

                            let cekstokup = `SELECT * FROM stockupholsterydatabase WHERE BINARY id_stock = '${elementstocks.id_stock}'`;
                            let cekstokupxx =database.query(cekstokup, async (err, resultscekstokup) => {
                                if (resultscekstokup.length > 0) {
                                    console.log('cek stock up ---- [2]');
                                    console.log(resultscekstokup[0].qty);

                                    console.log('cek stock up ---- [3]');
                                    console.log(elementstocks.qty_pakai);

                                    if (resultscekstokup[0].qty<elementstocks.qty_pakai) {
                                        
                                        stockkurangflag=1;
                                        if (statussave_stock=='') {
                                            statussave_stock=`stock ID : ${elementstocks.id_stock.split('-')[0]} kurang`;
                                        }else{
                                            statussave_stock=`${statussave_stock},stock ID : ${elementstocks.id_stock.split('-')[0]} kurang`;
                                        }
                                        console.log('cek stock up ---- [4]');
                                        console.log(statussave_stock);
                                    }
                                    if (i+1==arraystokuse.length) {
                                        if(stockkurangflag==0){
                                            /* var newnotifs={
                                                id_transaksi:data.id_transaksi,
                                                item:data.item,
                                                colorvariant:data.colorvariant,
                                                statussave:'sukses'
                                            };
                                            notif.push(newnotifs);
                                            checkDone(notif); */
                                            saveitemtodatabases(data,arraystokuse,getuser,notif);
                                        }
                                        else{
                                            console.log('cek stock up ---- [9999000]');
                                            var newnotifs={
                                                id_transaksi:data.id_transaksi,
                                                item:data.item,
                                                colorvariant:data.colorvariant,
                                                statussave:statussave_stock
                                            };
                                            notif.push(newnotifs);
                                            checkDone(notif);
                                        }
                                    }
                                    
                                    
                                }
                                return 'll';
                            });
                        }
                       /*  await arraystokuse.forEach(elementstocks => {
                           
                        }); */
                    }else{
                        savetanpastocks(data,notif);
                    }
                    console.log('cek stock up ---- [5]');
                    console.log(stockkurangflag);
                    
                    
                    
                    
                }else{
                    savetanpastocks(data,notif);
                }
                
                //console.log(datastocks);
                console.log(getuser[0].user);
            }
        });
    });
}

function stockconnector(datastocks1,data,notif1) {
    var notif=notif1;
    for (let i = 0; i < datastocks1.length; i++) {
        const element = datastocks1[i];
        let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
        let newdata3 = database.query(setnewdata3, element, async (err, datax3) => {
            //var fixnamaitem=data.item;

            if (err) {
                console.error('Gagal insert:');
                var newnotifs={
                    id_transaksi:data.id_transaksi,
                    item:data.item,
                    colorvariant:data.colorvariant,
                    statussave:'gagal simpan stock C5 [hubungi IT]'
                };
                if (i==1) {
                    notif.push(newnotifs);
                    checkDone(notif);
                }
            }
            else{
                var newnotifs={
                    id_transaksi:data.id_transaksi,
                    item:data.item,
                    colorvariant:data.colorvariant,
                    statussave:'sukses',
                    stockprodukcode:data.stockprodukcode
                };
                if (i==1) {
                    notif.push(newnotifs);
                    checkDone(notif);
                }
                
            }
        });
    }
}

async function savetanpastocks(data,notif2) {
    var notif=notif2;
    let setnewdata = "INSERT INTO admlistdata SET ?";
    let newdata =await database.query(setnewdata, data,async (err, datax3) => {
        if (err) {
            console.error('Gagal insert:');
            var newnotifs={
                id_transaksi:data.id_transaksi,
                item:data.item,
                colorvariant:data.colorvariant,
                statussave:'gagal sistem error[2-1]'
            };
            notif.push(newnotifs);
            checkDone(notif);
        }else{
            var newnotifs={
                id_transaksi:data.id_transaksi,
                item:data.item,
                colorvariant:data.colorvariant,
                statussave:'sukses',
                stockprodukcode:data.stockprodukcode
            };
            notif.push(newnotifs);
            checkDone(notif);
        }
    });
}

async function saveitemtodatabases(data,arraystokuse,getuser,notif2) {
    var notif=notif2;
    let setnewdata = "INSERT INTO admlistdata SET ?";
    let newdata =await database.query(setnewdata, data,async (err, datax3) => {
        if (err) {
            console.error('Gagal insert:');
            var newnotifs={
                id_transaksi:data.id_transaksi,
                item:data.item,
                colorvariant:data.colorvariant,
                statussave:'gagal sistem error[2]'
            };
            notif.push(newnotifs);
            checkDone(notif);
        }else{  

            if (arraystokuse.length>0){
                arraystokuse.forEach((itemstokis,indexzv) => {
                    var historys={
                        tglinputmili:data.tglinputmili,
                        namalengkap:getuser[0].user,
                        username:itemstokis.username,
                        tindakan:`${data.no_transaksi} Penjualan`,
                        id_stock:itemstokis.id_stock,
                        item:data.item,
                        colorvariant:data.colorvariant,
                        qty:itemstokis.qty_pakai,
                        orderdate_mili:data.orderdate_mili
                    }
                    const cekdatstockis = `
                      SELECT * FROM stockupholsterydatabase WHERE BINARY id_stock = '${itemstokis.id_stock}'`;
                    database.query(cekdatstockis, async (err, resultsb) => {
                        if (resultsb.length > 0) {
                            var histories=JSON.parse(resultsb[0].history);
                            histories.unshift(historys);
                            var foxhostpries=JSON.stringify(histories);
                            let setnewdatast = `UPDATE stockupholsterydatabase SET qty_old='${resultsb[0].qty}', qty='${parseInt(resultsb[0].qty)-parseInt(itemstokis.qty_pakai)}', history='${foxhostpries}' WHERE BINARY id_stock='${itemstokis.id_stock}'`;
                            database.query(setnewdatast, async (err, finisss) => {
                                if (finisss.affectedRows == 1) {
                                    if (indexzv+2>arraystokuse.length) {
                                        var newnotifs={
                                            id_transaksi:data.id_transaksi,
                                            item:data.item,
                                            colorvariant:data.colorvariant,
                                            statussave:'sukses',
                                            stockprodukcode:data.stockprodukcode
                                        };
                                        notif.push(newnotifs);
                                        checkDone(notif);
                                    }
                                }
                            }); 
                        }
                    });
                      //database.query(sql, [itemstokis.qty_pakai, itemstokis.id_stock],);
                });
            }
                                       
            
            /* */
            
        }
    });
}

async function checkDone(notif) {
    counter++;
    if (counter === workerData.data.length) {
        var data_notif={};
        for (const element of notif) {
            if (element.statussave=='sukses') {

                if (element.stockprodukcode=='true') {
                    data_notif={
                        tglinputmili:Date.now(),
                        message:`Transakasi baru ID : ${element.id_transaksi}, ${element.item} ${element.colorvariant==''?'':`, ${element.colorvariant}`}`,
                        role:`["admin c5","admin head","admin c10","supervisor"]`
                    };
                }else{
                    data_notif={
                        tglinputmili:Date.now(),
                        message:`Transakasi baru ID : ${element.id_transaksi}, ${element.item} ${element.colorvariant==''?'':`, ${element.colorvariant}`}`,
                        role:`["admin classy","admin c5","admin head","admin c10","supervisor"]`
                    };
                }
                
                var saveits=await savenotif(data_notif);
                data_notif.no=saveits;
            }
        }

        parentPort.postMessage({notif,data_notif});
        // Menutup koneksi setelah query selesai
        /* database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        }); */
    }
}

function getMonthLetter() {
    const letters = "ABCDEFGHIJKL"; // A - Januari, B - Februari, ..., L - Desember
    const monthIndex = new Date().getMonth(); // 0 (Januari) hingga 11 (Desember)
    return letters[monthIndex];
}
// Fungsi untuk mendapatkan huruf berikutnya setelah a-z
function getNextLetter(letter) {
    if (!letter) return "a";
    if (letter === "z") return null; // Jika sudah 'z', tidak bisa ditambahkan lagi
    return String.fromCharCode(letter.charCodeAt(0) + 1);
}

function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    database.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}