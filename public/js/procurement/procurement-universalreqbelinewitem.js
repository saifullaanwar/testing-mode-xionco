// Mapping kantor → index divisi (dipisah koma)
const kantorMapping = {
    "Rempoa C10": "9,4",
    "Rempoa C5": "9,4",
    "Classy": "2,7,8,4",
    "UPD": "10,11,4",
    "Cirende": "1,3,5,4,12",
    "Jepara": "6,4"
};

function klikmodalreqbelis_newitem() {
    console.log(fullaccess);

    document.getElementById('namalengkap-modalrequestbelinewitem-1').value = namalengkap;
    //reset add item
    document.querySelectorAll('#itemsContainer-modalrequestbelinewitem > .partitems').forEach((itemCard, index) => {
        if (index != 0) {
            //removeItem_modalrequestbeli(index+1)
        }

    });

    //ambil data divisi
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    document.getElementById('divisi-modalrequestbelinewitem-1').innerHTML = '';//reset

    var divisiaray = [];
    var unitaray = [];
    for (let i = 0; i < dataarray.databaseitem_proc.length; i++) {
        const element = dataarray.databaseitem_proc[i];
        if (element.divisi != '') {
            divisiaray.push(element.divisi);
        }
    }
    for (let i = 0; i < dataarray.databaseitem_proc.length; i++) {
        const element = dataarray.databaseitem_proc[i];
        if (element.unit != '') {
            unitaray.push(element.unit);
        }
    }

    // Urutkan berdasarkan property 'item' A-Z
    const uniqueSortedItems = [...new Set(divisiaray)].sort();
    const uniqueSortedItemUnit = [...new Set(unitaray)].sort();

    // Fungsi getDivision
    function getDivision(namaKantor) {
        const indexString = kantorMapping[namaKantor];
        if (!indexString) return [];

        const indexArray = indexString.split(',').map(i => parseInt(i.trim(), 10));
        return indexArray.map(i => uniqueSortedItems[i - 1]);
    }
    var datadivisiFix = []

    if (role === "Supervisor" || role === "Procurement") {
        datadivisiFix = uniqueSortedItems
    } else {
        datadivisiFix = getDivision(office)
    }

    console.log('divisiaray new item===');
    console.log(datadivisiFix);
    console.log('unitaray new item===');
    console.log(uniqueSortedItemUnit);

    listdivisinewitemss = `<option value="" selected disabled >Pilih Divisi</option>` + returnarraydivisinewitem(datadivisiFix);
    listunitnewitemss = `<option value="" selected disabled >Pilih Unit</option>` + returnarraydivisinewitem(uniqueSortedItemUnit);

    document.getElementById(`divisi-modalrequestbelinewitem-1`).innerHTML = listdivisinewitemss;
    document.getElementById(`unit-modalrequestbelinewitem-1`).innerHTML = listunitnewitemss;

    document.querySelector('[name="qty-modalrequestbelinewitem"]').value = "";
    document.querySelector('[name="namabarang-modalrequestbelinewitem"]').value = "";
    document.querySelector('[name="divisi-modalrequestbelinewitem"]').value = "";
    document.querySelector('[name="note-modalrequestbelinewitem"]').value = "";
    document.querySelector('[name="deadline-modalrequestbelinewitem-1"]').value = "";
    document.querySelector('#unit-modalrequestbelinewitem-1').value = "";
    document.querySelector('[name="linkreferensi-modalrequestbelinewitem"]').value = "";
    document.querySelector('[name="hargareferensi-modalrequestbelinewitem"]').value = "";
    document.getElementById('reqnewitem_toregular-modalrequestbelinewitem').checked = false;
    document.getElementById('btnsetuju-modalrequestbelinewitem').checked = false;

}
function returnarraydivisinewitem(array) {
    return array.map(function (element) {
        return `
        <option value="${element}">${element}</option>
        `;
    }).join('');
}
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('input[name="komponenorder-modalrequestbelinewitem"]').forEach(el => {
        el.addEventListener('change', () => {
            const noteContainer = document.getElementById('note-container-modalrequestbelinewitem');
            const noteEl = document.querySelector('[name="notealasan-modalrequestbelinewitem"]');

            if (el.value === 'Permohonan Khusus di Luar Kategori (Exceptional)') {
                noteContainer.style.display = 'block';
            } else {
                noteContainer.style.display = 'none';
                if (noteEl) noteEl.value = ''; // reset kalau bukan Permohonan Khusus di Luar Kategori (Exceptional)
            }

            oninputdata_modalrequestbeli_newitem();
        });
    });
});



