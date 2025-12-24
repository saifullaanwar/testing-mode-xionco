var username;
var namalengkap;
var $progress = $('.progress');
var $progressBar = $('.progress-bar');

//console.log=function(){};

var ismobile = 'n';
document.addEventListener('DOMContentLoaded', async function () {
  // cekdatausersorout();
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
  }

  scrolltobuttonsidebar();

  // var dataarray = window.dataall; //  const dataarray = JSON.parse(document.getElementById('itemalls').innerHTML);
  // cekdata(dataarray);
  fetchdata()
  //window.open('/driver', '_self')
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
      const dataadminlist = dataarray.dataadminlist
      const status_hours = dataarray.status_hours
      console.log("%c[DATA] Jumlah data adminlist:", "color: cyan", dataadminlist.length);
      console.log("%c[DATA] Konfigurasi status_hours:", "color: orange", status_hours);


      const hasilClassy = hitungStatusPengirimanClassy(dataadminlist, status_hours);

      console.log('hasilClassy=================', hasilClassy);



      const totalJumlah = hitungTotalJumlah(hasilClassy);
      console.log('totalJumlah ========', totalJumlah);

      const warningLimit = 10;
      const terlambatLimit = 10;

      // const jumlahInProgress = hasilClassy.in_progress.length;
      // const jumlahWarning = hasilClassy.warning.length;
      // const jumlahKeterlambatan = hasilClassy.keterlambatan.length;

      const jumlahInProgress = totalJumlah.ongoing - totalJumlah.warning - totalJumlah.delayed;
      const jumlahWarning = totalJumlah.warning;
      const jumlahKeterlambatan = totalJumlah.delayed;

      // Ambil elemen UI
      const elInProgress = document.getElementById("totalInProgress");
      const elWarning = document.getElementById("totalWarning");
      const elTerlambat = document.getElementById("totalTerlambat");

      // Tampilkan dengan animasi
      animateCount(elInProgress, jumlahInProgress);
      animateCount(elWarning, jumlahWarning, warningLimit);
      animateCount(elTerlambat, jumlahKeterlambatan, terlambatLimit);

      // Efek visual jika melebihi limit
      if (jumlahWarning >= warningLimit) {
        elWarning.classList.add("kedap-kedip", "warning-alert");
        elWarning.setAttribute("title", "📢 Warning penuh! Segera cek item.");
      }

      if (jumlahKeterlambatan >= terlambatLimit) {
        elTerlambat.classList.add("kedap-kedip", "terlambat-alert");
        elTerlambat.setAttribute("title", "🚨 Terlambat penuh! Harus segera ditindak.");
      }

    }).catch(err => {
      console.error("Gagal memuat data adminlist:", err);
    })
}



/**
 * Fungsi untuk menghitung tugas keterlambatan
 */


// Fungsi untuk hitung total jumlah dari setiap kategori
function hitungTotalJumlah(obj) {
  const hasilTotal = {};
  for (const kategori in obj) {
    let total = 0;
    for (const key in obj[kategori]) {
      const item = obj[kategori][key];
      if (item && typeof item.jumlah === 'number') {
        total += item.jumlah;
      }
    }
    hasilTotal[kategori] = total;
  }
  return hasilTotal;
}

