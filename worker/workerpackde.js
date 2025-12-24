import { parentPort, workerData } from 'worker_threads';
import sharp from 'sharp';
import {database,dtbase2} from '../config/connection.js';
import fs from 'fs';

sharpsc();

async function sharpsc() {
    if (workerData.saveorupload=='ambil') {
        try {
            console.log('2')
            /* const { file } = workerData.req;
            if (!file) {
                parentPort.postMessage({
                    success: false, message:
                        'Error system - file not supplied'
                });
            } */
            

            const { buffer, originalname } = workerData.imges;
            const timestamp = new Date().toISOString();
            const ref = `${originalname}`;
            
            const filenamefix = originalname;
            const nameWithoutExt = filenamefix.replace(/\.[^/.]+$/, ""); 

            var folderyear=nameWithoutExt.split('-')[2];
            console.log(`nameeee == ${folderyear}`);

            const folderPath = './assets/packde-ambil/'+folderyear;

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
                console.log('Folder berhasil dibuat!');

                
            }  
            await sharp(buffer)
            .webp({ quality: 20 })
            .toFile(folderPath +"/"+ ref);
        
            //return res.send('file terupload');
            parentPort.postMessage({uploaded:'file terupload'});
        } catch (error) {
            /* return res.status(500).json({
                success: false, message:
                    error.message +500
            }); */
            parentPort.postMessage({uploaded:'file gagal terupload'});
        }
    }else if (workerData.saveorupload=='qc') {
        try {
            console.log('2');
            /* const { file } = workerData.req;
            if (!file) {
                parentPort.postMessage({
                    success: false, message:
                        'Error system - file not supplied'
                });
            } */
            

            const { buffer, originalname } = workerData.imges;
            const timestamp = new Date().toISOString();
            const ref = `${originalname}`;
            
            const filenamefix = originalname;
            const nameWithoutExt = filenamefix.replace(/\.[^/.]+$/, ""); 

            var folderyear=nameWithoutExt.split('-')[2];
            console.log(`nameeee == ${folderyear}`);

            const folderPath = './assets/packde-qc/'+folderyear;

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
                console.log('Folder berhasil dibuat!');

                
            }  
            await sharp(buffer)
            .webp({ quality: 20 })
            .toFile(folderPath +"/"+ ref);
        
            //return res.send('file terupload');
            parentPort.postMessage({uploaded:'file terupload'});
           
        } catch (error) {
            /* return res.status(500).json({
                success: false, message:
                    error.message +500
            }); */
            parentPort.postMessage({uploaded:'file gagal terupload'});
        }
    }else if(workerData.saveorupload=='kirimbahan'){
        try {
            console.log('2');
            /* const { file } = workerData.req;
            if (!file) {
                parentPort.postMessage({
                    success: false, message:
                        'Error system - file not supplied'
                });
            } */
            

            const { buffer, originalname } = workerData.imges;
            const timestamp = new Date().toISOString();
            const ref = `${originalname}`;
            
            const filenamefix = originalname;
            const nameWithoutExt = filenamefix.replace(/\.[^/.]+$/, ""); 

            var folderyear=nameWithoutExt.split('-')[2];
            console.log(`nameeee == ${folderyear}`);

            const folderPath = './assets/kirimbahan/'+folderyear;

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
                console.log('Folder berhasil dibuat!');

                
            }  
            await sharp(buffer)
            .webp({ quality: 20 })
            .toFile(folderPath +"/"+ ref);
        
            //return res.send('file terupload');
            parentPort.postMessage({uploaded:'file terupload'});
           
        } catch (error) {
            /* return res.status(500).json({
                success: false, message:
                    error.message +500
            }); */
            parentPort.postMessage({uploaded:'file gagal terupload'});
        }
    }
    else if (workerData.saveorupload=='video-ambil') {
        // Simulasi proses tambahan setelah upload (misal: verifikasi file)
        setTimeout(() => {
            const { filename, filepath } = workerData;
        
            if (!fs.existsSync(filepath)) {
                parentPort.postMessage({ error: 'File tidak ditemukan setelah upload!' });
            } else {
                parentPort.postMessage({ message: `file terupload` });
            }
        }, 2000); // Simulasi proses dengan delay 2 detik
    }
    else{
        
        let setnewdata = `UPDATE admlistdata SET id_transaksi='${workerData.id_transaksi}',history='${workerData.history}',upholstery_jadi='true' WHERE BINARY id_transaksi='${workerData.id_transaksi}'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
            if (datax.affectedRows == 1) {
                parentPort.postMessage({ icons: "success", texts: "Save sukses", titles: "" });
            }else{
                parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi", titles: "" });
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
}