function creatlistdivisiprocitem_newitem(array, item, indext) {
    // ambil elemen-elemen sesuai id
    const divisiEl = document.getElementById(`divisi-modalrequestbelinewitem-${indext}`);
    const unitEl = document.getElementById(`unit-modalrequestbelinewitem-${indext}`);
    const imgEl = document.getElementById(`img-modalrequestbelinewitem-${indext}`);

    // reset aman
    if (divisiEl) divisiEl.innerHTML = '';
    if (unitEl) unitEl.value = ''; // input pakai value
    if (imgEl) imgEl.src = '/assets/lainnya/item-default.png'; // default image

    var divisiaray = [];
    var imagedisplayArr = [];
    var unitArr = [];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (item === element.item) {
            divisiaray.push(element.divisi || '');
            imagedisplayArr.push(element.image || '');
            unitArr.push(element.unit || '');
        }
    }

    const uniqueSortedItems = [...new Set(divisiaray)].sort();

    console.log("asdasd", imagedisplayArr);
    if (imgEl && (imagedisplayArr[0] !== "-" && imagedisplayArr[0] !== "")) {
        imgEl.src = imagedisplayArr[0];
    }

    // update unit input kalau ada datanya
    if (unitEl && unitArr.length > 0 && unitArr[0]) {

        unitEl.value = unitArr[0];
    }

    // isi select divisi
    if (divisiEl) {
        divisiEl.innerHTML =
            `<option value="" selected disabled>Pilih divisi</option>` +
            returnarraydivisiprocitem(uniqueSortedItems);
    }
}


function toggleNoteModalRequestBeliNewItem() {
    const lainnyaRadio = document.getElementById('komponenorder8-modalrequestbelinewitem');
    const noteContainer = document.getElementById('note-container-modalrequestbelinewitem');

    if (lainnyaRadio.checked) {
        noteContainer.style.display = 'block'; // tampilkan textarea
    } else {
        noteContainer.style.display = 'none'; // sembunyikan textarea
    }
}

