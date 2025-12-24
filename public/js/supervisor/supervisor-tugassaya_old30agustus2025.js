var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');

//console.log=function(){};

var ismobile='n';
document.addEventListener('DOMContentLoaded',async function () {
  
  cekdatausersorout();
  showfotvidmodal();
  
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

  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  //console.log(dataarray.dataadminlist);
  additemdropfilter(dataarray.itemsdata);
  showtabel(dataarray.dataadminlist);
  //showtabel(dataarray.dataadminlist);
  
});

///////////
/* function hitungtugassaya(array) {
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  console.log('alll ');
  console.log(dataarray);

  const jumlahProsesProduksi = array.filter(element =>
      element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi'
  ).length;

  //&&!element.deliveryunit.toLowerCase().includes('third party')

  var arraystocks=dataarray.stockupholsterydatabase;

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
/////
/////
function additemdropfilter(array) {
  var elex=document.getElementById('filterproduk-select');
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    //if (!array[i].product.includes("S-")&&!array[i].product.includes("IN-")&&!array[i].product.includes("OUT-")) {
      var opt=document.createElement('option');
      opt.innerHTML=array[i].product;

      elex.appendChild(opt);
    //}
  }
}
///////////

function loadingbawahupdate(array) {
    $progressBar.css('width', '0%');
    $progress.show();
    setTimeout(function () {
        var modaldut=['modaldetail']
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

socket.on('newquickedititemadminlist',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
      
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newquickedititemadminlist');
    }
    
  }

  loadingbawahupdate(dataarray.dataadminlist);
});

/* socket.on('neweditforcestatus',function(datas){
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

      
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
}); */

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

socket.on('newapprovalforcestatuss',function(datas){
  console.log('reload approval force status');
  console.log(datas);
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
            document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
          }
          
        }else{
          console.log('tidak terjadi forcestatus');
        }
          
      }
    //dattockup.push(element);
  }
  
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newklikprinpodo',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    for (let j = 0; j < dataarray.dataadminlist.length; j++) {
      const element2 = dataarray.dataadminlist[j];
      if (element2.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[j].klik_print_podo='true';
      }
    }
    
  }
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
      
      dataarray.dataadminlist[i].print_podo='true';

      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
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
      dataarray.dataadminlist[i].status=datas.history[0].details.status;

      dataarray.dataadminlist[i].upholstery_jadi='true';
      dataarray.dataadminlist[i].upholstery_img=datas.filenamesupload;

      dataarray.dataadminlist[i].history=datas.history;

      
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
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


socket.on('newpackdereject-ambil',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status='Proses Produksi (Re)';

      dataarray.dataadminlist[i].upholstery_jadi='';
      dataarray.dataadminlist[i].approval_produkjadi='';
      dataarray.dataadminlist[i].reject_ambil_img=datas.folderfoto;

      dataarray.dataadminlist[i].history=datas.history;
      
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

      dataarray.dataadminlist[i].history=datas.history;
      
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
      
  }
  loadingbawahupdate(dataarray.dataadminlist);

});

socket.on('newadminc5qc',function(datas){
  var dataarray= JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status=datas.status;
      
      dataarray.dataadminlist[i].history=datas.history;

      
      //document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
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
      
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
    
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('newdriver-ambil',function(datas){
  var dataarray= JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
      const element = dataarray.dataadminlist[i];
      if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status=datas.history[0].details.status;

      dataarray.dataadminlist[i].pickup_driver='true';
      dataarray.dataadminlist[i].pickup_driver_img=datas.folderfoto;

      dataarray.dataadminlist[i].history=datas.history;
      
      //document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
      }
      
  }
  loadingbawahupdate(dataarray.dataadminlist);

});

socket.on('newdriver-terimakonsumen',function(datas){
  var dataarray= JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
      const element = dataarray.dataadminlist[i];
      if (datas.id_transaksi==element.id_transaksi) {
      dataarray.dataadminlist[i].status=datas.history[0].details.status;

      dataarray.dataadminlist[i].diterima_konsumen='true';
      dataarray.dataadminlist[i].diterima_konsumen_img=datas.folderfoto;

      dataarray.dataadminlist[i].history=datas.history;
      
      //document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
      }
      
  }
  loadingbawahupdate(dataarray.dataadminlist);

});


//////////////// tutup socket ////////////////////


