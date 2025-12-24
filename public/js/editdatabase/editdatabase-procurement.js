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

  // var dataarray = JSON.parse(document.getElementById("itemalls").dataset.json);
  // console.log(dataarray);
  //additemdropfilter(dataarray.itemsdata);
  //document.getElementById('addextracharge').style.display='none';
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
      //worker_threads(data);
      showtabel(data.databaseitem_proc);
      createlist()
    })
    .catch(err => {
      console.error('Gagal ambil dataall:', err);
    });
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
  // Konversi dataarray
  dataarray = dataarray.map((item) => {
    const inhouse = item.inhouse?.trim() || "";
    const thirdparty = item.thirdparty?.trim() || "";

    return {
      ...item,
      deliveryUnit: inhouse || thirdparty || "-",
      deliveryUnitType: inhouse ? "inhouse" : thirdparty ? "thirdparty" : "-",
    };
  });

  //filter untuk meng-urutkan inhouse dan thirdparty
  dataarray.sort((a, b) => {
    const aTipe = a.inhouse && a.inhouse !== "" ? 0 : 1;
    const bTipe = b.inhouse && b.inhouse !== "" ? 0 : 1;
    return aTipe - bTipe;
  });

  console.log("DATA PROCREMENT UNIT LIST: ", dataarray);

  var myobj = document.getElementById("divhpsdata");
  if (myobj) myobj.remove();

  var datatab = document.getElementById(`alldattab`);

  var divhapus = document.createElement("tbody");
  divhapus.setAttribute("id", "divhpsdata");
  
  divhapus.innerHTML = returnarray(dataarray);

  datatab.appendChild(divhapus);

  setTimeout(function () {
    if (gethumburger.tipeuser.toLowerCase() == "supervisor") {
      hitungtugassaya_universal();
    }
    document.getElementById("showmainpage").removeAttribute("style");
    document
      .getElementById("loadingskeleton")
      .setAttribute("style", "display:none;");
  }, 500);
}

