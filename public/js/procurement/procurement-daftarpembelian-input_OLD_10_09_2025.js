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
    // console.log(dataarray);
    // //additemdropfilter(dataarray.itemsdata);
    // showtabel(dataarray.datarequestbeli_proc);
    //showtabel(dataarray.dataadminlist);
    fetchdata();
});

function fetchdata() {
  fetch('/api/daftarpembelian/request')
      .then(res => res.json())
      .then(data => {
      window.dataall = data;
      console.log('datalls =================23=',window.dataall)
      // worker_threads(data);
      // additemdropfilter(data.itemsdata);
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
const socket = io();
socket.on('newadditemadminlist',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('datas ====');
    console.log(datas);

    //var fixarrays=dataarray.dataadminlist;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dataarray.dataadminlist.unshift(element);
        
        
    }
     window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    console.log('dataarray.dataadminlist ====');
    console.log(dataarray.dataadminlist);
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});



socket.on('neweditfullitemadminlist',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
        
     window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    console.log('edit item [3]');
    loadingbawahupdate(dataarray.datarequestbeli_proc);
}); 

socket.on('newquickedititemadminlist',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].order_date=datas.order_date;
        dataarray.dataadminlist[i].orderdate_mili=datas.orderdate_mili;
        dataarray.dataadminlist[i].delivered_date=datas.delivered_date;
        dataarray.dataadminlist[i].item=datas.item;
        dataarray.dataadminlist[i].qty=datas.qty;
        dataarray.dataadminlist[i].finalprice=datas.finalprice;
        dataarray.dataadminlist[i].price=datas.price;
        dataarray.dataadminlist[i].diskon_persen=datas.diskon_persen;
        dataarray.dataadminlist[i].diskon_amount=datas.diskon_amount;
        dataarray.dataadminlist[i].status=datas.status;
        dataarray.dataadminlist[i].code2=datas.code2;
        dataarray.dataadminlist[i].notes=datas.notes;
        dataarray.dataadminlist[i].colorvariant=datas.colorvariant;
        dataarray.dataadminlist[i].history=datas.history;
        dataarray.dataadminlist[i].extracharge=datas.extracharge;
        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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

socket.on('newapprovalforcestatuss',function(datas){
  console.log('reload approval force status');
  console.log(datas);
  var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  var dataupdateds=dataarray.dataadminlist;
  for (let i = 0; i < dataupdateds.length; i++) {
    const element = dataupdateds[i];
      if (element.id_transaksi==datas.id_transaksi) {
        if (element.status.toLowerCase()!='selesai'&&element.status.toLowerCase()!='dibatalkan') {
          if (datas.approveorreject=='approve') {
            dataupdateds[i].status=datas.history[0].tindakan=='Approved Force Sent'?'Selesai':datas.history[0].tindakan=='Approved Force Cancel'?'Dibatalkan':datas.history[0].tindakan=='Approved Force Pending'?'Pending':'Priority';
            var oldhistoriesy=JSON.parse(element.history);
            const combined = [...datas.history, ...oldhistoriesy];
            
            dataupdateds[i].history=JSON.stringify(combined);

            console.log(oldhistoriesy);
            console.log(dataupdateds[i].history);

            console.log('reload dataupdateds force status');
            console.log(dataupdateds);
            //document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
             window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
          }
          
        }else{
          console.log('tidak terjadi forcestatus');
        }
          
      }
    //dattockup.push(element);
  }
  
  loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('neweditforcestatusnew',function(datas){
  var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

   window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newklikprinpodo',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        for (let j = 0; j < dataarray.dataadminlist.length; j++) {
        const element2 = dataarray.dataadminlist[j];
        if (element2.id_transaksi==element.id_transaksi) {
            dataarray.dataadminlist[j].klik_print_podo='true';
        }
        }
        
    }
     window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newprintpodo',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;

        dataarray.dataadminlist[i].history=datas.history;
        
        dataarray.dataadminlist[i].print_podo='true';

         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newpackde-kirimbahan',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_kirimbahan='true';
        dataarray.dataadminlist[i].packde_kirimbahan_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newupholsteryselesai',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].upholstery_jadi='true';
        dataarray.dataadminlist[i].upholstery_img=datas.filenamesupload;

        dataarray.dataadminlist[i].history=datas.history;

        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});


