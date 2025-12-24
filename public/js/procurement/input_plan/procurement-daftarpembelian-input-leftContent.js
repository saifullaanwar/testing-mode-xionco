let dataInputLeftContent = {
  data: [],
  viewbank: 100,
  textformat: 0,
  phaseduration: {
    phase1: "11:00",
    phase2: "14:00",
    phase3: "16:00"
  },
}
let newarrayInvestor = []
// 1️⃣ Dapatkan tanggal hari ini format YYYY-MM-DD
function getTodayString() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}
document.getElementById("date-inputcurrent-kiri").addEventListener("click", function () {
  const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
  const dateInput = document.getElementById("date-input-kiri");

  dateInput.value = today; // set value input date ke hari ini
  filterDateKiri();        // panggil fungsi filter
});

// 2️⃣ Filter data berdasarkan tanggal
function filterDateKiri() {
  const inputTanggal = document.getElementById('date-input-kiri').value;
  const dataarray = window.dataall.proc_temp_kiri_inputplan; // data asli

  // filter tanggal
  const filteredTanggal = dataarray.filter(item => {
    const tgl = new Date(parseInt(item.tglinputmili, 10));
    const tglStr = `${tgl.getFullYear()}-${String(tgl.getMonth() + 1).padStart(2, '0')}-${String(tgl.getDate()).padStart(2, '0')}`;
    return tglStr === inputTanggal;
  });
  // Tunggu sedikit sampai DOM siap (opsional tapi efektif)
  setTimeout(() => {
    const phaseInput = document.getElementById('phase-input-kiri');
    if (phaseInput) {
      phaseInput.value = 1;
    } else {
      console.warn('Elemen phase-input-kiri tidak ditemukan!');
    }
  }, 100);
  // simpan hasil filter tanggal ke global sementara
  window.filteredByDate = filteredTanggal;

  // lanjut filter phase otomatis
  renderPhaseLog()
  filterPhaseKiri();
}
document.getElementById('phase-input-kiri').onblur = e => {
  e.target.value = Math.min(Math.max(parseInt(e.target.value) || 1, 1), 3);
};

function filterPhaseKiri() {
  let selectedPhase = document.getElementById('phase-input-kiri').value;
  const dataarray = window.filteredByDate;//|| window.dataall;
  showtabelinvestor(window.dataall.dataadminlist);
  if (!selectedPhase) {
    selectedPhase = getCurrentPhase(dataInputLeftContent.phaseduration);

    document.getElementById('phase-input-kiri').value = selectedPhase;
    console.log("Auto-selected phase:", selectedPhase);
  }

  let item;
  if (!dataarray.length) {
    console.log('Tidak ada data tanggal yang cocok');
    item = { value: '[]' }; // fallback kalau kosong
  } else {
    item = dataarray[0];
  }
  // parse value (string JSON jadi object)
  let phases;
  try {
    phases = typeof item.value === "string" ? JSON.parse(item.value) : item.value;
  } catch (err) {
    console.error('Error parsing value JSON:', err);
    phases = [];
  }
  // cari phase sesuai input, kalau tidak ketemu fallback jadi {value: []}
  const phaseData = phases.find(p => String(p.phase) === String(selectedPhase)) || { value: [] };
  dataInputLeftContent = {
    ...dataInputLeftContent,
    data: phaseData.value.map(item => ({
      ...item,
      show: true,
    })),
  }
  console.log("dataInputLeftContent", dataInputLeftContent);

  if (dataInputLeftContent.data.length === 0) {
    const inputTanggal = document.getElementById("date-input-kiri").value;
    const today = new Date().toISOString().split("T")[0];
    // bandingkan tanggal
    if (inputTanggal >= today) {
      console.log("✅ Data kosong dan tanggal >= hari ini → boleh add log");
      const newItem = [
        {
          "nama_bank": "BANK BCA_PT HALIM INTI GAHARA_GAHARA",
          "title": "GAHARA",
          "show": true,
          "balance": [
            {
              "name": "Total Cash In",
              "nominal": 0
            },
            {
              "name": "Total Cash Out",
              "nominal": 0
            },
            {
              "name": "Initial Balance",
              "nominal": 0
            }
          ],
          "cash_in": [
            {
              "name": "Prasarana",
              "nominal": 0,
              "kode_coa": 1010
            },
            {
              "name": "Offline",
              "nominal": 0,
              "kode_coa": 1010
            },
            {
              "name": "Customer",
              "nominal": 0,
              "kode_coa": 1010
            }
          ],
          "cash_out": [
            {
              "name": "Regular Expense",
              "nominal": 0,
              "kode_coa": 1400
            },
            {
              "name": "Bills",
              "nominal": 0,
              "kode_coa": 0
            },
            {
              "name": "Pending Payments",
              "nominal": 0,
              "kode_coa": 0
            }
          ],
          "others": [
            {
              "name": "Advance Payment – Casga",
              "nominal": 0,
              "kode_coa": 0
            },
            {
              "name": "Operational",
              "nominal": 0,
              "kode_coa": 0
            }
          ]
        },
        {
          "nama_bank": "BCA QUINTENSSENSIAL_PT HALIM INTI GAHARA_PRASARANA",
          "title": "PRASARANA",
          "show": true,
          "balance": [
            {
              "name": "Total Cash In",
              "nominal": 0
            },
            {
              "name": "Total Cash Out",
              "nominal": 0
            },
            {
              "name": "Initial Balance",
              "nominal": 0
            }
          ],
          "cash_in": [
            {
              "name": "Marketplace - Tokopedia",
              "nominal": 0,
              "kode_coa": 1020
            },
            {
              "name": "Marketplace - Shopee",
              "nominal": 0,
              "kode_coa": 1020
            },
            {
              "name": "Offline Transaction",
              "nominal": 0,
              "kode_coa": 1020
            }
          ],
          "cash_out": [
            {
              "name": "Regular Transaction",
              "nominal": 0,
            },
            {
              "name": "Gahara",
              "nominal": 0,
            },
            {
              "name": "Investor",
              "nominal": [],
            },
            {
              "name": "Ads - Meta",
              "nominal": 0,
            },
            {
              "name": "Ads - Tokopedia",
              "nominal": 0,
            },
            {
              "name": "Jansen SAL",
              "nominal": 0,
            }
          ],
          "Deposito": [
            {
              "name": "Homedec",
              "nominal": 0,
            },
            {
              "name": "Rempoa Inventory",
              "nominal": 0,
            }
          ]
        }
      ];
      dataInputLeftContent.data.push(...newItem);

      updateDataFetch(newItem)
    } else {
      console.log("⛔ Data kosong tapi tanggal < hari ini → jangan add log");
    }
  }
  showDataKiri()
  showDataSettingKiri()
}

function getCurrentPhase(phaseduration) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const phases = Object.entries(phaseduration).map(([key, time]) => {
    const phaseNumber = parseInt(key.replace("phase", ""), 10); // angka beneran
    const [h, m] = time.split(":").map(Number);
    return { num: phaseNumber, minutes: h * 60 + m };
  });

  phases.sort((a, b) => a.minutes - b.minutes);

  let activePhase = phases[0].num;
  for (let i = 0; i < phases.length; i++) {
    if (currentMinutes >= phases[i].minutes) {
      activePhase = phases[i].num;
    }
  }

  return parseInt(activePhase, 10); // pastikan integer
}


function showDataKiri() {
  var myobj = document.getElementById("daftarpembelian-card-kiri-grid");
  if (myobj) myobj.remove();

  var datatab = document.getElementById(`daftarpembelian-card-kiri`);
  var divhapus = document.createElement("div");
  divhapus.setAttribute("id", "daftarpembelian-card-kiri-grid");
  divhapus.setAttribute("class", "d-flex");
  divhapus.setAttribute("style", "position: relative; width:100%");

  // 🔑 slice sesuai viewbank
  const slicedData = dataInputLeftContent.data.slice(0, dataInputLeftContent.viewbank);

  divhapus.innerHTML = returnarrayDataKiri(slicedData);
  datatab.appendChild(divhapus);
}

function renderPhaseLog() {
  const listContainer = document.getElementById("phaseList");
  listContainer.innerHTML = ""; // kosongkan dulu

  const dataarray = window.filteredByDate || [];
  if (!dataarray.length) {
    listContainer.innerHTML = `<li class="list-group-item text-muted text-center">Tidak ada data phase</li>`;
    return;
  }

  try {
    // Ambil array phases dari field value (karena bentuknya JSON string)
    const parsed = JSON.parse(dataarray[0].value);

    parsed.forEach((phaseObj, index) => {
      const phase = phaseObj.phase || index + 1;
      const settle = phaseObj.settle === "true" || phaseObj.settle === true;
      const expired = phaseObj.expiredphase === "true" || phaseObj.expiredphase === true;

      // Tentukan status dan warna badge
      let badgeColor = "bg-warning";
      let textColor = "text-dark";
      let textStatus = `Phase ${phase} Belum Settle`;

      if (settle) {
        badgeColor = "bg-success";
        textColor = "text-light";
        textStatus = `Phase ${phase} Sudah Settle`;
      } else if (expired) {
        badgeColor = "bg-secondary";
        textColor = "text-light";
        textStatus = `Phase ${phase} Expired`;
      }

      // Buat elemen list
      const li = document.createElement("li");
      li.className = "list-group-item d-flex align-items-center justify-content-start";

      li.innerHTML = `
          <span class="badge ${badgeColor} ${textColor} me-2">${phase}</span>
          <span>${textStatus}</span>
        `;

      listContainer.appendChild(li);
    });
  } catch (err) {
    console.error("Error parsing phase data:", err);
    listContainer.innerHTML = `<li class="list-group-item text-danger">Error membaca data phase</li>`;
  }
}


