import { parentPort, workerData } from 'worker_threads';
import { database, dtbase2 } from '../config/connection.js';

// Mengambil data dari workerData
const username = workerData.username;
const password = workerData.password;

// 1. Cek Username di Database
const cekusername = `SELECT * FROM dataslogin WHERE BINARY username = ?`;

database.query(cekusername, [username], (err, results) => {
    // PROTEKSI: Jika terjadi error koneksi atau database mati
    if (err) {
        console.error("Database Error (cekusername):", err);
        return parentPort.postMessage({ 
            icons: "error", 
            texts: "Koneksi database gagal atau terputus.", 
            titles: "Database Error" 
        });
    }

    // PROTEKSI: Cek apakah results ada dan memiliki isi
    if (!results || results.length <= 0) {
        return parentPort.postMessage({ 
            icons: "error", 
            texts: "Username belum terdaftar", 
            titles: "Oops ..." 
        });
    }

    // 2. Cek Password
    const user = results[0];
    if (user.password === password) {
        const roleuser = user.tipeuser;
        
        // Generate Format Tanggal Last Login
        const d = new Date();
        const day = ("0" + d.getDate()).slice(-2);
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();
        const tglonline = `${day}/${month}/${year} ${d.toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}`;
        const ondate = tglonline.replaceAll('.', ':');

        // 3. Update Last Login ke Database
        const sqlUpdate = "UPDATE dataslogin SET last_login = ? WHERE BINARY username = ?";
        database.query(sqlUpdate, [ondate, username], (errUpdate, updateResults) => {
            if (errUpdate || !updateResults || updateResults.affectedRows === 0) {
                console.error("Update Error:", errUpdate);
                return parentPort.postMessage({ 
                    icons: "error", 
                    texts: "Gagal memperbarui data login.", 
                    titles: "Error" 
                });
            }

            // 4. Ambil Data Role User
            const cekroleuser = `SELECT * FROM datasuserrole WHERE BINARY tipeuser = ?`;
            database.query(cekroleuser, [roleuser], (errRole, resultsrole) => {
                if (errRole || !resultsrole || resultsrole.length <= 0) {
                    return parentPort.postMessage({ 
                        icons: "error", 
                        texts: "Role user tidak ditemukan di sistem.", 
                        titles: "Oops ..." 
                    });
                }

                const dataroleuser = resultsrole[0];
                let link = '/';
                
                // Redirect khusus Supervisor
                if (roleuser.toLowerCase() === 'supervisor') {
                    link = '/editdatabase/deliveryunit';
                }

                // Keamanan: Hapus password sebelum dikirim ke frontend
                const datauserSent = { ...user };
                delete datauserSent.password;

                // Kirim hasil sukses ke main thread
                parentPort.postMessage({ 
                    icons: "success", 
                    texts: "Login berhasil", 
                    titles: "Berhasil",
                    datauser: datauserSent,
                    link: link,
                    dataroleuser: dataroleuser
                });
            });
        });
    } else {
        // Jika Password Salah
        parentPort.postMessage({ 
            icons: "error", 
            texts: "Password yang Anda masukkan salah", 
            titles: "Oops ..." 
        });
    }
});