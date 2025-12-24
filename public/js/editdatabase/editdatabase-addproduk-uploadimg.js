//on input file image
// Objek global untuk menyimpan file yang dipilih dari setiap input
// Key akan menjadi ID input file, value adalah objek File
const selectedFiles = {};
// Fungsi untuk memicu klik pada input file tersembunyi
function klikuploadimg(e) {
    const urutanfoto = e.id.includes('iconupload')?e.id.replace('iconupload', ''):e.id.replace('imguploadshow', '');
    console.log('urutanfoto == ',urutanfoto);
    //reset
    const imgshows = document.getElementById(`imguploadshow${urutanfoto}`);
    const kursorshows = document.getElementById(`iconupload${urutanfoto}`);
    
    imgshows.src='';
    kursorshows.classList.remove('d-none');
    imgshows.classList.add('d-none');
    //listimagename
    var inputimg=document.getElementById(`uploadimg${urutanfoto}`);
    //inputimg.value = null; 
    //inputimg.click();
    if (inputimg) {
        inputimg.click();
        console.log(`[klikuploadimg] Mengklik input: ${`uploadimg${urutanfoto}`}`);
    } else {
        console.warn(`[klikuploadimg] Input dengan ID ${`uploadimg${urutanfoto}`} tidak ditemukan.`);
    }
    
}

// Tambahkan event listener untuk kelima input file
var imglenght=5;
// --- Objek untuk menyimpan AbortController untuk setiap set listener ---
// Kita akan memiliki satu controller utama yang akan kita 'abort' setiap kali kita menginisialisasi ulang
var currentAbortController = new AbortController(); 

function initializeImageUploads(imglength){
    //console.log(`[initializeImageUploads] Dipanggil. imglenght saat ini: ${imglength}`);
    
    // 1. Abort controller lama untuk menghapus semua listener sebelumnya
    currentAbortController.abort();
    // 2. Buat controller baru untuk listener yang baru
    currentAbortController = new AbortController();
    const { signal } = currentAbortController; // Dapatkan sinyalnya

    for (let i = 1; i <= imglength; i++) {
        const inputId = `uploadimg${i}`;
        const inputElement = document.getElementById(inputId);

        if (inputElement) {
            //console.log(`[initializeImageUploads] Menemukan elemen: ${inputId}. Mengikat listener.`);
            
            // Tambahkan event listener dengan signal dari AbortController
            inputElement.addEventListener("change", function (event) {
                const file = event.target.files[0]; 

                if (!file) {
                    delete selectedFiles[inputId]; 
                    updateStatusIcon(inputId, false, ''); 
                    return;
                }

                const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"];
                if (!allowedTypes.includes(file.type)) {
                    Swal.fire({
                        icon: "error",
                        text: "Format file harus gambar (PNG, JPG, JPEG, GIF, WEBP).",
                        confirmButtonColor: "#0d6efd",
                        confirmButtonText: "Ok",
                        allowOutsideClick: true,
                    });
                    event.target.value = '';
                    delete selectedFiles[inputId];
                    updateStatusIcon(inputId, false, '');
                    return;
                }

                selectedFiles[inputId] = file;
                const imgurl = URL.createObjectURL(file);
                //console.log(`[EVENT] File dipilih untuk ${inputId}: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
                updateStatusIcon(inputId, true, imgurl);
            }, { signal }); // Lampirkan signal di sini
        } else {
            console.log(`[initializeImageUploads] Elemen TIDAK DITEMUKAN: ${inputId}.`);
        }
    }
    console.log(`[initializeImageUploads] Selesai inisialisasi.`);
}

var listimagename=[];
function updateStatusIcon(inputId, isFileSelected,url) {
    
    const indexfiles = inputId.replace('uploadimg', '');
    const imgshows = document.getElementById(`imguploadshow${indexfiles}`);
    const kursorshows = document.getElementById(`iconupload${indexfiles}`);

    var fixindexfoto=indexfiles;

    const newFileName = `img-${fixindexfoto}-${Date.now()}.png`; 

    if (!kursorshows.className.includes('d-none')) {
        //show image
        kursorshows.classList.add('d-none');
        imgshows.classList.remove('d-none');
        imgshows.src=url;
        listimagename[parseInt(fixindexfoto)-1]=`/assets/pridukimage/${newFileName}`;
    }else{
        //hide 
        imgshows.src='';
        kursorshows.classList.remove('d-none');
        imgshows.classList.add('d-none');
        if (listimagename[parseInt(fixindexfoto)-1] === `/assets/pridukimage/${newFileName}`) {
            listimagename[parseInt(fixindexfoto)-1] = undefined; // atau null jika ingin kosong jelas
        }
    }
    //reset jika semuanya tidak ada gambar
    if (listimagename.every(item => item === undefined)) {
        listimagename = [];
    }

    if (hapusvarsub!=true) {
        oninputdata();
    }
    
}

