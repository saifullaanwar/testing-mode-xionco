import express from 'express';
import compression from 'compression';
import minifyHTML from 'express-minify-html';
import cookieParser from 'cookie-parser';

const app = express();
import favicon from 'express-favicon';

import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import emitter from "./eventemiter.js";
emitter.setMaxListeners(50);
// environment 
import 'dotenv/config';
//
import { createServer } from "http";
const httpServer  = createServer(app);
import {Server} from 'socket.io';

const io =new Server(httpServer,{
    cors:{
        origin:'*',
    },
    serveClient: false
});
// simpan io di global / context agar bisa dipakai router
//app.set("io", io);

//
io.on('connection',function(socket){  
    console.log("A user is connected a");    
    socket.on('getawal',function(username){
        console.log('hai');
        io.emit('awal',{msg:'awal',usersoket:username});
        /* awal(username,function(res){
            if(res!=false){
                io.emit('awal',{msg:res,usersoket:username});
            } else {
                io.emit('error');
            }
        }); */
    });
    socket.on('additemadminlist',function(data){
        io.emit('newadditemadminlist',data);
        
        // io.emit('notif-adminlist',data);
        /* add_chat(chat,function(res){
            if(res){
                io.emit('refreshnewchat',chat);
            } else {
                io.emit('errorkirimchat');
            }
        }); */
    });
    socket.on('editfullitemadminlist',function(data){
        io.emit('neweditfullitemadminlist',data);
    });
    socket.on('quickedititemadminlist',function(data){
        io.emit('newquickedititemadminlist',data);
    });
    socket.on('editforcestatus',function(data){
        io.emit('neweditforcestatus',data);
    });
    socket.on('printpodo',function(data){
        io.emit('newprintpodo',data);
        
        // io.emit('notif-adminlist',data);
    });
    socket.on('upholsteryselesai',function(data){
        io.emit('newupholsteryselesai',data);
        
        // io.emit('notif-adminlist',data);
    });
    socket.on('packde-kirimbahan',function(data){
        io.emit('newpackde-kirimbahan',data);
        
        // io.emit('notif-adminlist',data);
    });
    socket.on('packde-ambil',function(data){
        io.emit('newpackde-ambil',data);
    });
    socket.on('packde-qc',function(data){
        io.emit('newpackde-qc',data);

        // io.emit('notif-adminlist',data);
    });
    socket.on('addstockproduk',function(data){
        io.emit('newaddstockproduk',data);
    });
    socket.on('editrefstockproduk',function(data){
        io.emit('neweditrefstockproduk',data);
    });

    socket.on('adminc5qc',function(data){
        io.emit('newadminc5qc',data);
        
        // io.emit('notif-adminlist',data);
    });

    socket.on('adminc5selesaikirim',function(data){
        io.emit('newadminc5selesaikirim',data);
        
        // io.emit('notif-adminlist',data);
    });

    socket.on('addstockup',function(data){
        io.emit('newaddstockup',data);
    });
    
    socket.on('klikprinpodo',function(data){
        io.emit('newklikprinpodo',data);
    });

    socket.on('driver-ambil',function(data){
        io.emit('newdriver-ambil',data);
        
        // io.emit('notif-adminlist',data);
    });

    socket.on('driver-terimakonsumen',function(data){
        io.emit('newdriver-terimakonsumen',data);
        
        // io.emit('notif-adminlist',data);
    });

    socket.on('addupdatestockup',function(data){
        io.emit('newaddupdatestockup',data);
    });
    
    socket.on('upholsteryfinisstock',function(data){
        io.emit('newupholsteryfinisstock',data);
    });

    socket.on('approvalproduk',function(data){
        io.emit('newapprovalproduk',data);
        
        // io.emit('notif-adminlist',data);
    });

    socket.on('packdereject-ambil',function(data){
        io.emit('newpackdereject-ambil',data);
    });

    socket.on('packdereject-qc',function(data){
        io.emit('newpackdereject-qc',data);
    });

    socket.on('driverreject-ambil',function(data){
        io.emit('newdriverreject-ambil',data);
    });

    socket.on('driverreject-terimakonsumen',function(data){
        io.emit('newdriverreject-terimakonsumen',data);
    });
    
    socket.on('laporanbermasalahs',function(data){
        io.emit('newlaporanbermasalahs',data);
    });
    
    socket.on('updatebermasalah',function(data){
        io.emit('newupdatebermasalah',data);
    });
    socket.on('approvalfinisstock',function(data){
        io.emit('newapprovalfinisstock',data);
    });
    socket.on('approvalforcestatuss',function(data){
        io.emit('newapprovalforcestatuss',data);
    });
    socket.on('editforcestatusnew',function(data){
        io.emit('neweditforcestatusnew',data);
    });

    socket.on('addreqbeli',function(data){
        io.emit('neweaddreqbeli',data);
    });

    socket.on('approvereqbeli',function(data){
        io.emit('neweapprovereqbeli',data);
    });

    socket.on('centangvendorreceipt',function(data){
        io.emit('newcentangvendorreceipt',data);
    });

    //addnew-katagori
    socket.on('addnew-katagori',function(data){
        io.emit('newaddnew-katagori',data);
    });

    //addnew-variantproduk
     socket.on('addnew-variantproduk',function(data){
        io.emit('newaddnew-variantproduk',data);
    });

    //addnew-editvariantproduk
    socket.on('addnew-editvariantproduk',function(data){
        io.emit('newaddnew-editvariantproduk',data);
    });

    //updateMproses
    socket.on('updateMproses',function(data){
        io.emit('updateMproses',data);
    });
    
    //updateproctempkiriinputplan
    socket.on('updateproctempkiriinputplan',function(data){
        io.emit('updateproctempkiriinputplan',data);
    });

    //updatePengingat
    socket.on('updatePengingat',function(data){
        io.emit('updatePengingat',data);
    });

    //editphase
    socket.on('editphase',function(data){
        io.emit('editphase',data);
    });

    //updateProcnote
    socket.on('updateProcnote',function(data){
        io.emit('updateProcnote',data);
    });

    //updateVendorBawah
    socket.on('updateVendorBawah',function(data){
        io.emit('updateVendorBawah',data);
    });
    
    //updatez_qtyBawah
    socket.on('updatez_qtyBawah',function(data){
        io.emit('updatez_qtyBawah',data);
    });

    //updatez_savetotalbayar    
    socket.on('updatez_savetotalbayar',function(data){
        io.emit('updatez_savetotalbayar',data);
    });

    //updatez_paymentatassele  
    socket.on('updatez_paymentatassele',function(data){
        io.emit('updatez_paymentatassele',data);
    });

    //updatez_saveeditrightbottom
    socket.on('updatez_saveeditrightbottom',function(data){
        io.emit('updatez_saveeditrightbottom',data);
    });

});