var additemreqproc = [];
function oninputdata_modalrequestbeli_newitem() {
    additemreqproc.length = 0;
    var dataarray = window.dataall;

    // Hapus duplikat berdasarkan item
    const uniqueItems = Array.from(
        new Map(dataarray.databaseitem_proc.map(item => [item.item.toLowerCase(), item])).values()
    );
    uniqueItems.sort((a, b) => a.item.localeCompare(b.item));

    var qtyInputEl = document.querySelector('[name="qty-modalrequestbelinewitem"]').value;
    var itemprocselect = document.querySelector('[name="namabarang-modalrequestbelinewitem"]').value;
    var itemdivisi = document.querySelector('[name="divisi-modalrequestbelinewitem"]').value;
    var note = document.querySelector('[name="note-modalrequestbelinewitem"]').value;
    var deadline = document.querySelector('[name="deadline-modalrequestbelinewitem-1"]').value;
    var unit_procs = document.querySelector('#unit-modalrequestbelinewitem-1').value;
    var linkreferensi = document.querySelector('[name="linkreferensi-modalrequestbelinewitem"]').value;
    var hargareferensi = document.querySelector('[name="hargareferensi-modalrequestbelinewitem"]').value;
    var reqnewitemtoregular = document.getElementById('reqnewitem_toregular-modalrequestbelinewitem').checked ? 'true' : 'false';

    // Ambil value radio yg terpilih
    var alasanrequest = document.querySelector('input[name="komponenorder-modalrequestbelinewitem"]:checked');
    alasanrequest = alasanrequest ? alasanrequest.value : '';

    // Kalau radio = "Lainnya", ambil isi textarea alasan
    if (alasanrequest === 'Permohonan Khusus di Luar Kategori (Exceptional)') {
        var alasanLainnya = document.querySelector('[name="notealasan-modalrequestbelinewitem"]').value;
        // kalau textarea ada isi, gabungkan ke alasanrequest (opsional)
        alasanrequest = 'Permohonan Khusus di Luar Kategori (Exceptional): ' + alasanLainnya;
    }


    var dateObj = new Date(deadline);
    // Dapatkan timestamp milidetik
    var deadlineMillis = dateObj.getTime().toString();
    let role = { procurement: fullaccess ? "true" : "", finance: fullaccess ? "true" : "", supervisor: fullaccess ? "true" : "", board: fullaccess ? "true" : "" }

    var data = {
        tglinputmili: new Date().getTime(),//request
        id_request: '',//request
        itemdivisi,//request
        item: itemprocselect,//request
        qty: parseInt(qtyInputEl),//request
        unit: unit_procs,//request
        requester: namalengkap,//request
        requester_id: username,//request
        note_req: note,//request
        deadline: deadlineMillis,//request milisekon
        approver: JSON.stringify(role),
        note_approver: JSON.stringify(role),
        tipeitem: 'New Item',//request
        limitedrequest: limitedrequestvalue,//true,false,'' //request
        approvalorreject: JSON.stringify(role),//true==request diterima,false=Reject,''=Proses , {procurement:"true,false,''",finance:"true,false,''",supervisor:"true,false,''", board:"true,false,''"}	
        tglmili_approval: JSON.stringify(role),
        vendor: '',
        buyer: '',
        tindakbayar: '',//true,false,''
        tglmili_tindakbayar: '',
        z_qty: '',
        priceunit: parseInt(hargareferensi),
        totalprice: parseInt(qtyInputEl) * parseInt(hargareferensi),///qtyxprice unit
        pendingpayment: '',//true,false,''
        bank: '',
        lokasiterima: office,//diisi lokasi kantor requester, contoh Rempoa C10
        kodecoa: '',
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
        refnewitem_link: linkreferensi,//new item link dari input link atau link upload image (/assets/procurement/new_item_img/namaimage.png)
        refnewitem_price: parseInt(hargareferensi),
        alasan_newitem: alasanrequest,
        reqnewitem_toregular: reqnewitemtoregular, //true,false,'',
        kantor: office,
        estimasi_bayar_mili: fullaccess ? Date.now() : "",
        totalterbayar: 0,
        totalprosesbayar: 0,
        status_tersisa: '',
        check_bayar: '',
        old_sisa: 0,
        now_sisa: 0,
        cash: '',//true,false,'' true jika item vendor payment memiliki total pembelian melebihi limit

    }
    if (!itemdivisi || !itemprocselect || parseInt(qtyInputEl) === 0 || !unit_procs || !linkreferensi || !hargareferensi || !alasanrequest) {
        console.log("Skipping item due to missing fields");
        console.log(data);
        return;
    }
    else {
        additemreqproc.push(data);
    }

    console.log('additemreqproc==');
    console.log(additemreqproc);

    const arrayinput = [
        'namabarang-modalrequestbelinewitem-1',
        'qty-modalrequestbelinewitem-1',
        'divisi-modalrequestbelinewitem-1',
        'linkreferensi-modalrequestbelinewitem-1',
        'hargareferensi-modalrequestbelinewitem-1',
        "komponenorder1-modalrequestbelinewitem",
        "unit-modalrequestbelinewitem-1"
    ];
    arrayinput.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        if (el.value.trim() === '') {
            el.classList.add('is-invalid');
            flaglengkap = false;
        } else {
            el.classList.remove('is-invalid');
        }
    });
}



//image
// Key akan menjadi ID input file, value adalah objek File
const selectedFiles = {};
// Fungsi untuk memicu klik pada input file tersembunyi
function klikuploadimg(e) {
    var itemprocselect = document.querySelector('[name="namabarang-modalrequestbelinewitem"]').value;

    if (itemprocselect === "") {
        warningpopup('error', "Silakan masukan nama barang");

    } else {
        const urutanfoto = e.id.replaceAll(e.id.includes('imguploadshow') ? 'imguploadshow' : 'iconupload', '');
        console.log('urutanfoto == ', urutanfoto);
        //listimagename
        //document.getElementById(`uploadimg${urutanfoto}`).click();
        console.log('reset');
        const imgshows = document.getElementById(`imguploadshow1`);
        const kursorshows = document.getElementById(`iconupload1`);
        imgshows.src = '';
        kursorshows.classList.remove('d-none');
        imgshows.classList.add('d-none');

        const input = document.getElementById(`uploadimg${urutanfoto}`);

        // Reset value agar event change selalu terpicu
        input.value = '';
        delete selectedFiles[`uploadimg${urutanfoto}`];

        input.click();
    }
}

