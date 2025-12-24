import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';
// import {savenotif} from './utilities/savenotifikasi.js';

if (workerData.data.status=='') {
    let setnewdata = `UPDATE admlistdata SET confirmroute='${workerData.data.confirmroute}', status='${workerData.data.status}', forcedsent='${workerData.data.forcedsent}',forcedcancel='${workerData.data.forcedcancel}',reschedule='${workerData.data.reschedule}',delayproduksi='${workerData.data.delayproduksi}',toppriority='${workerData.data.toppriority}',pending='${workerData.data.pending}',history='${workerData.data.history}' WHERE BINARY id_transaksi='${workerData.data.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: "Edit item sukses", titles: "" });
        }else{
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabase();
        
    });
}
else{
    if (workerData.data.forcedcancel=='true') {
        let cekusername = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
        let cekusernamex = database.query(cekusername, (err, results) => {
            if (results.length > 0) {
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

                var getuser=JSON.parse(datasaveforce.history);

                if (workerData.data.stockprodukcode=='true') {
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
                        user:getuser[0].user,
                        keterangan:`dibatalkan [${results[0].item}] penjualan no ${results[0].no_transaksi} [-cancel08989]`,
                        fotoorvideolink:'',
                        ref_old:'',
                        ref_now:''
                    };

                    if (results[0].item=='AETHER - Track Light - L Connector'||results[0].item=='AETHER - Track Light - I Connector') {
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
                                    saveeditforcefix();
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
                                    saveeditforcefix();
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
                                    saveeditforcefix();
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
                                    saveeditforcefix();
                                }
                            });
                        }
                    }
                    else{
                        let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                        let newdata3 = database.query(setnewdata3, datastocks, async (err, datax3) => {
                            saveeditforcefix();
                        });
                    }

                    
                }else{
                    //stok up
                    var stockuses=workerData.data.stockuses==''?[]:JSON.parse(workerData.data.stockuses);
                    if (stockuses.length>0) {
                        saveupdateinstocked(stockuses,results[0].qty);
                    }else{
                        saveeditforcefix();
                    }
                }
                

            }else{
                parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi [0]", titles: "" });
                // Menutup koneksi setelah query selesai
                closedatabase();
            }
        });
    }else{
        saveeditforcefix();
    }
    
}

var counter = 0;
function saveupdateinstocked(datastock,qty_pakai) {
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
                    tglinputmili:workerData.data.tglinputmili,
                    namalengkap:workerData.data.namalengkap,
                    username:workerData.data.username,
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
                        checkDone(datastock);
                    }
                });
            }
        });
    }
}


function checkDone(datastock) {
    counter++;
    if (counter === datastock.length) {
        saveeditforcefix();
    }
}

function saveeditforcefix() {
    let setnewdata = `UPDATE admlistdata SET confirmroute='${workerData.data.confirmroute}',status='${workerData.data.status}',forcedsent='${workerData.data.forcedsent}',forcedcancel='${workerData.data.forcedcancel}',reschedule='${workerData.data.reschedule}',delayproduksi='${workerData.data.delayproduksi}',toppriority='${workerData.data.toppriority}',pending='${workerData.data.pending}',history='${workerData.data.history}' WHERE BINARY id_transaksi='${workerData.data.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            
            // var data_notif={
            //     tglinputmili:Date.now(),
            //     message:`Sudah kirim bahan ke UPD produk ID : ${workerData.id_transaksi}, ${dataadminlist[0].item} ${dataadminlist[0].colorvariant==''?'':`, ${dataadminlist[0].colorvariant}`}`,
            //     role:`["admin classy","admin c10","admin head","upholstery","supervisor"]`
            // };
            
            // if (workerData.data.forcedcancel=='true') {
            //     var saveits=await savenotif(data_notif);
            //     data_notif.no=saveits;
            // } data_notif:workerData.data.forcedcancel=='true'?data_notif:'' 

            parentPort.postMessage({ icons: "success", texts: "Edit item sukses", titles: "" });
        }else{
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        closedatabase();
        
    });
}


function savetoapprovaldata() {
    
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
//olnotransaksi

//{tglinputmili,bulan,tahun,no_transaksi,order_date,orderdate_mili,delivered_date,delivereddate_mili,platform,item,qty,finalprice,price,diskon_persen,diskon_amount,notes,colorvariant,buyername,confirmroute,phonenumber,address,status,forcedsent,forcedcancel,reschedule,delayproduksi,toppriority,pending,statusxo,deliveryunit,code1,code2
