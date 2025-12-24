
//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';
var oldedititem = [];


//save to database
function submitsave() {
    var array = document.querySelectorAll('#itemsContainer > .partitems');

    for (let i = 0; i < array.length; i++) {
        const itemCard = array[i];

        let vendor = itemCard.querySelector('[name="vendor"]')?.value?.trim() || "";
        let tipebayar = itemCard.querySelector('[name="tipebayar"]')?.value?.trim() || "";
        let atasnama = itemCard.querySelector('[name="atasnama"]')?.value?.trim() || "";
        let rekening = itemCard.querySelector('[name="rekening"]')?.value?.trim() || "";

        if (!vendor) {
            warningpopup("error", `Isi dengan lengkap pada item ke-${i + 1}`);
            return; // stop proses
        }
    }

    // Konfirmasi tambahan sebelum submit
    Swal.fire({
        icon: 'question',
        title: 'Konfirmasi',
        text: 'Pastikan nama dan nomor rekening sudah benar. Lanjutkan menyimpan data?',
        showCancelButton: true,
        confirmButtonText: 'Ya, simpan',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Jalankan proses simpan
            hidemodal('modaladdnewitem');
            loadingpopup();

            var xhrzx = new XMLHttpRequest();
            xhrzx.open("POST", `/editdatabase/saveaddvendor`);
            xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhrzx.setRequestHeader('authorization', xi);
            xhrzx.send(JSON.stringify({ namalengkap, username, alldataadditem }));

            xhrzx.addEventListener("load", () => {
                var resdat = JSON.parse(xhrzx.responseText);
                creattabstatus(resdat.notif);
                $("#modalpopupsuksessaveit").modal('show');
            });
        }
    });
}

function submitsaveedit() {
    var array = document.querySelectorAll('#itemsContainer > .partitems');

    for (let i = 0; i < array.length; i++) {
        const itemCard = array[i];

        let vendor = itemCard.querySelector('[name="vendor"]')?.value?.trim() || "";
        let tipebayar = itemCard.querySelector('[name="tipebayar"]')?.value?.trim() || "";
        let atasnama = itemCard.querySelector('[name="atasnama"]')?.value?.trim() || "";
        let rekening = itemCard.querySelector('[name="rekening"]')?.value?.trim() || "";

        // Validasi: field wajib diisi
        if (!vendor) {
            warningpopup("error", `Isi dengan lengkap pada item ke-${i + 1}`);
            return; // hentikan proses
        }
    }

    // Konfirmasi sebelum submit
    Swal.fire({
        icon: 'question',
        title: 'Konfirmasi',
        text: 'Pastikan nama nomor rekening sudah benar. Lanjutkan menyimpan perubahan?',
        showCancelButton: true,
        confirmButtonText: 'Ya, simpan',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            hidemodal('modaladdnewitem');
            loadingpopup();

            var fixdata = { namalengkap, username, oldedititem, alldataadditem };
            console.log(fixdata);

            var xhrzx = new XMLHttpRequest();
            xhrzx.open("POST", `/editdatabase/saveeditvendor`);
            xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhrzx.setRequestHeader('authorization', xi);
            xhrzx.send(JSON.stringify(fixdata));

            xhrzx.addEventListener("load", () => {
                var resdat = JSON.parse(xhrzx.responseText);
                console.log(resdat);

                var valueload = 90;
                setTimeout(function () {
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;
                    setTimeout(function () {
                        Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload;

                        if (JSON.stringify(resdat.notif).toLowerCase().includes('gagal') || JSON.stringify(resdat.notif).toLowerCase().includes('error')) {
                            creattabstatus(resdat.notif);
                            $("#modalpopupsuksessaveit").modal('show');
                        } else {
                            socket.emit('addnew-editvariantproduk', { namalengkap, username, alldataadditem });
                            creattabstatus(resdat.notif);
                            $("#modalpopupsuksessaveit").modal('show');
                        }
                    }, 800);
                }, 2000);
            });
        }
    });
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
        console.log(element);
        
        return `
        <tr>
            <td class="text-truncate"  style="max-width: 100px;" title="${element.vendor}">
                ${element.vendor}
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
        text: `Apakah anda ingin delete item ${dataarray.vendor}?`,
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `Delete`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

        } else if (result.isDenied) {
            //delete item
            deletefinish(dataarray.atas_nama);
        }
    });
}

function klikedititem(index) {
    addoredit = 'edit';
    alldataadditem.length = 0;
    oldedititem.length = 0;
    var dataarray = JSON.parse(document.getElementById(`dataitem-${index}`).dataset.json);

    console.log('data per product');
    console.log(dataarray);

    document.getElementById(`modaladdnewitemlabel`).innerHTML = "Edit Vendor " + dataarray.vendor;
    document.getElementById(`addnewitemtombolfooters`).classList.add('d-none');
    document.getElementById(`edititemtombolfooters`).classList.remove('d-none');

    //insert data product
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard, index) => {
        itemCard.querySelector('[name="vendor"]').value = dataarray.vendor;
        itemCard.querySelector('[name="tipebayar"]').value = dataarray.tipe_bayar;
        itemCard.querySelector('[name="atasnama"]').value = dataarray.atas_nama;
        itemCard.querySelector('[name="rekening"]').value = dataarray.rekening;
    });

    var data = {
        vendor: dataarray.vendor,
        tipe_bayar: dataarray.tipe_bayar,
        atas_nama:dataarray.atas_nama,
        rekening:dataarray.rekening
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

    xhrzx.open("POST", `/editdatabase/deleteitem`);
    xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrzx.setRequestHeader('authorization', xi);
    xhrzx.send(JSON.stringify({ namalengkap, username, tipe: 'vendor', item }));
    xhrzx.addEventListener("load", () => {
        var resdat = JSON.parse(xhrzx.responseText);
        console.log('resdat');
        console.log(JSON.stringify({ namalengkap, username, tipe: 'vendor', item }));

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