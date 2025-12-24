// === Data Divisi (nama -> ID) ===
// semua key disimpan uppercase biar gampang
const divisions = {
    "CIRENDEU": 1,
    "CLASSY": 2,
    "FINISHING": 3,
    "HIG": 4,
    "HPL": 5,
    "JEPARA": 6,
    "PACK-DE": 7,
    "PACKDE": 8,
    "REMPOA": 9,
    "UPD": 10,
    "UPHOLSTERY": 11,
    "WELD": 12,
};

// === Grouping kantor (nama kantor -> daftar ID) ===
// nama kantor kita simpan apa adanya
const groups = {
    "Rempoa C10": [9, 4],
    "Rempoa C5": [9, 4],
    "Classy": [2, 7, 8, 4],
    "UPD": [10, 11, 4],
    "Cirende": [1, 3, 5, 4, 12],
    "Jepara": [6, 4],
};

// === Utility untuk pengelompokan berdasarkan divisi / grup ===
function groupDataByDivisionGroup(dataArray, groups, divisions) {
    // Ambil semua nama grup yang cocok dengan id divisi tertentu
    const getGroupsByDivisionId = (id) => {
        return Object.entries(groups)
            .filter(([groupName, ids]) => ids.includes(id))
            .map(([groupName]) => groupName);
    };

    // Ambil semua nama grup berdasarkan nama divisi
    const getGroupsByDivisionName = (name) => {
        if (!name) return null;
        const upperName = name.toUpperCase();
        const id = divisions[upperName];
        if (!id) return null;
        return getGroupsByDivisionId(id); // bisa array
    };

    // hasil akhir pengelompokan
    const result = {};

    dataArray.forEach(item => {
        const groupsFound = getGroupsByDivisionName(item.divisi);
        if (!groupsFound) return; // kalau divisi tidak dikenali, skip

        // push ke semua grup yang cocok
        groupsFound.forEach(g => {
            if (!result[g]) result[g] = [];
            result[g].push(item);
        });
    });

    return result;
}
let fullaccess
function klikradioregularornewitem(tipeitemklik) {
    if (tipeitemklik == 'newitem') {
        hidemodal('modalrequestbeli');
        klikmodalreqbelis_newitem();
        document.getElementById('tipeitembeli1').checked = true;
        $('#modalrequestbelinewitem').modal('show');

    } else {
        hidemodal('modalrequestbelinewitem');
        document.getElementById('tipeitembeli1').checked = false;
        $('#modalrequestbeli').modal('show');
    }
}

function klikmodalreqbelis(access) {
    fullaccess = access;

    // 🧩 Helper untuk aman ambil elemen
    const getEl = (id) => document.getElementById(id);
    const getName = (name) => document.querySelector(`[name="${name}"]`);

    // 🧩 Pastikan elemen-elemen utama ada
    const namaLengkapInput = getEl('namalengkap-modalrequestbeli-1');
    const namaPemohonEl = getEl('namapemohon-modalrequestbeli');
    const tanggalPermintaanEl = getEl('tanggalpermintaan-modalrequestbeli');
    const qtyInput = getEl('qty-modalrequestbeli-1');
    const qtyLabel = getEl('checkqtylabel-modalrequestbeli');

    // ✅ Set nama lengkap
    if (namaLengkapInput) namaLengkapInput.value = namalengkap || '';
    if (namaPemohonEl) namaPemohonEl.innerText = namalengkap || '';

    // 🗓️ Format tanggal lokal Indonesia
    const hariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulanIndo = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const now = new Date();
    const teksTanggal = `${hariIndo[now.getDay()]}, ${now.getDate()} ${bulanIndo[now.getMonth()]} ${now.getFullYear()}`;
    if (tanggalPermintaanEl) tanggalPermintaanEl.innerText = teksTanggal;

    // 🔹 Buat list item procurement awal
    if (typeof creatlistiemprocawal === 'function') creatlistiemprocawal();

    // 🔹 Reset item di container
    const container = document.querySelector('#itemsContainer-modalrequestbeli');
    if (container) {
        container.querySelectorAll('.partitems').forEach((itemCard, index) => {
            if (index !== 0 && typeof removeItem_modalrequestbeli === 'function') {
                removeItem_modalrequestbeli(index + 1);
            }
        });
    }

    // 🔹 Reset field dasar
    const resetField = (name, value = '') => {
        const el = getName(name);
        if (el) el.value = value;
    };

    resetField('qty-modalrequestbeli', '0');
    resetField('note-modalrequestbeli');
    resetField('divisi-modalrequestbeli');
    resetField('deadline-modalrequestdeadline');

    // 🔹 Set properti qty input dengan aman
    if (qtyInput) {
        qtyInput.disabled = false;
        qtyInput.type = 'number';
        qtyInput.max = 100000000000;
    }

    // 🔹 Set label status awal
    if (qtyLabel) {
        qtyLabel.textContent = '...';
        qtyLabel.style.backgroundColor = 'white';
        qtyLabel.style.color = 'black';
    }

    // 🔹 Reset variabel global (pastikan ada di scope luar)
    limitedrequestvalue = "false";
    datalistrequest = [];
    additemreqproc = [];
    maxstock = 0;
    checkStock = false;
    limitedrequestvalue = "false";

    // 🔹 Render ulang tabel item request
    if (typeof showtabelitemrequest === 'function') showtabelitemrequest();

    // 🔹 Reset checkbox persetujuan
    const btnSetuju = getEl('btnsetuju');
    if (btnSetuju) btnSetuju.checked = false;

    // 🔹 Tampilkan modal Bootstrap (pastikan jQuery & Bootstrap aktif)
    const modal = $('#modalrequestbeli');
    if (modal && modal.modal) modal.modal('show');
}

