var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');
var gethumburger;
//console.log=function(){};

var ismobile='n';
document.addEventListener('DOMContentLoaded', function () {
    
    cekdatausersorout();
    
    //fix modal error
    document.addEventListener('hide.bs.modal', function (event) {
        if (document.activeElement) {
        document.activeElement.blur();
        }
    });
    ///
    if (localStorage.getItem('username') && localStorage.getItem('username') != '') {
        username=localStorage.getItem('username');
        namalengkap =JSON.parse(localStorage.getItem('datauser')).namalengkap;
        document.getElementById('namalengkap').innerHTML=namalengkap;
    }
    else {
        window.location.href = '/';
    }

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        ismobile = 'y';
    }

    gethumburger=JSON.parse(getCookie('hamburger'));
    
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('all datas',dataarray);
    console.log('status_hours',dataarray.status_hours);
    console.log('dataadminlist',dataarray.dataadminlist);
    //additemdropfilter(dataarray.itemsdata);
    showtabel(dataarray.dataadminlist);

});
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
            showtabel(array);
            $progress.hide();
            
            }, 500);
        }, 2000);
        }, 2000);
    }, 1000);
}

/////////
//socket io
const socket = io();
socket.on('newadditemadminlist',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('datas ====');
    console.log(datas);

    //var fixarrays=dataarray.dataadminlist;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dataarray.dataadminlist.unshift(element);
        
        
    }
    document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    console.log('dataarray.dataadminlist ====');
    console.log(dataarray.dataadminlist);
    loadingbawahupdate(dataarray.dataadminlist);
  
});

socket.on('neweditfullitemadminlist',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('edit item [1]');
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        //var indexarray= dataarray.dataadminlist.indexOf(element);
        if (datas[0].id_transaksi==element.id_transaksi) {
        console.log('edit item [2]');
        var historiold=JSON.parse(element.history);

        var historiesnew=[...datas[0].history,...historiold];

        dataarray.dataadminlist[i].order_date=datas[0].order_date;
        dataarray.dataadminlist[i].orderdate_mili=datas[0].orderdate_mili;

        dataarray.dataadminlist[i].delivered_date=datas[0].delivered_date;

        dataarray.dataadminlist[i].delivereddate_mili=datas[0].delivereddate_mili;
        
        dataarray.dataadminlist[i].platform=datas[0].platform;

        dataarray.dataadminlist[i].finalprice=datas[0].finalprice;

        dataarray.dataadminlist[i].diskon_persen=datas[0].diskon_persen;

        dataarray.dataadminlist[i].diskon_amount=datas[0].diskon_amount;

        dataarray.dataadminlist[i].notes=datas[0].notes;

        dataarray.dataadminlist[i].buyername=datas[0].buyername;
        
        dataarray.dataadminlist[i].phonenumber=datas[0].phonenumber;
        
        dataarray.dataadminlist[i].address=datas[0].address;
        
        dataarray.dataadminlist[i].deliveryunit=datas[0].deliveryunit;
        
        dataarray.dataadminlist[i].extracharge=datas[0].extracharge;
        
        dataarray.dataadminlist[i].history=JSON.stringify(historiesnew);
        

        
        console.log(dataarray.dataadminlist);
        }
    }
    document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        
    document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    console.log('edit item [3]');
    loadingbawahupdate(dataarray.dataadminlist);
}); 

