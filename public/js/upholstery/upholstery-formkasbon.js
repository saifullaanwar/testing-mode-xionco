var username;
var namalengkap;
var $progress = $("#nav-loading");
var $progressBar = $(".progress-bar");
var gethumburger;
//console.log=function(){};

var ismobile = "n";
document.addEventListener("DOMContentLoaded",async function () {
  const inputNominalEl = document.getElementById("inputNominalModal");
  const kasbonInfoEl = document.getElementById("kasbonInfoModal");

inputNominalEl.addEventListener(
  "input",
  debounce(function () {
    const itemsdata = window.itemsdata || [];
    validatePartial(itemsdata);

    const totalApprovedNominal = window.totalApprovedNominal || 0;
    const maxPartial = totalApprovedNominal * 0.3;
    const maxAdvance = 3000000;

    const tipeKasbonRadio = document.querySelector('input[name="kasbonTypeModal"]:checked');
    const tipeKasbon = tipeKasbonRadio ? tipeKasbonRadio.value : null;

    kasbonInfoEl.style.display = "block";
    document.getElementById("totalApprovalDisplayModal").textContent = formatRupiah(totalApprovedNominal);
    document.getElementById("maxPartialDisplayModal").textContent = formatRupiah(maxPartial);

    const inputNominal = parseFloat(inputNominalEl.value.replace(/[^0-9.]/g, "")) || 0;

      // Jika belum pilih tipe kasbon
    if (!tipeKasbon) {
      inputNominalEl.classList.remove("kasbon-warning");
      inputNominalEl.classList.add("kasbon-warning");
      warningpopup("warning", "Pilih tipe pengajuan kasbon terlebih dahulu!");
      return;
    } else {
      inputNominalEl.classList.remove("kasbon-warning"); // bersihkan warning jika sudah pilih tipe
    }

    // Jika input nominal tidak valid
    if (isNaN(inputNominal) || inputNominal <= 0) return;

    // Validasi sesuai tipe kasbon
    if (tipeKasbon === "advanceIdModal" && inputNominal > maxAdvance) {
      warningpopup("warning", "Limit Advance maksimal Rp 3.000.000.");
      inputNominalEl.focus();
      return;
    }

    if (tipeKasbon === "partialIdModal" && inputNominal > maxPartial) {
      warningpopup(
        "warning",
        `Nominal melebihi batas maksimal Partial (${formatRupiah(maxPartial)}).`
      );
      inputNominalEl.focus();
      return;
    }


    // ✅ Nominal valid, tidak perlu trigger ulang
    // console.log("[DEBUG] Valid input for", tipeKasbon);
  }, 300)
);

  
  cekdatausersorout();
  showfotvidmodal();

  //fix modal error
  document.addEventListener("hide.bs.modal", function (event) {
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

  document.getElementById("inputNameModal").value = namalengkap;

  // var dataarray = JSON.parse(document.getElementById("itemalls").dataset.json);
  // console.log(dataarray);
  //additemdropfilter(dataarray.itemsdata);
  //showtabel(dataarray.dataadminlist);
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
      showtabel(dataarray.dataadminlist);


    })

}

///////////
function hitungtugassaya(array) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);


  console.log("alll ");
  console.log(dataarray);

  const jumlahProsesProduksi = dataarray.dataadminlist.filter(
    (element) =>
      element.status.toLowerCase().includes("proses produksi") &&
      element.stockprodukcode === "" &&
      element.code2.toLowerCase() === "up" &&
      element.upholstery_jadi != "true" &&
      element.forcedsent != "true"
  ).length;

  var arraystocks = dataarray.stockupholsterydatabase;

  console.log("alll arraystocks");
  console.log(arraystocks.length);

  const jumlahProsesProduksistock = arraystocks.filter(
    (element) =>
      element.qty != "0" &&
      element.upholstery_selesaibuatstock === "" &&
      element.fixcreatein != "instocked"
  ).length;

  //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;
  document.querySelectorAll('[name="totaltugassayapesanan"]').forEach((el) => {
    el.textContent = `(${jumlahProsesProduksi})`;
  });
  document
    .querySelectorAll('[name="totaltugassayapesananstock"]')
    .forEach((el) => {
      el.textContent = `(${jumlahProsesProduksistock})`;
    });

  document.querySelectorAll('[name="totaltugassayaall"]').forEach((el) => {
    el.textContent = `${jumlahProsesProduksi + jumlahProsesProduksistock}`;
  });
}

