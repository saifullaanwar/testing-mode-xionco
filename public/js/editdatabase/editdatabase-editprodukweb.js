var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');
var gethumburger;
//console.log=function(){};

var ismobile='n';
document.addEventListener('DOMContentLoaded',async function () {
    cekdatausersorout();
    showfotvidmodal();
    //document.getElementById('editsavedetail').setAttribute('style','display:none;');
    //fix modal error
    document.addEventListener('hide.bs.modal', function (event) {
        if (document.activeElement) {
        document.activeElement.blur();
        }
    });
    ///
    const usercek = await dbs.isLoggedIn();
  //localStorage.getItem('username') && localStorage.getItem('username') != ''
  console.log('usercek',usercek);
  if (usercek) {
      username=usercek;//localStorage.getItem('username'); 
      
      namalengkap =JSON.parse(await dbs.get('datauser')).namalengkap;
      document.getElementById('namalengkap').innerHTML=namalengkap;
  }
    else {
        window.location.href = '/';
    }

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        ismobile = 'y';
    }

    gethumburger=JSON.parse(getCookie('hamburger'));
scrolltobuttonsidebar();

    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log(dataarray);

    //additemdropfilter(dataarray.itemsdata);
    
    //document.getElementById('addextracharge').style.display='none';
    createlistkatagori(dataarray.databaseallitem_katagori);
    createlisthigitem();
    createlistcolorvar();
    showdata();
    
    // button back
    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', function () {
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Jika Anda keluar, semua perubahan data tidak akan disimpan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Ya, keluar',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.history.back();
                }
            });
        });
    }
});

///////////
///create list
function createlistkatagori(array) {
    var divhapus=document.getElementById('datalist-katagori');
    console.log('data katagori',array)
    var htmlx=array.map((element)=>{

        return `
            <option value="${element.katagori}">
        `
    }).join('');

    divhapus.innerHTML=htmlx;
}

var listitem='';
function createlisthigitem() {
    
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var divhapus=document.getElementById('datalist-hignovariant');
   
    var fixarray=dataarray.itemsdata.filter((element)=>
        element.product!='AETHER - Track Light - Body 90 Connector'&&element.product!='AETHER - Track Light - Body Plain Connector'&&element.product!='AETHER - Track Light - Leg Connector'
    );
    var htmlx=fixarray.map((element)=>{

        return `
            <option value="${element.product}">
        `
    }).join('');

    listitem=htmlx;
    divhapus.innerHTML=htmlx;
}


var listkainss='';
function createlistcolorvar() {
    
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    //var divhapus=document.getElementById('listkains-1');
   
    
    var htmlx=dataarray.colorvariantdata.map((element)=>{

        return `
            <option value="${element.kodekain}">
        `
    }).join('');

    listkainss=htmlx;
    //console.log('listkainss',listkainss)
    //divhapus.innerHTML=htmlx;
    var html1=dataarray.colorvariantdata.map((element)=>{

        return `
            <option value="${element.colorvariant}">
        `
    }).join('');
    document.querySelector('[id="datalist-colorhignovariant"]').innerHTML=html1;
}
///end create list


///text editor deskripsi
var textedited_deskripsi = '';
$(document).ready(function () {
    $('#summernote').summernote({
        placeholder: 'ketik di sini',
        height: 100,
        toolbar: [
            //['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            //['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            //['insert', ['link' ]],//'picture'
            ['view', ['fullscreen', 'codeview', 'help']]
        ],
        callbacks: {
            onInit: function() {
                $('#summernote').summernote('code', datadeskripsi);
            },
            onImageUpload: function (files, editor, welEditable) {
                sendFile(files[0], editor, welEditable);
            },
            onChange: function (contents, $editable) {
                //console.log('onChange:', contents, $editable);
                textedited_deskripsi = contents;
                oninputdata();
            }
        }
    });
  
});
///end text editor deskripsi

/////////////////////////////////////////////////


