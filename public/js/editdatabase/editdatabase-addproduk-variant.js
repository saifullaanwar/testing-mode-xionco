////kainorno
var kainorno='';//UP kain, '' bukan kain
function kainornoss() {
    var variantxs=document.querySelector('[id="listkains"]');
    var selekup=document.getElementById('kainklik');
    //var higcolorshowsz=document.querySelectorAll('[name="higcolorshow"]');

    if (selekup.checked) {
        //kain atau up 
        console.log('up')
        kainorno='UP';
         variantxs.innerHTML=listkainss;
        /* variantxs.forEach(elementvar => {
            elementvar.innerHTML=listkainss;
        }); */
        /* higcolorshowsz.forEach(element => {
            element.classList.remove('d-none');
        }); */
    }else{
        //bukan kain
        console.log('no up')
        kainorno='';
        /* variantxs.forEach(elementvar => {
            elementvar.innerHTML='';
        }); */
        /* higcolorshowsz.forEach(element => {
            element.classList.add('d-none');
        }); */
        variantxs.innerHTML='';
    }
    oninputdata();
}

///end kainorno

//cekkainhig

//end cekkainhig
function cekkainhig(e) {
    var index=e.id.split('-')[1];
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json).colorvariantdata;
    if (e.value=='') {
        document.querySelectorAll('[name="higcolor"]')[index-1].value='';
    }else{
        if (kainorno=='UP') {
            dataarray.forEach(element => {
                if (element.kodekain==e.value) {
                    document.querySelectorAll('[name="higcolor"]')[index-1].value=element.colorvariant;
                }
            });
            
        }else{
            document.querySelectorAll('[name="higcolor"]')[index-1].value='';
        }
    }
    
}
//

//cekasmainvariant
function cekasmainvariant(e) {
    var index=e.id.split('-')[1];
    //pricevariant
    var cekpricevarian=document.querySelectorAll('[name="pricevariant"]')[index-1];
    
    if (cekpricevarian.value!='') {
        cekpricevarian.classList.remove('is-invalid');
        var centanglist=document.querySelectorAll('[name="checkasmain"]');
        centanglist.forEach((element,indexel) => {
            if (indexel==index-1) {
                //element aktif 
                
                if (element.checked) {
                    //cek it
                    console.log('cek it');
                    document.querySelector('[name="mainprice"]').value=document.querySelectorAll('[name="pricevariant"]')[index-1].value;
                }else{
                    //uncek
                    console.log('uncek');
                    document.querySelector('[name="mainprice"]').value='';
                }
            }else{
                element.checked=false;
            }
        });
    }else{
        e.checked=false;
        cekpricevarian.classList.add('is-invalid');
        warningpopup('error','isi dulu price variannya');
    }
    
}
//end cekasmainvariant

//createbadgevar
var hapusvarsub=false;
var arrayvariantname=[];
function createbadgevar(e,event) {
    const input = document.getElementById("tag-text-variant");
    const container = document.getElementById("tag-input-variant");
    if (event.key === "Enter" && e.value.trim() !== "") {
        event.preventDefault(); // prevent form submit if inside form

        const tagValue = e.value.trim();

        arrayvariantname.push(e.value);

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

                //hapus tr tabel sesuai variant
                if (alldataadditem!=undefined&&alldataadditem.listvariant.length>0) {
                    hapusvarsub=true;
                    //hapus di array alldataadditem.listvariant
                    alldataadditem.listvariant.splice(indexh, 1);
                    addtables();
                }
                //var trtabs=document.querySelectorAll(`[name="trvariants"]`);
                /* trtabs.forEach(elementTr => {
                    if (elementTr.id.includes(`${tagValue}`)) {
                        elementTr.remove()
                    }
                }); */
            }
            container.removeChild(badge);
        });

        badge.appendChild(textSpan);
        badge.appendChild(closeBtn);

        // Tambah sebelum input
        container.insertBefore(badge, input);

        // Kosongkan input
        e.value = "";

        oninputdata();
    }
}

//end createbadgevar

var variantfix=[];
function addfixvariant() {
    console.log('arrayvariantname',arrayvariantname);
    console.log('arraySubvariantname',arraySubvariantname);
    
    if (arrayvariantname.length==0) {
        warningpopup('error','isi dulu variant-nya');
    }else{
        if (editpage==false) {
            Swal.fire({
                icon:'warning',
                title: "",
                text:'Apakah data variant sudah sudah sesuai? Anda tidak bisa hapus tabel variant ketika telah dibuat',
                //showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Add",
                //enyButtonText: `Batal`
            }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    addtables();
                }
            });
        }else{
            addtables();
        }
        
    }
    
}

