var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');
var gethumburger;
//console.log=function(){};

var ismobile='n';
document.addEventListener('DOMContentLoaded',async function () {
    
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
  console.log('usercek',usercek);
  if (usercek) {
      username=usercek;//localStorage.getItem('username'); 
      
      namalengkap =JSON.parse(await dbs.get('datauser')).namalengkap;
      document.getElementById('namalengkap').innerHTML=namalengkap;
  }
    else {
        window.location.href = '/';
    }

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        ismobile = 'y';
    }

    gethumburger=JSON.parse(getCookie('hamburger'));
    scrolltobuttonsidebar();
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    // console.log(dataarray.status_hours);
    // console.log(dataarray.dataadminlist);
    // //additemdropfilter(dataarray.itemsdata);
    // //showtabel(dataarray.dataadminlist);
    // showtabel(dataarray.dataadminlist);

   fetchdata()
});

function fetchdata() {
  fetch('/api/supervisor')
      .then(res => res.json())
      .then(data => {
      window.dataall = data;
      console.log('datalls =================23=',window.dataall)
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
        var modaldut=['modaldetail'];
        for (let i = 0; i < modaldut.length; i++) {
        const element = modaldut[i];
        if (document.getElementById(element).style.display=='block') {
            hidemodal(element);
        }
        }
        $progressBar.css('width', '65%');
        setTimeout(function () {
        $progressBar.css('width', '85%');
        setTimeout(function () {
            $progressBar.css('width', '97%');
            setTimeout(function () {
            showtabel(array,true);
            $progress.hide();
            
            }, 500);
        }, 2000);
        }, 2000);
    }, 1000);
}

/////////
//socket io
// const socket = io();
socket.on('newadditemadminlist',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('datas ====');
    console.log(datas);

    //var fixarrays=dataarray.dataadminlist;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dataarray.dataadminlist.unshift(element);
        
        
    }
     window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    console.log('dataarray.dataadminlist ====');
    console.log(dataarray.dataadminlist);
    loadingbawahupdate(dataarray.dataadminlist);
  
});

socket.on('neweditfullitemadminlist',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
        
     window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    console.log('edit item [3]');
    loadingbawahupdate(dataarray.dataadminlist);
}); 

socket.on('neweditforcestatus',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('neweditforcestatusnew',function(datas){
  var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

   window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newprintpodo',function(datas){
  var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status=datas.status;
      
      dataarray.dataadminlist[i].history=datas.history;
      console.log('ckeckecekck')
        console.log(dataarray.dataadminlist[i].history);
      
      document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
       window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    }
    
  }
  loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newpackde-kirimbahan',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_kirimbahan='true';
        dataarray.dataadminlist[i].packde_kirimbahan_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newupholsteryselesai',function(datas){
  var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status='Selesai Produksi';
      dataarray.dataadminlist[i].history=datas.history;
      dataarray.dataadminlist[i].upholstery_img=datas.filenamesupload;

      
      document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
       window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    }
    
  }
  loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newapprovalproduk',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;

        dataarray.dataadminlist[i].history=datas.history;
        
        dataarray.dataadminlist[i].approval_produkjadi='true';

         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newpackde-ambil',function(datas){
  var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status=datas.history[0].details.status;

      dataarray.dataadminlist[i].packde_ambil='true';
      dataarray.dataadminlist[i].packde_ambil_img=datas.folderfoto;

      dataarray.dataadminlist[i].history=datas.history;
      
      document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
       window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
    
  }
  loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newpackde-qc',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_qc='true';
        dataarray.dataadminlist[i].packde_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=JSON.stringify(datas.history);
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newadminc5qc',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;
        
        dataarray.dataadminlist[i].history=datas.history;

        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriver-ambil',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].pickup_driver='true';
        dataarray.dataadminlist[i].pickup_driver_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);

});

