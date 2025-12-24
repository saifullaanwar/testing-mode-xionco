// router.js
import express from 'express';
import { Worker } from 'worker_threads';
import multer from 'multer';
import path from 'path'; // Penting untuk Multer filename dan path
import fs from 'fs'; // Untuk membuat folder jika belum ada (opsional, bisa juga di worker)

// import basicAuth from '../config/basicAUth.js'; // Asumsikan ini sudah benar
const router = express.Router();

// --- Konfigurasi Multer ---
// Kita akan tetap menggunakan memoryStorage agar file bisa diakses oleh worker thread sebagai buffer
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Format file harus JPG/JPEG/PNG/GIF."), false); // Perbaiki pesan error
        }
    },
    //limits: { fileSize: 5 * 1024 * 1024 } // Batas ukuran file per gambar (misal: 5MB per file)
}).array("gambar"); // Menggunakan .array("gambar", 5); untuk 5 file dengan nama input "gambar"

router.post("/produkweb", (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // Tangani error spesifik dari Multer (misal: file terlalu besar, terlalu banyak file)
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).send("Ukuran file terlalu besar. Maksimal 5 MB per gambar.");
            }
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).send("Terlalu banyak file yang diunggah atau nama input tidak sesuai.");
            }
            return res.status(400).send(err.message);
        } else if (err) {
            // Tangani error umum atau error dari fileFilter
            return res.status(400).send(err.message || "Terjadi kesalahan saat mengunggah file.");
        }

        const { files } = req; // Sekarang ini adalah 'files', bukan 'file'
        if (!files || files.length === 0) {
            return res.status(400).send("Tidak ada file yang diunggah.");
        }

        // Kirim array file ke worker thread
        const worker = new Worker('./worker/workeruploadmultiple.js', {
            workerData: {
                saveorupload: 'produkweb',
                images: files // Mengirimkan array 'files'
            }
        });

        worker.on('message', (data) => {
            if (data.uploaded === 'file terupload') {
                res.status(200).json(data); // Kirim respons JSON agar bisa menyertakan info file
            } else {
                res.status(500).json(data); // Kirim respons JSON untuk error
            }
        });

        worker.on('error', (error) => {
            console.error('Worker error:', error);
            res.status(500).json({ uploaded: 'error_worker', message: error.message });
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            }
        });
    });
});

export default router;