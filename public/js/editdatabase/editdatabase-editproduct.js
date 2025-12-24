function klikedititem(index) {
    addoredit='edit';
    alldataadditem.length=0;
    oldedititem.length=0;
    var dataarray=JSON.parse(document.getElementById(`dataitem-${index}`).dataset.json);

    console.log('data per product');
    console.log(dataarray);

    document.getElementById(`modaladdnewitemlabel`).innerHTML="Edit Product "+dataarray.product;
    document.getElementById(`addnewitemtombolfooters`).classList.add('d-none');
    document.getElementById(`edititemtombolfooters`).classList.remove('d-none');

    //insert data product
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard,index) => {
        itemCard.querySelector('[name="productname"]').value=dataarray.product;
        itemCard.querySelector('[name="code2"]').value=dataarray.code2;
        itemCard.querySelector('[name="code2"]').disabled=true;
        itemCard.querySelector('[name="stockprodukcode"]').checked=dataarray.stockprodukcode=='true'?true:false;
        itemCard.querySelector('[name="price1"]').value=dataarray.price1;

        itemCard.querySelector('[name="fabricsize"]').value=dataarray.fabric_size;
        itemCard.querySelector('[name="nofabricsize"]').value=dataarray.nofabric_size;
        
        itemCard.querySelector('[name="pricefabric"]').value=dataarray.price_fabric;
        itemCard.querySelector('[name="priceleather"]').value=dataarray.price_leather;
        
        itemCard.querySelector('[name="sku"]').value=dataarray.sku;
        itemCard.querySelector('[name="imaglink"]').value=dataarray.image;
        

        itemCard.querySelector('[name="investor"]').value=dataarray.investor;
        itemCard.querySelector('[name="investormj"]').value=dataarray.investor_mj;

        //itemCard.querySelector('[name="produkwebname"]').value=dataarray.main_product;

    });

    var data={
        product:dataarray.product,
        price1:dataarray.price1,
        sku:dataarray.sku,
        code1:dataarray.code1,
        code2:dataarray.code2,
        price2:dataarray.price2,
        stockprodukcode:dataarray.stockprodukcode,
        stockproduk_ref:dataarray.stockproduk_ref,
        stockproduk_refbuy:dataarray.stockproduk_refbuy,
        nofabric_size:dataarray.nofabric_size,
        fabric_size:dataarray.fabric_size,
        image:dataarray.image,
        price_fabric:dataarray.price_fabric,
        price_leather:dataarray.price_leather,
        investor:dataarray.investor,
        investor_mj:dataarray.investor_mj,
        main_product:dataarray.main_product
    };

    oldedititem.push(data);
    alldataadditem.push(data);    
    
    console.log('edit product awal ==========');
    console.log(alldataadditem);

    $('#modaladdnewitem').modal('show');
}

var oldedititem=[];

function submitsaveedit() {
    var array=document.querySelectorAll('#itemsContainer > .partitems');
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.querySelector('[name="productname"]').value==''||element.querySelector('[name="code2"]').value=='Code'||element.querySelector('[name="price1"]').value=='') {
            warningpopup('error','isi dengan lengkap');
        }else{

            hidemodal('modaladdnewitem');
            loadingpopup();

            var fixdata={namalengkap,username,oldedititem,alldataadditem};

            var xhrzx = new XMLHttpRequest();

            xhrzx.open("POST", `/editdatabase/saveedititem`);
            xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhrzx.setRequestHeader('authorization', xi);
            xhrzx.send(JSON.stringify(fixdata));
            xhrzx.addEventListener("load", () => {
                var resdat = JSON.parse(xhrzx.responseText);
                console.log('resdat');
                console.log(resdat);

                
                var valueload=90;
                setTimeout(function () { 
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
                    setTimeout(function () { 
                        Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload;

                        if (JSON.stringify(resdat.notif).toLowerCase().includes('gagal')||JSON.stringify(resdat.notif).toLowerCase().includes('error')) {
                            creattabstatus(resdat.notif);

                            $("#modalpopupsuksessaveit").modal('show');
                        }else{
                            socket.emit('addnew-editvariantproduk',{namalengkap,username,alldataadditem});
                            creattabstatus(resdat.notif);
                            
                            $("#modalpopupsuksessaveit").modal('show');
                        }
                    },800);
                },2000);

            });
        }
    }
}