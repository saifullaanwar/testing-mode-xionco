var username;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');

//console.log=function(){};
var ismobile = 'n';
document.addEventListener('DOMContentLoaded', async function () {
  //fix modal error
  document.addEventListener('hide.bs.modal', function (event) {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  });
  ///
  const usercek = await dbs.isLoggedIn();
  //localStorage.getItem('username') && localStorage.getItem('username') != ''
  console.log('usercek', usercek);
  if (usercek) {
    username = usercek;//localStorage.getItem('username'); 

    namalengkap = JSON.parse(await dbs.get('datauser')).namalengkap;
    document.getElementById('namalengkap').innerHTML = namalengkap;
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

  // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
  // console.log(dataarray.stockupholsterydatabase);
  //additemdropfilter(dataarray.itemsdata);
  /* var fixawals=[];
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (element.code2.toLowerCase()=='up'&&element.upholstery_jadi!='true'&&element.stockprodukcode!='true'&&!element.deliveryunit.toLowerCase().includes('third party')) {
      fixawals.push(element);
    }
  } */
  fetchdata()
});


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
      window.dataall = data;
      console.log('datalls ======', window.dataall)
      var dataarray = window.dataall;
      showtabel(dataarray.stockupholsterydatabase);


    })

}

///////////
function hitungtugassaya(array) {
  var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  console.log('alll ');
  console.log(dataarray);

  var arrays = dataarray.dataadminlist;

  const jumlahProsesProduksi = arrays.filter(element =>
    element.status.toLowerCase().includes("proses produksi") && element.stockprodukcode === "" && element.code2.toLowerCase() === 'up' && element.upholstery_jadi != 'true' && element.forcedsent != 'true'
  ).length;

  var arraystocks = dataarray.stockupholsterydatabase;

  console.log('alll arraystocks');
  console.log(arraystocks.length);

  const jumlahProsesProduksistock = arraystocks.filter(element =>
    element.qty != '0' && element.upholstery_selesaibuatstock === '' && element.fixcreatein != 'instocked'
  ).length;

  //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;
  document.querySelectorAll('[name="totaltugassayapesanan"]').forEach(el => {
    el.textContent = `(${jumlahProsesProduksi})`;
  });
  document.querySelectorAll('[name="totaltugassayapesananstock"]').forEach(el => {
    el.textContent = `(${jumlahProsesProduksistock})`;
  });
  document.querySelectorAll('[name="totaltugassayaall"]').forEach(el => {
    el.textContent = `${jumlahProsesProduksi + jumlahProsesProduksistock}`;
  });
}


///////////