function returnarray(dataitem) {
  return dataitem
    .map(function (element, index) {
      const note = element?.note?.trim() || "-";
      const divisi = element?.divisi?.trim() || "-";
      const vendor = element?.vendor?.trim() || "-";
      const material = element?.material?.trim() || "-";
      const katagori = element?.katagori?.trim() || "-";
      const item1 = element?.item?.trim() || "-";
      const image = element?.image?.trim() || "-";

      const finalElement = {
        ...element,
        note,
        divisi,
        vendor,
        material,
        katagori,
        item1,
        image,
      };

      return `
        <tr data-json='${JSON.stringify(finalElement)}' id="dataitem-${index}">
          <td style="text-align: center; vertical-align: middle;">${index + 1}</td>
          <td style="text-align: left; vertical-align: middle;" title="${item1}">${item1}</td>
          <td style="text-align: left; vertical-align: middle;">${katagori}</td>
          <td style="text-align: left; vertical-align: middle;" class="d-none">${material}</td>
          <td style="text-align: left; vertical-align: middle;">${vendor}</td>
          <td style="text-align: left; vertical-align: middle;">${divisi}</td>
          <td style="text-align: left; vertical-align: middle;" class="d-none">
              <div style="max-height: 100px; overflow-y: auto; white-space: pre-wrap; resize: vertical; min-height: 50px;">
                  ${note}
              </div>
          </td>
          <td style="text-align: center; vertical-align: middle;" class="d-none">${image}</td>
          <td style="text-align: center; vertical-align: middle;">
              <div class="d-flex justify-content-center gap-2">
                  <span class="badge text-bg-primary" onclick="klikedititem('${index}')" style="cursor: pointer;">Edit</span>
                  <span class="badge text-bg-danger" onclick="klikdeleteitem('${index}')" style="cursor:pointer;">Delete</span>
              </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function klikopenaddnew(prosedur) {
  if (prosedur == "itemprocurement") {
    $("#modaladdnewitem").modal("show");
  }
}

///add more item
let itemIndex = 1;

function additems() {
  itemIndex++;
  renderItems();          // bikin item baru
  createlist(itemIndex);  // isi datalist untuk item tsb
  console.log("itemIndex", itemIndex);
}


//untuk render item input baru
function renderItems() {
  const itemsContainer = document.getElementById("itemsContainer");
  const newItem = document.createElement("div");
  newItem.className = "partitems";
  newItem.id = `item-${itemIndex}`;

  newItem.innerHTML = `
    <hr>
    <b><p id="judulitem-${itemIndex}">Item Procurement ${itemIndex}</p></b>
 <div class="col">
              <div class="row">
                <!-- Left Column -->
                <div class="col-md-6">
                  <!-- Item -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Item
                    </span>
                    <input type="text" class="form-control" id="item-${itemIndex}" name="item" placeholder="Item"
                      style="font-size: 12px" oninput="oninputdata()" />
                  </div>

                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Category
                    </span>
                    <input class="form-control " list="listkategoriadd-${itemIndex}" id="katagori-${itemIndex}" name="katagori"
                      placeholder="Pilih Kategori" style="font-size: 12px" oninput="oninputdata()">
                    <datalist id="listkategoriadd-${itemIndex}">
                    </datalist>
                  </div>


                  <!-- Material -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Coa
                    </span>
                    <input class="form-control " list="listcoaadd-${itemIndex}" id="coa-${itemIndex}" name="coa"
                      placeholder="Pilih Coa" style="font-size: 12px" oninput="oninputdata()">
                    <datalist id="listcoaadd-${itemIndex}">
                    </datalist>
                  </div>

                  <!-- Coa -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Material
                    </span>
                    <input type="text" class="form-control" id="material-${itemIndex}" name="material" placeholder="material"
                      style="font-size: 12px" readonly disabled />
                  </div>


                  <!-- Vendor -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Vendor
                    </span>
                    <input class="form-control " list="listvendoradd-${itemIndex}" id="vendor-${itemIndex}" name="vendor"
                      placeholder="Pilih Vendor" style="font-size: 12px" oninput="oninputdata()">
                    <datalist id="listvendoradd-${itemIndex}">
                      <!-- <option value=""> -->
                      <!-- < var datacolorvarian=datas.colorvariantdata; >
                                    < for( let i = 0; i < datacolorvarian.length; i++ ) { >
                                        <option value="<-datacolorvarian[i].colorvariant>">
                                    < } > -->
                    </datalist>
                  </div>
                </div>

                <!-- Right Column -->
                <div class="col-md-6">
                  <!-- Quantity -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Quantity
                    </span>
                    <input type="number" class="form-control" id="qty-${itemIndex}" name="qty" placeholder="Quantity"
                      style="font-size: 12px" oninput="oninputdata()" />
                  </div>

                  <!-- Unit -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Unit
                    </span>
                    <input type="text" list="listunitadd-${itemIndex}" class="form-control" id="unit-${itemIndex}" name="unit"
                      placeholder="Unit" style="font-size: 12px" oninput="oninputdata()" />
                    <datalist id="listunitadd-${itemIndex}">
                      <!-- <option value=""> -->
                      <!-- < var datacolorvarian=datas.colorvariantdata; >
                                    < for( let i = 0; i < datacolorvarian.length; i++ ) { >
                                        <option value="<-datacolorvarian[i].colorvariant>">
                                    < } > -->
                    </datalist>
                  </div>

                  <!-- Division -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Division
                    </span>
                    <input type="text" class="form-control" list="listdivisiadd-${itemIndex}" id="divisi-${itemIndex}" name="divisi"
                      placeholder="Division" style="font-size: 12px" oninput="oninputdata()" />
                    <datalist id="listdivisiadd-${itemIndex}">
                      <!-- <option value=""> -->
                      <!-- < var datacolorvarian=datas.colorvariantdata; >
                                    < for( let i = 0; i < datacolorvarian.length; i++ ) { >
                                        <option value="<-datacolorvarian[i].colorvariant>">
                                    < } > -->
                    </datalist>


                  </div>

                  <!-- Price -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      <span class="text-danger">*&nbsp;</span> Price
                    </span>
                    <input type="number" class="form-control" id="price-${itemIndex}" name="price" placeholder="Price"
                      style="font-size: 12px" oninput="oninputdata()" />
                  </div>

                  <!-- Image Link (instead of actual image) -->
                  <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text"
                      style="background-color: rgb(226, 221, 221); font-size: 12px; width: 120px;">
                      Image
                    </span>
                    <input type="text" class="form-control" id="image-${itemIndex}" name="image" placeholder="Image URL"
                      style="font-size: 12px" oninput="oninputdata()" />
                  </div>
                </div>
              </div>
               <!-- Note -->
              <div class="form-floating">
                <textarea class="form-control" placeholder="" id="note-${itemIndex}" name="note" rows="7"></textarea>
                <label  style="font-size: 12px" for="note-1">Note</label>
              </div>
            </div>
    <div class="d-flex justify-content-end mt-3">
      <button type="button" class="removeItem btn btn-danger btn-sm" id="removeItem-${itemIndex}" onclick="removeItem(${itemIndex})"><i class="bi bi-trash3-fill" style="color: white;"></i>&nbsp;Hapus item</button>
    </div>
  `;

  itemsContainer.appendChild(newItem);
}

function removeItem(itemId) {
  const itemElement = document.getElementById(`item-${itemId}`);
  if (!itemElement) {
    console.warn(`Item with ID item-${itemId} not found.`);
    return;
  }
  itemElement.remove();

  // Ambil ulang semua item yang tersisa
  const items = document.querySelectorAll("#itemsContainer > .partitems");

  // Reset itemIndex agar sesuai urutan terbaru
  itemIndex = items.length;

  items.forEach((item, index) => {
    const newId = index + 1; // Sesuaikan index baru

    // Update elemen ID
    item.id = `item-${newId}`;
    // Perbarui ID dan "for" label semua input dalam item
    const elementsToUpdate = item.querySelectorAll(
      "input, select, span, p, button"
    );
    elementsToUpdate.forEach((el) => {
      if (el.id) {
        const newElId = el.id.replace(/\d+$/, newId); // Ganti angka di ID dengan newId
        el.id = newElId;
      }
      if (el.htmlFor) {
        el.htmlFor = el.htmlFor.replace(/\d+$/, newId); // Ganti angka di ID dengan newId
      }
    });

    // Perbarui tombol hapus dengan parameter ID baru
    const removeButton = item.querySelector(".removeItem");
    if (removeButton) {
      removeButton.setAttribute("onclick", `removeItem(${newId})`);
    }

    //perbarui judul item judulitem
    const judulItem = item.querySelector(`#judulitem-${newId}`);
    if (judulItem) {
      judulItem.id = `judulitem-${newId}`;
      judulItem.innerHTML = `Delivery ${newId}`;
    }
  });
}
////tutup add more product