//buat list item procurement
var listitemprocawal;
function creatlistiemprocawal() {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var datas = dataarray.databaseitem_proc;
    var dataFix = []

    if (role === "Supervisor" || role === "Procurement") {
        dataFix = datas
    } else {
        const grouped = groupDataByDivisionGroup(datas, groups, divisions);
        dataFix = grouped[office] || [];
        console.log("grouped======", dataFix);
    }

    // Hapus duplikat berdasarkan item
    const uniqueItems = Array.from(
        new Map(dataFix.map(item => [item.item.toLowerCase(), item])).values()
    );
    // Urutkan berdasarkan property 'item' A-Z
    uniqueItems.sort((a, b) => a.item.localeCompare(b.item));

    listitemprocawal = `<option value="" selected disabled >Pilih item</option>` + returarrayitemproc(uniqueItems);
    document.getElementById('namabarang-list').innerHTML = listitemprocawal;
}

function returarrayitemproc(array) {
    return array.map(function (element) {
        return `
        <option value="${element.item}">${element.item}</option>
        `;
    }).join('');
}
//

//on input
var namaitemprocselected = false; //true= sudah select, false= belum select
var filteredItem
function selekprocitemreq(indexitem) {
    var dataarray = window.dataall;
    var indexitemsx = indexitem.id.split('-')[2];
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    if (!namaitemprocselected) {
        console.log('update item');

        creatlistdivisiprocitem(dataarray.databaseitem_proc, document.getElementById('namabarang-modalrequestbeli-' + indexitemsx).value, indexitemsx);
        const uniqueItems = Array.from(
            new Map(dataarray.databaseitem_proc.map(item => [item.item.toLowerCase(), item])).values()
        );
        uniqueItems.sort((a, b) => a.item.localeCompare(b.item));
        const searchItem = document.getElementById('namabarang-modalrequestbeli-' + indexitemsx).value.trim().toLowerCase();
        filteredItem = uniqueItems.find(
            (item) => item.item.toLowerCase() === searchItem
        );
        priceProduct = filteredItem.price
        vendorProduct = filteredItem.vendor
        coaProduct = filteredItem.coa


        namaitemprocselected = true;
    } else if (namaitemprocselected && document.getElementById('dummynameitem-modalrequestbeli-' + indexitemsx).value != document.getElementById('namabarang-modalrequestbeli-' + indexitemsx).value) {
        creatlistdivisiprocitem(dataarray.databaseitem_proc, document.getElementById('namabarang-modalrequestbeli-' + indexitemsx).value, indexitemsx);
    }
    var itemprocselect = document.getElementById('namabarang-modalrequestbeli-' + indexitemsx).value;
    document.getElementById('dummynameitem-modalrequestbeli-' + indexitemsx).value = itemprocselect;
    // document.getElementById('qty-modalrequestbeli-1').disabled = true;
    // document.querySelector('[name="qty-modalrequestbeli"]').value = '';
    const label = document.getElementById('checkqtylabel-modalrequestbeli');
    label.textContent = `...`;
    label.style.backgroundColor = "white";
    label.style.color = "black";

    oninputdata_modalrequestbeli();
}