function loadingbawahupdate(array) {
  $progressBar.css('width', '0%');
  $progress.show();
  setTimeout(function () {
    var modaldut = ['modaldetail', 'modalklikjadi']
    for (let i = 0; i < modaldut.length; i++) {
      const element = modaldut[i];
      if (document.getElementById(element).style.display == 'block') {
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

/////////

function additemdropfilter(array) {
  var elex = document.getElementById('filterproduk-select');
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    //if (!array[i].product.includes("S-")&&!array[i].product.includes("IN-")&&!array[i].product.includes("OUT-")) {
    var opt = document.createElement('option');
    opt.innerHTML = array[i].product;

    elex.appendChild(opt);
    //}
  }
}


//socket io
// const socket = io();
socket.on('newaddstockup', function (datas) {
  console.log('reload new stock');
  console.log(datas);
  var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  var dattockup = dataarray.stockupholsterydatabase;
  for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    dattockup.push(element);
  }
  console.log('reload dattockup');
  console.log(dattockup);
    window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.stockupholsterydatabase);
});

socket.on('newupholsteryfinisstock', function (datas) {
  console.log('reload new stock');
  console.log(datas);
  var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  var dattockup = dataarray.stockupholsterydatabase;
  for (let i = 0; i < dattockup.length; i++) {
    const element = dattockup[i];
    if (element.id_stock == datas.id_stock) {
      dattockup[i].upholstery_selesaibuatstock = 'true';
      dattockup[i].history = datas.history
    }
    //dattockup.push(element);
  }
  console.log('reload dattockup');
  console.log(dattockup);
    window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.stockupholsterydatabase);
});

////////////////////////////////////////////////
///////////// tampil data //////////////////
function showtabel(dataarray) {
  var myobj = document.getElementById("divhpsdata");
  if (myobj)
    myobj.remove();

  var datatab = document.getElementById(`alldattab`);

  var divhapus = document.createElement("tbody");
  divhapus.setAttribute('id', 'divhpsdata');

  var fixstockproduklist = [];

  for (let i = 0; i < dataarray.length; i++) {
    const element = dataarray[i];
    if (element.upholstery_selesaibuatstock == '' && element.qty != 0) {
      fixstockproduklist.push(element);
    }
  }

  // sort desending dgn tglmili diparsing sebagai number biar bisa dihitung
  fixstockproduklist.sort((a, b) => Number(b.tglinputmili) - Number(a.tglinputmili));

  console.log('fixstockproduklist========');
  console.log(fixstockproduklist);

  divhapus.innerHTML = returnarray(fixstockproduklist);
  datatab.appendChild(divhapus);

  setTimeout(function () {
    hitungtugassaya();
    document.getElementById('showmainpage').removeAttribute('style');
    document.getElementById('loadingskeleton').setAttribute('style', 'display:none;');

  }, 500);
}


function returnarray(dataitem) {
  return dataitem.map(function (element) {
    return `
            <tr>
            <td style="text-align: left;vertical-align: middle;width:max-content">
                ${element.order_date}
            </td>
            <td style="text-align: center;vertical-align: middle;">
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

            <td style="text-align: left;vertical-align: middle;">
                <span class="badge text-bg-secondary" onclick="klikselesaibuatstock('${element.id_stock}')" style="cursor:pointer;">Selesai</span>
            </td>
            
              
          </tr>
        `;
  }).join('');
}

///////////// tutup tampil data //////////////////

//////////// klik selesai buat stock ////////////

//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

function klikselesaibuatstock(idstoks) {
  var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  var fixdat = dataarray.stockupholsterydatabase;

  for (let i = 0; i < fixdat.length; i++) {
    const element = fixdat[i];
    if (idstoks == element.id_stock) {
      document.getElementById('modalklikjadilabel').innerHTML = `${element.id_stock}-${element.item}`;
      editingdatas = element;
    }
  }
  console.log('editingdatas === ----');
  console.log(editingdatas);
  $('#modalklikjadi').modal('show');
}


document.getElementById('savetomboljadi').addEventListener('click', async function () {

  if (!document.getElementById('fotocek').checked && !document.getElementById('videocek').checked) {
    Swal.fire({
      icon: "error",
      title: `Upload dulu foto/video item yang telah selesai`,
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    hidemodal('modalklikjadi');
    loadingpopup();
    if (document.getElementById('videocek').checked) {
      senduploadvideo();
    } else {
      senduploadfoto();
    }
  }

});

async function senduploadfoto() {
  const d = new Date();
  let time = d.getTime();
  var folderyear = editingdatas.id_stock.split('-')[1];
  var folderfoto = `/assets/upholstery-stock/${folderyear}/upholsterybuatstock-${editingdatas.id_stock}-${time}.png`;

  const formData = new FormData();
  formData.append("upload", filedatf[0], `upholsterybuatstock-${editingdatas.id_stock}-${time}.png`);

  fetch(`/upholstery/uploadimage-stock`, {
    method: "POST",
    body: formData,
  }).then(r => r.json().then(datax => {
    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = 60;
    if (datax.uploaded == 'file terupload') {
      savefixselesai(editingdatas.id_stock, folderfoto);
    } else {
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
  var folderyear = editingdatas.id_stock.split('-')[1];

  var extensifile = filedatf[0].type.split('/')[1];

  var folderfoto = `/assets/upholstery-stock/${folderyear}/upholsterybuatstock-${editingdatas.id_stock}-${time}.${extensifile}`;

  const formData = new FormData();
  formData.append("upload", filedatf[0], `upholsterybuatstock-${editingdatas.id_stock}-${time}.${extensifile}`);

  fetch(`/upholstery/uploadvideo-stock`, {
    method: "POST",
    body: formData,
  }).then(r => r.json().then(datax => {
    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = 60;

    if (datax.message == 'file terupload') {
      savefixselesai(editingdatas.id_stock, folderfoto);
    } else {

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

function savefixselesai(idstoks, folderfoto) {
  //loadingpopup();
  console.log('idstoks');
  console.log(idstoks);

  var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  var datacek = dataarray.stockupholsterydatabase;

  var item = '';
  var colorvariant = '';
  var qty;
  var orderdate_mili;
  var history;
  for (let i = 0; i < datacek.length; i++) {
    const element = datacek[i];
    if (element.id_stock == idstoks) {
      item = element.item;
      colorvariant = element.colorvariant;
      qty = element.qty;
      orderdate_mili = parseInt(element.orderdate_mili);

      history = JSON.parse(element.history);
      console.log('history');
      console.log(history);
    }
  }

  var tglinputmili = new Date().getTime();


  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

  var bulan = monthNames[new Date().getMonth()];
  var tahun = new Date().getFullYear();

  var addhistory = {
    tglinputmili,
    namalengkap,
    username,
    tindakan: `selesai diproduksi stock ${idstoks}`,
    id_stock: idstoks,
    item,
    colorvariant,
    qty,
    orderdate_mili
  }

  history.unshift(addhistory);
  console.log('history 2===');
  console.log(history);

  var data = {
    id_stock: idstoks,
    folderfoto,
    history: JSON.stringify(history)

  };

  var xhrzx = new XMLHttpRequest();

  xhrzx.open("POST", `/stock/savefinisproduksi`);
  xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhrzx.setRequestHeader('authorization', xi);
  xhrzx.send(JSON.stringify(data));
  xhrzx.addEventListener("load", () => {
    var resdat = JSON.parse(xhrzx.responseText);

    var valueload = 90;
    setTimeout(function () {
      Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
      setTimeout(function () {
        Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;
        if (resdat.icons == 'success') {
          socket.emit('upholsteryfinisstock', data);
          warningpopup(resdat.icons, resdat.texts);
          location.reload();
        } else {
          warningpopup(resdat.icons, resdat.texts);
        }
      }, 800);
    }, 2000);
  });
}
//////////// tutup klik selesai buat stock ////////////


////////////////// cek klik foto or video

function cekfotoorvideo(e) {
  if (document.getElementById(e.id).checked) {
    if (e.id == 'fotocek') {
      //document.getElementById('videocek').checked=false;
      document.getElementById('showupload-video').style.display = 'none';

      document.getElementById('showupload-foto').removeAttribute('style');
    } else {
      //document.getElementById('fotocek').checked=false;
      document.getElementById('showupload-foto').style.display = 'none';
      document.getElementById('showupload-video').removeAttribute('style');
    }
  }
}

var filedata1;
var mimetype1;
var filename1;
var filedatf;
var image_url_show = '';
var video_url_show = '';

function klikuploadimgorvid(e) {
  if (e.id == 'img-klikpload') {
    document.getElementById('foto-upload').click();
  } else if (e.id == 'kamerafoto-klikpload') {
    document.getElementById('kamerafoto-upload').click();
    /*  const context = canvas.getContext("2d");
     canvas.width = video.videoWidth;
     canvas.height = video.videoHeight;
     context.drawImage(video, 0, 0, canvas.width, canvas.height);
     
     // Konversi ke gambar
     document.getElementById('kamera-upload').src = canvas.toDataURL("image/png"); */
  } else if (e.id == 'vid-klikpload') {
    document.getElementById('video-upload').click();
  } else if (e.id == 'kameravideo-klikpload') {
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
    document.getElementById('img-urlupload').innerHTML = file.name;

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
    document.getElementById('img-urlupload').innerHTML = file.name;
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
    document.getElementById('vid-urlupload').innerHTML = file.name;

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

  if (file.type == "video/mp4" || file.type == "video/mkv") {
    video_url_show = URL.createObjectURL(event.target.files[0]);
    document.getElementById('vid-urlupload').innerHTML = file.name;

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

//////


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
  var kotaktombolatas = 0;//$("#kotaktombolatas").height();
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

  var heigfix = window_height - (top_nav_height + bottom_nav_height + mobilespasi + kotaktombolatas);
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
/* 
function logout() {
  Swal.fire({
    title: "",
    text:'Anda ingin logout akun?',
    showDenyButton: true,
    //showCancelButton: true,
    confirmButtonText: "Ya",
    denyButtonText: `Tidak`
  }).then((result) => {
    
    if (result.isConfirmed) {
      localStorage.clear();
      sessionStorage.clear();
      window.open('/login','_self');
    } 
  });
  
} */