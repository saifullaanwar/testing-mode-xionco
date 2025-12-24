
//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';
var oldedititem = [];


//save to database
function submitsave() {
    var array = document.querySelectorAll('#itemsContainer > .partitems');

    var flag = 0;//0 = isian tidak lengkap
    for (let i = 0; i < array.length; i++) {
        const itemCard = array[i];

        // Ambil semua data dari input di dalam itemCard
        let kode = itemCard.querySelector('[name="kode"]')?.value?.trim() || "";
        let namaplan = multiInputData[i] || [];

        // Validasi: kalau ada field wajib kosong
        if (!kode || !namaplan) {
            warningpopup("error", `Isi dengan lengkap pada item ke-${i + 1}`);
            flag = 0;
            break;
        } else {
            if (i == array.length - 1) {
                flag = 1;
            }
        }
    }

    if (flag == 1) {
        hidemodal('modaladdnewitem');
        loadingpopup();
        var xhrzx = new XMLHttpRequest();

        xhrzx.open("POST", `/editdatabase/saveaddcoa`);
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

                        $("#modalpopupsuksessaveit").modal('show');
                    } else {
                        creattabstatus(resdat.notif);
                        $("#modalpopupsuksessaveit").modal('show');
                    }
                }, 800);
            }, 2000);

        });
    }
}

function submitsaveedit() {
    var array = document.querySelectorAll('#itemsContainer > .partitems');
    for (let i = 0; i < array.length; i++) {
        const itemCard = array[i];

        // Ambil semua data dari input di dalam itemCard
        let kode = itemCard.querySelector('[name="kode"]')?.value?.trim() || "";
        let namaplan = multiInputData[i] || [];


        // Validasi: kalau ada field wajib kosong
        if (!kode || !namaplan) {
            warningpopup("error", `Isi dengan lengkap`);
        } else {
            hidemodal('modaladdnewitem');
            loadingpopup();
            var fixdata = { namalengkap, username, oldedititem, alldataadditem };
            console.log(fixdata);

            var xhrzx = new XMLHttpRequest();
            xhrzx.open("POST", `/editdatabase/saveeditcoa`);
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
        console.log(element);

        return `
        <tr>
            <td class="text-truncate"  style="max-width: 100px;" title="${element.coa}">
                ${element.coa}
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
        text: `Apakah anda ingin delete item ${dataarray.kode}?`,
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `Delete`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

        } else if (result.isDenied) {
            //delete item
            deletefinish(dataarray.kode);
        }
    });
}

function klikedititem(index) {
    addoredit = 'edit';
    alldataadditem.length = 0;
    oldedititem.length = 0;

    const dataarray = JSON.parse(document.getElementById(`dataitem-${index}`).dataset.json);
    console.log('🧾 Data per product:', dataarray);

    document.getElementById(`modaladdnewitemlabel`).innerHTML = "Edit Coa " + dataarray.kode;
    document.getElementById(`addnewitemtombolfooters`).classList.add('d-none');
    document.getElementById(`edititemtombolfooters`).classList.remove('d-none');

    // Pastikan field utama terisi
    const itemCard = document.querySelector('#itemsContainer > .partitems');

    itemCard.querySelector('[name="kode"]').value = dataarray.kode || '';
    itemCard.querySelector('[name="keterangan"]').value = dataarray.keterangan || '';
    itemCard.querySelector('[name="note"]').value = dataarray.note || '';

    // 🔥 Bagian penting: handle nama_plan yang berupa string JSON
    let parsedNamaPlan = [];

    try {
        parsedNamaPlan = typeof dataarray.namaplan === "string"
            ? JSON.parse(dataarray.namaplan)
            : dataarray.namaplan;
    } catch (err) {
        parsedNamaPlan = [];
    }

    // Simpan ke global multiInputData (index 0 karena hanya 1 item edit)
    multiInputData[0] = parsedNamaPlan;

    // Render ulang chip ke dalam wrapper
    const wrapper = itemCard.querySelector('.form-control.d-flex.flex-wrap');
    wrapper.querySelectorAll('.badge').forEach(el => el.remove()); // hapus chip lama

    parsedNamaPlan.forEach(value => {
        addChip(wrapper, value, 0);
    });

    // Simpan ke array lama
    const data = {
        kode: dataarray.kode,
        namaplan: parsedNamaPlan,
        keterangan: dataarray.keterangan,
        note: dataarray.note
    };

    oldedititem.push(data);
    alldataadditem.push(data);

    console.log('✏️ Edit product awal ==========');
    console.log(alldataadditem);

    $('#modaladdnewitem').modal('show');
}


function deletefinish(item) {
    loadingpopup();
    var xhrzx = new XMLHttpRequest();

    xhrzx.open("POST", `/editdatabase/deleteitem`);
    xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrzx.setRequestHeader('authorization', xi);
    xhrzx.send(JSON.stringify({ namalengkap, username, tipe: 'coa', item }));
    xhrzx.addEventListener("load", () => {
        var resdat = JSON.parse(xhrzx.responseText);
        console.log('resdat');
        console.log(JSON.stringify({ namalengkap, username, tipe: 'coa', item }));

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