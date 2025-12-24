import { parentPort, workerData } from 'worker_threads';
import {database,dtbase2} from '../config/connection.js';

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

saveit();

async function saveit() {
    for (const data of workerData.data) {
        const cek = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${data.id_transaksi}"`;
        const [oldData] = await query(cek);

        if (!oldData) {
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi [99]", titles: "" });
            continue;
        }

        const historiold = JSON.parse(oldData.history || '[]');

        var bedatipeproduk=0;//0 sama, 1 berbeda
        //case item lama adalah upholstory dan item baru adalah C5
        if (data.oldcodeitemedit === "UP" && data.oldstockprodukcode !== "true"&&data.stockprodukcode === "true") {
            historiold.forEach(item => {
                if (item.details && item.details.ketstatus.includes("Menunggu PO/DO diprint")) {
                    item.details.ketstatus = item.details.ketstatus.replace(
                    "Menunggu PO/DO diprint",
                    "Menunggu Proses QC & Packing"
                    );
                }
            });
            bedatipeproduk=1;
        }
        //case item lama adalah upholstory dan item baru adalah bukan c5/upholstery
        else if (data.oldcodeitemedit === "UP" && data.oldstockprodukcode !== "true"&&data.code2 != "UP" &&data.stockprodukcode != "true") {
            historiold.forEach(item => {
                if (item.details && item.details.ketstatus.includes("Menunggu PO/DO diprint")) {
                    item.details.ketstatus = item.details.ketstatus.replace(
                    "Menunggu PO/DO diprint",
                    "Menunggu Proses QC & Packing"
                    );
                }
            });
            bedatipeproduk=1;
        }
        //case item lama adalah C5 dan item baru adalah upholstery
        else if (data.oldstockprodukcode === "true"&&data.code2 === "UP" &&data.stockprodukcode != "true") {
            historiold.forEach(item => {
                if (item.details && item.details.ketstatus.includes("Menunggu Proses QC & Packing")) {
                    item.details.ketstatus = item.details.ketstatus.replace(
                    "Menunggu Proses QC & Packing",
                    "Menunggu PO/DO diprint"
                    );
                }
            });
            bedatipeproduk=1;
        }
        const historiesnew = [...data.history, ...historiold];

        const savedatum = [
            data.order_date,
            data.orderdate_mili,
            data.delivered_date,
            data.delivereddate_mili,
            data.platform,
            data.item,
            data.qty,
            data.finalprice,
            data.diskon_persen,
            data.diskon_amount,
            data.notes,
            data.colorvariant,
            data.buyername,
            data.phonenumber,
            data.address,
            data.status,
            data.deliveryunit,
            data.code1,
            data.code2,
            data.extracharge,
            JSON.stringify(historiesnew),
            bedatipeproduk==0?oldData.print_podo:data.print_podo,

            bedatipeproduk==0?oldData.klik_print_podo:data.klik_print_podo,
            
            data.upholstery_jadi,
            
            bedatipeproduk==0?oldData.upholstery_img:data.upholstery_img,
            
            data.approval_produkjadi,
            
            data.packde_kirimbahan,
            
            bedatipeproduk==0?oldData.packde_kirimbahan_img:data.packde_kirimbahan_img,
            
            data.packde_ambil,
            
            bedatipeproduk==0?oldData.packde_ambil_img:data.packde_ambil_img,
            
            bedatipeproduk==0?oldData.packde_qc:data.packde_qc,
            
            bedatipeproduk==0?oldData.packde_qc_img:data.packde_qc_img,
            
            bedatipeproduk==0?oldData.pickup_driver:data.pickup_driver,
            
            bedatipeproduk==0?oldData.pickup_driver_img:data.pickup_driver_img,

            data.stockprodukcode,
            Array.isArray(data.stockuses) ? JSON.stringify(data.stockuses) : data.stockuses,
            data.bank_extracharge
        ];

        const updated = await query(`UPDATE admlistdata SET 
            order_date=?, orderdate_mili=?, delivered_date=?, delivereddate_mili=?, platform=?, item=?, qty=?, finalprice=?, diskon_persen=?, diskon_amount=?, notes=?, colorvariant=?, buyername=?, phonenumber=?, address=?, status=?, deliveryunit=?, code1=?, code2=?, extracharge=?, history=?, print_podo=?, klik_print_podo=?, upholstery_jadi=?, upholstery_img=?, approval_produkjadi=?, packde_kirimbahan=?, packde_kirimbahan_img=?, packde_ambil=?, packde_ambil_img=?, packde_qc=?, packde_qc_img=?, pickup_driver=?, pickup_driver_img=?,stockprodukcode=?, stockuses=?, bank_extracharge=?   WHERE BINARY id_transaksi="${data.id_transaksi}"`, savedatum);

        // PROSES KHUSUS EDIT ITEM
        const datenowon = new Date();
        const bulan = monthNames[datenowon.getMonth()];
        const tgl_input_mili = datenowon.getTime();
        const tanggal = `${String(datenowon.getDate()).padStart(2, '0')}/${String(datenowon.getMonth() + 1).padStart(2, '0')}/${datenowon.getFullYear()}`;
        const tanggal_jam = `${tanggal} ${String(datenowon.getHours()).padStart(2, '0')}:${String(datenowon.getMinutes()).padStart(2, '0')}`;

        const oldqty = parseInt(data.oldeqtyedit || "0");
        const newqty = parseInt(data.qty || "0");
        const olditem = data.olditemsedit;
        const newitem = data.item;
        const id_transaksi = data.id_transaksi;
        const username = data.history[0].username;
        const namalengkap = data.history[0].user;

        const olduses = Array.isArray(data.oldstockupusesedit) ? data.oldstockupusesedit : JSON.parse(data.oldstockupusesedit || '[]');
        const newuses = Array.isArray(data.stockuses) ? data.stockuses : JSON.parse(data.stockuses || '[]');


        // CASE: Penanganan item dengan stockprodukcode === "true" (stock C5)
        if (data.stockprodukcode === "true" || data.oldstockprodukcode === "true") {
            const qtyChange = newqty - oldqty;
            //const keterangan = `edit qty [${oldqty} to ${newqty}] [${olditem} to ${newitem}] penjualan no ${id_transaksi} [-sell08989]`;

            // Daftar konektor khusus untuk pengecekan
            const specialConnectors = [
                "AETHER - Track Light - L Connector",
                "AETHER - Track Light - I Connector",
                "AETHER - Track Light - T Connector",
                "AETHER - Track Light - PLUS Connector",
                "AETHER - Track Light - V90 Connector"
            ];

            // Fungsi untuk cek apakah item termasuk konektor khusus
            function isSpecialConnector(item) {
                return specialConnectors.includes(item);
            }

            // Fungsi untuk buat keterangan sesuai kondisi item
            // Fungsi membuat keterangan berdasarkan item spesifik
            function buatKeterangan(oldqty, newqty, olditem, newitem, itemKhusus) {
                const base = `edit qty [${oldqty} to ${newqty}] [${olditem} to ${newitem}] penjualan no ${id_transaksi.split('-')[0]}`;
                return itemKhusus ? base : `${base} [-sell08989]`;
            }

            const keterangan = buatKeterangan(oldqty, newqty, olditem, newitem);

            
            // Kasus 1: Item sama, qty berubah
            if (olditem === newitem && oldqty !== newqty) {
                 // Hanya lakukan insert jika item termasuk produk stok C5
                if (data.stockprodukcode === "true") {
                    const inOrOut = qtyChange > 0 ? "out" : "in";
                    const keterangan = buatKeterangan(oldqty, newqty, olditem, newitem, isSpecialConnector(newitem));
                    await handleSpecialConnector(newitem, qtyChange, inOrOut, keterangan);
                }
                
            }

            // Kasus 2 dan 3: Item berbeda
            if (olditem !== newitem) {
                // Jika item lama adalah item dengan stockprodukcode === "true", insert kembali ke stok (in)
                if (data.oldstockprodukcode === "true") {
                    // Kembalikan stok item lama
                    const keteranganOld = buatKeterangan(oldqty, newqty, olditem, newitem, isSpecialConnector(olditem));  // Keterangan untuk item lama (in)
                    await handleSpecialConnector(olditem, oldqty, "in", keteranganOld);
                }
                

                // Jika item baru adalah item dengan stockprodukcode === "true", kurangi dari stok (out)
                if (data.stockprodukcode === "true") {
                    // Kurangi stok item baru
                    const keteranganNew = buatKeterangan(oldqty, newqty, olditem, newitem, isSpecialConnector(newitem));// Keterangan untuk item baru (out)
                    await handleSpecialConnector(newitem, newqty, "out", keteranganNew);
                }
                
            }

            // Fungsi untuk menyisipkan data ke Formstockcalculate
            async function insertStockRecord(itemName, qtyValue, inOrOut,keterangan) {
                const sqlInsert = `
                INSERT INTO formstockcalculate
                (tgl_input_mili, tanggal, tanggal_jam, bulan, tahun, item, qty, inorout, user, keterangan, fotoorvideolink, ref_old, ref_now)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', '', '')
                `;
                await query(sqlInsert, [
                tgl_input_mili, tanggal, tanggal_jam, bulan, datenowon.getFullYear().toString(),
                itemName, qtyValue.toString(), inOrOut, namalengkap, keterangan
                ]);
            }

            // Fungsi untuk menangani konektor khusus
            async function handleSpecialConnector(itemName, qtyDiff, inOrOut, keterangan) {
                const connectorMap = {
                "AETHER - Track Light - L Connector": {
                    components: [
                    { name: "AETHER - Track Light - Body Plain Connector", multiplier: 1 },
                    { name: "AETHER - Track Light - Leg Connector", multiplier: 2 }
                    ]
                },
                "AETHER - Track Light - I Connector": {
                    components: [
                    { name: "AETHER - Track Light - Body Plain Connector", multiplier: 1 },
                    { name: "AETHER - Track Light - Leg Connector", multiplier: 2 }
                    ]
                },
                "AETHER - Track Light - T Connector": {
                    components: [
                    { name: "AETHER - Track Light - Body Plain Connector", multiplier: 1 },
                    { name: "AETHER - Track Light - Leg Connector", multiplier: 3 }
                    ]
                },
                "AETHER - Track Light - PLUS Connector": {
                    components: [
                    { name: "AETHER - Track Light - Body Plain Connector", multiplier: 1 },
                    { name: "AETHER - Track Light - Leg Connector", multiplier: 4 }
                    ]
                },
                "AETHER - Track Light - V90 Connector": {
                    components: [
                    { name: "AETHER - Track Light - Body 90 Connector", multiplier: 1 },
                    { name: "AETHER - Track Light - Leg Connector", multiplier: 2 }
                    ]
                }
                };

                const connector = connectorMap[itemName];
                if (connector) {
                    for (const component of connector.components) {
                        const qtyComponent = Math.abs(qtyDiff) * component.multiplier;
                        await insertStockRecord(component.name, qtyComponent, inOrOut,keterangan);
                    }
                } else {
                    // Jika bukan konektor khusus, langsung sisipkan data
                    await insertStockRecord(itemName, Math.abs(qtyDiff), inOrOut,keterangan);
                }
            }

        }

        // --- Perubahan untuk penanganan upholstery stockuses secara granular ---

        // Konversi olduses dan newuses menjadi Map untuk memudahkan pencarian berdasarkan id_stock
        const oldUsesMap = new Map(olduses.map(item => [item.id_stock, item.qty_pakai]));
        const newUsesMap = new Map(newuses.map(item => [item.id_stock, item.qty_pakai]));

        // Proses olduses: Kembalikan stok untuk item yang tidak lagi digunakan atau qty_pakai-nya berkurang
        if (data.oldcodeitemedit === "UP" && data.oldstockprodukcode !== "true") {
            for (const oldStock of olduses) {
                const newQty = newUsesMap.get(oldStock.id_stock);

                // Jika id_stock tidak ada di newuses ATAU qty_pakai-nya berubah
                if (newQty === undefined || parseInt(newQty) !== parseInt(oldStock.qty_pakai)) {
                    await updateUpholsteryStock(
                        oldStock.id_stock,
                        parseInt(oldStock.qty_pakai),
                        "in", // Masuk stok
                        `masuk stock dari edit ${id_transaksi.split('-')[0]}`,
                        olditem,
                        data.oldvariantedit,
                        data.oldorderdate_mili,
                        tgl_input_mili,
                        namalengkap,
                        username
                    );
                }
            }
        }

        // Proses newuses: Kurangi stok untuk item yang baru digunakan atau qty_pakai-nya bertambah
        if (data.code2 === "UP" && data.stockprodukcode !== "true") {
            for (const newStock of newuses) {
                const oldQty = oldUsesMap.get(newStock.id_stock);

                // Jika id_stock tidak ada di olduses (baru ditambahkan) ATAU qty_pakai-nya berubah
                if (oldQty === undefined || parseInt(oldQty) !== parseInt(newStock.qty_pakai)) {
                    await updateUpholsteryStock(
                        newStock.id_stock,
                        parseInt(newStock.qty_pakai),
                        "out", // Keluar stok
                        `${id_transaksi.split('-')[0]} penjualan`,
                        newitem,
                        data.colorvariant,
                        data.orderdate_mili,
                        tgl_input_mili,
                        namalengkap,
                        username
                    );
                }
            }
        }

        if (updated.affectedRows === 1) {
            parentPort.postMessage({ icons: "success", texts: "Edit item sukses", titles: "" });
        } else {
            parentPort.postMessage({ icons: "error", texts: "Sistem lagi error, coba lagi [2]", titles: "" });
        }
    }

    //database.end();
}