// dengarkan event dari router / worker
emitter.on("broadcast", (data) => {
    /* data= {iolink:'kode emitnya',item:'isi data yg mau diemit'}*/
    console.log("Emit dari EventEmitter:", data);
    io.emit(data.iolink, data.item);
});
//
//
import path from 'path';
const __dirname = path.resolve();

import abasic from './routers/abasic.js';//
import loginroute from './routers/logincode.js';//
import homeroute from './routers/homecode.js';//

import login from './routers/loginpagecode.js';

import supervisor from './routers/supervisorcode.js';//

import editdatabase from './routers/editdatabasecode.js';//

import api from './routers/api.js';



const port = 3009;

app.use(cookieParser()); // Middleware untuk membaca cookies
// compress all responses
app.use(compression());

//ejs
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/basic'),
    path.join(__dirname, 'views/layout'),
    path.join(__dirname, 'views/supervisor'),
    path.join(__dirname, 'views/editdatabase'),
]);

//cache
var options = {
    dotfiles: 'ignore',
    etag: false,
    index: false,
    maxAge: '1s',
    lastModified: true,
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
}
var optionsassets = {
    dotfiles: 'ignore',
    etag: false,
    index: false,
    maxAge: '1s',
    lastModified: true,
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
}
// Opsi khusus untuk folder assets/pridukimage (1 tahun)
var optionsPridukimage = {
    dotfiles: 'ignore',
    etag: true, // disarankan diaktifkan untuk caching panjang
    index: false,
    maxAge: '1y', // 1 tahun
    lastModified: true,
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
};
//middleware
app.use(express.static('public', options));

// taruh ini dulu supaya folder pridukimage dapat prioritas sebelum assets umum
app.use("/assets/pridukimage", express.static('assets/pridukimage', optionsPridukimage));

