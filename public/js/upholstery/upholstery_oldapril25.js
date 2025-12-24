var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');

//console.log=function(){};
var ismobile='n';
document.addEventListener('DOMContentLoaded', function () {
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
    //document.getElementById('sidabarutamashow').setAttribute('style','display:none!important;');
    //document.getElementById('main-pages').setAttribute('style','margin-left:0px!important;');
  }
  $('#editsavedetail').hide();

  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  console.log(dataarray.dataadminlist);
  if (window.location.href.includes('#pesananharini')) {
    flagopenpesananhariini=1;
    var idos=['semuapesanantombol','pesananharinitombol','pesananbermasalahtombol'];  

    for (let i = 0; i < idos.length; i++) {
      const element = idos[i];
      if (element.includes('pesananharinitombol')) {
        
        document.getElementById(element).className='nav-link active';

      }else{
        document.getElementById(element).className='nav-link';
      }
    }
    var datatoday = new Date();
    var day = ("0" + (datatoday.getDate())).slice(-2);
    var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
    var year = datatoday.getFullYear();

    var fixdatenow = day+"/"+month+"/"+year;

    additemdropfilter(dataarray.itemsdata);
    var fixit= cekpesananhariini(fixdatenow,dataarray.dataadminlist);
    showtabel(fixit);

  } else {
    additemdropfilter(dataarray.itemsdata);
    var fixawals=[];
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
      const element = dataarray.dataadminlist[i];
      if (element.code2.toLowerCase()=='up'&&element.upholstery_jadi!='true'&&!element.deliveryunit.toLowerCase().includes('third party')) {
        fixawals.push(element);
      }
    }
    showtabel(fixawals);
  }
  

});

///////////

function loadingbawahupdate(array) {
  
  var fixawals=[];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.code2.toLowerCase()=='up'&&element.upholstery_jadi!='true') {
      fixawals.push(element);
    }
  }

  $progressBar.css('width', '0%');
  $progress.show();
  setTimeout(function () {
    var modaldut=['modaldetail','modalklikjadi']
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
          showtabel(fixawals);
          $progress.hide();
          
        }, 500);
      }, 2000);
    }, 2000);
  }, 1000);
}

/////////

function additemdropfilter(array) {
  var elex=document.getElementById('filterproduk-select');
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (!array[i].product.includes("S-")&&!array[i].product.includes("IN-")&&!array[i].product.includes("OUT-")) {
      var opt=document.createElement('option');
      opt.innerHTML=array[i].product;

      elex.appendChild(opt);
    }
  }
}