async function addtables() {
    const combined = [];
    console.log('runnn addfixvariant')
    for (const variant of arrayvariantname) {
        if (arraySubvariantname.length === 0) {
            combined.push({ variant, subvariant: "" }); // subvariant tetap ada, tapi kosong
        } else {
            for (const subvariant of arraySubvariantname) {
            combined.push({ variant, subvariant });
            }
        }
    }

    variantfix=combined;

    console.log('variantfix',variantfix);

    //

    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

    divhapus.innerHTML=await returnarraytabvar(variantfix);
    datatab.appendChild(divhapus);
    console.log('variantfix ==last==',variantfix);

    var newimgleght=imglenght+arrayvariantname.length;
    console.log('newimgleght ==last==',newimgleght);
    await initializeImageUploads(newimgleght);

    if (hapusvarsub==true) {
        hapusvarsub=false;
        if (alldataadditem!=undefined) {
            console.log('atur ulang data tabel==',alldataadditem);
            var dataproduk=JSON.parse(document.getElementById('itemalls').dataset.json).itemsdata;
            if (arraySubvariantname.length>0){
                //ada sub variant
                 

                const newsubvariant =  alldataadditem.listvariant.flatMap(item => 
                    item.subvariant.map(sub => ({
                        variant: item.variant,
                        ...sub
                    }))
                );

                console.log('newsubvariant===',newsubvariant);
                newsubvariant.forEach(async(element,index) => {
                    var higprodukIDs=await dataproduk.find(item => item.no === element.higprodukID);
                    document.querySelectorAll('[name="pricevariantcoret"]')[index].value=element.price_coret;
                    document.querySelectorAll('[name="pricevariant"]')[index].value=element.price;
                    document.querySelectorAll('[name="kodesml"]')[index].value=element.kodesml;
                    document.querySelectorAll('[name="colorvar"]')[index].innerHTML=element.colorhig;
                    document.querySelectorAll('[name="varianthig"]')[index].value=higprodukIDs.product;
                    document.querySelectorAll('[name="hexcode"]')[index].value=element.hexcode;
                    
                });
            }else{
                //tanpa sub variant
                alldataadditem.listvariant.forEach(async(element,index) => {
                    console.log('loop==',element)
                    var higprodukIDs=await dataproduk.find(item => item.no === element.higprodukID);
                    document.querySelectorAll('[name="pricevariantcoret"]')[index].value=element.price_coret;
                    document.querySelectorAll('[name="pricevariant"]')[index].value=element.price;
                    document.querySelectorAll('[name="kodesml"]')[index].value=element.kodesml;
                    document.querySelectorAll('[name="colorvar"]')[index].innerHTML=element.colorhig;
                    document.querySelectorAll('[name="varianthig"]')[index].value=higprodukIDs.product;
                    document.querySelectorAll('[name="hexcode"]')[index].value=element.hexcode;
                    
                });
                
            }
        }
    }
}
/* 
function returnarraytabvar(array) {
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    var colorvariants=dataarray.colorvariantdata;
     const currentImglenght = imglenght;

    return array.map((element,index)=>{
        var colorfix='';
        if (kainorno=='UP') {
            for (let i = 0; i < colorvariants.length; i++) {
                const element1 = colorvariants[i];
                if (element1.kodekain==element.variant) {
                    colorfix=element1.colorvariant;
                }
            }
        }
        
            variantfix[index].colorhig=colorfix;
            variantfix[index].price_coret=0;
            variantfix[index].price=0;
            variantfix[index].kodesml='';
            variantfix[index].hexcode='';
            variantfix[index].imageurl='';
            variantfix[index].higprodukID='';
            const newImgId = currentImglenght + index + 1;
       
        return `
            <tr>
                <td style="text-align: center;vertical-align: middle;">
                    <input class="form-check-input" type="checkbox" value="" id="checkasmain-${index}" name="checkasmain" onclick="cekmainvariant(this)">
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    ${element.variant}
                </td>
                <td style="text-align: left;vertical-align: middle;">
                    ${element.subvariant}
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    <input type="text" class="form-control form-select-sm" id="pricevariantcoret-${index}" name="pricevariantcoret" style="width: 80px!important;text-align: right;" oninput="oninputdata()">
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    <input type="text" class="form-control form-select-sm" id="pricevariant-${index}" name="pricevariant" style="width: 80px!important;text-align: right;" oninput="oninputdata()">
                </td>

                <td style="text-align: center;vertical-align: middle;">
                    <select class="form-select form-select-sm" aria-label="Small select example" style="width: 120px!important;" id="kodesml-${index}" name="kodesml" onchange="oninputdata()">
                        <option selected disabled value="">Pilih SML</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                    </select>
                </td>

                <td style="text-align: left;vertical-align: middle;max-width: 80px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" id="colorvar-${index}" name="colorvar" title="${colorfix}">
                    ${colorfix}
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    <input type="text" class="form-control form-control-sm" id="varianthig-${index}" name="varianthig" style="width: 110px!important;text-align: left;" list="datalist_varianthig" oninput="oninputdata()">
                    <datalist id="datalist_varianthig">
                        ${listitem}
                    </datalist>
                </td>
                
                <td style="text-align: center;vertical-align: middle;">
                    <input type="text" class="form-control form-control-sm" id="hexcode-${index}" name="hexcode" style="width: 90px!important;text-align: left;" oninput="oninputdata()">
                </td>

                <td style="text-align: center;vertical-align: middle;">
                    <div class=" me-3" style="text-align: center;">
                        <div class="border rounded-2 d-flex align-items-center justify-content-center" style="width: 90px;height: 90px;">
                            <img src="" alt="" style="width: 90px;height: 90px;cursor: pointer;" class="border rounded-2 d-none" id="imguploadshow${newImgId}" name="imguploadshow" onclick="klikuploadimg(this)">

                            <input type="file" class="form-control d-none" aria-label="upload img" aria-describedby="upload img" id="uploadimg${newImgId}" name="uploadimg"  accept="image/*" onclick="this.value=null;">

                            <i class="bi bi-card-image" id="iconupload${newImgId}" name="iconupload" style="cursor: pointer;" onclick="klikuploadimg(this)"></i>
                        </div>
                        <!-- <span class="rownamanobold" style="font-size: x-small;text-align: left;">Foto Utama</span> -->
                    </div>
                </td>
            </tr>
        
        `
    });
} */
function returnarraytabvar(array) {
    var dataarray = JSON.parse(document.getElementById('itemalls').dataset.json);
    var colorvariants = dataarray.colorvariantdata;
    const currentImglenght = imglenght; // imglenght = 5

    const variantsWithImage = new Set();
    let imgCounter = 0; // Untuk menghitung indeks gambar yang ditampilkan secara berurutan

    return array.map((element, index) => {
        var colorfix = '';
        if (kainorno == 'UP') {
            for (let i = 0; i < colorvariants.length; i++) {
                const element1 = colorvariants[i];
                if (element1.kodekain == element.variant) {
                    colorfix = element1.colorvariant;
                }
            }
        }

        let newImgId = ''; // Inisialisasi kosong
        const hasImagePreviously = variantsWithImage.has(element.variant);

        // Jika ini adalah varian pertama kali muncul, kita akan menampilkan gambar
        if (!hasImagePreviously) {
            variantsWithImage.add(element.variant);
            imgCounter++; // Tingkatkan counter hanya jika gambar akan ditampilkan
            newImgId = currentImglenght + imgCounter; // Hitung newImgId baru
        }
        
        return `
            <tr id="${element.variant}${element.subvariant==''?'':`_${element.subvariant}`}" name="trvariants">
                <td style="text-align: center;vertical-align: middle;">
                    <input class="form-check-input" type="checkbox" value="" id="checkasmain-${index}" name="checkasmain" onclick="cekmainvariant(this)">
                </td>

                <td style="text-align: left;vertical-align: middle;" name="namavariant">
                    ${element.variant}
                </td>
                <td style="text-align: left;vertical-align: middle;" name="namasubvariant">
                    ${element.subvariant}
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    <input type="text" class="form-control form-select-sm" id="pricevariantcoret-${index}" name="pricevariantcoret" style="width: 80px!important;text-align: right;" oninput="oninputdata()">
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    <input type="text" class="form-control form-select-sm" id="pricevariant-${index}" name="pricevariant" style="width: 80px!important;text-align: right;" oninput="oninputdata()">
                </td>

                <td style="text-align: center;vertical-align: middle;">
                    <select class="form-select form-select-sm" aria-label="Small select example" style="width: 120px!important;" id="kodesml-${index}" name="kodesml" onchange="oninputdata()">
                        <option selected disabled value="">Pilih SML</option>
                        <option>none</option>
                        <option>small</option>
                        <option>medium</option>
                        <option>large</option>
                    </select>
                </td>

                <td style="text-align: left;vertical-align: middle;max-width: 120px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" id="colorvar-${index}" name="colorvar" title="${colorfix}">
                    ${colorfix}
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    <input type="text" class="form-control form-control-sm" id="varianthig-${index}" name="varianthig" style="width: 110px!important;text-align: left;" list="datalist_varianthig" oninput="oninputdata()">
                    <datalist id="datalist_varianthig">
                        ${listitem}
                    </datalist>
                </td>
                
                <td style="text-align: center;vertical-align: middle;">
                    <input type="text" class="form-control form-control-sm" id="hexcode-${index}" name="hexcode" style="width: 90px!important;text-align: left;" oninput="oninputdata()">
                </td>

                <td style="text-align: center;vertical-align: middle;">
                    
                    <div class=" me-3" style="text-align: center;">
                        <div class="border rounded-2 d-flex align-items-center justify-content-center" style="width: 90px;height: 90px;">
                            <img src="" alt="" style="width: 90px;height: 90px;cursor: pointer;" class="border rounded-2 d-none" ${!hasImagePreviously ?`id="imguploadshow${newImgId}" name="imguploadshow" onclick="klikuploadimg(this)"`:`name="${element.variant}-showimg"`} >
                            ${!hasImagePreviously ? `
                            <input type="file" class="form-control d-none" aria-label="upload img" aria-describedby="upload img" id="uploadimg${newImgId}" name="uploadimg" accept="image/*" onclick="this.value=null;">

                            <i class="bi bi-card-image" id="iconupload${newImgId}" name="iconupload" style="cursor: pointer;" onclick="klikuploadimg(this)"></i>
                            ` : ``}
                        </div>
                    </div>
                    
                </td>
            </tr>
        `;
    });
}

