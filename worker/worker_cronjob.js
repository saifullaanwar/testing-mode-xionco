import { parentPort, workerData } from 'worker_threads';
import { database, dtbase2 } from '../config/connection.js';

var bukaawal = workerData.bukaawal;
const monthLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

if (bukaawal == 'refreshplan-left') {
    var data =
    {
        tglinputmili: Date.now(),
        value: [
            {
                "phase": "1",
                "value": [
                    {
                        "nama_bank": "BANK BCA_PT HALIM INTI GAHARA_GAHARA",
                        "title": "GAHARA",
                        "show": true,
                        "balance": [
                            {
                                "name": "Total Cash In",
                                "nominal": 0
                            },
                            {
                                "name": "Total Cash Out",
                                "nominal": 0
                            },
                            {
                                "name": "Initial Balance",
                                "nominal": 0
                            }
                        ],
                        "cash_in": [
                            {
                                "name": "Prasarana",
                                "nominal": 0,
                                "kode_coa": 1010
                            },
                            {
                                "name": "Offline",
                                "nominal": 0,
                                "kode_coa": 1010
                            },
                            {
                                "name": "Customer",
                                "nominal": 0,
                                "kode_coa": 1010
                            }
                        ],
                        "cash_out": [
                            {
                                "name": "Regular Expense",
                                "nominal": 0,
                                "kode_coa": 1400
                            },
                            {
                                "name": "Bills",
                                "nominal": 0,
                                "kode_coa": 0
                            },
                            {
                                "name": "Pending Payments",
                                "nominal": 0,
                                "kode_coa": 0
                            }
                        ],
                        "others": [
                            {
                                "name": "Advance Payment – Casga",
                                "nominal": 0,
                                "kode_coa": 0
                            },
                            {
                                "name": "Operational",
                                "nominal": 0,
                                "kode_coa": 0
                            }
                        ]
                    },
                    {
                        "nama_bank": "BCA QUINTENSSENSIAL_PT HALIM INTI GAHARA_PRASARANA",
                        "title": "PRASARANA",
                        "show": true,
                        "balance": [
                            {
                                "name": "Total Cash In",
                                "nominal": 0
                            },
                            {
                                "name": "Total Cash Out",
                                "nominal": 0
                            },
                            {
                                "name": "Initial Balance",
                                "nominal": 0
                            }
                        ],
                        "cash_in": [
                            {
                                "name": "Marketplace - Tokopedia",
                                "nominal": 0,
                                "kode_coa": 1020
                            },
                            {
                                "name": "Marketplace - Shopee",
                                "nominal": 0,
                                "kode_coa": 1020
                            },
                            {
                                "name": "Offline Transaction",
                                "nominal": 0,
                                "kode_coa": 1020
                            }
                        ],
                        "cash_out": [
                            {
                                "name": "Regular Transaction",
                                "nominal": 0
                            },
                            {
                                "name": "Gahara",
                                "nominal": 0
                            },
                            {
                                "name": "Investor",
                                "nominal": []
                            },
                            {
                                "name": "Ads - Meta",
                                "nominal": 0
                            },
                            {
                                "name": "Ads - Tokopedia",
                                "nominal": 0
                            },
                            {
                                "name": "Jansen SAL",
                                "nominal": 0
                            }
                        ],
                        "Deposito": [
                            {
                                "name": "Homedec",
                                "nominal": 0
                            },
                            {
                                "name": "Rempoa Inventory",
                                "nominal": 0
                            }
                        ]
                    }
                ]
            },
            {
                "phase": "2",
                "value": [
                    {
                        "nama_bank": "BANK BCA_PT HALIM INTI GAHARA_GAHARA",
                        "title": "GAHARA",
                        "show": true,
                        "balance": [
                            {
                                "name": "Total Cash In",
                                "nominal": 0
                            },
                            {
                                "name": "Total Cash Out",
                                "nominal": 0
                            },
                            {
                                "name": "Initial Balance",
                                "nominal": 0
                            }
                        ],
                        "cash_in": [
                            {
                                "name": "Prasarana",
                                "nominal": 0,
                                "kode_coa": 1010
                            },
                            {
                                "name": "Offline",
                                "nominal": 0,
                                "kode_coa": 1010
                            },
                            {
                                "name": "Customer",
                                "nominal": 0,
                                "kode_coa": 1010
                            }
                        ],
                        "cash_out": [
                            {
                                "name": "Regular Expense",
                                "nominal": 0,
                                "kode_coa": 1400
                            },
                            {
                                "name": "Bills",
                                "nominal": 0,
                                "kode_coa": 0
                            },
                            {
                                "name": "Pending Payments",
                                "nominal": 0,
                                "kode_coa": 0
                            }
                        ],
                        "others": [
                            {
                                "name": "Advance Payment – Casga",
                                "nominal": 0,
                                "kode_coa": 0
                            },
                            {
                                "name": "Operational",
                                "nominal": 0,
                                "kode_coa": 0
                            }
                        ]
                    },
                    {
                        "nama_bank": "BCA QUINTENSSENSIAL_PT HALIM INTI GAHARA_PRASARANA",
                        "title": "PRASARANA",
                        "show": true,
                        "balance": [
                            {
                                "name": "Total Cash In",
                                "nominal": 0
                            },
                            {
                                "name": "Total Cash Out",
                                "nominal": 0
                            },
                            {
                                "name": "Initial Balance",
                                "nominal": 0
                            }
                        ],
                        "cash_in": [
                            {
                                "name": "Marketplace - Tokopedia",
                                "nominal": 0,
                                "kode_coa": 1020
                            },
                            {
                                "name": "Marketplace - Shopee",
                                "nominal": 0,
                                "kode_coa": 1020
                            },
                            {
                                "name": "Offline Transaction",
                                "nominal": 0,
                                "kode_coa": 1020
                            }
                        ],
                        "cash_out": [
                            {
                                "name": "Regular Transaction",
                                "nominal": 0
                            },
                            {
                                "name": "Gahara",
                                "nominal": 0
                            },
                            {
                                "name": "Investor",
                                "nominal": []
                            },
                            {
                                "name": "Ads - Meta",
                                "nominal": 0
                            },
                            {
                                "name": "Ads - Tokopedia",
                                "nominal": 0
                            },
                            {
                                "name": "Jansen SAL",
                                "nominal": 0
                            }
                        ],
                        "Deposito": [
                            {
                                "name": "Homedec",
                                "nominal": 0
                            },
                            {
                                "name": "Rempoa Inventory",
                                "nominal": 0
                            }
                        ]
                    }
                ]
            },
            {
                "phase": "3",
                "value": [
                    {
                        "nama_bank": "BANK BCA_PT HALIM INTI GAHARA_GAHARA",
                        "title": "GAHARA",
                        "show": true,
                        "balance": [
                            {
                                "name": "Total Cash In",
                                "nominal": 0
                            },
                            {
                                "name": "Total Cash Out",
                                "nominal": 0
                            },
                            {
                                "name": "Initial Balance",
                                "nominal": 0
                            }
                        ],
                        "cash_in": [
                            {
                                "name": "Prasarana",
                                "nominal": 0,
                                "kode_coa": 1010
                            },
                            {
                                "name": "Offline",
                                "nominal": 0,
                                "kode_coa": 1010
                            },
                            {
                                "name": "Customer",
                                "nominal": 0,
                                "kode_coa": 1010
                            }
                        ],
                        "cash_out": [
                            {
                                "name": "Regular Expense",
                                "nominal": 0,
                                "kode_coa": 1400
                            },
                            {
                                "name": "Bills",
                                "nominal": 0,
                                "kode_coa": 0
                            },
                            {
                                "name": "Pending Payments",
                                "nominal": 0,
                                "kode_coa": 0
                            }
                        ],
                        "others": [
                            {
                                "name": "Advance Payment – Casga",
                                "nominal": 0,
                                "kode_coa": 0
                            },
                            {
                                "name": "Operational",
                                "nominal": 0,
                                "kode_coa": 0
                            }
                        ]
                    },
                    {
                        "nama_bank": "BCA QUINTENSSENSIAL_PT HALIM INTI GAHARA_PRASARANA",
                        "title": "PRASARANA",
                        "show": true,
                        "balance": [
                            {
                                "name": "Total Cash In",
                                "nominal": 0
                            },
                            {
                                "name": "Total Cash Out",
                                "nominal": 0
                            },
                            {
                                "name": "Initial Balance",
                                "nominal": 0
                            }
                        ],
                        "cash_in": [
                            {
                                "name": "Marketplace - Tokopedia",
                                "nominal": 0,
                                "kode_coa": 1020
                            },
                            {
                                "name": "Marketplace - Shopee",
                                "nominal": 0,
                                "kode_coa": 1020
                            },
                            {
                                "name": "Offline Transaction",
                                "nominal": 0,
                                "kode_coa": 1020
                            }
                        ],
                        "cash_out": [
                            {
                                "name": "Regular Transaction",
                                "nominal": 0
                            },
                            {
                                "name": "Gahara",
                                "nominal": 0
                            },
                            {
                                "name": "Investor",
                                "nominal": []
                            },
                            {
                                "name": "Ads - Meta",
                                "nominal": 0
                            },
                            {
                                "name": "Ads - Tokopedia",
                                "nominal": 0
                            },
                            {
                                "name": "Jansen SAL",
                                "nominal": 0
                            }
                        ],
                        "Deposito": [
                            {
                                "name": "Homedec",
                                "nominal": 0
                            },
                            {
                                "name": "Rempoa Inventory",
                                "nominal": 0
                            }
                        ]
                    }
                ]
            }
        ]
    };
    data.value = JSON.stringify(data.value);
    // hitung awal dan akhir hari ini di Node.js
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - 1;

    // cek ke MySQL
    const [cekHariIni] = await queryPromise(`SELECT COUNT(*) as jumlah FROM proc_temp_kiri_inputplan WHERE tglinputmili BETWEEN ? AND ?`, [startOfDay, endOfDay]);

    if (cekHariIni.jumlah > 0) {
        //sudah ada
        console.log('sudah ada data plan');
        parentPort.postMessage({ icons: "success", texts: "sudah ada data", titles: "" });
    } else {
        //belum ada
        console.log('belum ada data plan');
        // Ambil nama kolom dan nilai
        const columns = Object.keys(data); // ['katagori_img', 'katagori', 'urutan']
        const values = Object.values(data); // ['sofa.png', 'sofa', 0]

        // Buat string untuk kolom dan tanda tanya (placeholder)
        const placeholders = columns.map(() => '?').join(', ');
        const columnString = columns.join(', ');

        // Query insert
        const insertnew = await queryPromise(`INSERT INTO proc_temp_kiri_inputplan (${columnString})
        VALUES (${placeholders})
        `, values);

        parentPort.postMessage({ icons: "success", texts: "berhasil add data plan", titles: "" });
    }

}
//cek bill due
else if ('cekbilldue-right-plan') {

    const cekbill = await queryPromise(`SELECT * FROM database_billdue WHERE day != 0 
        AND (
            -- Jika month diisi, cocokkan dengan hari & bulan sekarang
            (month != 0 AND day = DAY(CURDATE()) AND month = MONTH(CURDATE()) - 1)
            -- Jika month kosong (0), cocokkan hanya hari
            OR (month = 0 AND day = DAY(CURDATE()))
        );
`   );

    console.log('cekbill=====', cekbill);

    if (cekbill.length === 0) {
        console.log("Tidak ada data ditemukan");
        parentPort.postMessage({ icons: "error", texts: "tidak data bill to plan", titles: "", datum: cekbill });
    } else {
        console.log("Data ditemukan:", cekbill);
        var now = new Date();
        var year = now.getFullYear();

        const month = now.getMonth(); // 0-indexed
        const monthCode = monthLetters[month];

        const likePattern = `${monthCode}____-${year}`;

        const cekID_pattern = await queryPromise(`SELECT * FROM datarequestbeli_proc WHERE id_request LIKE ?`, [likePattern]);

        const existingNumbers = cekID_pattern.map(row => parseInt(row.id_request.slice(1, 5)));
        const nextNumber = Math.max(...existingNumbers, 0) + 1;

        const newNumber = nextNumber.toString().padStart(4, "0");
        const newIdRequest = `${monthCode}${newNumber}-${year}`;

        for (const element of cekbill) {

            var data = {
                tglinputmili: Date.now(),// tglinputmili digenerate sebelum di-fecth
                id_request: newIdRequest,//request
                itemdivisi: 'HIG',//request
                item: element.item,//request
                qty: 1,//request
                unit: 'BILL',//request
                requester: 'Auto HIGSYSTEM',//request
                requester_id: '',//request
                note_req: 'reminder BILL',//request
                deadline: Date.now(),//request milisekon
                approver: JSON.stringify({ procurement: "Auto HIGSYSTEM", finance: "", supervisor: "", board: "" }),//nama yg approver sesuai role
                note_approver: JSON.stringify({ procurement: "", finance: "", supervisor: "", board: "" }),
                tipeitem: 'Bill',//request
                limitedrequest: 'false',//true,false,'' //request
                approvalorreject: JSON.stringify({ procurement: "true", finance: "", supervisor: "", board: "" }),//true==request diterima,false=Reject,''=Proses , {procurement:"true,false,''",finance:"true,false,''",supervisor:"true,false,''", board:"true,false,''"}	
                tglmili_approval: JSON.stringify({ procurement: `${Date.now()}`, finance: "", supervisor: "", board: "" }),
                vendor: '',///diambil dari nama vendor itemnya
                buyer: '',
                tindakbayar: '',//true,false,''
                tglmili_tindakbayar: '',
                z_qty: '',
                priceunit: Number(element.nominal),//harga dari itemnya
                totalprice: 1 * Number(element.nominal),///qtyxprice unit
                pendingpayment: '',//true,false,''
                bank: '',
                lokasiterima: element.office,//diisi lokasi kantor requester, contoh Rempoa C10
                kodecoa: element.kodecoa,//diisi coa dari itemnya
                penerima: '',
                terima: '',//true,false,''
                tglmili_terima: '',
                history_edit: '[]',
                tglmili_proses_bayar: '',
                proses_bayar: '',//true,false,''
                proses_bayar_fix: '',//true,false,''
                user_proses_bayar: '',
                phase_tindak: 0,
                note_bayar: '',
                refnewitem_link: '',
                refnewitem_price: 0,
                alasan_newitem: '',
                reqnewitem_toregular: '',
                kantor: element.office,
                estimasi_bayar_mili: Date.now(),
                totalterbayar: 0,
                totalprosesbayar: 0,
                status_tersisa: '',
                check_bayar: '', ///  jika cash="true", maka ini true
                old_sisa: 0,
                now_sisa: 0,
                cash: '',

            }

            const columns = Object.keys(data); // ['katagori_img', 'katagori', 'urutan']
            const values = Object.values(data); // ['sofa.png', 'sofa', 0]

            // Buat string untuk kolom dan tanda tanya (placeholder)
            const placeholders = columns.map(() => '?').join(', ');
            const columnString = columns.join(', ');

            // Query insert
            const insertnew = await queryPromise(`INSERT INTO datarequestbeli_proc (${columnString})
            VALUES (${placeholders})
            `, values);
        }


        parentPort.postMessage({ icons: "success", texts: "berhasil add data bill to plan", titles: "", datum: cekbill });
    }



}










function queryPromise(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}