function hitungStatusPengirimanClassy(dataadminlist, status_hoursdata) {
  //ambil data orderdate_mili mulai juli 2025 dst
  //Buat tanggal batas: 1 Juli 2025
  const batasAwal = new Date('2025-07-01').getTime();

  //var datatransaksi = dataadminlist;
  var datatransaksi_0 = dataadminlist.filter(item => item.orderdate_mili >= batasAwal);
  datatransaksi_0.forEach(item => {
    try {
      if (typeof item.history === 'string') {
        item.history = JSON.parse(item.history);
      }
      // kalau sudah array/object, biarkan apa adanya
    } catch (error) {
      console.error('Gagal parse history:', item.history, error);
      item.history = []; // opsional: fallback ke array kosong
    }
  });

  const datatransaksi = datatransaksi_0;
  const status_hours = status_hoursdata;
  var totalorongoing = 'ongoing';

  console.log("🟩 MODE:", totalorongoing);

  // duplikasi dataadminlist agar tidak ubah aslinya
  datatransaksi.forEach(item => {
    if (Array.isArray(item.history)) {
      const newHistory = [];

      item.history.forEach(h => {
        newHistory.push(h); // tetap simpan entri asli

        // kalau statusnya Standby Pengiriman
        if (h.details && h.details.status === "Standby Pengiriman") {
          const copy = JSON.parse(JSON.stringify(h));
          copy.details.status = "New Standby Pengiriman";
          copy.details.tglinputmili = item.delivereddate_mili;
          newHistory.push(copy);
        }
      });

      // replace history di item asli
      item.history = newHistory;
    }
  });

  console.log('datatransaksi newData=======', datatransaksi);

  const ongoingLate = {
    "Supervisor": {},
    "Admin C5": {},
    "Admin Classy": {},
    "Driver": {},
    "Packde": {},
    "Upholstery": {},
  };

  const statusMap = {
    "Print PO-DO": "podo",
    "Pengiriman Bahan": "kirimbahan",
    "Proses Produksi": "produksi",
    "Selesai Produksi": "selesaiproduksi",
    "Proses QC dan Packing": "qcpacking",
    "Standby Pengiriman": "standbykirim",
    "Dalam Pengiriman": "dalampengiriman",
    "Selesai": "selesai",
  };

  const getStatusConfig = (statusName) =>
    status_hours.find((s) => s.status.toLowerCase() === statusName.toLowerCase());

  datatransaksi.forEach((transaksi) => {
    const code2Lower = transaksi.code2?.toLowerCase() || "";
    const isStockProduk = transaksi.stockprodukcode === "true" || transaksi.stockprodukcode === true;
    const isInHouse = transaksi.deliveryunit?.toLowerCase().includes("in-house") || false;

    const validStatusesC5 = isInHouse
      ? ["Proses QC dan Packing"]
      : ["Proses QC dan Packing", "Standby Pengiriman", "Dalam Pengiriman", "Selesai"];

    // ✅ Mode 1: ongoing (status terakhir saja)
    if (totalorongoing === "ongoing") {
      const statusName = transaksi.status;
      if (!statusName || statusName.toLowerCase() === "selesai") return;

      const startTime = getStartTimeForStatus(transaksi, statusName);
      const nextTime = getNextStatusTime(transaksi, statusName);
      const endTime = nextTime || getLastStatusTime(transaksi) || Date.now();

      const statusConfig = getStatusConfig(statusName);
      if (!statusConfig) return;
      const delay = calculateDelay(startTime, endTime, statusConfig);

      const role = tentukanRole(statusName, code2Lower, isStockProduk, isInHouse, validStatusesC5);
      if (!role) return;

      const fixedRole = roleMap(role);
      const statusKey = statusMap[statusName] || "lainnya";

      if (!ongoingLate[fixedRole][statusKey])
        ongoingLate[fixedRole][statusKey] = { jumlah: 0, durasi: 0, detail: [] };

      ongoingLate[fixedRole][statusKey].jumlah++;
      ongoingLate[fixedRole][statusKey].durasi += delay.durationHours;
      ongoingLate[fixedRole][statusKey].detail.push({
        ...transaksi,
        durationHours: delay.durationHours,
        lateHours: delay.lateHours,
        startTime,
        endTime,
      });
    }

    // ✅ Mode 2: total (loop semua status di history)
    else {
      if (!Array.isArray(transaksi.history)) return;
      transaksi.history.forEach((h, idx) => {
        const statusName = h.details.status;
        const next = transaksi.history[idx + 1];
        const startTime = Number(h.details.tglinputmili);
        const endTime = next ? Number(next.details.tglinputmili) : Date.now();

        const statusConfig = getStatusConfig(statusName);
        if (!statusConfig) return;

        const durationHours = (endTime - startTime) / 3600000;
        const lateHours = Math.max(0, durationHours - (statusConfig.max_hours + statusConfig.late_hours));

        const role = tentukanRole(statusName, code2Lower, isStockProduk, isInHouse, validStatusesC5);
        if (!role) return;

        const fixedRole = roleMap(role);
        const statusKey = statusMap[statusName] || "lainnya";

        if (!ongoingLate[fixedRole][statusKey])
          ongoingLate[fixedRole][statusKey] = { jumlah: 0, durasi: 0, detail: [] };

        ongoingLate[fixedRole][statusKey].jumlah++;
        ongoingLate[fixedRole][statusKey].durasi += durationHours;
        ongoingLate[fixedRole][statusKey].detail.push({
          ...transaksi,
          currentStatus: statusName,
          durationHours,
          lateHours,
          startTime,
          endTime,
        });
      });
    }
  });

  // Pembulatan
  for (const r in ongoingLate) {
    for (const s in ongoingLate[r]) {
      ongoingLate[r][s].durasi = parseFloat(ongoingLate[r][s].durasi.toFixed(2));
    }
  }

  console.log(`✅ ongoingLate (${totalorongoing})`, ongoingLate);
  // … lanjut ke bagian delayed dan render tabel seperti sebelumnya

  // Perhitungan keterlambatan (delayed)
  const delayed = {
    "Supervisor": {},
    "Admin C5": {},
    "Admin Classy": {},
    "Driver": {},
    "Packde": {},
    "Upholstery": {}
  };

  const rules = {
    "Print PO-DO": ["Pesanan dibuat", "Pengiriman Bahan"],
    "Pengiriman Bahan": ["Pengiriman Bahan", "Proses Produksi"],
    "Proses Produksi": ["Proses Produksi", "Selesai Produksi"],
    "Selesai Produksi": ["Selesai Produksi", "Produk di-approve"],
    "Proses QC dan Packing": ["Proses QC dan Packing", "Standby Pengiriman"],
    "Standby Pengiriman": ["Standby Pengiriman", "Dalam Pengiriman"],
    "Dalam Pengiriman": ["Dalam Pengiriman", "Selesai"]
  };

  /* for (const [roleName, roleData] of Object.entries(ongoingLate)) {
    for (const [statusKey, statusData] of Object.entries(roleData)) {
      const statusName = Object.entries(statusMap).find(([key, val]) => val === statusKey)?.[0];
      if (!statusName) continue;
      const statusInfo = status_hours.find(s => s.status.toLowerCase() === statusName.toLowerCase());
      if (!statusInfo) continue;

      for (const item of statusData.detail) {
        const history = item.history;
        if (!Array.isArray(history)) continue;

        let [start, end] = rules[statusName] || [];

        if (statusName === "Proses QC dan Packing" && item.stockprodukcode === "true") {
          start = "Pesanan dibuat";
          end = null;
        }

        if (statusName === "Proses QC dan Packing" && item.stockprodukcode !== "true") {
          start = "Pesanan dibuat";
          end = "Standby Pengiriman";
        }

        // ✅ untuk total, pastikan end = "Selesai"
        if (!end && totalorongoing !== "ongoing") end = "Selesai";

        const duration = getDurationBetween(history, start, end);
        if (duration && duration > (statusInfo.max_hours + statusInfo.late_hours)) {
          if (!delayed[roleName][statusKey]) delayed[roleName][statusKey] = { jumlah: 0, durasi: 0, detail: [] };
          delayed[roleName][statusKey].jumlah++;
          delayed[roleName][statusKey].durasi += Math.ceil(duration);
          delayed[roleName][statusKey].detail.push({
            ...item,
            durationHours: Math.ceil(duration),
            keterlambatanJam: Math.ceil(duration) - (statusInfo.max_hours + statusInfo.late_hours)
          });
        }
      }
    }
  } */
  for (const [roleName, roleData] of Object.entries(ongoingLate)) {
    for (const [statusKey, statusData] of Object.entries(roleData)) {
      const statusName = Object.entries(statusMap).find(([key, val]) => val === statusKey)?.[0];
      if (!statusName) continue;
      const statusInfo = status_hours.find(s => s.status.toLowerCase() === statusName.toLowerCase());
      if (!statusInfo) continue;

      for (const item of statusData.detail) {
        const history = item.history;
        if (!Array.isArray(history)) continue;

        let [start, end] = rules[statusName] || [];

        // 🧩 1️⃣ Produk stok (Admin C5)
        if (statusName === "Proses QC dan Packing" && item.stockprodukcode === "true") {
          start = "Pesanan dibuat";
          end = null;
        }

        // 🧩 2️⃣ Produk non-stok (Packde)
        if (statusName === "Proses QC dan Packing" && item.stockprodukcode !== "true") {
          start = "Pesanan dibuat";
          end = "Standby Pengiriman";
        }

        // 🧩 3️⃣ Driver - Standby Pengiriman pakai "New Standby Pengiriman"roleName === "Driver" && 
        if (statusName === "Standby Pengiriman") {
          start = "New Standby Pengiriman";
          end = "Dalam Pengiriman";
        }

        // ✅ untuk mode total, pastikan end = "Selesai"
        if (!end && totalorongoing !== "ongoing") end = "Selesai";

        const duration = getDurationBetween(history, start, end);
        if (duration && duration > (statusInfo.max_hours + statusInfo.late_hours)) {
          if (!delayed[roleName][statusKey])
            delayed[roleName][statusKey] = { jumlah: 0, durasi: 0, detail: [] };

          delayed[roleName][statusKey].jumlah++;
          delayed[roleName][statusKey].durasi += Math.ceil(duration);
          delayed[roleName][statusKey].detail.push({
            ...item,
            durationHours: Math.ceil(duration),
            keterlambatanJam: Math.ceil(duration) - (statusInfo.max_hours + statusInfo.late_hours)
          });
        }
      }
    }
  }

  console.log(`✅ DELAYED RESULT (${totalorongoing})`, delayed);


  ////////////////////////////////////////////
  // Perhitungan warning (mendekati terlambat)
  const warning = {
    "Supervisor": {},
    "Admin C5": {},
    "Admin Classy": {},
    "Driver": {},
    "Packde": {},
    "Upholstery": {}
  };

  for (const [roleName, roleData] of Object.entries(ongoingLate)) {
    for (const [statusKey, statusData] of Object.entries(roleData)) {
      const statusName = Object.entries(statusMap).find(([key, val]) => val === statusKey)?.[0];
      if (!statusName) continue;
      const statusInfo = status_hours.find(s => s.status.toLowerCase() === statusName.toLowerCase());
      if (!statusInfo) continue;

      for (const item of statusData.detail) {
        const history = item.history;
        if (!Array.isArray(history)) continue;

        let [start, end] = rules[statusName] || [];

        if (statusName === "Proses QC dan Packing" && item.stockprodukcode === "true") {
          start = "Pesanan dibuat";
          end = null;
        }

        if (statusName === "Proses QC dan Packing" && item.stockprodukcode !== "true") {
          start = "Pesanan dibuat";
          end = "Standby Pengiriman";
        }

        // 🧩 3️⃣ Driver - Standby Pengiriman pakai "New Standby Pengiriman"roleName === "Driver" && 
        if (statusName === "Standby Pengiriman") {
          start = "New Standby Pengiriman";
          end = "Dalam Pengiriman";
        }

        if (!end && totalorongoing !== "ongoing") end = "Selesai";

        const duration = getDurationBetween(history, start, end);
        // if (!duration) continue;

        // ⏰ Kondisi warning: melebihi max_hours tapi belum melewati max_hours + late_hours
        if (duration > statusInfo.max_hours && duration <= (statusInfo.max_hours + statusInfo.late_hours)) {
          if (!warning[roleName][statusKey]) warning[roleName][statusKey] = { jumlah: 0, durasi: 0, detail: [] };
          warning[roleName][statusKey].jumlah++;
          warning[roleName][statusKey].durasi += Math.ceil(duration);
          warning[roleName][statusKey].detail.push({
            ...item,
            durationHours: Math.ceil(duration),
            sisaJamMenujuTerlambat: (statusInfo.max_hours + statusInfo.late_hours) - Math.ceil(duration),
            batasMaks: statusInfo.max_hours,
            batasTerlambat: statusInfo.max_hours + statusInfo.late_hours
          });
        }
      }
    }
  }

  console.log(`⚠️ WARNING RESULT (${totalorongoing})`, warning);


  return { ongoing: ongoingLate['Driver'], delayed: delayed['Driver'], warning: warning['Driver'] };

}