// async function uploadingimage(array) {
    
//     //loadingpopup();
//     const formData = new FormData();
//     let fileCount = 0;
//     // Iterasi melalui file yang dipilih dan tambahkan ke FormData
//     /* for (const id in selectedFiles) {
//         if (selectedFiles.hasOwnProperty(id)) {
//             const file = selectedFiles[id];
            
//             // Dapatkan ekstensi file dari originalname
//             const fileExtension = file.name.split('.').pop();
//             // Buat nama file baru dengan timestamp milidetik
//             const newFileName = `img-${fileCount+1}-${Date.now()}.png`; // Contoh: 1678889900123.jpg

//             console.log('nama file ==',newFileName)

//             // Tambahkan file ke FormData dengan nama baru
//             // 'gambar' adalah nama field yang diharapkan Multer di server
//             formData.append("gambar", file, newFileName);
//             //listimagename.push(newFileName);
//             fileCount++;
//         }
//     } */
//     //const sortedKeys = Object.keys(selectedFiles).sort(); // Pastikan urutannya tetap

//     // Urutkan kunci secara numerik, bukan leksikografis
//     const sortedKeys = Object.keys(selectedFiles).sort((a, b) => {
//         const numA = parseInt(a.replace('uploadimg', ''));
//         const numB = parseInt(b.replace('uploadimg', ''));
//         return numA - numB;
//     });

//     sortedKeys.forEach((id, index) => {
//         if (selectedFiles.hasOwnProperty(id)) {
//             const file = selectedFiles[id];
//             // Ambil index numerik dari ID untuk mencocokkan dengan listimagename
//             const numericIndex = parseInt(id.replace('uploadimg', '')) - 1; // Karena listimagename berbasis 0

//             /// Pastikan listimagename[numericIndex] ada dan valid
//             if (listimagename[numericIndex]) {
//                 const newFileName = listimagename[numericIndex].split('/').pop(); // Ambil hanya nama file dari path lengkap

//                 formData.append("gambar", file, newFileName);
//                 fileCount++;
//             } else {
//                 console.warn(`Nama file untuk ID ${id} (index ${numericIndex}) tidak ditemukan di listimagename.`);
//                 // Anda bisa memilih untuk melewatkan file ini atau memberikan nama default
//                 // Misalnya: formData.append("gambar", file, `default-img-${numericIndex}-${Date.now()}.png`);
//             }
//         }
//     });

//     if (fileCount === 0) {
//         Swal.close();
//         Swal.fire({
//             icon: "error",
//             text: "Tidak ada gambar yang dipilih untuk diunggah.",
//             confirmButtonColor: "#0d6efd",
//             confirmButtonText: "Ok",
//             allowOutsideClick: true,
//         });
//         return;
//     }

//     console.log(`Mengunggah ${fileCount} file...`);

//     try {
//         const uploadUrl = '/uploadmultiimage/produkweb'; // Pastikan ini sesuai dengan router

//         const response = await fetch(uploadUrl, {
//             method: 'POST',
//             // headers: {
//             //     'authorization': xi // header otorisasi
//             // },
//             body: formData, // FormData akan mengatur Content-Type secara otomatis
            
//         });

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => ({ message: response.statusText }));
//             throw new Error(errorData.message || 'Gagal mengunggah file.');
//         }

//         const resdat = await response.json();

//         setTimeout(function () {
//             Swal.getHtmlContainer().querySelector("#loadingpersenpopoups").value = 90;
//             if (resdat.uploaded === "file terupload") {
                
//                 /* Swal.fire({
//                     icon: 'success',
//                     title: 'Semua gambar berhasil diunggah!',
//                     text: `${fileCount} gambar berhasil disimpan.`,
//                     timer: 2000,
//                     showConfirmButton: false
//                 }); */
//                 // Lakukan sesuatu setelah upload berhasil, misal:
//                 // savefixselesai(folderfoto); // Panggil fungsi Anda setelah sukses
//                 // Clear selected files for next upload
//                 for (const id in selectedFiles) {
//                     if (selectedFiles.hasOwnProperty(id)) {
//                         delete selectedFiles[id];
//                         // Optional: Reset input file elements to clear their state
//                         const inputElement = document.getElementById(id);
//                         if (inputElement) {
//                             inputElement.value = ''; // Reset the input value
//                         }
//                         updateStatusIcon(id, false,'');
//                     }
//                 }

//                 //return `sukses`;
//                 //alldataadditem.main_image=JSON.stringify(listimagename);
//                     //socket.emit('addnew-katagori',{namalengkap,username,alldataadditem});
//                     //Swal.close();
//                 //$("#modalpopupsuksessaveit").modal('show');
//                 warningpopup('success','sukses save data produk');
//                 Swal.fire({
//                     icon: "success",
//                     title: "",
//                     text: "",
//                 });
//                 Swal.showLoading();
//                 // location.reload();
//                 window.open('/adminlist/adminweb/product', '_self');
//             } else {
//                 //statusText.textContent = 'Upload gagal!';
//                 Swal.fire({
//                     icon: "error",
//                     title: `Data tersimpan namun Upload foto error ${resdat.uploaded}, `,
//                     showConfirmButton: false,
//                     timer: 3000,
//                 });
//                 //return `sukses [1]`;
//             }
//         }, 2000);
        