socket.on('newdriver-terimakonsumen',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].diterima_konsumen='true';
        dataarray.dataadminlist[i].diterima_konsumen_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newpackdereject-qc',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriverreject-ambil',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriverreject-terimakonsumen',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
         window.dataall=dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.dataadminlist);
});
///tutup socket io



////hitung tugas saya
///////////
/* function hitungtugassaya(array) {
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    console.log('alll ');
    console.log(dataarray);

    var arrays=dataarray.dataadminlist;

    const jumlahProsesProduksi = arrays.filter(element =>
        element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi'
    ).length;

    

    var arraystocks=dataarray.stockupholsterydatabase;

    console.log('alll arraystocks');
    console.log(arraystocks.length);

    const jumlahProsesProduksistock = arraystocks.filter(element =>
        element.qty!='0'&&element.upholstery_selesaibuatstock==='true'&&element.fixcreatein!='instocked'&&element.approval_produkjadi!='true'
    ).length;

    document.querySelectorAll('[name="totaltugassayapesanan"]').forEach(el => {
        el.textContent = `(${jumlahProsesProduksi})`; 
    });

    document.querySelectorAll('[name="totaltugassayapesananstock"]').forEach(el => {
        el.textContent = `(${jumlahProsesProduksistock})`; 
    });

    document.querySelectorAll('[name="totaltugassayaall"]').forEach(el => {
        el.textContent = `${jumlahProsesProduksi+jumlahProsesProduksistock}`; 
    });
} */
/////tutup hitung tugas saya

//show tabel
function showtabel(array,awalnotif=false) {
    
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    ///insert gambar item dan related id transaksi
    var dataGambar=dataarray.itemsdata;
    console.log(dataGambar);

    const gambarMap = Object.fromEntries(dataGambar.map(g => [g.product, g.image]));
    //console.log(arraysz)
    
    var databaseawal=array;
    /* if (tindakanfilter=='jalan') {
        databaseawal=dataarray.dataadminlist;

    } */
    
    var hasil = databaseawal.map(arraysx => ({
        ...arraysx,
        gambar: gambarMap[arraysx.item] || "/assets/lainnya/item-default.png" // Gambar default jika tidak ditemukan
    }));  
    console.log('hasil');
    console.log(hasil);

    // Fungsi ambil kode dasar, misalnya dari 'A001a-2025' jadi 'A001'
    function getBaseId(id_transaksi) {
        const match = id_transaksi.match(/^([A-Z0-9]+)[a-z]?-\d{4}$/);
        return match ? match[1] : id_transaksi;
    }

    // Kelompokkan berdasarkan baseId
    const baseIdMap = {};

    hasil.forEach(item => {
        const baseId = getBaseId(item.id_transaksi);
        if (!baseIdMap[baseId]) baseIdMap[baseId] = [];
        baseIdMap[baseId].push(item);
    });

    // Bangun array baru dengan properti related
    const hasil2 = hasil.map(item => {
        const baseId = getBaseId(item.id_transaksi);
        const related = baseIdMap[baseId].filter(relatedItem =>
        relatedItem.id_transaksi !== item.id_transaksi
        ).map(({ id_transaksi,no_transaksi, item, qty,gambar,colorvariant,finalprice }) => ({ id_transaksi,no_transaksi, item, qty,gambar,colorvariant,finalprice }));

        return {
        ...item,
        related
        };
    });
    
    console.log('hasil2');
    console.log(hasil2);
    ///tutup inser gambar item dan related id transaksi

    //table status
    var status_hours=dataarray.status_hours;//data status hours

    const now = Date.now(); // waktu saat ini dalam milidetik

    const newarray = [];

    hasil2.forEach((item) => {
        
        const statusLower = item.status.toLowerCase();

        // Skip jika status "selesai" atau "dibatalkan"
        if (statusLower === "selesai" || statusLower === "dibatalkan") return;

        // Parse history jadi array
        const historyArray =!Array.isArray(item.history)?JSON.parse(item.history || "[]"):item.history;//

        // Cari entry pertama yang tindakan-nya BUKAN "edit item"
        const lastValidHistory = historyArray.find(
            (entry) => entry.tindakan.toLowerCase() !== "edit item"
        );

        const tglmili_statusnow = lastValidHistory?.details?.tglinputmili || null;

        // Cari status info dari status_hours
        const statusInfo = status_hours.find(
            (s) => s.status.toLowerCase() === item.status.toLowerCase()
        );

        let status_hours_result = "In Process";

        if (statusInfo && tglmili_statusnow) {
            const durationHours = (now - tglmili_statusnow) / (1000 * 60 * 60);

            if (durationHours > statusInfo.max_hours + statusInfo.late_hours) {
            status_hours_result = "Terlambat";
            } else if (durationHours > statusInfo.max_hours) {
            status_hours_result = "Warning Keterlambatan";
            }
        }

        newarray.push({
            id_transaksi: item.id_transaksi,
            status_hours: status_hours_result,
            status_pesanan: item.status,
            tglmili_statusnow,
            detail: item,
        });
    });

    console.log('newarray====');
    console.log(newarray);

    
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("div");
    divhapus.setAttribute('id', 'divhpsdata');

    if (newarray.length>0) {
        divhapus.innerHTML=returnarray(newarray,'awal');

        datatab.appendChild(divhapus);
        //document.getElementById('datatidakditemukan').setAttribute('style','display:none;');
    } else{
        document.getElementById('datatidakditemukan').removeAttribute('style');
    }

    
  if (awalnotif==false) {
    getceknotif();
  }

    setTimeout(function () { 
        //hitungtugassaya(dataarray);
        if (gethumburger.tipeuser.toLowerCase()=='supervisor') {
            hitungtugassaya_universal();
        }
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style','display:none;');
    
    },500);

}

