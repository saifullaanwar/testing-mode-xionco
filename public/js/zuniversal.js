///////////////////modal//////////////////////
function openmodals(id) {
    const el = document.getElementById(id);
    let instance = bootstrap.Modal.getInstance(el);
    if (!instance) {
    instance = new bootstrap.Modal(el);
    }
    instance.show();
}

//
///////////////////format uang///////////////////////////////////
function formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
    } catch (e) {
        console.log(e)
    }
};
//////////////////


///////////////format tanggal////////////////////////////
/* cara pakai */
/* 
const myDate = new CustomDateFormatter(1730000000000); // Ganti dengan milidetik

var date=myDate.format('dd/mm/yyyy');

list format:
Format Tanggal Saja
dd/mm/yyyy: Menampilkan tanggal, bulan, dan tahun dalam format numerik.

Contoh: 26/10/2024

dd month yyyy: Menampilkan tanggal, nama bulan lengkap dalam bahasa Indonesia, dan tahun.

Contoh: 26 Oktober 2024

dd mon yyyy: Menampilkan tanggal, singkatan nama bulan dalam bahasa Indonesia, dan tahun.

Contoh: 26 Okt 2024

Format Tanggal dengan Waktu (Garis Tunggal)
dd/mm/yyyy, hh:MM WIB: Tanggal numerik dengan waktu dalam format 24 jam dan zona waktu WIB.

Contoh: 26/10/2024, 02:13 WIB

dd/mm/yyyy, hh:MM AM: Tanggal numerik dengan waktu dalam format 12 jam (AM/PM).

Contoh: 26/10/2024, 02:13 AM

dd month yyyy, hh:MM WIB: Tanggal dengan nama bulan lengkap, waktu 24 jam, dan zona waktu WIB.

Contoh: 26 Oktober 2024, 02:13 WIB

dd month yyyy, hh:MM AM: Tanggal dengan nama bulan lengkap dan waktu 12 jam (AM/PM).

Contoh: 26 Oktober 2024, 02:13 AM

dd mon yyyy, hh:MM WIB: Tanggal dengan singkatan bulan, waktu 24 jam, dan zona waktu WIB.

Contoh: 26 Okt 2024, 02:13 WIB

dd mon yyyy, hh:MM AM: Tanggal dengan singkatan bulan dan waktu 12 jam (AM/PM).

Contoh: 26 Okt 2024, 02:13 AM

Format Tanggal dengan Waktu (Garis Ganda / <br>)
dd/mm/yyyy<br>hh:MM WIB: Tanggal numerik dan waktu WIB, dipisahkan oleh tag <br>.

Contoh: 26/10/2024<br>02:13 WIB

dd/mm/yyyy<br>hh:MM AM: Tanggal numerik dan waktu AM/PM, dipisahkan oleh tag <br>.

Contoh: 26/10/2024<br>02:13 AM

dd month yyyy<br>hh:MM WIB: Tanggal dengan nama bulan lengkap dan waktu WIB, dipisahkan oleh tag <br>.

Contoh: 26 Oktober 2024<br>02:13 WIB

dd month yyyy<br>hh:MM AM: Tanggal dengan nama bulan lengkap dan waktu AM/PM, dipisahkan oleh tag <br>.

Contoh: 26 Oktober 2024<br>02:13 AM

dd mon yyyy<br>hh:MM WIB: Tanggal dengan singkatan bulan dan waktu WIB, dipisahkan oleh tag <br>.

Contoh: 26 Okt 2024<br>02:13 WIB

dd mon yyyy<br>hh:MM AM: Tanggal dengan singkatan bulan dan waktu AM/PM, dipisahkan oleh tag <br>.

Contoh: 26 Okt 2024<br>02:13 AM

Format dengan Hari :
namahari, dd month yyyy
Contoh: Jumat, 12 September 2025

namahari, dd month yyyy, hh:MM WIB
Contoh: Jumat, 12 September 2025, 15:32 WIB

namahari, dd month yyyy, hh:MM AM
Contoh : Jumat, 12 September 2025, 03:34 PM

namahari, dd mon yyyy
Contoh :Jumat, 12 Sep 2025

namahari, dd mon yyyy, hh:MM WIB
Contoh :Jumat, 12 Sep 2025, 15:34 WIB

namahari, dd mon yyyy, hh:MM AM
Contoh :Jumat, 12 Sep 2025, 03:34 PM

*/
class CustomDateFormatter {
    constructor(milliseconds) {
        if (typeof milliseconds !== 'number') {
            throw new Error('Input harus berupa angka (milidetik).');
        }
        this.date = new Date(milliseconds);
        this.months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        this.shortMonths = [
            'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
            'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
        ];
        this.days = [
            'Minggu', 'Senin', 'Selasa', 'Rabu',
            'Kamis', 'Jumat', 'Sabtu'
        ];
    }