//show data
var editpage=true;
var pageshow=false;
var datadeskripsi='';
var oldata;
async function showdata() {
    var dataarray=JSON.parse(localStorage.getItem('dataeditproduk_sementara'));//
    oldata=dataarray;
    var dataproduk=JSON.parse(document.getElementById('itemalls').dataset.json).itemsdata;
    console.log('dataarray ====',dataarray);
    
    if (dataarray.listvariant.length>0) {
        tomboltipeproduk_awal(1);
    }else{
        tomboltipeproduk_awal(0);
    }
    initializeImageUploads(imglenght);

    if (dataarray.imageurl.length>5) {
        //imglenght=dataarray.imageurl.length;
        //arrayvariantname arraySubvariantname
        dataarray.listvariant.forEach(item => {
            // Masukkan variant ke dalam arrayvariantname jika belum ada
            if (!arrayvariantname.includes(item.variant)) {
                arrayvariantname.push(item.variant);
            }

            // Cek apakah ada subvariant
            if (Array.isArray(item.subvariant) && item.subvariant.length > 0) {
                item.subvariant.forEach(sub => {
                // Masukkan subvariant ke arraySubvariantname jika belum ada
                if (!arraySubvariantname.includes(sub.subvariant)) {
                    arraySubvariantname.push(sub.subvariant);
                }
                });
            }
        });

        arrayvariantname.forEach(element => {
            createbadgevar_awal(element);
        });

        if (arraySubvariantname.length>0) {
            arraySubvariantname.forEach(element => {
                createbadgesubvar_awal(element);
            });
        }
        await addfixvariant();
        

        //masukan data di tabel

        if (arraySubvariantname.length>0){
            //ada sub variant
            const newsubvariant =  dataarray.listvariant.flatMap(item => 
                item.subvariant.map(sub => ({
                    variant: item.variant,
                    ...sub
                }))
            );

            console.log('newsubvariant===',newsubvariant);
            newsubvariant.forEach(async(element,index) => {
                var higprodukIDs=await dataproduk.find(item => item.no === parseInt(element.higprodukID));
                document.querySelectorAll('[name="pricevariantcoret"]')[index].value=element.price_coret;
                document.querySelectorAll('[name="pricevariant"]')[index].value=element.price;
                document.querySelectorAll('[name="kodesml"]')[index].value=element.kodesml;
                document.querySelectorAll('[name="colorvar"]')[index].innerHTML=element.colorhig;
                document.querySelectorAll('[name="varianthig"]')[index].value=higprodukIDs.product;
                document.querySelectorAll('[name="hexcode"]')[index].value=element.hexcode;
                
            });
        }else{
            //tanpa sub variant
            dataarray.listvariant.forEach(async(element,index) => {
                var higprodukIDs=await dataproduk.find(item => item.no === parseInt(element.higprodukID));
                document.querySelectorAll('[name="pricevariantcoret"]')[index].value=element.price_coret;
                document.querySelectorAll('[name="pricevariant"]')[index].value=element.price;
                document.querySelectorAll('[name="kodesml"]')[index].value=element.kodesml;
                document.querySelectorAll('[name="colorvar"]')[index].innerHTML=element.colorhig;
                document.querySelectorAll('[name="varianthig"]')[index].value=higprodukIDs.product;
                document.querySelectorAll('[name="hexcode"]')[index].value=element.hexcode;
                
            });
            
        }
        //ceklist UP
        const prefixes = ["fabric-", "faux-"];
        const containsPrefix = arrayvariantname.some(name =>
        prefixes.some(prefix => name.toLowerCase().includes(prefix))
        );
        console.log('containsPrefix ===',containsPrefix);
        if (containsPrefix) {
            document.getElementById('kainklik').checked=true;
            kainornoss();
        }

        //main variant
        arrayvariantname.forEach((element,index) => {
            if (dataarray.main_produk.includes(element)) {
                document.getElementById(`checkasmain-${index}`).checked=true;
            }
        });
    }
    

    //masukkan data
    var proikhigss=dataarray.higprodukID!=''? await dataproduk.find(item => item.no === parseInt(dataarray.higprodukID)):'';
    console.log('proikhigss ====',proikhigss.product);

    document.querySelector('[name="higsistemitem-novariant"]').value=proikhigss.product?proikhigss.product:'';

    document.querySelector('[name="colorhigsistemitem-novariant"]').value=dataarray.colorhig;

    document.querySelector('[name="produkmainname"]').value=dataarray.namaproduk;
    document.querySelector('[name="pricecoret"]').value=dataarray.price_coret;
    document.querySelector('[name="mainprice"]').value=dataarray.main_price;
    //document.querySelector('[name="deskripsiproduk"]').value=dataarray.diskripsi;
    //$('#summernote').summernote('code', dataarray.diskripsi);
    datadeskripsi=dataarray.diskripsi;
    $('#summernote').summernote('code', datadeskripsi);

    //document.querySelector('[name="katagori"]').value=dataarray.katagori;
    listdatakatagori=JSON.parse(dataarray.katagori);
    if (listdatakatagori.length>0) {
        listdatakatagori.forEach(element => {
            creat_pilihkategorifix(element);
        });
    }

    document.querySelector('[name="kodesmlnovariant"]').value=dataarray.kodesml;

    for (let i = 0; i < dataarray.imageurl.length; i++) {
        const element = dataarray.imageurl[i];
        const imgshows = document.getElementById(`imguploadshow${i+1}`);
        const kursorshows = document.getElementById(`iconupload${i+1}`);
        //const newFileName = `img-${fixindexfoto}-${Date.now()}.png`; 

        kursorshows.classList.add('d-none');
        imgshows.classList.remove('d-none');
        imgshows.src=element;
        listimagename[i]=element;
    }

    pageshow=true;
}