///////////

function loadingbawahupdate(array) {
  /* var fixawals=[];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.code2.toLowerCase()=='up'&&element.upholstery_jadi!='true'&&element.stockprodukcode!='true'&&!element.deliveryunit.toLowerCase().includes('third party')) {
        fixawals.push(element);
        }
    } */

  $progressBar.css("width", "0%");
  $progress.show();
  setTimeout(function () {
    /* var modaldut=['modaldetail','modalklikjadi']
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
socket.on("newadditemadminlist", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  console.log("datas ====");
  console.log(datas);

  //var fixarrays=dataarray.dataadminlist;
  for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    dataarray.dataadminlist.unshift(element);
  }
      window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

  console.log("dataarray.dataadminlist ====");
  console.log(dataarray.dataadminlist);
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("neweditfullitemadminlist", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

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

     window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);


  console.log("edit item [3]");
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("newquickedititemadminlist", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

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

           window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

      //updatecarditem(datas,'newquickedititemadminlist');
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("newapprovalforcestatuss", function (datas) {
  console.log("reload approval force status");
  console.log(datas);
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  var dataupdateds = dataarray.dataadminlist;
  for (let i = 0; i < dataupdateds.length; i++) {
    const element = dataupdateds[i];
    if (element.id_transaksi == datas.id_transaksi) {
      if (
        element.status.toLowerCase() != "selesai" &&
        element.status.toLowerCase() != "dibatalkan"
      ) {
        if (datas.approveorreject == "approve") {
          dataupdateds[i].status =
            datas.history[0].tindakan == "Approved Force Sent"
              ? "Selesai"
              : datas.history[0].tindakan == "Approved Force Cancel"
              ? "Dibatalkan"
              : datas.history[0].tindakan == "Approved Force Pending"
              ? "Pending"
              : "Priority";
          var oldhistoriesy = JSON.parse(element.history);
          const combined = [...datas.history, ...oldhistoriesy];

          dataupdateds[i].history = JSON.stringify(combined);

          console.log(oldhistoriesy);
          console.log(dataupdateds[i].history);

          console.log("reload dataupdateds force status");
          console.log(dataupdateds);
          //document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
                    window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

        }
      } else {
        console.log("tidak terjadi forcestatus");
      }
    }
    //dattockup.push(element);
  }

  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("newprintpodo", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = datas.status;

      dataarray.dataadminlist[i].history = datas.history;

      dataarray.dataadminlist[i].print_podo = "true";

           window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("newpackde-kirimbahan", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = datas.history[0].details.status;

      dataarray.dataadminlist[i].packde_kirimbahan = "true";
      dataarray.dataadminlist[i].packde_kirimbahan_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

           window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("newpackdereject-ambil", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = "Proses Produksi (Re)";

      dataarray.dataadminlist[i].upholstery_jadi = "";
      dataarray.dataadminlist[i].approval_produkjadi = "";
      dataarray.dataadminlist[i].reject_ambil_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

           window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("newpackdereject-qc", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].status = "Proses Produksi (Re)";

      dataarray.dataadminlist[i].upholstery_jadi = "";
      dataarray.dataadminlist[i].approval_produkjadi = "";
      dataarray.dataadminlist[i].packde_ambil = "";
      dataarray.dataadminlist[i].reject_qc_img = datas.folderfoto;

      dataarray.dataadminlist[i].history = datas.history;

           window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("newupholsteryselesai", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);


  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      //dataarray.dataadminlist[i].status='Selesai dibuat';
      //dataarray.dataadminlist[i].history=datas.history;
      dataarray.dataadminlist[i].status = datas.history[0].details.status;

      dataarray.dataadminlist[i].upholstery_jadi = "true";
      dataarray.dataadminlist[i].upholstery_img = datas.filenamesupload;

      dataarray.dataadminlist[i].history = datas.history;

      //dataarray.dataadminlist.splice(i,1);
           window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

      //document.getElementById(datas.id_transaksi).remove();
      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("newdriverreject-ambil", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

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

           window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

socket.on("newdriverreject-terimakonsumen", function (datas) {
    var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

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

           window.dataall = dataarray;    // document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

      //updatecarditem(datas,'newupholsteryselesai');
    }
  }
  loadingbawahupdate(dataarray.dataadminlist);
});

function updatecarditem(arrays, ketedit) {
  if (ketedit == "neweditfullitemadminlist") {
    //olnotransaksi
    document.getElementById(arrays.olnotransaksi).id = arrays.id_transaksi; // ganti id transaksi
    /*  document.getElementById(`status-${arrays.olnotransaksi}`).innerHTML=arrays.status; */
    document.getElementById(`notransaksi-${arrays.olnotransaksi}`).innerHTML =
      arrays.no_transaksi;
    document.getElementById(`buyername-${arrays.olnotransaksi}`).innerHTML =
      arrays.buyername;
    document.getElementById(`finalprice-${arrays.olnotransaksi}`).innerHTML =
      formatMoney(arrays.finalprice);
    document.getElementById(`orderdate-${arrays.olnotransaksi}`).innerHTML =
      arrays.order_date;
    document.getElementById(`item-${arrays.olnotransaksi}`).innerHTML =
      arrays.item;
    document.getElementById(`colorvarian-${arrays.olnotransaksi}`).innerHTML =
      arrays.colorvariant;
    document.getElementById(
      `qty-${arrays.olnotransaksi}`
    ).innerHTML = `${arrays.qty} X UNIT`;
    document.getElementById(`notes-${arrays.olnotransaksi}`).value =
      arrays.notes;
    document.getElementById(
      `detailklik-${arrays.olnotransaksi}`
    ).id = `detailklik-${arrays.id_transaksi}`;
    document.getElementById(
      `quickedit-${arrays.olnotransaksi}`
    ).id = `quickedit-${arrays.id_transaksi}`;
    document.getElementById(
      `forcestatus-${arrays.olnotransaksi}`
    ).id = `forcestatus-${arrays.id_transaksi}`;
  } else if (ketedit == "newquickedititemadminlist") {
    document.getElementById(`finalprice-${arrays.id_transaksi}`).innerHTML =
      formatMoney(arrays.finalprice);
    document.getElementById(`orderdate-${arrays.id_transaksi}`).innerHTML =
      arrays.order_date;
    document.getElementById(`item-${arrays.id_transaksi}`).innerHTML =
      arrays.item;
    document.getElementById(`colorvarian-${arrays.id_transaksi}`).innerHTML =
      arrays.colorvariant;
    document.getElementById(
      `qty-${arrays.id_transaksi}`
    ).innerHTML = `${arrays.qty} X UNIT`;
    document.getElementById(`notes-${arrays.id_transaksi}`).value =
      arrays.notes;
  } else if (ketedit == "newupholsteryselesai") {
    document.getElementById(`status-${arrays.id_transaksi}`).innerHTML =
      "Selesai dibuat";
  }
}

//////////////// tutup socket ////////////////////

// Menampilkan table
function showtabel(array,awalnotif=false) {
  // let dataarray = JSON.parse(document.getElementById("itemalls").dataset.json)
  // console.log(dataarray)

  var myobj = document.getElementById("divhpsdata");
  if (myobj) myobj.remove();

  var datatab = document.getElementById(`alldattab`);

  var divhapus = document.createElement("tbody");
  divhapus.setAttribute("id", "divhpsdata");

  console.log("array ========");
  console.log(array);

  divhapus.innerHTML = returnarray(array, "awal");

  datatab.appendChild(divhapus);
  
  if (awalnotif==false) {
    getceknotif();
  }

  setTimeout(function () {
    /* if (gethumburger.tipeuser.toLowerCase()=='supervisor') {
          hitungtugassaya();
      } */
    hitungtugassaya();
    if (Array.isArray(window.itemsdata)) {
      validatePartial(window.itemsdata);
    }
    document.getElementById("showmainpage").removeAttribute("style");
    document
      .getElementById("loadingskeleton")
      .setAttribute("style", "display:none;");
  }, 500);
}

// Return Array lopping
function returnarray(array, mode) {
  // Ambil database dari data JSON
  const modalUpholstery = document.getElementById('modalUpholstery');
      var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  let database_invoicevendor = dataarray.database_invoicevendor;
  console.log(database_invoicevendor);

  // Jika data kosong
  if (
    !Array.isArray(database_invoicevendor) ||
    database_invoicevendor.length === 0
  ) {
    return `
      <tr>
        <td colspan="6" style="text-align:center;">Tidak ada data kasbon</td>
      </tr>
    `;
  }

  // Gabungkan semua kasbon ke dalam satu array
  let allKasbon = [];

  database_invoicevendor.forEach(function (element) {
    let listKasbon = [];

    try {
      listKasbon =
        typeof element.list_kasbon === "string"
          ? JSON.parse(element.list_kasbon)
          : element.list_kasbon || [];
    } catch (e) {
      listKasbon = [];
    }

    if (listKasbon.length === 0) {
      allKasbon.push({
        tglinputmili: element.tglinputmili || 0,
        id_invoice: element.id_invoice || "-",
        requester: "-",
        nominal: 0,
        tipe: "-",
        approval: "",
        status: element.settled ? "settled" : "pending",
        settled: element.settled || false,
      });
    } else {
      listKasbon.forEach(function (kasbon) {
        allKasbon.push({
          tglinputmili: kasbon.tglinputmili || element.tglinputmili || 0,
          id_invoice: element.id_invoice || "-",
          requester: kasbon.requester || "-",
          nominal: kasbon.nominal || 0,
          tipe: kasbon.tipe || "-",
          approval: kasbon.approval || "", // Tambahkan ini
          status: kasbon.status || "", // Masih dipertahankan untuk fallback
          settled: element.settled || false,
        });
      });
    }
  });

  // Urutkan dari terbaru ke terlama
  allKasbon.sort((a, b) => b.tglinputmili - a.tglinputmili);

  // Render baris HTML
  let rows = allKasbon.map(function (kasbon, index) {
    let tgl = kasbon.tglinputmili
      ? new Date(Number(kasbon.tglinputmili)).toLocaleDateString("id-ID")
      : "-";

    let nominal = kasbon.nominal
      ? `Rp. ${Number(kasbon.nominal).toLocaleString("id-ID")}`
      : "-";

    let statusBadge = "";

    // Gunakan properti `approval` jika tersedia, fallback ke `status`
    const approvalStatus = (kasbon.approval || "").toString().toLowerCase();
    const statusText = (kasbon.status || "").toString().toLowerCase();

    if (approvalStatus === "false" || statusText === "reject") {
      statusBadge = `<span class="text-white p-1 rounded badge text-bg-danger border-0">Reject</span>`;
    } else if (
      approvalStatus === "true" ||
      statusText === "approval" ||
      statusText === "approved"
    ) {
      statusBadge = `<span class="text-white p-1 rounded badge text-bg-success border-0">Approval</span>`;
    } else if (kasbon.settled || statusText === "settled") {
      statusBadge = `<span class="text-white p-1 rounded badge text-bg-primary border-0">Settled</span>`;
    } else {
      statusBadge = `<span class="text-white p-1 rounded badge text-bg-secondary border-0">Pending</span>`;
    }

    if(index <= 49) {
      if (kasbon.nominal!=0) {
        return `
          <tr>
            <td class="text-center">${tgl}</td>
            <td class="text-truncate text-center">${kasbon.id_invoice}</td>
            <td class="text-truncate text-center">${kasbon.requester}</td>
            <td class="text-truncate text-end">${nominal}</td>
            <td class="text-truncate text-center">${kasbon.tipe}</td>
            <td class="text-truncate text-center">${statusBadge}</td>
          </tr>
        `;
      }
      
    }
    
  });

  return rows.join("");
}

/**
 * debounce
 * Fungsi pembantu untuk menunda eksekusi sampai user berhenti mengetik selama beberapa ms
 * @param {Function} func - Fungsi yang akan ditunda
 * @param {number} delay - Waktu delay dalam milidetik
 */
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * validasiKarakter
 * Membersihkan input nominal dari karakter titik (.)
 */
function validasiKarakter(e) {
  document.getElementById("inputNominalModal").value = e.value.replaceAll(/\./g, "");
  console.log("[DEBUG] Input Nominal Validasi Karakter================");
}

/**
 * formatRupiah
 * Mengubah angka menjadi format Rupiah Indonesia
 * @param {number} angka
 * @returns {string}
 */
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

/**
 * validatePartial
 * Mengecek dan menghitung total nominal UP yang sudah di-approve dalam minggu berjalan (Minggu–Sabtu)
 * @param {Array} itemsdata - Data referensi produk
 */
// Fungsi ini digunakan untuk memvalidasi data transaksi (partial approval) berdasarkan item yang disetujui dalam minggu ini.
// Hasil akhirnya adalah menghitung total nominal UP yang disetujui dan menampilkannya di tampilan (DOM).

function validatePartial(itemsdata) {
  // Ambil data dari elemen HTML dan parsing JSON
  var dataarray = window.dataall;   //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

  const databaseadminlist = dataarray.dataadminlist || [];

  let partialThisWeek = [];
  let totalApprovedNominal = 0;

  // Tentukan awal dan akhir minggu ini (Minggu - Sabtu)
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Loop seluruh data
  databaseadminlist.forEach((item, index) => {
    if (
      item.code2 === "UP" &&
      item.stockprodukcode !== "true" &&
      item.approval_produkjadi === "true" &&
      item.history
    ) {
      let histories = [];
      try {
        const sanitized = item.history.replace(/[\u0000-\u001F]+/g, " ");
        histories = JSON.parse(sanitized);
      } catch (err) {
        console.warn(`[DEBUG] Gagal parsing history index ${index}`, err);
        return;
      }

      // Temukan history approval
      const approvedEntry = histories.find((h) =>
        h.details?.status?.toLowerCase().includes("produk di-approve")
      );
      if (!approvedEntry) return;

      const detail = approvedEntry.details || {};
      const approvalDateMili = Number(
        detail.tglinputmili_approval || detail.tglinputmili || item.tglinputmili
      );
      const approvalDate = new Date(approvalDateMili);

      // Cek apakah approval masih dalam minggu ini
      if (approvalDate < startOfWeek || approvalDate > endOfWeek) return;

      // Simpan data sementara
      partialThisWeek.push({
        ...item,
        approvalDate,
        tglinputmili_approval: approvalDateMili,
      });
    }
  });

  // Validasi filter data
  let databaseItem = dataarray.itemsdata;
  databaseItem.forEach((item) => {
    for (let i = 0; i < partialThisWeek.length; i++) {
      const element = partialThisWeek[i];
      if (item.product == element.item) {
        if (element.colorvariant.toLowerCase().includes("fabric")) {
          partialThisWeek[i].totalApprovedNominal = item.price_fabric;
        } else {
          partialThisWeek[i].totalApprovedNominal = item.price_leather;
        }
      }
    }
  });

  // Hitung totalApprovedNominal dari seluruh partialThisWeek dengan reduce
  totalApprovedNominal = partialThisWeek.reduce((sum, obj) => {
    return (
      sum +
      (Number(parseInt(obj.totalApprovedNominal) * parseInt(obj.qty)) || 0)
    );
  }, 0);

  console.log("totalApprovedNominal");
  console.log(totalApprovedNominal);

  // Simpan ke global
  window.totalApprovedNominal = totalApprovedNominal;
  window.partialThisWeek = partialThisWeek;

  // Tampilkan hasil di DOM
  document.getElementById("totalApprovalDisplayModal").textContent =
    formatRupiah(totalApprovedNominal);
  document.getElementById("maxPartialDisplayModal").textContent = formatRupiah(
    totalApprovedNominal * 0.3
  );

  // Log hasil akhir
  console.log("[DEBUG] Total Approved Nominal:", totalApprovedNominal);
  console.log("[DEBUG] Total Item Minggu Ini:", partialThisWeek.length);
  console.log("[DEBUG] 🔍 Data final:", partialThisWeek);
}

/**
 * Trigger Advance Validation
 */
function triggerAdvanceValidation() {
  const inputNominal = parseFloat(
    document.getElementById("inputNominalModal").value.replace(/[^0-9.]/g, "")
  );
  const maxAdvance = 3000000;

  if (inputNominal > maxAdvance) {
    warningpopup("warning", `Limit Advance maksimal Rp ${formatRupiah(maxAdvance)}.`);
  }
}


/**
 * Trigger Partial Validation
 */
function triggerPartialValidation() {
  const inputNominal = parseFloat(
    document.getElementById("inputNominalModal").value.replace(/[^0-9.]/g, "")
  );
  const totalApprovedNominal = window.totalApprovedNominal || 0;
  const maxPartial = totalApprovedNominal * 0.3;

  if (inputNominal > maxPartial) {
    warningpopup("warning", `Nominal ${formatRupiah(inputNominal)} melebihi limit Partial 30% (${formatRupiah(maxPartial)}).`);
  }
}


/**
 * Event handler submit form kasbon
 * Validasi input, cek limit, dan siapkan data untuk dikirim ke backend
 */
document.getElementById("formKasbonModal").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputNominal = parseFloat(
    document.getElementById("inputNominalModal").value.replace(/[^0-9.]/g, "")
  );
  const inputNameModal = document.getElementById("inputNameModal").value;
  const tipeKasbonRadio = document.querySelector(
    'input[name="kasbonTypeModal"]:checked'
  );

  if (!tipeKasbonRadio) {
    warningpopup("warning", "Pilih tipe kasbon terlebih dahulu.");
    return;
  }
  const tipeKasbon = tipeKasbonRadio.value;

  if (isNaN(inputNominal) || inputNominal <= 0) {
    warningpopup("warning", "Nominal harus diisi dengan benar.");
    return;
  }

  const tglinputmili = Date.now();
  const id_invoice = generateInvoiceId(tglinputmili);

  const totalApprovedNominal = window.totalApprovedNominal || 0;
  const tglinputmili_approval =
    window.partialThisWeek?.[0]?.tglinputmili_approval || null;

  if (tipeKasbon === "partialIdModal") {
    const persenParsial = 0.3;
    const maxPartial = totalApprovedNominal * persenParsial;
    document.getElementById("kasbonInfoModal").style.display = "block";
    document.getElementById("totalApprovalDisplayModal").textContent =
      formatRupiah(totalApprovedNominal);
    document.getElementById("maxPartialDisplayModal").textContent =
      formatRupiah(maxPartial);

    if (inputNominal > maxPartial) {
      warningpopup(
        "warning",
        `Nominal ${formatRupiah(
          inputNominal
        )} melebihi limit 30% (${formatRupiah(maxPartial)}).`
      );
      return;
    }
  }

  if (tipeKasbon === "advanceIdModal" && inputNominal > 3000000) {
    warningpopup("warning", "Limit Advance maksimal 3 juta.");
    return;
  }

  const dataRequester = {
    id_req: "1",
    requester: inputNameModal,
    nominal: inputNominal,
    tipe: tipeKasbon === "option1" ? "Advance" : "Partial",
    approval: "",
    tglinputmili,
    tglinputmili_approval:
      tipeKasbon === "option2" ? tglinputmili_approval : null,
    username,
  };

  const result = {
    id_invoice,
    data_req: dataRequester,
  };

  // console.log("[DEBUG] ✅ Data Final:", result);
  //warningpopup("success", "Pengajuan kasbon berhasil diajukan.", result);
  loadingpopup();
  fizsave(result); // aktifkan jika sudah siap
});

