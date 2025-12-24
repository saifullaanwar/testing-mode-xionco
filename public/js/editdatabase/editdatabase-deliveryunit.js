var username;
var namalengkap;
var $progress = $("#nav-loading");
var $progressBar = $(".progress-bar");
var gethumburger;
//console.log=function(){};

var ismobile = "n";
document.addEventListener("DOMContentLoaded", async function () {
  cekdatausersorout();
  showfotvidmodal();
  //document.getElementById('editsavedetail').setAttribute('style','display:none;');
  //fix modal error
  document.addEventListener("hide.bs.modal", function (event) {
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
  } else {
    window.location.href = "/";
  }

  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/huawei/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/IPhone/i) ||
    navigator.userAgent.match(/IPad/i) ||
    navigator.userAgent.match(/IPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    ismobile = "y";
  }

  gethumburger = JSON.parse(getCookie("hamburger"));
  scrolltobuttonsidebar();

  fetchdata()
});

// 1. Fungsi Ambil Data dari Server
function fetchdata() {
    $progress.show();
    $progressBar.css("width", "30%");

    fetch('/editdatabase/getdeliveryunitlist', { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi // Pastikan variabel 'xi' (token auth) tersedia secara global
        }
    })
    .then(res => res.json())
    .then(data => {
        window.dataall = data; 
        console.log('Data Delivery Unit:', data);
        $progressBar.css("width", "100%");
        
        setTimeout(() => {
            showtabel(data); 
            $progress.hide();
        }, 500);
    })
    .catch(err => {
        console.error('Gagal ambil data:', err);
        $progress.hide();
    });
}

// 2. Fungsi Tampilkan Tabel
function showtabel(dataarray) {
    let html = "";
    if (dataarray && dataarray.length > 0) {
        dataarray.forEach((item, index) => {
            html += `
            <tr class="align-middle">
                <td class="text-center">${index + 1}</td>
                <td><strong>${item.deliveryunit}</strong></td>
                <td class="text-center">
                    <button class="btn btn-danger btn-sm" onclick="deletedata('${item.no}', '${item.deliveryunit}')">
                        <i class="fa fa-trash"></i> Hapus
                    </button>
                </td>
            </tr>`;
        });
    } else {
        html = '<tr><td colspan="3" class="text-center text-muted">Data kosong</td></tr>';
    }
    
    $("#table-delivery-body").html(html);
}

// 3. Fungsi Simpan Data Baru
async function savedatanew() {
    let items = [];
    $('.input-group-unit').each(function() {
        let name = $(this).find('.unit-name').val();
        let type = $(this).find('.unit-type').val();
        if(name) items.push({ deliveryunit: name, tipe: type });
    });

    if (items.length === 0) return alert("Isi minimal satu data!");

    fetch('/editdatabase/saveadddeliveryunit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': xi },
        body: JSON.stringify({ alldataadditem: items })
    })
    .then(res => res.json())
    .then(res => {
        alert("Data Berhasil Disimpan");
        location.reload();
    });
}