//list variant
function createbadgevar_awal(data) {
    const input = document.getElementById("tag-text-variant");
    const container = document.getElementById("tag-input-variant");
    
    const tagValue = data.trim();
    //arrayvariantname.push(e.value);

    // Buat elemen badge
    const badge = document.createElement("span");
    badge.className = "badge bg-secondary d-inline-flex align-items-center py-1 px-2 rounded";

    // Tambahkan teks
    const textSpan = document.createElement("span");
    textSpan.textContent = tagValue;

    // Tombol hapus
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "btn-close btn-close-white btn-sm ms-2";
    closeBtn.style.fontSize = "0.6em";
    closeBtn.style.marginTop = "-2px";
    closeBtn.addEventListener("click", () => {
        let indexh = arrayvariantname.indexOf(tagValue);

        if (indexh !== -1) {
            arrayvariantname.splice(indexh, 1); // hapus 1 item di index tersebut
        }
        container.removeChild(badge);
    });

    badge.appendChild(textSpan);
    badge.appendChild(closeBtn);

    // Tambah sebelum input
    container.insertBefore(badge, input);

    

    oninputdata();
}
//list sub variant
function createbadgesubvar_awal(data) {
    const input = document.getElementById("tag-text");
    const container = document.getElementById("tag-input");
    
    const tagValue = data.trim();
    
    // Buat elemen badge
    const badge = document.createElement("span");
    badge.className = "badge bg-secondary d-inline-flex align-items-center py-1 px-2 rounded";

    // Tambahkan teks
    const textSpan = document.createElement("span");
    textSpan.textContent = tagValue;

    // Tombol hapus
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "btn-close btn-close-white btn-sm ms-2";
    closeBtn.style.fontSize = "0.6em";
    closeBtn.style.marginTop = "-2px";
    closeBtn.addEventListener("click", () => {
        let indexh = arraySubvariantname.indexOf(tagValue);

        if (indexh !== -1) {
            arraySubvariantname.splice(indexh, 1); // hapus 1 item di index tersebut
        }
        container.removeChild(badge);
    });

    badge.appendChild(textSpan);
    badge.appendChild(closeBtn);

    // Tambah sebelum input
    container.insertBefore(badge, input);

}
//end show data