//////////////// showtabel ////////////////////
async function showtabel(dataarray) {
  
  console.log(dataarray);

  var myobj = document.getElementById("divhpsdata");
  if (myobj)
      myobj.remove();

  var datatab = document.getElementById(`alldattab`);

  var divhapus = document.createElement("div");
  divhapus.setAttribute('id', 'divhpsdata');

  var maxleng=20;
  currentIndex=maxleng;
  
  itemsPerLoad=20;

  
  /* var lengthdata=dataarray.length;
  var lengthsisa=lengthdata-20;
  console.log(lengthdata)
  if (lengthsisa<20) {
    itemsPerLoad=lengthsisa;
  } */

  if (dataarray.length<20) {
    maxleng=dataarray.length;
    currentIndex=dataarray.length;
    document.getElementById('load-more-btn').style.display = 'none';
  }else{
    document.getElementById('load-more-btn').style.display = 'block';
  }
  /* var fixarraawal=[];
  for (let i = 0; i < maxleng; i++) {
    const element = dataarray[i];
    fixarraawal.push(element);

    
  }
  console.log('wowowo')
  console.log(fixarraawal) */
  if (dataarray.length>0) {
    divhapus.innerHTML=await returnarray(dataarray,'awal');

    datatab.appendChild(divhapus);
    //document.getElementById('datatidakditemukan').setAttribute('style','display:none;');
  } else{
    document.getElementById('datatidakditemukan').removeAttribute('style');
  }
  setTimeout(function () { 
    hitungstatus();
    if (filtersavearray.length==0&&tindakanfilter=='') {
      
        
    }
    hitungtugassaya_universal();
    document.getElementById('showmainpage').removeAttribute('style');
    document.getElementById('loadingskeleton').setAttribute('style','display:none;');
  
  },500); 
  
}

var ceklengloadmore;
var sortedDataGlobal = []; // Global untuk menyimpan data terurut
var datamaxmarkall=[];//data simpan max untuk mark all

