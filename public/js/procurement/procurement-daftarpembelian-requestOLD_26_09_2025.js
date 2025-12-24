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
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    // console.log(dataarray);
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
            
            showtabel(data.datarequestbeli_proc);
            // createlist();

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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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

    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);

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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('neweaddreqbeli', function (datas) {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    dataarray.datarequestbeli_proc.push(...datas);

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.datarequestbeli_proc);
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
    loadingbawahupdate(dataarray.datarequestbeli_proc);

});

//tutup socket io

//show tabel
function showtabel(array) {
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

    return fixarraawal.map(function (element, index) {
        if (element.approvalorreject != 'true' && element.approvalorreject != 'false') {
            return `
                <tr id="dataitem-${index}" data-json='${JSON.stringify(element)}'>
                    <td style="text-align: left;">
                        ${formatDatess(parseInt(element.tglinputmili))}
                    </td>
                    <td style="text-align: center;max-width: 11ch;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title="${element.requester}">
                        ${element.requester}
                    </td>
                    <td style="text-align: left;">
                        ${element.item} 
                    </td>
                    <td style="text-align: left;">
                        ${element.vendor} 
                    </td>
                    <td style="text-align: left;">
                        ${element.itemdivisi} 
                    </td>
                    <td style="text-align: center;">
                        ${element.qty}  
                    </td>
                    <td style="text-align: center;">
                        ${element.unit}  
                    </td>
                    <td style="text-align: left;">
                        ${element.approvalorreject == 'true' ? 'Approved' : element.approvalorreject == 'false' ? 'Rejected' : 'Process'}  
                    </td>
                    <td style="text-align: left;">
                        <span class="badge text-bg-secondary" style="cursor: pointer;" onclick="klikapprovalreq('${index}')" id="klikapprovalreq-${index}">Approval</span>
                    </td>
                </tr>
            `;
        }


    }).join('');

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

/**
 * @describe Feature search
 */
function handleSearchRequest(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    const tbody = document.getElementById("divhpsdata");

    if (!tbody) return;

    const rows = tbody.getElementsByTagName("tr");
    let found = false;

    for (let row of rows) {
        const text = row.innerText.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = "";
            found = true;
        } else {
            row.style.display = "none";
        }
    }

    let notFoundRow = document.getElementById("row-not-found");

    if (!found && searchTerm !== "") {
        if (!notFoundRow) {
            notFoundRow = document.createElement("tr");
            notFoundRow.id = "row-not-found";
            notFoundRow.innerHTML = `<td colspan="10" class="text-center">Data tidak ditemukan</td>`;
            tbody.appendChild(notFoundRow);
        }
    } else {
        if (notFoundRow) notFoundRow.remove();
    }
}




////loadmore
let currentIndex = 0; // Indeks data yang telah ditampilkan
var itemsPerLoad = 100; // Maksimum data yang ditampilkan per klik tombol

function loadMoreData() {
    var dataarray = window.dataall; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

//tombol approval
var indexklik;
async function klikapprovalreq(index) {
    indexklik = index;
    if (document.getElementById(`klikapprovalreq-${index}`).innerHTML != "Approval") {
        warningpopup('warning', 'tunggu loading selesai');
    } else {
        var dataarray = JSON.parse(document.getElementById(`dataitem-${index}`).dataset.json);
        console.log('=== dataarray ====');
        console.log(dataarray);

        try {
            var dataget = await getidtransaksi();

            console.log('getidtransaksi');
            console.log(dataget);

            document.getElementById(`tipeitem-modalapprovalrequest`).innerHTML = dataarray.tipeitem;

            //reset
            document.getElementById(`onoffpendingpayment`).checked = false;
            document.getElementById(`coa-modalapprovalrequest-1`).value = '';
            document.getElementById(`ketcoa-modalapprovalrequest-1`).value = '';
            document.getElementById(`zqty-modalapprovalrequest-1`).value = 0;
            document.getElementById(`hargaunitshow-modalapprovalrequest-1`).value = '';
            document.getElementById(`hargaunitsave-modalapprovalrequest-1`).value = '';
            document.getElementById(`totalsave-modalapprovalrequest-1`).value = 0;
            document.getElementById(`totalshow-modalapprovalrequest-1`).value = '';
            document.getElementById(`vendor-modalapprovalrequest-1`).value = '';
            document.getElementById(`noteprocurement-modalapprovalrequest-1`).value = '';
            //

            setselekvendor();
            listbank();
            setlistoffice();

            showdatatoinputpopup(dataget.id_transaksi, dataarray);
            oninputdata_modalapprovalrequest();
            $('#modalapprovalrequest').modal('show');
        } catch (error) {
            console.error('Gagal mendapatkan ID transaksi:', error);
            alert('Gagal mengambil ID transaksi.');
        }
    }

}

//tutup tombol approval 

//get id transaksi
//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';
function getidtransaksi() {
    return new Promise((resolve, reject) => {
        var xhrzx = new XMLHttpRequest();
        xhrzx.open("POST", `/procurement/getidtransaksi`);
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify({ hahai: 'hahai' }));
        xhrzx.addEventListener("load", () => {
            var resdat = JSON.parse(xhrzx.responseText);
            console.log('id transaksi');
            console.log(resdat);
            resolve(resdat);
        });
    });

}
//tutup get id transaksi