///// tomboltipeproduk
var buttontipeaktif=0;//0 novariant, 1 variant, 2 subvariant
var listvariant=[];
function tomboltipeproduk(e) {
    const buttons=document.querySelectorAll('[name="tomboltipeproduk"]');
    // Reset semua tombol jadi background putih
    buttons.forEach(btn => {
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-light');
    });
    
    // Ubah tombol yang diklik jadi background abu
    e.classList.remove('btn-light');
    e.classList.add('btn-secondary');

    // Cari index tombol yang diklik
    const index = Array.from(buttons).indexOf(e);
    console.log("Index tombol yang diklik:", index);
    if (index>0) {
        document.querySelector('[name="colorhigsistemitem-novariant"]').value='';
        document.querySelector('[name="colorhigsistemitem-novariant"]').disabled=true;

        document.querySelector('[name="higsistemitem-novariant"]').value='';
        document.querySelector('[name="higsistemitem-novariant"]').disabled=true;

        document.querySelector('[name="kodesmlnovariant"]').value='';
        
        if (index==1) {
            document.querySelector('[name="mainprice"]').disabled=true;
            document.querySelector('[name="pricecoret"]').disabled=true;
            document.querySelector('[name="kodesmlnovariant"]').disabled=true;
            document.getElementById('varintshow-page').classList.remove('d-none');
            document.getElementById('subvariantshow-page').classList.remove('d-none');
            document.getElementById('showallvariant').classList.remove('d-none');
            //document.getElementById('datalist-higvariant-1').innerHTML=listitem
            //higsistemitem-variant showallvariant
        }/* else{
            document.querySelector('[name="mainprice"]').disabled=true;
            document.getElementById('varintshow-page').classList.remove('d-none');
            document.getElementById('subvariantshow-page').classList.remove('d-none');
        } */
    }else{
        
        document.querySelector('[name="mainprice"]').disabled=false;
            document.querySelector('[name="pricecoret"]').disabled=false;
            document.querySelector('[name="kodesmlnovariant"]').disabled=false;

        document.querySelector('[name="colorhigsistemitem-novariant"]').disabled=false;
        document.querySelector('[name="higsistemitem-novariant"]').disabled=false;
        document.getElementById('varintshow-page').classList.add('d-none');
        document.getElementById('subvariantshow-page').classList.add('d-none');
        document.getElementById('showallvariant').classList.add('d-none');
    }
    buttontipeaktif=index;
    
    oninputdata();
}

function tomboltipeproduk_awal(indexs) {
    const buttons=document.querySelectorAll('[name="tomboltipeproduk"]');
    // Reset semua tombol jadi background putih
    buttons.forEach(btn => {
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-light');
    });

    var fixbuttonklik=buttons[indexs];
    
    // Ubah tombol yang diklik jadi background abu
    fixbuttonklik.classList.remove('btn-light');
    fixbuttonklik.classList.add('btn-secondary');

    // Cari index tombol yang diklik
    const index = Array.from(buttons).indexOf(fixbuttonklik);
    console.log("Index tombol yang diklik:", index);
    if (index>0) {
        document.querySelector('[name="colorhigsistemitem-novariant"]').value='';
        document.querySelector('[name="colorhigsistemitem-novariant"]').disabled=true;

        document.querySelector('[name="higsistemitem-novariant"]').value='';
        document.querySelector('[name="higsistemitem-novariant"]').disabled=true;
        if (index==1) {
            document.querySelector('[name="mainprice"]').disabled=true;
            document.querySelector('[name="pricecoret"]').disabled=true;
            document.querySelector('[name="kodesmlnovariant"]').disabled=true;
            document.getElementById('varintshow-page').classList.remove('d-none');
            document.getElementById('subvariantshow-page').classList.remove('d-none');
            document.getElementById('showallvariant').classList.remove('d-none');
            //document.getElementById('datalist-higvariant-1').innerHTML=listitem
            //higsistemitem-variant showallvariant
        }/* else{
            document.querySelector('[name="mainprice"]').disabled=true;
            document.getElementById('varintshow-page').classList.remove('d-none');
            document.getElementById('subvariantshow-page').classList.remove('d-none');
        } */
    }else{
        
        document.querySelector('[name="mainprice"]').disabled=false;
            document.querySelector('[name="pricecoret"]').disabled=false;
            document.querySelector('[name="kodesmlnovariant"]').disabled=false;

        document.querySelector('[name="colorhigsistemitem-novariant"]').disabled=false;
        document.querySelector('[name="higsistemitem-novariant"]').disabled=false;
        document.getElementById('varintshow-page').classList.add('d-none');
        document.getElementById('subvariantshow-page').classList.add('d-none');
        document.getElementById('showallvariant').classList.add('d-none');
    }
    buttontipeaktif=index;
    
    oninputdata();
}
///// end tomboltipeproduk