//SEND REQUEST BE
//var xi ="Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==";

function fizsave(result) {
  fetch("/finance/savesubmitkasbon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: xi,
    },
    body: JSON.stringify({ result }),
  })
    .then((response) => response.json())
    .then((resdat) => {
      console.log("resdat");
      console.log(resdat);

      var valueload = 90;
      setTimeout(function () {
        Swal.getHtmlContainer().querySelector("#loadingpersenpopoups").value =
          valueload - 10;
        setTimeout(function () {
          Swal.getHtmlContainer().querySelector("#loadingpersenpopoups").value =
            valueload;

          if (resdat.icons == "success") {
            warningpopup("success", "Pengajuan kasbon berhasil diajukan");

            //socket.emit('approvereqbeli',additemreqproc);
            location.reload();
          } else {
            warningpopup("error", resdat.texts);
          }
        }, 800);
      }, 2000);
    })
    .catch((error) => {
      console.error("Error:", error);
      warningpopup("error", "error catch : " + error);
    });
}

//generate id invoice vendor up payment
function generateInvoiceId(timestamp) {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    throw new Error("Timestamp tidak valid. Harus angka milidetik.");
  }

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11
  const monthCodes = "ABCDEFGHIJKL"; // A=Jan, B=Feb, ...
  const monthCode = monthCodes[month];

  // Cari Minggu pertama di bulan ini
  const firstDayOfMonth = new Date(year, month, 1);
  const firstSundayOfMonth = new Date(firstDayOfMonth);
  firstSundayOfMonth.setDate(
    1 + ((7 - firstDayOfMonth.getDay()) % 7) // geser ke Minggu pertama
  );

  // Jika tanggal sebelum Minggu pertama bulan ini → minggu terakhir bulan sebelumnya
  if (date < firstSundayOfMonth) {
    const prevMonthDate = new Date(year, month, 0); // hari terakhir bulan sebelumnya
    return generateInvoiceId(prevMonthDate.getTime()); // rekursif, pakai milidetik
  }

  // Selisih hari dari Minggu pertama
  const diffDays = Math.floor(
    (date - firstSundayOfMonth) / (1000 * 60 * 60 * 24)
  );

  // Hitung minggu dengan Math.floor
  const weekNumber = Math.floor(diffDays / 7) + 1;

  return `${monthCode}${weekNumber}-${year}`;
}


/////////////////////////universal/////////////////////

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
function reloadnewdata() {
  var xhrzx = new XMLHttpRequest();

  xhrzx.open("GET", `/adminlist/reloaded`);
  xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhrzx.setRequestHeader("authorization", xi);
  //xhrzx.send(JSON.stringify(data));
  xhrzx.addEventListener("load", () => {
    var resdat = JSON.parse(xhrzx.responseText);
  });
}

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
  //dataextracharge.length=0;
  var myModalEl = document.getElementById(modalid);
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
}
/* $('#modaldetail').on('hidden.bs.modal', function (e) {
  // do something...
 
}); */
/* $("#modalklikeditref").on('show.bs.modal', function () {

}); */
