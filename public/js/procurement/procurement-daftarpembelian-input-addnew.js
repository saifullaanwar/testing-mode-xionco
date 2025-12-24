//addnewinput
async function addnewinput() {
    additemreqproc.length=0;
    try {
        
        var dataget = await getidtransaksi();

        console.log('getidtransaksi');
        console.log(dataget);

        //
        document.getElementById(`notransaksishow-modaladdnewinputitemreq-1`).value=dataget.id_transaksi.split('-')[0];//id_transaksi
        document.getElementById(`notransaksisave-modaladdnewinputitemreq-1`).value=dataget.id_transaksi;//id_transaksi

        //reset
        document.getElementById('namabarang-modaladdnewinputitemreq-1').value='';
        document.getElementById('namabarangOptions-modaladdnewinputitemreq-1').innerHTML='';
        document.getElementById('namabarang-modaladdnewinputitemreq-1').disabled=true;
        document.querySelectorAll('[name="tipeitembeli-modaladdnewinputitemreq"]').forEach(el => {
            el.checked = false;
        });
        setselekvendor();
        listbank();

        document.getElementById(`namarequester-modaladdnewinputitemreq-1`).value=namalengkap;
        ///

    } catch (error) {
        console.error('Gagal mendapatkan ID transaksi:', error);
            alert('Gagal mengambil ID transaksi.');
    }

    $('#modaladdnewinputitemreq').modal('show');
}

//tutup addnewinput


//get id transaksi
//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';
function getidtransaksi() {
    return new Promise((resolve, reject) => {
        var xhrzx = new XMLHttpRequest();
        xhrzx.open("POST", `/procurement/getidtransaksi`);
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify({hahai:'hahai'}));
        xhrzx.addEventListener("load", () => {
            var resdat = JSON.parse(xhrzx.responseText);
            console.log('id transaksi');
            console.log(resdat);
            resolve(resdat);
        });
    });
    
}
//tutup get id transaksi

//klik regular or new item
var tipeitemnya='';
function klikradioregularornewitem(tipeitems) {
    tipeitemnya=tipeitems;
    //reset
    document.getElementById('namabarang-modaladdnewinputitemreq-1').value='';
    document.getElementById('namabarangOptions-modaladdnewinputitemreq-1').innerHTML='';
    document.getElementById('namabarang-modaladdnewinputitemreq-1').disabled=false;
    //
    console.log('klikradioregularornewitem');
    console.log(tipeitems);

    //reset
    document.getElementById('divisi-modaladdnewinputitemreq-1').innerHTML='';

    document.getElementById(`hargaunitsave-modaladdnewinputitemreq-1`).value=0;
    document.getElementById(`hargaunitshow-modaladdnewinputitemreq-1`).value='Rp 0';

    document.getElementById(`totalsave-modaladdnewinputitemreq-1`).value=0;
    document.getElementById(`totalshow-modaladdnewinputitemreq-1`).value='Rp 0';
    //
    if (tipeitems=='regular') {
        creatlistiemprocawal();

        //reset ulang inputan harga
        document.getElementById(`hargaunitshow-modaladdnewinputitemreq-1`).classList.remove('d-none');

        document.getElementById(`hargaunitsave-modaladdnewinputitemreq-1`).classList.add('d-none');
        document.getElementById(`hargaunitsave-modaladdnewinputitemreq-1`).disabled=true;

        
    }else{
        creatlistdivisiprocitem('');

        //harga input manual
        document.getElementById(`hargaunitshow-modaladdnewinputitemreq-1`).classList.add('d-none');
        document.getElementById(`hargaunitsave-modaladdnewinputitemreq-1`).classList.remove('d-none');
        document.getElementById(`hargaunitsave-modaladdnewinputitemreq-1`).disabled=false;
    }
}
//tutup klik regular or new item

//buat list item procurement
var listitemprocawal;
function creatlistiemprocawal() {
      var dataarray = window.dataall; 
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log(dataarray.databaseitem_proc);
    var datas=dataarray.databaseitem_proc;

    // Hapus duplikat berdasarkan item
    const uniqueItems = Array.from(
    new Map(datas.map(item => [item.item.toLowerCase(), item])).values()
    );
    // Urutkan berdasarkan property 'item' A-Z
    uniqueItems.sort((a, b) => a.item.localeCompare(b.item));


    listitemprocawal=returarrayitemproc(uniqueItems);
    document.getElementById('namabarangOptions-modaladdnewinputitemreq-1').innerHTML=listitemprocawal;

}

function returarrayitemproc(array) {
    return array.map(function (element) {
        return `
            <option value="${element.item}">
        `;
    }).join('');
}
////

