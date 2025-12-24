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
    scrolltobuttonsidebar();
    gethumburger = JSON.parse(getCookie('hamburger'));
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    // console.log('all datas',dataarray);
    // console.log('status_hours',dataarray.status_hours);
    // console.log('dataadminlist',dataarray.dataadminlist);
    // //additemdropfilter(dataarray.itemsdata);
    // showtabel(dataarray.dataadminlist);

    fetchdata()
});

function fetchdata() {
    fetch('/api/supervisor')
        .then(res => res.json())
        .then(data => {
            window.dataall = data;
            console.log('datalls =================23=', window.dataall)
            // worker_threads(data);
            // additemdropfilter(data.itemsdata);
            showtabel(data.dataadminlist);
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
        /*  var modaldut=['modaldetail'];
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
                    showtabel(array, true);
                    $progress.hide();

                }, 500);
            }, 2000);
        }, 2000);
    }, 1000);
}

/////////
//socket io
// const socket = io();
socket.on('newadditemadminlist', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('datas ====');
    console.log(datas);

    //var fixarrays=dataarray.dataadminlist;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dataarray.dataadminlist.unshift(element);


    }
    window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    console.log('dataarray.dataadminlist ====');
    console.log(dataarray.dataadminlist);
    loadingbawahupdate(dataarray.dataadminlist);

});

socket.on('neweditfullitemadminlist', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

    window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    console.log('edit item [3]');
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('neweditforcestatus', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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


            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('neweditforcestatusnew', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

    window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newprintpodo', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;

            dataarray.dataadminlist[i].history = datas.history;
            console.log('ckeckecekck')
            console.log(dataarray.dataadminlist[i].history);

            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newpackde-kirimbahan', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_kirimbahan = 'true';
            dataarray.dataadminlist[i].packde_kirimbahan_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newupholsteryselesai', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = 'Selesai Produksi';
            dataarray.dataadminlist[i].history = datas.history;


            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newapprovalproduk', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;

            dataarray.dataadminlist[i].history = datas.history;

            dataarray.dataadminlist[i].approval_produkjadi = 'true';

            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newpackde-ambil', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_ambil = 'true';
            dataarray.dataadminlist[i].packde_ambil_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newpackde-qc', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_qc = 'true';
            dataarray.dataadminlist[i].packde_qc_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = JSON.stringify(datas.history);

            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newadminc5qc', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;

            dataarray.dataadminlist[i].history = datas.history;


            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriver-ambil', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].pickup_driver = 'true';
            dataarray.dataadminlist[i].pickup_driver_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);

});

socket.on('newdriver-terimakonsumen', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].diterima_konsumen = 'true';
            dataarray.dataadminlist[i].diterima_konsumen_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);

});

socket.on('newadminc5selesaikirim', function (datas) {
    var dataarray = JSON.parse(document.getElementById('itemalls').textContent);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;
            dataarray.dataadminlist[i].diterima_konsumen = 'true';
            dataarray.dataadminlist[i].history = datas.history;


            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newpackdereject-ambil', function (datas) {
    var dataarray = JSON.parse(document.getElementById('itemalls').textContent);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = 'Proses Produksi (Re)';

            dataarray.dataadminlist[i].upholstery_jadi = '';
            dataarray.dataadminlist[i].approval_produkjadi = '';
            dataarray.dataadminlist[i].reject_ambil_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newpackdereject-qc', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = 'Proses Produksi (Re)';

            dataarray.dataadminlist[i].upholstery_jadi = '';
            dataarray.dataadminlist[i].approval_produkjadi = '';
            dataarray.dataadminlist[i].packde_ambil = '';
            dataarray.dataadminlist[i].reject_qc_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriverreject-ambil', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriverreject-terimakonsumen', function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

            document.getElementById('itemalls').textContent = JSON.stringify(dataarray);
            window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.dataadminlist);
});
///tutup socket io

function filterByDate() {
    // const filtertanggal = document.getElementById('filtertanggal').value;

    // if (!filtertanggal) {
    //     alert('Silakan pilih tanggal terlebih dahulu.');
    //     return;
    // }

    // const dataarray = window.dataall;
    // const dataAdmin = dataarray.dataadminlist || [];

    // // Konversi input tanggal awal dan akhir hari
    // const selectedDate = new Date(filtertanggal);
    // const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0).getTime();
    // const endOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59, 999).getTime();

    // // Filter berdasarkan tanggal
    // const filtered = dataAdmin.filter((data) => {
    //     const tanggalTerlambat = Number(data.detail?.tglinputmili);
    //     if (!tanggalTerlambat) return false;
    //     return tanggalTerlambat >= startOfDay && tanggalTerlambat <= endOfDay;
    // });

    // console.log(`Data hasil filter tanggal ${filtertanggal}:`, filtered);

    // returnarray_ongoing(filtered);
}


async function showtabel(array, awalnotif = false) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    //ambil data orderdate_mili mulai juli 2025 dst
    //Buat tanggal batas: 1 Juli 2025
    const batasAwal = new Date('2025-07-01').getTime();

    var datatransaksi = array;
    var datatransaksi_0 = datatransaksi.filter(item => item.orderdate_mili >= batasAwal);


    datatransaksi_0.forEach(item => {
        try {
            item.history = JSON.parse(item.history);
        } catch (error) {
            console.error('Gagal parse history:', item.history, error);
        }
    });

    console.log('datatransaksi_0 mulai 1 juli 2025', datatransaksi_0)

    // var myobj = document.getElementById("divhpsdata");
    // if (myobj)
    //     myobj.remove();

    // var datatab = document.getElementById(`alldattab`);

    // var divhapus = document.createElement("tbody");
    // divhapus.setAttribute('id', 'divhpsdata');

    // var tablehtml = returnarray(datatransaksi_0);
    // divhapus.innerHTML = tablehtml;
    // datatab.appendChild(divhapus);

    //total terlambat
    await cekNcreatTab(datatransaksi_0, 'total');

    // ==== render tabel ongoing ====
    setTimeout(async () => {
        await cekNcreatTab(datatransaksi_0, 'ongoing');
    }, 100); // kasih jeda 100ms biar DOM siap


    if (awalnotif == false) {
        getceknotif();
    }

    setTimeout(function () {
        //hitungtugassaya(dataarray);
        hitungtugassaya_universal();
        document.getElementById('showmainpage').classList.remove('d-none');
        document.getElementById('loadingskeleton').classList.add('d-none');

    }, 500);

}

//tutup showtable

/**
 * Ambil waktu mulai (tglinputmili) dari status tertentu — dari history terakhir dengan status tsb.
 */
function getStartTimeForStatus(transaksi, statusName) {
    if (!Array.isArray(transaksi.history)) return null;
    const hist = [...transaksi.history]
        .reverse()
        .find(h => h.details?.status?.toLowerCase() === statusName.toLowerCase());
    return hist ? hist.details.tglinputmili : null;
}

/**
 * Ambil waktu status berikutnya setelah statusName (dipakai untuk menghitung durasi status tersebut)
 */
const getNextStatusTime = (transaksi, statusName) => {
    if (!Array.isArray(transaksi.history)) return null;
    const lowerStatus = statusName.toLowerCase();
    const idx = transaksi.history.findIndex(
        h => h.details?.status?.toLowerCase() === lowerStatus
    );
    if (idx !== -1 && idx + 1 < transaksi.history.length) {
        const next = transaksi.history[idx + 1];
        if (next?.details?.tglinputmili) return next.details.tglinputmili;
    }
    return null;
};

/**
 * Ambil waktu terakhir dari history transaksi
 */
function getLastStatusTime(transaksi) {
    if (!Array.isArray(transaksi.history) || transaksi.history.length === 0) return null;
    const last = transaksi.history[transaksi.history.length - 1];
    return last.details?.tglinputmili || null;
}

/**
 * Hitung keterlambatan berdasarkan konfigurasi status
 */
function calculateDelay(startTimeMili, endTimeMili, statusConfig) {
    if (!startTimeMili || !endTimeMili || !statusConfig)
        return { isLate: false, lateHours: 0, warn: false, durationHours: 0 };

    const durationHours = (endTimeMili - startTimeMili) / (1000 * 60 * 60);
    const { max_hours, late_hours } = statusConfig;

    let isLate = false, warn = false;

    if (durationHours > max_hours + late_hours) {
        isLate = true;
    } else if (durationHours > max_hours) {
        warn = true;
    }

    const lateHours = isLate
        ? durationHours - (max_hours + late_hours)
        : warn
            ? durationHours - max_hours
            : 0;

    return { isLate, lateHours: parseFloat(lateHours.toFixed(2)), warn, durationHours: parseFloat(durationHours.toFixed(2)) };
}

/////

function getDurationBetween(history, startStatus, endStatus) {
    if (!Array.isArray(history) || history.length === 0) return null;

    const start = [...history].reverse().find(h => h.details.status === startStatus);
    const end = endStatus ? [...history].reverse().find(h => h.details.status === endStatus) : null;

    if (start) {
        const startTime = Number(start.details.tglinputmili);
        const endTime = end ? Number(end.details.tglinputmili) : Date.now();
        return (endTime - startTime) / 3600000; // jam
    }
    return null;
}


/**
 * tabel ongoing (pesanan masih berjalan atau telat)
 */
function cekNcreatTab(array, totalorongoing) {
    let dataarray = window.dataall;
    let datatransaksi = array;
    let status_hours = dataarray.status_hours;

    console.log("DATA TRANSAKSI NIH", datatransaksi);

    let ongoingLate = {
        "Supervisor": {},
        "Admin C5": {},
        "Admin Classy": {},
        "Driver": {},
        "Packde": {},
        "Upholstery": {},
    };

    const statusMap = {
        "Print PO-DO": "podo",
        "Pengiriman Bahan": "kirimbahan",
        "Proses Produksi": "produksi",
        "Selesai Produksi": "selesaiproduksi",
        "Proses QC dan Packing": "qcpacking",
        "Standby Pengiriman": "standbykirim",
        "Dalam Pengiriman": "dalampengiriman",
        "Selesai": "selesai",
    };

    const getStatusConfig = (statusName) =>
        status_hours.find((s) => s.status.toLowerCase() === statusName.toLowerCase());

    datatransaksi.forEach((transaksi) => {
        const statusName = transaksi.status;
        //if (totalorongoing === 'ongoing' && (!statusName || statusName.toLowerCase() === "selesai")) return;
        if (totalorongoing === 'ongoing') {
            if (!statusName || statusName.toLowerCase() === "selesai") return;
        }

        console.log('totalorongoing ==++',totalorongoing);
        console.log('statusName ==++',statusName);
        

        const startTime = getStartTimeForStatus(transaksi, statusName);
        const nextTime = getNextStatusTime(transaksi, statusName);
        const endTime = nextTime || getLastStatusTime(transaksi) || Date.now();

        const statusConfig = getStatusConfig(statusName);
        if (!statusConfig) return;
        const delay = calculateDelay(startTime, endTime, statusConfig);

        const code2Lower = transaksi.code2?.toLowerCase() || "";
        const isStockProduk = transaksi.stockprodukcode === "true" || transaksi.stockprodukcode === true;
        const isInHouse = transaksi.deliveryunit?.toLowerCase().includes("in-house") || false;

        const validStatusesC5 = isInHouse ? ["Proses QC dan Packing"] // jika in-house
            : ["Proses QC dan Packing", "Standby Pengiriman", "Dalam Pengiriman", "Selesai"]; // jika bukan in-house


        // Role Mapping
        let role = "";
        if (code2Lower === "up" && statusName === "Produk di-approve") role = "supervisor";
        else if (["Print PO-DO", "Pengiriman Bahan"].includes(statusName) && ['up', 'non', ''].includes(code2Lower) && !isStockProduk)
            role = "adminclassy";
        else if (statusName === "Proses Produksi" && code2Lower === "up") role = "upholstery";
        else if (
            validStatusesC5.includes(statusName) &&
            ["up", "fmcg", "non", ""].includes(code2Lower) &&
            isStockProduk
        )
            role = "adminc5";

        else if (
            ["Standby Pengiriman", "Dalam Pengiriman", "Selesai"].includes(statusName) &&
            ["up", "fmcg", "non", ""].includes(code2Lower) &&
            (
                !isStockProduk || // jika bukan produk stok c5
                (isStockProduk && isInHouse) // atau produk stok c5 tapi in-house
            )
        )
            role = "driver";
        else if (
            ["Proses QC dan Packing"].includes(statusName) &&
            ['up', 'non', ''].includes(code2Lower) &&
            !isStockProduk
        )
            role = "packde";

        const roleMap = {
            adminc5: "Admin C5",
            adminclassy: "Admin Classy",
            driver: "Driver",
            packde: "Packde",
            upholstery: "Upholstery",
            supervisor: "Supervisor",
        };
        const fixedRole = roleMap[role] || "";

        if (!fixedRole) return;

        const statusKey = statusMap[statusName] || "lainnya";

        if (!ongoingLate[fixedRole][statusKey]) {
            ongoingLate[fixedRole][statusKey] = { jumlah: 0, durasi: 0, detail: [] };
        }

        ongoingLate[fixedRole][statusKey].jumlah++;
        ongoingLate[fixedRole][statusKey].durasi += delay.durationHours;
        ongoingLate[fixedRole][statusKey].detail.push({
            ...transaksi,
            durationHours: delay.durationHours,
            lateHours: delay.lateHours,
            startTime,
            endTime,
        });
    });

    // Pembulatan durasi
    for (const r in ongoingLate) {
        for (const s in ongoingLate[r]) {
            ongoingLate[r][s].durasi = parseFloat(ongoingLate[r][s].durasi.toFixed(2));
        }
    }

    console.log('ongoingLate ========================================', ongoingLate);

    ///cek yang terlambat 
    // const delayed = {};
    const delayed = {
        "Supervisor": {},
        "Admin C5": {},
        "Admin Classy": {},
        "Driver": {},
        "Packde": {},
        "Upholstery": {}
    };

    const rules = {
        "Print PO-DO": ["Pesanan dibuat", "Pengiriman Bahan"],
        "Pengiriman Bahan": ["Pengiriman Bahan", "Proses Produksi"],
        "Proses Produksi": ["Proses Produksi", "Selesai Produksi"],
        "Selesai Produksi": ["Selesai Produksi", "Produk di-approve"],
        "Proses QC dan Packing": ["Proses QC dan Packing", "Standby Pengiriman"],
        "Standby Pengiriman": ["Standby Pengiriman", "Dalam Pengiriman"],
        "Dalam Pengiriman": ["Dalam Pengiriman", "Selesai"]
    };

    for (const [roleName, roleData] of Object.entries(ongoingLate)) {
        for (const [statusKey, statusData] of Object.entries(roleData)) {
            // ✅ Ambil nama status yang benar (dari value -> key)
            const statusName = Object.entries(statusMap).find(([key, val]) => val === statusKey)?.[0];
            if (!statusName) continue;

            // ✅ Ambil konfigurasi batas waktu
            const statusInfo = status_hours.find(s => s.status.toLowerCase() === statusName.toLowerCase());
            if (!statusInfo) continue;

            for (const item of statusData.detail) {
                const history = item.history;
                if (!Array.isArray(history)) continue;

                let [start, end] = rules[statusName] || [];


                // Tambahan khusus Admin C5 (produk stok)
                if (statusName === "Proses QC dan Packing" && item.stockprodukcode === "true") {
                    start = "Pesanan dibuat";
                    end = null; // belum ada akhir, bandingkan ke Date.now()
                }

                // ✅ Aturan khusus Proses QC dan Packing
                if (statusName === "Proses QC dan Packing" && item.stockprodukcode !== "true") {
                    start = "Pesanan dibuat";
                    end = "Standby Pengiriman";
                }

                const duration = getDurationBetween(history, start, end);
                if (duration && duration > (statusInfo.max_hours + statusInfo.late_hours)) {
                    if (!delayed[roleName]) delayed[roleName] = {};
                    if (!delayed[roleName][statusKey]) delayed[roleName][statusKey] = { jumlah: 0, durasi: 0, detail: [] };

                    delayed[roleName][statusKey].jumlah++;
                    delayed[roleName][statusKey].durasi += Math.ceil(duration);
                    delayed[roleName][statusKey].detail.push({
                        ...item,
                        durationHours: Math.ceil(duration),
                        keterlambatanJam: Math.ceil(duration) - (statusInfo.max_hours + statusInfo.late_hours)
                    });
                }
            }
        }
    }

    console.log("✅ DELAYED RESULT:", delayed);


    // Tentukan ID unik tergantung mode
    const tableId = totalorongoing === 'ongoing' ? 'alldattab-ongoing' : 'alldattab';
    const tbodyId = totalorongoing === 'ongoing' ? 'divhpsdata-ongoing' : 'divhpsdata';

    // Render ke tabel ongoing
    const existing = document.getElementById(tbodyId);
    if (existing) existing.remove();

    // Buat tbody baru
    const tbody = document.createElement("tbody");
    tbody.id = tbodyId;

    // Isi tabel
    let tablehtml = "";
    for (const role in delayed) {
        let totalCount = 0;
        let refCount = 0;
        let rowhtml = `<tr><td style="text-align:left;vertical-align: middle;">${role}</td>`;

        Object.values(statusMap).forEach((st) => {
            const cell = delayed[role][st];
            if (cell) {
                totalCount += cell.jumlah;
                if (cell.jumlah > 5) refCount++;

                const color = cell.jumlah > 5 ? "red" : "black";
                const fontWeight = cell.jumlah > 5 ? "bold" : "normal";
                const value = unitortime === 0 ? cell.jumlah : cell.durasi;

                rowhtml += `<td style="color:${color};font-weight:${fontWeight};vertical-align: middle;text-align: center;">${value}</td>`;
            } else {
                rowhtml += "<td>0</td>";
            }
        });

        rowhtml += `<td>${totalCount}</td><td>${refCount}</td></tr>`;
        tablehtml += rowhtml;
    }

    tbody.innerHTML = tablehtml;

    // Masukkan ke tabel sesuai target
    document.getElementById(tableId).appendChild(tbody);
    console.log("ongoingLate delayed:", delayed);
}

//tombol menu unit or time
var unitortime = 0;//0 unit, 1 time
function klikunitortime(tipe) {
    unitortime = tipe;
    var dataarray = window.dataall
    console.log('klik unit time ====');
    console.log(tipe);

    // Toggle active class for unit/rupiah buttons
    if (unitortime === 0) {
        document.getElementById('btn-unit').classList.add('active');
        document.getElementById('btn-time').classList.remove('active');
    } else {
        document.getElementById('btn-time').classList.add('active');
        document.getElementById('btn-unit').classList.remove('active');
    }

    showtabel(dataarray.dataadminlist);
}
//tutup tombol menu unit or jam


/////////////////////////universal/////////////////////

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
//         title: '',
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
//     if (document.getElementById('klikhidebar').className!='bi bi-caret-right-fill toggle-btn') {
//         if (document.getElementById(id).className=='bi bi-caret-down-fill hide-on-collapse') {
//             document.getElementById(id).className='bi bi-caret-up-fill hide-on-collapse';
//             $(`#${id}-extend`).show();
//         }else{
//             document.getElementById(id).className='bi bi-caret-down-fill hide-on-collapse';
//             $(`#${id}-extend`).hide();
//         }
//     }

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
    //dataextracharge.length=0;
    var myModalEl = document.getElementById(modalid);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}
/* $('#modaldetail').on('hidden.bs.modal', function (e) {
  // do something...
 
}); */
/* $("#modalklikeditref").on('show.bs.modal', function () {

}); */