    _padZero(num) {
        return num < 10 ? '0' + num : num;
    }

    _getTimeZone(format) {
        return format.includes('WIB') ? 'WIB' : (format.includes('AM') ? 'AM/PM' : '');
    }

    format(template) {
        const day = this._padZero(this.date.getDate());
        const monthNum = this._padZero(this.date.getMonth() + 1);
        const year = this.date.getFullYear();
        let hours = this.date.getHours();
        const minutes = this._padZero(this.date.getMinutes());

        const fullMonthName = this.months[this.date.getMonth()];
        const shortMonthName = this.shortMonths[this.date.getMonth()];
        const dayName = this.days[this.date.getDay()];

        let ampm = '';
        const timeZoneType = this._getTimeZone(template);

        // AM/PM mode
        if (timeZoneType === 'AM/PM') {
            ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
        }

        const hourStr = this._padZero(hours);

        let result = template;

        // ganti placeholder
        result = result.replace('namahari', dayName);
        result = result.replace('dd', day);
        result = result.replace('mm', monthNum);
        result = result.replace('yyyy', year);
        result = result.replace('month', fullMonthName);
        result = result.replace('mon', shortMonthName);
        result = result.replace('hh', hourStr);
        result = result.replace('MM', minutes); // pakai MM untuk menit supaya beda dgn mm bulan

        // Tangani zona waktu sesuai template
        if (timeZoneType === 'WIB') {
            // biarkan "WIB" di template, jangan ditambah lagi
        } else if (timeZoneType === 'AM/PM') {
            // ganti "AM" di template dengan nilai am/pm sebenarnya
            result = result.replace('AM', ampm);
        }

        return result.trim();
    }
}


///////////////////////////////////////////////////////

