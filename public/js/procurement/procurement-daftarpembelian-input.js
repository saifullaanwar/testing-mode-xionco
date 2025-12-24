var username;
var namalengkap;
var office;
var role;
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
    scrolltobuttonsidebar();

    DOMawalkanan();
    fetchdata();

});

document.getElementById("setting-button").addEventListener("shown.bs.dropdown", () => {
    actionsetting();
});
document.getElementById('date-input-kiri').value = getTodayString();

var dataall = [];
let flagLooping = 1
function fetchdata() {
    fetch('/api/daftarpembelian/request')
        .then(res => res.json())
        .then(data => {
            window.dataall = data;
            console.log('datalls =================000=', window.dataall)
            document.getElementById('showmainpage').removeAttribute('style');
            document.getElementById('loadingskeleton').setAttribute('style', 'display:none;');
            // worker_threads(data);
            //showtabel(data.datarequestbeli_proc);
            var dataarray = window.dataall;
            //dataall = dataarray.proc_temp_kiri_inputplan

            setselekvendor();
            setselekOffice();
            creatlistiemprocawal_input();

            showtabel_right_top();
            showtabel_right_bottom();
            showtabelinvestor(window.dataall.dataadminlist);

            //filterDateKiri(); // langsung filter otomatis


            //populateInputs(dataarray)
            //tabPrasarana(dataarray)
            Swal.close();
            phasesave_flag = false;

            setTimeout(function () {

                //hitungtugassaya_universal();
                document.getElementById('showmainpage').classList.remove('d-none');
                document.getElementById('loadingskeleton').classList.add('d-none');

            }, 500);

        })
        .catch(err => {
            console.error('Gagal ambil dataall:', err);
        });
}
///////////
function getTodayString() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}
function loadingbawahupdate() {
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
                    //showtabel(array);

                    filterDateKiri();

                    showtabel_right_top();
                    showtabel_right_bottom();


                    showtabelinvestor(window.dataall.dataadminlist);


                    Swal.close();

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
    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newquickedititemadminlist');
        }

    }

    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

/* socket.on('neweditforcestatus',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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
                    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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
    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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


            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('neweaddreqbeli', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    dataarray.datarequestbeli_proc.push(...datas);

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

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

            window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);

});

//updateMproses
socket.on('updateMproses', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    dataarray.datarequestbeli_proc.forEach(element => {
        if (element.no === datas.no) {
            element.tglmili_proses_bayar = datas.tglmili_proses_bayar;
            element.proses_bayar = datas.proses_bayar;
            element.user_proses_bayar = datas.user_proses_bayar;
            element.phase_tindak = datas.phase_tindak;
            element.tindakbayar = datas.tindakbayar;
            element.totalterbayar = datas.totalterbayar;
            element.totalprosesbayar = datas.totalprosesbayar;

            element.status_tersisa = datas.status_tersisa;
            element.check_bayar = datas.check_bayar;
            element.old_sisa = datas.old_sisa;
            element.now_sisa = datas.now_sisa;
            /* if (datas.proses_bayar!='true') {
                element.phase_tindak=0;
                element.tindakbayar='';
            } */

        }
    });

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.datarequestbeli_proc);
});
//updateMproses

//editphase
socket.on('editphase', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    if (phasesave_flag == false) {
        for (const element of datas) {
            var dataupdates = dataarray.datarequestbeli_proc.find((item) => item.no === element.no);
            if (dataupdates) {
                dataupdates.phase_tindak = element.phase_tindak;
            }
        }
        console.log('👒 dataarray.datarequestbeli_proc', dataarray.datarequestbeli_proc[0])
        window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

        loadingbawahupdate(dataarray.datarequestbeli_proc);
    }

});
//editphase

//editphasenote
socket.on('editphasenote', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    dataarray.datarequestbeli_proc.forEach(element => {
        if (element.no === datas.no) {
            element.note_bayar = datas.note_bayar;
        }
    });

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.datarequestbeli_proc);
});
//editphasenote