app.use("/assets", express.static('assets', optionsassets));

//
app.use(favicon(__dirname + '/assets/favicon.ico'));

//hapus saat deploy
app.use(morgan('dev'));
// for parsing application/x-www-form-urlencoded
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(cors());//corsOptions

//secyrity set
app.use(helmet.contentSecurityPolicy({
    useDefaults: false, // you can change it to `true` if you want.
    directives: {
        defaultSrc: [
            '\'self\'',
            '\'unsafe-inline\'',
            '\'unsafe-eval\'',
            'https://via.placeholder.com',
            'https://hig3141592653.my.id',
            'ws://localhost:3001',
            'http://localhost:3001',
            'https://*.googleapis.com',
            'https://*.google.com',
            'https://api.sandbox.midtrans.com',
            'https://*.tokopedia.net',
            'https://*.pinimg.com',
            'https://*.freepik.com',
            'https://*.unsplash.com',
            'https://*.tokopedia.com',
            'https://unpkg.com/aos@2.3.1/dist/aos.css',
            'https://unpkg.com/aos@2.3.1/dist/aos.js',
            'https://*.unpkg.com',
            'https://*.doubleclick.net',
            'https://*.xendit.co',
            'https://*.midtrans.com',
            'https://stats.g.doubleclick.net',
            'https://cdn.ampproject.org',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdn.socket.io',
            'https://static.cloudflareinsights.com',
            'https://stats.g.doubleclick.net',
            'https://code.jquery.com',
            'https://cdn.jsdelivr.net',
            'https://webicdn.com',
            'https://mdbcdn.b-cdn.net',
            'https://docs.google.com',
            'https://doc-04-0c-sheets.googleusercontent.com',
            'smtppro.zoho.com',
            'https://cdn.datatables.net',
            'https://www.gstatic.com',
            'https://drive.google.com',
            'https://doc-08-98-docs.googleusercontent.com',
            'https://script.google.com',
            'https://script.googleusercontent.com',
            'https://unpkg.com/unicode-emoji-json@0.5.0/data-ordered-emoji.json',
            'http://www.w3.org',
            'https://*.googleusercontent.com',
            "https://*.google.com",
            "https://*.google-analytics.com",
            "https://*.googletagmanager.com",
            'https://cdn.plyr.io',
            'https://*.instagram.com',
            'https://instagram.fsrg6-1.fna.fbcdn.net',
            'https://cdnjs.cloudflare.com',
            'https://cdn.ckeditor.com',
            "https://*.google.co.id",
            'https://www.wiris.net',
            'https://cke4.ckeditor.com',
        ],
        "style-src": [//styleSrc
            '\'self\'',
            '\'unsafe-inline\'',
            '\'unsafe-eval\'',
            'https://via.placeholder.com',
            'https://hig3141592653.my.id',
            'ws://localhost:3001',
            'http://localhost:3001',
            'https://*.googleapis.com',
            'https://*.google.com',
            'https://api.sandbox.midtrans.com',
            'https://*.unsplash.com',
            'https://*.pinimg.com',
            'https://*.tokopedia.net',
            'https://*.tokopedia.com',
            'https://*.freepik.com',
            'https://oktajianto.com',
            'https://unpkg.com/aos@2.3.1/dist/aos.css',
            'https://unpkg.com/aos@2.3.1/dist/aos.js',
            'https://*.unpkg.com',
            'https://*.doubleclick.net',
            'https://*.xendit.co',
            'https://*.midtrans.com',
            'https://stats.g.doubleclick.net',
            'https://cdn.ampproject.org',
            'https://fonts.googleapis.com',
            'https://cdn.socket.io',
            'https://static.cloudflareinsights.com',
            'https://cdn.jsdelivr.net',
            'https://code.jquery.com',
            'https://cdn.datatables.net',
            'https://www.gstatic.com',
            'https://webicdn.com',
            'https://drive.google.com',
            'https://doc-08-98-docs.googleusercontent.com',
            'https://script.google.com',
            'https://script.googleusercontent.com',
            'https://unpkg.com/unicode-emoji-json@0.5.0/data-ordered-emoji.json',
            'http://www.w3.org',
            'https://*.googleusercontent.com',
            "https://*.google.com",
            "https://*.google-analytics.com",
            "https://*.googletagmanager.com",
            'https://cdn.plyr.io',
            'https://*.instagram.com',
            'https://instagram.fsrg6-1.fna.fbcdn.net',
            'https://cdnjs.cloudflare.com',
            'https://cdn.ckeditor.com',
            "https://*.google.co.id",
            'https://www.wiris.net',
            'https://cke4.ckeditor.com',
        ],
        'img-src': [//imageSrc
            '\'self\'',
            '\'unsafe-inline\'',
            'data:',
            'blob:',
            'https://via.placeholder.com',
            'https://hig3141592653.my.id',
            'ws://localhost:3001',
            'http://localhost:3001',
            'https://*.googleapis.com',
            'https://*.google.com',
            'https://api.sandbox.midtrans.com',
            'https://*.freepik.com',
            'https://i.pinimg.com',
            'https://*.unsplash.com',
            'https://*.tokopedia.net',
            'https://*.tokopedia.com',
            'https://oktajianto.com',
            'https://unpkg.com/aos@2.3.1/dist/aos.css',
            'https://unpkg.com/aos@2.3.1/dist/aos.js',
            'https://*.unpkg.com',
            'https://*.doubleclick.net',
            'https://*.xendit.co',
            'https://*.midtrans.com',
            'https://stats.g.doubleclick.net',
            'https://cdn.ampproject.org',
            'https://fonts.googleapis.com',
            'https://cdn.socket.io',
            'https://static.cloudflareinsights.com',
            'https://webicdn.com',
            'https://code.jquery.com',
            'https://cdn.jsdelivr.net',
            'https://mdbcdn.b-cdn.net',
            'https://cdn.datatables.net',
            'https://*.gstatic.com',
            'https://drive.google.com',
            'https://doc-08-98-docs.googleusercontent.com',
            'https://script.google.com',
            'https://script.googleusercontent.com',
            'https://unpkg.com/unicode-emoji-json@0.5.0/data-ordered-emoji.json',
            'http://www.w3.org',
            'https://*.googleusercontent.com',
            "https://*.google.com",
            "https://*.google-analytics.com",
            "https://*.googletagmanager.com",
            'https://cdn.plyr.io',
            'https://*.instagram.com',
            'https://instagram.fsrg6-1.fna.fbcdn.net',
            'https://cdnjs.cloudflare.com',
            'https://cdn.ckeditor.com',
            "https://*.google.co.id",
            'https://www.wiris.net',
            'https://cke4.ckeditor.com',
        ],
        "script-src": [//scriptSrc
            '\'self\'',
            '\'unsafe-inline\'',
            'ws://localhost:3001',
            'http://localhost:3001',
            'https://via.placeholder.com',
            'https://hig3141592653.my.id',
            'https://*.googleapis.com',
            'https://*.google.com',
            'https://api.sandbox.midtrans.com',
            'https://*.freepik.com',
            'https://*.pinimg.com',
            'https://*.unsplash.com',
            'https://*.tokopedia.net',
            'https://*.tokopedia.com',
            'https://oktajianto.com',
            'https://unpkg.com/aos@2.3.1/dist/aos.css',
            'https://unpkg.com/aos@2.3.1/dist/aos.js',
            'https://*.unpkg.com',
            'https://*.doubleclick.net',
            'https://*.xendit.co',
            'https://*.midtrans.com',
            'https://stats.g.doubleclick.net',
            'https://cdn.ampproject.org',
            'https://fonts.googleapis.com',
            'https://cdn.socket.io',
            'https://static.cloudflareinsights.com',
            'https://code.jquery.com',
            'https://cdn.jsdelivr.net',
            'https://mdbcdn.b-cdn.net',
            'https://docs.google.com',
            'https://doc-04-0c-sheets.googleusercontent.com',
            'smtppro.zoho.com',
            'https://cdn.datatables.net',
            'https://www.gstatic.com',
            'https://webicdn.com',
            'https://drive.google.com',
            'https://doc-08-98-docs.googleusercontent.com',
            'https://script.google.com',
            'https://script.googleusercontent.com',
            'https://unpkg.com/unicode-emoji-json@0.5.0/data-ordered-emoji.json',
            'http://www.w3.org',
            'https://*.googleusercontent.com',
            "https://*.google.com",
            "https://*.google-analytics.com",
            "https://*.googletagmanager.com",
            'https://cdn.plyr.io',
            'https://*.instagram.com',
            'https://instagram.fsrg6-1.fna.fbcdn.net',
            'https://cdnjs.cloudflare.com',
            'https://cdn.ckeditor.com',
            "https://*.google.co.id",
            'https://www.wiris.net',
            'https://cke4.ckeditor.com',
        ],
        'connect-src': [
            '\'self\'',
            '\'unsafe-inline\'',
            'data:',
            'blob:',
            'ws://localhost:3001',
            'http://localhost:3001',
            'https://via.placeholder.com',
            'https://hig3141592653.my.id',
            'https://*.googleapis.com',
            'https://*.google.com',
            'https://api.sandbox.midtrans.com',
            'https://*.freepik.com',
            'https://*.unsplash.com',
            'https://*.pinimg.com',
            'https://*.tokopedia.net',
            'https://*.tokopedia.com',
            'https://oktajianto.com',
            'https://unpkg.com/aos@2.3.1/dist/aos.css',
            'https://unpkg.com/aos@2.3.1/dist/aos.js',
            'https://*.unpkg.com',
            'https://*.doubleclick.net',
            'https://*.xendit.co',
            'https://*.midtrans.com',
            'https://stats.g.doubleclick.net',
            'https://cdn.ampproject.org',
            'https://fonts.googleapis.com',
            'https://cdn.socket.io',
            'https://static.cloudflareinsights.com',
            'https://code.jquery.com',
            'https://cdn.jsdelivr.net',
            'https://mdbcdn.b-cdn.net',
            'https://docs.google.com',
            'https://doc-04-0c-sheets.googleusercontent.com',
            'smtppro.zoho.com',
            'https://cdn.datatables.net',
            'https://www.gstatic.com',
            'https://webicdn.com',
            'https://drive.google.com',
            'https://doc-08-98-docs.googleusercontent.com',
            'https://script.google.com',
            'https://script.googleusercontent.com',
            'https://unpkg.com/unicode-emoji-json@0.5.0/data-ordered-emoji.json',
            'http://www.w3.org',
            'https://*.googleusercontent.com',
            "https://*.google.com",
            "https://*.google-analytics.com",
            "https://*.googletagmanager.com",
            'https://cdn.plyr.io',
            'https://*.instagram.com',
            'https://instagram.fsrg6-1.fna.fbcdn.net',
            'https://cdnjs.cloudflare.com',
            'https://cdn.ckeditor.com',
            "https://*.google.co.id",
            'https://www.wiris.net',
            'https://cke4.ckeditor.com',
        ],
        'frame-src': [
            '\'self\'',
            '\'unsafe-inline\'',
            '\'unsafe-eval\'',
            'ws://localhost:3001',
            'http://localhost:3001',
            'https://via.placeholder.com',
            'https://hig3141592653.my.id',
            'https://*.googleapis.com',
            'https://*.google.com',
            'https://api.sandbox.midtrans.com',
            'https://*.freepik.com',
            'https://*.pinimg.com',
            'https://*.unsplash.com',
            'https://*.tokopedia.net',
            'https://*.tokopedia.com',
            'https://oktajianto.com',
        ]
    }
}));