// event listener input file
for (let i = 1; i < 2; i++) {
    const inputId = `uploadimg${i}`;
    const inputElement = document.getElementById(inputId);

    if (inputElement) { // Pastikan elemen ditemukan
        inputElement.addEventListener("change", function (event) {
            const file = event.target.files[0]; // Ambil file pertama dari input ini

            if (!file) {
                // Jika user membatalkan pilihan file
                delete selectedFiles[inputId]; // Hapus dari daftar jika dibatalkan
                updateStatusIcon(inputId, false, ''); // Update ikon status
                return;
            }

            // Validasi format file
            const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: "error",
                    text: "Format file harus gambar (PNG, JPG, JPEG, GIF).",
                    confirmButtonColor: "#0d6efd",
                    confirmButtonText: "Ok",
                    allowOutsideClick: true,
                });
                // Clear input file agar user bisa memilih ulang
                event.target.value = '';
                delete selectedFiles[inputId]; // Hapus dari daftar
                updateStatusIcon(inputId, false, ''); // Update ikon status
                return;
            }

            // Simpan file ke objek global
            selectedFiles[inputId] = file;

            // Tampilkan preview atau informasi file jika diperlukan
            const imgurl = URL.createObjectURL(file);
            console.log(`File selected for ${inputId}: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
            // Anda bisa update UI di sini, misalnya menampilkan thumbnail

            updateStatusIcon(inputId, true, imgurl); // Update ikon status
        });
    }
}
function updateStatusIcon(inputId, isFileSelected, url) {

    const indexfiles = inputId.replace('uploadimg', '');
    const imgshows = document.getElementById(`imguploadshow${indexfiles}`);
    const kursorshows = document.getElementById(`iconupload${indexfiles}`);

    //var fixindexfoto=indexfiles.split('-')[0];
    /* var namafoto=indexfiles=='1'?'eventlogo':'backgroundimage';

    const newFileName = `${namafoto}.png`; */

    if (!kursorshows.className.includes('d-none')) {
        //show image
        console.log('show');
        kursorshows.classList.add('d-none');
        imgshows.classList.remove('d-none');
        imgshows.src = url;

        var itemprocselect = document.querySelector('[name="namabarang-modalrequestbelinewitem"]').value;
        var linkreferensi = document.querySelector('[name="linkreferensi-modalrequestbelinewitem"]').value;
        let alasan_img = '/assets/procurement/new_item_img/' + itemprocselect.replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/[^a-zA-Z0-9 ]/g, '') // Hapus simbol, izinkan huruf, angka, spasi
            .trim()                        // Hapus spasi di awal/akhir
            .replace(/\s+/g, '-').toLowerCase() + `-${Date.now()}` + '.png';         // Ganti spasi dengan strip

        linkreferensi = alasan_img ? alasan_img : linkreferensi
        document.querySelector('[name="linkreferensi-modalrequestbelinewitem"]').value = linkreferensi

    } else {
        //hide 
        console.log('hide');
        imgshows.src = '';
        kursorshows.classList.remove('d-none');
        imgshows.classList.add('d-none');
    }
    oninputdata_modalrequestbeli_newitem();
}

function submitsave_modalrequestbelinewitem() {
    console.log("=== Submit Save Modal Request Beli New Item ===");

    // 🧩 Inisialisasi flag status
    let flag = 0; // 0 = belum valid, 1 = siap submit, 2 = loading, 3 = selesai
    let flagLengkap = true; // indikator semua input terisi

    const checkbox = document.getElementById('btnsetuju-modalrequestbelinewitem');
    const alasanrequest = document.querySelector('input[name="komponenorder-modalrequestbelinewitem"]:checked');

    const arrayinput = [
        'namabarang-modalrequestbelinewitem-1',
        'qty-modalrequestbelinewitem-1',
        'divisi-modalrequestbelinewitem-1',
        'linkreferensi-modalrequestbelinewitem-1',
        'hargareferensi-modalrequestbelinewitem-1',
        "komponenorder1-modalrequestbelinewitem",
        "unit-modalrequestbelinewitem-1"
    ];

    // 🧹 Validasi input wajib
    arrayinput.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        if (el.value.trim() === '') {
            el.classList.add('is-invalid');
            flaglengkap = false;
        } else {
            el.classList.remove('is-invalid');
        }
    });

    if (!alasanrequest) {
        flagLengkap = false;
        warningpopup('error', "Silakan pilih salah satu alasan request!");
        console.warn("Belum pilih alasan request.");
    }

    // ⚠️ Validasi checkbox "Setuju"
    if (!checkbox || !checkbox.checked) {
        flag = 0;
        warningpopup('error', "Silakan centang 'Setuju' sebelum submit!");
        return;
    }
    // ⚠️ Kalau ada input kosong
    if (!flagLengkap) {
        warningpopup('error', "Pastikan semua kolom sudah diisi sebelum submit!");
        return;
    }

    // ✅ Semua valid → siap submit
    flag = 1;
    console.log("additemreqproc", additemreqproc);

    // === Eksekusi Submit ===
    if (flag === 1) {
        flag = 2; // status: loading

        hidemodal('modalrequestbelinewitem');
        loadingpopup();

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/procurement/saveaddreqbeliproc`);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("authorization", xi);

        const payload = {
            namalengkap,
            username,
            additemreqproc: additemreqproc,
            alldataadditem: additemreqproc,
        };

        xhr.send(JSON.stringify(payload));

        xhr.addEventListener("load", () => {
            let resdat;
            try {
                resdat = JSON.parse(xhr.responseText);
            } catch (e) {
                flag = 0;
                Swal.close();
                warningpopup('error', "Gagal membaca respon server!");
                console.error("Invalid JSON response:", xhr.responseText);
                return;
            }

            console.log("Response data:", resdat);

            // 🔹 Simulasi progress loading
            const valueload = 90;
            const container = Swal.getHtmlContainer();

            setTimeout(() => {
                if (container) container.querySelector('#loadingpersenpopoups').value = valueload - 10;

                setTimeout(() => {
                    if (container) container.querySelector('#loadingpersenpopoups').value = valueload;

                    const notifText = JSON.stringify(resdat.notif || '').toLowerCase();
                    const isError = notifText.includes('duplikat') || notifText.includes('gagal');

                    // 💡 Jika error/duplikat
                    if (isError) {
                        flag = 0;
                        if (fullaccess === "full") {
                            Swal.close();
                        } else if (typeof creattabstatus === "function") {
                            creattabstatus(resdat.notif);
                        }
                    } else {
                        flag = 3; // sukses kirim
                    }

                    // 🔹 Proses item sukses
                    const suksesItems = [];
                    if (Array.isArray(additemreqproc) && Array.isArray(resdat.notif)) {
                        additemreqproc.forEach(item => {
                            const match = resdat.notif.find(n =>
                                n.item === item.item &&
                                n.divisi === item.itemdivisi &&
                                n.statussave === "sukses"
                            );
                            if (match) {
                                if (typeof uploadingimage === "function") uploadingimage();
                                item.no = match.no;
                                suksesItems.push(item);
                            }
                        });
                    }

                    // 🔹 Emit ke socket kalau ada item sukses
                    if (typeof socket !== "undefined" && suksesItems.length > 0) {
                        socket.emit("addreqbeli", suksesItems);
                    }

                    // 🔹 Tampilkan modal sukses kalau ada item berhasil
                    if (flag === 3) {
                        $("#modalpopupsuksessavereqbelis").modal("show");
                    }

                }, 800);
            }, 2000);
        });

        xhr.addEventListener("error", () => {
            flag = 0;
            Swal.close();
            warningpopup('error', "Gagal mengirim data ke server!");
        });
    }
}


