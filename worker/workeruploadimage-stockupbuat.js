import { parentPort, workerData } from 'worker_threads';
import sharp from 'sharp';
//import {database,dtbase2} from '../config/connection.js';
import fs from 'fs';

uplodit();
async function uplodit() {
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

        const folderPath = './assets/upholstery-stock/'+folderyear;

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