//set select vendor
function setselekvendor() {
    document.getElementById('vendor-datalistOptions').innerHTML = '';
    var dataarray = window.dataall.databaseitem_proc; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).databaseitem_proc;//data item procurement
    const vendorSet = new Set(dataarray.map(item => item.vendor));
    var vendorArray = Array.from(vendorSet);

    var databasevendor_proc =  window.dataall.databasevendor_proc;

    // Normalisasi vendorArray ke uppercase
    vendorArray = vendorArray.map(v => v.toUpperCase());

    if (databasevendor_proc.length>0) {
        databasevendor_proc.forEach(item => {
            const vendorUpper = item.vendor.toUpperCase();

            if (!vendorArray.includes(vendorUpper)) {
                vendorArray.push(vendorUpper);
            }
        });
    }

    vendorArray.sort();
    console.log('vendorArray');
    console.log(vendorArray);

    var setvendor = returnarrayvendor(vendorArray);
    document.getElementById('vendor-datalistOptions').innerHTML = setvendor;
}
function returnarrayvendor(array) {

    return array.map(function (element, index) {
        return `
            <option value="${element}">
        
        `;
    }).join('');
}
//tutup set select vendor

//selek office
function setlistoffice() {
    document.getElementById('listoffice').innerHTML ='';
    var dataarray = window.dataall.database_office;

    var setoffice=returnarrayoffice(dataarray);
    document.getElementById('listoffice').innerHTML = setoffice;
}
function returnarrayoffice(array) {
    return array.map(function (element, index) {
        return `
            <option value="${element.office}">
        
        `;
    }).join('');
}
function selekoffice(e) {
    oninputdata_modalapprovalrequest();
}
//end selek office

//show data di input popup
var nomorurut;
function showdatatoinputpopup(id_transaksi, array) {

    var dataitem = array;
    nomorurut = dataitem.no;

    console.log('dataitem==++++++',dataitem)

    document.getElementById(`notransaksishow-modalapprovalrequest-1`).value = id_transaksi.split('-')[0];
    document.getElementById(`notransaksisave-modalapprovalrequest-1`).value = id_transaksi;
    document.getElementById(`namabarang-modalapprovalrequest-1`).value = dataitem.item;
    document.getElementById(`divisi-modalapprovalrequest-1`).value = dataitem.itemdivisi;

    document.getElementById(`noterequester-modalapprovalrequest-1`).value = dataitem.note_req;

    document.getElementById(`namarequester-modalapprovalrequest-1`).value = dataitem.requester;

    document.getElementById(`qty-modalapprovalrequest-1`).value = dataitem.qty;

    

    var dataitemproc = window.dataall.databaseitem_proc;//data item procurement
    

    //set harga/unit
    // Cari data yang cocok berdasarkan item dan divisi
    let matchedItem = dataitemproc.find(entry =>
        entry.item === dataitem.item && entry.divisi === dataitem.itemdivisi
    );

    // Jika ditemukan, masukkan harga ke dalam dataitem.priceunit
    if (matchedItem) {
        dataitem.priceunit = matchedItem.price;
        dataitem.coa = matchedItem.coa;

        document.getElementById('vendor-modalapprovalrequest-1').value=matchedItem.vendor;

        document.getElementById(`coa-modalapprovalrequest-1`).value = matchedItem.coa;

        ambilketcoa(matchedItem.coa);

        document.getElementById(`hargaunitshow-modalapprovalrequest-1`).classList.remove('d-none');
        document.getElementById(`hargaunitshow-modalapprovalrequest-1`).value = `Rp ${formatMoney(matchedItem.price)}`;

        document.getElementById(`hargaunitsave-modalapprovalrequest-1`).classList.add('d-none');
        document.getElementById(`hargaunitsave-modalapprovalrequest-1`).disabled = true;
        document.getElementById(`hargaunitsave-modalapprovalrequest-1`).value = matchedItem.price;
    } else {
        console.log("Item tidak ditemukan di dataitemproc.");
        //harga input manual
        document.getElementById(`hargaunitshow-modalapprovalrequest-1`).classList.add('d-none');
        document.getElementById(`hargaunitsave-modalapprovalrequest-1`).classList.remove('d-none');
        document.getElementById(`hargaunitsave-modalapprovalrequest-1`).disabled = false;
    }
}

//tutup show data di input popup

//keterangan coa
function ambilketcoa(coa) {
    var dataarray = window.dataall.database_coa; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).database_coa;//data coa

    for (let i = 0; i < dataarray.length; i++) {
        const element = dataarray[i];
        if (element.kode == coa) {
            document.getElementById(`ketcoa-modalapprovalrequest-1`).value = element.keterangan;
        }
    }

}
//tutup keterangan coa