/**
 * @Description  search item procurement
 */
function handleSearchProcurement(e){
  const searchTerm = e.value ? e.value.toLowerCase() : '';
  let dataarray = window.dataall.databaseitem_proc;

  if (!dataarray) {
    console.error('Data pencarian tidak ditemukan. Pastikan window.dataall.databaseitem_proc terisi.');
    return;
  }

  const filteredData = dataarray.filter(item => {
    const itemText = item.item?.toLowerCase() || '';
    const katagoriText = item.katagori?.toLowerCase() || '';
    const materialText = item.material?.toLowerCase() || '';
    const vendorText = item.vendor?.toLowerCase() || '';
    const divisiText = item.divisi?.toLowerCase() || '';

    return itemText.includes(searchTerm) ||
      katagoriText.includes(searchTerm) ||
      materialText.includes(searchTerm) ||
      vendorText.includes(searchTerm) ||
      divisiText.includes(searchTerm)
  });
  if (filteredData.length > 0) {
    document.getElementById('datatidakditemukan').style.display = 'none';
    showtabel(filteredData);
  } else {
    showtabel([]);
    document.getElementById('datatidakditemukan').style.display = 'table-row-group';
  }
}

///on input
var alldataadditem = []; // Array to store item data
var addoredit = "add"; // Placeholder for the add or edit mode
function oninputdata() {
  var dataarray = window.dataall;
  alldataadditem.length = 0; // Clear the array before adding new data
  document.querySelectorAll("#itemsContainer > .partitems").forEach((itemCard, index) => {
    // Capture all input field values
    let item = itemCard.querySelector('[name="item"]').value?.trim() || "";
    let category = itemCard.querySelector('[name="katagori"]').value?.trim() || "";
    let material = itemCard.querySelector('[name="material"]').value?.trim() || "";
    let coa = itemCard.querySelector('[name="coa"]').value?.trim() || "";
    let vendor = itemCard.querySelector('[name="vendor"]').value?.trim() || "";
    let qty = itemCard.querySelector('[name="qty"]').value?.trim() || "";
    let unit = itemCard.querySelector('[name="unit"]').value?.trim() || "";
    let divisi = itemCard.querySelector('[name="divisi"]').value?.trim() || "";
    let note = itemCard.querySelector('[name="note"]').value?.trim() || "";
    let price = itemCard.querySelector('[name="price"]').value?.trim() || "";
    let image = itemCard.querySelector('[name="image"]').value?.trim() || "";

    // Find the selected material from arraysz and get the corresponding coa
    const selectedData = dataarray.database_coa.find(item => item.kode === coa);
    if (coa && selectedData) {
      material = selectedData.keterangan || "";
      itemCard.querySelector('[name="material"]').value = material;

    }
    if (coa === "") {
      itemCard.querySelector('[name="material"]').value = "";
    }

    // Skip if any required fields are empty
    if (!item || !category || !coa || !material || !vendor || !qty || !unit || !divisi || !price) {
      console.log("Skipping item due to missing fields");
      return;
    }

    let data;
    // Structure the data based on whether it's "add" or "edit"
    if (addoredit === "add") {
      data = {
        item: category + " - " + item,
        katagori: category,
        material: material,
        coa: coa,
        vendor: vendor,
        qty: qty,
        unit: unit,
        divisi: divisi,
        note: note,
        price: price,
        image: image
      };
    } else if (addoredit === "edit") {
      data = {
        item: category + " - " + item,
        katagori: category,
        material: material,
        coa: coa,
        vendor: vendor,
        qty: qty,
        unit: unit,
        divisi: divisi,
        note: note,
        price: price,
        image: image
      };
    }
    alldataadditem.push(data);
  });
  console.log("🔥 alldataadditem:", alldataadditem);
}