var additemreqproc = [];
var priceProduct = 0;
var coaProduct = 0;
var vendorProduct = "";
var pendingpayment = "";

var maxstock = 0;
var checkStock = false;
let datalistrequest = [];
var limitedrequestvalue = "false"
function oninputdata_modalrequestbeli() {
    additemreqproc.length = 0;
    namaitemprocselected = false;

    var qtyInputEl = document.querySelector('[name="qty-modalrequestbeli"]');
    var qty_reqproc = qtyInputEl.value || 0;
    // qtyInputEl.disabled = true;
    // ✅ Jalankan pembatasan stok hanya jika checkStock == true
    if (checkStock) {
        // 🚀 Batasi sesuai maxstock
        if (parseInt(qty_reqproc) > maxstock) {
            qty_reqproc = maxstock <= 0 ? 0 : maxstock;
            qtyInputEl.value = maxstock <= 0 ? 0 : maxstock;
        }
    }

    var itemprocselect = document.querySelector('[name="namabarang-modalrequestbeli"]').value;

    var itemdivisi = document.querySelector('[name="divisi-modalrequestbeli"]').value;
    var note = document.querySelector('[name="note-modalrequestbeli"]').value;
    var deadline = document.querySelector('[name="deadline-modalrequestdeadline"]').value;
    var unit_procs = document.querySelector('#unit-modalrequestbeli-1').value;

    var dateObj = new Date(deadline);
    // Dapatkan timestamp milidetik
    var deadlineMillis = dateObj.getTime().toString();

    var proc_database_pendingpayment = window.dataall.proc_database_pendingpayment;
    var totalprice = parseInt(qty_reqproc) * parseInt(priceProduct)
    var cash = "false"
    var proses_bayar = "false"
    var check_bayar = "false"
    var totalterbayar = ""

    const matched = proc_database_pendingpayment.find(
        item => item.vendor.toLowerCase() === vendorProduct.toLowerCase()
    );

    if (matched) {
        // cek apakah ada item dengan nama sama
        const datarequest = window.dataall.datarequestbeli_proc;
        const foundItem = datarequest.filter((data) =>
            //data.item && data.item.trim().toLowerCase() === filteredItem.item.trim().toLowerCase()
            data.vendor.toLowerCase() === vendorProduct.toLowerCase() && data.tindakbayar != 'true'
            || data.vendor.toLowerCase() === vendorProduct.toLowerCase() && data.tindakbayar == 'true' && data.status_tersisa == 'true' && data.now_sisa > 0

        );
        // if (foundItem.vendor !== "true") {

        // }


        console.log(foundItem);
        const totalMaxPendingPayment = foundItem.reduce((sum, item) => {
            return sum + (item.no_sisa && item.no_sisa > 0 ? item.no_sisa : item.totalprice);
        }, 0);

        console.log(totalMaxPendingPayment);

        if ((totalMaxPendingPayment + totalprice) > matched.max) {
            cash = "true"
            proses_bayar = "true"
            check_bayar = "true"
            totalterbayar = totalprice
            pendingpayment = "false";
        } else {
            cash = "false"
            proses_bayar = "false"
            check_bayar = "false"
            totalterbayar = ""
            pendingpayment = "true";
        }
    }

    let role = { procurement: fullaccess ? "true" : "", finance: fullaccess ? "true" : "", supervisor: fullaccess ? "true" : "", board: "" }
    var data = {
        tglinputmili: '',// tglinputmili digenerate sebelum di-fecth
        id_request: '',//request
        itemdivisi,//request
        item: itemprocselect,//request
        qty: parseInt(qty_reqproc),//request
        unit: unit_procs,//request
        requester: namalengkap,//request
        requester_id: username,//request
        note_req: note,//request
        deadline: deadlineMillis,//request milisekon
        approver: JSON.stringify(role),//nama yg approver sesuai role
        note_approver: JSON.stringify(role),
        tipeitem: 'Regular',//request
        limitedrequest: limitedrequestvalue,//true,false,'' //request
        approvalorreject: JSON.stringify(role),//true==request diterima,false=Reject,''=Proses , {procurement:"true,false,''",finance:"true,false,''",supervisor:"true,false,''", board:"true,false,''"}	
        tglmili_approval: JSON.stringify(role),
        vendor: vendorProduct,///diambil dari nama vendor itemnya
        buyer: '',
        tindakbayar: '',//true,false,''
        tglmili_tindakbayar: '',
        z_qty: '',
        priceunit: priceProduct,//harga dari itemnya
        totalprice: totalprice,///qtyxprice unit
        pendingpayment,//true,false,''  jika cash="true", maka ini false
        bank: '',
        lokasiterima: office,//diisi lokasi kantor requester, contoh Rempoa C10
        kodecoa: coaProduct,//diisi coa dari itemnya
        penerima: '',
        terima: '',//true,false,''
        tglmili_terima: '',
        history_edit: '[]',
        tglmili_proses_bayar: '',
        proses_bayar: proses_bayar,//true,false,'' jika cash="true", maka ini true
        proses_bayar_fix: '',//true,false,''
        user_proses_bayar: '',
        phase_tindak: 0,
        note_bayar: '',
        refnewitem_link: '',
        refnewitem_price: 0,
        alasan_newitem: '',
        reqnewitem_toregular: '',
        kantor: office,
        estimasi_bayar_mili: fullaccess ? Date.now() : "",
        totalterbayar: Number(totalterbayar), ///  jika cash="true", maka ini diisi totalprice
        totalprosesbayar: 0,
        status_tersisa: '',
        check_bayar: check_bayar, ///  jika cash="true", maka ini true
        old_sisa: 0,
        now_sisa: 0,
        cash: cash,//true,false,'' true jika item vendor payment memiliki total pembelian melebihi limit
    }
    if (!itemdivisi || !itemprocselect || parseInt(qty_reqproc) === 0 || !unit_procs || !checkStock) {
        console.log("Skipping item due to missing fields");
        console.log(data);
        console.log(itemdivisi);
        console.log(itemprocselect);
        console.log(qty_reqproc);
        console.log(unit_procs);
        console.log(checkStock);
        return;
    }
    else {
        additemreqproc.push(data);
    }

    console.log('additemreqproc==', additemreqproc);

    var arrayinput = ['namabarang-modalrequestbeli-1', 'namabarang-modalrequestbeli-1', 'qty-modalrequestbeli-1', 'divisi-modalrequestbeli-1'];
    arrayinput.forEach(element => {
        var inptdt = document.getElementById(element);
        if (inptdt.value != '') {
            inptdt.classList.remove('is-invalid');
        }
    });
}


