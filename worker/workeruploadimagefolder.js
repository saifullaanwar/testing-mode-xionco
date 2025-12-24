import { parentPort, workerData } from 'worker_threads';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path'; // Tambahkan path untuk ekstensi file

(async () => { // Menggunakan async IIFE agar bisa menggunakan await di top-level
    try {
        console.log('Worker Thread: Mulai pemrosesan gambar...');

        const { foldersaveit, images } = workerData;

        const uploadedFilesInfo = []; // Untuk menyimpan info setiap file yang diunggah

        for (const image of images) {
            const { buffer, originalname, mimetype } = image;

            // Pastikan originalname ada dan bukan undefined
            if (!originalname) {
                console.warn('Skipping file due to missing originalname:', image);
                continue; // Lewati file ini dan lanjutkan ke file berikutnya
            }

            // Gunakan originalname langsung sebagai nama file karena sudah unik dari client
            const filenameToSave = originalname; 

            // Tentukan folder penyimpanan Anda
            // Tidak perlu ada folder tahun lagi jika nama file sudah unik dengan timestamp.
            const baseUploadDir = `./assets/${foldersaveit}/`; // Folder dasar Anda

            // Pastikan folder baseUploadDir ada. Ini juga bisa dilakukan di router atau app.js.
            if (!fs.existsSync(baseUploadDir)) {
                fs.mkdirSync(baseUploadDir, { recursive: true });
                console.log(`Folder '${baseUploadDir}' berhasil dibuat.`);
            }

            // Gabungkan path folder dengan nama file
            const filePath = path.join(baseUploadDir, filenameToSave);

            // Proses dan simpan gambar menggunakan sharp
            await sharp(buffer)
                .webp({ quality: 100 }) // Kompresi ke WebP dengan kualitas 20%
                .toFile(filePath);

            uploadedFilesInfo.push({
                originalname: originalname,
                filename: filenameToSave,
                path: filePath,
                url: `/assets/${foldersaveit}/${filenameToSave}` // URL yang dapat diakses publik
            });
        }

        console.log('Worker Thread: Semua gambar berhasil diproses.');
        parentPort.postMessage({ uploaded: 'file terupload', files: uploadedFilesInfo });

    } catch (error) {
        console.error('Worker Thread Error:', error);
        parentPort.postMessage({ uploaded: 'file_gagal_terupload', message: error.message });
    }
})();