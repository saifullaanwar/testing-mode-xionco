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


    const dateFormatter = new CustomDateFormatter(Date.now());
    const formattedDate = dateFormatter.format('namahari, dd mon yyyy');
    console.log(formattedDate); // Output example: "Senin, 09 Sep 2025"
    document.getElementById("fulldate-gahara").textContent = formattedDate;
    document.getElementById("fulldate-prasarana").textContent = formattedDate;


    fetchdata();
});

function fetchdata() {
    fetch('/api/daftarpembelian/request')
        .then(res => res.json())
        .then(data => {
            window.dataall = data;
            console.log('datalls =================000=', window.dataall)
            document.getElementById('showmainpage').removeAttribute('style');
            document.getElementById('loadingskeleton').setAttribute('style', 'display:none;');
            // worker_threads(data);
            // additemdropfilter(data.itemsdata);
            showtabel(data.datarequestbeli_proc);
            var dataarray = window.dataall;

            populateInputs(dataarray)
            tabPrasarana(dataarray)
            Swal.close();

        })
        .catch(err => {
            console.error('Gagal ambil dataall:', err);
        });
}

function updateRealtimeDate() {
    // Get current date and time
    const now = new Date();

    // Get day of the month (10th, 11th, etc.)
    const day = now.getDate();

    // Get current month and year (e.g., "August 2025")
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();

    // Update the day and month elements in the table
    document.getElementById('dayrealtime').textContent = day;
    document.getElementById('monthrealtime').textContent = `${month} ${year}`;
}

// Call the function initially to set the date and time
updateRealtimeDate();

// Update every minute (60000 ms)
setInterval(updateRealtimeDate, 60000);


// Call the function initially to set the date and time


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
            element.phase_tindak=datas.phase_tindak;
            element.tindakbayar=datas.tindakbayar;
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
    dataarray.datarequestbeli_proc.forEach(element => {
        if (element.no === datas.no) {
            element.phase_tindak = datas.phase_tindak;
        }
    });

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.datarequestbeli_proc);
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