// function submitsave_modalrequestbelinewitem() {
//   // 🧩 Inisialisasi flag status
//   let flag = 0; // 0 = belum valid, 1 = siap submit, 2 = loading, 3 = selesai
//   const checkbox = document.getElementById('btnsetuju-modalrequestbelinewitem');
//   const arrayinput = [
//     'namabarang-modalrequestbelinewitem-1',
//     'qty-modalrequestbelinewitem-1',
//     'divisi-modalrequestbelinewitem-1',
//     "linkreferensi-modalrequestbelinewitem-1",
//     "hargareferensi-modalrequestbelinewitem-1"
//   ];

//   // 🧹 Hapus status invalid untuk input yang sudah diisi
//   arrayinput.forEach(element => {
//         var inptdt = document.getElementById(element);
//         if (inptdt.value == '') {
//             inptdt.classList.add('is-invalid');
//         } else {
//             flaglengkap = true;
//             inptdt.classList.remove('is-invalid');
//         }
//     });

//   // 🧩 Validasi checkbox "Setuju"
//   if (checkbox && checkbox.checked) {
//     // flag = 1;
//   } else {
//     flag = 0;
//     warningpopup('error', "Silakan centang 'Setuju' sebelum submit!");
//     return;
//   }

// //   // ✅ Jika flag = 1, berarti semua siap submit
// //   if (flag === 1) {
// //     flag = 2; // masuk fase loading

