var username;
var $progress = $('.progress');
var $progressBar = $('.progress-bar');

//console.log=function(){};

var ismobile = 'n';
document.addEventListener('DOMContentLoaded', async function () {

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
  console.log('usercek', usercek);
  if (usercek) {
    username = usercek;//localStorage.getItem('username'); 

    var namalengkap = JSON.parse(await dbs.get('datauser')).namalengkap;
    document.getElementById('namalengkap').innerHTML = namalengkap;
  }
  else {
    window.location.href = '/';
  }

  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    ismobile = 'y';
  }

  scrolltobuttonsidebar();

  // var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  // console.log(dataarray.dataadminlist);

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

var totalbulanini = 0;
var totalhariini = 0;
var totalkirimhariini = 0;

function cekdata(arrays) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);

  /////cek syarat data muncul
  var datac5 = dataarray.itemsdata;
  const mergedData = arrays.map(data => {
    const match = datac5.find(c5 => c5.product === data.item);
    return {
      ...data,
      stockprodukcode: match ? match.stockprodukcode : ''
    };
  });
  console.log('merge ----------');
  console.log(mergedData);
  var arraysz = [];
  for (let i = 0; i < mergedData.length; i++) {
    const element = mergedData[i];
    if (element.stockprodukcode.toLowerCase() == 'true') {
      //element.code2.toLowerCase()!='up'&&element.code2.toLowerCase()!='non'&&element.diterima_konsumen.toLowerCase()!='true'
      arraysz.push(element);
    }
  }
  console.log('merge arraysz ----------');
  console.log(arraysz);
  ////

  var datatoday = new Date();
  var day = ("0" + (datatoday.getDate())).slice(-2);
  var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
  var year = datatoday.getFullYear();

  var fixdatenow = day + "/" + month + "/" + year;

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

  var bulan = monthNames[new Date().getMonth()];
  var tahun = new Date().getFullYear();


  for (let i = 0; i < arraysz.length; i++) {
    const element = arraysz[i];
    if (`${element.bulan}${element.tahun}` == `${bulan}${tahun}`) {
      totalbulanini = totalbulanini + 1;
    }
    if (fixdatenow == element.order_date) {
      totalhariini = totalhariini + 1;
    }
    if (fixdatenow == element.delivered_date) {
      totalkirimhariini = totalkirimhariini + 1;
    }

  }

  document.getElementById('totalpesananshow').innerHTML = totalbulanini;
  document.getElementById('pesananhariinishow').innerHTML = totalhariini;
  document.getElementById('pesanandikirimshow').innerHTML = totalkirimhariini;


  document.getElementById('showmainpage').removeAttribute('style');
  document.getElementById('loadingskeleton').setAttribute('style', 'display:none;');

}

// const socket = io();
socket.on('newadditemadminlist', function (datas) {
  updatedatatotalpesanan(datas, true)
});