app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));


app.set("trust proxy", true);
//app.use(redirectWwwTraffic);

app.use((req, res, next) => {
  res.locals.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  next();
});

app.get('/', abasic);

// routes
app.use("/home", homeroute);
app.use('/loginapi',loginroute);
// app.use('/adminlist',adminlist);

app.use('/login',login);

app.use('/supervisor',supervisor);

app.use('/editdatabase',editdatabase);

app.use("/api", api);



//Handling Error Get & Post 
app.use(function (req, res, next) {
    var versionall = "?v=" + Math.random();
    var czz = "/css/404.css" + versionall;
    var jzz = '404';

    var diskripsi = '404';

    console.log(res.statusCode + 'status');
    const line = `${req.method} ${req.originalUrl} ${res.statusCode}`
    console.log(line)
    res.status(404).render('404', { titlepage: '404', diskripsi, czz, versionall, jzz });
});
/* 
setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log(`Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
}, 5000); */
// Jalankan GC manual setiap 5 menit

setInterval(() => {
    if (global.gc) {
        global.gc();
        console.log(`[${new Date().toLocaleString()}] 🧹 Manual GC dijalankan`);
    }
}, 1 * 60 * 1000); // setiap 5 menit

httpServer.listen(port, () => {
    console.log('server nyala');
});