function klikradioregularornewitem(tipeitemklik) {
    if (tipeitemklik == 'newitem') {
        hidemodal('modalrequestbeli');
        document.getElementById('tipeitembeli2-modalrequestbelinewitem').checked = true;
        klikmodalreqbelis_newitem();
        $('#modalrequestbelinewitem').modal('show');
    } else {
        hidemodal('modalrequestbelinewitem');
        document.getElementById('tipeitembeli1').checked = true;
        $('#modalrequestbeli').modal('show');
    }
}

function klikmodalreqbelis() {
    document.getElementById('namalengkap-modalrequestbeli-1').value = namalengkap;
    creatlistiemprocawal();//buat list item procurement

    //reset add item
    document.querySelectorAll('#itemsContainer-modalrequestbeli > .partitems').forEach((itemCard, index) => {
        if (index != 0) {
            removeItem_modalrequestbeli(index + 1)
        }

    });
    $('#modalrequestbeli').modal('show');
}

//buat list item procurement
var listitemprocawal;
function creatlistiemprocawal() {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log(dataarray.databaseitem_proc);
    var datas = dataarray.databaseitem_proc;

    // Hapus duplikat berdasarkan item
    const uniqueItems = Array.from(
        new Map(datas.map(item => [item.item.toLowerCase(), item])).values()
    );
    // Urutkan berdasarkan property 'item' A-Z
    uniqueItems.sort((a, b) => a.item.localeCompare(b.item));


    listitemprocawal = `<option value="" selected disabled >Pilih item</option>` + returarrayitemproc(uniqueItems);
    document.getElementById('namabarang-modalrequestbeli-1').innerHTML = listitemprocawal;

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
var namaitemprocselected = false;//true= sudah select, false= belum select
//var itemprocselect='';
function selekprocitemreq(indexitem) {
    var indexitemsx = indexitem.id.split('-')[2];

    console.log('indexitemsx');
    console.log(indexitem.id);
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    if (!namaitemprocselected) {
        creatlistdivisiprocitem(dataarray.databaseitem_proc, document.getElementById('namabarang-modalrequestbeli-' + indexitemsx).value, indexitemsx);
        namaitemprocselected = true;
    } else if (namaitemprocselected && document.getElementById('dummynameitem-modalrequestbeli-' + indexitemsx).value != document.getElementById('namabarang-modalrequestbeli-' + indexitemsx).value) {
        creatlistdivisiprocitem(dataarray.databaseitem_proc, document.getElementById('namabarang-modalrequestbeli-' + indexitemsx).value, indexitemsx);
    }
    var itemprocselect = document.getElementById('namabarang-modalrequestbeli-' + indexitemsx).value;

    document.getElementById('dummynameitem-modalrequestbeli-' + indexitemsx).value = itemprocselect;
    oninputdata_modalrequestbeli();
}

var additemreqproc = [];
function oninputdata_modalrequestbeli() {
    additemreqproc.length = 0;
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    // Hapus duplikat berdasarkan item
    const uniqueItems = Array.from(
        new Map(dataarray.databaseitem_proc.map(item => [item.item.toLowerCase(), item])).values()
    );
    // Urutkan berdasarkan property 'item' A-Z
    uniqueItems.sort((a, b) => a.item.localeCompare(b.item));

    document.querySelectorAll('#itemsContainer-modalrequestbeli > .partitems').forEach((itemCard, index) => {
        var itemprocselect = itemCard.querySelector('[name="namabarang-modalrequestbeli"]').value;
        console.log(itemprocselect);

        itemCard.querySelector('[name="namaitemwithimg-modalrequestbeli"]').innerHTML = itemprocselect;

        var qty_reqproc = itemCard.querySelector('[name="qty-modalrequestbeli"]').value;

        itemCard.querySelector('[name="qtyshow-modalrequestbeli"]').innerHTML = qty_reqproc == '' ? 0 : qty_reqproc;

        var unit_procs = '';

        for (let i = 0; i < uniqueItems.length; i++) {
            const element = uniqueItems[i];
            if (itemprocselect == element.item) {
                itemCard.querySelector('[name="unitshow-modalrequestbeli"]').innerHTML = element.unit == '' ? 'UNIT' : element.unit;

                unit_procs = itemCard.querySelector('[name="unitshow-modalrequestbeli"]').innerHTML;

                itemCard.querySelector('[name="img-modalrequestbeli"]').src = element.image == '' ? '/assets/lainnya/item-default.png' : element.image;
            }
        }
        var itemdivisi = itemCard.querySelector('[name="divisi-modalrequestbeli"]').value;

        var note = itemCard.querySelector('[name="note-modalrequestbeli"]').value;

        var data = {
            tglinputmili: new Date().getTime(),
            id_request: '',
            itemdivisi,
            item: itemprocselect,
            qty: parseInt(qty_reqproc),
            unit: unit_procs,
            requester: namalengkap,
            requester_id: username,
            note_req: note,
            approver: '',
            note_approver: '',
            tipeitem: document.getElementById('tipeitembeli1').checked == true ? 'Regular' : 'New Item',
            approvalorreject: '',
            tglmili_approval: 0,
            vendor: '',
            buyer: '',
            tindakbayar: '',
            tglmili_tindakbayar: 0,
            z_qty: 0,
            priceunit: 0,
            totalprice: 0,
            pendingpayment: 'false',
            bank: '',
            lokasiterima: '',
            kodecoa: '',
            penerima: '',
            terima: '',
            tglmili_terima: 0,
            history_edit: [],
            tglmili_proses_bayar: '',
            proses_bayar: '',
            user_proses_bayar: '',
            phase_tindak: 0,
            note_bayar: '',
        }
        additemreqproc.push(data);
    });
    console.log('additemreqproc==');
    console.log(additemreqproc);
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

    // update img kalau ada gambar
    console.log(imagedisplayArr[0]);

    if (imgEl && imagedisplayArr.length > 0 && imagedisplayArr[0] !== "-") {
        // hanya set src kalau bukan "-"
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
    var selectedItem = document.getElementById('namabarang-modalrequestbeli-1').value;
    // element output
    const label = document.getElementById('checkqtylabel-modalrequestbeli');

    // reset default style
    label.style.backgroundColor = "";
    label.style.color = "";
    label.textContent = "";

    if (!selectedItem) {
        console.log("Belum pilih item.");
        label.textContent = "Unavailable";
        label.style.backgroundColor = "gray";
        label.style.color = "white";
        return;
    }
    // Ambil bulan sekarang
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentYear = now.getFullYear();
    const requestData = dataarray.datarequestbeli_proc || [];
    const databaseItem = dataarray.databaseitem_proc || [];
    const matchedRequest = requestData.filter(d => d.item === selectedItem);
    const matchedItem = databaseItem.filter(d => d.item === selectedItem);
    if (matchedRequest.length === 0 || matchedItem.length === 0) {
        console.log(`Data untuk item "${selectedItem}" tidak ditemukan.`);
        label.textContent = "Unavailable";
        label.style.backgroundColor = "gray";
        label.style.color = "white";
        return;
    }
    const approvedThisMonth = matchedRequest.filter(d => {
        if (!d.tglmili_approval) return false;
        const tgl = new Date(Number(d.tglmili_approval));
        return (tgl.getMonth() + 1) === currentMonth && tgl.getFullYear() === currentYear;
    });

    if (approvedThisMonth.length === 0) {
        console.log(`Tidak ada approval bulan ini untuk item "${selectedItem}"`);
        label.textContent = "Unavailable";
        label.style.backgroundColor = "gray";
        label.style.color = "white";
        return;
    }
    // Ambil qty dari request & database
    const qtyRequest = approvedThisMonth[0].qty; // qty di request
    const qtyItem = matchedItem[0].qty; // qty di database

    // Bandingkan qty
    if (qtyRequest > qtyItem) {
        console.log(`QTY request (${qtyRequest}) lebih besar dari stok (${qtyItem}) untuk item "${selectedItem}"`);
        label.textContent = "Limit Passed";
        label.style.backgroundColor = "red";
        label.style.color = "white";
    } else {
        console.log(`QTY OK untuk item "${selectedItem}"`);
        label.textContent = "Available";
        label.style.backgroundColor = "green";
        label.style.color = "white";
    }
}

//add more item
let itemIndex_procreq = 1;
function additems_modalrequestbeli() {
    itemIndex_procreq++;
    renderItems_procreq();
    document.getElementById("judulitem-modalrequestbeli-1").classList.remove('d-none');

    document.getElementById("totalitem-modalrequestbeli").innerHTML = `${itemIndex_procreq} ITEMS`;

    console.log('itemIndex_procreq');
    console.log(itemIndex_procreq);
}

function renderItems_procreq() {
    // Buat elemen baru tanpa menghapus yang lama
    const itemsContainer = document.getElementById('itemsContainer-modalrequestbeli');
    const newItem = document.createElement('div');
    newItem.className = "partitems";
    newItem.id = `item-modalrequestbeli-${itemIndex_procreq}`;
    newItem.innerHTML = `
    <hr>
        <div id="item-modalrequestbeli-${itemIndex_procreq}" class="partitems">
            <b><p id="judulitem-modalrequestbeli-${itemIndex_procreq}">Item ${itemIndex_procreq}</p></b>
            
            <div class="row">
                <div class="col-5">
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" style="background-color: rgb(226, 221, 221);width: 120px;"><span class="text-danger">*&nbsp;</span> Nama Barang</span> 

                        <select class="form-select" id="namabarang-modalrequestbeli-${itemIndex_procreq}" name="namabarang-modalrequestbeli" onchange="selekprocitemreq(this)" style="font-size: 12px;">
                            <!-- <option selected disabled value="">Pilih item</option> -->
                            ${listitemprocawal}
                        </select>
                        <input class="d-none" name="dummynameitem-modalrequestbeli"  id="dummynameitem-modalrequestbeli-${itemIndex_procreq}">
                    </div>
                </div>
                <div class="col-7">
                    <div class="row">
                        <div class="col-5">
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Qty</span>
                                <input type="number" class="form-control" id="qty-modalrequestbeli-${itemIndex_procreq}" name="qty-modalrequestbeli" placeholder="0" style="font-size: 12px;"  oninput="oninputdata_modalrequestbeli()" min="0">
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" style="background-color: rgb(226, 221, 221);width: 120px;"><span class="text-danger">*&nbsp;</span> Divisi</span> 

                                <select class="form-select" id="divisi-modalrequestbeli-${itemIndex_procreq}" name="divisi-modalrequestbeli" onchange="oninputdata_modalrequestbeli()" style="font-size: 12px;">
                                    <!-- <option selected disabled value="">Pilih item</option> -->
                                    
                                </select>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="form-floating mt-3">
                <textarea class="form-control" placeholder="" id="note-modalrequestbeli-${itemIndex_procreq}" name="note-modalrequestbeli"></textarea>
                <label for="note-modalrequestbeli-${itemIndex_procreq}">Note</label>
            </div>
            <hr>
            <div class="d-flex align-items-center">
                <div class="d-flex align-items-center" style="flex: 1;">
                    <img src="/assets/lainnya/item-default.png" alt="" style="width: 50px; height: auto;" class="me-2" id="img-modalrequestbeli-${itemIndex_procreq}" name="img-modalrequestbeli">
                    <b id="namaitemwithimg-modalrequestbeli-${itemIndex_procreq}" name="namaitemwithimg-modalrequestbeli">Nama Item</b>
                </div>
                <div class="text-end">
                    <span><span id="qtyshow-modalrequestbeli-${itemIndex_procreq}" name="qtyshow-modalrequestbeli">0</span>&nbsp;<span id="unitshow-modalrequestbeli-${itemIndex_procreq}" name="unitshow-modalrequestbeli">UNIT</span></span>
                    
                </div>
            </div>
            
            <div class="d-flex justify-content-end">
                <button type="button" class="removeItem-modalrequestbeli btn btn-danger btn-sm" id="removeItem-modalrequestbeli-1" onclick="removeItem_modalrequestbeli('${itemIndex_procreq}')"><i class="bi bi-trash3-fill" style="color: white;"></i>&nbsp;Hapus</button>
                
            </div>
            
        </div>
    
    `;

    itemsContainer.appendChild(newItem);
}
//tutup add more

//remove item
function removeItem_modalrequestbeli(itemId) {
    document.getElementById(`item-modalrequestbeli-${itemId}`).remove();

    // Ambil ulang semua item yang tersisa
    const items = document.querySelectorAll('#itemsContainer-modalrequestbeli > .partitems');

    // Reset itemIndex agar sesuai urutan terbaru
    itemIndex_procreq = items.length;

    if (items.length == 1) {
        document.getElementById("judulitem-modalrequestbeli-1").classList.add('d-none');
    }
    //reset total item
    document.getElementById("totalitem-modalrequestbeli").innerHTML = `${itemIndex_procreq} ${itemIndex_procreq == 1 ? 'ITEM' : 'ITEMS'}`;

    items.forEach((item, index) => {
        const newId = index + 1; // Sesuaikan index baru

        // Update elemen ID
        item.id = `item-modalrequestbeli-${newId}`;
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
        const judulitem = item.querySelector(`#judulitem-modalrequestbeli-${newId}`);
        judulitem.innerHTML = `Item ${newId}`;

    });
}
//tutup remove item


//save to database
function submitsave_modalrequestbeli() {
    var array = document.querySelectorAll('#itemsContainer-modalrequestbeli > .partitems');
    var flag = 0;//0 = isian tidak lengkap
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.querySelector('[name="namabarang-modalrequestbeli"]').value == '' || element.querySelector('[name="qty-modalrequestbeli"]').value == '' || element.querySelector('[name="qty-modalrequestbeli"]').value == 0 || element.querySelector('[name="divisi-modalrequestbeli"]').value == '') {
            warningpopup('error', 'isi dengan lengkap');
        } else {
            if (i == array.length - 1) {
                flag = 1;
            }

        }
    }
    if (flag == 1) {
        hidemodal('modalrequestbeli');
        loadingpopup();
        var xhrzx = new XMLHttpRequest();

        xhrzx.open("POST", `/procurement/saveaddreqbeliproc`);
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify({ namalengkap, username, additemreqproc, alldataadditem: additemreqproc }));
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
                        creattabstatus(resdat.notif);

                        var suksesItems = [];

                        // Cek status setiap item di additemreqproc
                        additemreqproc.forEach(item => {
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
                        }
                        $("#modalpopupsuksessavereqbelis").modal('show');
                    } else {
                        creattabstatus(resdat.notif);
                        var suksesItems = [];
                        additemreqproc.forEach(item => {
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