//creat list katagori input
var listdatakatagori=[];
function pilihkategorifix(e) {
    const input = document.getElementById("katagori");
    const container = document.getElementById("katagori-input");
    const sudahada=listdatakatagori.find((element)=>element.toLowerCase()===e.value.trim().toLowerCase());
    if (sudahada) {
        //sudahada
        warningpopup('error','katagori sudah ada');
        e.value = "";
    }else{
        if (e.value.trim() !== "") {
            const tagValue = e.value.trim();

            listdatakatagori.push(e.value);
            // Buat elemen badge
            const badge = document.createElement("span");
            badge.className = "badge bg-secondary d-inline-flex align-items-center px-2 rounded";//py-1 

            // Tambahkan teks
            const textSpan = document.createElement("span");
            textSpan.textContent = tagValue;
            textSpan.style.fontSize='12px';

            // Tombol hapus
            const closeBtn = document.createElement("button");
            closeBtn.type = "button";
            closeBtn.className = "btn-close btn-close-white btn-sm ms-2";
            closeBtn.style.fontSize = "0.6em";
            closeBtn.style.marginTop = "-2px";
            closeBtn.addEventListener("click", () => {
                let indexh = listdatakatagori.indexOf(tagValue);

                if (indexh !== -1) {
                    listdatakatagori.splice(indexh, 1); // hapus 1 item di index tersebut
                }
                container.removeChild(badge);
                oninputdata();
            });

            badge.appendChild(textSpan);
            badge.appendChild(closeBtn);

            // Tambah sebelum input
            container.insertBefore(badge, input);

            // Kosongkan input
            e.value = "";
        }
    }
    
    oninputdata();
}
function creat_pilihkategorifix(data) {
    const input = document.getElementById("katagori");
    const container = document.getElementById("katagori-input");
    if (data.trim() !== "") {
        const tagValue = data.trim();

        //listdatakatagori.push(data);
        // Buat elemen badge
        const badge = document.createElement("span");
        badge.className = "badge bg-secondary d-inline-flex align-items-center px-2 rounded";//py-1 

        // Tambahkan teks
        const textSpan = document.createElement("span");
        textSpan.textContent = tagValue;
        textSpan.style.fontSize='12px';

        // Tombol hapus
        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "btn-close btn-close-white btn-sm ms-2";
        closeBtn.style.fontSize = "0.6em";
        closeBtn.style.marginTop = "-2px";
        closeBtn.addEventListener("click", () => {
            let indexh = listdatakatagori.indexOf(tagValue);

            if (indexh !== -1) {
                listdatakatagori.splice(indexh, 1); // hapus 1 item di index tersebut
            }
            container.removeChild(badge);
            oninputdata();
        });

        badge.appendChild(textSpan);
        badge.appendChild(closeBtn);

        // Tambah sebelum input
        container.insertBefore(badge, input);

    }
    oninputdata();
}
/////

