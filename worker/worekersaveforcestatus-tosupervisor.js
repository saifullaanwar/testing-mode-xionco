import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';
import {savenotif} from './utilities/savenotifikasi.js';


if (workerData.bukawal=='saveforcestatustoapproval') {
    let cekusername = `SELECT * FROM forcestatusrequest WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            //ada id transaksinya
            saveupdate();
        }else{
            //tidak ada id transaksinya
            savenew();
        }
    });
}else if (workerData.bukawal=='saveforcestatusapproved') {
    let cekusername = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            //ada id transaksinya
            
            if (results[0].status.toLowerCase()!='selesai'&&results[0].status.toLowerCase()!='dibatalkan') {

                if (workerData.data.approveorreject=='approve') {
                    var data=workerData.data.datacek;
                    if (data.forcedcancel=='true') {
                        saveforcecancel(results)
                    }else{
                        saveapproved(results[0]);
                    }
                }else{
                    //reject
                    notefecttostatusafterapprove();
                }
                
            }else{
                
                notefecttostatusafterapprove();
                
            }
            
            
        }else{
            //tidak ada id transaksinya
            parentPort.postMessage({ icons: "error", texts: "Edit item gagal, coba lagi [1]", titles: "" });
            // Menutup koneksi setelah query selesai
            closedatabase();
        }
    });
}
else if (workerData.bukawal=='allsaveforcestatusapproved') {
    workerData.data.forEach(data,index => {
        let cekusername = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
        let cekusernamex = database.query(cekusername, (err, results) => {
            if (results.length > 0) {
                //ada id transaksinya
                
                var data=workerData.data.datacek;
                if (data.forcedcancel=='true') {
                    saveforcecancel(results)
                }else{
                    saveapproved(results[0]);
                }
                
            }else{
                //tidak ada id transaksinya
                parentPort.postMessage({ icons: "error", texts: "Edit item gagal, coba lagi [1]", titles: "" });
                // Menutup koneksi setelah query selesai
                closedatabase();
            }
        });
    });
    
}

function savenew() {
    var data0 = [workerData.data];
    data0.forEach(obj => {
        delete obj.item;
        delete obj.qty;
        delete obj.namalengkap;
        delete obj.username;
    }); 
    var data=data0[0];
    data.history=JSON.stringify(data.history);

    let setnewdata3 = "INSERT INTO forcestatusrequest SET ?";
    let newdata3 = database.query(setnewdata3, data, async (err, datax3) => {
        console.log('err =======');
        console.log(err);
        parentPort.postMessage({ icons: "success", texts: "Edit item sukses", titles: "" });
        // Menutup koneksi setelah query selesai
        closedatabase();
    });
}

function saveupdate() {
    var data0 = [workerData.data];
    data0.forEach(obj => {
        delete obj.item;
        delete obj.qty;
        delete obj.namalengkap;
        delete obj.username;
    }); 
    var data=data0[0];
    var history=JSON.stringify(data.history);

    let setnewdata = `UPDATE forcestatusrequest SET confirmroute='${data.confirmroute}', status='${data.status}', forcedsent='${data.forcedsent}', forcedcancel='${data.forcedcancel}', reschedule='${data.reschedule}', delayproduksi='${data.delayproduksi}', toppriority='${data.toppriority}', pending='${data.pending}', stockprodukcode='${data.stockprodukcode}', stockuses='${data.stockuses}', history='${history}', approval_forcestatus='' WHERE BINARY id_transaksi='${data.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: "Edit item sukses", titles: "" });
        }else{
            parentPort.postMessage({ icons: "error", texts: "Edit item gagal, coba lagi", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabase();
    });
}

function notefecttostatusafterapprove() {
    var data=workerData.data.datacek;
    let setnewdata1 = `UPDATE forcestatusrequest SET approval_forcestatus='true' WHERE BINARY id_transaksi='${data.id_transaksi}'`;
    let newdata = database.query(setnewdata1, async (err, datax) => {
        if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: workerData.data.approveorreject=='approve'?"item sudah diapprove sebelumnya atau sudah selesai sesuai prosedur":"Reject berhasil", titles: "" });
        }else{
            parentPort.postMessage({ icons: "error", texts: "Edit item gagal, coba lagi [2]", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabase();
    });
}

