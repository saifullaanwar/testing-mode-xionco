import express from 'express';
import { Worker } from 'worker_threads';
import cookieParser from 'cookie-parser';
import basicAuth from '../config/basicAUth.js';
const router = express.Router();

/////////////////////// adminlist /////////////////////////////////
router.get("/adminlist", function (req, res) {

    var bukawal = 'awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});
/////////////////////// adminlist /////////////////////////////////

// GET Supervisor
router.get('/supervisor', function (req, res) {
    var bukawal = 'awal';
    const worker = new Worker('./worker/workersupervisor.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
})

// stock c5/universal
router.get("/stock", function (req, res) {

    var bukawal = 'awal';
    const worker = new Worker('./worker/workerstock.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

// stock c5/stockup
router.get("/stockup", function (req, res) {

    var bukawal = 'awal-up';
    const worker = new Worker('./worker/workerstock.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

// stock addstockup
router.get("/addstockup", function (req, res) {

    var bukawal = 'awal-addstockup';
    const worker = new Worker('./worker/workerstock.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

// stock c5 riwayat
router.get("/riwayatc5", function (req, res) {

    var bukawal = 'riwayatproduk';
    const worker = new Worker('./worker/workerstock.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

// Route daftar pembelian
router.get("/daftarpembelian/request", function (req, res) {
    var bukawal = 'awal';
    const worker = new Worker('./worker/workerprocurement.js', { workerData: { bukawal } });
    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

// Route invoice vendor
router.get("/invoicevendor", function (req, res) {
    var bukawal = 'awal-investor';
    const worker = new Worker('./worker/workerfinance-awal.js', { workerData: { bukawal } });
    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

// Route investor
router.get("/investor", function (req, res) {
    var bukawal = 'awal-investor';
    const worker = new Worker('./worker/workerfinance-awal.js', { workerData: { bukawal } });
    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

// Route driver pesanan bermasalah
router.get('/pesananbermasalah', function (req, res) {
    var bukawal = 'awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal } });
    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
})

//database
router.get("/editdatabase", function (req, res) {
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
    var bukawal = 'apieditdatabase';
    const worker = new Worker('./worker/workereditdatabase.js', { workerData: { bukawal, rolesuser } });
    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});
//

//admin web banner page
router.get("/adminweb-homepage", function (req, res) {
    var bukawal = 'adminweb-homepage';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal } });
    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});
//

//admin web 
router.get("/adminweb-homepage-eventpage", function (req, res) {
    var bukawal = 'adminweb-homepage-eventpage';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal } });
    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});
//

//kategori
router.get("/adminweb-kategori", function (req, res) {

    var bukawal = 'adminweb-kategori';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

//product
router.get("/adminweb-product", function (req, res) {

    var bukawal = 'adminweb-product';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

// admin web
router.get("/adminweb-account", function (req, res) {

    var bukawal = 'adminweb-account';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

router.post('/adminweb-account-edit', async function (req, res) {
    try {
        var bukawal = 'adminweb-account-edit';

        // Validasi data yang diterima
        const { id, namalengkap, username, email, nohandphone } = req.body;

        if (!id || !namalengkap || !username || !email) {
            return res.status(400).json({
                success: false,
                message: 'Data tidak lengkap. ID, nama, username, dan email wajib diisi.'
            });
        }

        // Pass data ke worker
        const worker = new Worker('./worker/workeradminweb.js', {
            workerData: {
                bukawal,
                userData: req.body // kirim data user ke worker
            }
        });

        worker.on('message', (datas) => {
            res.status(200).json(datas);
        });

        worker.on('error', (error) => {
            console.error('Worker error:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server'
            });
        });

        // Set timeout untuk worker
        setTimeout(() => {
            worker.terminate();
            if (!res.headersSent) {
                res.status(408).json({
                    success: false,
                    message: 'Request timeout'
                });
            }
        }, 30000); // 30 detik timeout

    } catch (error) {
        console.error('Route error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server'
        });
    }
});

// promotion 
router.get("/adminweb-promotion-voucher", function (req, res) {

    var bukawal = 'adminweb-promotion-voucher';
    var data = req.body;

    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

// promotion flashsale
router.get("/adminweb-promotion-flashsale", function (req, res) {

    var bukawal = 'adminweb-promotion-flashsale';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

// request-send
router.post('/adminweb-promotion-cekflashsale-exp', async function (req, res) {
    /* const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    } */

    var bukawal = 'adminweb-promotion-cekflashsale-exp';
    //var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//additional charge 
router.get("/adminweb-additionalcharge", function (req, res) {

    var bukawal = 'adminweb-additionalcharge';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

//adminweb-reward
router.get('/adminweb-reward', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'adminweb-reward';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-reward-exchangepoint
router.get('/adminweb-reward-exchangepoint', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'adminweb-reward-exchangepoint';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-reward-request-reward
router.get('/adminweb-reward-request-reward', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'adminweb-reward-request-reward';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//reward point setting
router.post('/adminweb-savepointsetting', async function (req, res) {
    /* const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    } */

    var bukawal = 'adminweb-savepointsetting';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-transaction
router.get('/adminweb-transaction', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'adminweb-transaction';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

// wheel-send
router.post('/adminweb-reward-wheel-send', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'adminweb-reward-wheel-send';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

// request-send
router.post('/adminweb-reward-request-send', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'adminweb-reward-request-send';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

// GET adminweb-probability
router.get('/adminweb-spin-probability', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    if (!cekauthoriz) {
        return res.status(403).send('Unauthorized!');
    }

    const bukawal = 'adminweb-spin-probability';
    const data = req.body;

    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

// update probability
router.post('/adminweb-spin-update-probability', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    if (!cekauthoriz) {
        return res.status(403).send('Unauthorized!');
    }

    const bukawal = 'adminweb-spin-update-probability';
    const data = req.body;

    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

// Get Label Product
router.get("/adminweb-promotion-labelproduct", function (req, res) {

    var bukawal = 'adminweb-promotion-labelproduct';
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });

});

// Post label product
router.post('/adminweb-promotion-addlabelproduct', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'adminweb-promotion-addlabelproduct';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//adminweb-utm
router.get('/adminweb-utm', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'adminweb-utm';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workeradminweb.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

////////////////////////////////////
//finance-gayahidup
router.get('/finance-gayahidup', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var bukawal = 'finance-gayahidup';
    var data = req.body;
    //console.log(req.body);
    const worker = new Worker('./worker/workerfinance-awal.js', { workerData: { bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


////////////////////////////////////
//statistik
router.get('/statistik', async function (req, res) {
    var bukawal = 'awal';
    const worker = new Worker('./worker/workerstatistik.js', { workerData: { bukawal } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

export default router;