import express from 'express';
import { Worker } from 'worker_threads';
import basicAuth from '../config/basicAUth.js';
import cookieParser from 'cookie-parser';
import checkRole from './checkRole.js';
import emitter from "../eventemiter.js";

//import userdata from '../mogosDB/mongosdata.js';
const router = express.Router();

//admin c10
router.get("/", checkRole(['Admin Head',"Admin C10", "Supervisor","tim sukses"]), function (req, res) {
    
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var roles='';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        roles=datausers.tipeuser.toLowerCase();
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminc10/adminlist';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';

    var bukawal='awal';
    //const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    //worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlist',{titlepage:'Admin List',diskripsi,czz,versionall,jzz,navatasactive,roles});
    //});
    
});
//
//admin classy
router.get("/classy", checkRole(["Admin Classy", "Supervisor","tim sukses"]), function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminclassy/adminlistclassy';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';
    var tugassaya='';

    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var roles='';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        roles=datausers.tipeuser.toLowerCase();
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlistclassy',{titlepage:'Admin List',diskripsi,czz,versionall,jzz,navatasactive,datas,tugassaya,roles});
    });
    
});

router.get("/classy/tugassaya", checkRole(["Admin Classy", "Supervisor","tim sukses"]), function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminclassy/adminlistclassy-tugassaya';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';
    var tugassaya='tugassaya';

    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var roles='';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        roles=datausers.tipeuser.toLowerCase();
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlistclassy',{titlepage:'Tugas Saya | Admin List',diskripsi,czz,versionall,jzz,navatasactive,datas,tugassaya,roles});
    });
    
});
//

//admin c5
router.get("/admc5", checkRole(["Admin C5", "Supervisor","tim sukses"]), function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminc5/adminlistc5';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';
    var tugassaya='';

    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var roles='';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        roles=datausers.tipeuser.toLowerCase();
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlistc5',{titlepage:'Admin List',diskripsi,czz,versionall,jzz,navatasactive,datas,tugassaya,roles});
    });
    
});

router.get("/admc5/tugassaya", checkRole(["Admin C5", "Supervisor","tim sukses"]), function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminc5/adminlistc5-tugassaya';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';
    var tugassaya='tugassaya';

    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var roles='';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        roles=datausers.tipeuser.toLowerCase();
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlistc5',{titlepage:'Admin List',diskripsi,czz,versionall,jzz,navatasactive,datas,tugassaya,roles});
    });
    
});
//

//all
router.get("/reloaded",async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
    
});
//

//admin c10
router.get("/additem", checkRole(['Admin Head',"Admin C10", "Supervisor","tim sukses"]), function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminc10/additemadminlist';
    var diskripsi='';
    var navatasactive='additemadmin';

    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var roles='';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        roles=datausers.tipeuser.toLowerCase();
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }

    var bukawal='additem';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('additemadminlist',{titlepage:'Add Item | Admin List',diskripsi,czz,versionall,jzz,navatasactive,datadropdown:datas,roles});
    });
    
});
//

