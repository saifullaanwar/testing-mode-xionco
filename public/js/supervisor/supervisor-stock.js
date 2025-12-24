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
    //document.getElementById('sidabarutamashow').setAttribute('style','display:none!important;');
    //document.getElementById('main-pages').setAttribute('style','margin-left:0px!important;');
  }
  $('#editsavedetail').hide();
  scrolltobuttonsidebar();
  fetchdata();
  // var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  // console.log(dataarray.stockupholsterydatabase);
  //additemdropfilter(dataarray.itemsdata);
    /* var fixawals=[];
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
      const element = dataarray.dataadminlist[i];
      if (element.code2.toLowerCase()=='up'&&element.upholstery_jadi!='true'&&element.stockprodukcode!='true'&&!element.deliveryunit.toLowerCase().includes('third party')) {
        fixawals.push(element);
      }
    } */
});

function fetchdata() {
  fetch('/api/supervisor')
      .then(res => res.json())
      .then(data => {
      window.dataall = data;
      console.log('datalls =================23=',window.dataall)
      // worker_threads(data);
      // additemdropfilter(data.itemsdata);
      showtabel(data.stockupholsterydatabase);
      // createlist();
      // creatplatformseleks();
      
  })
  .catch(err => {
    console.error('Gagal ambil dataall:', err);
  });
}
///////////
/* function hitungtugassaya(array) {
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  console.log('alll ');
  console.log(dataarray);

  var arrays=dataarray.dataadminlist;

  const jumlahProsesProduksi = arrays.filter(element =>
    element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&!element.deliveryunit.toLowerCase().includes('third party')&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi'
  ).length;

  var arraystocks=dataarray.stockupholsterydatabase;

  console.log('alll arraystocks');
  console.log(arraystocks.length);

  const jumlahProsesProduksistock = arraystocks.filter(element =>
    element.qty!='0'&&element.upholstery_selesaibuatstock==='true'&&element.fixcreatein!='instocked'&&element.approval_produkjadi!='true'
  ).length;

  //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;
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

///////////

function loadingbawahupdate(array) {
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
          showtabel(array,true);
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
    //if (!array[i].product.includes("S-")&&!array[i].product.includes("IN-")&&!array[i].product.includes("OUT-")) {
      var opt=document.createElement('option');
      opt.innerHTML=array[i].product;

      elex.appendChild(opt);
    //}
  }
}


//socket io
// const socket = io();
socket.on('newaddstockup',function(datas){
  console.log('reload new stock');
  console.log(datas);
  // var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  var dataarray= window.dataall;
  var dattockup=dataarray.stockupholsterydatabase;
  for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    dattockup.push(element);
  }
  console.log('reload dattockup');
  console.log(dattockup);
  // document.getElementById('itemalls').innerHTML=JSON.stringify(dataarray);
  window.dataall=dataarray;  // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.stockupholsterydatabase);
});

socket.on('newupholsteryfinisstock',function(datas){
    console.log('reload new stock');
    console.log(datas);
    // var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
    var dataarray= window.dataall;
    var dattockup=dataarray.stockupholsterydatabase;
    for (let i = 0; i < dattockup.length; i++) {
      const element = dattockup[i];
        if (element.id_stock==datas.id_stock) {
            dattockup[i].upholstery_selesaibuatstock='true';
            dattockup[i].history=datas.history
        }
      //dattockup.push(element);
    }
    console.log('reload dattockup');
    console.log(dattockup);
    // document.getElementById('itemalls').innerHTML=JSON.stringify(dataarray);
   window.dataall=dataarray;  // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.stockupholsterydatabase);
});

socket.on('newapprovalfinisstock',function(datas){
  console.log('reload approval stock');
  console.log(datas);
  // var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  var dataarray= window.dataall;
  var dattockup=dataarray.stockupholsterydatabase;
  for (let i = 0; i < dattockup.length; i++) {
    const element = dattockup[i];
      if (element.id_stock==datas.data.id_stock) {
          dattockup[i].upholstery_selesaibuatstock='true';
          dattockup[i].approval_produkjadi='true';
          dattockup[i].approval_datemili=datas.tglinputmili;
          dattockup[i].history=datas.data.history
      }
    //dattockup.push(element);
  }
  console.log('reload dattockup');
  console.log(dattockup);
  // document.getElementById('itemalls').innerHTML=JSON.stringify(dataarray);
  window.dataall=dataarray; // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.stockupholsterydatabase);
});


socket.on('neweditforcestatusnew',function(datas){
  // var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  var dataarray= window.dataall;
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

  window.dataall=dataarray; // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.stockupholsterydatabase);
});
////////////////////////////////////////////////
///////////// tampil data //////////////////
function showtabel(dataarray,awalnotif=false) {
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();
  
    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

    
    divhapus.innerHTML=returnarray(dataarray);
    datatab.appendChild(divhapus);

  if (awalnotif==false) {
    getceknotif();
  }
    setTimeout(function () { 
        hitungtugassaya_universal();
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style','display:none;');
    
    },500);
}


function returnarray(dataitem) {

   var fixstockproduklist=[];

  for (let i = 0; i < dataitem.length; i++) {
      const element = dataitem[i];
      if (element.qty!='0'&&element.fixcreatein!='instocked'&&element.approval_produkjadi!='true') {
          fixstockproduklist.push(element);
      }
  } 

  // sort desending dgn tglmili diparsing sebagai number biar bisa dihitung
  //dataitem.sort((a, b) => Number(b.tglinputmili) - Number(a.tglinputmili));

  // Pisahkan yang approved dan tidak
  const approved = fixstockproduklist.filter(item => item.upholstery_selesaibuatstock === 'true');
  const notApproved = fixstockproduklist
    .filter(item => item.upholstery_selesaibuatstock !== 'true')
    .sort((a, b) => a.tglinputmili - b.tglinputmili);

  // Gabungkan ulang: approved dulu, baru sisanya berdasarkan tanggal
  const finalResult = [...approved, ...notApproved];

  console.log('fixstockproduklist========');
  console.log(finalResult);

  return finalResult.map(function(element) {
    var bgtombolselesai='text-bg-light text-light';
    var texttombolselesai='In Process';

    if (element.qty!='0'&&element.upholstery_selesaibuatstock==='true'&&element.fixcreatein!='instocked'&&element.approval_produkjadi!='true') {
      bgtombolselesai='text-bg-secondary';
      texttombolselesai='Approval';
    }

    return `
      <tr>
      <td style="text-align: left;vertical-align: middle;width:max-content">
          ${element.order_date}
      </td>
      <td style="text-align: left;vertical-align: middle;">
          ${element.id_stock.split('-')[0]}
      </td>
      
      <td style="text-align: left;vertical-align: middle;"  title="${element.item}">
          ${element.item}
      </td>

      <td style="text-align: left;vertical-align: middle;"  title="${element.colorvariant}">
          ${element.colorvariant}
      </td>

      <td style="text-align: center;vertical-align: middle;">
          ${element.qty}
      </td>

      <td style="text-align: center;vertical-align: middle;">
        <span class="badge text-bg-secondary" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#mediaModal" data-url="${element.upholstery_fotovidbuatstock}">View</span>
      </td>

      <td style="text-align: left;vertical-align: middle;">
          <span class="badge ${bgtombolselesai}" onclick="klikselesaibuatstock('${element.id_stock}',this)" style="cursor:pointer;">${texttombolselesai}</span>
      </td>
        
          
      </tr>
    `;
  }).join('');
}

///////////// tutup tampil data //////////////////

//////////// klik selesai buat stock ////////////

//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

function klikselesaibuatstock(idstoks,e) {
  if (e.innerHTML=='In Process') {
    warningpopup('warning','Masih proses produksi');
  }else{
    Swal.fire({
      icon:'question',
      title:'',
      text: `Apakah stock No ${idstoks.split('-')[0]} benar telah selesai diproduksi?`,
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

        console.log('idstoks');
        console.log(idstoks);

        // var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
        var dataarray= window.dataall;
        var datacek=dataarray.stockupholsterydatabase;

        var item='';
        var colorvariant='';
        var qty;
        var orderdate_mili;
        var history;
        for (let i = 0; i < datacek.length; i++) {
            const element = datacek[i];
            if (element.id_stock==idstoks) {
                item=element.item;
                colorvariant=element.colorvariant;
                qty=element.qty;
                orderdate_mili=parseInt(element.orderdate_mili);

                history=JSON.parse(element.history);
                console.log('history');
                console.log(history);
            }
        }

        var tglinputmili = new Date().getTime();

  
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

        var bulan=monthNames[new Date().getMonth()];
        var tahun =new Date().getFullYear();

        var addhistory={
            tglinputmili,
            namalengkap,
            username,
            tindakan:`approval pembuatan stock ${idstoks}`,
            id_stock:idstoks,
            item,
            colorvariant,
            qty,
            orderdate_mili
        }

        history.unshift(addhistory);
        console.log('history 2===');
        console.log(history);

        var data={
            id_stock:idstoks,
            history:JSON.stringify(history)

        };

        var xhrzx = new XMLHttpRequest();

        xhrzx.open("POST", `/stock/saveapprovalproduksi`);
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify({tglinputmili,data}));
        xhrzx.addEventListener("load", () => {
            var resdat = JSON.parse(xhrzx.responseText);

            var valueload=90;
            setTimeout(function () { 
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
                setTimeout(function () {
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload;
                    if (resdat.icons=='success') {
                        socket.emit('approvalfinisstock',{tglinputmili,data});
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
    
}
//////////// tutup klik selesai buat stock ////////////



////////////////////// universal /////////////
/* setTimeout(function () {},2000); */
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
//         text:title,
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
  //extrachargeitemlist.length=0;
  //qty_extrachargelist.length=0;
  //price_extrachargelist.length=0;
  //dataextracharge.length=0;
  
  //forcestatuscekklik.length=0;
  var myModalEl = document.getElementById(modalid);
  var modal = bootstrap.Modal.getInstance(myModalEl)
  modal.hide();
}
$('#modaldetail').on('hidden.bs.modal', function (e) {
  // do something...
  /* if (dataextracharge.length>1) {
    for (let i = 0; i < dataextracharge.length; i++) {
      const element = dataextracharge[i];
      if (i>0) {
        document.getElementById(`kotak-${i}`).remove();
      }
      
    }
  } */
});
///--------------------------------
