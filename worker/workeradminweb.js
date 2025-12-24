import { parentPort, workerData } from 'worker_threads';
import { database, dtbase2 } from '../config/connection.js';
import { unlink, rename } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import axios from 'axios';

// Konversi __dirname untuk ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var bukawal = workerData.bukawal;
var serverKey = process.env.serverkey; // Ganti dengan Server Key Anda


if (bukawal == 'awal') {

    try {
        const platformdata = await queryPromise(1, `SELECT * FROM platform`);

        const itemsdata = await queryPromise(1, `SELECT * FROM databaseallitem ORDER BY product ASC`);

        const colorvariantdata = await queryPromise(1, `SELECT * FROM databasecolorvariant`);

        const deliveryunitlist = await queryPromise(1, `SELECT * FROM deliveryunitlist ORDER BY thirdparty ASC`);

        const databaseallitem_main = await queryPromise(1, `SELECT * FROM databaseallitem_main`);

        const databasebank = await queryPromise(1, `SELECT * FROM databasebank`);

        // Mengirim data ke parentPort setelah semua query selesai
        parentPort.postMessage({
            platformdata, itemsdata, colorvariantdata, deliveryunitlist, databaseallitem_main, databasebank
        });

    } catch (error) {
        // --- Bagian yang dimodifikasi untuk detail error ---
        let errorMessage = 'Terjadi kesalahan tidak terduga saat mengambil data dari database.';

        // Cek apakah error memiliki properti 'sqlMessage' (umumnya dari driver MySQL)
        if (error.sqlMessage) {
            errorMessage = `SQL Error: ${error.sqlMessage}`;
            console.error('SQL Query yang gagal:', error.sql);
        } else if (error.message) {
            errorMessage = `Kesalahan: ${error.message}`;
        }

        console.error('Error saat mengambil data dari database:', errorMessage);

        // parentPort.postMessage({ error: error.message });
    } finally {
        // Menutup koneksi setelah semua query selesai atau terjadi error
        //closedatabsase(1);
    }

} else if (bukawal == 'adminweb-homepage') {
    const data_promo_link = await queryPromise(2, `SELECT * FROM data_promo_link`);
    const data_eventpage = await queryPromise(2, `SELECT * FROM data_eventpage`);
    parentPort.postMessage({
        data_promo_link, data_eventpage
    });
} else if (bukawal == 'adminweb-homepage-savebanner') {
    var link_img = `/assets/imagepromo/${workerData.data.promoname}`
    const data_promo_link = await queryPromise(2, `UPDATE data_promo_link SET link_img = ?, link_click = ? WHERE id = ?`, [link_img, workerData.data.link_click, workerData.data.promoname == 'bigbanner.png' ? 1 : 2]);

    if (data_promo_link.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'sukses save' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'gagal save' });
    }
} else if (bukawal == 'adminweb-homepage-eventpage') {
    const data_eventpage = await queryPromise(2, `SELECT * FROM data_eventpage`);
    const databaseallitem_web = await queryPromise(1, `SELECT * FROM databaseallitem_web`);
    parentPort.postMessage({
        data_eventpage, databaseallitem_web
    });
} else if (bukawal == 'adminweb-homepage-saveeventpage') {
    //var link_img=`/assets/imagepromo/${workerData.data.promoname}`

    const databaseallitem_web_reset = await queryPromise(1, `UPDATE databaseallitem_web SET eventpage_show = ?, eventpage_prior = ?`, ['', 0]);

    workerData.data.forEach(async (data, index) => {
        const databaseallitem_web = await queryPromise(1, `UPDATE databaseallitem_web SET eventpage_show = ?, eventpage_prior = ? WHERE id = ?`, [data.eventpage_show, data.eventpage_prior, data.id]);

        if ((index + 1) == workerData.data.length) {
            parentPort.postMessage({ icons: 'success', texts: 'sukses save' });
        }
    });




}
//kategori
else if (bukawal == 'adminweb-kategori') {
    const databaseallitem_katagori = await queryPromise(1, `SELECT * FROM databaseallitem_katagori`);
    const databaseallitem_web = await queryPromise(1, `SELECT * FROM databaseallitem_web`);
    parentPort.postMessage({
        databaseallitem_katagori, databaseallitem_web
    });
} else if (bukawal == 'adminweb-savekategori') {
    var datakategori = workerData.data.kategori;
    var listpordukkategori = workerData.data.listproduk;
    //console.log('datakategori',datakategori)
    const databaseallitem_katagori = await queryPromise(1, `SELECT * FROM databaseallitem_katagori`);
    //console.log('databaseallitem_katagori',databaseallitem_katagori)
    // Cek apakah kategori sudah ada
    const sudahAda = databaseallitem_katagori.some(row => row.katagori.toLowerCase() === datakategori.katagori.toLowerCase());

    if (sudahAda) {
        console.log("Kategori sudah ada di database.");
        parentPort.postMessage({ icons: 'error', texts: 'Duplikat nama kategori' });
    } else {
        console.log("Kategori belum ada, bisa ditambahkan.");
        datakategori.urutan = databaseallitem_katagori.length + 1;

        // Ambil nama kolom dan nilai
        const columns = Object.keys(datakategori); // ['katagori_img', 'katagori', 'urutan']
        const values = Object.values(datakategori); // ['sofa.png', 'sofa', 0]

        // Buat string untuk kolom dan tanda tanya (placeholder)
        const placeholders = columns.map(() => '?').join(', ');
        const columnString = columns.join(', ');

        // Query insert
        const insertnew = await queryPromise(1, `
        INSERT INTO databaseallitem_katagori (${columnString})
        VALUES (${placeholders})
        `, values);
        if (insertnew.affectedRows > 0) {
            console.log("Insert berhasil ✅");

            if (listpordukkategori.length > 0) {
                //listpordukkategori.forEach(async(data,index) =>
                for (const [index, data] of listpordukkategori.entries()) {
                    const [datakatogiitem] = await queryPromise(1, `SELECT katagori FROM databaseallitem_web WHERE id = ?`, [data.idproduk]);

                    var fixkatagori = [];

                    if (datakatogiitem.katagori == '[]') {
                        fixkatagori.push(datakategori.katagori);
                    } else {
                        //sudah ada katagori
                        var katagorifromitem = JSON.parse(datakatogiitem.katagori);
                        fixkatagori = [...katagorifromitem, `${datakategori.katagori}`];
                    }

                    const databaseallitem_web = await queryPromise(1, `UPDATE databaseallitem_web SET katagori = ? WHERE id = ?`, [JSON.stringify(fixkatagori), data.idproduk]);

                    if ((index + 1) == listpordukkategori.length) {
                        parentPort.postMessage({ icons: 'success', texts: 'Add kategori berhasil' });
                    }
                };
            } else {
                parentPort.postMessage({ icons: 'success', texts: 'Add kategori berhasil' });
            }

        } else {
            parentPort.postMessage({ icons: 'error', texts: 'Add kategori gagal' });
        }
    }
} else if (bukawal == 'adminweb-editkategori') {
    var datakategori = workerData.data.kategori;
    var listpordukkategori = workerData.data.listproduk;
    var listpordukkategori_old = workerData.data.oldlistproduk;

    const databaseallitem_katagori = await queryPromise(1, `SELECT * FROM databaseallitem_katagori`);

    const sudahAda = databaseallitem_katagori.some(row => {
        return (
            row.katagori?.toLowerCase() === datakategori.katagori?.toLowerCase() &&
            row.id !== datakategori.id
        );
    });

    //var oldkatagori=

    if (sudahAda) {
        console.log("Kategori sudah ada di database.");
        parentPort.postMessage({ icons: 'error', texts: 'Duplikat nama kategori' });
    } else {
        //const [oldkatagori] = await queryPromise(1, `SELECT katagori FROM databaseallitem_katagori WHERE id = ?`, [datakategori.id]);// Ambil nama kategori lama dari database
        //const ondataediting = databaseallitem_katagori.find(row => row.id === datakategori.id);
        const updatedata = await queryPromise(1, `UPDATE databaseallitem_katagori SET katagori_img = ?, katagori = ? WHERE id = ?`, [datakategori.katagori_img, datakategori.katagori, datakategori.id]);
        console.log('editings');

        if (updatedata.affectedRows > 0) {

            ////////////////////////////////////////////

            /* console.log('oldkatagori.katagori',oldkatagori.katagori);
            // Cek apakah nama kategori diubah
            if (oldkatagori.katagori && oldkatagori.katagori !== datakategori.katagori) {
                const kategoriLama = oldkatagori.katagori.trim().toLowerCase();
                const kategoriBaru = datakategori.katagori.trim();

                // Ambil semua item yang memiliki kategori lama
                const [rows] = await queryPromise(1, `
                SELECT id, katagori FROM databaseallitem_web
                WHERE katagori LIKE ?
            `, [`%${oldkatagori.katagori}%`]);

                for (const item of rows) {
                    let katagoriArray = [];

                    try {
                        katagoriArray = JSON.parse(item.katagori || '[]');
                    } catch (e) {
                        katagoriArray = [];
                    }

                    // Ganti nama kategori lama dengan nama baru
                    const updatedKatagori = katagoriArray.map(k =>
                        k.trim().toLowerCase() === kategoriLama ? kategoriBaru : k
                    );

                    // Update kembali ke database
                    await queryPromise(1, `UPDATE databaseallitem_web SET katagori = ? WHERE id = ?`, [
                        JSON.stringify(updatedKatagori),
                        item.id
                    ]);
                }

                console.log(`Kategori "${oldkatagori.katagori}" telah diubah menjadi "${datakategori.katagori}" di semua produk.`);
            } */


            ////////////////////////////////////////////

            const produkDihapus = listpordukkategori_old.filter(oldItem =>
                !listpordukkategori.some(newItem => newItem.idproduk === oldItem.idproduk));

            // Produk baru (tidak ada di list lama)
            const produkBaru = listpordukkategori.filter(newItem =>
                !listpordukkategori_old.some(oldItem => oldItem.idproduk === newItem.idproduk)
            );

            console.log('produkDihapus============', produkDihapus);
            console.log('produkBaru============', produkBaru);

            // =======================
            // Handle produk DIHAPUS
            // =======================
            for (const data of produkDihapus) {
                const [datakatogiitem] = await queryPromise(1, `SELECT katagori FROM databaseallitem_web WHERE id = ?`, [data.idproduk]);
                let katagorifromitem = [];
                try {
                    katagorifromitem = JSON.parse(datakatogiitem?.katagori || '[]');
                } catch (e) {
                    katagorifromitem = [];
                }

                // Hapus kategori yang dimaksud
                const fixkatagori = katagorifromitem
                    .map(k => k.trim())
                    .filter(k => k.toLowerCase() !== datakategori.katagori.trim().toLowerCase());
                console.log('fixkatagori==++++++++++++', fixkatagori);
                var result1 = await queryPromise(1, `UPDATE databaseallitem_web SET katagori = ? WHERE id = ?`, [JSON.stringify(fixkatagori), data.idproduk]);
            }

            // =======================
            // Handle produk BARU
            // =======================
            for (const data of produkBaru) {
                const [datakatogiitem] = await queryPromise(1, `SELECT katagori FROM databaseallitem_web WHERE id = ?`, [data.idproduk]);

                let katagorifromitem = [];
                try {
                    katagorifromitem = JSON.parse(datakatogiitem?.katagori || '[]');
                } catch (e) {
                    katagorifromitem = [];
                }

                // Tambah kategori jika belum ada
                const fixkatagori = [...new Set([...katagorifromitem, datakategori.katagori.trim()])];

                var result2 = await queryPromise(1, `UPDATE databaseallitem_web SET katagori = ? WHERE id = ?`, [JSON.stringify(fixkatagori), data.idproduk]);
            }

            // =======================
            // Kirim notifikasi selesai
            // =======================
            parentPort.postMessage({ icons: 'success', texts: 'Edit kategori berhasil' });

            console.log("Kategori yang diproses:", datakategori.katagori);
            console.log("Produk dihapus:", produkDihapus.map(p => p.idproduk));
            console.log("Produk baru:", produkBaru.map(p => p.idproduk));



        } else {
            parentPort.postMessage({ icons: 'error', texts: 'edit kategori gagal' });
        }



    }
} else if (bukawal == 'adminweb-deletekategori') {
    var datakategori = workerData.data.kategori;
    var listpordukkategori = workerData.data.listproduk;

    const deletes = await queryPromise(1, `DELETE FROM databaseallitem_katagori WHERE id = ?`, [datakategori.id]);

    if (deletes.affectedRows > 0) {
        if (listpordukkategori.length == 0) {
            console.log('no list proudk');
            if (datakategori.katagori_img) {
                var namefile = datakategori.katagori_img.split('?')[0];
                console.log('namefile====', namefile);
                const filePath = path.join(__dirname, '..', datakategori.katagori_img.split('?')[0]); // contoh: "/assets/katagoriproduk/namafile.png"
                try {
                    await unlink(filePath);
                    console.log('File gambar berhasil dihapus:', filePath);
                    parentPort.postMessage({ icons: 'success', texts: 'delete kategori berhasil' });
                } catch (fileErr) {
                    console.warn('Gagal menghapus file gambar:', filePath, fileErr.message);
                    parentPort.postMessage({ icons: 'success', texts: 'delete kategori berhasil' });
                }
            }
        } else {
            //listpordukkategori.forEach(async(data,index) => 
            for (const [index, data] of listpordukkategori.entries()) {

                const [datakatogiitem] = await queryPromise(1, `SELECT katagori FROM databaseallitem_web WHERE id = ?`, [data.idproduk]);

                var katagorifromitem = JSON.parse(datakatogiitem.katagori);

                var fixkatagori = katagorifromitem.filter(item => item !== datakategori.katagori);

                const databaseallitem_web = await queryPromise(1, `UPDATE databaseallitem_web SET katagori = ? WHERE id = ?`, [JSON.stringify(fixkatagori), data.idproduk]);

                if ((index + 1) == listpordukkategori.length) {
                    // Hapus gambar file jika ada path-nya
                    console.log('mulai hapus file gamabr')
                    if (datakategori.katagori_img) {
                        var namefile = datakategori.katagori_img.split('?')[0];
                        console.log('namefile====', namefile);
                        const filePath = path.join(__dirname, '..', datakategori.katagori_img.split('?')[0]); // contoh: "/assets/katagoriproduk/namafile.png"
                        try {
                            await unlink(filePath);
                            console.log('File gambar berhasil dihapus:', filePath);
                            parentPort.postMessage({ icons: 'success', texts: 'delete kategori berhasil' });
                        } catch (fileErr) {
                            console.warn('Gagal menghapus file gambar:', filePath, fileErr.message);
                            parentPort.postMessage({ icons: 'success', texts: 'delete kategori berhasil' });
                        }
                    }

                }
            };
        }

    } else {
        parentPort.postMessage({ icons: 'error', texts: 'delete kategori gagal' });
    }

} else if (bukawal == 'adminweb-updateurutankatagori') {
    var listkategori = workerData.data;
    listkategori.forEach(async (data, index) => {
        const databaseallitem_web = await queryPromise(1, `UPDATE databaseallitem_katagori SET urutan = ? WHERE id = ?`, [data.urutan, data.id]);
        if ((index + 1) == listkategori.length) {
            parentPort.postMessage({ icons: 'success', texts: 'update urutan kategori berhasil' });
        }

    });
}
//product
else if (bukawal == 'adminweb-product') {
    //const databaseallitem_katagori = await queryPromise(1,`SELECT * FROM databaseallitem_katagori`);
    const databaseallitem_web = await queryPromise(1, `SELECT * FROM databaseallitem_web`);
    parentPort.postMessage({
        databaseallitem_web
    });
} else if (bukawal == 'adminweb-deleteproduct') {
    //const databaseallitem_katagori = await queryPromise(1,`SELECT * FROM databaseallitem_katagori`);
    var data = workerData.data;
    console.log('data==', data);
    try {
        // 1. Ambil data dulu
        const databaseallitem_web = await queryPromise(1, `SELECT imageurl FROM databaseallitem_web WHERE id = ?`, [data.id]);

        if (databaseallitem_web.length === 0) {
            parentPort.postMessage({ icons: 'success', texts: 'delete produk berhasil' });
        } else {
            // 2. Parse isi kolom imageurl yang isinya array string
            const imageUrls = JSON.parse(databaseallitem_web[0].imageurl);

            console.log('imageUrls', imageUrls);

            // 3. Hapus data dari database
            var resulth = await queryPromise(1, `DELETE FROM databaseallitem_web WHERE id = ?`, [data.id]);

            // 4. Dapatkan __dirname dari module ES


            // 5. Loop dan hapus file
            for (const relativePath of imageUrls) {
                // Hilangkan slash di awal
                const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;

                // Gabungkan dari worker → ke folder project root → assets
                const filePath = path.resolve(__dirname, '..', cleanPath);

                try {
                    await unlink(filePath);
                    console.log(`File dihapus: ${filePath}`);
                } catch (err) {
                    console.warn(`Gagal hapus file: ${filePath} -> ${err.message}`);
                }
            }

            parentPort.postMessage({ icons: 'success', texts: 'sukses delete produk' });
        }


    } catch (err) {
        parentPort.postMessage({ icons: 'error', texts: 'delete error' });
    }
} else if (bukawal == 'adminweb-saveeditprodukweb') {
    var oldata = workerData.data.data.oldata;
    var datakirim = workerData.data.data.datakirim;
    console.log('oldata===', oldata);

    // Buat Set untuk pencarian cepat
    const newSet = new Set(datakirim.imageurl);
    // Folder root (assets sejajar dengan folder worker)
    const rootPath = path.join(__dirname, '..'); // naik 1 folder dari worker
    var flag = false;//false=tidak ada delete/perubahan imageurl
    var icons = 'success';
    var texts = 'edit produk berhasil';
    for (const [index, oldUrl] of oldata.imageurl.entries()) {
        if (!newSet.has(oldUrl)) {
            // Konversi URL menjadi path fisik di server
            const filePath = path.join(rootPath, oldUrl);

            try {
                await unlink(filePath);
                console.log(`✅ Deleted: ${filePath}`);
                flag = true;
            } catch (err) {
                if (err.code === 'ENOENT') {
                    console.warn(`⚠️ File not found: ${filePath}`);
                } else {
                    console.error(`❌ Error deleting ${filePath}:`, err);
                }
                datakirim.imageurl[index] = oldUrl;
                icons = 'error';
                texts = 'delete foto gagal, simpan data gagal';
            }
        }
    }

    datakirim.katagori = JSON.stringify(datakirim.katagori);
    datakirim.imageurl = JSON.stringify(datakirim.imageurl);
    datakirim.listvariant = JSON.stringify(datakirim.listvariant);

    // Buat array key kecuali 'id'
    const keys = Object.keys(datakirim).filter(k => k !== 'id');

    // Buat string SET untuk query
    const setClause = keys.map(k => `${k} = ?`).join(', ');

    // Buat array values sesuai urutan SET + id di akhir
    const values = keys.map(k => datakirim[k]);
    values.push(oldata.id);

    if (flag == false && icons == 'success' || flag == true && icons == 'success') {
        // Jalankan query
        const sql = `UPDATE databaseallitem_web SET ${setClause} WHERE id = ?`;
        console.log('sql===', sql);

        const databaseallitem_web = await queryPromise(1, sql, values);

        if (databaseallitem_web.affectedRows > 0) {
            parentPort.postMessage({ icons, texts });
        } else {
            parentPort.postMessage({ icons, texts });
        }
    } else {
        parentPort.postMessage({ icons, texts });
    }

}
//account
else if (bukawal == 'adminweb-account') {
    //const databaseallitem_katagori = await queryPromise(1,`SELECT * FROM databaseallitem_katagori`);
    const databaseallitem_web = await queryPromise(1, `SELECT * FROM databaseallitem_web`);
    const dataslogin = await queryPromise(2, `SELECT * FROM dataslogin`);
    const cartDatas = await queryPromise(2, `SELECT * FROM database_keranjang`)
    const transactionDatas = await queryPromise(2, `SELECT * FROM database_beli`)

    parentPort.postMessage({
        databaseallitem_web, dataslogin, cartDatas, transactionDatas
    });
} else if (bukawal == 'adminweb-account-edit') {
    const data = workerData.userData;
    console.log('Menerima data dari frontend:', data);
    try {
        // Cek duplikat username
        // const [cekDuplikat] = await queryPromise(2, `SELECT COUNT(*) AS jumlah FROM dataslogin WHERE username = ? AND id <> ?`, [data.username, data.id]);

        // if (cekDuplikat.jumlah > 0) {
        //     console.log("Username sudah dipakai user lain");
        //     parentPort.postMessage({ success: false, message: 'Username sudah dipakai user lain' });
        // }

        // Update data
        const updates = await queryPromise(2, `
        UPDATE dataslogin 
        SET password = ?
        WHERE id = ?
    `, [data.password, data.id]);
        if (updates.affectedRows > 0) {
            parentPort.postMessage({
                success: true,
                message: "Update akun berhasil."
            });
        } else {
            parentPort.postMessage({
                success: false,
                message: "Update akun gagal. ID tidak ditemukan."
            });
        }
    } catch (error) {
        console.error('Error in adminweb-account-edit: WORKER', error);
        parentPort.postMessage({
            success: false,
            message: 'Terjadi kesalahan saat memperbarui data.'
        });
    }
}
//promotion 
else if (bukawal == 'adminweb-promotion-voucher') {
    const databaseallitem_web = await queryPromise(1, `SELECT * FROM databaseallitem_web`);
    const database_beli = await queryPromise(2, `SELECT * FROM database_beli`);
    const data_voucher = await queryPromise(2, `SELECT * FROM data_voucher`);

    parentPort.postMessage({
        databaseallitem_web, data_voucher,database_beli
    });
}
else if (bukawal == 'adminweb-promotion-addvoucher') {
    var data = workerData.data;
    data.listproduct = JSON.stringify(data.listproduct);
    data.item_kecuali = JSON.stringify(data.item_kecuali);
    // Ambil nama kolom dan nilai
    const columns = Object.keys(data); // ['katagori_img', 'katagori', 'urutan']
    const values = Object.values(data); // ['sofa.png', 'sofa', 0]

    // Buat string untuk kolom dan tanda tanya (placeholder)
    const placeholders = columns.map(() => '?').join(', ');
    const columnString = columns.join(', ');

    // Query insert
    const insertnew = await queryPromise(2, `
    INSERT INTO data_voucher (${columnString})
    VALUES (${placeholders})
    `, values);
    if (insertnew.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Add voucher sukses' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Add voucher gagal' });
    }
}
else if (bukawal == 'adminweb-promotion-inactive') {
    var data = workerData.data;

    // Query update
    const updates = await queryPromise(2, `UPDATE data_voucher SET statusvoucher= ? WHERE id = ?`, [data.statusvoucher, Number(data.id)]);
    if (updates.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: `${data.statusvoucher} ID ${data.id} sukses` });
    } else {
        parentPort.postMessage({ icons: 'error', texts: `${data.statusvoucher} ID ${data.id} gagal` });
    }
}
else if (bukawal == 'adminweb-promotion-unhide') {
    var data = workerData.data;

    // Query update
    const updates = await queryPromise(2, `UPDATE data_voucher SET statusdisplay= ? WHERE id = ?`, [data.statusdisplay, Number(data.id)]);
    if (updates.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: `${data.statusdisplay} ID ${data.id} sukses` });
    } else {
        parentPort.postMessage({ icons: 'error', texts: `${data.statusdisplay} ID ${data.id} gagal` });
    }
}
else if (bukawal == 'adminweb-promotion-deletevoucher') {
    var data = workerData.data;
    const deletes = await queryPromise(2, `DELETE FROM data_voucher WHERE id = ?`, [data.id]);

    if (deletes.affectedRows > 0) {
        try {
            const endpoint = `${process.env.linkweb}/deletefiles/file`;

            // Kirim body ke endpoint
            const response = await axios.post(endpoint, {
                img_voucher: data.img_voucher
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Kirim status balik ke parent
            if (response.status === 200) {
                console.log({ status: 200, message: 'File berhasil dihapus' });
            } else {
                console.log({ status: response.status, message: 'Terjadi masalah di server' });
            }
            parentPort.postMessage({ icons: 'success', texts: 'delete voucher berhasil' });
        } catch (error) {
            // Error dari axios atau koneksi
            parentPort.postMessage({ icons: 'success', texts: 'delete voucher berhasil' });
        }

    } else {
        parentPort.postMessage({ icons: 'error', texts: 'delete voucher gagal' });
    }
}
else if (bukawal == 'adminweb-promotion-flashsale') {
    var databaseallitem_web = await queryPromise(1, `SELECT * FROM databaseallitem_web`);
    for (let i = 0; i < databaseallitem_web.length; i++) {
        const element = databaseallitem_web[i];
        element.imageurl = JSON.parse(element.imageurl);
        element.listvariant = JSON.parse(element.listvariant);
        element.katagori = JSON.parse(element.katagori);
    }

    const data_flashsale = await queryPromise(2, `SELECT * FROM data_flashsale`);

    parentPort.postMessage({
        databaseallitem_web, data_flashsale
    });
}
else if (bukawal == 'adminweb-promotion-addflashsale') {
    var data = workerData.data;
    // Ambil nama kolom dan nilai
    const columns = Object.keys(data); // ['katagori_img', 'katagori', 'urutan']
    const values = Object.values(data); // ['sofa.png', 'sofa', 0]

    // Buat string untuk kolom dan tanda tanya (placeholder)
    const placeholders = columns.map(() => '?').join(', ');
    const columnString = columns.join(', ');

    // Query insert
    const insertnew = await queryPromise(2, `
    INSERT INTO data_flashsale (${columnString})
    VALUES (${placeholders})
    `, values);
    if (insertnew.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Add voucher sukses' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Add voucher gagal' });
    }
}
else if (bukawal == 'adminweb-promotion-deleteflashsale') {
    var data = workerData.data;
    const deletes = await queryPromise(2, `DELETE FROM data_flashsale WHERE id = ?`, [data.id]);

    if (deletes.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'delete flashsale berhasil' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'delete flashsale gagal' });
    }
}
// Start Label Product
else if (bukawal == 'adminweb-promotion-labelproduct') {
    var databaseallitem_web = await queryPromise(1, `SELECT * FROM databaseallitem_web`);
    for (let i = 0; i < databaseallitem_web.length; i++) {
        const element = databaseallitem_web[i];
        element.imageurl = JSON.parse(element.imageurl);
        element.listvariant = JSON.parse(element.listvariant);
        element.katagori = JSON.parse(element.katagori);
    }

    const data_label = await queryPromise(2, `SELECT * FROM data_label`);

    parentPort.postMessage({
        databaseallitem_web, data_label
    });
}
else if (bukawal == 'adminweb-promotion-addlabelproduct') {
  const data = workerData.data;
    if (Array.isArray(data.list_idproduct)) {
        data.list_idproduct = JSON.stringify(data.list_idproduct);
    } else {
        data.list_idproduct = JSON.stringify([]);
    }

  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = columns.map(() => '?').join(', ');
  const columnString = columns.join(', ');

  const insertnew = await queryPromise(2, `
    INSERT INTO data_label (${columnString})
    VALUES (${placeholders})
  `, values);

  if (insertnew.affectedRows > 0) {
    parentPort.postMessage({ icons: 'success', texts: 'Add label sukses' });
  } else {
    parentPort.postMessage({ icons: 'error', texts: 'Add label gagal' });
  }
}
else if(bukawal == 'adminweb-promotion-deletelabelproduk'){
    var data = workerData.data;
    const deletes = await queryPromise(2, `DELETE FROM data_label WHERE id = ?`, [data.id]);

    if (deletes.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Berhasil hapus data product label' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Berhasil hapus data product label' });
    }
}
// End Label Product