function additem() {
    console.log(additemreqproc);
    var qtyInputEl = document.querySelector('[name="qty-modalrequestbeli"]');

    var arrayinput = ['namabarang-modalrequestbeli-1', 'namabarang-modalrequestbeli-1', 'qty-modalrequestbeli-1', 'divisi-modalrequestbeli-1'];

    var flaglengkap = false;

    arrayinput.forEach(element => {
        var inptdt = document.getElementById(element);
        if (inptdt.value == '') {
            inptdt.classList.add('is-invalid');
        } else {
            flaglengkap = true;
            inptdt.classList.remove('is-invalid');
        }
    });

    // ambil objek pertama dari additemreqproc
    if (additemreqproc.length > 0) {
        datalistrequest.push({ ...additemreqproc[0] });
        // 🔹 RESET INPUT setelah berhasil push
        // document.querySelector('[name="namabarang-modalrequestbeli"]').value = '';
        document.querySelector('[name="qty-modalrequestbeli"]').value = '0';
        document.querySelector('[name="note-modalrequestbeli"]').value = '';
        document.querySelector('[name="divisi-modalrequestbeli"]').value = '';
        document.querySelector('[name="deadline-modalrequestdeadline"]').value = '';

        document.querySelector('[name="qty-modalrequestbeli"]').value = '';
        const label = document.getElementById('checkqtylabel-modalrequestbeli');
        label.textContent = `...`;
        label.style.backgroundColor = "white";
        label.style.color = "black";
        limitedrequestvalue = "false"
        // document.querySelector('#unit-modalrequestbeli-1').value = '';
        additemreqproc = [];
        checkStock = false;
        console.log(datalistrequest);

        // checkQyt_modalrequestbeli()
    } else {
        // if (document.getElementById('checkqtylabel-modalrequestbeli').innerHTML.toLowerCase().includes('limit')) {
        //     warningpopup('error', "Request sudah limited");
        // } else {
        //     if (document.getElementById('qty-modalrequestbeli-1').disabled == true && flaglengkap == true) {
        //         warningpopup('error', "Tekan tombol check dulu, lalu isi QTY");
        //     } else {
        //         warningpopup('error', "Data belum lengkap!");
        //     }
        // }
    }
    showtabelitemrequest();

}