function getDurationBetween(history, startStatus, endStatus) {
  if (!Array.isArray(history) || history.length === 0) return null;

  const start = [...history].reverse().find(h => h.details.status === startStatus);
  const end = endStatus ? [...history].reverse().find(h => h.details.status === endStatus) : null;

  if (start) {
    const startTime = Number(start.details.tglinputmili);
    const endTime = end ? Number(end.details.tglinputmili) : Date.now();
    return (endTime - startTime) / 3600000; // jam
  }
  return null;
}

// Fungsi bantu untuk role
function tentukanRole(statusName, code2Lower, isStockProduk, isInHouse, validStatusesC5) {
  if (code2Lower === "up" && statusName === "Produk di-approve") return "supervisor";
  if (["Print PO-DO", "Pengiriman Bahan"].includes(statusName) && ['up', 'non', ''].includes(code2Lower) && !isStockProduk)
    return "adminclassy";
  if (statusName === "Proses Produksi" && code2Lower === "up") return "upholstery";
  if (validStatusesC5.includes(statusName) && ["up", "fmcg", "non", ""].includes(code2Lower) && isStockProduk)
    return "adminc5";
  if (["Standby Pengiriman", "Dalam Pengiriman", "Selesai"].includes(statusName) &&
    ["up", "fmcg", "non", ""].includes(code2Lower) &&
    (!isStockProduk || (isStockProduk && isInHouse)))
    return "driver";
  if (["Proses QC dan Packing"].includes(statusName) && ['up', 'non', ''].includes(code2Lower) && !isStockProduk)
    return "packde";
  return "";
}

