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
            createlist()

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
    let filteredList = [];
    var myobj = document.getElementById("divhpsdata");
    if (myobj) myobj.remove();

    var datatab = document.getElementById(`alldattab`);
    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

    console.log("gethumburger.tipeuser.toLowerCase() ======", gethumburger.tipeuser.toLowerCase());

    // mapping approval flow
    const approvalFlow = {
        "regular": ["procurement"],
        "limitedrequest": ["procurement", "supervisor"], // limited request true
        "new item": ["procurement", "board"]
    };
    function normalizeApproval(val) {
        return val === "true"; // hanya true yang lolos
    }
    filteredList = array.filter(item => {
        let tipe = (item.tipeitem || "").toLowerCase();
        let limitedrequest = (item.limitedrequest || "").toLowerCase();
        let approvals = JSON.parse(item.approvalorreject || "{}");

        // 🚫 kalau ada yang false → langsung skip
        if (Object.values(approvals).includes("false")) return false;

        // tentukan flow
        let flow = [];
        if (tipe === "regular") {
            flow = limitedrequest === "true" ? approvalFlow["limitedrequest"] : approvalFlow["regular"];
        } else if (tipe === "new item") {
            flow = approvalFlow["new item"];
        }
        if (!flow.length) return false;

        const userRole = gethumburger.tipeuser.toLowerCase();
        if (!flow.includes(userRole)) return false;

        let roleIndex = flow.indexOf(userRole);
        let isPreviousDone = flow.slice(0, roleIndex).every(r => normalizeApproval(approvals[r]));
        let isUserDone = normalizeApproval(approvals[userRole]);

        return isPreviousDone && !isUserDone;
    });

    console.log('filteredList ========');
    console.log(filteredList);

    divhapus.innerHTML = returnarray(filteredList, 'awal');
    datatab.appendChild(divhapus);

    setTimeout(function () {
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
        fixarraawal.reduce((acc, curr, idx) => {
            // Key pengelompokannya
            const key = `${curr.tglinputmili}-${curr.requester}-${curr.requester_id}`;

            // Kalau group belum ada → buat baru
            if (!acc[key]) {
                acc[key] = {
                    id: idx + 1, // atau curr.no kalau mau
                    lokasi: curr.kantor,
                    user: curr.requester,
                    estimasi_bayar_mili: curr.estimasi_bayar_mili === "" ? "" : new Date(parseInt(curr.estimasi_bayar_mili)).toLocaleDateString("id-ID", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }),
                    unit: 0,
                    total: 0,
                    tanggal: new Date(parseInt(curr.tglinputmili)).toLocaleDateString("id-ID", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }),
                    jam: new Date(parseInt(curr.tglinputmili)).toLocaleTimeString("id-ID", {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }),
                    items: [] // taruh semua item mentah di sini
                };
            }

            // Tambahkan full object curr ke items
            acc[key].items.push(curr);

            // Tambahkan qty & total (kalau ada nilainya)
            acc[key].unit += Number(curr.qty ?? 0);
            acc[key].total += Number(curr.totalprice ?? 0);

            return acc;
        }, {})
    );

    console.log(groupedData);



    console.log('fixarrgruppedaawal');
    console.log(groupedData);

    // return fixarraawal.map(function(element){
    return groupedData.map(
        function (order) {
            // header
            const hasCoA = order.items.some(it => it.kodecoa && it.kodecoa.trim() !== "");
            const userRole = gethumburger.tipeuser.toLowerCase();

            const header = `
                <div 
                    style="
                    display:table-row; 
                    font-weight:600; 
                    border-bottom:1px solid #dee2e6;
                    "
                >
                    <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:center; white-space:nowrap;">
                    Select
                    </div>
                    <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:center; white-space:nowrap;">
                    Type
                    </div>
                    <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:left; white-space:nowrap;">
                    Item
                    </div>
                    <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:center; white-space:nowrap;">
                    Total
                    </div>
                    <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:center; white-space:nowrap;">
                    Qty
                    </div>
                    <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:center; white-space:nowrap;">
                    Unit
                    </div>
                    <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:left; white-space:nowrap; width:220px; max-width:220px;">
                    Note
                    </div>
                    ${hasCoA ? ` <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:left; white-space:nowrap; width:100px; max-width:100px;">
                    CoA
                    </div>`: userRole === "board" ? ` <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:left; white-space:nowrap; width:100px; max-width:100px;">
                    CoA
                    </div>`: ""}
                   
                    <div style="display:table-cell; padding:8px; vertical-align:middle; text-align:right; white-space:nowrap;">
                    Deadline / Status
                    </div>
                </div>
                `;


            const rows = order.items.map(function (item) {
                const approvals = JSON.parse(item.approvalorreject || "{}");

                let badgeClass = "";
                let badgeText = "";
                let status = approvals[userRole] || "";
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

                const coaCell = userRole === "board"
                    ? `
                    <div style="display:table-cell; padding:6px 8px; vertical-align:middle;">
                        <input 
                        type="number" 
                           class="form-control form-control-sm coa-input" 
                        placeholder="Kode Coa"
                        style="font-size:12px; " 
                        list="listcoa"
                        data-id="${item.id}" 
                        />
                        <datalist id="listcoa"></datalist>
                    </div>`
                    : `${item.kodecoa !== "" ?
                        ` <div style="display:table-cell; padding:6px 8px; vertical-align:middle;">
                        “${item.kodecoa || ''}”
                            </div>`: ""
                    }`;

                return `
                    <div style="display:table-row; border-bottom:1px solid rgba(0,0,0,0.05);">
                    <div style="display:table-cell; padding:6px 8px; vertical-align:middle; text-align:center; ">
                        <input type="checkbox" class="form-check-input select-item" data-item='${JSON.stringify(item)}'>
                    </div>

                    <div style="display:table-cell; padding:6px 8px; vertical-align:middle;">
                        <span class="badge rounded-pill ${badgeClass}">${badgeText}</span>
                    </div>

                    <div style="display:table-cell; padding:6px 8px; vertical-align:middle; white-space:normal;">
                        ${item.item}
                    </div>

                    <div style="display:table-cell; padding:6px 8px; vertical-align:middle;">
                        ${formatRupiah(item.totalprice)}
                    </div>

                    <div style="display:table-cell; padding:6px 8px; vertical-align:middle;  text-align:right;">
                        ${item.qty}
                    </div>

                    <div style="display:table-cell; padding:6px 8px; vertical-align:middle;">
                        ${item.unit}
                    </div>

                    <div style="display:table-cell; padding:6px 8px; vertical-align:middle; white-space:normal;">
                        “${item.note_req || ''}”
                    </div>

                    ${coaCell}

                    <div style="display:table-cell; padding:6px 8px; vertical-align:middle; white-space:nowrap; text-align:right; ">
                       ${isNaN(new Date(parseInt(item.deadline, 10)).getTime())
                        ? ""
                        : `<span style="color:red;">
         Deadline: ${new Date(parseInt(item.deadline, 10)).toLocaleString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })}
       </span>`
                    }

                        <span class="badge rounded-pill ${status == 'true'
                        ? 'bg-primary'
                        : status == 'false'
                            ? 'bg-danger'
                            : 'bg-secondary'
                    }" style="margin-left:6px;">
                        ${status == 'true'
                        ? 'Approved'
                        : status == 'false'
                            ? 'Rejected'
                            : 'On Process'
                    }
                        </span>
                    </div>
                    </div>
                `;
            }).join('');

            // ✅ Table container inline style fix
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
                    ${header || ''}
                    ${rows}
                </div>
                </div>
            </div>
            `;

            return `
                <div class="card mb-3 cursor-pointer greyunbold"  style="font-size: 12px;">
                   <div class="card-header d-flex  justify-content-between align-items-center"  data-bs-toggle="collapse" data-bs-target="#orderDetail${order.id}"  style="cursor: pointer;">
                    <!-- Bagian kiri klik-able -->
                    <div data-bs-toggle="collapse" 
                        data-bs-target="#orderDetail${order.id}" 
                        style="cursor:pointer; min-width:90px; flex:1; white-space: normal;">
                        
                        <strong style="min-width:90px; display:inline-block; white-space: normal;" class="greybold">
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
                   <div class="card-footer d-flex justify-content-between " style="font-size: 12px;">
                        <!-- Bagian Estimasi Bayar -->
                       <div class="d-flex align-items-center gap-2">
                        <label for="estimasi-modalrequest-${order.id}" class="form-label mb-0 small">
                            Estimasi Bayar:
                        </label>

                        ${order.estimasi_bayar_mili
                    ? `<span style="font-size: 12px;">${order.estimasi_bayar_mili}</span>`
                    : `<input
                                    type="date"
                                    class="form-control form-control-sm d-inline-block greyunbold"
                                    id="estimasi-modalrequest-${order.id}"
                                    name="estimasi-modalrequest-${order.id}"
                                    style="font-size: 12px; max-width: 150px; width:auto;"
                                />`
                }
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <button 
                            class="btn btn-outline-danger btn-sm" 
                            style="font-size: 12px;" 
                            onclick='klikapprovalreq(${JSON.stringify(order)},"${gethumburger.tipeuser.toLowerCase()}","reject")'>
                            Reject
                            </button>
                            <button 
                            class="btn btn-primary btn-sm" 
                            style="font-size: 12px;" 
                            onclick='klikapprovalreq(${JSON.stringify(order)},"${gethumburger.tipeuser.toLowerCase()}","approved")'>
                            Approval
                            </button>
                        </div>
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
// Tombol approval
let indexklik;
let actionMode = "";
let datalistrequest = []; // global supaya bisa diakses tombol "Iya"
let estimasiTanggal

