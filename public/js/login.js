var username=document.getElementById('username');
var password=document.getElementById('password');
var $progress = $('.progress');
var $progressBar = $('.progress-bar');

var ismobile='n';
//console.log = function () {};
document.addEventListener('DOMContentLoaded',async function () {
  //cekdatausersorout();
  const params = new URLSearchParams(window.location.search);
  const mobileParam = params.get('ismobile');
  
  if (mobileParam) {
    ismobile = mobileParam; // isi sesuai parameter di URL
    localStorage.setItem('ismobile',ismobile);
  }
  
    if(navigator.userAgent.match(/Android/i) ||navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) ||navigator.userAgent.match(/Windows Phone/i)){
        ismobile='y';
    }
    
    const usercek = await dbs.isLoggedIn();
    console.log('usercek',usercek);
    if (usercek) {
      username=usercek;//localStorage.getItem('username');
      window.location.href ='/';
    } 
});
// var username = document.getElementById('username');
// var password = document.getElementById('password');

//var xi='Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==';

// Execute a function when the user presses a key on the keyboard
username.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("logintombol").click();
  }
});

password.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("logintombol").click();
  }
});

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
        xhrzx.addEventListener("load", async() => {
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
            /* localStorage.setItem('dataroleuser',JSON.stringify(resdat.dataroleuser));
            localStorage.setItem('datauser',JSON.stringify(resdat.datauser));
            localStorage.setItem('username',resdat.datauser.username);
            localStorage.setItem('linkhome',resdat.link);
            localStorage.setItem('versionapp',versionapp); */
            console.log(versionapp);
            ///save to store
            // simpan nama database ke localStorage biar konsisten
            localStorage.setItem('sdb', resdat.datauser.username + '_DB');

            // ganti instance IndexedDBHelper ke database baru
            dbs = new IndexedDBHelper(resdat.datauser.username + '_DB', 'higsystemStore');

            await dbs.save("dataroleuser", JSON.stringify(resdat.dataroleuser));
            await dbs.save("datauser", JSON.stringify(resdat.datauser));
            await dbs.save("username", resdat.datauser.username);
            await dbs.save("linkhome", resdat.link);
            await dbs.save("versionapp", versionapp);

            if (ismobile=='y') {
              //web kirim {no:100,username:"akunku"}
              // Kirim ke Flutter melalui handler
              if (window.flutter_inappwebview) {
                const data = {no:resdat.datauser.no, username: resdat.datauser.username };
                const response = await window.flutter_inappwebview.callHandler('fromWebLogin', data);
                resdat.datauser.fcm_token=response.token;
                console.log('resdat.datauser ===============++++++++++++',resdat.datauser);
                
                await dbs.save("datauser", JSON.stringify(resdat.datauser));
                await dbs.save("fcm_token", resdat.datauser.fcm_token);

                console.log("Data sent to Flutter:", data);
              } else {
                console.log("Flutter handler not found.");
              }
            }else{
              //desktop
              await dbs.save("fcm_token", resdat.datauser.fcm_token);
            }
            

            const date1 = new Date();
            date1.setFullYear(date1.getFullYear() + 100); 
            var fixcookiessave=resdat.datauser;
            delete fixcookiessave.clicked_new;
            document.cookie = `hamburger=${JSON.stringify(fixcookiessave)};path=/;expires=${date1.toUTCString()};`;

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
});