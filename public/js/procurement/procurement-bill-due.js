var username;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');
var gethumburger;
//console.log=function(){};

var ismobile = 'n';
document.addEventListener('DOMContentLoaded', async function () {

    cekdatausersorout();

    //fix modal error
    document.addEventListener('hide.bs.modal', function (event) {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    });
    ///
    const usercek = await dbs.isLoggedIn();
    //localStorage.getItem('username') && localStorage.getItem('username') != ''
    console.log('usercek', usercek);
    if (usercek) {
        username = usercek;//localStorage.getItem('username'); 

        namalengkap = JSON.parse(await dbs.get('datauser')).namalengkap;
        document.getElementById('namalengkap').innerHTML = namalengkap;
    }
    else {
        window.location.href = '/';
    }

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        ismobile = 'y';
    }

    gethumburger = JSON.parse(getCookie('hamburger'));
    scrolltobuttonsidebar();
    fetchdata()
});


function fetchdata() {
    fetch('/api/daftarpembelian/request')
        .then(res => res.json())
        .then(data => {
            window.dataall = data;
            console.log('datalls =================23=', window.dataall);

            const today = new Date();
            const todayDay = today.getDate();
            const todayMonth = today.getMonth() + 1;

            // Data asli
            const dataAsli = data.database_bill_due;

            // 🟢 Filter: Data Hari Ini & Seterusnya (termasuk EveryMonth)
            const dataHariIniDanSeterusnya = dataAsli.filter(d => {
                const dMonth = Number(d.month);
                const dDay = Number(d.day);

                // Jika month kosong → anggap sebagai EveryMonth
                const isEveryMonth = !dMonth || dMonth === 0;

                return (
                    isEveryMonth || // tampil di semua bulan
                    dMonth > todayMonth ||
                    (dMonth === todayMonth && dDay >= todayDay)
                );
            });

            // 🧩 panggil fungsi tampil tabel
            showtabelsebelumnya(dataAsli);
            showtabelhariini(dataHariIniDanSeterusnya);
            toggleFilter('today');
            createlist()



        })
        .catch(err => {
            console.error('Gagal ambil dataall:', err);
        });
}

function klikopenaddnew(prosedur) {
    if (prosedur == 'bill-due') {
        $('#modaladdnewitem').modal('show');
    }
}

///////////

function loadingbawahupdate(array) {
    $progressBar.css('width', '0%');
    $progress.show();
    setTimeout(function () {
        $progressBar.css('width', '65%');
        setTimeout(function () {
            $progressBar.css('width', '85%');
            setTimeout(function () {
                $progressBar.css('width', '97%');
                setTimeout(function () {
                    // showtabel(array);
                    $progress.hide();

                }, 500);
            }, 2000);
        }, 2000);
    }, 1000);
}


