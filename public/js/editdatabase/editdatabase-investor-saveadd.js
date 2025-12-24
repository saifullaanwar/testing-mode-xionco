
//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

//save to database
function submitsave() {
    var array=document.querySelectorAll('#itemsContainer > .partitems');
    var flag=0;//0 = isian tidak lengkap
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.querySelector('[name="investor"]').value=='') {
            warningpopup('error','isi dengan lengkap');
        }else{
            if (i==array.length-1) {
                flag=1;
            }
            
        }
    }
    if (flag==1) {
        hidemodal('modaladdnewitem');
        loadingpopup();
        var xhrzx = new XMLHttpRequest();

        xhrzx.open("POST", `/editdatabase/saveaddinvestor`);
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify({namalengkap,username,alldataadditem}));
        xhrzx.addEventListener("load", () => {
            var resdat = JSON.parse(xhrzx.responseText);
            console.log('resdat');
            console.log(resdat);
            
            var valueload=90;
            setTimeout(function () { 
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
                setTimeout(function () { 
                    Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload;

                    if (JSON.stringify(resdat.notif).toLowerCase().includes('duplikat')||JSON.stringify(resdat.notif).toLowerCase().includes('gagal')) {
                        creattabstatus(resdat.notif);

                        $("#modalpopupsuksessaveit").modal('show');
                    }else{
                        creattabstatus(resdat.notif);

                        $("#modalpopupsuksessaveit").modal('show');
                    }
                },800);
            },2000);

        });
    }
}

function creattabstatus(data) {
    var myobj = document.getElementById("finalstatussaved");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattabstatus-save`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'finalstatussaved');

    divhapus.innerHTML=returnarraystatussave(data);
    datatab.appendChild(divhapus);

    Swal.close();
}

function returnarraystatussave(array) {
    return array.map(function(element) {
        return `
        <tr>
            <td class="text-truncate"  style="max-width: 100px;" title="${element.investor}">
                ${element.investor}
            </td>
            <td>
                <span><i class="bi bi-${element.statussave.toLowerCase().includes('duplikat')||element.statussave.toLowerCase().includes('gagal')?'x':'check'}-circle-fill" style="color: ${element.statussave.toLowerCase().includes('duplikat')||element.statussave.toLowerCase().includes('gagal')?'red':'green'};"></i> ${element.statussave.toLowerCase().includes('duplikat')||element.statussave.toLowerCase().includes('gagal')?element.statussave:'saved'}</span>
            </td>
        </tr>
        `;
    }).join('');
}
//tutup save to database


//delete item
function klikdeleteitem(index) {
    var dataarray=JSON.parse(document.getElementById(`dataitem-${index}`).dataset.json);
    console.log('delete item ===');
    console.log(dataarray);

    Swal.fire({
        icon:'warning',
        title: '',
        text:`Apakah anda ingin delete item ${dataarray.investor}?`,
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `Delete`
    }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
        
    } else if (result.isDenied) {
        //delete item
        deletefinish(dataarray.investor);
    }
    });
}//

function deletefinish(item) {
    loadingpopup();
    var xhrzx = new XMLHttpRequest();

    xhrzx.open("POST", `/editdatabase/deleteitem`);
    xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhrzx.setRequestHeader('authorization', xi);
    xhrzx.send(JSON.stringify({namalengkap,username,tipe:'investor',item}));
    xhrzx.addEventListener("load", () => {
        var resdat = JSON.parse(xhrzx.responseText);
        console.log('resdat');
        console.log(resdat);
        
        var valueload=90;
        setTimeout(function () { 
            Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload-10;
            setTimeout(function () { 
                Swal.getHtmlContainer().querySelector('#loadingpersenpopoups').value=valueload;

                if (resdat.icons=='success') {
                    warningpopup('success','Delete berhasil');
                    location.reload();
                }else{
                    warningpopup('error','Delete gagal');
                }
            },800);
        },2000);
    });
}
//tutup delete item