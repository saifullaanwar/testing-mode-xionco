
//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';
var oldedititem = [];

//save to database
function submitsave() {
    var array = document.querySelectorAll('#itemsContainer > .partitems');

    var flag = 0;//0 = isian tidak lengkap
    for (let i = 0; i < array.length; i++) {
        const itemCard = array[i];

        // Ambil semua data dari input di dalam itemCard
        let item = itemCard.querySelector('[name="item"]').value?.trim() || "";
        let office = itemCard.querySelector('[name="office"]').value?.trim() || "";
        let nominal = itemCard.querySelector('[name="nominal"]').value?.trim() || "";
        let customer_name = itemCard.querySelector('[name="customer-name"]').value?.trim() || "";
        let hari = itemCard.querySelector('[name="hari"]').value?.trim() || "";
        let bulan = itemCard.querySelector('[name="bulan"]').value?.trim() || "";
        let number_code = itemCard.querySelector('[name="number-code"]').value?.trim() || "";
        let coa_code = itemCard.querySelector('[name="coa-code"]').value?.trim() || "";

        // Validasi field wajib
        if (!item || !office || !nominal || !customer_name || !number_code || !coa_code) {
            warningpopup("error", `Isi dengan lengkap pada item ke-${i + 1}`);
            flag = 0;
            break;
        }

        // Validasi khusus hari & bulan
        if (bulan && !hari) {
            warningpopup("error", `Isi juga hari pada item ke-${i + 1} (bulan terisi, hari wajib)`);
            flag = 0;
            break;
        }

        // Kalau semua valid sampai akhir
        if (i === array.length - 1) {
            flag = 1;
        }
    }
    if (flag == 1) {
        // 🔹 Tambah konfirmasi sebelum simpan
        Swal.fire({
            title: 'Konfirmasi Simpan',
            text: "Apakah Anda yakin ingin menyimpan data ini?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Simpan',
            cancelButtonText: 'Batal',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                hidemodal('modaladdnewitem');
                loadingpopup();
                var xhrzx = new XMLHttpRequest();

                xhrzx.open("POST", `/procurement/saveaddbilldue`);
                xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhrzx.setRequestHeader('authorization', xi);
                xhrzx.send(JSON.stringify({ namalengkap, username, alldataadditem }));
                xhrzx.addEventListener("load", () => {
                    var resdat = JSON.parse(xhrzx.responseText);
                    console.log('resdat');
                    console.log(resdat);

                    var valueload = 90;
                    setTimeout(function () {
                        Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
                        setTimeout(function () {
                            Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;

                            if (JSON.stringify(resdat.notif).toLowerCase().includes('duplikat') || JSON.stringify(resdat.notif).toLowerCase().includes('gagal')) {
                                creattabstatus(resdat.notif);
                                $("#modalpopupsuksessavereqbelis").modal('show');
                            } else {
                                creattabstatus(resdat.notif);
                                $("#modalpopupsuksessavereqbelis").modal('show');
                            }
                        }, 800);
                    }, 2000);

                });
            }
        });
    }
}


function submitsaveedit() {
    var array = document.querySelectorAll('#itemsContainer > .partitems');
    for (let i = 0; i < array.length; i++) {
        const itemCard = array[i];

        // Ambil semua data dari input di dalam itemCard
        let item = itemCard.querySelector('[name="item"]').value?.trim() || "";
        let office = itemCard.querySelector('[name="office"]').value?.trim() || "";
        let nominal = itemCard.querySelector('[name="nominal"]').value?.trim() || "";
        let customer_name = itemCard.querySelector('[name="customer-name"]').value?.trim() || "";
        let hari = itemCard.querySelector('[name="hari"]').value?.trim() || "";
        let bulan = itemCard.querySelector('[name="bulan"]').value?.trim() || "";
        let number_code = itemCard.querySelector('[name="number-code"]').value?.trim() || "";
        let coa_code = itemCard.querySelector('[name="coa-code"]').value?.trim() || "";

        // Validasi: kalau ada field wajib kosong
        if (!item || !office || !nominal || !customer_name || !hari || !number_code || !coa_code) {
            warningpopup("error", `Isi dengan lengkap`);
        } else if (bulan && !hari) {
            warningpopup("error", `Isi juga hari pada item ke-${i + 1} (bulan terisi, hari wajib)`);
        } else {

            // 🔹 Tambah konfirmasi sebelum edit
            Swal.fire({
                title: 'Konfirmasi Edit',
                text: "Apakah Anda yakin ingin menyimpan perubahan data?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Simpan Edit',
                cancelButtonText: 'Batal',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    hidemodal('modaladdnewitem');
                    loadingpopup();

                    var fixdata = { namalengkap, username, oldedititem, alldataadditem };
                    console.log(fixdata);

                    var xhrzx = new XMLHttpRequest();
                    xhrzx.open("POST", `/procurement/saveeditbilldue`);
                    xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhrzx.setRequestHeader('authorization', xi);
                    xhrzx.send(JSON.stringify(fixdata));
                    xhrzx.addEventListener("load", () => {
                        var resdat = JSON.parse(xhrzx.responseText);
                        console.log('resdat');
                        console.log(resdat);

                        var valueload = 90;
                        setTimeout(function () {
                            Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
                            setTimeout(function () {
                                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;

                                if (JSON.stringify(resdat.notif).toLowerCase().includes('gagal') || JSON.stringify(resdat.notif).toLowerCase().includes('error')) {
                                    creattabstatus(resdat.notif);
                                    $("#modalpopupsuksessavereqbelis").modal('show');
                                } else {
                                    socket.emit('addnew-editvariantproduk', { namalengkap, username, alldataadditem });
                                    creattabstatus(resdat.notif);
                                    $("#modalpopupsuksessavereqbelis").modal('show');
                                }
                            }, 800);
                        }, 2000);

                    });
                }
            });
        }
    }
}