//create divisi
function creatlistdivisiprocitem(item) {
      var dataarray = window.dataall.databaseitem_proc; 
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).databaseitem_proc;//data item procurement
    document.getElementById('divisi-modaladdnewinputitemreq-1').innerHTML='';//reset

    var divisiaray=[];
    for (let i = 0; i < dataarray.length; i++) {
        const element = dataarray[i];
        if (tipeitemnya=='regular') {
            if (item==element.item) {
                divisiaray.push(element.divisi)
            }
        }else{
            if (element.divisi!='') {
                divisiaray.push(element.divisi);
            }
        }

        
    }
    // Urutkan berdasarkan property 'item' A-Z
    const uniqueSortedItems = [...new Set(divisiaray)].sort();

    console.log('divisiaray===');
    console.log(uniqueSortedItems);

    document.getElementById(`divisi-modaladdnewinputitemreq-1`).innerHTML=`<option value="" selected disabled >Pilih divisi</option>`+returnarraydivisiprocitem(uniqueSortedItems);
}

function returnarraydivisiprocitem(array) {
    return array.map(function (element) {
        return `
        <option value="${element}">${element}</option>
        `;
    }).join('');
}
///

//set select vendor
function setselekvendor() {
    document.getElementById('vendor-datalistOptions').innerHTML='';//add item pop-up
    document.getElementById('vendor-modaldetailinputedit-datalistOptions').innerHTML='';//edit item pop-up
     var dataarray = window.dataall.databaseitem_proc; 
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).databaseitem_proc;//data item procurement
    const vendorSet = new Set(dataarray.map(item => item.vendor));
    const vendorArray = Array.from(vendorSet);

    vendorArray.sort();
    console.log('vendorArray');
    console.log(vendorArray);

    var setvendor=returnarrayvendor(vendorArray);
    document.getElementById('vendor-datalistOptions').innerHTML=setvendor;
    document.getElementById('vendor-modaldetailinputedit-datalistOptions').innerHTML=setvendor;
}
function returnarrayvendor(array) {

    return array.map(function(element,index){
        return `
            <option value="${element}">
        
        `;
    }).join('');
}
//tutup set select vendor


//list bank
function listbank() {
     var dataarray = window.dataall.databasebank; 
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).databasebank;//data bank
    document.getElementById('bank-modaladdnewinputitemreq-1').innerHTML= '';//add item pop-up

    document.getElementById('bank-modaldetailinputedit-1').innerHTML= '';//edit item pop-up

    var listbanks='<option selected disabled value="">Pilih Bank</option>'+returnarraylistbank(dataarray);

    document.getElementById('bank-modaladdnewinputitemreq-1').innerHTML= listbanks;

    document.getElementById('bank-modaldetailinputedit-1').innerHTML= listbanks;
}

function returnarraylistbank(array) {
    return array.map(function(element,index){
        return `
            <option>${element.namabank}</option>
        
        `;
    }).join('');
}
//tutup list bank

