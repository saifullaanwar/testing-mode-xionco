var username ;
var $progress = $('.progress');
var $progressBar = $('.progress-bar');

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
      
      var namalengkap =JSON.parse(await dbs.get('datauser')).namalengkap;
      document.getElementById('namalengkap').innerHTML=namalengkap;
  }
  else {
    window.location.href = '/';
  }

  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    ismobile = 'y';
  }

scrolltobuttonsidebar();
  fetchdata();

});
var totalbulanini=0;
var totalhariini=0;
var totalkirimhariini=0;

function fetchdata() {
  fetch('/api/adminlist', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': xi
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("%c[FETCHDATA] ✅ Data berhasil diambil:", "color: limegreen", data);
      window.dataall = data;
      const dataarray = window.dataall;
      const dataadminlist = dataarray.dataadminlist;
      cekdata(dataadminlist);

    }) .catch(err => {
      console.error("Gagal memuat data adminlist:", err);
    });
}

function cekdata(arrays) {
    var datatoday = new Date();
    var day = ("0" + (datatoday.getDate())).slice(-2);
    var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
    var year = datatoday.getFullYear();

    var fixdatenow = day+"/"+month+"/"+year;

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    var bulan=monthNames[new Date().getMonth()];
    var tahun =new Date().getFullYear();
    
   
    for (let i = 0; i < arrays.length; i++) {
        const element = arrays[i];
        if (`${element.bulan}${element.tahun}`==`${bulan}${tahun}`) {
            totalbulanini=totalbulanini+1;
        }
        if (fixdatenow==element.order_date) {
            totalhariini=totalhariini+1;
        }
        if (fixdatenow==element.delivered_date) {
            totalkirimhariini=totalkirimhariini+1;
        }
    }

    document.getElementById('totalpesananshow').innerHTML=totalbulanini;
    document.getElementById('pesananhariinishow').innerHTML=totalhariini;
    document.getElementById('pesanandikirimshow').innerHTML=totalkirimhariini;

    
    document.getElementById('showmainpage').removeAttribute('style');
    document.getElementById('loadingskeleton').setAttribute('style','display:none;');

}

// const socket = io();
socket.on('newadditemadminlist',function(datas){
  updatedatatotalpesanan(datas,true)
});

function updatedatatotalpesanan(array,awalnotif=false) {
  console.log(array);
  var datatoday = new Date();
  var day = ("0" + (datatoday.getDate())).slice(-2);
  var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
  var year = datatoday.getFullYear();

  var fixdatenow = day+"/"+month+"/"+year;

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

  var bulan=monthNames[new Date().getMonth()];
  var tahun =new Date().getFullYear();

  if (`${array.bulan}${array.tahun}`==`${bulan}${tahun}`) {
    totalbulanini=totalbulanini+1;
  }
  if (fixdatenow==array.order_date) {
      totalhariini=totalhariini+1;
  }
  if (fixdatenow==array.delivered_date) {
      totalkirimhariini=totalkirimhariini+1;
  }

  if (awalnotif==false) {
    getceknotif();
  }

  document.getElementById('totalpesananshow').innerHTML=totalbulanini;
  document.getElementById('pesananhariinishow').innerHTML=totalhariini;
  document.getElementById('pesanandikirimshow').innerHTML=totalkirimhariini;
}


//////
// function menuarrowklik(id) {
//     if (document.getElementById('klikhidebar').className!='bi bi-caret-right-fill toggle-btn') {
//         if (document.getElementById(id).className=='bi bi-caret-down-fill hide-on-collapse') {
//             document.getElementById(id).className='bi bi-caret-up-fill hide-on-collapse';
//             $(`#${id}-extend`).show();
//         }else{
//             document.getElementById(id).className='bi bi-caret-down-fill hide-on-collapse';
//             $(`#${id}-extend`).hide();
//         }
//    }
  
//   }
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
