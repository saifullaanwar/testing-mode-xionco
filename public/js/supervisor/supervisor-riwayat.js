var username;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');
var gethumburger;
//console.log=function(){};

var ismobile = 'n';
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

    gethumburger = JSON.parse(getCookie('hamburger'));
scrolltobuttonsidebar();
      //var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
    // showtabel(dataarray);
    // console.log(dataarray);
    //showtabel(dataarray.dataadminlist);

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
      showtabel(data);
      // createlist();
      
  })
  .catch(err => {
    console.error('Gagal ambil dataall:', err);
  });
}

////
///////////
// function hitungtugassaya(array) {
//   var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

//   console.log('alll ');
//   console.log(dataarray);

//   var arrays=dataarray.dataadminlist;

//   const jumlahProsesProduksi = arrays.filter(element =>
//       element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi'
//   ).length;

  

//   var arraystocks=dataarray.stockupholsterydatabase;

//   console.log('alll arraystocks');
//   console.log(arraystocks.length);

//   const jumlahProsesProduksistock = arraystocks.filter(element =>
//     element.qty!='0'&&element.upholstery_selesaibuatstock==='true'&&element.fixcreatein!='instocked'&&element.approval_produkjadi!='true'
//   ).length;

//   document.querySelectorAll('[name="totaltugassayapesanan"]').forEach(el => {
//     el.textContent = `(${jumlahProsesProduksi})`; 
//   });

//   document.querySelectorAll('[name="totaltugassayapesananstock"]').forEach(el => {
//     el.textContent = `(${jumlahProsesProduksistock})`; 
//   });

//   document.querySelectorAll('[name="totaltugassayaall"]').forEach(el => {
//       el.textContent = `${jumlahProsesProduksi+jumlahProsesProduksistock}`; 
//   });
// }

/////

////////////////////////////////////////////////
///////////// socket io //////////////////
// const socket = io();
socket.on('newadditemadminlist', function (datas) {
    console.log('update jumlah stock');
    console.log(datas);
     var dataarray=window.dataall;    //var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
    var dattockup = dataarray.stockupholsterydatabase;
    dattockup.forEach((element0, index) => {
        for (let i = 0; i < datas.length; i++) {
            const element = datas[i];
            var stockuses = JSON.parse(element.stockuses);
            for (let j = 0; j < stockuses.length; j++) {
                const element1 = stockuses[j];
                if (element0.id_stock == element1.id_stock) {
                    dattockup[index].qty_old = element0.qty;
                    dattockup[index].qty = parseInt(element0.qty) - parseInt(element1.qty_pakai);
                }
            }

        }

    });
    console.log('reload dattockup');
    console.log(dattockup);
      window.dataall=dataarray;    //document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newaddstockup', function (datas) {
    console.log('reload new stock');
    console.log(datas);
     var dataarray=window.dataall;    //var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
    var dattockup = dataarray.stockupholsterydatabase;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dattockup.push(element);
    }
    console.log('reload dattockup');
    console.log(dattockup);
      window.dataall=dataarray;    //document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newaddupdatestockup', function (datas) {
    console.log('reload new stock');
    console.log(datas);
     var dataarray=window.dataall;    //var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
    var dattockup = dataarray.stockupholsterydatabase;

    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        for (let j = 0; j < dattockup.length; j++) {
            const element1 = dattockup[j];
            if (element1.id_stock == element.id_stock) {
                dattockup[j].qty_old = parseInt(element1.qty_old) > parseInt(element.qty) ? parseInt(element1.qty_old) - parseInt(element.qty) : parseInt(element.qty) - parseInt(element1.qty_old);
                dattockup[j].qty = parseInt(element.qty) + parseInt(element1.qty);
            }
        }

        //dattockup.push(element);
    }
    console.log('reload dattockup');
    console.log(dattockup);
      window.dataall=dataarray;    //document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('neweditforcestatus', function (datas) {
    console.log('reload new stock');
    console.log(datas);
     var dataarray=window.dataall;    //var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
    var dattockup = dataarray.stockupholsterydatabase;

    var stockupdates = datas.stockuses == '' ? [] : JSON.parse(datas.stockuses);

    console.log('stockupdates =======');
    console.log(stockupdates);

    if (datas.stockprodukcode != 'true' && stockupdates.length > 0) {

        for (let i = 0; i < stockupdates.length; i++) {
            const element = stockupdates[i];
            for (let j = 0; j < dattockup.length; j++) {
                const element1 = dattockup[j];
                if (element.id_stock == element1.id_stock) {
                    console.log('element1.id_stock ======= 111');
                    console.log(element1.id_stock);

                    dattockup[j].qty_old = parseInt(element1.qty_old) > parseInt(element.qty_pakai) ? parseInt(element1.qty_old) - parseInt(element.qty_pakai) : parseInt(element.qty_pakai) - parseInt(element1.qty_old);

                    dattockup[j].qty = parseInt(element.qty_pakai) + parseInt(element1.qty);



                }
            }
        }
        console.log('reload dattockup');
        console.log(dattockup);
          window.dataall=dataarray;    //document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
        loadingbawahupdate(dataarray.itemsdata);
    }



});


