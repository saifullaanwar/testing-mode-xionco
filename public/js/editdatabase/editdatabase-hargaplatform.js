var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');
var gethumburger;
//console.log=function(){};

var ismobile='n';
document.addEventListener('DOMContentLoaded',async function () {
    cekdatausersorout();
    showfotvidmodal();
    //document.getElementById('editsavedetail').setAttribute('style','display:none;');
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

    gethumburger=JSON.parse(getCookie('hamburger'));

    //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //console.log(dataarray);

    //additemdropfilter(dataarray.itemsdata);
    
    //document.getElementById('addextracharge').style.display='none';
    // showtabel(dataarray.itemsdata);
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
        console.log('datalls ======',window.dataall)
        //worker_threads(data);
        showtabel(data.itemsdata);
    })
    .catch(err => {
    console.error('Gagal ambil dataall:', err);
    });
}


//klik tombol add new
function klikopenaddnew(prosedur) {
    //prosedur == 'product' prosedur == 'platform'  prosedur == 'deliveryunit'

    $('#modaladdnewitem').modal('show');
}

////showtabel
function showtabel(array) {
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

    var htmlshow=returnarray(array);
    divhapus.innerHTML=htmlshow
    datatab.appendChild(divhapus);

    createitemlist();
    createlistplatform();

    setTimeout(function () { 
        /* if (gethumburger.tipeuser.toLowerCase()=='supervisor') {
            hitungtugassaya_universal();
        } */
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style','display:none;');
    
    },500);
}

function returnarray(array) {
    var dataitem=array.filter((item)=>
        item.product!='AETHER - Track Light - Body 90 Connector'&&item.product!='AETHER - Track Light - Body Plain Connector'&&item.product!='AETHER - Track Light - Leg Connector'
    );

    //buat array baru yang terdiri dari produk, platfom dan price
    const arrayBaru = [];
    console.log('dataitem  aaaa',dataitem);
    dataitem.sort((a, b) => a.product.localeCompare(b.product));

    dataitem.forEach(item => {
        if (item.harga_platform && item.harga_platform.trim() !== "") {
            try {
                const hargaObj = JSON.parse(item.harga_platform);

                /* for (let platform in hargaObj) {
                    arrayBaru.push({
                    product: item.product,
                    platform: platform,
                    price: hargaObj[platform]
                    });
                } */
               for (let i = 0; i < hargaObj.length; i++) {
                const element = hargaObj[i];
                arrayBaru.push({
                    product: item.product,
                    platform: element.platform,
                    price: element.price
                });
               }
            } catch (e) {
            // jika JSON.parse error (karena bukan JSON valid), lewati saja
            }
        }
    });

    console.log('arrayBaru',arrayBaru)

    return arrayBaru.map((element,indek)=>{
        return `
            <tr id="dataitem-${indek}" data-json='${JSON.stringify(element)}'>
                                    
                <td style="text-align: left;">
                    ${element.product}
                </td>
                <td style="text-align: left;" id="platformseleks-${indek}">
                    ${element.platform}
                </td>
                <td style="text-align: left;">
                    Rp ${formatMoney(element.price)}
                </td>
                <td style="text-align: center;">
                   <!-- <span class="badge text-bg-secondary" style="cursor: pointer;">Edit</span>-->

                    <span class="badge text-bg-danger" style="cursor: pointer;" onclick="klikdeleteitem(${indek})">Delete</span>
                </td>
                
            </tr>
        `
    }).join('');
}

////end showtabel
//create list
var htmllistitem='';
function createitemlist() {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var dataitem=dataarray.itemsdata;

    console.log('dataitem',dataitem)
    var newitem=dataitem.filter((item)=>
        item.product!='AETHER - Track Light - Body 90 Connector'&&item.product!='AETHER - Track Light - Body Plain Connector'&&item.product!='AETHER - Track Light - Leg Connector'
    );
    console.log('newitem',newitem)
    htmllistitem=newitem.map((element,index)=>{
        return `
            <option value="${element.product}">
        `
    }).join('');
    document.getElementById('datalistproductname').innerHTML=htmllistitem;
}
var htmllistplatform='';
function createlistplatform() {
    var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var dataitem=dataarray.platformdata;

    var newitem=dataitem.filter((item)=>!item.platform.includes('IN-STORE'));

    htmllistplatform=newitem.map((element,index)=>{
        if (element.platform.toLowerCase()!='tokopedia') {
            return `
            <option>${element.platform}</option>
        `
        }
       
    }).join('');
    document.getElementById('platform-1').innerHTML='<option value="" selected>Pilih platform</option>'+htmllistplatform;
}
//