//updateprocprasaranatab
socket.on('updateprocprasaranatab', function (datas) {
    var dataarray = window.dataall;

    // datarequestbeli_proc
    dataarray.proc_prasarana_tab.forEach(element => {
        element.list_cashin = datas.list_cashin;
        element.list_deposit = datas.list_deposit;
        element.list_deposit_gahara = datas.list_deposit_gahara;
        element.list_prime = datas.list_prime;
    });
    console.log(dataarray);

    window.dataall = dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

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

/////////////////////////////show tabel bawah////////////////////////////////
function showtabel(array) {
     //setting tinggi max kolom atas
        var h_kolom1=document.getElementById('kolom-1').offsetHeight;
        document.getElementById('kolom-2').style.maxHeight=`${h_kolom1}px`;
        document.getElementById('kolom-3').style.maxHeight=`${h_kolom1}px`;

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

    showtabel_atas();
    var dataarray = window.dataall;
    console.log(dataarray);

    populateInputs(dataarray);
    tabPrasarana(dataarray);

    setTimeout(function () {
        hitungtugassaya_universal();
        //hitungtotaltersisa();//hitung total tersisa
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style', 'display:none;');

       

    }, 500);
}

function returnarray(array) {

    var fixarray = array.filter((el) => el.approvalorreject == 'true'&&el.tindakbayar!='true');
    // sort agar pendingpayment=true muncul dulu
    fixarray.sort((a, b) => a.vendor.localeCompare(b.vendor));
    /* fixarray.sort((a, b) => {
        // urutkan pendingpayment 'true' duluan
        if (a.pendingpayment === 'true' && b.pendingpayment !== 'true') return -1;
        if (a.pendingpayment !== 'true' && b.pendingpayment === 'true') return 1;

        // kalau sama-sama true atau sama-sama false, urutkan berdasarkan vendor
        return a.vendor.localeCompare(b.vendor);
    }); */

    return fixarray.map((el, index) => {
        const Date_Req = new CustomDateFormatter(Number(el.tglinputmili)); // Ganti dengan milidetik
        var date_request = Date_Req.format('dd mon yyyy');

        return `
            <tr>
                <td style="text-align: center;vertical-align: middle;">${date_request}</td>
                <td style="text-align: left;vertical-align: middle;">${el.item}</td>
                <td style="text-align: left;vertical-align: middle;">${el.pendingpayment == "false" || el.pendingpayment == "" ? '' : 'pending'}</td>
                <td style="text-align: left;vertical-align: middle;">${el.qty}</td>
                <td style="text-align: left;vertical-align: middle;">${el.unit}</td>
                <td style="text-align: left;vertical-align: middle;">${el.vendor}</td>
                <td style="text-align: left;vertical-align: middle;"></td>
                <td style="text-align: left;vertical-align: middle;">${formatMoney(el.totalprice)}</td>
                <td style="text-align: center;vertical-align: middle;"> <input type="checkbox" onclick="klikMproses(this,'${el.no}','${el.vendor}')" ${el.proses_bayar == 'true' ? 'checked' : ''}></td>
                <td style="text-align: center;vertical-align: middle;">
                    <textarea disabled class="form-control" placeholder="Leave a comment here"  style="min-height: 80px;font-size:11px;">Requester: ${el.note_req == '' ? '......' : el.note_req}\n\nProcurement: ${el.note_approver == '' ? '......' : el.note_approver}</textarea>
                </td>
                <td style="text-align: center;vertical-align: middle; font">
                  
                    <span class="badge text-bg-primary" style="cursor: pointer; font-size: 11px;" onclick="klikedit(${el.no})">Edit</span>
                </td>
            </tr>
        `;
    }).join('');
}
/////////////////////////////end show tabel bawah///////////////////////////////////


////////////show tabel atas//////////////////////////////////////
var datatabel_atas = [];
function showtabel_atas() {
    datatabel_atas.length = 0;
    var datarequestbeli_proc = window.dataall.datarequestbeli_proc;
    var databasevendor_proc = window.dataall.databasevendor_proc;

    // step 1: filter data
    let filtered = datarequestbeli_proc.filter(d => d.proses_bayar === "true" && d.tindakbayar !== "true");

    // step 2: group by vendor
    let grouped = {};
    filtered.forEach(d => {
        if (!grouped[d.vendor]) {
            grouped[d.vendor] = [];
        }
        grouped[d.vendor].push(d);
    });

    // step 3: buat array baru sesuai format
    let newarray = Object.keys(grouped).map(vendorName => {
        let listdata = grouped[vendorName];
        let total = listdata.reduce((sum, item) => sum + item.totalprice, 0);

        // cari vendor di databasevendor_proc
        let vendorInfo = databasevendor_proc.find(v => v.vendor === vendorName) || {};

        // tentukan phase_tindak induk
        let phase_tindak_induk = 0;
        for (let item of listdata) {
            let val = parseInt(item.phase_tindak || 0);
            if (val > 0) {
                phase_tindak_induk = val;
                break; // cukup ambil yang pertama >0
            }
        }

        // // update semua listdata dengan nilai induk
        // listdata.forEach(item => {
        //     item.phase_tindak = phase_tindak_induk;
        // });

        // tentukan note_bayar induk
        let note_bayar_induk = "";
        for (let item of listdata) {
            if (item.note_bayar && item.note_bayar.trim() !== "") {
                note_bayar_induk = item.note_bayar;
                break;
            }
        }

        listdata.forEach(item => {
            item.phase_tindak = phase_tindak_induk;
            item.note_bayar = note_bayar_induk;
        });

        return {
            vendor: vendorName,
            listdata: listdata,
            atas_nama: vendorInfo.atas_nama || "",
            rekening: vendorInfo.rekening || "",
            tipe_bayar: vendorInfo.tipe_bayar || "",
            total: total,
            phase_tindak: phase_tindak_induk,//listdata[0].phase_tindak ? Number(listdata[0].phase_tindak) : 0,
            note_bayar: note_bayar_induk//listdata[0].note_bayar ? listdata[0].note_bayar : '',
        };
    });

    /* // Iterasi melalui newarray
    newarray.forEach(itemInduk => {
        // Dapatkan nilai phase_tindak dari objek induk
        const parentPhaseTindak = itemInduk.phase_tindak;

        // Jika listdata ada dan merupakan array, iterasi
        if (itemInduk.listdata && Array.isArray(itemInduk.listdata)) {
            itemInduk.listdata.forEach(itemAnak => {
                // Perbarui phase_tindak item anak
                itemAnak.phase_tindak = parentPhaseTindak;
            });
        }
    }); */

   

    newarray.sort((a, b) => {
        if (a.phase_tindak === 0) {
            return 1; // Jika a.phase_tindak nol, pindahkan a ke belakang
        }
        if (b.phase_tindak === 0) {
            return -1; // Jika b.phase_tindak nol, pindahkan b ke belakang (a tetap di depan)
        }
        return a.phase_tindak - b.phase_tindak; // Urutkan secara normal
    });

    console.log('newarray===++', newarray);
    datatabel_atas = newarray;

    var myobj = document.getElementById("divhpsdata-atas");
    if (myobj)
        myobj.remove();

    var myobj1 = document.getElementById("divhpsdatafooter-atas");
    if (myobj1)
        myobj1.remove();

    var datatab = document.getElementById(`alldattab-atas`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata-atas');

    var datatab1 = document.getElementById(`alldattab-atas1`);

    var divhapus1 = document.createElement("tfoot");
    divhapus1.setAttribute('id', 'divhpsdatafooter-atas');

    divhapus1.innerHTML = returnarraytfooter();

    divhapus.innerHTML = returnarray_tabelatas(newarray);

    datatab.appendChild(divhapus);
    datatab1.appendChild(divhapus1);

    const totalbill = newarray.reduce((sum, element) => sum + element.total, 0);
    document.getElementById('total-bill').innerHTML = formatMoney(totalbill);
    document.getElementById('qty-pendingpayment').innerHTML = qty_pendingpayment;

    //total-tindakbayar
    const totaltindakbayar = newarray.reduce((sum, element) => {
        return element.phase_tindak === Number(document.getElementById('phase-change-gahara').value) ? sum + element.total : sum;
    }, 0);
    document.getElementById('total-tindakbayar').innerHTML = formatMoney(totaltindakbayar);
    document.getElementById('pembelian-show').innerHTML = formatMoney(totaltindakbayar); 
    //


    //pending
    let totalHargaPending = 0;
    let totalHargaPending_all=[{phase_tindak:1,totalHargaPendingphase:0},{phase_tindak:2,totalHargaPendingphase:0},{phase_tindak:3,totalHargaPendingphase:0},{phase_tindak:4,totalHargaPendingphase:0},{phase_tindak:5,totalHargaPendingphase:0},{phase_tindak:6,totalHargaPendingphase:0}];
    let totalHargaPending_all_value=0;

    newarray.forEach(vendor => {
        vendor.listdata.forEach(item => {
            // Periksa apakah pendingpayment sama dengan string 'true'
            if (item.pendingpayment === 'true') {

                if (item.phase_tindak>0) {
                    if (item.phase_tindak === Number(document.getElementById('phase-change-gahara').value)) {
                    
                        totalHargaPending += item.totalprice;
                    }
                    
                    console.log('totalHargaPending_all',totalHargaPending_all);

                    totalHargaPending_all_value+= item.totalprice;
                    
                    totalHargaPending_all[item.phase_tindak-1].totalHargaPendingphase=totalHargaPending_all_value;

                    console.log('totalHargaPending_all_value',totalHargaPending_all_value);
                    
                    document.getElementById(`pending-${item.phase_tindak}-show`).innerHTML = formatMoney(totalHargaPending_all[item.phase_tindak-1].totalHargaPendingphase);
                }

                
            }
        });
    });
    document.getElementById('pending-show').innerHTML = formatMoney(totalHargaPending); 


}

function returnarraytfooter() {
    return `
        <tr>
            <th scope="col"
                style="text-align: left;vertical-align: middle;">
                </th>
            <th scope="col"
                style="text-align: left;vertical-align: middle;">
                </th>
            <th scope="col"
                style="text-align: left;vertical-align: middle;">
                </th>
            <th scope="col"
                style="text-align: left;vertical-align: middle;">
                </th>
            <th scope="col"
                style="text-align: left;vertical-align: middle;">
                </th>
            <th scope="col"
                style="text-align: left;vertical-align: middle; width: 8%;" id="total-bill">
                </th>
            <th scope="col"
                style="text-align: left;vertical-align: middle; width: 5%;" id="qty-Mproses">
                </th>
            <th scope="col"
                style="text-align: left;vertical-align: middle; width: 5%;" id="qty-bill">
                </th>
            <th scope="col"
                style="text-align: left; vertical-align: middle; width: 4%;"  id="qty-pendingpayment">
                </th>
            <th scope="col"
                style="text-align: center;vertical-align: middle; width: 10%;" id="total-tindakbayar">0</th>
            <th scope="col" style="text-align: center;vertical-align: middle; width: 20%;">
                <span class="badge text-bg-secondary" style="font-size:11px;cursor: pointer;">Tindak</span>
            </th>
        </tr>
                                                                                
    `
}

var qty_pendingpayment = 0;
function returnarray_tabelatas(array) {
    qty_pendingpayment = 0;

    var html= array.map((element, index) => {
        let checkPP = element.listdata.some(el => el.pendingpayment === "true");
        qty_pendingpayment += checkPP ? 1 : 0;

        var bgcolor='';
        var colorinputphase='';

        if (element.phase_tindak>0) {
            // if (element.phase_tindak==1) {
            //     bgcolor='background-color: rgb(249, 236, 213);';
            //     //colorinputphase='color: white;';
            // }else if (element.phase_tindak==2) {
            //     bgcolor='background-color: rgb(248, 224, 181);';
            //     //colorinputphase='color: white;';
            // }else{
            //     bgcolor='background-color: rgb(246, 208, 144);';
            //     //colorinputphase='color: white;';
            // }
            bgcolor='background-color: black;color: white;';
            colorinputphase='color: white;';
            
        }

        return `
            <tr>
                <td style="text-align: left;vertical-align: middle;${bgcolor}">${element.vendor}</td>
                <td style="text-align: left;vertical-align: middle;${bgcolor}">${element.atas_nama}</td>
                <td style="text-align: left;vertical-align: middle;${bgcolor}">${element.rekening}</td>
                <td style="text-align: left;vertical-align: middle;${bgcolor}">${element.tipe_bayar}</td>

                <td style="text-align: left;vertical-align: middle;${bgcolor}">${formatMoney(element.total)}</td>
                <td style="text-align: left;vertical-align: middle;${bgcolor}"><input type="checkbox"></td>
                <td style="text-align: left;vertical-align: middle;${bgcolor}"><input type="checkbox"></td>
                <td style="text-align: left;vertical-align: middle;${bgcolor}"><input type="checkbox" disabled ${checkPP ? 'checked' : ''}></td>
                <td style="text-align: center;vertical-align: middle;${bgcolor}"><input type="number" class="form-control form-control-sm nospinner" style="width:50px;font-size:11px;text-align: center;background-color: transparent;border-color:transparent;${colorinputphase}" min="1" max="5" placeholder="-" onblur="editphase('${element.vendor}','${index}',this)" value="${element.phase_tindak==0?'':element.phase_tindak}"></td>

                <td style="text-align: center;vertical-align: middle;${bgcolor}"><input type="text" class="form-control form-control-sm" style="font-size:11px;text-align: center;background-color: transparent;border-color:transparent;${colorinputphase}" placeholder="-" onblur="note_phase('${element.vendor}','${index}',this)" value="${element.note_bayar}"></td>
            </tr>
        `;

    }).join('');

    var dummys=[1,2,3,4,5,6,7,8];
    var htmlsdummy= dummys.map((item)=>{
        return `
            <tr>
                <td style="text-align: left;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;">-</td>
                <td style="text-align: left;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;">-</td>
                <td style="text-align: left;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;">-</td>
                <td style="text-align: left;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;">-</td>

                <td style="text-align: left;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;">-</td>
                <td style="text-align: left;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;"><input type="checkbox" disabled></td>
                <td style="text-align: left;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;"><input type="checkbox" disabled></td>
                <td style="text-align: left;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;"><input type="checkbox" disabled></td>
                <td style="text-align: center;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;"><input type="number" class="form-control form-control-sm nospinner" style="width:50px;font-size:11px;text-align: center;background-color: transparent;border-color:transparent;" min="1" max="5" placeholder="-" disabled></td>

                <td style="text-align: center;vertical-align: middle;background-color:#f8f8f8;color:#f8f8f8;"><input type="text" class="form-control form-control-sm" style="font-size:11px;text-align: center;background-color: transparent;border-color:transparent;" placeholder="-" disabled></td>
            </tr>
        `;
    }).join('');

    return html+htmlsdummy;
}

////////////end show tabel atas//////////////////////////////////////


/////////////////////////////////////////////////editphase atas////////////////////////
function editphase(vendor, index, e) {
    var dataeditphase = datatabel_atas[Number(index)];

    console.log('dataeditphase===++==---', dataeditphase);

    var listdata = dataeditphase.listdata;


    listdata.forEach(item => item.phase_tindak = Number(e.value));


    console.log('listdata===++==---', listdata);

    var data =listdata;

    fetch('/procurement/editphase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(resdat => {
        console.log('resdat');
        console.log(resdat);

        if (resdat.icons == 'success') {
            
            socket.emit('editphase', data);
            
        } else {
            warningpopup('error', 'gagal save phase');
            
        }
    })
    .catch(error => {
        console.error('Error:', error);
        warningpopup('error', 'error catch : ' + error);
    });
}
/////////////////////////////////////////////////end editphase atas////////////////////////


///////////////////////////////////////////////// note_phase atas////////////////////////
function note_phase(vendor, index, e) {
     var dataeditphase_note = datatabel_atas[Number(index)];

    console.log('dataeditphase_note===++==---', dataeditphase_note);

    var listdata = dataeditphase_note.listdata;


    listdata.forEach(item => item.note_bayar = e.value);


    console.log('listdata===++==---', listdata);

    var data =listdata;

    fetch('/procurement/editphasenote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(resdat => {
        console.log('resdat');
        console.log(resdat);

        if (resdat.icons == 'success') {
            
            socket.emit('editphasenote', data);
            
        } else {
            warningpopup('error', 'gagal save phase note');
            
        }
    })
    .catch(error => {
        console.error('Error:', error);
        warningpopup('error', 'error catch : ' + error);
    });
}
/////////////////////////////////////////////////end note_phase atas////////////////////////




/////////////////////////////////////////////////tabel bawah////////////////////////
function klikedit(no) {

    var arrayinput = ['divisi-modaldetailinputedit-1', 'qty-modaldetailinputedit-1', 'hargaunitsave-modaldetailinputedit-1', 'vendor-modaldetailinputedit-1', 'bank-modaldetailinputedit-1', 'lokasiterima-modaldetailinputedit-1'];

    arrayinput.forEach(element => {
        document.getElementById(element).classList.remove('is-invalid')
    });


    var dataitemx = window.dataall.datarequestbeli_proc.find((el) => el.no == no);
    console.log('klikedit_details');
    console.log(dataitemx);

    document.getElementById('dataedit-items').dataset.json = JSON.stringify(dataitemx);

    document.getElementById('tipeitem-modaldetailinputedit').innerHTML = dataitemx.tipeitem.toLowerCase() == 'regular' ? 'Regular Item' : 'New Item';

    document.getElementById('notransaksishow-modaldetailinputedit-1').value = dataitemx.id_request.split('-')[0];

    document.getElementById('notransaksisave-modaldetailinputedit-1').value = dataitemx.id_request;

    document.getElementById('namabarang-modaldetailinputedit-1').value = dataitemx.item;

    document.getElementById('divisi-modaldetailinputedit-1').value = dataitemx.itemdivisi;

    setlistoffice();
    setselekvendor();
    listbank();

    document.getElementById('vendor-modaldetailinputedit-1').value = dataitemx.vendor;

    document.getElementById('bank-modaldetailinputedit-1').value = dataitemx.bank;

    document.getElementById('namarequester-modaldetailinputedit-1').value = namalengkap;

    document.getElementById('coa-modaldetailinputedit-1').value = dataitemx.kodecoa;
    var ketcoas = ambilketcoa(dataitemx.kodecoa);
    document.getElementById('ketcoa-modaldetailinputedit-1').value = ketcoas == undefined ? '-' : ketcoas;

    document.getElementById('lokasiterima-modaldetailinputedit-1').value = dataitemx.lokasiterima;

    document.getElementById('onoffpendingpayment-modaldetailinputedit').checked = dataitemx.pendingpayment == 'true' ? true : false;

    document.getElementById('qty-modaldetailinputedit-1').value = dataitemx.qty;

    document.getElementById('zqty-modaldetailinputedit-1').value = dataitemx.z_qty;

    var tipeitemx = document.getElementById('tipeitem-details').innerHTML;

    console.log('tipeitemx');
    console.log(tipeitemx);

    if (tipeitemx.toLowerCase() == 'regular') {
        document.getElementById('hargaunitshow-modaldetailinputedit-1').classList.remove('d-none');
        document.getElementById('hargaunitsave-modaldetailinputedit-1').classList.add('d-none');
        document.getElementById('hargaunitsave-modaldetailinputedit-1').disabled = true;
        console.log('reg');
        console.log(tipeitemx);
    } else {
        document.getElementById('hargaunitshow-modaldetailinputedit-1').classList.add('d-none');
        document.getElementById('hargaunitsave-modaldetailinputedit-1').classList.remove('d-none');
        document.getElementById('hargaunitsave-modaldetailinputedit-1').disabled = false;
        console.log('new i');
        console.log(tipeitemx);
    }

    document.getElementById('hargaunitshow-modaldetailinputedit-1').value = `Rp ${formatMoney(dataitemx.priceunit)}`;

    document.getElementById('hargaunitsave-modaldetailinputedit-1').value = dataitemx.priceunit;

    document.getElementById('totalshow-modaldetailinputedit-1').value = `Rp ${formatMoney(dataitemx.totalprice)}`;

    document.getElementById('totalsave-modaldetailinputedit-1').value = dataitemx.totalprice;

    document.getElementById('noterequester-modaldetailinputedit-1').value = dataitemx.note_req;

    document.getElementById('noteprocurement-modaldetailinputedit-1').value = dataitemx.note_approver;

    $('#modaldetailinputedit').modal('show');
}


//set select vendor
function setselekvendor() {
    document.getElementById('vendor-modaldetailinputedit-datalistOptions').innerHTML = '';
    var dataarray = window.dataall.databaseitem_proc; //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).databaseitem_proc;//data item procurement
    const vendorSet = new Set(dataarray.map(item => item.vendor));
    const vendorArray = Array.from(vendorSet);

    vendorArray.sort();
    console.log('vendorArray');
    console.log(vendorArray);

    var setvendor = returnarrayvendor(vendorArray);
    document.getElementById('vendor-modaldetailinputedit-datalistOptions').innerHTML = setvendor;
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
    document.getElementById('listoffice-modaldetailinputedit-datalistOptions').innerHTML = '';
    var dataarray = window.dataall.database_office;
    console.log(dataarray);

    var setoffice = returnarrayoffice(dataarray);
    document.getElementById('listoffice-modaldetailinputedit-datalistOptions').innerHTML = setoffice;
}
function returnarrayoffice(array) {
    return array.map(function (element, index) {
        return `
            <option value="${element.office}">
        
        `;
    }).join('');
}
//tutup set select vendor


function selekoffice(e) {
    oninputdata_modaldetailinputedit();
}
//end selek office


//oninputdata_modaldetailinputedit
var itemediting;
var flag_edit = 0;
function oninputdata_modaldetailinputedit() {
    var dataolds = JSON.parse(document.getElementById('dataedit-items').dataset.json);

    var id_request = document.getElementById('notransaksisave-modaldetailinputedit-1').value;

    var vendor_editing = document.getElementById('vendor-modaldetailinputedit-1').value;

    var bank_editing = document.getElementById('bank-modaldetailinputedit-1').value;

    var lokasiterima_editing = document.getElementById('lokasiterima-modaldetailinputedit-1').value;

    //z-qty
    var zqty_editing = document.getElementById('zqty-modaldetailinputedit-1').value;

    var qty_editing = document.getElementById('qty-modaldetailinputedit-1').value;

    var hargaunitsave_editing = document.getElementById('hargaunitsave-modaldetailinputedit-1').value;


    var totalharga_editing = zqty_editing == 0 || zqty_editing == '' ? qty_editing * hargaunitsave_editing : zqty_editing * hargaunitsave_editing;

    document.getElementById('totalsave-modaldetailinputedit-1').value = totalharga_editing;

    console.log('totalharga_editing===');
    console.log(totalharga_editing);

    document.getElementById('totalshow-modaldetailinputedit-1').value = `Rp ${formatMoney(totalharga_editing)}`;

    var noteprocurement_editing = document.getElementById('noteprocurement-modaldetailinputedit-1').value;

    //pending payment
    var pendingpayment_editing = document.getElementById('onoffpendingpayment-modaldetailinputedit').checked == true ? 'true' : 'false';

    var newhistory = [];
    if (dataolds.history_edit != '') {
        if (JSON.parse(dataolds.history_edit).length > 0) {
            newhistory = JSON.parse(dataolds.history_edit);
            newhistory.unshift({
                user: namalengkap,
                username,
                tgleditmili: new Date().getTime()
            });
        } else {
            newhistory = [{
                user: namalengkap,
                username,
                tgleditmili: new Date().getTime()
            }];
        }
    } else {
        newhistory = [{
            user: namalengkap,
            username,
            tgleditmili: new Date().getTime()
        }];
    }

    itemediting = {
        id_request,
        vendor: vendor_editing,
        bank: bank_editing,
        lokasiterima: lokasiterima_editing,
        z_qty: zqty_editing,
        priceunit: hargaunitsave_editing,
        totalprice: totalharga_editing,
        note_approver: noteprocurement_editing,
        pendingpayment: pendingpayment_editing,
        history_edit: JSON.stringify(newhistory)
    }

    console.log('itemediting ====');
    console.log(itemediting);
    const keysToCheck = ['vendor', 'lokasiterima', 'bank', 'z_qty', 'priceunit', 'totalprice', 'note_approver', 'pendingpayment'];

    for (let key of keysToCheck) {
        if (itemediting[key] !== dataolds[key]) {
            flag_edit = 1;
            break;
        }
    }
}

//tutup oninputdata_modaldetailinputedit

//save edit

function saveeditinputs() {
    const divisi = document.getElementById('divisi-modaldetailinputedit-1');
    const qty = document.getElementById('qty-modaldetailinputedit-1');
    const hargaUnit = document.getElementById('hargaunitsave-modaldetailinputedit-1');
    const vendor = document.getElementById('vendor-modaldetailinputedit-1');
    const bank = document.getElementById('bank-modaldetailinputedit-1');
    const lokasi = document.getElementById('lokasiterima-modaldetailinputedit-1');
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
        if (flag_edit == 1) {
            fixsendedit();
        }
        else {
            warningpopup('warning', 'tidak ada data yang berubah');;
        }
    }
}

