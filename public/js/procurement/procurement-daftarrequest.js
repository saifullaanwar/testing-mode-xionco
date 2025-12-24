var username;
var office;
var role;
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
    console.log('usercek', JSON.parse(await dbs.get('datauser')));
    if (usercek) {
        username = usercek;//localStorage.getItem('username'); 

        namalengkap = JSON.parse(await dbs.get('datauser')).namalengkap;
        office = JSON.parse(await dbs.get('datauser')).kantor;
        role = JSON.parse(await dbs.get('datauser')).tipeuser;
        document.getElementById('namalengkap').innerHTML = namalengkap;
    }
    else {
        window.location.href = '/';
    }

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        ismobile = 'y';
    }

    gethumburger = JSON.parse(getCookie('hamburger'));
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    // console.log(dataarray.databaseitem_proc);
    // //additemdropfilter(dataarray.itemsdata);
    // showtabel(dataarray.datarequestbeli_proc);
    //showtabel(dataarray.dataadminlist);
    fetchdata()
});


function fetchdata() {
    fetch('/api/daftarpembelian/request')
        .then(res => res.json())
        .then(data => {
            window.dataall = data;
            console.log('datalls =================23=', window.dataall)
            // worker_threads(data);
            // additemdropfilter(data.itemsdata);
            console.log(data.datarequestbeli_proc);
            var dataFix = []
            if (role === "Supervisor" || role === "Procurement") {
                dataFix = data.datarequestbeli_proc
            } else {
                dataFix = data.datarequestbeli_proc.filter(item => item.kantor === office);
            }

            showtabel(dataFix);
            showtabelitemrequest([])
          

        })
}

///////////

function loadingbawahupdate(array) {
    $progressBar.css('width', '0%');
    $progress.show();
    setTimeout(function () {
        /* var modaldut=['modaldetail']
        for (let i = 0; i < modaldut.length; i++) {
        const element = modaldut[i];
        if (document.getElementById(element).style.display=='block') {
            hidemodal(element);
        }
        } */
        $progressBar.css('width', '65%');
        setTimeout(function () {
            $progressBar.css('width', '85%');
            setTimeout(function () {
                $progressBar.css('width', '97%');
                setTimeout(function () {
                    showtabel(array);
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
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('datas ====');
    console.log(datas);

    //var fixarrays=dataarray.dataadminlist;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dataarray.dataadminlist.unshift(element);


    }
    window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
    console.log('dataarray.dataadminlist ====');
    console.log(dataarray.dataadminlist);
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});



socket.on('neweditfullitemadminlist', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

    window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);

    console.log('edit item [3]');
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newquickedititemadminlist', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newquickedititemadminlist');
        }

    }

    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

/* socket.on('neweditforcestatus',function(datas){
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;
        dataarray.dataadminlist[i].confirmroute=datas.confirmroute;
        dataarray.dataadminlist[i].forcedsent=datas.forcedsent;
        dataarray.dataadminlist[i].forcedcancel=datas.forcedcancel;
        dataarray.dataadminlist[i].reschedule=datas.reschedule;
        dataarray.dataadminlist[i].delayproduksi=datas.delayproduksi;
        dataarray.dataadminlist[i].toppriority=datas.toppriority;
        dataarray.dataadminlist[i].pending=datas.pending;
        dataarray.dataadminlist[i].history=datas.history;

        
        window.dataall=dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
}); */

socket.on('newapprovalforcestatuss', function (datas) {
    console.log('reload approval force status');
    console.log(datas);
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var dataupdateds = dataarray.dataadminlist;
    for (let i = 0; i < dataupdateds.length; i++) {
        const element = dataupdateds[i];
        if (element.id_transaksi == datas.id_transaksi) {
            if (element.status.toLowerCase() != 'selesai' && element.status.toLowerCase() != 'dibatalkan') {
                if (datas.approveorreject == 'approve') {
                    dataupdateds[i].status = datas.history[0].tindakan == 'Approved Force Sent' ? 'Selesai' : datas.history[0].tindakan == 'Approved Force Cancel' ? 'Dibatalkan' : datas.history[0].tindakan == 'Approved Force Pending' ? 'Pending' : 'Priority';
                    var oldhistoriesy = JSON.parse(element.history);
                    const combined = [...datas.history, ...oldhistoriesy];

                    dataupdateds[i].history = JSON.stringify(combined);

                    console.log(oldhistoriesy);
                    console.log(dataupdateds[i].history);

                    console.log('reload dataupdateds force status');
                    console.log(dataupdateds);
                    //document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
                    window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
                }

            } else {
                console.log('tidak terjadi forcestatus');
            }

        }
        //dattockup.push(element);
    }

    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('neweditforcestatusnew', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

    window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newklikprinpodo', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        for (let j = 0; j < dataarray.dataadminlist.length; j++) {
            const element2 = dataarray.dataadminlist[j];
            if (element2.id_transaksi == element.id_transaksi) {
                dataarray.dataadminlist[j].klik_print_podo = 'true';
            }
        }

    }
    window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newprintpodo', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;

            dataarray.dataadminlist[i].history = datas.history;

            dataarray.dataadminlist[i].print_podo = 'true';

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newpackde-kirimbahan', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_kirimbahan = 'true';
            dataarray.dataadminlist[i].packde_kirimbahan_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newupholsteryselesai', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].upholstery_jadi = 'true';
            dataarray.dataadminlist[i].upholstery_img = datas.filenamesupload;

            dataarray.dataadminlist[i].history = datas.history;


            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});


socket.on('newapprovalproduk', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;

            dataarray.dataadminlist[i].history = datas.history;

            dataarray.dataadminlist[i].approval_produkjadi = 'true';

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});


socket.on('newpackdereject-ambil', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = 'Proses Produksi (Re)';

            dataarray.dataadminlist[i].upholstery_jadi = '';
            dataarray.dataadminlist[i].approval_produkjadi = '';
            dataarray.dataadminlist[i].reject_ambil_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newpackdereject-qc', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = 'Proses Produksi (Re)';

            dataarray.dataadminlist[i].upholstery_jadi = '';
            dataarray.dataadminlist[i].approval_produkjadi = '';
            dataarray.dataadminlist[i].packde_ambil = '';
            dataarray.dataadminlist[i].reject_qc_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newpackde-ambil', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_ambil = 'true';
            dataarray.dataadminlist[i].packde_ambil_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newpackde-qc', function (datas) {

    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_qc = 'true';
            dataarray.dataadminlist[i].packde_qc_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);

});