////////////////////////////////////////////////
///////////// socket io //////////////////
// const socket = io();
socket.on('newadditemadminlist', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('datas ====');
    console.log(datas);

    //var fixarrays=dataarray.dataadminlist;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dataarray.dataadminlist.unshift(element);


    }
    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    console.log('dataarray.dataadminlist ====');
    console.log(dataarray.dataadminlist);
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('neweditfullitemadminlist', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('edit item [1]');
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        //var indexarray= dataarray.dataadminlist.indexOf(element);
        if (datas[0].id_transaksi == element.id_transaksi) {
            console.log('edit item [2]');
            var historiold = JSON.parse(element.history);

            var historiesnew = [...datas[0].history, ...historiold];

            dataarray.dataadminlist[i].order_date = datas[0].order_date;
            dataarray.dataadminlist[i].orderdate_mili = datas[0].orderdate_mili;

            dataarray.dataadminlist[i].delivered_date = datas[0].delivered_date;

            dataarray.dataadminlist[i].delivereddate_mili = datas[0].delivereddate_mili;

            dataarray.dataadminlist[i].platform = datas[0].platform;

            dataarray.dataadminlist[i].finalprice = datas[0].finalprice;

            dataarray.dataadminlist[i].diskon_persen = datas[0].diskon_persen;

            dataarray.dataadminlist[i].diskon_amount = datas[0].diskon_amount;

            dataarray.dataadminlist[i].notes = datas[0].notes;

            dataarray.dataadminlist[i].buyername = datas[0].buyername;

            dataarray.dataadminlist[i].phonenumber = datas[0].phonenumber;

            dataarray.dataadminlist[i].address = datas[0].address;

            dataarray.dataadminlist[i].deliveryunit = datas[0].deliveryunit;

            dataarray.dataadminlist[i].extracharge = datas[0].extracharge;

            dataarray.dataadminlist[i].history = JSON.stringify(historiesnew);



            console.log(dataarray.dataadminlist);
        }
    }
    document.getElementById('itemalls').textContent = JSON.stringify(dataarray);

    document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);

    console.log('edit item [3]');
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newquickedititemadminlist', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].order_date = datas.order_date;
            dataarray.dataadminlist[i].orderdate_mili = datas.orderdate_mili;
            dataarray.dataadminlist[i].delivered_date = datas.delivered_date;
            dataarray.dataadminlist[i].item = datas.item;
            dataarray.dataadminlist[i].qty = datas.qty;
            dataarray.dataadminlist[i].finalprice = datas.finalprice;
            dataarray.dataadminlist[i].price = datas.price;
            dataarray.dataadminlist[i].diskon_persen = datas.diskon_persen;
            dataarray.dataadminlist[i].diskon_amount = datas.diskon_amount;
            dataarray.dataadminlist[i].status = datas.status;
            dataarray.dataadminlist[i].code2 = datas.code2;
            dataarray.dataadminlist[i].notes = datas.notes;
            dataarray.dataadminlist[i].colorvariant = datas.colorvariant;
            dataarray.dataadminlist[i].history = datas.history;
            dataarray.dataadminlist[i].extracharge = datas.extracharge;

            document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newquickedititemadminlist');
        }

    }

    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('neweditforcestatus', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;
            dataarray.dataadminlist[i].confirmroute = datas.confirmroute;
            dataarray.dataadminlist[i].forcedsent = datas.forcedsent;
            dataarray.dataadminlist[i].forcedcancel = datas.forcedcancel;
            dataarray.dataadminlist[i].reschedule = datas.reschedule;
            dataarray.dataadminlist[i].delayproduksi = datas.delayproduksi;
            dataarray.dataadminlist[i].toppriority = datas.toppriority;
            dataarray.dataadminlist[i].pending = datas.pending;
            dataarray.dataadminlist[i].history = datas.history;


            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('neweditforcestatusnew', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    datas.tglinputmili.toString();
    console.log('data masuk status force');
    console.log(datas);

    var flag = 0;//0 belum ada input id transaksi, 1 = sudah ada
    for (let i = 0; i < dataarray.forcestatusrequest.length; i++) {
        const element = dataarray.forcestatusrequest[i];
        if (element.id_transaksi == datas.id_transaksi) {
            dataarray.forcestatusrequest[i].status = datas.status;
            dataarray.forcestatusrequest[i].forcedsent = datas.forcedsent;
            dataarray.forcestatusrequest[i].forcedcancel = datas.forcedcancel;
            dataarray.forcestatusrequest[i].reschedule = datas.reschedule;
            dataarray.forcestatusrequest[i].delayproduksi = datas.delayproduksi;
            dataarray.forcestatusrequest[i].toppriority = datas.toppriority;
            dataarray.forcestatusrequest[i].pending = datas.pending;
            dataarray.forcestatusrequest[i].stockprodukcode = datas.stockprodukcode;
            dataarray.forcestatusrequest[i].stockuses = datas.stockuses;
            dataarray.forcestatusrequest[i].history = JSON.stringify(datas.history);
            dataarray.forcestatusrequest[i].tglinputmili = datas.tglinputmili;
            dataarray.forcestatusrequest[i].namalengkap = datas.namalengkap;
            dataarray.forcestatusrequest[i].username = datas.username;
            dataarray.forcestatusrequest[i].approval_forcestatus = datas.approval_forcestatus;

            flag = 1;
        }

    }

    if (flag == 0) {
        dataarray.forcestatusrequest.push(datas);
    }

    //

    console.log('data baru status force');
    console.log(dataarray.forcestatusrequest);

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newklikprinpodo', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        for (let j = 0; j < dataarray.dataadminlist.length; j++) {
            const element2 = dataarray.dataadminlist[j];
            if (element2.id_transaksi == element.id_transaksi) {
                dataarray.dataadminlist[j].klik_print_podo = 'true';
            }
        }

    }
    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newprintpodo', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;

            dataarray.dataadminlist[i].history = datas.history;

            dataarray.dataadminlist[i].print_podo = 'true';

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newpackde-kirimbahan', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_kirimbahan = 'true';
            dataarray.dataadminlist[i].packde_kirimbahan_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newupholsteryselesai', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].upholstery_jadi = 'true';
            dataarray.dataadminlist[i].upholstery_img = datas.filenamesupload;

            dataarray.dataadminlist[i].history = datas.history;


            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newapprovalproduk', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;

            dataarray.dataadminlist[i].history = datas.history;

            dataarray.dataadminlist[i].approval_produkjadi = 'true';

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newpackdereject-ambil', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = 'Proses Produksi (Re)';

            dataarray.dataadminlist[i].upholstery_jadi = '';
            dataarray.dataadminlist[i].approval_produkjadi = '';
            dataarray.dataadminlist[i].reject_ambil_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newpackdereject-qc', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = 'Proses Produksi (Re)';

            dataarray.dataadminlist[i].upholstery_jadi = '';
            dataarray.dataadminlist[i].approval_produkjadi = '';
            dataarray.dataadminlist[i].packde_ambil = '';
            dataarray.dataadminlist[i].reject_qc_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newpackde-ambil', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_ambil = 'true';
            dataarray.dataadminlist[i].packde_ambil_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newpackde-qc', function (datas) {

    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_qc = 'true';
            dataarray.dataadminlist[i].packde_qc_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);

});

