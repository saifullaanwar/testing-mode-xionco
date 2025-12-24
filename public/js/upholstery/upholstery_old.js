var username ;
var $progress = $('.progress');
var $progressBar = $('.progress-bar');

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
  }
  else {
    window.location.href = '/';
  }

  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    ismobile = 'y';
  }

  var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  showtabel(dataarray);

});


function showtabel(dataarray) {
  
    console.log(dataarray);
  
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();
  
    var datatab = document.getElementById(`alldattab`);
  
    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');
  
    var maxleng=500;

    var fixdataarray=[];

    for (let i = 0; i < dataarray.length; i++) {
        const element = dataarray[i];
        if (element.upholstery_jadi!='true') {
            fixdataarray.push(element);
        }
        
    }
    if ( fixdataarray.length<500) {
        maxleng=fixdataarray.length;
    }
    if (fixdataarray.length>0) {
        for (let i = 0; i < maxleng; i++) {
            const element = fixdataarray[i];
            var trtabel = document.createElement("tr");
            trtabel.className = 'trall';
            //trtabel.setAttribute('onclick', `klikbaris("${element.id_transaksi}")`);

            var tdnomor = document.createElement("td");//no transaksi
            tdnomor.innerHTML = element.no_transaksi;
            tdnomor.setAttribute('style', "text-align: left;");

            var tdorderdate = document.createElement("td");//order date
            tdorderdate.innerHTML = element.order_date;
            tdorderdate.setAttribute('style', "text-align: left;");

            var tddeliverydate = document.createElement("td");//delivered date
            tddeliverydate.innerHTML = element.delivered_date;
            tddeliverydate.setAttribute('style', "text-align: left;");
            tddeliverydate.className='d-none d-lg-table-cell';

            
            var tdplatform = document.createElement("td");//platform
            tdplatform.innerHTML = element.platform;
            tdplatform.setAttribute('style', "text-align: left;");
            tdplatform.className='d-none d-lg-table-cell';

            var tditem = document.createElement("td");//item
            tditem.innerHTML = element.item;
            tditem.setAttribute('style', "text-align: left;");
            tditem.className='namabarang-elepsis';

            var tdqty = document.createElement("td");//qty
            tdqty.innerHTML = element.qty;
            tdqty.setAttribute('style', 'text-align: center;');

            var tddetail = document.createElement("td");//detail edit
            tddetail.setAttribute('style','text-align: left;');//word-break: break-all;
            
            var spandetail= document.createElement("span");//span jadi
            spandetail.className='badge text-bg-primary';
            spandetail.setAttribute('style','background-color:grey!important;text-align:center;');
            spandetail.style.cursor = 'pointer';
            spandetail.setAttribute('onclick','klikjadi(this)');
            spandetail.setAttribute('data-bs-toggle','modal');
            spandetail.setAttribute('data-bs-target','#modalklikjadi');
            //data-bs-toggle="modal" data-bs-target="#exampleModal"

            spandetail.innerHTML = 'Jadi';
            spandetail.id=element.id_transaksi;

            tddetail.appendChild(spandetail);
            trtabel.appendChild(tdnomor);
            trtabel.appendChild(tdorderdate);
            trtabel.appendChild(tddeliverydate);
            trtabel.appendChild(tdplatform);
            trtabel.appendChild(tditem);
            trtabel.appendChild(tdqty);
            trtabel.appendChild(tddetail);

            divhapus.appendChild(trtabel);
            datatab.appendChild(divhapus);
        }
    }
    document.getElementById('basepage').removeAttribute('style');
    document.getElementById('loadingskeleton').setAttribute('style','display:none;');
}
var idklikjadi='';
function klikjadi(e) {
    idklikjadi=e.id;
  //  showmodals('modalklikjadi');
}

var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

document.getElementById('savetomboljadi').addEventListener('click',function(){
    console.log(idklikjadi);
    hidemodal('modalklikjadi');
    loadingpopup();

    var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
    var datasesuaiid;
    for (let i = 0; i < dataarray.length; i++) {
      const element = dataarray[i];
      if (element.id_transaksi==idklikjadi) {
        datasesuaiid=element;
      }
    }

    var date_history = new Date();
    var day_history = ("0" + (date_history.getDate())).slice(-2);
    var month_history = ("0" + (date_history.getMonth() + 1)).slice(-2);//d.getMonth()+1;
    var hour_history = ("0" + (date_history.getHours())).slice(-2);
    var minutes_history = ("0" + (date_history.getMinutes())).slice(-2);
    var year_history = date_history.getFullYear();

    var fixdate_history = day_history+"/"+month_history+"/"+year_history +` ${hour_history}:${minutes_history}`;

    var awalhistory;
    if (datasesuaiid.history!='') {
        awalhistory=JSON.parse(datasesuaiid.history);
        awalhistory.unshift({id_transaksi:idklikjadi,tgl:fixdate_history,user:username,tindakan:'Upholstery Jadi'})
    }else{
        awalhistory=[{id_transaksi:idklikjadi,tgl:fixdate_history,user:username,tindakan:'Upholstery Jadi'}]
    }

    var data={
      id_transaksi:idklikjadi,
      history:awalhistory
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
                  window.open('/upholstery','_self');
                }
            },800); 
        },2000); 
        
        
    });
});


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

////////
$(document).ready(function () { resizetable(); });
function resizetable() {

  var top_nav_height = 0;
  var bottom_nav_height = 0;
  var mobilespasi = 0;
  var kotaktombolatas= $("#kotaktombolatas").height();
  var window_height = $(window).height();
  if (ismobile == 'y') {
    console.log('mobile');

    top_nav_height = $("#navatas-mobile").height();
    bottom_nav_height = $("#navbarbawah").height();
    mobilespasi = $("#mobile-spase-nav").height();
  } else {
    console.log('pc');
    top_nav_height = $("#nav-atas").height();
    mobilespasi = $("#mobile-spase-nav").height();
  }

  var heigfix = window_height - (top_nav_height + bottom_nav_height + mobilespasi+kotaktombolatas);
  console.log(`heihhhh : ${bottom_nav_height}`);

  document.getElementById('tablehigh').setAttribute('style', `max-height:${heigfix}px!important;overflow-y: scroll!important;overflow-x: hidden!important;`);

}
//------------------------------------
function hidemodal(modalid) {
  var myModalEl = document.getElementById(modalid);
  var modal = bootstrap.Modal.getInstance(myModalEl)
  modal.hide();
}
function showmodals(modalid) {
    var myModalEl = document.getElementById(modalid);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.show();
  }
///--------------------------------