function returnarrayDataKiri(dataitem) {
  return dataitem
    .map(function (element, index) {
      const title = element?.title?.trim() || "-";
      const address = element?.address?.trim() || "-";

      let totalCashIn = 0;
      let totalCashOut = 0;

      const finalElement = { ...element, title, address };

      // 🧩 Daftar kategori yang memiliki perhitungan balance khusus
      const specialTitles = ["GAHARA", "PRASARANA"];

      if (specialTitles.includes(title)) {
        const cashInArr = element.cash_in || [];
        const cashOutArr = element.cash_out || [];
        const cashOutDepostioArr = element.Deposito || [];
        const cashOutOthersArr = element.others || [];


        // 🔹 Hitung total nominal CASH IN
        totalCashIn = cashInArr.reduce((sum, i) => {
          let nominalData = i.nominal;
          if (typeof nominalData === "string" && nominalData.trim().startsWith("[")) {
            try {
              nominalData = JSON.parse(nominalData);
            } catch {
              nominalData = [];
            }
          }

          if (Array.isArray(nominalData)) {
            const subTotal = nominalData.reduce(
              (acc, el) => acc + (Number(el.totalprice) || 0),
              0
            );
            return sum + subTotal;
          }
          return sum + (Number(nominalData) || 0);
        }, 0);

        // 🔹 Hitung total nominal CASH OUT
        totalCashOut = cashOutArr.reduce((sum, i) => {
          let nominalData = i.nominal;
          if (typeof nominalData === "string" && nominalData.trim().startsWith("[")) {
            try {
              nominalData = JSON.parse(nominalData);
            } catch {
              nominalData = [];
            }
          }

          if (Array.isArray(nominalData)) {
            const subTotal = nominalData.reduce(
              (acc, el) => acc + (Number(el.totalprice) || 0),
              0
            );
            return sum + subTotal;
          }
          return sum + (Number(nominalData) || 0);
        }, 0);


        // 🔹 Hitung total nominal DEPOSITO
        totalDeposito = cashOutDepostioArr.reduce((sum, i) => {
          let nominalData = i.nominal;
          if (typeof nominalData === "string" && nominalData.trim().startsWith("[")) {
            try {
              nominalData = JSON.parse(nominalData);
            } catch {
              nominalData = [];
            }
          }

          if (Array.isArray(nominalData)) {
            const subTotal = nominalData.reduce(
              (acc, el) => acc + (Number(el.totalprice) || 0),
              0
            );
            return sum + subTotal;
          }
          return sum + (Number(nominalData) || 0);
        }, 0);

        // 🔹 Hitung total nominal Others
        totalOthers = cashOutOthersArr.reduce((sum, i) => {
          let nominalData = i.nominal;
          if (typeof nominalData === "string" && nominalData.trim().startsWith("[")) {
            try {
              nominalData = JSON.parse(nominalData);
            } catch {
              nominalData = [];
            }
          }

          if (Array.isArray(nominalData)) {
            const subTotal = nominalData.reduce(
              (acc, el) => acc + (Number(el.totalprice) || 0),
              0
            );
            return sum + subTotal;
          }
          return sum + (Number(nominalData) || 0);
        }, 0);

        // 🔹 Update atau buat ulang balance
        if (Array.isArray(element.balance)) {
          const initialVal = element.balance.find(b => b.name === "Initial Balance")?.nominal || 0;

          element.balance = [
            { name: "Total Cash In", nominal: totalCashIn },
            { name: "Total Cash Out", nominal: (totalCashOut + totalDeposito + totalOthers) },
            { name: "Initial Balance", nominal: initialVal },
          ];
        }

        // Sinkronkan hasil ke finalElement
        finalElement.balance = element.balance;

        console.log(`💾 Updated Balance ${title}:`, element.balance);
      }

      // 🔹 Fungsi render HTML editable untuk setiap data array
      function createEditableHTML(data, index, type) {
        if (!Array.isArray(data)) return "";
        return data
          .map((item, itemIndex) => {
            let totalFromData = 0;

            // Jika nominal berupa JSON string, parse & total
            if (typeof item.nominal === "string" && item.nominal.trim().startsWith("[")) {
              try {
                const parsed = JSON.parse(item.nominal);
                if (Array.isArray(parsed)) {
                  totalFromData = parsed.reduce(
                    (sum, d) => sum + (Number(d.totalprice) || 0),
                    0
                  );
                }
              } catch {
                totalFromData = 0;
              }
            }

            return `
              <div class="item-row font-smaller d-flex justify-content-between align-items-center" style="position: relative;">
                <span class="editable-value text-uppercase"
                  data-type="${type}"
                  data-name="${item.name}"
                  data-index="${index}"
                  data-item-index="${itemIndex}" 
                  data-original-name="name"
                  style="cursor: pointer;">
                  ${item.name}
                </span>
                <div class="d-flex gap-1">
                  ${dataInputLeftContent.textformat === 0 ? "" : "IDR"}
                  <span class="editable-value"
                    data-type="${type}"
                    data-name="${item.name}"
                    data-index="${index}"
                    data-item-index="${itemIndex}" 
                    data-original-name="nominal"
                    style="cursor: pointer;">
                     ${(totalFromData || (item.nominal === "[]" ? 0 : item.nominal) || 0).toLocaleString("id-ID")}
                  </span>
                    <button id="delete-btn-${index}-${type}-${itemIndex}" data-index="${index}"
                      style="background:transparent;border:1px solid #dc3545;border-radius:4px;
                      padding:1px 3px;font-size:9px;line-height:1;cursor:pointer;
                      color:#dc3545;display:none;align-items:center;justify-content:center;">
                      <i class="bi bi-trash" style="font-size:9px;"></i>
                    </button>
                </div>
              </div>`;
          })
          .join("");
      }

      const inputTanggal = document.getElementById("date-input-kiri").value;
      const today = new Date().toISOString().split("T")[0];

      // 🔹 Render seluruh field (cash_in, cash_out, balance, dst)
      const fieldsHTML = Object.keys(element)
        .filter((key) => Array.isArray(element[key]))
        .map((key, idx) => {
          const label = key.replace(/_/g, " ").toUpperCase();
          const arr = element[key];

          // 🔹 Hitung total nominal umum
          const totalNominal = arr.reduce((sum, i) => {
            let nominalData = i.nominal;
            if (typeof nominalData === "string" && nominalData.trim().startsWith("[")) {
              try {
                nominalData = JSON.parse(nominalData);
              } catch {
                nominalData = [];
              }
            }

            if (Array.isArray(nominalData)) {
              const subTotal = nominalData.reduce(
                (acc, el) => acc + (Number(el.totalprice) || 0),
                0
              );
              return sum + subTotal;
            }
            return sum + (Number(nominalData) || 0);
          }, 0);

          // 🔹 Hitung total khusus BALANCE
          const totalIn = arr.find(b => b.name === "Total Cash In")?.nominal || 0;
          const totalOut = arr.find(b => b.name === "Total Cash Out")?.nominal || 0;
          const initial = arr.find(b => b.name === "Initial Balance")?.nominal || 0;

          const totalNominalBALANCE = (totalIn + initial) - totalOut;

          return `
            <div class="section-block mt-3">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <strong>${label}</strong>
                <div class="d-flex gap-1">
                  ${dataInputLeftContent.textformat === 0 ? "" : "IDR"}
                  ${label === "BALANCE"
              ? `<strong>${totalNominalBALANCE.toLocaleString("id-ID")}</strong>`
              : `<strong>${totalNominal.toLocaleString("id-ID")}</strong>`}
                </div>
              </div>
              <hr class="my-0 mb-1">
              ${createEditableHTML(arr, index, key)}
              ${idx >= 1 && inputTanggal >= today ? ` <button 
                  style="background:transparent;border:1px solid #9d9d9d; border-radius:4px;
                         padding:1px 3px;font-size:9px; line-height:1; cursor:pointer;
                         color:#9d9d9d; display:inline-flex;align-items:center;justify-content:center;"
                  data-index="${index}"
                  data-section="${key}">
                  add
                </button>`
              : ""
            }
            </div>`;
        })
        .join("");

      if (element.show === false) return null;

      // 🔹 Return final HTML card
      return `
        <div class="col-12 col-sm-6 col-md-6 px-2"
             style="position: relative;"
             data-json='${JSON.stringify(finalElement)}'
             id="dataitem-${index}">
          <div class="card-custom-kiri greyunbolddraftplan">
            <div class="card-judul-kiri header-title font-smaller-10">
              <span id="title-${index}">${title}</span>
              ${index >= 2
          ? `<button class="edit-btn" data-index="${index}"
                style="background:transparent;border:1px solid #ffc107;border-radius:4px;
                padding:1px 3px;font-size:9px;line-height:1;cursor:pointer;
                color:#ffc107;display:inline-flex;align-items:center;justify-content:center;">
                <i class="bi bi-pencil" style="font-size:9px;"></i>
              </button>
              <button class="delete-btn" data-index="${index}"
                style="background:transparent;border:1px solid #dc3545;border-radius:4px;
                padding:1px 3px;font-size:9px;line-height:1;cursor:pointer;
                color:#dc3545;display:inline-flex;align-items:center;justify-content:center;">
                <i class="bi bi-trash" style="font-size:9px;"></i>
              </button>` : ""}
            </div>
            <div class="p-3 pt-0">
              ${fieldsHTML}
            </div>
          </div>
        </div>`;
    })
    .join("");
}


// Fungsi untuk memperbarui data 
function updateData(index, type, value, input) {
  // Ambil item data berdasarkan index
  const item = dataInputLeftContent.data[index];
  // Cek apakah field (type) ada di dalam objek data dan merupakan array
  if (item[type] && Array.isArray(item[type])) {
    // Jika field adalah array, kita iterasi dan cari berdasarkan itemIndex
    item[type].forEach((innerItem, itemIndex) => {
      // Jika itemIndex cocok dengan data-item-index, kita update
      if (itemIndex === parseInt(input.dataset.itemIndex)) {
        if (input.dataset.originalName === "nominal") {
          // Hapus semua koma/ titik ribuan
          if (input.dataset.type === "cash_in") {
            const cleaned = value.replace(/[,\.]/g, "");
            const parsedValue = parseFloat(cleaned);
            innerItem.nominal = parsedValue;
          } else if (input.dataset.type === "Deposito") {
            const cleaned = value.replace(/[,\.]/g, "");
            const parsedValue = parseFloat(cleaned);
            innerItem.nominal = parsedValue;
          } else if (input.dataset.type === "cash_out") {
            const cleaned = value.replace(/[,\.]/g, "");
            const parsedValue = parseFloat(cleaned);
            if (input.dataset.name === "Investor") {
              innerItem.nominal = value;
            } else {
              innerItem.nominal = parsedValue;
            }
          } else {
            const cleaned = value.replace(/[,\.]/g, "");
            const parsedValue = parseFloat(cleaned);
            innerItem.nominal = parsedValue;
          }
        }
        else if (input.dataset.originalName === "name") {
          if (input.dataset.type === "cash_in") {
            innerItem.name = JSON.parse(value).nama_plan;
            innerItem.kode_coa = JSON.parse(value).kode;
          } else if (input.dataset.type === "Deposito") {
            innerItem.name = JSON.parse(value).account;
          } else {
            innerItem.name = value;
          }
          console.log(input.dataset.type);
          console.log(`Updated ${innerItem.name} name to`, innerItem.name);
        }
      }
    });
  } else {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      item[type] = parsedValue;  // Update tipe langsung jika bukan array
      console.log(`Updated ${type} to`, item[type]);
    } else {
      console.error("Invalid value for", type);
      flag = 0
    }
  }
  console.log("dataInputLeftContent.data", dataInputLeftContent.data);
  flagStart = 1
  flag = 1
  updateDataFetch(dataInputLeftContent.data)
  showDataKiri();
}

// Fungsi untuk mengubah title berdasarkan index
function updateTitle(index, newTitle) {
  // Pastikan kita memiliki data yang benar
  const item = dataInputLeftContent.data[index];  // Mengambil data berdasarkan index

  if (item) {
    console.log(`Updating title for index ${index} to ${newTitle}`);

    // Update title
    item.title = newTitle;
flagStart = 1
  flag = 1
    updateDataFetch(dataInputLeftContent.data)
    showDataKiri()
  } else {
    console.error("Item not found for index", index);
    flag = 0

  }
}


function addDataToSection(index, section) {
  const item = dataInputLeftContent.data[index];  // Ambil data berdasarkan index

  // Tentukan data baru yang akan ditambahkan
  const newItem = {
    name: "New Name",  // Nama default
    nominal: 0,        // Nilai default
  };

  // Menambahkan item baru ke array sesuai dengan section yang dipilih
  if (item[section] && Array.isArray(item[section])) {
    item[section].push(newItem);  // Menambahkan data baru ke array
    console.log(`Menambahkan item baru ke ${section}:`, newItem);

    flagStart = 1
  flag = 1
    updateDataFetch(dataInputLeftContent.data)
    showDataKiri()
  } else {
    console.error(`Section ${section} tidak ditemukan atau bukan array`);
  }
}

