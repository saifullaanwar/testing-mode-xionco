
document.addEventListener('DOMContentLoaded', function () {
    $('#imgshow').hide();
    $('#videoshow').hide();
    // Ambil query parameter dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const fileParam = urlParams.get('file');

    var array;
    if (fileParam) {
        array = window.atob(fileParam).split('$$$-$$$');
    }
    console.log(array);

    var fileType = getFileType(array[0]);

    console.log('fileType');
    console.log(fileType);

    if (fileType=='image') {
        document.getElementById('imgshow').src='http://localhost:3000'+array[0]+"?v=" + Math.random();
        $('#imgshow').show();
        document.getElementById('imgshow').title=array[1];
        console.log('imgshow');
    }else if (fileType=='video') {
        document.getElementById('videoshow').src='http://localhost:3000'+array[0]+"?v=" + Math.random();
        document.getElementById('videoshow').title=array[1];
        $('#videoshow').show();

        console.log('videoshow');
    }
    document.getElementById('keterangancacatshow').innerHTML=array[1];

});

// Daftar ekstensi gambar dan video
var imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
var videoExtensions = ['.mp4','.mov', '.avi', '.mkv'];

function getFileType(filePath) {
  const lowerPath = filePath.toLowerCase();
  if (imageExtensions.some(ext => lowerPath.endsWith(ext))) {
    return 'image';
  } else if (videoExtensions.some(ext => lowerPath.endsWith(ext))) {
    return 'video';
  } else {
    return 'unknown';
  }
}
