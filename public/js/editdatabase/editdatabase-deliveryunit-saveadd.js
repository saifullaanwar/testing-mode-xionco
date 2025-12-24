$(document).ready(function () {
    // Jalankan fungsi ambil data saat halaman pertama kali dibuka
    getdeliveryunitlist();
});

// 1. FUNGSI AMBIL DATA (READ)
function getdeliveryunitlist() {
    $.ajax({
        url: "/editdatabase/getdeliveryunitlist",
        method: "GET",
        success: function (response) {
            let html = "";
            if (response && response.length > 0) {
                response.forEach((item, index) => {
                    html += `
                        <tr>
                            <td>${index + 1}</td>
                            <td class="text-start ps-4">${item.delivery_unit}</td>
                            <td>
                                <span class="badge ${item.tipe === 'inhouse' ? 'bg-primary' : 'bg-success'}">
                                    ${item.tipe.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-danger" onclick="deletedata('${item.id}')">
                                    <i class="bi bi-trash"></i> Hapus
                                </button>
                            </td>
                        </tr>`;
                });
            } else {
                html = '<tr><td colspan="4" class="text-center">Belum ada data delivery unit</td></tr>';
            }
            // Masukkan ke tbody di EJS
            $("#divhpsdata").html(html);
        },
        error: function () {
            $("#divhpsdata").html('<tr><td colspan="4" class="text-danger">Gagal memuat data dari server</td></tr>');
        }
    });
}

// 2. FUNGSI TAMBAH BARIS INPUT (ADD MORE)
let countitem = 1;
function additems() {
    countitem++;
    let html = `
        <div id="item-${countitem}" class="partitems border-bottom mb-3 pb-2">
            <b><p id="judulitem-${countitem}" class="mb-2" style="font-size: 13px;">Delivery Unit ${countitem}</p></b>
            <div class="row">
                <div class="input-group input-group-sm mb-2">
                    <span class="input-group-text" style="background-color: #f8f9fa; font-size: 12px; width: 120px;">
                        <span class="text-danger">*&nbsp;</span> Delivery Unit
                    </span>
                    <input type="text" class="form-control input-delivery-name" id="deliveryunit-${countitem}" placeholder="Nama Delivery Unit" style="font-size: 12px" />
                </div>
                <div class="input-group input-group-sm mb-2">
                    <span class="input-group-text" style="background-color: #f8f9fa; font-size: 12px; width: 120px;">
                        <span class="text-danger">*&nbsp;</span> Tipe Unit
                    </span>
                    <select class="form-select input-delivery-type" id="tipeunit-${countitem}" style="font-size: 12px">
                        <option value="">Pilih Tipe</option>
                        <option value="inhouse">In-House</option>
                        <option value="thirdparty">Thirdparty</option>
                    </select>
                </div>
            </div>
            <div class="d-flex justify-content-end div-remove-item">
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeItem(${countitem})" style="font-size: 11px;">
                    <i class="bi bi-trash3-fill"></i>&nbsp;Hapus Baris
                </button>
            </div>
        </div>`;
    
    $("#itemsContainer").append(html);
}

// 3. FUNGSI HAPUS BARIS DI MODAL
function removeItem(id) {
    $(`#item-${id}`).remove();
}

// 4. FUNGSI SIMPAN DATA KE DATABASE (CREATE)
function submitsave() {
    let data_to_save = [];
    let is_valid = true;

    // Looping setiap baris input yang ada di modal
    $(".partitems").each(function () {
        let name = $(this).find(".input-delivery-name").val();
        let type = $(this).find(".input-delivery-type").val();

        if (!name || !type) {
            is_valid = false;
            return false; // Break loop
        }

        data_to_save.push({
            delivery_unit: name,
            tipe: type
        });
    });

    if (!is_valid) {
        return alert("Mohon lengkapi semua nama dan tipe unit!");
    }

    // Tampilkan loading screen
    $("#nav-loading").removeClass("d-none");

    $.ajax({
        url: "/editdatabase/saveadddeliveryunit",
        method: "POST",
        data: { data: data_to_save },
        success: function (res) {
            $("#nav-loading").addClass("d-none");
            if (res.icons === "success") {
                // Tutup modal dan refresh data
                $("#modaladdnew-deliveryunit").modal("hide");
                resetModalDelivery();
                getdeliveryunitlist();
                // Tampilkan pesan sukses jika ada modal sukses
                $("#modalsuksessaveadd-database").modal("show");
            } else {
                alert("Gagal menyimpan: " + res.texts);
            }
        },
        error: function () {
            $("#nav-loading").addClass("d-none");
            alert("Error: Tidak dapat terhubung ke server.");
        }
    });
}

// 5. RESET MODAL SETELAH DIGUNAKAN
function resetModalDelivery() {
    $("#itemsContainer").html(`
        <div id="item-1" class="partitems border-bottom mb-3 pb-2">
            <b><p id="judulitem-1" class="mb-2" style="font-size: 13px;">Delivery Unit 1</p></b>
            <div class="row">
                <div class="input-group input-group-sm mb-2">
                    <span class="input-group-text" style="background-color: #f8f9fa; font-size: 12px; width: 120px;">
                        <span class="text-danger">*&nbsp;</span> Delivery Unit
                    </span>
                    <input type="text" class="form-control input-delivery-name" id="deliveryunit-1" placeholder="Contoh: JNE / Internal Mobil" style="font-size: 12px" />
                </div>
                <div class="input-group input-group-sm mb-2">
                    <span class="input-group-text" style="background-color: #f8f9fa; font-size: 12px; width: 120px;">
                        <span class="text-danger">*&nbsp;</span> Tipe Unit
                    </span>
                    <select class="form-select input-delivery-type" id="tipeunit-1" style="font-size: 12px">
                        <option value="">Pilih Tipe</option>
                        <option value="inhouse">In-House</option>
                        <option value="thirdparty">Thirdparty</option>
                    </select>
                </div>
            </div>
        </div>
    `);
    countitem = 1;
}

// 6. FUNGSI HAPUS DATA DARI DATABASE (DELETE)
function deletedata(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        $("#nav-loading").removeClass("d-none");
        $.post("/editdatabase/deletedeliveryunit", { id: id }, function (res) {
            $("#nav-loading").addClass("d-none");
            if (res.icons === "success") {
                getdeliveryunitlist();
            } else {
                alert("Gagal menghapus data.");
            }
        });
    }
}