var ceklengloadmore;
var sortedDataGlobal = []; // Global untuk menyimpan data terurut
function returnarray(array,prosedur) {
    var newarray=array;
    // Urutkan berdasarkan prioritas status_hours
    const statusPriority = {
    "Terlambat": 0,
    "Warning Keterlambatan": 1,
    "In Process": 2
    };

    newarray.sort((a, b) => {
    return statusPriority[a.status_hours] - statusPriority[b.status_hours];
    });

    console.log('newarray====');
    console.log(newarray);

    var fixarraawal=[];
    if (prosedur == 'awal'||prosedur=='pencarian') {
        // Sortir dan simpan secara global
        sortedDataGlobal = newarray;
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
    if (prosedur === 'awal'||prosedur=='pencarian') {
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

    return fixarraawal.map(function (arraysx,indeks) {
        
        var status_hours=arraysx.status_hours;
        var status_pesanan=arraysx.status_pesanan;
        var id_transaksi=arraysx.id_transaksi;

        return `
            <div class="row row-box align-items-center" id="listtransaksi-${id_transaksi}" data-json='${JSON.stringify(arraysx)}'>
                <div class="col-auto">
                    <input class="form-check-input" type="checkbox" disabled>
                </div>
                <div class="col-3 rownamanobold">
                <span class="status-dot" style="background-color:${status_hours.toLowerCase()=='terlambat'?'rgb(255, 0, 0)':status_hours.toLowerCase()=='warning keterlambatan'?'rgb(255, 153, 0)':'green'};"></span>
                ${status_hours}
                </div>
                <div class="col-3 text-nowrap rownamanobold">${id_transaksi.split('-')[0]}</div>
                <div class="col-4 text-nowrap rownamanobold">${status_pesanan}</div>
                
                <div class="col-1 d-flex align-items-center justify-content-end">
                    <button class="btn btn-sm btn-outline-secondary" onclick="klikdetail('${id_transaksi}')">Detail</button>
                </div>
            </div>
        `;
    }).join('');
}

////loadmore
let currentIndex = 0; // Indeks data yang telah ditampilkan
var itemsPerLoad = 100; // Maksimum data yang ditampilkan per klik tombol

function loadMoreData() {
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var data=dataarray.dataadminlist;

    if (filtersavearray.length>0) {
        data=filtersavearray
    }
    $("#divhpsdata").last().append(returnarray(data,'loadmore'));

    // Sembunyikan tombol jika semua data sudah ditampilkan
    if (currentIndex >= ceklengloadmore) {
        document.getElementById('load-more-btn').style.display = 'none';
    }
}
//tutup show tabel

//pencarian

//pencarian

var filtersavearray=[];
var tindakanfilter='';

document.getElementById('pencariantombol').addEventListener('click',function(){
    const search = document.getElementById("pencarianinput").value.toLowerCase();
    if (search!='') {
        klikfilter('');
    } else {
        
    }
});

//Execute a function when the user presses a key on the keyboard
document.getElementById("pencarianinput").addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("pencariantombol").click();
    }
});

