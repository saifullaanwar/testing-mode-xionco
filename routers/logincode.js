import express from 'express';
import { Worker } from 'worker_threads';
import cookieParser from 'cookie-parser';
import basicAuth from '../config/basicAUth.js';
//import database from '../config/connection.js';
const router = express.Router();

router.get("/", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz = "/css/404.css" + versionall;
    var jzz = '404';
    var diskripsi = '404';

    res.status(404).render('404', { titlepage: '404', diskripsi, czz, versionall, jzz });
});

router.post('/sendlogins', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    const username = req.body.username;
    const password = req.body.password;
    const worker = new Worker('./worker/workerlogin.js', { workerData: { username, password } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.get('/ceknewdatarole', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    const bukaawal = 'awal';
    const worker = new Worker('./worker/workeruniversal.js', { workerData: { bukaawal} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/sendtokenflutter', async function (req, res) {
    // const cekauthoriz = await basicAuth(req.headers.authorization);
    // //console.log(cekauthoriz);
    // if (cekauthoriz != true || cekauthoriz != true) {
    //     return res.status(403).send('Unauthorized!');
    // }

    const data = req.body;
    console.log('xxxxx',data)
    const bukaawal = 'awal';
    const worker = new Worker('./worker/flutter/workerflutter.js', { workerData: { bukaawal, data } });

    worker.on('message', (datas) => {
        res.status(datas.status).send(datas);
        res.end();
    });
});

export default router;