/////////////////////////////logout cek update /////////////////////
function logout() {
    Swal.fire({
        title: "",
        text:'Anda ingin logout akun?',
        showDenyButton: true,
        //showCancelButton: true,
        confirmButtonText: "Ya",
        denyButtonText: `Tidak`
    }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            suksesandloading('success','Logout sukses');

            if (localStorage.getItem('ismobile')=='y') {
                var datum=JSON.parse(await dbs.get('datauser'));
                var no=datum.no;
                var userid=datum.username
                const response = await window.flutter_inappwebview.callHandler('fromWebLogout', {no,username:userid});
            }
            

            localStorage.clear();
            sessionStorage.clear();
            await hapusAlldbs();//await dbs.deleteDatabase();
            document.cookie = `hamburger=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
            
            window.open('/login','_self');
        } 
    });
  
}

async function cekdatausersorout() {
    var hamburger=getCookie('hamburger');
    var oldversion=await dbs.get('versionapp');//localStorage.getItem('versionapp');
    console.log('hamburger === ');
    console.log(hamburger);
    document.getElementById('versiondiv').innerHTML=oldversion;
    if (hamburger=='') {
        updateted();
    }else{
        if (oldversion==null) {
            console.log('oldversion === ',oldversion);
            updateted();
        }else {
            if (oldversion!=versionapp) {
                 console.log('oldversion 2 === ',oldversion);
                updateted();
            }
        }
    }
    
    aktifpopover();

}
function aktifpopover() {
    // Aktifkan semua popover
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(triggerEl => new bootstrap.Popover(triggerEl, {
        trigger: 'click',
        html: true
    }));

    // Dismiss saat klik di luar
    document.addEventListener('click', function (e) {
        const popoverEl = document.querySelector('.popover');
        
        // cek apakah klik di luar semua trigger dan popover
        if (popoverEl && ![...popoverTriggerList].some(trigger => trigger.contains(e.target)) && !popoverEl.contains(e.target)) {
            popoverList.forEach(popover => popover.hide());
        }
    });
    //cara pakai set di bawah di dalam html
    //data-bs-toggle="popover" data-bs-trigger="focus" data-bs-title="Dismissible popover" data-bs-content="And here’s some amazing content. It’s very engaging. Right?"
}

var xi='Basic JDJhJDEyJC9VamxKS3R5TzN5SXp4ekhaOTh4eHVRNy5oNHVPS2xrSVkwQnpvQUM0Y0I1bTFQNi80SzNlOiQyYSQxMiRWcjdxR1NHUzh0VmEwNWJmSWR6R0tPcXIyby9JVzJrUEl1OGhiQW1Yb3hQRVdUaGRINlN4Ng==';
var webxioncomobile='http://localhost:3001';//;

function updateted() {
    console.log('hahi');
    Swal.fire({
        icon: 'warning',
        title: '',
        text: 'Ada update sistem, Anda akan terlogout automatis',
        showConfirmButton: false,
        allowOutsideClick:false
    });
    Swal.showLoading();
    setTimeout(async function () {
    
        setTimeout(async function () {
            await hapusAlldbs();//await dbs.deleteDatabase();
            localStorage.clear();
            sessionStorage.clear();
            document.cookie = `hamburger=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
            window.open('/login','_self');
        
        }, 1000);
    }, 2000);
}