function cekempety(e) {
    if (e.value=='') {
        //klikfilter();
        var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
        filtersavearray.length=0;
        tindakanfilter='';
        datasementarasblmsearch.length=0;
        showtabel(dataarray.dataadminlist);
    }
}
var datasementarasblmsearch=[];
function klikfilter(key) {
    var searchdata;
    if (datasementarasblmsearch.length==0) {
        datasementarasblmsearch=sortedDataGlobal;
        searchdata=sortedDataGlobal;
    }else{
        searchdata=datasementarasblmsearch;
    }
    
    filtersavearray.length=0;
    tindakanfilter='jalan';
    const search =key==''?document.getElementById("pencarianinput").value.toLowerCase():key;

    console.log('search ====---');
    console.log(search);

    let filteredProducts = searchdata.filter(trx => {
        var searchMatch = trx.id_transaksi.toLowerCase().includes(search);
        
        
        return searchMatch;
    });
    if (filteredProducts.length==0) {
        tindakanfilter='';
    }
    filtersavearray=filteredProducts;
    finisfilter(filtersavearray);
}

function finisfilter(arraysfilter) {
    console.log(arraysfilter);

    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("div");
    divhapus.setAttribute('id', 'divhpsdata');

    if (arraysfilter.length>0) {
        divhapus.innerHTML=returnarray(arraysfilter,'pencarian');

        datatab.appendChild(divhapus);
    } else{
        document.getElementById('datatidakditemukan').removeAttribute('style');
        document.getElementById('load-more-btn').style.display = 'none';
    }
    

}
//tutup pencarian


//klikdetail

var editingdatas;