function saveforcecancel(results) {
    var datasaveforce=workerData.data;

    var date_history = new Date();
    var day_history = ("0" + (date_history.getDate())).slice(-2);
    var month_history = ("0" + (date_history.getMonth() + 1)).slice(-2);//d.getMonth()+1;
    var hour_history = ("0" + (date_history.getHours())).slice(-2);
    var minutes_history = ("0" + (date_history.getMinutes())).slice(-2);
    var year_history = date_history.getFullYear();

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    var bulan=monthNames[date_history.getMonth()];
    
    var fixdatejam_history = day_history+"/"+month_history+"/"+year_history +` ${hour_history}:${minutes_history}`;

    var getuser=workerData.data.history;//JSON.parse(datasaveforce.history);

    if (results[0].stockprodukcode=='true') {
        //stok c5
        var datastocks={
            tgl_input_mili:date_history.getTime(),
            tanggal:day_history+"/"+month_history+"/"+year_history,
            tanggal_jam:fixdatejam_history,
            bulan:bulan,
            tahun:year_history,
            item:results[0].item,
            qty:results[0].qty,
            inorout:'in',
            user:getuser[1].user,
            keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
            fotoorvideolink:'',
            ref_old:'',
            ref_now:''
        };

        if (results[0].item=='AETHER - Track Light - L Connector'||results[0].item=='AETHER - Track Light - I Connector') {
            var datastocks1=[
                {
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:'AETHER - Track Light - Body Plain Connector',
                    qty:parseInt(results[0].qty)*1,
                    inorout:'in',
                    user:getuser[0].user,
                    keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                },{
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:'AETHER - Track Light - Leg Connector',
                    qty:parseInt(results[0].qty)*2,
                    inorout:'in',
                    user:getuser[0].user,
                    keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                }
            ];
            for (let i = 0; i < datastocks1.length; i++) {
                const element = datastocks1[i];
                let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                let newdata3 = database.query(setnewdata3, element, async (err, datax3) => {
                    if (i==1) {
                        saveapproved(results[0]);
                    }
                });
            }
        }
        else if (results[0].item=='AETHER - Track Light - T Connector') {
            console.log(results[0].item+' save stock');
            var datastocks1=[
                {
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:'AETHER - Track Light - Body Plain Connector',
                    qty:parseInt(results[0].qty)*1,
                    inorout:'in',
                    user:getuser[0].user,
                    keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                },{
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:'AETHER - Track Light - Leg Connector',
                    qty:parseInt(results[0].qty)*3,
                    inorout:'in',
                    user:getuser[0].user,
                    keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                }
            ];
            for (let i = 0; i < datastocks1.length; i++) {
                const element = datastocks1[i];
                let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                let newdata3 = database.query(setnewdata3, element, async (err, datax3) => {
                    if (i==1) {
                         saveapproved(results[0]);
                    }
                });
            }
        }
        else if (results[0].item=='AETHER - Track Light - PLUS Connector') {
            console.log(results[0].item+' save stock');
            var datastocks1=[
                {
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:'AETHER - Track Light - Body Plain Connector',
                    qty:parseInt(results[0].qty)*1,
                    inorout:'in',
                    user:getuser[0].user,
                    keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                },{
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:'AETHER - Track Light - Leg Connector',
                    qty:parseInt(results[0].qty)*4,
                    inorout:'in',
                    user:getuser[0].user,
                    keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                }
            ];
            for (let i = 0; i < datastocks1.length; i++) {
                const element = datastocks1[i];
                let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                let newdata3 = database.query(setnewdata3, element, async (err, datax3) => {
                    if (i==1) {
                         saveapproved(results[0]);
                    }
                });
            }
        }
        else if (results[0].item=='AETHER - Track Light - V90 Connector') {
            console.log(results[0].item+' save stock');
            var datastocks1=[
                {
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:'AETHER - Track Light - Body 90 Connector',
                    qty:parseInt(results[0].qty)*1,
                    inorout:'in',
                    user:getuser[0].user,
                    keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                },{
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:'AETHER - Track Light - Leg Connector',
                    qty:parseInt(results[0].qty)*2,
                    inorout:'in',
                    user:getuser[0].user,
                    keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                }
            ];
            for (let i = 0; i < datastocks1.length; i++) {
                const element = datastocks1[i];
                let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                let newdata3 = database.query(setnewdata3, element, async (err, datax3) => {
                    if (i==1) {
                         saveapproved(results[0]);
                    }
                });
            }
        }
        else{
            let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
            let newdata3 = database.query(setnewdata3, datastocks, async (err, datax3) => {
                saveapproved(results[0]);
            });
        }

        
    }else{
        //stok up
        var stockuses=results[0].stockuses==''?[]:JSON.parse(results[0].stockuses);
        if (stockuses.length>0) {
            saveupdateinstocked(stockuses,results[0].qty,results);
        }else{
            saveapproved(results[0]);
        }
    }
}

