var listdivisinewitemss;
function klikmodalreqbelis_newitem() {
    document.getElementById('namalengkap-modalrequestbelinewitem-1').value=namalengkap;
    creatlistiemprocawal();//buat list item procurement

    //reset add item
    document.querySelectorAll('#itemsContainer-modalrequestbelinewitem > .partitems').forEach((itemCard,index) => {
        if (index!=0) {
            //removeItem_modalrequestbeli(index+1)
        }
        
    });

    //ambil data divisi
     var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    document.getElementById('divisi-modalrequestbelinewitem-1').innerHTML='';//reset

    var divisiaray=[];
    for (let i = 0; i < dataarray.databaseitem_proc.length; i++) {
        const element = dataarray.databaseitem_proc[i];
        if (element.divisi!='') {
            divisiaray.push(element.divisi);
        }
    }
    // Urutkan berdasarkan property 'item' A-Z
    const uniqueSortedItems = [...new Set(divisiaray)].sort();

    console.log('divisiaray new item===');
    console.log(uniqueSortedItems);

    listdivisinewitemss=`<option value="" selected disabled >Pilih divisi</option>`+returnarraydivisinewitem(uniqueSortedItems);

    document.getElementById(`divisi-modalrequestbelinewitem-1`).innerHTML=listdivisinewitemss;
}

function returnarraydivisinewitem(array) {
    return array.map(function (element) {
        return `
        <option value="${element}">${element}</option>
        `;
    }).join('');
}


//add more item
let itemIndex_procreq_new = 1;
function additems_modalrequestbelinewitem() {
    itemIndex_procreq_new++;
    renderItems_procreq_new();
    document.getElementById("judulitem-modalrequestbelinewitem-1").classList.remove('d-none');

    document.getElementById("totalitem-modalrequestbelinewitem").innerHTML=`${itemIndex_procreq_new} ITEMS`;

    console.log('itemIndex_procreq_new');
    console.log(itemIndex_procreq_new);
}

function renderItems_procreq_new() {
    // Buat elemen baru tanpa menghapus yang lama
    const itemsContainer = document.getElementById('itemsContainer-modalrequestbelinewitem');
    const newItem = document.createElement('div');
    newItem.className = "partitems";
    newItem.id = `item-modalrequestbelinewitem-${itemIndex_procreq_new}`;
    newItem.innerHTML =`
    <hr>
        <div id="item-modalrequestbelinewitem-${itemIndex_procreq_new}" class="partitems">
            <b><p id="judulitem-modalrequestbelinewitem-${itemIndex_procreq_new}">Item ${itemIndex_procreq_new}</p></b>
            
            <div class="row">
                <div class="col-5">
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" style="background-color: rgb(226, 221, 221);width: 120px;"><span class="text-danger">*&nbsp;</span> Nama Barang</span> 

                        <input type="text" class="form-control" id="namabarang-modalrequestbelinewitem-${itemIndex_procreq_new}" name="namabarang-modalrequestbelinewitem" placeholder="Nama Barang" style="font-size: 12px;" oninput="oninputdata_modalrequestbelinewitem()">
                    </div>
                </div>
                <div class="col-7">
                    <div class="row">
                        <div class="col-5">
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Qty</span>
                                <input type="number" class="form-control" id="qty-modalrequestbelinewitem-${itemIndex_procreq_new}" name="qty-modalrequestbelinewitem" placeholder="0" style="font-size: 12px;"  oninput="oninputdata_modalrequestbelinewitem()" min="0">
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" style="background-color: rgb(226, 221, 221);width: 120px;"><span class="text-danger">*&nbsp;</span> Divisi</span> 

                                <select class="form-select" id="divisi-modalrequestbelinewitem-${itemIndex_procreq_new}" name="divisi-modalrequestbelinewitem" onchange="oninputdata_modalrequestbelinewitem()" style="font-size: 12px;">
                                    <!-- <option selected disabled value="">Pilih item</option> -->
                                    ${listdivisinewitemss}
                                </select>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="form-floating mt-3">
                <textarea class="form-control" placeholder="" id="note-modalrequestbelinewitem-${itemIndex_procreq_new}" name="note-modalrequestbelinewitem" oninput="oninputdata_modalrequestbelinewitem()"></textarea>
                <label for="note-modalrequestbelinewitem-${itemIndex_procreq_new}">Note</label>
            </div>
            <hr>

            <div class="d-flex justify-content-end">
                <button type="button" class="removeItem-modalrequestbelinewitem btn btn-danger btn-sm" id="removeItem-modalrequestbelinewitem-1" onclick="removeItem_modalrequestbelinewitem('${itemIndex_procreq_new}')"><i class="bi bi-trash3-fill" style="color: white;"></i>&nbsp;Hapus</button>
                
            </div>
            
        </div>
    
    `;

    itemsContainer.appendChild(newItem);
}
//tutup add more