/// CREATE LIST ///
var categorylists_element;
var coalists_element;
var unitslists_element;
var divisionlists_element;
var vendorlists_element;

function createlist(index = 1) {
  var dataarray = window.dataall;

  ////// category ////////////////
  var fixitemsarray = [];
  for (let i = 0; i < dataarray.databaseitem_proc.length; i++) {
    let element = dataarray.databaseitem_proc[i];
    if (fixitemsarray.indexOf(element.katagori) === -1) {
      fixitemsarray.push(element.katagori);
    }
  }
  categorylists_element = returnarraydata(fixitemsarray);
  document.getElementById(`listkategoriadd-${index}`).innerHTML = categorylists_element;

  ////// coa ////////////////
  var fixcoa = [];
  for (let i = 0; i < dataarray.database_coa.length; i++) {
    let element = dataarray.database_coa[i];
    if (fixcoa.indexOf(element.kode) === -1) {
      fixcoa.push(element.kode);
    }
  }
  coalists_element = returnarraydata(fixcoa);
  document.getElementById(`listcoaadd-${index}`).innerHTML = coalists_element;

  ////// vendor ////////////////
  var fixvendor = [];
  for (let i = 0; i < dataarray.databaseitem_proc.length; i++) {
    let element = dataarray.databaseitem_proc[i];
    if (fixvendor.indexOf(element.vendor) === -1) {
      fixvendor.push(element.vendor);
    }
  }
  vendorlists_element = returnarraydata(fixvendor);
  document.getElementById(`listvendoradd-${index}`).innerHTML = vendorlists_element;

  ////// unit ////////////////
  var fixunit = [];
  for (let i = 0; i < dataarray.databaseitem_proc.length; i++) {
    let element = dataarray.databaseitem_proc[i];
    if (fixunit.indexOf(element.unit) === -1) {
      fixunit.push(element.unit);
    }
  }
  unitslists_element = returnarraydata(fixunit);
  document.getElementById(`listunitadd-${index}`).innerHTML = unitslists_element;

  ////// divisi ////////////////
  var fixdivisi = [];
  for (let i = 0; i < dataarray.databaseitem_proc.length; i++) {
    let element = dataarray.databaseitem_proc[i];
    if (fixdivisi.indexOf(element.divisi) === -1) {
      fixdivisi.push(element.divisi);
    }
  }
  divisionlists_element = returnarraydata(fixdivisi);
  document.getElementById(`listdivisiadd-${index}`).innerHTML = divisionlists_element;
}