function fixsendedit() {
    hidemodal('modaldetailinputedit');

    fetch('/procurement/saveeditinputproc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify({ itemediting })
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
                        //warningpopup('success','sukses add');
                        suksesandloading('success', 'sukses edit')
                        //socket.emit('approvereqbeli',additemreqproc);
                        //location.reload();

                        fetchdata();
                    } else {
                        warningpopup('error', 'gagal save edit');

                    }

                }, 800);
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'error catch : ' + error);
        });
}

/////tutup save edit
/////////////////////////////////////////////////end tabel bawah////////////////////////





/////////UPDATE PENGINGAT INPUT}////////////////
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) clearTimeout(timeoutId); // Clear the previous timeout
        timeoutId = setTimeout(() => {
            func(...args); // Call the function after the delay
        }, delay);
    };
}
// Set up the inputs based on the data array
function populateInputs(dataarray) {
    const raw = dataarray.proc_pengingat_input[0];

    // Loop untuk name1 - name6
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`pengingatupdate-name${i}`).value = raw[`name${i}`] || "";
    }

    // Loop untuk value1 - value6
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`pengingatupdate-value${i}`).value = raw[`value${i}`] || "";
    }
    for (let i = 1; i <= 6; i++) {
        const val = raw[`check${i}`];
        const bool = (val === true || val === "true" || val === 1 || val === "1");
        document.getElementById(`pengingatupdate-check${i}`).checked = bool;
    }
    const toBool = (v) => {
        if (typeof v === 'boolean') return v;
        if (typeof v === 'number') return v === 1;
        if (typeof v === 'string') {
            const s = v.trim().toLowerCase();
            if (['true', '1', 'yes', 'on'].includes(s)) return true;
            if (['false', '0', 'no', 'off', ''].includes(s)) return false;
        }
        return false; // default aman
    };

    // Arrays id elemen
    const checkboxes = [
        'pengingatupdate-check1', 'pengingatupdate-check2', 'pengingatupdate-check3',
        'pengingatupdate-check4', 'pengingatupdate-check5', 'pengingatupdate-check6'
    ];
    const names = [
        'pengingatupdate-name1', 'pengingatupdate-name2', 'pengingatupdate-name3',
        'pengingatupdate-name4', 'pengingatupdate-name5', 'pengingatupdate-name6'
    ];
    const values = [
        'pengingatupdate-value1', 'pengingatupdate-value2', 'pengingatupdate-value3',
        'pengingatupdate-value4', 'pengingatupdate-value5', 'pengingatupdate-value6'
    ];

    checkboxes.forEach((checkboxId, index) => {
        const checkbox = document.getElementById(checkboxId);
        const key = checkboxId.replace('pengingatupdate-', ''); // -> "check1", dst
        const isChecked = toBool(raw[key]);

        checkbox.checked = isChecked;

        const nameInput = document.getElementById(names[index]);
        const valueInput = document.getElementById(values[index]);

        // coret teks saat checked
        nameInput.style.textDecoration = isChecked ? 'line-through' : 'none';
        valueInput.style.textDecoration = isChecked ? 'line-through' : 'none';

        // kalau mau ikut disable, tinggal buka komentar ini:
        nameInput.disabled = isChecked;
        valueInput.disabled = isChecked;
    });
}