//socket io
const socket = io();
socket.on('newadditemadminlist',function(datas){
  if (datas.code2.toLowerCase()=='up') {
    var newitemadd=`
    <div class="card items" id="${datas.id_transaksi}">
      <div class="card-body">
          <div class="row mb-3" id="header-card-item">
              <div class="col-lg-8 col-md-8 col-sm-6 rownama">
                  <span><span id="status-${datas.id_transaksi}">${datas.status}</span> / <span id="notransaksi-${datas.id_transaksi}">${datas.no_transaksi}</span> / <i class="bi bi-person"></i> <span id="buyername-${datas.id_transaksi}">${datas.buyername}</span> / Rp <span id="finalprice-${datas.id_transaksi}">${formatMoney(datas.finalprice)}</span></span>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-6 roworderdate">
                  <div style="float: right;"><span><i class="bi bi-clock"></i> <span id="orderdate-${datas.id_transaksi}">${datas.order_date}</span></span></div>
              </div>
          </div>
          <div class="row">
              <div class="col-lg-5 col-md-12 col-sm-12">
                  <div class="card items h-100">
                      <div class="card-body pb-0 pt-0">
                          <div class="row mt-5">
                              <div class="col-lg-3 col-md-12 col-sm-12"  >
                                  <img id="imgcards" src="/assets/lainnya/item-default.png" alt="" class="img-fluid">
                              </div>
                              <div class="col-lg-9 col-md-12 col-sm-12">
                                  <p style="font-weight: bold;" id="item-${datas.id_transaksi}">${datas.item}</p>
                                  <span id="colorvarian-${datas.id_transaksi}">${datas.colorvariant}</span>
                                  <div class="row mt-4">
                                      <p style="text-align: right;" id="qty-${datas.id_transaksi}">${datas.qty} X UNIT</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-lg-7  col-md-12 col-sm-12">
                  <div class="card items h-100">
                      <div class="card-body pb-0 pt-0">
                          <div class="row mt-4">
                              <div class="col-lg-8 col-md-12 col-sm-12 h-100">
                                <div>
                                  <p style="font-weight: bold;">NOTE</p>
                                  <textarea id="notes-${datas.id_transaksi}" style="width: 100%;height: 5em;" disabled >${datas.notes}</textarea>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-12 col-sm-12 mt-3 h-100 d-flex align-items-center justify-content-center">
                                <div style="width:100%">  
                                  <button type="button" class="btn btn-light mb-2" style="width: 100%;border-color: grey;font-size:small;" onclick="klikdetail(this)" id="detailklik-${datas.id_transaksi}">Detail Transaksi</button>
                                  
                                  <button type="button" class="btn btn-light mb-2" style="width: 100%;border-color: #e7e7e7;font-size:small;background-color:#e7e7e7;color:white;" id="quickedit-${datas.id_transaksi}">Quick Edit</button>
                              
                                  <button type="button" class="btn btn-light selesaibutton" style="width: 100%;border-color: grey;font-size:small;background-color:grey;color:white;" onclick="klikforcestatus(this)" id="forcestatus-${datas.id_transaksi}">Selesai</button>
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
    var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
    
    //var fixarrays=dataarray.dataadminlist;
    dataarray.dataadminlist.unshift(datas);
    document.getElementById('itemalls').innerHTML=JSON.stringify(dataarray);
    console.log(dataarray.dataadminlist);
    if (flagopenpesananhariini==0) {
    
      //$('#progressbarload').show();
      //var divhpsdata = document.getElementById(`divhpsdata`);
      setTimeout(function () {
        $("#divhpsdata").prepend(newitemadd);
        //$('#progressbarload').hide();
      }, 500);
    }else{
      var datatoday = new Date();
      var day = ("0" + (datatoday.getDate())).slice(-2);
      var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
      var year = datatoday.getFullYear();

      var fixdatenow = day+"/"+month+"/"+year;

      if (fixdatenow==datas.order_date) {
        //$('#progressbarload').show();
        setTimeout(function () {
          $("#divhpsdata").prepend(newitemadd);
              //$('#progressbarload').hide();
        }, 500);
      }
    }
  }
  
  
});

socket.on('neweditfullitemadminlist',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    //var indexarray= dataarray.dataadminlist.indexOf(element);
    if (datas.olnotransaksi==element.id_transaksi) {
      dataarray.dataadminlist[i]=datas;
      
      document.getElementById('itemalls').innerHTML=JSON.stringify(dataarray);
      //updatecarditem(datas,'neweditfullitemadminlist');
      console.log(dataarray.dataadminlist);
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
}); 

socket.on('newquickedititemadminlist',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
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

      
      document.getElementById('itemalls').innerHTML=JSON.stringify(dataarray);
      //updatecarditem(datas,'newquickedititemadminlist');
    }
    
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('neweditforcestatus',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
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

      
      document.getElementById('itemalls').innerHTML=JSON.stringify(dataarray);
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('newupholsteryselesai',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);

  
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi==element.id_transaksi) {
      //dataarray.dataadminlist[i].status='Selesai dibuat';
      //dataarray.dataadminlist[i].history=datas.history;

      
      dataarray.dataadminlist.splice(i,1);
      document.getElementById('itemalls').innerHTML=JSON.stringify(dataarray);
      document.getElementById(datas.id_transaksi).remove();
      //updatecarditem(datas,'newupholsteryselesai');
    }
    
  }
  
  
  
});

function updatecarditem(arrays,ketedit) {
  
  if (ketedit=='neweditfullitemadminlist') {
    //olnotransaksi
    document.getElementById(arrays.olnotransaksi).id=arrays.id_transaksi;// ganti id transaksi
   /*  document.getElementById(`status-${arrays.olnotransaksi}`).innerHTML=arrays.status; */
    document.getElementById(`notransaksi-${arrays.olnotransaksi}`).innerHTML=arrays.no_transaksi;
    document.getElementById(`buyername-${arrays.olnotransaksi}`).innerHTML=arrays.buyername;
    document.getElementById(`finalprice-${arrays.olnotransaksi}`).innerHTML=formatMoney(arrays.finalprice);
    document.getElementById(`orderdate-${arrays.olnotransaksi}`).innerHTML=arrays.order_date;
    document.getElementById(`item-${arrays.olnotransaksi}`).innerHTML=arrays.item;
    document.getElementById(`colorvarian-${arrays.olnotransaksi}`).innerHTML=arrays.colorvariant;
    document.getElementById(`qty-${arrays.olnotransaksi}`).innerHTML=`${arrays.qty} X UNIT`;
    document.getElementById(`notes-${arrays.olnotransaksi}`).value=arrays.notes;
    document.getElementById(`detailklik-${arrays.olnotransaksi}`).id=`detailklik-${arrays.id_transaksi}`;
    document.getElementById(`quickedit-${arrays.olnotransaksi}`).id=`quickedit-${arrays.id_transaksi}`;
    document.getElementById(`forcestatus-${arrays.olnotransaksi}`).id=`forcestatus-${arrays.id_transaksi}`;

  }else if(ketedit=='newquickedititemadminlist') {
    
    document.getElementById(`finalprice-${arrays.id_transaksi}`).innerHTML=formatMoney(arrays.finalprice);
    document.getElementById(`orderdate-${arrays.id_transaksi}`).innerHTML=arrays.order_date;
    document.getElementById(`item-${arrays.id_transaksi}`).innerHTML=arrays.item;
    document.getElementById(`colorvarian-${arrays.id_transaksi}`).innerHTML=arrays.colorvariant;
    document.getElementById(`qty-${arrays.id_transaksi}`).innerHTML=`${arrays.qty} X UNIT`;
    document.getElementById(`notes-${arrays.id_transaksi}`).value=arrays.notes;
   
  }else if(ketedit=='newupholsteryselesai'){
    document.getElementById(`status-${arrays.id_transaksi}`).innerHTML='Selesai dibuat';
   
  }
  


}

//////////////// socket ////////////////////
function showtabel(dataarray) {
  
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
  var fixarraawal=[];
  for (let i = 0; i < maxleng; i++) {
    const element = dataarray[i];
    fixarraawal.push(element);

    
  }
  console.log('wowowo')
  console.log(fixarraawal)
  if (dataarray.length>0) {
    divhapus.innerHTML=returnarray(fixarraawal);

    datatab.appendChild(divhapus);
    document.getElementById('datatidakditemukan').setAttribute('style','display:none;');
  } else{
    document.getElementById('datatidakditemukan').removeAttribute('style');
  }
  setTimeout(function () { 
    document.getElementById('showmainpage').removeAttribute('style');
    document.getElementById('loadingskeleton').setAttribute('style','display:none;');
  
  },500); 
  
}

function returnarray(arraysz) {
  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);

  var dataGambar=dataarray.itemsdata;
  console.log(dataGambar)
  const gambarMap = Object.fromEntries(dataGambar.map(g => [g.product, g.image]));
  //console.log(arraysz)
  
  var hasil = arraysz.map(arraysx => ({
    ...arraysx,
    gambar: gambarMap[arraysx.item] || "/assets/lainnya/item-default.png" // Gambar default jika tidak ditemukan
  }));  
  console.log('hasil');
  console.log(hasil);
  //console.log(arraysz)
  return hasil.map(function (arraysx) {
    if (arraysx.upholstery_jadi!='true'&&arraysx.code2.toLowerCase()=='up') {
      var hidedummysellesai='';
      var canklikselesai='d-none';
      if (arraysx.packde_kirimbahan=='true') {
        canklikselesai='';
        hidedummysellesai='d-none';
      }

      return `
    <div class="card items" id="${arraysx.id_transaksi}">
      <div class="card-body">
          <div class="row mb-3" id="header-card-item">
              <div class="col-lg-8 col-md-8 col-sm-6 rownama">
                  <span><span id="status-${arraysx.id_transaksi}">${arraysx.status}</span> / <span id="notransaksi-${arraysx.id_transaksi}">${arraysx.no_transaksi}</span> / <i class="bi bi-person"></i> <span id="buyername-${arraysx.id_transaksi}">${arraysx.buyername}</span> / <b>Rp</b> <span id="finalprice-${arraysx.id_transaksi}">${formatMoney(arraysx.finalprice)}</span></span>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-6 roworderdate">
                  <div style="float: right;"><span><i class="bi bi-clock"></i> <span id="orderdate-${arraysx.id_transaksi}">${arraysx.order_date}</span></span></div>
              </div>
          </div>
          <div class="row">
              <div class="col-lg-5 col-md-12 col-sm-12">
                  <div class="card items h-100">
                      <div class="card-body pb-0 pt-0">
                          <div class="row mt-4">
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
              <div class="col-lg-7  col-md-12 col-sm-12">
                  <div class="card items h-100">
                      <div class="card-body pb-0 pt-0">
                          <div class="row mt-4">
                              <div class="col-lg-8 col-md-12 col-sm-12 h-100 align-items-center justify-content-center">
                                <div>
                                  <p style="font-weight: bold;">NOTE</p>
                                  <textarea id="notes-${arraysx.id_transaksi}" style="width: 100%;height: 5em;" disabled >${arraysx.notes}</textarea>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-12 col-sm-12 mt-3 h-100 d-flex align-items-center justify-content-center">
                                <div style="width:100%">
                                  <button type="button" class="btn btn-light mb-2" style="width: 100%;border-color: grey;font-size:small;" onclick="klikdetail(this)" id="detailklik-${arraysx.id_transaksi}">Detail Transaksi</button>
                                  
                                  <button type="button" class="btn btn-light mb-2" style="width: 100%;border-color: #e7e7e7;font-size:small;background-color:#e7e7e7;color:white;"  id="quickedit-${arraysx.id_transaksi}">Quick Edit</button>

                                  <button type="button" class="btn btn-light mb-2 ${hidedummysellesai}" style="width: 100%;border-color: #e7e7e7;font-size:small;background-color:#e7e7e7;color:white;" >Selesai</button>
                              
                                  <button type="button" class="btn btn-light selesaibutton ${canklikselesai}" style="width: 100%;border-color: grey;font-size:small;background-color:grey;color:white;" onclick="klikforcestatus(this)" id="forcestatus-${arraysx.id_transaksi}">Selesai</button>
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`
    }
    
  } ).join('');
}

////
var currentIndex = 0; // Indeks data yang telah ditampilkan
var itemsPerLoad = 20; // Maksimum data yang ditampilkan per klik tombol

function loadMoreData() {
  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  var data=dataarray.dataadminlist;
  var lengthdata=data.length;
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
    /* dataContainer.appendChild(divhapus);
      const li = document.createElement('li');
      li.textContent = item;
      dataContainer.appendChild(li); */
  });
  console.log(`curentindex : ${currentIndex} itemsPerLoad : ${itemsPerLoad} data : ${JSON.stringify(fixarraawal)}`)
  //divhapus.innerHTML=returnarray(fixarraawal);
  $("#divhpsdata").last().append(returnarray(fixarraawal));

  // Sembunyikan tombol jika semua data sudah ditampilkan
  if (currentIndex >= data.length) {
      document.getElementById('load-more-btn').style.display = 'none';
  }
}

////

var flagopenpesananhariini=0;
function klikmenuadminlist(e) {
  var idos=['semuapesanantombol','pesananharinitombol','pesananbermasalahtombol'];
  document.getElementById('loadingskeleton').removeAttribute('style');
  document.getElementById('showmainpage').setAttribute('style','display:none;');

  for (let i = 0; i < idos.length; i++) {
    const element = idos[i];
    if (e.id==element) {
      var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
      
      if (element=='semuapesanantombol') {
        flagopenpesananhariini=0;
        showtabel(dataarray.dataadminlist);
      }else if(element=='pesananharinitombol'){
        flagopenpesananhariini=1;
        var datatoday = new Date();
        var day = ("0" + (datatoday.getDate())).slice(-2);
        var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
        var year = datatoday.getFullYear();
    
        var fixdatenow = day+"/"+month+"/"+year;

        var fixit= cekpesananhariini(fixdatenow,dataarray.dataadminlist);
        showtabel(fixit);
      }
      
      document.getElementById(element).className='nav-link active';

    }else{
      document.getElementById(element).className='nav-link';
    }
  }
}

function cekpesananhariini(tglnow,dataarray) {
  console.log(tglnow);
  console.log(dataarray);
  var fixdatatgl=[];
  for (let i = 0; i < dataarray.length; i++) {
    const element = dataarray[i];
    if (tglnow==element.order_date&&element.code2.toLowerCase()=='up'&&element.upholstery_jadi!='true'&&!element.deliveryunit.toLowerCase().includes('third party')) {
      fixdatatgl.push(element);
    }
  }
  console.log('tgllllllllllllll')
  console.log(fixdatatgl);
  return fixdatatgl;
}

var filtersavearray=[];
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


function cekempety(e) {
  if (e.value=='') {
    klikfilter();
  }
}

function klikfilter(e) {
  const search = document.getElementById("pencarianinput").value.toLowerCase();
  const status = document.getElementById("filterstatus-select").value;
  const item = document.getElementById("filterproduk-select").value;
  const platform = document.getElementById("filterplatform-select").value;
  
  var maxleng=20;
  var dataarrays;

  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  dataarrays=dataarray.dataadminlist;


  let filteredProducts = dataarrays.filter(trx => {
    var searchMatch = trx.item.toLowerCase().includes(search) ||
    trx.buyername.toLowerCase().includes(search) ||
    trx.no_transaksi.toLowerCase().includes(search) ||
    trx.id_transaksi.toLowerCase().includes(search);
    if (flagopenpesananhariini==1) {
      var datatoday = new Date();
      var day = ("0" + (datatoday.getDate())).slice(-2);
      var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
      var year = datatoday.getFullYear();
  
      var fixdatenow = day+"/"+month+"/"+year;

      searchMatch = trx.item.toLowerCase().includes(search)&&trx.order_date==fixdatenow ||
      trx.buyername.toLowerCase().includes(search)&&trx.order_date==fixdatenow ||
      trx.no_transaksi.toLowerCase().includes(search)&&trx.order_date==fixdatenow ||
      trx.id_transaksi.toLowerCase().includes(search)&&trx.order_date==fixdatenow;
    }
      let statusMatch = status ? trx.status === status : true;
      let itemMatch = item ? trx.item === item : true;
      let platformMatch = platform ? trx.platform === platform : true;
      let upornot='up'?trx.code2.toLowerCase()=='up':true;
      let upholstery_jadi='true'?trx.upholstery_jadi!='true':true;
      let nothirdparty='true'?!trx.deliveryunit.toLowerCase().includes('third party'):true;

      return searchMatch && statusMatch && itemMatch && platformMatch&&upornot&&upholstery_jadi&&nothirdparty;
  });

  console.log('filter awal');
  
  console.log(filteredProducts);
  
  if (filteredProducts.length<20) {
    maxleng=filteredProducts.length;
  }
  var fixarraawal=[];
  for (let i = 0; i < maxleng; i++) {
    const element = filteredProducts[i];
    var filtersearchitem;
   
    fixarraawal.push(element);
    
    
  }
  
  console.log('filter');
  console.log(fixarraawal);
  showtabel(fixarraawal);
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
var priceitem = 0;
var finalpricecal = 0;
var persendiskon = 0;

var konfirmrute='false';
var forcedsent='false';
var forcedcancel='false';
var reschedule='false';
var delayproduksi='false';
var toppriority='false';
var pending='false';

var editingdatas;

function klikdetail(idsx) {

  dataextracharge.length=0;
  
  document.getElementById('extrachargeadd').value='Pilih charge';
  document.getElementById('qtyinputadd-extracharge').value='';
  document.getElementById('priceaddshow-extracharge').value='';

  var ids=idsx.id.replace('detailklik-','');
  //document.getElementById('editsavedetail').innerHTML='Edit';
  priceitem = 0;
  finalpricecal = 0;
  persendiskon = 0;
  totalextracharge=0;
  
  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  var fixdat=dataarray.dataadminlist;
  
  for (let i = 0; i < fixdat.length; i++) {
    const element = fixdat[i];
    if (ids==element.id_transaksi) {
      editingdatas=element;
      document.getElementById('notransaksiinputadd').value=element.no_transaksi;
      var str =element.order_date;
      var [day, month, year] = str.split('/');
      var orderfixdate = `${year}-${month}-${day}`;

      document.getElementById('orderdateadd').value=orderfixdate;

      str =element.delivered_date;
      [day, month, year] = str.split('/');
      deliverifixdate = `${year}-${month}-${day}`;

      document.getElementById('delivereddateadd').value=deliverifixdate;

      document.getElementById('selectplatformadd').value=element.platform;
      document.getElementById('selectitemadd').value=element.item;
      document.getElementById('qtyinputadd').value=element.qty;

      finalpricecal=element.finalprice;
      persendiskon=element.diskon_persen;
      priceitem=element.price;

      if (element.extracharge!='') {
        dataextracharge=JSON.parse(element.extracharge);
        var array=JSON.parse(element.extracharge);

        if (dataextracharge.length>1) {
          extrachargeitemlist.length=0;
          console.log(dataextracharge);
          for (let i = 0; i < dataextracharge.length; i++) {
            if (i>0) {
              addnewelementcharge();
              arrayelementdetail.push(`extrachargeadd-${i}`);
              arrayelementdetail.push(`qtyinputadd-extracharge-${i}`);
              arrayelementdetail.push(`priceaddshow-extracharge-${i}`);
              document.getElementById(`extrachargeadd-${i}`).disabled=true;
              document.getElementById(`qtyinputadd-extracharge-${i}`).disabled=true;
              document.getElementById(`priceaddshow-extracharge-${i}`).disabled=true;
            }
            
          }

        }
        var idaray=arrayelementdetail;

        for (let i = 0; i < idaray.length; i++) {
          const element = idaray[i];
          document.getElementById(element).disabled=true;
        }
        
        for (let i = 0; i < array.length; i++) {
          const element1 = array[i];
          totalextracharge=totalextracharge+parseInt(element1.pricecharge)*parseInt(element1.qty);
          if (element1.no_index==0) {
            document.getElementById('extrachargeadd').value=element1.chargeitem;
            document.getElementById('qtyinputadd-extracharge').value=element1.qty;
            document.getElementById('priceaddshow-extracharge').value=element1.pricecharge;
          } else{
            document.getElementById(`extrachargeadd-${element1.no_index}`).value=element1.chargeitem;
            document.getElementById(`qtyinputadd-extracharge-${element1.no_index}`).value=element1.qty;
            document.getElementById(`priceaddshow-extracharge-${element1.no_index}`).value=element1.pricecharge;
          } 
        }
       
      }      

      document.getElementById('priceaddshow').value=`Rp ${formatMoney(finalpricecal)}`;

      document.getElementById('diskonamountadd').value=element.diskon_amount;
      document.getElementById('noteinputadd').value=element.notes;
      document.getElementById('colorvariantadd').value=element.colorvariant;
      document.getElementById('buyername').value=element.buyername;
      document.getElementById('phonenumber').value=element.phonenumber;
      document.getElementById('alamat').value=element.address;
      document.getElementById('deliveryunit').value=element.deliveryunit;
      document.getElementById('kode1').value=element.code1;
      document.getElementById('kode2').value=element.code2;

      var tampil_confirmroute=false;
      var tampil_forcedsent=false;
      var tampil_forcedcancel=false
      var tampil_reschedule=false;
      var tampil_delayproduksi=false;
      var tampil_toppriority=false;
      var tampil_pending=false;

      if (element.confirmroute=='true') {
          tampil_confirmroute=true;
          konfirmrute='true';
      }
      if (element.forcedsent=='true') {
          tampil_forcedsent=true;
          forcedsent='true';
      }
      if (element.forcedcancel=='true') {
          tampil_forcedcancel=true;
          forcedcancel='true';
      }
      
      if (element.reschedule=='true') {
          tampil_reschedule=true;
          reschedule='true';
      }

      if (element.delayproduksi=='true') {
          tampil_delayproduksi=true;
          delayproduksi='true';
      }
      
      if (element.toppriority=='true') {
          tampil_toppriority=true;
          toppriority='true';
      } 

      if (element.pending=='true') {
          tampil_pending=true;
          pending='true';
      }
      
      
      document.getElementById('checkbox-confirmroute').checked=tampil_confirmroute;
      document.getElementById('checkbox-forcedsent').checked=tampil_forcedsent;
      document.getElementById('checkbox-forcedcancel').checked=tampil_forcedcancel;
      document.getElementById('checkbox-reschedule').checked=tampil_reschedule;
      document.getElementById('checkbox-delayproduksi').checked=tampil_delayproduksi;
      document.getElementById('checkbox-toppriority').checked=tampil_toppriority;
      document.getElementById('checkbox-pending').checked=tampil_pending;
    }
  }
  //
  $('#modaldetail').modal('show');
  console.log(ids)

}
var notransaksiinputadd = document.getElementById('notransaksiinputadd');
var orderdateadd = document.getElementById('orderdateadd');
var delivereddateadd = document.getElementById('delivereddateadd');
var selectplatformadd = document.getElementById('selectplatformadd');
var selectitemadd = document.getElementById('selectitemadd');
var qtyinputadd = document.getElementById('qtyinputadd');
var priceaddshow = document.getElementById('priceaddshow');//final price show
var diskonamountadd = document.getElementById('diskonamountadd');
var noteinputadd = document.getElementById('noteinputadd');
var colorvariantadd = document.getElementById('colorvariantadd');
var buyername = document.getElementById('buyername');
var phonenumber = document.getElementById('phonenumber');
var alamat = document.getElementById('alamat');
var deliveryunit = document.getElementById('deliveryunit');
var kode1 = document.getElementById('kode1');
var kode2 = document.getElementById('kode2');

var totalextracharge=0;
var pricechargesementara=0;
var extrachargeitemlist=[];
var qty_extrachargelist=[];
var price_extrachargelist=[];
var dataextracharge=[];

function addextrachargemore() {
  if (document.getElementById('editsavedetail').innerHTML=='Edit') {
    
  }else{
    addnewelementcharge();
  }
 
}

function addnewelementcharge() {
  var lengthextra=extrachargeitemlist.length;
  extrachargeitemlist.push(`extrachargeadd-${lengthextra+1}`);
  //qty_extrachargelist.push(``);
  //price_extrachargelist.push(``);
  var newextracharge=`
  <div id="kotak-${lengthextra+1}">
    <hr>
      <div class="input-group mb-3">
          <span class="input-group-text" id="extrachargeaddspan-${lengthextra+1}">Extra Charge</span>
          <select id="extrachargeadd-${lengthextra+1}" class="form-select form-select-sm" aria-label="extra charge" onchange="getextracharge(this)">
              ${document.getElementById('extrachargeadd').innerHTML}
              
              
          </select>
      </div>
      
      <div class="row">
          <div class="col-4">
              <div class="input-group mb-3">
                <span class="input-group-text" id="qtyinputaddlabel-extracharge-${lengthextra+1}">Qty</span>
                <input type="number" class="form-control form-control-sm" placeholder="0" aria-label="qty-item" aria-describedby="qtyinputaddlabel" id="qtyinputadd-extracharge-${lengthextra+1}" min="0" onchange="getextracharge(this)" onkeyup="getextracharge(this)">
              </div>
          </div>
          <div class="col-8">

              <div class="input-group mb-3">
                  <span class="input-group-text" id="priceaddshow1-extracharge-${lengthextra+1}">Price</span>
                  <input type="number" class="form-control form-control-sm" placeholder="0" aria-label="priceaddshow" aria-describedby="priceaddshow1" id="priceaddshow-extracharge-${lengthextra+1}" onchange="getextracharge(this)" onkeyup="getextracharge(this)">
              </div>

          </div>
      </div>
  </div>
  `;
  document.getElementById('extrachargaboxs').insertAdjacentHTML("beforeend", newextracharge);
}

function getextracharge(e) {
  if (e.id.includes('extrachargeadd')) {
    if (e.id.includes('extrachargeadd-')) {
      var indexs=e.id.split('-')[1];
      var dataextrac={
        no_index:indexs,
        chargeitem:e.value,
        qty:document.getElementById(`qtyinputadd-extracharge-${indexs}`).value,
        pricecharge:document.getElementById(`priceaddshow-extracharge-${indexs}`).value
      };
      var flag=0;
      for (let i = 0; i < dataextracharge.length; i++) {
        const element = dataextracharge[i];
        if (element.no_index==indexs) {
          flag=1;
          dataextracharge[i]=dataextrac;
        }
      }
      if (flag==0) {
        dataextracharge.push(dataextrac);
      }
    }else {
      var indexs=0;
        var dataextrac={
          no_index:indexs,
          chargeitem:e.value,
          qty:document.getElementById(`qtyinputadd-extracharge`).value,
          pricecharge:document.getElementById(`priceaddshow-extracharge`).value
        };
        var flag=0;
        for (let i = 0; i < dataextracharge.length; i++) {
          const element = dataextracharge[i];
          if (element.no_index==indexs) {
            flag=1;
            dataextracharge[i]=dataextrac;
          }
        }
        if (flag==0) {
          dataextracharge.push(dataextrac);
        }
    }
  }else if (e.id.includes('qtyinputadd-extracharge')) {
    pricechargesementara=0;
    if (e.id.includes('qtyinputadd-extracharge-')) {
      var indexs=e.id.split('-')[2];
console.log(`index == ${indexs}`);
      var qtyextras=e.value;
      var priceextras=document.getElementById(`priceaddshow-extracharge-${indexs}`);
      pricechargesementara=priceextras.value;

     
      var dataextrac={
        no_index:indexs,
        chargeitem:document.getElementById(`extrachargeadd-${indexs}`).value,
        qty:qtyextras,
        pricecharge:pricechargesementara
      };
      var flag=0;
      for (let i = 0; i < dataextracharge.length; i++) {
        const element = dataextracharge[i];
        if (element.no_index==indexs) {
          flag=1;
          dataextracharge[i]=dataextrac;
        }
      }
      if (flag==0) {
        dataextracharge.push(dataextrac);
      }
      
      totalextracharge=0;

      for (let i = 0; i < dataextracharge.length; i++) {
        const element = dataextracharge[i];
        totalextracharge=totalextracharge+element.pricecharge*element.qty;
      }

      finalpricecal = (priceitem - (priceitem * persendiskon)) * qtyinputadd.value+totalextracharge;

      document.getElementById('finalpriceshow').innerHTML=`Rp ${formatMoney(finalpricecal)}`;
    }else {
      var indexs=0;
      var qtyextras=e.value;
      console.log(e.value);
      var priceextras=document.getElementById(`priceaddshow-extracharge`);
      pricechargesementara=priceextras.value;
      var dataextrac={
        no_index:indexs,
        chargeitem:document.getElementById(`extrachargeadd`).value,
        qty:qtyextras,
        pricecharge:pricechargesementara
      };
      var flag=0;
      for (let i = 0; i < dataextracharge.length; i++) {
        const element = dataextracharge[i];
        if (element.no_index==indexs) {
          flag=1;
          dataextracharge[i]=dataextrac;
        }
      }
      if (flag==0) {
        dataextracharge.push(dataextrac);
      }

      totalextracharge=0;

      for (let i = 0; i < dataextracharge.length; i++) {
        const element = dataextracharge[i];
        totalextracharge=totalextracharge+element.pricecharge*element.qty;
      }

      finalpricecal = (priceitem - (priceitem * persendiskon)) * qtyinputadd.value+totalextracharge;

      document.getElementById('finalpriceshow').innerHTML=`Rp ${formatMoney(finalpricecal)}`;
    }
  }else if (e.id.includes('priceaddshow-extracharge')) {
    pricechargesementara=0;
    if (e.id.includes('priceaddshow-extracharge-')) {
      var indexs=e.id.split('-')[2];

      var qtyextras=document.getElementById(`qtyinputadd-extracharge-${indexs}`);
      var priceextras=e.value;
      pricechargesementara=priceextras;

     
      var dataextrac={
        no_index:indexs,
        chargeitem:document.getElementById(`extrachargeadd-${indexs}`).value,
        qty:qtyextras.value,
        pricecharge:pricechargesementara
      };
      var flag=0;
      for (let i = 0; i < dataextracharge.length; i++) {
        const element = dataextracharge[i];
        if (element.no_index==indexs) {
          flag=1;
          dataextracharge[i]=dataextrac;
        }
      }
      if (flag==0) {
        dataextracharge.push(dataextrac);
      }
      totalextracharge=0;

      for (let i = 0; i < dataextracharge.length; i++) {
        const element = dataextracharge[i];
        totalextracharge=totalextracharge+element.pricecharge*element.qty;
      }

      finalpricecal = (priceitem - (priceitem * persendiskon)) * qtyinputadd.value+totalextracharge;

      document.getElementById('finalpriceshow').innerHTML=`Rp ${formatMoney(finalpricecal)}`;
    }else {
      var indexs=0;
      var qtyextras=document.getElementById(`qtyinputadd-extracharge`);
      var priceextras=e.value;
      pricechargesementara=priceextras;
      var dataextrac={
        no_index:indexs,
        chargeitem:document.getElementById(`extrachargeadd`).value,
        qty:qtyextras.value,
        pricecharge:pricechargesementara
      };
      var flag=0;
      for (let i = 0; i < dataextracharge.length; i++) {
        const element = dataextracharge[i];
        if (element.no_index==indexs) {
          flag=1;
          dataextracharge[i]=dataextrac;
        }
      }
      if (flag==0) {
        dataextracharge.push(dataextrac);
      }

     totalextracharge=0;

      for (let i = 0; i < dataextracharge.length; i++) {
        const element = dataextracharge[i];
        totalextracharge=totalextracharge+element.pricecharge*element.qty;
      }

      finalpricecal = (priceitem - (priceitem * persendiskon)) * qtyinputadd.value+totalextracharge;

      document.getElementById('finalpriceshow').innerHTML=`Rp ${formatMoney(finalpricecal)}`;
    }
  }
  console.log(dataextracharge);
}

function getpriceadditem(e) {
  var cekdataitem = JSON.parse(document.getElementById('itemalls').innerHTML).itemsdata;

  for (let i = 0; i < cekdataitem.length; i++) {
      const element = cekdataitem[i];
      if (element.product == e.value) {
          console.log(element.code1)
          if (element.code1=='NULL'||element.code1==''||element.code1=='N/A') {
              kode1.value='-';//"N/A"
          } else {
              kode1.value=element.code1;
          }
          if (element.code2=='NULL'||element.code2==''||element.code2=='N/A') {
              kode2.value='-';
          } else {
              kode2.value=element.code2;
          }
          

          priceitem = element.price1;
          finalpricecal = (priceitem - (priceitem * persendiskon)) * qtyinputadd.value;
          priceaddshow.value = `Rp ${formatMoney(priceitem)}`;
          document.getElementById('finalpriceshow').innerHTML=`Rp ${formatMoney(finalpricecal)}`;
          return;
      }

  }
}
function getqtyadditem(e) {
  finalpricecal = (priceitem - (priceitem * persendiskon)) * qtyinputadd.value;
  priceaddshow.value = `Rp ${formatMoney(priceitem)}`;
  document.getElementById('finalpriceshow').innerHTML=`Rp ${formatMoney(finalpricecal)}`;
}
function getdiskonadd(e) {
  persendiskon = e.value / priceitem;
  finalpricecal = (priceitem - (priceitem * persendiskon)) * qtyinputadd.value;
  priceaddshow.value = `Rp ${formatMoney(priceitem)}`;
  document.getElementById('finalpriceshow').innerHTML=`Rp ${formatMoney(finalpricecal)}`;

}

function checkboxklik(e) {
  var cekitya;
  if (e.id=='checkbox-confirmroute') {
      if (document.getElementById(e.id).checked) {
          konfirmrute='true'; cekitya='true';
      }else{
          konfirmrute='false'; cekitya='false';
      }
  }else if (e.id=='checkbox-forcedsent') {
      if (document.getElementById(e.id).checked) {
          forcedsent='true'; cekitya='true';
      }else{
          forcedsent='false'; cekitya='false';
      }
  }else if (e.id=='checkbox-forcedcancel') {
      if (document.getElementById(e.id).checked) {
          forcedcancel='true'; cekitya='true';
      }else{
          forcedcancel='false'; cekitya='false';
      }
  }else if (e.id=='checkbox-reschedule') {
      if (document.getElementById(e.id).checked) {
          reschedule='true'; cekitya='true';
      }else{
          reschedule='false'; cekitya='false';
      }
  }else if (e.id=='checkbox-delayproduksi') {
      if (document.getElementById(e.id).checked) {
          delayproduksi='true'; cekitya='true';
      }else{
          delayproduksi='false'; cekitya='false';
      }
  }else if (e.id=='checkbox-toppriority') {
      if (document.getElementById(e.id).checked) {
          toppriority='true'; cekitya='true';
      }else{
          toppriority='false'; cekitya='false';
      }
  }else if (e.id=='checkbox-pending') {
      if (document.getElementById(e.id).checked) {
          pending='true'; cekitya='true';
      }else{
          pending='false'; cekitya='false';
      }
  }
  console.log(e.id);
  console.log(cekitya);
}
var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';
var arrayelementdetail=['notransaksiinputadd','orderdateadd','delivereddateadd','selectplatformadd','selectitemadd','qtyinputadd','diskonamountadd','noteinputadd','colorvariantadd','buyername','phonenumber','alamat','deliveryunit','checkbox-confirmroute','checkbox-forcedsent','checkbox-forcedcancel','checkbox-reschedule','checkbox-delayproduksi','checkbox-toppriority','checkbox-pending','extrachargeadd','qtyinputadd-extracharge','priceaddshow-extracharge'];

////////////////// cek klik foto or video

function cekfotoorvideo(e) {
  if (document.getElementById(e.id).checked) {
    if (e.id=='fotocek') {
      //document.getElementById('videocek').checked=false;
      document.getElementById('showupload-video').style.display='none';
      
      document.getElementById('showupload-foto').removeAttribute('style');
    } else {
      //document.getElementById('fotocek').checked=false;
      document.getElementById('showupload-foto').style.display='none';
      document.getElementById('showupload-video').removeAttribute('style');
    }
  }
}

var filedata1;
var mimetype1;
var filename1;
var filedatf;
var image_url_show = '';
var video_url_show='';

function klikuploadimgorvid(e) {
  if (e.id=='img-klikpload') {
      document.getElementById('foto-upload').click();
  }else if (e.id=='kamerafoto-klikpload'){
      document.getElementById('kamerafoto-upload').click();
     /*  const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Konversi ke gambar
      document.getElementById('kamera-upload').src = canvas.toDataURL("image/png"); */
  }else if (e.id=='vid-klikpload') {
    document.getElementById('video-upload').click();
  }else if (e.id=='kameravideo-klikpload'){
    document.getElementById('kameravideo-upload').click();
  }
} 
/* */

document.getElementById('foto-upload').addEventListener('change', function (event) {
    var file = event.target.files[0];
    filedatf = event.target.files;
    var reader = new FileReader();

    if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/gif") {
        image_url_show = URL.createObjectURL(event.target.files[0]);
        document.getElementById('img-urlupload').innerHTML=file.name;

        reader.onload = function (e) {
            //console.log(e.target.result);
            var fileData = e.target.result.substr(e.target.result.indexOf(",") + 1);
            var mimeTypeStart = e.target.result.indexOf("data:") + 5;
            var mimeTypeEnd = e.target.result.indexOf(";");
            var mimeType = e.target.result.substr(mimeTypeStart, mimeTypeEnd - mimeTypeStart);
            var fileName = file.name;

            //document.getElementById("filedata1").value=fileData;
            //document.getElementById("mimetype1").value=mimeType;
            //document.getElementById("filename1").value=fileName;

            filedata1 = fileData;
            mimetype1 = mimeType;
            filename1 = fileName;

            //document.getElementById("imgbkttransfer").src = e.target.result;
            //document.getElementsByName("buktitrasnfershowimg")[0].setAttribute('style', 'height: 50%;');
        };

        console.log(filedatf[0]);
        console.log(`ini = ${document.getElementById('foto-upload').value}`);
        reader.readAsDataURL(file);
    }
    else {
        Swal.fire({

            icon: "error",
            text: "Format harus jpg/jpeg/png",

            confirmButtonColor: '#0d6efd',
            confirmButtonText: 'Ok',
            allowOutsideClick: true
        });
    }
});

document.getElementById('kamerafoto-upload').addEventListener('change', function (event) {
  console.log(event);
  var file = event.target.files[0];
  filedatf = event.target.files;
  var reader = new FileReader();

  if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/gif") {
      image_url_show = URL.createObjectURL(event.target.files[0]);
      document.getElementById('img-urlupload').innerHTML=file.name;
      reader.onload = function (e) {
          //console.log(e.target.result);
          var fileData = e.target.result.substr(e.target.result.indexOf(",") + 1);
          var mimeTypeStart = e.target.result.indexOf("data:") + 5;
          var mimeTypeEnd = e.target.result.indexOf(";");
          var mimeType = e.target.result.substr(mimeTypeStart, mimeTypeEnd - mimeTypeStart);
          var fileName = file.name;

          //document.getElementById("filedata1").value=fileData;
          //document.getElementById("mimetype1").value=mimeType;
          //document.getElementById("filename1").value=fileName;

          filedata1 = fileData;
          mimetype1 = mimeType;
          filename1 = fileName;

          //document.getElementById("imgbkttransfer").src = e.target.result;
          //document.getElementsByName("buktitrasnfershowimg")[0].setAttribute('style', 'height: 50%;');
      };

      console.log(filedatf[0]);
      console.log(`ini = ${document.getElementById('foto-upload').value}`);
      reader.readAsDataURL(file);
  }
  else {
      Swal.fire({

          icon: "error",
          text: "Format harus gambar",

          confirmButtonColor: '#0d6efd',
          confirmButtonText: 'Ok',
          allowOutsideClick: true
      });
  }
  
  console.log(filedatf[0].type.split('/')[1]);
});

document.getElementById('video-upload').addEventListener('change', function (event) {
  var file = event.target.files[0];
  filedatf = event.target.files;
  var reader = new FileReader();

  if (file.type == "video/mp4") {
    video_url_show = URL.createObjectURL(event.target.files[0]);
    document.getElementById('vid-urlupload').innerHTML=file.name;

      reader.onload = function (e) {
          console.log(e.target.result);
          var fileData = e.target.result.substr(e.target.result.indexOf(",") + 1);
          var mimeTypeStart = e.target.result.indexOf("data:") + 5;
          var mimeTypeEnd = e.target.result.indexOf(";");
          var mimeType = e.target.result.substr(mimeTypeStart, mimeTypeEnd - mimeTypeStart);
          var fileName = file.name;

          //document.getElementById("filedata1").value=fileData;
          //document.getElementById("mimetype1").value=mimeType;
          //document.getElementById("filename1").value=fileName;

          filedata1 = fileData;
          mimetype1 = mimeType;
          filename1 = fileName;

          //document.getElementById("imgbkttransfer").src = e.target.result;
          //document.getElementsByName("buktitrasnfershowimg")[0].setAttribute('style', 'height: 50%;');
      };

      console.log(filedatf[0]);
      console.log(`ini = ${document.getElementById('video-upload').value}`);
      reader.readAsDataURL(file);
  }
  else {
      Swal.fire({

          icon: "error",
          text: "Format harus video",

          confirmButtonColor: '#0d6efd',
          confirmButtonText: 'Ok',
          allowOutsideClick: true
      });
  }
});


document.getElementById('kameravideo-upload').addEventListener('change', function (event) {
  var file = event.target.files[0];
  filedatf = event.target.files;
  var reader = new FileReader();

  if (file.type == "video/mp4"||file.type == "video/mkv") {
    video_url_show = URL.createObjectURL(event.target.files[0]); 
    document.getElementById('vid-urlupload').innerHTML=file.name;

      reader.onload = function (e) {
          console.log(e.target.result);
          var fileData = e.target.result.substr(e.target.result.indexOf(",") + 1);
          var mimeTypeStart = e.target.result.indexOf("data:") + 5;
          var mimeTypeEnd = e.target.result.indexOf(";");
          var mimeType = e.target.result.substr(mimeTypeStart, mimeTypeEnd - mimeTypeStart);
          var fileName = file.name;

          //document.getElementById("filedata1").value=fileData;
          //document.getElementById("mimetype1").value=mimeType;
          //document.getElementById("filename1").value=fileName;

          filedata1 = fileData;
          mimetype1 = mimeType;
          filename1 = fileName;

          //document.getElementById("imgbkttransfer").src = e.target.result;
          //document.getElementsByName("buktitrasnfershowimg")[0].setAttribute('style', 'height: 50%;');
      };

      console.log(filedatf[0]);
      console.log(`ini = ${document.getElementById('video-upload').value}`);
      reader.readAsDataURL(file);
  }
  else {
      Swal.fire({

          icon: "error",
          text: "Format harus video",

          confirmButtonColor: '#0d6efd',
          confirmButtonText: 'Ok',
          allowOutsideClick: true
      });
  }
});

//////////////////

function klikforcestatus(idsx) {
  var ids=idsx.id.replace('forcestatus-','');
  konfirmrute='false';
  forcedsent='false';
  forcedcancel='false';
  reschedule='false';
  delayproduksi='false';
  toppriority='false';
  pending='false';

  

  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  var fixdat=dataarray.dataadminlist;

  for (let i = 0; i < fixdat.length; i++) {
    const element = fixdat[i];
    if (ids==element.id_transaksi) {
      document.getElementById('modalklikjadilabel').innerHTML=`${element.no_transaksi}-${element.item}`;
      editingdatas=element;
    }
  }
  $('#modalklikjadi').modal('show');
}

function removeItemFromArray(array, value) {
  return array.filter(item => item !== value);
}

document.getElementById('savetomboljadi').addEventListener('click',async function(){
 

  if (!document.getElementById('fotocek').checked&&!document.getElementById('videocek').checked) {
    Swal.fire({
      icon: "error",
      title: `Upload dulu foto/video item yang telah selesai`,
      showConfirmButton: false,
      timer: 1500
    }); 
  }else{
    hidemodal('modalklikjadi');
    loadingpopup();
    if (document.getElementById('videocek').checked) {
      senduploadvideo();
    }else{
      senduploadfoto();
    }
  }
  

  
  
});

async function senduploadfoto() {
  const d = new Date();
  let time = d.getTime();
  var folderyear=editingdatas.id_transaksi.split('-')[1];
  var folderfoto = `/assets/upholstery/${folderyear}/upholstery-${editingdatas.id_transaksi}-${time}.png`;

  const formData = new FormData();
  formData.append("upload", filedatf[0], `upholstery-${editingdatas.id_transaksi}-${time}.png`);
  
  fetch(`/upholstery/uploadimage`, {
    method: "POST",
    body: formData,
  }).then(r => r.json().then(datax => {
    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=60;
    if (datax.uploaded=='file terupload') {
      seveselesaifix(folderfoto);
    }else {
      Swal.fire({
          icon: "error",
          title: `${datax.uploaded}, coba lagi [1]`,
          showConfirmButton: false,
          timer: 1500
      });
    }
  })).catch((err) => {
      //console.log(err);
      Swal.fire({

          icon: "error",
          title: `Upload gambar error, coba lagi [2]`,
          showConfirmButton: false,
          timer: 1500
      }); 
    
    });

    
}

async function senduploadvideo() {
  const d = new Date();
  let time = d.getTime();
  var folderyear=editingdatas.id_transaksi.split('-')[1];
  
  var extensifile=filedatf[0].type.split('/')[1];

  var folderfoto = `/assets/upholstery/${folderyear}/upholstery-${editingdatas.id_transaksi}-${time}.${extensifile}`;

  const formData = new FormData();
  formData.append("upload", filedatf[0], `upholstery-${editingdatas.id_transaksi}-${time}.${extensifile}`);
  
  fetch(`/upholstery/uploadvideo`, {
    method: "POST",
    body: formData,
  }).then(r => r.json().then(datax => {
    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=60;

    if (datax.message=='file terupload') {
      seveselesaifix(folderfoto);
    }else {

      Swal.fire({

          icon: "error",
          title: `${datax.message}, coba lagi [1]`,
          showConfirmButton: false,
          timer: 1500
      });
    }
  })).catch((err) => {
      //console.log(err);
       Swal.fire({

          icon: "error",
          title: `Upload video error, coba lagi [2]`,
          showConfirmButton: false,
          timer: 1500
      }); 
     
  });

}

function seveselesaifix(filenames) {
 
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
    
    awalhistory.unshift({id_transaksi:editingdatas.id_transaksi,tgl:fixdate_history,user:namalengkap,tindakan:'Upholstery Jadi'})
  }else{
    awalhistory=[{id_transaksi:editingdatas.id_transaksi,tgl:fixdate_history,user:namalengkap,tindakan:'Upholstery Jadi'}]
  }

  var data={
    id_transaksi:editingdatas.id_transaksi,
    history:awalhistory,
    filenamesupload:filenames
  }
  var xhrzx = new XMLHttpRequest();
  
  xhrzx.open("POST", `/upholstery/saveselesai`);
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
                socket.emit('upholsteryselesai',data);
                fetch(`https://script.google.com/macros/s/AKfycbyRzRM7qevFijlQ1WBrIslBjTtaX4_F1Juzr2pyiM-lZvnUoI4kPMcOglmx9lePb0ON/exec?id_transaksi=${editingdatas.id_transaksi}&no_transaksi=${editingdatas.no_transaksi}`, {
                  method: "GET",
                  //body: formData,
                });
                window.open('/upholstery','_self');
              }
          },800); 
      },2000); 
      
      
  });
  
}
//////////////////////////// edit detail ////////////////////////////////////