//updatez_saveeditrightbottom
socket.on('updatez_saveeditrightbottom', function (datas) {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc

    dataarray.datarequestbeli_proc.forEach(element => {
        if (element.no === datas.no) {
            element.z_qty = datas.z_qty;
            element.totalprice = datas.totalprice;
            element.lokasiterima = datas.lokasiterima;
            element.vendor = datas.vendor;
            element.pendingpayment = datas.pendingpayment;
            element.z_qty = datas.z_qty;
            element.note_approver = JSON.stringify(datas.note_approver);
        }
    });

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.datarequestbeli_proc);
});
//updatez_saveeditrightbottom

//updateprocprasaranatab

//updatePengingat
socket.on('updatePengingat', function (datas) {
    var dataarray = window.dataall;
    let dataItem = dataarray.proc_pengingat_input[0];

    const fieldToUpdate = datas.e;
    const newValue = datas.no;

    // Extract the prefix and index from the field name (e.g., check1, value2)
    const fieldPrefix = fieldToUpdate.slice(0, -1);  // Get "check", "value", etc.
    const index = fieldToUpdate.slice(-1);  // Get the last digit (e.g., 1, 2, etc.)
    const fieldName = `${fieldPrefix}${index}`;  // Construct full field name (e.g., "check1", "value2")

    // Check if the field exists in the dataItem
    if (dataItem.hasOwnProperty(fieldName)) {
        // Update the field with the new value
        dataItem[fieldName] = newValue;
        // Optionally, re-render or update the UI


    } else {
        console.error("Field does not exist:", fieldName);
    }

    // Update the global data
    window.dataall = dataarray;
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

//updatePengingat

//tutup socket io

///////////////////////////////////////// fungsi dasar /////////////////////

function showcardKiri(status) {
    const wrapper = document.querySelector('.list-view-wrapper');
    const cardKiri = document.getElementById('card-kiri');
    const cardKanan = document.getElementById('card-kanan'); // Asumsi selector untuk card-kanan, sesuaikan jika berbeda

    if (!cardKiri || !cardKanan) {
        console.error('Elemen card-kiri atau card-kanan tidak ditemukan.');
        return;
    }

    // Tambahkan transisi CSS untuk animasi smooth
    cardKiri.style.transition = 'width 0.5s ease-in-out';
    cardKanan.style.transition = 'width 0.5s ease-in-out';

    if (status === 'show') {

        cardKiri.style.display = '';
        // Show card-kiri: melebar dari kiri ke kanan hingga width 100%
        cardKiri.style.width = '0%'; // Mulai dari 0 untuk animasi
        cardKanan.style.width = '100%'; // Mulai dari 100% untuk persiapan

        document.getElementById('floating-sidebar-toggle').classList.add('d-none');

        document.getElementById('vendorFilter').classList.add('d-none');
        document.getElementById('itemFilter').classList.add('d-none');

        setTimeout(() => {
            cardKiri.style.width = '100%';
            cardKanan.style.width = '65%';
            if (wrapper) { wrapper.classList.add('list-half-mode'); wrapper.classList.remove('list-full-mode'); wrapper.classList.remove('list-full-100'); }
        }, 5); // Delay kecil untuk memulai animasi
    } else {
        // Hide card-kiri: mengecil dari kanan ke kiri hingga hilang
        cardKiri.style.width = '100%'; // Mulai dari 100% untuk animasi
        cardKanan.style.width = '65%'; // Mulai dari 65% untuk persiapan

        document.getElementById('floating-sidebar-toggle').classList.remove('d-none');

        document.getElementById('vendorFilter').classList.remove('d-none');
        document.getElementById('itemFilter').classList.remove('d-none');

        setTimeout(() => {
            cardKiri.style.width = '0%';
            cardKanan.style.width = '100%';
            if (wrapper) {
                wrapper.classList.remove('list-half-mode');
                if (document.getElementById('klikhidebar').className != 'bi bi-caret-left-fill toggle-btn') {

                    wrapper.classList.add('list-full-mode');
                    wrapper.classList.add('list-full-100');
                } else {

                    wrapper.classList.add('list-full-mode');
                }
            }
        }, 5); // Delay kecil untuk memulai animasi

        // Setelah animasi selesai, sembunyikan sepenuhnya
        setTimeout(() => {
            cardKiri.style.display = 'none';

        }, 500); // Sesuaikan dengan durasi transisi
    }
}


//set select vendor
var listvendorAll = '';
function setselekvendor() {

    //document.getElementById('vendor-datalistOptions').innerHTML='';//add item pop-up
    document.getElementById('vendorFilter-datalist').innerHTML = '';
    document.getElementById('vendor-modaldetailinputedit-datalistOptions').innerHTML = '';//edit item pop-up
    var dataarray = window.dataall.databaseitem_proc;
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).databaseitem_proc;//data item procurement
    const vendorSet = new Set(dataarray.map(item => item.vendor));
    const vendorArray = Array.from(vendorSet);

    vendorArray.sort();
    console.log('vendorArray');
    console.log(vendorArray);

    listvendorAll = returnarrayvendor(vendorArray);

    //document.getElementById('vendor-datalistOptions').innerHTML=listvendorAll;
    document.getElementById('vendor-modaldetailinputedit-datalistOptions').innerHTML = listvendorAll;
    document.getElementById('vendorFilter-datalist').innerHTML = listvendorAll;
}
function returnarrayvendor(array) {

    return array.map(function (element, index) {
        return `
            <option value="${element}">
        
        `;
    }).join('');
}
//tutup set select vendor


//set select lokasi
var listLokasiterima = '';
function setselekOffice() {

    document.getElementById('listoffice-modaldetailinputedit-datalistOptions').innerHTML = '';//edit item pop-up
    var dataarray = window.dataall.database_office;

    const officeset = new Set(dataarray.map(item => item.office));
    const officeArray = Array.from(officeset);

    officeArray.sort();
    console.log('officeArray');
    console.log(officeArray);

    listLokasiterima = returnarrayoffice(officeArray);

    //document.getElementById('vendor-datalistOptions').innerHTML=listvendorAll;
    document.getElementById('listoffice-modaldetailinputedit-datalistOptions').innerHTML = listLokasiterima;
}
function returnarrayoffice(array) {

    return array.map(function (element, index) {
        return `
            <option value="${element}">
        
        `;
    }).join('');
}
//tutup set select lokasi


//buat list item procurement
var listitemprocawal_input;
function creatlistiemprocawal_input() {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log(dataarray.databaseitem_proc);
    var datas = dataarray.databaseitem_proc;

    // Hapus duplikat berdasarkan item
    const uniqueItems = Array.from(
        new Map(datas.map(item => [item.item.toLowerCase(), item])).values()
    );
    // Urutkan berdasarkan property 'item' A-Z
    uniqueItems.sort((a, b) => a.item.localeCompare(b.item));


    listitemprocawal_input = returarrayitemproc_input(uniqueItems);
    document.getElementById('itemFilter-datalist').innerHTML = listitemprocawal_input;

}

function returarrayitemproc_input(array) {
    console.log('creatlistiemprocawal_input=========', array);
    return array.map(function (element) {
        return `
        <option value="${element.item}">
        `;
    }).join('');
}
//


///////////////////////////////////////// end fungsi dasar /////////////////////









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

    //document.getElementById('main-pages').setAttribute('style', `max-height:${heigfix}px!important;overflow-y: scroll!important;overflow-x: hidden!important;`);

}
//------------------------------------
function hidemodal(modalid) {

    var myModalEl = document.getElementById(modalid);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}
///--------------------------------