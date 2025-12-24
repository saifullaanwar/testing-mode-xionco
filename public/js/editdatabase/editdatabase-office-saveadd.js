
//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';
var oldedititem = [];

//save to database
function submitsave() {
    var array = document.querySelectorAll('#itemsContainer > .partitems');


    var flag = 0;//0 = isian tidak lengkap
    for (let i = 0; i < array.length; i++) {
        const itemCard = array[i];

        // Ambil semua data dari input di dalam itemCard
        let office = itemCard.querySelector('[name="office"]')?.value?.trim() || "";
        let address = itemCard.querySelector('[name="address"]')?.value?.trim() || "";

        // Validasi: kalau ada field wajib kosong
        if (!office || !address) {
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

        xhrzx.open("POST", `/editdatabase/saveaddoffice`);
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
        let office = itemCard.querySelector('[name="office"]')?.value?.trim() || "";
        let address = itemCard.querySelector('[name="address"]')?.value?.trim() || "";

        // Validasi: kalau ada field wajib kosong
        if (!office || !address) {
            warningpopup("error", `Isi dengan lengkap`);
        } else {

            hidemodal('modaladdnewitem');
            loadingpopup();

            var fixdata = { namalengkap, username, oldedititem, alldataadditem };
            console.log(fixdata);

            var xhrzx = new XMLHttpRequest();
            xhrzx.open("POST", `/editdatabase/saveeditoffice`);
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
        return `
        <tr>
            <td class="text-truncate"  style="max-width: 100px;" title="${element.office}">
                ${element.office}
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
        text: `Apakah anda ingin delete item ${dataarray.office}?`,
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `Delete`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

        } else if (result.isDenied) {
            //delete item
            deletefinish(dataarray.office);
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

    document.getElementById(`modaladdnewitemlabel`).innerHTML = "Edit Product " + dataarray.office;
    document.getElementById(`addnewitemtombolfooters`).classList.add('d-none');
    document.getElementById(`edititemtombolfooters`).classList.remove('d-none');

    //insert data product
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard, index) => {
        itemCard.querySelector('[name="office"]').value = dataarray.office;
        itemCard.querySelector('[name="address"]').value = dataarray.address;
    });

    var data = {
        office: dataarray.office,
        address: dataarray.address,
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
    xhrzx.send(JSON.stringify({ namalengkap, username, tipe: 'office', item }));
    xhrzx.addEventListener("load", () => {
        var resdat = JSON.parse(xhrzx.responseText);
        console.log('resdat');
        console.log(JSON.stringify({ namalengkap, username, tipe: 'office', item }));

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