/* 

function editkliked(idtransaksi) {
  window.open(`/adminlist/edititem/${idtransaksi}`,'_self');
} */

  
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
      title: title,
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
  extrachargeitemlist.length=0;
  qty_extrachargelist.length=0;
  price_extrachargelist.length=0;
  //dataextracharge.length=0;
  
  //forcestatuscekklik.length=0;
  var myModalEl = document.getElementById(modalid);
  var modal = bootstrap.Modal.getInstance(myModalEl)
  modal.hide();
}
$('#modaldetail').on('hidden.bs.modal', function (e) {
  // do something...
  if (dataextracharge.length>1) {
    for (let i = 0; i < dataextracharge.length; i++) {
      const element = dataextracharge[i];
      if (i>0) {
        document.getElementById(`kotak-${i}`).remove();
      }
      
    }
  }
});
///--------------------------------

//format uang
function formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
  } catch (e) {
    console.log(e)
  }
};

function warningunderbuild() {
  $('#modalunderbuild').modal('show');
}

function logout() {
  Swal.fire({
    title: "",
    text:'Anda ingin logout akun?',
    showDenyButton: true,
    //showCancelButton: true,
    confirmButtonText: "Ya",
    denyButtonText: `Tidak`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.clear();
      sessionStorage.clear();
      window.open('/login','_self');
    } 
  });
  
}