// Pemetaan role ke label
function roleMap(role) {
  return {
    adminc5: "Admin C5",
    adminclassy: "Admin Classy",
    driver: "Driver",
    packde: "Packde",
    upholstery: "Upholstery",
    supervisor: "Supervisor",
  }[role] || "";
}




/**
 * Ambil waktu mulai (tglinputmili) dari status tertentu — dari history terakhir dengan status tsb.
 */
function getStartTimeForStatus(transaksi, statusName) {
  if (!Array.isArray(transaksi.history)) return null;
  const hist = [...transaksi.history]
    .reverse()
    .find(h => h.details?.status?.toLowerCase() === statusName.toLowerCase());
  return hist ? hist.details.tglinputmili : null;
}

/**
 * Ambil waktu status berikutnya setelah statusName (dipakai untuk menghitung durasi status tersebut)
 */
const getNextStatusTime = (transaksi, statusName) => {
  if (!Array.isArray(transaksi.history)) return null;
  const lowerStatus = statusName.toLowerCase();
  const idx = transaksi.history.findIndex(
    h => h.details?.status?.toLowerCase() === lowerStatus
  );
  if (idx !== -1 && idx + 1 < transaksi.history.length) {
    const next = transaksi.history[idx + 1];
    if (next?.details?.tglinputmili) return next.details.tglinputmili;
  }
  return null;
};