socket.on('neweditforcestatusnew', function (datas) {
     var dataarray=window.dataall;    //var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
    datas.tglinputmili.toString();
    console.log('data masuk status force');
    console.log(datas);

    var flag = 0;//0 belum ada input id transaksi, 1 = sudah ada
    for (let i = 0; i < dataarray.forcestatusrequest.length; i++) {
        const element = dataarray.forcestatusrequest[i];
        if (element.id_transaksi == datas.id_transaksi) {
            dataarray.forcestatusrequest[i].status = datas.status;
            dataarray.forcestatusrequest[i].forcedsent = datas.forcedsent;
            dataarray.forcestatusrequest[i].forcedcancel = datas.forcedcancel;
            dataarray.forcestatusrequest[i].reschedule = datas.reschedule;
            dataarray.forcestatusrequest[i].delayproduksi = datas.delayproduksi;
            dataarray.forcestatusrequest[i].toppriority = datas.toppriority;
            dataarray.forcestatusrequest[i].pending = datas.pending;
            dataarray.forcestatusrequest[i].stockprodukcode = datas.stockprodukcode;
            dataarray.forcestatusrequest[i].stockuses = datas.stockuses;
            dataarray.forcestatusrequest[i].history = JSON.stringify(datas.history);
            dataarray.forcestatusrequest[i].tglinputmili = datas.tglinputmili;
            dataarray.forcestatusrequest[i].namalengkap = datas.namalengkap;
            dataarray.forcestatusrequest[i].username = datas.username;
            dataarray.forcestatusrequest[i].approval_forcestatus = datas.approval_forcestatus;

            flag = 1;
        }

    }

    if (flag == 0) {
        dataarray.forcestatusrequest.push(datas);
    }

    //

    console.log('data baru status force');
    console.log(dataarray.forcestatusrequest);

      window.dataall=dataarray;    //document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newupholsteryfinisstock', function (datas) {
    console.log('reload new stock');
    console.log(datas);
     var dataarray=window.dataall;    //var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
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
      window.dataall=dataarray;    //document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.itemsdata);
});


socket.on('newapprovalfinisstock', function (datas) {
    console.log('reload approval stock');
    console.log(datas);
     var dataarray=window.dataall;    //var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
    var dattockup = dataarray.stockupholsterydatabase;
    for (let i = 0; i < dattockup.length; i++) {
        const element = dattockup[i];
        if (element.id_stock == datas.data.id_stock) {
            dattockup[i].upholstery_selesaibuatstock = 'true';
            dattockup[i].approval_produkjadi = 'true';
            dattockup[i].approval_datemili = datas.tglinputmili;
            dattockup[i].history = datas.data.history
        }
        //dattockup.push(element);
    }
    console.log('reload dattockup');
    console.log(dattockup);
      window.dataall=dataarray;    //document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.itemsdata);
});
///////////// tutup socket io //////////////////
////////////////////////////////////////////////


function loadingbawahupdate(array) {
    $progressBar.css('width', '0%');
    $progress.show();
    setTimeout(function () {
        var modaldut = ['modalklikdetailstockup', 'modalklikaddstockup']
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
                    showtabel(array,2,true);
                    $progress.hide();

                }, 500);
            }, 2000);
        }, 2000);
    }, 1000);
}


