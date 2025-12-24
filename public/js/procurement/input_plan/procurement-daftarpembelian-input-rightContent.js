function DOMawalkanan() {
    // Toggle Overview & List Collapse
    const toggleButtons = document.querySelectorAll('.overview-toggle-btn, .list-toggle-btn');

    toggleButtons.forEach(button => {
        const targetId = button.getAttribute('data-bs-target');
        const wrapper = document.querySelector(targetId);
        const icon = button.querySelector('.toggle-icon-overview, .toggle-icon-list');

        if (wrapper && icon) {
            wrapper.addEventListener('show.bs.collapse', function () {
                icon.classList.remove('bi-chevron-down');
                icon.classList.add('bi-chevron-up');
            });

            wrapper.addEventListener('hide.bs.collapse', function () {
                icon.classList.remove('bi-chevron-up');
                icon.classList.add('bi-chevron-down');
            });

            if (wrapper.classList.contains('show')) {
                icon.classList.add('bi-chevron-up');
            } else {
                icon.classList.add('bi-chevron-down');
            }
        }
    });

    // === Integrasi ke fungsi toggleSideBar ===
    window.addEventListener("toggleSideBarEvent", () => {
        const sidebar = document.querySelector(".sidebar");
        const listWrapper = document.getElementById("listViewWrapper");
        if (!listWrapper || !sidebar) return;

        if (sidebar.classList.contains("collapsed")) {
            // HALF MODE 
            listWrapper.classList.remove("list-full-mode");
            listWrapper.classList.add("list-half-mode");
        } else {
            // FULL MODE 
            listWrapper.classList.remove("list-half-mode");
            listWrapper.classList.add("list-full-mode");
        }
    });

    // set default date filter
    // const dateInput = document.getElementById("dateFilter");
    // if (dateInput) {
    //     dateInput.value = getTodayID(); 
    // }

    // const scrollContainer = document.querySelector(".scroll-stable");
    // const tableWrapper = document.querySelector("tabelscrollbawah");
    // const table = document.getElementById("tableList-right-bottom");

    // // Simpan tinggi awal tabel
    // //const defaultHeight = tableWrapper.offsetHeight;

    // scrollContainer.addEventListener("scroll", function () {
    //     console.log('scrolll----===---===-=-====--');
        
    //     const scrollTop = scrollContainer.scrollTop;
    //     const scrollHeight = scrollContainer.scrollHeight;
    //     const clientHeight = scrollContainer.clientHeight;

    //     // Cek apakah sudah mentok bawah
    //     const nearBottom = scrollTop + clientHeight >= scrollHeight - 5;

    //     // if (nearBottom) {
    //     //     // Aktifkan scroll tabel
    //     //     tableWrapper.style.maxHeight = "calc(100vh - 250px)";
    //     //     tableWrapper.style.overflowY = "auto";
    //     //     tableWrapper.style.paddingRight = "4px"; // biar scrollbar gak nutup teks
    //     // } else {
    //     //     // Kembalikan seperti semula
    //     //     tableWrapper.style.maxHeight = '';
    //     //     tableWrapper.style.overflowY = "visible";
    //     // }
    // });

};

/**
 * @describe function untuk menentukan tanggal hari ini
 */
function getTodayID() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
}