function saveapproved(arrays) {

    var data0=JSON.parse(arrays.history);
    var data1 = workerData.data.history;
    var data=workerData.data.datacek;

    console.log('data ===');
    console.log(data);

    console.log('data 1===');
    console.log(data0);
    
    console.log('data 2===');
    console.log(data1);

    var history=[...data1,...data0];

    console.log('history ===');
    console.log(history);


    let setnewdata = `UPDATE admlistdata SET confirmroute='${data.confirmroute}', status='${data.status}', forcedsent='${data.forcedsent}', forcedcancel='${data.forcedcancel}', reschedule='${data.reschedule}', delayproduksi='${data.delayproduksi}', toppriority='${data.toppriority}', pending='${data.pending}', stockprodukcode='${data.stockprodukcode}', stockuses='${data.stockuses}', history='${JSON.stringify(history)}' WHERE BINARY id_transaksi='${data.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            
            let setnewdata1 = `UPDATE forcestatusrequest SET approval_forcestatus='true' WHERE BINARY id_transaksi='${data.id_transaksi}'`;
            let newdata = database.query(setnewdata1, async (err, datax) => {
                if (datax.affectedRows == 1) {

                    var data_notif;
                    
                    if (data.forcedcancel=='true') {
                        data_notif={
                            tglinputmili:Date.now(),
                            message:`Transaksi ID : ${data.id_transaksi} dibatalkan`,
                            role:`["admin classy","admin c10","admin head","supervisor"]`
                        };
                        var saveits=await savenotif(data_notif);
                        data_notif.no=saveits;
                    } 

                    parentPort.postMessage({ icons: "success", texts: "Edit item sukses", titles: "", data_notif:data.forcedcancel=='true'?data_notif:'' });
                }else{
                    parentPort.postMessage({ icons: "error", texts: "Edit item gagal, coba lagi [2]", titles: "" });
                }
                // Menutup koneksi setelah query selesai
                closedatabase();
            });
        }else{
            parentPort.postMessage({ icons: "error", texts: "Edit item gagal, coba lagi [3]", titles: "" });
            // Menutup koneksi setelah query selesai
            closedatabase();
        }
    }); 
}

var counter = 0;
function saveupdateinstocked(datastock,qty_pakai,arrayitem) {
    
    var data1 = workerData.data.history;
    counter = 0;
    var notif=[];
    for (let i = 0; i < datastock.length; i++) {
        const element = datastock[i];
        let cekusername = `SELECT * FROM stockupholsterydatabase WHERE BINARY id_stock = "${element.id_stock}"`;
        database.query(cekusername, async (err, results) => {
            /* if (err) {
                console.error('Query error:', err);
                
                
                checkDone(datastock);
                //return;
            } */
            if (results.length > 0) {
                var historynew={
                    tglinputmili:data1[1].details.tglinputmili,
                    namalengkap:data1[1].user,
                    username:data1[1].username,
                    tindakan:`${workerData.data.id_transaksi} dibatalkan`,
                    id_stock:element.id_stock,
                    item:results[0].item,
                    colorvariant:results[0].colorvariant,
                    qty:qty_pakai,
                    orderdate_mili:results[0].orderdate_mili
                };

                var historiold=JSON.parse(results[0].history);

                var historiesnew=[historynew,...historiold];

                let setnewdata = `UPDATE stockupholsterydatabase SET qty='${parseInt(qty_pakai)+parseInt(results[0].qty)}',qty_old='${parseInt(results[0].qty_old)>parseInt(qty_pakai)?parseInt(results[0].qty_old)-parseInt(qty_pakai):parseInt(qty_pakai)-parseInt(results[0].qty_old)}', history='${JSON.stringify(historiesnew)}', upholstery_selesaibuatstock='true' WHERE BINARY id_stock='${element.id_stock}'`;
                let newdata = database.query(setnewdata, async (err, datax) => {
                    if (datax.affectedRows == 1) {
                        checkDone(datastock,arrayitem);
                    }
                });
            }
        });
    }
}


function checkDone(datastock,arrayitem) {
    counter++;
    if (counter === datastock.length) {
        saveapproved(arrayitem[0]);
    }
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