///////////// tampil data //////////////////
function showtabel(dataarray, page = 1,awalnotif=false) {
    if (page === 1) {
        // reset halaman & data global hanya saat pertama kali
        fullDataAdminList = dataarray.dataadminlist;
        const existing = document.getElementById("divhpsdata");
        if (existing) existing.remove();

        const divhapus = document.createElement("tbody");
        divhapus.setAttribute("id", "divhpsdata");
        document.getElementById("alldattab").appendChild(divhapus);
    }

    // Tambahkan baris baru ke tbody yang sudah ada
    const targetTbody = document.getElementById("divhpsdata");
    const newHTML = returnarray(fullDataAdminList, page);
    const temp = document.createElement("tbody");
    temp.innerHTML = newHTML;

    // Pindahkan semua <tr> baru ke tbody utama
    [...temp.children].forEach(tr => {
        targetTbody.appendChild(tr);
    });

    
    if (awalnotif==false) {
        getceknotif();
    }
    setTimeout(() => {
        document.getElementById("showmainpage").removeAttribute("style");
        document.getElementById("loadingskeleton").setAttribute("style", "display:none;");
    }, 300);
}



function sanitizeJSON(str) {
    return str.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
}



let itemsPerPage = 100;
let currentPage = 1;
let fullDataAdminList = [];

/**
 * Modifikasi untuk data yang akan ditampilkan
 * @param {Array} dataadminlist - Daftar data admin yang akan ditampilkan
 */

function returnarray(dataadminlist, page = 1) {
    let historyHTML = '';
    let number = 1 + itemsPerPage * (page - 1);
    let count = 0;
    let totalHistory = 0;

    for (let i = 0; i < dataadminlist.length; i++) {
        const element = dataadminlist[i];
        let history = [];

        try {
            const raw = element.history || '';
            const sanitized = sanitizeJSON(raw);
            history = sanitized ? JSON.parse(sanitized) : [];
        } catch (err) {
            console.error(`Gagal parse history untuk ID ${element.id_transaksi}:`, err);
            continue;
        }

        totalHistory += history.length;

        for (let j = 0; j < history.length; j++) {
            if (count >= itemsPerPage * page) break;
            if (count >= itemsPerPage * (page - 1)) {
                const entry = history[j];
                const ketstatus = entry?.details?.ketstatus ?? '-';
                historyHTML += `
                    <tr>
                        <td style="text-align: left;">${number++}</td>
                        <td style="text-align: left;">${entry.id_transaksi || '-'}</td>
                        <td style="text-align: left;">${entry.user || '-'}</td>
                        <td style="text-align: left;">${entry.tgl || '-'}</td>
                        <td style="text-align: left;">
                            ${entry.tindakan || 'tidak ada tindakan'}
                        </td>
                    </tr>
                `;
            }
            count++;
        }
    }

    // Tampilkan atau sembunyikan tombol load more
    setTimeout(() => {
        const btn = document.getElementById('load-more-btn');
        if (btn) {
            btn.style.display = (count < totalHistory) ? '' : 'none';
        }
    }, 0);

    // Fallback jika tidak ada data
    if (historyHTML === '') {
        historyHTML = `
            <tr>
                <td colspan="5" style="text-align: center;">Tidak ada data history</td>
            </tr>
        `;
    }

    return historyHTML;
}


function loadMoreData() {
    currentPage++;
    showtabel({ dataadminlist: fullDataAdminList }, currentPage);
}


function handleSearchHistory(input) {
    const searchTerm = input.value.toLowerCase();
    const rows = document.querySelectorAll('#alldattab tbody tr');
    
    rows.forEach(row => {
        const idTransaksi = row.cells[1].textContent.toLowerCase();
        const nama = row.cells[2].textContent.toLowerCase();
        const tanggal = row.cells[3].textContent.toLowerCase();

        if (idTransaksi.includes(searchTerm) || nama.includes(searchTerm) || tanggal.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}


  /////////////////////////universal/////////////////////

// function loadingpopup() {
//     Swal.fire({
//         title: "Loading ...",
//         allowOutsideClick: false,
//         html:
//             '<progress id="loadingpersenpopoups" value="20" max="100" style="width:100%"> </progress>',
//         showConfirmButton: false,
//     });
//     //Swal.showLoading();
// }


// function warningpopup(icon, title) {
//     Swal.fire({
//         icon: icon,
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
//     if (document.getElementById('klikhidebar').className != 'bi bi-caret-right-fill toggle-btn') {
//         if (document.getElementById(id).className == 'bi bi-caret-down-fill hide-on-collapse') {
//             document.getElementById(id).className = 'bi bi-caret-up-fill hide-on-collapse';
//             $(`#${id}-extend`).show();
//         } else {
//             document.getElementById(id).className = 'bi bi-caret-down-fill hide-on-collapse';
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
/////////////////////////


//////////////////////////
///--------------------------------