//// oninputdata
var alldataadditem;
function oninputdata() {
    document.querySelectorAll('#pagedasar').forEach((formCard,index) => {
        let produkmainname = formCard.querySelector('[name="produkmainname"]').value.trim();
        var pricecoret=formCard.querySelector('[name="pricecoret"]').value.trim();
        var mainprice=formCard.querySelector('[name="mainprice"]').value.trim();
        var deskripsiproduk=textedited_deskripsi;//formCard.querySelector('[name="deskripsiproduk"]').value.trim();
        var katagori=listdatakatagori;//formCard.querySelector('[name="katagori"]').value.trim();
        var kodesmlnovariant=formCard.querySelector('[name="kodesmlnovariant"]').value.trim();

        var data;
        var totalterjual = Math.floor(Math.random() * (900 - 100 + 1)) + 100;
        if (buttontipeaktif==0) {
            //no variant
            var higprodukselek=formCard.querySelector('[name="higsistemitem-novariant"]').value.trim();
            var higprodukID=findprodukIDHIG(higprodukselek);
            var colorhigprodukselek=formCard.querySelector('[name="colorhigsistemitem-novariant"]').value.trim();
            var colorhig=findcolorIDHIG(colorhigprodukselek);
            data={
                katagori,
                namaproduk: produkmainname,
                main_produk: "", 
                main_price: mainprice,
                price_coret:pricecoret,
                totalterjual,
                kodesml:kodesmlnovariant,
                diskripsi: deskripsiproduk,
                colorhig,
                higprodukID,
                imageurl: listimagename,
                tipevariant:kainorno,
                listvariant: []
            };
        }else if (buttontipeaktif==1) {
            //variant
            
            //list variant
            if (variantfix.length>0) {

                // Contoh: var listimagename = ["url1", "url2", "url3", "url4", "url5", "url6", "url7", "url8", ...];

                // Objek untuk menyimpan URL gambar berdasarkan nama varian
                const variantImageMap = {}; 
                let imageIndexCounter = 0; // Counter untuk melacak indeks di listimagename untuk varian unik

                for (let i = 0; i < variantfix.length; i++) {
                    const element = variantfix[i];
                    var higprodukID = document.querySelectorAll('[name="varianthig"]')[i];
                    var pricevariantcoret = document.querySelectorAll('[name="pricevariantcoret"]')[i];
                    var pricevariant = document.querySelectorAll('[name="pricevariant"]')[i];
                    var kodesml = document.querySelectorAll('[name="kodesml"]')[i];
                    var colorvar = document.querySelectorAll('[name="colorvar"]')[i];
                    var hexcode = document.querySelectorAll('[name="hexcode"]')[i];

                    element.colorhig = colorvar.innerText;
                    element.price_coret = pricevariantcoret.value == '' ? 0 : pricevariantcoret.value;
                    element.price = pricevariant.value == '' ? 0 : pricevariant.value;
                    element.kodesml = kodesml.value;
                    element.hexcode = hexcode.value;

                    // Logika untuk imageurl
                    if (!variantImageMap[element.variant]) {
                        // Jika varian ini belum ada di map, tetapkan URL gambar baru
                        // menggunakan `imageIndexCounter` untuk mengambil URL berikutnya
                        // dan menambahkannya dengan `currentImglenght` (yang sebelumnya `imglenght` 5)
                        // Pastikan `listimagename` memiliki cukup elemen
                        const baseImageIndex = 5; // Karena dari data ke-6 (indeks 5)
                        variantImageMap[element.variant] = listimagename[baseImageIndex + imageIndexCounter] || '';
                        imageIndexCounter++; // Tingkatkan counter untuk varian unik berikutnya
                    }
                    element.imageurl = variantImageMap[element.variant];
                    
                    element.higprodukID = higprodukID.value == '' ? '' : findprodukIDHIG(higprodukID.value);
                }
                
                var datavariant=formatVariantData(variantfix);
                data={
                    katagori,
                    namaproduk: produkmainname,
                    main_produk: mainvariants, 
                    main_price: mainprice,
                    price_coret:pricecoret,
                    totalterjual,
                    kodesml:'',
                    diskripsi: deskripsiproduk,
                    colorhig:'',
                    higprodukID:'',
                    imageurl: listimagename,
                    tipevariant:kainorno,
                    listvariant: datavariant
                };
            }
            
            
        }
        alldataadditem=data;
        console.log('data oniput',data)
    });
}