else if (bukawal == 'adminweb-promotion-cekflashsale-exp') {
    const data_voucher = await queryPromise(2, `SELECT * FROM data_voucher`);

    for (let i = 0; i < data_voucher.length; i++) {
        const element = data_voucher[i];
        var today = Date.now();
        var exp = Number(element.expired);
        if (exp - today <= 0) {
            const data_deliverycharge = await queryPromise(2, `UPDATE data_voucher SET statusvoucher= ? WHERE id = ?`, ['INACTIVE', element.id]);

        }
    }

    parentPort.postMessage('sukses');
}
//additionalcharge
else if (bukawal == 'adminweb-additionalcharge') {

    const data_deliverycharge = await queryPromise(2, `SELECT * FROM data_deliverycharge`);
    const folderPath = path.join(__dirname, '../public/regencies');
    let allregencies = [];

    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        if (file.endsWith('.json')) {
            const content = fs.readFileSync(path.join(folderPath, file), 'utf-8');
            const jsonData = JSON.parse(content);

            // Gabung semua isi array JSON
            allregencies.push(...jsonData);

            // Jika isi file adalah objek biasa, gunakan:
            // allregencies.push(jsonData);
        }
    }
    parentPort.postMessage({
        data_deliverycharge, allregencies
    });
} else if (bukawal == 'adminweb-additionalcharge-savenew') {
    var data = workerData.data;
    data.value = JSON.stringify(data.value);
    // Ambil nama kolom dan nilai
    const columns = Object.keys(data); // ['katagori_img', 'katagori', 'urutan']
    const values = Object.values(data); // ['sofa.png', 'sofa', 0]

    // Buat string untuk kolom dan tanda tanya (placeholder)
    const placeholders = columns.map(() => '?').join(', ');
    const columnString = columns.join(', ');

    // Query insert
    const insertnew = await queryPromise(2, `
    INSERT INTO data_deliverycharge (${columnString})
    VALUES (${placeholders})
    `, values);
    if (insertnew.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Add delivery charge sukses' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Add delivery charge gagal' });
    }
} else if (bukawal == 'adminweb-additionalcharge-saveedit') {
    //editingdata,alldatasave
    var dataold = workerData.data.editingdata;
    var datanew = workerData.data.alldatasave;
    datanew.value = JSON.stringify(datanew.value);

    const data_deliverycharge = await queryPromise(2, `UPDATE data_deliverycharge SET lokasi= ? ,value = ? WHERE id = ?`, [datanew.lokasi, datanew.value, dataold.id]);
    if (data_deliverycharge.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Edit delivery charge sukses' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Edit delivery charge gagal' });
    }
}
//adminweb-reward
else if (bukawal == 'adminweb-reward') {

    const wheelreward = await queryPromise(2, `SELECT * FROM wheelreward`);
    const datauser = await queryPromise(2, `SELECT * FROM dataslogin`);
    const data_game = await queryPromise(2, `SELECT * FROM data_game`);
    const data_aturan = await queryPromise(2, `SELECT * FROM data_aturan`);    
    const dataProbability = await queryPromise(2, `SELECT * FROM data_probability_wheel`);

    parentPort.postMessage({
        wheelreward, datauser, data_game, data_aturan,dataProbability
    });
}
else if (bukawal == 'adminweb-reward-exchangepoint') {

    const data_exchangepoint = await queryPromise(2, `SELECT * FROM data_exchangepoint`);
    //const datauser=await queryPromise(2,`SELECT * FROM dataslogin`);
    const data_game = await queryPromise(2, `SELECT * FROM data_game`);
    const data_aturan = await queryPromise(2, `SELECT * FROM data_aturan`);

    parentPort.postMessage({ data_exchangepoint, data_game, data_aturan });

}
// ambil probability
// else if (bukawal === 'adminweb-spin-probability') {
//     const dataProbability = await queryPromise(2, `SELECT * FROM data_probability_wheel`);
//     parentPort.postMessage({ dataProbability });
// } 

