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
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
    // console.log(dataarray);
    //additemdropfilter(dataarray.itemsdata);
    // showtabel(dataarray.database_invoicevendor);
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
      showtabel(data.database_invoicevendor);
      // createlist();
      // creatplatformseleks();
      
  })
  .catch(err => {
    console.error('Gagal ambil dataall:', err);
  });
}

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
                    showtabel(array,true);
                    $progress.hide();

                }, 500);
            }, 2000);
        }, 2000);
    }, 1000);
}

/////////


//socket io
// const socket = io();

socket.on('newadditemadminlist', function (datas) {
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
      var dataarray= window.dataall;
    console.log('datas ====');
    console.log(datas);

    //var fixarrays=dataarray.dataadminlist;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dataarray.dataadminlist.unshift(element);


    }
    // document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
    console.log('dataarray.dataadminlist ====');
    console.log(dataarray.dataadminlist);
    loadingbawahupdate(dataarray.database_invoicevendor);
});

socket.on('neweditfullitemadminlist', function (datas) {
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
      var dataarray= window.dataall;
    console.log('edit item [1]');
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        //var indexarray= dataarray.dataadminlist.indexOf(element);
        if (datas[0].id_transaksi == element.id_transaksi) {
            console.log('edit item [2]');
            var historiold = JSON.parse(element.history);

            var historiesnew = [...datas[0].history, ...historiold];

            dataarray.dataadminlist[i].order_date = datas[0].order_date;
            dataarray.dataadminlist[i].orderdate_mili = datas[0].orderdate_mili;

            dataarray.dataadminlist[i].delivered_date = datas[0].delivered_date;

            dataarray.dataadminlist[i].delivereddate_mili = datas[0].delivereddate_mili;

            dataarray.dataadminlist[i].platform = datas[0].platform;

            dataarray.dataadminlist[i].finalprice = datas[0].finalprice;

            dataarray.dataadminlist[i].diskon_persen = datas[0].diskon_persen;

            dataarray.dataadminlist[i].diskon_amount = datas[0].diskon_amount;

            dataarray.dataadminlist[i].notes = datas[0].notes;

            dataarray.dataadminlist[i].buyername = datas[0].buyername;

            dataarray.dataadminlist[i].phonenumber = datas[0].phonenumber;

            dataarray.dataadminlist[i].address = datas[0].address;

            dataarray.dataadminlist[i].deliveryunit = datas[0].deliveryunit;

            dataarray.dataadminlist[i].extracharge = datas[0].extracharge;

            dataarray.dataadminlist[i].history = JSON.stringify(historiesnew);



            console.log(dataarray.dataadminlist);
        }
    }
    // document.getElementById('itemalls').textContent = JSON.stringify(dataarray);

    // document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);

    console.log('edit item [3]');
    loadingbawahupdate(dataarray.database_invoicevendor);
});

socket.on('newquickedititemadminlist', function (datas) {
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
      var dataarray= window.dataall;
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].order_date = datas.order_date;
            dataarray.dataadminlist[i].orderdate_mili = datas.orderdate_mili;
            dataarray.dataadminlist[i].delivered_date = datas.delivered_date;
            dataarray.dataadminlist[i].item = datas.item;
            dataarray.dataadminlist[i].qty = datas.qty;
            dataarray.dataadminlist[i].finalprice = datas.finalprice;
            dataarray.dataadminlist[i].price = datas.price;
            dataarray.dataadminlist[i].diskon_persen = datas.diskon_persen;
            dataarray.dataadminlist[i].diskon_amount = datas.diskon_amount;
            dataarray.dataadminlist[i].status = datas.status;
            dataarray.dataadminlist[i].code2 = datas.code2;
            dataarray.dataadminlist[i].notes = datas.notes;
            dataarray.dataadminlist[i].colorvariant = datas.colorvariant;
            dataarray.dataadminlist[i].history = datas.history;
            dataarray.dataadminlist[i].extracharge = datas.extracharge;

            // document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newquickedititemadminlist');
        }

    }

    loadingbawahupdate(dataarray.database_invoicevendor);
});

socket.on('newklikprinpodo', function (datas) {
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
      var dataarray= window.dataall;

    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        for (let j = 0; j < dataarray.dataadminlist.length; j++) {
            const element2 = dataarray.dataadminlist[j];
            if (element2.id_transaksi == element.id_transaksi) {
                dataarray.dataadminlist[j].klik_print_podo = 'true';
            }
        }

    }
    // document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);

    loadingbawahupdate(dataarray.database_invoicevendor);
});