function findprodukIDHIG(product) {
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).itemsdata;
    const item = dataarray.find(d => d.product.trim() === product.trim());
    const nomor = item ? item.no : null;

    if (nomor==null) {
        if (buttontipeaktif==0&&pageshow==true) {
            
            warningpopup('error','ID product HIG tidak ditemukan, pastikan memilih product HIG yang benar');
        }
        return '';
    }else{
        return nomor;
    }
}

function findcolorIDHIG(color) {
    if (color!='') {
        var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).colorvariantdata;
        const item = dataarray.find(d => d.colorvariant.trim()=== color);
        const nomor = item ? item.no : null;

        if (nomor==null) {
            warningpopup('error','ID color HIG tidak ditemukan, pastikan memilih color HIG yang benar');
        }else{
            return color;
        }
    }else{
        return '';
    }
}
//// end oninputdata



//savetodatabase
function savetodatabase() {
    var flag=true;//true semua input terisi benar, false ada yang tidak diisi pada input wajib

    if (buttontipeaktif==0) {
        //non variant
        var arrayinput=['produkmainname','pricecoret','mainprice','higsistemitem-novariant','kodesmlnovariant'];
        for (let i = 0; i < arrayinput.length; i++) {
            const element = arrayinput[i];
            var el=document.querySelector(`[name="${element}"]`);
            if (el.value=='') {
                el.classList.add('is-invalid');
                flag=false;
            }else{
                el.classList.remove('is-invalid');
            }
        }
        if (textedited_deskripsi=='') {
            flag=false;
            warningpopup('error','Deskripsi tidak boleh kosong');
        }
        /* if (listimagename.length==0||listimagename.length<5) {
            flag=false;
            warningpopup('error','Upload foto dengan lengkap');
        } */
    }else{
        //variant
        var arrayinput=['produkmainname','pricecoret','mainprice'];
        for (let i = 0; i < arrayinput.length; i++) {
            const element = arrayinput[i];
            var el=document.querySelector(`[name="${element}"]`);
            if (el.value=='') {
                el.classList.add('is-invalid');
                flag=false;
            }else{
                el.classList.remove('is-invalid');
            }
        }
        if (textedited_deskripsi=='') {
            flag=false;
            warningpopup('error','Deskripsi tidak boleh kosong');
        }
        var arrayinputvarian=['pricevariantcoret','pricevariant','kodesml','varianthig','hexcode']
        for (let i = 0; i < arrayinputvarian.length; i++) {
            const element = arrayinputvarian[i];
            var el=document.querySelectorAll(`[name="${element}"]`);
            el.forEach(elementx => {
                if (elementx.value=='') {
                    elementx.classList.add('is-invalid');
                    flag=false;
                }else{
                    elementx.classList.remove('is-invalid');
                }
            });
        }

        /* if (listimagename.length==0||listimagename.length<5) {
            flag=false;
            warningpopup('error','Upload foto dengan lengkap');
        } */
    }

    //cek foto
    var flagfoto=true;
    var allfoto=document.querySelectorAll(`[name="imguploadshow"]`);
    console.log('allfoto',allfoto.length);
    for (let i = 0; i < allfoto.length; i++) {
        const element = allfoto[i];
        console.log('try cej',element)
        if (element.getAttribute("src") == null || element.getAttribute("src") == "") {
            flag=false;
            flagfoto=false;
        }
    }
    if (flagfoto==false) {
        warningpopup('error','Upload foto dengan lengkap');
    }

    if (flag==true) {
        console.log('sortedKeys ===============');
        const sortedKeys = Object.keys(selectedFiles).sort();
        console.log('sortedKeys',sortedKeys);
        loadingpopup();
        fizsave(alldataadditem)
    }
    //
}



//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

// async function fizsave(datakirim) {
//     fetch('/adminlist/adminweb-saveeditprodukweb', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//             'Authorization': xi
//         },
//         body: JSON.stringify({tipe:'edit',namalengkap,username,data:{oldata,datakirim}})
//     })
//     .then(response => response.json())
//     .then(resdat => {
//         console.log('resdat');
//         console.log(resdat);

