var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');

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

  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  //console.log(dataarray.dataadminlist);
  //additemdropfilter(dataarray.itemsdata);
  showtabel(dataarray.forcestatusrequest);
  //showtabel(dataarray.dataadminlist);
  
});

///////////
/* function hitungtugassaya(array) {
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    console.log('alll ');
    console.log(dataarray);

    var arrays=dataarray.dataadminlist;

    const jumlahProsesProduksi = arrays.filter(element =>
        element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&!element.deliveryunit.toLowerCase().includes('third party')&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi'
    ).length;

    

    //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;
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
/////

function loadingbawahupdate(array) {
  $progressBar.css('width', '0%');
  $progress.show();
  setTimeout(function () {
    /* var modaldut=['modaldetail','modalklikjadi']
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
  loadingbawahupdate(dataarray.forcestatusrequest);
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
  loadingbawahupdate(dataarray.forcestatusrequest);
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

  loadingbawahupdate(dataarray.forcestatusrequest);
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

      
      document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    }
  }
  loadingbawahupdate(dataarray.forcestatusrequest);
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
  
  loadingbawahupdate(dataarray.forcestatusrequest);
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
  loadingbawahupdate(dataarray.forcestatusrequest);
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
  loadingbawahupdate(dataarray.forcestatusrequest);
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
  loadingbawahupdate(dataarray.forcestatusrequest);
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
  loadingbawahupdate(dataarray.forcestatusrequest);
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
  loadingbawahupdate(dataarray.forcestatusrequest);
});


///////////////////////////////

///////////// tampil data //////////////////
function showtabel(dataarray) {
  var myobj = document.getElementById("divhpsdata");
  if (myobj)
      myobj.remove();

  var datatab = document.getElementById(`alldattab`);

  var divhapus = document.createElement("tbody");
  divhapus.setAttribute('id', 'divhpsdata');

  
  divhapus.innerHTML=returnarray(dataarray);
  datatab.appendChild(divhapus);

  setTimeout(function () { 
      hitungtugassaya_universal();
      document.getElementById('showmainpage').removeAttribute('style');
      document.getElementById('loadingskeleton').setAttribute('style','display:none;');
  
  },500);
}


function returnarray(dataitem) {

  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  var fixreqstatus=[];

  for (let i = 0; i < dataitem.length; i++) {
    const element = dataitem[i];
    if (element.approval_forcestatus!='true') {
      fixreqstatus.push(element);
    }
  } 

  console.log('fixreqstatus========');
  console.log(fixreqstatus);

  var dataadminlist=dataarray.dataadminlist;

  const result = fixreqstatus.map(d2 => {
    const match = dataadminlist.find(d1 => d1.id_transaksi === d2.id_transaksi);
    return {
      ...d2,
      item: match ? match.item : "" ,
      colorvariant: match ? match.colorvariant : ""
    };
  });
  
  console.log('result ========');
  console.log(result);

  return result.map(function(element,indexit) {
    var bgtombolselesai='text-bg-secondary';
    var texttombolselesai='Approval';

    return `
    <tr id="datatr-${element.id_transaksi}" data-json='${JSON.stringify(element)}'>
      <td style="text-align: left;vertical-align: middle;width:max-content">
          ${formatDatess(parseInt(element.tglinputmili))}
      </td>
      <td style="text-align: center;vertical-align: middle;">
          ${element.id_transaksi.split('-')[0]}
      </td>
      
      <td style="text-align: left;vertical-align: middle;"  title="${element.item}">
          ${element.item}
      </td>

      <td style="text-align: left;vertical-align: middle;"  title="">
        ${element.colorvariant}
      </td>

      <td style="text-align: left;vertical-align: middle;">
          ${element.forcedsent=='true'?'Force Sent':element.forcedcancel=='true'?'Force Cancel':element.pending=='true'?'Force Pending':element.toppriority=='true'?'Force Top Priority':''}
      </td>

      <td style="text-align: left;vertical-align: middle;"  title="">
          ${JSON.parse(element.history).details.alasanforce}
      </td>

      <td style="text-align: left;vertical-align: middle;">
          <span class="badge ${bgtombolselesai}" onclick="klikselesaibuatstock('${element.id_transaksi}',this)" style="cursor:pointer;">${texttombolselesai}</span>
      </td>
      

      
    </tr>
    `;
  }).join('');
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
///////////// tutup tampil data //////////////////


//////////// klik selesai buat stock ////////////

var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

function klikselesaibuatstock(idtransaksi,e) {
   
  console.log('idtransaksi');
  console.log(idtransaksi);
  
  var dataarray=JSON.parse(document.getElementById(`datatr-${idtransaksi}`).dataset.json);
  
  var datacek=dataarray;

  console.log('datacek =====');
  console.log(datacek);

  Swal.fire({
    icon:'question',
    title:'',
    text: `Apakah forcestatus ${idtransaksi.split('-')[0]} ingin di-Approved?`,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Approved",
    denyButtonText: `Kembali`,
    confirmButtonColor: "grey",
    denyButtonColor: "#d33",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
     
      loadingpopup();

      var item='';
      var colorvariant='';
      var qty;
      var orderdate_mili;
      var history=JSON.parse(datacek.history);

      console.log('history ======');
      console.log(history);
      
      var tglinputmili = new Date().getTime();

      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
          "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

      var date_history = new Date();
      var day_history = ("0" + (date_history.getDate())).slice(-2);
      var month_history = ("0" + (date_history.getMonth() + 1)).slice(-2);//d.getMonth()+1;
      var hour_history = ("0" + (date_history.getHours())).slice(-2);
      var minutes_history = ("0" + (date_history.getMinutes())).slice(-2);
      var year_history = date_history.getFullYear();
  
      var fixdate_history = day_history+"/"+month_history+"/"+year_history +` ${hour_history}:${minutes_history}`;

      var addhistory={
        id_transaksi:idtransaksi,
        tgl:fixdate_history,
        user:namalengkap,
        username,
        tindakan:`Approved ${datacek.forcedsent=='true'?'Force Sent':datacek.forcedcancel=='true'?'Force Cancel':datacek.pending=='true'?'Force Pending':datacek.toppriority=='true'?'Force Top Priority':''}`,
        details: {
          tglinputmili:date_history.getTime(),
          status:history.details.status,
          ketstatus:`Pesanan di ${datacek.forcedsent=='true'?'Force Sent':datacek.forcedcancel=='true'?'Force Cancel':datacek.pending=='true'?'Force Pending':datacek.toppriority=='true'?'Force Top Priority':''} oleh ${history.user} ID: ${history.username} dan di-approved oleh ${namalengkap} ID: ${username}`,
          alasanforce:history.details.alasanforce
        }
      };
      
      console.log('addhistory ======');
      console.log(addhistory);

      var newhistory=[];
      
      newhistory.push(addhistory);
      newhistory.push(history);

      //history.unshift(addhistory);
      console.log('newhistory 2===');
      console.log(newhistory);

      var data={
          id_transaksi:idtransaksi,
          datacek,
          history:newhistory

      };

      var xhrzx = new XMLHttpRequest();

      xhrzx.open("POST", `/adminlist/saveforcestatusapproved`);
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
                  if (resdat.icons=='success') {
                      socket.emit('approvalforcestatuss',data);
                      warningpopup(resdat.icons,resdat.texts);
                      location.reload(true);
                  }else{
                      warningpopup(resdat.icons,resdat.texts);
                  }
              },800);
          },2000);
      });

    } else if (result.isDenied) {
        
    }
  });
    
}
//////////// tutup klik selesai buat stock ////////////








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