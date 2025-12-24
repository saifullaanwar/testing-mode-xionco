var username;
var $progress = $('.progress');
var $progressBar = $('.progress-bar');

//console.log=function(){};

var ismobile = 'n';

document.addEventListener('DOMContentLoaded', async function () {
  cekdatausersorout();

  // Modal fix
  document.addEventListener('hide.bs.modal', function (event) {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  });

  // Autologin
  const usercek = await dbs.isLoggedIn();
  //localStorage.getItem('username') && localStorage.getItem('username') != ''
  console.log('usercek', usercek);
  if (usercek) {
    username = usercek;//localStorage.getItem('username'); 

    var namalengkap = JSON.parse(await dbs.get('datauser')).namalengkap;
    document.getElementById('namalengkap').innerHTML = namalengkap;
  } else {
    window.location.href = '/';
  }

  if (/Android|huawei|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
    ismobile = 'y';
  }
  scrolltobuttonsidebar();
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
      cekdata(dataarray.dataadminlist);
      cekandshowpekanini(dataarray.dataadminlist);
      hitungtugassaya(dataarray.dataadminlist);

      const hasilStatus = hitungStatusPengirimanClassy(dataarray.dataadminlist, dataarray.status_hours);


      console.log('hasilClassy=================', hasilStatus);



      const totalJumlah = hitungTotalJumlah(hasilStatus);
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

      ///

      if (window.location.href.includes('#pesananharini')) {
        flagopenpesananhariini = 1;
        var idos = ['semuapesanantombol', 'pesananharinitombol', 'pesananbermasalahtombol'];

        for (let i = 0; i < idos.length; i++) {
          const element = idos[i];
          if (element.includes('pesananharinitombol')) {

            document.getElementById(element).className = 'nav-link active';

          } else {
            document.getElementById(element).className = 'nav-link';
          }
        }
        var datatoday = new Date();
        var day = ("0" + (datatoday.getDate())).slice(-2);
        var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
        var year = datatoday.getFullYear();

        var fixdatenow = day + "/" + month + "/" + year;

        // additemdropfilter(dataarray.itemsdata);
        var fixit = cekpesananhariini(fixdatenow, dataarray.dataadminlist);
        // showtabel(fixit);

      } else {
        // additemdropfilter(dataarray.itemsdata);
        /* var fixawals=[];
        for (let i = 0; i < dataarray.dataadminlist.length; i++) {
          const element = dataarray.dataadminlist[i];
          if (element.code2.toLowerCase()=='up'&&element.upholstery_jadi!='true'&&element.stockprodukcode!='true'&&!element.deliveryunit.toLowerCase().includes('third party')) {
            fixawals.push(element);
          }
        } */
        // showtabel(dataarray.dataadminlist);
      }//&&!element.deliveryunit.toLowerCase().includes('third party')

      // Populate platform dropdown dynamically
      // const platformSelect = document.getElementById('filterplatform-select');

      // Clear existing options
      // platformSelect.innerHTML = '<option value="" selected disabled>Filter Platform</option><option value="">Semua Platform</option>';

      // Add options for each platform
      // dataarray.platformdata.forEach(platform => {
      //   const option = document.createElement('option');
      //   option.value = platform.platform.toLowerCase(); // Use lowercase for comparison
      //   option.textContent = platform.platform;  // Display platform name in the dropdown
      //   platformSelect.appendChild(option);
      // });
    })
    .catch(err => {
      console.error('Gagal ambil dataall:', err);
    });
}



///////////
function hitungtugassaya(array) {
  var dataarray = window.dataall; //  const dataarray = JSON.parse(document.getElementById('itemalls').innerHTML);

  console.log('alll ');
  console.log(dataarray);

  const jumlahProsesProduksi = array.filter(element =>
    element.status.toLowerCase().includes("proses produksi") && element.stockprodukcode === "" && element.code2.toLowerCase() === 'up' && element.upholstery_jadi != 'true' && element.forcedsent != 'true'
  ).length;

  var arraystocks = dataarray.stockupholsterydatabase;

  console.log('alll arraystocks');
  console.log(arraystocks.length);

  const jumlahProsesProduksistock = arraystocks.filter(element =>
    element.qty != '0' && element.upholstery_selesaibuatstock === '' && element.fixcreatein != 'instocked'
  ).length;

  //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;
  document.querySelectorAll('[name="totaltugassayapesanan"]').forEach(el => {
    el.textContent = `(${jumlahProsesProduksi})`;
  });
  document.querySelectorAll('[name="totaltugassayapesananstock"]').forEach(el => {
    el.textContent = `(${jumlahProsesProduksistock})`;
  });
  document.querySelectorAll('[name="totaltugassayaall"]').forEach(el => {
    el.textContent = `(${jumlahProsesProduksi + jumlahProsesProduksistock})`;
  });
}


//////////////////
var totbelumbulanini = 0;
var totsudahbulanini = 0;
var totalkirimhariini = 0;

var totbelumpekanini = 0;
var totsudahpekanini = 0;

function cekandshowpekanini(array) {
  var datafixs = filterCurrentWeekData(array);

  var fixdatbelumpekanini = [];
  for (let i = 0; i < datafixs.length; i++) {
    const element = datafixs[i];
    if (element.upholstery_jadi != 'true' && element.code2.toLowerCase() == 'up' && element.forcedsent != 'true') {
      fixdatbelumpekanini.push(element);
      totbelumpekanini = totbelumpekanini + 1;
    } else if (element.upholstery_jadi == 'true' && element.code2.toLowerCase() == 'up' && element.forcedsent != 'true') {
      totsudahpekanini = totsudahpekanini + 1;
    }
  }
  document.getElementById('totalpesananshow-belum-thisweek').innerHTML = totbelumpekanini;
  document.getElementById('totalpesananshow-sudah-thisweek').innerHTML = totsudahpekanini;

  document.getElementById('showmainpage').removeAttribute('style');
  document.getElementById('loadingskeleton').setAttribute('style', 'display:none;');
  // console.log(fixdatbelumpekanini);
}