// Fungsi helper untuk update stok upholstery
async function updateUpholsteryStock(id_stock, qty_pakai, inOrOut, tindakan, item, colorvariant, orderdate_mili, tgl_input_mili, namalengkap, username) {
    const sqlSelect = `SELECT history FROM stockupholsterydatabase WHERE BINARY id_stock = ?`;
    const rows = await query(sqlSelect, [id_stock]);

    let historyArray = [];
    if (rows.length > 0 && rows[0].history) {
        try {
            historyArray = JSON.parse(rows[0].history);
        } catch (e) {
            console.error("Gagal parsing history:", e);
        }
    }

    const newEntry = {
        tglinputmili: tgl_input_mili,
        namalengkap: namalengkap,
        username: username,
        tindakan: tindakan,
        id_stock: id_stock,
        item: item,
        colorvariant: colorvariant,
        qty: qty_pakai,
        orderdate_mili: orderdate_mili
    };

    historyArray.unshift(newEntry);
    const historyStr = JSON.stringify(historyArray);

    let sqlUpdate;
    if (inOrOut === "in") {
        sqlUpdate = `
            UPDATE stockupholsterydatabase
            SET qty = CAST(qty AS UNSIGNED) + ?,
                qty_old = CAST(qty_old AS UNSIGNED) - ?, history = ?
            WHERE BINARY id_stock = ?
        `;
    } else { // "out"
        sqlUpdate = `
            UPDATE stockupholsterydatabase
            SET qty = CAST(qty AS UNSIGNED) - ?,
                qty_old = CAST(qty_old AS UNSIGNED) + ?, history = ?
            WHERE BINARY id_stock = ?
        `;
    }
    await query(sqlUpdate, [qty_pakai, qty_pakai, historyStr, id_stock]);
}

// Helper query promisified
function query(sql, values = []) {
    return new Promise((resolve, reject) => {
        database.query(sql, values, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}