// //     hidemodal('modalrequestbelinewitem');
// //     loadingpopup();

// //     const xhr = new XMLHttpRequest();
// //     xhr.open("POST", `/procurement/saveaddreqbeliproc`);
// //     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// //     xhr.setRequestHeader("authorization", xi);

// //     const payload = {
// //       namalengkap,
// //       username,
// //       additemreqproc,
// //       alldataadditem: additemreqproc,
// //     };

// //     xhr.send(JSON.stringify(payload));

// //     xhr.addEventListener("load", () => {
// //       let resdat;
// //       try {
// //         resdat = JSON.parse(xhr.responseText);
// //       } catch (e) {
// //         flag = 0;
// //         Swal.close();
// //         warningpopup('error', "Gagal membaca respon server!");
// //         console.error("Invalid JSON response:", xhr.responseText);
// //         return;
// //       }

// //       console.log("Response data:", resdat);

// //       // 🔹 Loading simulasi progress
// //       const valueload = 90;
// //       const container = Swal.getHtmlContainer();

// //       setTimeout(() => {
// //         if (container) container.querySelector('#loadingpersenpopoups').value = valueload - 10;

// //         setTimeout(() => {
// //           if (container) container.querySelector('#loadingpersenpopoups').value = valueload;

// //           const notifText = JSON.stringify(resdat.notif || '').toLowerCase();
// //           const isError = notifText.includes('duplikat') || notifText.includes('gagal');

// //           // 💡 Jika error/duplikat
// //           if (isError) {
// //             flag = 0;
// //             if (fullaccess === "full") {
// //               Swal.close();
// //             } else if (typeof creattabstatus === "function") {
// //               creattabstatus(resdat.notif);
// //             }
// //           } else {
// //             flag = 3; // sukses kirim
// //           }

// //           // 🔹 Proses item sukses
// //           const suksesItems = [];
// //           if (Array.isArray(additemreqproc) && Array.isArray(resdat.notif)) {
// //             additemreqproc.forEach(item => {
// //               const match = resdat.notif.find(n =>
// //                 n.item === item.item &&
// //                 n.divisi === item.itemdivisi &&
// //                 n.statussave === "sukses"
// //               );
// //               if (match) {
// //                 if (typeof uploadingimage === "function") uploadingimage();
// //                 item.no = match.no;
// //                 suksesItems.push(item);
// //               }
// //             });
// //           }

// //           // 🔹 Emit ke socket kalau ada item sukses
// //           if (typeof socket !== "undefined" && suksesItems.length > 0) {
// //             socket.emit("addreqbeli", suksesItems);
// //           }

// //           // 🔹 Tampilkan modal sukses kalau ada item berhasil
// //           if (flag === 3) {
// //             $("#modalpopupsuksessavereqbelis").modal("show");
// //           }

// //         }, 800);
// //       }, 2000);
// //     });