// fungsi klik Approval/Reject
async function klikapprovalreq(order, role, status) {
    // ambil item yang dicentang pada order.id tertentu
    datalistrequest = Array.from(
        document.querySelectorAll(`#orderDetail${order.id} .select-item:checked`)
    ).map(cb => JSON.parse(cb.dataset.item)); // parse jadi object
    // kalau order sudah punya estimasi_bayar_mili, pakai itu
    estimasiTanggal = order.estimasi_bayar_mili || "";
    // Validasi item dicentang
    if (datalistrequest.length <= 0) {
        warningpopup('error', 'Silahkan Pilih Salah satu');
        return;
    }
    // kalau masih kosong, cek input date manual
    if (!estimasiTanggal) {
        const inputEl = document.getElementById(`estimasi-modalrequest-${order.id}`);
        if (inputEl) {
            estimasiTanggal = inputEl.value;
        }
    }

    // validasi
    if (!estimasiTanggal) {
        warningpopup('error', 'Silahkan isi tanggal estimasi bayar terlebih dahulu.');
        return;
    }
    // 🔸 kalau user role = board → wajib isi CoA di tiap item yang dicentang
    if (role === "board") {
        // Ambil semua input CoA di card order ini
        const coaInputs = Array.from(document.querySelectorAll(`#orderDetail${order.id} .coa-input`));
        let validCoA = true;
        // Mapping item yang dicentang
        datalistrequest = datalistrequest.map(item => {
            // Cari input CoA yang punya data-id sama
            const input = coaInputs.find(el => el.dataset.id === String(item.id));
            const kodecoa = input ? input.value.trim() : "";
            // Validasi wajib isi
            if (!kodecoa) {
                validCoA = false;
            }
            return {
                ...item,
                kodecoa, // simpan CoA baru
            };
        });

        if (!validCoA) {
            warningpopup('error', 'Silahkan isi semua Kode CoA sebelum melanjutkan.');
            return;
        }
    }

    // Konversi ke timestamp milliseconds
    const estimasiTimestamp = new Date(estimasiTanggal).getTime();

    // Update setiap item di datalistrequest
    datalistrequest = datalistrequest.map(item => {
        // parse data lama kalau ada
        const approvalObj = item.approvalorreject ? JSON.parse(item.approvalorreject) : {};
        const tglmiliObj = item.tglmili_approval ? JSON.parse(item.tglmili_approval) : {};
        const approverObj = item.approver ? JSON.parse(item.approver) : {};
        const noteObj = item.note_approver ? JSON.parse(item.note_approver) : {};

        // isi semua role default "" kalau belum ada
        const roles = ["procurement", "finance", "supervisor", "board"];
        roles.forEach(r => {
            if (!(r in approvalObj)) approvalObj[r] = "";
            if (!(r in tglmiliObj)) tglmiliObj[r] = "";
            if (!(r in approverObj)) approverObj[r] = "";
            if (!(r in noteObj)) noteObj[r] = "";
        });

        // update hanya role aktif
        approvalObj[role] = status === "reject" ? "false" : "true";
        tglmiliObj[role] = Date.now();
        approverObj[role] = namalengkap || "";
        noteObj[role] = "";

        return {
            ...item,
            approvalorreject: JSON.stringify(approvalObj),
            tglmili_approval: JSON.stringify(tglmiliObj),
            approver: JSON.stringify(approverObj),
            note_approver: JSON.stringify(noteObj),
        };
    });




    console.log('Array full item yang dipilih (sudah update estimasi_bayar_mili):', datalistrequest);

    actionMode = status; // "approved" atau "reject"

    // masukkan data ke modal
    const container = document.getElementById("itemsContainer-modalapprovalrequest");
    container.innerHTML = datalistrequest.map(item => `
      <div class="col-12">
        <div class="p-2 border rounded bg-light small">
          <strong>${item.item}</strong>
        </div>
      </div>
    `).join('');

    // judul modal dinamis
    document.getElementById('modalapprovalrequestlabel').textContent =
        status === "approved" ? "Konfirmasi Approval" : "Konfirmasi Reject";

    // tampilkan modal
    const modalEl = new bootstrap.Modal(document.getElementById('modalapprovalrequest'));
    modalEl.show();
}

