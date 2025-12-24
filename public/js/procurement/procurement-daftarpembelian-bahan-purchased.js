var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');
var gethumburger;
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
        
        namalengkap =JSON.parse(await dbs.get('datauser')).namalengkap;
        document.getElementById('namalengkap').innerHTML=namalengkap;
    }
    else {
        window.location.href = '/';
    }

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        ismobile = 'y';
    }

scrolltobuttonsidebar();
    // gethumburger=JSON.parse(getCookie('hamburger'));
    // var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    // console.log(dataarray);
    // //additemdropfilter(dataarray.itemsdata);
    // showtabel(dataarray.dataadminlist);
    // //showtabel(dataarray.dataadminlist);
    
 fetchdata()
});

function fetchdata() {
  fetch('/api/daftarpembelian/request')
      .then(res => res.json())
      .then(data => {
      window.dataall = data;
      console.log('datalls =================23=',window.dataall)
      // worker_threads(data);
      // additemdropfilter(data.itemsdata);
      showtabel(data.dataadminlist);
      // createlist();
      
  })
  .catch(err => {
    console.error('Gagal ambil dataall:', err);
  });
}

///////////
///////////

function loadingbawahupdate(array) {
    $progressBar.css('width', '0%');
    $progress.show();
    setTimeout(function () {
        /* var modaldut=['modaldetail']
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



////////////////////////////////////////////////
///////////// socket io //////////////////
// const socket = io();

socket.on('newadditemadminlist',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('datas ====');
    console.log(datas);

    //var fixarrays=dataarray.dataadminlist;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dataarray.dataadminlist.unshift(element);
        
        
    }
    window.dataall=dataarray;  // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    console.log('dataarray.dataadminlist ====');
    console.log(dataarray.dataadminlist);
    loadingbawahupdate(dataarray.dataadminlist);
});

socket.on('neweditfullitemadminlist',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
        
    window.dataall=dataarray;  // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    console.log('edit item [3]');
    loadingbawahupdate(dataarray.dataadminlist);
}); 

socket.on('newquickedititemadminlist',function(datas){
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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
        
        window.dataall=dataarray;  // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newquickedititemadminlist');
        }
        
    }

    loadingbawahupdate(dataarray.dataadminlist);
});



//show tabel
function showtabel(array) {
    
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();
  
    var datatab = document.getElementById(`alldattab`);
  
    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

    console.log('array ========');
    console.log(array);

    divhapus.innerHTML=returnarray(array,'awal');

    datatab.appendChild(divhapus);

    setTimeout(function () { 
        /* if (gethumburger.tipeuser.toLowerCase()=='supervisor') {
            hitungtugassaya();
        } */
        hitungtugassaya_universal();
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style','display:none;');
    
    },500);
}

var ceklengloadmore;
var sortedDataGlobal = []; // Global untuk menyimpan data terurut