document.addEventListener("click", function (event) {
  const inputTanggal = document.getElementById("date-input-kiri").value;
  const selectedPhase = document.getElementById("phase-input-kiri").value;
  const dataarray = window.filteredByDate || window.dataall;
  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toTimeString().slice(0, 5);

  const phases = dataInputLeftContent.phaseduration;
  const keys = Object.keys(phases);

  // bikin copy biar ada "phase0" mulai 00:00
  const newPhases = { phase0: "00:00", ...phases };
  const newKeys = Object.keys(newPhases);

  const key = selectedPhase.startsWith("phase") ? selectedPhase : "phase" + selectedPhase;
  const i = newKeys.indexOf(key);
  const start = (key === "phase1") ? "00:00" : phases[key];
  const end = i + 1 < keys.length ? phases[keys[i + 1]] : "23:59";

  // if (inputTanggal < today) {
  //   // if (inputTanggal < today || (inputTanggal === today && (now < start || now >= end))) {
  //   console.log("⛔ Tidak bisa edit");
  //   return;
  // }

  // pastikan dataarray ada
  const allParsed = (dataarray || []).map(item =>
    item?.value ? JSON.parse(item.value) : []
  ).flat();
  const targetPhase = allParsed.find(p => p.phase === selectedPhase);


  // // ==================== EDITABLE VALUE ====================
  if (event.target.closest(".editable-value")) {
    const span = event.target.closest(".editable-value");
    const originalValue = span.textContent.trim();
    let skipDefault = false; // flag penanda

    if (span.dataset.type === "balance") {
      if (span.dataset.originalName === "name") {
        span.style.cursor = "not-allowed";
        skipDefault = true;
      } else if (span.dataset.originalName === "nominal") {
        if (span.dataset.name === "Total Cash In" || span.dataset.name === "Total Cash Out") {
          span.style.cursor = "not-allowed";
          skipDefault = true;
        } else {
          // span.onclick = () => showCoaSelect(span, targetPhase, selectedPhase, originalValue);
          skipDefault = false;
        }
      }
    } else if (span.dataset.type === "cash_in") {
      if (span.dataset.originalName === "name") {
        if (span.dataset.name === "Prasarana" || span.dataset.name === "Offline" || span.dataset.name === "Customer" || span.dataset.name === "Marketplace - Tokopedia" || span.dataset.name === "Marketplace - Shopee" || span.dataset.name === "Offline Transaction") {
          span.style.cursor = "not-allowed";
          skipDefault = true;
        } else {
          span.onclick = () => showCoaSelect(span, targetPhase, selectedPhase, originalValue);
          skipDefault = true;
        }
      } else {
        skipDefault = false;
      }
    } else if (span.dataset.type === "cash_out") {
      if (span.dataset.originalName === "name") {
        if (span.dataset.name === "Regular Transaction" || span.dataset.name === "Gahara" || span.dataset.name === "Ads - Meta" || span.dataset.name === "Ads - Tokopedia" || span.dataset.name === "Ads - Tokopedia" || span.dataset.name === "Jansen SAL") {
          span.style.cursor = "not-allowed";
          skipDefault = true;
        }
        else if (span.dataset.name === "Regular Expense" || span.dataset.name === "Bills" || span.dataset.name === "Pending Payments") {
          span.onclick = () => showCheckOutGaharaPopover(span, targetPhase, selectedPhase);
          skipDefault = true;
        }
        else if (span.dataset.name === "Investor") {
          span.onclick = () => showInvestorPopover(span, targetPhase, selectedPhase);
          skipDefault = true;
        } else {
          skipDefault = false;
        }
      } else if (span.dataset.originalName === "nominal") {
        if (span.dataset.name === "Regular Expense" || span.dataset.name === "Bills" || span.dataset.name === "Pending Payments") {
          span.onclick = () => showCheckOutGaharaPopover(span, targetPhase, selectedPhase);
          skipDefault = true;
        } else if (span.dataset.name === "Investor") {
          span.onclick = () => showInvestorPopover(span, targetPhase, selectedPhase);
          skipDefault = true;
        } else {
          skipDefault = false;
        }
      } else {
        skipDefault = false;
      }
    } else if (span.dataset.type === "others") {
      if (span.dataset.originalName === "name") {
        if (span.dataset.name === "Advance Payment – Casga" || span.dataset.name === "Operational") {
          span.style.cursor = "not-allowed";
          skipDefault = true;
        } else {
          skipDefault = false;
        }
      } else {
        skipDefault = false;
      }
    } else if (span.dataset.type === "Deposito") {
      if (span.dataset.originalName === "name") {
        if (span.dataset.name === "Homedec" || span.dataset.name === "Rempoa Inventory") {
          span.style.cursor = "not-allowed";
          skipDefault = true;
        } else {
          span.onclick = () => showDepositoSelect(span, targetPhase, selectedPhase, originalValue);
          skipDefault = true;
        }
      } else {
        skipDefault = false;
      }
    }
    // 🔹 kalau tidak di-skip, lanjut ke else utama
    if (!skipDefault) {
      if (targetPhase?.settle === "true") {
        warningpopup("error", `Sudah Settle untuk phase ${selectedPhase}`);
        console.log(`⛔ Sudah terSettle untuk phase ${selectedPhase}`);
      }
      else if (targetPhase?.expiredphase === "true") {
        warningpopup("error", `Phase sudah expired untuk phase ${selectedPhase}`);
      } else {
        // === default: pakai INPUT ===
        const input = document.createElement("input");
        input.type = "text";
        input.id = `field-${span.dataset.index}-${span.dataset.type}-${span.dataset.itemIndex}`;
        input.name = `${span.dataset.type}_${span.dataset.index}_${span.dataset.itemIndex}`;
        input.value = originalValue;
        input.className = "form-control form-control-sm font-smaller-9";
        input.dataset.originalValue = originalValue;
        input.dataset.index = span.dataset.index;
        input.dataset.type = span.dataset.type;
        input.dataset.name = span.dataset.name;
        input.dataset.itemIndex = span.dataset.itemIndex;
        input.dataset.originalName = span.dataset.originalName;

        const deleteBtn = span
          .closest(".item-row")
          .querySelector(
            `#delete-btn-${span.dataset.index}-${span.dataset.type}-${span.dataset.itemIndex}`
          );

        input.addEventListener("blur", function (e) {
          const value = e.target.value.trim();
          if (value === "") return;

          if (value !== input.dataset.originalValue) {
            updateData(input.dataset.index, input.dataset.type, value, input);
          } else {
            setTimeout(() => {
              deleteBtn.style.display = "none";
            }, 150);
          }
          span.textContent = value;
        });

        span.textContent = "";
        span.appendChild(input);
        input.focus();
        if (deleteBtn) {
          if (span.dataset.type === "balance") {

          } else if (span.dataset.type === "cash_in") {
            if (span.dataset.originalName === "nominal") {
              if (parseInt(span.dataset.itemIndex) >= 3) {
                deleteBtn.style.display = "inline-flex";
              }
            }
          } else if (span.dataset.index === "0" && span.dataset.type === "cash_out") {
            if (span.dataset.originalName === "nominal") {
              if (parseInt(span.dataset.itemIndex) >= 3) {
                deleteBtn.style.display = "inline-flex";
              }
            }
          } else if (span.dataset.index === "1" && span.dataset.type === "cash_out") {
            if (span.dataset.originalName === "nominal") {
              if (parseInt(span.dataset.itemIndex) >= 6) {
                deleteBtn.style.display = "inline-flex";
              }
            }
          } else if (span.dataset.type === "others") {
            if (span.dataset.originalName === "nominal") {
              if (parseInt(span.dataset.itemIndex) >= 2) {
                deleteBtn.style.display = "inline-flex";
              }
            }
          } else if (span.dataset.type === "Deposito") {
            if (span.dataset.originalName === "nominal") {
              if (parseInt(span.dataset.itemIndex) >= 2) {
                deleteBtn.style.display = "inline-flex";
              }
            }
          }
          console.log(span.dataset);
        }
      }
    }
  }

  // ==================== BUTTON DATA SECTION ====================
  if (event.target.closest("button[data-section]")) {
    const button = event.target.closest("button[data-section]");
    const index = button.dataset.index;
    const section = button.dataset.section;
    if (targetPhase?.settle === "true") {
      console.log(`⛔ Sudah terSettle untuk phase ${selectedPhase}`);
      warningpopup("error", `Sudah Settle untuk phase ${selectedPhase}`);
    } else if (targetPhase?.expiredphase === "true") {
      warningpopup("error", `Phase sudah expired untuk phase ${selectedPhase}`);
    } else {
      addDataToSection(index, section);
    }
  }

  // ==================== EDIT TITLE ====================
  if (event.target.closest(".edit-btn")) {
    const index = event.target.closest(".edit-btn").dataset.index;
    const titleElement = document.getElementById(`title-${index}`);
    const originalTitle = titleElement.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.value = originalTitle;

    input.addEventListener("blur", function () {
      const newTitle = input.value;
      updateTitle(index, newTitle);
      titleElement.textContent = newTitle;
    });

    titleElement.textContent = "";
    titleElement.appendChild(input);
    input.focus();
  }



  // ==================== DELETE ITEM ====================
  if (event.target.closest("[id^='delete-btn-']")) {
    const button = event.target.closest("[id^='delete-btn-']");
    const idParts = button.id.split('-');
    const index = idParts[2];
    const type = idParts[3];
    const itemindex = idParts[4];

    if (confirm("⚠️ Yakin ingin menghapus item ini?")) {
      deleteItem(index, type, itemindex);
      button.style.display = "none";
      console.log("✅ Item berhasil dihapus");
    } else {
      console.log("❌ Penghapusan dibatalkan");
    }
  }

  // ==================== DELETE DATA ====================
  if (event.target.closest(".delete-btn")) {
    const index = event.target.closest(".delete-btn").dataset.index;
    deleteData(index);
  }
});
// 🧩 Fungsi reusable untuk popover investor
// 🧩 Fungsi reusable untuk popover investor
function showInvestorPopover(span, targetPhase, selectedPhase) {
  const dataarray = window.filteredByDate || window.dataall;

  // 🧹 Tutup popover lama kalau masih terbuka
  const existingPopover = document.getElementById("popoverEditAtasInvestor");
  if (existingPopover) {
    existingPopover.remove();
    console.log("🧹 Popover lama dihapus sebelum buka baru");
  }

  // 🧩 Helper: Ambil data parsed per phase
  const parsePhaseData = () => {
    try {
      const parsed = JSON.parse(dataarray?.[0]?.value || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.find((p) => String(p.phase) === String(selectedPhase));
    } catch (err) {
      console.warn("⚠️ Gagal parse data phase:", err);
      return null;
    }
  };

  // 🧩 Helper: Ambil investor existing
  const getExistingInvestor = (phaseData) => {
    for (const bank of phaseData?.value || []) {
      for (const item of bank.cash_out || []) {
        if (item.name === "Investor" && item.nominal && item.nominal !== "0") {
          try {
            const arr =
              typeof item.nominal === "string" && item.nominal.trim().startsWith("[")
                ? JSON.parse(item.nominal)
                : item.nominal;
            if (Array.isArray(arr)) return arr;
          } catch (e) {
            console.warn("❌ Gagal parse Investor nominal:", e);
          }
        }
      }
    }
    return [];
  };

  const phaseData = parsePhaseData();
  if (!phaseData) {
    console.warn(`⚠️ Phase ${selectedPhase} tidak ditemukan`);
    return;
  }

  const existingInvestor = getExistingInvestor(phaseData);
  const isSettled = targetPhase?.settle === "true";

  console.log("📦 existingInvestor:", existingInvestor);

  // 🧩 Buat elemen popover
  const popover = document.createElement("div");
  Object.assign(popover.style, {
    display: "block",
    position: "absolute",
    top: "15px",
    left: "-160px",
    zIndex: 9999,
    background: "#fff",
    border: "1px solid #ccc",
    padding: "6px",
    minWidth: "320px",
    borderRadius: "6px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  });
  popover.id = "popoverEditAtasInvestor";
  popover.className = "edit-popover-atas-investor";

  // 🧾 Tentukan data yang akan ditampilkan
  const dataToDisplay = isSettled ? existingInvestor : newarrayInvestor;
  const existingIds = existingInvestor.map((d) => String(d.newtglinputmili));

  // 🧾 Generate rows tabel
  const rows = (dataToDisplay || [])
    .filter((d) => !isSettled || existingIds.includes(String(d.newtglinputmili)))
    .map((d) => {
      const tgl = new CustomDateFormatter(Number(d.newtglinputmili || 0)).format("dd month yyyy");
      const isChecked = existingIds.includes(String(d.newtglinputmili)) ? "checked" : "";
      const disabled = isSettled ? "disabled" : "";
      return `
        <tr>
          <td style="padding:2px;">
            <input class="form-check-input inv-check" type="checkbox" ${isChecked} ${disabled}
              data-id="${d.newtglinputmili}" data-total="${d.totalprice}">
          </td>
          <td class="text-start font-smaller-9 greyunbolddraftplan" style="padding:2px;">${tgl}</td>
          <td class="text-start font-smaller-9 greyunbolddraftplan" style="padding:2px;">${d.newstatus || "-"}</td>
          <td class="text-end font-smaller-9 greyunbolddraftplan" style="padding:2px;">
            IDR ${Number(d.totalprice || 0).toLocaleString("id-ID")}
          </td>
        </tr>`;
    })
    .join("");

  // 💡 Isi popover
  popover.innerHTML = `
    <div style="max-height:140px;overflow-y:auto;">
      <table style="width:100%;">
        <tbody>${rows || `<tr><td colspan="4" class="text-center text-muted">Tidak ada data</td></tr>`}</tbody>
      </table>
    </div>
    ${isSettled
      ? `<div class="mt-1 text-center font-smaller-10 text-muted">
            ✅ Data sudah di-settle, tidak bisa diubah.
          </div>`
      : `<div class="d-flex align-items-center justify-content-between mt-1">
            <div>Total: <strong id="investorTotal">IDR 0</strong></div>
            <span id="saveInvestorPopover" class="badge text-bg-secondary" style="cursor:pointer">Save</span>
          </div>`
    }
  `;

  // Tambahkan popover ke DOM
  span.insertAdjacentElement("afterend", popover);

  // 🟡 Kalau settle → readonly mode (tidak bisa ubah)
  if (isSettled) {
    console.log(`⛔ Sudah terSettle untuk phase ${selectedPhase}`);
    // tetap pasang listener tutup biar popover bisa dihapus walau readonly
  }

  // 💰 Hitung total otomatis
  const totalEl = popover.querySelector("#investorTotal");
  const saveBtn = popover.querySelector("#saveInvestorPopover");

  const updateTotal = () => {
    const total = [...popover.querySelectorAll(".inv-check:checked")].reduce(
      (sum, c) => sum + Number(c.dataset.total || 0),
      0
    );
    totalEl.textContent = `IDR ${total.toLocaleString("id-ID")}`;
  };
  popover.querySelectorAll(".inv-check").forEach((cb) => cb.addEventListener("change", updateTotal));

  // 💾 Simpan data investor
  saveBtn?.addEventListener("click", () => {
    const selectedIds = [...popover.querySelectorAll(".inv-check:checked")].map((c) => c.dataset.id);
    const inputTanggal = document.getElementById('date-input-kiri')?.value;
    let selectedDateMilli = null;
    if (inputTanggal) {
      const [year, month, day] = inputTanggal.split('-').map(Number);
      selectedDateMilli = new Date(year, month - 1, day).getTime();
    }

    const output = newarrayInvestor
      .filter(p => selectedIds.includes(String(p.newtglinputmili)))
      .map(p => ({
        ...p,
        tglmilichecked: selectedDateMilli,
      }));
    const jsonOutput = JSON.stringify(output);
    const total = output.reduce((sum, o) => sum + Number(o.totalprice || 0), 0);

    const updateTarget =
      span.dataset.originalName === "name"
        ? document.querySelector(
          `.editable-value[data-type="${span.dataset.type}"][data-name="${span.dataset.name}"][data-index="${span.dataset.index}"][data-item-index="${span.dataset.itemIndex}"][data-original-name="nominal"]`
        )
        : span;

    if (updateTarget) {
      updateTarget.textContent = jsonOutput;
      updateData(updateTarget.dataset.index, updateTarget.dataset.type, jsonOutput, updateTarget);
    }

    console.log(`💰 Total selected price: IDR ${total.toLocaleString("id-ID")}`);
    popover.remove();
  });

  // 🟡 Klik di luar → tutup popover
  const handleOutsideClick = (e) => {
    const pop = document.getElementById("popoverEditAtasInvestor");
    if (pop && !pop.contains(e.target) && e.target !== span) {
      pop.remove();
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("scroll", handleScroll);
    }
  };

  // 🟡 Scroll → tutup popover
  const handleScroll = () => {
    const pop = document.getElementById("popoverEditAtasInvestor");
    if (pop) pop.remove();
    document.removeEventListener("scroll", handleScroll);
    document.removeEventListener("mousedown", handleOutsideClick);
  };

  // ✅ Pasang listener setelah popover muncul
  // Tambahkan proteksi supaya tidak dobel listener
  setTimeout(() => {
    document.removeEventListener("mousedown", handleOutsideClick);
    document.removeEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("scroll", handleScroll);
  }, 0);
}


// 🧩 Fungsi reusable untuk popover checkout Gahara
function showCheckOutGaharaPopover(span, targetPhase, selectedPhase) {
  const dataarray = window.filteredByDate || window.dataall;

  // 🧹 Tutup popover lama kalau masih terbuka
  const existingPopover = document.getElementById("popoverEditAtasGahara");
  if (existingPopover) {
    existingPopover.remove();
    console.log("🧹 Popover lama dihapus sebelum buka yang baru");
  }

  // 🧩 Helper: Ambil data parsed per phase
  const parsePhaseData = () => {
    try {
      const parsed = JSON.parse(dataarray?.[0]?.value || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.find(p => String(p.phase) === String(selectedPhase));
    } catch (err) {
      console.warn("⚠️ Gagal parse data phase:", err);
      return null;
    }
  };

  const phaseData = parsePhaseData();
  if (!phaseData) {
    console.warn(`⚠️ Phase ${selectedPhase} tidak ditemukan`);
    return;
  }

  // 🔍 Ambil data vendor yang sesuai dengan kategori
  let existingInvestor = [];
  if (Array.isArray(phaseData.data_bayar)) {
    const name = span.dataset.name;
    if (name === "Pending Payments") {
      existingInvestor = phaseData.data_bayar.filter(v => v.pendingpayment === "true");
    } else if (name === "Bills") {
      existingInvestor = phaseData.data_bayar.filter(v => v.tipeitem === "Bill");
    } else if (name === "Regular Expense") {
      existingInvestor = phaseData.data_bayar.filter(
        v => v.pendingpayment !== "true" && v.tipeitem !== "Bill"
      );
    }
  }

  const isSettled = targetPhase?.settle === "true";

  // ❌ Kalau belum settle → jangan tampilkan popover
  if (!isSettled) {
    span.style.cursor = "not-allowed";
    console.log("⛔ Phase belum settle, tidak bisa dibuka");
    return;
  }

  // 🧩 Buat elemen popover
  const popover = document.createElement("div");
  Object.assign(popover.style, {
    display: "block",
    position: "absolute",
    top: "15px",
    left: "0px",
    zIndex: 9999,
    background: "#fff",
    border: "1px solid #ccc",
    padding: "5px",
    minWidth: "320px",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  });
  popover.id = "popoverEditAtasGahara";
  popover.className = "edit-popover-atas-investor";

  // 🧾 Tentukan data yang akan ditampilkan
  const dataToDisplay = isSettled ? existingInvestor : newarrayInvestor;
  const existingIds = existingInvestor.map(d => String(d.tglmili_tindakbayar));

  // 🧾 Generate rows tabel
  const rows = (dataToDisplay || [])
    .filter(d => !isSettled || existingIds.includes(String(d.tglmili_tindakbayar)))
    .map(d => {
      const tgl = new CustomDateFormatter(Number(d.tglmili_tindakbayar || 0)).format("dd/mm");
      const total = Number(d.totalterbayar || 0).toLocaleString("id-ID");
      return `
        <tr>
          <td class="text-start font-smaller-9 greyunbolddraftplan" style="padding:2px;">${tgl}</td>
          <td class="text-start font-smaller-9 greyunbolddraftplan" style="padding:2px;">${d.id_request || "-"}</td>
          <td class="text-start font-smaller-9 greyunbolddraftplan" style="padding:2px;">${d.vendor || "-"}</td>
          <td class="text-start font-smaller-9 greyunbolddraftplan" style="padding:2px;">${d.item || "-"}</td>
          <td class="text-end font-smaller-9 greyunbolddraftplan" style="padding:2px;">IDR ${total}</td>
        </tr>`;
    })
    .join("");

  // 💡 Isi konten popover
  popover.innerHTML = `
    <div style="max-height:140px;overflow-y:auto;">
      <table style="width:100%;"><tbody>
        ${rows || `<tr><td colspan="4" class="text-center text-muted">Tidak ada data</td></tr>`}
      </tbody></table>
    </div>
    <div class="mt-1 text-center font-smaller-10 text-muted">
      ✅ Data sudah di-settle, hanya dapat dilihat.
    </div>
  `;

  // Masukkan popover ke DOM
  span.insertAdjacentElement("afterend", popover);

  // 🟡 Klik di luar popover → tutup
  const handleOutsideClick = (e) => {
    const pop = document.getElementById("popoverEditAtasGahara");
    if (pop && !pop.contains(e.target) && e.target !== span) {
      pop.remove();
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("scroll", handleScroll);
    }
  };

  // 🟡 Scroll → tutup popover
  const handleScroll = () => {
    const pop = document.getElementById("popoverEditAtasGahara");
    if (pop) pop.remove();
    document.removeEventListener("scroll", handleScroll);
    document.removeEventListener("mousedown", handleOutsideClick);
  };

  // Pasang listener setelah popover muncul
  setTimeout(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("scroll", handleScroll);
  }, 0);
}


// 🧩 Fungsi reusable: handler select untuk Deposito
function showDepositoSelect(span, targetPhase, selectedPhase, originalValue) {
  if (targetPhase?.settle === "true") {
    warningpopup("error", `Sudah Settle untuk phase ${selectedPhase}`);
    console.log(`⛔ Sudah terSettle untuk phase ${selectedPhase}`);
    return;
  }
  if (targetPhase?.expiredphase === "true") {
    warningpopup("error", `Phase sudah expired untuk phase ${selectedPhase}`);
    return;
  }

  const select = document.createElement("select");
  select.id = `select-${span.dataset.index}-${span.dataset.type}-${span.dataset.itemIndex}`;
  select.name = `${span.dataset.type}_${span.dataset.index}_${span.dataset.itemIndex}`;
  select.className = "form-select form-select-sm font-smaller-9";
  select.dataset.originalValue = originalValue;
  select.dataset.index = span.dataset.index;
  select.dataset.type = span.dataset.type;
  select.dataset.name = span.dataset.name;
  select.dataset.itemIndex = span.dataset.itemIndex;
  select.dataset.originalName = span.dataset.originalName;

  // 🔹 Ambil list COA unik
  const fixcoa = [];
  for (let i = 0; i < window.dataall.finance_bankgayahidup_account.length; i++) {
    const element = window.dataall.finance_bankgayahidup_account[i];
    if (!fixcoa.find(el => el.account === element.account)) {
      fixcoa.push(element);
    }
  }

  // 🔹 Isi option dropdown
  fixcoa
    .filter(el => el.account && el.account.trim() !== "")
    .forEach(el => {
      const option = document.createElement("option");
      option.value = JSON.stringify(el);
      option.textContent = `${el.account}`;
      if (el.account === originalValue) option.selected = true;
      select.appendChild(option);
    });

  // 🔹 Stop event click bubbling
  select.addEventListener("click", e => e.stopPropagation());


  // 🔹 Saat user pilih item
  select.addEventListener("change", function (e) {
    const selectedData = JSON.parse(e.target.value || "{}");
    const selectedAccount = selectedData.account || "";

    // 🛑 Kalau user pilih akun terlarang → popup + kembalikan ke semula
    if (selectedAccount === "Homedec" || selectedAccount === "INVENTORY REMPOA") {
      warningpopup("error", `Data "${selectedAccount}" tidak bisa dipilih.`);
      select.value = select.dataset.originalValue;
      return;
    }

    const value = e.target.value;
    if (value !== select.dataset.originalValue) {
      updateData(select.dataset.index, select.dataset.type, value, select);
    }

    span.textContent = value;
    span.textContent = "";
    span.appendChild(select);
    select.focus(); // Fokus ulang setelah ganti
  });

  // 🔹 Saat blur tanpa pilih baru → tetap simpan value terakhir
  select.addEventListener("blur", function (e) {
    const selectedData = JSON.parse(e.target.value || "{}");
    const selectedAccount = selectedData.account || "";
    const value = e.target.value;

    // 🛑 Kalau user sempat pilih akun terlarang sebelum blur
    if (selectedAccount === "Homedec" || selectedAccount === "INVENTORY REMPOA") {
      warningpopup("error", `Data "${selectedAccount}" tidak bisa dipilih.`);
      // kembalikan ke nilai lama
      e.target.value = select.dataset.originalValue;
      span.textContent = originalValue;
      return;
    }

    // 🟡 Kalau user tidak ubah apa pun, tetap simpan nilai lama
    if (value === select.dataset.originalValue) {
      span.textContent = originalValue;
      return;
    }

    // 🟢 Kalau user ubah ke nilai baru → update ke data
    updateData(select.dataset.index, select.dataset.type, value, select);
    span.textContent = e.target.value;
  });

  span.textContent = "";
  span.appendChild(select);
  select.focus();
}
// 🧩 Fungsi reusable: handler select dropdown dari database_coa
function showCoaSelect(span, targetPhase, selectedPhase, originalValue) {
  // 🚫 Jika phase sudah settle → tidak bisa edit
  if (targetPhase?.settle === "true") {
    warningpopup("error", `Sudah Settle untuk phase ${selectedPhase}`);
    console.log(`⛔ Sudah terSettle untuk phase ${selectedPhase}`);
    return;
  }
  else if (targetPhase?.expiredphase === "true") {
    warningpopup("error", `Phase sudah expired untuk phase ${selectedPhase}`);
    return;
  }
  // 🔹 Buat elemen <select>
  const select = document.createElement("select");
  select.id = `select-${span.dataset.index}-${span.dataset.type}-${span.dataset.itemIndex}`;
  select.name = `${span.dataset.type}_${span.dataset.index}_${span.dataset.itemIndex}`;
  select.className = "form-select form-select-sm font-smaller-9";
  select.dataset.originalValue = originalValue;
  select.dataset.index = span.dataset.index;
  select.dataset.type = span.dataset.type;
  select.dataset.name = span.dataset.name;
  select.dataset.itemIndex = span.dataset.itemIndex;
  select.dataset.originalName = span.dataset.originalName;

  // 🧱 Siapkan array penampung COA
  const fixcoa = [];

  // 🔹 Loop seluruh data COA
  for (let i = 0; i < window.dataall.database_coa.length; i++) {
    const element = window.dataall.database_coa[i];
    let namaPlans = [];

    // Cek apakah nama_plan berupa JSON array
    if (typeof element.nama_plan === "string" && element.nama_plan.trim().startsWith("[")) {
      try {
        namaPlans = JSON.parse(element.nama_plan);
      } catch {
        namaPlans = [];
      }
    } else if (typeof element.nama_plan === "string" && element.nama_plan.trim() !== "") {
      namaPlans = [element.nama_plan];
    }

    // Tambahkan setiap nama_plan ke fixcoa
    namaPlans.forEach(plan => {
      fixcoa.push({
        ...element,
        nama_plan: plan.trim(),
      });
    });
  }

  // 🔹 Hapus duplikat nama_plan
  const uniqueCoa = fixcoa.filter(
    (v, i, a) => a.findIndex(t => t.nama_plan === v.nama_plan) === i
  );

  // 🔹 Isi dropdown option
  uniqueCoa
    .filter(el => el.nama_plan && el.nama_plan.trim() !== "")
    .forEach(el => {
      const option = document.createElement("option");
      option.value = JSON.stringify(el);
      option.textContent = `${el.nama_plan} (Kode Coa : ${el.kode})`;
      if (el.nama_plan === originalValue) option.selected = true;
      select.appendChild(option);
    });

  // 🔹 Stop event click keluar
  select.addEventListener("click", e => e.stopPropagation());

  // 🧠 Daftar data yang dilarang
  const forbiddenNames = [
    "Prasarana",
    "Offline",
    "Customer",
    "Marketplace - Tokopedia",
    "Marketplace - Shopee",
    "Offline Transaction"
  ];

  // 🔹 Saat user pilih item
  select.addEventListener("change", function (e) {
    let selectedData;
    try {
      selectedData = JSON.parse(e.target.value || "{}");
    } catch {
      selectedData = {};
    }

    const selectedName = selectedData.nama_plan || "";

    // ⚠️ Cek data terlarang
    if (forbiddenNames.includes(selectedName)) {
      warningpopup("error", `Data "${selectedName}" tidak bisa dipilih.`);
      select.value = select.dataset.originalValue;
      span.textContent = originalValue;
      return;
    }

    const value = e.target.value;
    if (value !== select.dataset.originalValue) {
      updateData(select.dataset.index, select.dataset.type, value, select);
    }

    span.textContent = value;
    span.textContent = "";
    span.appendChild(select);
    select.focus(); // Fokus ulang
  });

  // 🔹 Saat blur tanpa pilih baru → tetap simpan nilai terakhir + filter data terlarang
  select.addEventListener("blur", function (e) {
    let selectedData;
    try {
      selectedData = JSON.parse(e.target.value || "{}");
    } catch {
      selectedData = {};
    }

    const selectedName = selectedData.nama_plan || "";
    const value = e.target.value;

    // 🚫 Kalau blur dalam keadaan pilih data terlarang
    if (forbiddenNames.includes(selectedName)) {
      warningpopup("error", `Data "${selectedName}" tidak bisa dipilih.`);
      e.target.value = select.dataset.originalValue;
      span.textContent = originalValue;
      return;
    }

    // 🟡 Kalau blur tanpa ubah apa pun
    if (value === select.dataset.originalValue) {
      span.textContent = originalValue;
      return;
    }

    // 🟢 Kalau ubah ke nilai valid → update data
    updateData(select.dataset.index, select.dataset.type, value, select);
    span.textContent = e.target.value;
  });

  // 🔹 Ganti teks span jadi dropdown
  span.textContent = "";
  span.appendChild(select);
  select.focus();
}




// Fungsi untuk menghapus data berdasarkan index
function deleteData(index) {
  console.log(`Deleting data at index: ${index}`);

  // Menghapus data berdasarkan index dari array
  dataInputLeftContent.data.splice(index, 1);  // Hapus satu elemen pada index tersebut

  flagStart = 1
  flag = 1
  updateDataFetch(dataInputLeftContent.data)
  showDataKiri()
}

// Fungsi hapus item
function deleteItem(index, type, itemIndex) {

  if (
    dataInputLeftContent.data[index] &&
    dataInputLeftContent.data[index][type] &&
    dataInputLeftContent.data[index][type][itemIndex] !== undefined
  ) {
    console.log(
      `Menghapus item: bankIndex=${index}, type=${type}, itemIndex=${itemIndex}`
    );
    dataInputLeftContent.data[index][type].splice(itemIndex, 1);
flagStart = 1
  flag = 1
    updateDataFetch(dataInputLeftContent.data)
    showDataKiri()
  } else {
    console.warn("Item tidak ditemukan atau index salah!");
  }
}
let flag = 1
let flagStart = 0
//==============update data ========================
function updateDataFetch(dataFix) {
  const inputTanggal = document.getElementById('date-input-kiri').value;
  const selectedPhase = document.getElementById('phase-input-kiri').value;
  const dataarray = window.dataall.proc_temp_kiri_inputplan;

  // filter by tanggal
  let filteredTanggal = dataarray.filter(item => {
    const tgl = new Date(parseInt(item.tglinputmili, 10));
    const tglStr = `${tgl.getFullYear()}-${String(tgl.getMonth() + 1).padStart(2, '0')}-${String(tgl.getDate()).padStart(2, '0')}`;
    return tglStr === inputTanggal;
  });
  let data = [];

  if (filteredTanggal.length === 0) {
    // === INSERT case ===
    const tglDate = new Date(inputTanggal);
    tglDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (tglDate >= today) {
      // 👇 buat semua phase (1, 2, 3) saat insert pertama kali
      const allPhases = [1, 2, 3].map(phase => ({
        phase: String(phase),
        value: dataFix
      }));

      const newRecord = {
        tglinputmili: tglDate.getTime(),
        value: JSON.stringify(allPhases)
      };

      dataarray.push(newRecord);
      console.log("➕ Insert baru (semua phase):", newRecord);
      data.push(newRecord);
    } else {
      console.log("⛔ Tidak ada data & tanggal < hari ini, insert tidak diizinkan");
    }
  } else {
    // === UPDATE case ===
    filteredTanggal.forEach(item => {
      try {
        let parsed = JSON.parse(item.value);
        let found = false;
        parsed.forEach(phaseObj => {
          if (phaseObj.phase === selectedPhase) {
            console.log(`🔄 Update phase ${selectedPhase} dengan dataFix`);
            phaseObj.value = dataFix;
            found = true;
          }
        });

        if (!found) {
          console.log(`➕ Phase ${selectedPhase} tidak ditemukan, buat baru`);
          parsed.push({
            phase: selectedPhase,
            value: dataFix
          });
        }

        item.value = JSON.stringify(parsed);
      } catch (err) {
        console.error("❌ Error parsing value:", err);
      }
    });
    console.log("✅ Updated filteredTanggal:", filteredTanggal);
    data.push(...filteredTanggal)
  }
  console.log("===========data", data);

  //fetch to server
  if (flag === 1) {
    console.log(flagStart);
    if (flagStart === 1) {
      fetch('/procurement/updateproctempkiriinputplan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': xi // Make sure `xi` is a valid variable containing the authorization token
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(resdat => {
          console.log('resdat:', resdat);

          if (resdat.icons === 'success') {
            console.log("Successfully updated item in the backend");
            socket.emit('updateproctempkiriinputplan', data);
            fetchdata()
          } else {
            warningpopup('error', 'Failed to save checklist');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          warningpopup('error', 'Error in catching: ' + error);
        });
    }
  }
}
function totabelkiriCashoutFetch(dataFix) {
  const inputTanggal = document.getElementById('date-input-kiri').value;
  const selectedPhase = document.getElementById('phase-input-kiri').value;
  const dataarray = window.dataall.proc_temp_kiri_inputplan;

  // filter by tanggal
  let filteredTanggal = dataarray.filter(item => {
    const tgl = new Date(parseInt(item.tglinputmili, 10));
    const tglStr = `${tgl.getFullYear()}-${String(tgl.getMonth() + 1).padStart(2, '0')}-${String(tgl.getDate()).padStart(2, '0')}`;
    return tglStr === inputTanggal;
  });

  let data = [];

  filteredTanggal.forEach(item => {
    try {
      item.value = JSON.stringify(dataFix);
    } catch (err) {
      console.error("❌ Error parsing value:", err);
    }
  });
  console.log("✅ Updated filteredTanggal:", filteredTanggal);
  data.push(...filteredTanggal)

  //fetch to server
  if (flag === 1) {
    // fetch('/procurement/updateproctempkiriinputplan', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     'Authorization': xi // Make sure `xi` is a valid variable containing the authorization token
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(response => response.json())
    //   .then(resdat => {
    //     console.log('resdat:', resdat);

    //     flag = 0;
    //     if (resdat.icons === 'success') {
    //       console.log("Successfully updated item in the backend");
    //       socket.emit('updateproctempkiriinputplan', data);
    //       //fetchdata();
    //     } else {
    //       warningpopup('error', 'Failed to save checklist');
    //     }

    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     warningpopup('error', 'Error in catching: ' + error);
    //   });
  }

}

//==============update settle ========================
function updateDataSettleFetch(dataFix) {
  //fetch to server
  if (flag === 1) {
    fetch('/procurement/updatesettleproctempkiriinputplan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': xi // Make sure `xi` is a valid variable containing the authorization token
      },
      body: JSON.stringify({ data: dataFix })
    })
      .then(response => response.json())
      .then(resdat => {
        console.log('resdat:', resdat);
        flag = 0
        if (resdat.icons === 'success') {
          console.log("Successfully updated item in the backend");
          warningpopup("success", "Successfully updated item");
          //socket.emit('approvereqbeli',additemreqproc);
          location.reload();
          // socket.emit('updatesettleproctempkiriinputplan', data);
        } else {
          warningpopup('error', 'Failed to save checklist');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        warningpopup('error', 'Error in catching: ' + error);
      });
  }
}
//==============update settle ========================

let afteruploadImage;

function setDataSettleFetch() {
  const dataarray = window.filteredByDate || window.dataall;
  const inputTanggal = document.getElementById("date-input-kiri").value;
  const selectedPhase = document.getElementById("phase-input-kiri").value;
  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toTimeString().slice(0, 5);
  const namaSettle = namalengkap; // pastikan variabel ini sudah ada (nama user yang settle)

  const phases = dataInputLeftContent.phaseduration;
  const keys = Object.keys(phases);

  // bikin copy biar ada "phase0" mulai 00:00
  const newPhases = { phase0: "00:00", ...phases };
  const newKeys = Object.keys(newPhases);

  const key = selectedPhase.startsWith("phase") ? selectedPhase : "phase" + selectedPhase;
  const i = newKeys.indexOf(key);
  const start = key === "phase1" ? "00:00" : phases[key];
  const end = i + 1 < keys.length ? phases[keys[i + 1]] : "23:59";

  // 1️⃣ Parse semua value
  const allParsed = (dataarray || []).map(item =>
    item?.value ? JSON.parse(item.value) : []
  ).flat();

  // cari phase yang sesuai
  const targetPhase = allParsed.find(p => p.phase === selectedPhase);
  console.log("dataarray data_bayar========", targetPhase?.data_bayar);

  // 2️⃣ Validasi waktu & status phase
  if (targetPhase === undefined) {
    warningpopup("error", `Tidak bisa Settle untuk phase ${selectedPhase}`);
    return;
  } else if (inputTanggal < today || (inputTanggal === today && (now < start || now >= end))) {
    warningpopup("error", `Tidak bisa Settle untuk phase ${selectedPhase}`);
    return;
  } else if (targetPhase?.settle === "true") {
    warningpopup("error", `Sudah Settle untuk phase ${selectedPhase}`);
    return;
  } else if (targetPhase?.expiredphase === "true") {
    warningpopup("error", `Phase sudah expired untuk phase ${selectedPhase}`);
    return;
  }

  // 3️⃣ Konfirmasi pengguna
  Swal.fire({
    icon: 'warning',
    title: '',
    text: `Apakah anda ingin Settle untuk phase ${selectedPhase}?`,
    showCancelButton: true,
    confirmButtonText: 'OK',
    denyButtonText: 'Settle'
  }).then((result) => {
    if (!result.isConfirmed) {
      console.log("❌ Dibatalkan / ditutup oleh user");
      return;
    }

    flag = 1
    console.log("🟡 Mulai proses settle phase:", selectedPhase);

    // 4️⃣ Parse ulang value yang ada di dataarray
    let valueParsed = [];
    if (dataarray?.[0]?.value) {
      try {
        valueParsed = JSON.parse(dataarray[0].value);
      } catch (e) {
        console.warn("⚠️ Gagal parse dataarray[0].value:", e);
      }
    }

    // 5️⃣ Ubah status settle phase terpilih
    valueParsed = valueParsed.map(item => ({
      ...item,
      settle: item.phase === selectedPhase ? "true" : item.settle || "false"
    }));

    // Simpan ke string JSON
    dataarray[0].value = JSON.stringify(valueParsed);

    // Parse ulang (karena kita update string di atas)
    const parsed = JSON.parse(dataarray?.[0]?.value || "[]");
    console.log("📦 parsed data:", parsed);

    // 6️⃣ Ambil data phase terpilih dari parsed
    let phaseData = null;
    if (Array.isArray(parsed)) {
      phaseData = parsed.find(p => String(p.phase) === String(selectedPhase));
    } else if (parsed && typeof parsed === "object") {
      phaseData = parsed.phase === String(selectedPhase) ? parsed : null;
    }

    if (!phaseData) {
      console.warn(`⚠️ Phase ${selectedPhase} tidak ditemukan`);
      return;
    }

    // 7️⃣ Update data_bayar (buyer, tindakbayar, dll)
    if (Array.isArray(phaseData.data_bayar)) {
      const nowMs = Date.now();
      phaseData.data_bayar.forEach(item => {
        item.buyer = namaSettle;
        item.tglmili_tindakbayar = nowMs;
        item.tindakbayar = "true";
        item.check_bayar = "false";
      });
      console.log(`✅ Update buyer (${namaSettle}) untuk phase ${selectedPhase}:`, phaseData.data_bayar);
    } else {
      console.warn(`⚠️ data_bayar kosong atau bukan array di phase ${selectedPhase}`);
    }

    // Simpan kembali perubahan buyer ke dataarray
    dataarray[0].value = JSON.stringify(parsed);

    // 8️⃣ Proses Investor
    afteruploadImage = null;

    if (!Array.isArray(phaseData.value)) {
      console.warn("⚠️ phaseData.value bukan array");
      return;
    }

    for (const bank of phaseData.value) {
      if (!Array.isArray(bank.cash_out)) continue;

      for (const item of bank.cash_out) {
        if (item.name === "Investor") {
          const n = item.nominal;
          console.log("🔍 Investor ditemukan, nominal:", n);

          // Kalau kosong, langsung settle
          if (
            n === null ||
            n === undefined ||
            n === "0" ||
            (Array.isArray(n) && n.length === 0) ||
            (typeof n === "string" && n.trim() === "")
          ) {
            console.log("ℹ️ Investor kosong, langsung updateDataSettleFetch");
            updateDataSettleFetch(dataarray[0]);
            loadingpopup();
            continue;
          }

          try {
            let arr;
            if (Array.isArray(n)) {
              arr = n;
            } else if (typeof n === "string" && n.trim().startsWith("[")) {
              arr = JSON.parse(n);
            }

            if (Array.isArray(arr) && arr.length > 0) {
              console.log("✅ Investor ada isinya, jalankan kliksavetindak:", arr);
              kliksavetindak(arr);
              afteruploadImage = dataarray[0];
            } else {
              console.log("⚠️ Investor ada tapi kosong setelah parse, fallback settle");
              loadingpopup();
              updateDataSettleFetch(dataarray[0]);
            }
          } catch (e) {
            console.warn("❌ Gagal parse Investor:", e);
            loadingpopup();
            updateDataSettleFetch(dataarray[0]);
          }
        }
      }
    }

    console.log("🏁 Proses selesai, flag =", flag, "afteruploadImage =", afteruploadImage);
  });
}

//==============update data ========================

//==============settingData ========================
// ==== TAB SWITCHER ====
function actionsetting() {
  const tabShown = document.getElementById("tab-shownbank");
  const tabChoose = document.getElementById("tab-choose");

  const shownDiv = document.getElementById("shownbankkirisetting");
  const chooseDiv = document.getElementById("choosekirisetting");

  tabShown.addEventListener("click", () => {
    shownDiv.style.display = "block";
    chooseDiv.style.display = "none";
    tabShown.style.fontWeight = "bold";
    tabChoose.style.fontWeight = "normal";
    showDataSettingKiri();
  });

  tabChoose.addEventListener("click", () => {
    shownDiv.style.display = "none";
    chooseDiv.style.display = "block";
    tabShown.style.fontWeight = "normal";
    tabChoose.style.fontWeight = "bold";
    showDataChooseKiri();
  });
}

// ==== SHOWN DATA ====
function showDataSettingKiri() {
  var myobj = document.getElementById("shownbankkirisetting-list");
  if (myobj) myobj.remove();

  var datatab = document.getElementById("shownbankkirisetting");
  var divhapus = document.createElement("div");
  divhapus.setAttribute("id", "shownbankkirisetting-list");

  divhapus.innerHTML = returnarrayDataKiriSettingShown(dataInputLeftContent.data);
  datatab.appendChild(divhapus);

  // update checkbox -> data.show
  document.querySelectorAll('#shownbankkirisetting-list input[type="checkbox"]').forEach((cb, index) => {
    cb.addEventListener("change", function () {
      dataInputLeftContent.data[index].show = this.checked;
      console.log("Updated:", dataInputLeftContent.data);
      showDataKiri();
    });
  });
}

// ==== CHOOSE DATA ====
function showDataChooseKiri() {
  var myobj = document.getElementById("choosekirisetting-list");
  if (myobj) myobj.remove();

  var datatab = document.getElementById("choosekirisetting");
  var divhapus = document.createElement("div");
  divhapus.setAttribute("id", "choosekirisetting-list");

  divhapus.innerHTML = returnarrayDataKiriSettingChoose(dataInputLeftContent.data);
  divhapus.innerHTML += `
  <div class="dropdown">
  <button class="btn btn-sm grayunbold border dropdown-toggle" 
      type="button" id="dropdownAddItem" 
      data-bs-toggle="dropdown" aria-expanded="false"
      style="padding:0px; background:transparent; border-radius:4px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; height:24px;">
      <i class="bi bi-plus" style="font-size:12px;"></i>
      <span class="me-2 grayunbold" style="font-size:9px;">Tambah</span>
  </button>
  <div class="dropdown-menu p-2" aria-labelledby="dropdownAddItem" style="font-size:10px; min-width:220px;">
    <div class="mb-2">
      <label for="inputNama" class="form-label" style="font-size:11px; margin-bottom:2px;">Nama</label>
      <input type="text" class="form-control form-control-sm font-smaller-9" id="inputNama" placeholder="Masukkan nama">
    </div>
   <div class="mb-2">
  <label for="inputBank" class="form-label" style="font-size:11px; margin-bottom:2px;">Bank</label>
  <select class="form-control form-control-sm font-smaller-9" id="inputBank">
    <option value="" selected disabled>Pilih Bank</option>
    <option value="BCA">BCA</option>
    <option value="Mandiri">Mandiri</option>
    <option value="BRI">BRI</option>
    <option value="BNI">BNI</option>
    <option value="CIMB Niaga">CIMB Niaga</option>
    <option value="Danamon">Danamon</option>
    <option value="Maybank">Maybank</option>
    <option value="Permata">Permata</option>
    <option value="BTN">BTN</option>
    <option value="OCBC NISP">OCBC NISP</option>
    <option value="Panin">Panin</option>
    <option value="BTPN">BTPN</option>
    <option value="Mega">Mega</option>
    <option value="Sinarmas">Sinarmas</option>
  </select>
</div>

    <button type="button" id="btnSimpanDropdown" class="form-control form-control-sm font-smaller-9">
      Simpan
    </button>
  </div>
</div>

`;
  // masukkan ke DOM dulu
  datatab.appendChild(divhapus);

  document.getElementById("btnSimpanDropdown").addEventListener("click", function () {
    const nama = document.getElementById("inputNama").value.trim();
    const bank = document.getElementById("inputBank").value.trim();

    if (!nama || !bank) {
      alert("Nama dan Bank harus diisi!");
      return;
    }
    flag = 1;

    const newItem = {
      "nama_bank": bank,
      "show": true,
      "title": nama,
      "balance": [
        {
          "name": "Total Cash In",
          "nominal": 0
        },
        {
          "name": "Total Cash Out",
          "nominal": 0
        },
        {
          "name": "Initial Balance",
          "nominal": 0
        }
      ],
      "cash_in": [
        {
          "name": "Prasarana",
          "nominal": 0,
          "kode_coa": 0
        },
        {
          "name": "Offline",
          "nominal": 0,
          "kode_coa": 0
        },
        {
          "name": "Customer",
          "nominal": 0,
          "kode_coa": 0
        }
      ],
      "cash_out": [
        {
          "name": "Regular Expense",
          "nominal": 0,
          "kode_coa": 0
        },
        {
          "name": "Bills",
          "nominal": 0,
          "kode_coa": 0
        },
        {
          "name": "Pending Payments",
          "nominal": 0,
          "kode_coa": 0
        }
      ],
      "others": [
        {
          "name": "Advance Payment – Casga",
          "nominal": 0,
          "kode_coa": 0
        },
        {
          "name": "Operational",
          "nominal": 0,
          "kode_coa": 0
        }
      ]
    };

    // Menambahkan item baru ke dataInputLeftContent
    dataInputLeftContent.data.push(newItem);
    // Render ulang data setelah penambahan
    updateDataFetch(dataInputLeftContent.data)
    showDataKiri();
    showDataChooseKiri();
    showDataSettingKiri();
    // reset input
    document.getElementById("inputNama").value = "";
    document.getElementById("inputBank").value = "";

    // tutup dropdown setelah submit
    const dropdownEl = document.getElementById("dropdownAddItem");
    let dropdown = bootstrap.Dropdown.getInstance(dropdownEl);

    // kalau belum ada, bikin baru
    if (!dropdown) {
      dropdown = new bootstrap.Dropdown(dropdownEl);
    }

    dropdown.hide();

  });

}


function returnarrayDataKiriSettingShown(dataitem) {
  console.log(dataitem);

  return dataitem
    .map(function (element, index) {
      const title = element?.title?.trim() || "-";
      const nama_bank = element?.nama_bank?.trim() || "-";
      const address = element?.address?.trim() || "-";

      const finalElement = {
        ...element,
        title,
        address,
      };
      return `<div class="item-row font-smaller" id="dataitemsetting-${index}" data-json='${JSON.stringify(finalElement)}'
                    style="display: flex; justify-content: flex-start; align-items: center;">
                    <input type="checkbox" name="bank[]" value="${nama_bank}" 
                         style="margin-right: 2px;" ${element.show ? "checked" : ""}>
                    <span style="margin-left: 8px; greybold">${nama_bank} | ${title}</span>
                </div>`;
    })
    .join("");
}
// return untuk CHOOSE (tanpa checkbox, lebih clean)
function returnarrayDataKiriSettingChoose(dataitem) {
  return dataitem
    .map(function (element, index) {
      const title = element?.title?.trim() || "-";
      const nama_bank = element?.nama_bank?.trim() || "-";
      const address = element?.address?.trim() || "-";

      const finalElement = { ...element, title, address };

      return `<div class="item-row font-smaller" 
                  id="dataitemchoose-${index}" 
                  data-json='${JSON.stringify(finalElement)}'
                  style="display: flex; justify-content: flex-start; align-items: center; margin-bottom: 4px;">
                  <span >${nama_bank} | ${title}</span>
              </div>`;
    })
    .join("");
}
function setViewBank(value, el) {
  if (dataInputLeftContent.viewbank === value) {
    dataInputLeftContent.viewbank = 100; // toggle reset
  } else {
    dataInputLeftContent.viewbank = value;
  }
  console.log("Updated viewbank:", dataInputLeftContent.viewbank);

  // hanya reset highlight di dalam container viewbank
  document.querySelectorAll('#viewbank-container span').forEach(span => {
    span.style.background = "";
    span.style.color = "";
  });
  if (dataInputLeftContent.viewbank !== 100) {
    el.style.background = "#007bff";
    el.style.color = "white";
  }

  showDataKiri();
}

function setTextFormat(value, el) {
  dataInputLeftContent.textformat = value;
  console.log("Updated textformat:", dataInputLeftContent.textformat);

  // hanya reset highlight di dalam container textformat
  document.querySelectorAll('#textformat-container span').forEach(span => {
    span.style.background = "";
    span.style.color = "";
  });
  el.style.background = "#007bff";
  el.style.color = "white";

  showDataKiri();
}
//==============settingData ========================



//===================khusus investor =====
function showtabelinvestor(dataarray) {
  console.log(dataarray);

  var myobj = document.getElementById("divhpsdata");
  if (myobj) myobj.remove();

  var datatab = document.getElementById(`alldattab`);

  var divhapus = document.createElement("div");
  divhapus.setAttribute("id", "divhpsdata");

  var maxleng = 20;
  currentIndex = maxleng;

  itemsPerLoad = 20;

  var dataarray1 = window.dataall;//JSON.parse(document.getElementById("itemalls").dataset.json);

  var dataitem = dataarray1.itemsdata;

  var dataadminlist = JSON.parse(JSON.stringify(dataarray));
  // Gabungkan investor dari dataitem ke dataadminlist
  const hasilGabung = dataadminlist.map((adminItem) => {
    const match = dataitem.find((data) => data.product.trim() === adminItem.item.trim());
    return {
      ...adminItem,
      investor: match ? match.investor : "",
      investor_mj: match ? match.investor_mj : "",
    };
  });

  console.log("hasilGabung");
  console.log(hasilGabung);

  if (hasilGabung.length < 20) {
    maxleng = hasilGabung.length;
    currentIndex = hasilGabung.length;
  } else {
  }

  if (hasilGabung.length > 0) {
    divhapus.innerHTML = returnarrayinvestor(hasilGabung, "awal");
    // datatab.appendChild(divhapus);
    //document.getElementById('datatidakditemukan').setAttribute('style','display:none;');
  }
}

var ceklengloadmore;
var sortedDataGlobal = []; // Global untuk menyimpan data terurut
var platformonline = "";
var instoreklik = false;///true jika instore sedang diklik

function returnarrayinvestor(arrayszx, prosedur) {
  //platformonline.length=0;
  var dataarray = window.dataall;//JSON.parse(document.getElementById("itemalls").dataset.json);
  var newarray;
  var newarray_other;

  //cek data platform online saja
  platformonline = '';//reset
  for (let p = 0; p < dataarray.platformdata.length; p++) {
    const element = dataarray.platformdata[p];
    if (element.platform.includes("5010744000")) {
      platformonline = `${platformonline == ""
        ? element.platform
        : `${platformonline},${element.platform}`
        }`;
    }
  }

  //instore tombol di klik
  /* if (instoreklik==true) {
    platformonline='';//reset
    for (let p = 0; p < dataarray.platformdata.length; p++) {
      const element = dataarray.platformdata[p];
      if (!element.platform.includes("IN-STORE")) {
        platformonline = `${
          platformonline == ""
            ? element.platform
            : `${platformonline},${element.platform}`
        }`;
      }
    }
  } */
  //

  console.log("platformonline ====");
  console.log(platformonline);
  //cek data platform online saja

  if (prosedur == "awal") {
    const admlistdata = arrayszx; //dataarray.dataadminlist;
    var finance_banklimbo = dataarray.finance_banklimbo;
    var finance_banklimbo_instore = dataarray.finance_banklimbo_instore;//ditolak instore

    console.log("admlistdata =====");
    console.log(admlistdata);

    const todayMili = new Date().getTime();
    const groupedByDateStr = {};
    const groupedByDateStr_other = {};
    const financeBankLimboMap = new Map(); // Map untuk menyimpan finance_banklimbo berdasarkan id_transaksi

    //const financeBankLimboInstoreTolakMap = new Map(); // Map untuk menyimpan finance_banklimbo_instore ditolak berdasarkan id_transaksi

    // Kumpulkan semua id_transaksi dari finance_banklimbo dan petakan ke data induknya
    // Ini akan membantu kita mencari info finance_banklimbo berdasarkan id_transaksi admlistdata
    finance_banklimbo.forEach((bankItem) => {
      let detailsArray;
      try {
        detailsArray = JSON.parse(bankItem.details);
      } catch (e) {
        console.warn(
          "Invalid JSON in finance_banklimbo details",
          bankItem.details
        );
        return;
      }
      detailsArray.forEach((detail) => {
        // Setiap id_transaksi menunjuk ke item bank induknya
        financeBankLimboMap.set(detail.id_transaksi, bankItem);
      });
    });

    //membantu mencari info instore yang ditolak berdasarkan id transaksi
    /* finance_banklimbo_instore.forEach((bankItem) => {
      let detailsArray;
      try {
        detailsArray = JSON.parse(bankItem.details);
      } catch (e) {
        console.warn(
          "Invalid JSON in finance_banklimbo details",
          bankItem.details
        );
        return;
      }
      detailsArray.forEach((detail) => {
        // Setiap id_transaksi menunjuk ke item bank induknya
        financeBankLimboInstoreTolakMap.set(detail.id_transaksi, bankItem);
      });
    }); */

    admlistdata.forEach((item) => {
      if (
        item.status.toLowerCase() === "selesai" &&
        item.investor === "true" &&
        !item.platform.split("_")[0].includes('5010744000') && item.platform.toLowerCase().includes('xionco')
      ) {//!platformonline.includes(item.platform.split("_")[0])

        let historyArray;
        try {
          historyArray = JSON.parse(item.history);
        } catch (e) {
          console.warn("Invalid JSON in history", item.history);
          return;
        }

        let selectedEntry = historyArray.find(
          (h) => h.tindakan === "request force Selesai"
        );
        if (!selectedEntry) {
          selectedEntry = historyArray.find(
            (h) => h.details && h.details.status === "Selesai"
          );
        }


        if (
          !selectedEntry ||
          !selectedEntry.details ||
          !selectedEntry.details.tglinputmili
        ) {
          return;
        }


        const tglinputmili = selectedEntry.details.tglinputmili;
        const dateStr = formatDateString(tglinputmili);
        const startOfDayMillis = getStartOfDayMillis(dateStr);

        let newstatus = "";
        let currentTgltindakanmili = "";
        let currentTotalPrice = 0;
        let currentFolderfoto = "";

        const bankLimboEntry = financeBankLimboMap.get(item.id_transaksi); //cek id_transaksi di bank limbo selesai ditindak

        //const bankLimboInstoreTolakEntry = financeBankLimboInstoreTolakMap.get(item.id_transaksi); //cek id_transaksi di bank limbo instore ditolak

        //console.log(`bankLimboEntry==++++ ${item.id_transaksi}`,bankLimboEntry);

        if (bankLimboEntry) {
          /* if (item.id_transaksi=='F197-2025') {
         console.log(`ada item now ++++=== ${item.id_transaksi}, ${item.status.toLowerCase()}, ${ item.investor}, ${item.platform.split("_")[0]}`);
       } */
          newstatus = "Selesai";
          currentTgltindakanmili = bankLimboEntry.tgl_tarik_mili; // Ambil tgl_tarik_mili dari finance_banklimbo
          currentTotalPrice = bankLimboEntry.nominal; //parseInt(bankLimboEntry.nominal || "0", 10); // Ambil nominal dari finance_banklimbo

          // Ambil folderfoto dari history finance_banklimbo
          try {
            const bankHistoryArray = JSON.parse(bankLimboEntry.history);
            if (bankHistoryArray.length > 0 && bankHistoryArray[0].folderfoto) {
              currentFolderfoto = bankHistoryArray[0].folderfoto;
            }
          } catch (e) {
            console.warn(
              "Invalid JSON in finance_banklimbo history",
              bankLimboEntry.history
            );
          }

          // Kunci pengelompokan untuk "Selesai" adalah startOfDayMillis + tgl_tarik_mili
          // agar bisa digabungkan jika tglinputmili dan tgl_tarik_mili sama
          // memastikan uniqueness kunci jika ada banyak item dengan tgl_tarik_mili sama dan tglinputmili sama
          const key = `selesai_${startOfDayMillis}_${currentTgltindakanmili}`;

          if (!groupedByDateStr[key]) {
            groupedByDateStr[key] = {
              newtglinputmili: startOfDayMillis, //dari admlistdata
              newstatus,
              totalprice: 0, // Akan diakumulasikan dari admlistdata
              tgltindakanmili: currentTgltindakanmili, // Dari finance_banklimbo
              folderfoto: currentFolderfoto, // Dari finance_banklimbo
              details: [],
            };
          }
          // Akumulasi totalprice dari finalprice admlistdata untuk grup "Selesai"
          groupedByDateStr[key].totalprice = currentTotalPrice; //+= parseInt(item.finalprice || "0", 10);

          groupedByDateStr[key].details.push({
            id_transaksi: item.id_transaksi,
            item: item.item,
            qty: item.qty,
            platform: item.platform,
            finalprice: item.finalprice,
            //investor_mj: item.investor_mj
          });
        }
        else {

          // Logika untuk status selain "Selesai"
          const selisihHari = Math.floor(
            (todayMili - startOfDayMillis) / (1000 * 60 * 60 * 24)
          );
          if (selisihHari === 3) {
            newstatus = "Jatuh Tempo";
          } else if (selisihHari < 3) {
            newstatus = "Up Coming";
          } else if (selisihHari > 3) {
            newstatus = "Tertunggak";
          }
          currentTotalPrice = parseInt(item.finalprice || "0", 10);

          // Kunci untuk grup ini adalah dateStr (tanggal selesai item admlistdata)
          const key = dateStr;

          if (!groupedByDateStr[key]) {
            groupedByDateStr[key] = {
              newtglinputmili: startOfDayMillis,
              newstatus,
              totalprice: 0,
              tgltindakanmili: "",
              folderfoto: "",
              details: [],
            };
          }
          groupedByDateStr[key].totalprice += currentTotalPrice;
          groupedByDateStr[key].details.push({
            id_transaksi: item.id_transaksi,
            item: item.item,
            qty: item.qty,
            platform: item.platform,
            finalprice: item.finalprice,
            //investor_mj: item.investor_mj
          });

        }
      } else {
        //cek aja yang sudah dibayar ke gaya hidup 5010744000
        if (item.status.toLowerCase() === "selesai" && item.investor === "true") {
          let historyArray;
          try {
            historyArray = JSON.parse(item.history);
          } catch (e) {
            console.warn("Invalid JSON in history", item.history);
            return;
          }

          let selectedEntry = historyArray.find(
            (h) => h.tindakan === "request force Selesai"
          );
          if (!selectedEntry) {
            selectedEntry = historyArray.find(
              (h) => h.details && h.details.status === "Selesai"
            );
          }


          if (
            !selectedEntry ||
            !selectedEntry.details ||
            !selectedEntry.details.tglinputmili
          ) {
            return;
          }


          const tglinputmili = selectedEntry.details.tglinputmili;
          const dateStr = formatDateString(tglinputmili);
          const startOfDayMillis = getStartOfDayMillis(dateStr);

          let newstatus = "";
          let currentTgltindakanmili = "";
          let currentTotalPrice = 0;
          let currentFolderfoto = "";
          // Logika untuk status selain "Selesai"
          const selisihHari = Math.floor(
            (todayMili - startOfDayMillis) / (1000 * 60 * 60 * 24)
          );
          if (selisihHari === 3) {
            newstatus = "Jatuh Tempo";
          } else if (selisihHari < 3) {
            newstatus = "Up Coming";
          } else if (selisihHari > 3) {
            newstatus = "Tertunggak";
          }
          currentTotalPrice = parseInt(item.finalprice || "0", 10);

          // Kunci untuk grup ini adalah dateStr (tanggal selesai item admlistdata)
          const key = dateStr;

          if (!groupedByDateStr_other[key]) {
            groupedByDateStr_other[key] = {
              newtglinputmili: startOfDayMillis,
              newstatus,
              totalprice: 0,
              tgltindakanmili: "",
              folderfoto: "",
              details: [],
            };
          }
          groupedByDateStr_other[key].totalprice += currentTotalPrice;
          groupedByDateStr_other[key].details.push({
            id_transaksi: item.id_transaksi,
            item: item.item,
            qty: item.qty,
            platform: item.platform,
            finalprice: item.finalprice,
            //investor_mj: item.investor_mj
          });
        }
      }
    });

    newarray = Object.values(groupedByDateStr);
    newarray_other = Object.values(groupedByDateStr_other);
    console.log("newarray === awal");
    console.log(newarray);
    //console.log("newarray_other === awal");
    //console.log(newarray_other);

    //data dari yang sudah ditarik
    /* if (finance_banklimbo.length > 0) {
            finance_banklimbo.forEach(entry => {
                let parsedDetails = [];
                let parsedHis = [];
                try {
                    parsedDetails = JSON.parse(entry.details);
                    parsedHis = JSON.parse(entry.history);
                } catch (e) {
                    console.warn("Invalid JSON in details:", entry.details);
                }

                for (let i = 0; i < newarray.length; i++) {
                    const element = newarray[i];
                    if (entry.tgl_selesai_item_mili==element.newtglinputmili) {
                        newarray[i].newstatus='Selesai';
                        newarray[i].tgltindakanmili=entry.tgl_tarik_mili;
                        newarray[i].details=parsedDetails;
                        newarray[i].totalprice=entry.nominal;
                        newarray[i].folderfoto=parsedHis[0].folderfoto;
                    }
                }
            });
        } */

    console.log("newarray === akhir");
    console.log(newarray);

    newarray.sort((a, b) => {
      const statusA = a.newstatus === "Selesai" ? 1 : 0;
      const statusB = b.newstatus === "Selesai" ? 1 : 0;

      // Pertama urutkan berdasarkan status
      if (statusA !== statusB) {
        return statusA - statusB;
      }

      // Jika status sama, urutkan berdasarkan tanggal (mili sekon) descending
      return parseInt(b.newtglinputmili) - parseInt(a.newtglinputmili);
    });

    console.log("newarray === urutan");
    console.log(newarray);
    //total tersisa
    const totalallprice = newarray
      .filter((item) => {
        const status = item.newstatus.toLowerCase();
        return status === "up coming" || status === "tertunggak";
      })
      .reduce((acc, curr) => acc + (curr.totalprice || 0), 0);

    const totalallprice_other = newarray_other
      .filter((item) => {
        const status = item.newstatus.toLowerCase();
        return status === "up coming" || status === "tertunggak";
      })
      .reduce((acc, curr) => acc + (curr.totalprice || 0), 0);

    console.log('totalallprice_other----====', formatMoney(totalallprice_other));

    // document.getElementById("totaltersisakiri").innerHTML = `Rp ${formatMoney(
    //   totalallprice
    // )}`;
    //
    newarray = newarray.filter(
      (element) =>
        element.newstatus.toLowerCase() != "up coming" &&
        element.newstatus.toLowerCase() != "selesai" &&
        element.newstatus.toLowerCase() != "ditolak"
    );
  }
  /* if (menuklik=='selesai') {
        newarray.sort((a, b) => b.tgltindakanmili - a.tgltindakanmili);
    } */



  const selectedPhase = document.getElementById("phase-input-kiri").value;
  let allPhases = [];
  try {
    if (
      window.dataall &&
      Array.isArray(window.dataall.proc_temp_kiri_inputplan) &&
      window.dataall.proc_temp_kiri_inputplan.length > 0
    ) {
      const phaseMap = new Map();

      // 🔁 Loop semua plan historis
      window.dataall.proc_temp_kiri_inputplan.forEach((plan, i) => {
        try {
          const parsed = JSON.parse(plan.value);
          if (!Array.isArray(parsed)) return;

          parsed.forEach(phaseObj => {
            let datainvestor = [];

            if (Array.isArray(phaseObj.value)) {
              phaseObj.value.forEach(bank => {
                if (!Array.isArray(bank.cash_out)) return;

                bank.cash_out.forEach(co => {
                  if (co.name === "Investor" && co.nominal) {
                    let arr = [];
                    if (typeof co.nominal === "string" && co.nominal.trim().startsWith("[")) {
                      try {
                        arr = JSON.parse(co.nominal);
                      } catch {
                        arr = [];
                      }
                    } else if (Array.isArray(co.nominal)) {
                      arr = co.nominal;
                    }

                    // Tambahkan tiap transaksi ke list
                    arr.forEach(tx => {
                      datainvestor.push({
                        ...tx,
                        source_bank: bank.title || bank.nama_bank || "Unknown Bank",
                      });
                    });
                  }
                });
              });
            }

            // 🚀 Simpan ke phaseMap
            const phaseNum = Number(phaseObj.phase);
            if (!phaseMap.has(phaseNum)) {
              phaseMap.set(phaseNum, []);
            }

            if (datainvestor.length > 0) {
              phaseMap.get(phaseNum).push({
                tglmili: plan.tglinputmili,
                data: datainvestor,
              });
            }
          });
        } catch (err) {
          console.error(`❌ Gagal parse plan index ${i}:`, err);
        }
      });

      // 🚀 Ubah hasil Map ke array akhir
      allPhases = Array.from(phaseMap.entries()).map(([phase, datainvestor]) => ({
        phase,
        datainvestor,
      }));

      // Urutkan phase dari kecil ke besar
      allPhases.sort((a, b) => a.phase - b.phase);

    } else {
      console.warn("⚠️ window.dataall.proc_temp_kiri_inputplan kosong atau tidak valid");
    }
  } catch (err) {
    console.error("❌ Gagal proses data investor:", err);
    allPhases = [];
  }
  // function filterInvestorByDate(phases) {
  //   const inputTanggal = document.getElementById('date-input-kiri')?.value;

  //   if (!inputTanggal) {
  //     console.warn("⚠️ Input tanggal kosong, tidak ada filter yang diterapkan.");
  //     return phases;
  //   }

  //   console.log("📅 Input tanggal dari user:", inputTanggal);

  //   // 🔧 Helper: konversi milisecond ke format YYYY-MM-DD
  //   const toDateString = (mili) => {
  //     const d = new Date(Number(mili));
  //     const y = d.getFullYear();
  //     const m = String(d.getMonth() + 1).padStart(2, "0");
  //     const day = String(d.getDate()).padStart(2, "0");
  //     return `${y}-${m}-${day}`;
  //   };

  //   // 🧹 Proses filter per phase
  //   const filteredPhases = phases.map((phase) => {
  //     const newDatainvestor = (phase.datainvestor || []).map((batch) => {
  //       // Filter data berdasarkan tanggal
  //       const filteredData = (batch.data || []).filter((item) => {
  //         const itemDate = toDateString(item.tglmilichecked);
  //         const inputTanggal1 = (inputTanggal);

  //         return itemDate !== inputTanggal1;
  //       });

  //       return {
  //         ...batch,
  //         data: filteredData,
  //       };
  //     });

  //     return {
  //       ...phase,
  //       datainvestor: newDatainvestor,
  //     };
  //   });

  //   console.log("🎯 Hasil filter berdasarkan tanggal:", filteredPhases);
  //   return filteredPhases;
  // }
  // 🧹 Filter transaksi agar data yang sudah diceklis di tanggal / phase lain tidak muncul lagi
  function filterNewInvestorTransactions(investorList, phases, selectedPhase) {
    if (!Array.isArray(investorList) || !Array.isArray(phases)) return investorList;

    const inputTanggal = document.getElementById("date-input-kiri")?.value;
    if (!inputTanggal) {
      console.warn("⚠️ Input tanggal kosong, filter tanggal di-skip");
    }

    // Helper ubah milisecond ke format YYYY-MM-DD
    const toDateString = (mili) => {
      const d = new Date(Number(mili));
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    // 🧾 Kumpulkan semua transaksi yang SUDAH diceklis
    const checkedMap = new Map(); // id_transaksi → { phase, date }

    phases.forEach((phase) => {
      if (!Array.isArray(phase.datainvestor)) return;

      phase.datainvestor.forEach((batch) => {
        if (!Array.isArray(batch.data)) return;

        batch.data.forEach((item) => {
          if (!Array.isArray(item.details)) return;
          if (!item.tglmilichecked) return; // hanya data yang sudah diceklis

          const date = toDateString(item.tglmilichecked);

          item.details.forEach((d) => {
            if (!d.id_transaksi) return;
            checkedMap.set(d.id_transaksi, {
              phase: Number(phase.phase),
              date,
            });
          });
        });
      });
    });


    console.log("investorList", investorList);
    console.log("investorList", phases);
    // cari phase yang dipilih
    const currentPhase = phases.find(p => p.phase === selectedPhase);

    let filteredInvestorList = investorList;

    if (currentPhase && currentPhase.datainvestor.length > 0) {
      // ambil semua transaksi di phase tersebut
      const phaseDataTransactions = currentPhase.datainvestor.flatMap(inv => inv.data);

      // ambil semua tglmili (atau newtglinputmili) yang sudah ada di phase ini
      const existingMilis = phaseDataTransactions.map(d => Number(d.newtglinputmili));

      // filter investorList untuk hapus data yang sudah ada
      filteredInvestorList = investorList.filter(
        inv => !existingMilis.includes(inv.newtglinputmili)
      );

      console.log(`🗑️ Hapus ${investorList.length - filteredInvestorList.length} data karena sudah ada di phase ${selectedPhase}`);
    } else {
      console.log(`✅ Phase ${selectedPhase} belum ada data, investorList tetap utuh`);
    }

    console.log("💡 Hasil akhir:", filteredInvestorList);

    // 🚮 Filter investorList
    const cleaned = filteredInvestorList.filter((inv) => {
      if (!Array.isArray(inv.details)) return true;

      return inv.details.every((d) => {
        const meta = checkedMap.get(d.id_transaksi);
        if (!meta) return true; // belum diceklis → tampil

        const samePhase = meta.phase === Number(selectedPhase);
        const sameDate = inputTanggal && meta.date === inputTanggal;

        // tampil hanya kalau fase & tanggal sama
        return samePhase && sameDate;
      });
    });

    console.log(
      `✅ Cleaned Investor Data (phase ${selectedPhase} / tanggal ${inputTanggal}):`,
      cleaned,
      "dari total",
      investorList
    );

    return cleaned;
  }

  newarrayInvestor = filterNewInvestorTransactions(newarray, allPhases, selectedPhase);
}


function formatDateString(mili) {
  const date = new Date(parseInt(mili));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getStartOfDayMillis(dateStr) {
  const [day, month, year] = dateStr.split('/');
  return new Date(`${year}-${month}-${day}T00:00:00`).getTime();
}
function formatTanggalIndonesia(milisekon) {
  const date = new Date(parseInt(milisekon));
  console.log('date =====');
  console.log(date);
  const bulanIndonesia = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const hari = String(date.getDate()).padStart(2, '0');
  const bulan = bulanIndonesia[date.getMonth()];
  const tahun = date.getFullYear();

  return `${hari} ${bulan} ${tahun}`;
}
function ceknamabulan(milisekon) {
  const date = new Date(parseInt(milisekon));
  const bulanIndonesia = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const bulan = bulanIndonesia[date.getMonth()];

  return `${bulan}`;
}
function formatIDdate(mili) {
  const date = new Date(parseInt(mili));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}${month}${year}`;
}


//kliktindak
var instoretindak = false;
var editingdatas;
function kliksavetindak(data) {
  console.log("Data masuk:", data);
  editingdatas = data
  // hitung total semua totalprice
  const totalSemua = data.reduce((acc, item) => acc + (item.totalprice || 0), 0);
  console.log("💰 Total Semua:", totalSemua);

  $("#modalkliktindak").modal("show");
  // reset
  document.getElementById("uploadfileimgvideo-modalkliktindak").value = "";
  document
    .getElementById("statuschangefileupload-modalkliktindak")
    .classList.remove("bi-check-lg");
  document
    .getElementById("statuschangefileupload-modalkliktindak")
    .classList.add("bi-plus-lg");

  document.getElementById("pernyataanchecked-modalkliktindak").checked = false;
  document.getElementById("sumberrekening-modalkliktindak").value = "Sumber Rekening";

  // tampilkan total ke elemen HTML
  document.getElementById("total-modalkliktindak").innerHTML =
    `Rp ${formatMoney(totalSemua)}`;

  // contoh kalau kamu mau status & tanggal dari item pertama
  if (data.length > 0) {
    const dataPertama = data[0];
    document.getElementById("statuswarna-modalkliktindak").style.backgroundColor = "darkred";
    document.getElementById("status-modalkliktindak").innerHTML =
      dataPertama.newstatus;
  }
}


//tutup kliktindak

//// klik upload files foto video ////
function klikuploadimgorvid(e) {
  if (instoreklik == false) {
    document.getElementById("uploadfileimgvideo-modalkliktindak").click();
  } else {
    if (instoretindak == true) {
      document.getElementById("uploadfileimgvideo-modalkliktindak").click();
      //instoretindak=false;
    } else {
      document.getElementById("uploadfileimgvideo-modalkliktolak").click();
    }
  }
}

var imgvideourl = "";
var filenameimgvideo = "";
var filedatf;

document.getElementById("uploadfileimgvideo-modalkliktindak").addEventListener("change", function (event) {
  var file = event.target.files[0];
  filedatf = event.target.files;
  var reader = new FileReader();

  if (
    file.type == "image/png" ||
    file.type == "image/jpg" ||
    file.type == "image/jpeg" ||
    file.type == "image/gif"
  ) {
    ///||file.type == "video/mp4"||file.type == "video/mkv"||file.type == "video/mov"
    imgvideourl = URL.createObjectURL(event.target.files[0]);

    filenameimgvideo = file.name;

    reader.onload = function (e) {
      var fileData = e.target.result.substr(e.target.result.indexOf(",") + 1);
      var mimeTypeStart = e.target.result.indexOf("data:") + 5;
      var mimeTypeEnd = e.target.result.indexOf(";");
      var mimeType = e.target.result.substr(
        mimeTypeStart,
        mimeTypeEnd - mimeTypeStart
      );
      var fileName = file.name;

      filedata1 = fileData;
      mimetype1 = mimeType;
      filename1 = fileName;
    };

    console.log(filedatf[0]);
    console.log(
      `ini = ${document.getElementById("uploadfileimgvideo-modalkliktindak").value
      }`
    );
    reader.readAsDataURL(file);
  } else {
    Swal.fire({
      icon: "error",
      text: "Format harus gambar",

      confirmButtonColor: "#0d6efd",
      confirmButtonText: "Ok",
      allowOutsideClick: true,
    });
  }
  console.log("tipe filess");
  console.log(filedatf[0].type.split("/")[1]);

  document.getElementById(
    "statuschangefileupload-modalkliktindak"
  ).className = "bi bi-check-lg";

});

document.getElementById("uploadfileimgvideo-modalkliktolak").addEventListener("change", function (event) {
  var file = event.target.files[0];
  filedatf = event.target.files;
  var reader = new FileReader();

  if (
    file.type == "image/png" ||
    file.type == "image/jpg" ||
    file.type == "image/jpeg" ||
    file.type == "image/gif"
  ) {
    ///||file.type == "video/mp4"||file.type == "video/mkv"||file.type == "video/mov"
    imgvideourl = URL.createObjectURL(event.target.files[0]);

    filenameimgvideo = file.name;

    reader.onload = function (e) {
      var fileData = e.target.result.substr(e.target.result.indexOf(",") + 1);
      var mimeTypeStart = e.target.result.indexOf("data:") + 5;
      var mimeTypeEnd = e.target.result.indexOf(";");
      var mimeType = e.target.result.substr(
        mimeTypeStart,
        mimeTypeEnd - mimeTypeStart
      );
      var fileName = file.name;

      filedata1 = fileData;
      mimetype1 = mimeType;
      filename1 = fileName;
    };

    console.log(filedatf[0]);
    console.log(
      `ini = ${document.getElementById("uploadfileimgvideo-modalkliktolak").value
      }`
    );
    reader.readAsDataURL(file);
  } else {
    Swal.fire({
      icon: "error",
      text: "Format harus gambar",

      confirmButtonColor: "#0d6efd",
      confirmButtonText: "Ok",
      allowOutsideClick: true,
    });
  }
  console.log("tipe filess");
  console.log(filedatf[0].type.split("/")[1]);

  document.getElementById(
    "statuschangefileupload-modalkliktolak"
  ).className = "bi bi-check-lg";

});

// Daftar ekstensi gambar dan video
const imageExtensions = [".jpg", ".jpeg", ".png"];
const videoExtensions = [".mp4", ".mov", ".mkv"];

function getFileType(filePath) {
  const lowerPath = filePath.toLowerCase();
  if (imageExtensions.some((ext) => lowerPath.endsWith(ext))) {
    return "image";
  } else if (videoExtensions.some((ext) => lowerPath.endsWith(ext))) {
    return "video";
  } else {
    return "unknown";
  }
}
//// tutup klik upload files foto video ////

///klik selesai
function submitselesai() {
  var filetypecek = getFileType(filenameimgvideo);

  console.log("imgvideourl ----");
  console.log(filenameimgvideo);

  if (
    document.getElementById("uploadfileimgvideo-modalkliktindak").value != "" &&
    document.getElementById("pernyataanchecked-modalkliktindak").checked ==
    true &&
    document.getElementById("sumberrekening-modalkliktindak").value !=
    "Sumber Rekening"
  ) {
    if (filetypecek == "image") {
      loadingpopup();
      hidemodal("modalkliktindak");
      console.log("ini image");
      senduploadfoto("bank-limbo", "banklimbo", "uploadimage_drafplaninvestor");
      //savefixselesai('folderfoto');
    } else {
      warningpopup("error", "format file harus gambar");
    }
  } else {
    warningpopup("error", "Isi dengan lengkap");
  }
}

function senduploadfoto(foldersaveit, nmfiles, linkxzz) {
  console.log("send foto");
  const d = new Date();
  let time = d.getTime();
  let year = d.getFullYear();
  var folderyear = year;

  var extensifile = filedatf[0].type.split("/")[1];

  //tanggal dd namabulan yyyy
  var tglx =
    formatTanggalIndonesia(editingdatas[0].newtglinputmili).replaceAll(" ", "") +
    "-" +
    formatTanggalIndonesia(editingdatas[0].newtglinputmili).split(" ")[2];
  console.log("tglx ===");
  console.log(tglx);
  //

  var folderfoto = `/assets/${foldersaveit}/${folderyear}/${nmfiles}-${tglx}-${time}.png`;

  const formData = new FormData();
  formData.append("upload", filedatf[0], `${nmfiles}-${tglx}-${time}.png`);

  console.log("size == " + filedatf[0].size);

  var xhrz1 = new XMLHttpRequest();

  xhrz1.open("POST", `/finance/${linkxzz}`, true);
  //xhrz1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //xhrz1.setRequestHeader('authorization', xi);
  xhrz1.send(formData);
  xhrz1.onload = function () {
    var resdat = JSON.parse(xhrz1.responseText);
    setTimeout(function () {
      Swal.getHtmlContainer().querySelector("#loadingpersenpopoups").value = 60;
      if (resdat.uploaded == "file terupload") {
        loadingpopup();
        updateDataSettleFetch(afteruploadImage);
      } else {
        Swal.fire({
          icon: "error",
          title: `${resdat.uploaded}, coba lagi [1]`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }, 2000);
    //setTimeout(function () {},2000);
  };
  xhrz1.onerror = function () {
    Swal.fire({
      icon: "error",
      title: `Upload error, coba lagi [1]`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
}
///////////////////// totabelkiriCashout /////////////////////
function totabelkiriCashout(arrayVendor) {
  let currentPhase = document.getElementById('phase-input-kiri').value;
  filterDateKiri();
  // 1️⃣ Parse data plan
  let dataplan;
  try {
    const valueStr = window.filteredByDate?.[0]?.value;
    dataplan = valueStr ? JSON.parse(valueStr) : [];
  } catch (err) {
    console.error("❌ Gagal parse JSON window.filteredByDate:", err);
    return [];
  }

  console.log("totabelkiriCashout ✅ Parsed dataplan:", dataplan);
  console.log("totabelkiriCashout ✅ Data vendor:", arrayVendor);
  console.log(`totabelkiriCashout 🎯 Current Phase aktif: ${currentPhase}`);

  const inputTanggal = document.getElementById("date-input-kiri").value;
  const today = new Date().toISOString().split("T")[0];


  // 2️⃣ Reset nominal, expired, dan settle check
  dataplan.forEach(phaseObj => {
    const phaseNum = Number(phaseObj.phase);

    // ✅ Pastikan nilai default-nya
    if (phaseObj.settle == null) phaseObj.settle = "false";
    if (phaseObj.expiredphase == null) phaseObj.expiredphase = "false";

    // 🧭 Deteksi phase saat ini
    selectedPhase = getCurrentPhase(dataInputLeftContent.phaseduration);

    // 💀 Jika phase lebih kecil dari currentPhase → expired
    if (phaseNum < Number(selectedPhase)) {
      if (phaseObj.settle !== "true") {
        if (inputTanggal > today) {
          phaseObj.expiredphase = "true";
        } else {
          phaseObj.expiredphase = "false";
        }
        phaseObj.expiredphase = "true";
      } else {
        phaseObj.expiredphase = "false";
      }
    }

    // 🔥 Jika expiredphase true → semua nominal di-nol-kan
    if (phaseObj.expiredphase === "true") {
      console.log(`⚠️ Phase ${phaseNum} expired → reset semua nominal ke 0`);

      if (Array.isArray(phaseObj.value)) {
        phaseObj.value.forEach(bank => {
          // Reset semua bagian nominal di setiap section bank
          const sections = ["balance", "cash_in", "cash_out", "others", "Deposito"];
          sections.forEach(section => {
            if (Array.isArray(bank[section])) {
              bank[section].forEach(entry => {
                // Kalau nominal adalah string JSON (contoh Investor)
                if (typeof entry.nominal === "string" && entry.nominal.trim().startsWith("[")) {
                  entry.nominal = "[]"; // reset jadi array kosong
                } else {
                  entry.nominal = 0; // reset jadi 0
                }
              });
            }
          });
        });
      }

      // Reset juga data_bayar-nya
      phaseObj.data_bayar = [];
    }

    // 🧹 Untuk phase aktif (belum expired), reset nominal hanya untuk bank GAHARA
    if (phaseObj.expiredphase === "false" && phaseObj.settle === "false") {
      if (Array.isArray(phaseObj.value)) {
        phaseObj.value.forEach(bank => {
          if (bank.title === "GAHARA" && Array.isArray(bank.cash_out)) {
            bank.cash_out.forEach(cash => cash.nominal = 0);
          }
        });
      }
      phaseObj.data_bayar = [];
    }
  });

  // 3️⃣ Masukkan data vendor ke phase yang belum settle & belum expired
  arrayVendor.forEach(vendor => {
    const phaseVendor = Number(vendor.phase_tindak) || 0;

    if (phaseVendor < currentPhase) {
      console.log(`⏩ Skip ${vendor.vendor} (${vendor.item}) karena phase ${phaseVendor} < ${currentPhase}`);
      return;
    }

    const phaseIndex = dataplan.findIndex(p => Number(p.phase) === phaseVendor);
    if (phaseIndex === -1) {
      console.warn(`⚠️ Phase ${phaseVendor} tidak ditemukan`);
      return;
    }

    const targetPhase = dataplan[phaseIndex];
    if (targetPhase.settle !== "false" || targetPhase.expiredphase === "true") {
      console.log(`⏭️ Skip update phase ${phaseVendor} (settle=${targetPhase.settle}, expired=${targetPhase.expiredphase})`);
      return;
    }

    const gaharaBank = targetPhase.value.find(v => v.title === "GAHARA");
    if (!gaharaBank) return;

    let targetCategory = null;
    if (vendor.pendingpayment === "true") {
      targetCategory = gaharaBank.cash_out.find(c => c.name === "Pending Payments");
    } else if (vendor.tipeitem === "Bill") {
      targetCategory = gaharaBank.cash_out.find(c => c.name === "Bills");
    } else {
      targetCategory = gaharaBank.cash_out.find(c => c.name === "Regular Expense");
    }

    if (!targetCategory) return;

    const nominalNumber = Number(vendor.totalterbayar) || 0;
    targetCategory.nominal += nominalNumber;

    targetPhase.data_bayar.push({
      ...vendor,
      kategori: targetCategory.name
    });

    console.log(`✅ ${vendor.vendor} (${vendor.item}) masuk ke "${targetCategory.name}" [Phase ${phaseVendor}] | +${nominalNumber}`);
  });


  flag = 1;

  // setTimeout(() => {
  const hasUnsettled = dataplan.some(p => p.settle === "false");
  if (hasUnsettled) {
    console.log("🚀 Menjalankan totabelkiriCashoutFetch (ada phase belum settle)...");
    totabelkiriCashoutFetch(dataplan);
  } else {
    console.log("✅ Semua phase sudah settle, tidak ada data untuk di-update.");
  }
  filterDateKiri();
  // }, 800);

  // 4️⃣ Simpan & fetch jika masih ada phase aktif
  console.log("totabelkiriCashout 📊 Hasil akhir dataplan:", dataplan);
  return dataplan;
}

///////////////////// end totabelkiriCashout /////////////////////