//remove item
function removeItem_modalrequestbelinewitem(itemId) {
    document.getElementById(`item-modalrequestbelinewitem-${itemId}`).remove();

    // Ambil ulang semua item yang tersisa
    const items = document.querySelectorAll('#itemsContainer-modalrequestbelinewitem > .partitems');

    // Reset itemIndex agar sesuai urutan terbaru
    itemIndex_procreq_new = items.length;

    if (items.length==1) {
        document.getElementById("judulitem-modalrequestbelinewitem-1").classList.add('d-none');
    }
    //reset total item
    document.getElementById("totalitem-modalrequestbelinewitem").innerHTML=`${itemIndex_procreq_new} ${itemIndex_procreq_new==1?'ITEM':'ITEMS'}`;

    items.forEach((item, index) => {
        const newId = index + 1; // Sesuaikan index baru
    
        // Update elemen ID
        item.id = `item-modalrequestbelinewitem-${newId}`;
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
        const removeButton = item.querySelector('.removeItem-modalrequestbelinewitem');
        removeButton.setAttribute('onclick', `removeItem_modalrequestbelinewitem(${newId})`);

        //perbarui judul item judulitem
        const judulitem = item.querySelector(`#judulitem-modalrequestbelinewitem-${newId}`);
        judulitem.innerHTML=`Item ${newId}`;

    });
}
//tutup remove item


var additemreqproc_modalrequestbelinewitem=[];
function oninputdata_modalrequestbelinewitem() {
    additemreqproc_modalrequestbelinewitem.length=0;
     var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    // Hapus duplikat berdasarkan item
    const uniqueItems = Array.from(
    new Map(dataarray.databaseitem_proc.map(item => [item.item.toLowerCase(), item])).values()
    );
    // Urutkan berdasarkan property 'item' A-Z
    uniqueItems.sort((a, b) => a.item.localeCompare(b.item));

    document.querySelectorAll('#itemsContainer-modalrequestbelinewitem > .partitems').forEach((itemCard,index) => {
        var itemprocselect=itemCard.querySelector('[name="namabarang-modalrequestbelinewitem"]').value;
        console.log(itemprocselect);

        //itemCard.querySelector('[name="namaitemwithimg-modalrequestbelinewitem"]').innerHTML=itemprocselect;

        var qty_reqproc=itemCard.querySelector('[name="qty-modalrequestbelinewitem"]').value;

        //itemCard.querySelector('[name="qtyshow-modalrequestbelinewitem"]').innerHTML=qty_reqproc==''?0:qty_reqproc;

        var unit_procs='UNIT';

        
        var itemdivisi=itemCard.querySelector('[name="divisi-modalrequestbelinewitem"]').value;

        var note=itemCard.querySelector('[name="note-modalrequestbelinewitem"]').value;

        var data={
            tglinputmili:new Date().getTime(),
            id_request:'',
            itemdivisi,
            item:itemprocselect,
            qty:parseInt(qty_reqproc),
            unit:unit_procs,
            requester:namalengkap,
            requester_id:username,
            note_req:note,
            approver:'',
            note_approver:'',
            tipeitem:document.getElementById('tipeitembeli1').checked==true?'Regular':'New Item',
            approvalorreject:'',
            tglmili_approval:0,
            vendor:'',
            buyer:'',
            tindakbayar:'',
            tglmili_tindakbayar:0,
            z_qty:0,
            priceunit:0,
            totalprice:0,
            pendingpayment:'false',
            bank:'',
            lokasiterima:'',
            kodecoa:'',
            penerima:'',
            terima:'',
            tglmili_terima:0,
            history_edit:[],
            tglmili_proses_bayar:'',
            proses_bayar:'',
            user_proses_bayar:'',
            phase_tindak:0,
            note_bayar:'',
        }
        additemreqproc_modalrequestbelinewitem.push(data);
    });
    console.log('additemreqproc_modalrequestbelinewitem==');
    console.log(additemreqproc_modalrequestbelinewitem);
}

//save to database
function submitsave_modalrequestbelinewitem() {
    var array=document.querySelectorAll('#itemsContainer-modalrequestbelinewitem > .partitems');
    var flag=0;//0 = isian tidak lengkap
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.querySelector('[name="namabarang-modalrequestbelinewitem"]').value==''||element.querySelector('[name="qty-modalrequestbelinewitem"]').value==''||element.querySelector('[name="qty-modalrequestbelinewitem"]').value==0||element.querySelector('[name="divisi-modalrequestbelinewitem"]').value=='') {
            warningpopup('error','isi dengan lengkap');
        }else{
            if (i==array.length-1) {
                flag=1;
            }
            
        }
    }
    if (flag==1) {
        hidemodal('modalrequestbelinewitem');
        loadingpopup();
        var xhrzx = new XMLHttpRequest();

        xhrzx.open("POST", `/procurement/saveaddreqbeliproc`);
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify({namalengkap,username,additemreqproc:additemreqproc_modalrequestbelinewitem,alldataadditem:additemreqproc_modalrequestbelinewitem}));
        xhrzx.addEventListener("load", () => {
            var resdat = JSON.parse(xhrzx.responseText);
            console.log('resdat');
            console.log(resdat);

            var valueload=90;
            setTimeout(function () { 
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
                setTimeout(function () { 
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload;

                    if (JSON.stringify(resdat.notif).toLowerCase().includes('duplikat')||JSON.stringify(resdat.notif).toLowerCase().includes('gagal')) {
                        creattabstatus(resdat.notif);

                           
                        var suksesItems = [];

                        // Cek status setiap item di additemreqproc
                        additemreqproc_modalrequestbelinewitem.forEach(item => {
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
                            socket.emit('addreqbeli',suksesItems);
                        }

                        $("#modalpopupsuksessavereqbelis").modal('show');
                    }else{
                        creattabstatus(resdat.notif);
                        var suksesItems = [];

                        // Cek status setiap item di additemreqproc
                        additemreqproc_modalrequestbelinewitem.forEach(item => {
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
                        socket.emit('addreqbeli',suksesItems);

                        $("#modalpopupsuksessavereqbelis").modal('show');
                    }
                },800);
            },2000);
        });
    }
}