socket.on('newprintpodo', function (datas) {
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
      var dataarray= window.dataall;
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;

            dataarray.dataadminlist[i].history = datas.history;

            dataarray.dataadminlist[i].print_podo = 'true';

            // document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_invoicevendor);
});

socket.on('newpackde-kirimbahan', function (datas) {
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
      var dataarray= window.dataall;
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].packde_kirimbahan = 'true';
            dataarray.dataadminlist[i].packde_kirimbahan_img = datas.folderfoto;

            dataarray.dataadminlist[i].history = datas.history;

            // document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_invoicevendor);
});

socket.on('newupholsteryselesai', function (datas) {
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
      var dataarray= window.dataall;
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.history[0].details.status;

            dataarray.dataadminlist[i].upholstery_jadi = 'true';
            dataarray.dataadminlist[i].upholstery_img = datas.filenamesupload;

            dataarray.dataadminlist[i].history = datas.history;


            // document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_invoicevendor);
});


socket.on('newapprovalproduk', function (datas) {
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
      var dataarray= window.dataall;
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi == element.id_transaksi) {
            dataarray.dataadminlist[i].status = datas.status;

            dataarray.dataadminlist[i].history = datas.history;

            dataarray.dataadminlist[i].approval_produkjadi = 'true';

            // document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
            //updatecarditem(datas,'newupholsteryselesai');
        }

    }
    loadingbawahupdate(dataarray.database_invoicevendor);
});

socket.on('neweditforcestatusnew', function (datas) {
    // var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
      var dataarray= window.dataall;
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

    // document.getElementById('itemalls').dataset.json = JSON.stringify(dataarray);
    loadingbawahupdate(dataarray.database_invoicevendor);
});


///////////////////////////////

///////////// tampil data //////////////////
function showtabel(dataarray,awalnotif=false) {
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

console.log(dataarray);

    divhapus.innerHTML = returnarray(dataarray);
    datatab.appendChild(divhapus);

  if (awalnotif==false) {
    getceknotif();
  }
    setTimeout(function () {
        hitungtugassaya_universal();
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style', 'display:none;');

    }, 500);
}


function returnarray(dataitem) {

    //var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);

    // Proses gabungkan list_kasbon dan tambah id_invoice
    const hasilGabungan = dataitem.flatMap(invoice => {
        const kasbonArray = JSON.parse(invoice.list_kasbon);
        return kasbonArray.map(item => ({
            ...item,
            id_invoice: invoice.id_invoice
        }));
    });

    console.log('hasilGabungan========');
    console.log(hasilGabungan);

    return hasilGabungan.map(function (element, indexit) {
        if (element.approval!='true'&&element.approval!='false') {
            return `
                <tr id="datatr-${element.id_invoice+'-'+element.id_req}" data-json='${JSON.stringify(element)}'>
                    <td style="text-align: left;vertical-align: middle;width:max-content">
                        ${formatDatess(parseInt(element.tglinputmili))}
                    </td>
                    <td style="text-align: left;vertical-align: middle;">
                        ${element.id_invoice}
                    </td>
                    
                    <td style="text-align: left;vertical-align: middle;"  title="${element.requester}">
                        ${element.requester}
                    </td>

                    <td style="text-align: left;vertical-align: middle;"  title="">
                        Rp ${formatMoney(element.nominal)}
                    </td>

                    <td style="text-align: center;vertical-align: middle;"  title="">
                        ${element.tipe}
                    </td>

                    <td style="text-align: center;vertical-align: middle;">
                                                
                        <span class="badge text-bg-secondary me-2" style="cursor: pointer;" onclick="klikapproval('${element.id_invoice+'-'+element.id_req}')">Approval</span>
                        <span class="badge text-bg-danger" style="cursor: pointer;" onclick="klikreject('${element.id_invoice+'-'+element.id_req}')">Reject</span>
                    </td>
                

                
                </tr>
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

    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}
///////////// tutup tampil data //////////////////

//klikapproval
function klikapproval(ids) {
    var dataarray=JSON.parse(document.getElementById(`datatr-${ids}`).dataset.json);

    console.log('dataarray klikapproval==');
    console.log(dataarray);

    var date=new Date();
    var tglinputmili_approvalkasbon=date.getTime();

    var datakirim={
        id_invoice: dataarray.id_invoice,
        data_req:{
            id_req: dataarray.id_req,
            requester: dataarray.requester,
            nominal: dataarray.nominal,
            tipe: dataarray.tipe,
            approval: 'true',
            tglinputmili: dataarray.tglinputmili,
            username: dataarray.username,
        },
        approver:namalengkap,
        tglinputmili_approvalkasbon
    };
    
    console.log('datakirim=====');
    console.log(datakirim);

    Swal.fire({
        icon:'question',
        title:'',
        text: ``,
        width:'50%',
        html:`
            <table class="table table-striped table-hover" style="width:100%;text-align: center;font-size: 16px;">
                <thead>
                    <tr>
                        <th scope="col" style="text-align: left;vertical-align: middle;">Date</th>
                        <th scope="col" style="text-align: left;vertical-align: middle;">ID Invoice</th>
                        <th scope="col" style="text-align: left;vertical-align: middle;">Nama Lengkap</th>
                        <th scope="col" style="text-align: left;vertical-align: middle;">Nominal</th>
                        <th scope="col" style="text-align: center;vertical-align: middle;">Tipe Kasbon</th>
                    </tr>
                </thead>
                <tbody id="divhpsdata" class="align-middle">
                    <tr class="text-center">
                        <td style="text-align: left;vertical-align: middle;">${formatDatess(parseInt(dataarray.tglinputmili))}</td>

                        <td class="text-truncate" style="text-align: left;vertical-align: middle;">${dataarray.id_invoice}</td>

                        <td class="text-truncate" style="text-align: left;vertical-align: middle;">${dataarray.requester}</td>

                        <td class="text-truncate" style="text-align: left;vertical-align: middle;">Rp. ${formatMoney(dataarray.nominal)}</td>

                        <td class="text-truncate" style="text-align: center;vertical-align: middle;">${dataarray.tipe}</td>
                        
                    </tr>
                </tbody>
            </table>
        `,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Approve`,
        denyButtonText: `Kembali`,
        confirmButtonColor: "grey",
        denyButtonColor: "#d33",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            loadingpopup();
            fizsave(datakirim);
        }
    });
}

