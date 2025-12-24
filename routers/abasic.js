import express from 'express';
import { Worker } from 'worker_threads';
import cookieParser from 'cookie-parser';
//import userdata from '../mogosDB/mongosdata.js';
const router = express.Router();

//landing page awal
router.get("/", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/index.css" + versionall;
    var jzz='index';
    var diskripsi='';

    res.status(200).render('index',{titlepage:'PT Halim Inti Gahara',diskripsi,czz,versionall,jzz});
});


export default router;