socket.on('newdriverreject-ambil', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = 'Proses Produksi (Re)';

            dataarray.dataadminlist[i].upholstery_jadi = '';
            dataarray.dataadminlist[i].approval_produkjadi = '';
            dataarray.dataadminlist[i].packde_ambil = '';
            dataarray.dataadminlist[i].packde_qc = '';
            dataarray.dataadminlist[i].reject_qc_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('newdriverreject-terimakonsumen', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = 'Proses Produksi (Re)';

            dataarray.dataadminlist[i].upholstery_jadi = '';
            dataarray.dataadminlist[i].approval_produkjadi = '';
            dataarray.dataadminlist[i].packde_ambil = '';
            dataarray.dataadminlist[i].packde_qc = '';
            dataarray.dataadminlist[i].pickup_driver = '';
            dataarray.dataadminlist[i].reject_qc_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('neweaddreqbeli', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    dataarray.datarequestbeli_proc.push(...datas);

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.database_bill_due);
});

socket.on('neweapprovereqbeli', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    for (let i = 0; i < dataarray.datarequestbeli_proc.length; i++) {
        const element = dataarray.datarequestbeli_proc[i];

        if (element.no == datas.no) {
            dataarray.datarequestbeli_proc[i].id_request = datas.approvalorreject == 'true' ? datas.id_request : '';
            dataarray.datarequestbeli_proc[i].approver = datas.approver;
            dataarray.datarequestbeli_proc[i].note_approver = datas.note_approver;
            dataarray.datarequestbeli_proc[i].approvalorreject = datas.approvalorreject;
            dataarray.datarequestbeli_proc[i].tglmili_approval = datas.tglmili_approval;
            dataarray.datarequestbeli_proc[i].vendor = datas.vendor;
            dataarray.datarequestbeli_proc[i].z_qty = datas.z_qty;
            dataarray.datarequestbeli_proc[i].priceunit = datas.priceunit;
            dataarray.datarequestbeli_proc[i].totalprice = datas.totalprice;
            dataarray.datarequestbeli_proc[i].pendingpayment = datas.pendingpayment;
            dataarray.datarequestbeli_proc[i].bank = datas.bank;
            dataarray.datarequestbeli_proc[i].lokasiterima = datas.lokasiterima;
            dataarray.datarequestbeli_proc[i].kodecoa = datas.kodecoa;

            window.dataall = dataarray;  // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.database_bill_due);

});
//tutup socket io


///add more item
let itemIndex = 1;
function additems() {
    itemIndex++;
    renderItems();          // bikin item baru
    createlist(itemIndex);  // isi datalist untuk item tsb

    console.log("itemIndex", itemIndex);
}

//untuk render item input baru
function renderItems() {
    const itemsContainer = document.getElementById("itemsContainer");
    const newItem = document.createElement("div");
    newItem.className = "partitems";
    newItem.id = `item-${itemIndex}`;

    newItem.innerHTML = `
    <hr>
    <b><p id="judulitem-${itemIndex}">Item Procurement ${itemIndex}</p></b>
        <div class="col">
              <div class="row">
                <!-- Left Column -->
                <div class="col-md-6">
                  <!-- Item -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Item
                    </span>
                    <input type="text" class="form-control" id="item-${itemIndex}" name="item" placeholder="Item"
                      style="font-size: 12px" oninput="oninputdata()" />
                  </div>

                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Office
                    </span>
                    <input class="form-control" list="listoffice-${itemIndex}" id="office" name="office"
                      placeholder="Pilih Kategori" style="font-size: 12px" oninput="oninputdata()">
                    <datalist id="listoffice-${itemIndex}">
                    </datalist>
                  </div>

                  <!-- Price -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Nominal
                    </span>
                    <input type="number" class="form-control" id="nominal-${itemIndex}" name="nominal" placeholder="Nominal"
                      style="font-size: 12px" oninput="oninputdata()" />
                  </div>

                  <!-- Customer Name -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Customer Name
                    </span>
                    <input type="text" class="form-control" id="customer-name-${itemIndex}" name="customer-name"
                      placeholder="Customer Name" style="font-size: 12px" oninput="oninputdata()" />
                  </div>

                </div>

                <!-- Right Column -->
                <div class="col-md-6">
                  <!-- Quantity -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Hari
                    </span>
                    <select class="form-control" id="hari-${itemIndex}" name="hari" style="font-size: 12px" oninput="oninputdata()">
                      <option value="" disabled selected>Select Day</option>
                      <!-- Day options from 1 to 31 -->
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>
                  </div>
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Bulan
                    </span>
                    <select class="form-control" id="bulan-${itemIndex}" name="bulan" style="font-size: 12px"
                      oninput="oninputdata()">
                      <option value="" disabled selected>Select Month</option>
                      <!-- Month options from January to December -->
                     <option value="">Setiap Bulan</option>
                      <option value="1">Januari</option>
                      <option value="2">Februari</option>
                      <option value="3">Maret</option>
                      <option value="4">April</option>
                      <option value="5">Mei</option>
                      <option value="6">Juni</option>
                      <option value="7">Juli</option>
                      <option value="8">Agustus</option>
                      <option value="9">September</option>
                      <option value="10">Oktober</option>
                      <option value="11">November</option>
                      <option value="12">Desember</option>
                    </select>
                  </div>

                  <!-- Number Code -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Number Code
                    </span>
                    <input type="number" class="form-control" id="number-code-${itemIndex}" name="number-code"
                      placeholder="Number Code" style="font-size: 12px" oninput="oninputdata()" />
                  </div>

                   <!-- Coa Code -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> KodeCoa
                    </span>
                    <input type="number" class="form-control" id="coa-code-${itemIndex}" name="coa-code"
                      placeholder="Kode Coa" list="listcoa-${itemIndex}"  style="font-size: 12px" oninput="oninputdata()" />
                    <datalist id="listcoa-${itemIndex}">
                    </datalist>
                  </div>
                </div>
              </div>

            </div>
    <div class="d-flex justify-content-end">
      <button type="button" class="removeItem btn btn-danger btn-sm" id="removeItem-${itemIndex}" onclick="removeItem(${itemIndex})"><i class="bi bi-trash3-fill" style="color: white;"></i>&nbsp;Hapus item</button>
    </div>
  `;

    itemsContainer.appendChild(newItem);
}

function removeItem(itemId) {
    const itemElement = document.getElementById(`item-${itemId}`);
    if (!itemElement) {
        console.warn(`Item with ID item-${itemId} not found.`);
        return;
    }
    itemElement.remove();

    // Ambil ulang semua item yang tersisa
    const items = document.querySelectorAll("#itemsContainer > .partitems");

    // Reset itemIndex agar sesuai urutan terbaru
    itemIndex = items.length;

    items.forEach((item, index) => {
        const newId = index + 1; // Sesuaikan index baru

        // Update elemen ID
        item.id = `item-${newId}`;
        // Perbarui ID dan "for" label semua input dalam item
        const elementsToUpdate = item.querySelectorAll(
            "input, select, span, p, button"
        );
        elementsToUpdate.forEach((el) => {
            if (el.id) {
                const newElId = el.id.replace(/\d+$/, newId); // Ganti angka di ID dengan newId
                el.id = newElId;
            }
            if (el.htmlFor) {
                el.htmlFor = el.htmlFor.replace(/\d+$/, newId); // Ganti angka di ID dengan newId
            }
        });

        // Perbarui tombol hapus dengan parameter ID baru
        const removeButton = item.querySelector(".removeItem");
        if (removeButton) {
            removeButton.setAttribute("onclick", `removeItem(${newId})`);
        }

        //perbarui judul item judulitem
        const judulItem = item.querySelector(`#judulitem-${newId}`);
        if (judulItem) {
            judulItem.id = `judulitem-${newId}`;
            judulItem.innerHTML = `Delivery ${newId}`;
        }
    });
}
////tutup add more product

///on input
var alldataadditem = []; // Array to store item data
var addoredit = "add"; // Placeholder for the add or edit mode
function oninputdata() {
    alldataadditem.length = 0; // Clear array

    const bulanMap = [
        "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    document.querySelectorAll("#itemsContainer > .partitems").forEach((itemCard, index) => {
        let item = itemCard.querySelector('[name="item"]').value?.trim() || "";
        let office = itemCard.querySelector('[name="office"]').value?.trim() || "";
        let nominal = itemCard.querySelector('[name="nominal"]').value?.trim() || "";
        let customer_name = itemCard.querySelector('[name="customer-name"]').value?.trim() || "";
        let hari = itemCard.querySelector('[name="hari"]').value?.trim() || "";
        let bulanVal = itemCard.querySelector('[name="bulan"]').value?.trim() || ""; // angka dari <select>
        let number_code = itemCard.querySelector('[name="number-code"]').value?.trim() || "";
        let kodecoa = itemCard.querySelector('[name="coa-code"]').value?.trim() || "";

        if (!item || !office || !nominal || !customer_name || !hari || !number_code) {
            console.log("Skipping item due to missing fields");
            return;
        }

        let month = 0;
        let month_name = "";
        if (bulanVal) {
            month = parseInt(bulanVal, 10);    // angka (1–12)
            month_name = bulanMap[month];      // nama bulan
        }

        let data = {};
        // Structure the data based on whether it's "add" or "edit"
        if (addoredit === "add") {
            data = {
                item,
                office,
                nominal,
                customer_name,
                day: hari,
                month,
                month_name,
                number_code,
                kodecoa,
                tglinputmili: Math.floor(Date.now())
            };
        } else if (addoredit === "edit") {
            data = {
                item,
                office,
                nominal,
                customer_name,
                day: hari,
                month,
                month_name,
                number_code,
                kodecoa,
                tglinputmili: Math.floor(Date.now())
            };
        }

        alldataadditem.push(data);
    });

    console.log("🔥 alldataadditem:", alldataadditem);
}