//subvariant

//createbadgesubvar
var arraySubvariantname=[];
function createbadgesubvar(e,event) {
    const input = document.getElementById("tag-text");
    const container = document.getElementById("tag-input");
    if (event.key === "Enter" && e.value.trim() !== "") {
        event.preventDefault(); // prevent form submit if inside form

        const tagValue = e.value.trim();

        arraySubvariantname.push(e.value);
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

        // Kosongkan input
        e.value = "";
    }
}

//end createbadgesubvar


//end subvariant

//cekmainvariant
var mainvariants='';
function cekmainvariant(e) {
    var elementceklists=document.querySelectorAll('[name="checkasmain"]');
    elementceklists.forEach((element,index) => {
        if (element.id==e.id) {
            if (element.checked) {
                //checked
                var pricevariantcoret=document.querySelectorAll('[name="pricevariantcoret"]')[index].value.trim();
                var pricevariant=document.querySelectorAll('[name="pricevariant"]')[index].value.trim();

                document.querySelector('[name="pricecoret"]').value=pricevariantcoret;
                document.querySelector('[name="mainprice"]').value=pricevariant;
                var thesubvarname=document.querySelector('[name="namasubvariant"]').innerHTML.trim();
                mainvariants=`${document.querySelector('[name="namavariant"]').innerHTML.trim()}${arraySubvariantname.length>0?`_${thesubvarname}`:''}`;
            }else{
                //uncek
                document.querySelector('[name="pricecoret"]').value='';
                document.querySelector('[name="mainprice"]').value='';
            }
        }else{
            element.checked=false;
        }
        
    });
    oninputdata();
}

//end cekmainvariant


//oninput variant
function formatVariantData(datavariant) {
    const result = [];

    const grouped = {};

    for (const item of datavariant) {
        const { variant, subvariant, ...rest } = item;

        if (!grouped[variant]) {
            grouped[variant] = {
                variant,
                subvariant: [],
                __hasSubvariant: false,
            };
        }

        if (subvariant && subvariant.trim() !== "") {
            grouped[variant].__hasSubvariant = true;
            grouped[variant].subvariant.push({
                subvariant,
                ...rest
            });
        } else {
            Object.assign(grouped[variant], {
                ...rest,
                subvariant: []
            });
        }
    }

    for (const key in grouped) {
        const entry = grouped[key];
        if (!entry.__hasSubvariant) {
            delete entry.__hasSubvariant;
        } else {
            delete entry.__hasSubvariant;
        }
        result.push(entry);
    }

    return result;
}