socket.on('neweditforcestatus',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('neweditforcestatusnew',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  datas.tglinputmili.toString();
  console.log('data masuk status force');
  console.log(datas);

  var flag=0;//0 belum ada input id transaksi, 1 = sudah ada
  for (let i = 0; i < dataarray.forcestatusrequest.length; i++) {
    const element = dataarray.forcestatusrequest[i];
    if (element.id_transaksi==datas.id_transaksi) {
      dataarray.forcestatusrequest[i].status=datas.status;
      dataarray.forcestatusrequest[i].forcedsent=datas.forcedsent;
      dataarray.forcestatusrequest[i].forcedcancel=datas.forcedcancel;
      dataarray.forcestatusrequest[i].reschedule=datas.reschedule;
      dataarray.forcestatusrequest[i].delayproduksi=datas.delayproduksi;
      dataarray.forcestatusrequest[i].toppriority=datas.toppriority;
      dataarray.forcestatusrequest[i].pending=datas.pending;
      dataarray.forcestatusrequest[i].stockprodukcode=datas.stockprodukcode;
      dataarray.forcestatusrequest[i].stockuses=datas.stockuses;
      dataarray.forcestatusrequest[i].history=JSON.stringify(datas.history);
      dataarray.forcestatusrequest[i].tglinputmili=datas.tglinputmili;
      dataarray.forcestatusrequest[i].namalengkap=datas.namalengkap;
      dataarray.forcestatusrequest[i].username=datas.username;
      dataarray.forcestatusrequest[i].approval_forcestatus=datas.approval_forcestatus;

      flag=1;
    }
    
  }

  if (flag==0) {
    dataarray.forcestatusrequest.push(datas);
  }

  //

  console.log('data baru status force');
  console.log(dataarray.forcestatusrequest);

  document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newprintpodo',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status=datas.status;
      
      dataarray.dataadminlist[i].history=datas.history;
      console.log('ckeckecekck')
        console.log(dataarray.dataadminlist[i].history);
      
      document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    }
    
  }
  loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newpackde-kirimbahan',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_kirimbahan='true';
        dataarray.dataadminlist[i].packde_kirimbahan_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newupholsteryselesai',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status='Selesai Produksi';
      dataarray.dataadminlist[i].history=datas.history;

      
      document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    }
    
  }
  loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newapprovalproduk',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;

        dataarray.dataadminlist[i].history=datas.history;
        
        dataarray.dataadminlist[i].approval_produkjadi='true';

        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newpackde-ambil',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status=datas.history[0].details.status;

      dataarray.dataadminlist[i].packde_ambil='true';
      dataarray.dataadminlist[i].packde_ambil_img=datas.folderfoto;

      dataarray.dataadminlist[i].history=datas.history;
      
      document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
    
  }
  loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newpackde-qc',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_qc='true';
        dataarray.dataadminlist[i].packde_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=JSON.stringify(datas.history);
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newadminc5qc',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;
        
        dataarray.dataadminlist[i].history=datas.history;

        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriver-ambil',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].pickup_driver='true';
        dataarray.dataadminlist[i].pickup_driver_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);

});

socket.on('newdriver-terimakonsumen',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].diterima_konsumen='true';
        dataarray.dataadminlist[i].diterima_konsumen_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);

});

socket.on('newadminc5selesaikirim',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').textContent);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;
        dataarray.dataadminlist[i].diterima_konsumen='true';
        dataarray.dataadminlist[i].history=datas.history;

        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newpackdereject-ambil',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').textContent);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].reject_ambil_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newpackdereject-qc',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriverreject-ambil',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].packde_qc='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriverreject-terimakonsumen',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].packde_qc='';
        dataarray.dataadminlist[i].pickup_driver='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});
///tutup socket io



//showtabel

function showtabel(array) {
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    //ambil data orderdate_mili mulai juli 2025 dst
    //Buat tanggal batas: 1 Juli 2025
    const batasAwal = new Date('2025-07-01').getTime();

    var datatransaksi=array;
    var datatransaksi_0 = datatransaksi.filter(item => item.orderdate_mili >= batasAwal);
    
    datatransaksi_0.forEach(item => {
        try {
            item.history = JSON.parse(item.history);
        } catch (error) {
            console.error('Gagal parse history:', item.history, error);
        }
    });

    console.log('datatransaksi_0 mulai 1 juli 2025',datatransaksi_0)

    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();
  
    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

    var tablehtml=returnarray(datatransaksi_0);
    divhapus.innerHTML=tablehtml;
    datatab.appendChild(divhapus);


    setTimeout(function () { 
        //hitungtugassaya(dataarray);
        hitungtugassaya_universal();
        document.getElementById('showmainpage').classList.remove('d-none');
        document.getElementById('loadingskeleton').classList.add('d-none');
    
    },500);
}

