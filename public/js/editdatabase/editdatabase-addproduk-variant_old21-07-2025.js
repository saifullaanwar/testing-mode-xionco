////kainorno
var kainorno='';//UP kain, '' bukan kain
function kainornos(e) {
    var variantxs=document.querySelectorAll('[name="listkains"]');
    var higcolorshowsz=document.querySelectorAll('[name="higcolorshow"]');

    if (e.checked) {
        //kain atau up 
        kainorno='UP';
        variantxs.forEach(elementvar => {
            elementvar.innerHTML=listkainss;
        });
        higcolorshowsz.forEach(element => {
            element.classList.remove('d-none');
        });
    }else{
        //bukan kain
        kainorno='';
        variantxs.forEach(elementvar => {
            elementvar.innerHTML='';
        });
        higcolorshowsz.forEach(element => {
            element.classList.add('d-none');
        });
        
    }
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


///////////////////////////////////ada more variant
///add more item
let itemIndexVariant = 1;

function additems() {
    /* var jumlahitems=parseInt(document.getElementById('jumlahitembeli').innerHTML);
    jumlahitems=1+itemIndex;
    document.getElementById('jumlahitembeli').innerHTML=jumlahitems; */

    itemIndexVariant++;
    renderItems();
    document.getElementById("judulitem-1").classList.remove('d-none');
    console.log('itemIndexVariant');
    console.log(itemIndexVariant);
}

function renderItems() {
    // Buat elemen baru tanpa menghapus yang lama
    const itemsContainer = document.getElementById('variantitemContainer');
    const newItem = document.createElement('div');
    newItem.className = "variantitem";
    newItem.name="variantitem";
    newItem.id = `variantitem-${itemIndexVariant}`;
    newItem.innerHTML =`
        
        <span class="rownamanobold mb-3" id="judulvariant-${itemIndexVariant}">Variant ${itemIndexVariant}</span>
            <div class="row mt-2">
                <div class="col-7">
                    
                    <!-- nama variant | kalau kain maka muncul list kodewarna-->
                    <div class="d-flex align-items justify-content-between">
                        <div class="input-group input-group-sm mb-3 me-2">
                            <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Variant Name</span>
                            <input type="text" class="form-control" id="variantname-${itemIndexVariant}" name="variantname" placeholder="Nama variant" style="font-size: 12px;"  oninput="oninputdata()" onchange="cekkainhig(this)" list="listkains-${itemIndexVariant}">
                            <datalist id="listkains-${itemIndexVariant}" name="listkains">
                                
                            </datalist>
                        </div>

                        <div class="form-check" title="centang untuk menjadi Main produk">
                            <input class="form-check-input" type="checkbox" value="" id="checkasmain-${itemIndexVariant}" name="checkasmain" onclick="cekasmainvariant(this)">
                            <label class="form-check-label rownamanobold" style="font-size: xx-small;" for="checkasmain-${itemIndexVariant}">
                                As Main Product
                            </label>
                        </div>
                    </div>
                    
                    <!-- end nama variant -->

                    <!-- higcolor -->
                    <div class="input-group input-group-sm mb-3 d-none" id="higcolorshow-${itemIndexVariant}" name="higcolorshow">
                        <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Color HIGSYSTEM</span>
                        <input type="text" class="form-control" id="higcolor-${itemIndexVariant}" name="higcolor" placeholder="Color HIGSYSTEM" style="font-size: 12px;"  oninput="oninputdata()" disabled>
                    </div>
                    <!-- end higcolor -->

                    <!-- price variant -->
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Price</span>
                        <input type="number" class="form-control" id="pricevariant-${itemIndexVariant}" name="pricevariant" placeholder="0" style="font-size: 12px;"  oninput="oninputdata()" min="0">
                    </div>
                    <!-- end price variant -->

                    <!-- item terikat di HIGsystem -->
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Item HIGSYSTEM</span>
                        <input type="text" class="form-control" id="higsistemitem-variant-${itemIndexVariant}" name="higsistemitem-variant" placeholder="Produk terkait di HIGSYSTEM" style="font-size: 12px;"  oninput="oninputdata()" list="datalist-higvariant-${itemIndexVariant}">
                        <datalist id="datalist-higvariant-${itemIndexVariant}">
                    
                        </datalist>
                    </div>
                    <!-- end item terikat di HIGsystem -->
                </div>

                <div class="col-5">
                    <span class="rownamanobold" style="font-size: small;margin-bottom: 8px;"><span class="text-danger">*&nbsp;</span> Upload foto variant</span>
                    <div class="mt-2">
                        <div class=" me-3" style="text-align: center;">
                            <div class="border rounded-2 d-flex align-items-center justify-content-center" style="width: 90px;height: 90px;">
                                <img src="" alt="" style="width: 90px;height: 90px;cursor: pointer;" class="border rounded-2 d-none" id="imguploadshow${itemIndexVariant+5}" name="imguploadshow" onclick="klikuploadimg(this)">

                                <input type="file" class="form-control d-none" aria-label="upload img" aria-describedby="upload img" id="uploadimg${itemIndexVariant+5}" name="uploadimg" accept="image/*" onclick="this.value=null;">

                                <i class="bi bi-card-image" id="iconupload${itemIndexVariant+5}" name="iconupload" style="cursor: pointer;" onclick="klikuploadimg(this)"></i>
                            </div>
                            
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="removeItem btn btn-danger btn-sm" id="removeItem-${itemIndexVariant}" onclick="removeItem(${itemIndexVariant})"><i class="bi bi-trash3-fill" style="color: white;"></i>&nbsp;Hapus item</button>
                    </div>
                </div>
            </div>
        <hr>
        
    `;
    itemsContainer.appendChild(newItem);
}

// Fungsi untuk menghapus item 
function removeItem(itemId) {
    document.getElementById(`variantitem-${itemId}`).remove();

    // Ambil ulang semua item yang tersisa
    const items = document.querySelectorAll('#variantitemContainer > .variantitem');

    // Reset itemIndexVariant agar sesuai urutan terbaru
    itemIndexVariant = items.length;

    console.log('items',items);

    items.forEach((item, index) => {
        const newId = index + 1; // Sesuaikan index baru
    
        // Update elemen ID
        item.id = `variantitem-${newId}`;
        // Perbarui ID dan "for" label semua input dalam item
        const inputs = item.querySelectorAll('input, select, span, p, button');
        inputs.forEach(input => {
            const oldId = input.id;
            if (oldId) {
                const newInputId = oldId.replace(/\d+$/, newId); // Ganti angka di ID dengan newId
                input.id = newInputId;
            }
        });

        // Perbarui tombol hapus dengan parameter ID baru
        const removeButton = item.querySelector('.removeItem');
        removeButton.setAttribute('onclick', `removeItem(${newId})`);

        //perbarui judul item judulitem
        const judulitem = item.querySelector(`#judulvariant-${newId}`);
        judulitem.innerHTML=`Variant ${newId}`;

    });
}
////
///////////////////////////////////end ada more variant