const inputFields = [
    'pengingatupdate-name1', 'pengingatupdate-name2', 'pengingatupdate-name3',
    'pengingatupdate-name4', 'pengingatupdate-name5', 'pengingatupdate-name6',
    'pengingatupdate-value1', 'pengingatupdate-value2', 'pengingatupdate-value3',
    'pengingatupdate-value4', 'pengingatupdate-value5', 'pengingatupdate-value6',
    'pengingatupdate-check1', 'pengingatupdate-check2', 'pengingatupdate-check3',
    'pengingatupdate-check4', 'pengingatupdate-check5', 'pengingatupdate-check6'
];

// Attach debounced listener to each input field
inputFields.forEach(field => {
    const fieldElement = document.getElementById(field);

    // Check if the element is a checkbox
    if (fieldElement.type === 'checkbox') {
        fieldElement.addEventListener('change', debounce(handleInputChange, 500)); // Use 'change' for checkboxes
    } else {
        fieldElement.addEventListener('input', debounce(handleInputChange, 500)); // Use 'input' for text/number fields
    }
});

function handleInputChange(event) {
    const inputId = event.target.id;
    let inputValue;

    // Handle checkbox case
    if (event.target.type === 'checkbox') {
        inputValue = event.target.checked ? 'true' : 'false';
    } else {
        inputValue = event.target.value; // For text/number inputs, use 'value'
    }

    console.log(inputId, inputValue); // Log the inputId and its value

    // Use replace to clean the field name (remove 'pengingatupdate-' prefix)
    updatePengingat(inputId.replace('pengingatupdate-', ''), inputValue);
    if (inputValue != 'true') {
        var indexs = inputId.replace('pengingatupdate-check', '');
        document.getElementById(`pengingatupdate-name${indexs}`).style.textDecoration = '';
        document.getElementById(`pengingatupdate-name${indexs}`).disabled = false;
        document.getElementById(`pengingatupdate-value${indexs}`).style.textDecoration = '';
        document.getElementById(`pengingatupdate-value${indexs}`).disabled = false;
    } else {
        var indexs = inputId.replace('pengingatupdate-check', '');
        document.getElementById(`pengingatupdate-name${indexs}`).style.textDecoration = 'line-through';
        document.getElementById(`pengingatupdate-name${indexs}`).disabled = true;
        document.getElementById(`pengingatupdate-value${indexs}`).style.textDecoration = 'line-through';
        document.getElementById(`pengingatupdate-value${indexs}`).disabled = true;
    }
}