async function clearalllssss() {
    await hapusAlldbs();//await dbs.deleteDatabase();
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = `hamburger=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

async function hapusAlldbs() {
    var datadbs=['versionapp','linkhome','username','datauser','dataroleuser'];
    for (let i = 0; i < datadbs.length; i++) {
        const element = datadbs[i];
        await dbs.delete(element);
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//update total tugas saya setiap role
///////////
function hitungtugassaya_universal(array) {
    var gethumburger=JSON.parse(getCookie('hamburger'));//datauser
    var rolerusers=gethumburger.tipeuser.toLowerCase();
    var dataarray;

    try {
    dataarray = JSON.parse(document.getElementById('itemalls')?.dataset?.json);
    } catch {
    dataarray = window.dataall;
    }
    //window.dataall

    //supervisor
    if (rolerusers=='supervisor') {
        /*console.log('alll ');
        console.log(dataarray); */

        const jumlahProsesProduksi = dataarray.dataadminlist.filter(element =>
            element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi'
        ).length;

        //&&!element.deliveryunit.toLowerCase().includes('third party')

        //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;

        //stock up
        var arraystocks=dataarray.stockupholsterydatabase;
/* 
        console.log('alll arraystocks');
        console.log(arraystocks.length); */

        const jumlahProsesProduksistock = arraystocks.filter(element =>
        element.qty!='0'&&element.upholstery_selesaibuatstock==='true'&&element.fixcreatein!='instocked'&&element.approval_produkjadi!='true'
        ).length;
        //

        //forcestatus
        var arrayforcestatus=dataarray.forcestatusrequest;
        const jumlahforcestatus=arrayforcestatus.filter(element =>
        element.approval_forcestatus!='true'
        ).length;
        //

        document.querySelectorAll('[name="totaltugassayapesanan"]').forEach(el => {
            el.textContent = `(${jumlahProsesProduksi})`; 
        });

        document.querySelectorAll('[name="totaltugassayapesananstock"]').forEach(el => {
        el.textContent = `(${jumlahProsesProduksistock})`; 
        });

        document.querySelectorAll('[name="totaltugassayaforcestatus"]').forEach(el => {
        el.textContent = `(${jumlahforcestatus})`; 
        });

        //approval kasbon
        var arrayapprovalkasbon=dataarray.database_invoicevendor;
        var fixarraykasbon=[];
        for (let i = 0; i < arrayapprovalkasbon.length; i++) {
            const element = arrayapprovalkasbon[i];
            var datareq=JSON.parse(element.list_kasbon);
            if (fixarraykasbon.length==0) {
                fixarraykasbon=datareq;
            }else{
                fixarraykasbon=[...fixarraykasbon,...datareq]
            }
            
        }
        /* console.log('fixarraykasbon');
        console.log(fixarraykasbon); */
        const jumlahapprovalkasbon=fixarraykasbon.filter(element =>
        element.approval==''
        ).length;
        document.querySelectorAll('[name="totaltugassayaapprovalkasbon"]').forEach(el => {
        el.textContent = `(${jumlahapprovalkasbon})`; 
        });
        //

        document.querySelectorAll('[name="totaltugassayaall"]').forEach(el => {
            el.textContent = `${jumlahProsesProduksi+jumlahProsesProduksistock+jumlahforcestatus+jumlahapprovalkasbon}`; 
        });
    }
    //admin classy
    else if (rolerusers=='admin classy') {
        
        console.log('alll ');
        console.log(dataarray);

        const jumlahProsesProduksi = dataarray.dataadminlist.filter(element =>
            element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status!='Dibatalkan'&&element.status!='Proses Produksi (Re)'
        ).length;

        //&&!element.deliveryunit.toLowerCase().includes('third party')

        //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;
        document.querySelectorAll('[name="totaltugassayapesanan"]').forEach(el => {
            el.textContent = `${jumlahProsesProduksi}`; 
        });
    }
    //admin c5
    else if (rolerusers=='admin c5') {
      
        console.log('alll ');
        console.log(dataarray);

        const jumlahProsesProduksi = dataarray.dataadminlist.filter(element =>
            element.stockprodukcode.toLowerCase()=='true'&&element.status.toLowerCase()!='selesai'&&element.status.toLowerCase()!='dibatalkan'&&!element.deliveryunit.includes('In-House')||element.stockprodukcode.toLowerCase()=='true'&&element.status.toLowerCase()=='proses qc dan packing'&&element.deliveryunit.includes('In-House')&&element.status.toLowerCase()!='selesai'&&element.status.toLowerCase()!='dibatalkan'
        ).length;

        

        //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;
        document.querySelectorAll('[name="totaltugassayapesanan"]').forEach(el => {
            el.textContent = `${jumlahProsesProduksi}`; 
        });
    }
    
}
/////
///function di bawah ini belum digunakan
function cekaku() {
    var gethumburgerx = JSON.parse(getCookie('hamburger'));

    /* fetch('/login/cekaku', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify({username})
    })
    .then(response => response.json())
    .then(resdat => {
        console.log('resdat');
        console.log(resdat);

        localStorage.clear();
        sessionStorage.clear();
        document.cookie = `hamburger=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;

        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        warningpopup('error','error catch : '+error);
    }); */
}
////function di atas ini belum digunakan

////////////download excel penjualan (adminlist)////////////
var startMillis;
var endMillis;