// tombol "Tidak" – tutup modal + uncheck
document.getElementById('reject-modalapprovalrequest').addEventListener('click', () => {
    // uncheck semua checkbox select-item
    document.querySelectorAll('.select-item:checked').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[id^="estimasi-modalrequest"]').forEach(input => input.value = '');

    // tutup modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalapprovalrequest'));
    modal.hide();

    // kosongkan array
    datalistrequest = [];
});

// tombol "Iya" – proses sesuai actionMode
document.getElementById('approve-modalapprovalrequest').addEventListener('click', () => {
    // fungsi generate id_request khusus untuk datalistrequest
    function generateIdRequestForList(list) {
        const monthLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
        // Pastikan window.dataall.datarequestbeli_proc ada
        const existingData = (window.dataall && window.dataall.datarequestbeli_proc) || [];
        // 🔍 Ambil data dengan id_request valid
        const validExisting = existingData.filter(item => item.id_request && item.id_request.trim() !== '');
        // Ambil bulan & tahun dari item pertama (boleh disesuaikan jika beda bulan)
        const now = new Date();
        const currentMonthLetter = monthLetters[now.getMonth()];
        const currentYear = now.getFullYear();
        // 🔢 Ambil semua nomor urut dari id_request yang cocok dengan bulan-tahun sekarang
        const existingNumbers = validExisting
            .filter(item => item.id_request.startsWith(currentMonthLetter) && item.id_request.endsWith(`-${currentYear}`))
            .map(item => parseInt(item.id_request.slice(1, 5))) // contoh: "K0001-2025" -> 1
            .sort((a, b) => a - b);
        // Nomor terakhir
        let lastNumber = existingNumbers.length ? existingNumbers[existingNumbers.length - 1] : 0;
        // 💡 Generate ID untuk list baru
        const updatedList = list.map((item) => {
            // Ambil tanggal input untuk menentukan kode bulan
            const tgl = new Date(parseInt(item.tglinputmili));
            const monthLetter = monthLetters[tgl.getMonth()];
            const year = tgl.getFullYear();

            // Generate hanya kalau kosong
            if (!item.id_request || item.id_request.trim() === '') {
                lastNumber += 1; // naikkan nomor urut
                const noUrut = String(lastNumber).padStart(4, '0');
                item.id_request = `${monthLetter}${noUrut}-${year}`;
                console.log(`✅ Generated ID for "${item.item}" → ${item.id_request}`);
            } else {
                console.log(`ℹ️ ID already exists for "${item.item}": ${item.id_request}`);
            }
            return item;
        });
        return updatedList;
    }

    if (actionMode === "approved") {
        const data = generateIdRequestForList(datalistrequest)
        const updatedData = data.map(item => ({
            ...item,
            estimasi_bayar_mili: new Date(estimasiTanggal).getTime(),
        }));
        fixsend(updatedData, "approved")
    } else if (actionMode === "reject") {
        console.log("Proses REJECT untuk:", generateIdRequestForList(datalistrequest));
        fixsend(generateIdRequestForList(datalistrequest), "reject")
    }

    // uncheck semua checkbox select-item setelah action
    document.querySelectorAll('.select-item:checked').forEach(cb => cb.checked = false);
    datalistrequest = [];
});
//tutup get id transaksi