router.post('/saveadditemx', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    var datenow = new Date();
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    var year = datenow.getFullYear();
    
    const tglinputmili=datenow.getTime();

    const bulan= req.body.bulan;//monthNames[datenow.getMonth()];
    const tahun=req.body.tahun;//year;
    const id_transaksi=req.body.id_transaksi;

    const no_transaksi = req.body.no_transaksi;
    const order_date = req.body.order_date;
    const orderdate_mili = req.body.orderdate_mili;
    const delivered_date = req.body.delivered_date;
    const delivereddate_mili = req.body.delivereddate_mili;
    const platform = req.body.platform;
    const item = req.body.item;
    const qty = req.body.qty;
    const finalprice = req.body.finalprice;
    const price = req.body.price;
    const diskon_persen = req.body.diskon_persen;
    const diskon_amount = req.body.diskon_amount;
    const notes = req.body.notes;
    const colorvariant = req.body.colorvariant;
    const buyername = req.body.buyername;
    const confirmroute = req.body.confirmroute;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    const status = req.body.status;
    const forcedsent = req.body.forcedsent;
    const forcedcancel = req.body.forcedcancel;
    
    const reschedule ='';
    
    const delayproduksi = '';

    const toppriority = req.body.toppriority;
    const pending = req.body.pending;
    const statusxo = req.body.statusxo;
    const deliveryunit = req.body.deliveryunit;
    const code1 = req.body.code1;
    const code2 = req.body.code2;
    const extracharge =req.body.extracharge;
    
    const history=JSON.stringify(req.body.history);

    const print_podo='';
    const upholstery_jadi='';
    const upholstery_img='';

    const packde_kirimbahan='';
    const packde_kirimbahan_img='';
    const packde_ambil='';
    const packde_ambil_img='';
    const packde_qc='';
    const packde_qc_img='';

    const diterima_konsumen='';
    const diterima_konsumen_img='';
    
    const stockprodukcode=req.body.stockprodukcode;

    const stockuses=req.body.stockuses;
    

    var data = {tglinputmili,
        bulan,
        tahun,
        id_transaksi,
        no_transaksi,
        order_date,
        orderdate_mili,
        delivered_date,
        delivereddate_mili,
        platform,
        item,
        qty,
        finalprice,
        price,
        diskon_persen,
        diskon_amount,
        notes,
        colorvariant,
        buyername,
        confirmroute,
        phonenumber,
        address,
        status,
        forcedsent,
        forcedcancel,
        reschedule,
        delayproduksi,
        toppriority,
        pending,
        statusxo,
        deliveryunit,
        code1,
        code2,
        extracharge,
        history,
        print_podo,
        upholstery_jadi,
        upholstery_img,
        packde_kirimbahan,
        packde_kirimbahan_img,
        packde_ambil,
        packde_ambil_img,
        packde_qc,
        packde_qc_img,
        diterima_konsumen,
        diterima_konsumen_img,
        stockuses:JSON.stringify(stockuses)

    }

    const worker = new Worker('./worker/workersaveadditem.js', { workerData: { data,stockprodukcode,stockuses } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/saveadditem', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    
    var data =req.body;

    //console.log(data);

    const worker = new Worker('./worker/workersaveadditem.js', { workerData: { data } });

    worker.on('message', (datas) => {
        //parentPort.postMessage({notif,data_notif});
        // ambil io dari app.js
        //const io = req.app.get("io");

        // emit ke semua client
        //io.emit('notif-adminlist',datas.data_notif);
        // lempar ke app.js lewat EventEmitter
        emitter.emit("broadcast", {iolink:'notif-adminlist',item:datas.data_notif});
        
        res.status(200).send(datas);
        res.end();
    });
});

router.get("/edititem/:idtransaksi", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminc10/edititemadminlist';
    var diskripsi='';
    var navatasactive='adminlist';

    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var roles='';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        roles=datausers.tipeuser.toLowerCase();
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }
    
    var bukawal='edititem';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal,idtransaksi:req.params.idtransaksi} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        if (datas.status!=200) {
            res.status(datas.status).render('404',{titlepage: '404', diskripsi:'404', czz:'/css/404.css', versionall, jzz:404});
        }else{
            res.status(200).render('edititemadminlist',{titlepage:'Edit Item | Admin List',diskripsi,czz,versionall,jzz,navatasactive,datadropdown:datas.datadropdown,datatransaksi:datas.datatransaksi,roles});
        }
        
    });
    
});