// //     xhr.addEventListener("error", () => {
// //       flag = 0;
// //       Swal.close();
// //       warningpopup('error', "Gagal mengirim data ke server!");
// //     });
// //   }
// }


//uploadimage
async function uploadingimage() {

    //loadingpopup();
    const formData = new FormData();
    let fileCount = 0;
    // Iterasi melalui file yang dipilih dan tambahkan ke FormData
    for (const id in selectedFiles) {
        if (selectedFiles.hasOwnProperty(id)) {
            console.log('otw upload 1')
            const file = selectedFiles[id];
            // Dapatkan ekstensi file dari originalname
            var itemprocselect = document.querySelector('[name="namabarang-modalrequestbelinewitem"]');
            itemprocselect.value = itemprocselect.value.replace(/[^a-zA-Z0-9 ]/g, '');

            let newFileName = itemprocselect.value
                .replace(/[^a-zA-Z0-9 ]/g, '') // Hapus simbol, izinkan huruf, angka, spasi
                .trim()                        // Hapus spasi di awal/akhir
                .replace(/\s+/g, '-').toLowerCase() + `-${Date.now()}` + '.png';
            console.log('nama file ==', newFileName)

            // Tambahkan file ke FormData dengan nama baru
            // 'gambar' adalah nama field yang diharapkan Multer di server
            formData.append("gambar", file, newFileName);
            //listimagename.push(newFileName);
            fileCount++;

        }
    }

    if (fileCount === 0) {
        Swal.close();
        Swal.fire({
            icon: "error",
            text: "Tidak ada gambar yang dipilih untuk diunggah.",
            confirmButtonColor: "#0d6efd",
            confirmButtonText: "Ok",
            allowOutsideClick: true,
        });
        return;
    }

    console.log(`Mengunggah ${fileCount} file...`);

    try {
        const uploadUrl = '/uploadimagefolder/newitemproc'; // Pastikan ini sesuai dengan router

        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData, // FormData akan mengatur Content-Type secara otomatis

        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.message || 'Gagal mengunggah file.');
        }

        const resdat = await response.json();

        setTimeout(function () {
            Swal.getHtmlContainer().querySelector("#loadingpersenpopoups").value = 90;
            if (resdat.uploaded === "file terupload") {

                /* Swal.fire({
                    icon: 'success',
                    title: 'Semua gambar berhasil diunggah!',
                    text: `${fileCount} gambar berhasil disimpan.`,
                    timer: 2000,
                    showConfirmButton: false
                }); */
                // Lakukan sesuatu setelah upload berhasil, misal:
                // savefixselesai(folderfoto); // Panggil fungsi Anda setelah sukses
                // Clear selected files for next upload
                for (const id in selectedFiles) {
                    if (selectedFiles.hasOwnProperty(id)) {
                        delete selectedFiles[id];
                        // Optional: Reset input file elements to clear their state
                        const inputElement = document.getElementById(id);
                        if (inputElement) {
                            inputElement.value = ''; // Reset the input value
                        }
                        updateStatusIcon(id, false, '');
                    }
                }

                //return `sukses`;
                //alldataadditem.main_image=JSON.stringify(listimagename);
                //socket.emit('addnew-katagori',{namalengkap,username,alldataadditem});
                //Swal.close();
                //$("#modalpopupsuksessaveit").modal('show');
                //warningpopup('success','sukses save');
                Swal.fire({
                    icon: "success",
                    title: "",
                    text: "sukses save",
                });
                Swal.showLoading();
                //location.reload();
                fetchdata();
            } else {
                //statusText.textContent = 'Upload gagal!';
                Swal.fire({
                    icon: "error",
                    title: `Data tersimpan namun Upload foto error ${resdat.uploaded}, `,
                    showConfirmButton: false,
                    timer: 3000,
                });
                //return `sukses [1]`;
            }
        }, 2000);

    } catch (error) {
        console.error("Upload error:", error);
        //statusText.textContent = 'Terjadi kesalahan!';
        Swal.fire({
            icon: "error",
            title: `Data tersimpan namun Upload foto error: ${error.message || 'Terjadi kesalahan jaringan/server'}`,
            showConfirmButton: false,
            timer: 3000,
        });
        //return 'suskses [99]'
    }
}

//