function creattabstatus(data) {
    var myobj = document.getElementById("finalstatussaved");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattabstatus-save`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'finalstatussaved');

    divhapus.innerHTML = returnarraystatussave(data);
    datatab.appendChild(divhapus);

    Swal.close();
}

function returnarraystatussave(array) {
    return array.map(function (element) {
        return `
        <tr>
            <td class="text-truncate"  style="max-width: 100px;" title="${element.item}">
                ${element.item}
            </td>
            <td>
                <span><i class="bi bi-${element.statussave.toLowerCase().includes('duplikat') || element.statussave.toLowerCase().includes('gagal') ? 'x' : 'check'}-circle-fill" style="color: ${element.statussave.toLowerCase().includes('duplikat') || element.statussave.toLowerCase().includes('gagal') ? 'red' : 'green'};"></i> ${element.statussave.toLowerCase().includes('duplikat') || element.statussave.toLowerCase().includes('gagal') ? element.statussave : 'saved'}</span>
            </td>
        </tr>
        `;
    }).join('');
}
//tutup save to database


//delete item
function klikdeleteitem(index) {
    var dataarray = JSON.parse(document.getElementById(`dataitem-${index}`).dataset.json);
    console.log('delete item ===');
    console.log(dataarray);

    Swal.fire({
        icon: 'warning',
        title: '',
        text: `Apakah anda ingin delete item ${dataarray.item}?`,
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `Delete`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

        } else if (result.isDenied) {
            //delete item
            deletefinish(dataarray.item);
        }
    });
}
function klikedititem(index) {
    addoredit = 'edit';
    alldataadditem.length = 0;
    oldedititem.length = 0;

    var dataarray = JSON.parse(document.getElementById(`dataitem-${index}`).dataset.json);

    const bulanMap = [
        "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Cek apakah item punya tanda " - "
    let katagori = "";
    let itemName = dataarray.item;

    if (dataarray.item.includes(" - ")) {
        let splitItem = dataarray.item.split(" - ");
        katagori = splitItem[0] || "";
        itemName = splitItem[1] || dataarray.item;
    } else {
        katagori = dataarray.katagori || "";
        itemName = dataarray.item;
    }

    console.log('data per product', dataarray);

    document.getElementById(`modaladdnewitemlabel`).innerHTML = "Edit Product " + dataarray.item;
    document.getElementById(`addnewitemtombolfooters`).classList.add('d-none');
    document.getElementById(`edititemtombolfooters`).classList.remove('d-none');

    // insert data product ke input form
    document.querySelectorAll('#itemsContainer .partitems').forEach((itemCard) => {
        itemCard.querySelector('[name="item"]').value = itemName;
        itemCard.querySelector('[name="office"]').value = dataarray.office;
        itemCard.querySelector('[name="nominal"]').value = dataarray.nominal;
        itemCard.querySelector('[name="customer-name"]').value = dataarray.customer_name;
        itemCard.querySelector('[name="hari"]').value = dataarray.day;
        itemCard.querySelector('[name="bulan"]').value = dataarray.month; // ini angka bulan (1–12)
        itemCard.querySelector('[name="number-code"]').value = dataarray.number_code;
        itemCard.querySelector('[name="coa-code"]').value = dataarray.kodecoa;
    });

    // mapping bulan
    let month = 0;
    let month_name = "";
    if (dataarray.month && dataarray.month > 0) {
        month = parseInt(dataarray.month, 10); // angka (1–12)
        month_name = bulanMap[month];          // nama bulan
    }

    var data = {
        item: dataarray.item,
        office: dataarray.office,
        nominal: dataarray.nominal,
        customer_name: dataarray.customer_name,
        day: dataarray.day,
        month: month,
        month_name: month_name,
        number_code: dataarray.number_code,
        kodecoa: dataarray.coa_code,
    };

    oldedititem.push(data);
    alldataadditem.push(data);

    console.log('edit product awal ==========');
    console.log(alldataadditem);

    $('#modaladdnewitem').modal('show');
}



function deletefinish(item) {
    loadingpopup();
    var xhrzx = new XMLHttpRequest();

    xhrzx.open("POST", `/procurement/deleteitem`);
    xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrzx.setRequestHeader('authorization', xi);
    xhrzx.send(JSON.stringify({ namalengkap, username, tipe: 'procurement-bill-due', item }));
    xhrzx.addEventListener("load", () => {
        var resdat = JSON.parse(xhrzx.responseText);
        console.log('resdat');
        console.log(resdat);

        var valueload = 90;
        setTimeout(function () {
            Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
            setTimeout(function () {
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;

                if (resdat.icons == 'success') {
                    warningpopup('success', 'Delete berhasil');
                    location.reload();
                } else {
                    warningpopup('error', 'Delete gagal');
                }
            }, 800);
        }, 2000);
    });
}
//tutup delete item