/**
 * Ambil waktu terakhir dari history transaksi
 */
function getLastStatusTime(transaksi) {
  if (!Array.isArray(transaksi.history) || transaksi.history.length === 0) return null;
  const last = transaksi.history[transaksi.history.length - 1];
  return last.details?.tglinputmili || null;
}

/**
 * Hitung keterlambatan berdasarkan konfigurasi status
 */
function calculateDelay(startTimeMili, endTimeMili, statusConfig) {
  if (!startTimeMili || !endTimeMili || !statusConfig)
    return { isLate: false, lateHours: 0, warn: false, durationHours: 0 };

  const durationHours = (endTimeMili - startTimeMili) / (1000 * 60 * 60);
  const { max_hours, late_hours } = statusConfig;

  let isLate = false, warn = false;

  if (durationHours > max_hours + late_hours) {
    isLate = true;
  } else if (durationHours > max_hours) {
    warn = true;
  }

  const lateHours = isLate
    ? durationHours - (max_hours + late_hours)
    : warn
      ? durationHours - max_hours
      : 0;

  return { isLate, lateHours: parseFloat(lateHours.toFixed(2)), warn, durationHours: parseFloat(durationHours.toFixed(2)) };
}




const animateCount = (el, target, limit = null) => {
  let count = 0;
  const speed = Math.ceil(Math.max(target, 1) / 30);

  const step = () => {
    if (count < target) {
      count += speed;
      if (count > target) count = target;
      el.textContent = limit ? `${count}/${limit}` : `${count}`;
      requestAnimationFrame(step);
    } else {
      el.textContent = limit ? `${target}/${limit}` : `${target}`;
    }
  };

  step();
};


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

function warningpopup(icon, title) {
  Swal.fire({
    icon: icon,
    title: '',
    text: title,
    showConfirmButton: false,
    timer: 1500
  });
}
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
//--------------------------------
function hidemodal(modalid) {

  var myModalEl = document.getElementById(modalid);
  var modal = bootstrap.Modal.getInstance(myModalEl)
  modal.hide();
}
///--------------------------------
