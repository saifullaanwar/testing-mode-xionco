var username=document.getElementById('username');
var password=document.getElementById('password');
var $progress = $('.progress');
var $progressBar = $('.progress-bar');

//console.log=function(){};

document.addEventListener('DOMContentLoaded',async function () {
   
   cekdatausersorout();

   const usercek = await dbs.isLoggedIn();
  //localStorage.getItem('username') && localStorage.getItem('username') != ''
  console.log('usercek',usercek);
  if (usercek) {
      
  }     
   else{
    window.location.href ='/';
   }

});
