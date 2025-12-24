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
            const vendors = data.proc_database_pendingpayment;
            const requests = data.datarequestbeli_proc;

            const hasilGabungan = vendors.map(vendorItem => {
                const matchingRequests = requests.filter(req =>
                    req.vendor.toLowerCase() === vendorItem.vendor.toLowerCase() &&
                    (req.tindakbayar !== "true" ) &&
                    (req.pendingpayment === "true")
                );

                return {
                    id: vendorItem.no,
                    vendor: vendorItem.vendor,
                    min: vendorItem.min,
                    max: vendorItem.max,
                    datarequest: matchingRequests,
                };
            });


            console.log("🎯 hasilGabungan:", hasilGabungan);
            sortedDataGlobal = hasilGabungan
            // 🧩 panggil fungsi tampil tabel
            showtabel(hasilGabungan);
        })
        .catch(err => {
            console.error('Gagal ambil dataall:', err);
        });
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
function showtabel(array) {
    if (gethumburger.tipeuser.toLowerCase() == 'supervisor' || gethumburger.tipeuser.toLowerCase() == 'procurement') {
        // document.getElementById('tabel-approvalsproc').classList.remove('d-none');
    }
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("div");
    divhapus.setAttribute("id", "divhpsdata");
    divhapus.setAttribute("class", "p-1");


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

// Fungsi bantu untuk format angka ke rupiah
function formatRupiah(angka) {
    if (typeof angka === "string") angka = parseFloat(angka);
    return angka.toLocaleString("id-ID");
}

var ceklengloadmore;
let sortedDataGlobal = [];
let currentIndex = 0;
const itemsPerLoad = 20;


// Data awal global
function cekFilterData(prosedur = 'awal') {
    const searchValue = document.getElementById("searchBill").value.toLowerCase().trim();
    const sortValue = document.getElementById("sortselek").value;

    // 1) Buat salinan data dengan properti totalitem (jumlah totalprice per vendor)
    const dataWithTotals = sortedDataGlobal.map(vendorObj => {
        const totalitem = (vendorObj.datarequest || []).reduce((sum, req) => {
            const price = Number(req.totalprice) || 0;
            return sum + price;
        }, 0);

        // kembalikan objek baru supaya gak merubah sortedDataGlobal asli
        return {
            ...vendorObj,
            totalitem
        };
    });

    // 2) Filter berdasarkan vendor atau nama item
    let filtered = dataWithTotals.filter(vendorObj => {
        if (!vendorObj.datarequest || vendorObj.datarequest.length === 0) {
            return vendorObj.vendor.toLowerCase().includes(searchValue);
        }

        const matchVendor = vendorObj.vendor.toLowerCase().includes(searchValue);
        const matchItem = vendorObj.datarequest.some(req =>
            (req.item || "").toLowerCase().includes(searchValue)
        );
        return matchVendor || matchItem;
    });

    // 3) Sorting berdasarkan pilihan
    if (sortValue === "Item A-Z") {
        filtered.sort((a, b) => {
            const itemA = (a.datarequest[0]?.item || a.vendor || "").toLowerCase();
            const itemB = (b.datarequest[0]?.item || b.vendor || "").toLowerCase();
            return itemA.localeCompare(itemB);
        });
    } else if (sortValue === "Item Z-A") {
        filtered.sort((a, b) => {
            const itemA = (a.datarequest[0]?.item || a.vendor || "").toLowerCase();
            const itemB = (b.datarequest[0]?.item || b.vendor || "").toLowerCase();
            return itemB.localeCompare(itemA);
        });
    } else if (sortValue === "Total A-Z") {
        filtered.sort((a, b) => (a.totalitem || 0) - (b.totalitem || 0));
    } else if (sortValue === "Total Z-A") {
        filtered.sort((a, b) => (b.totalitem || 0) - (a.totalitem || 0));
    }

    console.log("🔍 Filter hasil:", filtered);

    // 4) Render hasil ke halaman (showtabel akan membuat DOM)
    showtabel(filtered);
}

function returnarray(array) {
    return array
        .map((element, index) => {
            const totalitem = element.datarequest.reduce((sum, req) => {
                const price = Number(req.totalprice) || 0;
                return sum + price;
            }, 0);

            const header = `
                <div 
                    style="
                    display:table-row; 
                    font-weight:600; 
                    border-bottom:1px solid #dee2e6;
                    "
                >
                    <div style="display:table-cell; padding:8px; vertical-align:middle;  white-space:nowrap;">
                        Tanggal
                    </div>
                    <div style="display:table-cell; padding:8px; vertical-align:middle;  white-space:nowrap;">
                        Nama Barang
                    </div>
                    <div style="display:table-cell; padding:8px; vertical-align:middle;  white-space:nowrap;">
                        Estimasi Bayar
                    </div>
                    <div style="display:table-cell; padding:8px; vertical-align:middle; white-space:nowrap;">
                        Total Bayar
                    </div>
                </div>
                `;

            const rows = element.datarequest.map(function (item) {
                console.log(item.tglinputmili);
                
                const tglinputmili = new CustomDateFormatter(Number(item.tglinputmili));
                const estimasi = new CustomDateFormatter(Number(item.estimasi_bayar_mili));

                var tglinputmili_String = tglinputmili.format('dd month yyyy');
                var estimasi_String = estimasi.format('dd month yyyy');
                return `
                    <div style="display:table-row; border-bottom:1px solid rgba(0,0,0,0.05);">
                          <div style="display:table-cell; padding:6px 8px; vertical-align:middle; white-space:normal;">
                            ${tglinputmili_String}
                        </div>
                        <div style="display:table-cell; padding:6px 8px; vertical-align:middle; white-space:normal;">
                            ${item.item}
                        </div>
                          <div style="display:table-cell; padding:6px 8px; vertical-align:middle; white-space:normal;">
                           ${estimasi_String}
                        </div>
                        <div style="display:table-cell; padding:6px 8px; vertical-align:middle; white-space:normal;">
                           Rp. ${(item.totalprice).toLocaleString("id-ID")}
                        </div>
                        
                    </div>
                `;
            }).join('');
            const tableDiv = `
            <div class="container-fluid" style="width:100%; padding:0 8px;">
                <div 
                style="
                    width:100%;
                    overflow-x:auto;
                    display:block;
                ">
                <div 
                    style="
                    display:table;
                    width:100%;
                    table-layout:auto;
                    border-collapse:collapse;
                    font-size:12px;
                    ">
                    ${element.datarequest.length === 0 ? `
                    <div 
                        style="
                            display: table;
                            width: 100%;
                            height: 100px;
                            table-layout: auto;
                            border-collapse: collapse;
                            font-size: 12px;
                            text-align: center;
                        "
                        >
                        <div 
                            style="
                            display: table-cell;
                            vertical-align: middle;
                            "
                        >
                            <span>Data Tidak Ada</span>
                        </div>
                        </div>

                    ` :
                    `
                      <div 
                    style="
                    display:table;
                    width:100%;
                    table-layout:auto;
                    border-collapse:collapse;
                    font-size:12px;
                    ">
                        ${header || ''}
                        ${rows}
                     </div>
                    `
                }
                   
                </div>
                </div>
            </div>
            `;
            return `
        <div class="card m-2 cursor-pointer greyunbold" style="font-size: 12px;">
          <div class="card-header d-flex justify-content-between align-items-center"
              data-bs-toggle="collapse"
              id="dataitem-${element.id}"
              data-json='${JSON.stringify(element)}'
              data-bs-target="#data-${element.id}"
              style="cursor: pointer;">
              
            <!-- Bagian kiri -->
            <div data-bs-toggle="collapse"
                 data-bs-target="#data-${element.id}"
                 style="cursor:pointer; min-width:120px; flex:1; white-space: normal;">
            <span 
            class="rounded-pill ${totalitem > element.max ? 'bg-danger' : 'bg-success'}" 
            style="width:10px; height:10px; display:inline-block; border-radius:50%;">
            </span>
              <span class="ms-2 d-inline-block greybold" style="white-space: normal;">
                <i class="bi bi-person"></i> ${element.vendor}
              </span>
            </div>

            <!-- Bagian kanan jam & tanggal -->
            <div class="d-flex align-items-center flex-shrink-0 gap-3">
            <div class="d-flex align-items-center">
                <i class="bi bi-cash me-1"></i>
                <small>Rp.${(totalitem).toLocaleString("id-ID")} </small>
              </div>

              <div class="d-flex align-items-center gap-1">
                <i class="bi bi-cash me-1"></i>
              <span>Maks.</span> 
                <small>Rp.${(element.max).toLocaleString("id-ID")} </small>
              </div>
            </div>
          </div>

          <!-- Detail Order (collapse) -->
          <div id="data-${element.id}" class="collapse">
            <div class="card-body px-0 py-0">
               ${tableDiv}
            </div>
             <div class="card-header d-flex justify-content-between align-items-center border-top"
              data-bs-toggle="collapse"
              style="cursor: pointer;">
              
            <div data-bs-toggle="collapse"
                 style="cursor:pointer; min-width:120px; flex:1; white-space: normal;">
           
            </div>

            <!-- Bagian kanan jam & tanggal -->
            <div class="d-flex align-items-center flex-shrink-0 gap-1">
        
         <button type="button"
                                                                    class="btn btn-outline btn-primary d-inline-flex align-items-center font-smaller-10"
                                                                    style="white-space: nowrap;"
                                                                    onclick="klikeditpendingpaymentitem(${element.id})">
                                                                    <i class="bi bi-pencil me-1"></i> Edit
                                                                </button>
       ${element.datarequest.length === 0 ? ` <button type="button"
                                                                    class="btn btn-outline btn-danger d-inline-flex align-items-center font-smaller-10"
                                                                    style="white-space: nowrap;"
                                                                    onclick="klikhapus(${element.id})">
                                                                    <i class="bi bi-trash me-1"></i> Delete
                                                                </button>
        `: ""}

            </div>
          </div>
          </div>
        </div>
      `;
        })
        .join('');
}

///on input
var alldataadditem = []; // Array to store item data
var addoredit = "add"; // Placeholder for the add or edit mode

function oninputdata() {
    const itemCards = document.querySelectorAll("#itemsContainer > .partitems");
    if (!itemCards.length) {
        console.warn("⚠️ Tidak ada item di container.");
        return;
    }
    alldataadditem.length = 0;

    itemCards.forEach((itemCard) => {
        let vendorEl = itemCard.querySelector('[name="vendor"]');
        let minEl = itemCard.querySelector('[name="min"]');
        let maxEl = itemCard.querySelector('[name="max"]');

        if (!vendorEl || !minEl || !maxEl) {
            console.warn("⚠️ Ada field yang belum lengkap di partitems");
            return;
        }

        let vendor = vendorEl.value.trim();
        let min = minEl.value.trim();
        let max = maxEl.value.trim();

        if (!vendor || !min || !max) return;

        alldataadditem.push({ vendor, min, max });
    });

    console.log("🔥 alldataadditem:", alldataadditem);
}

///add more item
let itemIndex = 1;

function additems() {
    itemIndex++;
    renderItems();          // bikin item baru
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
    <b><p id="judulitem-${itemIndex}">Add New Pending Payment ${itemIndex}</p></b>
             <div class="col">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text"
                  style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                  <span class="text-danger">*&nbsp;</span> Vendor
                </span>
                <input type="text" class="form-control" id="vendor-${itemIndex}" name="vendor" placeholder="Vendor"
                  style="font-size: 12px" oninput="oninputdata()" />
              </div>
                <div class="col">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text"
                  style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                  <span class="text-danger">*&nbsp;</span> Min
                </span>
                <input type="number" class="form-control" id="min-${itemIndex}" name="min" placeholder="Min"
                  style="font-size: 12px" oninput="oninputdata()" />
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text"
                  style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                  <span class="text-danger">*&nbsp;</span> Max
                </span>
                <input type="number" class="form-control" id="max-${itemIndex}" name="max" placeholder="Max"
                  style="font-size: 12px" oninput="oninputdata()" />
              </div>
            </div>
    <div class="d-flex justify-content-end">
      <button type="button" class="removeItem btn btn-danger btn-sm" id="removeItem-${itemIndex}" onclick="removeItem(${itemIndex})"><i class="bi bi-trash3-fill" style="color: white;"></i>&nbsp;Hapus item</button>
    </div>
  `;

    itemsContainer.appendChild(newItem);
}


function klikeditpendingpaymentitem(index) {
    addoredit = 'edit';
    alldataadditem.length = 0;
    oldedititem.length = 0;
    var dataarray = JSON.parse(document.getElementById(`dataitem-${index}`).dataset.json);

    console.log('data per product');
    console.log(dataarray);

    document.getElementById(`modaladdnewitemlabel`).innerHTML = "Edit Pending Payment " + dataarray.vendor;
    document.getElementById(`addnewitemtombolfooters`).classList.add('d-none');
    document.getElementById(`edititemtombolfooters`).classList.remove('d-none');

    //insert data product
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard, index) => {
        itemCard.querySelector('[name="vendor"]').value = dataarray.vendor;
        itemCard.querySelector('[name="min"]').value = dataarray.min;
        itemCard.querySelector('[name="max"]').value = dataarray.max;
    });

    var data = {
        vendor: dataarray.vendor,
        min: dataarray.min,
        max: dataarray.max,
    };

    oldedititem.push(data);
    alldataadditem.push(data);

    console.log('edit product awal ==========');
    console.log(alldataadditem);

    $('#modaladdnewitem').modal('show');
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

function formatDatess(millis) {
    const date = new Date(millis);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

function loadMoreData() {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var data = dataarray.database_bill_due;

    /* if (filtersavearray.length>0) {
        data=filtersavearray
    } */
    $("#divhpsdata").last().append(returnarray(data, 'loadmore'));

    // Sembunyikan tombol jika semua data sudah ditampilkan
    if (currentIndex >= ceklengloadmore) {
        document.getElementById('load-more-btn').style.display = 'none';
    }
}

//tutup show tabel

var flag
function submitsavependingpayment() {
    var array = document.querySelectorAll('#itemsContainer > .partitems');
    flag = 0;//0 = isian tidak lengkap
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.querySelector('[name="vendor"]').value == '' || element.querySelector('[name="min"]').value == '' || element.querySelector('[name="max"]').value == '') {
            warningpopup('error', 'isi dengan lengkap');
        } else {
            if (i == array.length - 1) {
                flag = 1;
            }

        }
    }
    if (flag == 1) {
        hidemodal('modaladdnewitem');
        loadingpopup();
        var xhrzx = new XMLHttpRequest();

        xhrzx.open("POST", `/editdatabase/saveaddpendingpayment`);
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify({ namalengkap, username, alldataadditem }));
        xhrzx.addEventListener("load", () => {
            var resdat = JSON.parse(xhrzx.responseText);
            console.log('resdat');
            console.log(resdat);

            var valueload = 90;
            setTimeout(function () {
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
                setTimeout(function () {
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;

                    if (JSON.stringify(resdat.notif).toLowerCase().includes('duplikat') || JSON.stringify(resdat.notif).toLowerCase().includes('gagal')) {
                        creattabstatus1(resdat.notif);
                        $("#modalpopupsuksessaveit").modal('show');
                    } else {
                        creattabstatus1(resdat.notif);
                        $("#modalpopupsuksessaveit").modal('show');
                    }
                }, 800);
            }, 2000);

        });
    }
}


function submitsaveeditpendingpayment() {
    var array = document.querySelectorAll('#itemsContainer > .partitems');
    flag = 0;//0 = isian tidak lengkap
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.querySelector('[name="vendor"]').value == '' || element.querySelector('[name="min"]').value == '' || element.querySelector('[name="max"]').value == '') {
            warningpopup('error', 'isi dengan lengkap');
        } else {
            if (i == array.length - 1) {
                flag = 1;
            }
        }
    }
    if (flag == 1) {
        hidemodal('modaladdnewitem');
        loadingpopup();
        var fixdata = { namalengkap, username, oldedititem, alldataadditem };
        console.log(fixdata);

        var xhrzx = new XMLHttpRequest();
        xhrzx.open("POST", `/editdatabase/saveeditpendingpayment`);
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify(fixdata));
        xhrzx.addEventListener("load", () => {
            var resdat = JSON.parse(xhrzx.responseText);
            console.log('resdat');
            console.log(resdat);


            var valueload = 90;
            setTimeout(function () {
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
                setTimeout(function () {
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;

                    if (JSON.stringify(resdat.notif).toLowerCase().includes('gagal') || JSON.stringify(resdat.notif).toLowerCase().includes('error')) {
                        creattabstatus1(resdat.notif);
                        flag = 0
                        $("#modalpopupsuksessaveit").modal('show');
                    } else {
                        socket.emit('addnew-editvariantproduk', { namalengkap, username, alldataadditem });
                        creattabstatus1(resdat.notif);

                        $("#modalpopupsuksessaveit").modal('show');
                    }
                }, 800);
            }, 2000);

        });
    }
}

function klikhapus(index) {
    var dataarray = JSON.parse(document.getElementById(`dataitem-${index}`).dataset.json);
    console.log('delete item ===');
    console.log(dataarray);
    flag = 1
    Swal.fire({
        icon: 'warning',
        title: '',
        text: `Apakah anda ingin delete item ${dataarray.vendor}?`,
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `Delete`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

        } else if (result.isDenied) {
            if (flag == 1) {
                loadingpopup();
                var xhrzx = new XMLHttpRequest();

                xhrzx.open("POST", `/editdatabase/deleteitem`);
                xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhrzx.setRequestHeader('authorization', xi);
                xhrzx.send(JSON.stringify({ namalengkap, username, tipe: 'pendingpayment', item: dataarray.vendor }));
                xhrzx.addEventListener("load", () => {
                    var resdat = JSON.parse(xhrzx.responseText);
                    console.log('resdat');
                    var valueload = 90;
                    setTimeout(function () {
                        Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
                        setTimeout(function () {
                            Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;
                            if (resdat.icons == 'success') {
                                warningpopup('success', 'Delete berhasil');
                                location.reload();
                                flag = 0

                            } else {
                                warningpopup('error', 'Delete gagal');
                            }
                        }, 800);
                    }, 2000);
                });
            }
        }
    });
}


function creattabstatus1(data) {
    var myobj = document.getElementById("finalstatussaved");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattabstatus-save`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'finalstatussaved');

    divhapus.innerHTML = returnarraystatussave1(data);
    datatab.appendChild(divhapus);
    fetchdata()
    Swal.close();
}

function returnarraystatussave1(array) {
    return array.map(function (element) {
        console.log(element);

        return `
        <tr>
            <td class="text-truncate"  style="max-width: 100px;" title="${element.pendingpayment}">
                ${element.pendingpayment}
            </td>
            <td>
                <span><i class="bi bi-${element.statussave.toLowerCase().includes('duplikat') || element.statussave.toLowerCase().includes('gagal') ? 'x' : 'check'}-circle-fill" style="color: ${element.statussave.toLowerCase().includes('duplikat') || element.statussave.toLowerCase().includes('gagal') ? 'red' : 'green'};"></i> ${element.statussave.toLowerCase().includes('duplikat') || element.statussave.toLowerCase().includes('gagal') ? element.statussave : 'saved'}</span>
            </td>
        </tr>
        `;
    }).join('');
}
//tutup save to database

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
function klikopenaddnew(prosedur) {
    $("#modaladdnewitem").modal("show");
}
///--------------------------------