////showtabel
function showtabelitemrequest() {
    // hapus tbody lama
    var myobj = document.getElementById("divhpsdata-modalrequestbeli");
    if (myobj) myobj.remove();

    var datatab = document.getElementById(`alldattab-modalrequestbeli`);
    var divhapus = document.createElement("tbody");
    divhapus.setAttribute("id", "divhpsdata-modalrequestbeli");

    // cek data kosong
    var nodataEl = document.getElementById('datatidakditemukan-modalrequestbeli');
    if (datalistrequest.length > 0) {
        nodataEl.setAttribute('style', 'display:none;'); // sembunyikan
    } else {
        nodataEl.setAttribute('style', 'display:block;'); // tampilkan
    }
    // Misal datalistrequest adalah array data kamu
    let totalPCS = datalistrequest.reduce((sum, item) => sum + (parseInt(item.qty) || 0), 0);
    document.getElementById('totalQYT').innerText = totalPCS + ' PCS';

    // isi tabel
    divhapus.innerHTML = returnarrayitemrequest(datalistrequest);
    datatab.appendChild(divhapus);

    // optional loading
    setTimeout(function () {
        document.getElementById("showmainpage").removeAttribute("style");
        document.getElementById("loadingskeleton").setAttribute("style", "display:none;");
    }, 500);
}


function returnarrayitemrequest(dataitem) {
    return dataitem
        .map(function (element, index) {
            const item = element?.item?.trim() || "-";
            const itemdivisi = element?.itemdivisi?.trim() || "-";
            const qty = element?.qty || "-";

            const finalElement = {
                ...element,
                item,
                itemdivisi,
                qty,
            };

            return `
        <tr data-json='${JSON.stringify(finalElement)}' id="dataitem-${index}">
          <td style="text-align: center; vertical-align: middle; font-size: 12px; ">${index + 1}</td>
          <td style="text-align: left; vertical-align: middle; font-size: 12px; " title="${item}">${item}</td>
          <td style="text-align: left; vertical-align: middle; font-size: 12px; ">${itemdivisi}</td>
          <td style="text-align: left; vertical-align: middle; font-size: 12px; ">${qty}</td>
        </tr>
      `;
        })
        .join("");
}