socket.on('newdriverreject-ambil', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newdriverreject-terimakonsumen', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('neweaddreqbeli', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    dataarray.datarequestbeli_proc.push(...datas);

    window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('neweapprovereqbeli', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

            window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);

});

//tutup socket io
//show tabel
function showtabel(array) {
    if (gethumburger.tipeuser.toLowerCase() == 'supervisor' || gethumburger.tipeuser.toLowerCase() == 'procurement') {
        //document.getElementById('tabel-approvalsproc').classList.remove('d-none');
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

var ceklengloadmore;
var sortedDataGlobal = []; // Global untuk menyimpan data terurut
function returnarray(array, prosedur) {
    // Urutkan berdasarkan tglmili dari Z ke A (terbaru ke terlama)
    array.sort((a, b) => new Date(parseInt(b.tglinputmili)) - new Date(parseInt(a.tglinputmili)));
    var fixarraawal = [];
    if (prosedur == 'awal' || prosedur == 'pencarian') {
        // Sortir dan simpan secara global
        sortedDataGlobal = array;
        currentIndex = 0;

        const maxleng = Math.min(itemsPerLoad, sortedDataGlobal.length);
        fixarraawal = sortedDataGlobal.slice(0, maxleng);
        currentIndex += maxleng;
    } else {
        // Loadmore
        const nextData = sortedDataGlobal.slice(currentIndex, currentIndex + itemsPerLoad);
        currentIndex += itemsPerLoad;
        fixarraawal = nextData;
        ceklengloadmore = sortedDataGlobal.length;
    }
    // Tampilkan atau sembunyikan tombol load-more
    if (prosedur === 'awal' || prosedur == 'pencarian') {
        if (sortedDataGlobal.length <= itemsPerLoad) {
            document.getElementById('load-more-btn').style.display = 'none';
        } else {
            document.getElementById('load-more-btn').style.display = 'block';
        }

        if (fixarraawal.length > 0) {
            document.getElementById('datatidakditemukan').setAttribute('style', 'display:none;');
        } else {
            document.getElementById('datatidakditemukan').removeAttribute('style');
        }
    } else if (prosedur === 'loadmore') {
        if (currentIndex >= sortedDataGlobal.length) {
            document.getElementById('load-more-btn').style.display = 'none';
        }
    }

    console.log('fixarraawal');
    console.log(fixarraawal);

    // fungsi untuk menggabungkan
    const groupedData = Object.values(
        fixarraawal.reduce((acc, curr) => {
            // key unik berdasarkan kriteria
            const key = `${curr.tglinputmili}-${curr.requester}-${curr.requester_id}`;

            if (!acc[key]) {
                acc[key] = {
                    id: curr.no, // atau index increment
                    lokasi: curr.kantor,
                    user: curr.requester,
                    unit: 0,    // nanti ditambah qty item
                    total: 0,   // nanti ditambah totalprice item
                    tanggal: `${new Date(parseInt(curr.tglinputmili)).toLocaleDateString("id-ID", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })}`,
                    jam: `${new Date(parseInt(curr.tglinputmili)).toLocaleTimeString("id-ID", {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })} `,
                    items: []
                };
            }

            // tambahkan item ke dalam items array
            acc[key].items.push({
                nama: curr.item,
                tipeitem: curr.tipeitem,
                limitedrequest: curr.limitedrequest,
                approvalorreject: curr.approvalorreject,
                qty: curr.qty,
                total: curr.totalprice,
                satuan: curr.unit,
                catatan: curr.note_req,
                deadline: `${new Date(parseInt(curr.deadline, 10)).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                
                })}`
            });

            // update unit dan total per group
            acc[key].unit += Number(curr.qty || 0);
            acc[key].total += Number(curr.totalprice || 0);

            return acc;
        }, {})
    );


    console.log('fixarrgruppedaawal');
    console.log(groupedData);
    // return fixarraawal.map(function(element){
    return groupedData.map(
        function (order) {
            // header
            const header = `
               
                `;


            // rows
            const rows = order.items.map(function (item) {
                const approvals = JSON.parse(item.approvalorreject || "{}");
                const approvalFlow = {
                    "regular": ["procurement"],
                    "limitedrequest": ["procurement", "supervisor"],
                    "new item": ["procurement", "board"]
                };

                // pilih flow berdasarkan tipeitem & limitedrequest
                let flowKey = item.tipeitem.toLowerCase();
                if (flowKey === "regular" && item.limitedrequest === "true") flowKey = "limitedrequest";

                const roles = approvalFlow[flowKey] || [];
                const roleStatuses = roles.map(r => approvals[r] || "");

                let badgeClass = "";
                let badgeText = "";

                // aturan status
                const status = roleStatuses.every(v => v === "true") ? "true"
                    : roleStatuses.includes("false") ? "false"
                        : "";

                if (item.tipeitem === "Regular") {
                    if (item.limitedrequest === "true") {
                        badgeClass = "bg-danger";
                        badgeText = "Limited Passed";
                    } else {
                        badgeClass = "bg-primary";
                        badgeText = "Regular";
                    }
                } else {
                    if (item.limitedrequest === "true") {
                        badgeClass = "bg-danger";
                        badgeText = "Limited Passed";
                    } else {
                        badgeClass = "bg-warning";
                        badgeText = "New Item";
                    }
                }
                return `
               <div class="row border-bottom py-2 align-items-center greyunbold" style="font-size: 12px;">
                <div class="col-auto" style="min-width:110px;">
                    <span class="badge rounded-pill ${badgeClass}">${badgeText}</span>  
                </div>
                <div class="col-auto" style="min-width:250px; white-space: normal; word-wrap: break-word;">
                    ${item.nama}
                </div>
                <div class="col-auto text-start" style="min-width:150px; white-space: normal; word-wrap: break-word;">
                    ${formatRupiah(item.total)}
                </div>
                <div class="col-auto text-end" style="min-width:50px;">
                    ${item.qty}
                </div>
                <div class="col-auto" style="min-width:80px;">
                    ${item.satuan}
                </div>
                <div class="col" style="min-width:100px; white-space: normal; word-wrap: break-word;">
                    “${item.catatan}”
                </div>
                <div class="col-auto d-flex gap-3" style="min-width:80px;">
                    <span style="color:red;">Deadline : ${item.deadline} </span>
                    <span class="badge rounded-pill ${status == 'true' ? 'bg-primary':status == 'false' ? 'bg-danger':"bg-secondary"}">${status == 'true' ? 'Approved' : status == 'false' ? 'Rejected' : 'On Process'} </span>  
                </div>
                </div>
                `;
            }).join('');


            // gabung jadi satu container div
            const tableDiv = `
                <div class="container-fluid">
                    ${header}
                    ${rows}
                </div>
                `;
            return `
                <div class="card mb-3 cursor-pointer greyunbold"   style="font-size: 14px;">
                   <div class="card-header d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#orderDetail${order.id}"  style="cursor: pointer;">
  <!-- Bagian kiri klik-able -->
  <div data-bs-toggle="collapse" 
       data-bs-target="#orderDetail${order.id}" 
       style="cursor:pointer; min-width:90px; flex:1; white-space: normal;">
    
    <strong style="min-width:90px; display:inline-block; white-space: normal;"  class="greybold">
      ${order.lokasi}
    </strong>
    
    <span class="ms-3 d-inline-block greybold" style="white-space: normal;">
      <i class="bi bi-person"></i> ${order.user}
    </span>
    
    <span class="ms-3 fw-bold d-inline-block greybold">${formatRupiah(order.total)}</span>
    
    <span class="ms-2 d-inline-block greybold">/ ${order.unit} X UNIT</span>
    
  </div>

  <!-- Bagian kanan jam & tanggal -->
  <div class="d-flex align-items-center flex-shrink-0">
    
    <div class="d-flex align-items-center me-3">
      <i class="bi bi-clock me-1"></i>
      <small>${order.jam} WIB</small>
    </div>
    
    <div class="d-flex align-items-center">
      <i class="bi bi-calendar me-1"></i>
      <small>${order.tanggal}</small>
    </div>
    
  </div>
</div>


                    <!-- Detail Order (collapse) -->
                    <div id="orderDetail${order.id}" class="collapse">
                    <div class="card-body px-0 py-0">

                    ${tableDiv}

                    </div>
                  
                    </div>
                </div>
                `;
        }
    ).join('');
}

function formatDatess(millis) {
    const date = new Date(millis);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

function formatRupiah(amount) {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numericAmount)) return "Rp. 0";
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(numericAmount);
}
////loadmore
let currentIndex = 0; // Indeks data yang telah ditampilkan
var itemsPerLoad = 100; // Maksimum data yang ditampilkan per klik tombol

function loadMoreData() {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var data = dataarray.dataadminlist;

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


//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

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
