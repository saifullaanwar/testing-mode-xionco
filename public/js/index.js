var username=document.getElementById('username');
var password=document.getElementById('password');
var $progress = $('.progress');
var $progressBar = $('.progress-bar');

var ismobile='n';
//console.log = function () {};
document.addEventListener('DOMContentLoaded', function () {
    
    

    if(navigator.userAgent.match(/Android/i) ||navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) ||navigator.userAgent.match(/Windows Phone/i)){
        ismobile='y';
    }
    setTimeout(async function () {
        $progressBar.css('width', '30%');
        setTimeout(async function () {
            $progressBar.css('width', '70%');
            setTimeout(async function () {
                $progressBar.css('width', '98%');
                const usercek = await dbs.isLoggedIn();
                //localStorage.getItem('username')&&localStorage.getItem('username')!=''
                if (usercek) {
                    window.location.href =await dbs.get('linkhome');//localStorage.getItem('linkhome');

                    cekdatausersorout();
                }     
                else{                
                    document.getElementById('loadingceksudahlogshow').setAttribute('style','display: none!important;');
                    document.getElementById('formshow').removeAttribute('style');
                    if (localStorage.getItem('remmembermu')&&localStorage.getItem('remmembermu')!='') {
                        username.value=localStorage.getItem('remmembermu');
                    }
                    if (ismobile=='y') {
                        //document.getElementById('loginpages').removeAttribute('style');
                        window.open('/login','_self');
                    }

                }
            }, 2000);
        }, 2000); // WAIT 1 seconds
    }, 1000); 
    
});
document.getElementById('logintextklik').addEventListener('click',function(){
    window.open('/login','_self');
    /* if (ismobile=='y') {
        document.getElementById('loginpages').style.display='block';

        document.getElementById('formshow').setAttribute('style','display: none!important;');
        document.title = "Login";
     
    }else{
        window.open('/login','_self');
    } */
    
});/* 
var username = document.getElementById('username');
var password = document.getElementById('password');

var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

document.getElementById('logintombol').addEventListener('click', function () {
    if (username.value==''||password.value=='') {
        Swal.fire({
            icon: "error",
            title: "Oops isi dengan lengkap",
            showConfirmButton: false,
            timer: 1600
        });
    } else {
        Swal.fire({
            title: "Loading ...",
            allowOutsideClick: false
        });
        Swal.showLoading();

        var data = {
            username: username.value,
            password: password.value
        }
        console.log(data);

        var xhrzx = new XMLHttpRequest();

        xhrzx.open("POST", `/loginapi/sendlogins`);
        xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrzx.setRequestHeader('authorization', xi);
        xhrzx.send(JSON.stringify(data));
        xhrzx.addEventListener("load", () => {
          var resdat = JSON.parse(xhrzx.responseText);
          if (resdat.icons == 'error') {
            Swal.fire({
                icon: resdat.icons,
                title: resdat.titles,
                text: resdat.texts,
                showConfirmButton: false,
                timer: 2500
            });
          }else{
            console.log(resdat);
            localStorage.setItem('dataroleuser',JSON.stringify(resdat.dataroleuser));
            localStorage.setItem('datauser',JSON.stringify(resdat.datauser));
            localStorage.setItem('username',resdat.datauser.username);
            localStorage.setItem('linkhome',resdat.link);
            if (document.getElementById('remmemberme').checked) {
                localStorage.setItem('remmembermu',username.value);
            }
            Swal.fire({
                icon: resdat.icons,
                title: resdat.titles,
                text: resdat.texts,
                showConfirmButton: false,
                allowOutsideClick:false
            });
            window.open(resdat.link,'_self');
          }
        });
    }
}); */