// ==== RETURN OPTION GENERATORS ====
// semua pakai innerText biar tampil di dropdown
function returnarraydata(array) {
  return array.map(function (element) {
    return `<option value="${element}">${element}</option>`;
  }).join('');
}
/// TUTUP CREATE LIST ///



var addoredit = "add"; //add edit

//klik close modal add new
$("#modaladdnewitem").on("hidden.bs.modal", function (e) {
  addoredit = "add";
  document.getElementById(`modaladdnewitemlabel`).innerHTML =
    "Add New Item Procurement";
  document.getElementById(`addnewitemtombolfooters`).classList.remove("d-none");
  document.getElementById(`edititemtombolfooters`).classList.add("d-none");

  //reset inputan di modal
  // document
  //   .querySelectorAll("#itemsContainer > .partitems")
  //   .forEach((itemCard, index) => {
  //     itemCard.querySelector('[name="deliveryunit"]').value = "";

  //     if (index != 0) {
  //       itemCard.remove(); // Langsung remove elemen ke-2 dan seterusnya
  //       itemIndex = 1;
  //     }
  //   });
});

//////////////////////////////////universal

// function loadingpopup() {
//   Swal.fire({
//     title: "Loading ...",
//     allowOutsideClick: false,
//     html: '<progress id="loadingpersenpopoups" value="20" max="100" style="width:100%"> </progress>',
//     showConfirmButton: false,
//   });
//   //Swal.showLoading();
// }
// function warningpopup(icon, title) {
//   Swal.fire({
//     icon: icon,
//     title: "",
//     text: title,
//     showConfirmButton: false,
//     timer: 1500,
//   });
// }
//////
function reloadnewdata() { }

// function menuarrowklik(id) {
//   if (
//     document.getElementById("klikhidebar").className !=
//     "bi bi-caret-right-fill toggle-btn"
//   ) {
//     if (
//       document.getElementById(id).className ==
//       "bi bi-caret-down-fill hide-on-collapse"
//     ) {
//       document.getElementById(id).className =
//         "bi bi-caret-up-fill hide-on-collapse";
//       $(`#${id}-extend`).show();
//     } else {
//       document.getElementById(id).className =
//         "bi bi-caret-down-fill hide-on-collapse";
//       $(`#${id}-extend`).hide();
//     }
//   }
// }
////////
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