var startMillis_format;
var endMillis_format;
function downloadexcel_adminlist() {
    var inputtanggal=document.getElementById('tanggal-download');

    var datadonwload;

    // Buat Date baru dari milisekon hasil picker
    const startDatex = new Date(startMillis);
    const endDatex = new Date(endMillis);

    // Set jam awal & akhir
    startDatex.setHours(0, 0, 0, 0);
    endDatex.setHours(23, 59, 59, 999);

    // Ambil milisekon final
    const startMillisFinal = startDatex.getTime();
    const endMillisFinal = endDatex.getTime();

    if (inputtanggal.value=='') {
        document.getElementById('tanggal-download').classList.add('is-invalid');
        warningpopup('error','pilih tanggal data yang ingin di-download');
    }else{
        loadingpopup();
        var datarange={
            startMillis:startMillisFinal,
            endMillis:endMillisFinal
        }
        console.log('datarange ===$$');
        console.log(datarange);
        fetch('/supervisor/downloadexcel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': xi
            },
            body: JSON.stringify(datarange)
        })
        .then(response => response.json())
        .then(resdat => {
            console.log('resdat');
            console.log(resdat);

            if (resdat.icons=='success') {
                createdownloadfileexcel(resdat.dataadminlist);
            }else{
                warningpopup('error',resdat.text);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            warningpopup('error','error catch : '+error);
        }); 
    }
}
function checktglinput(id) {

    document.getElementById(id).classList.remove('is-invalid');
    console.log('valid')
}
function createdownloadfileexcel(arraydatum) {
    const date = new Date();
  
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Bulan mulai dari 0
    const yy = String(date.getFullYear()).slice(-2);
    
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    
    var tgls= `${dd}${mm}${yy}_${hh}${min}`;
    var valueload=90;
    setTimeout(function () {
        Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
        setTimeout(function () {
            if (arraydatum != null) {
                let wb = XLSX.utils.book_new(),
                    ws = XLSX.utils.json_to_sheet(arraydatum);
                XLSX.utils.book_append_sheet(wb, ws, 'items');
                XLSX.writeFile(wb, `data_transaksi_${tgls}.xlsx`);
                warningpopup('success','sukses download');
                //document.getElementById('tanggal-download').value='';
            } else {
                warningpopup('error','Data tidak tersedia');
            
            }
        },800); 
    },2000);
    
}
///end download excel penjualan (adminlist)

////////////////////////mark new data penjualan///////////////

//letkkan di luar global
//var datamaxmarkall=[];//data simpan max untuk mark all
//letakkan sebelum return html
//cek mark new
//var localdata =JSON.parse(localStorage.getItem('datauser'));
//datamaxmarkall=hasil3;

//
//<span class="badge text-bg-primary me-3 ${localdata.clicked_new.includes(arraysx.id_transaksi)?'d-none':''}" name="new-mark" id="new-mark-${arraysx.id_transaksi}">NEW</span>
async function markreadnewAll() {
    var localdata = JSON.parse(await dbs.get('datauser'));//localStorage.getItem('datauser')
    var listclicked=JSON.parse(localdata.clicked_new);
    console.log('listclicked');
    console.log(listclicked);


    //var marks=document.querySelectorAll('[name="new-mark"]');
    //var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    document.getElementById('load-markall').classList.remove('d-none');
    
    for (let i = 0; i < datamaxmarkall.length; i++) {
        const element =datamaxmarkall[i];
        if (!localdata.clicked_new.includes(element.id_transaksi)) {
            listclicked.push(element.id_transaksi);
            
            if (document.getElementById(`new-mark-${element.id_transaksi}`)) {
                document.getElementById(`new-mark-${element.id_transaksi}`).classList.add('d-none');
            }
        }
    }

    
    //save new to database
    localdata.clicked_new=JSON.stringify(listclicked);
    console.log('mark all gethumburgerx')
    console.log(localdata)
    //const date1 = new Date();
    //date1.setFullYear(date1.getFullYear() + 100); 
    await dbs.save('datauser',JSON.stringify(localdata));
    //localStorage.setItem('datauser',JSON.stringify(localdata));

    
    fetch('/adminlist/marknew', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': xi
        },
        body: JSON.stringify({username,clicked_new:listclicked})
    }).then(response => response.json())
    .then(resdat => {
        console.log('resdat');
        console.log(resdat);

        document.getElementById('load-markall').classList.add('d-none');
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('load-markall').classList.add('d-none');
    });

}

async function cekmarknew() {
    console.log('cek mark')
    console.log(getCookie('hamburger'));
    var localdata =JSON.parse(await dbs.get('datauser'));//localStorage.getItem('datauser')); //JSON.parse(getCookie('hamburger'));
    var listclicked=JSON.parse(localdata.clicked_new);

    if (listclicked.length>0) {
        for (let i = 0; i < listclicked.length; i++) {
            const element = listclicked[i];
            if (document.getElementById(`new-mark-${element}`)) {
                document.getElementById(`new-mark-${element}`).classList.add('d-none');
            }
        }
    }

}