function klikdetail(idsx) {
    var ids=idsx;

    var databasedetailxs=JSON.parse(document.getElementById(`listtransaksi-${idsx}`).dataset.json).detail;
    console.log('====================mmm')
    console.log(databasedetailxs)


    editingdatas=databasedetailxs;

    
    console.log('databasedetailxs');
    console.log(databasedetailxs);

    document.getElementById('idtransaksi-detailshow').innerHTML=ids;

    document.getElementById('notransaksi-detailshow').innerHTML=ids.split('-')[0];

    document.getElementById('tanggal-detailshow').innerHTML=databasedetailxs.order_date;
    
    document.getElementById('estimasikirim-detailshow').innerHTML=databasedetailxs.delivered_date;

    document.getElementById('platform-detailshow').innerHTML=databasedetailxs.platform.replaceAll('_',' | ');
    document.getElementById('status-detailshow').innerHTML=databasedetailxs.status;

    
    document.getElementById('img-detailshow').src=databasedetailxs.gambar;
    document.getElementById('item-detailshow').innerHTML=databasedetailxs.item;
    document.getElementById('colorvariant-detailshow').innerHTML=databasedetailxs.colorvariant;
    document.getElementById('qty-detailshow').innerHTML=`${databasedetailxs.qty} UNIT`;
    document.getElementById('finalprice-detailshow').innerHTML=`Rp ${formatMoney(databasedetailxs.finalprice)}`;
    
    //stock up use
    if (databasedetailxs.code2.toLowerCase()=='up'&&databasedetailxs.stockprodukcode!='true') {
        document.getElementById("showstockupdetailss").classList.remove("d-none");
        console.log('showstockupdetailss removehide');

        //stock up use
        var myobj2 = document.getElementById("hapustabelstockuses");
        if (myobj2)
        myobj2.remove();

        var datatab2 = document.getElementById(`tabelstockuses`);

        var datahapusk2 = document.createElement('tbody');
        datahapusk2.id="hapustabelstockuses";

        datahapusk2.innerHTML=returnarraystockupuses(databasedetailxs);

        datatab2.appendChild(datahapusk2);
        //
    }else{
        document.getElementById("showstockupdetailss").classList.add("d-none");
        console.log('showstockupdetailss addhide');
    }
    document.getElementById('klikpanahbawahstockupopen').className=databasedetailxs.stockuses!='[]'?'bi bi-caret-up me-5':'bi bi-caret-down me-5';
    if (databasedetailxs.stockuses!='[]') {
        $('#showdetailstockupuses').show();
    }else{$('#showdetailstockupuses').hide();}
    //

    document.getElementById('klikpanahbawahresilainnya').className='bi bi-caret-down me-5';
    $('#showdetailresilainny').hide();
    if (databasedetailxs.related.length>0) {
        document.getElementById('klikpanahbawahresilainnya').className='bi bi-caret-up me-5';
        $('#showdetailresilainny').show();
    }

    document.getElementById('showdetailresilainny').innerHTML=returnarrayresilainnya(databasedetailxs.related,ids);

    document.getElementById('deliveryunit-detailshow').innerHTML=databasedetailxs.deliveryunit.replaceAll('_',' | ');

    document.getElementById('buyername-detailshow').innerHTML=databasedetailxs.buyername;
    document.getElementById('phonenumber-detailshow').innerHTML=databasedetailxs.phonenumber;
    document.getElementById('address-detailshow').innerHTML=databasedetailxs.address;

    //notes
    var extrachargeinfo='';
    if (databasedetailxs.extracharge!='[]') {
        var ex=JSON.parse(databasedetailxs.extracharge);
        for (let i = 0; i < ex.length; i++) {
        const element = ex[i];
        if (extrachargeinfo=='') {
            extrachargeinfo=`[${element.chargeitem}]\n`;
        }else{
            extrachargeinfo=`${extrachargeinfo}[${element.chargeitem}]\n`;
        }
        
        }
    }
    var platformshoppe='';
    if (databasedetailxs.platform.toLowerCase().includes('shopee')) {
        platformshoppe=databasedetailxs.platform.replace('_',' | ');
    }

    document.getElementById('notes-detailshow').value=`${platformshoppe==''?'':`[${platformshoppe}]\n`}${extrachargeinfo==''?'':`${extrachargeinfo}`}${databasedetailxs.notes.replaceAll('amp;','')}`;

    //status
    
    var myobj = document.getElementById("divhapusstatusdetail");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`allstatusshoweds`);

    var datahapusk = document.createElement('div');
    datahapusk.id="divhapusstatusdetail";
    datahapusk.className="divhapusstatusdetail";

    datahapusk.innerHTML=returnarraystatusdetail(databasedetailxs);

    datatab.appendChild(datahapusk);
    //

    


    $('#modaldetail').modal('show');
    console.log(ids);

}