router.post('/saveedit-old', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];
    console.log(req.body);
    //var year = datenow.getFullYear();
    const olnotransaksi=req.body.olnotransaksi;
    const tglinputmili=req.body.tglinputmili;

    const bulan= req.body.bulan;//monthNames[datenow.getMonth()];
    const tahun=req.body.tahun;//year;
    const id_transaksi=req.body.id_transaksi;

    const no_transaksi = req.body.no_transaksi;
    const order_date = req.body.order_date;
    const orderdate_mili = req.body.orderdate_mili;
    const delivered_date = req.body.delivered_date;
    const delivereddate_mili = req.body.delivereddate_mili;
    const platform = req.body.platform;
    const item = req.body.item;
    const qty = req.body.qty;
    const finalprice = req.body.finalprice;
    const price = req.body.price;
    const diskon_persen = req.body.diskon_persen;
    const diskon_amount = req.body.diskon_amount;
    const notes = req.body.notes;
    const colorvariant = req.body.colorvariant;
    const buyername = req.body.buyername;
    const confirmroute = req.body.confirmroute;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    const status = req.body.status;
    const forcedsent = req.body.forcedsent;
    const forcedcancel = req.body.forcedcancel;
    
    const reschedule =req.body.reschedule;
    
    const delayproduksi = req.body.delayproduksi;

    const toppriority = req.body.toppriority;
    const pending = req.body.pending;
    const statusxo = req.body.statusxo;
    const deliveryunit = req.body.deliveryunit;
    const code1 = req.body.code1;
    const code2 = req.body.code2;
    const extracharge = req.body.extracharge;
    const history=JSON.stringify(req.body.history);
    const stockprodukcode = req.body.stockprodukcode;
    const oldbeforeedititem=req.body.oldbeforeedititem;
    const oldbeforeeditqty=req.body.oldbeforeeditqty;
    const oldstockprodukcode=req.body.oldstockprodukcode;

    var data = {tglinputmili,bulan,tahun,id_transaksi,
        no_transaksi,
        order_date,orderdate_mili,delivered_date,delivereddate_mili,platform,item,qty,finalprice,price,diskon_persen,diskon_amount,notes,colorvariant,buyername,confirmroute,phonenumber,address,status,forcedsent,forcedcancel,reschedule,delayproduksi,toppriority,pending,statusxo,deliveryunit,code1,code2,extracharge,history
    }
    console.log(req.body);
    const worker = new Worker('./worker/workersaveeditadminlist.js', { workerData: { olnotransaksi,data,
        stockprodukcode,oldbeforeedititem,oldbeforeeditqty,oldstockprodukcode } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/saveedit', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];
    console.log(req.body);
    //var year = datenow.getFullYear();
    //const olnotransaksi=req.body.olnotransaksi;
    const id_transaksi=req.body[0].id_transaksi;


    var data = req.body;
    console.log(req.body);
    const worker = new Worker('./worker/workersaveeditadminlist.js', { workerData: { data,id_transaksi} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/cekidtransaksi/:idtransaksi', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    const worker = new Worker('./worker/workeradminlist.js', { workerData: {bukawal:'cekidtransaksi',id_transaksi:req.params.idtransaksi } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/saveeditquick', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
 
    const tglinputmili=req.body.tglinputmili;

    const bulan= req.body.bulan;//monthNames[datenow.getMonth()];
    const tahun=req.body.tahun;//year;
    const id_transaksi=req.body.id_transaksi;

    const no_transaksi = req.body.no_transaksi;
    const order_date = req.body.order_date;
    const orderdate_mili = req.body.orderdate_mili;
    const delivered_date = req.body.delivered_date;
    const delivereddate_mili = req.body.delivereddate_mili;
    const platform = req.body.platform;
    const item = req.body.item;
    const qty = req.body.qty;
    const finalprice = req.body.finalprice;
    const price = req.body.price;
    const diskon_persen = req.body.diskon_persen;
    const diskon_amount = req.body.diskon_amount;
    const notes = req.body.notes;
    const colorvariant = req.body.colorvariant;
   
    const extracharge = req.body.extracharge;

    const history=JSON.stringify(req.body.history);
    const stockprodukcode = req.body.stockprodukcode;
    const oldbeforeedititem=req.body.oldbeforeedititem;
    const oldbeforeeditqty=req.body.oldbeforeeditqty;
    const oldstockprodukcode=req.body.oldstockprodukcode;

    const code2 = req.body.code2;
    const status = req.body.status;

    var data = {tglinputmili,bulan,tahun,id_transaksi,
        no_transaksi,
        order_date,orderdate_mili,delivered_date,delivereddate_mili,platform,item,qty,finalprice,price,diskon_persen,diskon_amount,notes,colorvariant,extracharge,history,status,code2
    }

    const worker = new Worker('./worker/workersaveeditquick.js', { workerData: { data,stockprodukcode,oldbeforeedititem,oldbeforeeditqty,oldstockprodukcode } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/saveforcestatus', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const confirmroute = req.body.confirmroute;

    const status = req.body.status;
    const forcedsent = req.body.forcedsent;
    const forcedcancel = req.body.forcedcancel;
    
    const reschedule =req.body.reschedule;
    
    const delayproduksi = req.body.delayproduksi;

    const toppriority = req.body.toppriority;
    const pending = req.body.pending;

    const history=JSON.stringify(req.body.history);

    const stockprodukcode=req.body.stockprodukcode;

    const stockuses=req.body.stockuses;
    const tglinputmili=req.body.tglinputmili;
    const namalengkap=req.body.namalengkap;
    const username=req.body.username

    var data = {id_transaksi,
        confirmroute,status,forcedsent,forcedcancel,reschedule,delayproduksi,toppriority,pending,history,stockprodukcode,stockuses,tglinputmili,namalengkap,username
    }

    const worker = new Worker('./worker/worekersaveforcestatus.js', { workerData: { data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/saveforcestatustoapproval', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const namalengkap=req.body.namalengkap;
    const username=req.body.username

    var data = req.body;
    console.log(data)
    /* data.forEach(obj => {
        delete obj.item;
        delete obj.qty;
        delete obj.namalengkap;
        delete obj.username;
    }); */

    var bukawal='saveforcestatustoapproval';

    const worker = new Worker('./worker/worekersaveforcestatus-tosupervisor.js', { workerData: {bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});



router.post('/saveforcestatusapproved', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var data = req.body;
    console.log(data);

    var bukawal='saveforcestatusapproved';

    const worker = new Worker('./worker/worekersaveforcestatus-tosupervisor.js', { workerData: {bukawal, data } });

    worker.on('message', (datas) => {
        if (datas.data_notif!='') {
            // lempar ke app.js lewat EventEmitter
            emitter.emit("broadcast", {iolink:'notif-adminlist',item:datas.data_notif});
        }
        
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/selesaiprintpodo', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const status = req.body.status;
   
    const history=JSON.stringify(req.body.history);

    var data = {id_transaksi,status,history
    }

    var bukawal='awal';

    const worker = new Worker('./worker/workerselesaiprintpodo.js', { workerData: {bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/selesaiapprove', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const status = req.body.status;
   
    const history=JSON.stringify(req.body.history);

    var data = {id_transaksi,status,history
    }

    var bukawal='selesaiapprove';

    const worker = new Worker('./worker/workerselesaiprintpodo.js', { workerData: {bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/selesaiqcpackingfmcg', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const status = req.body.status;
    const folderfoto = req.body.folderfoto;
   
    const history=JSON.stringify(req.body.history);

    var data = {id_transaksi,status,folderfoto,history
    }

    const worker = new Worker('./worker/workerselesaiqcpackingfmcg.js', { workerData: { data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/selesaikirimfmcg', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const status = req.body.status;
   
    const history=JSON.stringify(req.body.history);

    var data = {id_transaksi,status,history
    }

    const worker = new Worker('./worker/workerselesaikirimfmcg.js', { workerData: { data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


//save mark new
router.post('/marknew', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='marknew';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workermarknew.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

/////////////////////////////////////////////////////////////

//admin web homepage banner
router.get("/adminweb", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-homepage';
    var diskripsi='';
    var navatasactive='adminweb-homepage';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminweb-homepage',{titlepage:'Admin Web Banner',diskripsi,czz,versionall,jzz,navatasactive,datas,roles});
    });
    
});


//admin web homepage eventpage
router.get("/adminwebeventpage", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-homepage-eventpage';
    var diskripsi='';
    var navatasactive='adminweb-homepage';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminweb-homepage-eventpage',{titlepage:'Admin Web Event Page',diskripsi,czz,versionall,jzz,navatasactive,datas,roles});
    });
    
});


//adminweb-homepage-savebanner
router.post('/adminweb-homepage-savebanner', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-homepage-savebanner';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-homepage-saveeventpage
router.post('/adminweb-homepage-saveeventpage', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-homepage-saveeventpage';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-kategori
router.get("/adminweb/kategori", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-kategori';
    var diskripsi='';
    var navatasactive='adminweb-kategori';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminweb-kategori',{titlepage:'Admin Web Category',diskripsi,czz,versionall,jzz,navatasactive,datas,roles});
    });
    
});

//adminweb-savekategori
router.post('/adminweb-savekategori', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-savekategori';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-editkategori
router.post('/adminweb-editkategori', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-editkategori';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-deletekategori
router.post('/adminweb-deletekategori', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-deletekategori';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


// admin web - account
router.post('/adminweb-editkategori', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'adminweb-editkategori';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post("/adminweb-account-edit", (req, res) => {
    const data = req.body;

    const worker = new Worker(path.join(__dirname, "../workers/adminweb.js"), {
        workerData: { bukawal: "adminweb-account-edit", data }
    });

    worker.on("message", (result) => {
        // balikkan hasil ke frontend
        res.json(result);
    });

    worker.on("error", (err) => {
        console.error("Worker error:", err);
        res.status(500).json({ icons: "error", texts: "Server error" });
    });

    worker.on("exit", (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
            res.status(500).json({ icons: "error", texts: "Worker crashed" });
        }
    });
});


//adminweb-updateurutankatagori
router.post('/adminweb-updateurutankatagori', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-updateurutankatagori';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-product
router.get("/adminweb/product", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-product';
    var diskripsi='';
    var navatasactive='adminweb-product';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminweb-product',{titlepage:'Admin Web Product',diskripsi,czz,versionall,jzz,navatasactive,datas,roles});
    });
    
});

//adminweb-saveeditprodukweb
router.post('/adminweb-saveeditprodukweb', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-saveeditprodukweb';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-deleteproduct
router.post('/adminweb-deleteproduct', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-deleteproduct';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


//adminweb-account
router.get("/adminweb/account", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-account';
    var diskripsi='';
    var navatasactive='adminweb-account';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminweb-account',{titlepage:'Admin Web Account',diskripsi,czz,versionall,jzz,navatasactive,datas,roles});
    });
    
});

//adminweb-promotion
router.get("/adminweb/promotion", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-promotion';
    var diskripsi='';
    var navatasactive='adminweb-promotion';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='voucher';
    res.status(200).render('adminweb-promotion',{titlepage:'Admin Web Promotion',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});

//adminweb-promotion/promotion-statistik
router.get("/adminweb/promotion/statistik", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-promotion-statistik';
    var diskripsi='';
    var navatasactive='promotion-statistik';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='promotion-statistik';
    res.status(200).render('adminweb-promotion-statistik',{titlepage:'Admin Web Promotion',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});

router.post('/adminweb-promotion-addvoucher', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-promotion-addvoucher';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/adminweb-promotion-inactive', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-promotion-inactive';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/adminweb-promotion-unhide', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-promotion-unhide';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/adminweb-promotion-deletevoucher', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-promotion-deletevoucher';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-promotion-flashsale
router.get("/adminweb/promotion/flashsale", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-promotion-flashsale';
    var diskripsi='';
    var navatasactive='adminweb-promotion-flashsale';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='flashsale';
    res.status(200).render('adminweb-promotion-flashsale',{titlepage:'Admin Web Flashsale',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});

//addflashsale
router.post('/adminweb-promotion-addflashsale', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-promotion-addflashsale';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});
//adminweb-promotion-deleteflashsale
router.post('/adminweb-promotion-deleteflashsale', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-promotion-deleteflashsale';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


//adminweb-promotion-deletelabelproduk
router.post('/adminweb-promotion-deletelabelproduk', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-promotion-deletelabelproduk';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});



//adminweb-promotion-labelproduk
router.get("/adminweb/promotion/labelproduk", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-promotion-labelproduk';
    var diskripsi='';
    var navatasactive='adminweb-promotion-labelproduk';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='labelproduk';
    res.status(200).render('adminweb-promotion-labelproduk',{titlepage:'Admin Web Label Produk',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});


//adminweb-promotion-pointsetting
router.get("/adminweb/promotion/pointsetting", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-promotion-pointsetting';
    var diskripsi='';
    var navatasactive='adminweb-promotion-pointsetting';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='pointsetting';
    res.status(200).render('adminweb-promotion-pointsetting',{titlepage:'Admin Web Point Setting',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});


//adminweb-additionalcharge
router.get("/adminweb/additionalcharge", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-additionalcharge';
    var diskripsi='';
    var navatasactive='adminweb-additionalcharge';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='additionalcharge';
    res.status(200).render('adminweb-additionalcharge',{titlepage:'Admin Web Additional Charge',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});

router.post('/adminweb/additionalcharge-savenew', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-additionalcharge-savenew';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/adminweb/additionalcharge-saveedit', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-additionalcharge-saveedit';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


///adminweb/reward
router.get("/adminweb/reward", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-reward';
    var diskripsi='';
    var navatasactive='adminweb-reward';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='reward';
    res.status(200).render('adminweb-reward',{titlepage:'Admin Web Reward',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});

//adminweb/reward/exchangepoint
router.get("/adminweb/reward/exchangepoint", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-reward-exchangepoint';
    var diskripsi='';
    var navatasactive='adminweb-reward-exchangepoint';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='exchangepoint';
    var menuatas_exchange='exchangepoint';
    res.status(200).render('adminweb-reward-exchangepoint',{titlepage:'Admin Web Exchange Point',diskripsi,czz,versionall,jzz,navatasactive,menuatas,menuatas_exchange,roles});
    
});

//adminweb/reward/exchangepoint
router.get("/adminweb/reward/request-reward", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-reward-request-reward';
    var diskripsi='';
    var navatasactive='adminweb-reward-request-reward';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='exchangepoint';
    var menuatas_exchange='request-reward';
    res.status(200).render('adminweb-reward-request-reward',{titlepage:'Admin Web Exchange Point',diskripsi,czz,versionall,jzz,navatasactive,menuatas,menuatas_exchange,roles});
    
});

//adminweb-reward-addexchangepoint
router.post('/adminweb-reward-addexchangepoint', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-reward-addexchangepoint';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});



//adminweb-transaction
router.get("/adminweb/transaction", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-transaction';
    var diskripsi='';
    var navatasactive='adminweb-transaction';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='transaction';
    res.status(200).render('adminweb-transaction',{titlepage:'Admin Web Transaction',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});
//adminweb-transaction-cekstatusbayar
router.post('/adminweb-transaction-cekstatusbayar', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-transaction-cekstatusbayar';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});
//adminweb-transaction-nolrupiah
router.get("/adminweb/transaction-nolrupiah", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-transaction-nolrupiah';
    var diskripsi='';
    var navatasactive='adminweb-transaction';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='transaction-nolrupiah';
    res.status(200).render('adminweb-transaction',{titlepage:'Admin Web Transaction 0 Rupiah',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});
//transaction-nolrupiah-produkdikirim
router.post('/adminweb-transaction-nolrupiah-produkdikirim', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-transaction-nolrupiah-produkdikirim';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});
//download excel data penjualan
router.post('/adminwebtrans-downloadexcel', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var data = req.body;

    var bukawal = 'adminwebtrans-downloadexcel';

    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


///adminweb/utm
router.get("/adminweb/utm", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-utm';
    var diskripsi='';
    var navatasactive='adminweb-utm';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='utm';
    res.status(200).render('adminweb-utm',{titlepage:'Admin Web UTM',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});

router.post('/adminweb-utm-addutm', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-utm-addutm';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/adminweb-utm-deleteutm', async function (req, res) {
     const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal='adminweb-utm-deleteutm';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


///adminweb/utm
router.get("/adminweb/utm-checkout", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-utm-checkout';
    var diskripsi='';
    var navatasactive='adminweb-utmcheckout';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='utmcheckout';
    res.status(200).render('adminweb-utm-checkout',{titlepage:'Admin Web UTM',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});


///adminweb/utm-statistik
router.get("/adminweb/utm-statistik", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head',"tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-utm-statistik';
    var diskripsi='';
    var navatasactive='adminweb-utm';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='utmstatistik';
    res.status(200).render('adminweb-utm-statistik',{titlepage:'Admin Web UTM Statistik',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});


///adminweb/utm-statistik
router.get("/adminweb/utm-statistik-pengunjung", checkRole(['Website Admin', "Supervisor",'Admin C10','Admin Head,"tim sukses"']), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    var roles = '';
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        roles = datausers.tipeuser.toLowerCase();
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminweb/adminweb-utm-statistik-pengunjung';
    var diskripsi='';
    var navatasactive='adminweb-utm';

    /* var bukawal='awal';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        
    }); */
    var menuatas='utmstatistikpengunjung';
    res.status(200).render('adminweb-utm-statistik-pengunjung',{titlepage:'Admin Web UTM Statistik',diskripsi,czz,versionall,jzz,navatasactive,menuatas,roles});
    
});










////////////////////////////////////////////////////////////





export default router;