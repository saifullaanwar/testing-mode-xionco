var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');
var gethumburger;
//console.log=function(){};

var ismobile='n';
document.addEventListener('DOMContentLoaded', function () {
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

    gethumburger=JSON.parse(getCookie('hamburger'));

    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log(dataarray);

    //additemdropfilter(dataarray.itemsdata);
    
    document.getElementById('kembalilagis').setAttribute('onclick','');
    showtabel(dataarray.databaseallitem_main);

});


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
const socket = io();
//addnew-katagori
socket.on('newaddnew-katagori',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('datas ====');
    console.log(datas);

    var data=datas.alldataadditem;
    //var fixarrays=dataarray.dataadminlist;
    if (data.length>0) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            dataarray.databaseallitem_main.push(element);
        
       
        }
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        console.log('dataarray.databaseallitem_main ====');
        console.log(dataarray.databaseallitem_main);
        loadingbawahupdate(dataarray.databaseallitem_main);
    }
    
});

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
    loadingbawahupdate(dataarray.databaseallitem_main);
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
    loadingbawahupdate(dataarray.databaseallitem_main);
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

    loadingbawahupdate(dataarray.databaseallitem_main);
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
    loadingbawahupdate(dataarray.databaseallitem_main);
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
  loadingbawahupdate(dataarray.databaseallitem_main);
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
    
    loadingbawahupdate(dataarray.databaseallitem_main);
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
    loadingbawahupdate(dataarray.databaseallitem_main);
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
    loadingbawahupdate(dataarray.databaseallitem_main);
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
    loadingbawahupdate(dataarray.databaseallitem_main);
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
    loadingbawahupdate(dataarray.databaseallitem_main);
});


socket.on('newpackdereject-ambil',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].reject_ambil_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.databaseallitem_main);
});

socket.on('newpackdereject-qc',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.databaseallitem_main);
});

socket.on('newpackde-ambil',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_ambil='true';
        dataarray.dataadminlist[i].packde_ambil_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.databaseallitem_main);
});

socket.on('newpackde-qc',function(datas){

    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_qc='true';
        dataarray.dataadminlist[i].packde_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.databaseallitem_main);

});


socket.on('newdriverreject-ambil',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].packde_qc='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.databaseallitem_main);
});

socket.on('newdriverreject-terimakonsumen',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].packde_qc='';
        dataarray.dataadminlist[i].pickup_driver='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.databaseallitem_main);
});


//////////////// tutup socket ////////////////////

//tampilkan data tabel
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
        if (gethumburger.tipeuser.toLowerCase()=='supervisor') {
            hitungtugassaya_universal();
        }
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style','display:none;');
    
    },500);
}

function returnarray(datamainitem) {
    
    console.log('datamainitem');
    console.log(datamainitem);

    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    var datavariantitem=dataarray.itemsdata.filter(element =>!['AETHER - Track Light - Body Plain Connector','AETHER - Track Light - Body 90 Connector','AETHER - Track Light - Leg Connector'].includes(element.product));

    console.log('datavariantitem');
    console.log(datavariantitem);

    //tambahkan properti list_variant di datamainitem
    const variantMap = new Map();
    datavariantitem.forEach(variant => {
    if (!variantMap.has(variant.main_product)) {
        variantMap.set(variant.main_product, []);
    }
    variantMap.get(variant.main_product).push(variant);
    });

    datamainitem.forEach(item => {
        item.list_variant = variantMap.get(item.main_product) || [];
    });

    console.log('final datamainitem');
    console.log(datamainitem);

    return datamainitem.map(function(element,index) {
        var variantproduklist =element.list_variant.map(function(element0,index){
            return `
                <span class="badge text-bg-primary">${element0.product}</span>
            `
        }).join('');
        
        return `
            <tr data-json='${JSON.stringify(element)}' id="dataitem-${index}">
                <td style="text-align: left;">
                    ${element.main_product}
                </td>

                <td style="text-align: left;vertical-align: middle;"  title="Rp ${formatMoney(element.main_price)}">Rp 
                    ${formatMoney(element.main_price)}
                </td>

                <td style="text-align: left;">
                    ${variantproduklist}
                    
                </td>
            
                <td style="text-align: center;vertical-align: middle;">
                    <span class="badge text-bg-secondary" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#mediaModal" data-url="${element.main_img==''?'/assets/lainnya/item-default.png':element.main_img}">View</span>
                </td>

                <td style="text-align: center;vertical-align: middle;">
                    <!--<span class="badge text-bg-secondary" style="cursor: pointer;" onclick="klikedititem('${index}')">Edit</span>-->
                    <span class="badge text-bg-danger" style="cursor: pointer;" onclick="klikdeleteitem('${index}')">Delete</span>
                </td>
                
            </tr>
        
        `;
    }).join('');

}