//     } catch (error) {
//         console.error("Upload error:", error);
//         //statusText.textContent = 'Terjadi kesalahan!';
//         Swal.fire({
//             icon: "error",
//             title: `Data tersimpan namun Upload foto error: ${error.message || 'Terjadi kesalahan jaringan/server'}`,
//             showConfirmButton: false,
//             timer: 3000,
//         });
//         //return 'suskses [99]'
//     }
// }



async function uploadingimage(array) {
    const formData = new FormData();
    let fileCount = 0;

    // Urutkan kunci secara numerik
    const sortedKeys = Object.keys(selectedFiles).sort((a, b) => {
        const numA = parseInt(a.replace('uploadimg', ''));
        const numB = parseInt(b.replace('uploadimg', ''));
        return numA - numB;
    });

    sortedKeys.forEach((id) => {
        if (selectedFiles.hasOwnProperty(id)) {
            const file = selectedFiles[id];
            const numericIndex = parseInt(id.replace('uploadimg', '')) - 1;
            if (listimagename[numericIndex]) {
                const newFileName = listimagename[numericIndex].split('/').pop();
                formData.append("gambar", file, newFileName);
                fileCount++;
            } else {
                console.warn(`Nama file untuk ID ${id} (index ${numericIndex}) tidak ditemukan di listimagename.`);
            }
        }
    });

    if (fileCount === 0) {
        Swal.close();
        Swal.fire({
            icon: "error",
            text: "Tidak ada gambar yang dipilih untuk diunggah.",
            confirmButtonColor: "#0d6efd",
            confirmButtonText: "Ok",
            allowOutsideClick: true,
        });
        return;
    }

    console.log(`Mengunggah ${fileCount} file...`);

    try {
        const uploadUrl = '/uploadmultiimage/produkweb';

        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.message || 'Gagal mengunggah file.');
        }

        const resdat = await response.json();

        // Delay 2 detik → update progress
        await new Promise(r => setTimeout(r, 2000));
        Swal.getHtmlContainer().querySelector("#loadingpersenpopoups").value = 90;

        if (resdat.uploaded === "file terupload") {
            // Reset file terpilih
            for (const id in selectedFiles) {
                if (selectedFiles.hasOwnProperty(id)) {
                    delete selectedFiles[id];
                    const inputElement = document.getElementById(id);
                    if (inputElement) inputElement.value = '';
                    updateStatusIcon(id, false, '');
                }
            }

            warningpopup('success', 'sukses save data produk');
            Swal.fire({ icon: "success", title: "", text: "" });
            Swal.showLoading();
            window.open('/adminlist/adminweb/product', '_self');
        } else {
            Swal.fire({
                icon: "error",
                title: `Data tersimpan namun Upload foto error ${resdat.uploaded}, `,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    } catch (error) {
        console.error("Upload error:", error);
        Swal.fire({
            icon: "error",
            title: `Data tersimpan namun Upload foto error: ${error.message || 'Terjadi kesalahan jaringan/server'}`,
            showConfirmButton: false,
            timer: 3000,
        });
    }
}



//
/* 
for (let i = 1; i <= imglength; i++) {
    const inputId = `uploadimg${i}`;
    const inputElement = document.getElementById(inputId);

    if (inputElement) { // Pastikan elemen ditemukan
        inputElement.addEventListener("change", function (event) {
            const file = event.target.files[0]; // Ambil file pertama dari input ini

            if (!file) {
                // Jika user membatalkan pilihan file
                delete selectedFiles[inputId]; // Hapus dari daftar jika dibatalkan
                updateStatusIcon(inputId, false,''); // Update ikon status
                return;
            }

            // Validasi format file
            const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: "error",
                    text: "Format file harus gambar (PNG, JPG, JPEG, GIF).",
                    confirmButtonColor: "#0d6efd",
                    confirmButtonText: "Ok",
                    allowOutsideClick: true,
                });
                // Clear input file agar user bisa memilih ulang
                event.target.value = '';
                delete selectedFiles[inputId]; // Hapus dari daftar
                updateStatusIcon(inputId, false,''); // Update ikon status
                return;
            }

            // Simpan file ke objek global
            selectedFiles[inputId] = file;

            // Tampilkan preview atau informasi file jika diperlukan
            const imgurl = URL.createObjectURL(file);
            console.log(`File selected for ${inputId}: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
            // Anda bisa update UI di sini, misalnya menampilkan thumbnail

            updateStatusIcon(inputId, true,imgurl); // Update ikon status
        });
    }
} */