//show tabel
function showtabelsebelumnya(array) {
    if (gethumburger.tipeuser.toLowerCase() == 'supervisor' || gethumburger.tipeuser.toLowerCase() == 'procurement') {
        document.getElementById('tabel-approvalsproc').classList.remove('d-none');
    }
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

    console.log('array ========');
    console.log(array);

    divhapus.innerHTML = returnarray(array, 'awal');

    datatab.appendChild(divhapus);


    setTimeout(function () {
        /* if (gethumburger.tipeuser.toLowerCase()=='supervisor') {
            hitungtugassaya();
        } */
        hitungtugassaya_universal();
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style', 'display:none;');

    }, 500);
}

//show tabel
function showtabelhariini(array) {
    if (gethumburger.tipeuser.toLowerCase() == 'supervisor' || gethumburger.tipeuser.toLowerCase() == 'procurement') {
        document.getElementById('tabel-approvalsproc').classList.remove('d-none');
    }
    var myobj = document.getElementById("divhpsdataHariIni");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattabHariIni`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdataHariIni');

    console.log('array ========');
    console.log(array);

    divhapus.innerHTML = returnarray(array);

    datatab.appendChild(divhapus);


    setTimeout(function () {
        /* if (gethumburger.tipeuser.toLowerCase()=='supervisor') {
            hitungtugassaya();
        } */
        hitungtugassaya_universal();
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style', 'display:none;');

    }, 500);
}

// Fungsi bantu untuk format angka ke rupiah
function formatRupiah(angka) {
    if (typeof angka === "string") angka = parseFloat(angka);
    return angka.toLocaleString("id-ID");
}

var ceklengloadmore;
let sortedDataGlobal = [];
let currentIndex = 0;
const itemsPerLoad = 50;


// ==========================
// 🔍 FILTER UTAMA
// ==========================
let currentFilter = null;
function toggleFilter(mode) {
    // ambil semua tombol filter
    const buttons = {
        today: document.getElementById('btnToday'),
        upcoming: document.getElementById('btnUpcoming'),
        // previous: document.getElementById('btnPrevious'),
    };
    // set filter baru
    currentFilter = mode;

    // ubah warna aktif sesuai tombol
    Object.entries(buttons).forEach(([key, btn]) => {
        if (key === mode) btn.classList.add('active-filter');
        else btn.classList.remove('active-filter');
    });

    // jalankan filter sesuai mode
    cekFilterDataHariini('pencarian', mode);
}
function cekFilterDataHariini(prosedur = 'awal', mode = 'today') {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const dataAsli = window.dataall.database_bill_due || [];
    let filtered = [];

    console.log("dataAsli==========", dataAsli);

    if (mode === 'today') {
        filtered = dataAsli.filter(item => {
            const itemMonth = Number(item.month) || 0;
            const itemDay = Number(item.day) || 0;
            if (itemMonth === todayMonth && itemDay === todayDay) return true;
            if (itemMonth === 0 && itemDay === todayDay) return true;

            return false;
        });
        filtered.sort((a, b) => new Date(+b.tglinputmili) - new Date(+a.tglinputmili));
    }

    else if (mode === 'upcoming') {
        filtered = dataAsli.filter(item => {
            const itemMonthRaw = item.month;
            const itemMonth = itemMonthRaw === undefined || itemMonthRaw === null || itemMonthRaw === ""
                ? 0 : Number(itemMonthRaw);
            const itemDay = Number(item.day) || 0;

            // buang data yang tidak punya day valid
            if (!itemDay || itemDay <= 0) return false;

            // every-month: hanya jika day > todayDay (mulai dari hari selanjutnya)
            if (itemMonth === 0) {
                return itemDay > todayDay;
            }

            // jika punya month spesifik:
            // - jika bulan sama: hanya jika day > todayDay
            // - jika bulan setelah bulan sekarang: ambil semua
            // - jika bulan sebelum bulan sekarang: buang (akan dianggap sudah lewat)
            if (itemMonth === todayMonth && itemDay > todayDay) return true;
            if (itemMonth > todayMonth) return true;
            return false;
        });

        // Sort supaya urutan dimulai dari tanggal terdekat ke yang jauh:
        // treat every-month items as if they are in current month (so they appear first if day > todayDay)
        filtered.sort((a, b) => {
            const aMonthRaw = a.month;
            const bMonthRaw = b.month;
            const aMonth = (aMonthRaw === undefined || aMonthRaw === null || aMonthRaw === "") ? 0 : Number(aMonthRaw);
            const bMonth = (bMonthRaw === undefined || bMonthRaw === null || bMonthRaw === "") ? 0 : Number(bMonthRaw);
            const aDay = Number(a.day) || 0;
            const bDay = Number(b.day) || 0;

            const aSortMonth = aMonth === 0 ? todayMonth : aMonth;
            const bSortMonth = bMonth === 0 ? todayMonth : bMonth;

            if (aSortMonth === bSortMonth) return aDay - bDay;
            return aSortMonth - bSortMonth;
        });
    }

    // 🧮 Pagination logic (tetap sama)
    let fixarraawal = [];
    if (prosedur === 'awal' || prosedur === 'pencarian') {
        sortedDataGlobal = filtered;
        currentIndex = 0;
        const maxleng = Math.min(itemsPerLoad, sortedDataGlobal.length);
        fixarraawal = sortedDataGlobal.slice(0, maxleng);
        currentIndex += maxleng;
    } else if (prosedur === 'loadmore') {
        const nextData = sortedDataGlobal.slice(currentIndex, currentIndex + itemsPerLoad);
        currentIndex += itemsPerLoad;
        fixarraawal = nextData;
    }

    // 🎯 UI update
    const notFound = fixarraawal.length === 0;
    document.getElementById('datatidakditemukanHariIni').style.display = notFound ? 'block' : 'none';

    // 🎨 Render hasil
    const html = returnarray(fixarraawal);
    document.getElementById('divhpsdataHariIni').innerHTML =
        prosedur === 'loadmore'
            ? document.getElementById('divhpsdataHariIni').innerHTML + html
            : html;
}


function cekFilterDataSebelumnya(prosedur = 'awal') {
    console.log('sortedDataGlobal=====================================================mm', sortedDataGlobal);

    if (prosedur !== 'loadmore') {
        sortedDataGlobal = [];
        currentIndex = 0;
    }
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const dataAsli = window.dataall.database_bill_due;

    // 📅 Filter data sebelumnya (tanpa EveryMonth)
    // let filtered = dataAsli.filter(d => {
    //     const dMonth = Number(d.month);
    //     const dDay = Number(d.day);
    //     const isEveryMonth = !dMonth || dMonth === 0;

    //     // Skip data EveryMonth
    //     if (isEveryMonth) return false;

    //     return (
    //         dMonth < todayMonth ||
    //         (dMonth === todayMonth && dDay < todayDay)
    //     );
    // });
    var filtered = dataAsli;

    // 📅 Filter tanggal manual (opsional)
    const dateValue = document.getElementById('dateFilter').value;
    if (dateValue) {
        const inputDate = new Date(dateValue);
        inputDate.setHours(0, 0, 0, 0);
        filtered = filtered.filter(item => {
            const itemDate = new Date(+item.tglinputmili);
            itemDate.setHours(0, 0, 0, 0);
            return itemDate.getTime() === inputDate.getTime();
        });
    } else {
        console.log('reset tanggal');

        filtered = dataAsli;
    }

    // 🔍 Filter pencarian
    const searchValue = document.getElementById('searchBill').value.toLowerCase();
    if (searchValue) {
        filtered = filtered.filter(item =>
            item.item?.toLowerCase().includes(searchValue) ||
            String(item.nominal).includes(searchValue) ||
            String(item.number_code).includes(searchValue) ||
            item.customer_name?.toLowerCase().includes(searchValue)
        );
    }



    // 🔽 Sort sesuai pilihan user
    const sortValue = document.getElementById('sortselek').value;
    switch (sortValue) {
        case "Item A-Z":
            filtered.sort((a, b) => a.item.localeCompare(b.item));
            break;
        case "Item Z-A":
            filtered.sort((a, b) => b.item.localeCompare(a.item));
            break;
        case "Total A-Z":
            filtered.sort((a, b) => a.nominal - b.nominal);
            break;
        case "Total Z-A":
            filtered.sort((a, b) => b.nominal - a.nominal);
            break;
        default:
            filtered.sort((a, b) => new Date(+b.tglinputmili) - new Date(+a.tglinputmili));
    }

    // 🧮 Pagination logic
    let fixarraawal = [];
    if (prosedur === 'awal' || prosedur === 'pencarian') {
        sortedDataGlobal = filtered;
        currentIndex = 0;
        const maxleng = Math.min(itemsPerLoad, sortedDataGlobal.length);
        fixarraawal = sortedDataGlobal.slice(0, maxleng);
        currentIndex += maxleng;
    } else if (prosedur === 'loadmore') {
        const nextData = sortedDataGlobal.slice(currentIndex, currentIndex + itemsPerLoad);
        currentIndex += itemsPerLoad;
        fixarraawal = nextData;
    }


    const notFound = fixarraawal.length === 0;
    document.getElementById('datatidakditemukan').style.display = notFound ? 'block' : 'none';

    // 🎨 Render hasil
    // document.getElementById('divhpsdata').innerHTML ='';//reset
    const html = returnarray(fixarraawal);
    var before = document.getElementById('divhpsdata').innerHTML;

    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');


    if (prosedur === 'loadmore') {
        divhapus.innerHTML = before + html;
        datatab.appendChild(divhapus);
    } else {
        //divhapus.innerHTML ='';
        //void divhapus.offsetHeight;    // paksa reflow
        divhapus.innerHTML = html;
        datatab.appendChild(divhapus);
    }

    // 🎯 UI update tombol Load More (untuk tabel sebelumnya)
    const loadBtnPrev = document.getElementById('load-more-btn-prev');
    if (loadBtnPrev) {
        loadBtnPrev.style.display = currentIndex >= sortedDataGlobal.length ? 'none' : 'block';
        loadBtnPrev.onclick = () => {
            cekFilterDataSebelumnya('loadmore');
        };
    }
}


function returnarray(array) {
    return array
        .map((element, index) => {
            if (element.approvalorreject !== 'true' && element.approvalorreject !== 'false') {
                return `
                <tr id="dataitem-${index}" data-json='${JSON.stringify(element)}' 
                    class="font-smaller-10 greyunbold"
                    style="background:#fff; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
                    <td style="text-align:left; max-width:11ch; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; border-top-left-radius:8px; border-bottom-left-radius:8px;"
                        title="${element.item}">
                        ${element.day} ${element.month_name || "Every Month"}
                    </td>
                    <td style="text-align:left;"> ${element.item}</td>
                    <td style="text-align:left;">${element.office}</td>
                    <td style="text-align:left;">Rp. ${formatRupiah(element.nominal)}</td>
                    <td style="text-align:center;">${element.customer_name}</td>
                    <td style="text-align:center;">${element.number_code}</td>
                    <td style="text-align:center;">${element.kodecoa}</td>
                    <td style="text-align:center;">${element.note || "-"}</td>
                    <td style="text-align:center; vertical-align:middle; border-top-right-radius:8px; border-bottom-right-radius:8px;">
                        <div style="display:flex; gap:6px; justify-content:center;">
                            <span class="badge text-bg-danger" style="cursor:pointer;" onclick="klikdeleteitem('${index}')">Delete</span>
                            <span class="badge text-bg-primary" style="cursor:pointer;" onclick="klikedititem('${index}')">Edit</span>
                        </div>
                    </td>
                </tr>
                `;
            }
        }).filter(Boolean) // <-- tambahkan ini
        .join('');
}

/// CREATE LIST ///
var categorylists_element;
var coalists_element;
function createlist(index = 1) {
    var dataarray = window.dataall;

    ////// office ////////////////
    var fixitemsarray = [];
    for (let i = 0; i < dataarray.database_office.length; i++) {
        let element = dataarray.database_office[i];
        if (fixitemsarray.indexOf(element.office) === -1) {
            fixitemsarray.push(element.office);
        }
    }

    categorylists_element = returnarraydata(fixitemsarray);
    document.getElementById(`listoffice-${index}`).innerHTML = categorylists_element;

    ////// coa ////////////////
    var fixitemscoaarray = [];
    for (let i = 0; i < dataarray.database_coa.length; i++) {
        let element = dataarray.database_coa[i];
        if (fixitemscoaarray.indexOf(element) === -1) {
            fixitemscoaarray.push(element);
        }
    }
    coalists_element = returnarraydatacoa(fixitemscoaarray);
    document.getElementById(`listcoa-${index}`).innerHTML = coalists_element;

}


// ==== RETURN OPTION GENERATORS ====
// semua pakai innerText biar tampil di dropdown
function returnarraydatacoa(array) {
    return array.map(function (element) {
        return `<option value="${element.kode}">${element.keterangan}</option>`;
    }).join('');
}
function returnarraydata(array) {
    return array.map(function (element) {
        return `<option value="${element}">${element}</option>`;
    }).join('');
}
/// TUTUP CREATE LIST ///



function formatDatess(millis) {
    const date = new Date(millis);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

// 🔘 Handler tombol Load More
function loadMoreData() {
    if (currentFilter === 'today' || currentFilter === 'upcoming') {
        // cekFilterDataHariini('loadmore', currentFilter);
    } else {
        cekFilterDataSebelumnya('loadmore');
    }
}


//tutup show tabel


var addoredit = "add"; //add edit

//klik close modal add new
$("#modaladdnewitem").on("hidden.bs.modal", function (e) {
    addoredit = "add";
    document.getElementById(`modaladdnewitemlabel`).innerHTML =
        "Add New Bill Due";
    document.getElementById(`addnewitemtombolfooters`).classList.remove("d-none");
    document.getElementById(`edititemtombolfooters`).classList.add("d-none");


    //reset inputan di modal
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard, index) => {
        // reset semua input text/number
        itemCard.querySelector('[name="item"]').value = '';
        itemCard.querySelector('[name="office"]').value = '';
        itemCard.querySelector('[name="nominal"]').value = '';
        itemCard.querySelector('[name="customer-name"]').value = '';
        itemCard.querySelector('[name="number-code"]').value = '';
        itemCard.querySelector('[name="coa-code"]').value = '';
        // reset select hari
        itemCard.querySelector('[name="hari"]').selectedIndex = 0;
        // reset select bulan
        itemCard.querySelector('[name="bulan"]').selectedIndex = 0;

        if (index != 0) {
            itemCard.remove(); // Langsung remove elemen ke-2 dan seterusnya
            itemIndex = 1;
        }

    });
});


//////////////////////////////////universal
// function loadingpopup() {
//     Swal.fire({
//         title: "Loading ...",
//         allowOutsideClick: false,
//         html:
//         '<progress id="loadingpersenpopoups" value="20" max="100" style="width:100%"> </progress>',
//         showConfirmButton: false,
//     });
//     //Swal.showLoading();

// }
// function warningpopup(icon,title) {
//     Swal.fire({
//         icon:icon,
//         title:'',
//         text: title,
//         showConfirmButton: false,
//         timer: 1500
//     });
// }
//////
function reloadnewdata() {
    var xhrzx = new XMLHttpRequest();

    xhrzx.open("GET", `/adminlist/reloaded`);
    xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrzx.setRequestHeader('authorization', xi);
    //xhrzx.send(JSON.stringify(data));
    xhrzx.addEventListener("load", () => {
        var resdat = JSON.parse(xhrzx.responseText);


    });
}

// function menuarrowklik(id) {
//   if (document.getElementById('klikhidebar').className!='bi bi-caret-right-fill toggle-btn') {
//     if (document.getElementById(id).className=='bi bi-caret-down-fill hide-on-collapse') {
//         document.getElementById(id).className='bi bi-caret-up-fill hide-on-collapse';
//         $(`#${id}-extend`).show();
//     }else{
//         document.getElementById(id).className='bi bi-caret-down-fill hide-on-collapse';
//         $(`#${id}-extend`).hide();
//     }
// }

// }
////////
$(document).ready(function () { resizetable(); });
function resizetable() {

    var top_nav_height = 0;
    var bottom_nav_height = 0;
    var mobilespasi = 0;
    var kotaktombolatas = 0;//$("#kotaktombolatas").height();
    var window_height = $(window).height();
    if (ismobile == 'y') {
        console.log('mobile');

        top_nav_height = //$("#navatas-mobile").height();
            bottom_nav_height = 0;//$("#navbarbawah").height();
        mobilespasi = 0;//$("#mobile-spase-nav").height();
    } else {
        console.log('pc');
        top_nav_height = $("#nav-atas").height();
        mobilespasi = 0//$("#mobile-spase-nav").height();
    }

    var heigfix = window_height - (top_nav_height + bottom_nav_height + mobilespasi + kotaktombolatas);
    console.log(`heihhhh : ${bottom_nav_height}`);

    document.getElementById('main-pages').setAttribute('style', `max-height:${heigfix}px!important;overflow-y: scroll!important;overflow-x: hidden!important;`);

}
//------------------------------------
function hidemodal(modalid) {

    var myModalEl = document.getElementById(modalid);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}
///--------------------------------