function returnarray(array,prosedur) {

    //database_belibahan
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var database_belibahan=dataarray.database_belibahan;
    //

    // Filter dataarray yang id_transaksinya dan belum ditindak tidak ada di dalam Set
    const hasilFiltered = database_belibahan.filter(item => {
        // Jika purchased-nya bukan "true", maka lolos filter
        return item.purchased === "true";
    });

    // Urutkan berdasarkan tglmili dari Z ke A (terbaru ke terlama)
    hasilFiltered.sort((a, b) => new Date(parseInt(b.tglinputmili)) - new Date(parseInt(a.tglinputmili)));

    var fixarraawal=[];
    if (prosedur == 'awal'||prosedur=='pencarian') {
        // Sortir dan simpan secara global
        sortedDataGlobal = hasilFiltered;
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
    // Tampilkan atau sembunyikan tombol load-more
    if (prosedur === 'awal'||prosedur=='pencarian') {
        if (sortedDataGlobal.length <= itemsPerLoad) {
            document.getElementById('load-more-btn').style.display = 'none';
        } else {
            document.getElementById('load-more-btn').style.display = 'block';
        }

        if (fixarraawal.length > 0) {
            document.getElementById('datatidakditemukan').setAttribute('style', 'display:none;');
        } else {
            document.getElementById('datatidakditemukan').removeAttribute('style');
        }
    } else if (prosedur === 'loadmore') {
        if (currentIndex >= sortedDataGlobal.length) {
            document.getElementById('load-more-btn').style.display = 'none';
        }
    }

    console.log('fixarraawal');
    console.log(fixarraawal);

    return fixarraawal.map(function(element,index){
        return `
            <tr id="dataitem-${element.id_transaksi}" data-json='${JSON.stringify(element)}'>
                <td style="text-align: left;vertical-align: middle;">
                    ${formatDatess(parseInt(element.tglinputmili))}
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    ${element.id_transaksi}
                </td>
                <td style="text-align: left;vertical-align: middle;max-width: 50ch;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title="${element.item}">
                    ${element.item} 
                </td>
                
                <td style="text-align: left;vertical-align: middle;">
                    ${element.colorvariant} 
                </td>

                <td style="text-align: center;vertical-align: middle;">
                    ${element.qty} 
                </td>
                
                <td style="text-align: left;vertical-align: middle;">
                    <textarea class="form-control" disabled>${element.notes}</textarea>
                </td>
                <td style="text-align: center;vertical-align: middle;" >
                    <span class="badge text-bg-danger" style="cursor: pointer;" onclick="klikcancel('${element.id_transaksi}')">Cancel</span>
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

////loadmore
let currentIndex = 0; // Indeks data yang telah ditampilkan
var itemsPerLoad = 200; // Maksimum data yang ditampilkan per klik tombol

function loadMoreData() {
    var dataarray=window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var data=dataarray.dataadminlist;

    /* if (filtersavearray.length>0) {
        data=filtersavearray
    } */
    $("#divhpsdata").last().append(returnarray(data,'loadmore'));

    // Sembunyikan tombol jika semua data sudah ditampilkan
    if (currentIndex >= ceklengloadmore) {
        document.getElementById('load-more-btn').style.display = 'none';
    }
}

//tutup show tabel



//klikcancel
function klikcancel(id_transaksi) {
    var dataarray=JSON.parse(document.getElementById(`dataitem-${id_transaksi}`).dataset.json);
    console.log('klikcancel====');
    console.log(dataarray);

    var tglinputmili=new Date().getTime();
    var datakirim={
        tglinputmili,
        id_transaksi:dataarray.id_transaksi,
        item:dataarray.item,
        colorvariant:dataarray.colorvariant,
        qty:dataarray.qty,
        notes:dataarray.notes,
        purchased:'true',
        history:[
            {
                "id_transaksi":dataarray.id_transaksi,
                "tgl":formatDatess(tglinputmili),
                "user":namalengkap,
                "tindakan":"Batal beli dan bayar bahan UP",
                "username":username,
                "details":{
                    "tglinputmili":1750842619505,
                    "status":"Batal beli bahan",
                    "ketstatus":`Pembatalan beli bahan dilakukan oleh ${namalengkap} ID: ${username}.`
                }
            }
        ]
    }

    console.log('datakirim=====');
    console.log(datakirim);

    
    Swal.fire({
        icon:'question',
        title:'',
        text: `Apakah bahan produk ID ${id_transaksi.split('-')[0]} ingin batal dibeli dan dibayar?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Iya`,
        denyButtonText: `Kembali`,
        confirmButtonColor: "grey",
        denyButtonColor: "#d33",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            // loadingpopup();
            fizsave(datakirim);
        }
    });

}
//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

function fizsave(datakirim) {
    fetch('/procurement/tindakbatal_pembelianbahan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify({datakirim})
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
                    warningpopup('success','sukses pembatalan');
                    //socket.emit('approvereqbeli',additemreqproc);
                    location.reload();
                }
                else{
                    warningpopup('error',resdat.texts);
                }
                
            },800);
        },2000);
    })
    .catch(error => {
        console.error('Error:', error);
        warningpopup('error','error catch : '+error);
    });
}

//tutup klikcancel








//////////////////////////////////universal
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
//         title:'',
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
    
    var myModalEl = document.getElementById(modalid);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}
///--------------------------------