// update probability
else if (bukawal === 'adminweb-spin-probability-update') {
    const { reward_id, probability } = workerData.data;

    const result = await queryPromise(2,
        `UPDATE data_probability_wheel SET probability=? WHERE reward_id=?`,
        [probability, reward_id]
    );

    if (result.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Probability updated' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Update failed' });
    }
}

else if (bukawal == 'adminweb-reward-request-reward') {

    const rewardRequest = await queryPromise(2, `SELECT * FROM reward_exchangepoint`);
    const datauser = await queryPromise(2, `SELECT * FROM dataslogin`);
    const data_game = await queryPromise(2, `SELECT * FROM data_game`);
    const data_aturan = await queryPromise(2, `SELECT * FROM data_aturan`);

    parentPort.postMessage({
        rewardRequest, datauser, data_aturan, data_game
    });

} else if (bukawal == 'adminweb-reward-wheel-send') {
    const rewardRequest = await queryPromise(2, `UPDATE wheelreward SET tglkirimmili="${Date.now()}", dikirim="Terkirim" WHERE id="${workerData.data.id}"`);
    // const datauser=await queryPromise(2,`SELECT * FROM dataslogin`);

    if (rewardRequest.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Edit delivery charge sukses' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Edit delivery charge gagal' });
    }
} else if (bukawal == 'adminweb-reward-request-send') {
    const rewardRequest = await queryPromise(2, `UPDATE reward_exchangepoint SET tglkirimmili="${Date.now()}", dikirim="Terkirim" WHERE id="${workerData.data.id}"`);
    // const datauser=await queryPromise(2,`SELECT * FROM dataslogin`);

    if (rewardRequest.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Edit delivery charge sukses' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Edit delivery charge gagal' });
    }
} else if (bukawal == 'adminweb-reward-addexchangepoint') {
    var data = workerData.data;
    // Ambil nama kolom dan nilai
    const columns = Object.keys(data); // ['katagori_img', 'katagori', 'urutan']
    const values = Object.values(data); // ['sofa.png', 'sofa', 0]

    // Buat string untuk kolom dan tanda tanya (placeholder)
    const placeholders = columns.map(() => '?').join(', ');
    const columnString = columns.join(', ');

    // Query insert
    const insertnew = await queryPromise(2, `
    INSERT INTO data_exchangepoint (${columnString})
    VALUES (${placeholders})
    `, values);
    if (insertnew.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Add exchange point sukses' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Add exchange point gagal' });
    }
}
else if (bukawal === 'adminweb-savepointsetting') {
    try {
        /* 
        {
            pembagitotalbelanja:1000000,
            pointsetting:5
        }
        
        */
        const data = workerData.data;
        console.log('data', data)
        // parentPort.postMessage({ icons: 'info', texts: `Data diterima: ${JSON.stringify(data)}` });

        const savepointsetting = await queryPromise(
            2,
            `UPDATE data_aturan SET value = ? WHERE id = ?`,
            [data.pembagitotalbelanja, 1] // id=1 berarti row "pembagi total belanja"
        );

        if (savepointsetting.affectedRows > 0) {
            const savepointsetting2 = await queryPromise(
                2,
                `UPDATE data_game SET pointsetting = ? WHERE id = ?`,
                [data.pointsetting, 1] // id=1 berarti row "pembagi total belanja"
            );
            if (savepointsetting2.affectedRows > 0) {
                parentPort.postMessage({ icons: 'success', texts: 'Save point setting sukses' });
            } else {
                parentPort.postMessage({ icons: 'error', texts: 'Save point setting gagal' });
            }

        } else {
            parentPort.postMessage({ icons: 'error', texts: 'Save point setting gagal' });
        }

    } catch (err) {
        parentPort.postMessage({ icons: 'error', texts: `Error: ${err.message}` });
    }
}
//adminweb-utm
else if (bukawal == 'adminweb-utm') {

    const utm_datalink = await queryPromise(1, `SELECT * FROM utm_datalink`);
    const datauser = await queryPromise(2, `SELECT * FROM dataslogin`);
    const utm_datakunjung = await queryPromise(1, `SELECT * FROM utm_datakunjung`);
    const datavoucher = await queryPromise(2, `SELECT * FROM data_voucher`);

    const databaseallitem_web = await queryPromise(1, `SELECT * FROM databaseallitem_web`);
    for (let index = 0; index < databaseallitem_web.length; index++) {
        const element = databaseallitem_web[index];
        element.katagori = JSON.parse(element.katagori);
        element.imageurl = JSON.parse(element.imageurl);
        element.listvariant = JSON.parse(element.listvariant);
    }

    parentPort.postMessage({
        utm_datalink, datauser, databaseallitem_web, utm_datakunjung,datavoucher
    });
}
else if (bukawal == 'adminweb-utm-addutm') {
    var data = workerData.data;
    const { tglinputmili, title, utmname, landingpage, url, pembuat } = data;
    const databaseallitem = await queryPromise(1, `SELECT * FROM utm_datalink`);

    const titleLower = title.toLowerCase();

    // Cek duplikat di utm_datalink
    const sudahAdaDiLink = databaseallitem.some(row =>
        row.title.toLowerCase() === titleLower
    );
    
    console.log(sudahAdaDiLink);
    
    if (sudahAdaDiLink ) {
        parentPort.postMessage({ icons: 'error', texts: 'Duplikat nama kategori' });
    }
    
    else {
        // Query insert
        const insertnew = await queryPromise(1, `
    INSERT INTO utm_datalink (tglinputmili, title, utmname, landingpage, url, pembuat) 
    VALUES (?, ?, ?, ?, ?, ?)
    `, [tglinputmili, title, utmname, landingpage, url, pembuat]);

        // Check if insert was successful
        if (insertnew.affectedRows > 0) {
            parentPort.postMessage({ icons: 'success', texts: 'Add utm sukses' });
        } else {
            parentPort.postMessage({ icons: 'error', texts: 'Add utm gagal' });
        }
    }
}
else if (bukawal == 'adminweb-utm-deleteutm') {
    //const databaseallitem_katagori = await queryPromise(1,`SELECT * FROM databaseallitem_katagori`);
    var data = workerData.data;
    const deletes = await queryPromise(1, `DELETE FROM utm_datalink WHERE title = ?`, [data.title]);
    if (deletes.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'delete utm berhasil' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'delete utm gagal' });
    }
}