////socket io
socket.on('updateProcnote', function (datas) {
    var dataarray=window.dataall;

    for (const element of dataarray.datarequestbeli_proc) {
        if (Number(element.no)==datas.no) {
            var note_approver=JSON.parse(element.note_approver);
            note_approver.procurement=datas.note_approver;
            element.note_approver=JSON.stringify(note_approver);
        }
    }

    window.dataall=dataarray;
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('updateVendorBawah', function (datas) {
    var dataarray=window.dataall;

    for (const element of dataarray.datarequestbeli_proc) {
        if (Number(element.no)==datas.no) {
            
            element.vendor=datas.vendor;
        }
    }

    window.dataall=dataarray;
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

socket.on('updatez_qtyBawah', function (datas) {
    var dataarray=window.dataall;

    for (const element of dataarray.datarequestbeli_proc) {
        if (Number(element.no)==datas.no) {
            
            element.z_qty=datas.z_qty;
            element.totalprice=Number(datas.z_qty<=0||datas.z_qty==''?element.qty:datas.z_qty)*Number(element.priceunit);
        }
    }

    window.dataall=dataarray;
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

//updatez_savetotalbayar
socket.on('updatez_savetotalbayar', function (datas) {
    var dataarray=window.dataall;

    for (const element of datas) {
        var dataupdates=dataarray.datarequestbeli_proc.find((item)=>item.no===element.no);
        if (dataupdates) {
            dataupdates.totalprosesbayar = element.totalprosesbayar;
        }
    }

    window.dataall=dataarray;
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});

//updatez_paymentatassele
socket.on('updatez_paymentatassele', function (datas) {
    var dataarray=window.dataall;

    for (const element of datas) {
        var dataupdates=dataarray.datarequestbeli_proc.find((item)=>item.no===element.no);
        if (dataupdates) {
            dataupdates.totalterbayar = element.totalterbayar;
            
            dataupdates.status_tersisa=element.status_tersisa;
            dataupdates.check_bayar=element.check_bayar;
            dataupdates.old_sisa=element.old_sisa;
            dataupdates.now_sisa=element.now_sisa;
        }
    }

    window.dataall=dataarray;
    loadingbawahupdate(dataarray.datarequestbeli_proc);
});




///////////////////////////////////////bottom table/////////////////////////////////////
function showtabel_right_bottom() {
    var dataarray=window.dataall.datarequestbeli_proc;
    console.log('showtabel_right_bottom',dataarray);

    var myobj = document.getElementById("divhapus-right-bottom");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`tableList-right-bottom`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhapus-right-bottom');

    console.log('array ========');
    console.log(dataarray);

    divhapus.innerHTML = returndataarray_rightBottom(dataarray, 'awal');

    datatab.appendChild(divhapus);
}

function returndataarray_rightBottom(array) {

    var hasil = array.filter(item => {
        let { procurement, supervisor, board } = JSON.parse(item.approvalorreject);
        let { tipeitem, limitedrequest,tindakbayar } = item;

        // aturan 1
        if (tipeitem === "Regular" && limitedrequest === "false" && procurement === "true" &&tindakbayar!='true') {
            return true;
        }

        // aturan 2
        if (tipeitem === "Regular" && limitedrequest === "true" && procurement === "true" && supervisor === "true"&&tindakbayar!='true') {
            return true;
        }

        // aturan 3
        if (tipeitem === "New Item" && limitedrequest === "false" && procurement === "true" && board === "true"&&tindakbayar!='true') {
            return true;
        }

        // aturan 4
        if (tipeitem === "Bill" && limitedrequest === "false" && procurement === "true"&&tindakbayar!='true') {
            return true;
        }

        return false;
    });

    console.log('hasil ===================+++++++++++++',hasil);

    /////////////////// filter ///////////////////////
    var dateFilter=document.getElementById('dateFilter').value;
    var vendorFilter=document.getElementById('vendorFilter').value;
    var itemFilter=document.getElementById('itemFilter').value;

    console.log('vendorFilter====-=-=0-=0-=',vendorFilter)

    var hasilfilter=filterData(hasil, { dateInput:dateFilter, vendorInput:vendorFilter, itemInput:itemFilter });

    ////////////////// sort /////////////////////////
    var sortselek=document.getElementById('sortselek');
    var datasort;
    if (sortselek.value.toLowerCase()=='default') {
        datasort= sortDefault(hasilfilter);
    }else if (sortselek.value.toLowerCase()=='item a-z') {
        console.log('item a-z===============');
        datasort= sortItem(hasilfilter,'az');
    }else if (sortselek.value.toLowerCase()=='item z-a') {
        console.log('item a-z===============');
        datasort= sortItem(hasilfilter,'za');
    }else if (sortselek.value.toLowerCase()=='total a-z') {
        datasort= sortTotal(hasilfilter,'az');
    }else if (sortselek.value.toLowerCase()=='total z-a') {
        datasort= sortTotal(hasilfilter,'za');
    }
    
    
    return datasort.map((item)=>{
        const myDate = new CustomDateFormatter(Number(item.estimasi_bayar_mili)); // Ganti dengan milidetik

        var date=myDate.format('dd/mm/yyyy');

        console.log('Number(item.z_qty)*Number(item.priceunit)====',Number(item.z_qty)*Number(item.priceunit));

        return `
            <tr class="font-smaller-9 greyunbolddraftplan" id="datatab bottom-${item.no}">
                <td class="col-mcheck text-center align-middle text-start greyunbolddraftplan">
                    <div class="form-check d-flex justify-content-center align-items-center">
                        <input class="form-check-input greyunbolddraftplan" type="checkbox" value="" id="mcheck-right-bottom-${item.no}" onclick="klikMproses(this, '${item.no}','${item.vendor}')" ${item.proses_bayar=='true'?'checked':''} ${item.cash=='true'?'disabled':''}>
                    </div>
                </td>

                <td class="col-date greyunbolddraftplan">${date}</td>

                <td class="col-item text-uppercase greyunbolddraftplan" title="${item.item}">
                    <textarea class="cell-ellipsis greyunbolddraftplan" readonly>${item.item}</textarea>
                </td>

                <td class="col-division text-start text-uppercase hidden-half greyunbolddraftplan" title="${item.itemdivisi}">${item.itemdivisi}</td>

                <td class="col-vendor text-uppercase greyunbolddraftplan hidden-half" title="${item.vendor}" onclick="klikeditvendor(this)" id="vendor_bawah-${item.no}">
                    <span class=" greyunbolddraftplan">${item.vendor}</span>
                    <input class="form-control form-control-sm d-none font-smaller-9 greyunbolddraftplan" type="text" onblur="saveeditVendor(this)" list="vendorEditing-datalist-${item.no}" style="width:100%;padding:0!important;">
                    <datalist id="vendorEditing-datalist-${item.no}">
                            ${listvendorAll}
                    </datalist>
                </td>
                
                <td class="col-price hidden-half text-start greyunbolddraftplan">${formatMoney(item.priceunit)}</td>

                <td class="col-zqty hidden-half text-center greyunbolddraftplan d-flex align-items-center justify-content-center" onclick="klikeditzqty(this)" id="zqty_bawah-${item.no}">
                
                    <span class=" greyunbolddraftplan" data-value="${item.z_qty}">${Number(item.z_qty).toFixed(2)}</span>
                    
                    <input class="form-control form-control-sm d-none font-smaller-9 nospinner greyunbolddraftplan" type="number" onblur="saveeditZqty(this)" min="0" step="0.000000000000001" value="0" style="padding:0!important;width: 100%!important;margin: 0!important;">
                
                </td>

                <td class="col-qty hidden-half text-center greyunbolddraftplan" name="qty-right-bottom">${item.qty}</td>
                <td class="col-unit hidden-half text-center text-uppercase greyunbolddraftplan">${item.unit}</td>

                <td class="col-total text-end greyunbolddraftplan">${formatMoney(item.z_qty==''||Number(item.z_qty)<1?item.totalprice:Number(item.z_qty)*Number(item.priceunit))}</td>

                <td class="col-pronotes hidden-half text-end text-uppercase greyunbolddraftplan" onclick="klikeditpronotes(this)" id="pronotes-${item.no}" title="${JSON.parse(item.note_approver).procurement==''?'-':JSON.parse(item.note_approver).procurement}">${JSON.parse(item.note_approver).procurement==''?'-':JSON.parse(item.note_approver).procurement}</td>

                <td class="col-reqnotes hidden-half text-end text-uppercase greyunbolddraftplan" title="${item.note_req==''?'':item.note_req}">${item.note_req==''?'':item.note_req}</td>
                
                <td class="col-detail text-center greyunbolddraftplan">
                    <button class="btn btn-sm p-0 border-0 greyunbolddraftplan" onclick="klikdetails('${item.no}')">•••</button>
                </td>
            </tr>
        `;
    }).join('');
}

function kliksortselek(e) {
    showtabel_right_bottom();
}

// --- SORT DEFAULT ---
// vendor A-Z, kalau vendor sama maka berdasarkan deadline (kecil ke besar)
function sortDefault(data) {
    return [...data].sort((a, b) => {
        const vendorA = (a.vendor || "").toLowerCase();
        const vendorB = (b.vendor || "").toLowerCase();

        if (vendorA < vendorB) return -1;
        if (vendorA > vendorB) return 1;

        // jika vendor sama → urutkan berdasarkan deadline (numeric)
        const deadlineA = Number(a.deadline) || 0;
        const deadlineB = Number(b.deadline) || 0;
        return deadlineA - deadlineB;
    });
}

// --- SORT ITEM ---
// urutkan berdasarkan nama item A-Z
function sortItem(data,az) {
    if (az=='az') {
        return [...data].sort((a, b) => {
            const itemA = (a.item || "").toLowerCase();
            const itemB = (b.item || "").toLowerCase();
            if (itemA < itemB) return -1;
            if (itemA > itemB) return 1;
            return 0;
        });
    }else{
        return [...data].sort((a, b) => {
            const itemA = (a.item || "").toLowerCase();
            const itemB = (b.item || "").toLowerCase();
            if (itemA < itemB) return 1;
            if (itemA > itemB) return -1;
            return 0;
        });
    }
    
}

// --- SORT TOTAL ---
// urutkan berdasarkan totalprice (numeric ascending)
function sortTotal(data,az) {
    if (az=='az') {
        return [...data].sort((a, b) => {
            const totalA = Number(a.totalprice) || 0;
            const totalB = Number(b.totalprice) || 0;
            return totalA - totalB;
        });
    }else{
        return [...data].sort((a, b) => {
            const totalA = Number(a.totalprice) || 0;
            const totalB = Number(b.totalprice) || 0;
            return totalB - totalA;
        });
    }
}

////////////////////////////////////////////////////////
//filter
function filterData(data, { dateInput, vendorInput, itemInput }) {
    return data.filter(d => {
        let matchDate = true;
        let matchVendor = true;
        let matchItem = true;

        // Filter berdasarkan tanggal (deadline atau tglinputmili, pilih sesuai kebutuhan)
        if (dateInput) {
            const tanggal = new Date(parseInt(d.deadline)); // atau d.tglinputmili
            const inputTanggal = new Date(dateInput); // format input "YYYY-MM-DD"
            matchDate = tanggal.toDateString() === inputTanggal.toDateString();
        }

        // Filter berdasarkan vendor
        if (vendorInput) {
            matchVendor = d.vendor.toLowerCase().includes(vendorInput.toLowerCase());
        }

        // Filter berdasarkan item
        if (itemInput) {
            matchItem = d.item.toLowerCase().includes(itemInput.toLowerCase());
        }

        return matchDate && matchVendor && matchItem;
    });
}

function cekFilterData() {
    showtabel_right_bottom();
}









/////////////////////////////////////////
var currentTdVendor=null;
function klikeditvendor(td) {
    currentTdVendor=td;
    // Tutup semua cell vendor terlebih dahulu
    document.querySelectorAll("td.col-vendor").forEach(cell => {
        let span = cell.querySelector("span");
        let input = cell.querySelector("input");

        span.classList.remove("d-none");
        input.classList.add("d-none");
    });

    // Baru buka cell yang diklik
    let span = td.querySelector("span");
    let input = td.querySelector("input");

    span.classList.add("d-none");
    input.classList.remove("d-none");
    input.value = span.innerText.trim();
    input.focus();

    // // trik agar datalist muncul langsung:
    // setTimeout(() => {
    //     input.dispatchEvent(new Event("input", {bubbles:true}));
    // }, 50);
}
function saveeditVendor(el) {
    // Tutup semua cell vendor terlebih dahulu
    document.querySelectorAll("td.col-vendor").forEach(cell => {
        let span = cell.querySelector("span");
        let input = cell.querySelector("input");

        span.classList.remove("d-none");
        input.classList.add("d-none");
    });

    if (currentTdVendor&&currentTdVendor.querySelector("span").innerText !=el.value) {
        let span = currentTdVendor.querySelector("span");
        span.innerText=el.value;

        var no=Number(currentTdVendor.id.replace('vendor_bawah-',''));

        var data={
            no,
            vendor:el.value
        }

        console.log('savevendorproc',data);

        fetch('/procurement/savevendorproc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': xi
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(resdat => {
            console.log('resdat');
            console.log(resdat);

            if (resdat.icons == 'success') {
                
                socket.emit('updateVendorBawah', data);

            } else {
                warningpopup('error', 'gagal save vendor bawah');
                
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'error catch : ' + error);
        });
    }
}

////////////////////////////////////////////////////////
var currentTdZqty=null;
function klikeditzqty(td) {
    currentTdZqty=td;
    console.log('currentTdZqty================================',currentTdZqty);
    // Tutup semua cell vendor terlebih dahulu
    document.querySelectorAll("td.col-zqty").forEach(cell => {
        let span = cell.querySelector("span");
        let input = cell.querySelector("input");

        span.classList.remove("d-none");
        input.classList.add("d-none");
    });
    
    // Baru buka cell yang diklik
    let span = td.querySelector("span");
    let input = td.querySelector("input");

    span.classList.add("d-none");
    input.classList.remove("d-none");
    input.value = span.dataset.value;
    input.focus();

}

function saveeditZqty(el) {
    // Tutup semua cell vendor terlebih dahulu
    document.querySelectorAll("td.col-zqty").forEach(cell => {
        let span = cell.querySelector("span");
        let input = cell.querySelector("input");

        span.classList.remove("d-none");
        input.classList.add("d-none");
    });

    if (currentTdZqty&&currentTdZqty.querySelector("span").dataset.value !=el.value) {
        let span = currentTdZqty.querySelector("span");
        span.innerText=el.value;//.toFixed(2);
        //span.dataset.value=el.value;

        var no=Number(currentTdZqty.id.replace('zqty_bawah-',''));

        var data={
            no,
            z_qty:el.value
        }

        console.log('savezqtyproc',data);

        fetch('/procurement/savezqtyproc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': xi
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(resdat => {
            console.log('resdat');
            console.log(resdat);

            if (resdat.icons == 'success') {
                
                socket.emit('updatez_qtyBawah', data);

            } else {
                warningpopup('error', 'gagal save z qty');
                
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'error catch : ' + error);
        });
    }
}
////////////////////////////////////////////////////////

// Popover logic
const popover = document.getElementById("popoverEdit");
const textarea = document.getElementById("editTextarea");
let currentTd = null;

function klikeditpronotes(td) {
    currentTd = td;
    console.log('currentTd',currentTd.className);
    textarea.value = td.innerText.trim();

    // Tampilkan popover sementara untuk mendapatkan ukurannya
    popover.style.display = "block";
    popover.style.visibility = "hidden";

    const rect = td.getBoundingClientRect();
    const popWidth = popover.offsetWidth;
    const popHeight = popover.offsetHeight;

    // Deteksi lebar sidebar (misalnya dengan class 'sidebar-open')
    const sidebar = document.querySelector('.sidebar');
    const sidebarWidth = sidebar && sidebar.classList.contains('collapsed') ? 80 : 290;

    // Posisikan popover di tengah sel
    popover.style.left = (rect.left + window.scrollX + (rect.width - popWidth) / 2 - sidebarWidth) + "px";
    popover.style.top = (rect.top + window.scrollY + (rect.height - popHeight) / 2) + "px";

    // Aktifkan kembali popover
    popover.style.visibility = "visible";
    textarea.focus();
}

function simpanEditPronotes() {
    if (currentTd&&currentTd.innerText != textarea.value) {
        currentTd.innerText = textarea.value;

        var no=Number(currentTd.id.replace('pronotes-',''));

        var data={
            no,
            note_approver:textarea.value
        }

        console.log('updateProcnote',data);

        fetch('/procurement/savenoteproc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': xi
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(resdat => {
            console.log('resdat');
            console.log(resdat);

            if (resdat.icons == 'success') {
                
                socket.emit('updateProcnote', data);

            } else {
                warningpopup('error', 'gagal save proc note');
                
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'error catch : ' + error);
        });
    }
    //popover.style.display = "none";
}

document.addEventListener("click", function(e) {
    if (popover.style.display === "block" && !popover.contains(e.target) && !e.target.hasAttribute("onclick")) {
        popover.style.display = "none";
        hidephaseedit();
    }
    else if (
        popover_payment_atas.style.display === "block" &&
        !popover_payment_atas.contains(e.target) &&
        currentTd_payment_atas &&
        !currentTd_payment_atas.contains(e.target)
    ) {
        hidePopover();
        hidephaseedit();
    }else if (currentTd_phase&&phaseedit_open==true&&!currentTd_phase.contains(e.target)) {
        
        hidephaseedit();
    }


});

function hidephaseedit() {
    if (currentTd_phase) {
        let span = currentTd_phase.querySelector("span");
        let div = currentTd_phase.querySelector("div");

        span.classList.remove("d-none");
        div.classList.add("d-none");
        phaseedit_open=false;
    }
    
}

//////////////////////////////////////////////////////////



// Fungsi untuk menyembunyikan popover
function hidePopover() {
    if (popover_payment_atas) {
        console.log('popover_payment_atas=====+++',popover_payment_atas)
        popover_payment_atas.style.display = "none";

        // Baru buka cell yang diklik
        let span = currentTd_payment_atas.querySelector("span");
        //let input = currentTd_payment_atas.querySelector("input");

        span.classList.remove("d-none");
        //input.classList.add("d-none");
        //input.value = span.innerText;
    }
}


////////////////////////// end klikeditpayment_atas ///////////////////////////////////////

///klikdetails
var onEdit_data={};
function klikdetails(no) {
    
    var dataarray=window.dataall.datarequestbeli_proc;
    var database_coa=window.dataall.database_coa;

    var dataklik=dataarray.find((item)=>item.no==Number(no));

    console.log('detail klik bottom right========',dataklik);

    const tgl_permintaan = new CustomDateFormatter(Number(dataklik.tglinputmili)).format('dd/mm/yyyy, hh:MM');
    const tgl_pemesanan = new CustomDateFormatter(Number(dataklik.deadline)).format('dd/mm/yyyy');

    document.getElementById('tgl-permintaan').innerText=tgl_permintaan;
    document.getElementById('tgl-pemesanan').innerText=tgl_pemesanan;


    document.getElementById('kodecoa-details').innerText=dataklik.kodecoa;
    var ketkodecoa_fix='';
    if (dataklik.kodecoa!='') {
        
        var ketkodecoa=database_coa.find((item)=>Number(item.kode)==Number(dataklik.kodecoa));
        document.getElementById('ket-kodecoa-details').innerText=ketkodecoa.keterangan;
        ketkodecoa_fix=ketkodecoa.keterangan;
    }

    document.getElementById('divisi-details').innerText=dataklik.itemdivisi;

    document.getElementById('hargeperunit-details').innerText=formatMoney(dataklik.priceunit);
    document.getElementById('zqty-details').innerText=dataklik.z_qty;
    document.getElementById('qty-details').innerText=dataklik.qty;
    
    document.getElementById('bank-details').innerText=dataklik.bank==''?'-':dataklik.bank;
    document.getElementById('vendor-details').innerText=dataklik.vendor==''?'-':dataklik.vendor;

    var databaseitem_proc=window.dataall.databaseitem_proc.find((item)=>item.item.toLowerCase().trim()==dataklik.item.toLowerCase().trim());

    if (databaseitem_proc) {
        
        document.getElementById('itemimage-details').innerText=databaseitem_proc.image;
        
        document.getElementById('notedatabase-details').innerText=databaseitem_proc.note;
    }
    document.getElementById('namaitem-details').innerText=dataklik.item;
    document.getElementById('qty2-details').innerText=`${dataklik.qty} X ${dataklik.unit}`;
    document.getElementById('totalprice-details').innerText=formatMoney(dataklik.totalprice);

    document.getElementById('noterequester-details').innerText=dataklik.note_req;
    document.getElementById('noteprocurement-details').innerText=JSON.parse(dataklik.note_approver).procurement;

    if (dataklik.pendingpayment=='true') {
        document.getElementById('pendingpayment-details').classList.remove('d-none');
    }else{
        document.getElementById('pendingpayment-details').classList.add('d-none');
    }

    

    onEdit_data={
        no:dataklik.no,
        item:dataklik.item,
        requester:dataklik.requester,
        itemdivisi:dataklik.itemdivisi,
        kodecoa:dataklik.kodecoa,
        ketkodecoa_fix,
        qty:dataklik.qty,
        z_qty:dataklik.z_qty,
        priceunit:dataklik.priceunit,
        vendor:dataklik.vendor,
        pendingpayment:dataklik.pendingpayment,
        bank:dataklik.bank,
        lokasiterima:dataklik.lokasiterima,
        tipeitem:dataklik.tipeitem,
        note_req:dataklik.note_req,
        note_approver:JSON.parse(dataklik.note_approver),
        cash:dataklik.cash

    };

    $('#modaldetailinput').modal('show');
}

function detailprocdetailklik() {
    var doc=document.getElementById('detailprocshow-details');
    var docarrow=document.getElementById('klikpanahbawahdetailproc');

    if (doc.className.includes('d-none')) {
        //show
        doc.classList.remove('d-none');

        docarrow.className='bi bi-caret-up';
    }else{
        //hide
        doc.classList.add('d-none');

        docarrow.className='bi bi-caret-down';
    }
}

function klikedit_details(e) {

    console.log('onEdit_data ===== -----',onEdit_data);
    
    document.getElementById('tipeitem-modaldetailinputedit').value=onEdit_data.tipeitem;

    document.getElementById('namabarang-modaldetailinputedit-1').value=onEdit_data.item

    document.getElementById('divisi-modaldetailinputedit-1').value=onEdit_data.itemdivisi;

    document.getElementById('vendor-modaldetailinputedit-1').value=onEdit_data.vendor;

    document.getElementById('namarequester-modaldetailinputedit-1').value=onEdit_data.requester;

    document.getElementById('coa-modaldetailinputedit-1').value=onEdit_data.kodecoa;
    document.getElementById('ketcoa-modaldetailinputedit-1').value=onEdit_data.ketkodecoa_fix;
    
    document.getElementById('lokasiterima-modaldetailinputedit-1').value=onEdit_data.lokasiterima;

    document.getElementById('onoffpendingpayment-modaldetailinputedit').checked=onEdit_data.pendingpayment=='true'?true:false;

    if (onEdit_data.cash=='true') {
        document.getElementById('onoffpendingpayment-modaldetailinputedit').disabled=true;
    }else{
        document.getElementById('onoffpendingpayment-modaldetailinputedit').disabled=false;
    }

    document.getElementById('qty-modaldetailinputedit-1').value=onEdit_data.qty;
    var z_qty=Number(onEdit_data.z_qty==''?0:Number(onEdit_data.z_qty));
    document.getElementById('zqty-modaldetailinputedit-1').value=z_qty;

    document.getElementById('hargaunitsave-modaldetailinputedit-1').value=onEdit_data.priceunit;
    document.getElementById('hargaunitshow-modaldetailinputedit-1').value='Rp '+formatMoney(onEdit_data.priceunit);

    var totalsave=Number(z_qty)==0?Number(onEdit_data.qty)*Number(onEdit_data.priceunit):z_qty*Number(onEdit_data.priceunit);

    document.getElementById('totalsave-modaldetailinputedit-1').value=totalsave;
    document.getElementById('totalshow-modaldetailinputedit-1').value='Rp '+formatMoney(totalsave);

    document.getElementById('noterequester-modaldetailinputedit-1').value=onEdit_data.note_req;
    document.getElementById('noteprocurement-modaldetailinputedit-1').value=onEdit_data.note_approver.procurement;

    $('#modaldetailinputedit').modal('show');
}

function z_qtyEdit(el) {
    var hargaunitsave=document.getElementById('hargaunitsave-modaldetailinputedit-1').value;
    var totul=el.value*Number(hargaunitsave);
    document.getElementById('totalsave-modaldetailinputedit-1').value=totul

    
    document.getElementById('totalshow-modaldetailinputedit-1').value='Rp '+formatMoney(totul);

    oninputdata_modaldetailinputedit();
}

var saveEditRightBottom;
function oninputdata_modaldetailinputedit() {
    var vendor =document.getElementById('vendor-modaldetailinputedit-1').value;
    var lokasiterima =document.getElementById('lokasiterima-modaldetailinputedit-1').value;
    var noteproc=onEdit_data.note_approver;
    noteproc.procurement=document.getElementById('noteprocurement-modaldetailinputedit-1').value;

    var z_qty= document.getElementById('zqty-modaldetailinputedit-1').value;

    //var hargaunitsave=document.getElementById('hargaunitsave-modaldetailinputedit-1').value;
    var totalprice=document.getElementById('totalsave-modaldetailinputedit-1').value;

    var pendingpayment=document.getElementById('onoffpendingpayment-modaldetailinputedit').checked==true?'true':'false';

    

    saveEditRightBottom={
        no:onEdit_data.no,
        z_qty,
        totalprice,
        lokasiterima,
        vendor,
        pendingpayment,
        note_approver:noteproc
    }

    console.log('dataEdit ======',saveEditRightBottom);


}

function saveEdittoDatabase() {
    loadingpopup();
    
    hidemodal('modaldetailinputedit');
    hidemodal('modaldetailinput');

    fetch('/procurement/saveeditrightbottom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify(saveEditRightBottom)
    }).then(response => response.json()).then(resdat => {
        console.log('resdat');
        console.log(resdat);

        var valueload=90;
        setTimeout(function () { 
            Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
            setTimeout(function () { 
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload;

                if (resdat.icons == 'success') {
                    suksesandloading('success','Loading ...')
                    socket.emit('updatez_saveeditrightbottom', saveEditRightBottom);

                } else {
                    warningpopup('error', 'gagal save edit');
                    
                }
                
            },800);
        },2000);

        
    })
    .catch(error => {
        console.error('Error:', error);
        warningpopup('error', 'error catch : ' + error);
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////

/////////centang M di list request {tabel bawah}//////////////// 
function klikMproses(e, no,vendor) {
    var phase_tindak=0;
    var note_bayar='';
    var totalprosesbayar=0;
    var totalterbayar=0;
    //////////////////////
    var status_tersisa='';
    var check_bayar='';
    var old_sisa=0;
    var now_sisa=0;
    /////////////////////

    if (vendor=='') {
        warningpopup('error','Nama vendor tidak boleh kosong');
        e.checked=false;
    }else{
        if (e.checked) {
            // Gunakan .find() untuk mengiterasi array datatabel_atas
            // const objekInduk = datatabel_atas.find(vendor => {
            //     // Di dalam setiap objek vendor, gunakan .some() untuk mencari kecocokan 'no' di properti 'listdata'
            //     return vendor.listdata.some(item => item.no === no);
            // });

            const objekInduk=datatabel_atas.find((item)=>item.vendor.trim()===vendor.trim())

            console.log('objekInduk==+++++++++',objekInduk);
            if (objekInduk) {
                phase_tindak=objekInduk.phase_tindak;
                totalprosesbayar=objekInduk.totalprosesbayar;
                //note_bayar=objekInduk.note_bayar;
            }
            
        }
        
        var data = {
            no: Number(no),
            tglmili_proses_bayar: `${Date.now()}`,
            proses_bayar: `${e.checked}`,
            user_proses_bayar: namalengkap,
            phase_tindak,
            totalterbayar,
            totalprosesbayar,
            note_bayar,
            status_tersisa,
            check_bayar,
            old_sisa,
            now_sisa
        }

        console.log('data==== M===', data);

        fetch('/procurement/savemproses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': xi
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(resdat => {
            console.log('resdat');
            console.log(resdat);

            if (resdat.icons == 'success') {
                //warningpopup('success','sukses add');
                //suksesandloading('success','sukses edit')
                socket.emit('updateMproses', data);
                //location.reload();
            } else {
                warningpopup('error', 'gagal save checklist');
                e.checked = false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'error catch : ' + error);
            e.checked = false;
        });
    }

    
}



////////////show tabel atas//////////////////////////////////////
var datatabel_atas = [];
function showtabel_right_top() {
    datatabel_atas.length = 0;
    datatabel_atas = [];
    var datarequestbeli_proc = window.dataall.datarequestbeli_proc;
    var databasevendor_proc = window.dataall.databasevendor_proc;
    
    // step 1: filter data
    let filtered = datarequestbeli_proc.filter(d => d.proses_bayar === "true" && d.tindakbayar !== "true"||d.proses_bayar === "true" && d.status_tersisa === "true");//&&Number(d.now_sisa)>0

    // step 2: group by vendor
    let grouped = {};
    filtered.forEach(d => {
        if (!grouped[d.vendor.trim().toUpperCase()]) {
            grouped[d.vendor.trim().toUpperCase()] = [];
        }
        grouped[d.vendor.trim().toUpperCase()].push(d);
    });

    console.log('👀filtered===================',filtered);

    // step 3: buat array baru sesuai format
    let newarray = Object.keys(grouped).map(vendorName => {
        let listdata = grouped[vendorName.trim()];
        let total = listdata.reduce((sum, item) => sum + (item.tindakbayar === "true"&&item.status_tersisa === "true"&&Number(item.now_sisa)>0&&Number(item.totalterbayar)>=0&&Number(item.old_sisa)==0?Number(item.now_sisa):item.tindakbayar === "true"&&item.status_tersisa === "true"&&Number(item.now_sisa)>0&&Number(item.totalterbayar)>0&&Number(item.old_sisa)>0?Number(item.old_sisa):item.totalprice), 0);

        // cari vendor di databasevendor_proc
        let vendorInfo = databasevendor_proc.find(v => v.vendor === vendorName) || {};

        // tentukan phase_tindak induk
        let phase_tindak_induk = 0;
        for (let item of listdata) {
            let val = parseInt(item.phase_tindak || 0);
            if (val > 0) {
                phase_tindak_induk = val;
                break; // cukup ambil yang pertama >0
            }
        }

        var totalprosesbayar=0;
        let adaCash = false;
        
        // for (let item of listdata) {
        //     let val = parseInt(item.totalprosesbayar || 0);
            
        //     if (val > 0) {
        //         totalprosesbayar = val;
                
        //         break; // cukup ambil yang pertama >0
        //     }
        // }
        
        // tahap 1: cari totalprosesbayar sesuai kondisi
        for (let item of listdata) {
            if (item.cash === "true") {
                adaCash = true;
                totalprosesbayar += parseInt(item.totalterbayar || 0);
            }
        }

        if (!adaCash) {
            for (let item of listdata) {
                let val = parseInt(item.totalprosesbayar || 0);
                if (val > 0) {
                    totalprosesbayar = val;
                    break;
                }
            }
        }

        // tahap 2: update semua item
        for (let item of listdata) {

            if (item.totalprosesbayar < totalprosesbayar) {
                
                item.totalprosesbayar = totalprosesbayar;
            }

            // if (adaCash) {
            //     if (item.cash != "true") {
            //         item.check_bayar="";
            //     }
            // }
           
        }

        

        // // update semua listdata dengan nilai induk
        // listdata.forEach(item => {
        //     item.phase_tindak = phase_tindak_induk;
        // });

        // tentukan note_bayar induk
        let note_bayar_induk = "";
        for (let item of listdata) {
            if (item.note_bayar && item.note_bayar.trim() !== "") {
                note_bayar_induk = item.note_bayar;
                break;
            }
        }

        listdata.forEach(item => {
            item.phase_tindak = phase_tindak_induk;
            item.note_bayar = note_bayar_induk;
        });

        return {
            vendor: vendorName,
            listdata: listdata,
            atas_nama: vendorInfo.atas_nama || "",
            rekening: vendorInfo.rekening || "",
            tipe_bayar: vendorInfo.tipe_bayar || "",
            total: total,
            phase_tindak: phase_tindak_induk,//listdata[0].phase_tindak ? Number(listdata[0].phase_tindak) : 0,
            note_bayar: note_bayar_induk,//listdata[0].note_bayar ? listdata[0].note_bayar : '',
            totalprosesbayar
        };
    });

    newarray.sort((a, b) => {
        if (a.phase_tindak === 0) {
            return 1; // Jika a.phase_tindak nol, pindahkan a ke belakang
        }
        if (b.phase_tindak === 0) {
            return -1; // Jika b.phase_tindak nol, pindahkan b ke belakang (a tetap di depan)
        }
        return a.phase_tindak - b.phase_tindak; // Urutkan secara normal
    });

    console.log('👄newarray data top rigth ===++', newarray);
    console.log(newarray);
    
    datatabel_atas = newarray;

    var myobj = document.getElementById("divhapus-tabelutama-atas");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`tabelutama-atas`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhapus-tabelutama-atas');

    divhapus.innerHTML = returnarray_table_atas(newarray, 'awal');

    datatab.appendChild(divhapus);

    //kirim ke tabel kiri
    const resultzz = newarray.flatMap(el =>
        //el.listdata.filter(item => item.totalprosesbayar !== 0&&item.totalterbayar!==0)
        el.listdata.filter(item => Number(item.totalprosesbayar) > 0&&Number(item.totalterbayar)>0&&item.check_bayar=='true')
    );

    console.log("setDataCasout===========",resultzz);
    
    totabelkiriCashout(resultzz);
}


function returnarray_table_atas(array,prosedur) {
    

    return array.map((item,index)=>{
        var listdata=item.listdata;

        // for (const element of listdata) {
        //     if (element.check_bayar=='true'&&element.) {
                
        //     }
        // }
        
        return `

            <tr data-bs-toggle="collapse" data-bs-target="#vendorRow1">
                <td class="text-truncate font-smaller-9 text-start ps-2 greyunbolddraftplan">${item.vendor.toUpperCase()}</td>
                
                <td class="text-center font-smaller-9 greyunbolddraftplan" onclick="klikopencheckbayar(this,'${index}')"  style="cursor:pointer;">
                    <span id="totals-${index}" data-value="${item.total}">${formatMoney(item.total)}</span>
                </td>
                
                <td class="text-center font-smaller-9 greyunbolddraftplan col-totalterbayar" onclick="klikeditpayment_atas(this,'${index}')"  style="cursor:pointer;">
                    <span id="totalbayar-${index}" data-json='${JSON.stringify(item.listdata)}' data-value="${listdata[0].totalprosesbayar}">${formatMoney(listdata[0].totalprosesbayar)}</span>
                    <input class="form-control form-control-sm d-none font-smaller-9 nospinner greyunbolddraftplan" type="number" onblur="saveTotalTerbayar(this,'${index}')" min="0" value="0">
                </td>
                
                <td class="text-center font-smaller-9 greyunbolddraftplan">${item.listdata[0].kodecoa}</td>

                <td class="text-center font-smaller-9 greyunbolddraftplan col-phaseplan" onclick="klikeditphase(this,'${index}')"  style="cursor:pointer;">
                    <span  id="phaseplan-${index}" data-json='${JSON.stringify(item.listdata)}' data-value="${item.phase_tindak}">${item.phase_tindak}</span>
                    
                    <div class="d-flex justify-content-center align-items-center d-none ">
                        <span class="badge ${item.phase_tindak==1?'text-bg-secondary':'text-bg-light'} me-1" data-value="1" onclick="saveeditphase(this,'${index}')" name="button_nophase">1</span>

                        <span class="badge ${item.phase_tindak==2?'text-bg-secondary':'text-bg-light'} me-1" data-value="2" onclick="saveeditphase(this,'${index}')" name="button_nophase">2</span>

                        <span class="badge ${item.phase_tindak==3?'text-bg-secondary':'text-bg-light'} me-1" data-value="3" onclick="saveeditphase(this,'${index}')" name="button_nophase">3</span>
                    </div>

                    <!-- <input class="form-control form-control-sm d-none font-smaller-9 nospinner greyunbolddraftplan" type="number" onblur="saveeditphase(this,'${index}')" min="0" max="3" value="0"> -->
                </td>

                <td class="text-center font-smaller-9 greyunbolddraftplan">
                    <button class="btn btn-sm p-0 border-0 greyunbolddraftplan">•••</button>
                </td>
            </tr>
        
        `;
    }).join('');
}


////////////////////////// klikeditpayment_atas ///////////////////
const popover_payment_atas = document.getElementById("popoverEditAtas");

// Mencegah penutupan popover saat klik di dalam popover
popover_payment_atas.addEventListener('click', function (event) {
    event.stopPropagation();
});

let currentTd_payment_atas = null;

let index_payment_edit_atas;

function klikeditpayment_atas(td,index_tab_atas) {
    hidePopover();
    hidephaseedit();
    //data_editpayit.length=0;
    //var dataselek=datatabel_atas[Number(index_tab_atas)];

    index_payment_edit_atas=index_tab_atas;

    //createTabSelekPay(dataselek.listdata);
    currentTd_payment_atas=td;
    console.log('currentTd_payment_atas======',currentTd_payment_atas);

    ///----------------------------------------------
    // Tutup semua cell vendor terlebih dahulu
    document.querySelectorAll("td.col-totalterbayar").forEach(cell => {
        let span = cell.querySelector("span");
        let input = cell.querySelector("input");

        span.classList.remove("d-none");
        input.classList.add("d-none");
    });

    // Baru buka cell yang diklik
    let span = td.querySelector("span");
    let input = td.querySelector("input");

    span.classList.add("d-none");
    input.classList.remove("d-none");
    input.value = span.dataset.value;
    input.focus();
    ///----------------------------------------------

    
}

function klikopencheckbayar(td,index_tab_atas) {
    hidephaseedit();
    data_editpayit.length=0;
    var dataselek=datatabel_atas[Number(index_tab_atas)];

    index_payment_edit_atas=index_tab_atas;

    createTabSelekPay(dataselek.listdata);
    currentTd_payment_atas=td;

    // Tampilkan popover sementara untuk mendapatkan ukurannya
    popover_payment_atas.style.display = "block";
    popover_payment_atas.style.visibility = "hidden";

    const rect = td.getBoundingClientRect();
    const popWidth = popover_payment_atas.offsetWidth;
    const popHeight = popover_payment_atas.offsetHeight;

    // Deteksi lebar sidebar (misalnya dengan class 'sidebar-open')
    const sidebar = document.querySelector('.sidebar');
    const sidebarWidth = sidebar && sidebar.classList.contains('collapsed') ? 80 : 290;

    // Posisikan popover di tengah sel
    popover_payment_atas.style.left = (rect.left + window.scrollX + (rect.width - popWidth) / 2 - sidebarWidth) + "px";
    popover_payment_atas.style.top = (rect.top + window.scrollY + (rect.height - popHeight) / 4.8) + "px";

    // Aktifkan kembali popover
    popover_payment_atas.style.visibility = "visible";
}

function createTabSelekPay(array) {
    var myobj = document.getElementById("divhapus_table_payment_atas");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`table_payment_atas`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhapus_table_payment_atas');

    divhapus.innerHTML = returnarray_selekpay(array);

    datatab.appendChild(divhapus);
}

function returnarray_selekpay(array) {
    // hitung total semua totalterbayar
    // const totalterbayar_fix = array.reduce((sum, item) => sum + (item.tindakbayar!='true'&&item.status_tersisa === "true"&&Number(item.now_sisa)>0?Number(item.totalprice)-Number(item.now_sisa):item.tindakbayar==='true'&&item.status_tersisa === "true"&&item.check_bayar=='false'&&Number(item.now_sisa)>=0?0:Number(item.totalterbayar) || 0), 0);

    let totalterbayar_fix = 0;

    // cek apakah ada item dengan cash="true"
    const adaCash = array.some(item => item.cash === "true");

    if (adaCash) {
        // jika ada, jumlahkan totalterbayar dari semua item cash="true"
        // totalterbayar_fix = array.reduce((sum, item) => {
        //     return item.cash === "true"
        //         ? sum + (Number(item.totalterbayar) || 0)
        //         : sum;
        // }, 0);
        // jika ada, jumlahkan totalterbayar dari item cash="true" atau check_bayar="true"
        totalterbayar_fix = array.reduce((sum, item) => {
            const totalterbayar = Number(item.totalterbayar) || 0;
            if (item.cash === "true" || item.cash != "true"&& item.check_bayar === "true") {
                return sum + totalterbayar;
            }
            return sum;
        }, 0);
    } else {
        // jika tidak ada cash="true", gunakan rumus lama
        totalterbayar_fix = array.reduce((sum, item) => {
            const totalprice = Number(item.totalprice) || 0;
            const now_sisa = Number(item.now_sisa) || 0;
            const totalterbayar = Number(item.totalterbayar) || 0;
            const tindakbayar = item.tindakbayar === "true";
            const status_tersisa = item.status_tersisa === "true";
            const check_bayar = item.check_bayar === "true";

            const nilai = 
                (!tindakbayar && status_tersisa && now_sisa > 0)
                    ? totalprice - now_sisa
                    : (tindakbayar && status_tersisa && !check_bayar && now_sisa >= 0)
                        ? 0
                        : totalterbayar;

            return sum + nilai;
        }, 0);
    }

    
    var totcheck=document.getElementById('total_payit');
    totcheck.dataset.value=totalterbayar_fix;
    totcheck.innerText=`Rp ${formatMoney(totalterbayar_fix)}`;

    console.log('totalterbayar_fix====+++',totalterbayar_fix);

    return array.map((item,index)=>{
        const myDate = new CustomDateFormatter(Number(item.estimasi_bayar_mili)); // Ganti dengan milidetik
        totalbudget=totalterbayar_fix==item.totalprosesbayar?0:totalterbayar_fix<item.totalprosesbayar?item.totalprosesbayar-totalterbayar_fix:item.totalprosesbayar;
        var estimasi_bayar_mili=myDate.format('dd/mm');
        var todayDate=new CustomDateFormatter(Date.now()).format('dd/mm');

        console.log('estimasi_bayar_mili===',estimasi_bayar_mili);
        console.log('todayDate===',todayDate);
        var fixtanggal=estimasi_bayar_mili;
        if (estimasi_bayar_mili!=todayDate) {
            fixtanggal=todayDate;
        }

        if (item.totalterbayar>0) {
            data_editpayit.push(item);
        }

        return `

            <tr>
                <td class="text-start font-smaller-9 px-1">
                    <input class="form-check-input greyunbolddraftplan" name="checkpayit" type="checkbox" onclick="klikpaycheck(this, '${item.no}')" ${item.check_bayar==''||item.check_bayar=='false'?'':'checked'} ${item.totalterbayar==0&&totalterbayar_fix==item.totalprosesbayar||item.cash=='true'?'disabled':''} data-value="${item.cash=='true'?'true':'false'}">
                </td>
                <td class="text-start font-smaller-9 px-2 greyunbolddraftplan">${fixtanggal}</td>
                <td class="text-start font-smaller-9 px-2 greyunbolddraftplan">${item.id_request}</td>
                <td class="text-start font-smaller-9 px-2 fw-semibold greyunbolddraftplan">${item.item}</td>
                <td class="text-end font-smaller-9 px-1 greyunbolddraftplan" id="paycheck-${item.no}">
                    IDR ${formatMoney(
                        item.status_tersisa === "true"&&Number(item.now_sisa)>0&&Number(item.totalterbayar)>=0&&Number(item.old_sisa)==0?Number(item.now_sisa)
                        :item.status_tersisa === "true"&&Number(item.now_sisa)>=0&&Number(item.totalterbayar)>0&&Number(item.old_sisa)>0?Number(item.old_sisa)
                        :item.totalprice
                    )}
                </td>
            </tr>
        
        `;
    }).join('');
}

function saveTotalTerbayar(el,index) {
    ///----------------------------------------------
    // Tutup semua cell vendor terlebih dahulu
    document.querySelectorAll("td.col-totalterbayar").forEach(cell => {
        let span = cell.querySelector("span");
        let input = cell.querySelector("input");

        span.classList.remove("d-none");
        input.classList.add("d-none");
    });
    
    ///----------------------------------------------

    if (currentTd_payment_atas&&currentTd_payment_atas.querySelector("span").dataset.value !=el.value) {
        var totals=document.getElementById(`totals-${index}`);

        if (Number(totals.dataset.value)<Number(el.value)) {
            warningpopup('error','pembayaran melebihi total');
        }else{
            let span = currentTd_payment_atas.querySelector("span");
            span.innerText=formatMoney(el.value);//.toFixed(2);
            span.dataset.value=el.value;

            var datalist0=JSON.parse(document.getElementById(`totalbayar-${index}`).dataset.json);

            console.log('datalist0===========+',datalist0);

            // var no=Number(currentTd_payment_atas.id.replace('zqty_bawah-',''));
            var data=[];
            for (const element of datalist0) {
                data.push( {
                    no:element.no,
                    totalprosesbayar:Number(el.value)
                });
            }
            totalbudget=Number(el.value);

            console.log('save total bayar',data);

            fetch('/procurement/savetotalbayar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': xi
                },
                body: JSON.stringify(data)
            }).then(response => response.json()).then(resdat => {
                console.log('resdat');
                console.log(resdat);

                if (resdat.icons == 'success') {
                    
                    socket.emit('updatez_savetotalbayar', data);

                } else {
                    warningpopup('error', 'gagal save z qty');
                    
                }
            })
            .catch(error => {
                console.error('Error:', error);
                warningpopup('error', 'error catch : ' + error);
            });
        }

        
    }
}

///klikpaycheck
var totalbudget=0;
var nomor_id_itempayit=0;
var data_editpayit=[];
function klikpaycheck(el,no) {
    nomor_id_itempayit=Number(no);
    var dataarray=window.dataall.datarequestbeli_proc;
    var totnow=document.getElementById(`totalbayar-${index_payment_edit_atas}`);
    var totcheck=document.getElementById('total_payit');
    const allCheckbox = document.querySelectorAll('input[name="checkpayit"]');

    var dataedit=dataarray.find((item)=>Number(item.no)===Number(no));

    var fixtotu=dataedit.status_tersisa === "true"?Number(dataedit.now_sisa):Number(dataedit.totalprice);
    //&&Number(dataedit.now_sisa)>0
    console.log('totalbudget pay==========',totalbudget);
    console.log('fixtotu pay==========',fixtotu);
    console.log('dataedit pay==========',dataedit);
    if (el.checked) {
        console.log('checked');
        if (Number(totnow.dataset.value)==0) {
            warningpopup('error','total payment tidak boleh Nol, harap ditentukan dahulu');
            el.checked=false;
        }else{
            dataedit.check_bayar='true';
            //var cektotnow=dataedit.status_tersisa === "true"&&Number(dataedit.now_sisa)>0?fixtotu:Number(dataedit.totalprice);
            if (totalbudget>fixtotu) {
                
                console.log('totalbudget ======',totalbudget);

                totalbudget=totalbudget-fixtotu;

                console.log('fixtotu ======',fixtotu)
                console.log('totcheck.dataset.value ======',totcheck.dataset.value)

                totcheck.dataset.value=Number(totcheck.dataset.value)+fixtotu;
                totcheck.innerText=`Rp ${formatMoney(totcheck.dataset.value)}`;

                dataedit.totalterbayar=fixtotu;
                dataedit.status_tersisa='';
                    dataedit.old_sisa=dataedit.now_sisa;
                    dataedit.now_sisa=0;
                //totabelkiriCashout(Number(dataedit.totalprice),dataedit.tipeitem,dataedit.kodecoa,dataedit.phase_tindak,dataedit);
            }else{
                if (totalbudget>0) {
                    var sisa=fixtotu-totalbudget;
                    
                    console.log('totcheck.dataset.value 2 ======',totcheck.dataset.value)
                    totcheck.dataset.value=Number(totcheck.dataset.value)+totalbudget;
                    totcheck.innerText=`Rp ${formatMoney(totcheck.dataset.value)}`;

                    dataedit.totalterbayar=totalbudget;
                    totalbudget=0;
                    //totabelkiriCashout(Number(totalbudget),dataedit.tipeitem,dataedit.kodecoa,dataedit.phase_tindak,dataedit);

                    dataedit.status_tersisa='true';
                    dataedit.old_sisa=dataedit.now_sisa;
                    dataedit.now_sisa=sisa;

                    allCheckbox.forEach(cb => {
                        if (cb !== el&&cb.checked!=true&&cb.dataset.value!='true') {
                            cb.disabled = true;
                        }
                    });
                    console.log('sisa ====== ',sisa);
                }else{
                    allCheckbox.forEach(cb => {
                        if (cb !== el&&cb.checked!=true&&cb.dataset.value!='true') {
                            cb.disabled = true;
                        }
                    });
                }
            }           
            
        }
        
        //data_editpayit.push(dataedit);
        const existingIndex = data_editpayit.findIndex(d => d.no === dataedit.no);

        if (existingIndex !== -1) {
            // jika sudah ada data dengan no yang sama → update totalterbayar
            data_editpayit[existingIndex].totalterbayar = dataedit.totalterbayar;
            data_editpayit[existingIndex].status_tersisa= dataedit.status_tersisa;
            data_editpayit[existingIndex].old_sisa= dataedit.old_sisa;
            data_editpayit[existingIndex].now_sisa= dataedit.now_sisa;
            data_editpayit[existingIndex].check_bayar= dataedit.check_bayar;

        } else {
            // jika belum ada → tambahkan data baru
            data_editpayit.push(dataedit);
        }
        //console.log('totalbudget ====== ',totalbudget);
    
    }else{
        console.log('unchecked');
        dataedit.check_bayar='';
        
        dataedit.now_sisa=dataedit.old_sisa;
        dataedit.old_sisa=0;

        if (dataedit.now_sisa==0) {
            dataedit.status_tersisa='';
        }else{
            
            dataedit.status_tersisa='true';
        }

        var totfixterbayar=Number(dataedit.totalterbayar);

        console.log('totfixterbayar ====-----',totfixterbayar);

        totalbudget=totalbudget+totfixterbayar;

        totcheck.dataset.value=Number(totcheck.dataset.value)-totfixterbayar;

        totcheck.innerText=`Rp ${formatMoney(totcheck.dataset.value)}`;
        //totabelkiriCashout(Number(dataedit.totalterbayar*(-1)),dataedit.tipeitem,dataedit.kodecoa,dataedit.phase_tindak,dataedit);
        
        dataedit.totalterbayar=0;

        // if (totcheck.dataset.value<totnow.dataset.value) {
        //     allCheckbox.forEach(cb => {
        //         cb.disabled = false;
        //     });
        // }
        allCheckbox.forEach(cb => {
            if (cb.dataset.value!='true') {
                cb.disabled = false;
            }
            
        });

        for (const element of data_editpayit) {
            if (element.no==Number(no)) {
                element.totalterbayar=0;
                element.check_bayar='';
                element.status_tersisa= dataedit.status_tersisa;
                element.old_sisa= dataedit.old_sisa;
                element.now_sisa= dataedit.now_sisa;
            }
        }
        //data_editpayit=data_editpayit.filter((item)=>item.no!=Number(no));

        
    }
    console.log('totalbudget unchecked ====== ',totalbudget);
    console.log('data_editpayit=====+++++++++++',data_editpayit);
}

//////////// end show tabel atas//////////////////////////////////////

function savepayit() {
    //var dataarray=window.dataall.datarequestbeli_proc;
    //var dataedit=dataarray.find((item)=>Number(item.no)===Number(nomor_id_itempayit));
    
    var totnow=document.getElementById(`totalbayar-${index_payment_edit_atas}`).dataset.value;
    var totcheck=document.getElementById('total_payit').dataset.value;

    if (totcheck<totnow&&totcheck!=0) {
        warningpopup('error','Jumlah item yang dibayar harus sesuai dengan Total Payment')
    }
    else {
        hidePopover();
        suksesandloading('warning','Loading save ...');


        fetch('/procurement/savepaymentatasselek', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': xi
            },
            body: JSON.stringify(data_editpayit)
        }).then(response => response.json()).then(resdat => {
            console.log('resdat');
            console.log(resdat);

            if (resdat.icons == 'success') {
                flagLooping = 1
                socket.emit('updatez_paymentatassele', data_editpayit);
                
            } else {
                warningpopup('error', 'gagal save z qty');
                
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error', 'error catch : ' + error);
        });
    }
    
}


/////////// klikeditphase //////////////
var data_editphase=[];
var index_phase_atas=0;
var phaseedit_open=false;
var currentTd_phase=null;
function klikeditphase(td,index) {
    data_editphase.length=0;
    var dataselek=datatabel_atas[Number(index)];

    index_phase_atas=index;

    createTabSelekPay(dataselek.listdata);
    currentTd_payment_atas=td;
    currentTd_phase=td;
    console.log('currentTd_payment_atas phase ======++++++',currentTd_payment_atas);
    console.log('dataselek phase ======++++++',dataselek);

    ///----------------------------------------------
    // Tutup semua cell vendor terlebih dahulu
    // document.querySelectorAll("td.col-phaseplan").forEach(cell => {
    //     let span0 = cell.querySelector("span");
    //     let div0 = cell.querySelector("div");

    //     span0.classList.remove("d-none");
    //     div0.classList.add("d-none");
    // });
    for (const cell of document.querySelectorAll("td.col-phaseplan")) {
        let span0 = cell.querySelector("span");
        let div0 = cell.querySelector("div");

        span0.classList.remove("d-none");
        div0.classList.add("d-none");
    }

    // Baru buka cell yang diklik
    let span = td.querySelector("span");
    let div = td.querySelector("div");
    var tombols=div.querySelectorAll('[name="button_nophase"]');

    span.classList.add("d-none");
    div.classList.remove("d-none");
    if (span.dataset.value==1) {
        tombols[0].classList.remove('text-bg-light');
        tombols[0].classList.add('text-bg-secondary');
    }else if (span.dataset.value==2) {
        tombols[1].classList.remove('text-bg-light');
        tombols[1].classList.add('text-bg-secondary');
    }else if (span.dataset.value==3) {
        tombols[2].classList.remove('text-bg-light');
        tombols[2].classList.add('text-bg-secondary');
    }
    else {
        for (const element of tombols) {
            
            element.classList.add('text-bg-light');
            element.classList.remove('text-bg-secondary');
        }

    }
    setTimeout(function () {
        phaseedit_open=true;

    }, 500);
    
    //input.value = span.dataset.value==0?"":span.dataset.value;
    //input.focus();
    ///----------------------------------------------
}

var phasesave_flag=false;
function saveeditphase(el,index) {
    ///----------------------------------------------
    // Tutup semua cell vendor terlebih dahulu
    document.querySelectorAll("td.col-phaseplan").forEach(cell => {
        let span = cell.querySelector("span");
        let div = cell.querySelector("div");

        span.classList.remove("d-none");
        div.classList.add("d-none");
    });
    
    ///----------------------------------------------

    if (currentTd_payment_atas&&currentTd_payment_atas.querySelector("span").dataset.value !=el.dataset.value) {
        console.log('edit phase save mulai');
        if (el.dataset.value>3) {
            warningpopup('error','lebih dari phase 3')
        }else{
            let span = currentTd_payment_atas.querySelector("span");
            span.innerText=el.dataset.value;//.toFixed(2);
            span.dataset.value=el.dataset.value;

            var datalist0=JSON.parse(document.getElementById(`phaseplan-${index}`).dataset.json);

            console.log('datalist0===========+',datalist0);

            // var no=Number(currentTd_payment_atas.id.replace('zqty_bawah-',''));
            var data=[];
            for (const element of datalist0) {
                data.push( {
                    no:element.no,
                    phase_tindak:Number(el.dataset.value)
                });
            }
            
            suksesandloading('warning','Loading save ...');

            console.log('✌️ data phase to save ===========+',data);
            fetch('/procurement/editphase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': xi
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(resdat => {
                console.log('resdat');
                console.log(resdat);

                if (resdat.icons == 'success') {
                    phasesave_flag=true;
                    phaseedit_open=false;
                    socket.emit('editphase', data);
                    fetchdata();
                } else {
                    warningpopup('error', 'gagal save phase');
                    
                }
            })
            .catch(error => {
                console.error('Error:', error);
                warningpopup('error', 'error catch : ' + error);
            });
        }
    }
}