function returnarraystatusdetail(arrays) {
    var datastatusitemsx;
    if (Array.isArray(arrays.history)) {
        datastatusitemsx=arrays.history;
    }else{
        datastatusitemsx=JSON.parse(arrays.history);
    }

    console.log('datastatusitemsx');
    console.log(datastatusitemsx);

    var fixdatastatusitemsx=[];
    for (let i = 0; i < datastatusitemsx.length; i++) {
        const element = datastatusitemsx[i];

        if (('details' in element)) {
        if (element.details.status!='Produk di-approve'&&element.details.status!=''&&element.details.status!='Produk jadi di-reject'&&!element.tindakan.includes('request force')&&!element.tindakan.includes('edit item')) {
            fixdatastatusitemsx.push(element);
        }
        }else{
        if (!element.tindakan.includes('request force')&&!element.tindakan.includes('edit item')) {
            fixdatastatusitemsx.push(element);
        }
        }
        
    }

    return fixdatastatusitemsx.map(function (arraysx,index) {
        console.log('arraysx  =====  ');
        console.log(arraysx);

        var status;
        var ketstatus;
        var tglinputmili;
        var fixtglset;
        var fixcssbuletdot='timeline-dot-dis';

        if (arraysx.details) {
        status=arraysx.details.status;
        ketstatus=arraysx.details.ketstatus;
        tglinputmili=arraysx.details.tglinputmili;

        fixtglset=formatTanggal(tglinputmili);

        

        }else{
        status=arraysx.tindakan;
        console.log('status');
        console.log(status);
        if (status=='add item') {
            console.log('status ---- 1');
            status='Pesanan dibuat';
            if (arraysx.stockprodukcode=='true') {
            
            ketstatus=`Pesanan dibuat oleh ${arrays.user} Menunggu Proses QC & Packing`;
            tglinputmili=parseInt(arrays.orderdate_mili);
            }else{
            ketstatus=``;
            tglinputmili=parseInt(arrays.orderdate_mili);
            }
        }else{
            console.log('status ---- 2');
            ketstatus=``;
            tglinputmili=parseInt(arrays.tglinputmili);
        }
        
        

        fixtglset=formatTanggal(tglinputmili);
        }

        //fixcssbuletdot
        var linevertikal='<div class="timeline-line"></div>';
        if (index==0) {
        fixcssbuletdot='timeline-dot';
        if (fixdatastatusitemsx.length==1) {
            linevertikal='';
        }
        }else{
        if (index+1==fixdatastatusitemsx.length) {
            linevertikal='';
            if (fixdatastatusitemsx.length==1) {
            fixcssbuletdot='timeline-dot';
            }
            
        }
        
        }
        
        
        return `
        <div class="timeline-row">
            <div class="timeline-text text-end" style="max-width: 180px;">
            ${fixtglset.split('_')[0]}<br />
            ${status=='Pesanan dibuat'?'':fixtglset.split('_')[1]}
            </div>

            <div class="timeline-dot-wrapper">
            <div class="${fixcssbuletdot}"></div>
            ${linevertikal}
            </div>

            <div class="timeline-text">
            <strong>${status}</strong><br />
            ${ketstatus}
            
            ${status.toLowerCase()=='selesai'&&arrays.stockprodukcode!='true'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.diterima_konsumen_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}

            ${status.toLowerCase()=='selesai produksi'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.upholstery_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}

            ${status.toLowerCase()=='proses produksi'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.packde_kirimbahan_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}

            ${status.toLowerCase()=='proses qc dan packing'&&arrays.code2.toLowerCase()=='up'&&arrays.stockprodukcode!='true'&&arrays.stockuses=='[]'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.packde_ambil_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}

            ${status.toLowerCase()=='standby pengiriman'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.packde_qc_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}

            ${status.toLowerCase()=='dalam pengiriman'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.pickup_driver_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}


            
            <!--- ------------------------------------- --->

            ${arraysx.tindakan.toLowerCase()=='reject saat pengambilan item'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_ambil_img}" data-title="Keterangan" data-desc="${arraysx.details.keterangankerusakan}">Foto/Video</span>`:''}

            ${arraysx.tindakan.toLowerCase()=='reject saat qc item'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_qc_img}" data-title="Keterangan" data-desc="${arraysx.details.keterangankerusakan}">Foto/Video</span>`:''}

            ${arraysx.tindakan.toLowerCase()=='reject saat pick-up driver'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_qc_img}" data-title="Keterangan" data-desc="${arraysx.details.keterangankerusakan}">Foto/Video</span>`:''}
            
            ${arraysx.tindakan.toLowerCase()=='reject saat diterima konsumen'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_kirim_img}" data-title="Keterangan" data-desc="${arraysx.details.keterangankerusakan}">Foto/Video</span>`:''}
            
            </div>
        </div>
        `;

        // ${status.toLowerCase()=='selesai'&&arrays.stockprodukcode!='true'?`<a href="${arrays.diterima_konsumen_img}" style="cursor:pointer;" target="_blank">${arrays.diterima_konsumen_img==''?'':'LINK'}</a>.`:''} ${arraysx.tindakan.toLowerCase()=='reject saat pengambilan item'?`<a href='/view?file=${window.btoa(`${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_ambil_img}$$$-$$$${arraysx.details.keterangankerusakan}`)}' style='cursor:pointer;' target='_blank'>LINK</a>`:''} ${arraysx.tindakan.toLowerCase()=='reject saat qc item'?`<a href='/view?file=${window.btoa(`${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_qc_img}$$$-$$$${arraysx.details.keterangankerusakan}`)}' style='cursor:pointer;' target='_blank'>LINK</a>`:''} ${arraysx.tindakan.toLowerCase()=='reject saat pick-up driver'?`<a href='/view?file=${window.btoa(`${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_qc_img}$$$-$$$${arraysx.details.keterangankerusakan}`)}' style='cursor:pointer;' target='_blank'>LINK</a>`:''} ${arraysx.tindakan.toLowerCase()=='reject saat diterima konsumen'?`<a href='/view?file=${window.btoa(`${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_qc_img}$$$-$$$${arraysx.details.keterangankerusakan}`)}' style='cursor:pointer;' target='_blank'>LINK</a>`:''}
        
    }).join('');
}

// set tanggal, hari dan jam wib
function getZonaWaktuIndonesia() {
    const offsetMenit = new Date().getTimezoneOffset();
    const offsetJam = -offsetMenit / 60;

    if (offsetJam === 7) return 'WIB';
    if (offsetJam === 8) return 'WITA';
    if (offsetJam === 9) return 'WIT';

    return 'Luar Indonesia';
}
var datedenganzona='';
function formatTanggal(timestamp) {
    const zona = getZonaWaktuIndonesia();

    const zonaOffset = {
        'WIB': 7,
        'WITA': 8,
        'WIT': 9
    };

    if (!zonaOffset[zona]) {
        return 'Zona waktu tidak dikenali';
    }

    const date = new Date(timestamp + zonaOffset[zona] * 60 * 60 * 1000);

    const namaHari = [
        'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
    ];

    const namaBulan = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const hari = namaHari[date.getUTCDay()];
    const tanggal = String(date.getUTCDate()).padStart(2, '0');
    const bulan = namaBulan[date.getUTCMonth()];
    const tahun = date.getUTCFullYear();
    const jam = String(date.getUTCHours()).padStart(2, '0');
    const menit = String(date.getUTCMinutes()).padStart(2, '0');
    datedenganzona=`${tanggal} ${bulan} ${tahun}_${jam}:${menit} ${zona}`;
    return `${hari}, ${datedenganzona}`;
}
///
function returnarraystockupuses(arrays) {
    var datastockupitemsx;
    if (Array.isArray(arrays.stockuses)) {
        datastockupitemsx=arrays.stockuses;
    }else{
        if (arrays.stockuses=='') {
        datastockupitemsx=[];
        }else{
        datastockupitemsx=JSON.parse(arrays.stockuses);
        }
        
    }

    if (datastockupitemsx.length>0) {
        return datastockupitemsx.map(function (arraysx,index) {
        return `
            <tr>
            <td style="text-align: left;">${arraysx.id_stock.split('-')[0]}</td>
            <td style="text-align: right;">${arraysx.qty_pakai}</td>
            
            </tr>
        `;
        }).join('');
    }else{
        return '';
    }
}
///

function stockupopenit() {
    if (document.getElementById('klikpanahbawahstockupopen').className=='bi bi-caret-down me-5') {

        document.getElementById('klikpanahbawahstockupopen').className='bi bi-caret-up me-5';
        $('#showdetailstockupuses').show();

    }else{
        document.getElementById('klikpanahbawahstockupopen').className='bi bi-caret-down me-5';
        $('#showdetailstockupuses').hide();
    }
}

function detailresilainnyaopen() {
    var ids=document.getElementById('idtransaksi-detailshow').innerHTML;

    var databasedetailxs=JSON.parse(document.getElementById(`listtransaksi-${ids}`).dataset.json).detail;

    if (document.getElementById('klikpanahbawahresilainnya').className=='bi bi-caret-down me-5') {
        console.log('databasedetailxs ========');
        console.log(databasedetailxs.related);

        if (databasedetailxs.related.length>0) {
        document.getElementById('klikpanahbawahresilainnya').className='bi bi-caret-up me-5';
        $('#showdetailresilainny').show();
        }
    }else{
        document.getElementById('klikpanahbawahresilainnya').className='bi bi-caret-down me-5';
        $('#showdetailresilainny').hide();
    }

}

function returnarrayresilainnya(array,idawal) {
    // Urutkan berdasarkan id_transaksi
    array.sort((a, b) => a.id_transaksi.localeCompare(b.id_transaksi));

    return array.map(function (arraysx) {
        return `
        <div class="row mb-3" id="div-${arraysx.id_transaksi}-${idawal}">
            <div class="col-8 d-flex align-items-center justify-content-start">
                <img src="${arraysx.gambar}" alt="imageitems" id="img-resilainnya-${arraysx.id_transaksi}-${idawal}" class="img-fluid" style="border-radius: 8px;width: 15%;">
                <div class="ms-4">
                    <span id="notransaksi-detailshowlainnya-${arraysx.id_transaksi}-${idawal}" style="font-weight: bold;">${arraysx.no_transaksi}</span>
                    <br>
                    <span id="item-detailshowlainnya-${arraysx.id_transaksi}-${idawal}" style="font-weight: bold;">${arraysx.item}</span>
                    <br>
                    <span id="colorvariant-detailshowlainnya-${arraysx.id_transaksi}-${idawal}">${arraysx.colorvariant}</span>
                </div>
            </div>
            
            <div class="col-4 d-flex align-items-center justify-content-end">
                <div>
                    <span id="qty-detailshowlainnya-${arraysx.id_transaksi}-${idawal}"">${arraysx.qty} UNIT</span>
                    <br>
                    <span id="finalprice-detailshowlainnya-${arraysx.id_transaksi}-${idawal}"" style="font-weight: bold;">Rp ${formatMoney(arraysx.finalprice)}</span>
                </div>
            </div>
        </div>
        `;
    }).join('');
}
////////////////////////////////////////////
//tutup klikdetail



/////////////////////////universal/////////////////////
  
// function loadingpopup() {
//     Swal.fire({
//         title: "Loading ...",
//         allowOutsideClick: false,
//         html:
//         '<progress id="loadingpersenpopoups" value="20" max="100" style="width:100%"> </progress>',
//         showConfirmButton: false,
//     });
//   //Swal.showLoading();
// }
// function warningpopup(icon,title) {
//     Swal.fire({
//         icon:icon,
//         title: title,
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