async function readnewmark(id) {
    console.log('id mark')
    console.log(getCookie('hamburger'));
    var localdata = JSON.parse(await dbs.get('datauser'));//JSON.parse(getCookie('hamburger'));
    console.log('localdata===+++',localdata);
    var listclicked=JSON.parse(localdata.clicked_new);
    console.log('listclicked===+++',listclicked);
    //gethumburgerx.clicked_new=listclicked;
    var doc=document.getElementById(`new-mark-${id}`);
    
    if (!doc.className.includes('d-none')&&!listclicked.includes(id)) {
        doc.classList.add('d-none');
        var clicked_new=listclicked;
        if (listclicked.length==0) {
            clicked_new.push(id);
        }else{
            if (!listclicked.includes(id)) {
                clicked_new.push(id);
            }
        }
        console.log('new clicked_new')
        console.log(clicked_new);
        //save new to database
        localdata.clicked_new=JSON.stringify(clicked_new);
        console.log('localdata mark')
        console.log(localdata)
        //const date1 = new Date();
        //date1.setFullYear(date1.getFullYear() + 100); 
        await dbs.save('datauser',JSON.stringify(localdata));
        //localStorage.setItem('datauser',JSON.stringify(localdata));//document.cookie =`hamburger=${JSON.stringify(localdata)};path=/;expires=${date1.toUTCString()};`; 

        fetch('/adminlist/marknew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': xi
            },
            body: JSON.stringify({username,clicked_new})
        })
        .then(response => response.json())
        .then(resdat => {
            console.log('resdat');
            console.log(resdat);

            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
}
//cara pakai
//letakkan cekmarknew() di akhir render page yang ada new
//beri id element dengan new-mark-${idspesifik}
//letakkan readnewmark() pada tombol tertentuk agar new hilang
//end mark new

/////////////////////////////////////other ////////////////////////////
function loginadminwebs(to) {
    var link='/adminlist/adminweb';
    if (to=='adminlist') {
        link='/adminlist';
    }
    Swal.fire({
        icon:'question',
        title:'',
        text: `Apakah Anda ingin Login ke ${to}?`,
        //showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Login ${to}`,
        //denyButtonText: `Don't save`
    }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            suksesandloading('success','Loading login ...');
            window.open(link,'_self');
        } else if (result.isDenied) {
            
        }
    });
}

/////////////////////////////////////pop up ////////////////////////////

function warningunderbuild() {
    $('#modalunderbuild').modal('show');
}

function suksesandloading(icon,text) {
    Swal.fire({
        icon: icon,
        title: "",
        text: text,
        allowOutsideClick: false,
    });
    Swal.showLoading();
}

function loadingpopup() {
    Swal.fire({
        title: "Loading ...",
        allowOutsideClick: false,
        html:
        '<progress id="loadingpersenpopoups" value="20" max="100" style="width:100%"> </progress>',
        showConfirmButton: false,
    });
    //Swal.showLoading();
}
function warningpopup(icon,title) {
    Swal.fire({
        icon:icon,
        title: '',
        text:title,
        showConfirmButton: false,
        timer: 1500
    });
}

function warningpopupwithbutton(icon,title) {
    Swal.fire({
        icon:icon, 
        title:'',
        text: title,
        showConfirmButton: true,
        confirmButtonText:'Kembali',
        confirmButtonColor: "#ada9abcc",
        //timer: 3500
    });
}
//////

/////////////////////////////////////end pop up ////////////////////////////

///////////////////side bar /////////////////////////////

function menuarrowklik(id) {
    if (document.getElementById('klikhidebar').className!='bi bi-caret-right-fill toggle-btn') {
        if (document.getElementById(id).className=='bi bi-caret-down-fill hide-on-collapse') {
            document.getElementById(id).className='bi bi-caret-up-fill hide-on-collapse';
            $(`#${id}-extend`).show();
        }else{
            document.getElementById(id).className='bi bi-caret-down-fill hide-on-collapse';
            $(`#${id}-extend`).hide();
        }
    }

}