function returnarray(array) {
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    var datatransaksi = array;

    var status_hours =dataarray.status_hours;

        
    // Inisialisasi hasil
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

    // Fungsi pembantu untuk mendapatkan max_hours dan late_hours dari status_hours
    function getStatusHours(statusName) {
        return status_hours.find(s => s.status === statusName);
    }

    // Fungsi untuk menghitung keterlambatan
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
        return { isLate: isLate, duration: durationHours, lateHours: lateHoursCalculated };
    }

    // Tahun saat ini
    const currentYear = new Date().getFullYear();

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

        // KONDISI UTAMA: stockprodukcode=="true" (hanya untuk adminc5)
        if (stockProdukCode === "true") {
            const tglPesananDibuat = getTglInputMiliByStatus(filteredHistory, "Pesanan dibuat");
            const tglStandbyPengiriman = getTglInputMiliByStatus(filteredHistory, "Standby Pengiriman");
            const tglSelesai = getTglInputMiliByStatus(filteredHistory, "Selesai");

            // Proses QC dan Packing: dari Pesanan dibuat hingga Standby Pengiriman (untuk adminc5)
            const qcPackingStatusConfig = getStatusHours("Proses QC dan Packing");
            if (tglPesananDibuat && tglStandbyPengiriman && qcPackingStatusConfig) {
                const delay = calculateDelay(tglPesananDibuat, tglStandbyPengiriman, qcPackingStatusConfig);
                if (delay.isLate) {
                    hasilKeterlambatan.adminc5.qcpacking.jumlah++;
                    hasilKeterlambatan.adminc5.qcpacking.durasi += delay.lateHours;
                    hasilKeterlambatan.adminc5.qcpacking.detail.push(transaksi); // Tambahkan detail transaksi
                }
            }

            // Standby Pengiriman: dari Standby Pengiriman hingga Selesai (untuk adminc5)
            const standbyPengirimanStatusConfig = getStatusHours("Standby Pengiriman");
            if (tglStandbyPengiriman && tglSelesai && standbyPengirimanStatusConfig) {
                const delay = calculateDelay(tglStandbyPengiriman, tglSelesai, standbyPengirimanStatusConfig);
                if (delay.isLate) {
                    hasilKeterlambatan.adminc5.standbykirim.jumlah++;
                    hasilKeterlambatan.adminc5.standbykirim.durasi += delay.lateHours;
                    hasilKeterlambatan.adminc5.standbykirim.detail.push(transaksi); // Tambahkan detail transaksi
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
                    const delay = calculateDelay(tglPesananDibuat, tglSelesaiPrintPODo, printPODODStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.adminclassy.podo.jumlah++;
                        hasilKeterlambatan.adminclassy.podo.durasi += delay.lateHours;
                        hasilKeterlambatan.adminclassy.podo.detail.push(transaksi); // Tambahkan detail transaksi
                    }
                }
                
                // Pengiriman Bahan (untuk adminclassy)
                const pengirimanBahanStatusConfig = getStatusHours("Pengiriman Bahan");
                if (tglPengirimanBahan && tglProsesProduksi && pengirimanBahanStatusConfig) {
                    const delay = calculateDelay(tglPengirimanBahan, tglProsesProduksi, pengirimanBahanStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.adminclassy.kirimbahan.jumlah++;
                        hasilKeterlambatan.adminclassy.kirimbahan.durasi += delay.lateHours;
                        hasilKeterlambatan.adminclassy.kirimbahan.detail.push(transaksi); // Tambahkan detail transaksi
                    }
                }

                // Proses Produksi (untuk adminclassy dan upholstery)
                const prosesProduksiStatusConfig = getStatusHours("Proses Produksi");
                if (tglPengirimanBahan && tglSelesaiProduksi && prosesProduksiStatusConfig) {
                    const delay = calculateDelay(tglPengirimanBahan, tglSelesaiProduksi, prosesProduksiStatusConfig);
                    if (delay.isLate) {
                        //hasilKeterlambatan.adminclassy.produksi.jumlah++;
                        //hasilKeterlambatan.adminclassy.produksi.durasi += delay.lateHours;
                        //hasilKeterlambatan.adminclassy.produksi.detail.push(transaksi); // Tambahkan detail transaksi
                        hasilKeterlambatan.upholstery.produksi.jumlah++; // Tambah ke upholstery
                        hasilKeterlambatan.upholstery.produksi.durasi += delay.lateHours;
                        hasilKeterlambatan.upholstery.produksi.detail.push(transaksi); // Tambahkan detail transaksi upholstery
                    }
                }
                
                // Selesai Produksi (untuk adminclassy)
                const selesaiProduksiStatusConfig = getStatusHours("Approval");
                if (tglSelesaiProduksi && tglProdukDiApprove && selesaiProduksiStatusConfig) {
                    const delay = calculateDelay(tglSelesaiProduksi, tglProdukDiApprove, selesaiProduksiStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.adminclassy.selesaiproduksi.jumlah++;
                        hasilKeterlambatan.adminclassy.selesaiproduksi.durasi += delay.lateHours;
                        hasilKeterlambatan.adminclassy.selesaiproduksi.detail.push(transaksi); // Tambahkan detail transaksi
                    }
                }

                // Proses QC dan Packing (untuk adminclassy)
                const qcPackingStatusConfig = getStatusHours("Proses QC dan Packing");
                if (tglProdukDiApprove && tglStandbyPengiriman && qcPackingStatusConfig) {
                    const delay = calculateDelay(tglProdukDiApprove, tglStandbyPengiriman, qcPackingStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.adminclassy.qcpacking.jumlah++;
                        hasilKeterlambatan.adminclassy.qcpacking.durasi += delay.lateHours;
                        hasilKeterlambatan.adminclassy.qcpacking.detail.push(transaksi); // Tambahkan detail transaksi
                    }
                }

                // Standby Pengiriman (untuk packde dan driver)
                const standbyPengirimanStatusConfig = getStatusHours("Standby Pengiriman");
                if (tglStandbyPengiriman && tglDalamPengiriman && standbyPengirimanStatusConfig) {
                    const delay = calculateDelay(tglStandbyPengiriman, tglDalamPengiriman, standbyPengirimanStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.packde.standbykirim.jumlah++;
                        hasilKeterlambatan.packde.standbykirim.durasi += delay.lateHours;
                        hasilKeterlambatan.packde.standbykirim.detail.push(transaksi); // Tambahkan detail transaksi
                        hasilKeterlambatan.driver.standbykirim.jumlah++;
                        hasilKeterlambatan.driver.standbykirim.durasi += delay.lateHours;
                        hasilKeterlambatan.driver.standbykirim.detail.push(transaksi); // Tambahkan detail transaksi
                    }
                }

                // Dalam Pengiriman (untuk packde dan driver)
                const dalamPengirimanStatusConfig = getStatusHours("Dalam Pengiriman");
                if (tglDalamPengiriman && tglSelesai && dalamPengirimanStatusConfig) {
                    const delay = calculateDelay(tglDalamPengiriman, tglSelesai, dalamPengirimanStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.packde.dalampengiriman.jumlah++;
                        hasilKeterlambatan.packde.dalampengiriman.durasi += delay.lateHours;
                        hasilKeterlambatan.packde.dalampengiriman.detail.push(transaksi); // Tambahkan detail transaksi
                        hasilKeterlambatan.driver.dalampengiriman.jumlah++;
                        hasilKeterlambatan.driver.dalampengiriman.durasi += delay.lateHours;
                        hasilKeterlambatan.driver.dalampengiriman.detail.push(transaksi); // Tambahkan detail transaksi
                    }
                }

            }
            // b. untuk transaksi code2!="UP" dan stockprodukcode!="true" (untuk adminclassy, packde, driver)
            else { // code2 !== "UP"
                // Print PO-DO (untuk adminclassy)
                const printPODODStatusConfig = getStatusHours("Print PO-DO");
                if (tglPesananDibuat && tglSelesaiPrintPODo && printPODODStatusConfig) {
                    const delay = calculateDelay(tglPesananDibuat, tglSelesaiPrintPODo, printPODODStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.adminclassy.podo.jumlah++;
                        hasilKeterlambatan.adminclassy.podo.durasi += delay.lateHours;
                        hasilKeterlambatan.adminclassy.podo.detail.push(transaksi); // Tambahkan detail transaksi
                    }
                }

                // Proses QC dan Packing (untuk adminclassy dan packde)
                const qcPackingStatusConfig = getStatusHours("Proses QC dan Packing");
                if (tglProsesQCdanPacking && tglStandbyPengiriman && qcPackingStatusConfig) {
                    const delay = calculateDelay(tglProsesQCdanPacking, tglStandbyPengiriman, qcPackingStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.adminclassy.qcpacking.jumlah++;
                        hasilKeterlambatan.adminclassy.qcpacking.durasi += delay.lateHours;
                        hasilKeterlambatan.adminclassy.qcpacking.detail.push(transaksi); // Tambahkan detail transaksi
                        hasilKeterlambatan.packde.qcpacking.jumlah++;
                        hasilKeterlambatan.packde.qcpacking.durasi += delay.lateHours;
                        hasilKeterlambatan.packde.qcpacking.detail.push(transaksi); // Tambahkan detail transaksi
                    }
                }

                // Standby Pengiriman (untuk packde dan driver)
                const standbyPengirimanStatusConfig = getStatusHours("Standby Pengiriman");
                if (tglStandbyPengiriman && tglDalamPengiriman && standbyPengirimanStatusConfig) {
                    const delay = calculateDelay(tglStandbyPengiriman, tglDalamPengiriman, standbyPengirimanStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.packde.standbykirim.jumlah++;
                        hasilKeterlambatan.packde.standbykirim.durasi += delay.lateHours;
                        hasilKeterlambatan.packde.standbykirim.detail.push(transaksi); // Tambahkan detail transaksi
                        hasilKeterlambatan.driver.standbykirim.jumlah++;
                        hasilKeterlambatan.driver.standbykirim.durasi += delay.lateHours;
                        hasilKeterlambatan.driver.standbykirim.detail.push(transaksi); // Tambahkan detail transaksi
                    }
                }

                // Dalam Pengiriman (untuk packde dan driver)
                const dalamPengirimanStatusConfig = getStatusHours("Dalam Pengiriman");
                if (tglDalamPengiriman && tglSelesai && dalamPengirimanStatusConfig) {
                    const delay = calculateDelay(tglDalamPengiriman, tglSelesai, dalamPengirimanStatusConfig);
                    if (delay.isLate) {
                        hasilKeterlambatan.packde.dalampengiriman.jumlah++;
                        hasilKeterlambatan.packde.dalampengiriman.durasi += delay.lateHours;
                        hasilKeterlambatan.packde.dalampengiriman.detail.push(transaksi); // Tambahkan detail transaksi
                        hasilKeterlambatan.driver.dalampengiriman.jumlah++;
                        hasilKeterlambatan.driver.dalampengiriman.durasi += delay.lateHours;
                        hasilKeterlambatan.driver.dalampengiriman.detail.push(transaksi); // Tambahkan detail transaksi
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
    roundDurations(hasilKeterlambatan);


    console.log('hasilKeterlambatan ==',hasilKeterlambatan);

    var arrayroles=[{key:'adminc5',namabaris:'Admin C5'},{key:'adminclassy',namabaris:'Admin Classy'},{key:'driver',namabaris:'Driver'},{key:'packde',namabaris:'Packde'},{key:'upholstery',namabaris:'Upholstery'}];

    var htmlakhir=arrayroles.map((element,index)=>{

        return `
            <tr id="dataitems-${index}" data-json='${JSON.stringify(hasilKeterlambatan[element.key])}'>
                <td class="text-truncate" style="text-align: left;max-width: 11ch;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                    ${element.namabaris}
                </td>

                <td style="text-align: center;">
                    ${unitortime==0?hasilKeterlambatan[element.key].podo.jumlah:hasilKeterlambatan[element.key].podo.durasi}
                </td><!-- Print PODO -->

                <td style="text-align: center;">
                    ${unitortime==0?hasilKeterlambatan[element.key].kirimbahan.jumlah:hasilKeterlambatan[element.key].kirimbahan.durasi}
                </td><!-- Kirim Bahan -->

                <td style="text-align: center;">
                    ${unitortime==0?hasilKeterlambatan[element.key].produksi.jumlah:hasilKeterlambatan[element.key].produksi.durasi}
                </td><!-- Produksi -->
                
                <td style="text-align: center;">
                    ${unitortime==0?hasilKeterlambatan[element.key].selesaiproduksi.jumlah:hasilKeterlambatan[element.key].selesaiproduksi.durasi}
                </td><!-- Selesai Produksi -->
                
                <td style="text-align: center;">
                    ${unitortime==0?hasilKeterlambatan[element.key].qcpacking.jumlah:hasilKeterlambatan[element.key].qcpacking.durasi}
                </td><!-- QC & Packing -->
                
                <td style="text-align: center;">
                    ${unitortime==0?hasilKeterlambatan[element.key].standbykirim.jumlah:hasilKeterlambatan[element.key].standbykirim.durasi}
                </td><!-- Standby -->
                
                <td style="text-align: center;">
                    ${unitortime==0?hasilKeterlambatan[element.key].dalampengiriman.jumlah:hasilKeterlambatan[element.key].dalampengiriman.durasi}
                </td><!-- Pengiriman -->
                
                <td style="text-align: center;">
                    ${unitortime==0?hasilKeterlambatan[element.key].selesai.jumlah:hasilKeterlambatan[element.key].selesai.durasi}
                </td><!-- Selesai -->

                <!-- Start Remove Button -->
                <!-- <td style="text-align: left;" >
                    <span class="badge text-bg-secondary" style="cursor: pointer;">Detail</span>
                </td> -->
                <!-- End Remove Button -->
            </tr>
        `
    }).join('');

    //per user
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

    // Iterasi melalui setiap transaksi untuk mengisi hasilKeterlambatanPerUser
    datatransaksi.forEach(transaksi => {
        const history = transaksi.history;
        const kode2 = transaksi.code2;
        const stockProdukCode = transaksi.stockprodukcode;

        // Untuk setiap tindakan dalam history transaksi
        history.forEach(h => {
            // Hanya proses tindakan yang memiliki username dan details
            if (h.username && h.user && h.details && h.details.tglinputmili) {
                const username = h.username;
                const userName = h.user;
                const userEntry = getOrCreateUserEntry(username, userName);

                // Tentukan kategori status berdasarkan tindakan/status
                let statusKey = '';
                let startTimeMili = null;
                let endTimeMili = h.details.tglinputmili;
                let statusConfig = null;

                switch (h.tindakan) {
                    case "Selesai Print PO/DO":
                        statusKey = "podo";
                        startTimeMili = getTglInputMiliByStatus(history, "Pesanan dibuat");
                        statusConfig = getStatusHours("Print PO-DO");
                        break;
                    case "Produk diterima bagian bahan": // Ini asumsi untuk "Pengiriman Bahan"
                        statusKey = "kirimbahan";
                        // Perlu ditentukan titik awal yang jelas untuk "Pengiriman Bahan"
                        // Asumsi: dimulai dari setelah Print PO-DO atau Pesanan dibuat jika tidak ada print PO-DO
                        startTimeMili = getTglInputMiliByStatus(history, "Print PO-DO") || getTglInputMiliByStatus(history, "Pesanan dibuat");
                        statusConfig = getStatusHours("Pengiriman Bahan");
                        break;
                    case "Produk selesai produksi": // Ini asumsi untuk "Selesai Produksi"
                        statusKey = "selesaiproduksi";
                        // Asumsi: dimulai dari "Proses Produksi"
                        startTimeMili = getTglInputMiliByStatus(history, "Proses Produksi");
                        statusConfig = getStatusHours("Selesai Produksi");
                        break;
                    case "Proses QC dan Packing diselesaikan": // Ini asumsi untuk "Proses QC dan Packing"
                        statusKey = "qcpacking";
                        // Asumsi: dimulai dari "Approval" (untuk UP) atau "Print PO-DO" (non-UP)
                        if (kode2 === "UP") {
                            startTimeMili = getTglInputMiliByStatus(history, "Produk di-approve");
                        } else {
                            startTimeMili = getTglInputMiliByStatus(history, "Print PO-DO");
                        }
                        statusConfig = getStatusHours("Proses QC dan Packing");
                        break;
                    case "Packde selesai QC dan Packing": // Contoh lain yang bisa mengindikasikan QC Packing selesai
                        statusKey = "qcpacking";
                        if (kode2 === "UP") {
                            startTimeMili = getTglInputMiliByStatus(history, "Produk di-approve");
                        } else {
                            startTimeMili = getTglInputMiliByStatus(history, "Print PO-DO");
                        }
                        statusConfig = getStatusHours("Proses QC dan Packing");
                        break;
                    case "Menunggu pengambilan oleh driver": // Ini asumsi untuk "Standby Pengiriman"
                        statusKey = "standbykirim";
                        startTimeMili = getTglInputMiliByStatus(history, "Standby Pengiriman"); // Titik mulai Standby
                        statusConfig = getStatusHours("Standby Pengiriman");
                        break;
                    case "Driver pick-up dan kirim produk": // Ini asumsi untuk "Dalam Pengiriman"
                        statusKey = "dalampengiriman";
                        startTimeMili = getTglInputMiliByStatus(history, "Dalam Pengiriman"); // Titik mulai Dalam Pengiriman
                        statusConfig = getStatusHours("Dalam Pengiriman");
                        break;
                    case "Produk diterima konsumen": // Ini asumsi untuk "Selesai"
                        statusKey = "selesai";
                        // Untuk status 'Selesai', kita mungkin perlu definisi awal yang berbeda
                        // Misalnya, dari 'Dalam Pengiriman' atau 'Standby Pengiriman'
                        startTimeMili = getTglInputMiliByStatus(history, "Dalam Pengiriman") || getTglInputMiliByStatus(history, "Standby Pengiriman");
                        statusConfig = { max_hours: 0, late_hours: 0 }; // Asumsi status Selesai tidak punya batasan waktu
                        break;
                    case "Produk masuk proses produksi": // Ini asumsi untuk "Proses Produksi" dimulai
                        statusKey = "produksi";
                        // Dimulai dari "Pengiriman Bahan" atau setelah "Pengiriman Bahan" selesai
                        startTimeMili = getTglInputMiliByStatus(history, "Pengiriman Bahan");
                        statusConfig = getStatusHours("Proses Produksi");
                        break;
                    default:
                        // Lewati tindakan yang tidak relevan untuk perhitungan keterlambatan per status
                        return;
                }

                // Jika statusKey valid dan ada konfigurasi waktu
                if (statusKey && startTimeMili !== null && endTimeMili !== null && statusConfig) {
                    const delay = calculateDelay(startTimeMili, endTimeMili, statusConfig);
                    if (delay.isLate) {
                        userEntry.dataterlambat[statusKey].jumlah++;
                        userEntry.dataterlambat[statusKey].durasi += delay.lateHours;
                        userEntry.dataterlambat[statusKey].detail.push(transaksi);
                    }
                }
            }
        });
    });

    // Pembulatan durasi untuk hasilKeterlambatanPerUser
    roundDurations(hasilKeterlambatanPerUser);
    
    console.log('hasilKeterlambatanPerUser ==',hasilKeterlambatanPerUser);
    //

    return htmlakhir;
}

//tutup showtable

//tombol menu unit or time
var unitortime=0;//0 unit, 1 time
function klikunitortime(tipe) {
    unitortime = tipe;
    var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
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
  
function loadingpopup() {
    Swal.fire({
        title: "Loading ...",
        allowOutsideClick: false,
        html:
        '<progress id="loadingpersenpopoups" value="20" max="100" style="width:100%"> </progress>',
        showConfirmButton: false,
    });
    //Swal.showLoading();
}
function warningpopup(icon,title) {
    Swal.fire({
        icon:icon,
        title: '',
        text: title,
        showConfirmButton: false,
        timer: 1500
    });
}
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

function menuarrowklik(id) {
    if (document.getElementById('klikhidebar').className!='bi bi-caret-right-fill toggle-btn') {
        if (document.getElementById(id).className=='bi bi-caret-down-fill hide-on-collapse') {
            document.getElementById(id).className='bi bi-caret-up-fill hide-on-collapse';
            $(`#${id}-extend`).show();
        }else{
            document.getElementById(id).className='bi bi-caret-down-fill hide-on-collapse';
            $(`#${id}-extend`).hide();
        }
    }

}
////////
$(document).ready(function () { resizetable(); });
function resizetable() {

  var top_nav_height = 0;
  var bottom_nav_height = 0;
  var mobilespasi = 0;
  var kotaktombolatas= 0;//$("#kotaktombolatas").height();
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

  var heigfix = window_height - (top_nav_height + bottom_nav_height + mobilespasi+kotaktombolatas);
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