//adminweb-transaction
else if (bukawal == 'adminweb-transaction') {

    const database_beli = await queryPromise(2, `SELECT * FROM database_beli`);
    for (const element of database_beli) {
        element.datajson_produk = JSON.parse(element.datajson_produk);
        element.listdiskon = JSON.parse(element.listdiskon);
    }


    const databaseallitem_web = await queryPromise(1, `SELECT * FROM databaseallitem_web`);
    for (let index = 0; index < databaseallitem_web.length; index++) {
        const element = databaseallitem_web[index];
        element.katagori = JSON.parse(element.katagori);
        element.imageurl = JSON.parse(element.imageurl);
        element.listvariant = JSON.parse(element.listvariant);
    }


    const datauser = await queryPromise(2, `SELECT * FROM dataslogin`);
    //var authorization=Buffer.from(process.env.serverkey + ':').toString('base64')
    parentPort.postMessage({
        databaseallitem_web, database_beli, datauser
    });
} else if (bukawal == 'adminweb-transaction-cekstatusbayar') {
    var data = workerData.data;

    console.log('data cek stataus===', data);

    var orderId = data.idtransaksiweb; // Order ID yang ingin dicek di midtrans
    const url = `https://api.sandbox.midtrans.com/v2/${orderId}/status`;

    const database_beli = await queryPromise(2, `SELECT * FROM database_beli WHERE id="${data.id}"`);

    if (database_beli[0].bca=='true' ) {
        try {///https://
            const response = await axios.post(`${process.env.linkweb}/purchased/bcamanual`, 
                {
                    idsementara:orderId
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${Buffer.from(serverKey + ':').toString('base64')}`
                    }
                }
            );

            if (response.data.message=='sukses') {
                const database_beli_update = await queryPromise(2, `UPDATE database_beli SET status = ? WHERE BINARY id_trans_sementara = ?`, ['settlement', orderId]);
                if (database_beli_update.affectedRows > 0) {
                    parentPort.postMessage({ icons: 'success', texts: `Status transaksi saat ini settlement` });
                } else {
                    parentPort.postMessage({ icons: 'error', texts: `error cek [1.1]` });
                }
            }else{
                if (response.data.message=='Status sudah update'||response.data.message=='Data tidak ditemukan') {
                    parentPort.postMessage({ icons: 'error', texts: response.data.message });
                }else{
                    parentPort.postMessage({ icons: 'error', texts: `error cek [1.2]` });
                }
                
            }
        } catch (error) {
            
        }
    }else{
        try {
            const response = await axios.get(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(serverKey + ':').toString('base64')}`
                }
            });

            console.log('Status Transaksi:', response.data);

            // Contoh cara mengakses data spesifik
            const transactionStatus = response.data.transaction_status;
            console.log(`Status pembayaran untuk Order ID ${orderId} adalah: ${transactionStatus}`);

            
            //console.log('database_beli[0]',database_beli[0])
            if (transactionStatus == undefined) {
                parentPort.postMessage({ icons: 'warning', texts: 'User belum memilih metode pembayaran' });

            } else {
                if (database_beli[0].status != transactionStatus) {
                    if (database_beli[0].id_transaksi == '') {
                        //var fixid_transaksi='';
                        var produkbeli = database_beli[0];

                        fixstatuscek();


                    } else {
                        parentPort.postMessage({ icons: 'warning', texts: `Data pembelian sudah masuk di HIGSYSTEM ID ${database_beli[0].id_transaksi}` });
                    }

                } else {
                    if (database_beli[0].id_transaksi == '' && database_beli[0].status == 'settlement') {
                        //var fixid_transaksi='';
                        var produkbeli = database_beli[0];

                        fixstatuscek();


                    } else {
                        parentPort.postMessage({ icons: 'success', texts: `Status transaksi saat ini masih ${transactionStatus}` });
                    }

                }

                async function fixstatuscek() {
                    if (transactionStatus == 'settlement') {
                        sendTransactionData(response.data.order_id, transactionStatus, response.data.fraud_status, response.data.gross_amount);
                    } else {
                        //parentPort.postMessage({ icons: 'success', texts: `Status transaksi saat ini ${transactionStatus}` });

                        const database_beli_update = await queryPromise(2, `UPDATE database_beli SET status = ? WHERE BINARY id_trans_sementara = ?`, [transactionStatus, orderId]);
                        if (database_beli_update.affectedRows > 0) {
                            parentPort.postMessage({ icons: 'success', texts: `Status transaksi saat ini ${transactionStatus}` });
                        } else {
                            parentPort.postMessage({ icons: 'error', texts: `error cek [1]` });
                        }
                    }
                }
            }


        } catch (error) {
            console.error('Error saat memeriksa status transaksi:', error.response ? error.response.data : error.message);
        }
    }

    

} else if (bukawal == 'adminweb-transaction-nolrupiah-produkdikirim') {
    var data = workerData.data;
    console.log(data);
    const rewardRequest = await queryPromise(2, `UPDATE database_beli SET status="Terkirim" WHERE BINARY id_trans_sementara="${data.idtransaksiweb}"`);
    // const datauser=await queryPromise(2,`SELECT * FROM dataslogin`);

    if (rewardRequest.affectedRows > 0) {
        parentPort.postMessage({ icons: 'success', texts: 'Save kirim berhasil' });
    } else {
        parentPort.postMessage({ icons: 'error', texts: 'Save kirim gagal' });
    }
}else if (bukawal == 'adminwebtrans-downloadexcel') {
    downloadexcel();
}

