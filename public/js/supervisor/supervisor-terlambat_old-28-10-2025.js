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
    const filtertanggal = document.getElementById('filtertanggal').value;

    if (!filtertanggal) {
        alert('Silakan pilih tanggal terlebih dahulu.');
        return;
    }

    const dataarray = window.dataall;
    const dataAdmin = dataarray.dataadminlist || [];

    // Konversi input tanggal awal dan akhir hari
    const selectedDate = new Date(filtertanggal);
    const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0).getTime();
    const endOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59, 999).getTime();

    // Filter berdasarkan tanggal
    const filtered = dataAdmin.filter((data) => {
        const tanggalTerlambat = Number(data.detail?.tglinputmili);
        if (!tanggalTerlambat) return false;
        return tanggalTerlambat >= startOfDay && tanggalTerlambat <= endOfDay;
    });

    console.log(`Data hasil filter tanggal ${filtertanggal}:`, filtered);

    returnarray_ongoing(filtered);
}


function showtabel(array, awalnotif = false) {
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

    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

    var tablehtml = returnarray(datatransaksi_0);
    divhapus.innerHTML = tablehtml;
    datatab.appendChild(divhapus);

    // ==== render tabel ongoing ====
    returnarray_ongoing(datatransaksi_0);


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

function returnarray(array) {
    var dataarray = window.dataall;
    var datatransaksi = array;
    var status_hours = dataarray.status_hours;

    const userRoleMap = new Map(dataarray.dataroleuser.map(user => [user.username, user.tipeuser]));

    // Inisialisasi hasil Keterlambatan Global
    let hasilKeterlambatan = {
        adminclassy: {
            podo: { jumlah: 0, durasi: 0, detail: [] },
            kirimbahan: { jumlah: 0, durasi: 0, detail: [] },
            produksi: { jumlah: 0, durasi: 0, detail: [] },
            selesaiproduksi: { jumlah: 0, durasi: 0, detail: [] },
            qcpacking: { jumlah: 0, durasi: 0, detail: [] },
            standbykirim: { jumlah: 0, durasi: 0, detail: [] },
            dalampengiriman: { jumlah: 0, durasi: 0, detail: [] },
            selesai: { jumlah: 0, durasi: 0, detail: [] }
        },
        adminc5: {
            podo: { jumlah: 0, durasi: 0, detail: [] },
            kirimbahan: { jumlah: 0, durasi: 0, detail: [] },
            produksi: { jumlah: 0, durasi: 0, detail: [] },
            selesaiproduksi: { jumlah: 0, durasi: 0, detail: [] },
            qcpacking: { jumlah: 0, durasi: 0, detail: [] },
            standbykirim: { jumlah: 0, durasi: 0, detail: [] },
            dalampengiriman: { jumlah: 0, durasi: 0, detail: [] },
            selesai: { jumlah: 0, durasi: 0, detail: [] }
        },
        packde: {
            podo: { jumlah: 0, durasi: 0, detail: [] },
            kirimbahan: { jumlah: 0, durasi: 0, detail: [] },
            produksi: { jumlah: 0, durasi: 0, detail: [] },
            selesaiproduksi: { jumlah: 0, durasi: 0, detail: [] },
            qcpacking: { jumlah: 0, durasi: 0, detail: [] },
            standbykirim: { jumlah: 0, durasi: 0, detail: [] },
            dalampengiriman: { jumlah: 0, durasi: 0, detail: [] },
            selesai: { jumlah: 0, durasi: 0, detail: [] }
        },
        driver: {
            podo: { jumlah: 0, durasi: 0, detail: [] },
            kirimbahan: { jumlah: 0, durasi: 0, detail: [] },
            produksi: { jumlah: 0, durasi: 0, detail: [] },
            selesaiproduksi: { jumlah: 0, durasi: 0, detail: [] },
            qcpacking: { jumlah: 0, durasi: 0, detail: [] },
            standbykirim: { jumlah: 0, durasi: 0, detail: [] },
            dalampengiriman: { jumlah: 0, durasi: 0, detail: [] },
            selesai: { jumlah: 0, durasi: 0, detail: [] }
        },
        upholstery: {
            podo: { jumlah: 0, durasi: 0, detail: [] },
            kirimbahan: { jumlah: 0, durasi: 0, detail: [] },
            produksi: { jumlah: 0, durasi: 0, detail: [] },
            selesaiproduksi: { jumlah: 0, durasi: 0, detail: [] },
            qcpacking: { jumlah: 0, durasi: 0, detail: [] },
            standbykirim: { jumlah: 0, durasi: 0, detail: [] },
            dalampengiriman: { jumlah: 0, durasi: 0, detail: [] },
            selesai: { jumlah: 0, durasi: 0, detail: [] }
        }
    };

    // Fungsi pembantu untuk mendapatkan tglinputmili berdasarkan status
    function getTglInputMiliByStatus(history, statusToFind) {
        for (let i = history.length - 1; i >= 0; i--) {
            if (history[i].details && history[i].details.status === statusToFind) {
                return history[i].details.tglinputmili;
            }
        }
        if (statusToFind === "Print PO-DO") {
            for (let i = history.length - 1; i >= 0; i--) {
                if (history[i].tindakan === "Selesai Print PO/DO") {
                    return history[i].details.tglinputmili;
                }
            }
        }
        if (statusToFind === "Produk di-approve") {
            for (let i = history.length - 1; i >= 0; i--) {
                if (history[i].details && history[i].details.status === "Approval") {
                    return history[i].details.tglinputmili;
                }
            }
        }
        return null;
    }

    //  max_hours dan late_hours dari status_hours
    function getStatusHours(statusName) {
        return status_hours.find(s => s.status === statusName);
    }

    // **Fungsi calculateDelay**
    function calculateDelay(startTimeMili, endTimeMili, statusConfig) {
        if (!startTimeMili || !endTimeMili || !statusConfig) {
            return { isLate: false, duration: 0, lateHours: 0 };
        }

        const maxHours = statusConfig.max_hours;
        const lateHoursThreshold = statusConfig.late_hours;
        const actualDelayThreshold = maxHours + lateHoursThreshold;

        const durationMs = endTimeMili - startTimeMili;
        const durationHours = durationMs / (1000 * 60 * 60);

        let isLate = false;
        let lateHoursCalculated = 0;

        if (durationHours > actualDelayThreshold) {
            isLate = true;
            lateHoursCalculated = durationHours - actualDelayThreshold;
        }
        // Mengembalikan objek dengan semua informasi yang relevan
        return { isLate: isLate, duration: durationHours, lateHours: lateHoursCalculated };
    }

    // Tahun saat ini
    const currentYear = new Date().getFullYear();

    // --- START: Perhitungan hasilKeterlambatan GLOBAL (dengan properti tambahan langsung) ---
    datatransaksi.forEach(transaksi => {
        const filteredHistory = transaksi.history.filter(h => {
            const historyDate = new Date(h.details.tglinputmili);
            return historyDate.getFullYear() === currentYear;
        });

        if (filteredHistory.length === 0) {
            return;
        }

        const kode2 = transaksi.code2;
        const stockProdukCode = transaksi.stockprodukcode;

        // Untuk memastikan objek transaksi yang ditambahkan ke detail memiliki properti yang relevan
        // kita akan membuat salinan transaksi dan menambahkan properti ke salinan tersebut.
        // Ini penting agar objek transaksi yang sama tidak ditimpa dengan nilai lateHoursCalculatedForThisStatus
        // yang berbeda jika ia terlambat di beberapa fase.
        const transaksiCopy = JSON.parse(JSON.stringify(transaksi)); // Deep copy

        // KONDISI UTAMA: stockprodukcode=="true" (hanya untuk adminc5)
        if (stockProdukCode === "true") {
            const tglPesananDibuat = getTglInputMiliByStatus(filteredHistory, "Pesanan dibuat");
            const tglStandbyPengiriman = getTglInputMiliByStatus(filteredHistory, "Standby Pengiriman");
            const tglSelesai = getTglInputMiliByStatus(filteredHistory, "Selesai");

            // Proses QC dan Packing: dari Pesanan dibuat hingga Standby Pengiriman (untuk adminc5)
            const qcPackingStatusConfig = getStatusHours("Proses QC dan Packing");
            if (tglPesananDibuat && tglStandbyPengiriman && qcPackingStatusConfig) {
                const delayResult = calculateDelay(tglPesananDibuat, tglStandbyPengiriman, qcPackingStatusConfig);
                if (delayResult.isLate) {
                    hasilKeterlambatan.adminc5.qcpacking.jumlah++;
                    hasilKeterlambatan.adminc5.qcpacking.durasi += delayResult.lateHours;
                    // Tambahkan properti ke salinan transaksi sebelum disimpan
                    transaksiCopy.lateHoursCalculatedForThisStatus_qcpacking = delayResult.lateHours;
                    transaksiCopy.isLate_qcpacking = delayResult.isLate;
                    transaksiCopy.duration_qcpacking = delayResult.duration;
                    hasilKeterlambatan.adminc5.qcpacking.detail.push(transaksiCopy);
                }
            }

            // Standby Pengiriman: dari Standby Pengiriman hingga Selesai (untuk adminc5)
            const standbyPengirimanStatusConfig = getStatusHours("Standby Pengiriman");
            if (tglStandbyPengiriman && tglSelesai && standbyPengirimanStatusConfig) {
                const delayResult = calculateDelay(tglStandbyPengiriman, tglSelesai, standbyPengirimanStatusConfig);
                if (delayResult.isLate) {
                    hasilKeterlambatan.adminc5.standbykirim.jumlah++;
                    hasilKeterlambatan.adminc5.standbykirim.durasi += delayResult.lateHours;
                    transaksiCopy.lateHoursCalculatedForThisStatus_standbykirim = delayResult.lateHours;
                    transaksiCopy.isLate_standbykirim = delayResult.isLate;
                    transaksiCopy.duration_standbykirim = delayResult.duration;
                    hasilKeterlambatan.adminc5.standbykirim.detail.push(transaksiCopy);
                }
            }
        }
        // KONDISI LAIN: stockprodukcode!="true" (untuk adminclassy, packde, driver, dan upholstery)
        else { // stockProdukCode !== "true"
            const tglPesananDibuat = getTglInputMiliByStatus(filteredHistory, "Pesanan dibuat");
            const tglPengirimanBahan = getTglInputMiliByStatus(filteredHistory, "Pengiriman Bahan");
            const tglProsesProduksi = getTglInputMiliByStatus(filteredHistory, "Proses Produksi");
            const tglSelesaiProduksi = getTglInputMiliByStatus(filteredHistory, "Selesai Produksi");
            const tglProdukDiApprove = getTglInputMiliByStatus(filteredHistory, "Produk di-approve");
            const tglProsesQCdanPacking = getTglInputMiliByStatus(filteredHistory, "Proses QC dan Packing");
            const tglStandbyPengiriman = getTglInputMiliByStatus(filteredHistory, "Standby Pengiriman");
            const tglDalamPengiriman = getTglInputMiliByStatus(filteredHistory, "Dalam Pengiriman");
            const tglSelesai = getTglInputMiliByStatus(filteredHistory, "Selesai");
            const tglSelesaiPrintPODo = getTglInputMiliByStatus(filteredHistory, "Print PO-DO");

            // a. untuk transaksi code2=="UP" dan stockprodukcode!="true" (untuk adminclassy dan upholstery)
            if (kode2.toLowerCase() === "up") {
                // Print PO-DO (untuk adminclassy)
                const printPODODStatusConfig = getStatusHours("Print PO-DO");
                if (tglPesananDibuat && tglSelesaiPrintPODo && printPODODStatusConfig) {
                    const delayResult = calculateDelay(tglPesananDibuat, tglSelesaiPrintPODo, printPODODStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.adminclassy.podo.jumlah++;
                        hasilKeterlambatan.adminclassy.podo.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_podo = delayResult.lateHours;
                        transaksiCopy.isLate_podo = delayResult.isLate;
                        transaksiCopy.duration_podo = delayResult.duration;
                        hasilKeterlambatan.adminclassy.podo.detail.push(transaksiCopy);
                    }
                }

                // Pengiriman Bahan (untuk adminclassy)
                const pengirimanBahanStatusConfig = getStatusHours("Pengiriman Bahan");
                if (tglPengirimanBahan && tglProsesProduksi && pengirimanBahanStatusConfig) {
                    const delayResult = calculateDelay(tglPengirimanBahan, tglProsesProduksi, pengirimanBahanStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.adminclassy.kirimbahan.jumlah++;
                        hasilKeterlambatan.adminclassy.kirimbahan.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_kirimbahan = delayResult.lateHours;
                        transaksiCopy.isLate_kirimbahan = delayResult.isLate;
                        transaksiCopy.duration_kirimbahan = delayResult.duration;
                        hasilKeterlambatan.adminclassy.kirimbahan.detail.push(transaksiCopy);
                    }
                }

                // Proses Produksi (untuk adminclassy dan upholstery)
                const prosesProduksiStatusConfig = getStatusHours("Proses Produksi");
                if (tglPengirimanBahan && tglSelesaiProduksi && prosesProduksiStatusConfig) {
                    const delayResult = calculateDelay(tglPengirimanBahan, tglSelesaiProduksi, prosesProduksiStatusConfig);
                    if (delayResult.isLate) {
                        //hasilKeterlambatan.adminclassy.produksi.jumlah++;
                        //hasilKeterlambatan.adminclassy.produksi.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_produksi = delayResult.lateHours;
                        transaksiCopy.isLate_produksi = delayResult.isLate;
                        transaksiCopy.duration_produksi = delayResult.duration;
                        //hasilKeterlambatan.adminclassy.produksi.detail.push(transaksiCopy);
                        hasilKeterlambatan.upholstery.produksi.jumlah++;
                        hasilKeterlambatan.upholstery.produksi.durasi += delayResult.lateHours;
                        hasilKeterlambatan.upholstery.produksi.detail.push(transaksiCopy);
                    }
                }

                // Selesai Produksi (untuk adminclassy)
                const selesaiProduksiStatusConfig = getStatusHours("Approval");
                if (tglSelesaiProduksi && tglProdukDiApprove && selesaiProduksiStatusConfig) {
                    const delayResult = calculateDelay(tglSelesaiProduksi, tglProdukDiApprove, selesaiProduksiStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.adminclassy.selesaiproduksi.jumlah++;
                        hasilKeterlambatan.adminclassy.selesaiproduksi.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_selesaiproduksi = delayResult.lateHours;
                        transaksiCopy.isLate_selesaiproduksi = delayResult.isLate;
                        transaksiCopy.duration_selesaiproduksi = delayResult.duration;
                        hasilKeterlambatan.adminclassy.selesaiproduksi.detail.push(transaksiCopy);
                    }
                }

                // Proses QC dan Packing (untuk adminclassy dan packde)
                const qcPackingStatusConfig = getStatusHours("Proses QC dan Packing");
                if (tglProdukDiApprove && tglStandbyPengiriman && qcPackingStatusConfig) {
                    const delayResult = calculateDelay(tglProdukDiApprove, tglStandbyPengiriman, qcPackingStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.adminclassy.qcpacking.jumlah++;
                        hasilKeterlambatan.adminclassy.qcpacking.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_qcpacking = delayResult.lateHours;
                        transaksiCopy.isLate_qcpacking = delayResult.isLate;
                        transaksiCopy.duration_qcpacking = delayResult.duration;
                        hasilKeterlambatan.adminclassy.qcpacking.detail.push(transaksiCopy);
                        //
                        hasilKeterlambatan.packde.qcpacking.jumlah++;
                        hasilKeterlambatan.packde.qcpacking.durasi += delayResult.lateHours;
                        hasilKeterlambatan.packde.qcpacking.detail.push(transaksiCopy);
                    }
                }

                // Standby Pengiriman (untuk packde dan driver)
                const standbyPengirimanStatusConfig = getStatusHours("Standby Pengiriman");
                if (tglStandbyPengiriman && tglDalamPengiriman && standbyPengirimanStatusConfig) {
                    const delayResult = calculateDelay(tglStandbyPengiriman, tglDalamPengiriman, standbyPengirimanStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.packde.standbykirim.jumlah++;
                        hasilKeterlambatan.packde.standbykirim.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_standbykirim = delayResult.lateHours;
                        transaksiCopy.isLate_standbykirim = delayResult.isLate;
                        transaksiCopy.duration_standbykirim = delayResult.duration;
                        hasilKeterlambatan.packde.standbykirim.detail.push(transaksiCopy);
                        hasilKeterlambatan.driver.standbykirim.jumlah++;
                        hasilKeterlambatan.driver.standbykirim.durasi += delayResult.lateHours;
                        hasilKeterlambatan.driver.standbykirim.detail.push(transaksiCopy);
                    }
                }

                // Dalam Pengiriman (untuk packde dan driver)
                const dalamPengirimanStatusConfig = getStatusHours("Dalam Pengiriman");
                if (tglDalamPengiriman && tglSelesai && dalamPengirimanStatusConfig) {
                    const delayResult = calculateDelay(tglDalamPengiriman, tglSelesai, dalamPengirimanStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.packde.dalampengiriman.jumlah++;
                        hasilKeterlambatan.packde.dalampengiriman.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_dalampengiriman = delayResult.lateHours;
                        transaksiCopy.isLate_dalampengiriman = delayResult.isLate;
                        transaksiCopy.duration_dalampengiriman = delayResult.duration;
                        hasilKeterlambatan.packde.dalampengiriman.detail.push(transaksiCopy);
                        hasilKeterlambatan.driver.dalampengiriman.jumlah++;
                        hasilKeterlambatan.driver.dalampengiriman.durasi += delayResult.lateHours;
                        hasilKeterlambatan.driver.dalampengiriman.detail.push(transaksiCopy);
                    }
                }

            }
            // b. untuk transaksi code2!="UP" dan stockprodukcode!="true" (untuk adminclassy, packde, driver)
            else { // code2 !== "UP"
                // Print PO-DO (untuk adminclassy)
                const printPODODStatusConfig = getStatusHours("Print PO-DO");
                if (tglPesananDibuat && tglSelesaiPrintPODo && printPODODStatusConfig) {
                    const delayResult = calculateDelay(tglPesananDibuat, tglSelesaiPrintPODo, printPODODStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.adminclassy.podo.jumlah++;
                        hasilKeterlambatan.adminclassy.podo.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_podo = delayResult.lateHours;
                        transaksiCopy.isLate_podo = delayResult.isLate;
                        transaksiCopy.duration_podo = delayResult.duration;
                        hasilKeterlambatan.adminclassy.podo.detail.push(transaksiCopy);
                    }
                }

                // Proses QC dan Packing (untuk adminclassy dan packde)
                const qcPackingStatusConfig = getStatusHours("Proses QC dan Packing");
                if (tglProsesQCdanPacking && tglStandbyPengiriman && qcPackingStatusConfig) {
                    const delayResult = calculateDelay(tglProsesQCdanPacking, tglStandbyPengiriman, qcPackingStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.adminclassy.qcpacking.jumlah++;
                        hasilKeterlambatan.adminclassy.qcpacking.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_qcpacking = delayResult.lateHours;
                        transaksiCopy.isLate_qcpacking = delayResult.isLate;
                        transaksiCopy.duration_qcpacking = delayResult.duration;
                        hasilKeterlambatan.adminclassy.qcpacking.detail.push(transaksiCopy);
                        hasilKeterlambatan.packde.qcpacking.jumlah++;
                        hasilKeterlambatan.packde.qcpacking.durasi += delayResult.lateHours;
                        hasilKeterlambatan.packde.qcpacking.detail.push(transaksiCopy);
                    }
                }

                // Standby Pengiriman (untuk packde dan driver)
                const standbyPengirimanStatusConfig = getStatusHours("Standby Pengiriman");
                if (tglStandbyPengiriman && tglDalamPengiriman && standbyPengirimanStatusConfig) {
                    const delayResult = calculateDelay(tglStandbyPengiriman, tglDalamPengiriman, standbyPengirimanStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.packde.standbykirim.jumlah++;
                        hasilKeterlambatan.packde.standbykirim.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_standbykirim = delayResult.lateHours;
                        transaksiCopy.isLate_standbykirim = delayResult.isLate;
                        transaksiCopy.duration_standbykirim = delayResult.duration;
                        hasilKeterlambatan.packde.standbykirim.detail.push(transaksiCopy);
                        hasilKeterlambatan.driver.standbykirim.jumlah++;
                        hasilKeterlambatan.driver.standbykirim.durasi += delayResult.lateHours;
                        hasilKeterlambatan.driver.standbykirim.detail.push(transaksiCopy);
                    }
                }

                // Dalam Pengiriman (untuk packde dan driver)
                const dalamPengirimanStatusConfig = getStatusHours("Dalam Pengiriman");
                if (tglDalamPengiriman && tglSelesai && dalamPengirimanStatusConfig) {
                    const delayResult = calculateDelay(tglDalamPengiriman, tglSelesai, dalamPengirimanStatusConfig);
                    if (delayResult.isLate) {
                        hasilKeterlambatan.packde.dalampengiriman.jumlah++;
                        hasilKeterlambatan.packde.dalampengiriman.durasi += delayResult.lateHours;
                        transaksiCopy.lateHoursCalculatedForThisStatus_dalampengiriman = delayResult.lateHours;
                        transaksiCopy.isLate_dalampengiriman = delayResult.isLate;
                        transaksiCopy.duration_dalampengiriman = delayResult.duration;
                        hasilKeterlambatan.packde.dalampengiriman.detail.push(transaksiCopy);
                        hasilKeterlambatan.driver.dalampengiriman.jumlah++;
                        hasilKeterlambatan.driver.dalampengiriman.durasi += delayResult.lateHours;
                        hasilKeterlambatan.driver.dalampengiriman.detail.push(transaksiCopy);
                    }
                }
            }
        }
    });

    // Pembulatan durasi ke 2 desimal
    function roundDurations(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                if (obj[key].hasOwnProperty('durasi')) {
                    obj[key].durasi = parseFloat(obj[key].durasi.toFixed(2));
                }
                roundDurations(obj[key]); // Rekursif untuk objek bersarang
            }
        }
    }
    roundDurations(hasilKeterlambatan); // Terapkan pada hasilKeterlambatan global
    // --- END: Perhitungan hasilKeterlambatan GLOBAL ---


    // --- START: Pembuatan hasilKeterlambatanPerUser dari hasilKeterlambatan (Tanpa Iterasi Ulang Transaksi) ---

    let hasilKeterlambatanPerUser = [];

    // Helper untuk menemukan atau membuat entri user
    function getOrCreateUserEntry(username, name) {
        let userEntry = hasilKeterlambatanPerUser.find(u => u.username === username);
        if (!userEntry) {
            userEntry = {
                username: username,
                nama: name,
                dataterlambat: {
                    podo: { jumlah: 0, durasi: 0, detail: [] },
                    kirimbahan: { jumlah: 0, durasi: 0, detail: [] },
                    produksi: { jumlah: 0, durasi: 0, detail: [] },
                    selesaiproduksi: { jumlah: 0, durasi: 0, detail: [] },
                    qcpacking: { jumlah: 0, durasi: 0, detail: [] },
                    standbykirim: { jumlah: 0, durasi: 0, detail: [] },
                    dalampengiriman: { jumlah: 0, durasi: 0, detail: [] },
                    selesai: { jumlah: 0, durasi: 0, detail: [] }
                }
            };
            hasilKeterlambatanPerUser.push(userEntry);
        }
        return userEntry;
    }


    // Iterasi melalui hasilKeterlambatan untuk mengisi hasilKeterlambatanPerUser
    for (const kategoriAdmin in hasilKeterlambatan) {
        if (hasilKeterlambatan.hasOwnProperty(kategoriAdmin)) {
            for (const statusKey in hasilKeterlambatan[kategoriAdmin]) {
                if (hasilKeterlambatan[kategoriAdmin].hasOwnProperty(statusKey)) {
                    const statusData = hasilKeterlambatan[kategoriAdmin][statusKey];

                    if (statusData.detail.length > 0) { // Jika ada transaksi yang terlambat untuk status ini
                        statusData.detail.forEach(terlambatTransaksi => {
                            let responsibleUser = null;

                            let expectedUserType = '';
                            switch (kategoriAdmin) {
                                case 'adminclassy': expectedUserType = 'Admin Classy'; break;
                                case 'adminc5': expectedUserType = 'Admin C5'; break;
                                case 'packde': expectedUserType = 'Pack-DE Staff';
                                    // Juga pertimbangkan 'Packde' jika ada di dataroleuser
                                    break;
                                case 'driver': expectedUserType = 'Driver'; break;
                                case 'upholstery': expectedUserType = 'Upholstery'; break;
                            }

                            // Cari di history transaksi siapa yang relevan dengan statusKey dan tipeuser yang diharapkan
                            const historyEntry = terlambatTransaksi.history.find(h => {
                                const userTypeInRoleMap = userRoleMap.get(h.username);
                                if (!userTypeInRoleMap) return false;

                                let isRelevantAction = false;
                                switch (statusKey) {
                                    case 'podo':
                                        isRelevantAction = h.tindakan === "Selesai Print PO/DO";
                                        break;
                                    case 'kirimbahan':
                                        isRelevantAction = h.details && h.details.status === "Pengiriman Bahan";
                                        break;
                                    case 'produksi':
                                        isRelevantAction = h.details && h.details.status === "Proses Produksi";
                                        break;
                                    case 'selesaiproduksi':
                                        // Untuk 'selesaiproduksi', tindakan yang relevan adalah "Produk di-approve" (untuk Admin Classy)
                                        // Karena di hasilKeterlambatan global, Anda menggunakan tglProdukDiApprove sebagai end time
                                        isRelevantAction = h.details && (h.details.status === "Approval" || h.tindakan === "Produk di-approve");
                                        break;
                                    case 'qcpacking':
                                        isRelevantAction = h.details && (h.details.status === "Proses QC dan Packing" || h.tindakan === "Packde selesai QC dan Packing");
                                        break;
                                    case 'standbykirim':
                                        isRelevantAction = h.details && h.details.status === "Standby Pengiriman";
                                        break;
                                    case 'dalampengiriman':
                                        isRelevantAction = h.details && h.details.status === "Dalam Pengiriman";
                                        break;
                                    case 'selesai':
                                        isRelevantAction = h.details && h.details.status === "Selesai";
                                        break;
                                }

                                // Pastikan tindakan relevan DAN tipeuser cocok
                                return isRelevantAction && (userTypeInRoleMap === expectedUserType || (expectedUserType === 'Pack-DE Staff' && userTypeInRoleMap === 'Packde'));
                            });

                            if (historyEntry && historyEntry.username && historyEntry.user) {
                                responsibleUser = { username: historyEntry.username, nama: historyEntry.user };
                            }

                            // Jika ada responsibleUser dan dia ditemukan, tambahkan ke hasilKeterlambatanPerUser
                            if (responsibleUser) {
                                const userEntry = getOrCreateUserEntry(responsibleUser.username, responsibleUser.nama);
                                userEntry.dataterlambat[statusKey].jumlah++;

                                const lateHoursPropName = `lateHoursCalculatedForThisStatus_${statusKey}`;
                                userEntry.dataterlambat[statusKey].durasi += terlambatTransaksi[lateHoursPropName] || 0;

                                userEntry.dataterlambat[statusKey].detail.push(terlambatTransaksi);
                            }
                        });
                    }
                }
            }
        }
    }

    // Pembulatan durasi untuk hasilKeterlambatanPerUser (jika ada pembulatan lagi yang diperlukan)
    roundDurations(hasilKeterlambatanPerUser); // Ini bisa diaktifkan jika perlu pembulatan ekstra




    console.log('hasilKeterlambatan ==', hasilKeterlambatan);
    var arrayroles = [{ key: 'adminc5', namabaris: 'Admin C5' }, { key: 'adminclassy', namabaris: 'Admin Classy' }, { key: 'driver', namabaris: 'Driver' }, { key: 'packde', namabaris: 'Packde' }, { key: 'upholstery', namabaris: 'Upholstery' }];
    var htmlakhir = arrayroles.map((element, index) => {

        return `
            <tr id="dataitems-${index}" data-json='${JSON.stringify(hasilKeterlambatan[element.key])}'>
                <td class="text-truncate" style="text-align: left;max-width: 11ch;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                    ${element.namabaris}
                </td>

                <td style="text-align: center;">
                    ${unitortime == 0 ? hasilKeterlambatan[element.key].podo.jumlah : hasilKeterlambatan[element.key].podo.durasi}
                </td><!-- Print PODO -->

                <td style="text-align: center;">
                    ${unitortime == 0 ? hasilKeterlambatan[element.key].kirimbahan.jumlah : hasilKeterlambatan[element.key].kirimbahan.durasi}
                </td><!-- Kirim Bahan -->

                <td style="text-align: center;">
                    ${unitortime == 0 ? hasilKeterlambatan[element.key].produksi.jumlah : hasilKeterlambatan[element.key].produksi.durasi}
                </td><!-- Produksi -->
                
                <td style="text-align: center;">
                    ${unitortime == 0 ? hasilKeterlambatan[element.key].selesaiproduksi.jumlah : hasilKeterlambatan[element.key].selesaiproduksi.durasi}
                </td><!-- Selesai Produksi -->
                
                <td style="text-align: center;">
                    ${unitortime == 0 ? hasilKeterlambatan[element.key].qcpacking.jumlah : hasilKeterlambatan[element.key].qcpacking.durasi}
                </td><!-- QC & Packing -->
                
                <td style="text-align: center;">
                    ${unitortime == 0 ? hasilKeterlambatan[element.key].standbykirim.jumlah : hasilKeterlambatan[element.key].standbykirim.durasi}
                </td><!-- Standby -->
                
                <td style="text-align: center;">
                    ${unitortime == 0 ? hasilKeterlambatan[element.key].dalampengiriman.jumlah : hasilKeterlambatan[element.key].dalampengiriman.durasi}
                </td><!-- Pengiriman -->
                
                <td style="text-align: center;">
                    ${unitortime == 0 ? hasilKeterlambatan[element.key].selesai.jumlah : hasilKeterlambatan[element.key].selesai.durasi}
                </td><!-- Selesai -->

                <!-- Start Remove Button -->
                <!-- <td style="text-align: left;" >
                    <span class="badge text-bg-secondary" style="cursor: pointer;">Detail</span>
                </td> -->
                <!-- End Remove Button -->
            </tr>
        `
    }).join('');


    console.log('hasilKeterlambatanPerUser ==', hasilKeterlambatanPerUser);
    //

    return htmlakhir;
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
function returnarray_ongoing(array) {
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
        if (!statusName || statusName.toLowerCase() === "selesai") return;

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



    // Render ke tabel ongoing
    const existing = document.getElementById("divhpsdata-ongoing");
    if (existing) existing.remove();

    const tbody = document.createElement("tbody");
    tbody.setAttribute("id", "divhpsdata-ongoing");

    let tablehtml = "";
    for (const role in delayed) {
        let totalCount = 0;
        let refCount = 0;
        let rowhtml = `<tr><td style="text-align:left;" class="d-flex align-items-center">${role}</td>`;

        Object.values(statusMap).forEach((st) => {
            const cell = delayed[role][st];
            if (cell) {
                totalCount += cell.jumlah;
                if (cell.jumlah > 5) refCount++;

                const color = cell.jumlah > 5 ? "red" : "black";
                const fontWeight = cell.jumlah > 5 ? "bold" : "normal";
                const value = unitortime === 0 ? cell.jumlah : cell.durasi;

                rowhtml += `<td style="color:${color};font-weight:${fontWeight};" class="d-flex align-items-center">${value}</td>`;
            } else {
                rowhtml += "<td>0</td>";
            }
        });

        rowhtml += `<td>${totalCount}</td><td>${refCount}</td></tr>`;
        tablehtml += rowhtml;
    }

    tbody.innerHTML = tablehtml;
    document.getElementById("alldattab-ongoing").appendChild(tbody);
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