///auto scroll sidebar
function scrolltobuttonsidebar() {
    const params = new URLSearchParams(window.location.search);
    const scrollId = params.get("sc");

    console.log('scrollId=========',scrollId)
    if (scrollId) {
        let attempts = 0;

        function tryScroll() {
            const target = document.getElementById(scrollId);
            const sidebar = document.getElementById("scrolled");

            if (target && sidebar) {
                const rect = target.getBoundingClientRect();
                const sidebarRect = sidebar.getBoundingClientRect();
                const inView = rect.top >= sidebarRect.top && rect.bottom <= sidebarRect.bottom;

                if (!inView) {
                    // hitung posisi relatif target terhadap sidebar
                    const y = target.offsetTop;
                    const offset = 20; // biar ada jarak aman

                    sidebar.scrollTo({
                        top: y - offset,
                        behavior: "smooth"
                    });
                }

                // hapus parameter ?sc= dari URL
                const url = new URL(window.location.href);
                url.searchParams.delete("sc");
                window.history.replaceState({}, document.title, url.pathname + url.search);

                return;
            }

            if (attempts < 20) {
                attempts++;
                setTimeout(tryScroll, 100);
            }
        }

        tryScroll();
    }
}
////////////////////////////////////////////////////////

///////////////////////// notifikasi /////////////////////////////////////
/*  

*/
// simpan jumlah notifikasi
let notifCount = 0;

function calladdnotif(datasx,message) {
    showBrowserNotif("Notifikasi Baru", message);
    playNotifSound();
}

// fungsi update badge
function updateNotifBadge() {
    const badge = document.getElementById('notifBadge');
    if (notifCount > 0) {
        badge.textContent = notifCount;
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
}

// fungsi munculkan browser notification
function showBrowserNotif(title, body) {
    // minta izin dulu
    if (Notification.permission === "granted") {
        new Notification(title, { body: body, icon: "/assets/logo-halim.png" });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            new Notification(title, { body: body, icon: "/assets/logo-halim.png" });
        }
        });
    }
}


socket.on('notif-adminlist',async function (datas) {
    console.log('notif-adminlist============================',datas);
    const notifWrapper = document.getElementById("notifWrapper");

    if (notifWrapper) {
        console.log("Element notifWrapper ada");
        if (!window.dataall.notification_data || window.dataall.notification_data.length === 0) {
            console.log("Data notification_data tidak ada");
        } else {
            console.log("Ada data tabel notif:", window.dataall.notification_data);
            updatedataNotif(datas);
            setTimeout(function () {
            getceknotif();
            }, 1000);
        }
    } 
    

});


//update database notif
async function updatedataNotif(datanotif) {
    var notification_data=window.dataall.notification_data;

    var localdata =JSON.parse(await dbs.get('datauser'));//localStorage.getItem('datauser')); //JSON.parse(getCookie('hamburger'));
    var listclicked=JSON.parse(localdata.clicked_new);
    var roleuser=localdata.tipeuser.toLowerCase();

    // cari no tertinggi dari notification_data
    let maxNo = 0;
    if (notification_data.length > 0) {
        maxNo = Math.max(...notification_data.map(d => d.no));
    }

    var data={
        no:datanotif.no,//maxNo+1,
        tglinputmili:datanotif.tglinputmili,//Date.now(),
        message:datanotif.message,
        role:datanotif.role//`["${roleuser}"]`
    }
    notification_data.unshift(data);
}