//oninputdata_modaladdnewinputitemreq
var additemreqproc=[];
function oninputdata_modaladdnewinputitemreq() {
    additemreqproc.length=0;
     var dataarray = window.dataall; 
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    var tglmilis=new Date().getTime();

    var id_request=document.getElementById('notransaksisave-modaladdnewinputitemreq-1').value;

    //set coa
    var dataitemproc=dataarray.databaseitem_proc;//data item procurement

    var item=document.getElementById('namabarang-modaladdnewinputitemreq-1').value;

    var itemdivisi=document.getElementById('divisi-modaladdnewinputitemreq-1').value;

    if (itemdivisi=='') {
        creatlistdivisiprocitem(item);
    }
    
    //set harga/unit
    // Cari data yang cocok berdasarkan item dan divisi
    let matchedItem = dataitemproc.find(entry =>
    entry.item === item && entry.divisi === itemdivisi
    );

    var priceunit=0;
    priceunit=document.getElementById(`hargaunitsave-modaladdnewinputitemreq-1`).value;
    priceunit=parseInt(priceunit);
    var kodecoa='';
    var qty=document.getElementById(`qty-modaladdnewinputitemreq-1`).value;
    var unit='UNIT';
    var note_approver=document.getElementById('noteprocurement-modaladdnewinputitemreq-1').value;
    var vendor=document.getElementById('vendor-modaladdnewinputitemreq-1').value;

    var z_qty=document.getElementById('zqty-modaladdnewinputitemreq-1').value==0||document.getElementById('zqty-modaladdnewinputitemreq-1').value==''?0:document.getElementById('zqty-modaladdnewinputitemreq-1').value;

    
    // Jika ditemukan, 
    if (matchedItem) {
        priceunit = matchedItem.price;
        kodecoa=matchedItem.coa;
        unit=matchedItem.unit;

        document.getElementById(`coa-modaladdnewinputitemreq-1`).value=matchedItem.coa;

        document.getElementById(`ketcoa-modaladdnewinputitemreq-1`).value=ambilketcoa(matchedItem.coa);

        document.getElementById(`hargaunitshow-modaladdnewinputitemreq-1`).value=`Rp ${formatMoney(matchedItem.price)}`;

        document.getElementById(`hargaunitsave-modaladdnewinputitemreq-1`).value=matchedItem.price;
    } 
    //tutup set coa

    var totalprice=z_qty==0||z_qty==''?qty*priceunit:z_qty*priceunit;

    document.getElementById('totalshow-modaladdnewinputitemreq-1').value=`Rp ${formatMoney(totalprice)}`;

    document.getElementById('totalsave-modaladdnewinputitemreq-1').value=totalprice;

    var bank=document.getElementById('bank-modaladdnewinputitemreq-1').value;
    var lokasiterima=document.getElementById('lokasiterima-modaladdnewinputitemreq-1').value;

    var pendingpayment='false';
    if (document.getElementById('onoffpendingpayment').checked==true) {
        pendingpayment='true';
    }

    //data send
    var data={
        tglinputmili:tglmilis,
        id_request,
        itemdivisi,
        item,
        qty:parseInt(qty),
        unit,
        requester:namalengkap,
        requester_id:username,
        note_req:'',
        approver:namalengkap,
        note_approver,
        tipeitem:document.getElementById('tipeitembeli1-modaladdnewinputitemreq').checked==true?'Regular':'New Item',
        approvalorreject:'true',
        tglmili_approval:tglmilis,
        vendor,
        buyer:'',
        tindakbayar:'',
        tglmili_tindakbayar:0,
        z_qty,
        priceunit,
        totalprice,
        pendingpayment,
        bank,
        lokasiterima,
        kodecoa:`${kodecoa}`,
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
    additemreqproc.push(data);

    console.log('additemreqproc====');
    console.log(additemreqproc);
    //tutup data send
}

//tutup oninputdata_modaladdnewinputitemreq

//keterangan coa
function ambilketcoa(coa) {
     var dataarray = window.dataall.database_coa; 
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).database_coa;//data coa

    for (let i = 0; i < dataarray.length; i++) {
        const element = dataarray[i];
        if (element.kode==coa) {
            //document.getElementById(`ketcoa-modaladdnewinputitemreq-1`).value=element.keterangan;
            return element.keterangan;
        }
    }

}
//tutup keterangan coa

//submit approve
function approveorreject_modaladdnewinputitemreq() {
    const divisi = document.getElementById('divisi-modaladdnewinputitemreq-1');
    const qty = document.getElementById('qty-modaladdnewinputitemreq-1');
    const hargaUnit = document.getElementById('hargaunitsave-modaladdnewinputitemreq-1');
    const vendor = document.getElementById('vendor-modaladdnewinputitemreq-1');
    const bank = document.getElementById('bank-modaladdnewinputitemreq-1');
    const lokasi = document.getElementById('lokasiterima-modaladdnewinputitemreq-1');
    loadingpopup();

    let firstInvalid = null;

    // Reset semua error dulu
    [hargaUnit, vendor, bank, lokasi].forEach(el => el.classList.remove('is-invalid'));

    // Cek satu per satu
    if (divisi.value === '') {
        divisi.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = divisi;
    }
    if (qty.value === '' || qty.value == 0) {
        qty.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = qty;
    }
    if (hargaUnit.value === '' || hargaUnit.value == 0) {
        hargaUnit.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = hargaUnit;
    }
    if (vendor.value === '') {
        vendor.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = vendor;
    }
    if (bank.value === '') {
        bank.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = bank;
    }
    if (lokasi.value === '') {
        lokasi.classList.add('is-invalid');
        if (!firstInvalid) firstInvalid = lokasi;
    }

    // Jika ada yang kosong
    if (firstInvalid) {
        firstInvalid.focus(); // Fokus ke input pertama yang kosong
            warningpopup('error', 'Isi dengan lengkap');
    } else {
        fixsend();
    }
    
}

function fixsend() {
    fetch('/procurement/saveaddreqbeliproc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify({additemreqproc})
    })
    .then(response => response.json())
    .then(resdat => {
        console.log('resdat');
        console.log(resdat);

        var notif=resdat.notif;
        console.log('notif');
        console.log(notif);

        var valueload=90;
        setTimeout(function () { 
            Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
            setTimeout(function () { 
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload;

                if (notif[0].statussave=='sukses') {
                    warningpopup('success','sukses add');
                    
                    
                    //socket.emit('approvereqbeli',additemreqproc);
                    location.reload();
                }else{
                    warningpopup('error','gagal add');
                    
                }
                
            },800);
        },2000);
    })
    .catch(error => {
        console.error('Error:', error);
        warningpopup('error','error catch : '+error);
    });
}
//tutup submit approve