//         var valueload=90;
//         setTimeout(function () { 
//             Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-20;
//             setTimeout(async function () { 
//                 Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;

//                 if (resdat.icons=='success') {
//                     //warningpopup('success','sukses pembatalan');
//                     //socket.emit('approvereqbeli',additemreqproc);
//                     //location.reload();
//                     await uploadingimage();
//                     // window.open('/adminlist/adminweb/product','_self');
//                 }
//                 else{
//                     if (resdat.texts=='delete foto gagal') {
//                         Swal.fire({
//                             icon: "success",
//                             title: "",
//                             text: "Sukses Edit tetapi Image gagal terupload",
//                         });
//                         Swal.showLoading();
//                         window.open('/adminlist/adminweb/product','_self');
//                     }else{
//                         warningpopup('error',resdat.texts);
//                     }
//                 }
                
//             },800);
//         },2000);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         warningpopup('error','error catch : '+error);
//     });
// }


async function fizsave(datakirim) {
    try {
        const response = await fetch('/adminlist/adminweb-saveeditprodukweb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': xi
            },
            body: JSON.stringify({
                tipe: 'edit',
                namalengkap,
                username,
                data: { oldata, datakirim }
            })
        });

        const resdat = await response.json();
        console.log('resdat', resdat);

        let valueload = 90;

        // Delay 2 detik
        await new Promise(r => setTimeout(r, 2000));
        Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 20;

        // Delay 0.8 detik
        await new Promise(r => setTimeout(r, 800));
        Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value = valueload - 10;

        if (resdat.icons == 'success') {
            await uploadingimage();
        } else {
            if (resdat.texts == 'delete foto gagal') {
                Swal.fire({
                    icon: "success",
                    title: "",
                    text: "Sukses Edit tetapi Image gagal terupload",
                });
                Swal.showLoading();
                // window.open('/adminlist/adminweb/product', '_self');
            } else {
                warningpopup('error', resdat.texts);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        warningpopup('error', 'error catch : ' + error);
    }
}









//////////////////////////////////universal

// function loadingpopup() {
//     Swal.fire({
//         title: "Loading ...",
//         allowOutsideClick: false,
//         html:
//         '<progress id="loadingpersenpopoups" value="20" max="100" style="width:100%"> </progress>',
//         showConfirmButton: false,
//     });
//     //Swal.showLoading();
    
// }
// function warningpopup(icon,title) {
//     Swal.fire({
//         icon:icon,
//         title:'',
//         text: title,
//         showConfirmButton: false,
//         timer: 1500
//     });
// }
//////
function reloadnewdata() {
  
}

// function menuarrowklik(id) {
//   if (document.getElementById('klikhidebar').className!='bi bi-caret-right-fill toggle-btn') {
//     if (document.getElementById(id).className=='bi bi-caret-down-fill hide-on-collapse') {
//         document.getElementById(id).className='bi bi-caret-up-fill hide-on-collapse';
//         $(`#${id}-extend`).show();
//     }else{
//         document.getElementById(id).className='bi bi-caret-down-fill hide-on-collapse';
//         $(`#${id}-extend`).hide();
//     }
// }

// }
////////
$(document).ready(function () { resizetable(); });
function resizetable() {

    var top_nav_height = 0;
    var bottom_nav_height = 0;
    var mobilespasi = 0;
    var kotaktombolatas= 0;//$("#kotaktombolatas").height();
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

    var heigfix = window_height - (top_nav_height + bottom_nav_height + mobilespasi+kotaktombolatas);
    console.log(`heihhhh : ${bottom_nav_height}`);

    //document.getElementById('main-pages').setAttribute('style', `max-height:${heigfix}px!important;overflow-y: scroll!important;overflow-x: hidden!important;`);

}
//------------------------------------
function hidemodal(modalid) {
    
    var myModalEl = document.getElementById(modalid);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}
///--------------------------------