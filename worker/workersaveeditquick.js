import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';

if (workerData.data.tglinputmili!='') {
    saveit()
}

function saveit() {
    let cekusername = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            if (results[0].item!=workerData.data.item||results[0].qty!=workerData.data.qty) {
                var newdata1=workerData.data;

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
                
                var getuser=JSON.parse(newdata1.history);
                var datastocks={
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:newdata1.item,
                    qty:newdata1.qty,
                    inorout:'out',
                    user:getuser[0].user,
                    keterangan:`edit [${workerData.oldbeforeeditqty} X ${workerData.oldbeforeedititem} to ${newdata1.qty} X ${newdata1.item}] penjualan no ${newdata1.no_transaksi} [-sell08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                };
                
                var datastocksold={
                    tgl_input_mili:date_history.getTime(),
                    tanggal:day_history+"/"+month_history+"/"+year_history,
                    tanggal_jam:fixdatejam_history,
                    bulan:bulan,
                    tahun:year_history,
                    item:workerData.oldbeforeedititem,
                    qty:workerData.oldbeforeeditqty,
                    inorout:'in',
                    user:getuser[0].user,
                    keterangan:`edit [${workerData.oldbeforeeditqty} X ${workerData.oldbeforeedititem} to ${newdata1.qty} X ${newdata1.item}] penjualan no ${newdata1.no_transaksi} [-sell08989]`,
                    fotoorvideolink:'',
                    ref_old:'',
                    ref_now:''
                };

                if (workerData.oldstockprodukcode=='true'&&workerData.oldbeforeeditqty==newdata1.qty) {
                    if (workerData.stockprodukcode=='true') {
                        datastocks.inorout='out';
                    }else{
                        datastocks.inorout='in';
                        datastocks.item=workerData.oldbeforeedititem;
                        
                    }
                    let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                    let newdata3 = database.query(setnewdata3, datastocks, async (err, datax3) => {
                        saveeditifx();
                    });
                }else if (workerData.oldstockprodukcode=='true'&&workerData.oldbeforeeditqty>newdata1.qty||workerData.oldstockprodukcode=='true'&&workerData.oldbeforeeditqty<newdata1.qty) {
                    

                    if (parseInt(newdata1.qty)>parseInt(workerData.oldbeforeeditqty)) {

                        var qtynowon=parseInt(newdata1.qty)-parseInt(workerData.oldbeforeeditqty);

                        datastocksold.qty=qtynowon;
                        
                        datastocksold.inorout='out';

                        datastocksold.keterangan=`edit qty [${workerData.oldbeforeeditqty} X ${workerData.oldbeforeedititem} to ${newdata1.qty} X ${newdata1.item}] penjualan no ${newdata1.no_transaksi} [-sell08989]`;

                    }else{
                        var qtynowon=parseInt(workerData.oldbeforeeditqty)-parseInt(newdata1.qty);

                        datastocksold.qty=qtynowon;
                        
                        datastocksold.inorout='in';

                        datastocksold.keterangan=`edit qty [${workerData.oldbeforeeditqty} X ${workerData.oldbeforeedititem} to ${newdata1.qty} X ${newdata1.item}] penjualan no ${newdata1.no_transaksi} [-sell08989]`;
                    }
                    let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                    let newdata3 = database.query(setnewdata3, datastocksold, async (err, datax3) => {
                        saveeditifx();
                    });
                }else{
                    if (workerData.stockprodukcode=='true') {
                        let setnewdata3 = "INSERT INTO formstockcalculate SET ?";
                        let newdata3 = database.query(setnewdata3, datastocks, async (err, datax3) => {
                            saveeditifx();
                        });
                    }else{
                        saveeditifx();
                    } 
                }


            }else{
                saveeditifx();
            }
        }else{
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi [0]", titles: "" });
        }
    });
}

function saveeditifx() {
    let setnewdata = `UPDATE admlistdata SET tglinputmili='${workerData.data.tglinputmili}',bulan='${workerData.data.bulan}',tahun='${workerData.data.tahun}',id_transaksi='${workerData.data.id_transaksi}',no_transaksi='${workerData.data.no_transaksi}',order_date='${workerData.data.order_date}',orderdate_mili='${workerData.data.orderdate_mili}',delivered_date='${workerData.data.delivered_date}',delivereddate_mili='${workerData.data.delivereddate_mili}',item='${workerData.data.item}',qty='${workerData.data.qty}',finalprice='${workerData.data.finalprice}',price='${workerData.data.price}',diskon_persen='${workerData.data.diskon_persen}',diskon_amount='${workerData.data.diskon_amount}',notes='${workerData.data.notes}',colorvariant='${workerData.data.colorvariant}', status='${workerData.data.status}', code2='${workerData.data.code2}', extracharge='${workerData.data.extracharge}', history='${workerData.data.history}' WHERE BINARY id_transaksi='${workerData.data.id_transaksi}'`;
    let newdata = database.query(setnewdata, async (err, datax) => {
        if (datax.affectedRows == 1) {
            parentPort.postMessage({ icons: "success", texts: "Edit item sukses", titles: "" });
        }else{
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
        }
        
    });
}

//olnotransaksi

//{tglinputmili,bulan,tahun,no_transaksi,order_date,orderdate_mili,delivered_date,delivereddate_mili,platform,item,qty,finalprice,price,diskon_persen,diskon_amount,notes,colorvariant,buyername,confirmroute,phonenumber,address,status,forcedsent,forcedcancel,reschedule,delayproduksi,toppriority,pending,statusxo,deliveryunit,code1,code2
