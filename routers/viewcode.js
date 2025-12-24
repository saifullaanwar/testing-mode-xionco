import express from 'express';
import { Worker } from 'worker_threads';
//import userdata from '../mogosDB/mongosdata.js';
const router = express.Router();

//viewfile
router.get("/", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/index.css" + versionall;
    var jzz='viewimgvid';
    var diskripsi='';

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


    res.status(200).render('viewimgvid',{titlepage:'View image atau video',diskripsi,czz,versionall,jzz,roles});
});


export default router;