function create_variantproduk(indexinduk) {
    var datax=JSON.parse(document.getElementById('itemalls').dataset.json).itemsdata;
    var dataarray=datax.filter(element=>
        element.product!='AETHER - Track Light - Body 90 Connector'&&element.product!='AETHER - Track Light - Leg Connector'&&element.product!='AETHER - Track Light - Body Plain Connector'
    );
    var finalarray=dataarray.filter(element=>element.main_product=='');

    var myobj = document.getElementById(`divulhapus-${indexinduk}`);
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`dropdownvariant-${indexinduk}`);

    var divhapus = document.createElement("div");
    divhapus.setAttribute('id', `divulhapus-${indexinduk}`);

    var listed= finalarray.map(function(element,index) {
        return `
            <li id="livariant-${indexinduk}-${index}" data-json='${JSON.stringify(element)}' title="${element.product}">
                <div class="dropdown-item">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="varianproduct-${indexinduk}-${index}" onchange="checklistvariant(this)">
                        <label class="form-check-label" for="varianproduct-${indexinduk}-${index}">
                            ${element.product}
                        </label>
                    </div>
                </div>
            </li>
        `;
    }).join('');
    
    divhapus.innerHTML=listed;
    datatab.appendChild(divhapus);
}
//tutup show table

//search variant
function searchvariant(e) {
    var index=e.id.split('-')[1];
    const listItems = document.querySelectorAll(`#divulhapus-${index} li`);

    console.log('e.id ===');
    console.log(e.id);

    var searchInput=e.value;

    const searchText = searchInput.toLowerCase();
    let hasResult = false;

    listItems.forEach(item => {
        const title = item.getAttribute('title').toLowerCase();
        if (searchText && title.includes(searchText)) {
        item.classList.remove('d-none');
        hasResult = true;
        } else if (searchText) {
        item.classList.add('d-none');
        } else {
        item.classList.remove('d-none');
        }
    });

    // Jika tidak ada hasil sama sekali, sembunyikan semuanya
    if (searchText && !hasResult) {
        listItems.forEach(item => item.classList.add('d-none'));
    }
}
//
//on checked variant
function checklistvariant(e) {
    var id=e.id.split('-');
    var indexinduk=id[1];
    var indexchecked=id[2];
    var datachecked=JSON.parse(document.getElementById(`livariant-${indexinduk}-${indexchecked}`).dataset.json);

    console.log('datachecked ==',datachecked);

    //selek untuk main price
    var selectmainprice=document.getElementById(`selectmainprice-${indexinduk}`);
    selectmainprice.innerHTML='<option selected value="">Pilih produk</option>';//reset

    //

    //list variant

    var inputElement = document.getElementById(`listvariantname-${indexinduk}`);
    var ceklistvariantname = inputElement.value.trim();

    // Jika input kosong, buat array kosong, kalau tidak split dengan koma
    var listvariantname = ceklistvariantname ? ceklistvariantname.split(',') : [];

    if (e.checked) {
        // Cek apakah datachecked.product sudah ada di array atau belum (hindari duplikat)
        if (!listvariantname.includes(datachecked.product)) {
            listvariantname.push(datachecked.product);
        }

        console.log('listvariantname ==', listvariantname);

        // Update ke input
        if (inputElement && Array.isArray(listvariantname)) {
        inputElement.value = listvariantname.join(',');
        } else {
            console.error('inputElement tidak ditemukan atau listvariantname bukan array:', inputElement, listvariantname);
        }
    }else{
        //hapus dari list
        if (listvariantname.includes(datachecked.product)) {
            const index = listvariantname.indexOf(datachecked.product);
            //Jika item ditemukan >-1 (indexOf akan mengembalikan -1 jika tidak ditemukan)
            if (index > -1) {
                // Hapus 1 item dari indeks yang ditemukan
                listvariantname.splice(index, 1);
            }

            console.log('listvariantname ==', listvariantname);

            // Update hapus ke input
            if (inputElement && Array.isArray(listvariantname)) {
            inputElement.value = listvariantname.join(',');
            } else {
                console.error('inputElement tidak ditemukan atau listvariantname bukan array:', inputElement, listvariantname);
            }
        }
    }
    selectmainprice.innerHTML='<option selected disabled value="">Pilih produk</option>'+listvariantname.map(function (element) {
        return `
            <option>${element}</option>
        `;
    }).join('');

    oninputdata();
}
//selectmainpriceklik
function selectmainpriceklik(e) {
    var id=e.id.split('-');
    var indexinduk=id[1];

    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).itemsdata;

    var foundItem =dataarray.find(item => item.product === e.value);

    if (foundItem) {
        const price1 = foundItem.price1;
        console.log(`Harga untuk ${e.value} adalah: ${price1}`); 
        document.getElementById(`mainpriceshow-${indexinduk}`).value=`Rp ${formatMoney(price1)}`
        document.getElementById(`mainpricesave-${indexinduk}`).value=price1;
        document.getElementById(`idmainpricesave-${indexinduk}`).value=foundItem.no;
    } else {
        console.log(`${e.value} tidak ditemukan dalam array.`);
    }
    
    oninputdata();
}
//




