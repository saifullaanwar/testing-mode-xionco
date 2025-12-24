var username ;
var $progress = $('.progress');
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
    var namalengkap =JSON.parse(localStorage.getItem('datauser')).namalengkap;
    console.log(namalengkap)
    document.getElementById('namalengkap').innerHTML=namalengkap;
  }
  else {
    window.location.href = '/';
  }

  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    ismobile = 'y';
  }

  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  console.log(dataarray.dataadminlist);
  cekdata(dataarray.dataadminlist);

});
var totalbulanini=0;
var totalhariini=0;
var totalkirimhariini=0;

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
      if (element.upholstery_jadi=='true'&&element.packde_ambil!='true'&&element.packde_qc!='true'&&element.code2.toLowerCase()=='up'||element.upholstery_jadi!='true'&&element.packde_qc!='true'&&element.code2.toLowerCase()!='up') {
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
       
    }

    document.getElementById('totalpesananshow').innerHTML=totalbulanini;
    document.getElementById('pesananhariinishow').innerHTML=totalhariini;
    document.getElementById('pesanandikirimshow').innerHTML=totalkirimhariini;

    
    document.getElementById('showmainpage').removeAttribute('style');
    document.getElementById('loadingskeleton').setAttribute('style','display:none;');

}

const socket = io();
socket.on('newadditemadminlist',function(datas){
  updatedatatotalpesanan(datas)
});
function updatedatatotalpesanan(array) {
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

  if (array.upholstery_jadi!='true'&&array.code2.toLowerCase()=='up') {
    if (`${array.bulan}${array.tahun}`==`${bulan}${tahun}`) {
      totalbulanini=totalbulanini+1;
    }
    if (fixdatenow==array.order_date) {
        totalhariini=totalhariini+1;
    }
    if (fixdatenow==array.delivered_date) {
        totalkirimhariini=totalkirimhariini+1;
    }
  }
  

  document.getElementById('totalpesananshow').innerHTML=totalbulanini;
  document.getElementById('pesananhariinishow').innerHTML=totalhariini;
  document.getElementById('pesanandikirimshow').innerHTML=totalkirimhariini;
}

//////
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
  var myModalEl = document.getElementById(modalid);
  var modal = bootstrap.Modal.getInstance(myModalEl)
  modal.hide();
}
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

function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.open('/login','_self');
}