async function returnarray(arrayszx,prosedur) {
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  var dataGambar=dataarray.itemsdata;
  console.log(dataGambar);

  const gambarMap = Object.fromEntries(dataGambar.map(g => [g.product, g.image]));
  //console.log(arraysz)
  
  var databaseawal=arrayszx;
  if (tindakanfilter=='jalan') {
    databaseawal=dataarray.dataadminlist;

  }

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

  var arraysz=[];
  for (let i = 0; i < hasil2.length; i++) {
    const element = hasil2[i];
    if (element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi') {
      arraysz.push(element);
    }//&&!element.deliveryunit.toLowerCase().includes('third party')
  }
  console.log('arraysz');
  console.log(arraysz);

  var fixarraawal=[];
  
  if (prosedur == 'awal') {
    // Sortir dan simpan secara global
    arraysz.sort((a, b) => Number(a.delivereddate_mili) - Number(b.delivereddate_mili));
    sortedDataGlobal = arraysz;
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

  ////////////tampilkan produk fix pencarian
  
  var newfixsearch=[];
  for (let i = 0; i < arrayszx.length; i++) {
    const element = arrayszx[i];
    if (element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi') {
      newfixsearch.push(element);
    }//&&!element.deliveryunit.toLowerCase().includes('third party')
  }

  var hasil3=fixarraawal;//default tanpa pencarian
  if (tindakanfilter=='jalan') {
    hasil3=[];
    console.log('tindakanfilter');
    //databaseawal=dataarray.dataadminlist;
    for (let i = 0; i < sortedDataGlobal.length; i++) {
      const element = sortedDataGlobal[i];
      for (let j = 0; j < newfixsearch.length; j++) {
        const element1 = newfixsearch[j];
          if (element.id_transaksi==element1.id_transaksi) {
          
          console.log('hasil3cccc');
          hasil3.push(element);
        }
      }
      
    }
    
    sortedDataGlobal=hasil3;//data search
    const maxleng = Math.min(itemsPerLoad, hasil3.length);
    hasil3 = hasil3.slice(0, maxleng);
    currentIndex = maxleng;

    tindakanfilter='';
  }
  console.log('hasil3cccc');
  console.log(hasil3);
  //////

  // Tampilkan atau sembunyikan tombol load-more
  if (prosedur === 'awal') {
    if (sortedDataGlobal.length <= itemsPerLoad) {
      document.getElementById('load-more-btn').style.display = 'none';
    } else {
      document.getElementById('load-more-btn').style.display = 'block';
    }

    if (hasil3.length > 0) {
      document.getElementById('datatidakditemukan').setAttribute('style', 'display:none;');
    } else {
      document.getElementById('datatidakditemukan').removeAttribute('style');
    }
  } else if (prosedur === 'loadmore') {
    if (currentIndex >= sortedDataGlobal.length) {
      document.getElementById('load-more-btn').style.display = 'none';
    }
  }    
  //dari tanngal terdekat ke terlama
  //fixarraawal.sort((a, b) => Number(a.delivereddate_mili) - Number(b.delivereddate_mili));
  //cek mark new
  var localdata =JSON.parse(await dbs.get('datauser'));//localStorage
  datamaxmarkall=hasil3;
  
  //
  return hasil3.map(function (arraysx) {
      var textklik='In Process';
      var bodercolors='grey'; 
      var bgcolors='bg-secondary text-white';//'grey';
      
      var textklik_reject='disabled';
      var bodercolors_reject='#e7e7e7';//'#f23a3acc'; 
      var bgcolors_reject='bg-light text-white';//'#e7e7e7';//'#f23a3acc';
      /* if (arraysx.status.toLowerCase()!='print po-do') {
      textklik='Printed';
      bodercolors='#e7e7e7'; 
      bgcolors='#e7e7e7';
      }else */ 
      if(arraysx.status.toLowerCase()=='print po-do'&&arraysx.klik_print_podo.toLowerCase()!='true'){
          //textklik='Waiting Print';
          bodercolors='#e7e7e7'; 
          bgcolors='bg-body-tertiary text-white';//'#e7e7e7';
      }else if(arraysx.upholstery_jadi!='true'&&arraysx.print_podo=='true'&&arraysx.packde_kirimbahan!='true'){//kirim bahan
          //textklik='Selesai';
          bodercolors='#e7e7e7'; 
          bgcolors='bg-body-tertiary text-white';//'#e7e7e7';
      }else if(arraysx.upholstery_jadi!='true'&&arraysx.print_podo=='true'&&arraysx.packde_kirimbahan=='true'){//kirim bahan
          textklik='Producing';
          bodercolors='#e7e7e7'; 
          bgcolors='bg-body-tertiary text-white';//'#e7e7e7';
      }
      else if(arraysx.upholstery_jadi=='true'&&arraysx.approval_produkjadi!='true'&&arraysx.status.toLowerCase()=='selesai produksi'){//approval
          textklik_reject='Reject';
          bodercolors_reject='#f23a3acc'; 
          bgcolors_reject='bg-danger text-white';//'#f23a3acc';
          textklik='Approval';
      }
      else if (arraysx.upholstery_jadi=='true'&&arraysx.packde_ambil!='true'&&arraysx.approval_produkjadi=='true') {//produk jadi & sudah di approve lalu diambil
          //textklik='Terima';

          bodercolors='#e7e7e7'; 
          bgcolors='bg-body-tertiary text-white';//'#e7e7e7';
      if (arraysx.status=='Print PO-DO') {
          bodercolors='bg-body-tertiary text-white';//'#e7e7e7'; 
          bgcolors='bg-body-tertiary text-white';//'#e7e7e7';
      }
      }else if(arraysx.upholstery_jadi=='true'&&arraysx.packde_ambil=='true'){//lakukan QC
          //textklik='Selesai';
          
          bodercolors='bg-body-tertiary text-white';//'#e7e7e7'; 
          bgcolors='bg-body-tertiary text-white';//'#e7e7e7';

          if (arraysx.status=='Print PO-DO') {
              bodercolors_reject='#e7e7e7';
              bgcolors_reject='bg-body-tertiary text-white';//'#e7e7e7';
              bodercolors='#e7e7e7'; 
              bgcolors='bg-body-tertiary text-white';//'#e7e7e7';
          }
      }/* else if(arraysx.upholstery_jadi=='true'&&arraysx.packde_ambil=='true'&&arraysx.packde_qc=='true'){
      textklik='Pengiriman';
      bodercolors='#e7e7e7'; 
      bgcolors='#e7e7e7';
      } */
      if (arraysx.status.toLowerCase()=='dibatalkan') {
          textklik='dibatalkan';
          bodercolors='#e7e7e7'; 
          bgcolors='bg-body-tertiary text-white';//'#e7e7e7';
          bodercolors_reject='#e7e7e7';//'#f23a3acc'; 
          bgcolors_reject='bg-body-tertiary text-white';//'#e7e7e7';
      }else if (arraysx.status.toLowerCase()=='selesai') {
          textklik='Done';
          bodercolors='#e7e7e7'; 
          bgcolors='bg-body-tertiary text-white';//'#e7e7e7';
          bodercolors_reject='#e7e7e7';//'#f23a3acc'; 
          bgcolors_reject='bg-body-tertiary text-white';//'#e7e7e7';
      }

      var extrachargeinfo='';
      if (arraysx.extracharge!='[]') {
        var ex=JSON.parse(arraysx.extracharge);
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
      if (arraysx.platform.toLowerCase().includes('shopee')) {
        platformshoppe=arraysx.platform.replace('_',' | ');
      }
      
    //cek transaksi pernah bermasalah
    var datatrasnmasalah=dataarray.databasepesananmasalah.find(item => item.id_transaksi === arraysx.id_transaksi);

      /* return `
      <div class="card items" id="${arraysx.id_transaksi}">
      
      <span id="databaseeachitem-${arraysx.id_transaksi}" class="d-none">${JSON.stringify(arraysx)}</span>

      <div class="card-body">
          <div class="row mb-3" id="header-card-item">
              <div class="col-lg-8 col-md-8 col-sm-6 rownama">
                  <span><span id="status-${arraysx.id_transaksi}">${arraysx.status.replaceAll('amp;','')}</span> / <span id="notransaksi-${arraysx.id_transaksi}">${arraysx.no_transaksi}</span> / <i class="bi bi-person"></i> <span id="buyername-${arraysx.id_transaksi}">${arraysx.buyername}</span> / Rp <span id="finalprice-${arraysx.id_transaksi}">${formatMoney(arraysx.finalprice)}</span></span>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-6 roworderdate">
                  <div style="float: right;">
                    <span class="badge text-bg-primary me-3 ${localdata.clicked_new.includes(arraysx.id_transaksi)?'d-none':''}" name="new-mark" id="new-mark-${arraysx.id_transaksi}">NEW</span>
                    ${datatrasnmasalah!=undefined?'<span class="badge text-bg-danger me-2">PB</span>':''}

                    ${arraysx.websiteornot!=''?'<span class="badge text-bg-dark me-2">W</span>':''}

                    <span><i class="bi bi-truck"></i> <span id="orderdate-${arraysx.id_transaksi}">${arraysx.delivered_date}</span></span>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-lg-5 col-md-12 col-sm-12 mb-2 mt-2">
                  <div class="card items h-100">
                      <div class="card-body pb-0 pt-0">
                          <div class="row mt-5">
                          <div class="col-lg-3 col-md-3 col-sm-12" >
                              <img id="imgcards" src="${arraysx.gambar}" alt="" class="img-fluid">
                          </div>
                          <div class="col-lg-9 col-md-9 col-sm-12" >
                              <p style="font-weight: bold;" id="item-${arraysx.id_transaksi}">${arraysx.item}</p>
                              <span id="colorvarian-${arraysx.id_transaksi}">${arraysx.colorvariant}</span>
                              <div class="row mt-4">
                                  <p style="text-align: right;" id="qty-${arraysx.id_transaksi}">${arraysx.qty} X UNIT</p>
                              </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-lg-7  col-md-12 col-sm-12 mb-2 mt-2">
                  <div class="card items h-100">
                      <div class="card-body pb-0 pt-0">
                          <div class="row mt-4">
                              <div class="col-lg-8 col-md-12 col-sm-12 h-100">
                                  <div>
                                  <p style="font-weight: bold;">NOTE</p>
                                  <textarea id="notes-${arraysx.id_transaksi}" style="width: 100%;height: 5em;" disabled >${platformshoppe==''?'':`[${platformshoppe}]\n`}${extrachargeinfo==''?'':`${extrachargeinfo}`}${arraysx.notes}</textarea>
                                  </div>
                              </div>
                              <div class="col-lg-4 col-md-12 col-sm-12 mt-3 h-100 d-flex align-items-center justify-content-center">
                                  <div style="width:100%">
                                  <button type="button" class="btn btn-light mb-2" style="width: 100%;border-color: grey;font-size:small;" onclick="klikdetail(this)"   id="detailklik-${arraysx.id_transaksi}">Detail Transaksi</button>
                                  
                                  <button type="button" class="btn btn-light mb-2" style="width: 100%;border-color: ${bodercolors_reject};font-size:small;background-color:${bgcolors_reject};color:white;"  id="quickedit-${arraysx.id_transaksi}" onclick="klikreject(this)">${textklik_reject}</button>
                              
                                  <button type="button" class="btn btn-light" style="width: 100%;border-color: ${bodercolors};font-size:small;background-color:${bgcolors};color:white;"  id="forcestatus-${arraysx.id_transaksi}" onclick="klikprintpodo(this)">${textklik}</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`  */

  return `
      <div class="card items mb-3" id="${arraysx.id_transaksi}">
        <span id="databaseeachitem-${arraysx.id_transaksi}" class="d-none" data-json='${JSON.stringify(arraysx)}'></span>
        <div class="card-body">
        <!-- Header -->
        <div class="row mb-3 align-items-center">
            <div class="col-lg-8 col-md-8 col-sm-12">
                <span class="rownama">
                    <span id="status-${arraysx.id_transaksi}">${arraysx.status.replaceAll('amp;','')}</span> / 
                    <span id="notransaksi-${arraysx.id_transaksi}">${arraysx.no_transaksi}</span> / 
                    <i class="bi bi-person"></i> 
                    <span id="buyername-${arraysx.id_transaksi}">${arraysx.buyername}</span> / 
                    Rp <span id="finalprice-${arraysx.id_transaksi}">${formatMoney(arraysx.finalprice)}</span>
                </span>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 text-lg-end text-md-end text-sm-start mt-2 mt-lg-0">
              <span class="badge text-bg-primary me-3 ${localdata.clicked_new.includes(arraysx.id_transaksi)?'d-none':''}" name="new-mark" id="new-mark-${arraysx.id_transaksi}">NEW</span>
                ${datatrasnmasalah!=undefined?'<span class="badge text-bg-danger me-2">PB</span>':''}

                ${arraysx.websiteornot!=''?'<span class="badge text-bg-dark me-2">W</span>':''}
                <span class="rownama"><i class="bi bi-truck"></i> <span id="orderdate-${arraysx.id_transaksi}">${arraysx.delivered_date}</span></span>
            </div>
        </div>

        <!-- Content -->
        <div class="row g-3">
            <!-- Kiri: Gambar & Info Produk -->
            <div class="col-lg-5 col-md-12 col-sm-12">
            <div class="card h-100 d-flex align-items-center">
                <div class="card-body pb-2 pt-2 w-100 d-flex align-items-center">
                <div class="flex-shrink-0 me-3">
                    <img id="imgcards" src="${arraysx.gambar}" 
                        alt="" class="img-fluid rounded" style="max-width:80px;">
                </div>
                <div class="flex-grow-1">
                    <p class="fw-bold mb-1" id="item-${arraysx.id_transaksi}">${arraysx.item}</p>
                    <span id="colorvarian-${arraysx.id_transaksi}">${arraysx.colorvariant}</span>
                    <p class="text-end mt-3 mb-0" id="qty-${arraysx.id_transaksi}">${arraysx.qty} X UNIT</p>
                </div>
                </div>
            </div>
            </div>

            <!-- Kanan: Note & Tombol -->
            <div class="col-lg-7 col-md-12 col-sm-12">
            <div class="card h-100 d-flex align-items-center">
                <div class="card-body pt-3 pb-3 w-100 d-flex align-items-center">
                    <div class="flex-grow-1 me-3">
                        <p class="fw-bold mb-2">NOTE</p>
                        <textarea id="notes-${arraysx.id_transaksi}" class="form-control" rows="3" style="min-height: 125px;" disabled>${platformshoppe==''?'':`[${platformshoppe}]\n`}${extrachargeinfo==''?'':`${extrachargeinfo}`}${arraysx.notes}</textarea>
                    </div>
                    <div class="flex-shrink-0 d-flex flex-column" style="width:auto">
                        <button type="button" class="btn btn-light mb-2 w-100 border font-small" id="detailklik-${arraysx.id_transaksi}" onclick="klikdetail(this)">Detail Transaksi</button>
                        <button type="button" class="btn ${bgcolors_reject} mb-2 w-100 border font-small" id="quickedit-${arraysx.id_transaksi}" onclick="klikreject(this)">${textklik_reject}</button>
                        <button type="button" class="btn ${bgcolors} w-100 border font-small" id="forcestatus-${arraysx.id_transaksi}" onclick="klikprintpodo(this)">${textklik}</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
      </div>
    `
  } ).join('');//onclick="klikquickedit(this)" onclick="klikforcestatus(this)"
}

////
let currentIndex = 0; // Indeks data yang telah ditampilkan
var itemsPerLoad = 20; // Maksimum data yang ditampilkan per klik tombol

async function loadMoreData() {
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var data=dataarray.dataadminlist;
    
    /* var lengthdata=data.length;
    var lengthsisa=lengthdata-20;
    console.log(lengthdata)
    if (lengthsisa<20) {
        itemsPerLoad=lengthsisa;
    }

    const dataContainer = document.getElementById('divhpsdata');

    // Ambil 20 data berikutnya
    const nextData = data.slice(currentIndex, currentIndex + itemsPerLoad);
    currentIndex += itemsPerLoad; // Perbarui indeks data yang telah ditampilkan

    
    var fixarraawal=[];
    // Tambahkan data ke dalam daftar
    nextData.forEach(item => {
        fixarraawal.push(item);
    });
    console.log(`curentindex : ${currentIndex} itemsPerLoad : ${itemsPerLoad} data : ${JSON.stringify(fixarraawal)}`) */
    //divhapus.innerHTML=returnarray(fixarraawal);
    if (filtersavearray.length>0) {
        data=sortedDataGlobal;
    }
    const htmlData = await returnarray(data, 'loadmore');
  $("#divhpsdata").last().append(htmlData);

    // Sembunyikan tombol jika semua data sudah ditampilkan
    if (currentIndex >= ceklengloadmore) {
        document.getElementById('load-more-btn').style.display = 'none';
    }
}

////


var filtersavearray=[];
var tindakanfilter='';
var flagfilterstatus=0;
var flagfilterproduk=0;
var flagfilterplatform=0;

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
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    filtersavearray.length=0;
    tindakanfilter='';
    showtabel(dataarray.dataadminlist);
  }
}