function creatlistdivisiprocitem(array, item, indext) {
    // ambil elemen-elemen sesuai id
    const divisiEl = document.getElementById(`divisi-modalrequestbeli-${indext}`);
    const unitEl = document.getElementById(`unit-modalrequestbeli-${indext}`);
    const imgEl = document.getElementById(`img-modalrequestbeli-${indext}`);

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

function returnarraydivisiprocitem(array) {
    return array.map(function (element) {
        return `
        <option value="${element}">${element}</option>
        `;
    }).join('');
}

//tutup on input
function checkQyt_modalrequestbeli() {
    console.log("=== Check QTY Modal Request Beli ===");
    var dataarray = window.dataall;
    // Ambil elemen input barang
    var barangInputEl = document.getElementById('namabarang-modalrequestbeli-1');
    var selectedItem = barangInputEl.value;
    // Element output
    const label = document.getElementById('checkqtylabel-modalrequestbeli');
    var qtyInputEl = document.querySelector('[name="qty-modalrequestbeli"]');
    // Reset style label
    label.style.backgroundColor = "";
    label.style.color = "";
    label.textContent = "";
    // Jika belum pilih item
    if (!selectedItem) {
        warningpopup('error', "Silakan pilih item terlebih dahulu!");
        console.log("Belum pilih item.");
        label.textContent = "Unavailable";
        label.style.backgroundColor = "gray";
        label.style.color = "white";
        // tambahkan class invalid ke input barang
        barangInputEl.classList.add('is-invalid');
        return;
    }
    if (!qtyInputEl.value || parseInt(qtyInputEl.value) <= 0) {
        warningpopup('error', "Silakan masukkan QTY yang valid!");
        console.log("Belum pilih item.");
        label.textContent = "Unavailable";
        label.style.backgroundColor = "gray";
        label.style.color = "white";
        qtyInputEl.classList.add('is-invalid');
        return;
    }

    barangInputEl.classList.remove('is-invalid');
    qtyInputEl.classList.remove('is-invalid');
    // Ambil bulan sekarang
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentYear = now.getFullYear();
    const requestData = dataarray.datarequestbeli_proc || [];
    const databaseItem = dataarray.databaseitem_proc || [];
    const matchedRequest = requestData.filter(d => d.item === selectedItem);
    const matchedItem = databaseItem.filter(d => d.item === selectedItem);
    let qtyItem = 0;
    let qtyRequest = 0;
    let approvedThisMonth = "";

    if (matchedRequest.length === 0 || matchedItem.length === 0) {
        console.log(`Data untuk item "${selectedItem}" tidak ditemukan.`);
        // 🔹 Tambahan: total qty yang sudah ada di datalistrequest untuk item ini
        const qtyFromTable = datalistrequest
            .filter(d => d.item === selectedItem)
            .reduce((acc, d) => acc + Number(d.qty), 0);
        qtyItem = matchedItem[0].qty - qtyFromTable;
        console.log(matchedItem[0].qty);

        if (matchedItem[0].qty >= 1) {
            if (qtyItem <= 0) {
                warningpopup('success', `QTY request (${qtyRequest}) lebih besar dari stok (${qtyItem}) untuk item "${selectedItem}"`);
                console.log(`QTY request(${qtyRequest}) lebih besar dari stok(${qtyItem}) untuk item "${selectedItem}"`);
                label.textContent = "Limit Passed";
                label.style.backgroundColor = "red";
                label.style.color = "white";
                maxstock = 0;
                checkStock = false;
                // qtyInputEl.disabled = true;
                qtyInputEl.value = 0;
                requestLimit()
            } else {
                if (qtyInputEl.value > qtyItem) {
                    warningpopup('error', `QTY request(${qtyInputEl.value}) lebih besar dari stok(${qtyItem}) untuk item "${selectedItem}"`);
                    label.textContent = "Unavailable";
                    label.style.backgroundColor = "gray";
                    label.style.color = "white";
                    qtyInputEl.classList.add('is-invalid');
                } else {
                    warningpopup('success', `Available ${qtyItem <= 0 ? "" : qtyItem + " Request"} `);
                    label.textContent = `Available ${qtyItem === 0 ? "" : qtyItem + " Request"} `;
                    label.style.backgroundColor = "green";
                    label.style.color = "white";
                    maxstock = qtyItem === 0 ? 1000000000 : qtyItem;
                    checkStock = true;
                    qtyInputEl.disabled = false;
                }

            }
        } else {
            warningpopup('success', `Available ${qtyItem <= 0 ? "" : qtyItem + " Request"} `);
            label.textContent = `Available ${qtyItem <= 0 ? "" : qtyItem + " Request"} `;
            label.style.backgroundColor = "green";
            label.style.color = "white";
            maxstock = qtyItem === 0 ? 1000000000 : qtyItem;
            checkStock = true;
            qtyInputEl.disabled = false;
        }
    } else {
        approvedThisMonth = matchedRequest.filter(d => {
            if (!d.tglinputmili) return false;
            const tgl = new Date(Number(d.tglinputmili));
            return (tgl.getMonth() + 1) === currentMonth && tgl.getFullYear() === currentYear;
        });
        if (approvedThisMonth.length === 0) {
            // 🔹 Tambahan: total qty yang sudah ada di datalistrequest untuk item ini
            const qtyFromTable = datalistrequest
                .filter(d => d.item === selectedItem)
                .reduce((acc, d) => acc + Number(d.qty), 0);

            qtyItem = matchedItem[0].qty - qtyFromTable;
            if (qtyItem <= 0) {
                warningpopup('success', `QTY request (${qtyRequest}) lebih besar dari stok (${qtyItem}) untuk item "${selectedItem}"`);
                console.log(`QTY request(${qtyRequest}) lebih besar dari stok(${qtyItem}) untuk item "${selectedItem}"`);
                label.textContent = "Limit Passed";
                label.style.backgroundColor = "red";
                label.style.color = "white";
                maxstock = 0;
                checkStock = false;
                // qtyInputEl.disabled = true;
                qtyInputEl.value = 0;
                requestLimit()
            } else {
                warningpopup('success', `Available ${qtyItem === 0 ? "" : qtyItem + "request"} `);
                label.textContent = `Available ${qtyItem === 0 ? "" : qtyItem + "request"} `;
                qtyInputEl.value = document.querySelector('[name="qty-modalrequestbeli"]').value > qtyItem ? qtyItem : document.querySelector('[name="qty-modalrequestbeli"]').value;
                label.style.backgroundColor = "green";
                label.style.color = "white";
                maxstock = qtyItem === 0 ? 1000000000 : qtyItem;
                checkStock = true;
                qtyInputEl.disabled = false;
            }
        } else {
            console.log('approvedThisMonth=============++++++', approvedThisMonth)
            // 🔹 Tambahan: total qty yang sudah ada di datalistrequest untuk item ini
            const qtyFromTable = datalistrequest
                .filter(d => d.item === selectedItem)
                .reduce((acc, d) => acc + Number(d.qty), 0);

            // Ambil qty dari request & database
            qtyRequest = approvedThisMonth.reduce((acc, item) => acc + Number(item.qty), 0) + qtyFromTable; // qty di request
            qtyItem = matchedItem[0].qty;

            if (qtyRequest > qtyItem) {
                warningpopup('success', `QTY request (${qtyRequest}) lebih besar dari stok (${qtyItem}) untuk item "${selectedItem}"`);
                console.log(`QTY request(${qtyRequest}) lebih besar dari stok(${qtyItem}) untuk item "${selectedItem}"`);
                label.textContent = "Limit Passed";
                label.style.backgroundColor = "red";
                label.style.color = "white";
                maxstock = 0;
                checkStock = false;
                // qtyInputEl.disabled = true;
                qtyInputEl.value = 0;
                requestLimit()
            } else {
                if (qtyItem - qtyRequest <= 0) {
                    warningpopup('success', `QTY request (${qtyRequest}) lebih besar dari stok (${qtyItem}) untuk item "${selectedItem}"`);
                    console.log(`QTY request(${qtyRequest}) lebih besar dari stok(${qtyItem}) untuk item "${selectedItem}"`);
                    label.textContent = "Limit Passed";
                    label.style.backgroundColor = "red";
                    label.style.color = "white";
                    maxstock = 0;
                    checkStock = false;
                    // qtyInputEl.disabled = true;
                    qtyInputEl.value = 0;
                    requestLimit()
                } else {
                    warningpopup('success', `QTY OK untuk item "${selectedItem}" QTY request(${qtyRequest}) dari  max(${qtyItem}) untuk item "${selectedItem}"`);
                    console.log(`QTY OK untuk item "${selectedItem}" QTY request(${qtyRequest}) dari  max(${qtyItem}) untuk item "${selectedItem}"`);
                    label.textContent = `Available ${qtyItem - qtyRequest} request`;
                    label.style.backgroundColor = "green";
                    label.style.color = "white";
                    maxstock = qtyItem - qtyRequest;
                    checkStock = true;
                    // qtyInputEl.disabled = false;
                }
            }
        }
    }
}

function requestLimit() {
    const label = document.getElementById('checkqtylabel-modalrequestbeli');
    if (label.textContent === "Limit Passed") {
        $('#modalrequestbeli-limitpassed').modal('show');
    }
}
function saveRequestLimitPassed() {
    var qtyInputEl = document.querySelector('[name="qty-modalrequestbeli"]');
    var checkbox = document.getElementById('btnsetuju-limitpassed');
    if (checkbox && checkbox.checked) {
        hidemodal('modalrequestbeli-limitpassed');
        checkStock = true;
        maxstock = 1000000000;
        qtyInputEl.disabled = false;
        limitedrequestvalue = "true"
    } else {
        //alert("Silakan centang 'Setuju' sebelum submit!");
        warningpopup('error', "Silakan centang 'Setuju' sebelum submit request limit!");
        limitedrequestvalue = "false"
        return; // hentikan submit kalau belum centang
    }
}

//remove item
function removeItem_modalrequestbeli(itemId) {
    document.getElementById(`item - modalrequestbeli - ${itemId} `).remove();

    // Ambil ulang semua item yang tersisa
    const items = document.querySelectorAll('#itemsContainer-modalrequestbeli > .partitems');

    // Reset itemIndex agar sesuai urutan terbaru
    itemIndex_procreq = items.length;

    if (items.length == 1) {
        document.getElementById("judulitem-modalrequestbeli-1").classList.add('d-none');
    }
    //reset total item
    document.getElementById("totalitem-modalrequestbeli").innerHTML = `${itemIndex_procreq} ${itemIndex_procreq == 1 ? 'ITEM' : 'ITEMS'} `;

    items.forEach((item, index) => {
        const newId = index + 1; // Sesuaikan index baru

        // Update elemen ID
        item.id = `item - modalrequestbeli - ${newId} `;
        // Perbarui ID dan "for" label semua input dalam item
        const inputs = item.querySelectorAll('input, select, span, p, button');
        inputs.forEach(input => {
            const oldId = input.id;
            if (oldId) {
                const newInputId = oldId.replace(/\d+$/, newId); // Ganti angka di ID dengan newId
                input.id = newInputId;
            }
        });

        // Perbarui tombol hapus dengan parameter ID baru
        const removeButton = item.querySelector('.removeItem-modalrequestbeli');
        removeButton.setAttribute('onclick', `removeItem_modalrequestbeli(${newId})`);

        //perbarui judul item judulitem
        const judulitem = item.querySelector(`#judulitem - modalrequestbeli - ${newId} `);
        judulitem.innerHTML = `Item ${newId} `;

    });
}
//tutup remove item


//save to database
function submitsave_modalrequestbeli() {
    // Ambil checkbox
    var checkbox = document.getElementById('btnsetuju');
    var flag = 0;
    if (!datalistrequest || datalistrequest.length === 0) {
        flag = 0;
        warningpopup('error', 'Data belum ada!');
        return;
    } else if (checkbox && checkbox.checked == false) {
        flag = 0;
        warningpopup('error', "Silakan centang 'Setuju' sebelum submit!");
    } else {
        const now = Date.now();
        datalistrequest.forEach(item => {
            item.tglinputmili = now;
        });
        console.log(datalistrequest);
        flag = 1;
    }
    console.log(datalistrequest);


    if (flag == 1) {
        hidemodal('modalrequestbeli');
        loadingpopup();
        var xhrzx = new XMLHttpRequest();

        xhrzx.open("POST", "/procurement/saveaddreqbeliproc");
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify({ namalengkap, username, additemreqproc: datalistrequest, alldataadditem: datalistrequest }));
        xhrzx.addEventListener("load", () => {

            var resdat = JSON.parse(xhrzx.responseText);
            console.log('resdat');
            console.log(resdat);

            var valueload = 90;
            setTimeout(function () {
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
                setTimeout(function () {
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;

                    if (JSON.stringify(resdat.notif).toLowerCase().includes('gagal')) {
                        //JSON.stringify(resdat.notif).toLowerCase().includes('duplikat')||
                        if (fullaccess === "full") {
                            Swal.close();
                        } else {
                            creattabstatus(resdat.notif);
                        }
                        var suksesItems = [];

                        // Cek status setiap item di datalistrequest
                        datalistrequest.forEach(item => {
                            let isSukses = resdat.notif.find(n =>
                                n.item === item.item &&
                                n.divisi === item.itemdivisi &&
                                n.statussave === "sukses"
                            );

                            if (isSukses) {
                                item.no = isSukses.no; // tambahkan properti no ke item
                                suksesItems.push(item);
                            }
                        });
                        if (suksesItems.length > 0) {
                            socket.emit('addreqbeli', suksesItems);
                            suksesandloading('success', 'Loading Data...')
                            fetchdata();
                        }
                        $("#modalpopupsuksessavereqbelis").modal('show');
                    } else {
                        if (fullaccess === "full") {
                            Swal.close();
                        } else {
                            creattabstatus(resdat.notif);
                        }
                        var suksesItems = [];
                        datalistrequest.forEach(item => {
                            let isSukses = resdat.notif.find(n =>
                                n.item === item.item &&
                                n.divisi === item.itemdivisi &&
                                n.statussave === "sukses"
                            );

                            if (isSukses) {
                                item.no = isSukses.no; // tambahkan properti no ke item
                                suksesItems.push(item);
                            }
                        });
                        socket.emit('addreqbeli', suksesItems);
                        $("#modalpopupsuksessavereqbelis").modal('show');
                    }
                }, 800);
            }, 2000);
        });
    }
}

function creattabstatus(data) {
    var myobj = document.getElementById("finalstatussaved");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattabstatus-save`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'finalstatussaved');

    var innesx = returnarraystatussave(data);
    console.log('innesx');
    divhapus.innerHTML = innesx;

    datatab.appendChild(divhapus);

    Swal.close();
}

function returnarraystatussave(array) {
    return array.map(function (element) {
        return `
        <tr>
            <td class="text-truncate"  style="max-width: 100px;" title="${element.item}">
                ${element.item}
            </td>
            <td>
                <span><i class="bi bi-${element.statussave.toLowerCase().includes('gagal') ? 'x' : 'check'}-circle-fill" style="color: ${element.statussave.toLowerCase().includes('gagal') ? 'red' : 'green'};"></i> ${element.statussave.toLowerCase().includes('gagal') ? element.statussave : 'saved'}</span>
            </td>
        </tr>
        `;
    }).join('');
}
//tutup save to database
