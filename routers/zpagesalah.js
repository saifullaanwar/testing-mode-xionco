export default function pagesalah(versionall,) {
    czz = "/css/404.css" + versionall;
    res.status(404).render('404', { titlepage: '404', diskripsi:'404', czz, versionall, jzz:'404' });
}