function updatePengingat(e, no) {
    var data = {
        e,
        no
    }
    fetch('/procurement/updateprocpengingatinput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(resdat => {
            console.log('resdat');
            console.log(resdat);

            if (resdat.icons == 'success') {
                // warningpopup('success','sukses add');
                // suksesandloading('success','sukses edit')
                // socket.emit('approvereqbeli',additemreqproc);
                // location.reload();
                socket.emit('updatePengingat', data);
            } else {
                warningpopup('error', 'gagal save checklist');
                e.checked = false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'error catch : ' + error);
            e.checked = false;
        });
}

/////////UPDATE PENGINGAT INPUT}////////////////

/////////centang M di list request {tabel bawah}////////////////
function klikMproses(e, no,vendor) {
    var phase_tindak=0;
    var note_bayar='';

    if (e.checked) {
        // Gunakan .find() untuk mengiterasi array datatabel_atas
        // const objekInduk = datatabel_atas.find(vendor => {
        //     // Di dalam setiap objek vendor, gunakan .some() untuk mencari kecocokan 'no' di properti 'listdata'
        //     return vendor.listdata.some(item => item.no === no);
        // });

        const objekInduk=datatabel_atas.find((item)=>item.vendor.trim()===vendor.trim())

        console.log('objekInduk==+++++++++',objekInduk);
        if (objekInduk) {
            phase_tindak=objekInduk.phase_tindak;
            note_bayar=objekInduk.note_bayar;
        }
        
    }
    
    var data = {
        no: Number(no),
        tglmili_proses_bayar: `${Date.now()}`,
        proses_bayar: `${e.checked}`,
        user_proses_bayar: namalengkap,
        phase_tindak,
        note_bayar
    }
    console.log('data==== M===', data);

    fetch('/procurement/savemproses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(resdat => {
            console.log('resdat');
            console.log(resdat);

            if (resdat.icons == 'success') {
                //warningpopup('success','sukses add');
                //suksesandloading('success','sukses edit')
                socket.emit('updateMproses', data);
                //location.reload();
            } else {
                warningpopup('error', 'gagal save checklist');
                e.checked = false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'error catch : ' + error);
            e.checked = false;
        });
}


/////////end centang M di list request {tabel bawah}////////////////










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