//

//klik tombol add new
function klikopenaddnew(prosedur) {
    //prosedur == 'product' prosedur == 'platform'  prosedur == 'deliveryunit'
    listimagename.length=0;
    create_variantproduk(1);
    
    listimagename.length=0;
    $('input[name="uploadimg"]').val('');
    $('img[name="imguploadshow"]').attr('src', '');
    $('i[name="iconupload"]').removeClass('d-none');
    $('img[name="imguploadshow"]').addClass('d-none');
    $('#modaladdnewitem').modal('show');
}

//klik close modal add new
$('#modaladdnewitem').on('hidden.bs.modal', function (e) {
    addoredit='add';
    document.getElementById(`modaladdnewitemlabel`).innerHTML="Add New Product";
    document.getElementById(`addnewitemtombolfooters`).classList.remove('d-none');
    document.getElementById(`edititemtombolfooters`).classList.add('d-none');
    
    //reset inputan di modal
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard,index) => {
        itemCard.querySelector('[name="produkmainname"]').value='';
        itemCard.querySelector('[name="selectmainprice"]').innerHTML='';
        
        //itemCard.querySelector('[name="imgkatagoriname"]').value='';

        if (index!=0) {
            itemCard.remove(); // Langsung remove elemen ke-2 dan seterusnya
            itemIndex = 1;
        }

    });

    
});
//
///add more item
let itemIndex = 1;

function additems() {
    /* var jumlahitems=parseInt(document.getElementById('jumlahitembeli').innerHTML);
    jumlahitems=1+itemIndex;
    document.getElementById('jumlahitembeli').innerHTML=jumlahitems; */

    itemIndex++;
    renderItems();
    document.getElementById("judulitem-1").classList.remove('d-none');
    console.log('itemIndex');
    console.log(itemIndex);
}

