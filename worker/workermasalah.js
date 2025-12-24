import { parentPort, workerData } from 'worker_threads';
import sharp from 'sharp';
import {database,dtbase2} from '../config/connection.js';
import fs from 'fs';

sharpsc();

async function sharpsc() {
    if (workerData.saveorupload=='uploadimage') {
        try {
            console.log('2');

            const { buffer, originalname } = workerData.imges;
            const timestamp = new Date().toISOString();
            const ref = `${originalname}`;
            
            const filenamefix = originalname;
            const nameWithoutExt = filenamefix.replace(/\.[^/.]+$/, ""); 

            var folderyear=nameWithoutExt.split('-')[2];
            console.log(`nameeee == ${folderyear}`);

            const folderPath = './assets/pesananbermasalah/'+folderyear;

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
    }else if (workerData.saveorupload=='uploadvideo') {
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
}