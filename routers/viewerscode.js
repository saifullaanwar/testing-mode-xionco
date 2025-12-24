import express from "express"
import { Worker } from 'worker_threads';

const router = express.Router()



router.get("/", function (req, res) {
    // const cookies = req.cookies;
    var datausers;
    datausers = []
    // var userToken=cookies.hamburger;
    // if (userToken) {
    //     // Cookie tidak ditemukan
    //     datausers=JSON.parse(cookies.hamburger);
        
    //     console.log(datausers);
    // }else{
    //     datausers=[];
    //     console.log(datausers);
    // }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='viewers/viewers';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';

    // var bukawal='awal';
    // const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    // worker.on('message', (datas) => {
    //     //res.status(200).send(datas);
        res.status(200).render('viewers',{titlepage:'Guests',diskripsi,czz,versionall,jzz,navatasactive});
    // });
})

export default router