var fixsendflag = 0;
function fixsend(data, status) {
    fixsendflag = 1;
    hidemodal('modalapprovalrequest');
    loadingpopup();
    fetch('/procurement/approveorreject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify({ datalistrequest: data })
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

                    if (resdat.icons == 'success') {
                        warningpopup('success', resdat.text);
                        location.reload();
                        // if (resdat.id_request != alldatakirim.id_request) {
                        //     alldatakirim.id_request = resdat.id_request;
                        // }
                        // socket.emit('approvereqbeli', alldatakirim);

                    } else {
                        warningpopup('error', resdat.text);
                        //document.getElementById(`klikapprovalreq-${indexklik}`).innerHTML = 'Approval';
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



/// CREATE LIST ///
var coalists_element;
function createlist(index = 1) {
    var dataarray = window.dataall;

    ////// keterangan ////////////////
    var fixcoa = [];
    for (let i = 0; i < dataarray.database_coa.length; i++) {
        let element = dataarray.database_coa[i];
        if (fixcoa.indexOf(element) === -1) {
            fixcoa.push(element);
        }
    }
    coalists_element = returnarraydata(fixcoa);
    document.getElementById(`listcoa`).innerHTML = coalists_element;

}


// ==== RETURN OPTION GENERATORS ====
// semua pakai innerText biar tampil di dropdown
function returnarraydata(array) {
    return array.map(function (element) {
        return `<option value="${element.kode}">${element.keterangan}</option>`;
    }).join('');
}
/// TUTUP CREATE LIST ///


//
$('#modalapprovalrequest').on('hidden.bs.modal', function (e) {
    // do something...
    if (fixsendflag != 1) {

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