function renderItems() {
    // Buat elemen baru tanpa menghapus yang lama
    const itemsContainer = document.getElementById('itemsContainer');
    const newItem = document.createElement('div');
    newItem.className = "partitems";
    newItem.id = `item-${itemIndex}`;
    newItem.innerHTML =`
        <hr>
        <div id="item-${itemIndex}" class="partitems">
            <b><p id="judulitem-${itemIndex}">Katagori Produk ${itemIndex}</p></b>
            <div class="row">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Katagori Produk</span>
                    <input type="text" class="form-control" id="katagoriname-${itemIndex}" name="katagoriname" placeholder="Katagori Name" style="font-size: 12px;"  oninput="oninputdata()">
                </div>
                
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Harga Katagori</span>
                    <input type="number" class="form-control" id="pricekatagori-${itemIndex}" name="pricekatagoriname" placeholder="0" style="font-size: 12px;" min="0" oninput="oninputdata()">
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Image Link</span>
                    <input type="text" class="form-control" id="imgkatagori-1" name="imgkatagoriname" placeholder="Image Link" style="font-size: 12px;"  oninput="oninputdata()">
                </div>

            </div>
            
            <div class="d-flex justify-content-end">
                <button type="button" class="removeItem btn btn-danger btn-sm" id="removeItem-${itemIndex}" onclick="removeItem(${itemIndex})"><i class="bi bi-trash3-fill" style="color: white;"></i>&nbsp;Hapus</button>
                
            </div>
            
        </div>
    `;
    itemsContainer.appendChild(newItem);
}

// Fungsi untuk menghapus item 
function removeItem(itemId) {
    document.getElementById(`item-${itemId}`).remove();

    // Ambil ulang semua item yang tersisa
    const items = document.querySelectorAll('#itemsContainer > .partitems');

    // Reset itemIndex agar sesuai urutan terbaru
    itemIndex = items.length;

    items.forEach((item, index) => {
        const newId = index + 1; // Sesuaikan index baru
    

        // Update elemen ID
        item.id = `item-${newId}`;
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
        const judulitem = item.querySelector(`#judulitem-${newId}`);
        judulitem.innerHTML=`Katagori Produk ${newId}`;

    });
}
////tutup add more product

//on input file image
// Objek global untuk menyimpan file yang dipilih dari setiap input
// Key akan menjadi ID input file, value adalah objek File
const selectedFiles = {};
// Fungsi untuk memicu klik pada input file tersembunyi
function klikuploadimg(e) {
    const urutanfoto = e.id.includes('iconupload')?e.id.replace('iconupload', ''):e.id.replace('imguploadshow', '');
    console.log('urutanfoto == ',urutanfoto);
    //listimagename
    if (document.getElementById('produkmainname-1').value!='') {
        document.getElementById(`uploadimg${urutanfoto}`).click();
    }else{warningpopup('error','isi dulu nama produknya')}
    
}