function cekdata(arrays) {
  var datatoday = new Date();
  var day = ("0" + (datatoday.getDate())).slice(-2);
  var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
  var year = datatoday.getFullYear();

  var fixdatenow = day + "/" + month + "/" + year;

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

  var bulan = monthNames[new Date().getMonth()];
  var tahun = new Date().getFullYear();

  for (let i = 0; i < arrays.length; i++) {
    const element = arrays[i];
    if (element.upholstery_jadi != 'true' && element.code2.toLowerCase() == 'up' && element.forcedsent != 'true') {
      if (`${element.bulan}${element.tahun}` == `${bulan}${tahun}`) {
        totbelumbulanini = totbelumbulanini + 1;
      }
      /* if (fixdatenow==element.order_date) {
        
      } */
      /* if (fixdatenow==element.delivered_date) {
          totalkirimhariini=totalkirimhariini+1;
      } */
    } else if (element.upholstery_jadi == 'true' && element.code2.toLowerCase() == 'up' && element.forcedsent != 'true') {
      if (`${element.bulan}${element.tahun}` == `${bulan}${tahun}`) {
        totsudahbulanini = totsudahbulanini + 1;
      }

    }

  }

  document.getElementById('totalpesananshow-belum-thismonth').innerHTML = totbelumbulanini;
  document.getElementById('totalpesananshow-sudah-thismonth').innerHTML = totsudahbulanini;
  //document.getElementById('pesanandikirimshow').innerHTML=totalkirimhariini;


  //document.getElementById('showmainpage').removeAttribute('style');
  //document.getElementById('loadingskeleton').setAttribute('style','display:none;');

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

        if (!end && totalorongoing !== "ongoing") end = "Selesai";

        const duration = getDurationBetween(history, start, end);
        if (!duration) continue;

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


  return { ongoing: ongoingLate['Upholstery'], delayed: delayed['Upholstery'], warning: warning['Upholstery'] };

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




const animateCount = (el, target) => {
  let count = 0;
  const speed = Math.ceil(target / 30);
  const step = () => {
    if (count < target) {
      count += speed;
      if (count > target) count = target;
      el.textContent = count;
      requestAnimationFrame(step);
    }
  };
  step();
};





// const socket = io();
socket.on('newadditemadminlist', function (datas) {
  updatedatatotalpesanan(datas);
  updatedatatotalpesan_thisweek(datas);
});

function updatedatatotalpesan_thisweek(array) {
  var datafixs = filterCurrentWeekData([array]);
  for (let i = 0; i < datafixs.length; i++) {
    const element = datafixs[i];
    if (element.upholstery_jadi != 'true' && element.code2.toLowerCase() == 'up') {
      totbelumpekanini = totbelumpekanini + 1;
    }
  }
  document.getElementById('totalpesananshow-belum-thisweek').innerHTML = totbelumpekanini;
}

function updatedatatotalpesanan(array) {
  console.log(array);
  var datatoday = new Date();
  var day = ("0" + (datatoday.getDate())).slice(-2);
  var month = ("0" + (datatoday.getMonth() + 1)).slice(-2);//d.getMonth()+1;
  var year = datatoday.getFullYear();

  var fixdatenow = day + "/" + month + "/" + year;

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

  var bulan = monthNames[new Date().getMonth()];
  var tahun = new Date().getFullYear();

  if (array.upholstery_jadi != 'true' && array.code2.toLowerCase() == 'up') {
    if (`${array.bulan}${array.tahun}` == `${bulan}${tahun}`) {
      totbelumbulanini = totbelumbulanini + 1;
    }
  } else if (array.upholstery_jadi == 'true' && array.code2.toLowerCase() == 'up') {
    if (`${array.bulan}${array.tahun}` == `${bulan}${tahun}`) {
      totsudahbulanini = totsudahbulanini + 1;
    }

  }

  /* if (fixdatenow==array.order_date) {
    
  } */
  /* if (fixdatenow==array.delivered_date) {
      totalkirimhariini=totalkirimhariini+1;
  } */

  document.getElementById('totalpesananshow-belum-thismonth').innerHTML = totbelumbulanini;
  document.getElementById('totalpesananshow-sudah-thismonth').innerHTML = totsudahbulanini;
  //document.getElementById('pesanandikirimshow').innerHTML=totalkirimhariini;
}


socket.on('newupholsteryselesai', function (datas) {
  var dataarray = window.dataall; //  const dataarray = JSON.parse(document.getElementById('itemalls').innerHTML);
  var indxs = 0;
  for (let i = 0; i < dataarray.dataadminlist.length; i++) {
    const element = dataarray.dataadminlist[i];
    if (datas.id_transaksi == element.id_transaksi) {
      dataarray.dataadminlist[i].upholstery_jadi = 'true';
      indxs = i;
    }

  }

  var datafixs = filterCurrentWeekData([dataarray.dataadminlist[indxs]]);
  for (let j = 0; j < datafixs.length; j++) {
    const elements = datafixs[j];
    if (elements.upholstery_jadi == 'true') {
      totsudahpekanini = totsudahpekanini + 1;
      totbelumpekanini = totbelumpekanini - 1;
    }
  }
  document.getElementById('totalpesananshow-belum-thisweek').innerHTML = totbelumpekanini;
  document.getElementById('totalpesananshow-sudah-thisweek').innerHTML = totsudahpekanini;
});
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

