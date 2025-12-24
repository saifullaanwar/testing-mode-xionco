import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';

if (workerData.bukaawal=='savelaporanbermasalah') {
    
    let cekusername = `SELECT * FROM databasepesananmasalah WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            //sudah ada id-nya
            if (results[0].pesanan_bermasalah=='true') {
                parentPort.postMessage({ icons: "error", texts: 'item bermasalah sudah ada dan belum diberikan solusi', titles: "" });
                // Menutup koneksi setelah query selesai
                /* database.end((closeErr) => {
                    if (closeErr) {
                        console.error('Error closing connection:', closeErr);
                    } else {
                        console.log('Database connection closed');
                    }
                }); */
            }else{
                saveit();
            }
        }else{
            //belum ada
            saveit();
        }
    });
}else if(workerData.bukaawal=='saveselesai'){
    var tglinputmili=workerData.data.tglinputmili;
    var arraysx=workerData.data.awalhistory;

    var id_transaksi=arraysx[0].id_transaksi;
    var history=JSON.stringify(arraysx);
    var status=arraysx[0].details.status;

    var pesanan_bermasalah='true';
    if (status.toLowerCase()=='selesai') {
        pesanan_bermasalah='';
    }

    const query = "UPDATE databasepesananmasalah SET status= ? , history = ?, pesanan_bermasalah= ? WHERE BINARY tglinputmili = ?";
    database.query(query, [status,history,pesanan_bermasalah, tglinputmili], (err, results) => {
        if (err) {
            parentPort.postMessage({ icons: "error", texts: 'sistem error [1]', titles: "" });
        } else {
            parentPort.postMessage({ icons: "success", texts: "Sukses submit", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        /* database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        }); */
    });
}

function saveit() {
    var tglinputmili=workerData.data.tglinputmili;
    var bulan=workerData.data.bulan;
    var tahun=workerData.data.tahun;
    var id_transaksi=workerData.data.id_transaksi;
    var no_transaksi=workerData.data.no_transaksi;
    var order_date=workerData.data.order_date;
    var orderdate_mili=workerData.data.orderdate_mili;

    var delivered_date=workerData.data.delivered_date;
    var delivereddate_mili=workerData.data.delivereddate_mili;
    var platform=workerData.data.platform;
    var item=workerData.data.item;
    var qty=workerData.data.qty;
    var qty_rusak=workerData.data.qty_rusak;
    var finalprice=workerData.data.finalprice;
    var price=workerData.data.price;
    var diskon_persen=workerData.data.diskon_persen;
    var diskon_amount=workerData.data.diskon_amount;
    var notes=workerData.data.notes;
    var colorvariant=workerData.data.colorvariant;
    var buyername=workerData.data.buyername;
    var phonenumber=workerData.data.phonenumber;
    var address=workerData.data.address;
    var status=workerData.data.status;
    var deliveryunit=workerData.data.deliveryunit;
    var code1=workerData.data.code1;
    var code2=workerData.data.code2;
    var extracharge=workerData.data.extracharge;
    var history=JSON.stringify(workerData.data.history);
    var pesanan_bermasalah=workerData.data.pesanan_bermasalah;
    var stockprodukcode=workerData.data.stockprodukcode;
    var stockuses=workerData.data.stockuses;
    var lokasiareakonsumen=workerData.data.lokasiareakonsumen;


    var datakirim=[tglinputmili,bulan,tahun,id_transaksi,no_transaksi,order_date,orderdate_mili,delivered_date,delivereddate_mili,platform,item,qty,qty_rusak,finalprice,price,diskon_persen,diskon_amount,notes,colorvariant,buyername,phonenumber,address,status,deliveryunit,code1,code2,extracharge,history,pesanan_bermasalah,stockprodukcode,stockuses,lokasiareakonsumen];

    const query = "INSERT INTO databasepesananmasalah (tglinputmili,bulan,tahun,id_transaksi,no_transaksi,order_date,orderdate_mili,delivered_date,delivereddate_mili,platform,item,qty,qty_rusak,finalprice,price,diskon_persen,diskon_amount,notes,colorvariant,buyername,phonenumber,address,status,deliveryunit,code1,code2,extracharge,history,pesanan_bermasalah,stockprodukcode,stockuses,lokasiareakonsumen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    database.query(query, datakirim, (err, results) => {
        if (err) {
            console.log(err);
            parentPort.postMessage({ icons: "error", texts: err, titles: "" });

        }else{
            parentPort.postMessage({ icons: "success", texts: "Sukses simpan data", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        /* database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        }); */
        
    });
}