//tutup klikapproval

//klikreject
function klikreject(ids) {
    var dataarray=JSON.parse(document.getElementById(`datatr-${ids}`).dataset.json);

    console.log('dataarray klikapproval==');
    console.log(dataarray);

    var date=new Date();
    var tglinputmili_approvalkasbon=date.getTime();

    var datakirim={
        id_invoice: dataarray.id_invoice,
        data_req:{
            id_req: dataarray.id_req,
            requester: dataarray.requester,
            nominal: dataarray.nominal,
            tipe: dataarray.tipe,
            approval: 'false',
            tglinputmili: dataarray.tglinputmili,
            username: dataarray.username,
        },
        approver:namalengkap,
        tglinputmili_approvalkasbon
    };
    
    console.log('datakirim=====');
    console.log(datakirim);

    Swal.fire({
        icon:'question',
        title:'',
        text: ``,
        width:'50%',
        html:`
            <table class="table table-striped table-hover" style="width:100%;text-align: center;font-size: 16px;">
                <thead>
                    <tr>
                        <th scope="col" style="text-align: left;vertical-align: middle;">Date</th>
                        <th scope="col" style="text-align: left;vertical-align: middle;">ID Invoice</th>
                        <th scope="col" style="text-align: left;vertical-align: middle;">Nama Lengkap</th>
                        <th scope="col" style="text-align: left;vertical-align: middle;">Nominal</th>
                        <th scope="col" style="text-align: center;vertical-align: middle;">Tipe Kasbon</th>
                    </tr>
                </thead>
                <tbody id="divhpsdata" class="align-middle">
                    <tr class="text-center">
                        <td style="text-align: left;vertical-align: middle;">${formatDatess(parseInt(dataarray.tglinputmili))}</td>

                        <td class="text-truncate" style="text-align: left;vertical-align: middle;">${dataarray.id_invoice}</td>

                        <td class="text-truncate" style="text-align: left;vertical-align: middle;">${dataarray.requester}</td>

                        <td class="text-truncate" style="text-align: left;vertical-align: middle;">Rp. ${formatMoney(dataarray.nominal)}</td>

                        <td class="text-truncate" style="text-align: center;vertical-align: middle;">${dataarray.tipe}</td>
                        
                    </tr>
                </tbody>
            </table>
        `,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Reject`,
        denyButtonText: `Kembali`,
        confirmButtonColor: "grey",
        denyButtonColor: "#d33",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            loadingpopup();
            fizsave(datakirim);
        }
    });
}

//tutup klikreject

//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

function fizsave(datakirim) {
    fetch('/finance/saveapprovekasbon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify(datakirim)
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
                }
                else{
                    warningpopup(resdat.icons,resdat.texts);
                    if (resdat.icons=="warning") {
                        location.reload();
                    }
                }
                
            },800);
        },2000);
    })
    .catch(error => {
        console.error('Error:', error);
        warningpopup('error','error catch : '+error);
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
//         title: '',
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