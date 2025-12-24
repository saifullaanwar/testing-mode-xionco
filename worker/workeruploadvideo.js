import { parentPort, workerData } from 'worker_threads';
import fs from 'fs';

// Simulasi proses tambahan setelah upload (misal: verifikasi file)
setTimeout(() => {
    const { filename, filepath } = workerData;

    if (!fs.existsSync(filepath)) {
        parentPort.postMessage({ error: 'File tidak ditemukan setelah upload!' });
    } else {
        parentPort.postMessage({ message: `file terupload` });
    }
}, 2000); // Simulasi proses dengan delay 2 detik