function klikfilter(e) {
    filtersavearray.length=0;
    tindakanfilter='jalan';
  const search = document.getElementById("pencarianinput").value.toLowerCase();
  const status = document.getElementById("filterstatus-select").value;
  const item = document.getElementById("filterproduk-select").value;
  const platform = document.getElementById("filterplatform-select").value;
  
  var maxleng=20;
  var dataarrays;

  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  dataarrays=dataarray.dataadminlist;


  let filteredProducts = dataarrays.filter(trx => {
    var searchMatch = trx.item.toLowerCase().includes(search) ||
    trx.buyername.toLowerCase().includes(search) ||
    trx.no_transaksi.toLowerCase().includes(search) ||
    trx.id_transaksi.toLowerCase().includes(search);
    

      let statusMatch = status ? trx.status === status : true;
      let itemMatch = item ? trx.item === item : true;
      let platformMatch = platform ? trx.platform === platform : true;
      return searchMatch && statusMatch && itemMatch && platformMatch;
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

//////////////////////////// edit detail ////////////////////////////////////

var editingdatas;

function klikdetail(idsx) {
    var ids=idsx.id.replace('detailklik-','');

    var databasedetailxs=JSON.parse(document.getElementById(`databaseeachitem-${ids}`).dataset.json);
    editingdatas=databasedetailxs;

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
    document.getElementById('klikpanahbawahstockupopen').className='bi bi-caret-down me-5';
    $('#showdetailstockupuses').hide();
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
    //dataextracharge.length=0;
    
    //
    $('#modaldetail').modal('show');
    console.log(ids)
  readnewmark(ids);
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
        if (element.details.status!='Produk di-approve'&&element.details.status!='Produk jadi di-reject'&&element.details.status!=''&&!element.tindakan.includes('request force')&&!element.tindakan.includes('edit item')) {
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

            ${status.toLowerCase()=='selesai'&&arrays.stockprodukcode!='true'||status.toLowerCase()=='selesai'&&arrays.stockprodukcode=='true'&&arrays.deliveryunit.includes('In-House')?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.diterima_konsumen_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}

            ${status.toLowerCase()=='selesai produksi'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.upholstery_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}

            ${status.toLowerCase()=='proses produksi'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.packde_kirimbahan_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}

            ${status.toLowerCase()=='proses qc dan packing'?`<span class="badge text-bg-secondary" style="cursor:pointer;" onclick="openMediaModal3(this)" data-url="${arrays.packde_ambil_img}" data-title="${status}" data-desc="${ketstatus}">Foto/Video</span>`:''}

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
        /* ${status.toLowerCase()=='selesai produksi'?` <span data-bs-toggle="modal" data-bs-target="#mediaModal" data-url="${location.origin}${arrays.upholstery_img}" style="cursor:pointer;color:blue;">view foto</span>`:''}${status.toLowerCase()=='selesai'?`<a href="${arrays.diterima_konsumen_img}" style="cursor:pointer;" target="_blank">${arrays.diterima_konsumen_img==''?'':'LINK'}</a>.`:''} ${arraysx.tindakan.toLowerCase()=='reject saat pengambilan item'?`<a href='/view?file=${window.btoa(`${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_ambil_img}$$$-$$$${arraysx.details.keterangankerusakan}`)}' style='cursor:pointer;' target='_blank'>LINK</a>`:''} ${arraysx.tindakan.toLowerCase()=='reject saat qc item'?`<a href='/view?file=${window.btoa(`${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_qc_img}$$$-$$$${arraysx.details.keterangankerusakan}`)}' style='cursor:pointer;' target='_blank'>LINK</a>`:''} ${arraysx.tindakan.toLowerCase()=='reject saat pick-up driver'?`<a href='/view?file=${window.btoa(`${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_qc_img}$$$-$$$${arraysx.details.keterangankerusakan}`)}' style='cursor:pointer;' target='_blank'>LINK</a>`:''} ${arraysx.tindakan.toLowerCase()=='reject saat diterima konsumen'?`<a href='/view?file=${window.btoa(`${arraysx.details.folderfoto?arraysx.details.folderfoto:arrays.reject_qc_img}$$$-$$$${arraysx.details.keterangankerusakan}`)}' style='cursor:pointer;' target='_blank'>LINK</a>`:''} */
        
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

    return `${hari}, ${tanggal} ${bulan} ${tahun}_${jam}:${menit} ${zona}`;
}

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
///

function detailresilainnyaopen() {
    var ids=document.getElementById('idtransaksi-detailshow').innerHTML;

    var databasedetailxs=JSON.parse(document.getElementById(`databaseeachitem-${ids}`).dataset.json);

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
/////////////////////////////////////////////




//////////////// tutup showtabel ////////////////////

//klik approval//

//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';


var statusklikselesai='';

function klikprintpodo(e) {
    $('#keterangancacatshow').hide();
    document.getElementById('savetombolambil').innerHTML='Submit';

    var ids=e.id.replace('forcestatus-','');
    var statuscek=document.getElementById(`status-${ids}`);
    statusklikselesai=statuscek.innerHTML;

    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var fixdat=dataarray.dataadminlist;

    for (let i = 0; i < fixdat.length; i++) {
        const element = fixdat[i];
        if (ids==element.id_transaksi) {
            document.getElementById('modalklikambillabel').innerHTML=`${element.no_transaksi}-${element.item}`;
            editingdatas=element;
        }
    }
    if (e.innerHTML=='Approval'&&statusklikselesai.toLowerCase()=='selesai produksi') {
        Swal.fire({
        title: "",
        text: `Approve produk ID : ${ids.split('-')[0]}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Approve",
        cancelButtonText: 'Batal'
        }).then((result) => {
        if (result.isConfirmed) {
            
            loadingpopup();
                        
            var date_history = new Date();
            var day_history = ("0" + (date_history.getDate())).slice(-2);
            var month_history = ("0" + (date_history.getMonth() + 1)).slice(-2);//d.getMonth()+1;
            var hour_history = ("0" + (date_history.getHours())).slice(-2);
            var minutes_history = ("0" + (date_history.getMinutes())).slice(-2);
            var year_history = date_history.getFullYear();
        
            var fixdate_history = day_history+"/"+month_history+"/"+year_history +` ${hour_history}:${minutes_history}`;
        
            var awalhistory;
            if (editingdatas.history!='') {
            if (!Array.isArray(editingdatas.history)) {
                awalhistory=JSON.parse(editingdatas.history);
            }else{
                awalhistory=editingdatas.history;
            }
            //cek Produksi Selesai (Re) atau bukan
            var produksiRE=awalhistory[0];
            
            awalhistory.unshift({
                id_transaksi:editingdatas.id_transaksi,
                tgl:fixdate_history,user:namalengkap,
                user:namalengkap,
                username,
                tindakan:'Approval produk',
                details: {
                    tglinputmili:date_history.getTime(),
                    status:'Produk di-approve',
                    ketstatus:`Produk di-approve oleh ${namalengkap} ID: ${username}.`
                }});
            }else{
                awalhistory=[{id_transaksi:editingdatas.id_transaksi,
                tgl:fixdate_history,user:namalengkap,
                user:namalengkap,
                username,
                tindakan:'Approval produk',
                details: {
                    tglinputmili:date_history.getTime(),
                    status:'Produk di-approve',
                    ketstatus:`Produk di-approve oleh ${namalengkap} ID: ${username}.`
                }}]
            }
        
            var data={
            id_transaksi:editingdatas.id_transaksi,
            status:'Selesai Produksi',
            history:awalhistory
            }
            var xhrzx = new XMLHttpRequest();
            
            xhrzx.open("POST", `/adminlist/selesaiapprove`);
            xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhrzx.setRequestHeader('authorization', xi);
            xhrzx.send(JSON.stringify(data));
            xhrzx.addEventListener("load", () => {
            var resdat = JSON.parse(xhrzx.responseText);
            
            
                var valueload=90;
                setTimeout(function () {
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
                    setTimeout(function () {
                        Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload;
                        if (resdat.icons == 'error') {
                            Swal.fire({
                                icon: 'error',
                                title: '',
                                text: 'Sistem lagi error, coba lagi',
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }else{
                            Swal.fire({
                                icon: resdat.icons,
                                title: resdat.titles,
                                text: resdat.texts,
                                showConfirmButton: false,
                                allowOutsideClick:false
                            });
                            Swal.showLoading();
                            socket.emit('approvalproduk',data);
                            location.reload();
                        }
                    },800); 
                },2000); 
            
                
            });
        }
        });
    }
    else if(e.innerHTML=='dibatalkan'){
        Swal.fire({
        icon: 'warning',
        title: '',
        text: '',
        html:`
            <p><b>Produk dibatalkan</b></p>
            
        `,
        //showConfirmButton: false,
        confirmButtonColor: "#a5a2a4cc",
        confirmButtonText: "Kembali",
        //timer: 2500
        });
    }else if(e.innerHTML=='Done'){
        Swal.fire({
        icon: 'warning',
        title: '',
        text: '',
        html:`
            <p><b>Produk Sudah Diterima Konsumen</b></p>
            
        `,
        //showConfirmButton: false,
        confirmButtonColor: "#a5a2a4cc",
        confirmButtonText: "Kembali",
        //timer: 2500
        });
    }else if(e.innerHTML=='Producing'){
        
    }
    else{
        Swal.fire({
            icon: 'warning',
            title: '',
            text: '',
            html:`
                <p><b>Produk dalam proses</b></p>
                
            `,
            //showConfirmButton: false,
            confirmButtonColor: "#a5a2a4cc",
            confirmButtonText: "Kembali",
            //timer: 2500
        });
    }
    /* else if(e.innerHTML=='Printed'){
        Swal.fire({
        icon: 'warning',
        title: '',
        text: 'PO/DO item sudah di-print',
        showConfirmButton: false,
        timer: 2500
        });
    } */

  readnewmark(ids);
}



//tutup klik approval//



/// klik reject //

function klikreject(idsx) {
  var ids=idsx.id.replace('quickedit-','');
  if (idsx.innerHTML!='disabled') {
    //kembali ke upholstery_jadi menjadi false atau kosong
    
    Swal.fire({
    title: "",
    text: `Reject produk ID : ${ids.split('-')[0]}!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Reject",
    cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        loadingpopup();
        sendrejectapproval(ids)
      }
    });
  }
  readnewmark(ids);
}

function sendrejectapproval(id) {
  console.log('reject '+id);
  fetch('/supervisor/saverejectapproval', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': xi
    },
    body: JSON.stringify({id_transaksi:id,namalengkap,username})
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
                  warningpopup('success',resdat.texts);
                  
                  
                  //socket.emit('approvereqbeli',additemreqproc);
                  location.reload();
              }else{
                  warningpopup('error','gagal reject');
                  
              }
              
          },800);
      },2000);
  })
  .catch(error => {
      console.error('Error:', error);
      warningpopup('error','error catch : '+error);
  });
}