///add more item
let itemIndex = 1;

function additems() {
    /* var jumlahitems=parseInt(document.getElementById('jumlahitembeli').innerHTML);
    jumlahitems=1+itemIndex;
    document.getElementById('jumlahitembeli').innerHTML=jumlahitems; */

    itemIndex++;
    console.log('itemIndex');
    console.log(itemIndex);
    renderItems();
    //document.getElementById("judulitem-1").classList.remove('d-none');
}

function renderItems() {
    // Buat elemen baru tanpa menghapus yang lama
    const itemsContainer = document.getElementById('platformContainer');
    var newItemv = document.createElement('div');
    newItemv.className = "partPlatform";
    newItemv.id = `platformitem-${itemIndex}`;
    newItemv.innerHTML =`
        <hr>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Platform</span>
            <select class="form-select" id="platform-${itemIndex}" name="platform">
                <option value="" selected>Pilih platform</option>
                ${htmllistplatform}
            </select>
            
        </div>
        <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Price</span>
            <input type="number" class="form-control" id="price-${itemIndex}" name="price" placeholder="Isi harga" style="font-size: 12px;" min="0"  oninput="oninputdata()">
        </div> 
        
        <div class="d-flex justify-content-end">
            <button type="button" class="removeItem btn btn-danger btn-sm" id="removeItem-${itemIndex}" onclick="removeItem(${itemIndex})"><i class="bi bi-trash3-fill" style="color: white;"></i>&nbsp;Hapus</button>
            
        </div>
    `;
    itemsContainer.appendChild(newItemv);
}

// Fungsi untuk menghapus item 
function removeItem(itemId) {
    document.getElementById(`platformitem-${itemId}`).remove();

    // Ambil ulang semua item yang tersisa
    const items = document.querySelectorAll('#platformContainer > .partPlatform');

    // Reset itemIndex agar sesuai urutan terbaru
    itemIndex = items.length;

    items.forEach((item, index) => {
        const newId = index + 1; // Sesuaikan index baru
    
        // Update elemen ID
        item.id = `platformitem-${newId}`;
        // Perbarui ID dan "for" label semua input dalam item
        const inputs = item.querySelectorAll('input, select, span, p, button');
        inputs.forEach(input => {
            const oldId = input.id;
            if (oldId) {
                const newInputId = oldId.replace(/\d+$/, newId); // Ganti angka di ID dengan newId
                input.id = newInputId;
            }
        });

        // Perbarui tombol hapus dengan parameter ID baru
        const removeButton = item.querySelector('.removeItem');
        removeButton.setAttribute('onclick', `removeItem(${newId})`);

        //perbarui judul item judulitem
       // const judulitem = item.querySelector(`#judulitem-${newId}`);
       // judulitem.innerHTML=`Platform ${newId}`;

    });
    oninputdata();
}
////tutup add more product

///oninputdata

var alldataadditem=[];//untuk add product dan edit product

//
var addoredit='add';//add edit
function oninputdata() {
    alldataadditem.length=0;
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard,index) =>{
        let product = itemCard.querySelector('[name="productname"]').value.trim();
        var platform1=document.getElementById('platform-1').value.trim();
        var priceplatform1=document.getElementById('price-1').value;

        var harga_platform=[{
            //[platform1.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')]: priceplatform1
            platform:platform1,
            price:priceplatform1
        }];

        var platfromclas=itemCard.querySelectorAll('.partPlatform');
        if (platfromclas.length>1) {
            for (let i = 0; i < platfromclas.length; i++) {
                const element = platfromclas[i];
                if (i!=0) {
                    // cari input/select dengan name="platform" dan "price" di dalam element
                    const inputPlatform = element.querySelector('[name="platform"]');
                    const inputPrice = element.querySelector('[name="price"]');

                    if (inputPlatform && inputPrice) {
                        const namaPlatform = inputPlatform.value//.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');//hapus spasi dan simbol
                        const pricePlatform = inputPrice.value;

                        console.log(`Platform: ${namaPlatform}, Harga: ${pricePlatform}`);
                        if (namaPlatform!=''&pricePlatform!='') {
                            harga_platform=[
                                ...harga_platform,
                                ...[{platform:namaPlatform,price:pricePlatform}]
                            ];
                        }
                       
                    }
                }
            }
        }

        var data={
            product,
            harga_platform,
            platform:platform1
        }
        console.log('data',data);
        alldataadditem.push(data);
    });
}

////end oninputdata

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