function showtabel(dataarray) {
    let html = "";
    dataarray.forEach((item, index) => {
        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.deliveryunit}</td>
            <td>${item.tipe}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deletedata('${item.no}')">Hapus</button></td>
        </tr>`;
    });
    $("#table-delivery-body").html(html);
}

// 4. Fungsi Hapus Data
function deletedata(id, name) {
    if (confirm(`Apakah Anda yakin ingin menghapus "${name}"?`)) {
        fetch('/editdatabase/deletedeliveryunit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': xi
            },
            body: JSON.stringify({ no: id })
        })
        .then(res => res.json())
        .then(res => {
            if (res.status === "sukses") {
                fetchdata(); 
            } else {
                alert("Gagal menghapus data");
            }
        })
        .catch(err => console.error("Error delete:", err));
    }
}

///////////

function loadingbawahupdate(array) {
  $progressBar.css("width", "0%");
  $progress.show();
  setTimeout(function () {
    /* var modaldut=['modaldetail']
        for (let i = 0; i < modaldut.length; i++) {
        const element = modaldut[i];
        if (document.getElementById(element).style.display=='block') {
            hidemodal(element);
        }
        } */
    $progressBar.css("width", "65%");
    setTimeout(function () {
      $progressBar.css("width", "85%");
      setTimeout(function () {
        $progressBar.css("width", "97%");
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
socket.on("newadditemadminlist", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  console.log("datas ====");
  console.log(datas);

  //var fixarrays=dataarray.dataadminlist;
  for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    dataarray.dataadminlist.unshift(element);
  }
  window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
  console.log("dataarray.dataadminlist ====");
  console.log(dataarray.dataadminlist);
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("neweditfullitemadminlist", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  console.log("edit item [1]");
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    //var indexarray= dataarray.dataadminlist.indexOf(element);
    if (datas[0].id_transaksi == element.id_transaksi) {
      console.log("edit item [2]");
      var historiold = JSON.parse(element.history);

      var historiesnew = [...datas[0].history, ...historiold];

      dataarray.dataadminlist[i].order_date = datas[0].order_date;
      dataarray.dataadminlist[i].orderdate_mili = datas[0].orderdate_mili;

      dataarray.dataadminlist[i].delivered_date = datas[0].delivered_date;

      dataarray.dataadminlist[i].delivereddate_mili =
        datas[0].delivereddate_mili;

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
  document.getElementById("itemalls").textContent = JSON.stringify(dataarray);

  window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);

  console.log("edit item [3]");
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newquickedititemadminlist", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
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

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newquickedititemadminlist');
    }
  }

  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("neweditforcestatus", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = datas.status;
      dataarray.dataadminlist[i].confirmroute = datas.confirmroute;
      dataarray.dataadminlist[i].forcedsent = datas.forcedsent;
      dataarray.dataadminlist[i].forcedcancel = datas.forcedcancel;
      dataarray.dataadminlist[i].reschedule = datas.reschedule;
      dataarray.dataadminlist[i].delayproduksi = datas.delayproduksi;
      dataarray.dataadminlist[i].toppriority = datas.toppriority;
      dataarray.dataadminlist[i].pending = datas.pending;
      dataarray.dataadminlist[i].history = datas.history;

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("neweditforcestatusnew", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  datas.tglinputmili.toString();
  console.log("data masuk status force");
  console.log(datas);

  var flag = 0; //0 belum ada input id transaksi, 1 = sudah ada
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
      dataarray.forcestatusrequest[i].approval_forcestatus =
        datas.approval_forcestatus;

      flag = 1;
    }
  }

  if (flag == 0) {
    dataarray.forcestatusrequest.push(datas);
  }

  //

  console.log("data baru status force");
  console.log(dataarray.forcestatusrequest);

  window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newklikprinpodo", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    for (let j = 0; j < dataarray.dataadminlist.length; j++) {
      const element2 = dataarray.dataadminlist[j];
      if (element2.id_transaksi == element.id_transaksi) {
        dataarray.dataadminlist[j].klik_print_podo = "true";
      }
    }
  }
  window.dataall = dataarray;  //document.getElementById("itemalls").dataset.json = JSON.stringify(dataarray);

  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newprintpodo", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = datas.status;

      dataarray.dataadminlist[i].history = datas.history;

      dataarray.dataadminlist[i].print_podo = "true";

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newpackde-kirimbahan", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = datas.history[0].details.status;

      dataarray.dataadminlist[i].packde_kirimbahan = "true";
      dataarray.dataadminlist[i].packde_kirimbahan_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newupholsteryselesai", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = datas.history[0].details.status;

      dataarray.dataadminlist[i].upholstery_jadi = "true";
      dataarray.dataadminlist[i].upholstery_img = datas.filenamesupload;

      dataarray.dataadminlist[i].history = datas.history;

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newapprovalproduk", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = datas.status;

      dataarray.dataadminlist[i].history = datas.history;

      dataarray.dataadminlist[i].approval_produkjadi = "true";

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newpackdereject-ambil", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = "Proses Produksi (Re)";

      dataarray.dataadminlist[i].upholstery_jadi = "";
      dataarray.dataadminlist[i].approval_produkjadi = "";
      dataarray.dataadminlist[i].reject_ambil_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newpackdereject-qc", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = "Proses Produksi (Re)";

      dataarray.dataadminlist[i].upholstery_jadi = "";
      dataarray.dataadminlist[i].approval_produkjadi = "";
      dataarray.dataadminlist[i].packde_ambil = "";
      dataarray.dataadminlist[i].reject_qc_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newpackde-ambil", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = datas.history[0].details.status;

      dataarray.dataadminlist[i].packde_ambil = "true";
      dataarray.dataadminlist[i].packde_ambil_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newpackde-qc", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = datas.history[0].details.status;

      dataarray.dataadminlist[i].packde_qc = "true";
      dataarray.dataadminlist[i].packde_qc_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newdriverreject-ambil", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = "Proses Produksi (Re)";

      dataarray.dataadminlist[i].upholstery_jadi = "";
      dataarray.dataadminlist[i].approval_produkjadi = "";
      dataarray.dataadminlist[i].packde_ambil = "";
      dataarray.dataadminlist[i].packde_qc = "";
      dataarray.dataadminlist[i].reject_qc_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

socket.on("newdriverreject-terimakonsumen", function (datas) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = "Proses Produksi (Re)";

      dataarray.dataadminlist[i].upholstery_jadi = "";
      dataarray.dataadminlist[i].approval_produkjadi = "";
      dataarray.dataadminlist[i].packde_ambil = "";
      dataarray.dataadminlist[i].packde_qc = "";
      dataarray.dataadminlist[i].pickup_driver = "";
      dataarray.dataadminlist[i].reject_qc_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

      window.dataall = dataarray;   //document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.deliveryunitlist);
});

////
////showtabel
function showtabel(dataarray) {
  
}

function returnarray(dataitem) {
  
}



//////////////////////////////////universal

function reloadnewdata() { }

$(document).ready(function () {
  resizetable();
});
function resizetable() {
  var top_nav_height = 0;
  var bottom_nav_height = 0;
  var mobilespasi = 0;
  var kotaktombolatas = 0; //$("#kotaktombolatas").height();
  var window_height = $(window).height();
  if (ismobile == "y") {
    console.log("mobile");

    top_nav_height = //$("#navatas-mobile").height();
      bottom_nav_height = 0; //$("#navbarbawah").height();
    mobilespasi = 0; //$("#mobile-spase-nav").height();
  } else {
    console.log("pc");
    top_nav_height = $("#nav-atas").height();
    mobilespasi = 0; //$("#mobile-spase-nav").height();
  }

  var heigfix =
    window_height -
    (top_nav_height + bottom_nav_height + mobilespasi + kotaktombolatas);
  console.log(`heihhhh : ${bottom_nav_height}`);

  document
    .getElementById("main-pages")
    .setAttribute(
      "style",
      `max-height:${heigfix}px!important;overflow-y: scroll!important;overflow-x: hidden!important;`
    );
}
//------------------------------------
function hidemodal(modalid) {
  var myModalEl = document.getElementById(modalid);
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
}
///--------------------------------