///tutup klik reject //


///tutup klik reject //
function hitungstatus() {
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  const jumlahProsesProduksi = dataarray.dataadminlist.filter(element =>
        element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi'
    ).length;
  // function untuk update jumlah per-status di tombol
  function countByStatus(statusName) {
    return dataarray.dataadminlist.filter((item) => item.status?.trim().toLowerCase() === statusName.trim().toLowerCase()).length;
  }

  // Variable jumlah = untuk mendefinisikan total jumlah data pada database dataadminlist
  const jumlah = jumlahProsesProduksi;//Array.isArray(dataarray?.dataadminlist) ? dataarray.dataadminlist.length: 0;

  // Mendeklarasi Variable untuk menghitung total berdasarkan status tombol
  const statusSelesaiProduksi = countByStatus("Selesai Produksi");
  const statusKirimBahan = countByStatus("Pengiriman Bahan");
  const statusPODO = countByStatus("Print PO-DO");
  const statusQC = countByStatus("Proses QC dan Packing");
  const statusStandbyKirim = countByStatus("Standby Pengiriman");
  const statusDalamKirim = countByStatus("Dalam Pengiriman");
  const statusDiBatalkan = countByStatus("Dibatalkan");
  const statusSelesai = countByStatus("Selesai");

  // Mengambil element berdasarkan ID kliktombolstatus 
  const tombolSemua = document.getElementById("tombol_semua");
  const tombolSelesaiProduksi = document.getElementById("tombol_selesaiproduksi");
  const tombolKirimBahan = document.getElementById("tombol_kirimbahan");
  const tombolPODO = document.getElementById("tombol_printpodo");
  const tombolProsesQC = document.getElementById("tombol_prosesqc");
  const tombol_standby = document.getElementById("tombol_standby");
  const tombol_dalam_pengiriman = document.getElementById("tombol_dalam_pengiriman");
  const tombol_di_batalkan = document.getElementById("tombol_di_batalkan");
  const tombol_selesai = document.getElementById("tombol_selesai");

  /**
   * Button all status
   */
  if (tombolSemua) tombolSemua.innerText = `Semua (${jumlah})`;
  if (tombolSelesaiProduksi)
    tombolSelesaiProduksi.innerText = `Selesai Produksi (${statusSelesaiProduksi})`;
  if (tombolKirimBahan)
    tombolKirimBahan.innerText = `Kirim Bahan (${statusKirimBahan})`;
  if (tombolPODO)
    tombolPODO.innerText = `Print PO-DO (${statusPODO})`;
  if (tombolProsesQC)
    tombolProsesQC.innerText = `Proses QC dan Packing (${statusQC})`;
  if (tombol_standby)
    tombol_standby.innerText = `Standby Pengiriman (${statusStandbyKirim})`;
  if (tombol_dalam_pengiriman)
    tombol_dalam_pengiriman.innerText = `Dalam Pengiriman (${statusDalamKirim})`;
  if (tombol_di_batalkan)
    tombol_di_batalkan.innerText = `Dibatalkan (${statusDiBatalkan})`;
  if (tombol_selesai)
    tombol_selesai.innerText = `Selesai (${statusSelesai})`;
}

///kliktombolstatus
function kliktombolstatus(status,e) {
  document.getElementById("filterstatus-select").value = status;
  klikfilter();
  
   var arraytombol=['tombol_semua','tombol_printpodo',"tombol_kirimbahan",'tombol_selesaiproduksi',"tombol_prosesqc","tombol_standby","tombol_dalam_pengiriman",'tombol_di_batalkan','tombol_selesai']

  for (let i = 0; i < arraytombol.length; i++) {
    const element = arraytombol[i];
    if (e.id==element) {
      e.classList.add("active", "btn-secondary", "text-white");
    }else{
      document.getElementById(element).classList.remove("active", "btn-secondary", "text-white");
    }
  }
}
function resettombolstatusaftersearch() {
    var arraytombol=["tombol_kirimbahan","tombol_prosesqc","tombol_standby","tombol_dalam_pengiriman"]
    document.getElementById('tombol_semua').classList.add("active", "btn-secondary", "text-white");
    for (let i = 0; i < arraytombol.length; i++) {
    const element = arraytombol[i];
    document.getElementById(element).classList.remove("active", "btn-secondary", "text-white");
        
        }
}
//tutup kliktombolstatus
//tombol status

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