//list bank
function listbank() {
    var dataarray = window.dataall.databasebank; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).databasebank;//data bank
    document.getElementById('bank-modalapprovalrequest-1').innerHTML = '';

    var listbanks = '<option selected disabled value="">Pilih Bank</option>' + returnarraylistbank(dataarray);

    document.getElementById('bank-modalapprovalrequest-1').innerHTML = listbanks;
}

function returnarraylistbank(array) {
    return array.map(function (element, index) {
        return `
            <option>${element.namabank}</option>
        
        `;
    }).join('');
}
//tutup list bank

//oninputdata
var alldatakirim;
function oninputdata_modalapprovalrequest(params) {
    //hitung total harga
    var qty = document.getElementById(`qty-modalapprovalrequest-1`).value;
    var z_qty = document.getElementById(`zqty-modalapprovalrequest-1`).value;
    var hargaunit = document.getElementById(`hargaunitsave-modalapprovalrequest-1`).value;

    document.getElementById(`totalsave-modalapprovalrequest-1`).value = z_qty == 0 || z_qty == '' ? qty * hargaunit : z_qty * hargaunit;

    var totalhargafix = document.getElementById(`totalsave-modalapprovalrequest-1`).value;

    document.getElementById(`totalshow-modalapprovalrequest-1`).value = `Rp ${formatMoney(totalhargafix)}`;
    //tutup hitung total harga

    var tglmili_approval = new Date().getTime();

    var id_request = document.getElementById(`notransaksisave-modalapprovalrequest-1`).value;

    var vendor = document.getElementById(`vendor-modalapprovalrequest-1`).value;
    var bank = document.getElementById(`bank-modalapprovalrequest-1`).value;
    var lokasiterima = document.getElementById(`lokasiterima-modalapprovalrequest-1`).value;

    var note_approver = document.getElementById(`noteprocurement-modalapprovalrequest-1`).value;

    var pendingpayment = document.getElementById(`onoffpendingpayment`).checked == true ? 'true' : 'false';

    var kodecoa = document.getElementById(`coa-modalapprovalrequest-1`).value;

    alldatakirim = {
        no: nomorurut,
        tglmili_approval,
        id_request,
        z_qty: parseFloat(z_qty),
        priceunit: parseInt(hargaunit),
        totalprice: parseInt(totalhargafix),
        approver: namalengkap,
        note_approver,
        vendor,
        bank,
        lokasiterima,
        pendingpayment,
        kodecoa,
    };

    console.log('alldatakirim====');
    console.log(alldatakirim);

}

//tutup oninputdata

//submit approve
function approveorreject_modalapprovalrequest(status) {
    loadingpopup();
    if (document.getElementById(`hargaunitsave-modalapprovalrequest-1`).value == '' || document.getElementById(`hargaunitsave-modalapprovalrequest-1`).value == 0 || document.getElementById(`vendor-modalapprovalrequest-1`).value == '' || document.getElementById(`bank-modalapprovalrequest-1`).value == '' || document.getElementById(`lokasiterima-modalapprovalrequest-1`).value == '') {

        if (status == 'reject') {
            fixsend(status);
        } else {
            warningpopup('error', 'isi dengan lengkap');
        }
    } else {
        fixsend(status);
    }
}

var fixsendflag = 0;
function fixsend(status) {
    fixsendflag = 1;
    hidemodal('modalapprovalrequest');

    document.getElementById(`klikapprovalreq-${indexklik}`).innerHTML = `<span class="spinner-border spinner-border-sm text-light" aria-hidden="true"></span>
  <span>Loading...</span>
`;

    alldatakirim.approvalorreject = status == 'reject' ? 'false' : "true";

    fetch('/procurement/approveorreject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify(alldatakirim)
    })
        .then(response => response.json())
        .then(resdat => {
            console.log('resdat');
            console.log(resdat);

            var valueload = 90;
            setTimeout(function () {
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
                setTimeout(function () {
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;

                    if (resdat.icons == 'sukses') {
                        warningpopup('success', resdat.text);
                        //location.reload();
                        if (resdat.id_request != alldatakirim.id_request) {
                            alldatakirim.id_request = resdat.id_request;
                        }
                        socket.emit('approvereqbeli', alldatakirim);

                    } else {
                        warningpopup('error', resdat.text);
                        document.getElementById(`klikapprovalreq-${indexklik}`).innerHTML = 'Approval';
                    }
                    fixsendflag = 0;
                }, 800);
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'error catch : ' + error);
            document.getElementById(`klikapprovalreq-${indexklik}`).innerHTML = 'Approval';
            fixsendflag = 0;
        });
}
//tutup submit approve

//
$('#modalapprovalrequest').on('hidden.bs.modal', function (e) {
    // do something...
    if (fixsendflag != 1) {
        document.getElementById(`klikapprovalreq-${indexklik}`).innerHTML = "Approval";
    }

});
//


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