// Tambahkan event listener untuk kelima input file
for (let i = 1; i <= 5; i++) {
    const inputId = `uploadimg${i}-1`;
    const inputElement = document.getElementById(inputId);

    if (inputElement) { // Pastikan elemen ditemukan
        inputElement.addEventListener("change", function (event) {
            const file = event.target.files[0]; // Ambil file pertama dari input ini

            if (!file) {
                // Jika user membatalkan pilihan file
                delete selectedFiles[inputId]; // Hapus dari daftar jika dibatalkan
                updateStatusIcon(inputId, false,''); // Update ikon status
                return;
            }

            // Validasi format file
            const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: "error",
                    text: "Format file harus gambar (PNG, JPG, JPEG, GIF).",
                    confirmButtonColor: "#0d6efd",
                    confirmButtonText: "Ok",
                    allowOutsideClick: true,
                });
                // Clear input file agar user bisa memilih ulang
                event.target.value = '';
                delete selectedFiles[inputId]; // Hapus dari daftar
                updateStatusIcon(inputId, false,''); // Update ikon status
                return;
            }

            // Simpan file ke objek global
            selectedFiles[inputId] = file;

            // Tampilkan preview atau informasi file jika diperlukan
            const imgurl = URL.createObjectURL(file);
            console.log(`File selected for ${inputId}: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
            // Anda bisa update UI di sini, misalnya menampilkan thumbnail

            updateStatusIcon(inputId, true,imgurl); // Update ikon status
        });
    }
}
function updateStatusIcon(inputId, isFileSelected,url) {
    
    const indexfiles = inputId.replace('uploadimg', '');
    const imgshows = document.getElementById(`imguploadshow${indexfiles}`);
    const kursorshows = document.getElementById(`iconupload${indexfiles}`);

    var fixindexfoto=indexfiles.split('-')[0];

    const newFileName = `${document.getElementById('produkmainname-1').value.toLowerCase().replace(/[^a-z0-9]/g, '')}-${fixindexfoto}.png`; 

    if (!kursorshows.className.includes('d-none')) {
        //show image
        kursorshows.classList.add('d-none');
        imgshows.classList.remove('d-none');
        imgshows.src=url;
        listimagename[parseInt(fixindexfoto)-1]=`/assets/pridukimage/${newFileName}`;
    }else{
        //hide 
        kursorshows.classList.remove('d-none');
        imgshows.classList.add('d-none');
        imgshows.src=url;
        if (listimagename[parseInt(fixindexfoto)-1] === `/assets/pridukimage/${newFileName}`) {
            listimagename[parseInt(fixindexfoto)-1] = undefined; // atau null jika ingin kosong jelas
        }
    }
    oninputdata();
}
var listimagename=[];
async function uploadingimage(array) {
    
    //loadingpopup();
    const formData = new FormData();
    let fileCount = 0;
    // Iterasi melalui file yang dipilih dan tambahkan ke FormData
    for (const id in selectedFiles) {
        if (selectedFiles.hasOwnProperty(id)) {
            const file = selectedFiles[id];
            
            // Dapatkan ekstensi file dari originalname
            const fileExtension = file.name.split('.').pop();
            // Buat nama file baru dengan timestamp milidetik
            const newFileName = `${alldataadditem[0].main_product.toLowerCase().replace(/[^a-z0-9]/g, '')}-${fileCount+1}.png`; // Contoh: 1678889900123.jpg

            console.log('nama file ==',newFileName)

            // Tambahkan file ke FormData dengan nama baru
            // 'gambar' adalah nama field yang diharapkan Multer di server
            formData.append("gambar", file, newFileName);
            //listimagename.push(newFileName);
            fileCount++;
        }
    }

    if (fileCount === 0) {
        Swal.close();
        Swal.fire({
            icon: "error",
            text: "Tidak ada gambar yang dipilih untuk diunggah.",
            confirmButtonColor: "#0d6efd",
            confirmButtonText: "Ok",
            allowOutsideClick: true,
        });
        return;
    }

    console.log(`Mengunggah ${fileCount} file...`);

    try {
        const uploadUrl = '/uploadmultiimage/produkweb'; // Pastikan ini sesuai dengan router

        const response = await fetch(uploadUrl, {
            method: 'POST',
            // headers: {
            //     'authorization': xi // header otorisasi
            // },
            body: formData, // FormData akan mengatur Content-Type secara otomatis
            
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.message || 'Gagal mengunggah file.');
        }

        const resdat = await response.json();

        setTimeout(function () {
            Swal.getHtmlContainer().querySelector("#loadingpersenpopoups").value = 90;
            if (resdat.uploaded === "file terupload") {
                
                /* Swal.fire({
                    icon: 'success',
                    title: 'Semua gambar berhasil diunggah!',
                    text: `${fileCount} gambar berhasil disimpan.`,
                    timer: 2000,
                    showConfirmButton: false
                }); */
                // Lakukan sesuatu setelah upload berhasil, misal:
                // savefixselesai(folderfoto); // Panggil fungsi Anda setelah sukses
                // Clear selected files for next upload
                for (const id in selectedFiles) {
                    if (selectedFiles.hasOwnProperty(id)) {
                        delete selectedFiles[id];
                        // Optional: Reset input file elements to clear their state
                        const inputElement = document.getElementById(id);
                        if (inputElement) {
                            inputElement.value = ''; // Reset the input value
                        }
                        updateStatusIcon(id, false,'');
                    }
                }

                //return `sukses`;
                alldataadditem.main_image=JSON.stringify(listimagename);
                    socket.emit('addnew-katagori',{namalengkap,username,alldataadditem});
                    Swal.close();
                $("#modalpopupsuksessaveit").modal('show');
            } else {
                statusText.textContent = 'Upload gagal!';
                Swal.fire({
                    icon: "error",
                    title: `Data tersimpan namun Upload foto error ${resdat.uploaded}, `,
                    showConfirmButton: false,
                    timer: 3000,
                });
                //return `sukses [1]`;
            }
        }, 2000);
        
    } catch (error) {
        console.error("Upload error:", error);
        statusText.textContent = 'Terjadi kesalahan!';
        Swal.fire({
            icon: "error",
            title: `Data tersimpan namun Upload foto error: ${error.message || 'Terjadi kesalahan jaringan/server'}`,
            showConfirmButton: false,
            timer: 3000,
        });
        //return 'suskses [99]'
    }
}
//

///on input

var alldataadditem=[];//untuk add product dan edit product

//
var addoredit='add';//add edit
var datavariantproduklist='';
function oninputdata() {
    alldataadditem.length=0;
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard,index) => {
        let main_product = itemCard.querySelector('[name="produkmainname"]').value;

        console.log('iniiiiii =',document.getElementById('produkmainname-1').value.toLowerCase().replace(/[^a-z0-9]/g, ''))
        
        datavariantproduklist=itemCard.querySelector('[name="listvariantname"]').value;

        let idmain_price_variantselek=itemCard.querySelector('[name="idmainpricesave"]').value;

        let main_price = itemCard.querySelector('[name="mainpricesave"]').value;

        

        let main_diskripsi=itemCard.querySelector('[name="diskripsiproduk"]').value;

        //cek kembali nama main product di nama foto

        listimagename.forEach((element,index) => {
            if (element!=undefined) {
                var cekname=main_product.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (!element.includes(cekname)) {
                    var new1 = element.replace(/^\/assets\/pridukimage\//, '').replace(/\.[a-zA-Z0-9]+$/, '');

                    var newelement=element.replace(`${new1}`,`${cekname}-${index+1}`);
                    listimagename[index]=newelement;
                }
            }
        });

        //let img_links = itemCard.querySelector('[name="imgkatagoriname"]').value;
        
        var data;
        if (addoredit=='add') {
            data={
                main_product,
                idmain_price_variantselek,
                main_price,
                main_img:'',
                main_diskripsi
            };
            console.log('alldataadditem ==========');
            
        }else if (addoredit=='edit') {
            data={
                main_product,
                idmain_price_variantselek,
                main_price,
                main_img:'',
                main_diskripsi
            }
            console.log('edit product editting ==========');
        }

        alldataadditem.push(data);


    });
    
    console.log('oninput == ',{listimagename,datavariantproduklist,alldataadditem});
}

//tutup on input



//////////////////////////////////universal

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
        title:'',
        text: title,
        showConfirmButton: false,
        timer: 1500
    });
}
//////
function reloadnewdata() {
  
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
    
    var myModalEl = document.getElementById(modalid);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}
///--------------------------------