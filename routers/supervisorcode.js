import express from 'express';
import { Worker } from 'worker_threads';
import cookieParser from 'cookie-parser';
import basicAuth from '../config/basicAUth.js';
import checkRole from './checkRole.js';


const router = express.Router();

router.get("/", checkRole(["supervisor","tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);

        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }


    res.redirect('/supervisor/produksipesanan');

});

router.get("/produksipesanan", checkRole(["supervisor","tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }

    var versionall = "?v=" + Math.random();
    var czz = "/css/adminlist.css" + versionall;
    var jzz = 'supervisor/supervisor';
    var diskripsi = '';
    var navatasactive = 'supervisor-semuapesanan';
    var tugassaya = '';

    var roles=datausers.tipeuser.toLowerCase();

    var bukawal = 'awal';
    // const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal } });

    // worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('supervisor', { titlepage: 'Produksi Pesanan', diskripsi, czz, versionall, jzz, navatasactive, tugassaya,roles});
    // });

});

router.get("/produksipesanan/tugassaya", checkRole(["supervisor","tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);

        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }

    var versionall = "?v=" + Math.random();
    var czz = "/css/adminlist.css" + versionall;
    var jzz = 'supervisor/supervisor-tugassaya';
    var diskripsi = '';
    var navatasactive = 'supervisor-semuapesanan';
    var tugassaya = 'tugassaya';

    var roles=datausers.tipeuser.toLowerCase();
    // var bukawal = 'awal';
    // const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal } });

    // worker.on('message', (datas) => {
    //     //res.status(200).send(datas);
        res.status(200).render('supervisor', { titlepage: 'Produksi Pesanan', diskripsi, czz, versionall, jzz, navatasactive, tugassaya,roles});
    // });

});

router.get("/produksistock", checkRole(["supervisor","tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);

        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }


    var versionall = "?v=" + Math.random();
    var czz = "/css/adminlist.css" + versionall;
    var jzz = 'supervisor/supervisor-stock';
    var diskripsi = '';
    var navatasactive = 'supervisor-stock';
    var tugassaya = '';

    var roles=datausers.tipeuser.toLowerCase();
    // var bukawal = 'awal';
    // const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal } });

    // worker.on('message', (datas) => {
    //     //res.status(200).send(datas);
        res.status(200).render('supervisor-stock', { titlepage: 'Produksi Pesanan', diskripsi, czz, versionall, jzz, navatasactive, tugassaya,roles});
    // });

});

router.get("/approvalforcestatus", checkRole(["supervisor","tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);

        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }

    var versionall = "?v=" + Math.random();
    var czz = "/css/adminlist.css" + versionall;
    var jzz = 'supervisor/supervisor-forcestatus';
    var diskripsi = '';
    var navatasactive = 'supervisor-forcestatus';
    var tugassaya = '';

    var roles=datausers.tipeuser.toLowerCase();
    // var bukawal = 'awal';
    // const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal } });

    // worker.on('message', (datas) => {
    //     //res.status(200).send(datas);
        res.status(200).render('supervisor-forcestatus', { titlepage: 'Approval Force Status', diskripsi, czz, versionall, jzz, navatasactive, tugassaya,roles});
    // });

});

// Route Approval Kasbon
router.get("/approvalkasbon", checkRole(["supervisor","tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);

        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }

    var versionall = "?v=" + Math.random();
    var czz = "/css/adminlist.css" + versionall;
    var jzz = 'supervisor/supervisor-approvalkasbon';
    var diskripsi = '';
    var navatasactive = 'supervisor-approvalkasbon';
    var tugassaya = '';

    var roles=datausers.tipeuser.toLowerCase();
    // var bukawal = 'awal';
    // const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal } });

    // worker.on('message', (datas) => {
    //     //res.status(200).send(datas);
        res.status(200).render('supervisor-approvalkasbon', { titlepage: 'Approval Kasbon', diskripsi, czz, versionall, jzz, navatasactive, tugassaya,roles});
    // });

})


//pemantauan
router.get("/statuspesanan", checkRole(["supervisor","tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var rolesuser = 'supervisor';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        rolesuser = datausers.tipeuser;;
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }


    var versionall = "?v=" + Math.random();
    var czz = "/css/adminlist.css" + versionall;
    var jzz = 'supervisor/supervisor-statuspesanan';
    var diskripsi = '';
    var navatasactive = 'supervisor-statuspesanan';
    var tugassaya = '';
    
    var roles=datausers.tipeuser.toLowerCase();//var roles = 'supervisor';

    if (rolesuser.toLowerCase() == 'supervisor') {
        navatasactive = 'supervisor-statuspesanan';
        roles = 'supervisor';
    }

    // var bukawal = 'awal';
    // const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal } });//workeradminslit

    // worker.on('message', (datas) => {
    //     //res.status(200).send(datas);
        res.status(200).render('supervisor-status', { titlepage: 'Status Pesanan', diskripsi, czz, versionall, jzz, navatasactive, tugassaya, roles });
    // });

});

//pemantauan
router.get("/dataterlambat", checkRole(["supervisor","tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var rolesuser = 'supervisor';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        rolesuser = datausers.tipeuser;;
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }


    var versionall = "?v=" + Math.random();
    var czz = "/css/adminlist.css" + versionall;
    var jzz = 'supervisor/supervisor-terlambat';
    var diskripsi = '';
    var navatasactive = 'supervisor-terlambat';
    var tugassaya = '';

    var roles = rolesuser.toLowerCase();
    /* 
    if (rolesuser.toLowerCase() == 'supervisor') {
        navatasactive = 'supervisor-statuspesanan';
        roles = 'supervisor';
    } */

    // var bukawal = 'awal';
    // const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal } });//workeradminslit

    // worker.on('message', (datas) => {
    //     //res.status(200).send(datas);
        res.status(200).render('supervisor-terlambat', { titlepage: 'Keterlambatan', diskripsi, czz, versionall, jzz, navatasactive,tugassaya, roles });
    // });

});


// Riwayat
router.get("/riwayat", checkRole(["supervisor","tim sukses"]), function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken = cookies.hamburger;
    var rolesuser = 'supervisor';
    if (userToken) {
        // Cookie ditemukan
        datausers = JSON.parse(cookies.hamburger);
        rolesuser = datausers.tipeuser;;
        console.log(datausers);
    } else {
        datausers = [];
        console.log(datausers);
    }


    var versionall = "?v=" + Math.random();
    var czz = "/css/adminlist.css" + versionall;
    var jzz = 'supervisor/supervisor-riwayat';
    var diskripsi = '';
    var navatasactive = 'supervisor-riwayat';
    var tugassaya = '';

    var flag = true;//true sesuai role
    var roles = rolesuser.toLowerCase();//'supervisor';


    if (roles != 'supervisor') {
        flag = false;
    }

    if (flag) {
        // var bukawal = 'awal';
        // const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal } });//workeradminslit

        // worker.on('message', (datas) => {
        //     //res.status(200).send(datas);
            res.status(200).render('supervisor-riwayat', { titlepage: 'Riwayat | Supervisor', diskripsi, czz, versionall, jzz, navatasactive, tugassaya, roles });
        // });
    } else {
        czz = "/css/404.css" + versionall;
        res.status(404).render('404', { titlepage: '404', diskripsi, czz, versionall, jzz: '404' });
    }
});

//force status
router.post('/allsaveforcestatusapproved',async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var data = req.body;
    console.log(data);

    var bukawal = 'allsaveforcestatusapproved';

    const worker = new Worker('./worker/worekersaveforcestatus-tosupervisor.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//rejek produk pesanan jadi
router.post('/saverejectapproval', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    //const id_transaksi=req.body.id_transaksi;

    //const status = req.body.status;

    //const history=JSON.stringify(req.body.history);

    var data = req.body;

    var bukawal = 'saverejectapproval';

    const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//download excel data penjualan
router.post('/downloadexcel', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var data = req.body;

    var bukawal = 'downloadexcel';

    const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});



export default router;