socket.on('newapprovalproduk',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;

        dataarray.dataadminlist[i].history=datas.history;
        
        dataarray.dataadminlist[i].approval_produkjadi='true';

         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});


socket.on('newpackdereject-ambil',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].reject_ambil_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newpackdereject-qc',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newpackde-ambil',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_ambil='true';
        dataarray.dataadminlist[i].packde_ambil_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newpackde-qc',function(datas){

    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_qc='true';
        dataarray.dataadminlist[i].packde_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);

});


socket.on('newdriverreject-ambil',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('newdriverreject-terimakonsumen',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
        
         window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('neweaddreqbeli',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    dataarray.datarequestbeli_proc.push(...datas);

     window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('neweapprovereqbeli',function(datas){
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //datarequestbeli_proc
    for (let i = 0; i < dataarray.datarequestbeli_proc.length; i++) {
        const element = dataarray.datarequestbeli_proc[i];
        
        if (element.no==datas.no) {
            dataarray.datarequestbeli_proc[i].id_request=datas.approvalorreject=='true'?datas.id_request:'';
            dataarray.datarequestbeli_proc[i].approver=datas.approver;
            dataarray.datarequestbeli_proc[i].note_approver=datas.note_approver;
            dataarray.datarequestbeli_proc[i].approvalorreject=datas.approvalorreject;
            dataarray.datarequestbeli_proc[i].tglmili_approval=datas.tglmili_approval;
            dataarray.datarequestbeli_proc[i].vendor=datas.vendor;
            dataarray.datarequestbeli_proc[i].z_qty=datas.z_qty;
            dataarray.datarequestbeli_proc[i].priceunit=datas.priceunit;
            dataarray.datarequestbeli_proc[i].totalprice=datas.totalprice;
            dataarray.datarequestbeli_proc[i].pendingpayment=datas.pendingpayment;
            dataarray.datarequestbeli_proc[i].bank=datas.bank;
            dataarray.datarequestbeli_proc[i].lokasiterima=datas.lokasiterima;
            dataarray.datarequestbeli_proc[i].kodecoa=datas.kodecoa;

             window.dataall=dataarray;  //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.datarequestbeli_proc);

});

//tutup socket io


//show tabel
function showtabel(array) {
    
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();
  
    var datatab = document.getElementById(`alldattab`);
  
    var divhapus = document.createElement("div");
    divhapus.setAttribute('id', 'divhpsdata');

    console.log('array ========');
    console.log(array);

    divhapus.innerHTML=returnarray(array,'awal');

    datatab.appendChild(divhapus);


    setTimeout(function () { 
        hitungtugassaya_universal();
        hitungtotaltersisa();//hitung total tersisa
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style','display:none;');
    
    },500);
}

var ceklengloadmore;
var sortedDataGlobal = []; // Global untuk menyimpan data terurut

function returnarray(array,prosedur) {

    // Urutkan berdasarkan tglmili dari Z ke A (terbaru ke terlama)
    array.sort((a, b) => new Date(parseInt(b.tglmili_approval)) - new Date(parseInt(a.tglmili_approval)));

    var fixarraawal=[];
    if (prosedur == 'awal'||prosedur=='pencarian') {
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

    console.log('fixarraawal');
    console.log(fixarraawal);

    

    return fixarraawal.map(function(element,index){
        var zqtyaktif=element.z_qty==0?'d-none':'';//show tanda z qty jika z_qty > 0
        var pendingaktif=element.pendingpayment=='false'?'d-none':'';

        if (element.approvalorreject=='true'&&element.tindakbayar!='true') {
            return `
                <div class="card items mb-3 p-3">
                    <div class="d-none" id="dataitems-${index}" data-json='${JSON.stringify(element)}'></div>
                    <div class="d-flex justify-content-between align-items-center ms-2 me-2">
                        <div>
                            <span class="text-muted rownama" id="statusinput-${index}">Input</span>
                            <span class="mx-1 rownama">/ </span>
                            <span class="rownama" id="id_transaksi-${index}">${element.id_request.split('-')[0]}</span>
                            <span class="mx-1 rownama"> / </span>
                            <i class="bi bi-person"></i>
                            <span class="rownama" id="vendor-${index}">${element.vendor}</span>
                            <span class="mx-1 rownama"> / </span>
                            <span class="rownama" id="totalprice-${index}">Rp ${formatMoney(element.totalprice)}</span>
                        </div>
                        <div>
                            <span class="badge bg-danger text-white ${pendingaktif}" id="pendingaktif-${index}">PENDING</span>
                            <span class="badge bg-light text-dark ${zqtyaktif}" id="zqtyaktif-${index}">[ Z-DIFF ]</span>
                            <i class="bi bi-calendar-week ms-2"></i>
                            <span class="text-muted ms-2" id="tanggalapprovereq-${index}">${formatDatess(parseInt(element.tglmili_approval))}</span>
                        </div>
                    </div>
                    <hr>

                    <div class="row align-items-stretch ms-1 me-1 isicardnew">
                        <div class="col">
                            <div class="h-100 border border-secondary-subtle rounded-3 p-2 d-flex align-items-center">
                                <div class="col-auto me-3">
                                    <img src="/assets/lainnya/item-default.png" class="rounded" width="80" height="80" alt="item Image" id="itemimage-${index}">
                                </div>
                                <div class="col">
                                    <div class="fw-semibold" id="namaitem-${index}">${element.item}</div>
                                    <div class="text-muted ms-auto text-end" id="qty-${index}">${element.qty} X ${element.unit}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col">
                            <div class="h-100 border border-secondary-subtle rounded-3 p-2 d-flex align-items-center">
                                <div class="col me-3">
                                    <textarea class="form-control" placeholder="Leave a comment here" id="notes-${index}" style="min-height: 110px;">Requester: ${element.note_req==''?'......':element.note_req}\n\nProcurement: ${element.note_approver==''?'......':element.note_approver}</textarea>
                                    
                                </div>
                                <div class="col-auto d-flex flex-column gap-2">
                                    <button class="btn btn-light border border-secondary-subtle" onclick="klikdetails('${index}')">Detail</button>
                                    <button class="btn btn-light" style="background-color:grey;color:white;" onclick="kliktindaks('${index}')">Tindak</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
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

    return `${dd}/${mm}/${yyyy}`;
}
function formatDatessWithHHMM(millis) {
    const date = new Date(millis);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}
////loadmore
let currentIndex = 0; // Indeks data yang telah ditampilkan
var itemsPerLoad = 50; // Maksimum data yang ditampilkan per klik tombol

function loadMoreData() {
    var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

//hitung total tersisa
function hitungtotaltersisa() {
     var dataarray=window.dataall; 
    var datareqproc=dataarray.datarequestbeli_proc;
    // var datareqproc=JSON.parse(document.getElementById('itemalls').dataset.json).datarequestbeli_proc;

    let totalApproved = datareqproc.filter(item => item.approvalorreject === "true").reduce((sum, item) => sum + Number(item.totalprice), 0);

    let totalPaid = datareqproc.filter(item => item.tindakbayar === "true").reduce((sum, item) => sum + Number(item.totalprice), 0);

    let totalTersisa = totalApproved - totalPaid;

    console.log("Total Approved:", totalApproved);
    console.log("Total Dibayar:", totalPaid);
    console.log("Total Tersisa:", totalTersisa);

    document.getElementById('totaltersisakiri').innerHTML=`Rp ${formatMoney(totalTersisa)}`;
}
//tutup hitung total tersisa

//pencarian

var filtersavearray=[];
var tindakanfilter='';

document.getElementById('pencariantombol').addEventListener('click',function(){
    const search = document.getElementById("pencarianinput").value.toLowerCase();
    if (search!='') {
        klikfilter();
    } else {
        
    }
});

// Execute a function when the user presses a key on the keyboard
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
        var dataarray=window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
        filtersavearray.length=0;
        tindakanfilter='';
        showtabel(dataarray.datarequestbeli_proc);

        if (menukliks=='hari ini') {
            showtabel(datahariini);
        }
    }
}

function klikfilter(e) {
    filtersavearray.length=0;
    tindakanfilter='jalan';
    const search = document.getElementById("pencarianinput").value.toLowerCase();
    
    //var maxleng=20;
 var dataarray=window.dataall.datarequestbeli_proc;

 console.log(dataarray);
 
    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).datarequestbeli_proc;

    if (menukliks=='hari ini') {
        dataarray=datahariini;
    }

    let datasearchs = dataarray.filter(item => 
    item.approvalorreject === "true" && item.tindakbayar !== "true"
    );

    let filteredProducts = datasearchs.filter(trx => {
        var searchMatch = trx.item.toLowerCase().includes(search) ||
        trx.requester.toLowerCase().includes(search) ||
        trx.id_request.toLowerCase().includes(search) ||
        trx.vendor.toLowerCase().includes(search) ||
        formatDatess(trx.tglmili_approval).replaceAll('/','').toLowerCase().includes(search);
        

        //let statusMatch = status ? trx.status === status : true;
        //let itemMatch = item ? trx.item === item : true;
        return searchMatch;
    });

    console.log('filter awal');
    
    console.log(filteredProducts);
    
    /* if (filteredProducts.length<20) {
        maxleng=filteredProducts.length;
    }
    var fixarraawal=[];
    for (let i = 0; i < maxleng; i++) {
        const element = filteredProducts[i];
        var filtersearchitem;
    
        fixarraawal.push(element);
        
        
    } */
    
    if (filteredProducts.length==0) {
        tindakanfilter='';
    }
    filtersavearray=filteredProducts;
    console.log('filter');
    console.log(filteredProducts);
    showtabel(filteredProducts);
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
        divhapus.innerHTML=returnarray(arraysfilter);

        datatab.appendChild(divhapus);
    } 

}
//tutup pencarian

//submenu : hari ini | semua
var menukliks='semua';
var datahariini;
function klikduamenu(menukliked,indextombol) {
    menukliks=menukliked;

    // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).datarequestbeli_proc;
 var dataarray=window.dataall.datarequestbeli_proc;
    console.log('dataarray');
    console.log(dataarray);

    if (menukliked=='hari ini') {
        // Dapatkan tanggal hari ini (tanpa jam) dalam format lokal
        let today = new Date();
        let todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        let todayEnd = todayStart + 86400000; // +24 jam dalam milidetik

        let dataHariIni = dataarray.filter(item => 
        item.approvalorreject === "true" &&
        item.tindakbayar !== "true" &&
        Number(item.tglmili_approval) >= todayStart &&
        Number(item.tglmili_approval) < todayEnd
        );
        dataarray=dataHariIni;
        datahariini=dataHariIni;

        console.log('dataHariIni');
        console.log(dataHariIni);
    }

    console.log('data klik 2 tombol');
    console.log(dataarray);

    showtabel(dataarray);

    var tombols=document.querySelectorAll('[name="tombolduamenu"]');
    for (let i = 0; i < tombols.length; i++) {
        const element = tombols[i];
        if (i!=indextombol) {
            element.classList.remove('btn-secondary');
            element.classList.add('btn-light');
        }else{
            element.classList.remove('btn-light');
            element.classList.add('btn-secondary');
        }
        
    }
}
//tutup submenu : hari ini | semua
// 

//klikdetails
function klikdetails(indek) {
     var dataarray=window.dataall;
    var dataitemproc=dataarray.databaseitem_proc;
    // var dataitemproc=JSON.parse(document.getElementById(`itemalls`).dataset.json).databaseitem_proc;
    var dataitemx=JSON.parse(document.getElementById(`dataitems-${indek}`).dataset.json);
    console.log('dataitemx ===');
    console.log(dataitemx);

    document.getElementById('idrequestshows').innerHTML=dataitemx.id_request.split('-')[0];

    document.getElementById('statuspesanan').innerHTML=dataitemx.approvalorreject=='true'&&dataitemx.tindakbayar!='true'?'Terinput':dataitemx.approvalorreject=='false'&&dataitemx.tindakbayar!='true'?'Pending':'Terbayar';

    document.getElementById('tgl-permintaan').innerHTML=`<span  class="namadetail-inputs-proc">${dataitemx.requester}</span>&nbsp; - `+formatDatessWithHHMM(parseInt(dataitemx.tglinputmili));

    
    document.getElementById('tgl-pemesanan').innerHTML=`<span  class="namadetail-inputs-proc">${dataitemx.approver}</span>&nbsp; - `+formatDatessWithHHMM(parseInt(dataitemx.tglmili_approval));
    
    document.getElementById('tgl-terbayar').innerHTML=dataitemx.tglmili_tindakbayar==''||dataitemx.tglmili_tindakbayar==0?'-':`<span class="namadetail-inputs-proc">${dataitemx.buyer}</span>&nbsp; - `+formatDatessWithHHMM(parseInt(dataitemx.tglmili_tindakbayar));

    document.getElementById('tgl-terima').innerHTML=dataitemx.tglmili_terima==''||dataitemx.tglmili_terima==0?'-':`<span  class="namadetail-inputs-proc">${dataitemx.penerima}</span>&nbsp; - `+formatDatessWithHHMM(parseInt(dataitemx.tglmili_terima));

    document.getElementById('kodecoa-details').innerHTML=dataitemx.kodecoa==''?'-':dataitemx.kodecoa;
    var ketcoas=ambilketcoa(dataitemx.kodecoa);
    document.getElementById('ket-kodecoa-details').innerHTML=ketcoas==undefined?'-':ketcoas;
    
    document.getElementById('divisi-details').innerHTML=dataitemx.itemdivisi;

    document.getElementById('hargeperunit-details').innerHTML=`Rp ${formatMoney(dataitemx.priceunit)}`;

    document.getElementById('zqty-details').innerHTML=dataitemx.z_qty;

    document.getElementById('qty-details').innerHTML=dataitemx.qty;

    document.getElementById('namaitem-details').innerHTML=dataitemx.item;

    document.getElementById('qty2-details').innerHTML=`${dataitemx.qty} X ${dataitemx.unit}`;

    document.getElementById('totalprice-details').innerHTML=`Rp ${formatMoney(dataitemx.totalprice)}`;

    document.getElementById('bank-details').innerHTML=dataitemx.bank;

    document.getElementById('vendor-details').innerHTML=dataitemx.vendor;

    document.getElementById('noterequester-details').value=dataitemx.note_req;

    document.getElementById('noteprocurement-details').value=dataitemx.note_approver;

    //note database
    // Cari item dengan nama dan divisi yang cocok
    const foundItem = dataitemproc.find(el => el.item === dataitemx.item && el.divisi === dataitemx.itemdivisi);

    // Tambahkan note_database jika ditemukan
    if (foundItem) {
        document.getElementById('notedatabase-details').value = foundItem.note;
    } else {
        document.getElementById('notedatabase-details').value = ''; // kosong jika tidak ditemukan
    }

    document.getElementById('tipeitem-details').innerHTML=dataitemx.tipeitem;

    document.getElementById('pendingpayment-details').className='d-none';
    if (dataitemx.pendingpayment=='true') {
        document.getElementById('pendingpayment-details').classList.remove('d-none');
    }
    
    document.getElementById('edit-details').dataset.json=JSON.stringify(dataitemx);

    $('#modaldetailinput').modal('show');
}
//tutup klikdetails

//detailprocdetailklik
function detailprocdetailklik() {
    var panahstatus=document.getElementById('klikpanahbawahdetailproc');
    console.log('panah')
    if (panahstatus.className=='bi bi-caret-up') {
        panahstatus.className='bi bi-caret-down';
        document.getElementById('detailprocshow-details').classList.add('d-none');
    }else{
        panahstatus.className='bi bi-caret-up';
        document.getElementById('detailprocshow-details').classList.remove('d-none');
    }
}
//tutup detailprocdetailklik

//klikedit_details
function klikedit_details(e) {
    var dataitemx=JSON.parse(e.dataset.json);
    console.log('klikedit_details');
    console.log(dataitemx);

    document.getElementById('dataedit-items').dataset.json=JSON.stringify(dataitemx);

    document.getElementById('tipeitem-modaldetailinputedit').innerHTML=dataitemx.tipeitem.toLowerCase()=='regular'?'Regular Item':'New Item';

    document.getElementById('notransaksishow-modaldetailinputedit-1').value=dataitemx.id_request.split('-')[0];

    document.getElementById('notransaksisave-modaldetailinputedit-1').value=dataitemx.id_request;

    document.getElementById('namabarang-modaldetailinputedit-1').value=dataitemx.item;

    document.getElementById('divisi-modaldetailinputedit-1').value=dataitemx.itemdivisi;

    setselekvendor();
    listbank();

    document.getElementById('vendor-modaldetailinputedit-1').value=dataitemx.vendor;

    document.getElementById('bank-modaldetailinputedit-1').value=dataitemx.bank;

    document.getElementById('namarequester-modaldetailinputedit-1').value=namalengkap;

    document.getElementById('coa-modaldetailinputedit-1').value=dataitemx.kodecoa;
    var ketcoas=ambilketcoa(dataitemx.kodecoa);
    document.getElementById('ketcoa-modaldetailinputedit-1').value=ketcoas==undefined?'-':ketcoas;

    document.getElementById('lokasiterima-modaldetailinputedit-1').value=dataitemx.lokasiterima;

    document.getElementById('onoffpendingpayment-modaldetailinputedit').checked=dataitemx.pendingpayment=='true'?true:false;

    document.getElementById('qty-modaldetailinputedit-1').value=dataitemx.qty;

    document.getElementById('zqty-modaldetailinputedit-1').value=dataitemx.z_qty;

    var tipeitemx=document.getElementById('tipeitem-details').innerHTML;

    console.log('tipeitemx');
    console.log(tipeitemx);

    if (tipeitemx.toLowerCase()=='regular') {
        document.getElementById('hargaunitshow-modaldetailinputedit-1').classList.remove('d-none');
        document.getElementById('hargaunitsave-modaldetailinputedit-1').classList.add('d-none');
        document.getElementById('hargaunitsave-modaldetailinputedit-1').disabled=true;
        console.log('reg');
        console.log(tipeitemx);
    }else{
        document.getElementById('hargaunitshow-modaldetailinputedit-1').classList.add('d-none');
        document.getElementById('hargaunitsave-modaldetailinputedit-1').classList.remove('d-none');
        document.getElementById('hargaunitsave-modaldetailinputedit-1').disabled=false;
        console.log('new i');
        console.log(tipeitemx);
    }

    document.getElementById('hargaunitshow-modaldetailinputedit-1').value=`Rp ${formatMoney(dataitemx.priceunit)}`;

    document.getElementById('hargaunitsave-modaldetailinputedit-1').value=dataitemx.priceunit;

    document.getElementById('totalshow-modaldetailinputedit-1').value=`Rp ${formatMoney(dataitemx.totalprice)}`;

    document.getElementById('totalsave-modaldetailinputedit-1').value=dataitemx.totalprice;

    document.getElementById('noterequester-modaldetailinputedit-1').value=dataitemx.note_req;
    
    document.getElementById('noteprocurement-modaldetailinputedit-1').value=dataitemx.note_approver;

    $('#modaldetailinputedit').modal('show');
}
//tutup klikedit_details


//oninputdata_modaldetailinputedit
var itemediting;
var flag_edit=0;
function oninputdata_modaldetailinputedit() {
    var dataolds=JSON.parse(document.getElementById('dataedit-items').dataset.json);

    var id_request=document.getElementById('notransaksisave-modaldetailinputedit-1').value;

    var vendor_editing=document.getElementById('vendor-modaldetailinputedit-1').value;

    var bank_editing=document.getElementById('bank-modaldetailinputedit-1').value;

    var lokasiterima_editing=document.getElementById('lokasiterima-modaldetailinputedit-1').value;

    //z-qty
    var zqty_editing=document.getElementById('zqty-modaldetailinputedit-1').value;
    
    var qty_editing=document.getElementById('qty-modaldetailinputedit-1').value;

    var hargaunitsave_editing=document.getElementById('hargaunitsave-modaldetailinputedit-1').value;
    

    var totalharga_editing=zqty_editing==0||zqty_editing==''?qty_editing*hargaunitsave_editing:zqty_editing*hargaunitsave_editing;
    
    document.getElementById('totalsave-modaldetailinputedit-1').value=totalharga_editing;

    console.log('totalharga_editing===');
    console.log(totalharga_editing);

    document.getElementById('totalshow-modaldetailinputedit-1').value=`Rp ${formatMoney(totalharga_editing)}`;

    var noteprocurement_editing=document.getElementById('noteprocurement-modaldetailinputedit-1').value;

    //pending payment
    var pendingpayment_editing=document.getElementById('onoffpendingpayment-modaldetailinputedit').checked==true?'true':'false';

    var newhistory=[];
    if (dataolds.history_edit!='') {
        if (JSON.parse(dataolds.history_edit).length>0) {
            newhistory=JSON.parse(dataolds.history_edit);
            newhistory.unshift({
                user:namalengkap,
                username,
                tgleditmili:new Date().getTime()
            });
        }else{
            newhistory=[{
            user:namalengkap,
            username,
            tgleditmili:new Date().getTime()
        }];
        }
    }else{
        newhistory=[{
            user:namalengkap,
            username,
            tgleditmili:new Date().getTime()
        }];
    }

    itemediting={
        id_request,
        vendor:vendor_editing,
        bank:bank_editing,
        lokasiterima:lokasiterima_editing,
        z_qty:zqty_editing,
        priceunit:hargaunitsave_editing,
        totalprice:totalharga_editing,
        note_req:noteprocurement_editing,
        pendingpayment:pendingpayment_editing,
        history_edit:JSON.stringify(newhistory)
    }

    console.log('itemediting ====');
    console.log(itemediting);
    const keysToCheck = ['vendor', 'lokasiterima', 'bank','z_qty','priceunit','totalprice','note_req','pendingpayment'];

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
        if (flag_edit==1) {
            fixsendedit();
        }
        else{
            warningpopup('warning', 'tidak ada data yang berubah');;
        }
    }
}

function fixsendedit() {
    fetch('/procurement/saveeditinputproc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify({itemediting})
    })
    .then(response => response.json())
    .then(resdat => {
        console.log('resdat');
        console.log(resdat);

        var valueload=90;
        setTimeout(function () { 
            Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
            setTimeout(function () { 
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload;

                if (resdat.icons=='success') {
                    warningpopup('success','sukses add');
                    
                    //socket.emit('approvereqbeli',additemreqproc);
                    location.reload();
                }else{
                    warningpopup('error','gagal save edit');
                    
                }
                
            },800);
        },2000);
    })
    .catch(error => {
        console.error('Error:', error);
        warningpopup('error','error catch : '+error);
    });
}

/////tutup save edit

//tindak
function kliktindaks(indek) {
     var dataarray=window.dataall;
    var dataitemproc=dataarray.databaseitem_proc;
    // var dataitemproc=JSON.parse(document.getElementById(`itemalls`).dataset.json).databaseitem_proc;
    var dataitemx=JSON.parse(document.getElementById(`dataitems-${indek}`).dataset.json);
    console.log('tindakan===');
    console.log(dataitemx);
}

//tutup tindak

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
    
    var myModalEl = document.getElementById(modalid);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}
///--------------------------------