function updatedatatotalpesanan(array, awalnotif = false) {
  var dataarray = window.dataall;  //var dataarray=JSON.parse(document.getElementById('itemalls').innerHTML);
  var datac5 = dataarray.itemsdata;
  var dataitem = array;

  const match = datac5.find(c5 => c5.product === dataitem.item);

  const mergedData = {
    ...dataitem,
    c5ornot: match ? match.c5ornot : ''
  };

  console.log(mergedData);
  var datatoday = new Date();
  var day = ("0" + (datatoday.getDate())).slice(-2);
  var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
  var year = datatoday.getFullYear();

  var fixdatenow = day + "/" + month + "/" + year;

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

  var bulan = monthNames[new Date().getMonth()];
  var tahun = new Date().getFullYear();

  if (awalnotif == false) {
    getceknotif();
  }

  if (mergedData.stockprodukcode.toLowerCase() == 'true') {
    if (`${mergedData.bulan}${mergedData.tahun}` == `${bulan}${tahun}`) {
      totalbulanini = totalbulanini + 1;
    }
    if (fixdatenow == mergedData.order_date) {
      totalhariini = totalhariini + 1;
    }
    if (fixdatenow == mergedData.delivered_date) {
      totalkirimhariini = totalkirimhariini + 1;
    }

    document.getElementById('totalpesananshow').innerHTML = totalbulanini;
    document.getElementById('pesananhariinishow').innerHTML = totalhariini;
    document.getElementById('pesanandikirimshow').innerHTML = totalkirimhariini;
  }

}


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


  /*  datatransaksi_0.forEach(item => {
     const code2Lower = (item.code2 || "").toLowerCase();
     const stockprodukcode = (item.stockprodukcode || "").toLowerCase();
     const deliveredMili = item.delivereddate_mili;
 
     let valid = true;//false;
 
     // if (stockprodukcode !== "true") {
     //     if (["up", "non", ""].includes(code2Lower)) valid = true;
     // } else {
     //     if (["up", "non", "fmcg", ""].includes(code2Lower)) valid = true;
     // }
 
     if (valid && Array.isArray(item.history)) {
       item.history.forEach(h => {
         if (h.details && h.details.status === "Standby Pengiriman") {
           h.details.tglinputmili = deliveredMili;
         }
       });
     }
   }); */

  // console.log('datatransaksi =======', datatransaksi_0);

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

  // ✅ Proses utama per transaksi
  datatransaksi.forEach((transaksi) => {
    const code2Lower = transaksi.code2?.toLowerCase() || "";
    const isStockProduk = transaksi.stockprodukcode === "true" || transaksi.stockprodukcode === true;
    const deliveryUnit = transaksi.deliveryunit || "";

    const statusName = transaksi.status;
    if (!statusName || statusName.toLowerCase() === "selesai") return;

    const role = tentukanRole(statusName, code2Lower, isStockProduk, deliveryUnit);
    if (!role) return;

    const fixedRole = roleMap(role);
    const statusKey = statusMap[statusName] || "lainnya";

    const startTime = getStartTimeForStatus(transaksi, statusName);
    const nextTime = getNextStatusTime(transaksi, statusName);
    const endTime = nextTime || getLastStatusTime(transaksi) || Date.now();

    const statusConfig = getStatusConfig(statusName);
    if (!statusConfig) return;

    const delay = calculateDelay(startTime, endTime, statusConfig);

    // 🔹 Tambahkan ke ongoingLate
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
  });

  // ✅ Pembulatan durasi
  for (const roleName in ongoingLate) {
    for (const statusKey in ongoingLate[roleName]) {
      ongoingLate[roleName][statusKey].durasi = parseFloat(ongoingLate[roleName][statusKey].durasi.toFixed(2));
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

  var totalWarningC5 = 0;

  
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


  // Jika mau tampilkan hasil total warning C5:

  console.log(`⚠️ WARNING RESULT (${totalorongoing})`, warning);


  return { ongoing: ongoingLate['Admin C5'], delayed: delayed['Admin C5'], warning: warning['Admin C5'] };

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

function getDurationBetween_warning(history, startStatus, endStatus) {
  if (!Array.isArray(history) || history.length === 0) return null;

  // Urutkan history berdasarkan waktu ascending (lama → baru)
  const sortedHistory = [...history].sort(
    (a, b) => Number(a.details.tglinputmili) - Number(b.details.tglinputmili)
  );

  const start = sortedHistory.find(h => h.details.status === startStatus);
  const end = endStatus
    ? sortedHistory.find(h => h.details.status === endStatus)
    : null;

  if (!start) return null;

  const startTime = Number(start.details.tglinputmili);
  const endTime = end ? Number(end.details.tglinputmili) : Date.now();

  // Jika endTime lebih kecil (data belum sampai end), tetap hitung dari start ke sekarang
  const safeEndTime = endTime < startTime ? Date.now() : endTime;

  const duration = (safeEndTime - startTime) / 3600000; // jam
  return duration;
}

// Fungsi bantu untuk role
// ✅ Fungsi bantu: tentukan role berdasarkan status dan kondisi transaksi
function tentukanRole(statusName, code2Lower, isStockProduk, deliveryUnit) {
  const isInHouse = deliveryUnit?.toLowerCase().includes("in-house") || false;
  const isThirdParty = deliveryUnit?.toLowerCase().includes("third party") || false;

  // 🔹 ADMIN CLASSY
  if (["Print PO-DO", "Pengiriman Bahan"].includes(statusName) &&
    ['up', 'fmcg', 'non', ''].includes(code2Lower) &&
    !isStockProduk) {
    return "adminclassy";
  }

  // 🔹 ADMIN C5
  if (['up', 'fmcg', 'non', ''].includes(code2Lower) && isStockProduk) {
    if (statusName === "Proses QC dan Packing" && isInHouse) return "adminc5";
    if (["Proses QC dan Packing", "Standby Pengiriman", "Selesai"].includes(statusName) && isThirdParty) return "adminc5";
  }

  // 🔹 DRIVER
  if (["Standby Pengiriman", "Dalam Pengiriman", "Selesai"].includes(statusName) &&
    ['up', 'fmcg', 'non', ''].includes(code2Lower)) {
    if (!isStockProduk) return "driver";
    if (isStockProduk && isInHouse) return "driver";
  }

  // 🔹 PACKDE-STAFF
  if (statusName === "Proses QC dan Packing" &&
    ['up', 'fmcg', 'non', ''].includes(code2Lower) &&
    !isStockProduk) {
    return "packde";
  }

  // 🔹 UPHOLSTERY
  if (statusName === "Proses Produksi" &&
    code2Lower === "up" &&
    !isStockProduk) {
    return "upholstery";
  }

  // 🔹 SUPERVISOR
  // (status = Selesai Produksi dan history ada status "Produk di-approve")
  if (statusName === "Selesai Produksi" &&
    code2Lower === "up" &&
    !isStockProduk) {
    return "supervisor";
  }

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




// Perhitungan animasi
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

//////
// function menuarrowklik(id) {
//   if (document.getElementById('klikhidebar').className!='bi bi-caret-right-fill toggle-btn') {
//       if (document.getElementById(id).className=='bi bi-caret-down-fill hide-on-collapse') {
//           document.getElementById(id).className='bi bi-caret-up-fill hide-on-collapse';
//           $(`#${id}-extend`).show();
//       }else{
//           document.getElementById(id).className='bi bi-caret-down-fill hide-on-collapse';
//           $(`#${id}-extend`).hide();
//       }
//   }

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
  var myModalEl = document.getElementById(modalid);
  var modal = bootstrap.Modal.getInstance(myModalEl)
  modal.hide();
}
///--------------------------------