//cek notif dari database
async function getceknotif() {
    notifCount=0;//reset
    var ul_notif=document.getElementById('notifDropdown');
    ul_notif.innerHTML='';//reset
    var notification_data=window.dataall.notification_data;
    notification_data.forEach(element => {
        if (typeof element.role === "string") {
            element.role=JSON.parse(element.role);
        }
        
    });

    var localdata =JSON.parse(await dbs.get('datauser'));//localStorage.getItem('datauser')); //JSON.parse(getCookie('hamburger'));
    var listclicked=JSON.parse(localdata.clicked_new);

    var roleuser=localdata.tipeuser.toLowerCase();

    var fixarraynotif=[];

    for (const element of notification_data) {
        
        //!listclicked.includes(id_notif)&&
        if (element.role.includes(roleuser)&&fixarraynotif.length<20) {
            fixarraynotif.push(element);
        }
    }

    console.log('fixarraynotif===',fixarraynotif);
    console.log('listclicked===++',listclicked);

    var html=fixarraynotif.length>0?fixarraynotif.map((el,index)=>{

        var colordot_none='green';
        var id_notif=`notif-${el.no}`;

        if (localdata.clicked_new.includes(id_notif)) {
            //sudah ada
            colordot_none='#c5c7c9';
            updateNotifBadge();
        }else{
            //Tambah jumlah notif
            notifCount++;
            updateNotifBadge();
        }

        const myDate = new CustomDateFormatter(Number(el.tglinputmili)); // Ganti dengan milidetik
        var date=myDate.format('dd mon yyyy, hh:mm WIB');

        document.getElementById('notifBadge').classList.remove('d-none');

        return `
            <li title="${el.message}">
                <div class="dropdown-item d-flex align-items-start justify-content-start" >
                    <span class="tanda-dot me-3"
                        style="background-color:${colordot_none};
                                display:inline-block;
                                width:10px;
                                height:10px;
                                border-radius:50%;
                                margin-top:3px;">
                    </span>

                    <div class="d-flex flex-column">
                        <span class="font-small greylight">
                            ${date} 
                        </span>
                        <textarea class="greyunbold" style="width: 300px;line-height: auto; margin: 0px; resize: none; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; vertical-align: middle; border: none; background: transparent; outline: none; vertical-align: middle;padding:0px;">${el.message}</textarea>
                                
                        
                    </div>
                </div>
                
            </li>
        `;
    }).join(''):`<li><a class="dropdown-item">Tidak ada notifikasi</a></li>`;
    //<span class="tanda-dot me-3" style="background-color:${colordot_none};top:0px">&nbsp;</span>
    //style="display: inline-block; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;margin-bottom:0px;"
    ul_notif.innerHTML=html;
}

async function openLonceng() {
    
    var notification_data=window.dataall.notification_data;
    notification_data.forEach(element => {
        if (typeof element.role === "string") {
            element.role=JSON.parse(element.role);
        }
        
    });

    var localdata =JSON.parse(await dbs.get('datauser'));//localStorage.getItem('datauser')); //JSON.parse(getCookie('hamburger'));
    var listclicked=JSON.parse(localdata.clicked_new);
    
    var roleuser=localdata.tipeuser.toLowerCase();

    var flag=false;

    for (const element of notification_data) {
        
        var id_notif=`notif-${element.no}`;
        if (!localdata.clicked_new.includes(id_notif)&&element.role.includes(roleuser)) {
            //save new to database
            listclicked.push(id_notif);

            localdata.clicked_new=JSON.stringify(listclicked);
            flag=true;

            await dbs.save('datauser',JSON.stringify(localdata));
        }
    }
    console.log('localdata read notif')
    console.log(JSON.stringify(localdata.clicked_new));

    if (flag==true) {
        console.log('adminlist/marknew===+++');
        fetch('/adminlist/marknew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': xi
            },
            body: JSON.stringify({username,clicked_new:listclicked})
        })
        .then(response => response.json())
        .then(resdat => {
            console.log('resdat');
            console.log(resdat);

            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    

}
const notifWrapper = document.getElementById("notifWrapper");

if (notifWrapper) {
    notifWrapper.addEventListener("hidden.bs.dropdown", function () {
        notifCount = 0;
        console.log("hide notifDropdown only");
        
        getceknotif();
    });
}


/**
 * @describe fungsi playsound notification
 */
function playNotifSound(){
    const audio = new Audio('/sounds/notif.wav')
    audio.play().catch(err => {
        console.warn('Gagal play suara notif', err)
    })
}


//////////////////////////////////////////////////////////////////////////