async function downloadexcel() {
    try {
        const dataadminlist = await queryPromise(2,`SELECT * FROM database_beli WHERE tglmili_beli BETWEEN ${workerData.data.startMillis} AND ${workerData.data.endMillis} `);
        // Mengirim data ke parentPort setelah semua query selesai
        parentPort.postMessage({icons:'success',text:'sukses ambil data',dataadminlist});
    } catch (error) {
        parentPort.postMessage({icons:'error',text:error});
    }finally {
        // Menutup koneksi setelah semua query selesai atau terjadi error
        closedatabsase();
    }
}

async function sendTransactionData(order_id, transaction_status, fraud_status, gross_amount) {
    try {
        const payload = {
            order_id,//: "ORD-12345",
            transaction_status,//: "settlement",
            fraud_status,//: "accept",
            gross_amount,//: "150000"
        };

        const response = await axios.post(`${process.env.linkweb}/purchased/statuschecked-adminweb`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Ambil data respons
        const statusNumber = response.status; // HTTP status code (misal 200, 400, 500)
        console.log("Status Number:", statusNumber);

        if (statusNumber === 200) {
            console.log("✅ Transaksi berhasil diproses");
            parentPort.postMessage({ icons: 'success', texts: `Status transaksi sukses diupdate ${transaction_status}` });
        } else if (statusNumber === 400) {
            console.log("⚠️ Permintaan tidak valid");
            parentPort.postMessage({ icons: 'error', texts: `Permintaan tidak valid` });
        } else if (statusNumber === 500) {
            console.log("❌ Terjadi kesalahan di server");

            parentPort.postMessage({ icons: 'error', texts: `terjadi kesalahan di server` });
        } else {
            console.log("ℹ️ Status tidak dikenal:", statusNumber);
            parentPort.postMessage({ icons: 'error', texts: `error [998]` });
        }

    } catch (error) {
        console.error("Error saat kirim data transaksi:", error.message);

        parentPort.postMessage({ icons: 'error', texts: `error [999]` });
    }
}

















function queryPromise(databaseuses, sql, params = []) {
    return new Promise((resolve, reject) => {
        if (databaseuses == 1) {
            database.query(sql, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        } else {
            dtbase2.query(sql, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        }

    });
}

function closedatabsase(databaseuses) {
    // Menutup koneksi setelah query selesai
    /* if (databaseuses==1){
        database.release((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        });
    }else  if (databaseuses==2){
        dtbase2.release((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        });
    } */

}